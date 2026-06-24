export type ExecutiveOrderSourceType =
  | 'white-house'
  | 'federal-register'
  | 'agency-document'
  | 'news-report'
  | 'social-seed'
  | 'secondary-analysis';

export type ExecutiveOrderConfidence = 'official' | 'primary-document' | 'secondary' | 'seed' | 'open-lead';

export type ExecutiveOrderSource = {
  id: string;
  label: string;
  url: string;
  type: ExecutiveOrderSourceType;
  confidence: ExecutiveOrderConfidence;
  note?: string;
};

export type SourceBackedText = {
  text: string;
  sourceIds: string[];
};

export type OrderSection = {
  section: string;
  title: string;
  plainEnglish: string;
  quote: string;
  sourceIds: string[];
};

export type ImplementationTask = {
  agency: string;
  action: string;
  due: string;
  status: 'not-yet-due' | 'monitoring' | 'open-lead' | 'unknown';
  whyItMatters: string;
  sourceIds: string[];
};

export type ClaimCard = {
  claim: string;
  origin: string;
  finding: 'supported-by-order-text' | 'partially-supported' | 'not-in-order-text' | 'needs-follow-up-receipt';
  analysis: string;
  nextReceipt: string;
  sourceIds: string[];
};

export type AgencyRole = {
  agency: string;
  role: string;
  sourceIds: string[];
};

export type ExecutiveOrderRecord = {
  slug: string;
  orderNumber: string;
  title: string;
  kicker: string;
  headline: string;
  deck: string;
  signedDate: string;
  president: string;
  status: 'active-monitoring' | 'historical' | 'open-lead';
  metaTitle: string;
  metaDescription: string;
  summary: SourceBackedText;
  whyItMatters: SourceBackedText;
  officialUrl: string;
  topics: string[];
  sections: OrderSection[];
  implementationTasks: ImplementationTask[];
  agencyMap: AgencyRole[];
  claims: ClaimCard[];
  sources: ExecutiveOrderSource[];
  lastUpdated: string;
};

