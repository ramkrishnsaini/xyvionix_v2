/**
 * Content review report. Lists every page with the date its next review is
 * due, from `lastReviewed` plus `reviewCadence` (days). Cadence defaults:
 * AI, vendor and security pages 90 days; cloud and platform pages 180 days;
 * core methodology 365 days. Any page can override its own cadence.
 *
 *   node scripts/review-report.mjs                 due within 30 days
 *   node scripts/review-report.mjs --within 60     due within 60 days
 *   node scripts/review-report.mjs --write         also write docs/reports/content-review.md
 *   node scripts/review-report.mjs --fail-overdue  exit 1 if anything is overdue (for CI)
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot, readAllEntries } from '../src/lib/content-index.mjs';
import { staticPages } from '../src/data/static-pages.ts';

const args = process.argv.slice(2);
const within = args.includes('--within') ? Number(args[args.indexOf('--within') + 1]) : 30;
const today = new Date(new Date().toISOString().slice(0, 10));
const DAY = 86_400_000;

const rows = [
  ...readAllEntries().map((e) => ({
    url: `/${e.slug}`,
    type: e.collection,
    reviewed: new Date(e.data.lastReviewed),
    cadence: Number(e.data.reviewCadence ?? 180),
    critical: e.data.freshnessCritical === true,
    owner: e.data.owner ?? 'Xyvionix Research',
  })),
  ...staticPages.map((p) => ({
    url: `/${p.slug}`,
    type: p.type,
    reviewed: new Date(p.lastReviewed),
    cadence: p.reviewCadence,
    critical: false,
    owner: 'Xyvionix',
  })),
].map((r) => {
  const due = new Date(r.reviewed.getTime() + r.cadence * DAY);
  return { ...r, due, days: Math.round((due.getTime() - today.getTime()) / DAY) };
});

rows.sort((a, b) => a.days - b.days || a.url.localeCompare(b.url));

const overdue = rows.filter((r) => r.days < 0);
const soon = rows.filter((r) => r.days >= 0 && r.days <= within);
const iso = (d) => d.toISOString().slice(0, 10);

console.log(`Content review as of ${iso(today)}: ${rows.length} pages, ${overdue.length} overdue, ${soon.length} due within ${within} days`);
for (const r of overdue) console.log(`  OVERDUE ${String(-r.days).padStart(4)}d  ${r.url}  (${r.type}, every ${r.cadence}d)`);
for (const r of soon) console.log(`  due in  ${String(r.days).padStart(4)}d  ${r.url}  (${r.type}, every ${r.cadence}d)`);

if (args.includes('--write')) {
  const table = (list) =>
    list.length === 0
      ? ['None.', '']
      : [
          '| URL | Type | Last reviewed | Cadence (days) | Due | Days | Freshness critical | Owner |',
          '|---|---|---|---|---|---|---|---|',
          ...list.map((r) => `| ${r.url} | ${r.type} | ${iso(r.reviewed)} | ${r.cadence} | ${iso(r.due)} | ${r.days} | ${r.critical ? 'yes' : 'no'} | ${r.owner} |`),
          '',
        ];
  const out = path.join(projectRoot, 'docs', 'reports');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(
    path.join(out, 'content-review.md'),
    [
      '# Content review schedule',
      '',
      `Generated ${iso(today)} by \`scripts/review-report.mjs\`. Regenerate with \`npm run report:review -- --write\`.`,
      '',
      '## Overdue',
      '',
      ...table(overdue),
      `## Due within ${within} days`,
      '',
      ...table(soon),
      '## Full schedule',
      '',
      ...table(rows),
    ].join('\n'),
    'utf8',
  );
  console.log('Wrote docs/reports/content-review.md');
}

if (args.includes('--fail-overdue') && overdue.length > 0) process.exit(1);
