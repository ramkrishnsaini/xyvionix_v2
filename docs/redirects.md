# Redirects and canonical URLs

## One canonical form

| Rule | Value |
|---|---|
| Scheme | `https` |
| Host | `xyvionix.com` (no `www`) |
| Trailing slash | None, except the root `/` |
| File extension | None. `/ai-assurance`, never `/ai-assurance.html` |
| Query strings | Not part of any canonical URL |

The same form is used in four places, and the build checks that they agree:

1. `<link rel="canonical">` on every page (`src/lib/seo.ts`, `src/data/routes.ts`)
2. The sitemap (`astro.config.mjs`)
3. Internal links. `scripts/validate-dist.mjs` fails the build on an internal link with a
   trailing slash, a `.html` suffix or an absolute URL
4. Host redirects, below

Astro is configured with `trailingSlash: 'never'` and `build.format: 'file'`, so the build
writes `/ai-assurance.html` and the host serves it at `/ai-assurance`.

## Host redirects

All redirects are permanent (301 or 308) and single hop. Never chain them.

| From | To |
|---|---|
| `http://xyvionix.com/*` | `https://xyvionix.com/*` |
| `http://www.xyvionix.com/*` | `https://xyvionix.com/*` |
| `https://www.xyvionix.com/*` | `https://xyvionix.com/*` |
| `/index.html` | `/` |
| `/<slug>/` | `/<slug>` |
| `/<slug>.html` | `/<slug>` |

`scripts/build-headers.mjs` writes these after every build.

| Host | File | Notes |
|---|---|---|
| Netlify | `dist/_redirects` | Domain-level rules are honoured. Pretty URLs handle `.html` and the trailing slash |
| Cloudflare Pages | `dist/_redirects` | Path rules only. Set `www` to apex with a Bulk Redirect or a redirect rule, and enable "Always Use HTTPS". Pages removes `.html` and the trailing slash itself |
| Vercel | `vercel.json` | `cleanUrls: true` and `trailingSlash: false` are set. The `www` redirect is included |
| Other | Web server config | Apply the table above. Serve `/<slug>.html` for `/<slug>` and return 404 with `404.html` |

Add the apex domain and `www` to the host, and set the apex as primary.

## Legacy routes

This repository contained no earlier site, so no legacy routes could be detected from
code. If a previous xyvionix.com is live, do this before launch:

1. Export every URL that receives traffic or has external links, from Search Console
   (Pages and Links reports), Bing Webmaster Tools and server logs.
2. Map each one to the closest page on the new site in the table below. Map to a specific
   page, not to the home page, unless nothing closer exists.
3. Add the rules to `scripts/build-headers.mjs` (the `redirects` list) and to `vercel.json`.
4. Test every old URL after deploy: one hop, status 301, correct destination.

| Old URL | New URL | Status |
|---|---|---|
| To be completed from the live site's data | | |

Likely patterns to look for, given the flat URL policy:

| Old pattern | New URL |
|---|---|
| `/services/<name>` | `/<closest assurance page>` |
| `/industries/<name>` | `/<industry slug>` |
| `/blog/<slug>` or `/insights/<slug>` | `/<article slug>` |
| `/about` | `/company` |
| `/contact-us` | `/contact` |

## Rules

- A redirect is permanent. Keep it for at least a year, and indefinitely for URLs with
  external links.
- Never redirect to a URL that itself redirects.
- When a page is retired, redirect it to the page that absorbed its content. If nothing
  did, return 410.
- When a slug changes, add the redirect in the same change as the rename.
- Do not redirect the 404 page to the home page. A missing page must return 404.
