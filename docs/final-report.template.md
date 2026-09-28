# Final report

Xyvionix production website. Report date: 2026-09-28.
Numbered to match section 77 of the implementation specification.

Figures marked `{{...}}` are filled in by `node scripts/final-report-numbers.mjs` from the
built site, so the report cannot state a number the build does not support.

## 1. Astro version

| Package | Version |
|---|---|
| astro | 7.3.5 |
| @astrojs/sitemap | 3.7.4 |
| @astrojs/rss | 4.0.19 |
| @astrojs/check | 0.9.10 |
| typescript | 6.0.3 |
| Node | 22.12 or later (built on 24.19) |

TypeScript is held at 6.x on purpose. `astro check` does not support TypeScript 7.

Static output. No adapter, no framework runtime, no client-side router. Styling is plain
CSS with design tokens. Tailwind is not used and its CDN script is not shipped.

## 2. Final page count

| Group | Pages |
|---|---|
| Home | 1 |
| Core: assurance overview, method, engine, security and trust | 4 |
| Hubs: use cases, industries, technologies, insights | 4 |
| Company and contact | 2 |
| Legal and policy | 4 |
| Utility: search, 404 | 2 |
| Assurance hubs | 6 |
| Assurance pages | 27 |
| Use cases | 18 |
| Technologies | 16 |
| Industries | 8 |
| Insights | 22 |
| **Total** | **114** |

Published at the time of this report: {{published}} content pages of 97, and 17 static
pages. Indexable pages in the build: {{indexable}}. Search and the 404 page are not indexed.

## 3. All routes

{{routes}}

## 4. Flat URL strategy

Every public URL is `https://xyvionix.com/<slug>`. No page sits under `/services/`,
`/industries/`, `/use-cases/`, `/technologies/`, `/insights/` or `/blog/`.

- One dynamic route, `src/pages/[slug].astro`, serves all five content collections.
- The file name is the URL. Nothing else determines it.
- The build fails on an empty, invalid, duplicate or reserved slug. Reserved slugs include
  every static page, every endpoint and asset path, and the hierarchical roots the policy
  forbids.
- The same rules run in the build, in the content validator and in the test suite.
- Canonical form: `https`, apex host, no trailing slash, no `.html`.

Detail: `docs/information-architecture.md`, `docs/redirects.md`.

## 5. Cluster architecture

Hierarchy is carried by metadata, not by URLs.

| Mechanism | Implementation |
|---|---|
| Cluster and parent | `cluster`, `secondary` and `parent` in frontmatter |
| Breadcrumbs | Derived from `parent`, capped at three levels |
| Hubs | Eleven hub pages with editorial grouping |
| Related content | Curated in frontmatter; gaps filled from shared cluster metadata |
| Structured data | `BreadcrumbList` and `isPartOf` on every page |

Blueprint: `docs/cluster-map.md`, generated from the same metadata the site uses.

## 6. Assurance clusters

| Cluster | Tier | Hub | Pages |
|---|---|---|---|
| AI Assurance | Primary | `/ai-assurance` | 9 |
| Production Reliability Assurance | Primary | `/production-reliability-assurance` | 6 |
| Cyber Exposure Assurance | Primary | `/cyber-exposure-assurance` | 5 |
| Technology Value Assurance | Expansion | `/technology-value-assurance` | 2 |
| Data Assurance | Expansion | `/data-assurance` | 3 |
| Change Assurance | Expansion | `/change-assurance` | 2 |

The three primary clusters received the deepest architecture, as the specification asked.
Twenty-one candidate pages were merged into a stronger canonical page instead of being
built. Each decision is recorded in `docs/content-roadmap.md`.

## 7. Use-case cluster

18 pages, grouped on the hub by what changed: AI launching, changing or acting (6);
production no longer matching what was tested (4); exposure that was closed reopening (4);
data or cost moving without warning (3); change itself becoming the risk (1).

Each answers the ten questions in the specification. The state mark on each page is the
state the situation describes.

