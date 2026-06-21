# GovSauce Product Architecture and First Build Sprint

Date: 2026-06-21
Owning issue: https://github.com/buildleansaas/case-watch/issues/6
Working brand: `govsauce.com`
Launch engine: `case-watch`

## 1. Thesis

GovSauce helps people get the real source-backed record of what is happening in their jurisdiction: local officials, state legislators, appointed boards, agencies, courts, judges, prosecutors, sheriffs, police, budgets, votes, criminal-case outcomes, and public-record updates.

The product should feel simple to the public:

> Type your jurisdiction. See the receipts. Subscribe to the sauce.

It starts in Virginia because the current source trail already has two strong wedges:

1. **Vote Watch:** Virginia General Assembly pay-raise budget amendment and final budget vote attribution.
2. **Case Watch:** Virginia criminal/court accountability, including judge/prosecutor/case outcome tracking.

## 2. First audience

Primary first users:

- Virginia residents who want local and state government scrutiny without reading raw portals all day.
- Local activists, parents, public-safety voters, watchdog accounts, journalists, campaign teams, and civic groups.
- People who care about judge/prosecutor outcomes, budget choices, agency actions, school/local-board decisions, and votes that affect them directly.

The first product promise is not “we found corruption.” It is:

> We turn messy public records into a jurisdiction feed with receipts, names, votes, dates, links, and alert subscriptions.

## 3. Product modules

### A. Jurisdiction Watch

The home object. A page like `/va/hanover-county` should eventually show:

- elected officials
- appointed boards/agencies
- state delegates/senators/federal reps
- courts/judges
- prosecutor and sheriff offices
- recent votes/budget actions
- criminal/court accountability signals
- meeting agendas/minutes
- source coverage and gaps
- local alert signup

### B. Vote Watch

Track legislative/local government actions with roll-call and attribution.

Initial demo: Virginia General Assembly pay-raise budget item.

Known source anchor:

- `Item 1 #3s`, “Legislator Pay Increase”
- Official source: https://budget.lis.virginia.gov/amendment/2026/1/SB30/Introduced/FA/1/3s/
- Stated effect in source trail: salary increase to `$50,000` after `January 24, 2028`
- Funding: `$2,131,489` GF in FY2028

Required table columns:

- legislator
- chamber
- district
- party
- office/title
- vote on final budget/conference report
- whether the member is eligible to benefit after Jan. 24, 2028
- next election timing
- source link
- notes: patron, conferee, budget negotiator, voted for final package, etc.

### C. Case Watch

Track public criminal/court records with actor and outcome context.

Core objects:

- case
- defendant / respondent where public
- charges
- charge changes
- disposition
- sentencing
- custody/release
- judge
- prosecutor office/name where public
- defense attorney where public
- source receipts
- outcome flags
- source confidence

This module remains neutral at the data layer. A source-backed outcome may be unusually lenient, unusually harsh, by-the-book, or unknown. The system should show why.

### D. Official Watch

Track officials and unelected public-power holders.

Examples:

- elected representatives
- supervisors/council members
- school board members
- sheriffs
- Commonwealth's Attorneys
- judges
- agency heads
- appointed board/commission members
- budget conferees
- committee chairs

Fields should include current role, jurisdiction, term dates where public, source URLs, linked votes/actions/cases, and contact/office info where official.

### E. Signal Inbox

Social posts, X threads, news, advocacy posts, tips, screenshots, and community submissions are **seed claims** only.

A seed claim can create a research task. It cannot become a verified GovSauce record until it is backed by official records, court records, legislative records, budget records, local-government minutes, agency records, campaign/election records, FOIA/public-record responses, or other named source receipts.

### F. Subscription Alerts

Start simple:

- local weekly digest by jurisdiction
- state weekly digest by topic
- high-confidence breaking alerts later

Alert topics:

- courts/cases
- judges/prosecutors
- budgets/taxes
- votes/bills
- agencies/boards
- schools
- zoning/development
- elections/campaign finance
- watchdog tips needing verification

## 4. Data model v0

The generic civic accountability graph:

```txt
Jurisdiction
  -> Office / Agency / Court / Board
  -> Official / CourtActor
  -> ActionEvent / Case / Vote / BudgetItem / Meeting
  -> SourceReceipt
  -> VerificationStatus
  -> AlertTopic
```

Core entity list:

- `Jurisdiction`
- `Office`
- `Official`
- `AgencyBoard`
- `Court`
- `CourtActor`
- `CaseRecord`
- `ChargeEvent`
- `Sentence`
- `CustodyEvent`
- `Bill`
- `BudgetItem`
- `VoteEvent`
- `MeetingEvent`
- `ActionEvent`
- `SourceReceipt`
- `Claim`
- `VerificationStatus`
- `AlertTopic`
- `SubscriberPreference`

