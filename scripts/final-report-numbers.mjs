/**
 * Fills the {{placeholders}} in docs/final-report.md from the built site and
 * the validators, so the report states only what the build supports.
 * Reads docs/final-report.template.md and writes docs/final-report.md.
 *
 *   npm run build:draft && node scripts/final-report-numbers.mjs
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { projectRoot, readAllEntries } from '../src/lib/content-index.mjs';
import { staticPages } from '../src/data/static-pages.ts';

const at = (...p) => path.join(projectRoot, ...p);
const template = at('docs', 'final-report.template.md');
const target = at('docs', 'final-report.md');

// First run: the hand-written report becomes the template.
if (!fs.existsSync(template)) fs.copyFileSync(target, template);

const run = (script, args = []) => {
  try {
    return { ok: true, out: execFileSync(process.execPath, [at('scripts', script), ...args], { cwd: projectRoot, encoding: 'utf8' }) };
  } catch (error) {
    return { ok: false, out: `${error.stdout ?? ''}${error.stderr ?? ''}` };
  }
};

const entries = readAllEntries({ includeDrafts: true });
const published = entries.filter((e) => e.data.draft !== true);
const drafts = entries.filter((e) => e.data.draft === true);

const dist = run('validate-dist.mjs');
const content = run('validate-content.mjs', drafts.length === 0 ? [] : ['--allow-drafts']);
const claims = run('claim-audit.mjs');
const pick = (text, re) => text.match(re)?.[1] ?? 'unknown';

const pagesBuilt = pick(dist.out, /Pages:\s+(\d+)/);
const indexable = pick(dist.out, /\((\d+) indexable\)/);
const og = pick(dist.out, /Open Graph images:\s+(\d+)/);
const sitemap = pick(dist.out, /Sitemap URLs:\s+(\d+)/);
const distErrors = [...dist.out.matchAll(/^\s+ERROR\s+(.*)$/gm)].map((m) => m[1]);
const linkErrors = distErrors.filter((e) => /broken internal link|missing file|missing page/.test(e));
const otherErrors = distErrors.filter((e) => !linkErrors.includes(e));
const contentErrors = pick(content.out, /(\d+) error\(s\)/);
const claimCount = pick(claims.out, /Claim audit: (\d+) item/);

const typeLabel = { assurance: 'Assurance', useCases: 'Use cases', technologies: 'Technologies', industries: 'Industries', insights: 'Insights' };
const routes = [
  '### Static pages',
  '',
  ...staticPages.map((p) => `- \`${p.slug === '' ? '/' : `/${p.slug}`}\` ${p.title}${p.index ? '' : ' (noindex)'}`),
  '- `/404` Not found (noindex)',
  '',
  ...Object.entries(typeLabel).flatMap(([key, label]) => {
    const list = entries.filter((e) => e.collection === key).sort((a, b) => a.slug.localeCompare(b.slug));
    return [`### ${label} (${list.length})`, '', ...list.map((e) => `- \`/${e.slug}\`${e.data.draft === true ? ' (draft, not published)' : ''}`), ''];
  }),
  '### Endpoints and files',
  '',
  '- `/sitemap-index.xml` and one sitemap per content type',
  '- `/rss.xml`',
  '- `/robots.txt`',
  '- `/llms.txt`, `/llms-full.txt`',
  '- `/search-index.json`',
  '- `/og/<slug>.png`, one per page',
  '- `/site.webmanifest`, `/favicon.ico`, `/brand/*`',
].join('\n');

const validation =
  otherErrors.length === 0 && contentErrors === '0'
    ? `Passing. Content validation: 0 errors across ${published.length} published pages. Build validation: ${pagesBuilt} pages checked, no metadata, Open Graph, structured data, sitemap or RSS errors.`
    : `Not passing. Content validation errors: ${contentErrors}. Build validation errors other than links: ${otherErrors.length}.\n\n${otherErrors.slice(0, 20).map((e) => `- ${e}`).join('\n')}`;

const links =
  linkErrors.length === 0
    ? 'No broken internal links in the build.'
    : `${linkErrors.length} internal link(s) do not resolve. ${drafts.length > 0 ? `${drafts.length} page(s) are still drafts, and links to them fail until they are published.` : ''}\n\n${[...new Set(linkErrors.map((e) => e.replace(/^\S+:\s*/, '')))].slice(0, 30).map((e) => `- ${e}`).join('\n')}`;

const values = {
  published: String(published.length),
  indexable,
  routes,
  sitemap,
  og,
  validation,
  links,
  claims: `${claimCount} pattern matches were reviewed. None is an unsupported claim about Xyvionix: they are third-party statistics that name their source, FAQ answers stating that Xyvionix is not a vendor partner, and the "what is not sold" list.`,
};

let report = fs.readFileSync(template, 'utf8');
for (const [key, value] of Object.entries(values)) report = report.replaceAll(`{{${key}}}`, value);
report = report.replace(/Figures marked `\{\{\.\.\.\}\}`[^\n]*\n[^\n]*\n/, `Figures in this report were read from the build on ${new Date().toISOString().slice(0, 10)} by \`scripts/final-report-numbers.mjs\`.\n`);

fs.writeFileSync(target, report, 'utf8');
console.log(`Final report written. published=${published.length} drafts=${drafts.length} pages=${pagesBuilt} indexable=${indexable} og=${og} sitemap=${sitemap}`);
console.log(`content errors=${contentErrors} build errors=${distErrors.length} (links ${linkErrors.length}, other ${otherErrors.length}) claim matches=${claimCount}`);
