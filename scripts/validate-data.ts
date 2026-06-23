import { getCases } from '../lib/cases';
import { getJudgeProfiles } from '../lib/profiles';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const cases = getCases();
assert(cases.length > 0, 'Expected at least one case record.');
for (const record of cases) {
  assert(record.id, 'Case record missing id.');
  assert(record.defendant, `Case ${record.id} missing defendant.`);
  assert(record.jurisdiction, `Case ${record.id} missing jurisdiction.`);
  assert(record.outcomeSummary, `Case ${record.id} missing outcome summary.`);
  assert(record.flags.length > 0, `Case ${record.id} missing flags.`);
  assert(record.sources.length > 0, `Case ${record.id} missing sources.`);
}

const profiles = getJudgeProfiles();
assert(profiles.length > 0, 'Expected at least one judge profile.');

for (const profile of profiles) {
  const sourceIds = new Set(profile.sources.map((source) => source.id));
  const documentIds = new Set(profile.documents.map((document) => document.id));

  assert(profile.slug, 'Judge profile missing slug.');
  assert(profile.fullName, `Judge profile ${profile.slug} missing fullName.`);
  assert(profile.headline.length >= 80, `Judge profile ${profile.slug} needs a newspaper-grade headline.`);
  assert(profile.deck.length >= 80, `Judge profile ${profile.slug} needs a substantive deck.`);
  assert(profile.currentRole.title, `Judge profile ${profile.slug} missing current role.`);
  assert(profile.currentRole.sourceIds.length > 0, `Judge profile ${profile.slug} current role missing sourceIds.`);
  assert(profile.quickFacts.length >= 5, `Judge profile ${profile.slug} needs at least five quick facts.`);
  assert(profile.stats.length >= 3, `Judge profile ${profile.slug} needs at least three profile stats.`);
  assert(profile.education.length >= 1, `Judge profile ${profile.slug} missing education.`);
  assert(profile.careerTimeline.length >= 6, `Judge profile ${profile.slug} needs a deeper career timeline.`);
  assert(profile.profileSections.length >= 3, `Judge profile ${profile.slug} needs profile narrative sections.`);
  assert(profile.notableRulings.length >= 1, `Judge profile ${profile.slug} missing notable ruling.`);
  assert(profile.publicRecord.length >= 3, `Judge profile ${profile.slug} needs public-record lanes.`);
  assert(profile.researchLeads.length >= 3, `Judge profile ${profile.slug} needs open research leads.`);
  assert(profile.documents.length >= 2, `Judge profile ${profile.slug} needs a document library.`);
  assert(profile.sources.length >= 5, `Judge profile ${profile.slug} needs source cards.`);
  assert(profile.sources.some((source) => source.confidence === 'official'), `Judge profile ${profile.slug} needs official sources.`);
  assert(profile.sources.some((source) => source.confidence === 'primary-document'), `Judge profile ${profile.slug} needs primary documents.`);
  assert(profile.sources.some((source) => source.confidence === 'seed'), `Judge profile ${profile.slug} should preserve seed-only source handling.`);

  const sourceBackedGroups = [
    profile.neutralSummary,
    profile.nutGraf,
    profile.currentRole,
    ...profile.quickFacts,
    ...profile.stats,
    ...profile.education,
    ...profile.careerTimeline,
    ...profile.profileSections,
    ...profile.publicRecord,
    ...profile.researchLeads,
  ];

  for (const item of sourceBackedGroups) {
    assert(item.sourceIds.length > 0, `Judge profile ${profile.slug} has an unsourced item.`);
    for (const sourceId of item.sourceIds) {
      assert(sourceIds.has(sourceId), `Judge profile ${profile.slug} references missing source ${sourceId}.`);
    }
  }

  for (const ruling of profile.notableRulings) {
    assert(ruling.explainer.legalHooks.length > 0, `Ruling ${ruling.slug} missing legal hooks.`);
    assert(ruling.explainer.holding.length > 80, `Ruling ${ruling.slug} needs a substantive holding.`);
    for (const sourceId of ruling.sourceIds.concat(ruling.explainer.sourceIds)) {
      assert(sourceIds.has(sourceId), `Ruling ${ruling.slug} references missing source ${sourceId}.`);
    }
    for (const documentId of ruling.documentIds.concat(ruling.explainer.documentIds)) {
      assert(documentIds.has(documentId), `Ruling ${ruling.slug} references missing document ${documentId}.`);
    }
  }

  for (const document of profile.documents) {
    assert(document.url.startsWith('https://'), `Document ${document.id} must use an HTTPS URL.`);
    for (const sourceId of document.sourceIds) {
      assert(sourceIds.has(sourceId), `Document ${document.id} references missing source ${sourceId}.`);
    }
  }
}

console.log(`Validated ${cases.length} case record(s) and ${profiles.length} judge profile(s).`);
