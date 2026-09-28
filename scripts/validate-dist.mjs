/**
 * Validates the built site in dist/. Runs after every build and fails it on
 * any error. Covers metadata, Open Graph, structured data, internal links,
 * sitemap, RSS, robots and leftover prototype artefacts.
 *
 *   node scripts/validate-dist.mjs
 *   node scripts/validate-dist.mjs --report   also write docs/reports/build-validation.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot } from '../src/lib/content-index.mjs';
import { anchors, attrs, elements, graphNodes, isIsoDate, jsonLd, links, meta, strings, stripTags, tags, walk } from './lib/html.mjs';

const SITE = 'https://xyvionix.com';
const dist = path.join(projectRoot, 'dist');
const writeReport = process.argv.includes('--report');

if (!fs.existsSync(dist)) {
  console.error('dist/ not found. Run the build first.');
  process.exit(1);
}

const errors = [];
const warnings = [];
const error = (page, message) => errors.push(`${page}: ${message}`);
const warn = (page, message) => warnings.push(`${page}: ${message}`);

const exists = (rel) => fs.existsSync(path.join(dist, rel));

/** Does a root-relative URL path resolve to a built file? */
function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (clean === '/' || clean === '') return exists('index.html');
  const rel = clean.replace(/^\/+/, '');
  return exists(rel) || exists(`${rel}.html`) || exists(path.join(rel, 'index.html'));
}

const htmlFiles = walk(dist, (f) => f.endsWith('.html')).sort();
const pages = [];