## 8. Industry cluster

Four primary pages and four sector-specific pages, one per sector:

| Sector | Primary | Specific |
|---|---|---|
| Financial services | `/financial-services` | `/financial-services-ai-assurance` |
| Insurance | `/insurance` | `/insurance-claims-ai-assurance` |
| Healthcare | `/healthcare` | `/healthcare-ai-assurance` |
| Software and technology | `/software-technology` | `/saas-production-reliability` |

No industry, service and technology combinations were generated.

## 9. Technology cluster

16 pages in seven groups: cloud platforms (3), managed Kubernetes (2), infrastructure as
code (1), AI platforms (3), inference and retrieval (2), identity platforms (2), data
platforms (3). Each connects one platform to the assurance problem it creates, shows its
review date and states that Xyvionix is independent of the vendor.

## 10. Insight count

22 articles in seven themes, under organisational authorship by Xyvionix Research.

## 11. SEO architecture

- One typed model, `Seo`, in `src/lib/seo.ts`. One component, `Seo.astro`, writes all head
  metadata.
- Every indexable page has its own title, description, H1, canonical, robots directive,
  Open Graph and X metadata, image, image alt text, structured data and breadcrumbs.
- Uniqueness of title, SEO title, description and H1 is enforced across the site at build.
- `docs/seo-matrix.md` records every field for every page and is generated.

## 12. Sitemap implementation

`@astrojs/sitemap` writes `sitemap-index.xml` and one file per content type: pages,
assurance, use cases, technologies, industries, insights. Only canonical, indexable URLs
are listed. Drafts, `/search` and the 404 page are excluded. `lastmod` is each page's real
modification date from frontmatter. `priority` and `changefreq` are not emitted.

Sitemap URLs in the build: {{sitemap}}. The build fails if the sitemap and the set of
indexable canonical pages differ in either direction.

## 13. Robots configuration

`public/robots.txt`. A `*` group and one named group of 29 documented crawler tokens from
11 vendors, all `Allow: /`, plus the sitemap line. No CSS, JavaScript, image or font path
is blocked. Every token was taken from the vendor's own documentation. No bot name was
invented.

## 14. OAI-SearchBot

Allowed. It builds the index ChatGPT search draws on, and a site must allow it to appear
there.

## 15. GPTBot

Allowed, as a business decision that can be reversed. It crawls for model training and is
separate from search. Blocking it later would not remove the site from ChatGPT search.
`ChatGPT-User` is documented as a user-triggered fetcher, not the search crawler.

## 16. llms.txt

`/llms.txt`, generated at build from page metadata: definition, then links grouped as
core assurance, assurance areas in detail, use cases, industries, technologies, research
and insights, security and trust, contact. It is a navigation aid for agents. Google has
stated it does not use the file, and nothing on the site claims a ranking benefit.

## 17. llms-full.txt

`/llms-full.txt`, generated from the same metadata: company definition, the assurance
framework and four states, then one summary per page with its parent and review date,
grouped by cluster. It does not reproduce page content.

## 18. JSON-LD

One `@graph` per page. One Organization definition for the whole site, referenced by
`@id`. `Service` on assurance pages, `Article` on insights, `CollectionPage`, `AboutPage`
and `ContactPage` where they apply, `BreadcrumbList` on every page but home.

Not emitted: `FAQPage`, `HowTo`, ratings, reviews, offers, awards, certifications, client
or partner lists, founding details, addresses, employee counts. `legalName`, `email` and
`sameAs` are emitted only when the matching company input is confirmed.

Detail: `docs/schema.md`.

## 19. Open Graph image system

One 1200 x 630 PNG per page, generated at build from a template drawn from the frozen
theme: obsidian surface (off-white for insights), wordmark, monochrome state mark with
its label, mono label, title, question line and the threshold motif. About 40 KB each.
Images in the build: {{og}}. No stock imagery, gradients or metrics.

## 20. Metadata validation status

{{validation}}

