# Newspaper Judge Profile Implementation Plan

> **For Hermes:** Use subagent-driven-development skill or execute directly commit-by-commit. Keep every claim source-backed and every visual change rendered/browser-smoked before reporting done.

**Goal:** Upgrade `/judges/sparkle-l-sooknanan` from a decent source-linked bio into a richer newspaper/data-journalism profile that feels legitimate, designed, and useful without inventing facts.

**Architecture:** Keep the existing data-first `lib/profiles.ts` approach, but split profile data into richer typed sections: verified facts, source confidence, visual modules, chronology, documents, ruling explainers, unresolved leads, and correction methodology. The page should render like an editorial profile package: strong masthead, nut graf, annotated timeline, evidence rail, ruling explainer, document cards, and source ledger.

**Tech Stack:** Next.js App Router, TypeScript, static profile data, CSS modules/global CSS, JSON-LD, sitemap, source validation script, pnpm.

---

## Plan Review Gate

Risk level: medium
Gate status: approved-for-plan, implementation pending
Reviewer: Hermes

- Goal/scope clear? Yes: enrich one public judge profile and the repeatable profile methodology.
- Risk surfaces named? Yes: public/civic/legal-adjacent facts, source accuracy, SEO/indexable route, Vercel production alias.
- Verification and rollback path named? Yes: validators, local build, browser QA, preview/prod smoke; rollback by reverting PR commits or Vercel redeploy.
- Decision and must-fix notes: no invented claims, no social-post-only assertions as verified facts, no decorative dashboard card spam. Prefer newspaper/data-viz layout with readable source receipts.

---

## Acceptance Criteria

- `/judges/sparkle-l-sooknanan` reads like a newspaper profile, not a generic card bio.
- The page has a clear editorial hierarchy:
  - masthead/kicker
  - strong headline/subhead
  - nut graf
  - quick-fact box
  - annotated career timeline
  - ruling explainer
  - document/source ledger
  - open research leads / correction path
- Every substantive claim maps to a source ID.
- The methodology page explains profile confidence levels and publish thresholds.
- `pnpm validate:data`, `pnpm lint`, and `pnpm build` pass.
- Browser QA checks desktop and mobile-ish widths.
- Live/preview smoke returns 200 and expected content markers.

---

## Commit Stack

### Commit 1: Expand profile schema for editorial modules

**Objective:** Add typed support for richer newspaper-style profile sections without hardcoding everything in the page component.

**Files:**
- Modify: `lib/profiles.ts`
- Modify: `scripts/validate-data.ts`

**Steps:**
1. Add types for:
   - `NutGraf`
   - `ProfileStat`
   - `ProfileSection`
   - `RulingExplainer`
   - `ResearchLead`
   - `ConfidenceLevel`
2. Add `sourceIds` to every rich content block.
3. Add validator checks:
   - all referenced `sourceIds` exist
   - verified sections require at least one official/primary source when applicable
   - research leads cannot render as verified claims
4. Run:
   - `pnpm validate:data`
   - `pnpm lint`

**Commit message:** `feat: expand judge profile editorial schema`

---

### Commit 2: Deepen Sooknanan profile content with source-backed modules

**Objective:** Replace the thin bio feel with a richer source-backed profile package.

**Files:**
- Modify: `lib/profiles.ts`

**Content modules to add:**
- Editorial framing:
  - kicker: `Federal judge profile`
  - headline angle: D.D.C. judge with Supreme Court clerkship, DOJ civil-rights background, BigLaw appellate record, and a high-profile SAVE ruling.
  - nut graf explaining why this profile matters.
- More complete timeline:
  - immigration/birthplace where sourced
  - education sequence
  - clerkships
  - DOJ appellate/civil-rights work
  - Jones Day appellate practice
  - nomination/confirmation/commission
  - notable ruling
- Ruling explainer:
  - case caption
  - docket number
  - date
  - challenged system/action
  - statutory hooks named only from the opinion/order
  - holding/remedy in plain English
  - document links
- Source-backed public profile:
  - Biden appointee
  - Senate vote and nomination path
  - DOJ civil-rights background
  - reported Jones Day resignation context as secondary-sourced, not official fact
  - American Prospect criticism as criticism, not adjudicated truth
- Research leads:
  - Senate questionnaire/QFRs
  - hearing video/transcript
  - financial disclosures
  - full docket/ruling inventory

**Verification:**
- `pnpm validate:data`
- `pnpm lint`

**Commit message:** `content: deepen sooknanan profile with source-backed modules`

---

### Commit 3: Redesign profile page as a newspaper/data-journalism layout

**Objective:** Make the profile feel like an editorial visualization package rather than SaaS cards.

**Files:**
- Modify: `app/judges/[slug]/page.tsx`
- Modify: `app/styles.css`

**Layout direction:**
- Top masthead:
  - small Case Watch label
  - headline in serif/editorial style
  - wide subhead
  - source/update metadata line
