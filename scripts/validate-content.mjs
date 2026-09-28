/**
 * Content validation. Runs before every build (npm "prebuild") and fails it on
 * any error.
 *
 *   node scripts/validate-content.mjs                 all published content, strict
 *   node scripts/validate-content.mjs --only a,b      report on slugs a and b only
 *   node scripts/validate-content.mjs --allow-drafts  do not fail on links to drafts
 *
 * Checks: slug rules and reserved-route collisions, duplicate slugs, titles,
 * SEO titles, descriptions and H1s, field lengths, leftover draft markers,
 * banned wording, cluster and parent association, related links, body links,
 * source URLs and minimum substance.
 */

import { readAllEntries } from '../src/lib/content-index.mjs';
import { findRouteProblems } from '../src/lib/slug-rules.ts';
import { reservedSlugs } from '../src/data/reserved-slugs.ts';
import { staticPages } from '../src/data/static-pages.ts';
import { wordCount } from '../src/lib/text.ts';
import { bannedPhrases, findClaims, findPhrases, labourPhrases, lengthRules, minWords } from './lib/rules.mjs';

const args = process.argv.slice(2);
const onlyArg = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const only = onlyArg ? new Set(onlyArg.split(',').map((s) => s.trim()).filter(Boolean)) : null;
const allowDrafts = args.includes('--allow-drafts') || only !== null;

const CLUSTERS = new Set(['ai', 'reliability', 'cyber', 'value', 'data', 'change', 'industry', 'category']);
const RELATED_KEYS = ['assurance', 'useCases', 'technologies', 'industries', 'insights'];

const all = readAllEntries({ includeDrafts: true });
const published = all.filter((e) => e.data.draft !== true);
const bySlug = new Map(all.map((e) => [e.slug, e]));
const staticSlugs = new Set(staticPages.map((p) => p.slug));

const errors = [];
const warnings = [];
const inScope = (slug) => only === null || only.has(slug);
const error = (slug, message) => inScope(slug) && errors.push(`${slug}: ${message}`);
const warn = (slug, message) => inScope(slug) && warnings.push(`${slug}: ${message}`);

// 1. Routing
for (const problem of findRouteProblems(
  all.map((e) => ({ slug: e.slug, source: e.file })),
  reservedSlugs,
)) {
  errors.push(`${problem.slug || '(empty)'}: ${problem.message}`);
}

// 2. Uniqueness across published content and static pages
const uniqueFields = [
  ['title', 'title'],
  ['seoTitle', 'SEO title'],
  ['description', 'meta description'],
  ['h1', 'H1'],
];
for (const [field, label] of uniqueFields) {
  const seen = new Map();
  const rows = [
    ...staticPages.map((p) => ({ slug: p.slug || '(home)', value: p[field] })),
    ...published.map((e) => ({ slug: e.slug, value: e.data[field] })),
  ];
  for (const { slug, value } of rows) {
    if (typeof value !== 'string') continue;
    const key = value.trim().toLowerCase();
    if (seen.has(key)) {
      const message = `duplicate ${label} shared with "${seen.get(key)}": ${value}`;
      if (inScope(slug) || inScope(seen.get(key))) errors.push(`${slug}: ${message}`);
    } else {
      seen.set(key, slug);
    }
  }
}

