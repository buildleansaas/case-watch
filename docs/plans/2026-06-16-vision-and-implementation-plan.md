# Case Watch Vision and Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build an open-source public-record explorer that helps Virginians understand criminal case outcomes, charge reductions, releases, sentencing patterns, and the judges/prosecutors/offices connected to those outcomes.

**Architecture:** Start file-backed with raw JSON/CSV and source snapshots in the repo. Build a Next.js explorer over typed data files and serverless API routes. Expand scraping/source collection locality-by-locality, beginning with Hanover, Henrico, Richmond, and Fairfax, then all Virginia counties/cities, then other states.

**Tech Stack:** Next.js App Router, TypeScript, static JSON/CSV data, repo-stored source matrices and seed cases, serverless API routes, later Postgres/object storage/search when repo data becomes too large.

---

## 1. Product thesis

People should be able to inspect whether criminal cases are being handled close to the law and public record: correct charges, charge reductions, plea outcomes, sentencing, suspended time, custody/release status, and which public officials touched the case.

This should be politically neutral at the data layer. The system should not assume harsh equals good or lenient equals bad. It should compute a baseline from public law and records, then show where outcomes are unusually lenient, unusually harsh, or simply unresolved/unknown.

## 2. Neutral scoring model

Use a zero-centered accountability score.

- `0`: outcome appears by-the-book based on available records, charge, statute, sentencing range, and documented discretion.
- Negative score: outcome appears more lenient than baseline, such as severe original charge amended down, active incarceration suspended, probation-only disposition, release after serious charge, or repeated nolle/dismissal patterns.
- Positive score: outcome appears harsher than baseline, such as unusually high sentence, stacking, aggressive enhancements, or repeated severe outcomes for comparable cases.
- `unknown`: insufficient official records. Do not score seed claims without official receipts.

Scoring must include source confidence and explain why a case was flagged.

## 3. Initial geography

Priority local cluster:

1. Hanover County
2. Henrico County
3. City of Richmond
4. Chesterfield County
5. Goochland County
6. New Kent County
7. Caroline County
8. Ashland/Hanover-area regional jail/court sources
9. Fairfax County, because it is the seed case cluster

Then expand to all Virginia counties and independent cities.

## 4. Source inventory buckets

### A. Statewide court records

- Virginia Courts Case Status and Information: https://www.vacourts.gov/caseinfo/home.html
- Online Case Information System Statewide Search
- Circuit Court Case Information
- General District Court Case Information
- Juvenile and Domestic Relations District Court Case Information, where public/available
- Supreme Court and Court of Appeals case information for appeals

### B. Court and judge directories

- Virginia Courts Directories: https://www.vacourts.gov/directories/home.html
- Search for Justices, Judges, Clerks and Chief Magistrates
- Judicial circuit/district maps
- Court clerk pages and local court contact pages

### C. Offender, corrections, custody, release

- Virginia State Police Sex Offender Registry
- Virginia Department of Corrections offender locator and releases where public
- Local sheriff inmate search pages
- Regional jail authority inmate search pages
- Jail booking/release logs where public
- VINE/public victim notification sources where usable

### D. Prosecutors/Commonwealth's Attorneys

- Each county/city Commonwealth's Attorney official page
- CA press releases, annual reports, case announcements
- Local government staff directories
- Virginia Association of Commonwealth's Attorneys roster if available
- Election/official pages for who holds the office

### E. Local law enforcement

- County/city sheriff arrest logs
- Police department press releases
- Incident/arrest report pages
- FOIA/public records portals

### F. Seed/intelligence layer

- Local news crime/court coverage
- X/social posts from VA public-safety/court/crime accounts
- Advocacy posts treated as claims until official records verify them
- Community submissions with source links

## 5. Data model v0

### Jurisdiction

```ts
type Jurisdiction = {
  id: string;
  name: string;
  type: 'county' | 'city' | 'town' | 'regional';
  state: 'VA';
  priority: number;
  sources: Source[];
};
```

### Source

```ts
type Source = {
  id: string;
  label: string;
  category: 'court' | 'judge-directory' | 'prosecutor' | 'sheriff' | 'police' | 'jail' | 'registry' | 'doc' | 'foia' | 'news' | 'social';
  url: string;
  access: 'public-web' | 'search-form' | 'pdf' | 'foia' | 'manual' | 'unknown';
  scrapeStatus: 'not-started' | 'works' | 'blocked' | 'manual-only' | 'needs-review';
  notes?: string;
};
```

