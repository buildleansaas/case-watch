import { getCases } from '../lib/cases';

const cases = getCases();
const requiredFlags = ['official-verification-needed'];
for (const item of cases) {
  if (!item.id || !item.jurisdiction || !item.defendant) throw new Error(`Missing required identity fields: ${item.id}`);
  if (!item.sources.length) throw new Error(`Missing sources: ${item.id}`);
  if (item.status === 'seed' && !requiredFlags.every((flag) => item.flags.includes(flag))) {
    throw new Error(`Seed case must remain clearly marked for verification: ${item.id}`);
  }
}
console.log(`Validated ${cases.length} case record(s).`);
