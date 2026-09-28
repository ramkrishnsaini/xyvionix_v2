/**
 * Creates one draft Markdown file per entry in docs/manifest/*.json.
 * Existing files are never overwritten, so this is safe to re-run after
 * adding entries to the manifest.
 *
 *   node scripts/scaffold-content.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { contentRoot, projectRoot } from '../src/lib/content-index.mjs';

const manifestDir = path.join(projectRoot, 'docs', 'manifest');
const TODAY = '2026-09-27';

/** Manifest file prefix -> content folder. */
const targets = [
  { prefix: 'assurance', dir: 'assurance' },
  { prefix: 'use-cases', dir: 'use-cases' },
  { prefix: 'technologies', dir: 'technologies' },
  { prefix: 'industries', dir: 'industries' },
  { prefix: 'insights', dir: 'insights' },
];

const pad = (text, min) => (text.length >= min ? text : `${text} ${'This draft text is replaced when the page is written. '.repeat(3)}`.slice(0, Math.max(min + 10, text.length)));
const clip = (text, max) => (text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`);

const skeletons = {
  assurance: [
    'Why assurance is lost',
    'What is at stake',
    'What Xyvionix assures',
    'Common failure modes',
    'Corrective ownership',
    'Verified closure',
    'Technology and industry context',
  ],
  'use-cases': [
    'What changed',
    'The business outcome at risk',
    'What must be proven',
    'What causes assurance to be lost',
    'Corrective action',
    'What verified closure looks like',
    'What to do next',
  ],
  technologies: [
    'The assurance problem on this platform',
    'What expires, and on whose calendar',
    'What must be continuously re-proven',
    'Common failure modes',
    'Corrective ownership and verified closure',
  ],
  industries: [
    'Operational risk in this sector',
    'AI assurance',
    'Reliability and recovery',
    'Identity and security exposure',
    'Data assurance',
    'Regulatory and audit context',
    'Technology economics and change',
  ],
  insights: ['The pattern', 'Why the evidence expires', 'A model for holding it', 'What this means for assurance'],
};

function frontmatterFor(item, dir) {
  const intent = item.intent ?? item.brief;
  const fm = {
    title: item.title,
    h1: pad(`DRAFT: ${item.title}`, 10),
    seoTitle: clip(pad(`DRAFT: ${item.title} | Xyvionix`, 20), 70),
    description: clip(pad(`DRAFT: ${intent}`, 90), 170),
    summary: clip(pad(`DRAFT: ${item.brief}`, 60), 260),
    lede: clip(pad(`DRAFT: ${item.brief}`, 80), 520),
  };

  if (item.ogQuestion) fm.ogQuestion = item.ogQuestion;
  if (dir === 'assurance') {
    fm.kind = item.kind;
    if (item.tier) fm.tier = item.tier;
  }
  if (dir === 'technologies') fm.group = item.group;
  if (dir === 'industries') {
    fm.kind = item.kind;
    if (item.industry) fm.industry = item.industry;
  }
  if (dir === 'insights') {
    fm.category = item.category;
    fm.author = 'Xyvionix Research';
    fm.featured = false;
  }

  return {
    ...fm,
    cluster: item.cluster,
    secondary: item.secondary ?? [],
    parent: item.parent,
    state: item.state,
    audience: item.audience ?? [],
    intent: intent,
    related: {
      assurance: item.related?.assurance ?? [],
      useCases: item.related?.useCases ?? [],
      technologies: item.related?.technologies ?? [],
      industries: item.related?.industries ?? [],
      insights: item.related?.insights ?? [],
    },
    evidence: [],
    thresholds: [],
    faqs: [],
    sources: [],
    publishedDate: TODAY,
    modifiedDate: TODAY,
    lastReviewed: TODAY,
    reviewCadence: item.cadence ?? 180,
    freshnessCritical: item.fresh === true,
    owner: 'Xyvionix Research',
    draft: true,
    noindex: false,
  };
}

let created = 0;
let skipped = 0;

for (const { prefix, dir } of targets) {
  const folder = path.join(contentRoot, dir);
  fs.mkdirSync(folder, { recursive: true });

  const files = fs.readdirSync(manifestDir).filter((f) => f.startsWith(prefix) && f.endsWith('.json')).sort();

  for (const file of files) {
    const items = JSON.parse(fs.readFileSync(path.join(manifestDir, file), 'utf8'));
    for (const item of items) {
      const target = path.join(folder, `${item.slug}.md`);
      if (fs.existsSync(target)) {
        skipped += 1;
        continue;
      }
      const body = [
        `<!-- BRIEF: ${item.brief} -->`,
        '',
        ...skeletons[dir].flatMap((heading) => [`## ${heading}`, '', 'DRAFT', '']),
      ].join('\n');
      fs.writeFileSync(target, matter.stringify(body, frontmatterFor(item, dir)), 'utf8');
      created += 1;
    }
  }
}

console.log(`Content scaffold: ${created} created, ${skipped} already present.`);
