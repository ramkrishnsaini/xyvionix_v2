/**
 * Integrity check for pages an interrupted writer may have left half-written.
 * Looks at the file itself: does it end cleanly, are sections substantial,
 * is the frontmatter complete. Complements validate-content.mjs.
 *   node scripts/content-integrity.mjs
 */
import { readAllEntries } from '../src/lib/content-index.mjs';
import { wordCount } from '../src/lib/text.ts';

const expectedSections = { assurance: 5, useCases: 5, technologies: 4, industries: 5, insights: 3 };
let problems = 0;
const touched = readAllEntries({ includeDrafts: true }).filter((e) => !/<!--\s*BRIEF/.test(e.body) || e.data.draft !== true);

for (const e of touched) {
  const issues = [];
  const body = e.body.trim();
  const lastLine = body.split('\n').filter((l) => l.trim() !== '').pop() ?? '';
  const sections = body.split(/^## /m).slice(1);

  if (e.data.draft === true) issues.push('written but still draft: true');
  if (/<!--\s*BRIEF/.test(body)) issues.push('BRIEF comment still present');
  if (!/[.!?)\]:*|`"”]$/.test(lastLine.trim())) issues.push(`ends without closing punctuation: "...${lastLine.trim().slice(-50)}"`);
  if (sections.length < expectedSections[e.collection]) issues.push(`only ${sections.length} sections`);

  sections.forEach((s) => {
    const [heading, ...rest] = s.split('\n');
    const words = wordCount(rest.join('\n'));
    if (words < 40) issues.push(`thin section "${heading.trim()}" (${words} words)`);
  });

  for (const field of ['h1', 'seoTitle', 'description', 'summary', 'lede']) {
    if (typeof e.data[field] !== 'string' || /DRAFT/.test(e.data[field])) issues.push(`frontmatter ${field} not written`);
  }
  if (e.collection !== 'insights') {
    if ((e.data.evidence ?? []).length === 0) issues.push('no evidence items');
    if ((e.data.thresholds ?? []).length === 0) issues.push('no threshold rows');
  }
  if ((e.data.sources ?? []).length === 0) issues.push('no sources listed');

  if (issues.length > 0) {
    problems += 1;
    console.log(`${e.collection}/${e.slug}`);
    for (const i of issues) console.log(`   - ${i}`);
  }
}
console.log(`\nChecked ${touched.length} written pages: ${problems} with problems.`);
