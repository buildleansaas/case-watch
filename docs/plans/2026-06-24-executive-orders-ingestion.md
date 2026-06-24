# Executive Orders Ingestion + Newspaper Page Plan

Date: 2026-06-24
Repo: `buildleansaas/case-watch`
Seed thread: Discord `#general / va corruption`, thread `1518167047929073734`
Seed post: `https://x.com/michaelsalla/status/2069390584033259707`
Official seed source: `https://www.whitehouse.gov/presidential-actions/2026/06/ushering-in-the-next-frontier-of-quantum-innovation/`

## Product direction

Case Watch should not be only judges and cases. The product spine should become civic/source intelligence:

- social/news post is the lead or claim seed;
- official record is the anchor;
- claims are extracted into verifiable units;
- page renders the source text, implementation deadlines, affected agencies, claim checks, follow-up documents, and timeline;
- methodology labels what is official text, what is interpretation, what is social speculation, and what is unresolved.

The example post is useful because it mixes:

1. official executive-order text about quantum innovation;
2. quoted snippets from the order;
3. an interpretation about classified technology release;
4. a claim about secrecy orders on patent applications;
5. speculative examples such as spacetime portals, medbeds, exotic propulsion, and free energy.

That is exactly the page pattern: separate `what the order says` from `what people are claiming it means`.

## URL structure

Initial routes:

- `/executive-orders`
  - index of executive orders, sortable/filterable by topic, president, agency, status, and claim activity.
- `/executive-orders/eo-14411-quantum-innovation`
  - canonical explainer/profile for the June 22, 2026 quantum order.
- Later:
  - `/topics/quantum-innovation`
  - `/agencies/nasa`
  - `/agencies/doe`
  - `/claims/secrecy-orders-patent-applications`

## Data model

Create `lib/executive-orders.ts` first. Start as static TypeScript data, then later migrate to JSON/database/import pipeline.

Suggested types:

```ts
export type SourceConfidence =
  | 'official'
  | 'primary-document'
  | 'secondary-report'
  | 'social-seed'
  | 'interpretation'
  | 'unverified-claim';

export type ExecutiveOrderSource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  type: SourceConfidence;
  quote?: string;
  archivedUrl?: string;
};

export type ExecutiveOrderSection = {
  sectionNumber: string;
  title: string;
  plainEnglish: string;
  exactQuote: string;
  sourceId: string;
  agencies: string[];
  deadlines: ExecutiveOrderDeadline[];
  topics: string[];
};

export type ExecutiveOrderDeadline = {
  label: string;
  dueDate?: string;
  daysAfterOrder?: number;
  responsibleAgencies: string[];
  requiredAction: string;
  sourceId: string;
  status: 'pending' | 'completed' | 'missed' | 'unknown';
};

export type EOClaim = {
  id: string;
  claim: string;
  claimant: string;
  claimSourceId: string;
  relatedSections: string[];
  status: 'supported-by-order-text' | 'partially-supported' | 'not-in-order-text' | 'needs-follow-up-source';
  analysis: string;
  neededReceipts: string[];
};

export type ExecutiveOrderRecord = {
  slug: string;
  eoNumber?: string;
  title: string;
  signedDate: string;
  president: string;
  canonicalUrl: string;
  summary: string;
  dek: string;
  topics: string[];
  agencies: string[];
  sections: ExecutiveOrderSection[];
  deadlines: ExecutiveOrderDeadline[];
  claims: EOClaim[];
  sourceIds: string[];
  sources: ExecutiveOrderSource[];
  researchLeads: string[];
  lastUpdated: string;
};
```

## First page: EO 14411 quantum innovation

Working slug:

`/executive-orders/eo-14411-quantum-innovation`

Page headline:

`Executive Order 14411: What the Quantum Innovation Order Actually Says`

Dek:

`A source-linked read of the White House order, the agency deadlines it creates, and the social claims now orbiting it.`

### Page layout

Use the same newspaper/data-journalism visual language as the judge profile, but make it document-first.

1. Masthead / edition
   - `Case Watch Executive Order Desk`
   - signed date, last updated, source confidence.

2. Front-page hero
   - headline;
   - dek;
   - official source link;
   - social seed link;
   - quick stats.

3. At-a-glance rail
   - EO number if confirmed;
   - title;
   - signed date;
   - president;
   - primary topic;
   - affected agencies;
   - number of deadlines;
   - number of open claims.

4. What the order actually does
   - section-by-section plain-English explainer;
   - exact quote under expandable/citation UI;
   - affected agencies and deadline chips.

