/**
 * Duplication check. Compares every pair of published pages by shared
 * five-word phrases and by shared sentences, and lists the closest pairs.
 * Pages about similar subjects must differ in substance, not only in nouns,
 * so vendor and product names are masked before comparison.
 *
 *   node scripts/similarity.mjs                top 25 pairs
 *   node scripts/similarity.mjs --top 50
 *   node scripts/similarity.mjs --write        also write docs/reports/similarity.md
 *   node scripts/similarity.mjs --fail 0.2     exit 1 if any pair is at or above 0.2
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot, readAllEntries } from '../src/lib/content-index.mjs';

const args = process.argv.slice(2);
const num = (flag, fallback) => (args.includes(flag) ? Number(args[args.indexOf(flag) + 1]) : fallback);
const top = num('--top', 25);
const failAt = num('--fail', null);

// Names that differ between sibling pages. Masking them exposes copy that was
// written once and had the vendor swapped.
const NAMES =
  /\b(aws|amazon|azure|microsoft|google cloud|google|gcp|eks|aks|gke|bedrock|foundry|gemini|vertex|entra( id)?|iam|databricks|snowflake|kafka|terraform|opentofu|kubernetes|financial services|insurance|insurers?|healthcare|banks?|saas)\b/gi;

const clean = (markdown) =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s.*$/gm, ' ')
    .replace(/\|/g, ' ')
    .replace(NAMES, 'NAME')
    .toLowerCase();

const words = (text) => text.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

const shingles = (tokens, size = 5) => {
  const set = new Set();
  for (let i = 0; i + size <= tokens.length; i += 1) set.add(tokens.slice(i, i + size).join(' '));
  return set;
};

const sentences = (text) =>
  new Set(
    text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim())
      .filter((s) => s.split(' ').length >= 8),
  );

const pages = readAllEntries().map((e) => {
  const text = clean(e.body);
  return { slug: e.slug, collection: e.collection, shingles: shingles(words(text)), sentences: sentences(text) };
});

const overlap = (a, b) => {
  let shared = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const item of small) if (large.has(item)) shared += 1;
  return { shared, jaccard: shared / (a.size + b.size - shared || 1), contained: shared / (small.size || 1) };
};

const pairs = [];
for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    const phrase = overlap(pages[i].shingles, pages[j].shingles);
    const sentence = overlap(pages[i].sentences, pages[j].sentences);
    pairs.push({ a: pages[i].slug, b: pages[j].slug, score: phrase.jaccard, contained: phrase.contained, sentences: sentence.shared });
  }
}
pairs.sort((x, y) => y.score - x.score);

const rating = (p) => (p.score >= 0.2 || p.sentences >= 6 ? 'REWRITE' : p.score >= 0.1 || p.sentences >= 3 ? 'review' : 'distinct');
const shown = pairs.slice(0, top);
const worst = pairs[0];

console.log(`Similarity across ${pages.length} published pages, ${pairs.length} pairs. Names masked.`);
console.log('score  shared-sentences  rating    pair');
for (const p of shown) console.log(`${p.score.toFixed(3)}  ${String(p.sentences).padStart(16)}  ${rating(p).padEnd(8)}  ${p.a}  <>  ${p.b}`);
console.log(`\nREWRITE: ${pairs.filter((p) => rating(p) === 'REWRITE').length}   review: ${pairs.filter((p) => rating(p) === 'review').length}`);

if (args.includes('--write')) {
  const out = path.join(projectRoot, 'docs', 'reports');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(
    path.join(out, 'similarity.md'),
    [
      '# Duplication report',
      '',
      `Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/similarity.mjs\`. ${pages.length} published pages, ${pairs.length} pairs.`,
      '',
      'Score is the share of five-word phrases two pages have in common, after vendor, product and sector names are masked. Shared sentences counts identical sentences of eight words or more.',
      '',
      '| Rating | Meaning |',
      '|---|---|',
      '| distinct | Below 0.10 and fewer than 3 shared sentences |',
      '| review | 0.10 or above, or 3 to 5 shared sentences. Read both pages |',
      '| REWRITE | 0.20 or above, or 6 or more shared sentences |',
      '',
      `Closest pair: ${worst.a} and ${worst.b}, score ${worst.score.toFixed(3)}.`,
      '',
      '| Score | Shared sentences | Rating | Page | Page |',
      '|---|---|---|---|---|',
      ...shown.map((p) => `| ${p.score.toFixed(3)} | ${p.sentences} | ${rating(p)} | /${p.a} | /${p.b} |`),
      '',
    ].join('\n'),
    'utf8',
  );
  console.log('Wrote docs/reports/similarity.md');
}

if (failAt !== null && pairs.some((p) => p.score >= failAt)) process.exit(1);
