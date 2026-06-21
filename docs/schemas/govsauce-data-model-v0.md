# GovSauce Data Model v0

Date: 2026-06-21
Owning issue: https://github.com/buildleansaas/case-watch/issues/6

This document expands Case Watch into a generic GovSauce civic-accountability graph while preserving the current criminal/court accountability model.

## 1. Status enums

```ts
export type VerificationStatus =
  | 'seed'
  | 'needs-review'
  | 'verified'
  | 'conflicting'
  | 'stale'
  | 'archived';

export type SourceConfidence =
  | 'official-court'
  | 'official-legislature'
  | 'official-budget'
  | 'official-local-government'
  | 'official-agency'
  | 'official-election'
  | 'official-campaign-finance'
  | 'official-registry'
  | 'official-jail'
  | 'official-prosecutor'
  | 'official-police'
  | 'official-doc'
  | 'foia-public-record'
  | 'news'
  | 'official-social'
  | 'social-claim'
  | 'community-tip'
  | 'unknown';
```

## 2. Source receipt

```ts
export type SourceReceipt = {
  id: string;
  title: string;
  url: string;
  sourceType: SourceConfidence;
  publisher?: string;
  jurisdictionId?: string;
  accessedAt: string;
  publishedAt?: string;
  archivedSnapshotPath?: string;
  excerpt?: string;
  notes?: string;
};
```

Rules:

- Every public record needs at least one `SourceReceipt`.
- `verified` status requires at least one official or FOIA/public-record source receipt supporting the key fields.
- `social-claim`, `community-tip`, and `news` receipts may seed research but cannot by themselves verify a record.

## 3. Jurisdiction

```ts
export type JurisdictionType =
  | 'country'
  | 'state'
  | 'county'
  | 'city'
  | 'town'
  | 'school-district'
  | 'court-district'
  | 'regional-authority';

export type Jurisdiction = {
  id: string;
  name: string;
  type: JurisdictionType;
  state?: string;
  country: string;
  parentJurisdictionId?: string;
  priority?: number;
  region?: string;
  officialWebsite?: string;
  sourceCoverage: SourceCoverage[];
  alertTopics: AlertTopic[];
};
```

## 4. Source coverage

```ts
export type SourceCoverage = {
  id: string;
  label: string;
  category:
    | 'court'
    | 'judge-directory'
    | 'prosecutor'
    | 'sheriff'
    | 'police'
    | 'jail'
    | 'registry'
    | 'doc'
    | 'foia'
    | 'legislature'
    | 'budget'
    | 'local-government'
    | 'board-commission'
    | 'agency'
    | 'election'
    | 'campaign-finance'
    | 'meeting-minutes'
    | 'news'
    | 'social';
  url: string;
  access: 'public-web' | 'search-form' | 'pdf' | 'foia' | 'manual' | 'api' | 'unknown';
  scrapeStatus: 'not-started' | 'works' | 'blocked' | 'manual-only' | 'needs-review';
  notes?: string;
};
```

## 5. Office and official

```ts
export type Office = {
  id: string;
  jurisdictionId: string;
  name: string;
  officeType:
    | 'legislative'
    | 'executive'
    | 'judicial'
    | 'prosecutor'
    | 'sheriff'
    | 'police'
    | 'agency'
    | 'board-commission'
    | 'school-board'
    | 'clerk'
    | 'other';
  districtName?: string;
  officialWebsite?: string;
  sourceReceipts: SourceReceipt[];
};

export type Official = {
  id: string;
  name: string;
  officeId: string;
  jurisdictionId: string;
  roleTitle: string;
  party?: string;
  termStart?: string;
  termEnd?: string;
  contactUrl?: string;
  sourceReceipts: SourceReceipt[];
  linkedActionIds?: string[];
};
```

## 6. Vote Watch entities