## 5. Verification statuses

Use these across modules:

- `seed`: user/social/news/tip source only, not ready as a fact record.
- `needs-review`: has some usable source trail, needs manual validation or more receipts.
- `verified`: official/public-record receipts support the key fields.
- `conflicting`: sources disagree and the conflict is unresolved.
- `stale`: official page changed or record needs refresh.
- `archived`: retained for history, no longer active/current.

## 6. Source hierarchy

Highest confidence:

- court records
- legislative roll calls/bill history/budget portals
- official meeting agendas/minutes/video
- agency records
- jail/sheriff/police public logs
- state registries
- election/campaign finance filings
- FOIA/public-record responses

Secondary sources:

- reputable local news
- watchdog/newsletter writeups with documents attached
- official social posts from officeholders/agencies

Seed-only sources:

- X posts
- screenshots without official context
- anonymous tips
- advocacy summaries
- community comments

## 7. Publication rules

GovSauce should publish source-backed accountability records, not unsupported accusations.

Public phrasing should distinguish:

- “voted yes/no”
- “introduced/patroned/conferee”
- “charged with”
- “convicted of”
- “case dismissed/nolle prosequi/amended”
- “sentenced to”
- “official finding”
- “public complaint”
- “disciplinary action”
- “alleged in lawsuit/filing”
- “seed claim, not yet verified”

Do not collapse those into generic “corrupt.” Let the receipts tell the story.

## 8. First public route

First jurisdiction page target:

- `/va/hanover-county`

Why:

- Austin/local relevance.
- Existing priority source matrix already starts with Hanover.
- Good bridge between local officials, courts, sheriff/jail, Commonwealth's Attorney, FOIA, and state representatives.

Initial page sections:

1. Jurisdiction overview
2. Source coverage: what we can verify now vs not yet
3. Local officials and offices
4. Courts and public safety offices
5. State/federal representatives
6. Recent verified actions/cases/votes
7. Open research queue
8. Subscribe to Hanover updates

## 9. First build sprint

### Slice 1: Architecture docs and source matrix

- Add this architecture doc.
- Expand Virginia source matrix beyond criminal/court sources into civic/accountability sources.
- Add a typed GovSauce data model doc.

Verification:

- Markdown files read back.
- GitHub issue linked.
- Official source URLs included.

### Slice 2: Data model + validator

- Add TypeScript types for GovSauce civic entities.
- Add JSON validator rules for source status.
- Prevent `verified` records without official source receipts.
- Prevent `score` or `claimStatus=verified` from social-only sources.

Verification:

- `pnpm validate:data`
- targeted fixtures for seed vs verified records

### Slice 3: Hanover jurisdiction seed

- Normalize `data/va/localities/priority-central-va.json` into a first jurisdiction dataset.
- Add Hanover official/civic sources:
  - Board of Supervisors
  - FOIA
  - Commonwealth's Attorney
  - sheriff
  - Circuit/GDC court sources
  - jail/regional jail
  - state legislative reps lookup source

Verification:

- validate data
- page/API returns Hanover jurisdiction with source statuses

### Slice 4: Vote Watch VA pay-raise demo

- Store the official budget amendment receipt.
- Add a `BudgetItem` + `VoteWatch` seed record.
- Track final HB30/SB30 budget/conference vote when official roll-call is available.
- Render a table of legislators once roll-call source is verified.

Verification:

- source URL live
- row statuses remain `needs-review` until final official vote source exists

### Slice 5: Case Watch seed verifier

- Continue existing Fairfax seed case verification work.
- Store only official-record-backed fields as verified.
- Keep social/news claims as seed notes unless independently verified.

Verification:

- case detail shows source confidence per field
- validator blocks verified status without official receipts

## 10. Monetization / subscription path

Start with free public pages plus email capture.

Free:

- jurisdiction pages
- source coverage status
- selected verified records
- weekly public digest samples

Paid or higher-intent later:

- custom jurisdiction watchlists
- topic alerts
- multi-jurisdiction tracking
- court/prosecutor/judge pattern reports
- campaign/local watchdog briefings
- organization dashboards for local groups/journalists/campaigns

Initial CTA:

> Get weekly GovSauce for your county and state.

## 11. Kill criteria

Pause or narrow if:

- official source access is too manual for the chosen first vertical
- no repeatable alert-worthy records can be generated weekly
- the first jurisdiction page does not make the value obvious in under 30 seconds
- the work becomes broad political commentary instead of source-backed civic intelligence

## 12. Immediate next actions

1. Merge this planning slice.
2. Implement the validator/source-confidence slice.
3. Build `/jurisdictions/va-hanover-county` or equivalent first route.
4. Add the VA pay-raise budget item as the first Vote Watch record.
5. Continue Fairfax case verifier as first Case Watch record.
