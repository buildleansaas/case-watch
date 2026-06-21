# Virginia Source Matrix v0

This file tracks the original criminal/court source matrix for Case Watch.

For the expanded GovSauce civic-accountability matrix covering courts, votes, budgets, officials, boards, agencies, elections, and alert sources, see:

- `docs/data-sources/virginia-civic-accountability-source-matrix.md`

This file tracks the sources that Case Watch needs before statewide scraping.

## Official statewide sources

| Category | Source | URL | Access | Notes |
|---|---|---|---|---|
| Courts | Virginia Courts Case Status and Information | https://www.vacourts.gov/caseinfo/home.html | public web/search | Hub for statewide, circuit, GDC, JDR, appellate case info. |
| Directories | Virginia Courts Directories | https://www.vacourts.gov/directories/home.html | public web/search | Judges, clerks, chief magistrates, court contacts. |
| Registry | Virginia State Police Sex Offender Registry | https://sex-offender.vsp.virginia.gov/sor/ | public web/search | Use for registry cross-checks. Browser may time out, needs scraper review. |

## Priority locality cluster

| Locality | Type | Priority | Court | Prosecutor | Sheriff/Jail | Police | FOIA | Status |
|---|---:|---:|---|---|---|---|---|---|
| Hanover County | county | 1 | TODO | TODO | TODO | TODO | TODO | not-started |
| Henrico County | county | 2 | TODO | TODO | TODO | TODO | TODO | not-started |
| City of Richmond | city | 3 | TODO | TODO | TODO | TODO | TODO | not-started |
| Chesterfield County | county | 4 | TODO | TODO | TODO | TODO | TODO | not-started |
| Goochland County | county | 5 | TODO | TODO | TODO | TODO | TODO | not-started |
| New Kent County | county | 6 | TODO | TODO | TODO | TODO | TODO | not-started |
| Caroline County | county | 7 | TODO | TODO | TODO | TODO | TODO | not-started |
| Fairfax County | county | 8 | TODO | TODO | TODO | TODO | TODO | seed-case |

## Expansion requirement

Add every Virginia county and independent city after the priority cluster. Each row needs:

- court/case search source
- judge/clerk/circuit/district mapping
- Commonwealth's Attorney page
- sheriff/police source
- jail/regional jail source
- FOIA/public records portal
- local news/search seed sources
- scrape/manual status
