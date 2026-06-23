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