### Case record

```ts
type CaseRecord = {
  id: string;
  jurisdiction: string;
  court?: string;
  caseNumber?: string;
  defendant: string;
  status: 'seed' | 'verified' | 'needs-review';
  offenseDate?: string;
  arrestDate?: string;
  filingDate?: string;
  dispositionDate?: string;
  originalCharges: ChargeEvent[];
  finalCharges: ChargeEvent[];
  sentence?: Sentence;
  custody?: CustodyEvent[];
  judge?: string;
  prosecutorOffice?: string;
  prosecutorName?: string;
  defenseAttorney?: string;
  flags: OutcomeFlag[];
  score?: AccountabilityScore;
  sources: SourceReceipt[];
};
```

### Source confidence

```ts
type SourceConfidence =
  | 'official-court'
  | 'official-registry'
  | 'official-jail'
  | 'official-prosecutor'
  | 'official-police'
  | 'official-doc'
  | 'news'
  | 'social-claim'
  | 'unknown';
```

## 6. Outcome flags

- `child-sex-offense`
- `violent-felony`
- `mandatory-minimum-original-charge`
- `serious-charge-reduced`
- `all-time-suspended`
- `probation-only`
- `released-after-serious-charge`
- `nolle-prosequi-serious-charge`
- `dismissed-serious-charge`
- `repeat-offender`
- `registry-match`
- `judge-pattern-candidate`
- `prosecutor-pattern-candidate`
- `official-verification-needed`

## 7. UI v0

Routes:

- `/` overview, mission, current source coverage, seed cases
- `/cases` searchable case list
- `/cases/[id]` case detail with source receipts and confidence labels
- `/jurisdictions` county/city source matrix
- `/jurisdictions/[id]` locality detail, sources, known gaps, cases
- `/actors/judges` judge table
- `/actors/prosecutors` prosecutor/office table
- `/laws` Virginia statute/range reference
- `/methodology` scoring and verification method

## 8. Data workflow

1. Add locality to source matrix.
2. Add official source URLs and access notes.
3. Create scraper/manual collector for the source if feasible.
4. Save raw source snapshot under `data/raw/...` or `data/va/...`.
5. Parse into normalized JSON.
6. Run validator.
7. Render in explorer with confidence labels.
8. Only mark case `verified` when official receipts support key fields.

## 9. First implementation slices

### Slice 1: Repo skeleton and v0 explorer shell

- Next.js app
- API route returning seed cases
- initial seed JSON
- validator that keeps seed claims clearly labeled

### Slice 2: Virginia locality source matrix

- `data/va/localities/*.json`
- Hanover/Henrico/Richmond/Fairfax first
- all VA counties/cities afterward
- source category and access metadata

### Slice 3: Case schema and data validator

- strict TS types
- source confidence checks
- required official receipts before `verified`
- score cannot exist without official court/source data

### Slice 4: Fairfax seed verifier

- Faggioni seed case report
- official court lookup notes
- registry receipt notes
- judge/prosecutor fields if accessible
- remain `seed` or `needs-review` until official docs are stored

### Slice 5: Local cluster expansion

- Hanover, Henrico, Richmond, Chesterfield
- court source matrix
- sheriff/jail/source links
- prosecutor directories
- first local seed searches

## 10. Plan Review Gate

Risk level: medium
Gate status: approved for repo/docs/prototype data only
Reviewer: Austin via Discord voice direction

- Goal/scope/out-of-scope clear? Yes. Build public-record explorer, start VA, file-backed prototype.
- Risk surfaces named: public claims about defendants/judges/prosecutors; source confidence; official verification before factual publication.
- Verification and rollback path named? Yes. JSON validators, source labels, Git history, source snapshots.
- Decision and must-fix notes: seed claims must stay labeled until official records verify them. Do not publish social claims as established facts.

## 11. Non-goals for v0

- No paid database until repo/file-backed data becomes too large.
- No automated accusations from social posts.
- No hidden proprietary dataset.
- No scraping that ignores source access limits.
- No statewide scoring until locality/source records and statute mapping are reliable.

## 12. Definition of done for first milestone

- Public GitHub repo exists.
- Vision plan is committed.
- GitHub issues capture the build sequence.
- Next.js app builds.
- `/api/cases` returns seed JSON.
- Seed case is clearly marked as social-claim/unverified.
- First source matrix issue is ready for Hanover/Henrico/Richmond/Fairfax.
