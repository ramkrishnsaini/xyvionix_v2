/**
 * IndexNow submission. Run after a production deploy, never on previews.
 * Submits only URLs whose content changed since the last submission, by
 * comparing a hash of each built page with the previous run.
 *
 * IndexNow reaches Bing and the other participating engines. It does not
 * reach Google, which discovers changes through the sitemap.
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow.mjs            submit changed URLs
 *   INDEXNOW_KEY=<key> node scripts/indexnow.mjs --all      submit every indexable URL
 *   node scripts/indexnow.mjs --dry-run                     list what would be sent
 *
 * The key is generated in Bing Webmaster Tools. It is not a secret, but it is
 * not stored in the repository: set INDEXNOW_KEY in the deploy environment.
 * The build then also needs the key file at the site root, which
 * `--write-key` creates in dist/ before upload:
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow.mjs --write-key
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { projectRoot } from '../src/lib/content-index.mjs';

const HOST = 'xyvionix.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10_000;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const key = process.env.INDEXNOW_KEY ?? '';
const dist = path.join(projectRoot, 'dist');
const stateFile = path.join(projectRoot, '.indexnow-state.json');

if (!fs.existsSync(dist)) {
  console.error('dist/ not found. Build first.');
  process.exit(1);
}

if (!dryRun && !/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  console.error('INDEXNOW_KEY is not set or is not a valid key (8-128 characters: letters, digits, hyphen).');
  process.exit(1);
}

if (args.includes('--write-key')) {
  fs.writeFileSync(path.join(dist, `${key}.txt`), key, 'utf8');
  console.log(`Wrote dist/${key.slice(0, 4)}….txt`);
  process.exit(0);
}

// Canonical URLs come from the sitemap, so noindex pages are never submitted.
const urls = [];
const index = fs.readFileSync(path.join(dist, 'sitemap-index.xml'), 'utf8');
for (const loc of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const xml = fs.readFileSync(path.join(dist, loc[1].replace(`${SITE}/`, '')), 'utf8');
  for (const url of xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>/g)) urls.push(url[1]);
}

const fileFor = (url) => {
  const slug = url.replace(SITE, '').replace(/^\/+/, '');
  return path.join(dist, slug === '' ? 'index.html' : `${slug}.html`);
};

const current = {};
for (const url of urls) {
  const file = fileFor(url);
  if (!fs.existsSync(file)) continue;
  // Hash the main content only, so a change to shared navigation does not resubmit every page.
  const html = fs.readFileSync(file, 'utf8');
  const main = html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? html;
  current[url] = crypto.createHash('sha256').update(main).digest('hex');
}

const previous = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};
const changed = Object.keys(current).filter((url) => previous[url] !== current[url]);
const removed = Object.keys(previous).filter((url) => !(url in current));
const toSubmit = args.includes('--all') ? Object.keys(current) : [...changed, ...removed];

console.log(`IndexNow: ${urls.length} canonical URLs, ${changed.length} new or changed, ${removed.length} removed`);

if (toSubmit.length === 0) {
  console.log('Nothing to submit.');
  process.exit(0);
}

if (dryRun) {
  for (const url of toSubmit) console.log(`  would submit ${url}`);
  process.exit(0);
}

for (let i = 0; i < toSubmit.length; i += BATCH) {
  const urlList = toSubmit.slice(i, i + BATCH);
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList }),
  });

  if (response.status === 200 || response.status === 202) {
    console.log(`  submitted ${urlList.length} URL(s): HTTP ${response.status}`);
    continue;
  }

  const hint = {
    400: 'invalid request format',
    403: 'key not valid: check that the key file is reachable at the site root',
    422: 'URLs do not belong to the host, or the key does not match',
    429: `too many requests: retry after ${response.headers.get('retry-after') ?? 'the stated'} seconds`,
  }[response.status];
  console.error(`  IndexNow rejected the submission: HTTP ${response.status}${hint ? ` (${hint})` : ''}`);
  process.exit(1);
}

fs.writeFileSync(stateFile, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
console.log('State saved to .indexnow-state.json');