const executiveOrders: ExecutiveOrderRecord[] = [
  {
    slug: 'eo-14411-quantum-innovation',
    orderNumber: 'EO 14411',
    title: 'Ushering in the Next Frontier of Quantum Innovation',
    kicker: 'Executive Order Watch',
    headline: 'Trump’s quantum order creates a 180-day strategy clock, a commercialization push, and a claim trail worth separating from the text',
    deck:
      'A viral X post pointed to a real White House executive order. Case Watch treats the post as a seed, then reads the official order line by line: what it actually commands, which agencies are assigned work, and which circulating claims still need receipts.',
    signedDate: '2026-06-22',
    president: 'Donald J. Trump',
    status: 'active-monitoring',
    metaTitle: 'EO 14411 Quantum Innovation: Text, Deadlines, Agencies, and Claim Tracker',
    metaDescription:
      'Source-linked executive order page for EO 14411, Ushering in the Next Frontier of Quantum Innovation, with official text summary, agency assignments, deadline tracker, and social-claim verifier.',
    officialUrl: 'https://www.whitehouse.gov/presidential-actions/2026/06/ushering-in-the-next-frontier-of-quantum-innovation/',
    summary: {
      text:
        'EO 14411 directs a whole-of-government quantum information science and technology push. The order calls for an updated National Quantum Strategy within 180 days, emphasizes commercialization and deployment, and names defense, commerce, energy, intelligence, science, and standards bodies as participants in the strategy and implementation work.',
      sourceIds: ['whitehouse-eo-14411'],
    },
    whyItMatters: {
      text:
        'The order is built around a concrete implementation clock and a broad agency map, which makes it suitable for monitoring. The useful public page is not just the order text. It is a running ledger of deadlines, agency deliverables, Federal Register records, budget/program follow-through, and claims that appear in social/news circulation.',
      sourceIds: ['whitehouse-eo-14411', 'michaelsalla-x-seed'],
    },
    topics: ['Quantum computing', 'Quantum sensing', 'Quantum networking', 'National security', 'Commercialization', 'Federal R&D'],
    sections: [
      {
        section: '1',
        title: 'Purpose',
        plainEnglish:
          'The order frames quantum information science and technology as an economic, research, and national-security priority, and says the United States needs a cohesive government approach to deployment and commercialization.',
        quote:
          'America stands at the cusp of a quantum revolution. Quantum information science and technology (QIST) will provide transformational capabilities that will drive American innovation, power economic growth, generate high-paying jobs, and bolster national security.',
        sourceIds: ['whitehouse-eo-14411'],
      },
      {
        section: '2',
        title: 'Policy',
        plainEnglish:
          'The administration states a policy goal of maintaining a strategic technical advantage and building a trusted quantum ecosystem across research, manufacturing, commercialization, and application.',
        quote:
          'It is the policy of my Administration to ensure that the United States maintains a strategic technical advantage in QIST and leads the development of a robust and trusted quantum ecosystem.',
        sourceIds: ['whitehouse-eo-14411'],
      },
      {
        section: '3',
        title: 'Updating the National Quantum Strategy',
        plainEnglish:
          'The key monitorable instruction is a 180-day deadline for the Assistant to the President for Science and Technology, with named cabinet and agency coordination, to update the National Quantum Strategy.',
        quote:
          'Within 180 days of the date of this order, the Assistant to the President for Science and Technology (APST), in coordination with the Secretary of War, the Secretary of Commerce, the Secretary of Energy, the Director of National Intelligence (DNI), and the Director of the National Science Foundation (NSF) ... shall update the National Quantum Strategy.',
        sourceIds: ['whitehouse-eo-14411'],
      },
    ],
    implementationTasks: [
      {
        agency: 'Assistant to the President for Science and Technology',
        action: 'Coordinate and update the National Quantum Strategy.',
        due: '2026-12-19 if counted 180 days from the 2026-06-22 signing date',
        status: 'monitoring',
        whyItMatters: 'The strategy update is the main deadline that can become a follow-up page or monitor.',
        sourceIds: ['whitehouse-eo-14411'],
      },
      {
        agency: 'Commerce, Energy, Defense/War, DNI, NSF',
        action: 'Coordinate on the strategy with economic, research, manufacturing, and security implications.',
        due: 'Same 180-day strategy cycle',
        status: 'monitoring',
        whyItMatters: 'These agencies are the likely source of later implementation documents and budget/program actions.',
        sourceIds: ['whitehouse-eo-14411'],
      },
      {
        agency: 'Federal Register / agency records',
        action: 'Locate publication record, agency follow-up notices, and downstream implementation documents.',
        due: 'Open research queue',
        status: 'open-lead',
        whyItMatters: 'The White House page is official, but Federal Register and agency follow-through make the tracker stronger.',
        sourceIds: ['whitehouse-eo-14411'],
      },
    ],
    agencyMap: [
      { agency: 'White House OSTP/APST', role: 'Owns the strategy-update coordination lane named in the order.', sourceIds: ['whitehouse-eo-14411'] },
      { agency: 'Department of Commerce', role: 'Commercialization, manufacturing, standards, and trusted ecosystem angle.', sourceIds: ['whitehouse-eo-14411'] },
      { agency: 'Department of Energy', role: 'National laboratory, research, and quantum technology ecosystem participant.', sourceIds: ['whitehouse-eo-14411'] },
      { agency: 'National Science Foundation', role: 'Research pipeline and QIST ecosystem participant.', sourceIds: ['whitehouse-eo-14411'] },
      { agency: 'Director of National Intelligence', role: 'National-security and adversary-risk coordination lane.', sourceIds: ['whitehouse-eo-14411'] },
    ],
    claims: [
      {
        claim: 'There is a real executive order titled “Ushering in the Next Frontier of Quantum Innovation.”',
        origin: 'X seed post and White House page',
        finding: 'supported-by-order-text',
        analysis: 'The White House page exists and contains the executive-order text under that title.',
        nextReceipt: 'Federal Register publication record and EO number cross-check.',
        sourceIds: ['whitehouse-eo-14411', 'michaelsalla-x-seed'],
      },
      {
        claim: 'The order creates a new quantum strategy deadline.',
        origin: 'Official order text',
        finding: 'supported-by-order-text',
        analysis: 'Section 3 directs the APST to update the National Quantum Strategy within 180 days in coordination with named agencies.',
        nextReceipt: 'Track release of the updated National Quantum Strategy and any agency implementation memos.',
        sourceIds: ['whitehouse-eo-14411'],
      },
      {
        claim: 'The order proves specific hidden technology disclosures or patent/secrecy claims circulating online.',
        origin: 'Social interpretation lane',
        finding: 'needs-follow-up-receipt',
        analysis: 'Those claims are not established by the excerpted White House order text alone. They need separate receipts from PTO, Federal Register, agency records, budget documents, or named program documents.',
        nextReceipt: 'Patent secrecy-order records, PTO notices, agency quantum-program documents, or direct text in Federal Register/agency materials.',
        sourceIds: ['michaelsalla-x-seed', 'whitehouse-eo-14411'],
      },
    ],
    sources: [
      {
        id: 'whitehouse-eo-14411',
        label: 'White House presidential action page',
        url: 'https://www.whitehouse.gov/presidential-actions/2026/06/ushering-in-the-next-frontier-of-quantum-innovation/',
        type: 'white-house',
        confidence: 'official',
        note: 'Official source text used for the initial static page.',
      },
      {
        id: 'michaelsalla-x-seed',
        label: 'Michael Salla X seed post',
        url: 'https://x.com/michaelsalla/status/2069390584033259707',
        type: 'social-seed',
        confidence: 'seed',
        note: 'Seed only. Used to trigger the research queue, not as the factual authority for the order.',
      },
    ],
    lastUpdated: '2026-06-24',
  },
];

export function getExecutiveOrders() {
  return executiveOrders;
}

export function getExecutiveOrder(slug: string) {
  return executiveOrders.find((order) => order.slug === slug);
}

export function executiveOrderSourceLabel(order: ExecutiveOrderRecord, sourceId: string) {
  return order.sources.find((source) => source.id === sourceId)?.label ?? sourceId;
}

export function executiveOrderConfidenceLabel(confidence: ExecutiveOrderConfidence) {
  const labels: Record<ExecutiveOrderConfidence, string> = {
    official: 'Official',
    'primary-document': 'Primary document',
    secondary: 'Secondary',
    seed: 'Seed only',
    'open-lead': 'Open lead',
  };
  return labels[confidence];
}
