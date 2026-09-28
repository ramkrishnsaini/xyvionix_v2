# Information architecture

## Principle

Every public URL is at the root: `https://xyvionix.com/<slug>`. There is no
`/services/`, `/industries/`, `/use-cases/`, `/technologies/`, `/insights/` or `/blog/`
prefix on any page.

Flat URLs do not mean flat architecture. Hierarchy is carried by six mechanisms, none of
which depends on the URL:

| Mechanism | Where it lives |
|---|---|
| Parent and cluster metadata | `parent`, `cluster`, `secondary` in each page's frontmatter |
| Breadcrumbs | `src/lib/breadcrumbs.ts`, rendered by `Breadcrumbs.astro` |
| Hub pages | `/assurance`, `/use-cases`, `/industries`, `/technologies`, `/insights`, and six assurance hubs |
| Related-content modules | `src/lib/related.ts`, rendered by `RelatedContent.astro` |
| Navigation | `src/data/navigation.ts` |
| Structured data | `BreadcrumbList` and `isPartOf` in every page graph, `src/lib/schema.ts` |

## Page types

| Type | Count at launch | Source | Layout |
|---|---|---|---|
| Home | 1 | `src/pages/index.astro` | `BaseLayout` |
| Core method and trust | 3 | `src/pages/*.astro` | `PageLayout` |
| Hubs | 5 | `src/pages/*.astro` | `PageLayout` |
| Company and contact | 2 | `src/pages/*.astro` | `PageLayout` |
| Legal and policy | 4 | `src/pages/*.astro` | `LegalLayout` |
| Utility (search, 404) | 2 | `src/pages/*.astro` | `PageLayout`, `BaseLayout` |
| Assurance hubs | 6 | `src/content/assurance/` | `AssuranceLayout` |
| Assurance pages | 27 | `src/content/assurance/` | `ClusterPageLayout` |
| Use cases | 18 | `src/content/use-cases/` | `UseCaseLayout` |
| Technologies | 16 | `src/content/technologies/` | `TechnologyLayout` |
| Industries | 8 | `src/content/industries/` | `IndustryLayout` |
| Insights | 22 | `src/content/insights/` | `InsightLayout` |

Total: 114 pages, of which 112 are indexable (search and 404 are not).

## Site map

```
/                                   Home
├─ /assurance                       Assurance overview (hub)
│  ├─ /how-assurance-works          Method
│  ├─ /assurance-engine             Design of the engine
│  ├─ /ai-assurance                 PRIMARY  9 child pages
│  ├─ /production-reliability-assurance   PRIMARY  6 child pages
│  ├─ /cyber-exposure-assurance     PRIMARY  5 child pages
│  ├─ /technology-value-assurance   expansion  2 child pages
│  ├─ /data-assurance               expansion  3 child pages
│  └─ /change-assurance             expansion  2 child pages
├─ /use-cases                       hub  18 pages, grouped by what changed
├─ /industries                      hub
│  ├─ /financial-services           + /financial-services-ai-assurance
│  ├─ /insurance                    + /insurance-claims-ai-assurance
│  ├─ /healthcare                   + /healthcare-ai-assurance
│  └─ /software-technology          + /saas-production-reliability
├─ /technologies                    hub  16 pages in 7 groups
├─ /insights                        hub  22 articles in 7 themes
├─ /company
│  ├─ /security-trust
│  │  ├─ /security                  vulnerability disclosure policy
│  │  └─ /subprocessors
│  ├─ /privacy
│  └─ /terms
├─ /contact
└─ /search                          noindex
```

The tree above is conceptual. Every node is served from the root.

## Breadcrumb rule

Trails are capped at three levels: Home, the nearest parent, the page.

| Page | Trail |
|---|---|
| `/ai-assurance` | Home > Assurance > AI Assurance |
| `/ai-agent-assurance` | Home > AI Assurance > AI Agent Assurance |
| `/financial-services` | Home > Industries > Financial Services |
| `/financial-services-ai-assurance` | Home > Financial Services > Financial Services AI Assurance |
| `/ai-agent-with-write-access` | Home > Use Cases > AI Agent With Write Access |
| `/why-ai-evaluation-fails-after-launch` | Home > Insights > article title |

## Routing safety

`src/pages/[slug].astro` serves every content entry. Before any path is returned,
`assertRoutes()` in `src/lib/slug-rules.ts` checks every slug and throws, which fails the
build, on:

- an empty slug
- an invalid slug (anything other than lowercase letters, digits and single hyphens, up to 80 characters)
- a duplicate slug across collections
- a slug that collides with a reserved route

Reserved routes are defined in `src/data/reserved-slugs.ts`: every static page, every
endpoint and asset path, host conventions, and the hierarchical roots the flat URL policy
forbids (`services`, `blog` and similar). Adding a static page to
`src/data/static-pages.ts` reserves its slug automatically.

The same rules run in three places: the build, `scripts/validate-content.mjs` and
`tests/slug-rules.test.ts`.

## Growth to 300, 500 and 1,000 pages

The architecture needs no restructuring to grow.

| Concern | How it is handled |
|---|---|
| URL restructuring | None needed. A new page is a new file; its URL is its file name |
| Routing collisions | Build fails on collision, so a collision cannot reach production |
| Duplicate content | Uniqueness of title, SEO title, description and H1 is enforced at build |
| Navigation collapse | Navigation links only to hubs. Hubs group by editorial theme, and filters are an enhancement over plain links |
| Sitemap size | Sitemaps are split by content type and each file rolls over at 45,000 URLs |
| Build time | Static output. Open Graph images are the slowest step, at well under a second each |
| Search | The index holds metadata only, about 400 bytes per page |
| Review burden | `npm run report:review` lists what is due. Cadence is per page |

New clusters are added by defining the cluster in `src/data/clusters.ts`, adding its hub
page and adding it to the navigation data. No template changes are required.

## What was deliberately not built

Pages from the specification's candidate lists that would have been thin or redundant
were merged into a stronger canonical page or moved to the backlog. The decisions are
recorded in `docs/content-roadmap.md`.
