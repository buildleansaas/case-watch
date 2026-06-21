# Virginia Civic Accountability Source Matrix

Date: 2026-06-21
Owning issue: https://github.com/buildleansaas/case-watch/issues/6

This expands the original Case Watch Virginia court/criminal source matrix into the first GovSauce state source matrix: courts, prosecutors, sheriffs, local government, legislators, budgets, votes, agencies, boards, FOIA/public records, elections, and campaign finance.

## 1. Statewide official sources

| Category | Source | URL | Access | Notes |
|---|---|---|---|---|
| Courts | Virginia Courts Case Status and Information | https://www.vacourts.gov/caseinfo/home.html | public web/search | Hub for statewide, circuit, GDC, JDR, appellate case info. |
| Directories | Virginia Courts Directories | https://www.vacourts.gov/directories/home.html | public web/search | Judges, clerks, chief magistrates, court contacts. |
| Registry | Virginia State Police Sex Offender Registry | https://sex-offender.vsp.virginia.gov/sor/ | public web/search | Use for registry cross-checks. Browser may time out, needs scraper review. |
| Legislature | Virginia Legislative Information System | https://lis.virginia.gov/ | public web/search | Bills, actions, votes, text, state budget links. |
| Budget | Virginia State Budget Portal | https://budget.lis.virginia.gov/ | public web/search | Budget bill, amendments, item details, amendment PDFs. |
| Legislator lookup | Who's My Legislator? | https://whosmy.virginiageneralassembly.gov/ | public web/search | Address/map lookup for VA House, Senate, and U.S. reps. |
| House roster | Virginia House Members | https://virginiageneralassembly.gov/house/members/members.php | public web | Delegate roster and district/contact data. |
| Senate roster | Virginia Senate Members | https://virginiageneralassembly.gov/senate/members/members.php | public web | Senator roster and district/contact data. |
| Elections | Virginia Department of Elections | https://www.elections.virginia.gov/ | public web/search | Candidate/election data, calendars, results. |
| Campaign finance | VPAP | https://www.vpap.org/ | public web/search | Campaign finance and officeholder context. Third-party, not official, but high-value source. |
| FOIA law | Virginia FOIA Council | https://foiacouncil.dls.virginia.gov/ | public web | Public-record law/context and advisory opinions. |

## 2. Priority locality cluster

| Locality | Type | Priority | Current focus | Source file/status |
|---|---:|---:|---|---|
| Hanover County | county | 1 | first GovSauce jurisdiction page | `data/va/localities/priority-central-va.json` has source seeds |
| Henrico County | county | 2 | Central VA expansion | source seeds present |
| City of Richmond | city | 3 | Central VA expansion | source seeds present |
| Chesterfield County | county | 4 | Central VA expansion | source seeds present |
| Goochland County | county | 5 | Central VA expansion | source seeds present |
| New Kent County | county | 6 | Central VA expansion | source seeds present |
| Caroline County | county | 7 | Central VA expansion | source seeds present |
| Fairfax County | county | 8 | first serious-case seed cluster | source seeds present |

## 3. Hanover County first-page source checklist

| Source bucket | Candidate source | URL | Current status | Next action |
|---|---|---|---|---|
| Board of Supervisors | Hanover County Board of Supervisors | https://www.hanovercounty.gov/427/Board-of-Supervisors | source found | Extract districts, members, meetings/minutes/video links. |
| FOIA | Hanover County FOIA | https://www.hanovercounty.gov/1003/Freedom-of-Information-Act-FOIA | source found | Store contact/procedure metadata. |
| Circuit Court | Hanover Circuit Court / Clerk directory | https://www.hanovercounty.gov/Directory.aspx?did=38 | source found | Extract court/clerk contact and case lookup path. |
| Court hub | Virginia Courts CCI | https://eapps.courts.state.va.us/cci/ | source seed | Confirm access/manual notes for Hanover Circuit Court. |
| Court hub | Virginia GDC | https://eapps.courts.state.va.us/gdcourts/ | source seed | Confirm access/manual notes for Hanover GDC. |
| Commonwealth's Attorney | Hanover County CA source trail | https://www.hanovercounty.gov/FormCenter/Commonwealths-Attorneys-Office-34 | needs review | Confirm exact department/official page, not just form endpoint. |
| Sheriff | Hanover County Sheriff's Office | https://www.hanoversheriff.com/ | source found | Find arrest/news/log source if public. |
| Jail | Pamunkey Regional Jail | https://www.pamunkeyregionaljail.org/ | needs review | Confirm inmate/search/release endpoint and coverage. |
| State legislators | Who's My Legislator? | https://whosmy.virginiageneralassembly.gov/ | source found | Add address/district mapping process for Hanover. |
| Budget/votes | Virginia LIS + budget portal | https://lis.virginia.gov/ and https://budget.lis.virginia.gov/ | source found | Use for state vote/budget records. |

## 4. First Vote Watch source trail: VA legislator pay raise

| Record | Source | URL | Status | Notes |
|---|---|---|---|---|
| Budget amendment | Item 1 #3s, Legislator Pay Increase | https://budget.lis.virginia.gov/amendment/2026/1/SB30/Introduced/FA/1/3s/ | official source found | Salary increase to `$50,000` after Jan. 24, 2028; `$2,131,489` GF FY2028 in current source trail. |
| Amendment PDF | Budget amendment PDF | https://budget.lis.virginia.gov/get/amendmentpdf/5242/ | official source found | Store or snapshot in later data slice. |
| Budget bill | HB30 2026 Special Session I | https://lis.virginia.gov/bill-details/20262/HB30 | needs final vote verification | Track final action/conference vote when posted. |
| Budget bill | SB30 2026 Regular Session | https://lis.virginia.gov/bill-details/20261/SB30 | historical/related | Regular-session budget trail; failed budget bill per search result. |
| Vote detail example | HB30 Vote, 2026 Regular Session | https://lis.virginia.gov/vote-details/HB30/20261/26110582 | related example | Need correct final/special-session vote before publishing vote table. |

## 5. Source categories required before statewide expansion

Each locality/jurisdiction row should eventually include:

- official government homepage
- FOIA/public-record portal or instructions
- supervisors/council/school-board rosters
- meeting agendas/minutes/video search
- local ordinances/code portal
- budget/CIP source
- Commonwealth's Attorney source
- sheriff/police source
- jail/regional jail source
- court/clerk source
- state/federal legislator mapping
- election/campaign finance source
- local news/search seed source
- scrape/manual status
- source owner/responsible module

## 6. Verification rules

- Social/X/news posts create `Claim` records only.
- A vote table needs an official roll-call, journal, minutes, or equivalent government source.
- A case outcome needs official court/jail/registry/prosecutor/police/public-record receipts before it can be marked `verified`.
- If a source is manual/search-form only, store exact manual instructions and snapshot paths when available.