Checked on every build by `scripts/validate-dist.mjs`: title, description, canonical,
robots, one H1, language, all Open Graph and X tags, image existence and dimensions,
structured data validity, internal links, sitemap, RSS, robots.txt, llms files, search
index, and the absence of prototype artefacts.

## 21. Accessibility status

Target WCAG 2.2 AA.

| Item | Status |
|---|---|
| Landmarks, one H1, skip link, language | Enforced at build |
| SVG: hidden or labelled | Enforced at build |
| Images with alt, width and height | Enforced at build |
| Contrast | Text 17:1, muted text 6.7 to 8.1:1, faint text 4.8 to 5.6:1 on both surfaces |
| State marks | Distinguishable by shape; always paired with text or an accessible name |
| Keyboard | Navigation panel opens with Enter, closes with Escape and returns focus; focus outline visible. Tested in the browser |
| Mobile menu | Tested at 390 px |
| Reduced motion | Reveal and line animation disabled by media query |
| Forms | Visible labels, described hints, errors tied to fields and announced |
| Tables | Header cells with scope, captions, scroll inside their own region |
| Print | Stylesheet provided; state marks print |

Not yet done, and listed in `docs/launch-checklist.md`: a screen reader pass, zoom to 200%
and reflow at 320 px, and the form tested end to end once an endpoint exists.

## 22. Performance status

| Measure | Value |
|---|---|
| JavaScript per page | About 2.6 KB, one external module, deferred |
| CSS | One stylesheet, about 43 KB before compression, shared by every page |
| Fonts | Self-hosted. About 73 KB for the Latin subsets used; other subsets load only if needed |
| HTML | 30 to 50 KB per page before compression |
| Third-party requests | None |
| Images | SVG diagrams inline in HTML; Open Graph images are not loaded by the page |

Every page is complete without script. Field Core Web Vitals need real traffic and a
Lighthouse run against the production host; both are in the launch checklist.

## 23. Broken-link status

{{links}}

Internal links are checked on every build: every `href`, stylesheet and script must
resolve to a built file, and no internal link may carry a trailing slash, a `.html`
suffix or an absolute URL. No `href="#"` exists.

## 24. Claim audit

{{claims}}

No page claims customers, certifications, savings, response times, operating hours,
offices, partnerships or awards. Third-party statistics name their report and year and
are sourced. Eleven operating statements from the frozen theme and the specification
need company confirmation before launch. They are listed in `docs/claim-audit.md`.

## 25. Remaining legal and company inputs

None of these was invented. Each is `null` or empty in `src/data/` until supplied.

| Input | Effect until supplied |
|---|---|
| Contact form endpoint | The form is rendered disabled. **Launch blocker** |
| Legal entity name, registered address, governing law | Legal pages show "Pending review". **Launch blocker** |
| Privacy and security contact addresses | Pages direct to the contact form; no `security.txt`. **Launch blocker** |
| Legal review of privacy, terms, security policy and subprocessors | Pages are drafts of the intended position. **Launch blocker** |
| Confirmation of the eleven operating statements | Listed in `docs/claim-audit.md`. **Launch blocker** |
| Subprocessor register and notice period | Page states the register is not yet published |
| Verified social profiles | No `sameAs`, no footer links |
| General contact email and phone | Not shown |
| Analytics provider | No analytics. Events are dispatched and ready |
| IndexNow key | IndexNow not used |
| Legacy URLs from any earlier site | Redirect table in `docs/redirects.md` is empty |

## 26. Content backlog

| Priority | Pages |
|---|---|
| P1, first 30 days | `/human-in-the-loop-assurance`, `/workload-identity-assurance`, `/container-exposure-assurance`, `/infrastructure-change-assurance`, `/gke-reliability-assurance`, `/airflow-pipeline-assurance`, `/financial-services-production-resilience`, `/saas-ai-cost-assurance`, and four to six insights |
| P2, 30 to 90 days | `/capacity-assurance`, `/platform-reliability-assurance`, `/iac-security-assurance`, `/devsecops-control-assurance`, `/data-integrity-assurance`, `/data-recovery-assurance`, `/data-observability-assurance`, `/cicd-assurance`, `/gitops-assurance`, `/sagemaker-production-assurance` |
| P3, future | New clusters for AI evaluation, AI economics, SRE practice, exposure management, FinOps, data reliability and platform reliability |

