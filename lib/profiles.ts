export type SourceType =
  | 'official-bio'
  | 'federal-judicial-center'
  | 'senate-record'
  | 'court-document'
  | 'institutional-profile'
  | 'secondary-analysis'
  | 'news-report'
  | 'social-seed';

export type ConfidenceLevel = 'official' | 'primary-document' | 'secondary' | 'seed' | 'open-lead';

export type Source = {
  id: string;
  label: string;
  url: string;
  type: SourceType;
  confidence: ConfidenceLevel;
  note?: string;
};

export type SourceBackedText = {
  text: string;
  sourceIds: string[];
};

export type TimelineEvent = {
  start: string;
  end?: string;
  title: string;
  organization?: string;
  description?: string;
  sourceIds: string[];
};

export type Education = {
  institution: string;
  degree: string;
  year: string;
  honors?: string;
  sourceIds: string[];
};

export type PublicRecordItem = {
  title: string;
  summary: string;
  treatment: 'verified-biographical-record' | 'reported-context' | 'criticism' | 'open-research-lead';
  sourceIds: string[];
};

export type ProfileStat = {
  label: string;
  value: string;
  context: string;
  sourceIds: string[];
};

export type ProfileSection = {
  eyebrow: string;
  title: string;
  body: string;
  sourceIds: string[];
};

export type RulingExplainer = {
  title: string;
  caseCaption: string;
  docket: string;
  date: string;
  court: string;
  posture: string;
  challengedAction: string;
  holding: string;
  remedy: string;
  whyItMatters: string;
  legalHooks: string[];
  documentIds: string[];
  sourceIds: string[];
};

export type NotableRuling = {
  slug: string;
  title: string;
  date: string;
  court: string;
  docket: string;
  summary: string;
  status: 'verified' | 'case-lead';
  documentIds: string[];
  sourceIds: string[];
  explainer: RulingExplainer;
};

export type DocumentRecord = {
  id: string;
  title: string;
  url: string;
  court?: string;
  docket?: string;
  filed?: string;
  type: 'memorandum-opinion' | 'order' | 'nomination-page' | 'support-letter-index' | 'other';
  sourceIds: string[];
};

export type ResearchLead = {
  title: string;
  why: string;
  status: 'queued' | 'needs-official-document' | 'needs-docket-inventory';
  nextSource: string;
  sourceIds: string[];
};

export type JudgeProfile = {
  type: 'judge';
  slug: string;
  fullName: string;
  displayName: string;
  kicker: string;
  headline: string;
  deck: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
  neutralSummary: SourceBackedText;
  nutGraf: SourceBackedText;
  currentRole: {
    title: string;
    court: string;
    jurisdiction: string;
    activeFrom: string;
    appointedBy: string;
    confirmed: string;
    confirmationVote?: string;
    sourceIds: string[];
  };
  quickFacts: Array<{ label: string; value: string; sourceIds: string[] }>;
  stats: ProfileStat[];
  education: Education[];
  careerTimeline: TimelineEvent[];
  profileSections: ProfileSection[];
  notableRulings: NotableRuling[];
  publicRecord: PublicRecordItem[];
  researchLeads: ResearchLead[];
  documents: DocumentRecord[];
  sources: Source[];
};

