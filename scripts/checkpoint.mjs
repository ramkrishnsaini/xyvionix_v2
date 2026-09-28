/**
 * Checkpoint. Rebuilds docs/_status.md from what is actually on disk, so a
 * resumed session can see what is done and what is left without relying on
 * chat history or agent statuses.
 *
 *   node scripts/checkpoint.mjs
 *
 * Hand-written notes (decisions, next steps, what was in progress) live in
 * docs/_next-steps.md and are included at the top of the status file.
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot, readAllEntries } from '../src/lib/content-index.mjs';
import { wordCount } from '../src/lib/text.ts';

const at = (...p) => path.join(projectRoot, ...p);
const has = (rel) => fs.existsSync(at(rel));
const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

// Content
const entries = readAllEntries({ includeDrafts: true });
const stateOf = (e) => {
  const sections = e.body.split(/^## /m).slice(1);
  const empty = sections.filter((s) => ['', 'DRAFT'].includes(s.split('\n').slice(1).join('\n').trim())).length;
  const placeholders = /DRAFT/.test(JSON.stringify(e.data)) || /\bDRAFT\b/.test(e.body) || /<!--\s*BRIEF/.test(e.body);
  if (e.data.draft !== true && !placeholders && empty === 0) return 'done';
  if (!/<!--\s*BRIEF/.test(e.body) || wordCount(e.body) > 150) return 'partial';
  return 'todo';
};
const state = new Map(entries.map((e) => [e.slug, { state: stateOf(e), words: wordCount(e.body), sections: e.body.split(/^## /m).length - 1, collection: e.collection }]));

const collections = ['assurance', 'useCases', 'technologies', 'industries', 'insights'];
const label = { assurance: 'Assurance', useCases: 'Use cases', technologies: 'Technologies', industries: 'Industries', insights: 'Insights' };
const count = (c, s) => [...state.values()].filter((v) => v.collection === c && (s === undefined || v.state === s)).length;

// Writer batches
const batches = JSON.parse(fs.readFileSync(at('docs', '_writer-batches.json'), 'utf8')).map((b) => {
  const pages = b.pages === '*' ? entries.filter((e) => e.collection === b.collection).map((e) => e.slug) : b.pages;
  const rows = pages.map((slug) => ({ slug, ...(state.get(slug) ?? { state: 'missing', words: 0, sections: 0 }) }));
  return { ...b, rows, done: rows.filter((r) => r.state === 'done').length };
});

// Files
const expectPages = ['index', 'assurance', 'how-assurance-works', 'assurance-engine', 'security-trust', 'use-cases', 'industries', 'technologies', 'insights', 'company', 'contact', 'security', 'privacy', 'terms', 'subprocessors', 'search', '404'];
const expectDocs = ['research-2026', 'information-architecture', 'seo-matrix', 'cluster-map', 'content-roadmap', 'content-inventory', 'redirects', 'ai-discovery', 'social-sharing', 'search-console', 'bing-indexnow', 'schema', 'launch-checklist', 'post-launch', 'claim-audit'];
const expectScripts = ['validate-content', 'validate-dist', 'claim-audit', 'review-report', 'generate-docs', 'build-headers', 'indexnow', 'generate-icons', 'content-status', 'content-integrity', 'build-research-doc', 'checkpoint', 'scaffold-content'];
const expectOther = ['README.md', '.env.example', 'vercel.json', 'public/robots.txt', 'public/favicon.ico', 'public/site.webmanifest', 'public/brand/xyvionix-logo-512.png', 'tests/slug-rules.test.ts', 'tests/content-routes.test.ts', 'docs/reports/claim-audit-hits.md', 'docs/reports/content-review.md', 'docs/reports/build-validation.md'];

const check = (list, toPath) => list.map((name) => ({ name, ok: has(toPath(name)) }));
const pages = check(expectPages, (n) => `src/pages/${n}.astro`);
const docs = check(expectDocs, (n) => `docs/${n}.md`);
const scripts = check(expectScripts, (n) => `scripts/${n}.mjs`);
const other = check(expectOther, (n) => n);
const tick = (ok) => (ok ? '[x]' : '[ ]');
const missing = (list) => list.filter((i) => !i.ok).map((i) => i.name);

const notesFile = at('docs', '_next-steps.md');
const notes = fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8').trim() : '_No notes recorded. Write them in docs/_next-steps.md._';

const totalDone = [...state.values()].filter((v) => v.state === 'done').length;
const pending = [...state.entries()].filter(([, v]) => v.state !== 'done');

const out = [
  '# Project status',
  '',
  `Generated ${stamp} by \`node scripts/checkpoint.mjs\` from the files on disk.`,
  'This file is the resume point. Regenerate it rather than editing it.',
  '',
  '## On resume, do this first',
  '',
  '1. `node scripts/checkpoint.mjs` to refresh this file.',
  '2. `npm run status:integrity` to find pages an interrupted writer left half-written.',
  '3. `node scripts/validate-content.mjs --allow-drafts` to validate what is published.',
  '4. Relaunch writers only for the batches listed as incomplete below. At most four at once.',
  '5. Do not trust agent "completed" or "failed" statuses. Check the files.',
  '',
  '## Notes and next steps',
  '',
  notes,
  '',
  '## Content',
  '',
  `${totalDone} of ${entries.length} pages finished.`,
  '',
  '| Collection | Done | Partial | Not started | Total |',
  '|---|---|---|---|---|',
  ...collections.map((c) => `| ${label[c]} | ${count(c, 'done')} | ${count(c, 'partial')} | ${count(c, 'todo')} | ${count(c)} |`),
  '',
  '### Pages still to finish',
  '',
  ...(pending.length === 0
    ? ['None. Every content page is finished.']
    : ['| Page | State | Words | Sections |', '|---|---|---|---|', ...pending.map(([slug, v]) => `| ${v.collection}/${slug} | ${v.state === 'partial' ? 'PARTIAL: read the file, append what is missing' : 'not started'} | ${v.words} | ${v.sections} |`)]),
  '',
  '### Writer batches',
  '',
  '| Batch | Subject | Research files | Done | Status |',
  '|---|---|---|---|---|',
  ...batches.map((b) => `| ${b.batch} | ${b.name} | ${b.research} | ${b.done} of ${b.rows.length} | ${b.done === b.rows.length ? 'complete' : `INCOMPLETE: ${b.rows.filter((r) => r.state !== 'done').map((r) => r.slug).join(', ')}`} |`),
  '',
  '## Code and assets',
  '',
  `### Pages (${pages.filter((p) => p.ok).length} of ${pages.length})`,
  '',
  ...pages.map((p) => `- ${tick(p.ok)} src/pages/${p.name}.astro`),
  '',
  `### Build scripts (${scripts.filter((p) => p.ok).length} of ${scripts.length})`,
  '',
  ...scripts.map((p) => `- ${tick(p.ok)} scripts/${p.name}.mjs`),
  '',
  `### Other files (${other.filter((p) => p.ok).length} of ${other.length})`,
  '',
  ...other.map((p) => `- ${tick(p.ok)} ${p.name}`),
  '',
  `## Documentation (${docs.filter((p) => p.ok).length} of ${docs.length})`,
  '',
  ...docs.map((p) => `- ${tick(p.ok)} docs/${p.name}.md`),
  '',
  '## Summary of what is left',
  '',
  `- Content pages: ${pending.length}`,
  `- Static pages: ${missing(pages).length ? missing(pages).join(', ') : 'none'}`,
  `- Scripts: ${missing(scripts).length ? missing(scripts).join(', ') : 'none'}`,
  `- Docs: ${missing(docs).length ? missing(docs).join(', ') : 'none'}`,
  `- Other files: ${missing(other).length ? missing(other).join(', ') : 'none'}`,
  '',
].join('\n');

fs.writeFileSync(at('docs', '_status.md'), out, 'utf8');
console.log(`Checkpoint saved to docs/_status.md`);
console.log(`  content ${totalDone}/${entries.length} | pages ${pages.filter((p) => p.ok).length}/${pages.length} | docs ${docs.filter((p) => p.ok).length}/${docs.length} | scripts ${scripts.filter((p) => p.ok).length}/${scripts.length}`);
for (const b of batches.filter((x) => x.done !== x.rows.length)) console.log(`  incomplete ${b.batch} ${b.name}: ${b.rows.length - b.done} left`);
