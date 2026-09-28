# xyvionix.com

Production website for Xyvionix, a Continuous Technology Assurance company.
Static site built with Astro. Every public URL is at the root.

## Requirements

- Node 22.12 or later
- npm

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local development server |
| `npm run build` | Validate content, build to `dist/`, write host headers, validate the built site |
| `npm run build:draft` | Build without the validators, for work in progress |
| `npm run preview` | Serve `dist/` locally |
| `npm test` | Routing and content relationship tests |
| `npm run check` | Astro and TypeScript diagnostics |
| `npm run qa` | Tests, check, build and claim audit in sequence |
| `npm run checkpoint` | Rebuild `docs/_status.md` from what is on disk |
| `npm run status:content` | Which content pages are unfinished |
| `npm run status:integrity` | Pages that look half-written |
| `npm run validate:content` | Content rules only |
| `npm run validate:dist` | Built-site rules, with a report in `docs/reports/` |
| `npm run report:claims` | Search for unverified claims |
| `npm run report:review` | Pages due for review |
| `npm run docs:generate` | Regenerate the SEO matrix, inventory and cluster map |
| `npm run docs:research` | Reassemble `docs/research-2026.md` |
| `npm run icons` | Regenerate favicons and the logo from the mark |
| `npm run indexnow` | Submit changed URLs to IndexNow after a production deploy |

To preview drafts: `XYV_INCLUDE_DRAFTS=1 npm run build:draft`. Never set this in production.

## Structure

```
src/
  content/            Markdown. One file per page; the file name is the URL
    assurance/        6 hubs and 27 assurance pages
    use-cases/
    technologies/
    industries/
    insights/
  content.config.ts   Collection schemas
  data/               Site facts, navigation, clusters, static page registry
  lib/                Page index, breadcrumbs, related links, SEO, schema, OG images
  layouts/            Base, Page, Legal, and one layout per content type
  components/         assurance, clusters, editorial, evidence, forms, home,
                      layout, navigation, schema, seo, social
  pages/              Static pages, the flat [slug] route and endpoints
  scripts/            Browser scripts. All optional enhancement
  styles/             Design tokens and stylesheets from the frozen theme
scripts/              Build, validation and reporting scripts
tests/                node:test suites
docs/                 Architecture, SEO, launch and research documentation
public/               robots.txt, favicons, web manifest
```

## Adding a page

1. Add an entry to a file in `docs/manifest/`.
2. `node scripts/scaffold-content.mjs` creates the draft.
3. Write it, following `docs/content-style-guide.md`.
4. `node scripts/validate-content.mjs --only <slug>`
5. Set `draft: false`, then `npm run build`.
6. `npm run docs:generate`

The build fails on an empty, invalid, duplicate or reserved slug, on duplicate titles or
descriptions, on banned wording, on broken internal links and on missing metadata.

## Rules that must not be broken

- **Flat URLs.** No page lives under `/services/`, `/industries/`, `/blog/` or any prefix.
- **One canonical form.** `https://xyvionix.com/<slug>`, no trailing slash, no `.html`.
- **No invented facts.** Customers, certifications, offices, partners, figures and
  contact details appear only when real. Unknown company inputs stay `null` in `src/data/`.
- **No inline script or style.** The site is served with a strict Content-Security-Policy.
  Do not use `is:inline`, `define:vars` or `style=""`.
- **No labour language.** Xyvionix sells assurance, not people or hours.
- **The frozen theme is the design.** Obsidian and off-white, monochrome state marks,
  Instrument Sans and JetBrains Mono, thin rules, restrained motion.

## Configuration

Copy `.env.example` to `.env`. See `docs/launch-checklist.md` for every company input.

## Deployment

The output is static files in `dist/`. No adapter or server is required.

| Host | Configuration |
|---|---|
| Netlify, Cloudflare Pages | `dist/_headers` and `dist/_redirects`, written on every build |
| Vercel | `vercel.json`, written on every build |
| Any other | Apply the headers and redirects in `docs/redirects.md` and `scripts/lib/security-headers.mjs` |

Build command: `npm run build`. Output directory: `dist`.

## Documentation

| Document | Subject |
|---|---|
| `docs/_status.md` | Current state of the build, generated |
| `docs/information-architecture.md` | Flat URLs, hierarchy, routing safety, growth |
| `docs/content-style-guide.md` | Voice, claims, frontmatter, page structures |
| `docs/content-roadmap.md` | What was built, merged and deferred |
| `docs/seo-matrix.md` | Metadata for every page, generated |
| `docs/cluster-map.md` | Internal linking blueprint, generated |
| `docs/content-inventory.md` | Every page in one table, generated |
| `docs/schema.md` | Structured data |
| `docs/ai-discovery.md` | Crawlers, robots.txt, firewall checks, llms.txt |
| `docs/social-sharing.md` | Open Graph images and preview validation |
| `docs/search-console.md` | Google Search Console |
| `docs/bing-indexnow.md` | Bing Webmaster Tools and IndexNow |
| `docs/redirects.md` | Canonical form and redirects |
| `docs/claim-audit.md` | Unverified claims and statements needing confirmation |
| `docs/launch-checklist.md` | Everything to do before going live |
| `docs/post-launch.md` | Measurement |
| `docs/research-2026.md` | Research behind the content, with sources |
