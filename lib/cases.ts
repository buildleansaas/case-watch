import cases from '@/data/va/seeds/cases.json';

export type Confidence = 'official-court' | 'official-registry' | 'official-jail' | 'official-prosecutor' | 'official-police' | 'news' | 'social-claim' | 'unknown';

export type CaseWatchRecord = {
  id: string;
  jurisdiction: string;
  court?: string;
  defendant: string;
  status: 'seed' | 'verified' | 'needs-review';
  originalCharges: string[];
  finalCharges: string[];
  outcomeSummary: string;
  judge?: string;
  prosecutorOffice?: string;
  flags: string[];
  sources: Array<{ label: string; url: string; confidence: Confidence }>;
};

export function getCases(): CaseWatchRecord[] {
  return cases as CaseWatchRecord[];
}
