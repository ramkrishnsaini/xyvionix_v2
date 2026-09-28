/**
 * Generates the documents that must always match page metadata:
 *   docs/seo-matrix.md         one block per page, every metadata field
 *   docs/content-inventory.md  one row per page
 *   docs/cluster-map.md        the internal linking blueprint
 *
 * Run after content changes: npm run docs:generate
 * These files are outputs. Edit the page frontmatter or
 * src/data/static-pages.ts, then regenerate.
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot, readAllEntries } from '../src/lib/content-index.mjs';
import { clusters } from '../src/data/clusters.ts';
import { staticPages } from '../src/data/static-pages.ts';

const SITE = 'https://xyvionix.com';
const docs = path.join(projectRoot, 'docs');
const today = new Date().toISOString().slice(0, 10);
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const cell = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

const typeLabel = { assurance: 'Assurance', useCases: 'Use case', technologies: 'Technology', industries: 'Industry', insights: 'Insight' };
const clusterName = Object.fromEntries(clusters.map((c) => [c.key, c.name]));
clusterName.industry = 'Industries';
clusterName.category = 'Assurance Practice';

const schemaFor = (collection) =>
  ({
    assurance: 'Organization, WebSite, WebPage, Service, ImageObject, BreadcrumbList',
    insights: 'Organization, WebSite, WebPage, Article, ImageObject, BreadcrumbList',
  })[collection] ?? 'Organization, WebSite, WebPage, ImageObject, BreadcrumbList';

const entries = readAllEntries({ includeDrafts: true });
const bySlug = new Map(entries.map((e) => [e.slug, e]));
const titleOf = (slug) => bySlug.get(slug)?.data.title ?? staticPages.find((p) => p.slug === slug)?.title ?? slug;

// Outgoing links: curated related links, the parent, and links written in the body.
const outgoing = new Map();
for (const e of entries) {
  const set = new Set();
  for (const list of Object.values(e.data.related ?? {})) for (const s of list) set.add(s);
  if (e.data.parent) set.add(e.data.parent);
  for (const m of e.body.matchAll(/\]\(\/([a-z0-9-]+)[)#]/g)) set.add(m[1]);
  set.delete(e.slug);
  outgoing.set(e.slug, [...set].sort());
}
const incoming = new Map();
for (const [from, targets] of outgoing) {
  for (const to of targets) incoming.set(to, [...(incoming.get(to) ?? []), from]);
}

const pages = [
  ...staticPages.map((p) => ({
    slug: p.slug,
    url: p.slug === '' ? '/' : `/${p.slug}`,
    type: p.type === 'hub' ? 'Hub' : p.type === 'home' ? 'Home' : p.type === 'legal' ? 'Legal' : p.type === 'utility' ? 'Utility' : 'Core',
    cluster: 'Site',
    status: 'Published',
    audience: p.audience,
    intent: p.intent,
    title: p.title,
    seoTitle: p.seoTitle,
    description: p.description,
    h1: p.h1,
    ogQuestion: p.ogQuestion,
    schema: `Organization, WebSite, ${p.schemaType}, ImageObject${p.slug === '' ? '' : ', BreadcrumbList'}`,
    published: p.publishedDate,
    reviewed: p.lastReviewed,
    cadence: p.reviewCadence,
    owner: 'Xyvionix',
    index: p.index,
    secondary: [],
    related: null,
    parent: p.parent,
    priority: 'P0',
  })),
  ...entries.map((e) => ({
    slug: e.slug,
    url: `/${e.slug}`,
    type: typeLabel[e.collection],
    cluster: clusterName[e.data.cluster] ?? e.data.cluster,
    status: e.data.draft === true ? 'Draft' : 'Published',
    audience: (e.data.audience ?? []).join(', '),
    intent: e.data.intent ?? '',
    title: e.data.title,
    seoTitle: e.data.seoTitle,
    description: e.data.description,
    h1: e.data.h1,
    ogQuestion: e.data.ogQuestion ?? e.data.h1,
    schema: schemaFor(e.collection),
    published: e.data.publishedDate,
    reviewed: e.data.lastReviewed,
    cadence: e.data.reviewCadence,
    owner: e.data.owner ?? 'Xyvionix Research',
    index: e.data.noindex !== true,
    secondary: (e.data.secondary ?? []).map((k) => clusterName[k] ?? k),
    related: e.data.related,
    parent: e.data.parent,
    priority: 'P0',
  })),
];

const header = (title, note) => [
  `# ${title}`,
  '',
  `Generated ${today} by \`scripts/generate-docs.mjs\` from page metadata. Do not edit by hand: change the page frontmatter or \`src/data/static-pages.ts\` and run \`npm run docs:generate\`.`,
  '',
  note,
  '',
];

// SEO matrix
{
  const out = header(
    'SEO matrix',
    `${pages.length} pages. Canonical host ${SITE}, no trailing slash. Every page has its own title, description, H1, canonical, Open Graph and X metadata, image and structured data.`,
  );
  const order = ['Home', 'Core', 'Hub', 'Assurance', 'Use case', 'Technology', 'Industry', 'Insight', 'Legal', 'Utility'];
  for (const type of order) {
    const group = pages.filter((p) => p.type === type);
    if (group.length === 0) continue;
    out.push(`## ${type} pages (${group.length})`, '');
    for (const p of group) {
      const canonical = p.slug === '' ? `${SITE}/` : `${SITE}/${p.slug}`;
      const ogTitle = p.seoTitle.replace(/\s*\|\s*(Contact\s+)?Xyvionix\s*$/i, '');
      const out1 = (outgoing.get(p.slug) ?? []).map((s) => `/${s}`).join(', ') || 'Navigation, hub listings and footer';
      const in1 = (incoming.get(p.slug) ?? []).map((s) => `/${s}`).join(', ') || 'Navigation, hub listings and footer';
      out.push(
        `### ${p.url}`,
        '',
        '| Field | Value |',
        '|---|---|',
        `| Page type | ${p.type} |`,
        `| Cluster | ${cell(p.cluster)}${p.secondary.length ? ` (also ${p.secondary.join(', ')})` : ''} |`,
        `| Status | ${p.status} |`,
        `| Primary audience | ${cell(p.audience)} |`,
        `| Search intent | ${cell(p.intent)} |`,
        `| Primary topic | ${cell(p.title)} |`,
        `| Secondary topics | ${cell(p.secondary.join(', ') || 'None')} |`,
        `| SEO title | ${cell(p.seoTitle)} (${p.seoTitle.length}) |`,
        `| Meta description | ${cell(p.description)} (${p.description.length}) |`,
        `| H1 | ${cell(p.h1)} |`,
        `| Canonical | ${canonical} |`,
        `| OG title | ${cell(ogTitle)} |`,
        `| OG description | ${cell(p.description)} |`,
        `| OG asset | /og/${p.slug === '' ? 'home' : p.slug}.png (1200 x 630). Line: ${cell(p.ogQuestion)} |`,
        `| Schema types | ${p.schema} |`,
        `| CTA | Assess an assurance priority, to /contact |`,
        `| Incoming links | ${cell(in1)} |`,
        `| Outgoing links | ${cell(out1)} |`,
        `| Review date | Last reviewed ${iso(p.reviewed)}, every ${p.cadence} days |`,
        `| Index status | ${p.index ? 'index, follow' : 'noindex, follow'} |`,
        '',
      );
    }
  }
  fs.writeFileSync(path.join(docs, 'seo-matrix.md'), out.join('\n'), 'utf8');
}

// Content inventory
{
  const published = pages.filter((p) => p.status === 'Published').length;
  const out = header('Content inventory', `${pages.length} pages: ${published} published, ${pages.length - published} draft.`);
  out.push(
    '| URL | Page type | Cluster | Status | Priority | Search intent | SEO title | Published | Last reviewed | Review cadence (days) | Owner | Index status |',
    '|---|---|---|---|---|---|---|---|---|---|---|---|',
    ...pages.map(
      (p) =>
        `| ${p.url} | ${p.type} | ${cell(p.cluster)} | ${p.status} | ${p.priority} | ${cell(p.intent)} | ${cell(p.seoTitle)} | ${iso(p.published)} | ${iso(p.reviewed)} | ${p.cadence} | ${cell(p.owner)} | ${p.index ? 'index' : 'noindex'} |`,
    ),
    '',
  );
  fs.writeFileSync(path.join(docs, 'content-inventory.md'), out.join('\n'), 'utf8');
}

// Cluster map
{
  const out = header(
    'Cluster map',
    'The internal linking blueprint. URLs are flat; hierarchy is expressed through the parent hub, breadcrumbs, related modules and structured data. Related links are curated in frontmatter, and the linking engine fills gaps from shared cluster metadata.',
  );
  const list = (slugs) => (slugs && slugs.length ? slugs.map((s) => `[${titleOf(s)}](/${s})`).join(', ') : 'None');
  const groups = [
    ...clusters.map((c) => ({ name: c.name, match: (p) => p.related && bySlug.get(p.slug)?.data.cluster === c.key })),
    { name: 'Industries', match: (p) => p.related && bySlug.get(p.slug)?.data.cluster === 'industry' },
    { name: 'Assurance Practice', match: (p) => p.related && bySlug.get(p.slug)?.data.cluster === 'category' },
  ];
  for (const g of groups) {
    const group = pages.filter(g.match).sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title));
    if (group.length === 0) continue;
    out.push(`## ${g.name} (${group.length})`, '');
    for (const p of group) {
      out.push(
        `### ${p.title}`,
        '',
        `- URL: ${p.url}`,
        `- Page type: ${p.type}`,
        `- Primary cluster: ${p.cluster}`,
        `- Parent hub: [${titleOf(p.parent)}](/${p.parent})`,
        `- Secondary cluster: ${p.secondary.join(', ') || 'None'}`,
        `- Related services: ${list(p.related.assurance)}`,
        `- Related use cases: ${list(p.related.useCases)}`,
        `- Related technologies: ${list(p.related.technologies)}`,
        `- Related industries: ${list(p.related.industries)}`,
        `- Related insights: ${list(p.related.insights)}`,
        `- Linked from: ${(incoming.get(p.slug) ?? []).length} page(s)`,
        '',
      );
    }
  }
  fs.writeFileSync(path.join(docs, 'cluster-map.md'), out.join('\n'), 'utf8');
}

const orphans = entries.filter((e) => (incoming.get(e.slug) ?? []).length === 0).map((e) => e.slug);
console.log(`Wrote docs/seo-matrix.md, docs/content-inventory.md, docs/cluster-map.md (${pages.length} pages)`);
if (orphans.length > 0) console.log(`Pages with no incoming curated link: ${orphans.join(', ')}`);