5. Implementation clock
   - timeline of required actions:
     - 90-day technical specifications summary;
     - 180-day strategy/private-sector partnership/performance assessment items;
     - agency alignment reports after updated strategy publication;
     - NASA space sensing/networking plan if present in the official text.

6. Agency map
   - APST/OSTP;
   - DOE;
   - Commerce;
   - Department of War/Defense naming as the official text says;
   - DNI;
   - NSF;
   - NASA;
   - NSA;
   - OMB.

7. Claim board
   - Claims from the X post as cards:
     - “EO promotes quantum innovation” → supported by order text.
     - “EO aims to release classified quantum technologies” → interpretation, not stated in the text checked.
     - “EO will lift secrecy orders on 6,500+ patent applications” → needs PTO/secrecy-order receipt.
     - “Spacetime portals/medbeds/exotic propulsion/free energy are included” → not in order text checked; needs separate primary receipts.
   - Every claim gets status, source, related official section, and needed receipts.

8. Source ledger
   - White House page as official source.
   - X post as social seed.
   - Future Federal Register entry if/when available.
   - Future USPTO secrecy-order reports/statistics.
   - Future agency reports triggered by deadlines.

9. Follow-up monitor
   - upcoming due dates;
   - what to check next;
   - “subscribe/watch this order” CTA later.

## Ingestion pipeline

Start simple, then automate.

### Phase 1: Manual static seed

- Add `lib/executive-orders.ts` with one record.
- Add route `/executive-orders`.
- Add route `/executive-orders/[slug]`.
- Add source validation to `scripts/validate-data.ts`.
- Add sitemap entries.
- Add homepage card.

### Phase 2: Source adapter scripts

Add scripts:

- `scripts/ingest-executive-order.ts --url <whitehouse-url>`
  - fetch official page;
  - parse title/date/category/body;
  - split sections by `Sec. N.`;
  - extract agencies, deadlines, and cited statutes/programs;
  - output normalized draft JSON/TS record.

- `scripts/ingest-social-seed.ts --url <x-url>`
  - capture post URL, author, date, text, links;
  - store as `social-seed`, not official truth;
  - extract claims and linked official sources.

### Phase 3: AI-assisted enrichment

AI is useful, but only inside a receipt box:

- summarize each section;
- extract agencies;
- extract dates/deadlines;
- generate claim candidates;
- map claims to sections;
- mark unsupported claims as unsupported, not false unless contradicted.

The validator must require exact source IDs for every AI-assisted summary.

### Phase 4: Monitoring

Track follow-up sources:

- Federal Register publication;
- OSTP/APST strategy updates;
- agency reports;
- DOE QC-ADDS specs;
- NASA plan for civilian quantum sensing/networking for space applications;
- USPTO secrecy-order statistics if a claim page is added.

## Validation rules

Extend `validate-data.ts`:

- every order needs official source;
- every section needs exact quote + source ID;
- every deadline needs responsible agency and source ID;
- every claim needs claim source + status + needed receipts if not supported;
- no claim with `unverified-claim` can be rendered as factual in summary/headline;
- every public page needs at least one official or primary source;
- sitemap includes every published order.

## Visual direction

Not SaaS cards. More newspaper/document desk:

- wide masthead;
- thin rules;
- source labels like newspaper footnotes;
- document-section columns;
- timeline strip;
- agency map;
- claim board that reads like a newsroom fact desk;
- source ledger at bottom.

## First implementation slice

Branch name:

`executive-orders-quantum-page`

Commit plan:

1. `Add executive order data model and seed record`
   - `lib/executive-orders.ts`
   - source/claim/deadline types
   - EO 14411 seed record

2. `Add executive order index and detail routes`
   - `app/executive-orders/page.tsx`
   - `app/executive-orders/[slug]/page.tsx`

3. `Validate executive order source contracts`
   - update `scripts/validate-data.ts`
   - enforce official-source/claim/deadline/source references

4. `Wire executive order discovery`
   - homepage card
   - sitemap entries
   - JSON-LD `Article`/`GovernmentDocument` style structured data

5. `Polish and deploy`
   - newspaper styling reuse
   - `pnpm lint`
   - `pnpm validate:data`
   - `pnpm build`
   - browser QA
   - Vercel preview/prod smoke as approved

## Product name direction

Case Watch can stay as the repo/product for now, but the architecture should support a broader public-record product:

- `Judge Watch`
- `Case Watch`
- `Executive Order Watch`
- `Agency Action Watch`
- `Claim Watch`

The real product is not “a judge bio site.” It is a source-linked civic intelligence layer that turns viral posts and official records into explainer pages with receipts.
