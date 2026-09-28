#!/usr/bin/env node
/**
 * Repeated text between the designed pages of the site. Run after `npm run build`.
 *
 *   npm run report:page-duplicates
 *
 * Compares the visible text of the built pages block by block, after removing the
 * site header, footer and link labels. Blocks under four words are ignored.
 * Exits with 1 when any block repeats, so it can gate a release.
 */

import fs from 'node:fs';

const ignore = new Set(['Assess an assurance priority']);

const nodesOf = (f) => {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  h = h.replace(/<header[\s\S]*?<\/header>/g, ' ').replace(/<footer[\s\S]*?<\/footer>/g, ' ');
  // a link's own text is the name of the page it points to, not content of this page
  h = h.replace(/<a [^>]*>[\s\S]*?<\/a>/g, ' ');
  const out = new Set();
  for (const part of h.split(/<[^>]+>/)) {
    const t = part.replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
    if (t.split(' ').length >= 4 && !ignore.has(t)) out.add(t);
  }
  return out;
};

const pages = [...new Set([
  'index',
  'assurance',
  'how-assurance-works',
  'why-assurance',
  'assurance-engine',
  'security-trust',
  'company',
  'use-cases',
  'industries',
  'technologies',
  'insights',
  'contact',
])];
const sets = Object.fromEntries(pages.map((p) => [p, nodesOf(`dist/${p}.html`)]));
let total = 0;
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const common = [...sets[pages[i]]].filter((t) => sets[pages[j]].has(t));
    if (common.length === 0) continue;
    total += common.length;
    console.log(`${pages[i]} / ${pages[j]}: ${common.length}`);
    for (const t of common.slice(0, 40)) console.log('   -', t.slice(0, 100));
  }
}
console.log('TOTAL shared blocks:', total);
if (total > 0) process.exitCode = 1;