const profiles: JudgeProfile[] = [
  {
    type: 'judge',
    slug: 'sparkle-l-sooknanan',
    fullName: 'Sparkle Leah Sooknanan',
    displayName: 'Sparkle L. Sooknanan',
    kicker: 'Federal judge profile',
    headline: 'A new D.C. district judge with a Supreme Court clerkship, DOJ civil-rights record, and a voting-data ruling now in the public spotlight',
    deck:
      'Case Watch maps the official biography, confirmation trail, career record, public criticism, and first major sourced ruling without treating social posts as proof.',
    lastUpdated: '2026-06-23',
    metaTitle: 'Judge Sparkle Sooknanan: Biography, Court, Rulings, and Source Documents',
    metaDescription:
      'Source-linked profile of Judge Sparkle L. Sooknanan of the U.S. District Court for D.C., including biography, confirmation history, notable rulings, source documents, and research leads.',
    neutralSummary: {
      text:
        'Sparkle L. Sooknanan is a Biden-appointed United States District Judge for the District of Columbia. Official records list prior clerkships for Justice Sonia Sotomayor, Judge Guido Calabresi, and Judge Eric Vitaliano, plus service in the Department of Justice and private practice in Washington, D.C.',
      sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'],
    },
    nutGraf: {
      text:
        'The public-interest question is not just who she is, but how to read a fast-rising federal judge through receipts: official court biographies, FJC chronology, Senate nomination records, source-labeled criticism, and the text of orders and opinions. This profile separates verified record, reported context, criticism, and open research leads so readers can see what is established and what still needs document work.',
      sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan', 'senate-judiciary-nominations', 'katu-save-opinion-pdf', 'democracy-forward-save-order-pdf'],
    },
    currentRole: {
      title: 'United States District Judge',
      court: 'U.S. District Court for the District of Columbia',
      jurisdiction: 'District of Columbia',
      activeFrom: '2025-01-02',
      appointedBy: 'President Joe Biden',
      confirmed: '2024-12-03',
      confirmationVote: '50-48',
      sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan', 'ballotpedia-sooknanan'],
    },
    quickFacts: [
      { label: 'Born', value: '1983, San Fernando, Trinidad and Tobago', sourceIds: ['fjc-sooknanan'] },
      { label: 'Court', value: 'U.S. District Court for the District of Columbia', sourceIds: ['ddc-bio-sooknanan'] },
      { label: 'Seat', value: 'Seat vacated by Judge Florence Y. Pan', sourceIds: ['fjc-sooknanan'] },
      { label: 'Nominated', value: 'February 27, 2024', sourceIds: ['fjc-sooknanan'] },
      { label: 'Hearing', value: 'March 20, 2024 Senate Judiciary nomination hearing', sourceIds: ['senate-judiciary-nominations'] },
      { label: 'Confirmed', value: 'December 3, 2024, 50-48', sourceIds: ['fjc-sooknanan', 'ballotpedia-sooknanan'] },
      { label: 'Commission', value: 'January 2, 2025', sourceIds: ['fjc-sooknanan'] },
    ],
    stats: [
      { label: 'Senate vote', value: '50-48', context: 'reported confirmation margin', sourceIds: ['ballotpedia-sooknanan'] },
      { label: 'Nomination-to-confirmation', value: '280 days', context: 'Feb. 27 to Dec. 3, 2024', sourceIds: ['fjc-sooknanan'] },
      { label: 'Clerkship ladder', value: '3 courts', context: 'district court, Second Circuit, Supreme Court', sourceIds: ['fjc-sooknanan'] },
      { label: 'SAVE opinion', value: '75 pages', context: 'memorandum opinion PDF extracted for first ruling explainer', sourceIds: ['katu-save-opinion-pdf'] },
    ],
    education: [
      { institution: 'St. Francis College', degree: 'B.S.', year: '2002', honors: 'summa cum laude', sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'] },
      { institution: 'Hofstra University', degree: 'M.B.A.', year: '2003', honors: 'with distinction', sourceIds: ['fjc-sooknanan'] },
      { institution: 'Brooklyn Law School', degree: 'J.D.', year: '2010', honors: 'summa cum laude', sourceIds: ['brooklyn-law-confirmation'] },
    ],
    careerTimeline: [
      {
        start: '1983',
        title: 'Born in San Fernando, Trinidad and Tobago',
        description: 'The FJC biographical directory lists her birthplace and birth year.',
        sourceIds: ['fjc-sooknanan'],
      },
      {
        start: '2002',
        end: '2010',
        title: 'Education sequence: B.S., M.B.A., J.D.',
        organization: 'St. Francis College, Hofstra University, Brooklyn Law School',
        description: 'Official and institutional sources show a business-to-law education path before federal clerkships.',
        sourceIds: ['fjc-sooknanan', 'brooklyn-law-confirmation'],
      },
      { start: '2010', end: '2011', title: 'Law clerk', organization: 'Judge Eric N. Vitaliano, E.D.N.Y.', description: 'First listed federal clerkship after law school.', sourceIds: ['fjc-sooknanan'] },
      { start: '2011', end: '2012', title: 'Law clerk', organization: 'Judge Guido Calabresi, U.S. Court of Appeals for the Second Circuit', description: 'Appellate clerkship immediately preceding DOJ appellate staff service.', sourceIds: ['fjc-sooknanan'] },
      { start: '2012', end: '2013', title: 'Attorney', organization: 'DOJ Civil Division, Appellate Staff', description: 'Federal appellate government practice before the Supreme Court clerkship.', sourceIds: ['fjc-sooknanan'] },
      { start: '2013', end: '2014', title: 'Law clerk', organization: 'Justice Sonia Sotomayor, U.S. Supreme Court', description: 'Supreme Court clerkship listed in FJC and court biographies.', sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'] },
      { start: '2014', end: '2021', title: 'Private practice', organization: 'Washington, D.C.', description: 'FJC lists private practice; secondary profiles identify the firm as Jones Day and discuss Issues & Appeals work.', sourceIds: ['fjc-sooknanan', 'vetting-room-sooknanan'] },
      { start: '2021', end: '2023', title: 'Deputy Associate Attorney General', organization: 'U.S. Department of Justice', description: 'Returned to DOJ in senior leadership.', sourceIds: ['fjc-sooknanan'] },
      { start: '2023', end: '2024', title: 'Principal Deputy Assistant Attorney General', organization: 'DOJ Civil Rights Division', description: 'Civil Rights Division leadership before district-court nomination.', sourceIds: ['fjc-sooknanan'] },
      { start: '2024', title: 'Nominated and heard by Senate Judiciary', organization: 'U.S. Senate', description: 'The Senate Judiciary hearing page lists Sooknanan on Panel II and links QFRs and support letters.', sourceIds: ['senate-judiciary-nominations'] },
      { start: '2025', title: 'United States District Judge', organization: 'U.S. District Court for the District of Columbia', description: 'Commission issued January 2, 2025.', sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'] },
      { start: '2026', title: 'SAVE voter-verification ruling', organization: 'League of Women Voters v. DHS', description: 'The memorandum opinion and order vacated the modified SAVE system and related notices.', sourceIds: ['katu-save-opinion-pdf', 'democracy-forward-save-order-pdf'] },
    ],
    profileSections: [
      {
        eyebrow: 'Record spine',
        title: 'The official biography is unusually linear: elite clerkships, DOJ appellate work, private practice, DOJ leadership, district bench.',
        body:
          'FJC and D.D.C. sources provide the backbone: three federal clerkships including the Supreme Court, appellate staff work at DOJ, Washington private practice, two DOJ leadership roles, and appointment to the District Court for D.C.',
        sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'],
      },
      {
        eyebrow: 'Confirmation file',
        title: 'The Senate record shows a conventional nomination hearing page with QFRs and multiple support-letter categories.',
        body:
          'The March 20, 2024 Senate Judiciary hearing page lists Sooknanan for the District of Columbia and includes QFR download links plus support letters from former clerks, Brooklyn Law School, Jones Day partners, federal law-enforcement officers, SCOTUS clerks, DOJ attorneys, civil-rights groups, and victim-services professionals.',
        sourceIds: ['senate-judiciary-nominations'],
      },
      {
        eyebrow: 'Public scrutiny',
        title: 'The profile carries both reported praise and criticism, but criticism is labeled as criticism rather than treated as an adjudicated fact.',
        body:
          'Secondary profiles discuss Jones Day work, a reported resignation after election-related representation, and criticism over Puerto Rico debt litigation. Case Watch keeps that material in a separate public-record/criticism lane until underlying documents are collected.',
        sourceIds: ['vetting-room-sooknanan', 'american-prospect-sooknanan'],
      },
    ],
    notableRulings: [
      {
        slug: 'league-of-women-voters-v-dhs-save',
        title: 'League of Women Voters v. DHS, SAVE voter-verification ruling',
        date: '2026-06-22',
        court: 'D.D.C.',
        docket: '25-3501 (SLS)',
        summary:
          'Judge Sooknanan vacated the 2025 modified SAVE voter-verification system and related DHS/SSA notices after concluding the challenged actions violated the Social Security Act, Privacy Act, and APA.',
        status: 'verified',
        documentIds: ['lwv-dhs-save-memorandum-opinion-2026-06-22', 'lwv-dhs-save-order-2026-06-22'],
        sourceIds: ['katu-save-opinion-pdf', 'democracy-forward-save-order-pdf'],
        explainer: {
          title: 'What the SAVE ruling says',
          caseCaption: 'League of Women Voters, et al. v. U.S. Department of Homeland Security, et al.',
          docket: 'Civil Action No. 25-3501 (SLS)',
          date: 'June 22, 2026',
          court: 'U.S. District Court for the District of Columbia',
          posture: 'Plaintiffs moved for summary judgment; federal defendants and Texas sought dismissal or summary judgment.',
          challengedAction:
            'A 2025 overhaul of DHS’s Systematic Alien Verification for Entitlements system that added natural-born-citizen records, SSA records including Social Security numbers, and bulk-search access for voter-verification use.',
          holding:
            'The opinion states that the modified SAVE system and related notices were unlawful under the Social Security Act, Privacy Act, and Administrative Procedure Act.',
          remedy:
            'The order grants plaintiffs summary judgment, denies the defense motions, vacates the October 2025 DHS modified-system notice, vacates the November 2025 SSA modified-system notice, vacates the SAVE modified system, and terminates the case from the active docket.',
          whyItMatters:
            'The opinion frames the dispute as a collision between election administration, privacy rights, Social Security records, citizenship data reliability, and voter-roll removals.',
          legalHooks: ['Social Security Act', 'Privacy Act', 'Administrative Procedure Act', 'Executive Order 14248', 'SAVE system records'],
          documentIds: ['lwv-dhs-save-memorandum-opinion-2026-06-22', 'lwv-dhs-save-order-2026-06-22'],
          sourceIds: ['katu-save-opinion-pdf', 'democracy-forward-save-order-pdf'],
        },
      },
    ],
    publicRecord: [
      {
        title: 'Official career chronology',
        summary:
          'FJC lists district-court, Second Circuit, and Supreme Court clerkships, DOJ appellate staff service, private practice in Washington, two DOJ leadership roles, and her current judicial service.',
        treatment: 'verified-biographical-record',
        sourceIds: ['fjc-sooknanan'],
      },
      {
        title: 'Jones Day resignation after 2020 election litigation',
        summary:
          'Secondary profiles report that Sooknanan left Jones Day after objecting to the firm representing Donald Trump in Pennsylvania election-related litigation. This remains labeled as reported context pending collection of first-party records.',
        treatment: 'reported-context',
        sourceIds: ['vetting-room-sooknanan', 'american-prospect-sooknanan'],
      },
      {
        title: 'Puerto Rico debt work criticism',
        summary:
          'The American Prospect criticized her Jones Day work for hedge funds and bondholders in Puerto Rico debt litigation. Case Watch treats this as sourced criticism, not a finding about judicial conduct.',
        treatment: 'criticism',
        sourceIds: ['american-prospect-sooknanan'],
      },
      {
        title: 'Incomplete ruling inventory',
        summary:
          'Only the SAVE ruling is modeled as a verified notable ruling in this slice. A fuller profile needs a docket-level inventory of opinions, orders, emergency applications, and appeal posture.',
        treatment: 'open-research-lead',
        sourceIds: ['katu-save-opinion-pdf'],
      },
    ],
    researchLeads: [
      {
        title: 'Download and parse Senate QFRs',
        why: 'The Senate page links Sooknanan QFRs, but the profile should store the PDF and extract questions, commitments, and answer topics before summarizing them.',
        status: 'needs-official-document',
        nextSource: 'Senate Judiciary hearing page QFR link',
        sourceIds: ['senate-judiciary-nominations'],
      },
      {
        title: 'Collect support and opposition-letter packets',
        why: 'The nomination page lists multiple support-letter categories. Those should become document records with signers, institutions, and themes before the confirmation narrative is expanded.',
        status: 'queued',
        nextSource: 'Senate Judiciary related files',
        sourceIds: ['senate-judiciary-nominations'],
      },
      {
        title: 'Build D.D.C. opinion/order inventory',
        why: 'A single high-profile ruling is not enough to characterize a judge. The next pass should enumerate opinions/orders and label case type, posture, outcome, and appeal status.',
        status: 'needs-docket-inventory',
        nextSource: 'D.D.C. opinions, RECAP/CourtListener, PACER where needed',
        sourceIds: ['ddc-bio-sooknanan'],
      },
      {
        title: 'Find financial disclosure and questionnaire files',
        why: 'Ethics and conflict context should be grounded in official disclosures and questionnaire PDFs, not commentary.',
        status: 'needs-official-document',
        nextSource: 'Judicial financial disclosure database and Senate questionnaire records',
        sourceIds: ['senate-judiciary-nominations'],
      },
    ],
    documents: [
      {
        id: 'lwv-dhs-save-memorandum-opinion-2026-06-22',
        title: 'Memorandum opinion, League of Women Voters v. DHS',
        url: 'https://katu.com/resources/pdf/6c100924-1f3a-4bb5-922b-482142540be5-show_public_doc.pdf',
        court: 'U.S. District Court for the District of Columbia',
        docket: '25-3501 (SLS), ECF No. 111',
        filed: '2026-06-22',
        type: 'memorandum-opinion',
        sourceIds: ['katu-save-opinion-pdf'],
      },
      {
        id: 'lwv-dhs-save-order-2026-06-22',
        title: 'Order, League of Women Voters v. DHS',
        url: 'https://democracyforward.org/wp-content/uploads/2026/06/LWV-ordr.pdf',
        court: 'U.S. District Court for the District of Columbia',
        docket: '25-3501 (SLS), ECF No. 112',
        filed: '2026-06-22',
        type: 'order',
        sourceIds: ['democracy-forward-save-order-pdf'],
      },
      {
        id: 'senate-judiciary-hearing-2024-03-20',
        title: 'Senate Judiciary nomination hearing page',
        url: 'https://www.judiciary.senate.gov/committee-activity/hearings/03/20/2024/nominations',
        filed: '2024-03-20',
        type: 'nomination-page',
        sourceIds: ['senate-judiciary-nominations'],
      },
    ],
    sources: [
      { id: 'ddc-bio-sooknanan', label: 'D.D.C. official judge biography', url: 'https://www.dcd.uscourts.gov/content/district-judge-sparkle-l-sooknanan', type: 'official-bio', confidence: 'official' },
      { id: 'fjc-sooknanan', label: 'Federal Judicial Center biography', url: 'https://www.fjc.gov/history/judges/sooknanan-sparkle-leah', type: 'federal-judicial-center', confidence: 'official' },
      { id: 'senate-judiciary-nominations', label: 'Senate Judiciary nominations hearing page', url: 'https://www.judiciary.senate.gov/committee-activity/hearings/03/20/2024/nominations', type: 'senate-record', confidence: 'official', note: 'Lists Sooknanan on Panel II with QFR and support-letter links.' },
      { id: 'ballotpedia-sooknanan', label: 'Ballotpedia confirmation summary', url: 'https://ballotpedia.org/Sparkle_Sooknanan', type: 'secondary-analysis', confidence: 'secondary', note: 'Used for the reported 50-48 confirmation-vote margin.' },
      { id: 'brooklyn-law-confirmation', label: 'Brooklyn Law School confirmation article', url: 'https://www.brooklaw.edu/news-and-events/news/2024/12/us-senate-confirms-sparkle-l-sooknanan-10-as-us-district-court-judge/', type: 'institutional-profile', confidence: 'secondary' },
      { id: 'vetting-room-sooknanan', label: 'The Vetting Room profile', url: 'https://vettingroom.org/2024/03/11/sparkle-sooknanan/', type: 'secondary-analysis', confidence: 'secondary' },
      { id: 'american-prospect-sooknanan', label: 'American Prospect critique', url: 'https://prospect.org/2024/02/28/2024-02-28-biden-judge-nominee-vulture-funds-puerto-rican-debt/', type: 'secondary-analysis', confidence: 'secondary', note: 'Used only as labeled criticism/reported context.' },
      { id: 'katu-save-opinion-pdf', label: 'SAVE memorandum opinion PDF mirror', url: 'https://katu.com/resources/pdf/6c100924-1f3a-4bb5-922b-482142540be5-show_public_doc.pdf', type: 'court-document', confidence: 'primary-document', note: 'PDF mirror with D.D.C. docket header and filed-date metadata.' },
      { id: 'democracy-forward-save-order-pdf', label: 'SAVE order PDF mirror', url: 'https://democracyforward.org/wp-content/uploads/2026/06/LWV-ordr.pdf', type: 'court-document', confidence: 'primary-document', note: 'PDF mirror with D.D.C. docket header and filed-date metadata.' },
      { id: 'scotus-wire-seed', label: 'SCOTUS Wire X seed post', url: 'https://x.com/scotus_wire/status/2069142109769085013', type: 'social-seed', confidence: 'seed', note: 'Seed only; not used as a verified factual source.' },
    ],
  },
  {
    type: 'judge',
    slug: 'kandice-pickett',
    fullName: 'Kandice Pickett',
    displayName: 'Kandice Pickett',
    kicker: 'State judge profile',
    headline: 'A Jefferson County criminal judge, former prosecutor, and viral bond-hearing target whose record needs court-document receipts beyond the post',
    deck:
      'A viral X post accused Judge Kandice Pickett over a murder-case bond decision. Case Watch keeps the outrage post in the seed lane, then builds the profile from the Jefferson County court page, legal biography, election profile, and reported hearing accounts.',
    lastUpdated: '2026-06-24',
    metaTitle: 'Judge Kandice Pickett: Biography, Court Role, Bond Hearing, and Source Ledger',
    metaDescription:
      'Source-linked profile of Jefferson County Circuit Judge Kandice Pickett, including court role, prosecutor background, reported Aniah’s Law bond hearing, social-seed claim, and open research leads.',
    neutralSummary: {
      text:
        'Kandice Pickett is a Jefferson County, Alabama circuit criminal judge in the Tenth Judicial Circuit. Her official court page lists her Birmingham criminal-division chambers and staff, while Birmingham School of Law describes her as a Tuskegee native, University of Alabama and Alabama Law graduate, former deputy district attorney, and faculty spotlight subject.',
      sourceIds: ['jeffco-pickett-official', 'bsol-pickett'],
    },
    nutGraf: {
      text:
        'The public-record issue is narrow and document-driven: a viral post says Pickett released Steven Tyler Whitehead on bond after murder and attempted-murder charges. Local reporting says she set a $330,000 total bond after an Aniah’s Law hearing and found the state did not meet the burden to hold him without bond. The next profile pass should collect the actual order, case-action summary, docket, hearing transcript or recording, and statutory Aniah’s Law standard before treating the hearing as anything more than a reported bond decision.',
      sourceIds: ['quantumguard-pickett-seed', 'abc3340-whitehead-bond', 'alcom-whitehead-bond'],
    },
    currentRole: {
      title: 'Circuit Judge, Criminal Division',
      court: 'Tenth Judicial Circuit of Alabama, Jefferson County Birmingham Division',
      jurisdiction: 'Jefferson County, Alabama',
      activeFrom: '2023-01-16',
      appointedBy: 'Elected to Place 16 in 2022',
      confirmed: 'Assumed office January 16, 2023',
      sourceIds: ['jeffco-pickett-official', 'ballotpedia-pickett'],
    },
    quickFacts: [
      { label: 'Court', value: 'Jefferson County Circuit Court, criminal division', sourceIds: ['jeffco-pickett-official'] },
      { label: 'Office', value: 'Criminal Justice Center, Room 406, Birmingham', sourceIds: ['jeffco-pickett-official'] },
      { label: 'Education', value: 'University of Alabama B.S.; University of Alabama School of Law J.D.', sourceIds: ['bsol-pickett'] },
      { label: 'Prior role', value: 'Deputy district attorney for nearly 15 years before taking the bench', sourceIds: ['bsol-pickett'] },
      { label: 'Election office', value: 'Alabama 10th Judicial Circuit Place 16', sourceIds: ['ballotpedia-pickett'] },
      { label: 'Viral case seed', value: 'Steven Tyler Whitehead bond hearing claim, June 2026 X post', sourceIds: ['quantumguard-pickett-seed'] },
    ],
    stats: [
      { label: 'Prosecutor tenure', value: 'Almost 15 years', context: 'Reported by Birmingham School of Law faculty spotlight.', sourceIds: ['bsol-pickett'] },
      { label: 'Reported bond total', value: '$330K', context: 'ABC 33/40 reported $150K murder bond plus $60K for each of three attempted-murder charges.', sourceIds: ['abc3340-whitehead-bond'] },
      { label: 'Reported charges', value: '1 murder + 3 attempted murder', context: 'Local reporting says one attempted-murder charge was upgraded after Kimber Mills died.', sourceIds: ['alcom-whitehead-bond'] },
      { label: 'Source posture', value: 'Seed + news', context: 'The actual court order/transcript is still an open research lead.', sourceIds: ['quantumguard-pickett-seed', 'abc3340-whitehead-bond'] },
    ],
    education: [
      { institution: 'University of Alabama', degree: 'B.S.', year: 'not yet sourced', sourceIds: ['bsol-pickett'] },
      { institution: 'University of Alabama School of Law', degree: 'J.D.', year: 'not yet sourced', sourceIds: ['bsol-pickett'] },
    ],
    careerTimeline: [
      { start: 'Before 2023', title: 'Deputy district attorney', organization: 'Sixth Judicial Circuit and Tenth Judicial Circuit', description: 'Birmingham School of Law says Pickett alternated between Tuscaloosa County and Jefferson County and handled misdemeanor appeals, drug offenses, property crimes, and violent felonies.', sourceIds: ['bsol-pickett'] },
      { start: 'Before 2023', title: 'Law-enforcement and legal training work', organization: 'Alabama criminal-law community', description: 'The faculty spotlight says she advised and trained law enforcement on search and seizure, trial preparation, case investigation, and criminal-law updates.', sourceIds: ['bsol-pickett'] },
      { start: '2022', title: 'Elected to Alabama 10th Judicial Circuit Place 16', organization: 'Jefferson County judicial election', description: 'Ballotpedia identifies Pickett as the judge for Alabama 10th Judicial Circuit Place 16.', sourceIds: ['ballotpedia-pickett'] },
      { start: '2023', title: 'Assumed office as circuit judge', organization: 'Tenth Judicial Circuit of Alabama', description: 'Ballotpedia reports she assumed office January 16, 2023.', sourceIds: ['ballotpedia-pickett'] },
      { start: '2025', title: 'Listed among Jefferson County criminal-division judges', organization: 'Jefferson County Circuit Court', description: 'The official court page lists her criminal-division chambers and staff.', sourceIds: ['jeffco-pickett-official'] },
      { start: '2025', title: 'Reported Aniah’s Law bond hearing in Whitehead case', organization: 'Jefferson County Circuit Court', description: 'ABC 33/40 and AL.com reported that Pickett set bond after a hearing in the Steven Tyler Whitehead case.', sourceIds: ['abc3340-whitehead-bond', 'alcom-whitehead-bond'] },
      { start: '2026', title: 'Viral X post turns the bond ruling into a public accountability lead', organization: 'X / social seed lane', description: 'The Quantum Guard post is preserved as a seed claim and not treated as the underlying court record.', sourceIds: ['quantumguard-pickett-seed'] },
    ],
    profileSections: [
      {
        eyebrow: 'Record spine',
        title: 'The strongest current biography source is professional, not political.',
        body:
          'The Birmingham School of Law profile gives the usable career spine: Tuskegee native, Alabama undergraduate and law degrees, nearly 15 years as a deputy district attorney, jury-trial and felony litigation experience, and law-enforcement training work.',
        sourceIds: ['bsol-pickett'],
      },
      {
        eyebrow: 'Court file gap',
        title: 'The viral claim is not enough. The bond order and docket should be the next receipts.',
        body:
          'Local reports describe an Aniah’s Law hearing, probable-cause finding, bond amounts, firearm restriction, and electronic-monitoring condition. The profile should not infer motive, ideology, or misconduct without the actual order, transcript, and statutory standard.',
        sourceIds: ['abc3340-whitehead-bond', 'alcom-whitehead-bond'],
      },
      {
        eyebrow: 'Public scrutiny',
        title: 'The page should explain the legal burden, not just repeat outrage framing.',
        body:
          'ABC 33/40 reported that the state sought no bond and Pickett ruled the state did not meet the burden for no bond. A useful profile should put that against Alabama’s Aniah’s Law framework and the facts found at the hearing once primary documents are collected.',
        sourceIds: ['abc3340-whitehead-bond'],
      },
    ],
    notableRulings: [
      {
        slug: 'steven-tyler-whitehead-aniahs-law-bond-hearing',
        title: 'Reported Aniah’s Law bond hearing in Steven Tyler Whitehead case',
        date: '2025-10-24',
        court: 'Jefferson County Circuit Court, Alabama',
        docket: 'Open research lead',
        summary:
          'Local reporting says Judge Kandice Pickett set Steven Tyler Whitehead’s total bond at $330,000 after the state sought no bond in a case involving murder and attempted-murder charges from the Pinson bonfire shooting.',
        status: 'case-lead',
        documentIds: ['abc3340-whitehead-bond-story', 'alcom-whitehead-bond-story'],
        sourceIds: ['abc3340-whitehead-bond', 'alcom-whitehead-bond'],
        explainer: {
          title: 'What the reported bond hearing says',
          caseCaption: 'State of Alabama v. Steven Tyler Whitehead, reported bond hearing',
          docket: 'Needs Jefferson County case-action summary or Alacourt record',
          date: 'October 24, 2025',
          court: 'Jefferson County Circuit Court, Alabama',
          posture: 'Reported Aniah’s Law hearing after Whitehead was charged in a fatal Pinson shooting case.',
          challengedAction: 'The state reportedly sought no bond, while the defense opposed detention without bond.',
          holding:
            'ABC 33/40 reported that Pickett found probable cause for murder and three injuries but ruled the state did not meet the burden required to hold Whitehead without bond, setting $330,000 total bond instead.',
          remedy:
            'Reported conditions included bond amounts, prohibition on possessing firearms, and electronic monitoring if bond was posted.',
          whyItMatters:
            'This is the concrete event behind the viral post. It needs primary court documents before the profile can move from reported hearing summary to a verified docket explainer.',
          legalHooks: ['Aniah’s Law', 'bond hearing', 'probable cause', 'electronic monitoring', 'murder and attempted-murder charges'],
          documentIds: ['abc3340-whitehead-bond-story', 'alcom-whitehead-bond-story'],
          sourceIds: ['abc3340-whitehead-bond', 'alcom-whitehead-bond'],
        },
      },
    ],
    publicRecord: [
      {
        title: 'Official court contact record',
        summary: 'Jefferson County’s court site lists Pickett as a circuit criminal judge with Birmingham criminal-division chambers and staff.',
        treatment: 'verified-biographical-record',
        sourceIds: ['jeffco-pickett-official'],
      },
      {
        title: 'Former prosecutor biography',
        summary: 'Birmingham School of Law says Pickett spent almost 15 years as a deputy district attorney before taking the bench.',
        treatment: 'reported-context',
        sourceIds: ['bsol-pickett'],
      },
      {
        title: 'Whitehead bond decision criticism',
        summary: 'The Quantum Guard X post frames the bond decision as ideological betrayal. Case Watch stores this as social criticism and routes factual assertions back to news and court-record receipts.',
        treatment: 'criticism',
        sourceIds: ['quantumguard-pickett-seed', 'abc3340-whitehead-bond'],
      },
      {
        title: 'Missing primary court file',
        summary: 'The profile still needs the court order, case-action summary, transcript/audio, indictment status, and current custody/bond status before stronger conclusions can be made.',
        treatment: 'open-research-lead',
        sourceIds: ['abc3340-whitehead-bond', 'alcom-whitehead-bond'],
      },
    ],
    researchLeads: [
      {
        title: 'Pull the Jefferson County/Alacourt docket',
        why: 'The docket will anchor the case number, charge history, bond order, grand-jury posture, and later custody changes.',
        status: 'needs-official-document',
        nextSource: 'Alacourt / Jefferson County criminal case-action summary for Steven Tyler Whitehead',
        sourceIds: ['abc3340-whitehead-bond'],
      },
      {
        title: 'Find the Aniah’s Law order or transcript',
        why: 'The key question is the stated legal reasoning and factual findings from the hearing, not the social framing.',
        status: 'needs-official-document',
        nextSource: 'Court order, minute entry, transcript, or hearing recording',
        sourceIds: ['abc3340-whitehead-bond', 'alcom-whitehead-bond'],
      },
      {
        title: 'Build a broader Pickett criminal-case outcome sample',
        why: 'One viral bond decision is not enough to profile a judge’s pattern. A fair page needs a sample of bond, plea, sentencing, and violent-felony outcomes.',
        status: 'needs-docket-inventory',
        nextSource: 'Jefferson County criminal docket inventory and local reporting archive',
        sourceIds: ['jeffco-pickett-official'],
      },
      {
        title: 'Verify election and campaign records',
        why: 'Ballotpedia gives the office/election spine, but campaign finance and bar profile records would make the public-office profile richer.',
        status: 'queued',
        nextSource: 'Alabama Secretary of State campaign finance and election results pages',
        sourceIds: ['ballotpedia-pickett'],
      },
    ],
    documents: [
      {
        id: 'jeffco-pickett-official-page',
        title: 'Jefferson County official Judge Kandice Pickett page',
        url: 'https://jefferson.alacourt.gov/circuit-court/circuit-judges-criminal/kandice-pickett/',
        court: 'Tenth Judicial Circuit of Alabama',
        type: 'other',
        sourceIds: ['jeffco-pickett-official'],
      },
      {
        id: 'abc3340-whitehead-bond-story',
        title: 'ABC 33/40 report on Whitehead bond hearing',
        url: 'https://abc3340.com/news/local/steven-whiteheads-bond-set-at-330k-for-murder-attempted-murder-in-pinson',
        filed: '2025-10-24',
        type: 'other',
        sourceIds: ['abc3340-whitehead-bond'],
      },
      {
        id: 'alcom-whitehead-bond-story',
        title: 'AL.com report on Kimber Mills shooting and bond hearing',
        url: 'https://www.al.com/crime/2025/10/bond-set-for-27-year-old-charged-with-killing-alabama-high-school-cheerleader-at-bonfire.html',
        filed: '2025-10-24',
        type: 'other',
        sourceIds: ['alcom-whitehead-bond'],
      },
      {
        id: 'quantumguard-pickett-x-seed',
        title: 'Quantum Guard X seed post',
        url: 'https://x.com/quantumguard17/status/2069526440358314434',
        filed: '2026-06-23',
        type: 'other',
        sourceIds: ['quantumguard-pickett-seed'],
      },
    ],
    sources: [
      { id: 'jeffco-pickett-official', label: 'Jefferson County official judge page', url: 'https://jefferson.alacourt.gov/circuit-court/circuit-judges-criminal/kandice-pickett/', type: 'official-bio', confidence: 'official', note: 'Official court page with chambers and staff listing.' },
      { id: 'bsol-pickett', label: 'Birmingham School of Law faculty spotlight', url: 'https://bsol.com/faculty-spotlight-judge-kandice-pickett/', type: 'institutional-profile', confidence: 'secondary', note: 'Biography source for education, prosecutor background, and community/legal training work.' },
      { id: 'ballotpedia-pickett', label: 'Ballotpedia profile', url: 'https://ballotpedia.org/Kandice_Pickett', type: 'secondary-analysis', confidence: 'secondary', note: 'Used for office/election spine and assumed-office date.' },
      { id: 'abc3340-whitehead-bond', label: 'ABC 33/40 Whitehead bond report', url: 'https://abc3340.com/news/local/steven-whiteheads-bond-set-at-330k-for-murder-attempted-murder-in-pinson', type: 'news-report', confidence: 'secondary', note: 'Local report describing the Aniah’s Law hearing, bond total, and reported burden finding.' },
      { id: 'alcom-whitehead-bond', label: 'AL.com Kimber Mills / Whitehead bond report', url: 'https://www.al.com/crime/2025/10/bond-set-for-27-year-old-charged-with-killing-alabama-high-school-cheerleader-at-bonfire.html', type: 'news-report', confidence: 'secondary', note: 'Local report with victim, charge, hearing, witness, and bond context.' },
      { id: 'quantumguard-pickett-seed', label: 'Quantum Guard X seed post', url: 'https://x.com/quantumguard17/status/2069526440358314434', type: 'social-seed', confidence: 'seed', note: 'Seed only. Preserved as public-claim context, not used as a verified court record.' },
    ],
  },

  {
    type: 'judge',
    slug: 'raquel-west',
    fullName: 'Jayne Raquel West',
    displayName: 'Raquel West',
    kicker: 'State criminal court judge profile',
    headline: 'Jefferson County’s 252nd District Court judge enters Case Watch after a viral 25-year aggravated-robbery sentence',
    deck:
      'The profile starts from a Loud Outside X clip, anchors West’s court role in Jefferson County’s official 252nd District Court page, and separates the reported Caden Fontenette sentence from still-missing docket and minute-order receipts.',
    lastUpdated: '2026-06-25',
    metaTitle: 'Judge Raquel West: 252nd District Court, Sentencing Record, and Source Documents',
    metaDescription:
      'Source-linked profile of Jefferson County 252nd District Court Judge Raquel West, including official court role, reported Caden Fontenette sentencing, source documents, and open docket research leads.',
    neutralSummary: {
      text:
        'Raquel West is the presiding judge of the 252nd District Court in Jefferson County, Texas. The county court page lists her as the Honorable Raquel West, Presiding, and notes she was elected in 2015. Secondary public records and local coverage connect her to the reported March 2026 sentencing of Caden James Fontenette after a guilty plea to aggravated robbery.',
      sourceIds: ['jefferson-252nd-west-official', 'ballotpedia-west', 'portarthur-fontenette-sentence'],
    },
    nutGraf: {
      text:
        'Austin flagged West because the sentencing clip reads as unusually direct public accountability from the bench. Case Watch preserves that seed but does not treat the viral clip as the record. The useful profile is a source trail: official court identity, election/term context, the reported aggravated-robbery sentence, the video/social seed, and the specific court-file gaps needed before making stronger claims about sentencing practice.',
      sourceIds: ['loudoutside-west-seed', 'jefferson-252nd-west-official', 'portarthur-fontenette-sentence'],
    },
    currentRole: {
      title: 'Presiding Judge, 252nd District Court',
      court: '252nd District Court, Jefferson County, Texas',
      jurisdiction: 'Jefferson County, Texas',
      activeFrom: '2015-01-01',
      appointedBy: 'Elected judicial office',
      confirmed: 'Elected 2014; county page lists elected 2015',
      sourceIds: ['jefferson-252nd-west-official', 'ballotpedia-west', 'txdirectory-west'],
    },
    quickFacts: [
      { label: 'Court', value: '252nd District Court, Jefferson County, Texas', sourceIds: ['jefferson-252nd-west-official'] },
      { label: 'Role', value: 'Presiding judge', sourceIds: ['jefferson-252nd-west-official'] },
      { label: 'Entered office', value: 'January 2015 / elected 2015 listed by county court page', sourceIds: ['jefferson-252nd-west-official', 'txdirectory-west'] },
      { label: 'Election context', value: 'Ballotpedia lists election to the 252nd District Court in 2014', sourceIds: ['ballotpedia-west'] },
      { label: 'Viral case seed', value: 'Caden James Fontenette aggravated-robbery sentencing clip, surfaced by Loud Outside', sourceIds: ['loudoutside-west-seed'] },
      { label: 'Reported sentence', value: '25 years in prison after guilty plea to aggravated robbery', sourceIds: ['portarthur-fontenette-sentence', 'beaumontenterprise-fontenette-sentence'] },
    ],
    stats: [
      { label: 'Court number', value: '252nd', context: 'Jefferson County district court listed on official county page', sourceIds: ['jefferson-252nd-west-official'] },
      { label: 'Reported sentence', value: '25 years', context: 'Caden James Fontenette aggravated-robbery sentence reported by local outlets', sourceIds: ['portarthur-fontenette-sentence', 'beaumontenterprise-fontenette-sentence'] },
      { label: 'Office tenure marker', value: '2015', context: 'County court page says West was elected in 2015; state directory lists entered office January 2015', sourceIds: ['jefferson-252nd-west-official', 'txdirectory-west'] },
    ],
    education: [
      { institution: 'Education record', degree: 'Open source lead', year: 'TBD', honors: 'not yet verified from official biography or bar record', sourceIds: ['jefferson-252nd-west-official'] },
    ],
    careerTimeline: [
      { start: '2014', title: 'Election to the 252nd District Court', organization: 'Jefferson County, Texas', description: 'Ballotpedia records West’s 2014 election to the Texas 252nd District Court.', sourceIds: ['ballotpedia-west'] },
      { start: '2015', title: 'Entered elected judicial office', organization: '252nd District Court', description: 'The official county court page lists West as presiding judge and says elected 2015; Texas State Directory lists entered office January 2015.', sourceIds: ['jefferson-252nd-west-official', 'txdirectory-west'] },
      { start: '2025', title: 'Courtroom conduct clip drew coverage', organization: '252nd District Court', description: 'New York Post and other outlets covered a courtroom clip in which West addressed a defendant’s inappropriate shirt, useful as public visibility context rather than a case-law source.', sourceIds: ['nypost-west-shirt'] },
      { start: '2026-03-10', title: 'Reported sentencing date in Fontenette case', organization: '252nd District Court', description: '12NewsNow reporting, surfaced through search snippets, says Fontenette was sentenced March 10, 2026 after pleading guilty to aggravated robbery.', sourceIds: ['twelve-news-fontenette-sentence'] },
      { start: '2026-03-17', title: 'Local sentencing coverage published', organization: 'Port Arthur News', description: 'Port Arthur News reported that Caden James Fontenette of Port Arthur was sentenced to 25 years in prison by Jefferson County District Judge Raquel West.', sourceIds: ['portarthur-fontenette-sentence'] },
      { start: '2026-06-25', title: 'Case Watch seed captured', organization: 'Loud Outside X post', description: 'Austin flagged the Loud Outside video clip as a candidate judge profile for the Case Watch source-linked public-record product.', sourceIds: ['loudoutside-west-seed'] },
    ],
    profileSections: [
      {
        eyebrow: 'Official role',
        title: 'West’s court identity is anchored in Jefferson County’s own 252nd District Court page.',
        body:
          'The county page identifies the 252nd District Court, lists the courthouse contact information, names Honorable Raquel West as presiding, and marks her elected status. That is the profile’s official spine.',
        sourceIds: ['jefferson-252nd-west-official'],
      },
      {
        eyebrow: 'Sentencing seed',
        title: 'The viral case is a sentencing story, not yet a docket-complete Case Watch record.',
        body:
          'Local coverage reports a 25-year prison sentence for Caden James Fontenette after a guilty plea to aggravated robbery tied to a Nederland convenience-store robbery. The missing layer is the official indictment/case number, plea paperwork, judgment, and sentencing minute order.',
        sourceIds: ['portarthur-fontenette-sentence', 'beaumontenterprise-fontenette-sentence'],
      },
      {
        eyebrow: 'Public visibility',
        title: 'The useful angle is the contrast between social-video plain talk and court-file receipts.',
        body:
          'The Loud Outside post is valuable as discovery and public-interest signal. The page keeps it as seed-only evidence while pushing readers toward official court sources and open docket tasks.',
        sourceIds: ['loudoutside-west-seed', 'jefferson-252nd-west-official'],
      },
    ],
    notableRulings: [
      {
        slug: 'fontenette-aggravated-robbery-sentencing',
        title: 'Reported Caden James Fontenette aggravated-robbery sentencing',
        date: '2026-03-10',
        court: '252nd District Court, Jefferson County, Texas',
        docket: 'Case number not yet verified',
        summary:
          'Local news reports say 18-year-old Caden James Fontenette received a 25-year prison sentence after pleading guilty to aggravated robbery tied to a 2025 Nederland convenience-store robbery. The viral courtroom clip frames West’s remarks to the defendant and family, but the official judgment and sentencing transcript/minute order are still open receipt gaps.',
        status: 'case-lead',
        documentIds: ['portarthur-fontenette-story', 'loudoutside-west-x-seed'],
        sourceIds: ['portarthur-fontenette-sentence', 'beaumontenterprise-fontenette-sentence', 'loudoutside-west-seed'],
        explainer: {
          title: 'A reported 25-year aggravated-robbery sentence becomes the first West case lead',
          caseCaption: 'State of Texas v. Caden James Fontenette',
          docket: 'Not yet verified from Jefferson County court records',
          date: '2026-03-10',
          court: '252nd District Court, Jefferson County, Texas',
          posture: 'Reported guilty plea followed by sentencing',
          challengedAction: 'There is not a challenged ruling yet in the Case Watch record. The public-interest seed is the sentencing event and courtroom remarks shown in the viral clip.',
          holding: 'Reported local coverage says West sentenced Fontenette to 25 years in prison after a guilty plea to aggravated robbery. Until the judgment, plea papers, and sentencing minute order are located, Case Watch treats the case as a verified news lead plus seed clip rather than a complete court-record profile.',
          remedy: 'Next document work should locate the official criminal case number, judgment of conviction, sentence, plea paperwork, and any transcript or courtroom video archive from the 252nd District Court.',
          whyItMatters: 'The clip is useful because it shows a judge publicly explaining consequences in plain language, but durable accountability work depends on matching that rhetoric to the official case record and comparing it with statutory range, plea posture, co-defendant outcomes, and prior record findings.',
          legalHooks: ['Texas aggravated robbery', 'guilty plea', 'sentencing judgment', 'state district court docket'],
          documentIds: ['portarthur-fontenette-story', 'loudoutside-west-x-seed'],
          sourceIds: ['portarthur-fontenette-sentence', 'loudoutside-west-seed'],
        },
      },
    ],
    publicRecord: [
      {
        title: 'Official county court page confirms role',
        summary: 'Jefferson County lists West as the presiding judge of the 252nd District Court and gives court contact/docket resources.',
        treatment: 'verified-biographical-record',
        sourceIds: ['jefferson-252nd-west-official'],
      },
      {
        title: 'Fontenette sentence is reported, but docket receipts are still missing',
        summary: 'Local outlets report the 25-year sentence after a guilty plea. The profile still needs the official case number, judgment, plea documents, and sentencing minute order/transcript.',
        treatment: 'reported-context',
        sourceIds: ['portarthur-fontenette-sentence', 'beaumontenterprise-fontenette-sentence'],
      },
      {
        title: 'Viral courtroom clip is seed-only context',
        summary: 'The Loud Outside X post and embedded video are preserved as the public discovery path, not as a substitute for court records.',
        treatment: 'open-research-lead',
        sourceIds: ['loudoutside-west-seed'],
      },
    ],
    researchLeads: [
      {
        title: 'Find the official Fontenette criminal case number and docket',
        why: 'The page should not rely on news articles for the case spine if Jefferson County court records can provide the indictment, plea, judgment, and sentence.',
        status: 'needs-docket-inventory',
        nextSource: 'Jefferson County district clerk / criminal case search / 252nd District Court docket archives',
        sourceIds: ['jefferson-252nd-west-official', 'portarthur-fontenette-sentence'],
      },
      {
        title: 'Pull sentencing judgment, plea papers, and minute order',
        why: 'Those documents establish statutory offense level, plea constraints, sentence length, credit, enhancements, and whether reasons were recorded.',
        status: 'needs-official-document',
        nextSource: 'Jefferson County court file for State v. Caden James Fontenette',
        sourceIds: ['portarthur-fontenette-sentence'],
      },
      {
        title: 'Compare co-defendant outcomes in the Nederland robbery',
        why: 'Secondary search results indicate other defendants may have been sentenced in the same robbery. Co-defendant comparison is necessary before characterizing the sentence as unusually harsh or ordinary.',
        status: 'queued',
        nextSource: 'Port Arthur News / Beaumont Enterprise follow-up stories and official dockets for co-defendants',
        sourceIds: ['beaumontenterprise-bulldog-followup'],
      },
    ],
    documents: [
      {
        id: 'jefferson-252nd-west-page',
        title: 'Jefferson County 252nd District Court official page',
        url: 'https://jeffersoncountytx.gov/distcrts/252nd.htm',
        court: '252nd District Court, Jefferson County, Texas',
        type: 'other',
        sourceIds: ['jefferson-252nd-west-official'],
      },
      {
        id: 'portarthur-fontenette-story',
        title: 'Port Arthur News report on Fontenette 25-year sentence',
        url: 'https://panews.com/2026/03/17/port-arthur-man-robbery-results-in-a-25-year-prison-sentence/',
        filed: '2026-03-17',
        type: 'other',
        sourceIds: ['portarthur-fontenette-sentence'],
      },
      {
        id: 'beaumontenterprise-fontenette-story',
        title: 'Beaumont Enterprise report on Fontenette robbery sentence',
        url: 'https://www.beaumontenterprise.com/news/article/port-arthur-teen-robbery-sentence-22083248.php',
        filed: '2026-03-18',
        type: 'other',
        sourceIds: ['beaumontenterprise-fontenette-sentence'],
      },
      {
        id: 'loudoutside-west-x-seed',
        title: 'Loud Outside X seed post with courtroom clip',
        url: 'https://x.com/loudoutside/status/2069947756320276959',
        filed: '2026-06-25',
        type: 'other',
        sourceIds: ['loudoutside-west-seed'],
      },
    ],
    sources: [
      { id: 'jefferson-252nd-west-official', label: 'Jefferson County 252nd District Court page', url: 'https://jeffersoncountytx.gov/distcrts/252nd.htm', type: 'official-bio', confidence: 'official', note: 'Official county page listing Honorable Raquel West as presiding judge and elected 2015.' },
      { id: 'ballotpedia-west', label: 'Ballotpedia Raquel West profile', url: 'https://ballotpedia.org/Raquel_West', type: 'secondary-analysis', confidence: 'secondary', note: 'Secondary election profile used for 2014 election context.' },
      { id: 'txdirectory-west', label: 'Texas State Directory Raquel West listing', url: 'https://www.txdirectory.com/online/person/?id=50294', type: 'secondary-analysis', confidence: 'secondary', note: 'Directory listing for office entry and term markers.' },
      { id: 'portarthur-fontenette-sentence', label: 'Port Arthur News Fontenette sentence report', url: 'https://panews.com/2026/03/17/port-arthur-man-robbery-results-in-a-25-year-prison-sentence/', type: 'news-report', confidence: 'secondary', note: 'Local report on the 25-year sentence.' },
      { id: 'beaumontenterprise-fontenette-sentence', label: 'Beaumont Enterprise Fontenette sentence report', url: 'https://www.beaumontenterprise.com/news/article/port-arthur-teen-robbery-sentence-22083248.php', type: 'news-report', confidence: 'secondary', note: 'Local report on the Nederland robbery sentence.' },
      { id: 'twelve-news-fontenette-sentence', label: '12NewsNow Fontenette sentence report', url: 'https://www.12newsnow.com/article/news/crime/port-arthur-teen-receives-25-year-sentence-for-nederland-robbery/502-91b93ea1-4a8d-4f1c-b172-63b187ea413d', type: 'news-report', confidence: 'secondary', note: 'Local TV report found through search snippets; direct page returned 403 in this environment.' },
      { id: 'beaumontenterprise-bulldog-followup', label: 'Beaumont Enterprise Bulldog Express robbery follow-up', url: 'https://www.beaumontenterprise.com/news/article/port-arthur-bulldog-robbery-sentence-22289428.php', type: 'news-report', confidence: 'secondary', note: 'Follow-up/co-defendant lead from search results.' },
      { id: 'nypost-west-shirt', label: 'New York Post courtroom conduct clip coverage', url: 'https://nypost.com/2025/06/18/us-news/texas-judge-scolds-man-for-wearing-worlds-best-farter-shirt-in-courtroom/', type: 'news-report', confidence: 'secondary', note: 'Public-visibility context only.' },
      { id: 'loudoutside-west-seed', label: 'Loud Outside X seed post', url: 'https://x.com/loudoutside/status/2069947756320276959', type: 'social-seed', confidence: 'seed', note: 'Seed only. Used to preserve discovery path and public framing, not as an official court record.' },
    ],
  },
];

export function getJudgeProfiles() {
  return profiles;
}

export function getJudgeProfile(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}

export function sourceLabel(profile: JudgeProfile, sourceId: string) {
  return profile.sources.find((source) => source.id === sourceId)?.label ?? sourceId;
}

export function sourceConfidenceLabel(confidence: ConfidenceLevel) {
  const labels: Record<ConfidenceLevel, string> = {
    official: 'Official',
    'primary-document': 'Primary document',
    secondary: 'Secondary',
    seed: 'Seed only',
    'open-lead': 'Open lead',
  };
  return labels[confidence];
}