```ts
export type Bill = {
  id: string;
  jurisdictionId: string;
  session: string;
  billNumber: string;
  title: string;
  status: VerificationStatus;
  officialUrl: string;
  sourceReceipts: SourceReceipt[];
};

export type BudgetItem = {
  id: string;
  jurisdictionId: string;
  session: string;
  itemNumber: string;
  title: string;
  summary: string;
  amount?: string;
  effectiveDate?: string;
  relatedBillIds: string[];
  status: VerificationStatus;
  sourceReceipts: SourceReceipt[];
};

export type VoteEvent = {
  id: string;
  jurisdictionId: string;
  chamber?: string;
  bodyName: string;
  date?: string;
  action: string;
  subjectId: string;
  subjectType: 'bill' | 'budget-item' | 'ordinance' | 'resolution' | 'meeting-motion';
  result?: string;
  votes: VoteRecord[];
  status: VerificationStatus;
  sourceReceipts: SourceReceipt[];
};

export type VoteRecord = {
  officialId: string;
  vote: 'yes' | 'no' | 'abstain' | 'not-voting' | 'absent' | 'unknown';
  notes?: string;
};
```

## 7. Case Watch entities

```ts
export type CourtActor = {
  id: string;
  name: string;
  actorType: 'judge' | 'prosecutor' | 'defense-attorney' | 'clerk' | 'sheriff' | 'police' | 'other';
  officeId?: string;
  jurisdictionId?: string;
  sourceReceipts: SourceReceipt[];
};

export type CaseRecord = {
  id: string;
  jurisdictionId: string;
  court?: string;
  caseNumber?: string;
  defendantName?: string;
  status: VerificationStatus;
  offenseDate?: string;
  arrestDate?: string;
  filingDate?: string;
  dispositionDate?: string;
  originalCharges: ChargeEvent[];
  finalCharges: ChargeEvent[];
  sentence?: Sentence;
  custody?: CustodyEvent[];
  actorIds?: string[];
  flags: OutcomeFlag[];
  score?: AccountabilityScore;
  sourceReceipts: SourceReceipt[];
};
```

## 8. Claim and signal inbox

```ts
export type Claim = {
  id: string;
  title: string;
  summary: string;
  claimType: 'tip' | 'social-post' | 'news-seed' | 'official-lead' | 'manual-research';
  jurisdictionIds: string[];
  relatedPersonIds?: string[];
  relatedRecordIds?: string[];
  status: VerificationStatus;
  sourceReceipts: SourceReceipt[];
  researchNotes?: string;
};
```

Rules:

- Claims begin as `seed` or `needs-review`.
- A claim can produce verified `CaseRecord`, `VoteEvent`, `BudgetItem`, or `ActionEvent` records only after official receipts exist.
- The original claim should remain linked for provenance, but it should not be the only proof.

## 9. Alerts

```ts
export type AlertTopic =
  | 'courts-cases'
  | 'judges-prosecutors'
  | 'budgets-taxes'
  | 'votes-bills'
  | 'agencies-boards'
  | 'schools'
  | 'zoning-development'
  | 'elections-campaign-finance'
  | 'source-gaps'
  | 'verification-needed';

export type SubscriberPreference = {
  id: string;
  subscriberId: string;
  jurisdictionIds: string[];
  topics: AlertTopic[];
  cadence: 'weekly' | 'daily' | 'breaking';
  channel: 'email' | 'sms' | 'discord' | 'rss';
  status: 'active' | 'paused' | 'cancelled';
};
```

## 10. Validator requirements

The data validator should enforce:

- `verified` records require official/FOIA/public-record source receipts.
- `seed` records may use social/news/community tips, but must display as unverified.
- `VoteEvent` rows cannot claim a yes/no vote without a roll-call, minutes, journal, or official vote source.
- `BudgetItem` rows require official budget/legislative receipts.
- `CaseRecord.score` cannot be present unless the case has official court/source receipts.
- Every source receipt must include `url`, `sourceType`, and `accessedAt`.