Every backlog page must pass the four-question test before it is written.
Detail: `docs/content-roadmap.md`.

## 27. Search Console launch steps

1. Add a Domain property for `xyvionix.com` and verify by DNS TXT record.
2. Submit `https://xyvionix.com/sitemap-index.xml`.
3. Confirm the generative AI control is set to include the site.
4. Inspect the home page and the six assurance hubs with a live test, then request indexing.
5. Review crawl stats on day one, and the Page indexing report on days three and seven.

Detail: `docs/search-console.md`.

## 28. Bing and IndexNow launch steps

1. Add the site in Bing Webmaster Tools and verify by CNAME.
2. Submit the sitemap.
3. Generate an IndexNow key and set `INDEXNOW_KEY` in the deploy environment.
4. `node scripts/indexnow.mjs --write-key` before upload, so the key file is served.
5. `node scripts/indexnow.mjs --all` once at launch, then without `--all` after each
   production deploy.

Detail: `docs/bing-indexnow.md`.

## 29. Crawler and firewall verification steps

1. Compare the live `/robots.txt` with `public/robots.txt`.
2. Request the home page and a content page with the documented `OAI-SearchBot`, `GPTBot`,
   `Googlebot` and `bingbot` user agents. Expect 200 and full HTML.
3. Confirm no 403, 429, 402 or challenge response, and no `crawler-price` header.
4. On Cloudflare, set AI bot policies for Search, Agent and Training to Allow. Since
   2026-09-15 the Block options for Training also stop search crawlers.
5. On AWS WAF, override `CategoryAI` if Bot Control is enabled.
6. Match crawlers by user agent and by the vendor's published IP list or reverse DNS.
   Never hard-code a range the vendor has not published.
7. Review origin or CDN logs weekly for the first month.

Detail: `docs/ai-discovery.md`.

## 30. Final launch checklist

`docs/launch-checklist.md`, in twelve sections: company inputs, content, build, hosting,
security headers, crawlers, search engines, structured data and sharing, accessibility,
visual check, performance, and after launch.

## Deviations and decisions to know about

| Item | Decision | Reason |
|---|---|---|
| Faint text colour | Changed from the frozen theme on both surfaces | The original measures 3.1 to 3.8:1 and fails WCAG AA for small text. The replacement measures 4.8 to 5.6:1. Hue unchanged |
| Hero glow | Radial gradient in place of a 110 px blur filter | The blur was expensive to paint. Appearance is the same |
| Page added | `/assurance` overview | Breadcrumbs and the navigation needed a real target for "Assurance" |
| Page added | `/search` | Lightweight static search, not indexed |
| FAQ markup | Not emitted | Google retired FAQ rich results |
| Repeated sentences | Two sentences describing corrective ownership recur on about 37 pages | They state the method consistently. The closest pair of pages shares 4% of phrases with names masked |
| Research limits | Some facts could not be verified and were left out | Writers listed each omission. Nothing unverified was published |

## Facts flagged for a second check before launch

Writers raised these because two research files disagreed or a source was secondary.

| Page | Fact | Note |
|---|---|---|
| `/model-retirement-is-a-production-change` | Google Cloud notice periods | Sourced in one research file, unverified in another |
| `/healthcare` | Reference to the Change Healthcare incident | Sourced to a US regulator's publication |
| `/ai-cost-assurance`, `/technology-value-assurance` | State of Tokenomics figures | The survey is a release candidate and is cited as such |

## How to resume or maintain

`docs/_status.md` is regenerated from the files on disk by `npm run checkpoint`.
Start there.