- Above-fold structure:
  - left: headline/nut graf
  - right: `At a glance` fact box
- Body structure:
  - `Why this judge is on Case Watch`
  - `The ruling at issue`
  - horizontal/vertical timeline with year markers
  - `Record map`: court, nomination, career, documents, criticism, open leads
  - source ledger at bottom
- Visual feel:
  - newspaper cream/off-white background
  - serif headlines
  - black ink / slate text
  - thin rules and section dividers
  - pull quote / annotation blocks
  - restrained badges only for confidence/source labels
- Avoid:
  - generic SaaS dashboard cards
  - dense card grid at the top
  - fake authority metrics
  - unsourced claims

**Verification:**
- `pnpm build`
- local browser QA desktop
- local browser QA mobile width if available

**Commit message:** `design: render judge profile as newspaper visualization`

---

### Commit 4: Upgrade methodology and source-confidence UX

**Objective:** Make the legitimacy model visible so richer AI-assisted research remains trustworthy.

**Files:**
- Modify: `app/methodology/page.tsx`
- Modify: `app/judges/[slug]/page.tsx`
- Modify: `app/styles.css`

**Add methodology concepts:**
- `official`: court/FJC/Senate/docket/government source
- `primary document`: opinion, order, filing, questionnaire, disclosure
- `secondary`: reputable analysis/news/institutional writeup
- `social seed`: clue only, never verified fact by itself
- `open lead`: needs more official receipts

**UI changes:**
- render source confidence labels in source cards
- render open leads separately from verified facts
- add `How to read this profile` mini-block

**Verification:**
- `pnpm validate:data`
- `pnpm build`
- smoke `/methodology`

**Commit message:** `feat: add profile methodology and confidence labels`

---

### Commit 5: Add rendered QA checks and production smoke receipts

**Objective:** Make the quality bar repeatable for future profiles.

**Files:**
- Modify/Create: `scripts/validate-data.ts` or `scripts/smoke-routes.ts`
- Modify: `package.json`
- Optional Create: `docs/qa/judge-profile-checklist.md`

**Steps:**
1. Add route smoke script for:
   - `/judges`
   - `/judges/sparkle-l-sooknanan`
   - `/methodology`
   - `/sitemap.xml`
2. Check rendered markers:
   - headline present
   - JSON-LD present
   - source ledger present
   - ruling explainer present
   - sitemap includes profile URL
3. Add checklist for visual QA:
   - desktop
   - mobile
   - source labels
   - no unsupported claims

**Verification:**
- `pnpm validate:data`
- `pnpm lint`
- `pnpm build`
- `pnpm smoke` if added

**Commit message:** `test: add judge profile smoke checks`

---

### Commit 6: Deploy, smoke, and update PR/thread receipts

**Objective:** Finish the slice with reviewable proof.

**Files:**
- Modify: PR body/comment only
- Modify: Obsidian thread scratchpad

**Steps:**
1. Push branch.
2. Update PR #11 body or open a follow-up PR if the current branch has already merged.
3. Deploy preview or production alias only after verifying Vercel project mapping.
4. Smoke URLs:
   - `/judges/sparkle-l-sooknanan`
   - `/methodology`
   - `/sitemap.xml`
5. Update Obsidian scratchpad with commit SHAs, PR URL, Vercel URL, checks, and remaining research leads.

**Commit message:** no code commit unless docs changed.

---

## AI-Assisted Research Rules

AI can help with:
- summarizing long opinions into plain-English sections
- extracting timeline candidates from official biographies
- drafting neutral explanatory copy
- suggesting visualization structure
- identifying missing source categories

AI cannot be the source for:
- biographical facts
- claims about motives
- criticism framed as fact
- legal holdings without opinion/order receipt
- docket/ruling inventory unless backed by actual docket/court/document links

Every AI-generated sentence must be checked against one of:
- official court bio
- Federal Judicial Center
- Senate/Judiciary/GovTrack/congressional source
- court opinion/order/filing
- primary PDF/document
- labeled secondary source for commentary/criticism only

---

## Verification Commands

```bash
pnpm validate:data
pnpm lint
pnpm build
pnpm start -p 3217
curl -fsS http://127.0.0.1:3217/judges/sparkle-l-sooknanan | grep -E 'Sparkle L\. Sooknanan|Source library|application/ld\+json'
curl -fsS http://127.0.0.1:3217/methodology | grep 'Every profile starts as a claim'
curl -fsS http://127.0.0.1:3217/sitemap.xml | grep '/judges/sparkle-l-sooknanan'
```

---

## Out of Scope for This Slice

- Full PACER/RECAP docket scraper.
- Bulk judge profile generation.
- Subscription alerts.
- Automated social monitoring.
- Unverified allegations or commentary presented as fact.
- Major rebrand of the whole Case Watch app.

---

## Immediate Next Move

Start with Commit 1 and Commit 2 together only if they stay small. Otherwise commit schema/validator first, then deepen Sooknanan content in the next commit.
