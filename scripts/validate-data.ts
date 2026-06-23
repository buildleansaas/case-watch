import { getCases } from '../lib/cases';
import { getJudgeProfiles } from '../lib/profiles';

const cases = getCases();
const requiredFlags = ['official-verification-needed'];
for (const item of cases) {
  if (!item.id || !item.jurisdiction || !item.defendant) throw new Error(`Missing required identity fields: ${item.id}`);
  if (!item.sources.length) throw new Error(`Missing sources: ${item.id}`);
  if (item.status === 'seed' && !requiredFlags.every((flag) => item.flags.includes(flag))) {
    throw new Error(`Seed case must remain clearly marked for verification: ${item.id}`);
  }
}

const profiles = getJudgeProfiles();
for (const profile of profiles) {
  const sourceIds = new Set(profile.sources.map((source) => source.id));
  const referencedIds = [
    profile.neutralSummary.sourceIds,
    profile.currentRole.sourceIds,
    ...profile.quickFacts.map((fact) => fact.sourceIds),
    ...profile.education.map((item) => item.sourceIds),
    ...profile.careerTimeline.map((item) => item.sourceIds),
    ...profile.notableRulings.map((item) => item.sourceIds),
    ...profile.publicRecord.map((item) => item.sourceIds),
    ...profile.documents.map((item) => item.sourceIds),
  ].flat();

  if (!profile.slug || !profile.displayName || !profile.metaTitle || !profile.metaDescription) {
    throw new Error(`Missing required profile identity fields: ${profile.slug}`);
  }
  if (profile.sources.length < 2) throw new Error(`Profile needs at least two sources: ${profile.slug}`);
  if (profile.documents.length < 1) throw new Error(`Profile needs at least one document: ${profile.slug}`);
  if (profile.notableRulings.length < 1) throw new Error(`Profile needs at least one source-backed ruling/action: ${profile.slug}`);
  for (const id of referencedIds) {
    if (!sourceIds.has(id)) throw new Error(`Unknown source id ${id} in profile ${profile.slug}`);
  }
}

console.log(`Validated ${cases.length} case record(s) and ${profiles.length} judge profile(s).`);