for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replaceAll('\\', '/');
  const slug = rel === 'index.html' ? '' : rel.replace(/\.html$/, '');
  const name = `/${slug}`;
  const html = fs.readFileSync(file, 'utf8');
  const is404 = slug === '404';

  const m = meta(html);
  // Only the document title: SVG figures carry their own <title> for accessibility.
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const titles = elements(head, 'title').map((t) => stripTags(t.inner));
  const h1s = elements(html, 'h1').map((h) => stripTags(h.inner));
  const canonical = links(html).find((l) => l.rel === 'canonical')?.href ?? '';
  const robots = m.byName.get('robots') ?? '';
  const indexable = !/noindex/i.test(robots);
  const description = m.byName.get('description') ?? '';

  pages.push({ name, slug, title: titles[0] ?? '', description, canonical, indexable, is404 });

  // Core metadata
  if (titles.length !== 1 || !titles[0]) error(name, `expected one non-empty <title>, found ${titles.length}`);
  if (!description) error(name, 'missing meta description');
  if (!robots) error(name, 'missing robots meta');
  if (h1s.length !== 1) error(name, `expected exactly one <h1>, found ${h1s.length}`);
  else if (!h1s[0]) error(name, 'empty <h1>');
  if (!/<html[^>]*\slang="[a-z-]+"/i.test(html)) error(name, 'missing lang attribute on <html>');
  if (/noarchive|nocache|nosnippet/i.test(robots)) error(name, `robots meta contains a directive that limits AI search use: ${robots}`);

  if (!is404) {
    const expected = slug === '' ? `${SITE}/` : `${SITE}/${slug}`;
    if (!canonical) error(name, 'missing canonical');
    else if (canonical !== expected) error(name, `canonical is ${canonical}, expected ${expected}`);
  }

  if (titles[0] && titles[0].length > 70) warn(name, `title is ${titles[0].length} characters`);
  if (description && (description.length < 70 || description.length > 175)) warn(name, `description is ${description.length} characters`);

  // Open Graph and X
  const og = (p) => m.byProperty.get(p) ?? '';
  for (const p of ['og:title', 'og:description', 'og:type', 'og:site_name', 'og:image', 'og:image:secure_url', 'og:image:width', 'og:image:height', 'og:image:alt']) {
    if (!og(p)) error(name, `missing ${p}`);
  }
  if (!is404 && !og('og:url')) error(name, 'missing og:url');
  if (og('og:url') && og('og:url') !== canonical) error(name, 'og:url differs from canonical');
  for (const n of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
    if (!m.byName.get(n)) error(name, `missing ${n}`);
  }
  for (const image of [og('og:image'), m.byName.get('twitter:image') ?? '']) {
    if (!image) continue;
    if (!image.startsWith(`${SITE}/`)) error(name, `social image is not an absolute URL on this site: ${image}`);
    else if (!exists(image.slice(SITE.length + 1))) error(name, `social image file does not exist: ${image}`);
  }
  if (og('og:image:width') && og('og:image:width') !== '1200') error(name, 'og:image:width is not 1200');
  if (og('og:image:height') && og('og:image:height') !== '630') error(name, 'og:image:height is not 630');
  if (og('og:type') === 'article') {
    for (const p of ['article:published_time', 'article:modified_time', 'article:section']) {
      if (!og(p)) error(name, `article page missing ${p}`);
      else if (p.endsWith('_time') && !isIsoDate(og(p))) error(name, `${p} is not an ISO date`);
    }
  }

  // Structured data
  const blocks = jsonLd(html);
  if (blocks.length === 0 && !is404) error(name, 'no JSON-LD');
  const nodes = [];
  for (const block of blocks) {
    if (!block.ok) {
      error(name, `JSON-LD does not parse: ${block.error}`);
      continue;
    }
    if (block.data['@context'] !== 'https://schema.org') error(name, 'JSON-LD @context is not https://schema.org');
    nodes.push(...graphNodes(block.data));
    for (const { key, value } of strings(block.data)) {
      const leaf = key.split('.').pop().replace(/\[\d+\]$/, '');
      if (['url', 'item', 'contentUrl', '@id', 'logo'].includes(leaf) && !/^https:\/\//.test(value)) {
        error(name, `JSON-LD ${key} is not an absolute https URL: ${value}`);
      }
      if (/^(date|last)/i.test(leaf) && !isIsoDate(value)) error(name, `JSON-LD ${key} is not an ISO date: ${value}`);
    }
  }
  const types = nodes.map((n) => n['@type']).flat();
  const organisations = nodes.filter((n) => n['@type'] === 'Organization');
  if (!is404) {
    if (organisations.length !== 1) error(name, `expected one Organization node, found ${organisations.length}`);
    if (!types.includes('WebSite')) error(name, 'JSON-LD has no WebSite node');
    if (!types.some((t) => ['WebPage', 'CollectionPage', 'AboutPage', 'ContactPage'].includes(t))) error(name, 'JSON-LD has no page node');
    if (slug !== '' && !types.includes('BreadcrumbList')) error(name, 'JSON-LD has no BreadcrumbList');
  }
  for (const banned of ['FAQPage', 'HowTo', 'AggregateRating', 'Review']) {
    if (types.includes(banned)) error(name, `JSON-LD contains ${banned}, which this site must not emit`);
  }
  pages[pages.length - 1].organisation = organisations[0] ? JSON.stringify(organisations[0]) : null;

  // Links
  for (const a of anchors(html)) {
    const href = a.href;
    if (href === undefined) {
      error(name, 'anchor without href');
      continue;
    }
    if (href === '#' || href === '') error(name, 'placeholder link href="#"');
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (id && !new RegExp(`\\sid="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html)) error(name, `in-page link to missing id ${href}`);
      continue;
    }
    if (href.startsWith(SITE)) error(name, `internal link written as absolute URL: ${href}`);
    if (!href.startsWith('/')) continue;
    const target = href.split('#')[0].split('?')[0];
    if (target.length > 1 && target.endsWith('/')) error(name, `internal link has a trailing slash: ${href}`);
    if (/\.html$/.test(target)) error(name, `internal link ends in .html: ${href}`);
    if (!resolves(target)) error(name, `broken internal link: ${href}`);
  }
  for (const l of links(html)) {
    if (l.href?.startsWith('/') && !resolves(l.href)) error(name, `<link> points to a missing file: ${l.href}`);
  }
  for (const s of tags(html, 'script').map(attrs)) {
    if (s.src?.startsWith('/') && !resolves(s.src)) error(name, `<script> points to a missing file: ${s.src}`);
  }

  // Images and accessibility basics
  for (const img of tags(html, 'img').map(attrs)) {
    if (img.alt === undefined) error(name, `<img> without alt: ${img.src}`);
    if (!img.width || !img.height) error(name, `<img> without width and height: ${img.src}`);
  }
  for (const svg of tags(html, 'svg').map(attrs)) {
    const labelled = svg['aria-hidden'] === 'true' || (svg.role === 'img' && (svg['aria-label'] || svg['aria-labelledby']));
    if (!labelled) error(name, 'inaccessible <svg>: needs aria-hidden or role="img" with a label');
  }
  if (!/<main\b/.test(html)) error(name, 'no <main> landmark');
  if (!/class="skip-link"/.test(html)) error(name, 'no skip link');
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((h) => Number(h[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      warn(name, `heading level jumps from h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }

  // Prototype artefacts and policy
  if (/cdn\.tailwindcss\.com/.test(html)) error(name, 'Tailwind CDN script present');
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) error(name, 'Google Fonts request present');
  if (/lorem ipsum/i.test(html)) error(name, 'lorem ipsum present');
  if (/\bDRAFT:/.test(html)) error(name, 'draft placeholder text present');
  if (/\sstyle="/.test(html)) error(name, 'inline style attribute present, which the Content-Security-Policy blocks');
  if (/<style\b/i.test(html)) error(name, 'inline <style> element present, which the Content-Security-Policy blocks');
  if (/\son[a-z]+="/.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) error(name, 'inline event handler present');
  for (const el of elements(html, 'script')) {
    const a = attrs(el.open);
    if (!a.src && (a.type ?? '').toLowerCase() !== 'application/ld+json') error(name, 'inline executable <script> present');
    if (a.src && /^https?:\/\//.test(a.src)) error(name, `third-party script: ${a.src}`);
  }
  if (Buffer.byteLength(html) > 2 * 1024 * 1024) error(name, 'HTML is larger than 2 MB');
}

// Uniqueness across indexable pages
const indexable = pages.filter((p) => p.indexable && !p.is404);
for (const field of ['title', 'description', 'canonical']) {
  const seen = new Map();
  for (const p of indexable) {
    const key = p[field].trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key)) error(p.name, `duplicate ${field}, shared with ${seen.get(key)}`);
    else seen.set(key, p.name);
  }
}

// One Organization definition everywhere
const orgs = new Set(pages.map((p) => p.organisation).filter(Boolean));
if (orgs.size > 1) errors.push(`site: ${orgs.size} different Organization definitions found across pages`);

// Sitemap
const sitemapUrls = new Set();
if (!exists('sitemap-index.xml')) {
  errors.push('sitemap: sitemap-index.xml is missing');
} else {
  const index = fs.readFileSync(path.join(dist, 'sitemap-index.xml'), 'utf8');
  for (const loc of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const file = loc[1].replace(`${SITE}/`, '');
    if (!exists(file)) {
      errors.push(`sitemap: index lists a missing file ${file}`);
      continue;
    }
    const xml = fs.readFileSync(path.join(dist, file), 'utf8');
    for (const url of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const address = url[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
      const lastmod = url[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      sitemapUrls.add(address);
      if (!lastmod) warnings.push(`sitemap: no lastmod for ${address}`);
      else if (!isIsoDate(lastmod)) errors.push(`sitemap: lastmod is not an ISO date for ${address}`);
    }
  }
  const canonicals = new Set(indexable.map((p) => p.canonical));
  for (const url of sitemapUrls) if (!canonicals.has(url)) errors.push(`sitemap: lists ${url}, which is not an indexable canonical page`);
  for (const url of canonicals) if (!sitemapUrls.has(url)) errors.push(`sitemap: is missing ${url}`);
}

// RSS
if (!exists('rss.xml')) {
  errors.push('rss: rss.xml is missing');
} else {
  const rss = fs.readFileSync(path.join(dist, 'rss.xml'), 'utf8');
  if (!/^<\?xml/.test(rss) || !/<rss\b/.test(rss) || !/<\/rss>\s*$/.test(rss)) errors.push('rss: not a well-formed RSS document');
  const items = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  for (const item of items) {
    const link = item[1].match(/<link>([^<]+)<\/link>/)?.[1] ?? '';
    if (!sitemapUrls.has(link)) errors.push(`rss: item link is not a canonical URL in the sitemap: ${link}`);
    for (const tag of ['title', 'description', 'pubDate']) if (!new RegExp(`<${tag}>`).test(item[1])) errors.push(`rss: item ${link} has no ${tag}`);
  }
  if (items.length === 0) warnings.push('rss: feed has no items');
}

// robots.txt, llms.txt, search index
if (!exists('robots.txt')) {
  errors.push('robots: robots.txt is missing');
} else {
  const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
  for (const needed of ['User-agent: *', 'User-agent: OAI-SearchBot', 'User-agent: GPTBot', 'User-agent: Googlebot', 'User-agent: bingbot', `Sitemap: ${SITE}/sitemap-index.xml`]) {
    if (!robots.includes(needed)) errors.push(`robots: missing "${needed}"`);
  }
  if (/^Disallow:\s*\/\s*$/m.test(robots)) errors.push('robots: contains "Disallow: /"');
}
for (const file of ['llms.txt', 'llms-full.txt']) {
  if (!exists(file)) {
    errors.push(`${file}: missing`);
    continue;
  }
  const text = fs.readFileSync(path.join(dist, file), 'utf8');
  for (const url of text.matchAll(/https:\/\/xyvionix\.com(\/[^\s)]*)?/g)) {
    const target = url[1] ?? '/';
    if (!resolves(target)) errors.push(`${file}: links to a missing page ${url[0]}`);
  }
}
if (!exists('search-index.json')) errors.push('search: search-index.json is missing');
else {
  try {
    const records = JSON.parse(fs.readFileSync(path.join(dist, 'search-index.json'), 'utf8'));
    for (const r of records) if (!resolves(r.u)) errors.push(`search: index entry points to a missing page ${r.u}`);
  } catch {
    errors.push('search: search-index.json does not parse');
  }
}
for (const file of ['favicon.ico', 'site.webmanifest', 'brand/xyvionix-logo-512.png', '404.html']) {
  if (!exists(file)) errors.push(`assets: ${file} is missing`);
}

// Report
const ogCount = exists('og') ? fs.readdirSync(path.join(dist, 'og')).filter((f) => f.endsWith('.png')).length : 0;
const summary = [
  `Pages: ${pages.length} (${indexable.length} indexable)`,
  `Open Graph images: ${ogCount}`,
  `Sitemap URLs: ${sitemapUrls.size}`,
  `Errors: ${errors.length}`,
  `Warnings: ${warnings.length}`,
];

console.log('Build validation');
for (const line of summary) console.log(`  ${line}`);
for (const w of warnings) console.log(`  warn   ${w}`);
for (const e of errors) console.log(`  ERROR  ${e}`);

if (writeReport) {
  const out = path.join(projectRoot, 'docs', 'reports');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(
    path.join(out, 'build-validation.md'),
    [
      '# Build validation report',
      '',
      `Generated ${new Date().toISOString()} by \`scripts/validate-dist.mjs\`.`,
      '',
      ...summary.map((s) => `- ${s}`),
      '',
      '## Errors',
      '',
      ...(errors.length ? errors.map((e) => `- ${e}`) : ['None.']),
      '',
      '## Warnings',
      '',
      ...(warnings.length ? warnings.map((w) => `- ${w}`) : ['None.']),
      '',
    ].join('\n'),
    'utf8',
  );
}

if (errors.length > 0) process.exit(1);