// 3. Per-entry checks
for (const entry of published) {
  const { slug, data, body, collection } = entry;
  if (!inScope(slug)) continue;

  for (const [field, [min, max]] of Object.entries(lengthRules)) {
    const value = data[field];
    if (typeof value !== 'string' || value.trim() === '') {
      error(slug, `missing ${field}`);
    } else if (value.length < min || value.length > max) {
      error(slug, `${field} is ${value.length} characters, allowed ${min}-${max}`);
    }
  }

  if (typeof data.seoTitle === 'string' && !/\|\s*Xyvionix$/.test(data.seoTitle)) {
    error(slug, 'seoTitle must end with "| Xyvionix"');
  }
  if (data.h1 === data.title) warn(slug, 'h1 is identical to title');
  if (data.h1 === data.seoTitle) error(slug, 'h1 is identical to seoTitle');

  if (!CLUSTERS.has(data.cluster)) error(slug, `missing or unknown cluster "${data.cluster}"`);
  if (typeof data.parent !== 'string' || data.parent === '') {
    error(slug, 'missing parent');
  } else if (!bySlug.has(data.parent) && !staticSlugs.has(data.parent)) {
    error(slug, `parent "${data.parent}" does not exist`);
  }

  const frontmatterText = JSON.stringify(data);
  const fullText = `${frontmatterText}\n${body}`;

  if (/\bDRAFT\b/.test(fullText)) error(slug, 'contains a DRAFT placeholder');
  if (/<!--\s*BRIEF/.test(body)) error(slug, 'contains the BRIEF comment');
  if (/lorem ipsum/i.test(fullText)) error(slug, 'contains lorem ipsum');
  if (/\bTODO\b|\bTBD\b|\bXXX\b/.test(fullText)) error(slug, 'contains a TODO, TBD or XXX marker');
  if (/\]\(#\)|href="#"/.test(body)) error(slug, 'contains a placeholder link to "#"');
  if (/^#\s/m.test(body)) error(slug, 'body contains a level-one heading; the layout renders the H1');
  const crowded = body.match(/[^\n]\n(#{2,4} .*)/);
  if (crowded) error(slug, `heading has no blank line before it: "${crowded[1].slice(0, 50)}"`);
  if (/<(div|span|p|br|img|a|table|script|style)\b/i.test(body)) error(slug, 'body contains raw HTML');
  if (/—/.test(fullText)) error(slug, 'contains an em dash; use a full stop, comma or colon');

  for (const phrase of findPhrases(fullText, bannedPhrases)) error(slug, `banned phrase "${phrase}"`);
  for (const phrase of findPhrases(fullText, labourPhrases)) error(slug, `labour-selling phrase "${phrase}"`);
  for (const claim of findClaims(fullText)) warn(slug, `possible unsupported claim (${claim.note}): ${claim.excerpt}`);

  // Related links
  const related = data.related ?? {};
  let relatedCount = 0;
  for (const key of RELATED_KEYS) {
    for (const target of related[key] ?? []) {
      relatedCount += 1;
      const found = bySlug.get(target);
      if (!found) {
        error(slug, `related.${key} points to "${target}", which does not exist`);
      } else if (found.collection !== key) {
        error(slug, `related.${key} lists "${target}", which belongs to ${found.collection}`);
      } else if (found.data.draft === true && !allowDrafts) {
        error(slug, `related.${key} points to "${target}", which is still a draft`);
      }
      if (target === slug) error(slug, `related.${key} links to itself`);
    }
  }
  if (relatedCount === 0) error(slug, 'has no related pages');

  // Body links
  for (const match of body.matchAll(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g)) {
    const target = match[1].replace(/^\/+|\/+$/g, '');
    const found = bySlug.get(target);
    if (!found && !staticSlugs.has(target)) {
      error(slug, `body links to "/${target}", which does not exist`);
    } else if (found && found.data.draft === true && !allowDrafts) {
      error(slug, `body links to "/${target}", which is still a draft`);
    }
  }
  for (const match of body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    if (/xyvionix\.com/.test(match[1])) error(slug, `body uses an absolute link to this site: ${match[1]}`);
  }

  // Sources
  for (const source of data.sources ?? []) {
    if (!/^https:\/\//.test(source.url ?? '')) error(slug, `source URL is not https: ${source.url}`);
    if (!source.title) error(slug, 'source is missing a title');
  }

  // Substance
  const words = wordCount(body);
  if (words < minWords[collection]) {
    error(slug, `body has ${words} words, minimum for ${collection} is ${minWords[collection]}`);
  }
  if (collection !== 'insights') {
    if ((data.evidence ?? []).length < 3) error(slug, 'needs at least 3 evidence items');
    if ((data.thresholds ?? []).length < 3) error(slug, 'needs at least 3 threshold rows');
  }
  if ((data.faqs ?? []).length > 5) warn(slug, 'has more than 5 FAQs; keep only real buyer questions');
  if (!/\]\(\//.test(body)) warn(slug, 'body has no internal links');

  for (const field of ['publishedDate', 'modifiedDate', 'lastReviewed']) {
    if (Number.isNaN(new Date(data[field]).getTime())) error(slug, `${field} is not a valid date`);
  }
  if (new Date(data.modifiedDate) < new Date(data.publishedDate)) error(slug, 'modifiedDate is before publishedDate');
}

// 4. Report
const drafts = all.filter((e) => e.data.draft === true && inScope(e.slug));
if (only) {
  for (const slug of only) if (!bySlug.has(slug)) errors.push(`${slug}: no such content file`);
  for (const d of drafts) errors.push(`${d.slug}: still marked draft: true`);
}

const scope = only ? `${only.size} selected` : `${published.length} published, ${drafts.length} draft`;
console.log(`Content validation (${scope})`);
for (const w of warnings) console.log(`  warn   ${w}`);
for (const e of errors) console.log(`  ERROR  ${e}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);

if (errors.length > 0) process.exit(1);
