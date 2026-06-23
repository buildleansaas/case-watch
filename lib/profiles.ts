export type SourceType =
  | 'official-bio'
  | 'federal-judicial-center'
  | 'senate-record'
  | 'court-document'
  | 'institutional-profile'
  | 'secondary-analysis'
  | 'news-report'
  | 'social-seed';

export type Source = {
  id: string;
  label: string;
  url: string;
  type: SourceType;
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
};

export type DocumentRecord = {
  id: string;
  title: string;
  url: string;
  court?: string;
  docket?: string;
  filed?: string;
  type: 'memorandum-opinion' | 'order' | 'nomination-document' | 'other';
  sourceIds: string[];
};

export type JudgeProfile = {
  type: 'judge';
  slug: string;
  fullName: string;
  displayName: string;
  metaTitle: string;
  metaDescription: string;
  neutralSummary: SourceBackedText;
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
  education: Education[];
  careerTimeline: TimelineEvent[];
  notableRulings: NotableRuling[];
  publicRecord: PublicRecordItem[];
  documents: DocumentRecord[];
  sources: Source[];
};

const profiles: JudgeProfile[] = [
  {
    type: 'judge',
    slug: 'sparkle-l-sooknanan',
    fullName: 'Sparkle Leah Sooknanan',
    displayName: 'Sparkle L. Sooknanan',
    metaTitle: 'Judge Sparkle Sooknanan: Biography, Court, Rulings, and Source Documents',
    metaDescription:
      'Profile of Judge Sparkle L. Sooknanan of the U.S. District Court for D.C., including biography, confirmation history, notable rulings, and linked source documents.',
    neutralSummary: {
      text:
        'Sparkle L. Sooknanan is a Biden-appointed United States District Judge for the District of Columbia with prior clerkships for Justice Sonia Sotomayor, Judge Guido Calabresi, and Judge Eric Vitaliano, plus DOJ Civil Rights Division and Jones Day appellate experience.',
      sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'],
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
      { label: 'Confirmed', value: 'December 3, 2024', sourceIds: ['fjc-sooknanan', 'ballotpedia-sooknanan'] },
      { label: 'Commission', value: 'January 2, 2025', sourceIds: ['fjc-sooknanan'] },
    ],
    education: [
      { institution: 'St. Francis College', degree: 'B.S.', year: '2002', honors: 'summa cum laude', sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'] },
      { institution: 'Hofstra University', degree: 'M.B.A.', year: '2003', honors: 'with distinction', sourceIds: ['fjc-sooknanan'] },
      { institution: 'Brooklyn Law School', degree: 'J.D.', year: '2010', honors: 'summa cum laude', sourceIds: ['brooklyn-law-confirmation'] },
    ],
    careerTimeline: [
      { start: '2010', end: '2011', title: 'Law clerk', organization: 'Judge Eric N. Vitaliano, E.D.N.Y.', sourceIds: ['fjc-sooknanan'] },
      { start: '2011', end: '2012', title: 'Law clerk', organization: 'Judge Guido Calabresi, U.S. Court of Appeals for the Second Circuit', sourceIds: ['fjc-sooknanan'] },
      { start: '2012', end: '2013', title: 'Attorney', organization: 'DOJ Civil Division, Appellate Staff', sourceIds: ['fjc-sooknanan'] },
      { start: '2013', end: '2014', title: 'Law clerk', organization: 'Justice Sonia Sotomayor, U.S. Supreme Court', sourceIds: ['fjc-sooknanan'] },
      { start: '2014', end: '2021', title: 'Attorney, later partner', organization: 'Jones Day, Issues & Appeals practice', sourceIds: ['fjc-sooknanan', 'vetting-room-sooknanan'] },
      { start: '2021', end: '2023', title: 'Deputy Associate Attorney General', organization: 'U.S. Department of Justice', sourceIds: ['fjc-sooknanan'] },
      { start: '2023', end: '2024', title: 'Principal Deputy Assistant Attorney General', organization: 'DOJ Civil Rights Division', sourceIds: ['fjc-sooknanan'] },
      { start: '2025', title: 'United States District Judge', organization: 'U.S. District Court for the District of Columbia', sourceIds: ['fjc-sooknanan', 'ddc-bio-sooknanan'] },
    ],
    notableRulings: [
      {
        slug: 'league-of-women-voters-v-dhs-save',
        title: 'League of Women Voters v. DHS, SAVE voter-verification ruling',
        date: '2026-06-22',
        court: 'D.D.C.',
        docket: '25-3501 (SLS)',
        summary:
          'Judge Sooknanan vacated the 2025 modified SAVE voter-verification system after finding agency action unlawful under the Social Security Act, Privacy Act, and Administrative Procedure Act.',
        status: 'verified',
        documentIds: ['lwv-dhs-save-memorandum-opinion-2026-06-22', 'lwv-dhs-save-order-2026-06-22'],
        sourceIds: ['katu-save-opinion-pdf', 'democracy-forward-save-order-pdf'],
      },
    ],
    publicRecord: [
      {
        title: 'Jones Day resignation after 2020 election litigation',
        summary:
          'Secondary profiles report that Sooknanan left Jones Day after objecting to the firm representing Donald Trump in Pennsylvania election-related litigation.',
        sourceIds: ['vetting-room-sooknanan', 'american-prospect-sooknanan'],
      },
      {
        title: 'Puerto Rico debt work criticism',
        summary:
          'The American Prospect criticized her Jones Day work for hedge funds and bondholders in Puerto Rico debt litigation.',
        sourceIds: ['american-prospect-sooknanan'],
      },
    ],
    documents: [
      {
        id: 'lwv-dhs-save-memorandum-opinion-2026-06-22',
        title: 'Memorandum opinion, League of Women Voters v. DHS',
        url: 'https://katu.com/resources/pdf/6c100924-1f3a-4bb5-922b-482142540be5-show_public_doc.pdf',
        court: 'U.S. District Court for the District of Columbia',
        docket: '25-3501 (SLS)',
        filed: '2026-06-22',
        type: 'memorandum-opinion',
        sourceIds: ['katu-save-opinion-pdf'],
      },
      {
        id: 'lwv-dhs-save-order-2026-06-22',
        title: 'Order, League of Women Voters v. DHS',
        url: 'https://democracyforward.org/wp-content/uploads/2026/06/LWV-ordr.pdf',
        court: 'U.S. District Court for the District of Columbia',
        docket: '25-3501 (SLS)',
        filed: '2026-06-22',
        type: 'order',
        sourceIds: ['democracy-forward-save-order-pdf'],
      },
    ],
    sources: [
      { id: 'ddc-bio-sooknanan', label: 'D.D.C. official judge biography', url: 'https://www.dcd.uscourts.gov/content/district-judge-sparkle-l-sooknanan', type: 'official-bio' },
      { id: 'fjc-sooknanan', label: 'Federal Judicial Center biography', url: 'https://www.fjc.gov/history/judges/sooknanan-sparkle-leah', type: 'federal-judicial-center' },
      { id: 'senate-judiciary-nominations', label: 'Senate Judiciary nominations hearing page', url: 'https://www.judiciary.senate.gov/committee-activity/hearings/03/20/2024/nominations', type: 'senate-record' },
      { id: 'ballotpedia-sooknanan', label: 'Ballotpedia confirmation summary', url: 'https://ballotpedia.org/Sparkle_Sooknanan', type: 'secondary-analysis' },
      { id: 'brooklyn-law-confirmation', label: 'Brooklyn Law School confirmation article', url: 'https://www.brooklaw.edu/news-and-events/news/2024/12/us-senate-confirms-sparkle-l-sooknanan-10-as-us-district-court-judge/', type: 'institutional-profile' },
      { id: 'vetting-room-sooknanan', label: 'The Vetting Room profile', url: 'https://vettingroom.org/2024/03/11/sparkle-sooknanan/', type: 'secondary-analysis' },
      { id: 'american-prospect-sooknanan', label: 'American Prospect critique', url: 'https://prospect.org/2024/02/28/2024-02-28-biden-judge-nominee-vulture-funds-puerto-rican-debt/', type: 'secondary-analysis' },
      { id: 'katu-save-opinion-pdf', label: 'SAVE memorandum opinion PDF mirror', url: 'https://katu.com/resources/pdf/6c100924-1f3a-4bb5-922b-482142540be5-show_public_doc.pdf', type: 'court-document', note: 'PDF mirror with D.D.C. docket header and filed-date metadata.' },
      { id: 'democracy-forward-save-order-pdf', label: 'SAVE order PDF mirror', url: 'https://democracyforward.org/wp-content/uploads/2026/06/LWV-ordr.pdf', type: 'court-document', note: 'PDF mirror with D.D.C. docket header and filed-date metadata.' },
      { id: 'scotus-wire-seed', label: 'SCOTUS Wire X seed post', url: 'https://x.com/scotus_wire/status/2069142109769085013', type: 'social-seed' },
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
