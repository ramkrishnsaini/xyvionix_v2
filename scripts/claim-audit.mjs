/**
 * Claim audit. Searches every source of published copy for statements the
 * company has not verified: customers, certifications, savings, response
 * times, operating hours, offices, partnerships, team size, awards.
 *
 * Every hit needs a human decision. The script reports; it never fails the
 * build, because a hit is often a legitimate technical phrase.
 *
 *   node scripts/claim-audit.mjs            print to console
 *   node scripts/claim-audit.mjs --write    also write docs/reports/claim-audit-hits.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot, readAllEntries } from '../src/lib/content-index.mjs';
import { findClaims, findPhrases, labourPhrases } from './lib/rules.mjs';
import { walk } from './lib/html.mjs';

const write = process.argv.includes('--write');
const hits = [];

const record = (source, text) => {
  for (const claim of findClaims(text)) hits.push({ source, kind: claim.note, excerpt: claim.excerpt });
  for (const phrase of findPhrases(text, labourPhrases)) hits.push({ source, kind: 'Labour-selling vocabulary', excerpt: phrase });
  for (const line of text.split('\n')) {
    if (/\b\d{1,3}(\.\d+)?\s?(%|per cent|percent)/.test(line) && !/illustrat/i.test(line)) {
      hits.push({ source, kind: 'Percentage figure: confirm it is sourced', excerpt: line.trim().slice(0, 160) });
    }
  }
};

// Published content
for (const entry of readAllEntries()) {
  const frontmatter = ['h1', 'seoTitle', 'description', 'summary', 'lede']
    .map((f) => entry.data[f])
    .concat((entry.data.faqs ?? []).flatMap((f) => [f.q, f.a]))
    .concat((entry.data.evidence ?? []).map((e) => e.detail))
    .filter(Boolean)
    .join('\n');
  record(entry.file, `${frontmatter}\n${entry.body}`);
}

// Static pages, components and data
const roots = ['src/pages', 'src/components', 'src/data', 'src/layouts'].map((d) => path.join(projectRoot, d));
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root, (f) => /\.(astro|ts)$/.test(f))) {
    const source = path.relative(projectRoot, file).replaceAll('\\', '/');
    // Only copy is audited: stylesheets and scripts hold values such as "width: 100%", not claims.
    const text = fs
      .readFileSync(file, 'utf8')
      .replace(/<style\b[\s\S]*?<\/style>/gi, '')
      .replace(/<script\b[\s\S]*?<\/script>/gi, '')
      .split('\n')
      .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
      .join('\n');
    record(source, text);
  }
}

// Percentages in content are reported once per line, so drop duplicates.
const unique = [...new Map(hits.map((h) => [`${h.source}|${h.kind}|${h.excerpt}`, h])).values()].sort(
  (a, b) => a.source.localeCompare(b.source) || a.kind.localeCompare(b.kind),
);

console.log(`Claim audit: ${unique.length} item(s) to review`);
for (const h of unique) console.log(`  ${h.source}\n     ${h.kind}: ${h.excerpt}`);

if (write) {
  const out = path.join(projectRoot, 'docs', 'reports');
  fs.mkdirSync(out, { recursive: true });
  const bySource = new Map();
  for (const h of unique) bySource.set(h.source, [...(bySource.get(h.source) ?? []), h]);
  const lines = [
    '# Claim audit: items to review',
    '',
    `Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/claim-audit.mjs\`. ${unique.length} item(s).`,
    '',
    'Each item is a pattern match, not a verdict. For each one, decide: sourced fact (keep), technical phrase (keep), or unverified claim about Xyvionix (rewrite).',
    '',
  ];
  for (const [source, items] of bySource) {
    lines.push(`## ${source}`, '');
    for (const item of items) lines.push(`- **${item.kind}.** ${item.excerpt.replace(/\|/g, '\\|')}`);
    lines.push('');
  }
  fs.writeFileSync(path.join(out, 'claim-audit-hits.md'), lines.join('\n'), 'utf8');
  console.log('Wrote docs/reports/claim-audit-hits.md');
}
