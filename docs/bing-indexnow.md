# Bing Webmaster Tools and IndexNow

Source: `docs/research/02-ai-crawlers-bing-indexnow.md`, researched 2026-09-27.

Bing matters beyond Bing. Its index also feeds Copilot and is used for grounding by other
AI products, so indexing in Bing is part of AI discovery.

## Bing Webmaster Tools

| Step | Action |
|---|---|
| 1 | Sign in at bing.com/webmasters and add `https://xyvionix.com` |
| 2 | Verify by DNS CNAME record, which survives redeploys. The alternative is `BingSiteAuth.xml` placed in `public/` |
| 3 | Submit `https://xyvionix.com/sitemap-index.xml` |
| 4 | Use URL Inspection on the home page and the assurance hubs |
| 5 | Generate an IndexNow key, under IndexNow in the tools |

Importing the site from Google Search Console is offered and is the fastest route once
Search Console is verified.

### Rules

- Never emit `noarchive` or `nocache`. Bing documents that both limit use in Copilot.
  `scripts/validate-dist.mjs` fails the build if either appears.
- `bingbot` is allowed in `robots.txt`. Verify the crawler by reverse DNS
  (`*.search.msn.com`) or Bing's published IP list, not by user agent alone.

### Reports to review monthly

| Report | What to look for |
|---|---|
| Search Performance | Impressions, clicks, queries and pages |
| AI Performance | Citations and appearances in Copilot and AI answers |
| Site Explorer | Indexed pages against the sitemap count |
| Crawl information | Errors and blocked URLs |
| IndexNow | Submitted URLs and their status |

## IndexNow

IndexNow tells participating search engines that a URL has changed, so they can recrawl
it promptly. It reaches Bing and the other participating engines. It does not reach
Google, which discovers changes through the sitemap.

### One-time setup

1. Generate a key in Bing Webmaster Tools. It is 8 to 128 characters of letters, digits
   and hyphens.
2. Store it as `INDEXNOW_KEY` in the deploy environment. The key is not a secret, since
   it is served publicly, but it is kept out of the repository so it can be rotated.
3. The key must be served at `https://xyvionix.com/<key>.txt`, containing the key.

### On every production deploy

```
npm run build
INDEXNOW_KEY=<key> node scripts/indexnow.mjs --write-key   # writes dist/<key>.txt
# upload dist/ to the host
INDEXNOW_KEY=<key> node scripts/indexnow.mjs               # submits changed URLs
```

On Windows PowerShell: `$env:INDEXNOW_KEY = '<key>'; node scripts/indexnow.mjs`

### What the script does

| Behaviour | Detail |
|---|---|
| Source of URLs | The built sitemap, so only canonical, indexable pages are submitted |
| Change detection | Hashes the main content of each page and compares with `.indexnow-state.json` from the previous run. A change to shared navigation does not resubmit every page |
| What is sent | New, changed and removed URLs |
| Endpoint | `POST https://api.indexnow.org/indexnow` with `host`, `key`, `keyLocation`, `urlList` |
| Batch size | Up to 10,000 URLs per request |
| Success | HTTP 200 or 202 |
| Failure | 400 invalid format, 403 key not valid, 422 URLs do not match the host or key, 429 too many requests. The script stops and reports the reason |

Options:

| Command | Use |
|---|---|
| `node scripts/indexnow.mjs --dry-run` | List what would be sent. Needs no key |
| `node scripts/indexnow.mjs --all` | Submit every indexable URL. Use once at launch |
| `node scripts/indexnow.mjs --write-key` | Write the key file into `dist/` |

### Rules

- Run it for production deploys only, never for preview or branch deploys.
- Submit a diff per deploy, not the whole site, after the first launch submission.
- Persist `.indexnow-state.json` between deploys: commit it, or store it as a build cache
  or artefact. Without it every deploy looks like a first run.
- On 429, wait for the period given in the `Retry-After` header.

### When to use it

| Event | Submit |
|---|---|
| A new insight is published | Yes |
| An assurance, technology or industry page changes materially | Yes |
| A fact or date is corrected | Yes |
| A page is removed or redirected | Yes, so the old URL is recrawled |
| A style or navigation change with no content change | No. The script skips these |

## CI example

```yaml
# After the production deploy succeeds
- name: Notify IndexNow
  if: github.ref == 'refs/heads/main'
  env:
    INDEXNOW_KEY: ${{ secrets.INDEXNOW_KEY }}
  run: node scripts/indexnow.mjs
```
