# Research, September 2026

Assembled by `scripts/build-research-doc.mjs` from the files in `docs/research/`. Edit those files, then run the script again.

Research was carried out on 2026-09-27 by ten parallel research passes, each restricted to
primary sources: vendor documentation, standards bodies, regulators and the projects' own
repositories. Every finding in the sections below carries its source URL, its publication
or update date, its relevance to Xyvionix and the pages it affects.

Rules applied to the site:

- A fact is used in content only if it appears in these files with a source.
- Items listed under "Could not verify" in any section are not used anywhere on the site.
- Rows marked `[K]` (from prior knowledge only), `(X)` (from a search excerpt only) or with an
  asterisk are not used as fact.
- Pages that depend on fast-moving facts are marked `freshnessCritical` and reviewed every
  90 days. See `docs/reports/content-review.md`.

## Changes that altered how the site was built

| Area | What changed | Effect on the build |
|---|---|---|
| Google rich results | FAQ rich results ended in May 2026 and HowTo is retired | No `FAQPage` or `HowTo` structured data is emitted. FAQs are visible page text for readers |
| Google AI features | A Search Console control governs inclusion in AI Overviews and AI Mode. `Google-Extended` does not affect Search | Documented as a launch step in `docs/search-console.md` |
| Google and llms.txt | Google states it does not use `llms.txt` | `llms.txt` is shipped as an agent navigation aid only. No ranking claim is made anywhere |
| Scaled content | Pages produced per query variant are treated as scaled content abuse | No combinatorial pages. Overlapping topics were merged and the rest moved to the backlog |
| Googlebot | Only the first 2 MB of HTML is read | Canonical and structured data are placed early in the head; no inline assets |
| Favicons | SVG is not in Google's list of supported favicon formats | PNG and ICO favicons are shipped alongside the SVG |
| Hidden content | Content behind accordions and tabs loses deep links | FAQs and sections are rendered open |
| OpenAI crawlers | Four documented agents, with separate purposes | `OAI-SearchBot` and `GPTBot` are both allowed, and documented as different things |
| Bing | `noarchive` and `nocache` limit Copilot use | The build fails if either directive appears in a robots meta tag |
| Cloudflare | AI bot defaults changed on 2026-09-15, and some settings also stop search crawlers | Recorded as a deployment check in `docs/ai-discovery.md` |
| Astro | Version 7 uses a strict Rust compiler, a new Markdown processor and Zod 4 | Collections use the Content Layer API; schemas import `z` from `astro/zod`; TypeScript is pinned to 6.x because `astro check` does not support 7 |
| EU AI Act | Application dates for high-risk systems were moved by an amending regulation in 2026 | Governance and industry pages use the amended dates |
| US model risk guidance | SR 11-7 was superseded in April 2026, and generative and agentic AI are outside the replacement's scope | Financial services pages describe the current position and do not cite SR 11-7 as in force |
| Google Cloud AI | Vertex AI was renamed | The page keeps the slug `vertex-ai-assurance` and uses the current name in its title and text |
| Microsoft AI | Azure AI Foundry became Microsoft Foundry, and related services were renamed | The Azure AI page uses current names and mentions former names once |
| AWS agents | Bedrock Agents became Bedrock Agents Classic; AgentCore is the recommended path | The Bedrock page reflects this |
| MCP | The specification revision of 2026-07-28 removed sessions and changed authorisation guidance | The MCP page and insight are written against that revision |
| OWASP | A 2026 edition of the LLM Top 10 and a Top 10 for Agentic Applications exist | AI security and agent pages reference the current editions |
| Kubernetes | Version and support-window facts, and the retirement of Ingress NGINX | Used on the Kubernetes, EKS and AKS pages with dates |
| Data tooling | Airflow 2 reached end of life; Kafka is KRaft only; dbt, Databricks and Snowflake renamed products | Data and technology pages use current names and versions |

## Contents

1. Google Search and SEO (`docs/research/01-google-search.md`)
2. AI crawlers, Bing and IndexNow (`docs/research/02-ai-crawlers-bing-indexnow.md`)
3. Astro (`docs/research/03-astro.md`)
4. AI agents, AI security and AI governance (`docs/research/04-ai-agents-security-governance.md`)
5. AI evaluation, RAG, observability and inference economics (`docs/research/05-ai-evaluation-rag-inference.md`)
6. Enterprise AI platforms (`docs/research/06-ai-platforms.md`)
7. Production reliability, cloud and SRE (`docs/research/07-reliability-cloud-sre.md`)
8. Cyber exposure and identity (`docs/research/08-cyber-identity.md`)
9. Data platforms and technology value (`docs/research/09-data-and-finops.md`)
10. Industry and regulatory context (`docs/research/10-industry-regulatory.md`)

## Google Search and SEO

Source file: `docs/research/01-google-search.md`

Research date: 2026-09-27. Sources are Google primary documentation unless stated.

### AI Overviews and AI Mode

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Eligibility: "a page must be indexed and eligible to be shown in Google Search with a snippet". "There are no additional technical requirements." | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | No AI-specific build work. Page-level gate is indexability plus snippet eligibility. This older doc does not yet mention the Search Console control in the next row. | All pages; `robots.txt`; base layout `<head>` |
| New in 2026: a site must also be set to "Include" in the Search Console "Search generative AI control" (Settings > Search generative AI). Default is Include. Options: Include / Exclude / Inherit from parent. Covers AI Overviews, AI Mode, generative AI features in Discover. | https://support.google.com/webmasters/answer/16908024 | Rolled out to all sites worldwide 2026-08-31 | Property-level switch, not a page tag. Leave at default Include; check the domain property after verification. | Search Console property settings (no repo file) |
| Excluding via that control is not a ranking or inclusion signal for the rest of Search, and does not affect AI training. Change takes effect in roughly 1-2 days, some content longer. | https://support.google.com/webmasters/answer/16908024 | 2026-08-31 note | Documents that the control is scoped only to generative features. | Ops runbook |
| Page-level controls to limit what is shown: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`. Googlebot robots.txt rules are the crawl control. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Do not set `nosnippet` or a low `max-snippet` sitewide; it removes AI feature eligibility. | Base layout meta robots |
| `Google-Extended` limits AI training and grounding in "some of Google's other systems"; it is not the control for Search AI features. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Blocking Google-Extended does not remove pages from AI Overviews / AI Mode. Decide separately as a policy choice. | `public/robots.txt` |
| Both features may use "query fan-out" (multiple related searches); AI Overviews "often don't trigger". | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Supports deep topical pages over one page per query variant. | Information architecture |
| Listed fundamentals: crawling allowed in robots.txt and by CDN/hosting; internal links; important content in textual form; structured data matches visible text. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Key claims must be HTML text, not only in diagrams or images. | All content pages; CDN/WAF bot rules |

### Generative AI search guidance

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| New official guide "Optimizing your website for generative AI features on Google Search"; announced by John Mueller. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing | Published 2026-05-15; updated 2026-07-10 | Primary reference for the site's AI search strategy. | SEO strategy doc |
| Google's position on AEO/GEO: "optimizing for generative AI search is optimizing for the search experience, and thus still SEO." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Do not build a separate "GEO" layer. | Whole site |
| Things Google says to ignore: llms.txt and special markup/Markdown, "chunking" content, rewriting for AI, inauthentic mentions, overfocusing on structured data. "There's no ideal page length." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | No artificial Q&A fragmenting of pages. | Content templates |
| Priority is "non-commodity content": unique viewpoint, first-hand expertise, not content that "could easily be produced by a generative AI model". | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | 110 pages must each carry distinct expert substance; templated near-duplicates are a risk. | All content pages |
| Creating separate pages for every query variation or fan-out query "primarily to manipulate rankings or generative AI responses" violates the scaled content abuse policy. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Direct constraint on programmatic page sets (industry x capability matrices). | Industry, use-case, comparison page sets |
| Semantic HTML is recommended, not required; it helps screen readers and agents. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Astro components should emit real headings, lists, landmarks. | Layouts and components |
| Spam policies explicitly apply to generative AI responses in Search. | https://developers.google.com/search/updates | Doc update 2026-05-15 | Same compliance bar for AI surfaces. | Whole site |

### Search Console reporting

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Generative AI performance report (Search and Discover) launched. Shows impressions only, by Pages, Countries, Devices, Dates. Covers AI Overviews and AI Mode. | https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports ; https://support.google.com/webmasters/answer/16984139 | Announced 2026-06-03; all sites worldwide 2026-08-31 | Measurement source for AI visibility. No clicks or queries documented in this report. | Analytics plan |
| Data is attributed to the canonical URL; chart aggregates by property, table by page. Search Labs experiments excluded. | https://support.google.com/webmasters/answer/16984139 | 2026 | Correct canonicals are required for clean reporting. | Canonical tags |
| AI Overviews and AI Mode traffic is also counted in the main Performance report under the "Web" search type. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 (AI Mode counted since 2025-06-16) | Total Web figures already include AI surfaces. | Analytics plan |
| Web multimodal search reporting added: new "multimodal" search type filter. Covers Lens, Circle to Search, image uploads, Chrome "Search this image". | https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc | 2026-09-24, rolling out globally | Diagrams and product imagery now have measurable search traffic. | Image assets |
| Search Analytics API `type` values documented: `discover`, `googleNews`, `news`, `image`, `video`, `web`. No generative AI or multimodal value is documented. | https://developers.google.com/webmaster-tools/v1/searchanalytics/query | Updated 2026-08-11 | Plan on UI export for AI and multimodal data; do not design dashboards around an API for it. | Analytics plan |
| Other 2025-2026 additions: branded queries filter (2025-11), custom annotations (2025-11), social channels (2025-12), weekly/monthly views (2025-12), AI-powered report configuration (2025-12), platform properties for social/video (2026-07). | https://developers.google.com/search/blog | 2025-11 to 2026-07 | Useful for launch monitoring; no build impact. | None |

### Structured data changes 2025-2026

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| FAQ rich result fully deprecated: "This feature will no longer appear in Google Search starting May 7, 2026." Documentation removed 2026-06-15; the old faqpage URL now redirects to the changelog. | https://developers.google.com/search/updates (entries 2026-05-08 and 2026-06-15) | 2026-05-08 / 2026-06-15 | `FAQPage` JSON-LD yields no Google rich result. Do not build it for SERP benefit. | FAQ components, any `FAQPage` schema helper |
| How-to rich result: deprecated, documentation removed in 2023; "no longer shown in search results, on both desktop and mobile". | https://developers.google.com/search/blog/2023/08/howto-faq-changes ; https://developers.google.com/search/updates | 2023-08 / 2023-09 | Do not emit `HowTo` schema on guides or runbooks. | Guide / docs templates |
| Seven types retired in 2025: Book Actions, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing. Docs for five removed 2025-09-09. "This update won't affect how pages are ranked." | https://developers.google.com/search/blog/2025/06/simplifying-search-results | 2025-06-12; update 2025-09-08 | None apply to the site; confirms Google is shrinking rich result types. | None |
| Practice problem type deprecated (notice 2025-11-05), docs removed 2026-01-06. Dataset markup is used only by Dataset Search, not Google Search. | https://developers.google.com/search/updates | 2025-11-05 / 2026-01-06 | Do not use `Dataset` expecting web search features. | Benchmark / report pages |
| Supported features listed in the Search gallery now: Article, Breadcrumb, Carousel, Course list, Dataset, Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription and paywalled content, Vacation rental, Video. | https://developers.google.com/search/docs/appearance/structured-data/search-gallery | Updated 2026-06-15 | Applicable set for a B2B site: Organization, Breadcrumb, Article, Video, Event (webinars), Profile page (authors), Job posting (careers), Software app only if its required properties can be met truthfully. | `src/lib/schema/*`, base layout, blog, careers, events |
| Software app rich result requires `name`, `offers.price`, and one of `aggregateRating` or `review` (following review snippet guidelines). Violating guidelines can lead to manual action. | https://developers.google.com/search/docs/appearance/structured-data/software-app | Updated 2026-09-08 | Xyvionix is enterprise-priced with no public price or genuine third-party ratings on site: do not emit `SoftwareApplication` for rich results. Never invent a price or rating. | Product / platform pages, schema helpers |
| Breadcrumb rich result appearance is desktop-only since the 2025 mobile visible-URL simplification. | https://developers.google.com/search/blog/2025/01/simplifying-breadcrumbs ; https://developers.google.com/search/updates (2025-01-22) | 2025-01 | Keep `BreadcrumbList`; expect no mobile display. | Breadcrumb component |
| Structured data "isn't required for generative AI search"; must match visible text on the page. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/docs/appearance/ai-features | 2026-07-10 / 2025-12-10 | Generate JSON-LD from the same content source as rendered HTML. | Schema helpers |
| Recent property additions: VideoObject `creator` (2026-09-24); QAPage / DiscussionForum properties (2026-03-24). | https://developers.google.com/search/updates | 2026 | Minor; add `creator` if video pages exist. | Video pages |

### Crawling, indexing, canonicals, sitemaps, robots

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Minimum technical requirements: Googlebot isn't blocked; page returns HTTP 200; page has indexable content. Indexing is not guaranteed. | https://developers.google.com/search/docs/essentials/technical | Updated 2025-12-18 | Static Astro output satisfies this if the host returns real 200/404 codes. | Hosting config, `404.astro` |
| Googlebot fetches only the first 2MB of an HTML file (uncompressed; 64MB for PDF). Each CSS/JS resource has its own 2MB limit. Bytes after the cutoff are ignored. | https://developers.google.com/search/docs/crawling-indexing/googlebot ; https://developers.google.com/search/blog/2026/03/crawler-blog-post | Doc 2026-02-03; blog 2026-03-31 | Avoid large inline base64 images, inline SVG bloat, inlined CSS/JS. | Layouts, Astro `inlineStylesheets` setting, SVG components |
| "Order matters": put title, meta, canonical, and essential structured data high in the HTML. | https://developers.google.com/search/blog/2026/03/crawler-blog-post | 2026-03-31 | Emit JSON-LD and canonical in `<head>`, before large inline assets. | Base layout `<head>` |
| Sitemap: Google ignores `<priority>` and `<changefreq>`. `<lastmod>` is used only "if it's consistently and verifiably ... accurate" and should reflect the last significant update. | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | Updated 2026-07-08 | Omit priority/changefreq. Derive lastmod from real content dates, never build time. | `astro.config` sitemap integration, content frontmatter |
| Sitemap limits: 50MB uncompressed or 50,000 URLs; UTF-8; absolute URLs; list only canonical URLs; host at site root. | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | Updated 2026-07-08 | One sitemap is enough for ~110 pages. | Sitemap output |
| Canonical signal strength: redirects (strong), `rel="canonical"` (strong), sitemap inclusion (weak). Signals stack. | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | Updated 2026-07-10 | Redirect, canonical and sitemap must all name the same URL. | Host redirects, layout, sitemap |
| Use absolute canonical URLs, self-referential canonical on the canonical page, only in `<head>`. Do not use robots.txt or `noindex` for canonicalization. Do not use fragments as canonical. | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | Updated 2026-07-10 | Every page emits one absolute self-canonical built from `Astro.site`. | Base layout |
| Canonical must be in the HTML source and not changed by JavaScript. `noindex` should not appear in initial HTML if the page should be indexed. | https://developers.google.com/search/updates (2025-12-15, 2025-12-17) | 2025-12 | Static rendering handles this; no client-side head mutation. | Any client scripts touching `<head>` |
| robots meta: `nosnippet` and `max-snippet` apply to AI Overviews and AI Mode and limit use as direct input. Google also respects robots meta tags placed in `<body>`. | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | Updated 2026-03-24 | Stray robots meta in embedded or body content will be honoured. | Layouts, MDX content, embeds |
| robots.txt blocking prevents crawling but the URL can still appear in results; use `noindex` with crawling allowed to keep a page out. | https://developers.google.com/search/docs/essentials/technical | Updated 2025-12-18 | Thank-you, preview and internal search pages: `noindex`, not Disallow. | Utility pages, `robots.txt` |
| "Read more" deep links in snippets: content must be immediately visible (not behind accordions or tabs); do not force scroll position on load; do not strip the hash fragment on load. | https://developers.google.com/search/docs/appearance/snippet#read-more-deep-links | Section added 2026-04-20 | Key answers should not live only inside collapsed accordions or tabs. Headings need stable `id` anchors. | Accordion, tabs, FAQ components; heading anchor plugin; client router scripts |
| Crawler documentation moved to developers.google.com/crawling; crawler IP range files moved location. | https://developers.google.com/search/blog/2026/03/crawler-ip-ranges ; https://developers.google.com/search/updates (2025-11-20, 2025-12-17) | 2025-11 to 2026-03 | Update any WAF allowlist that references the old IP range file URLs. | CDN / WAF rules |

### Image and multimodal search

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Use HTML `<img>` with `src`; "Google doesn't index CSS images." Always give a `src` fallback when using `srcset` or `<picture>`. | https://developers.google.com/search/docs/appearance/google-images | Updated 2026-03-02 | Diagrams and hero images that should rank must be `<img>`, not CSS backgrounds. Astro `<Image>`/`<Picture>` emit a `src` fallback. | Image components, hero sections |
| Supported formats in `img src`: BMP, GIF, JPEG, PNG, WebP, SVG, AVIF. | https://developers.google.com/search/docs/appearance/google-images | Updated 2026-03-02 | AVIF/WebP output is safe. | `astro.config` image settings |
| Preferred image: Google uses schema.org (`primaryImageOfPage`, or `image` on the main entity) and `og:image`. Avoid generic images such as the site logo, images with text, and extreme aspect ratios. | https://developers.google.com/search/docs/appearance/google-images#specify-preferred-image | Section added 2026-03-02 | Per-page `og:image` must be page-specific, not a shared logo card. Text-heavy generated OG cards conflict with this advice. | SEO head component, OG image pipeline, schema helpers |
| Alt text is "the most important attribute" for image metadata; descriptive filenames; place images near relevant text; inline `<svg>` should carry a `<title>`. | https://developers.google.com/search/docs/appearance/google-images | Updated 2026-03-02 | Require `alt` in content schema; name files descriptively; title inline SVG diagrams. | Content collections schema, SVG components |
| Reference the same image with one consistent URL across pages. | https://developers.google.com/search/docs/appearance/google-images | Updated 2026-03-02 | Shared diagrams should resolve to one hashed asset URL. | Asset pipeline |
| Inlining images as data URIs "can considerably increase the size of the page". | https://developers.google.com/search/docs/appearance/google-images | Updated 2026-03-02 | Combines with the 2MB HTML fetch limit. | Layouts |
| Generative AI features "can bring in relevant images and video"; following image and video SEO docs is the optimisation. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Original diagrams are an AI surface opportunity. | Diagram assets |
| Favicon formats supported by Google Search: "BMP, GIF, ICO, PNG, JPEG, PPM, and TIFF". SVG is not in the list. Must be square, at least 8x8px, recommended larger than 48x48px, stable URL, crawlable by Googlebot-Image. One favicon per hostname. | https://developers.google.com/search/docs/appearance/favicon-in-search | Updated 2026-08-28 | Astro starters ship `favicon.svg` only. Add a PNG or ICO `rel="icon"` for Search. | `public/favicon.*`, base layout `<head>`, `robots.txt` |
| Multimodal searches (Lens, Circle to Search, image upload, Chrome "Search this image") are reported in Search Console under a multimodal search type. | https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc | 2026-09-24 | Measurement only. | Analytics plan |

### Preferred sources

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Users can pick preferred sources; chosen sites are more likely to appear in Top Stories with a "preferred" badge, and can be badged in AI Mode and AI Overviews. | https://developers.google.com/search/docs/appearance/preferred-sources | Doc published 2026-01-30; updated 2026-09-18 | Mainly a news/publisher feature. Low priority for a B2B product site; relevant only if the blog publishes timely content. | Blog layout (optional) |
| Availability: Top Stories globally in all Search languages (2026-04-30); AI Overviews and AI Mode rollout (2026-05-27). | https://developers.google.com/search/updates | 2026-04-30 / 2026-05-27 | Context. | None |
| Only domain-level and subdomain-level sites are eligible; a subdirectory such as `/blog` is not. | https://developers.google.com/search/docs/appearance/preferred-sources | Updated 2026-09-18 | Eligibility would attach to the whole xyvionix.com host. | Domain strategy |
| User-facing help states: "Sources that aren't updated regularly may not be available" in the source preferences tool. | https://support.google.com/websearch/answer/16379181 | Read 2026-09-27 | A site without regularly published content may not be listed at all. Check the tool before building any button. | Blog publishing cadence |
| AI feature eligibility for preferred sources requires the Search Console generative AI control set to Include. | https://developers.google.com/search/docs/appearance/preferred-sources | Updated 2026-09-18 | Same control as above. | Search Console settings |
| Implementation options: script `https://news.google.com/swg/js/v1/publisher.js` plus `<div google-add-preferred-source-btn>`; custom button via JS SDK (added 2026-08-20); or deeplink `https://www.google.com/preferences/source?q=example.com`. None is required to appear. | https://developers.google.com/search/docs/appearance/preferred-sources | Updated 2026-09-18 | If used, prefer the plain deeplink: no third-party script, no CSP or performance cost. | Footer or blog component, CSP |

### AI agents and agentic browsing

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Google Search guidance on agents is explicitly "initial". Browser agents may read a site via screenshots, the DOM, and the accessibility tree. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#agentic-experiences | 2026-07-10 | Accessibility quality is now also agent readiness. | All interactive components |
| Google points to web.dev "agent-friendly website" practices: semantic `<button>`/`<a>`, `<label for>`, no transparent overlays over controls, interactive targets larger than 8 square pixels, stable layout, `cursor: pointer`. | https://web.dev/articles/ai-agent-site-ux | Updated 2026-04-01 | Apply to nav, forms (demo request, contact), cookie banner, modals. | Header, forms, consent banner, modal components |
| web.dev on urgency: agents are "a fairly new user on the web, you have some time before you need to adopt best practices"; most practices are accessibility practices. Agents should confirm with the user before submitting forms with sensitive information. | https://web.dev/articles/ai-agents | Page states published 2025-02-25; footer updated 2026-02-25 | Agent readiness is an accessibility quality bar, not a separate workstream. | Accessibility checklist, forms |
| WebMCP is a proposed web standard: pages register tools via JavaScript or annotated HTML forms, with JSON Schema inputs. Origin trial from Chrome 149; "can be added as a progressive enhancement". "In active development and may change." | https://developer.chrome.com/docs/ai/webmcp ; https://web.dev/articles/ai-agent-site-ux | Published 2026-05-18; updated 2026-08-07 | Not a launch requirement and Chrome-only trial. Candidate later for demo-request and contact forms. Build forms as plain semantic HTML so annotation can be added without rework. | Form components (future) |
| Web Bot Auth is "experimental": an IETF draft for signed bot requests. A subset of Google-Agent requests are signed and carry `Signature-Agent: g="https://agent.bot.goog"`. Google says not every request is signed and to keep IP, reverse DNS and user-agent verification as fallback. | https://developers.google.com/crawling/docs/crawlers-fetchers/web-bot-auth | Updated 2026-05-04 | Host/CDN concern only. Do not make WAF rules depend on signatures alone. | CDN / WAF bot rules |
| User agent strings can be spoofed; Google publishes IP range files and a verification method for its crawlers and fetchers. | https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers | Updated 2026-08-19 | Allowlist by verified IP range, not by user-agent string. | CDN / WAF bot rules |
| Universal Commerce Protocol (UCP) is named as an emerging protocol for Search agents. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Commerce-oriented; not applicable to a lead-generation site. | None |
| `Google-Agent` is a documented user-triggered fetcher: "used by agents hosted on Google infrastructure to navigate the web and perform actions upon user request". IP ranges in `user-triggered-agents.json`. Google is experimenting with Web Bot Auth (`https://agent.bot.goog`). | https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers | Updated 2026-08-19 | WAF/bot rules must not block this user agent if agent traffic is wanted. | CDN / WAF bot rules |
| User-triggered fetchers "generally ignore robots.txt rules" because a user requested the fetch. | https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers | Updated 2026-08-19 | robots.txt is not an access control for agents; gated content needs real auth. | `robots.txt`, gated assets |

### Spam policies

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Spam definition now includes "attempting to manipulate generative AI responses in Google Search". | https://developers.google.com/search/docs/essentials/spam-policies | Updated 2026-08-28 (clarified 2026-05-15) | No hidden prompts, no text aimed at models rather than readers. | All content, hidden elements |
| Scaled content abuse: "many pages are generated for the primary purpose of manipulating search rankings and not helping users ... no matter how it's created". Example: using generative AI tools "to generate many pages without adding value for users". | https://developers.google.com/search/docs/essentials/spam-policies#scaled-content | Updated 2026-08-28 | Highest-risk policy for a 110-page build. Each templated page needs unique substance. | Programmatic page sets, glossary, industry pages |
| Site reputation abuse is now named "site reputation policy". Covers third-party content hosted mainly to exploit the host's ranking signals. | https://developers.google.com/search/docs/essentials/spam-policies#site-reputation | Updated 2026-08-28 | Applies only if the site hosts partner or sponsored third-party content. | Partner / guest content, if any |
| From 2026-08-30 site reputation manual actions affect results outside the EEA; inside the EEA the affected section may be separated to rank independently. | https://developers.google.com/search/blog/2026/08/update-site-reputation-policy | 2026-08-28 | Context only. | None |
| New: back button hijacking is an explicit violation under malicious practices. Enforcement from 2026-06-15. Can originate from included libraries or ad platforms. | https://developers.google.com/search/blog/2026/04/back-button-hijacking | 2026-04-13 | Audit third-party scripts (chat, consent, exit-intent popups) for History API manipulation. | Third-party scripts, modal and popup components |
| Google may use spam report submissions to take manual action. | https://developers.google.com/search/updates (2026-04-14, 2026-04-23) | 2026-04 | Competitors can trigger review; keep the site clean. | None |
| Generative AI content is allowed if it meets Search Essentials; metadata, structured data and alt text must be accurate. Google suggests giving context on how content was created. | https://developers.google.com/search/docs/fundamentals/using-gen-ai-content | Updated 2025-12-10 | Human expert review of all AI-assisted copy; consider author and review attribution. | Editorial workflow, author components |
| Confirmed ranking updates on the Search Status Dashboard: December 2025 core (2025-12-11 to 12-29); February 2026 Discover (02-05 to 02-27); March 2026 spam (03-24 to 03-25); March 2026 core (03-27 to 04-08); May 2026 core (05-21 to 06-02); June 2026 spam (06-24 to 06-26); August 2026 spam (08-18 to 08-21); September 2026 spam (started 2026-09-24, no end date listed at research time). | https://status.search.google.com/summary | Read 2026-09-27 | Four spam updates in 2026 so far and one in progress at research time. Launching thin templated pages now carries direct risk. | Launch timing, content QA |
| Fake and incentivised reviews guideline added to snippet documentation. | https://developers.google.com/search/updates (2026-07-24) | 2026-07-24 | Testimonials and ratings must be genuine; do not mark up self-serving reviews. | Testimonial components, review schema |

### Core Web Vitals

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Three metrics: LCP (good within 2.5 s), INP (good under 200 ms), CLS (good under 0.1). | https://developers.google.com/search/docs/appearance/core-web-vitals | Updated 2025-12-10 | Performance budget targets for every template. | All layouts, performance CI |
| Full thresholds at the 75th percentile: LCP good <=2500 ms, poor >4000 ms; INP good <=200 ms, poor >500 ms; CLS good <=0.1, poor >0.25. | https://web.dev/articles/defining-core-web-vitals-thresholds | Updated 2025-05-07 | Measured on field data, mobile and desktop separately. | Performance budget |
| "Core Web Vitals are used by our ranking systems." Other page experience aspects "don't directly help your website rank higher". No single page experience signal. | https://developers.google.com/search/docs/appearance/page-experience | Updated 2026-09-22 | Worth meeting, not worth chasing perfect scores. | Performance plan |
| Page experience self-check: HTTPS, mobile display, no intrusive interstitials, main content easy to distinguish. | https://developers.google.com/search/docs/appearance/page-experience | Updated 2026-09-22 | Consent banner and demo popups must not act as intrusive interstitials. | Consent banner, popups |

### llms.txt

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search ... as Google Search itself doesn't use them." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting | 2026-07-10 | llms.txt has no Google Search value. | `public/llms.txt` (optional) |
| Maintaining llms.txt for other services is fine: "Doing so will neither harm nor help your site's visibility or rankings in Google Search, as Google Search ignores them." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting ; https://developers.google.com/search/updates (2026-06-15) | Clarified 2026-06-15 | Safe to ship for non-Google consumers; do not describe it as a Google SEO feature. | `public/llms.txt`, SEO documentation |
| Google may crawl and index such files like any other file, with no special treatment. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting | 2026-07-10 | An llms.txt or Markdown mirror can appear in results as a duplicate; consider `X-Robots-Tag: noindex` on it. | Host headers config |

### Trailing slash and canonical domain

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Google treats slash and non-slash URLs as separate URLs. Only the root is exempt: `https://example.com` equals `https://example.com/`. | https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash | 2010-04-21 (still the published Google reference) | Pick one form and enforce it. Google states no preference. | `astro.config` `trailingSlash`, host redirects |
| Recommended handling: choose one version, use it in internal links and sitemap, 301 the other; `rel="canonical"` if a redirect is not possible. | https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash | 2010-04-21 | Astro `trailingSlash` and `build.format` must match host behaviour so no internal link triggers a redirect. | `astro.config`, link helper, sitemap |
| Protocol variants (HTTP/HTTPS) are listed as a duplicate source; redirects are the strongest canonical signal. | https://developers.google.com/search/docs/crawling-indexing/canonicalization ; https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | Updated 2026-08-20 / 2026-07-10 | One canonical origin; 301 http and the non-chosen www/apex variant to it. | DNS / host redirect rules, `site` in `astro.config` |
| Site moves: use the Change of Address tool for all subdomain variants including www and non-www. | https://developers.google.com/search/updates (2026-06-17) | 2026-06-17 | Applies if v2 launches on a different host than v1. | Launch runbook |
| URLs are case sensitive; use hyphens, not underscores; do not use fragments to change content. | https://developers.google.com/search/docs/crawling-indexing/url-structure | Updated 2025-12-10 | Lowercase hyphenated slugs only. | Content collection slugs, routes |

### Terminology: current vs deprecated

| Current term (Sept 2026) | Deprecated / avoid | Source |
|---|---|---|
| AI Overviews; AI Mode; "generative AI features on Google Search" | Search Generative Experience (SGE): "AI Overviews in Search are replacing Search Generative Experience" | https://developers.google.com/search/updates (May 2024 entry) ; https://developers.google.com/search/docs/appearance/ai-features |
| SEO (Google: optimising for generative AI search is "still SEO") | "AEO" / "GEO" as separate disciplines | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide |
| Search generative AI control (Search Console setting) | Treating `Google-Extended` as the opt-out for AI Overviews | https://support.google.com/webmasters/answer/16908024 |
| Generative AI performance report | Inferring AI traffic only from the Web search type total | https://support.google.com/webmasters/answer/16984139 |
| Site reputation policy | Site reputation abuse policy; "parasite SEO" (informal) | https://developers.google.com/search/docs/essentials/spam-policies#site-reputation |
| Interaction to Next Paint (INP) | First Input Delay (FID), replaced March 2024 | https://developers.google.com/search/blog/2023/05/introducing-inp |
| Core ranking systems | "Helpful content system" as a separate system (listed under retired systems; part of core ranking since March 2024) | https://developers.google.com/search/docs/appearance/ranking-systems-guide |
| Non-commodity content | Commodity content; "long-tail keyword" page variants | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide |
| Web: multimodal (search type) | Treating Lens traffic as unreported | https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc |
| Google crawling infrastructure docs (developers.google.com/crawling) | Old crawler doc paths under /search/docs/crawling-indexing | https://developers.google.com/search/updates |
| Google-GeminiNotebook fetcher | Google-NotebookLM (former agent, supported until August 2026) | https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers |
| No rich result: FAQ, How-to, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing, Book Actions, Practice problem | Describing any of these as "rich result eligible" | https://developers.google.com/search/updates |

### Implementation rules derived

- Do not emit `FAQPage` or `HowTo` JSON-LD for Google rich results; both are dead. FAQ content stays as visible HTML.
- JSON-LD set: `Organization` (home), `BreadcrumbList`, `Article`/`BlogPosting` (blog), plus `VideoObject`, `Event`, `ProfilePage`, `JobPosting` only where real content exists. Generate it from the same data as the visible text.
- No `SoftwareApplication` rich result markup unless a real public price and genuine rating or review exist. Never fabricate either.
- Bot allowlisting at the CDN/WAF uses Google's published IP ranges, not user-agent strings or Web Bot Auth signatures alone. Do not block `Google-Agent`.
- Forms are plain semantic HTML with labelled fields so WebMCP annotation can be added later as progressive enhancement.
- One absolute, self-referential `<link rel="canonical">` per page in static HTML `<head>`, built from `Astro.site`. No client-side mutation of canonical or robots meta.
- Choose one trailing-slash form. Set Astro `trailingSlash` and `build.format` to match host behaviour; internal links, canonical, and sitemap use exactly that form; the other form 301s.
- One canonical origin (https plus chosen www or apex); 301 all other variants.
- Sitemap: canonical absolute URLs only; omit `<priority>` and `<changefreq>`; `<lastmod>` from a real content-modified date, not build time.
- Default robots meta allows snippets. Never set sitewide `nosnippet` or restrictive `max-snippet`. Use `noindex` (crawlable) for utility pages rather than robots.txt Disallow.
- Do not block Googlebot in robots.txt, CDN or WAF. Treat `Google-Extended` as a separate training/grounding policy decision; it does not affect Search.
- After launch, confirm Search Console "Search generative AI control" is Include on the domain property.
- Keep every HTML document far below 2MB uncompressed: no base64 images, no large inline SVG or inlined CSS/JS bundles. Title, canonical, meta and JSON-LD come first in `<head>`.
- Content images use `<img>` with `src` fallback, descriptive `alt`, descriptive filenames, one stable URL per image. No meaning-bearing CSS background images. Inline SVG diagrams carry `<title>`.
- Per-page `og:image` is page-specific and not the logo; avoid text-heavy and extreme-ratio images.
- Ship a PNG or ICO favicon (at least 48x48, square) in addition to any SVG.
- Performance budget: LCP <=2.5 s, INP <=200 ms, CLS <=0.1 at the 75th percentile on mobile.
- Important content is in visible text, not only inside closed accordions, tabs, or images. Headings have stable `id` anchors. No scripts that reset scroll or strip hash fragments on load.
- No programmatic page sets that vary only by keyword, industry name or query variant. Each of the ~110 pages needs distinct expert content or it should be merged.
- No History API manipulation that interferes with the back button; audit third-party scripts for it.
- Interactive elements use semantic `<button>`, `<a>`, `<label for>`; no transparent overlays above controls; layout stable. This serves accessibility and browser agents.
- llms.txt is optional, has no Google Search effect, and must not be documented as an SEO feature.
- Lowercase, hyphen-separated URL slugs; no fragment-based routing.

### Could not verify

Retried 2026-09-27. Resolved and moved into sections above: 2026 core and spam update dates (Spam policies), Software app required properties (Structured data), Web Bot Auth and WebMCP status (AI agents), API `type` values (Search Console reporting), preferred sources listing hint (Preferred sources).

- Whether the Generative AI performance report exposes clicks, CTR, position or queries. Retried: the help page and launch post document impressions only and say more metrics may be added "over time".
- Bulk data export (BigQuery) coverage of generative AI or multimodal data. Retried: the help page could not be read in full. The API reference lists no such type, but Google has not stated that API support is absent.
- End date of the September 2026 spam update; it was still listed as open.
- Any Google statement that SVG favicons are rejected. The documentation lists supported formats without SVG and says supported formats "haven't changed"; actual handling of SVG was not confirmed.
- Any current Google-authored statement on trailing slashes newer than the 2010 blog post. None was found in the canonicalization or URL structure docs.
- Exact eligibility rules for a site to be listed in the preferred sources tool. Retried: only the "updated regularly" hint was found; no published criteria.
- Whether Xyvionix has a public price or genuine ratings that would satisfy Software app requirements. This is a business fact, not a Google fact.
- Any Search Central guidance on agents beyond the single "Explore agentic experiences" section; none was found in the docs, blog index or changelog.
- `hreflang` and international guidance changes; not researched because no multi-language requirement was given.
- Recommending `X-Robots-Tag: noindex` on llms.txt is an inference from Google saying such files may be indexed like any other file. Google does not recommend it explicitly.

## AI crawlers, Bing and IndexNow

Source file: `docs/research/02-ai-crawlers-bing-indexnow.md`

Research date: 2026-09-27. Primary vendor documentation only; anything not confirmed there is listed under "Could not verify".

### 1. OpenAI crawlers

Source for all rows: `https://developers.openai.com/api/docs/bots` (`platform.openai.com/docs/bots` 301-redirects here). Page carries no visible date; fetched 2026-09-27.

| Vendor | Token | Purpose | Honours robots.txt | IP list / verification URL |
|---|---|---|---|---|
| OpenAI | `OAI-SearchBot` | Search index: surfaces sites in ChatGPT search | Yes | https://openai.com/searchbot.json |
| OpenAI | `GPTBot` | Training crawl for foundation models | Yes | https://openai.com/gptbot.json |
| OpenAI | `ChatGPT-User` | User-triggered fetch (ChatGPT, Custom GPTs, GPT Actions) | "robots.txt rules may not apply" | https://openai.com/chatgpt-user.json |
| OpenAI | `OAI-AdsBot` | Validates landing pages submitted as ChatGPT ads; not training | Not stated | https://openai.com/adsbot.json |

Full user-agent strings (verbatim; OpenAI notes version numbers may change):

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-AdsBot/1.0; +https://openai.com/adsbot
```

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers, though can still appear as navigational links." | https://developers.openai.com/api/docs/bots | Undated; fetched 2026-09-27 | Must allow `OAI-SearchBot` to be cited in ChatGPT search | `robots.txt` |
| Requirement to appear: allow `OAI-SearchBot` in robots.txt AND allow requests from the published IP ranges | same | same | WAF/CDN must not challenge the searchbot.json ranges | `robots.txt`, WAF allowlist doc |
| Robots changes: "it can take ~24 hours from a site's robots.txt update for our systems to adjust" (search results) | same | same | Allow 24 h before testing after launch or robots edits | launch checklist |
| Each token is independent. If both OAI-SearchBot and GPTBot are allowed, OpenAI "may use the results from just one crawl for both use cases" | same | same | Allowing both avoids duplicate crawl load | `robots.txt` |
| When fetching robots.txt, crawlers may add a `robots.txt;` marker inside the UA string (e.g. `OAI-SearchBot/1.4; robots.txt; +https://openai.com/searchbot`) | same | same | UA matching in WAF rules must be substring-based, not exact-match | WAF allowlist doc |
| `ChatGPT-User` "is not used to determine whether content may appear in Search"; it is not an automatic crawler | same | same | Do not block it: it is how a live user's ChatGPT session reads a Xyvionix page | `robots.txt`, WAF |
| Verified from raw page text: "ChatGPT automatically includes the UTM parameter utm_source=chatgpt.com in referral URLs, enabling clear tracking and analysis of inbound traffic from ChatGPT search results." | https://help.openai.com/en/articles/12627856-publishers-and-developers-faq | "Updated: 29 days ago" on 2026-09-27 (about 2026-08-29) | Analytics segment for ChatGPT referrals | analytics config |
| "Any public website can appear in ChatGPT search." For inclusion in summaries and snippets "make sure you aren't blocking OAI-SearchBot" | same | same | No submission or registration step exists; crawl access is the only requirement | `robots.txt` |
| A disallowed page can still be surfaced as "just the link and page title" if OpenAI learns the URL elsewhere. To prevent that, use the `noindex` meta tag, and the crawler "must be allowed to crawl the relevant page(s)" to read it | same | same | Same rule as Bing and Google: `noindex` plus crawl access, never Disallow, for pages that must stay out | page frontmatter, `robots.txt` |
| ChatGPT agent in Atlas reads ARIA roles, labels and states to interpret pages; OpenAI recommends WAI-ARIA best practices | same | same | Accessible markup on forms, menus and buttons also serves agent use | components, forms |
| Citation display: responses using web search "may include citations"; a Sources control lists cited sources and other relevant links | https://help.openai.com/en/articles/9237897-chatgpt-search | "Updated: last month" on 2026-09-27 | Page titles and descriptions are what a user sees in the Sources list | page `<title>`, meta description |

### 2. Other documented AI and search crawlers

| Vendor | Token | Purpose | Honours robots.txt | IP list / verification URL |
|---|---|---|---|---|
| Anthropic | `ClaudeBot` | Training data collection | Yes; supports `Crawl-delay` | https://claude.com/crawling/bots.json (one combined list) |
| Anthropic | `Claude-SearchBot` | Search index for Claude search results | Yes | same |
| Anthropic | `Claude-User` | User-triggered fetch | Yes (stated for all Anthropic bots) | same |
| Perplexity | `PerplexityBot` | Search index; "not used to crawl content for AI foundation models" | Yes | https://www.perplexity.com/perplexitybot.json |
| Perplexity | `Perplexity-User` | User-triggered fetch | No: "generally ignores robots.txt rules" | https://www.perplexity.com/perplexity-user.json |
| Google | `Googlebot` | Google Search incl. AI Overviews / AI Mode | Yes | https://developers.google.com/static/crawling/ipranges/common-crawlers.json ; rDNS `*.googlebot.com` |
| Google | `Google-Extended` | Control token only (no separate UA): Gemini training and grounding | Yes | n/a (no crawl of its own) |
| Google | `GoogleOther`, `GoogleOther-Image`, `GoogleOther-Video` | Generic R&D crawl; no Search effect | Yes | common-crawlers.json |
| Google | `Google-CloudVertexBot` | Site-owner-requested crawls for Vertex AI Agents | Yes | common-crawlers.json |
| Google | `Google-InspectionTool`, `Storebot-Google` | Search Console testing tools; Shopping | Yes | common-crawlers.json |
| Google | `Google-Agent`, `Google-GeminiNotebook` | User-triggered agent / Gemini Notebook fetch | No ("generally ignore robots.txt") | https://developers.google.com/static/crawling/ipranges/user-triggered-agents.json and `user-triggered-fetchers.json` |
| Microsoft | `bingbot` | Bing index; also feeds Copilot and grounding | Yes; supports `Crawl-delay` | https://www.bing.com/toolbox/bingbot.json ; rDNS `*.search.msn.com` ; https://www.bing.com/toolbox/verify-bingbot |
| Microsoft | `MicrosoftPreview`, `BingVideoPreview`, `adidxbot` | Page snapshots; video previews; Bing Ads QC | Not stated per bot | same method |
| Apple | `Applebot` | Search for Spotlight, Siri, Safari | Yes; falls back to Googlebot rules if no Applebot rules | http://search.developer.apple.com/applebot.json ; rDNS `*.applebot.apple.com` |
| Apple | `Applebot-Extended` | Control token only: training opt-out. "does not crawl webpages" | Yes | n/a |
| Amazon | `Amazonbot` | Improve Amazon services; may train AI models | Yes; no `Crawl-delay` | https://developer.amazon.com/amazonbot/ip-addresses/ |
| Amazon | `Amzn-SearchBot` | Search experiences; "does not crawl content for generative AI" training | Yes; no `Crawl-delay` | https://developer.amazon.com/amazonbot/searchbot-ip-addresses/ |
| Amazon | `Amzn-User` | User-triggered fetch (e.g. Alexa live answers) | May not follow all directives | https://developer.amazon.com/amazonbot/live-ip-addresses/ |
| Meta | `meta-externalagent` | Training and direct product indexing | Yes (robots.txt example given) | No IP list on the crawler page (see Could not verify) |
| Meta | `meta-webindexer` | Meta AI search result quality | No bypass stated | same |
| Meta | `meta-externalfetcher` | User-triggered fetch | "may bypass robots.txt rules" | same |
| Meta | `facebookexternalhit` | Link previews for shared URLs | May bypass for security/integrity checks | same |
| Meta | `meta-externalads` | Advertising products | No bypass stated | same |
| DuckDuckGo | `DuckDuckBot` | DuckDuckGo search crawler | Yes | https://duckduckgo.com/duckduckbot.json |
| DuckDuckGo | `DuckAssistBot` | Real-time crawl for AI-assisted answers; not training | Yes; opt-out effective after 72 h | https://duckduckgo.com/duckassistbot.json |
| Common Crawl | `CCBot` | Open crawl corpus (widely used for AI training and research) | Yes | https://index.commoncrawl.org/ccbot.json ; rDNS for IPv4 |
| Mistral | `MistralAI-Index` | Search index only; not training | Yes | https://mistral.ai/mistralai-index-ips.json |
| Mistral | `MistralAI-User` | User-triggered fetch with citations; not training | Not stated | https://mistral.ai/mistralai-user-ips.json |
| Mistral | `MistralAI-Training` | Training datasets | Yes (can be disallowed) | Not published on the page |

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Anthropic documents three bots; blocking `Claude-SearchBot` or `Claude-User` "may reduce your site's visibility". IP blocking is discouraged because it stops robots.txt being read | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler | Updated 2026-04-07; bots.json created 2026-08-18 | Allow all three; never IP-block Anthropic | `robots.txt`, WAF doc |
| Anthropic's article does not publish full UA strings | same | same | Match on token substring only | WAF doc |
| Perplexity: robots changes "may take up to 24 hours"; recommends WAF rules combining UA AND IP conditions, with JSON endpoints as source of truth | https://docs.perplexity.ai/guides/bots | Undated; fetched 2026-09-27 | Template for our allowlist rule shape | WAF doc |
| Perplexity UAs: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)` and same form with `Perplexity-User/1.0; +https://perplexity.ai/perplexity-user` | same | same | UA matching | WAF doc |
| Google: appearing in AI Overviews / AI Mode needs only normal indexing plus snippet eligibility. No special files or schema | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | Updated 2026-07-10 | Googlebot access is the AI-visibility control for Google | `robots.txt`, meta robots |
| Google: site must also be "included in Search generative AI features in Search Console"; inclusion is the default for all properties | https://support.google.com/webmasters/answer/16908024 | Undated | Verify the Search Console setting stays on Include | Search Console setup |
| Google Search Console generative AI performance reports: launched 2026-06-03, rolled out to all sites 2026-08-31 (impressions, pages, countries, devices, dates) | https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports | 2026-06-03 | Measurement source for Google AI visibility | analytics/reporting doc |
| Google common crawlers list and tokens; user-triggered fetchers list (Google-Agent, Google-GeminiNotebook; `Google-NotebookLM` deprecated) | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers ; https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers | 2026-07-14 ; 2026-08-19 | Token source of truth | `robots.txt` |
| Google verification: reverse DNS to `googlebot.com`, `google.com` or `googleusercontent.com`, then forward-confirm; five IP JSON files | https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests | 2026-03-20 | WAF verification method | WAF doc |
| Bing crawler list and UAs. Main: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/W.X.Y.Z Safari/537.36` | https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0 | Undated | UA matching | WAF doc |
| Bing: "Refresh this list daily as we can change this list any time" (bingbot.json). Live file's `creationTime` is 2024-01-03 | https://www.bing.com/webmasters/help/how-to-verify-bingbot-3905dc26 | Undated | Prefer rDNS `search.msn.com` over static IPs | WAF doc |
| Apple: Applebot data may train Apple foundation models unless `Applebot-Extended` is disallowed; Applebot follows Googlebot rules if none of its own | https://support.apple.com/en-us/119829 | 2026-09-04 | A Googlebot-specific group silently governs Applebot too | `robots.txt` |
| Amazon: three bots; robots changes ~24 h; cached robots.txt used up to 30 days if unreachable; `Crawl-delay` unsupported | https://developer.amazon.com/amazonbot | Undated | Keep robots.txt highly available | `robots.txt`, hosting |
| Meta: crawlers "may cache the contents of robots.txt for up to 24 hours" | https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/ | Undated | Same 24 h propagation rule | launch checklist |
| DuckDuckGo: "Opting out of DuckAssistBot does not impact organic search rankings"; data not used for training | https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot | Undated | Safe to allow | `robots.txt` |
| CCBot UA `CCBot/2.0 (https://commoncrawl.org/faq/)`; warns of impostors using its name | https://commoncrawl.org/ccbot | Undated | Verify by IP before trusting UA | WAF doc |
| Mistral documents three bots with separate search, user and training roles. Rechecked against raw page text: `MistralAI-Training` section gives a UA string but no IP list; `MistralAI-User` "governs which sites these user requests can be made to" | https://docs.mistral.ai/robots | Undated | Allow all three | `robots.txt` |
| Meta crawler page says to allowlist "either the user agent strings or the IP addresses (#identify) (more secure)", but the page as served has no "identify" section and no IP list | https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/ | Undated | Meta crawlers can only be matched by UA today | WAF doc |
| Brave Search: "The Brave Search crawler does not advertise a differentiated user agent"; delisting is by `noindex`, not robots.txt | https://search.brave.com/help/brave-search-crawler | Undated | No Brave token exists to add to robots.txt; generic browser-like traffic must not be blocked | WAF doc |
| Cloudflare's own bot reference confirms the same tokens as UA match strings: `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Googlebot`, `Google-CloudVertexBot`, `bingbot`, `CCBot`, `meta-externalagent`, `meta-externalfetcher`, `Applebot`, `Amazonbot`, `DuckAssistBot`, `MistralAI-User` | https://developers.cloudflare.com/ai-crawl-control/reference/bots/ | 2026-04-23 | Second-source cross-check of tokens (not vendor documentation) | `robots.txt`, WAF doc |

### 3. Bing Webmaster Tools

Bing help pages are client-rendered; article text was read from the site's own JSON endpoint `https://www.bing.com/webmasters/api/help/htmlcontent?ArticleId=<id>` (id = slug suffix). Articles carry no dates.

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Add site by Google Search Console import (auto-verified) or manually. Four ownership methods: DNS auto verification (Domain Connect), XML file `BingSiteAuth.xml` at site root, `<meta>` tag in `<head>`, CNAME record | https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b | Undated | For a static Astro site use CNAME (survives redeploys) or ship `BingSiteAuth.xml` in `public/` | DNS, `public/BingSiteAuth.xml`, base layout `<head>` |
| Meta tag must stay in place after verification; data appears about 48 h after adding a site | same | Undated | Do not remove verification artefacts in later refactors | base layout |
| Sitemap formats accepted: XML, RSS 2.0, Atom 0.3/1.0, plain text. Submit in the Sitemaps tool or via a `Sitemap:` line in robots.txt | https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed | Undated | Astro sitemap integration output is sufficient | `sitemap-index.xml`, `robots.txt` |
| Sitemaps should list only canonical URLs and carry accurate `lastmod`; ETags also help change detection. "Sitemaps are typically read once per day" | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a ; https://www.bing.com/webmasters/help/url-submission-62f2860b | Undated | `lastmod` must reflect real content change, not build time | sitemap config |
| AI Performance report (public preview): citations across Microsoft Copilot, AI summaries in Bing and select partner integrations. Metrics: total citations, average cited pages, grounding queries, page-level citation activity, visibility trends | https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview ; https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c | 2026-02-10 | Only first-party source of Copilot citation data; requires a verified site | reporting doc |
| Guidelines now cover "Bing search experiences, Copilot, and grounding API results"; same crawl/index foundation for all | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | Undated | bingbot access governs Copilot visibility; there is no separate Copilot crawler token | `robots.txt` |
| `NOARCHIVE` prevents use in Copilot responses and grounding; `NOCACHE` limits Copilot to URL, title and snippet; `NOSNIPPET` / `data-nosnippet` may limit citation quality | same ; https://www.bing.com/webmasters/help/robots-meta-tags-5198d240 | Undated | Never emit `noarchive` or `nocache` on public pages | base layout meta robots, response headers |
| "robots.txt controls crawl access, not indexing"; use `noindex` to keep a URL out of Bing and Copilot | same | Undated | Thank-you and utility pages use `noindex`, not Disallow | page frontmatter |
| Avoid "hiding critical content behind client-side rendering" | same | Undated | Astro static HTML satisfies this; keep islands non-essential | components |
| IndexNow preferred over legacy URL Submission, which "may be deprecated in the future". Legacy quota: 10,000 URLs per domain per day | https://www.bing.com/webmasters/help/url-submission-62f2860b | Undated | Build IndexNow only; skip the URL Submission API | deploy pipeline |
| IndexNow tool in BWT shows submitted URLs, crawl/index status and "Important URLs Missed" | https://www.bing.com/webmasters/help/indexnow-0z209wby | Undated | Use to confirm the integration works | launch checklist |
| Crawl Control tool and `Crawl-delay` are supported for bingbot | https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0 | Undated | Not needed for 110 static pages; do not set `Crawl-delay` | `robots.txt` |

### 4. IndexNow

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Single URL: `GET https://<searchengine>/indexnow?url=<url>&key=<key>` (optional `&keyLocation=`). Global endpoint host: `api.indexnow.org` | https://www.indexnow.org/documentation ; https://www.indexnow.org/faq | Undated | Use `https://api.indexnow.org/indexnow` | deploy script |
| Batch: `POST /indexnow`, header `Content-Type: application/json; charset=utf-8`, body fields `host`, `key`, `keyLocation` (optional), `urlList` | https://www.indexnow.org/documentation | Undated | One POST per deploy | deploy script |
| Up to 10,000 URLs per POST | same | Undated | 110 pages fit in one request | deploy script |
| Key: 8 to 128 characters; allowed `a-z`, `A-Z`, `0-9`, `-` | same | Undated | Generate once, store as a build constant (it is public, not a secret) | env/config |
| Key file: UTF-8 text file `{key}.txt` containing the key, at the site root; or elsewhere with `keyLocation`, in which case it only authorises URLs under that path | same | Undated | Host at root: `public/<key>.txt` | `public/<key>.txt` |
| Responses: 200 OK; 202 Accepted (key validation pending); 400 bad format; 403 key invalid; 422 URLs do not belong to host or key mismatch; 429 too many requests | same | Undated | Treat 200 and 202 as success; fail the step on 4xx | deploy script |
| Submitting to one endpoint shares the URLs with all participating engines | https://www.indexnow.org/faq | Undated | Submit once only | deploy script |
| Participants in `searchengines.json`: Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazon | https://www.indexnow.org/searchengines.json | Fetched 2026-09-27 | Google is not a participant; Google relies on sitemap and crawl | docs |
| Submit on add, update and delete; include redirected URLs and 404/410 URLs | https://www.indexnow.org/faq | Undated | Send removed and redirected URLs too | deploy script |
| Wait at least 5 minutes before resubmitting the same URL; on 429 honour `Retry-After` and wait at least 10 minutes | same | Undated | Submit only URLs whose content changed | deploy script |
| A 200 response "does not guarantee immediate indexing"; use IndexNow together with sitemaps | same | Undated | Keep the sitemap as the full inventory | sitemap |
| Bing: "Avoid batch submissions when possible. Streaming submissions provide faster updates" | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | Undated | Post-deploy diff submission, not a full-site resubmit every build | deploy script |

Payload shape (from indexnow.org; values are placeholders):

```json
{
  "host": "www.example.com",
  "key": "<your-key>",
  "keyLocation": "https://www.example.com/<your-key>.txt",
  "urlList": ["https://www.example.com/url1", "https://www.example.com/folder/url2"]
}
```

### 5. llms.txt

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Still a proposal (Jeremy Howard), not an IETF/W3C standard. Now "v2 of the proposal" | https://llmstxt.org/ | Published 2024-09-03; modified 2026-08-10 | Low cost, optional; treat as an aid for agents, not a ranking lever | `public/llms.txt` |
| Format, in order: optional BOM; H1 with site name (only required element); blockquote summary; zero or more non-heading markdown sections; zero or more H2 sections holding "file lists" | same | same | Generate from the content collection at build | `src/pages/llms.txt.ts` |
| File-list item: `- [name](url)` then optional `: notes` | same | same | One line per key page | same |
| `## Optional` section: by convention, secondary links "an agent can skip when a shorter context is needed". In v2 it no longer has mechanical meaning | https://llmstxt.org/ ; https://llmstxt.org/changes.html | 2026-08-10 | Put legal, careers and archive links there | same |
| Location: `/llms.txt` at root or any subpath; a file covers URLs under its path and the most specific file wins | same | same | Single root file is enough | same |
| Markdown page versions: `page.html.md` or `page.md`; directory URLs use `index.html.md` or `index.md` | same | same | Optional: emit `.md` twins for the pages linked from llms.txt | build step |
| v2 discovery: `rel="alternate" type="text/markdown"` to the markdown twin and `rel="describedby"` to the covering llms.txt, as `<link>` or HTTP `Link:` header | same | same | Add `<link>` tags only if `.md` twins are actually built | base layout |
| v2 consumption model: agents read llms.txt then follow links. The `llms_txt2ctx` context-expansion tooling "is no longer part of the proposal" | https://llmstxt.org/changes.html | 2026-08 | Keep llms.txt small and link-based | same |
| `llms-full.txt` is NOT in the llmstxt.org spec. It is a platform convention: Mintlify defines it as the whole docs site in one file (title, source URL, description, full markdown per page), served at `/llms-full.txt` | https://www.mintlify.com/docs/ai/llmstxt | Undated | Optional; if built, label it as a convention and keep it out of the sitemap | `public/llms-full.txt` |
| Google does not use it: "Google Search itself doesn't use them"; creating one "will neither harm nor help" | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Do not present llms.txt as a Google signal in site copy or docs | docs |
| Chrome Lighthouse has an llms.txt audit: fails only on server error; 404 is N/A because "providing the file is optional at the moment" | https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt | 2026-05-05 | `/llms.txt` must return 200 or a clean 404, never 5xx | hosting |
| OpenAI, Anthropic and Google Gemini publish llms.txt for their own developer docs. This shows publishing, not that their crawlers consume it | https://llmstxt.org/ | 2026-08-10 | No vendor crawler documentation reviewed here promises to read llms.txt | docs |

### 6. WAF/CDN bot handling

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Cloudflare replaced the single "Block AI bots" toggle with per-category policies: Search, Agent, Training. Options per category: Block (all pages), Block on pages with ads, Allow | https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/ ; https://developers.cloudflare.com/changelog/post/2026-07-01-ai-traffic-options/ | 2026-07-01 | If Cloudflare fronts the site, set all three to Allow explicitly | Cloudflare zone settings, WAF doc |
| New defaults from 2026-09-15 for newly onboarded domains: Training and Agent blocked on pages that display ads; Search allowed. Raw blog text confirms "all new domains onboarding to Cloudflare"; it does not say existing Free zones are switched to these defaults | https://blog.cloudflare.com/content-independence-day-ai-options/ | 2026-07-01 | A zone created after 2026-09-15 inherits these. Xyvionix pages carry no ads, but do not rely on ad detection | Cloudflare zone settings |
| From 2026-09-15 "Block and Block on pages with ads now apply to mixed-use crawlers, including Applebot, Bingbot, and Googlebot, so either setting impacts search as well as training." Selecting Block "will stop Applebot, Bingbot, and Googlebot from reaching your site — search included" | https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/ | 2026-09-15 | Highest-risk setting found. Never set Training to Block or Block on pages with ads | Cloudflare zone settings |
| New Training option "Disallow AI Training": Bot Preference Sync publishes a no-training `Disallow` in robots.txt; mixed-use crawlers stay allowed for search; training-only crawlers (Amazon, Anthropic, Meta, OpenAI) are blocked | same | 2026-09-15 | Conflicts with our open policy and rewrites robots.txt. Use Allow instead | Cloudflare zone settings, `robots.txt` |
| New-domain presets from 2026-09-15. Site not monetised by ads: Preference Sync enabled, Search Allow, Training Allow, Agent Allow. Ad-monetised: Training = Disallow AI Training, Agent = Block on pages with ads | same | 2026-09-15 | During Cloudflare onboarding choose "does not monetize using ads"; confirm all three read Allow | Cloudflare onboarding |
| Existing domains: "Your current settings carry over"; legacy Block AI Bots and granular selections are migrated (previous Training Block becomes Disallow AI Training). Managed robots.txt "will be deprecated in favor of Bot Preference Sync" | same | 2026-09-15 | If the zone already exists, audit migrated values; do not assume defaults | Cloudflare zone settings |
| Cloudflare category per crawler (legacy verified-bot categories): AI Search = OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot. AI Assistant = ChatGPT-User, Claude-User, Perplexity-User, meta-externalfetcher, DuckAssistBot, MistralAI-User. AI Crawler = GPTBot, ClaudeBot, Google-CloudVertexBot, CCBot, meta-externalagent, Amazonbot, Bytespider. Search Engine = Googlebot, bingbot | https://developers.cloudflare.com/ai-crawl-control/reference/bots/ | 2026-04-23 | Shows which crawlers each Cloudflare control is likely to touch | WAF doc |
| Cloudflare lists AI referrer domains, including `chatgpt.com`, `claude.ai`, `perplexity.ai`, `bing.com`, `duckduckgo.com` | same | 2026-04-23 | Referrer-based analytics segments alongside `utm_source` | analytics config |
| Pay per crawl headers: `crawler-price` (in the 402 response), `crawler-exact-price`, `crawler-max-price` (crawler request), `crawler-charged`, `crawler-error` | https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/crawl-pages/ | 2026-04-23 | A `crawler-price` header or 402 on our pages means pay per crawl was switched on by mistake | launch checklist |
| Bot Fight Mode exceptions need Super Bot Fight Mode, which "runs on the Ruleset Engine and supports Skip rules" | https://developers.cloudflare.com/bots/get-started/bot-fight-mode/ | 2026-08-03 | On a paid plan, use Super Bot Fight Mode with a Skip rule for verified crawlers | Cloudflare zone settings |
| Managed robots.txt, when turned on, is prepended to the origin robots.txt and disallows Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Google-Extended, GPTBot, meta-externalagent; default Content-Signal `search=yes, ai-train=no`. Off by default. Being deprecated in favour of Bot Preference Sync (Cloudflare blog, 2026-09-15) | https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/ | 2026-08-03 | Keep OFF, otherwise it overrides our file. Verify by fetching live `/robots.txt` | Cloudflare zone settings, launch checklist |
| AI Crawl Control (formerly AI Audit): per-crawler allow/block, robots.txt compliance tracking; on all plans | https://developers.cloudflare.com/ai-crawl-control/ | 2026-08-14 | Use as the monitoring view for crawler activity | ops doc |
| Pay per crawl: closed beta; crawlers without payment intent receive `HTTP 402 Payment Required` | https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/ | 2026-07-28 | Do not enable; a 402 removes the page from AI answers | Cloudflare zone settings |
| Verified bots must identify honestly (signature, published IPs or rDNS). Signed agents (Web Bot Auth) count as verified from 2026-07-01 | https://developers.cloudflare.com/bots/concepts/bot/verified-bots/ | 2026-07-01 | Write allow rules against verified-bot status, not raw UA | WAF doc |
| Bot Fight Mode: "You cannot bypass or skip Bot Fight Mode using WAF custom rules or Page Rules" | https://developers.cloudflare.com/bots/get-started/bot-fight-mode/ | 2026-08-03 | An allow rule cannot rescue a crawler it challenges; leave it off or test crawler access after enabling | Cloudflare zone settings |
| Vercel: Bot Protection managed ruleset and AI bots managed ruleset are both "inactive by default". Verified bots are excluded from Bot Protection challenges | https://vercel.com/docs/bot-management | 2026-09-10 | Default Vercel project blocks nothing. Never set the AI bots ruleset to Deny | Vercel firewall settings |
| Vercel: Bot Protection "doesn't work when a reverse proxy (e.g. Cloudflare...) is placed in front" | same | 2026-09-10 | Pick one edge layer for bot control | architecture doc |
| Netlify: no AI crawler blocking by default; blocking needs the opt-in User Agent Blocker extension | https://docs.netlify.com/build/build-with-ai/block-ai-crawlers/ | 2026-09-18 | Nothing to disable on a default Netlify site | hosting doc |
| AWS WAF Bot Control is an opt-in paid rule group. Its `CategoryAI` rule blocks "all matches, regardless of whether the bots are verified or unverified". Other category rules block only unverified bots | https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-bot.html | Undated | If Bot Control is added, override `CategoryAI` to Count or put an allow rule ahead of it | AWS WAF web ACL |
| AWS WAF: a `web_bot_auth:verified` label exempts a request from Category rules; verification uses the origin IP, not forwarded IP | same | Undated | Behind a proxy, add a forwarded-IP allow rule before Bot Control | AWS WAF web ACL |
| Akamai: has an AI bot category and per-bot actions | https://www.akamai.com/blog/security/managing-ai-bots-part-overall-bot-management-strategy | 2024-11-20 | Actions are customer-set | WAF doc |
| Akamai public docs recommend starting Bot Manager "in monitor mode"; for Akamai-categorized bots "use the monitor or allow action for categories that are most relevant to your business and deny the rest" | https://techdocs.akamai.com/cloud-security/docs/handle-adversarial-bots | Undated | Akamai's own guidance leads operators to deny non-chosen categories. If Akamai is used, set AI and search categories to allow or monitor explicitly | Akamai security config |
| Akamai: "Akamai-validated bots usually follow robots.txt directives, so instead of denying, consider implementing robots.txt entry" | https://techdocs.akamai.com/cloud-security/docs/detection-methods | Undated | Supports a robots.txt-first policy | WAF doc |

### Recommended robots.txt

Every token below appears in the vendor's own documentation cited in sections 1 and 2. Assumptions to confirm before shipping: canonical host (`https://xyvionix.com` vs `www`) and sitemap filename (`sitemap-index.xml` is the Astro sitemap integration default). Add `Disallow` lines only for paths that really exist.

```
## Xyvionix robots.txt
## Policy: open to search, AI search, AI assistants and AI training crawlers.
## Keep pages out of indexes with <meta name="robots" content="noindex">, not Disallow.

User-agent: *
Allow: /

## Named group (one group, many user-agents). A crawler that matches a named group
## ignores the * group, so any future Disallow must be added to BOTH groups.
## Vendors in order: OpenAI, Anthropic, Perplexity, Google, Microsoft, Apple, Amazon,
## Meta, DuckDuckGo, Common Crawl, Mistral.

User-agent: OAI-SearchBot
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-AdsBot
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Googlebot
User-agent: Google-Extended
User-agent: GoogleOther
User-agent: Google-CloudVertexBot
User-agent: bingbot
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: Amazonbot
User-agent: Amzn-SearchBot
User-agent: Amzn-User
User-agent: meta-externalagent
User-agent: meta-webindexer
User-agent: meta-externalfetcher
User-agent: facebookexternalhit
User-agent: DuckDuckBot
User-agent: DuckAssistBot
User-agent: CCBot
User-agent: MistralAI-Index
User-agent: MistralAI-User
User-agent: MistralAI-Training
Allow: /

Sitemap: https://xyvionix.com/sitemap-index.xml
```

Notes:
- The named group has no comments or blank lines inside it, to avoid parsers splitting it. Test the live file in the Bing robots.txt tester and Search Console before launch.
- No `Crawl-delay`: Amazon documents that it does not support it, and a 110-page static site does not need it.
- The named group is functionally the same as `User-agent: *` / `Allow: /`. Its value is auditability: the file states the policy per crawler, and Applebot gets its own rule instead of inheriting any future Googlebot-only rule.

### Implementation rules derived

robots.txt and meta
- Serve `/robots.txt` as static text from `public/`, status 200, never behind a challenge. Amazon reuses a cached copy for up to 30 days if it cannot fetch a fresh one.
- Use only tokens listed in sections 1 and 2. Add a new token only with a vendor documentation URL.
- Control indexing with `noindex` (meta or `X-Robots-Tag`), not `Disallow`.
- Never emit `noarchive`, `nocache` or `nosnippet` on public pages: Bing documents that these reduce or remove Copilot use.
- Allow 24 hours after any robots.txt change before testing (OpenAI, Perplexity, Amazon, Meta); 72 hours for DuckAssistBot.
- User-triggered fetchers (`ChatGPT-User`, `Perplexity-User`, `Google-Agent`, `meta-externalfetcher`, `Amzn-User`) may ignore robots.txt. Access for them is decided at the WAF, not in robots.txt.

WAF/CDN allowlisting
- Match crawlers by user-agent substring AND vendor IP list or reverse DNS. UA alone is spoofable; exact-match UA breaks on version bumps and OpenAI's `robots.txt;` marker.
- Pull vendor IP JSON files on a schedule (daily for Bing). Do not hardcode ranges in documentation or rules.
- For Google, Bing and Apple prefer reverse then forward DNS: `googlebot.com` / `google.com` / `googleusercontent.com`, `search.msn.com`, `applebot.apple.com`.
- Cloudflare: set AI bot policies for Search, Agent and Training to Allow. Never use Block, Block on pages with ads or Disallow AI Training for Training: since 2026-09-15 the first two also stop Googlebot, Bingbot and Applebot, and the third rewrites robots.txt.
- Cloudflare onboarding: choose the "does not monetize using ads" preset, then confirm the three values.
- Cloudflare: keep Managed robots.txt / Bot Preference Sync from adding Disallow lines; keep pay per crawl off; treat Bot Fight Mode as unskippable (exceptions need Super Bot Fight Mode).
- After any Cloudflare change, diff the live `/robots.txt` against the repository copy and check responses for `402` or a `crawler-price` header.
- Akamai, if used: set AI and search bot categories to allow or monitor explicitly; its guidance is to deny categories not chosen.
- AWS WAF: if Bot Control is ever enabled, neutralise `CategoryAI`, which blocks verified AI bots.
- Vercel and Netlify: defaults block nothing; record that as a setting to keep.
- After launch, fetch the live `/robots.txt` and one content page through the production edge with each major crawler UA to confirm 200, not 403/402/challenge. This proves UA rules only, not IP rules.

Bing and IndexNow
- Verify Bing Webmaster Tools by CNAME, or ship `BingSiteAuth.xml` in `public/`. Submit the sitemap and reference it in robots.txt.
- Sitemap lists canonical URLs only, with `lastmod` equal to the real content modification date.
- IndexNow: key file at `public/<key>.txt`; post-deploy step POSTs changed, new, removed and redirected URLs to `https://api.indexnow.org/indexnow`; accept 200 and 202; on 429 honour `Retry-After`.
- Submit a diff per deploy, not the whole site. Skip preview and branch deploys.
- IndexNow does not reach Google. Google discovery stays with the sitemap and Search Console.

llms.txt
- Generate `/llms.txt` at build in the v2 format: H1, blockquote, short notes, H2 link lists, `## Optional` last. Keep it small.
- `.md` page twins, `rel="alternate"` / `rel="describedby"` links and `llms-full.txt` are optional. Ship them together or not at all.
- Do not claim in site copy or internal docs that llms.txt improves ranking. Google states it ignores the file.

Measurement
- Segment referrals by `utm_source=chatgpt.com` (OpenAI-documented) and by referrer domain (`chatgpt.com`, `claude.ai`, `perplexity.ai`, `bing.com`, `duckduckgo.com`).
- Review Bing AI Performance and the Google Search Console generative AI performance report monthly.

### Could not verify

Resolved on the second pass (2026-09-27) and moved into sections 1, 2 and 6: OpenAI `utm_source=chatgpt.com` and citation display (both help articles read with browser-style request headers), Cloudflare per-crawler categories, Cloudflare pay per crawl header names, Cloudflare treatment of existing zones, Akamai public guidance.

Still unverified:

- Whether `utm_source=chatgpt.com` is also added to links opened from ChatGPT Atlas or agent sessions. OpenAI's sentence covers "ChatGPT search results" only.
- Any OpenAI agent or browser user agent beyond the four on the bots page (for example an Operator, agent-mode or Atlas token): none is listed on the OpenAI bots page. Vercel's bot directory lists a `chatgpt-operator` entry, but that is a third-party label, not an OpenAI-documented robots.txt token. Not used.
- Anthropic full user-agent strings: not published in the Anthropic help article. Only the three tokens are verified.
- Meta crawler IP ranges: retried on the current page and the older `/docs/sharing/webmasters/crawler` URL. The page mentions "IP addresses (#identify)" but serves no such section, no IP list, no AS number and no lookup command. Direct raw fetch returned HTTP 400. No Meta range may be written into allowlist rules. Robots.txt compliance for `meta-webindexer` and `meta-externalads` is inferred from the absence of a bypass statement, not from an explicit promise.
- Mistral `MistralAI-Training` IP list URL: confirmed absent from the raw page. Whether `MistralAI-User` obeys or bypasses robots.txt is not stated in plain terms.
- Robots.txt compliance of `OAI-AdsBot`, `MicrosoftPreview`, `BingVideoPreview`, `adidxbot`: not stated per bot.
- Cloudflare: the mapping from the legacy categories (AI Crawler, AI Search, AI Assistant) to the new Search / Agent / Training controls is not published per crawler. How "pages that display ads" is detected is described only as "automated detection".
- Cloudflare: whether Bot Fight Mode is on by default and whether it exempts verified bots. Rechecked against raw page text: not stated.
- Cloudflare: what Bot Preference Sync writes into robots.txt when every control is set to Allow. Not read.
- Akamai: the product default action for the AI bot category and the category names. The Bot Manager documentation (`techdocs.akamai.com/bot-manager/...`) requires a login; only public guidance pages were readable.
- `DuckAssistBot` token: DuckDuckGo says to "disallow the DuckAssistBot user agent", which confirms it. `DuckDuckBot` is taken from the user-agent product name; no robots.txt example is given.
- Yandex: reverse DNS verification (`yandex.ru`, `yandex.net`, `yandex.com`) and the `Yandex` robots.txt token were seen only through the summarising fetch tool, not raw text. Not added to robots.txt; the `*` group covers it.
- Vendors with no official crawler documentation reviewed, so excluded from robots.txt: xAI / Grok, ByteDance `Bytespider`, Cohere, You.com, Baidu, Huawei PetalBot. `Bytespider` appears only in Cloudflare lists, which are not vendor documentation. The web search quota for this session was exhausted, so these were not searched again.
- Bing Webmaster help articles and several vendor pages carry no publication date; "Undated" rows were current as fetched on 2026-09-27.
- Most page contents were read through an automated fetch-and-summarise tool. OpenAI bots and both OpenAI help articles, llmstxt.org, Google AI optimisation guide, Anthropic, Mistral, the Cloudflare pages, Akamai public docs and all Bing help text were additionally checked against raw page text. Re-check any verbatim quote from other sources before publishing it externally.

## Astro

Source file: `docs/research/03-astro.md`

### 1. Upgrade guides: Astro 6 and Astro 7 (breaking changes, Node, TypeScript)

Sources: https://docs.astro.build/en/guides/upgrade-to/v6/ , https://docs.astro.build/en/guides/upgrade-to/v7/ ,
https://astro.build/blog/astro-6/ (released 2026-03-10), https://astro.build/blog/astro-7/ (released 2026-06-22),
`npm view` on 2026-09-27.

**Node.** `astro@7.3.5` declares `engines.node: ">=22.12.0"` (same floor as v6; Node 18/20 dropped in v6). Local Node 24.19.0 is fine.
`@astrojs/mdx@8.0.2` declares the same engine.

**TypeScript: do NOT install 7.x.** `@astrojs/check@0.9.10` declares `peerDependencies.typescript: "^5.0.0 || ^6.0.0"`.
With TS 7 installed, `astro check` behaves as if TypeScript is missing and prompts to install it
(https://github.com/withastro/astro/issues/17268, closed as upstream / unable to fix; maintainer: "TypeScript 7 does not
currently support languages like Astro, Vue, Svelte. We cannot fix it until they do."). Tracking:
https://github.com/withastro/roadmap/discussions/1321. Newest 6.x on npm is `typescript@6.0.3`. Pin it:

```bash
npm install astro@7.3.5 @astrojs/sitemap@3.7.4 @astrojs/rss@4.0.19
npm install -D @astrojs/check@0.9.10 typescript@6.0.3
```

**Bundled dependency majors in astro 7.3.5** (from npm metadata): Vite `^8.0.13`, Zod `^4.5.4`, Shiki `^4.0.2`,
`@astrojs/compiler-rs ^0.5.0`, `@astrojs/markdown-satteri 0.4.2`; `sharp ^0.35.4` is an optionalDependency;
`@astrojs/markdown-remark ^7.3.0` is an OPTIONAL peer (not installed by default any more).

#### Astro 6 changes that matter for a static content site

| Change | Action |
|---|---|
| Legacy content collections removed; Content Layer API only | Every collection needs a `loader`; no `type: 'content'`; `entry.slug` -> `entry.id`; `entry.render()` -> `render(entry)`; `getEntryBySlug()` -> `getEntry()` |
| Zod 4; `z` from `astro:content` and `astro:schema` deprecated | `import { z } from 'astro/zod'` |
| `Astro.glob()` removed | `import.meta.glob('./x/*.md', { eager: true })` |
| `<ViewTransitions />` removed | `<ClientRouter />` (we use neither) |
| `Astro` inside `getStaticPaths()` deprecated / throws | Use `import.meta.env.SITE` instead of `Astro.site` |
| `getStaticPaths()` params must be strings | `params: { id: '123' }`, never a number |
| Endpoints with a file extension cannot have a trailing slash | `/sitemap.xml`, `/robots.txt`, `/og/x.png` are served without slash regardless of `trailingSlash` |
| Heading ids: trailing hyphens no longer stripped | `` ## `<Picture />` `` gives `id="picture-"`; check hand-written anchors |
| Scripts and styles render in source order | Was reversed before |
| Images: default service crops by default, never upscales; SVG can be rasterized when `format` is set | Review `width`/`height`/`fit` usage |
| Responsive image styles emitted at build time as hashed classes + `data-*` | Intended to remove the inline `style` attribute; docs disagree, see "Could not verify" item 3 |
| `import.meta.env` values always inlined, never coerced | Convert strings to booleans/numbers manually |
| `.cjs` / `.cts` config files unsupported | Use `astro.config.mjs` or `.ts` |
| Experimental flags removed because stable: `csp`, `fonts`, `liveContentCollections`, `preserveScriptOrder`, `staticImportMetaEnv`, `headingIdCompat` | Delete from `experimental` |

#### Astro 7 changes that matter for a static content site

| Change | Action |
|---|---|
| Vite 8 (Rolldown bundler) | Only matters for custom Vite plugins/config |
| Rust `.astro` compiler is the only compiler | Unclosed non-void tags and unterminated attributes are build ERRORS; invalid HTML nesting is passed through, not auto-corrected |
| `compressHTML` default changed `true` -> `'jsx'` | Line breaks between inline elements no longer produce a space; write `{" "}` or set `compressHTML: true` |
| Markdown rendered by Sätteri (Rust) instead of remark/rehype | remark/rehype plugins need `npm i @astrojs/markdown-remark` + `markdown.processor: unified({...})` (see section 9) |
| `src/fetch.ts` is a reserved filename (advanced routing) | Do not create it, or set `fetchFile: null` |
| `@astrojs/db` removed | n/a |
| `astro:transitions` internals removed | n/a |
| Experimental flags removed because stable/default: `logger`, `queuedRendering`, `rustCompiler`, `advancedRouting`, `cache` | Delete from `experimental` |
| CSS values may serialize differently (`rebeccapurple` -> `#639`, `url()` quoting) | Cosmetic only |

Whitespace example from the v7 guide (the two elements are on separate lines in source):

```astro
<span>hello</span>
<em>world</em>
<!-- v6: "hello world"   v7 default: "helloworld" -->
<span>hello</span>{" "}<em>world</em>
```

### 2. Content collections

Sources: https://docs.astro.build/en/guides/content-collections/ ,
https://docs.astro.build/en/reference/modules/astro-content/ ,
https://docs.astro.build/en/reference/content-loader-reference/

- Config file: **`src/content.config.ts`** (`.js` / `.mjs` also supported). The old `src/content/config.ts` is gone with legacy collections.
- Imports: `defineCollection`, `reference`, `getCollection`, `getEntry`, `getEntries`, `render` from **`astro:content`**;
  `glob`, `file` from **`astro/loaders`**; **`z` from `astro/zod`** (Zod **4**; `z` from `astro:content` is deprecated since v6).
- Content files may live anywhere; `base` is relative to the project root.

```ts
// src/content.config.ts  (verbatim shape from the docs)
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
```

`glob()` options: `pattern` (`string | string[]`, micromatch syntax), `base` (`string | URL`, default `"."`),
`generateId({ entry, base, data })`, `retainBody` (default `true`, since 5.17; `false` makes `entry.body` undefined),
`deferRender` (default `false`, since 7.1).

**How `id` is derived.** Generated from the file path relative to `base`, extension removed, each path segment slugified
with `github-slugger` (kebab-case, **lowercased**), subfolders kept as `dir/name`, trailing `/index` removed. Docs example: `src/blog/hello-world.md` -> id `hello-world`. A `slug:` field in frontmatter
overrides the id and may contain slashes. To keep the original casing:

```ts
loader: glob({
  pattern: '**/*.json',
  base: './src/data/authors',
  generateId: ({ entry }) => entry.replace(/\.json$/, ''),
}),
```

Image fields use the schema function form: `schema: ({ image }) => z.object({ cover: image() })` (`image().refine()` unsupported).

Zod 4 gotchas (v6 upgrade guide): `z.string().email()` -> `z.email()`, `z.string().url()` -> `z.url()`;
`{ message: '...' }` -> `{ error: '...' }`; `.default()` after `.transform()` must match the OUTPUT type.

**Querying and rendering.**

```astro
---
import { getCollection, getEntry, render } from 'astro:content';

// Order is non-deterministic and platform-dependent: always sort yourself.
const posts = (await getCollection('blog', ({ data }) => data.draft !== true))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const entry = await getEntry('blog', 'post-1');   // undefined when missing
if (!entry) throw new Error('Entry not found');
const { Content, headings, remarkPluginFrontmatter } = await render(entry);
---
<Content />
```

- `headings` is `MarkdownHeading[]`: `{ depth: number; slug: string; text: string }` (slug via github-slugger).
- `CollectionEntry` fields: `id`, `collection`, `data`, `body` (raw uncompiled markdown, `string | undefined`),
  `rendered` (`rendered.html`, `rendered.metadata.headings`, `.imagePaths`, `.frontmatter`), `filePath` (relative to project root).
- Raw markdown for llms.txt or search indexes: `entry.body`. Pre-rendered HTML string: `entry.rendered?.html`.
- Type for props: `import type { CollectionEntry } from 'astro:content'` then `CollectionEntry<'blog'>`.

### 3. Dynamic routes and static file endpoints

Sources: https://docs.astro.build/en/reference/routing-reference/ , https://docs.astro.build/en/guides/endpoints/ ,
https://docs.astro.build/en/guides/typescript/#infer-getstaticpaths-types

Signature: `(options: GetStaticPathsOptions) => Promise<GetStaticPathsResult> | GetStaticPathsResult`.
Rules: `params` values must be **strings** (numbers throw since v6); `props` may be anything; the function runs once in an
isolated scope (only imports are visible); `Astro` must not be used inside it (use `import.meta.env.SITE`).
Use `[...slug]` (rest param) when ids contain `/`.

```astro
---
// src/pages/[slug].astro
import type { GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getCollection, render } from 'astro:content';

export const getStaticPaths = (async () => {
  const pages = await getCollection('pages');
  return pages.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
const { entry } = Astro.props;
const { Content, headings } = await render(entry);
---
<Content />
```

Static file endpoints: the `.ts` extension is stripped, so `src/pages/robots.txt.ts` builds `/robots.txt`. Export `GET`,
return a `Response`; at build time Astro writes the body to the file. Headers set on the Response are believed NOT to be
persisted in a static build (unverified, see "Could not verify" item 4). Endpoints with a file extension are never served with a
trailing slash.

```ts
// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET = (({ site }) => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}) satisfies APIRoute;
```

```ts
// src/pages/og/[slug].png.ts  (binary body)
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths = (async () => {
  const pages = await getCollection('pages');
  return pages.map((entry) => ({ params: { slug: entry.id }, props: { title: entry.data.title } }));
}) satisfies GetStaticPaths;

export const GET = (async ({ props }) => {
  const png: Uint8Array = await renderOgPng(props.title); // your own renderer (e.g. satori + resvg/sharp)
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}) satisfies APIRoute;
```

The docs' own binary example is `return new Response(await response.arrayBuffer());`. `src/pages/llms.txt.ts` follows the
robots.txt pattern, building the body from `getCollection()` and `entry.body`. In static mode only `request.url` is usable
on `request`.

### 4. astro.config options (site, trailingSlash, build.format, scripts, CSP)

Sources: https://docs.astro.build/en/reference/configuration-reference/ ,
https://docs.astro.build/en/guides/client-side-scripts/ , https://docs.astro.build/en/guides/styling/#bundle-control ,
https://docs.astro.build/en/reference/directives-reference/

| Option | Type / default | Verified behaviour |
|---|---|---|
| `site` | `string` | Final deployed URL; used for sitemap, canonical URLs, `Astro.site`, `context.site`, `import.meta.env.SITE` |
| `output` | `'static' \| 'server'`, default `'static'` | Leave as default |
| `trailingSlash` | `'always' \| 'never' \| 'ignore'`, default `'ignore'` | Affects the DEV server and on-demand routes only. "Trailing slashes on prerendered pages are handled by the hosting platform, and may not respect your chosen configuration." |
| `build.format` | `'file' \| 'directory' \| 'preserve'`, default `'directory'` | `file`: `about.astro` and `about/index.astro` both build `/about.html`. `directory`: `/about/index.html`. `preserve`: mirrors source layout |
| `build.inlineStylesheets` | `'always' \| 'auto' \| 'never'`, default `'auto'` | `auto` inlines stylesheets smaller than `vite.build.assetsInlineLimit` (4 kB); `never` always emits `<link rel="stylesheet">` |
| `build.assets` | `string`, default `'_astro'` | Output folder for hashed assets |
| `compressHTML` | `boolean \| 'jsx'`, default `'jsx'` (v7) | See section 1 |
| `scopedStyleStrategy` | `'where' \| 'class' \| 'attribute'`, default `'attribute'` | |
| `build.concurrency` | `number`, default `1` | Docs advise leaving it at 1 |

Docs pairing advice: `build.format: 'file'` with `trailingSlash: 'never'`; `'directory'` with `'always'`.
**Gotcha:** with `build.format: 'file'`, `Astro.url.pathname` during build includes `.html` (for example `/foo.html`), so never
build canonical URLs from `Astro.url` directly; strip `.html` or derive the canonical path from the route/entry id.

#### Scripts: inline vs external

A `<script>` with no attributes (other than `src`) is processed: TypeScript, bundled imports, `type="module"`, de-duplicated,
and "If the script is small enough, Astro will inline it directly into the HTML". The styling guide states that
`vite.build.assetsInlineLimit` "affects script and image inlining as well". So to force every processed script and
stylesheet into an external file:

```js
export default defineConfig({
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
```

Still inline no matter what (avoid under a strict policy): `<script is:inline>`, any `<script>` with extra attributes
(unprocessed, rendered as written), `<script define:vars={...}>` (implies `is:inline`), inline event handlers
(`onclick="..."`), and `style="..."` attributes. For a hand-written external file use
`<script is:inline src="/my-script.js"></script>` with the file in `public/`.

#### Built-in CSP: `security.csp` (stable since 6.0.0)

- `boolean | object`, default `false`. Adds `<meta http-equiv="content-security-policy">` to the `<head>` of each page with
  `script-src` and `style-src` plus hashes of the scripts and styles Astro processed for that page. For a static build this
  is the only mechanism: a meta tag, no headers.
- Not available in `astro dev`; test with `astro build` + `astro preview`.
- Documented limitations: external scripts/styles need your own hashes; `<ClientRouter />` unsupported; **Shiki unsupported**
  (inline styles; use Prism or allow style attributes); including `'unsafe-inline'` in a directive suppresses Astro's hashes.
- A `<meta>` policy cannot carry `frame-ancestors`, `report-uri` or `sandbox` (CSP spec, not Astro), so those must be
  real headers set by the host.

```js
export default defineConfig({
  security: {
    csp: {
      algorithm: 'SHA-256',                       // 'SHA-256' | 'SHA-384' | 'SHA-512'
      directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'"],
      scriptDirective: { resources: ["'self'"], hashes: [], strictDynamic: false },
      styleDirective: {
        resources: [
          "'self'",
          // v7.1+: scoped entries. Needed only if style="" attributes must be allowed (Shiki, define:vars):
          // { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
});
```

`resources` REPLACES the defaults, so `'self'` must be listed explicitly. `hashes` entries must start with `sha256-`,
`sha384-` or `sha512-`. Since v7.1 entries may be `{ hash | resource, kind: 'element' | 'attribute' | 'default' }`, mapping to
`script-src-elem` / `script-src-attr` / `style-src-elem` / `style-src-attr`.

#### Two workable CSP strategies for this site

1. **Header-based, zero inline** (our plan): `assetsInlineLimit: 0` + `inlineStylesheets: 'never'`, no `is:inline`, no
   `define:vars`, no `style=""`, no Shiki; policy `script-src 'self'; style-src 'self'` sent by the host
   (`public/_headers` on Cloudflare Pages / Netlify, `vercel.json` on Vercel). Leave `security.csp` off.
   Watch the Fonts API `<Font />` inline `<style>` (section 5) and responsive-image output (section 6).
2. **Astro-managed hashes**: `security.csp: true`; Astro hashes whatever it inlines and writes a per-page meta tag.
   Simpler, but meta-only and per-page.

### 5. Fonts

Sources: https://docs.astro.build/en/guides/fonts/ , https://docs.astro.build/en/reference/configuration-reference/#fonts ,
https://docs.astro.build/en/reference/font-provider-reference/ ,
https://docs.astro.build/en/reference/modules/astro-assets/#font-

**Status: stable since Astro 6.0.0** (top-level `fonts` array; the `experimental.fonts` flag was removed in v6).
Fonts are downloaded/copied at build time and emitted to **`_astro/fonts/`**, i.e. always self-hosted.
Built-in providers (from `astro/config`): `adobe`, `bunny`, `fontshare`, `fontsource`, `google`, `googleicons`, `local`, `npm`.

Per-family options and defaults: `name`, `cssVariable` (must start with `--`), `provider`, `weights` (`[400]`),
`styles` (`["normal", "italic"]`), `subsets` (`["latin"]`), `formats` (`["woff2"]`), `fallbacks` (`["sans-serif"]`),
`optimizedFallbacks` (`true`), `display` (`"swap"`), `unicodeRange`, `stretch`, `featureSettings`, `variationSettings`, `options`.

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  fonts: [
    // A) Fontsource catalogue, fetched at build time (needs network on first build, then cached)
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],       // variable-font range; or [400, 600, 700]
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    // B) Local files committed to the repo (fully offline, deterministic)
    {
      provider: fontProviders.local(),
      name: 'Custom',
      cssVariable: '--font-custom',
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/custom-400.woff2'] },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/custom-700.woff2'] },
          // variable font: { weight: '100 900', style: 'normal', src: ['./src/assets/fonts/InterVariable.woff2'] }
        ],
      },
    },
    // C) From an installed npm package such as @fontsource/roboto, never touching a CDN
    {
      provider: fontProviders.npm({ remote: false }),
      name: 'Roboto',
      cssVariable: '--font-roboto',
      options: { package: '@fontsource/roboto' /*, file: 'latin.css' */ },
    },
  ],
});
```

```astro
---
// src/components/Head.astro  (must be rendered inside <head>)
import { Font } from 'astro:assets';
---
<Font cssVariable="--font-inter" preload />
<!-- preload also accepts [{ weight: 400, style: 'normal', subset: 'latin' }] -->

<style is:global>
  body { font-family: var(--font-inter); }
</style>
```

`<Font />` "outputs style tags" (an inline `<style>` with the `@font-face` rules) plus optional `<link rel="preload">`.
That inline `<style>` matters for a strict `style-src` policy, see section 4.
Caches: delete `.astro/fonts` (dev) or `node_modules/.astro/fonts` (build) to reset. Preload sparingly.

**Plain `@fontsource` imports.** Importing a CSS file from an npm package (`import '@fontsource-variable/inter';` or
`@import` in a stylesheet) is ordinary Vite CSS handling and is covered generally by the styling guide
(https://docs.astro.build/en/guides/styling/#import-a-stylesheet-from-an-npm-package). The current fonts guide no longer
shows that pattern, so it is "works, but not the documented path"; you lose automatic fallback metrics and preload links.
It has one advantage for CSP: the `@font-face` rules land in the bundled external stylesheet instead of an inline `<style>`.

### 6. Images

Sources: https://docs.astro.build/en/guides/images/ , https://docs.astro.build/en/reference/modules/astro-assets/ ,
https://docs.astro.build/en/reference/configuration-reference/#image-options

- Keep optimisable images in `src/` and import them; files in `public/` are never processed and cannot be responsive.
- Default service is Sharp (`astro/assets/services/sharp`); `sharp` is an optionalDependency of `astro`, so a separate
  install is normally unnecessary. Default output format is **webp**. `alt` is mandatory on both components.
- v6 behaviour changes: crops by default when both dimensions are given, never upscales, SVG sources can be rasterised when
  `format` is set. `image.dangerouslyProcessSVG` (default `false`, since 6.3.0) gates SVG through the optimisation pipeline.
- `getImage()` is server-only (throws on the client since v6); use it for OG images, CSS backgrounds, endpoints.

```astro
---
import { Image, Picture } from 'astro:assets';
import hero from '../assets/hero.png';
import Logo from '../assets/logo.svg';   // SVG component, inlined into the HTML (since 5.7)
---
<Image src={hero} alt="Description" layout="constrained" width={800} height={600} priority />
<Picture src={hero} formats={['avif', 'webp']} alt="Description" />
<Logo width={64} height={64} fill="currentColor" />
```

Responsive images (since 5.10): `layout` is `'constrained' | 'full-width' | 'fixed' | 'none'` and auto-generates `srcset` and
`sizes`. Global defaults:

```js
image: {
  layout: 'constrained',
  responsiveStyles: true,   // default false; adds the small :where([data-astro-image]) global rules
  // breakpoints default for local services: [640, 750, 828, 1080, 1280, 1668, 2048, 2560]
},
```

`image.layout` also applies to Markdown `![]()` images. With Tailwind 4, leave `responsiveStyles` off and style yourself.
Props worth knowing: `widths` + `sizes`, `densities`, `quality` (`low|mid|high|max` or 0-100), `fit`, `position`,
`priority` (sets `loading="eager"`, `decoding="sync"`, `fetchpriority="high"`), `fallbackFormat`, `pictureAttributes`.

Content-collection images: `schema: ({ image }) => z.object({ cover: image() })`, then `<Image src={entry.data.cover} />`.

### 7. @astrojs/sitemap 3.7.x

Sources: https://docs.astro.build/en/guides/integrations-guide/sitemap/ ;
integration source and tests at https://github.com/withastro/astro/tree/main/packages/integrations/sitemap

Requires `site` (must start with `http://` or `https://`); without it the integration logs a warning and skips.
Only routes of type `page` are listed (endpoints and redirects are excluded); `404` and `500` pages are excluded automatically.

| Option | Type / default | Notes |
|---|---|---|
| `filter` | `(page: string) => boolean` | `page` is the FULL URL including `site` |
| `customPages` | `string[]` | Extra absolute URLs not built by Astro |
| `customSitemaps` | `string[]`, default `[]` (3.5.0) | Extra sitemap URLs added to the index file |
| `entryLimit` | `number`, default `45000` | Max entries per file before a new numbered file |
| `changefreq`, `lastmod`, `priority` | site-wide values | `lastmod` is a `Date`; Google ignores changefreq/priority |
| `serialize` | `(item: SitemapItem) => SitemapItem \| undefined` (may be async) | Per-URL edits; return `undefined` to drop |
| **`chunks`** | `Record<string, (item: SitemapItem) => SitemapItem \| undefined>` (**3.7.0**) | Splits into named sitemap files |
| `i18n` | `{ defaultLocale: string; locales: Record<string, string> }` | Adds `xhtml:link` alternates |
| `xslURL` | `string` (3.2.0) | Stylesheet for the XML |
| `filenameBase` | `string`, default `sitemap` (3.4.0) | Changes the `sitemap` prefix |
| `namespaces` | `{ news?, xhtml?, image?, video? }` booleans (3.6.0) | Set to `false` to drop unused `xmlns:*` |

`SitemapItem`: `{ url: string; lastmod?: string; changefreq?: ChangeFreqEnum; priority?: number; links?: LinkItem[] }`
(note `lastmod` is an ISO **string** inside `serialize`/`chunks`).

**File names.** Default: `sitemap-index.xml` + `sitemap-0.xml` (then `sitemap-1.xml`, ...). With `chunks`:
`sitemap-<key>-0.xml` per key, plus `sitemap-pages-0.xml` for every URL no chunk claimed, all listed in `sitemap-index.xml`.
So `pages` is effectively a reserved chunk name. `serialize` runs BEFORE chunking (verified in source).

```js
import sitemap from '@astrojs/sitemap';

sitemap({
  filter: (page) => !page.includes('/drafts/'),
  namespaces: { news: false, video: false, image: false, xhtml: false },
  chunks: {
    blog: (item) => {
      if (/\/blog\//.test(item.url)) return item;
    },
    services: (item) => {
      if (/\/services\//.test(item.url)) return item;
    },
  },
});
// -> sitemap-index.xml, sitemap-blog-0.xml, sitemap-services-0.xml, sitemap-pages-0.xml
```

**`trailingSlash: 'never'` + `build.format: 'file'`.** The integration's own test suite asserts that with
`trailingSlash: 'never'` URLs are `http://example.com/`, `http://example.com/one`, `http://example.com/two`
(the root keeps its slash, other pages have none, and there is no `.html` suffix). The same output is asserted for
`trailingSlash: 'ignore'` + `build.format: 'file'`. Still inspect the generated XML after the first build.

Discovery: add `<link rel="sitemap" href="/sitemap-index.xml" />` in `<head>` and a `Sitemap:` line in robots.txt.

### 8. @astrojs/rss 4.x

Source: https://docs.astro.build/en/recipes/rss/ (README: https://github.com/withastro/astro/tree/main/packages/astro-rss)

`@astrojs/rss@4.0.19` depends on `zod ^4.3.6` and `fast-xml-parser`. Needs `site` in astro.config.
Item fields: `title`, `description`, `link`, `pubDate`, `content` (title OR description required).
RSS links get a trailing slash by default regardless of astro config; with `trailingSlash: 'never'` pass `trailingSlash: false`.

```ts
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET = (async (context) => {
  const blog = await getCollection('blog');
  return rss({
    title: 'Site title',
    description: 'Site description',
    site: context.site!,          // undefined if `site` is not configured
    trailingSlash: false,         // match trailingSlash: 'never'
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}) satisfies APIRoute;
```

Optional: `stylesheet: '/rss/styles.xsl'`; `rssSchema` from `@astrojs/rss` can be used as a collection schema.
Auto-discovery tag: `<link rel="alternate" type="application/rss+xml" title="..." href={new URL('rss.xml', Astro.site)} />`.
Full-content feeds: the docs render `post.body` with `markdown-it` and pass it through `sanitize-html`.

### 9. Markdown pipeline

Sources: https://docs.astro.build/en/guides/markdown-content/ ,
https://docs.astro.build/en/reference/configuration-reference/#markdown-options ,
https://docs.astro.build/en/guides/syntax-highlighting/

- **Default processor in v7 is Sätteri** (Rust, https://satteri.bruits.org/), bundled with `astro`; zero config needed.
  `markdown.processor` exists since 6.4.0.
- **GFM is on by default** in both processors: tables, strikethrough, task lists, footnotes. **MDX is NOT needed for tables.**
  Only add `@astrojs/mdx` if components/JSX are required inside content.
- Smart punctuation is on by default (straight quotes become curly, `--` becomes a dash, `...` becomes an ellipsis).
- Heading ids: Astro injects `id` on `h1`-`h6` using `github-slugger`; ids are injected AFTER user plugins run.
  Since v6 trailing hyphens are kept (`` ## `<Picture />` `` -> `picture-`).
- Syntax highlighting default: `{ type: 'shiki', excludeLangs: ['math'] }`, theme `github-dark`. Shiki emits inline `style`
  attributes (relevant to CSP, see section 4). Alternatives: `'prism'` (class-based, bring your own stylesheet) or `false`.
- Deprecated but still working (they require `@astrojs/markdown-remark` to be installed): `markdown.remarkPlugins`,
  `markdown.rehypePlugins`, `markdown.remarkRehype`, `markdown.gfm`, `markdown.smartypants`.

Configure Sätteri (only needed to change features or add plugins; requires `npm install @astrojs/markdown-satteri`):

```js
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism', // or false, or { type: 'shiki', excludeLangs: ['mermaid', 'math'] }
    processor: satteri({
      features: {
        smartPunctuation: false, // or { quotes: true, dashes: false, ellipses: false }
        // gfm: false,
      },
      // mdastPlugins: [], hastPlugins: [],   <- Sätteri-format plugins, NOT remark/rehype
    }),
  },
});
```

Keep remark/rehype plugins (requires `npm install @astrojs/markdown-remark`):

```js
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkToc, { heading: 'contents' }]],
      rehypePlugins: [],
      // gfm: false, smartypants: false
    }),
  },
});
```

### 10. astro check and tsconfig

Sources: https://docs.astro.build/en/guides/typescript/ , https://docs.astro.build/en/reference/cli-reference/#astro-check ,
https://github.com/withastro/astro/tree/main/packages/astro/tsconfigs , `npm view @astrojs/check@0.9.10`

- Required packages: `@astrojs/check` and `typescript` as devDependencies. Peer range is `^5.0.0 || ^6.0.0`, so the
  installed **`typescript@6.0.3` is correct; do not move to 7.x** (section 1).
- `astro dev` and `astro build` do NOT type-check. `astro check` checks `.astro` and `.ts` files, runs `astro sync` first
  (generates `.astro/types.d.ts` and the `astro:content` types) and exits with code 1 on errors.
- Flags: `--watch`, `--root <dir>`, `--tsconfig <file>`, `--minimumFailingSeverity <error|warning|hint>` (default `error`),
  `--minimumSeverity <error|warning|hint>` (default `hint`), `--preserveWatchOutput`, `--noSync`.

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro check && astro build",
    "preview": "astro preview"
  }
}
```

```json
// tsconfig.json (docs recommendation, with the strict preset)
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

What the presets contain (read from the repo `main` branch):

- `base`: `target`/`module` `ESNext`, `moduleResolution: "Bundler"`, `allowImportingTsExtensions`, `resolveJsonModule`,
  `verbatimModuleSyntax: true` (so type-only imports MUST be written `import type { ... }`), `isolatedModules`, `noEmit`,
  `forceConsistentCasingInFileNames`, `esModuleInterop`, `skipLibCheck`, `allowJs`, `jsx: "preserve"`.
- `strict`: extends base, adds `"strict": true`.
- `strictest`: extends strict, adds `noFallthroughCasesInSwitch`, `noImplicitOverride`, `noImplicitReturns`,
  `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `allowUnreachableCode: false`, `allowUnusedLabels: false`.

Optional `src/env.d.ts` for global types starts with `/// <reference path="../.astro/types.d.ts" />`.

### 11. Accessibility, ClientRouter, static deployment

Sources: https://docs.astro.build/en/guides/dev-toolbar/ , https://docs.astro.build/en/guides/images/#alt-text ,
https://docs.astro.build/en/guides/view-transitions/ , https://docs.astro.build/en/guides/deploy/cloudflare/ ,
https://docs.astro.build/en/guides/deploy/netlify/ , https://docs.astro.build/en/guides/deploy/vercel/

**Accessibility.** There is no dedicated accessibility guide page (`/en/guides/accessibility/` returns 404). What exists:

- Dev toolbar **Audit** app: runs basic performance and accessibility audits on the current page in `astro dev`. Docs say
  it is "not a replacement for dedicated tools like Pa11y or Lighthouse, or even better, humans".
- `alt` is required on `<Image />` and `<Picture />` (build error without it); use `alt=""` for decorative images.
- Docs "strongly recommend you always include a `<title>` in each page".

**ClientRouter (not used).** Skipping it is the simpler path: a plain multi-page site needs no route announcer, no script
re-execution handling, and stays compatible with `security.csp` (which does not support `<ClientRouter />`). If page
animations are wanted later, browser-native cross-document view transitions are CSS-only and add no JavaScript.
`prefetch` is separate and opt-in (`prefetch.prefetchAll` defaults to `false` without `<ClientRouter />`); it injects a
client script, so leave it off for the zero-inline plan unless tested.

**Static deployment: no adapter needed.** Adapters are only for on-demand rendering. Output directory is `dist/`.

| Host | Verified from Astro docs |
|---|---|
| Netlify | "You don't need any extra configuration to deploy a static Astro site to Netlify." Build `astro build`, publish `dist`. Node must be `v22.12.0` or higher (set `NODE_VERSION` if on a legacy build image) |
| Vercel | "You don't need any extra configuration to deploy a static Astro site to Vercel." `vercel.json` can attach headers |
| Cloudflare | The Astro guide now targets **Cloudflare Workers static assets**, stating "Cloudflare recommends using Cloudflare Workers for new projects"; Pages is treated as the existing/legacy option |

```jsonc
// wrangler.jsonc for a static site (from the Astro Cloudflare guide)
{
  "name": "my-astro-app",
  "compatibility_date": "YYYY-MM-DD", // the day you deploy
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"   // needed to serve a custom 404 page
  }
}
```

Build command `npx astro build`, deploy command `npx wrangler deploy`. Cloudflare "Auto Minify" can break hydration
(irrelevant without islands). Because prerendered trailing-slash behaviour is decided by the host, confirm on the chosen
host that `/about` serves `about.html` without redirecting to `/about/` or `/about.html`.

### 12. Windows-specific issues

Sources: https://docs.astro.build/en/reference/cli-reference/#--background ,
https://docs.astro.build/en/install-and-setup/ , https://docs.astro.build/en/guides/content-collections/

Documented, Windows-specific:

- `astro dev --background` (since 7.0.0; `astro preview --background` since 7.2.0): "On Windows, automatic backgrounding
  does not happen: when an AI agent is detected, the server stays in the foreground so the agent can manage the process
  directly." The flag can still be passed manually. Practical effect: when a coding agent runs `astro dev` on this
  machine the command blocks, so run it as a background task and stop it explicitly (`astro dev stop`, `astro dev status`).
  The lock file is `.astro/dev.json` / `.astro/preview.json`.

Documented, platform-dependent (bites on Windows vs Linux CI):

- "The sort order of generated collections is non-deterministic and platform-dependent." Always `.sort()` the result of
  `getCollection()`, otherwise local Windows builds and Linux CI builds order pages differently.
- `forceConsistentCasingInFileNames` is on in all tsconfig presets. Windows file systems are case-insensitive while
  Linux build hosts are not, so an import with the wrong letter case works locally and fails in CI. Keep file names lowercase.
- Node: "`v22.12.0` or higher. Odd-numbered versions like `v23` are not supported." Local v24.19.0 is an even release.

No other Windows-specific notes were found in the upgrade guides, troubleshooting page, or deploy guides.

### Recommended astro.config.mjs

Every option below is verified against the v7 configuration reference. Replace the `site` value and chunk patterns.

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',          // no trailing slash; required by sitemap, rss, canonical URLs
  output: 'static',                     // default, shown for clarity
  trailingSlash: 'never',
  build: {
    format: 'file',                     // /about.html (docs pair this with trailingSlash: 'never')
    inlineStylesheets: 'never',         // always <link rel="stylesheet">
  },
  vite: {
    build: { assetsInlineLimit: 0 },    // no inlined scripts, styles or data: URI assets
  },
  // compressHTML: true,                // uncomment to restore pre-v7 whitespace handling
  markdown: {
    syntaxHighlight: false,             // Shiki (default) emits inline style attributes; false or 'prism' for strict CSP
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { weight: '100 900', style: 'normal', src: ['./src/assets/fonts/InterVariable.woff2'] },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      namespaces: { news: false, video: false, image: false, xhtml: false },
      chunks: {
        blog: (item) => {
          if (/\/blog\//.test(item.url)) return item;
        },
      },
    }),
  ],
});
```

If the header-based CSP must contain no inline `<style>` at all, drop the `fonts` block and `<Font />`, and import the
font CSS into the global stylesheet instead (section 5). If Astro-managed hashes are acceptable, add
`security: { csp: true }` and keep `fonts`.

### Recommended src/content.config.ts skeleton

```ts
// src/content.config.ts
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';          // Zod 4

const seo = {
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(200),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
};

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    ...seo,
    updatedDate: z.coerce.date().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      ...seo,
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      author: reference('authors'),
      tags: z.array(z.string()).default([]),
      canonical: z.url().optional(),    // Zod 4: z.url(), not z.string().url()
    }),
});

const authors = defineCollection({
  loader: file('src/data/authors.json'), // array of objects, each with a unique `id`
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { pages, blog, authors };
```

Id rules to design URLs around (verified in `packages/astro/src/content/utils.ts` and `loaders/glob.ts`): the path relative
to `base` loses its extension, each path segment is passed through `github-slugger`, segments are joined with `/`, and a
trailing `/index` is removed. So `blog/2026/My Post.md` -> `2026/my-post` and `services/index.md` -> `services`. Nested ids
need a `[...slug].astro` rest route. A frontmatter `slug` wins over all of this. Do not name a schema field `slug` for any
other purpose.

### Could not verify

Method note: docs were read from the raw sources of `withastro/docs` and `withastro/astro` (`main` branch) on 2026-09-27,
plus `npm view`. `main` can be slightly ahead of the published `astro@7.3.5` / `@astrojs/sitemap@3.7.4`. Nothing below was
confirmed by running a build. The web search quota ran out, so GitHub issues were not searched broadly.

1. **Forcing external scripts.** The styling guide says `vite.build.assetsInlineLimit` "affects script and image inlining
   as well", but the scripts guide itself names no option. Not tested on 7.3.5 (Vite 8 / Rolldown). After the first build,
   search `dist/**/*.html` for `<script` tags without `src` and for `<style` tags.
2. **`<Font />` and CSP.** Docs only say it "outputs style tags". Whether that is always an inline `<style>`, and whether
   `security.csp` hashes it, is not stated.
3. **Responsive image inline styles.** The v6 upgrade guide says inline `style="--fit; --pos"` was replaced by a hashed class
   plus `data-astro-fit` / `data-astro-pos`, but the images guide still shows `style="--fit: cover; --pos: center;"` in its
   sample output. Inspect real output before relying on either.
4. **Response headers from static endpoints.** Section 3 states that headers set on a `Response` are not persisted in a
   static build. This is from prior knowledge, not from the current docs. Set Content-Type via host config if it matters.
5. **Prism for Markdown.** `markdown.syntaxHighlight: 'prism'` is documented; whether `@astrojs/prism` must be installed
   separately for Markdown code blocks (it must for the `<Prism />` component) is not stated.
6. **TypeScript 7 timeline.** No official date for `@astrojs/check` support. Issue #17268 references PR #18053, which was
   not read.
7. **Host trailing-slash behaviour.** Whether Cloudflare, Netlify or Vercel serve `about.html` at `/about` without a
   redirect is host documentation, not checked here.
8. **Sitemap edge cases.** Behaviour when a `chunks` function matches zero URLs (empty file or none) and per-chunk
   `lastmod` in the index were seen only in `main` source, not confirmed for 3.7.4.
9. **github-slugger on unusual filenames.** Effect of dots, underscores or non-ASCII characters in filenames on the
   generated id was not tested. Keep content filenames lowercase kebab-case.
10. **tsconfig `include`/`exclude`.** On `main`, `base.json` already sets them using `${configDir}`; whether the published
    7.3.5 preset does too was not checked. Keeping them in `tsconfig.json` as the docs show is harmless.
11. **Windows.** No documented problems for `sharp@0.35.4`, `@astrojs/compiler-rs` or Sätteri native binaries on Windows
    were found, but absence from the docs is not proof.

## AI agents, AI security and AI governance

Source file: `docs/research/04-ai-agents-security-governance.md`

Research date: 2026-09-27. Primary sources only; anything not confirmed from an authoritative source is listed under "Could not verify".

### 1. AI agents in production

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Production agent architecture has converged on separating the model loop ("harness") from execution environments (sandbox, tools) and from a durable, append-only session log held outside the model context window. Anthropic's Claude Managed Agents (public beta) documents this split and keeps credentials in a vault reached through a proxy, not in the sandbox. | https://www.anthropic.com/engineering/managed-agents | 2026-04-08 | The session log is the primary evidence artefact. Assurance asks whether it is complete, tamper-evident and retained for the required period. | ai-agent-assurance, ai-audit-readiness, production-ai-going-live |
| Anthropic: Claude Agent SDK (Python, TypeScript) runs the Claude Code agent loop in the customer's own process; controls are permission rules (allow / deny / ask), hooks (for example `PreToolUse` can deny a call) and sandboxing. | https://code.claude.com/docs/en/agent-sdk/secure-deployment ; https://platform.claude.com/docs/en/agent-sdk/hooks | Current docs, fetched 2026-09-27 | Permission rules and hooks are configuration; configuration drifts. | ai-agent-assurance, ai-agent-with-write-access |
| Microsoft Agent Framework 1.0 reached GA on 2026-04-03 (.NET and Python). It unifies Semantic Kernel and AutoGen; supports MCP and A2A, checkpointing, human-in-the-loop approvals, pause/resume, middleware and OpenTelemetry observability. | https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/ | 2026-04-03 | Semantic Kernel and AutoGen are predecessor names. Content must not present them as Microsoft's current agent SDK. | ai-agent-assurance |
| Google Agent Development Kit (ADK) 2.0 is GA: Python 2026-05-19, Go 2026-06-30, TypeScript 2026-08-21. Agents execute as nodes in a graph engine; 2.0 has breaking changes from 1.x including event schema changes for custom session storage. | https://adk.dev/2.0/ | 2026-08-21 | A framework major-version upgrade changes the event schema, so log parsers and evidence pipelines must be re-validated. | ai-agent-assurance, ai-audit-readiness |
| OpenAI Agents SDK primitives: agents, handoffs, guardrails, sessions, tracing, sandbox agents, human-in-the-loop, MCP. | https://openai.github.io/openai-agents-python/ | Current docs, fetched 2026-09-27 | Guardrails are scoped to specific agents or tools; OpenAI's guide says to put validation next to the tool that creates the side effect. | ai-agent-assurance, ai-agent-with-write-access |
| Amazon Bedrock AgentCore: Policy GA (2026-03), Evaluations GA (2026-03), on-behalf-of token exchange in Identity (2026-04), AWS Agent Registry GA (2026-08), Identity consent portal (2026-09). Harness sessions run in isolated microVMs. | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html | 2026-09 | Managed platforms now ship policy, identity, registry and evaluation as separate services. Each is a separate place for configuration to diverge from intent. | ai-agent-assurance, ai-agent-with-write-access |
| Claude Managed Agents is still in beta as of 2026-09-27: all endpoints require the `managed-agents-2026-04-01` beta header. Sessions store conversation history, sandbox state and outputs server-side, so the service "is not currently eligible for Zero Data Retention or HIPAA Business Associate Agreement (BAA) coverage". Environments can be Anthropic-managed or self-hosted sandboxes. | https://platform.claude.com/docs/en/managed-agents/overview | Fetched 2026-09-27 | Stateful agent platforms change the data-retention position. Eligibility for ZDR or a BAA is a per-feature fact that must be re-checked when the architecture changes. | healthcare-ai-assurance, ai-agent-assurance, production-ai-going-live |
| A2A release history: v1.0.0 on 2026-03-12 (breaking changes: modernised OAuth flows, removed deprecated fields, protocol separated from transport mappings); v1.0.1 on 2026-05-28 (fixes). Agent card signatures and mTLS schemes were added in v0.3.0 (2025-07-30). | https://github.com/a2aproject/A2A/releases | 2026-05-28 | Integrations built on 0.x need re-verification against 1.0 semantics. | ai-agent-assurance |
| Agent2Agent (A2A) protocol: current released version 1.0.0. Hosted by the Linux Foundation (originated at Google). Bindings: JSON-RPC 2.0, gRPC, HTTP+JSON. Agent Cards describe identity, skills and security schemes and may be cryptographically signed. Task states include `INPUT_REQUIRED` and `AUTH_REQUIRED`. | https://a2a-protocol.org/latest/specification/ ; https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year | 2026-04-09 (press release) | Agent Card signatures are optional. Whether a counterparty agent's card is signed and verified is a checkable fact per integration. | ai-agent-assurance, ai-security-assurance |
| A2A and MCP are positioned as complementary: A2A for agent-to-agent communication across organisational boundaries, MCP for connecting agents to tools and data. Linux Foundation reports 150+ supporting organisations for A2A. | https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year | 2026-04-09 | Two protocols means two trust boundaries to evidence. | ai-agent-assurance, mcp-security-assurance |
| Microsoft AI Red Team published v2.0 of its Taxonomy of Failure Modes in Agentic AI Systems (v1.0 was April 2025). New categories include agentic supply chain compromise, goal hijacking, inter-agent trust escalation, computer-use agent visual attack, session context contamination, MCP/plugin abuse and capability/architecture disclosure. It cites 99 CVEs published for MCP-related software in 2025. | https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/ | 2026-06-04 | Threat models written against the 2025 taxonomy miss whole categories. Threat model currency is itself evidence that expires. | ai-agent-assurance, ai-security-assurance |
| Same source reports human-in-the-loop bypass through consent fatigue and incremental escalation, and memory poisoning combined with cross-domain prompt injection so that one injection persists into later sessions. | https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/ | 2026-06-04 | An approval gate that exists but is always clicked through is not a control. Approval quality needs measurement (rejection rate, time-to-decision). | ai-agent-with-write-access, ai-agent-assurance |
| OWASP Top 10 for Agentic Applications 2026 names cascading failures and rogue agents as distinct risk categories (see section 5). | https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ | 2025-12-09 | Failure in multi-agent systems propagates; assurance must cover the chain, not the single agent. | ai-agent-assurance |

### 2. Model Context Protocol (MCP)

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Current MCP specification revision is `2026-07-28` (previous: `2025-11-25`). Described by maintainers as the largest revision since launch. | https://modelcontextprotocol.io/specification/2026-07-28/changelog ; https://blog.modelcontextprotocol.io/posts/2026-07-28/ | 2026-07-28 | Any assurance statement naming an older revision as "current" is stale. Protocol revision in use is itself an assured attribute. | mcp-security-assurance, ai-agent-assurance |
| MCP is now stateless: `initialize`/`initialized` handshake removed; protocol-level sessions and `Mcp-Session-Id` header removed; every request carries protocol version and client capabilities in `_meta`; servers MUST implement `server/discover`. | https://modelcontextprotocol.io/specification/2026-07-28/changelog (SEP-2567, SEP-2575) | 2026-07-28 | Controls built on session IDs (session pinning, session-scoped allowlists) no longer map to the protocol. Evidence gathered against session semantics expires on upgrade. | mcp-security-assurance |
| Transports: stdio and Streamable HTTP. HTTP+SSE transport (deprecated since `2025-03-26`) is formally "Deprecated" under the new lifecycle policy. SSE resumability (`Last-Event-ID`) removed. Streamable HTTP POSTs must carry `Mcp-Method` and `Mcp-Name` headers so gateways can route and authorise without parsing bodies. | https://modelcontextprotocol.io/specification/2026-07-28/changelog (SEP-2243, SEP-2596) | 2026-07-28 | Header-based routing makes gateway-level policy enforcement and logging practical; verify the gateway rejects header/body mismatch. | mcp-security-assurance, ai-agent-with-write-access |
| Server-initiated requests replaced by Multi Round-Trip Requests: server returns `resultType: "input_required"` with `inputRequests`; client retries with `inputResponses`. Used for elicitation (mid-call confirmation or missing parameters). | https://modelcontextprotocol.io/specification/2026-07-28/changelog (SEP-2322) | 2026-07-28 | This is the protocol-level hook for approval gates. Prove the client surfaces the request to a human rather than auto-answering. | mcp-security-assurance, ai-agent-with-write-access |
| Tasks moved out of core into official extension `io.modelcontextprotocol/tasks` (poll via `tasks/get`, input via `tasks/update`). Roots, Sampling and Logging are deprecated; minimum twelve-month deprecation window. Logging guidance: stderr or OpenTelemetry; trace context keys (`traceparent`, `tracestate`, `baggage`) documented for `_meta`. | https://modelcontextprotocol.io/specification/2026-07-28/changelog (SEP-2663, SEP-2577, SEP-414) | 2026-07-28 | Audit trails that depended on MCP Logging need a replacement path before removal. Trace propagation enables end-to-end action lineage. | mcp-security-assurance, ai-audit-readiness |
| Authorization is OPTIONAL in MCP; when used over HTTP it is OAuth 2.1 based. MCP servers MUST implement Protected Resource Metadata (RFC 9728). Clients MUST send the `resource` parameter (RFC 8707) in authorization and token requests. Servers MUST validate the token audience and "MUST NOT accept or transit any other tokens". | https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization | 2026-07-28 | "MCP server is deployed" does not imply "MCP server is authenticated". Audience validation and no-passthrough are testable, repeatable checks. | mcp-security-assurance, ai-security-assurance |
| Client registration: Client ID Metadata Documents (CIMD) are preferred; OAuth Dynamic Client Registration (RFC 7591) is deprecated, kept for backward compatibility. Clients MUST validate `iss` (RFC 9207) when present; client credentials are bound to the issuing authorization server. | https://modelcontextprotocol.io/specification/2026-07-28/changelog (SEP-2468, SEP-2352, PR 2858) | 2026-07-28 | DCR-based deployments are now legacy. Mix-up attack protection depends on the authorization server emitting `iss`; the spec says a future revision is expected to make it a MUST. | mcp-security-assurance |
| Scope model: servers SHOULD challenge with the minimum scopes per operation; step-up authorization on `403 insufficient_scope`. Guidance names wildcard/omnibus scopes and publishing every scope in `scopes_supported` as common mistakes. | https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization ; https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices | 2026-07-28 | Scope drift is measurable: granted scopes vs scopes actually exercised. | mcp-security-assurance, ai-agent-with-write-access |
| Official Security Best Practices cover: confused deputy (proxy servers MUST implement per-client consent), token passthrough (forbidden), SSRF in OAuth discovery, state handle hijacking (replaces session hijacking; possession of a handle MUST NOT be treated as authentication), local MCP server compromise (client MUST show the exact command and require consent), OAuth URL validation, mix-up attacks, localhost redirect impersonation, scope minimization. | https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices | 2026-07-28 | Each item is a control that can be tested on a schedule and after every server or client change. | mcp-security-assurance, ai-security-assurance |
| Tools spec: "there SHOULD always be a human in the loop with the ability to deny tool invocations"; clients MUST treat tool annotations as untrusted unless from trusted servers; clients SHOULD log tool usage for audit; servers MUST validate inputs, enforce access control, rate limit and sanitise outputs. | https://modelcontextprotocol.io/specification/2026-07-28/server/tools | 2026-07-28 | Human oversight is a SHOULD, not a MUST. Whether it exists in a given deployment has to be proven, not assumed. | mcp-security-assurance, ai-agent-with-write-access |
| Maintainers state annotations (`readOnlyHint`, `destructiveHint` etc.) do not prevent prompt injection and are not enforcement; risk depends on the combination of tools in a session (private data + untrusted content + external communication). Guarantees need deterministic controls such as network controls or sandboxing. | https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/ | 2026-03-16 | Per-tool review is insufficient; the assured unit is the tool combination available to one agent session. | mcp-security-assurance, ai-agent-assurance |
| Tool lists can change at runtime (`notifications/tools/list_changed`); list results now carry `ttlMs` and `cacheScope`. Tool definitions are therefore mutable after approval (the "rug pull" condition). MITRE ATLAS catalogues "AI Agent Tool Poisoning" with sub-techniques for definition/instructions, implementation and runtime response. | https://modelcontextprotocol.io/specification/2026-07-28/server/tools ; https://github.com/mitre-atlas/atlas-data/releases (v2026.07) | 2026-07-28 ; 2026-08-07 | Approval of a tool is evidence about one definition at one time. Re-verify by hashing definitions and comparing on every list change. | mcp-security-assurance, ai-security-assurance |
| Enterprise-Managed Authorization extension: identity provider centrally decides which MCP servers a user's client may reach, using the Identity Assertion JWT Authorization Grant (ID-JAG). The official extensions repository lists Enterprise-Managed Authorization as stable and Client Credentials as draft. Named supporters include Okta, Anthropic and Microsoft (VS Code). | https://blog.modelcontextprotocol.io/posts/enterprise-managed-auth/ ; https://github.com/modelcontextprotocol/ext-auth | 2026-06-18 ; repo fetched 2026-09-27 | Moves MCP access decisions into the IdP audit trail. Assurance check: are any MCP connections made outside IdP policy. | mcp-security-assurance, ai-governance-assurance |
| Official MCP Registry is still labelled "currently in preview" in the official docs. It verifies namespace ownership (GitHub, DNS or HTTP challenge) and hosts metadata only; security scanning is delegated to package registries and downstream aggregators. It does not support private servers. | https://modelcontextprotocol.io/registry/about | Fetched 2026-09-27 (preview launched 2025-09-08) | Registry listing proves who published, not that the server is safe. It is discovery metadata, not a security attestation. | mcp-security-assurance |
| Roadmap (2026-08-22) priorities include agent identity and enterprise security: DPoP (proof-of-possession tokens) and Workload Identity Federation. | https://blog.modelcontextprotocol.io/posts/mcp-roadmap/ | 2026-08-22 | Bearer tokens remain the norm today; sender-constrained tokens are roadmap, not baseline. | mcp-security-assurance |
| Governance: MCP was contributed to the Agentic AI Foundation (AAIF), hosted by the Linux Foundation, alongside goose (Block) and AGENTS.md (OpenAI). A formal feature lifecycle (Active, Deprecated, Removed) now applies. | https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation ; https://modelcontextprotocol.io/specification/2026-07-28/changelog | 2025-12-09 ; 2026-07-28 | Deprecation windows give a dated deadline against which to track remediation. | mcp-security-assurance, ai-governance-assurance |
| OWASP GenAI Security Project publishes "A Practical Guide for Secure MCP Server Development". | https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/ | Date not confirmed | Independent baseline for MCP server review. | mcp-security-assurance |

### 3. Tool calling, agent permissions and agent identity

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Microsoft Entra Agent ID is generally available. Constructs: agent identity (no credentials of its own), agent identity blueprint (holds credentials, carries Conditional Access policy for all its agents), optional agent's user account, and owners / sponsors / managers. Microsoft states traditional service principals and regular user accounts are "not recommended for AI agents". | https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id ; https://learn.microsoft.com/en-us/entra/agent-id/key-concepts | Docs dated 2026-05-01 and 2026-04-03; updated 2026-08-13 | Agents running on shared service principals or human accounts are a measurable gap. Sponsor assignment is a lifecycle control that lapses when people move. | ai-agent-with-write-access, ai-agent-assurance, ai-governance-assurance |
| Entra distinguishes interactive agents (on-behalf-of flow, delegated permissions) from autonomous agents (own identity, client credentials flow). Conditional Access templates exist for each, plus a template to block high-risk agent identities. Lifecycle workflows transfer sponsorship when a sponsor leaves, to prevent orphaned agents. | https://learn.microsoft.com/en-us/entra/agent-id/key-concepts ; https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id | Updated 2026-08-13 | The OBO vs autonomous distinction determines whose authority an action carries. Audit evidence must show both the agent and the user where delegation applies. | ai-agent-with-write-access, ai-audit-readiness |
| Microsoft Agent 365 has been GA since 2026-05-01: control plane to observe, govern and secure agents; agent registry (converging from Entra); discovery of unmanaged local agents through Defender and Intune; registry sync with AWS Bedrock and Google (public preview at GA). | https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/ | 2026-05-01 | Inventory completeness is the first assurance question: agents not in the registry cannot be governed. | ai-governance-assurance, ai-agent-assurance |
| Google Cloud Agent Identity is GA: SPIFFE-formatted identity per agent, auto-provisioned X.509 certificates with 24-hour validity, access tokens bound to the certificate via mTLS, DPoP binding through Agent Gateway. Unlike service accounts, agent identities are not shared by default, cannot be impersonated and have no long-lived keys. Logs show both agent and user identity when acting on a user's behalf. | https://docs.cloud.google.com/iam/docs/agent-identity-overview | Updated 2026-09-24 | Sets a vendor baseline: short-lived, bound credentials and dual-identity logging. Long-lived API keys held by agents now fall below the platform norm. | ai-agent-with-write-access, ai-security-assurance |
| Amazon Bedrock AgentCore Policy (GA 2026-03) evaluates deterministic authorization rules written in Cedar at the AgentCore Gateway, outside the model. Bedrock Guardrails can be referenced from policy (2026-07). Identity supports on-behalf-of token exchange (2026-04), private key JWT client authentication (2026-07) and a managed consent portal (2026-09). | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html | 2026-09 | Policy evaluated outside the model is enforceable regardless of prompt content. Assurance checks that the policy set matches the approved intent and that default is deny. | ai-agent-with-write-access, ai-security-assurance |
| Anthropic deployment guidance: keep credentials outside the agent's security boundary and inject them at a proxy so "the agent never sees the actual credentials"; restrict network to an allowlist via proxy; mount filesystems read-only where possible; log all traffic at the proxy. Isolation options ranked: sandbox runtime, containers, gVisor, VMs (Firecracker). The permission gate is described as "not a sandbox". | https://code.claude.com/docs/en/agent-sdk/secure-deployment | Fetched 2026-09-27 | Separates approval (permission rules) from containment (sandbox). Both need independent evidence. | ai-agent-with-write-access, ai-security-assurance, production-ai-going-live |
| Joint government guidance "Careful Adoption of Agentic AI Services" exists and is confirmed on cisa.gov: released by CISA "in collaboration with the Australian Signals Directorate's Australian Cyber Security Centre (ASD's ACSC) and other international and U.S. partners". It covers key security challenges and risks of agentic AI and "actionable steps for designing, deploying, and operating these systems safely", and aligning AI risk management with existing cybersecurity frameworks. | https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services | 2026-05-01 (CISA page) | A government baseline for agentic AI now exists. Cite the CISA page; do not name co-authors beyond CISA and ASD's ACSC without reading the PDF. | ai-agent-with-write-access, ai-security-assurance, ai-governance-assurance |
| Detail of that guidance, from a CSA research note and not read in the primary PDF: five risk categories (privilege escalation, design and configuration failures, behavioural misalignment, structural brittleness, accountability gaps); recommends cryptographically anchored agent identities with short-lived credentials, least-privilege tool access, human approval for high-impact actions, logging of decision chains and tool invocations, incremental deployment. The note names NSA, Canadian Centre for Cyber Security, UK NCSC and NZ NCSC as co-authors. | https://labs.cloudsecurityalliance.org/research/csa-research-note-cisa-agentic-ai-adoption-guidance-20260522/ | 2026-05-22 (secondary) | Useful for control mapping. Secondary-sourced: confirm wording in the PDF before quoting. | ai-agent-with-write-access, ai-security-assurance |
| NIST NCCoE concept paper "Accelerating the Adoption of Software and AI Agent Identity and Authorization" released 2026-02-05; comments closed 2026-04-02. It is a concept paper, not guidance. | https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd | 2026-02-05 | No NIST-final agent identity standard exists yet. Do not cite one. | ai-agent-with-write-access, ai-governance-assurance |
| NIST CAISI launched the AI Agent Standards Initiative (announced 2026-02-17): industry-led standards, community protocols, research on agent authentication and identity. | https://www.nist.gov/caisi/ai-agent-standards-initiative | 2026-02-17 | Standards for agents are in formation; controls must be justified on first principles and vendor documentation today. | ai-governance-assurance |
| MCP guidance on scopes: avoid wildcard scopes; log elevation events with correlation IDs; treat claimed scopes as insufficient without server-side authorization logic. | https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices | 2026-07-28 | Granted-versus-used scope is a continuous least-privilege measurement. | mcp-security-assurance, ai-agent-with-write-access |
| Audit logging sources now available by default: MCP clients SHOULD log tool usage; OpenTelemetry trace context propagates through MCP `_meta`; Microsoft Agent Framework and AgentCore expose OpenTelemetry-based observability; Entra blueprint principals "appear in audit logs". | https://modelcontextprotocol.io/specification/2026-07-28/changelog ; https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/ ; https://learn.microsoft.com/en-us/entra/agent-id/key-concepts | 2026 | Logs exist in several systems. The assurance task is correlation: one action, one identity, one approval, one outcome. | ai-audit-readiness, ai-agent-with-write-access |

### 4. Human-in-the-loop

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Interrupt / resume is the common implementation pattern. OpenAI Agents SDK: a tool needing approval records an interruption; the run returns `interruptions` plus a resumable `state` that can be serialised, stored and resumed after the decision. | https://developers.openai.com/api/docs/guides/agents/guardrails-approvals ; https://openai.github.io/openai-agents-python/human_in_the_loop/ | Fetched 2026-09-27 | The serialised state and the approval decision are evidence. Retain both, linked to the approver's identity. | ai-agent-with-write-access, ai-audit-readiness |
| LangGraph: `interrupt()` pauses a graph; requires a checkpointer and `thread_id`; resumed with `Command(resume=...)`. On resume the node re-executes from its start, so side effects before the interrupt must be idempotent. | https://docs.langchain.com/oss/python/langgraph/interrupts | Fetched 2026-09-27 | A badly placed approval gate can run a write twice. Approval logic needs testing, not only presence. | ai-agent-with-write-access, production-ai-going-live |
| Microsoft Agent Framework 1.0 orchestration supports checkpointing, human-in-the-loop approvals and pause/resume for long-running workflows. Google ADK 2.0 includes human input and tool confirmation in its graph workflows. | https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/ ; https://adk.dev/2.0/ | 2026-04-03 ; 2026-08-21 | Approval is a framework feature that must be switched on and scoped per tool. Default state differs by framework. | ai-agent-with-write-access |
| Protocol-level patterns: MCP `input_required` results (elicitation) and A2A task states `INPUT_REQUIRED` and `AUTH_REQUIRED` let a remote tool or agent hand control back for human input. | https://modelcontextprotocol.io/specification/2026-07-28/changelog ; https://a2a-protocol.org/latest/specification/ | 2026-07-28 ; 2026 | Escalation crosses system boundaries. Verify the request reaches a person with authority and is not auto-answered by an upstream agent. | ai-agent-assurance, mcp-security-assurance |
| Claude Agent SDK / Claude Code: every tool and bash command can be set to allow, block or prompt for approval; organisations can set policies across users; hooks can deny before execution. | https://code.claude.com/docs/en/agent-sdk/secure-deployment | Fetched 2026-09-27 | Organisation policy versus local override is a drift point. | ai-agent-with-write-access |
| OpenAI agent safety guidance: keep tool approvals on so end users can review operations; pass untrusted input through user messages, not developer messages; use structured outputs between nodes to remove free-form channels. It states complete elimination of injection risk is not possible. | https://developers.openai.com/api/docs/guides/agent-builder-safety | Fetched 2026-09-27 | Human approval is positioned by vendors as a compensating control for an unsolved problem. Its effectiveness is therefore material. | ai-agent-with-write-access, ai-security-assurance |
| Microsoft guidance calls human-in-the-loop "the last line of defense". Microsoft AI Red Team reports it being bypassed through consent fatigue and incremental escalation. | https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection ; https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/ | 2026-03-19 ; 2026-06-04 | The last line of defence degrades with volume. Track approvals per reviewer per hour, approval rate, and time to decision. | ai-agent-with-write-access, ai-agent-assurance |
| EU AI Act Article 14 (high-risk systems): must be designed so natural persons can effectively oversee them; oversight commensurate with risk, level of autonomy and context; overseers must be able to understand capacities and limitations, stay aware of automation bias, interpret output, decide not to use or to override, and interrupt through a "stop" button or similar. Applies to Annex III systems from 2027-12-02. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14 | Regulation (EU) 2024/1689; date per Regulation (EU) 2026/1744 | The legal test is effectiveness of oversight, including automation bias. A click-through approval does not evidence that. | ai-governance-assurance, ai-audit-readiness, financial-services-ai-assurance, healthcare-ai-assurance, insurance-claims-ai-assurance |
| Colorado SB26-189: consumers gain the right to request meaningful human review and reconsideration after an adverse consequential decision; developer documentation must include instructions for appropriate use and human review. Operative requirements start 2027-01-01. | https://leg.colorado.gov/bills/sb26-189 | Signed 2026-05-14 | Human review becomes a consumer-facing right with a records obligation (three years). | ai-governance-assurance, insurance-claims-ai-assurance, financial-services-ai-assurance |
| EIOPA Opinion on AI governance and risk management (2025-08-06) expects sufficient staff training to ensure effective human oversight of AI systems in insurance, for systems that are neither prohibited nor high-risk under the AI Act. | https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en | 2025-08-06 | Oversight competence is evidence too: training records expire as systems and staff change. | insurance-claims-ai-assurance, ai-governance-assurance |

### 5. Prompt injection and AI security

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| The current edition is "OWASP Top 10 for LLM Applications 2026" (Version 2026), confirmed from the OWASP PDF. The OWASP resource page gives 2026-08-03; the PDF cover shows "August 4th, 2026". The PDF revision history lists the previous edition as "Version 2025" (2024-11-18). The OWASP landing page at /llm-top-10/ still displayed the 2025 list when fetched. | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ ; PDF: https://genai.owasp.org/download/56857/?tmstv=1785822482 | 2026-08-03 / 2026-08-04 | The 2025 edition is no longer current. Quote the date as "August 2026" given the one-day discrepancy. | ai-security-assurance, ai-assurance |
| 2026 entries, verbatim from the OWASP PDF: LLM01:2026 Prompt Injection; LLM02:2026 Sensitive Information Disclosure; LLM03:2026 Excessive Agency; LLM04:2026 Supply Chain; LLM05:2026 Data and Model Poisoning; LLM06:2026 Unbounded Consumption; LLM07:2026 Misinformation; LLM08:2026 Hidden Context Exposure; LLM09:2026 Vector and Embedding Weaknesses; LLM10:2026 Improper Output Handling. | PDF: https://genai.owasp.org/download/56857/?tmstv=1785822482 | 2026-08 | Primary-sourced. IDs changed meaning between editions, so always write the year suffix. | ai-security-assurance, ai-agent-with-write-access |
| OWASP's own account of the changes: Excessive Agency "climbed to third, the most consequential move on the list"; Unbounded Consumption rose four places; Improper Output Handling fell from fifth to tenth; System Prompt Leakage "is now Hidden Context Exposure". Prompt Injection now covers cross-modal attacks; Improper Output Handling now spans insecure generated code. | PDF: https://genai.owasp.org/download/56857/?tmstv=1785822482 (What's New in the 2026 Top 10) | 2026-08 | OWASP states the rise of Excessive Agency reflects where damage is landing in agentic deployments. Supports the case for assuring agent authority, not only model output. | ai-security-assurance, ai-agent-with-write-access, ai-agent-assurance |
| OWASP draws the boundary between its two lists: the LLM list "owns the risk when the model is a component inside your application"; once the model becomes an actor with tools, memory and downstream consequences, "the risk moves to the OWASP Agentic Top 10". It advises pairing both lists. | PDF: https://genai.owasp.org/download/56857/?tmstv=1785822482 | 2026-08 | Gives a standards-body basis for separate ai-security-assurance and ai-agent-assurance pages. | ai-security-assurance, ai-agent-assurance |
| 2025 edition for reference: LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector and Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption. | https://genai.owasp.org/llm-top-10/ | 2025 edition | Control mappings keyed to 2025 IDs need re-mapping; IDs changed meaning between editions. | ai-security-assurance |
| OWASP Top 10 for Agentic Applications 2026 (Version 2026, December 2025; resource page dated 2025-12-09). Entries verbatim from the OWASP PDF: ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents. | https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ ; PDF: https://genai.owasp.org/download/52117/?tmstv=1765059207 | 2025-12-09 | Primary-sourced. Agent assurance content should reference ASI IDs, not only LLM IDs. ASI IDs carry no year suffix in the PDF. | ai-agent-assurance, ai-security-assurance, mcp-security-assurance |
| The same document introduces "Least-Agency": avoid unnecessary autonomy, because "deploying agentic behavior where it is not needed expands the attack surface without adding value". It states "strong observability becomes non-negotiable". It also recommends per-tool least-privilege profiles and protocol pinning with version enforcement for inter-agent communication. | PDF: https://genai.owasp.org/download/52117/?tmstv=1765059207 | 2025-12 | Least agency is a design-time claim that needs run-time proof: autonomy granted versus autonomy needed. Observability is named by OWASP as a precondition. | ai-agent-assurance, ai-agent-with-write-access, ai-audit-readiness |
| OWASP Agentic Security Initiative also lists: State of Agentic AI Security and Governance, A Practical Guide for Secure MCP Server Development, Agent Control Standard (ACS), and an AI Security Solutions Landscape for Agentic AI (Q2 2026). | https://genai.owasp.org/initiatives/agentic-security-initiative/ | Fetched 2026-09-27 | Supporting references for control design. | ai-agent-assurance, mcp-security-assurance |
| MITRE ATLAS now releases monthly with date-based versions. v2026.09 (2026-09-15): 16 tactics, 120 techniques, 88 sub-techniques, 40 mitigations, 73 case studies. v2026.07 added AI Agent Tool Poisoning with three sub-techniques. v2026.08 added autonomous reconnaissance and agent communication techniques and renamed the tactic "AI Attack Staging" to "AI Attack Adaptation". | https://github.com/mitre-atlas/atlas-data/releases | 2026-09-15 | Technique counts quoted from 2025 are obsolete. A threat model mapped to ATLAS has a shelf life of about one month before new techniques appear. | ai-security-assurance, ai-agent-assurance |
| NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations, is the latest edition (final, 2025-03-24). No 2026 edition was found. | https://csrc.nist.gov/pubs/ai/100/2/e2025/final | 2025-03-24 | Stable terminology reference for direct and indirect prompt injection, poisoning, evasion and privacy attacks. | ai-security-assurance |
| Vendor consensus: indirect prompt injection cannot be fully prevented. Microsoft: "Assume indirect prompt injection will happen"; combine probabilistic defences (Prompt Shields, spotlighting) with deterministic ones (information flow control, least privilege, short-lived privileges, human-in-the-loop). | https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection | 2026-03-19 | Assurance shifts from "is injection blocked" to "is the blast radius bounded and re-proven". | ai-security-assurance, ai-agent-with-write-access |
| Anthropic: prompt injection in browser agents remains unsolved; reported a 1% attack success rate for Claude Opus 4.5 and stated this "still represents meaningful risk" and that "no browser agent is immune to prompt injection". Defences: reinforcement learning on simulated injections, classifiers on untrusted content, red teaming. | https://www.anthropic.com/research/prompt-injection-defenses | 2025-11-24 | Robustness is a measured rate tied to one model version and one attack set. It expires on model change. Figures for later models were not retrieved. | ai-security-assurance, production-ai-going-live |
| Anthropic deployment docs define the threat model as unintended actions due to prompt injection or model error, and recommend defence in depth such as network controls that block exfiltration even if the agent is compromised. | https://code.claude.com/docs/en/agent-sdk/secure-deployment | Fetched 2026-09-27 | Containment controls are testable deterministically; model resistance is not. | ai-security-assurance |
| MCP maintainers: tool annotations do not stop prompt injection; session-level risk comes from combining private data access, untrusted content and external communication. | https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/ | 2026-03-16 | Check each agent for the three-way combination after every tool addition. | mcp-security-assurance, ai-security-assurance |
| ISO/IEC 27090 (cybersecurity guidance on security threats to AI systems) was reported at FDIS stage in 2026; publication status not confirmed. | https://www.iso.org/standard/27090 | Not confirmed | Do not cite as published until checked. | ai-security-assurance |
| CSA publishes MAESTRO (agentic threat modelling, seven layers; 2025-02-06) and the AI Controls Matrix (AICM). | https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro | 2025-02-06 | Alternative control and threat frameworks customers may be audited against. | ai-security-assurance, ai-governance-assurance |

### 6. AI governance and regulation

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| EU AI Act was amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI), dated 2026-07-08, published in the Official Journal 2026-07-24, in force 2026-07-27. | https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng ; https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force | 2026-07-27 | Any content stating that high-risk obligations apply from 2 August 2026 is wrong as of this date. | ai-governance-assurance, ai-audit-readiness, ai-assurance |
| High-risk obligations now apply from 2027-12-02 for Annex III systems (Article 6(2)) and from 2028-08-02 for systems in Annex I regulated products (Article 6(1)). | https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force ; https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act | 2026-07-27 | The deadline moved; the obligations did not change in kind. Evidence built now will be 14+ months old at application unless it is kept current. | ai-governance-assurance, financial-services-ai-assurance, healthcare-ai-assurance, insurance-claims-ai-assurance |
| In force as of September 2026: prohibitions and general provisions (since 2025-02-02); GPAI model obligations (since 2025-08-02); Article 50 transparency rules and Commission enforcement powers over GPAI providers, including fines (since 2026-08-02). | https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act ; https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai | Fetched 2026-09-27 | Article 50 already applies to agents and chatbots that interact directly with people: they must be informed they are dealing with an AI system. | ai-governance-assurance, ai-agent-assurance |
| Upcoming: 2026-12-02 new prohibitions apply (AI generating non-consensual intimate images and child sexual abuse material) and the Article 50(2) marking transition ends for generative systems placed on the market before 2026-08-02. 2027-08-02: each Member State must have at least one AI regulatory sandbox operational. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act ; https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202601744 | 2026-07-24 | Near-term dated thresholds for content-generating systems. | ai-governance-assurance |
| Other Omnibus changes: Article 4 AI literacy softened to "take measures to support the development of AI literacy"; SME simplifications extended to small mid-cap companies; registration of Article 6(3) exempted systems simplified; AI Office gains exclusive supervision of AI systems built on a GPAI model by the same undertaking and AI embedded in very large online platforms and search engines; processing of special category data permitted for bias detection and correction; EU-level sandbox. | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202601744 ; https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force | 2026-07-24 | AI literacy is no longer a strict "ensure" duty. Supervisor may be the AI Office rather than a national authority, depending on system type. | ai-governance-assurance |
| GPAI Code of Practice published 2025-07-10; three chapters (Transparency, Copyright, Safety and Security); confirmed by Commission and AI Board as an adequate voluntary tool. Signatories include Amazon, Anthropic, Google, IBM, Microsoft, Mistral AI and OpenAI; xAI signed only the Safety and Security chapter. A Signatory Taskforce chaired by the AI Office exists. | https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai ; https://digital-strategy.ec.europa.eu/en/policies/signatory-taskforce-gpai-code-practice | Page updated 2026-07-31 | Deployers should hold their model provider's code status and Model Documentation Form as supplier evidence, refreshed per model version. | ai-governance-assurance, ai-audit-readiness |
| Article 50 guidelines are final; a Code of Practice on Transparency of AI-generated Content exists as a compliance route for marking obligations. Draft guidelines on high-risk classification (Article 6) were in targeted consultation until 2026-07-23; final not yet adopted when fetched. | https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations ; https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems | 2026-07 | High-risk classification guidance is still draft. Classification decisions made now should record the guidance version relied on. | ai-governance-assurance, ai-audit-readiness |
| NIST AI RMF 1.0 (January 2023) "is being revised as part of the White House AI Action Plan"; no revised version published. Generative AI Profile NIST AI 600-1 dates from 2024-07-26. A concept note for an AI RMF profile on trustworthy AI in critical infrastructure was released 2026-04-07. | https://www.nist.gov/itl/ai-risk-management-framework | Fetched 2026-09-27 | Cite AI RMF 1.0 and AI 600-1 as current but under revision. No agentic profile from NIST exists. | ai-governance-assurance, ai-assurance |
| NIST COSAiS (Control Overlays for Securing AI Systems, SP 800-53 based): five proposed overlays including single-agent and multi-agent. Only the predictive AI overlay had reached annotated outline stage (2026-01-08). NIST IR 8596 Cyber AI Profile is still an initial preliminary draft (published 2025-12-16, comments closed 2026-01-30); the NIST page shows no newer version. | https://csrc.nist.gov/projects/cosais ; https://csrc.nist.gov/pubs/ir/8596/iprd | 2026-01-08 ; 2025-12-16 | Agent control overlays are planned, not available. | ai-governance-assurance, ai-security-assurance |
| ISO/IEC 42001:2023 (AI management system) remains the certifiable standard. ISO/IEC 42005:2025 covers AI system impact assessment. ISO/IEC 42006:2025 sets requirements for bodies auditing and certifying AI management systems. | https://www.iso.org/standard/42001 ; https://www.iso.org/standard/42005 ; https://www.iso.org/standard/42006 | 2023 ; 2025 ; 2025 | 42001 certifies the management system, not the behaviour of a specific AI system on a given day. Continuous verification fills that gap. | ai-governance-assurance, ai-audit-readiness |
| Colorado: SB26-189 (Automated Decision-Making Technology) signed 2026-05-14; repeals and reenacts the SB24-205 provisions. Operative duties from 2027-01-01: developer technical documentation, consumer notice at point of interaction, plain-language explanation within 30 days of an adverse outcome, right to request meaningful human review, records retained at least three years, Attorney General enforcement. | https://leg.colorado.gov/bills/sb26-189 | 2026-05-14 | "Colorado AI Act effective February 2026" and "June 2026" are both obsolete statements. | ai-governance-assurance, ai-audit-readiness, insurance-claims-ai-assurance, financial-services-ai-assurance |
| US federal: Executive Order of 2025-12-11, "Ensuring a National Policy Framework for Artificial Intelligence", created a DOJ AI Litigation Task Force to challenge state AI laws and directed a Commerce review of state laws. Congress has not passed preemptive federal AI legislation (per law-firm analysis). | https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/ | 2025-12-11 | State obligations remain live but contested. Obligation registers need a review date, not a one-time mapping. | ai-governance-assurance |
| US banking: OCC Bulletin 2026-13 (2026-04-17), issued with the Federal Reserve and FDIC, replaces the 2011 model risk guidance (OCC 2011-12 / SR 11-7). It states: "Generative AI and agentic AI models are novel and rapidly evolving. As such, they are not within the scope of this guidance." A request for information on banks' use of AI is planned. Aimed at banks above $30 billion in assets. | https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html | 2026-04-17 | SR 11-7 is rescinded. Generative and agentic AI in US banks currently sit outside model risk guidance, so firms must define and evidence their own standard. | financial-services-ai-assurance, ai-governance-assurance |
| UK: FCA states "We do not plan to introduce extra regulations for AI" and relies on existing frameworks including Consumer Duty and SM&CR. | https://www.fca.org.uk/firms/innovation/ai-approach | Updated 2026-02-13 | UK assurance is outcome-based and tied to named senior manager accountability. | financial-services-ai-assurance, ai-governance-assurance |
| UK: the King's Speech of 2026-05-13 announced a Regulating for Growth Bill and a Digital Access to Services Bill. The speech text contains no dedicated AI regulation bill. The earlier government response to the AI Opportunities Action Plan said DSIT would consult on legislation for the most powerful AI models and intended to put the AI institute on a statutory footing; no such bill was found in the 2026 speech. | https://www.gov.uk/government/speeches/the-kings-speech-2026 ; https://www.gov.uk/government/publications/ai-opportunities-action-plan-government-response/ai-opportunities-action-plan-government-response | 2026-05-13 | The UK has no AI statute as of September 2026. Obligations come through sector regulators and existing law. | ai-governance-assurance, financial-services-ai-assurance |
| UK: FCA Mills Review (speech 2026-01-28) examines AI in retail financial services towards 2030, including agentic AI. "This review does not change our regulatory approach. We remain outcomes-based and technology-neutral." It asks what SM&CR "reasonable steps" look like "when the model updates weekly". Recommendations were due to the FCA Board in summer 2026; publication not confirmed. | https://www.fca.org.uk/news/speeches/fca-long-term-review-ai-retail-financial-services-designing-unknown | 2026-01-28 | The regulator itself frames accountability as a problem of change frequency. That is the continuous assurance argument in a supervisor's words. | financial-services-ai-assurance, ai-governance-assurance |
| California SB 53 (Transparency in Frontier Artificial Intelligence Act), Chapter 138, approved 2025-09-29. Frontier developers must publish a frontier AI framework and report critical safety incidents; whistleblower protections; civil penalties up to $1,000,000 per violation enforced by the Attorney General. Applies to frontier model developers, not to enterprise deployers. | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53 | 2025-09-29 | Supplier-side obligation. Deployers can request the published framework as supplier evidence. Operative date not read from the page. | ai-governance-assurance |
| California CCPA regulations on automated decision-making technology (ADMT), risk assessments and cybersecurity audits: approved 2025-09-23, in effect 2026-01-01. ADMT compliance required from 2027-01-01. Risk assessment compliance from 2026-01-01, with attestation and summary due 2028-04-01. Cybersecurity audit certifications due 2028-04-01, 2029-04-01 or 2030-04-01 by revenue band. | https://cppa.ca.gov/announcements/2025/20250923.html | 2025-09-23 | Risk assessments are already required; ADMT duties start in under four months. Dated thresholds for any ADMT used in significant decisions. | ai-governance-assurance, ai-audit-readiness, financial-services-ai-assurance, insurance-claims-ai-assurance |
| Texas HB 149 (Texas Responsible Artificial Intelligence Governance Act): signed 2025-06-22, effective 2026-01-01. Regulates use of AI systems in the state and provides civil penalties. | https://capitol.texas.gov/BillLookup/History.aspx?Bill=HB149&LegSess=89R | 2025-06-22 | In force. Substantive duties were not read from the bill text in this session. | ai-governance-assurance |
| Insurance: EIOPA Opinion on AI governance and risk management (2025-08-06) interprets existing insurance law for AI systems outside the AI Act high-risk category. NAIC model bulletin (adopted December 2023) and a 2026 AI Systems Evaluation Tool pilot are reported by secondary sources. | https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en ; https://content.naic.org/committees/h/big-data-artificial-intelligence-wg | 2025-08-06 | Examiners are moving to structured questionnaires; answers need standing evidence behind them. | insurance-claims-ai-assurance |
| Healthcare: FDA lists the Predetermined Change Control Plan guidance for AI-enabled device software functions as final, and "Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations" as draft. FDA reports over 1,600 AI-enabled devices authorised. | https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device | Page updated 2026-09-22 | A PCCP defines in advance which model changes are allowed. Each change outside it invalidates prior evidence. | healthcare-ai-assurance |

### 7. AI audit readiness

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Logs: EU AI Act Article 12 requires high-risk systems to "technically allow for the automatic recording of events (logs) over the lifetime of the system", to identify risk situations and substantial modification, support post-market monitoring and monitor operation. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-12 | Regulation (EU) 2024/1689 | Logging must be a property of the system, not an afterthought. Log coverage gaps are findings. | ai-audit-readiness, ai-governance-assurance |
| Log retention: providers (Article 19) and deployers (Article 26(6)) of high-risk systems must keep automatically generated logs "for a period appropriate to the intended purpose of the high-risk AI system, of at least six months". Neither Service Desk page carries a Digital Omnibus amendment banner. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-19 ; https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26 | Fetched 2026-09-27 | Six months is the floor, not the target. Colorado requires three years. Retention is set by the longest applicable regime. | ai-audit-readiness, ai-governance-assurance |
| Deployer duties (Article 26): assign human oversight to natural persons "who have the necessary competence, training and authority, as well as the necessary support"; monitor operation on the basis of the instructions for use and inform providers; employers must inform workers' representatives and affected workers before workplace use. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26 | Fetched 2026-09-27 | Deployers, not only providers, carry evidential duties: named overseers, their training and authority, and monitoring records. | ai-audit-readiness, ai-agent-with-write-access, ai-governance-assurance |
| GPAI legacy models: Article 111(3) gives providers of general-purpose AI models placed on the market before 2025-08-02 until 2027-08-02 to comply. The Service Desk flags Article 111 as amended by the Digital Omnibus and displays the June 2024 text, so paragraph 2 dates for legacy high-risk systems need checking against the amended text. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-111 | Fetched 2026-09-27 | Older models in production may carry less provider documentation until August 2027. Record which model versions fall under the transition. | ai-audit-readiness, ai-governance-assurance |
| Post-market monitoring: Article 72 requires providers to "actively and systematically collect, document and analyse relevant data" on performance throughout the system lifetime; the plan is part of the Annex IV technical documentation. The Service Desk flags that Article 72 was modified by the Digital Omnibus. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-72 | Fetched 2026-09-27 | This is a legal requirement for continuous evidence, the closest regulatory analogue to continuous assurance. Check the amended text before quoting detail. | ai-audit-readiness, ai-assurance, production-ai-going-live |
| Incident reporting: Article 73 deadlines for serious incidents with high-risk systems: not later than 15 days after establishing a causal link; not later than 2 days for widespread infringement or critical infrastructure incidents; not later than 10 days in the event of death. Reports go to the market surveillance authority of the Member State where the incident occurred. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-73 | Regulation (EU) 2024/1689 | The clock starts on awareness or causal link. Detection latency consumes the reporting window. | ai-audit-readiness, ai-governance-assurance |
| Human oversight evidence: Article 14 requires that overseers can understand limitations, resist automation bias, override and interrupt. | https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14 | Regulation (EU) 2024/1689 | Evidence needed: who oversees, what they can stop, proof the stop works, and override statistics. | ai-audit-readiness, ai-agent-with-write-access |
| Supplier evidence: GPAI Code of Practice Transparency chapter includes a Model Documentation Form for Article 53 obligations. | https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai | Updated 2026-07-31 | Downstream deployers should hold the current form for the exact model version in production. | ai-audit-readiness |
| Colorado SB26-189: developers and deployers must retain records necessary to demonstrate compliance for at least three years; adverse decision explanation due within 30 days. | https://leg.colorado.gov/bills/sb26-189 | 2026-05-14 | Retention period and response deadline are hard thresholds. | ai-audit-readiness, insurance-claims-ai-assurance |
| Certification: ISO/IEC 42006:2025 sets competence and audit requirements for bodies certifying against ISO/IEC 42001; ISO/IEC 42005:2025 gives the structure for AI system impact assessments. | https://www.iso.org/standard/42006 ; https://www.iso.org/standard/42005 | 2025 | Certification audits are periodic and sample-based. Between audits, the organisation holds the burden of showing the system still conforms. | ai-audit-readiness, ai-governance-assurance |
| Agent action evidence available from platforms: durable append-only session log (Claude Managed Agents); tracing (OpenAI Agents SDK); OpenTelemetry observability (Microsoft Agent Framework); AgentCore Observability and Evaluations (GA 2026-03, batch evaluations GA mid-2026); dual agent-and-user identity in Google Cloud logs. | https://www.anthropic.com/engineering/managed-agents ; https://openai.github.io/openai-agents-python/ ; https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html ; https://docs.cloud.google.com/iam/docs/agent-identity-overview | 2026 | Raw telemetry is not audit evidence until it is linked to a control objective, retained, and shown to be complete. | ai-audit-readiness, ai-agent-assurance |
| MCP security guidance notes token passthrough breaks audit trails: downstream logs show a different identity from the one acting, which makes incident investigation and auditing harder. | https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices | 2026-07-28 | Identity continuity across hops is a precondition for any usable audit trail. | ai-audit-readiness, mcp-security-assurance |
| Evaluations: OpenAI guidance recommends evals and trace grading to find where an agent performed well or made mistakes; AWS ships managed agent evaluations; Microsoft Agent Framework links to evaluation dashboards. | https://developers.openai.com/api/docs/guides/agent-builder-safety ; https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html ; https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/ | 2026 | An evaluation result is bound to model version, prompt, tool set and dataset. Change any one and the result no longer describes production. | ai-audit-readiness, production-ai-going-live |
| US banking supervisors expect firms to manage generative and agentic AI risk although it sits outside the 2026 model risk guidance; an interagency request for information is planned. | https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html | 2026-04-17 | Absence of prescriptive guidance increases the weight of the firm's own documented standard and evidence. | financial-services-ai-assurance, ai-audit-readiness |

### Terminology: current vs deprecated

| Current (September 2026) | Deprecated / superseded / avoid | Note |
|---|---|---|
| MCP specification `2026-07-28` | `2025-11-25`, `2025-06-18`, `2025-03-26` as "current" | Older revisions remain in use; name the revision explicitly. |
| Streamable HTTP transport; stdio | HTTP+SSE transport | HTTP+SSE deprecated since `2025-03-26`, formally Deprecated in `2026-07-28`. |
| Client ID Metadata Documents (CIMD) | Dynamic Client Registration (RFC 7591) as default | DCR deprecated, retained for backward compatibility. |
| State handles (explicit, server-minted) | MCP sessions, `Mcp-Session-Id` | Sessions removed from the protocol. "State handle hijacking" replaces "session hijacking". |
| Multi Round-Trip Requests, `input_required` | Server-initiated requests (`sampling/createMessage`, `elicitation/create` as server calls) | Roots, Sampling, Logging are deprecated features. |
| MCP Tasks extension (`io.modelcontextprotocol/tasks`) | "Experimental tasks" in core | Moved to official extension. |
| Agentic AI Foundation (AAIF), hosted by the Linux Foundation | "Anthropic's MCP" as a governance description | Anthropic originated MCP; governance is now foundation-based. |
| Agent2Agent (A2A) protocol 1.0, Linux Foundation project | "Google's A2A" as a governance description; A2A 0.x | |
| Microsoft Agent Framework 1.0 | Semantic Kernel, AutoGen as current Microsoft agent SDKs | Predecessors; migration guidance exists. |
| Microsoft Entra Agent ID (GA); agent identity; agent identity blueprint | Service principals or user accounts for agents | Microsoft marks both "not recommended for AI agents". |
| Microsoft Agent 365 (GA 2026-05-01) | Entra-only agent registry | Registry experiences converging under Agent 365. |
| Microsoft Foundry | Azure AI Foundry, Azure AI Studio | Microsoft's own blog is titled "Microsoft Foundry Blog". Confirm product naming on Microsoft Learn before use. |
| Claude Agent SDK; Claude Managed Agents (public beta) | Claude Code SDK | Verify beta / GA status of Managed Agents at publication time. |
| OpenAI Agents SDK | Swarm; Assistants API as the agent surface | Assistants API retirement date not re-verified in this session. |
| Google Agent Development Kit (ADK) 2.0; Gemini Enterprise Agent Platform | ADK 1.x; "Vertex AI Agent Builder / Agent Engine" as the current product name | Google documentation now sits under "Gemini Enterprise Agent Platform". Confirm mapping of older names before use. |
| Amazon Bedrock AgentCore (Runtime, Gateway, Identity, Policy, Observability, Evaluations); AWS Agent Registry | "Bedrock Agents" as the only AWS agent offering | |
| OWASP Top 10 for LLM Applications 2026 (August 2026) | 2025 edition as "current"; 2023 v1.0 / v1.1 | Entry names confirmed from the OWASP PDF. Write IDs with the year suffix, e.g. LLM03:2026. |
| LLM08:2026 Hidden Context Exposure | LLM07:2025 System Prompt Leakage | Renamed and broadened, per OWASP. |
| LLM03:2026 Excessive Agency | LLM06:2025 Excessive Agency | Same name, different ID. Unqualified "LLM06" is ambiguous. |
| OWASP Top 10 for Agentic Applications 2026 (ASI01 to ASI10); "Least-Agency" | "OWASP Agentic AI Threats and Mitigations" as the only agentic reference | Entry names confirmed from the OWASP PDF. |
| Claude Managed Agents (beta) | Describing it as generally available | Beta header `managed-agents-2026-04-01` still required on 2026-09-27. |
| MITRE ATLAS v2026.09; tactic "AI Attack Adaptation" | ATLAS v4.x / v5.x technique counts; tactic "AI Attack Staging" | Monthly date-based releases. |
| NIST AI 100-2 E2025 | NIST AI 100-2 E2023 | |
| NIST CAISI (Center for AI Standards and Innovation) | US AI Safety Institute (US AISI) | |
| UK AI Security Institute | UK AI Safety Institute | Renamed February 2025 (secondary source). |
| EU AI Act as amended by Regulation (EU) 2026/1744; high-risk dates 2027-12-02 and 2028-08-02 | High-risk application on 2026-08-02 and 2027-08-02 | |
| Colorado SB26-189 (ADMT), operative 2027-01-01 | Colorado AI Act SB24-205 effective 2026-02-01 or 2026-06-30 | |
| Interagency revised model risk management guidance (OCC Bulletin 2026-13) | SR 11-7 / OCC 2011-12 | Rescinded 2026-04-17. |
| Indirect prompt injection | "Cross-domain prompt injection (XPIA)" as the primary term | Microsoft still uses XPIA internally; standards bodies use indirect prompt injection. |

### Assurance angles

Original operating insight derived from the findings above. These are Xyvionix positions, not quotations.

- **Tool approval expires when the tool definition changes.** MCP tool lists are mutable at runtime and descriptions are model-visible instructions. Evidence of review is valid only for the exact definition reviewed. Threshold: any hash change in name, description, schema or annotations reopens approval.
- **The assured unit is the tool combination, not the tool.** An agent that holds private data access, reads untrusted content and can communicate externally is exposed regardless of how safe each tool looks alone. Evidence expires every time a tool or connector is added to the agent.
- **Prompt injection resistance is a measured rate bound to a model version.** Vendors publish it as a percentage and state it is not zero. A model upgrade, a new attack set or a new input modality voids the figure. Containment (network, credentials, scopes) is the part that can be proven deterministically.
- **Approval gates decay with volume.** Red teams report bypass through consent fatigue. Presence of a gate is not evidence of oversight. Track approval rate, median decision time and approvals per reviewer; a rate near 100% with decision times of seconds means the control has lapsed.
- **Least privilege is a gap measurement, not a design statement.** Compare scopes granted with scopes exercised over a rolling window. Unused scopes are standing risk. Evidence expires on every new grant, step-up or role change.
- **Agent identity evidence expires when people move.** Sponsors and owners carry accountability. When a sponsor changes role or leaves, the agent is orphaned unless reassigned. Threshold: zero agents without an active human sponsor.
- **Inventory completeness precedes every other claim.** Platforms now discover unmanaged local agents because they exist in volume. An assurance statement covers only registered agents; the unregistered count is the first number to re-prove.
- **Evaluation results are bound to four variables:** model version, system prompt, tool set and test dataset. Change one and the result describes a system that is no longer in production. Hosted model aliases that move silently are the most common cause of expiry.
- **Protocol upgrades invalidate control mappings.** MCP `2026-07-28` removed sessions, deprecated Logging and changed client registration. Controls and log parsers built on the old semantics keep running and stop meaning anything. Re-prove after each revision and track the twelve-month deprecation clock.
- **Threat models have a monthly shelf life.** MITRE ATLAS now ships monthly and OWASP reordered its LLM list in 2026. A threat model should carry the framework version it was mapped to and be re-checked when that version is superseded.
- **Regulatory dates moved; evidence ages regardless.** EU high-risk obligations now apply from December 2027. Documentation and test evidence prepared for the original August 2026 date will be more than a year old at application. Post-market monitoring requires data collected over the lifetime, so the evidence has to be live at the date, not archived before it.
- **Detection latency consumes the reporting window.** EU serious incident deadlines run from awareness or causal link (2, 10 or 15 days). Colorado gives 30 days for an adverse decision explanation. The operational threshold is time-to-detect plus time-to-attribute, which only works if agent actions are attributable to an identity and a version.
- **Identity continuity across hops is what makes a log an audit trail.** Token passthrough and shared service accounts produce logs that name the wrong actor. Evidence requirement: one action resolves to one agent identity, one delegating user where applicable, one approval and one outcome.
- **Certification is periodic; behaviour is continuous.** ISO/IEC 42001 certifies a management system through sampled audits. It does not state that a given agent behaved within bounds yesterday. The gap between audit dates is where assurance is lost and where continuous verification applies.
- **Absence of guidance raises the evidential burden.** US banking guidance excludes generative and agentic AI; NIST agent overlays are not yet published. Where no external standard exists, the firm's own documented threshold and its proof of meeting it are the only defence.

### Could not verify

The web search budget was exhausted in the first pass and stayed exhausted in the second; the second pass used direct page fetches only. Items below were not confirmed from a primary source. Check each before publishing.

Resolved in the second pass and moved into the tables: OWASP LLM Top 10 2026 entry names; OWASP Agentic Top 10 entry names; existence and date of the joint government agentic AI guidance; UK King's Speech 2026 and FCA Mills Review; California SB 53 and CCPA ADMT regulation dates; Texas HB 149 dates; EU AI Act log retention (Articles 19, 26(6)); GPAI legacy date (Article 111(3)); NIST IR 8596 status; FDA guidance status; A2A release dates; Claude Managed Agents status; MCP Enterprise-Managed Authorization status.

**Standards and frameworks**
- OWASP LLM Top 10 2026 exact publication day: resource page says 2026-08-03, PDF cover says August 4th, 2026. The PDF also contains an unfilled placeholder "[Publication date to be set]".
- Publication date of OWASP "A Practical Guide for Secure MCP Server Development".
- ISO/IEC 27090 publication status (iso.org returned HTTP 403 twice). Reported at FDIS stage by secondary sources only.
- ISO/IEC 42005 and 42006 publication months, and any amendment to ISO/IEC 42001 (iso.org returned HTTP 403; dates from search summaries).
- ISO/IEC 42119 series status and CEN-CENELEC JTC 21 harmonised standards status for the EU AI Act (for example prEN 18286).
- A planned NIST "AI Agent Interoperability Profile" for Q4 2026: reported by a secondary source only.
- CSA AI Controls Matrix control and domain counts, and STAR for AI programme status.
- MITRE ATLAS figures were read from the GitHub releases page through a summarising tool; confirm counts against the release notes.

**Regulation**
- "Careful Adoption of Agentic AI Services": the guidance PDF itself was not read (defense.gov and nsa.gov returned HTTP 403; cyber.gov.au timed out twice). Risk categories, recommendations and the full co-author list are from a CSA research note. Publication date differs by source: 2026-04-30 (CSA note, PDF path) and 2026-05-01 (CISA page).
- EU AI Act Article 73 serious incident guidelines: final version and date not confirmed. Only the 2025 draft consultation was found; the guessed Commission URL returned 404.
- EU AI Act Article 72 post-market monitoring template (implementing act) and the exact Omnibus amendment to Article 72.
- EU AI Act Article 111 as amended by the Omnibus: the Service Desk shows the June 2024 text with an amendment banner. Dates in paragraph 2 for legacy high-risk systems (2026-08-02, 2030-08-02) may have changed.
- Council press release of 2026-06-29 (HTTP 403). Omnibus facts were taken from EUR-Lex and the Commission instead.
- UK: what the Regulating for Growth Bill contains on AI sandboxes or an "AI Growth Lab" (law-firm source returned HTTP 402; the King's Speech text does not mention AI). Whether the Mills Review recommendations have been published. Hansard and House of Commons Library pages returned HTTP 403.
- UK AI Security Institute renaming date and statutory status.
- California SB 53 operative date and the thresholds defining frontier and large frontier developers: not read reliably from the bill page.
- Texas HB 149 substantive duties and prohibited practices: only caption and dates were read.
- NAIC: number of states adopting the model bulletin and the AI Systems Evaluation Tool pilot details are secondary-sourced.
- Status of any federal preemption legislation in Congress, and outcome of the Commerce review of state AI laws.
- Colorado SB26-189 signing date: official page shows 2026-05-14; one law-firm source says 2026-05-20. Official page used.

**Vendor and protocol**
- A2A: the specification site named 1.0.0 as current while GitHub shows v1.0.1 (2026-05-28). Confirm which the site now labels as latest.
- Merger of IBM's Agent Communication Protocol (ACP) into A2A, and AP2 (Agent Payments Protocol) status.
- AAIF member counts (sources conflict: 146 and 170+).
- Microsoft Entra Agent ID exact GA date (April 2026 per secondary source; Microsoft doc dated 2026-05-01).
- Microsoft AI Red Team v2.0 statistics other than the MCP CVE count; the mitigation family list was incomplete in the fetched summary.
- OpenAI Agents SDK current version number; OpenAI prompt injection article (openai.com returned HTTP 403); Assistants API retirement date.
- Google layered prompt injection defence article date and content (fetch failed); ADK tool confirmation feature status.
- LangGraph / LangChain current version numbers.
- Current naming of Microsoft Foundry and of Google's former Vertex AI agent products: inferred from page titles, not from a naming announcement.
- MCP Apps extension details: taken from a blog summary; extension specification not read.
- Any documented real-world MCP incidents (named CVEs, tool poisoning or rug pull cases): none were verified from a primary source.

## AI evaluation, RAG, observability and inference economics

Source file: `docs/research/05-ai-evaluation-rag-inference.md`

Research date: 2026-09-27. Primary sources only; anything not confirmed from an authoritative page is listed under "Could not verify".

### 1. Production AI evaluation

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Anthropic separates capability evals (start at low pass rate) from regression evals (should hold near 100% pass rate). A regression suite is the artefact that must be re-run on every model, prompt or tool change. | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | Defines the threshold shape: regression pass rate near 100%, any drop is a loss-of-assurance event. | llm-evaluation-assurance, model-change-assurance, ai-assurance |
| Same source defines task, trial, grader, transcript/trajectory, outcome. Outcome is the final environment state, distinct from what the agent claims happened. | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | Assurance must verify outcome state, not the agent's self-report. | llm-evaluation-assurance, ai-assurance |
| pass@k (at least one success in k trials) rises with k; pass^k (all k succeed) falls with k. They are identical at k=1 and "tell opposite stories" by k=10. | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | Production reliability needs pass^k style consistency, not single-run accuracy. One green run is not evidence. | llm-evaluation-assurance, production-ai-going-live |
| Three grader types: code-based (fast, reproducible, brittle), model-based (flexible, non-deterministic, costly), human (gold standard, slow). LLM judges "should be closely calibrated with human experts"; give the judge an "Unknown" escape and grade one dimension at a time. | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | Judge calibration is itself evidence that expires when the judge model changes. | llm-evaluation-assurance |
| Offline evals and production monitoring are complementary: evals are reproducible and pre-release; monitoring "catches issues that synthetic evals miss". | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | Supports continuous (online) verification as a separate layer from release gating. | ai-assurance, ai-observability-assurance |
| Large-scale judge study: 21 judges, about 541,000 judgments. Chance-corrected agreement is 33-41 points lower than raw exact-match agreement on MT-Bench; judge rankings shift up to 14 positions across benchmarks; two production judges had test-retest reliability above 0.95 together with position bias above 0.10. | https://arxiv.org/abs/2606.19544 | 2026-06-17 (arXiv preprint) | A consistent judge is not a valid judge. Report Cohen's kappa against human labels, not raw agreement. | llm-evaluation-assurance |
| Eval saturation: when an agent passes all solvable tasks, the suite no longer detects change. | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | Golden datasets decay two ways: saturation and drift from real traffic. Both need a refresh trigger. | llm-evaluation-assurance, rag-quality-degradation |
| OpenAI is shutting down its hosted Evals dashboard and API: existing evals read-only on 2026-10-31, shutdown 2026-11-30. Published migration path is to promptfoo. Reusable prompt objects (/v1/prompts) and Agent Builder shut down the same day. | https://developers.openai.com/api/docs/deprecations | Announced 2026-06-03 | Evaluation tooling itself is subject to vendor retirement. Eval suites held in a vendor console are not durable evidence. | llm-evaluation-assurance, model-provider-migration |
| promptfoo announced on 2026-03-09 that it is joining OpenAI; the post states "The closing of the acquisition is subject to customary closing conditions" and "Promptfoo will remain open source". It commits to maintaining the suite as a red teaming, static scanning and evals tool "for any AI model". No specific OpenAI product integration is named. | https://www.promptfoo.dev/blog/promptfoo-joining-openai/ ; https://www.promptfoo.dev/docs/intro/ | 2026-03-09 | Tool neutrality changed: a widely used eval tool is moving under a model provider. Say "announced", not "completed". | llm-evaluation-assurance |
| Databricks documents agent evaluation under MLflow 3: scorers (LLM judges and code-based checks) attach a quality assessment to each trace. | https://docs.databricks.com/aws/en/generative-ai/agent-evaluation/ | 2026-09-16 | Trace-attached scores are the unit of online evidence. | llm-evaluation-assurance, ai-observability-assurance |
| DeepEval 4.2.6 (Apache 2.0). Agent metrics: Task Completion, Tool Correctness, Goal Accuracy, Step Efficiency, Plan Adherence. Custom: G-Eval, DAG. Commercial platform: Confident AI. | https://pypi.org/project/deepeval/ | 2026-09-24 | Current names for trajectory and tool-call metrics. | llm-evaluation-assurance, ai-assurance |
| Ragas 0.4.3 (Apache 2.0, repo now under vibrantlabsai/ragas). Agent metrics: Topic Adherence, Tool Call Accuracy, Tool Call F1, Agent Goal Accuracy. | https://pypi.org/project/ragas/ ; https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/ | 2026-01-13 (release) | Latest release is eight months old at research date; check cadence before naming it as "current". | llm-evaluation-assurance, production-rag-assurance |
| MLflow 3.16.1: "50+ built-in metrics and LLM judges", tracing built on OpenTelemetry, prompt registry, AI Gateway. Databricks docs: the same scorers used in development run automatically on sampled production traffic. | https://pypi.org/project/mlflow/ ; https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/ | 2026-09-16 | One scorer definition used offline and online is the pattern that makes evidence comparable across release and run. | llm-evaluation-assurance, ai-observability-assurance |
| Anthropic postmortem: three infrastructure bugs degraded Claude output between August and September 2025. "The evaluations we ran simply didn't capture the degradation users were reporting." Fix included running evaluations continuously on production systems. | https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues | 2025-09-17 | Primary-source proof that pre-release evals do not cover serving-side regressions, even at the provider. | ai-assurance, model-change-assurance, llm-evaluation-assurance |

### 2. RAG quality

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Ragas RAG metrics, current names: Context Precision, Context Recall, Context Entities Recall, Noise Sensitivity, Response Relevancy, Faithfulness, plus Multimodal Faithfulness and Multimodal Relevance. NVIDIA-contributed: Answer Accuracy, Context Relevance, Response Groundedness. | https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/ | Docs current at 2026-09-27 | Canonical metric vocabulary. "Response Relevancy" is the current Ragas name for what is widely called answer relevance. | production-rag-assurance, rag-quality-degradation |
| Faithfulness = claims in the response supported by retrieved context / total claims in the response (0 to 1). Non-LLM alternative uses Vectara HHEM-2.1-Open classifier. | https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/ | Page updated 2025-12-09 | Faithfulness measures grounding in what was retrieved, not truth. A faithful answer over a stale corpus is still wrong. | production-rag-assurance, rag-quality-degradation |
| Contextual Retrieval: prepend chunk-specific context before embedding and BM25 indexing. Top-20 retrieval failure rate 5.7% to 3.7% (contextual embeddings), to 2.9% (plus contextual BM25), to 1.9% (plus reranking). | https://www.anthropic.com/engineering/contextual-retrieval | 2024-09-19 | Benchmark figures from the vendor's own test set; they show the size of gain from hybrid plus rerank, not a guarantee. | production-rag-assurance, rag-vector-search-assurance |
| Same article advised skipping RAG for knowledge bases under 200,000 tokens. That threshold is dated: Claude 4.6 and later models include a 1M-token context window at standard pricing ("a 900k-token request is billed at the same per-token rate as a 9k-token request"). | https://www.anthropic.com/engineering/contextual-retrieval ; https://platform.claude.com/docs/en/about-claude/pricing | 2024-09-19 ; pricing page current at 2026-09-27 | Do not quote the 200k rule as current. The RAG versus long-context decision is now an economics and latency decision, re-evaluated per model generation. | production-rag-assurance, ai-cost-assurance |
| Long context is not uniformly priced across providers. OpenAI lists long-context rates at 2x input and 1.5x output; Gemini 3.1 Pro Preview charges $4/$18 above 200k tokens versus $2/$12 below. | https://developers.openai.com/api/docs/pricing ; https://ai.google.dev/gemini-api/docs/pricing | Gemini page updated 2026-09-24 | Context growth can cross a pricing tier boundary. That boundary is a cost threshold worth monitoring. | ai-cost-assurance, ai-cost-spike |
| Agentic retrieval (Azure AI Search): LLM query planning decomposes a query into parallel subqueries, each semantically reranked, merged into one response with references and an activity log. Extractive retrieval is GA on REST API 2026-04-01; query planning, answer synthesis and non-minimal reasoning effort remain preview (2026-08-01-preview). | https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview | 2026-09-16 | Agentic RAG adds latency and moves retrieval billing from per-query to per-token. Both need their own thresholds. | production-rag-assurance, ai-cost-assurance |
| Microsoft GraphRAG is at v3.2.0, published 2026-09-24; the release adds a new cache implementation. | https://api.github.com/repos/microsoft/graphrag/releases/latest | 2026-09-24 | GraphRAG is a maintained 3.x project, not a research prototype. Graph index build is an LLM-cost event that repeats on corpus change. | production-rag-assurance |
| Permission leakage: Azure AI Search enforces document-level access against permission metadata already stored in the index. Source permission changes "are only reflected in search results after that metadata is synchronized to the index". Native ACL/RBAC, SharePoint ACL and Purview label enforcement are all preview; only string security filters are GA. | https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview | 2026-08-08 (updated 2026-09-17) | Permission evidence expires on every group-membership or ACL change. The gap between source ACL change and index sync is an exposure window. | production-rag-assurance, rag-vector-search-assurance, ai-assurance |
| For chunked indexes, permission and sensitivity metadata must be projected to each chunk row; "Without this projection, chunk-level references aren't filtered." | https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview | 2026-08-08 | Chunking can silently drop access control. Must be tested per index, not assumed. | production-rag-assurance, rag-quality-degradation |
| Embedding model change forces full re-embedding: "you cannot directly compare embeddings generated by one model with embeddings generated by the other... you must re-embed all of your existing data." | https://ai.google.dev/gemini-api/docs/embeddings | 2026-09-17 | Embedding model retirement is a corpus-wide migration, not a config change. | rag-quality-degradation, rag-vector-search-assurance, model-change-assurance |

### 3. Vector search, hybrid retrieval and reranking

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| pgvector 0.8.6. HNSW and IVFFlat indexes; vector and halfvec index up to 2,000 dimensions with HNSW/IVFFlat. With approximate indexes, filtering is applied after the index scan; iterative index scans (since 0.8.0) fetch more candidates when filters starve results. | https://github.com/pgvector/pgvector | README current at 2026-09-27 | Filtered recall is not the same as unfiltered recall. Tenant and permission filters must be in the recall test. | rag-vector-search-assurance |
| Qdrant v1.19.1. Recent releases add TurboQuant 4-bit quantization (v1.18 claims "8x vector compression without the recall tax"), per-query IDF corpus for sparse search, per-component memory placement. | https://github.com/qdrant/qdrant/releases ; https://api.github.com/repos/qdrant/qdrant/releases/latest | 2026-09-04 | Quantization claims are vendor benchmarks. Recall at your k, on your data, after enabling quantization, is the evidence. | rag-vector-search-assurance |
| Weaviate v1.39.7 stable; v1.40.0-rc.1 adds Namespaces (GA), drop-vector-index schema change, HFresh MUVERA indexing, 4-bit rotational quantization. | https://github.com/weaviate/weaviate/releases ; https://api.github.com/repos/weaviate/weaviate/releases/latest | 2026-09-25 | Index and quantization defaults move between minor versions; upgrade is a retrieval-quality change event. | rag-vector-search-assurance |
| Milvus v3.0.2 (2026-09-20). v3.0.0 (2026-07-29) was a major release: lake-native External Collections, online schema changes, SINDI sparse index, snapshots. 2.6.x still receives releases (v2.6.24, 2026-09-16). | https://github.com/milvus-io/milvus/releases | 2026-09-20 | Major-version migration in the last 60 days; any Milvus 2.x statement should be labelled as the previous line. | rag-vector-search-assurance |
| Elasticsearch 9.5.4. Hybrid search recommended via reciprocal rank fusion and the semantic_text workflow. 9.5.0 added DiskBBQ auto-calibration at merge time. | https://www.elastic.co/docs/release-notes/elasticsearch ; https://www.elastic.co/docs/solutions/search/hybrid-search | Current at 2026-09-27 | Quantization recalibrates at segment merge, so recall can move without any application change. | rag-vector-search-assurance, rag-quality-degradation |
| OpenSearch 3.7.0 released 2026-06-09; 3.8.0 was scheduled for 2026-08-04 and 3.9.0 for 2026-09-29; minor release roughly every eight weeks. 2.x is in maintenance, 1.x end-of-life since 2025-05-06. Hybrid search uses search pipelines with a normalization processor or score-ranker (RRF). | https://opensearch.org/releases/ ; https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/ | Current at 2026-09-27 | Eight-week cadence sets the natural re-verification interval for retrieval benchmarks. | rag-vector-search-assurance |
| Amazon S3 Vectors: purpose-built vector storage, "subsecond latency for infrequent queries and as low as 100 milliseconds for more frequent queries", strongly consistent writes, usable as the vector store for Bedrock Knowledge Bases. | https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html | Current at 2026-09-27 | Cheaper vector tiers trade latency for cost. Retrieval latency SLO must be re-proven after a storage-tier move. | rag-vector-search-assurance, ai-cost-assurance |
| Embedding models: OpenAI text-embedding-3-small (1536 dims) and text-embedding-3-large (3072), both shortenable via the dimensions parameter. Google gemini-embedding-2 is multimodal, 128-3072 output dimensions, 8,192-token input. Google text-embedding-004 shut down 2026-01-14. | https://developers.openai.com/api/docs/guides/embeddings ; https://ai.google.dev/gemini-api/docs/embeddings ; https://ai.google.dev/gemini-api/docs/deprecations | 2026-09-17 to 2026-09-24 | Embedding models retire like chat models. A retired embedding model makes the whole index unqueryable until re-embedded. | rag-vector-search-assurance, model-change-assurance |
| Rerankers: Cohere rerank-v4.0-pro and rerank-v4.0-fast (rerank-v3.5 still listed). Voyage rerank-3 and rerank-3-lite (preview), rerank-2.5 and rerank-2.5-lite; all 32,000-token context. | https://docs.cohere.com/docs/rerank ; https://docs.voyageai.com/docs/reranker | Current at 2026-09-27 | Reranker is a third model in the chain with its own version and retirement clock. | rag-vector-search-assurance, production-rag-assurance |
| Azure AI Search agentic retrieval bills retrieval in tokens consumed by subquery execution and semantic ranking, not per query. | https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview | 2026-09-16 | Retrieval has become a token-metered cost line; it belongs in cost-per-answer. | ai-cost-assurance, unit-economics-assurance |
| Ragas separates retrieval metrics (Context Precision, Context Recall) from generation metrics (Faithfulness, Response Relevancy). | https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/ | Current at 2026-09-27 | Retrieval must be scored on its own so a generation-model upgrade cannot mask a retrieval regression. | rag-vector-search-assurance, rag-quality-degradation |

### 4. Model change and model routing

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Anthropic: at least 60 days' notice before retirement of publicly released models. Lifecycle states: Active, Legacy, Deprecated, Retired. Requests to retired models fail. | https://platform.claude.com/docs/en/about-claude/model-deprecations | Current at 2026-09-27 | 60 days is the shortest committed window among the majors for GA models; migration evidence must be producible inside it. | model-change-assurance, model-provider-migration |
| Anthropic retirements in 2026: Claude 3.7 Sonnet and 3.5 Haiku (2026-02-19), Claude 3 Haiku (2026-04-20), Sonnet 4 and Opus 4 (2026-06-15), Opus 4.1 (2026-08-05). Sonnet 4.5 is listed "not sooner than September 29, 2026", Haiku 4.5 "not sooner than October 15, 2026", Opus 4.5 "not sooner than November 24, 2026". | https://platform.claude.com/docs/en/about-claude/model-deprecations | Current at 2026-09-27 | Five retirement events in eight months from one provider. Any content naming Claude 3.x or 4.0 as current is wrong. | model-change-assurance, ai-assurance |
| Anthropic dates apply to Anthropic-operated platforms (Claude API, Claude Platform on AWS, Microsoft Foundry). Bedrock and Google Cloud "set their own retirement schedules". Example: Opus 4.1 retired 2026-08-05 on the Claude API; Bedrock EOL is 2027-01-08. | https://platform.claude.com/docs/en/about-claude/model-deprecations ; https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html | Current at 2026-09-27 | The same model has different end dates per channel. Inventory must be per model per platform. | model-change-assurance, model-provider-migration |
| Anthropic API parameter deprecation: temperature, top_p, top_k return a 400 error when set to non-default values on Claude Opus 4.7 and later. Models from 4.7 use a new tokenizer producing about 30% more tokens for the same text. | https://platform.claude.com/docs/en/about-claude/model-deprecations ; https://platform.claude.com/docs/en/about-claude/pricing | Current at 2026-09-27 | A model upgrade can break requests and shift cost at unchanged list price. Both are migration test cases. | model-change-assurance, ai-cost-spike, model-provider-migration |
| OpenAI notice periods: GA models at least 6 months; specialised variants at least 3 months; preview models possibly as short as 2 weeks. Older GPT-5 and o3 snapshots announced 2026-06-11 shut down 2026-12-11. Assistants API was removed 2026-08-26. | https://developers.openai.com/api/docs/deprecations | Current at 2026-09-27 | Preview models in production carry a two-week evidence horizon. | model-change-assurance, model-provider-migration |
| Gemini API: "latest" aliases are auto-updated; breaking changes behind "latest" get a 2-week email notice. Preview models get at least 2 weeks' notice before deprecation. Stable names point to a fixed model. gemini-2.0-flash shut down 2026-06-01. | https://ai.google.dev/gemini-api/docs/models ; https://ai.google.dev/gemini-api/docs/deprecations | 2026-09-24 | An alias is a standing consent to unannounced behaviour change. Pin the stable name and treat alias movement as a change event. | model-change-assurance |
| Microsoft Foundry: GA models retire 18 months from launch (12 months for Anthropic, DeepSeek, Fireworks, Mistral models); closed to new customers at 12 months; retired models return 410 Gone. Active notice at least 60 days (GA), 30 days (preview). Replacement is named only 90-120 days before retirement. Retirement dates cannot be extended. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | 2026-07-24 | Retirement date is known at launch and machine-readable via the Models API, so expiry of model evidence can be scheduled. | model-change-assurance, model-provider-migration |
| Microsoft Foundry: Standard deployments are auto-upgraded at retirement region by region; versionUpgradeOption controls this. Provisioned deployments are not auto-upgraded. Preview deployments are force-upgraded. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | 2026-07-24 | Auto-upgrade means the model can change under a live workload with no deploy on the customer side. | model-change-assurance, ai-observability-assurance |
| Amazon Bedrock changed its lifecycle policy for models launched on or after 2026-09-07: each model card states an "EOL no sooner than" date and a Legacy period of either 6 months or 45 days. Migration is never automatic. Legacy models: no new customers, access may lapse after 15 days of inactivity. | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html | Current at 2026-09-27 | New 45-day Legacy option is shorter than the previous 6-month floor. Notice period is now a per-model attribute. | model-change-assurance, model-provider-migration |
| Bedrock models launched before 2026-09-07: at least 12 months availability, at least 6 months Legacy, and a public extended access phase where "you should expect higher pricing". | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html | Current at 2026-09-27 | Staying on a Legacy model has a price penalty as well as an end date. | model-change-assurance, ai-cost-assurance |
| Peer-cited drift study: GPT-4 prime-identification accuracy 84% (March 2023) versus 51% (June 2023) under the same model name. | https://arxiv.org/abs/2307.09009 | 2023-07-18, revised 2023-10-31 | Historical evidence only; cite as the origin of the drift concern, not as a current measurement. | model-change-assurance |
| LiteLLM 1.102.1: open-source AI gateway, unified interface to 100+ providers, routing, fallbacks, virtual keys, spend tracking. MLflow AI Gateway offers rate limiting, fallback, cost management, A/B testing. Bedrock Intelligent Prompt Routing is priced at $1 per 1,000 requests. | https://pypi.org/project/litellm/ ; https://pypi.org/project/mlflow/ ; https://aws.amazon.com/bedrock/pricing/ | 2026-09-23 | A fallback route is a second model in production. It needs the same evaluation evidence as the primary. | model-change-assurance, model-provider-migration, ai-cost-assurance |
| Google rebranded Vertex AI as Gemini Enterprise Agent Platform; Google documentation and product pages now use the new name. | https://cloud.google.com/products/gemini-enterprise-agent-platform ; https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes | Current at 2026-09-27 | Naming must be updated in all content. | model-provider-migration, ai-assurance |

### 5. AI observability and LLMOps

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| OpenTelemetry GenAI semantic conventions are still in Development status, not Stable. Spans, agent spans, metrics and events pages all carry the Development badge. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md | Current at 2026-09-27 | Do not describe OTel GenAI conventions as stable. Attribute names can change, so dashboards and alerts built on them need a version pin. | ai-observability-assurance |
| The conventions moved out of the core semantic-conventions repository in release v1.42.0 (published 2026-06-12): all gen_ai.* attributes, metrics, events and spans "are deprecated in this repository and have moved to the OpenTelemetry GenAI semantic conventions repository". Core semconv is now at v1.44.0 (2026-08-04). | https://api.github.com/repos/open-telemetry/semantic-conventions/releases ; https://opentelemetry.io/docs/specs/semconv/gen-ai/ | 2026-06-12 | Links to the old spec location are stale. Instrumentation pinned to core semconv 1.42 or later carries deprecated GenAI definitions. | ai-observability-assurance |
| Agent and workflow metrics are defined: gen_ai.invoke_agent.duration, gen_ai.invoke_agent.inference_calls, gen_ai.invoke_agent.tool_calls, gen_ai.invoke_workflow.duration, gen_ai.execute_tool.duration. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md | Current at 2026-09-27 (two reads) | Inference calls and tool calls per agent invocation are the standard loop-detection signals. | ai-observability-assurance, ai-cost-spike |
| Token metrics page defines counters gen_ai.client.inference.usage.input_tokens, output_tokens, cache_read.input_tokens, cache_write.input_tokens and reasoning.output_tokens (unit {token}), plus per-operation histograms. Cache and reasoning counters "report subsets of the input_tokens and output_tokens counters". | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-token-metrics.md | Current at 2026-09-27 | Cache-read share and reasoning share can be computed from standard counters, which makes cache hit rate a portable signal. | ai-observability-assurance, ai-cost-assurance |
| Scope of the conventions: GenAI client spans, agent spans, events, metrics, exceptions, MCP, and provider-specific conventions for Anthropic, Azure AI Inference, AWS Bedrock, OpenAI. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md | Current at 2026-09-27 | MCP tool calls are inside the telemetry standard, so tool-layer assurance can use the same trace. | ai-observability-assurance, ai-assurance |
| Agent span operations: create_agent, invoke_agent, invoke_workflow, plan, execute_tool. Attributes include gen_ai.agent.name, gen_ai.agent.id, gen_ai.agent.version, gen_ai.conversation.id. gen_ai.operation.name and gen_ai.provider.name are required. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md | Current at 2026-09-27 | gen_ai.agent.version gives the join key between a trace and the evaluated agent version. | ai-observability-assurance, llm-evaluation-assurance |
| Usage attributes on spans: gen_ai.usage.input_tokens, output_tokens, cache_read.input_tokens, cache_write.input_tokens, reasoning.output_tokens, plus per-modality variants. gen_ai.request.model and gen_ai.response.model are separate attributes. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md | Current at 2026-09-27 | Requested model versus responding model is the cheapest drift detector available: a mismatch means an alias or router moved. | ai-observability-assurance, model-change-assurance, ai-cost-assurance |
| Metrics: gen_ai.client.operation.duration, gen_ai.client.operation.time_to_first_chunk, gen_ai.server.request.duration, gen_ai.server.time_to_first_token, gen_ai.server.time_per_output_token. Token metrics are now documented as gen_ai.client.inference.usage.* counters in a separate page. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md | Current at 2026-09-27 | Standard latency signals exist for both client and server side; self-hosted and API workloads can share thresholds. | ai-observability-assurance, vllm-production-assurance |
| Prompt and completion content (gen_ai.input.messages, gen_ai.output.messages, gen_ai.system_instructions) is Opt-In. | https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md | Current at 2026-09-27 | Default telemetry carries no content, so quality scoring on traces requires a deliberate capture and privacy decision. | ai-observability-assurance, production-ai-going-live |
| Langfuse: acquired by ClickHouse (announced 2026-01-16), remains MIT-licensed and self-hostable. Python SDK 4.15.6 is described as "v4, OpenTelemetry". Server release v4.46.0 was published 2026-09-25. | https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability ; https://pypi.org/project/langfuse/ ; https://api.github.com/repos/langfuse/langfuse/releases/latest | 2026-01-16 ; SDK 2026-09-24 ; server 2026-09-25 | Current ownership and version facts for a commonly named tool. | ai-observability-assurance |
| Arize Phoenix 20.16.0: OpenTelemetry-based tracing, evaluation, versioned datasets, experiments, prompt management. Licence is Elastic License 2.0, not an OSI open-source licence. | https://pypi.org/project/arize-phoenix/ | 2026-09-23 | Licence matters for enterprises embedding it; do not call it "Apache" or "MIT". | ai-observability-assurance |
| MLflow 3.16.1 tracing is built on OpenTelemetry and integrates 60+ frameworks and providers. | https://pypi.org/project/mlflow/ | 2026-09-16 | OTel is the common substrate across Langfuse, Phoenix and MLflow even while the GenAI conventions are unstable. | ai-observability-assurance |
| vLLM exposes Prometheus metrics at /metrics: time to first token, inter-token latency, end-to-end latency, queue time, KV-cache usage, requests running and waiting, prefix cache hits and queries, preemptions, corrupted requests with NaN logits. Deprecated metrics are hidden one minor version later and removed the version after. | https://docs.vllm.ai/en/latest/usage/metrics/ | Current at 2026-09-27 | A metric can disappear two minor versions after deprecation; with releases about every two weeks, an alert can go silent within a month. | vllm-production-assurance, ai-observability-assurance |
| Microsoft Foundry exposes lifecycleStatus and deprecation dates through the Models API; Bedrock exposes modelLifecycle via GetFoundationModel and ListFoundationModels. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements ; https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html | 2026-07-24 | Model lifecycle state is an observable signal, not only an email. | ai-observability-assurance, model-change-assurance |

### 6. AI inference economics

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Anthropic list prices per million tokens (input/output): Claude Fable 5.1 $10/$50; Opus 5.5 $4/$20; Opus 5 $5/$25; Sonnet 5 $2/$10; Haiku 4.5 $1/$5. Sonnet 5 introductory price became the standard price; the planned rise to $3/$15 on 2026-09-01 did not occur. | https://platform.claude.com/docs/en/about-claude/pricing | Current at 2026-09-27 | Output is priced at 5x input across the range. Price sheets change, including announced changes being withdrawn. | ai-cost-assurance, unit-economics-assurance |
| Anthropic prompt caching: 5-minute cache write 1.25x base input, 1-hour write 2x, cache read 0.1x (0.05x on Opus 5.5, 0.025x on Fable 5.1). Batch API is 50% off input and output. Multipliers stack. | https://platform.claude.com/docs/en/about-claude/pricing | Current at 2026-09-27 | With reads at 2.5-10% of base, cache hit rate dominates input cost. A cache miss is a 10x to 40x input price event. | ai-cost-assurance, ai-cost-spike |
| Cache invalidation (Anthropic): cache is a prefix over tools, then system, then messages. Changing tool definitions invalidates the entire cache; toggling web search or changing speed invalidates system and messages. A breakpoint placed on content that changes each request (for example a timestamp) never hits. | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | Current at 2026-09-27 | A harmless-looking prompt or tool edit can remove the cache discount fleet-wide. Cache hit rate needs a floor and an alert. | ai-cost-spike, ai-cost-assurance |
| OpenAI prompt caching: cached reads 0.1x input; on GPT-5.6 and later, cache writes cost 1.25x and TTL is 30 minutes. Changing model, tools, reasoning.effort, text.format or compacting the conversation breaks prefix reuse. | https://developers.openai.com/api/docs/guides/prompt-caching | Current at 2026-09-27 | Cache write surcharge is new on recent OpenAI models; older "caching is free" assumptions are outdated. | ai-cost-assurance, ai-cost-spike |
| Amazon Bedrock prompt caching: implicit caching "is best effort... cache-hit rates can vary". Cache checkpoints follow tools, then system, then messages. With cross-region inference, high demand "may lead to increased cache writes". Not supported with batch inference. GPT-5.6 models on Bedrock bill cache writes at 1.25x and cache reads at a 90% discount; earlier OpenAI models have no cache-write fee. | https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html | Current at 2026-09-27 | Provider-side routing can lower cache hit rate with no customer change. Cache hit rate must be measured, not assumed from configuration. | ai-cost-spike, ai-cost-assurance |
| Linux Foundation launched the Tokenomics Foundation on 2026-08-04 (intent announced 2026-06-03), working "in close partnership with the FinOps Foundation". Named deliverables include a reference model for full AI cost accounting, "cost to serve" measurement standards, AI value frameworks, and "Token Cost Telemetry: improved AI cost reporting schemas in FOCUS v1.5 and beyond". | https://www.linuxfoundation.org/press/linux-foundation-launches-the-tokenomics-foundation-to-define-the-economics-and-roi-of-ai-value | 2026-08-04 | Standards for linking AI spend to value are being started, not finished. No published specification was found at research date. | ai-cost-assurance, unit-economics-assurance |
| OpenAI tiers: Standard, Batch (50% off), Flex and Fast mode. "Priority processing was renamed Fast mode on July 30, 2026"; both service_tier values are accepted. Listed Fast mode input price for gpt-6-astra is $20 against $10 Standard. Long-context requests are billed at 2x input and 1.5x output. Data residency adds 10% for models released after 2026-03-05. | https://developers.openai.com/api/docs/pricing | Current at 2026-09-27 | The same request has at least four prices depending on tier and context length. | ai-cost-assurance, unit-economics-assurance |
| Reasoning tokens (OpenAI): "not visible via the API", occupy context, and "are billed as output tokens". Reported in usage.output_tokens_details.reasoning_tokens. Gemini bills thinking tokens inside the output price. | https://developers.openai.com/api/docs/guides/reasoning ; https://ai.google.dev/gemini-api/docs/pricing | Gemini page 2026-09-24 | Invisible output is billed at the highest rate. Reasoning-token share per request is a required cost signal. | ai-cost-assurance, ai-cost-spike, ai-observability-assurance |
| Gemini API tiers: Batch 50% off, Flex 50% of standard, Priority at an 80% premium. Context cache storage is billed per million tokens per hour. Gemini 3.8 Flash is promotional-priced ($0.75/$3.75) until 2026-12-31, then $1.50/$7.50. | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-24 | A scheduled 2x price step on 2027-01-01 is a known future unit-cost break for any workload on that model. | ai-cost-assurance, unit-economics-assurance |
| Amazon Bedrock tiers: Priority at a 75% premium over Standard, Flex at a 50% discount, Batch at 50% lower price, Provisioned Throughput by hourly model unit with 1-month and 6-month commitments. | https://aws.amazon.com/bedrock/pricing/ | Current at 2026-09-27 | Tier selection is a routing decision with a 3.5x price spread between Flex and Priority. | ai-cost-assurance |
| Microsoft Foundry deployment types: Global, Data Zone and regional variants of Standard (pay per token) and Provisioned (reserved PTU), Batch at 50% discount with 24-hour target, priority processing on Standard. | https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types | 2026-08-06 | PTU is a fixed commitment; utilisation below plan is waste, above plan is throttling. | ai-cost-assurance, unit-economics-assurance |
| Anthropic tool overhead is billed as input tokens: tool-use system prompt 286-675 tokens depending on model; computer-use toolset about 4,500 tokens and browser toolset about 6,600 tokens per request. Web search is $10 per 1,000 searches. | https://platform.claude.com/docs/en/about-claude/pricing | Current at 2026-09-27 | Agent cost has a fixed per-call floor before any user content. Each loop iteration repays it unless cached. | ai-cost-spike, ai-cost-assurance |
| FinOps Foundation AI KPIs: cost per inference, cost per token, token consumption, resource utilisation, anomaly detection rate, cost per API call, time to first prompt, ROI. Named spike causes include inefficient model selection, unoptimised prompts and unmonitored API calls. | https://www.finops.org/wg/finops-for-ai-overview/ ; https://www.finops.org/framework/technology-categories/ai/ | 2026-02-17 | FinOps Foundation's published KPI list is unit-cost centred; cost per successful outcome is the gap Xyvionix content can address. | ai-cost-assurance, unit-economics-assurance |
| State of FinOps 2026: 1,192 respondents, over $83 billion annual cloud spend; 98% now manage AI spend, up from 31% two years earlier. | https://data.finops.org/ | 2026 | AI spend management is now universal among FinOps teams; the audience does not need convincing that the problem exists. | ai-cost-assurance, unit-economics-assurance |
| FOCUS 1.4 ratified 2026-06-04: adds Invoice Detail and Billing Period datasets, 47 columns; no native token columns. FOCUS 1.5 is scoped for AI model identity, token consumption and a PrincipalId column (person, service or agent), with ratification planned for 2026-12-03. | https://www.finops.org/insights/introducing-focus-1-4/ ; https://focus.finops.org/focus-1-5-release-scope/ | 2026-06-04 | As of research date there is no ratified billing standard for token usage. Do not claim FOCUS covers AI tokens yet. | ai-cost-assurance, unit-economics-assurance |

### 7. Self-hosted inference

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| vLLM latest is 0.30.0 (2026-09-22). Preceding releases: 0.29.0 (2026-09-09), 0.28.0 (2026-08-26), 0.27.1 (2026-08-11), 0.26.0 (2026-07-25). Cadence is roughly every two weeks. | https://pypi.org/project/vllm/ | 2026-09-22 | Any content naming a vLLM version will be stale within weeks. Performance evidence is bound to an exact version. | vllm-production-assurance |
| vLLM 0.29.0 (594 commits, 277 contributors): "Model Runner V2 is the default runner for all models"; Model Runner V1 is deprecated with removal planned for v0.32. "Ten deprecated architectures removed" (including Arctic, Chameleon, GritLM, MPT). "python -m vllm.entrypoints.openai.api_server is deprecated; use vllm serve." | https://github.com/vllm-project/vllm/releases/tag/v0.29.0 | 2026-09-09 | A minor upgrade changed the execution core and removed model support. Throughput, latency and output parity must be re-proven per upgrade. | vllm-production-assurance, model-change-assurance |
| vLLM 0.28.0 breaking changes: "bitsandbytes support is now an out-of-tree plugin" (vllm-bnb-plugin), "Transformers bumped to 5.15.0", calculate_kv_scales and override_attention_dtype removed. Features: tiered KV cache "disk offloading support", Model Runner V2 "E/P/D disaggregation", Rust frontend with standalone renderer. | https://github.com/vllm-project/vllm/releases/tag/v0.28.0 ; https://docs.vllm.ai/en/latest/features/quantization/bnb/ | 2026-08-26 | A quantization path moved out of the core package in a minor release. Deployments relying on it break on upgrade unless the plugin is installed. | vllm-production-assurance |
| vLLM 0.30.0 (762 commits, 315 contributors): persistent per-GPU weight-cache daemon (--load-format ipc_cache); HiSparse host-resident tier that "spills KV pages to pinned host memory under GPU pressure"; Gumbel-max watermarking. Breaking: scale-out endpoints need --enable-scale-out; items deprecated for 0.29 removed, including two environment variables; GPTQ g_idx ignored. | https://github.com/vllm-project/vllm/releases/tag/v0.30.0 | 2026-09-22 | Deprecation-to-removal took one release, about two weeks. KV spill to host memory changes latency under pressure; p99 must be tested at production concurrency. | vllm-production-assurance |
| vLLM tool calling requires a matching chat template and tool-call parser per model (--enable-auto-tool-choice, --tool-call-parser, --chat-template). Docs note that without strict enforcement "arguments may occasionally be malformed or violate the function's parameter schema". | https://docs.vllm.ai/en/latest/features/tool_calling/ | Current at 2026-09-27 | Template or parser mismatch produces valid-looking but wrong tool calls. Tool-call validity rate is a required self-hosted signal. | vllm-production-assurance, llm-evaluation-assurance |
| vLLM supports multiple quantization paths including LLM Compressor (FP8, INT4, INT8), GPTQModel, AutoAWQ, NVIDIA Model Optimizer, AMD Quark, TorchAO and quantized KV cache. Docs state only that quantization "trades off model precision for smaller memory footprint"; hardware support varies by GPU generation. | https://docs.vllm.ai/en/latest/features/quantization/ | Current at 2026-09-27 | The project gives no accuracy guarantee for quantized weights. Quality delta versus full precision must be measured on the customer's own eval set. | vllm-production-assurance |
| Hugging Face Text Generation Inference is in maintenance mode: only minor bug fixes and documentation. Hugging Face recommends vLLM, SGLang, llama.cpp or MLX going forward. | https://huggingface.co/docs/text-generation-inference/index | Current at 2026-09-27 | TGI must not be presented as a current recommended serving option. Existing TGI deployments carry unpatched-feature risk. | vllm-production-assurance |
| SGLang latest release is v0.5.20; release notes cite prefix-cache (radix tree) token hit rate improvement from 43.8% to 60.8% and retirement of the CUDA 12 build lane. | https://github.com/sgl-project/sglang/releases ; https://api.github.com/repos/sgl-project/sglang/releases/latest | 2026-09-18 | Serving engines drop CUDA and driver lanes; host stack compatibility expires too. | vllm-production-assurance |
| Ollama latest stable is v0.34.4 (2026-09-23). Triton Inference Server latest is v2.72.0 (2026-08-31), "corresponding to NGC container 26.08"; NVIDIA still names it Triton Inference Server. llama.cpp uses rolling build tags (bNNNN), with several builds published per day. | https://github.com/ollama/ollama/releases ; https://api.github.com/repos/triton-inference-server/server/releases/latest ; https://github.com/ggml-org/llama.cpp/releases | 2026-08-31 to 2026-09-27 | Current names and versions for alternatives. A rolling-build engine has no stable version to bind evidence to unless the build tag is pinned. | vllm-production-assurance |
| KServe v0.21.0 (2026-09-25): adds direct KEDA scaling with idleReplicaCount=0 for scale-to-zero, upgrades KEDA to v2.20.2, replaces the tokenizer sidecar with a vLLM render deployment in LLMInferenceService, adds LoRA adapter support to the local model cache. | https://api.github.com/repos/kserve/kserve/releases/latest | 2026-09-25 | Scale-to-zero makes cold start part of the latency SLO. Time to first token after scale-up must be measured, not only steady state. | vllm-production-assurance, ai-cost-assurance |
| Vendor-published on-demand GPU prices: Lambda lists NVIDIA H100 SXM at $3.99-$4.29 per GPU-hour and B200 SXM6 at $6.69-$6.99 per GPU-hour (8x to 1x configurations). CoreWeave lists 8-GPU nodes per hour: HGX H100 $49.24, HGX H200 $50.44, HGX B200 $68.80. Neither page carries an "as of" date. | https://lambda.ai/pricing ; https://www.coreweave.com/pricing | Read 2026-09-27 | Self-hosted unit cost has a dated input. Cost per million tokens must be recomputed when the GPU rate or achieved throughput changes. | vllm-production-assurance, ai-cost-assurance, unit-economics-assurance |
| AWS announced on 2025-06-05 "up to 45 percent price reduction" on NVIDIA GPU instances: P5 44% On-Demand, P5en 25% On-Demand, P4d/P4de 33% On-Demand. | https://aws.amazon.com/blogs/aws/announcing-up-to-45-price-reduction-for-amazon-ec2-nvidia-gpu-accelerated-instances/ | 2025-06-05 | Historical. Shows that GPU list prices move by tens of percent in one step; do not quote as the current AWS price. | ai-cost-assurance, unit-economics-assurance |
| Gateway API Inference Extension is an official Kubernetes project for self-hosted generative models: InferencePool, an Endpoint Picker that routes on model-server metrics including prefix-cache state and LoRA adapter availability. | https://gateway-api-inference-extension.sigs.k8s.io/ | Current at 2026-09-27 | Routing now depends on model-server metrics. If a metric is renamed or removed on upgrade, load balancing quality degrades silently. | vllm-production-assurance, ai-observability-assurance |
| vLLM metrics include KV-cache usage (1 = 100%), queue time, requests waiting and preemption count. | https://docs.vllm.ai/en/latest/usage/metrics/ | Current at 2026-09-27 | These are the saturation signals for autoscaling; GPU utilisation alone does not show queueing. | vllm-production-assurance, ai-cost-assurance |

### 8. Knowledge freshness

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Azure AI Search indexers detect changes automatically but "deletion detection isn't" automatic: "An indexer doesn't track object deletion in data sources." Without a soft-delete policy, deleted source documents remain as orphan search documents. | https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs | 2026-03-25 (updated 2026-07-02) | Deleted content can keep being retrieved and cited. Deletion propagation is a testable control with a measurable lag. | rag-quality-degradation, production-rag-assurance |
| The deletion policy must exist from the first indexer run. Documents deleted before the policy was added stay in the index even after reset; Microsoft suggests building a new index. | https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs | 2026-03-25 | A late-configured control does not repair history. Evidence must cover the whole index, not only new writes. | rag-quality-degradation, rag-vector-search-assurance |
| Neither soft-delete method applies to one-to-many indexing (one source document producing many search documents); deletions need an explicit index delete call. | https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs | 2026-03-25 | Chunked RAG indexes are the one-to-many case. Managed deletion detection may not cover them. | rag-quality-degradation, production-rag-assurance |
| Renaming an ADLS Gen2 directory does not update blob timestamps, so the indexer does not reindex the moved content. Restored soft-deleted blobs are also not always reindexed. | https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs | 2026-03-25 | Timestamp-based change detection has blind spots. Freshness must be verified by content probe, not by indexer success status. | rag-quality-degradation |
| Amazon Bedrock Knowledge Bases: "Each time you add, modify, or remove files from your data source, you must sync the data source." Sync is incremental and handles deletes. After sync it "could take a few minutes" for embeddings to be queryable on vector stores other than Aurora. | https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html | Current at 2026-09-27 | Sync is an explicit job. Corpus age equals time since last successful sync plus propagation lag. | rag-quality-degradation, production-rag-assurance |
| Bedrock re-ingests changed documents fully (re-parse, re-chunk, re-embed, re-index). CSV files are always re-ingested when their metadata changes. | https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html | Current at 2026-09-27 | Re-ingestion is an embedding-cost event; frequent metadata edits can raise ingestion spend. | ai-cost-assurance, rag-quality-degradation |
| Azure AI Search SharePoint ACL sync: changes on items with unique permissions are picked up incrementally on each successful indexer run; changes inherited from site, library, list or folder require an explicit refresh. | https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview | 2026-08-08 | Inherited permission changes are the common case in enterprises and the one not auto-synced. | production-rag-assurance, rag-quality-degradation |
| Azure Blob native soft delete: set retention much longer than the indexer interval, because the indexer removes a document only if it processes the blob while it is in soft-deleted state. | https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs | 2026-03-25 | If an indexer outage exceeds retention, deletions are lost permanently. Indexer health has a hard deadline. | rag-quality-degradation |
| Microsoft positions Foundry IQ as the managed knowledge layer built on Azure AI Search, with permission-aware knowledge bases for agents. | https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview | 2026-09-16 | Managed knowledge layers hide ingestion. Freshness and permission lag still exist and must be measured from outside. | production-rag-assurance |

### Terminology: current vs deprecated

| Current (September 2026) | Deprecated or outdated | Note / source |
|---|---|---|
| Gemini Enterprise Agent Platform | Vertex AI | Google docs and product page use the new name. https://cloud.google.com/products/gemini-enterprise-agent-platform |
| Microsoft Foundry; Foundry Models | Azure AI Foundry; Azure OpenAI Service as the product umbrella | Learn docs are titled "Microsoft Foundry". Service Health still uses the name "Azure OpenAI Service". https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements |
| Claude Platform / platform.claude.com; Claude Platform on AWS; Claude in Microsoft Foundry | docs.anthropic.com, "Anthropic API" as the only first-party channel | https://platform.claude.com/docs/en/about-claude/pricing |
| Claude Fable 5.1, Opus 5.5, Opus 5, Sonnet 5, Haiku 4.5 | Claude 3.x, Claude Sonnet 4, Opus 4, Opus 4.1 (all retired on the Claude API) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| GPT-6 and GPT-5.6 families (as listed on OpenAI pricing) | GPT-4o, GPT-4.1, o3 as "current" models | Older GPT-5 and o3 snapshots shut down 2026-12-11. https://developers.openai.com/api/docs/deprecations |
| Gemini 3.x family (3.8 Flash, 3.6 Flash, 3.1 Pro Preview) | Gemini 1.5, Gemini 2.0 Flash (shut down 2026-06-01) | https://ai.google.dev/gemini-api/docs/deprecations |
| gemini-embedding-2, gemini-embedding-001 | text-embedding-004 (shut down 2026-01-14) | https://ai.google.dev/gemini-api/docs/deprecations |
| OpenAI Responses API and Conversations API | Assistants API (removed 2026-08-26) | https://developers.openai.com/api/docs/deprecations |
| promptfoo, or other external eval harness | OpenAI hosted Evals dashboard and API (read-only 2026-10-31, shutdown 2026-11-30) | https://developers.openai.com/api/docs/deprecations |
| OpenTelemetry GenAI semantic conventions, status Development, in semantic-conventions-genai repo | "Stable OTel GenAI standard"; links to opentelemetry.io/docs/specs/semconv/gen-ai/ as the live spec | https://github.com/open-telemetry/semantic-conventions-genai |
| gen_ai.provider.name; gen_ai.client.inference.usage.* token counters | gen_ai.system; gen_ai.client.token.usage | Current names confirmed in the repo docs. The older names are absent from current docs; no formal deprecation notice was found. https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-token-metrics.md |
| OpenAI Fast mode (service_tier "fast" or "priority") | Priority processing (renamed 2026-07-30) | https://developers.openai.com/api/docs/pricing |
| MLflow 3 agent evaluation (Databricks docs) | Mosaic AI Agent Evaluation as the product name | Current Databricks page uses the MLflow name; no supersession notice was read. https://docs.databricks.com/aws/en/generative-ai/agent-evaluation/ |
| Response Relevancy (Ragas) | Answer Relevancy / answer relevance as a Ragas metric name | DeepEval still uses "Answer Relevancy". https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/ |
| vLLM, SGLang as recommended open-source serving engines | Text Generation Inference (maintenance mode) | https://huggingface.co/docs/text-generation-inference/index |
| vLLM Model Runner V2 (default from 0.29.0); vllm serve | Model Runner V1; python -m vllm.entrypoints.openai.api_server | https://github.com/vllm-project/vllm/releases |
| Milvus 3.x | Milvus 2.x as the current line (2.6.x is still patched) | https://github.com/milvus-io/milvus/releases |
| Bedrock Legacy period (6 months or 45 days, per model card) | "Bedrock always gives 6 months' notice" | Applies to models launched on or after 2026-09-07. https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html |
| Agentic retrieval, knowledge base, knowledge source (Azure AI Search) | "Knowledge agent" (2025-05-01-preview and 2025-08-01-preview) | Microsoft: "knowledge agent" is renamed to "knowledge base". https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-migrate (2026-08-20) |
| vLLM bitsandbytes via vllm-bnb-plugin | Built-in bitsandbytes support (before 0.28.0) | https://docs.vllm.ai/en/latest/features/quantization/bnb/ |
| 1M-token context at standard pricing (Claude 4.6 and later) | "Use RAG above 200k tokens" as a fixed rule | https://platform.claude.com/docs/en/about-claude/pricing |
| Langfuse (a ClickHouse company, MIT) | Langfuse as an independent startup | https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability |

### Assurance angles

Original operating insight derived from the findings above. These are Xyvionix positions, not sourced claims.

- **An eval result is bound to a tuple, not to an application.** The tuple is model ID, prompt version, tool schema, retrieval index version, embedding model, reranker and judge model. Change any element and the result describes a system that no longer exists. Evidence should be stored with the tuple and expire when the tuple changes.
- **Provider notice periods set the maximum useful age of migration evidence.** Committed windows range from 2 weeks (preview models, alias changes) to 45 days, 60 days and 6 months. An organisation that cannot produce a regression verdict on a replacement model inside the shortest window that applies to it has no assurance, only hope.
- **Aliases convert a dated change into an undated one.** With a pinned version the retirement date is the change date. With a "latest" alias or an auto-upgrading deployment the change date is chosen by the provider. Requested-versus-responding model ID in telemetry is the control that turns it back into a detectable event.
- **The same model expires on different dates per channel.** First-party API, Bedrock, Google Cloud and Microsoft Foundry publish separate schedules. Model inventory must be keyed by model and platform, and re-read from lifecycle APIs rather than from a spreadsheet.
- **Judge calibration is evidence with its own expiry.** A judge validated against human labels is valid for that judge model, that rubric and that traffic mix. Judge model retirement or a shift in production topics voids the calibration. High repeatability is not validity; position bias can coexist with near-perfect consistency.
- **Golden datasets decay in two directions.** They saturate (everything passes, so nothing is detected) and they drift away from live traffic (they pass while users fail). Both need a measured trigger: pass rate ceiling reached, or divergence between offline score and online score beyond a set tolerance.
- **Faithfulness proves agreement with the index, not with the world.** A grounded answer over a stale or orphaned document scores well. RAG assurance needs a freshness measurement and a deletion-propagation measurement alongside faithfulness, or the quality score certifies the wrong thing.
- **Permission evidence expires on every identity change.** Index-side ACL metadata lags the source system. The exposure window is the time from a group or ACL change to the next successful permission sync, and inherited changes may never sync without an explicit refresh. This is a number that can be measured with canary documents.
- **Retrieval must be scored apart from generation.** A stronger generation model can hide falling recall by answering plausibly from less context. Retrieval recall at k under production filters is the evidence; end-to-end answer quality is not a substitute.
- **Index internals change without an application deploy.** Quantization recalibration at merge, vector store minor upgrades and storage-tier moves all shift recall and latency. Retrieval benchmarks should re-run on infrastructure change events, not only on application releases.
- **Cost evidence expires on price-sheet events and on cache behaviour.** Promotional pricing end dates, long-context tier boundaries, tokenizer changes (about 30% more tokens at the same list price) and cache-write surcharges all change unit cost with no change in traffic. Cost per successful outcome must be recomputed on each of these, not monthly.
- **Cache hit rate is a cost control, so it needs a floor.** With cached reads at 2.5 to 10 percent of base input price, a tool-definition edit or a timestamp in the prefix can multiply input cost many times over. Treat a drop in cache hit rate as an incident signal, equal in standing to an error-rate rise.
- **Reasoning and tool overhead are billed but not seen.** Reasoning tokens are charged as output and hidden from the response; tool definitions add thousands of input tokens per call. Cost per outcome that ignores them understates agent cost most where agents loop most.
- **Self-hosted performance evidence is bound to an exact engine version and host stack.** With a roughly two-week release cadence, default-runner changes and removal of model architectures, a throughput or latency benchmark older than one upgrade is not evidence. Re-prove tokens per second, time to first token, p99 under concurrency and tool-call validity on each upgrade.
- **Tooling and standards are themselves unstable.** Hosted eval platforms are being retired, eval tools are changing owners, telemetry conventions are pre-stable and the billing standard has no ratified token columns. Assurance evidence should be held in portable form, independent of any one vendor console.

### Could not verify

Items below were not confirmed from an authoritative primary source during this research. Do not publish them as fact.

Resolved on the second pass (2026-09-27) and moved into the sections above: OpenTelemetry move date and version, agent-level OTel metrics, release dates for Qdrant, Weaviate, SGLang, GraphRAG and Langfuse server, vLLM 0.28 to 0.30 release-note detail, the bitsandbytes inconsistency, Tokenomics Foundation, OpenAI tier name, Azure "knowledge agent" rename, Bedrock prompt caching behaviour, Triton, KServe and llama.cpp status, and vendor-published GPU prices.

- **GPU pricing at hyperscalers and GPU availability.** Only Lambda and CoreWeave list prices were read from vendor pages. Current AWS, Azure and Google Cloud GPU instance prices were not read from their pricing pages. The reported AWS Capacity Block price rise of January 2026 and any H200 price from a vendor page remain unverified apart from the CoreWeave H200 node price. No supply or lead-time data was found in a primary source.
- **OpenTelemetry GenAI stabilisation timeline.** No published date or roadmap commitment was found. The dedicated repository's release tagging was not checked.
- **Formal deprecation of older OTel names.** gen_ai.client.token.usage and gen_ai.system are absent from the current docs, and the attribute registry has no Deprecated section, but no explicit notice naming them as replaced was read.
- **llama.cpp latest release.** The releases page shows rolling bNNNN build tags (b11207 most recent); the GitHub API "latest" endpoint returned a different tag (v0.5.0). The discrepancy was not resolved, so no version is cited.
- **FOCUS 1.4 token columns.** Several third-party articles state that FOCUS 1.4 added input, output and cached token columns. The FinOps Foundation announcement describes AI model identity and token consumption as scoped for FOCUS 1.5. The third-party claim is treated as incorrect. Whether any AI provider has published a FOCUS conformance statement was not verified.
- **OpenAI acquisition of promptfoo: completion.** promptfoo's own post confirms the announcement and that closing was subject to customary conditions. Whether the deal has closed was not verified; the OpenAI announcement page returned HTTP 403. Third-party claims that promptfoo is embedded in a named OpenAI enterprise agent platform are unverified.
- **OpenAI alias behaviour.** The deprecations page lists alias-to-snapshot mappings but does not state what happens to an alias when its snapshot is shut down, or what notice is given when an alias is repointed.
- **Google Cloud (Gemini Enterprise Agent Platform) model retirement notice period.** The model versions page returned navigation only on three attempts. The rebrand is confirmed from Google pages; the rebrand date (reported as 2026-04-22 at Cloud Next) comes from secondary sources. Gemini API notice rules in section 4 are from ai.google.dev only.
- **LLM judge agreement thresholds.** Rules of thumb such as Cohen's kappa above 0.6 acceptable and above 0.8 strong, and sample sizes of 100 to 300 traces, were found only in vendor blogs. arXiv 2606.19544 is a preprint, not yet peer reviewed.
- **Bedrock per-model cache-read and cache-write rates for Anthropic models, and reserved-tier pricing.** Caching behaviour is confirmed from the user guide; the per-model rates on the pricing page were not read.
- **Model licence risk for self-hosted open-weight models.** No specific licence terms were verified; the topic is raised only as an assurance consideration.
- **Quantified behaviour drift on current provider models.** No 2026 peer-reviewed measurement of silent provider-side drift was found. The 2023 study and the 2025 Anthropic postmortem are the only primary evidence cited.
- **State of FinOps 2026 publication date.** Not shown on data.finops.org or the finops.org report page.
- **Databricks product naming.** The current docs page presents agent evaluation under MLflow 3. Whether Mosaic AI Agent Evaluation is formally retired, and the status of Agent Bricks, were not confirmed.
- **Web search budget.** The session's search allowance was exhausted during the second pass; remaining items were retried by direct page fetch only.

## Enterprise AI platforms

Source file: `docs/research/06-ai-platforms.md`

Research date: 2026-09-27. Sources are vendor documentation, release notes and official blogs only.

### Microsoft

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Platform brand is **Microsoft Foundry**. Microsoft's own mapping: "Azure AI Studio / Azure AI Foundry" -> Microsoft Foundry; "Azure AI Services" -> **Foundry Tools**; hub + Azure OpenAI + Azure AI Services resources -> single **Foundry resource** with projects. Two portals coexist: Foundry and Foundry (classic); hub-based projects live only in classic. | https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry | ms.date 2026-08-13, updated 2026-09-24 | Evidence gathered against a classic hub project does not describe the new resource model. Naming on our pages must say Microsoft Foundry. | azure-ai-assurance |
| Model service is documented as **Azure OpenAI in Microsoft Foundry Models** (within **Foundry Models**). Azure Service Health and the pricing page still use the name "Azure OpenAI Service". | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | ms.date 2026-07-24 | Alerting rules must filter on the old service name or retirement advisories are missed. | azure-ai-assurance, model-change-assurance |
| Microsoft **automatically upgrades eligible Azure OpenAI resources to Foundry resources** in stages. Endpoint, keys, identity and settings are preserved. Opt out with `foundryAutoUpgrade.mode = Disabled` (API `2026-01-15-preview`). Private-network and CMK resources are not selected at first. RBAC roles renamed (Azure AI User -> Foundry User etc.), role IDs unchanged. | https://learn.microsoft.com/en-us/azure/foundry/how-to/upgrade-azure-openai-auto | ms.date 2026-08-19 | A vendor-initiated resource change widens the model set reachable under existing broad permissions. Policy scope must be re-proven after upgrade. | azure-ai-assurance |
| Five lifecycle stages: Preview, GA, Legacy (optional), Deprecated, Retired. GA models retire **18 months** after launch; deprecated to new customers at 12 months. Anthropic, DeepSeek, Fireworks and Mistral AI GA models follow a **12-month** lifecycle. Retired models return `410 Gone`. Retirement dates cannot be extended. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | ms.date 2026-07-24 | Every deployment has a known expiry from day one. Assurance evidence has the same shelf life. | model-change-assurance, azure-ai-assurance |
| **Auto-upgrade**: Global Standard, Data Zone Standard and Standard deployments are upgraded automatically at retirement, region by region. **Provisioned deployments are not auto-upgraded.** Control via `versionUpgradeOption`: `OnceNewDefaultVersionAvailable`, `OnceCurrentVersionExpired`, `NoAutoUpgrade` (deployment stops at retirement). | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | ms.date 2026-07-24 | The model behind a deployment name can change without a customer change record. This is the core model-change assurance case. | model-change-assurance, azure-ai-assurance |
| Documented example: gpt-4o `2024-05-13` retires 2026-12-09 and auto-upgrades to **gpt-5.6-sol**, a different model family. o1, o3, o3-mini, o4-mini retire 2026-11-19. gpt-4.1-nano retires 2026-10-14. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule | ms.date 2026-09-21, updated 2026-09-23 | Auto-upgrade can cross families, so prompts, structured output and cost profile all need re-validation. | model-change-assurance, ai-cost-assurance |
| Replacement model is declared only about **90-120 days** before retirement. Replacement reaches provisioned regions about 30 days before retirement. GA retirement notice is at least 60 days, preview 30 days. Preview deployments are force-upgraded or terminated. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | ms.date 2026-07-24 | Migration test windows are short, shortest for provisioned customers. | model-change-assurance, model-provider-migration |
| Models API terminology differs from docs: API `lifecycleStatus: "Deprecating"` means docs stage Deprecated; API `"Deprecated"` means Retired. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | ms.date 2026-07-24 | Automated lifecycle checks must map terms correctly or they report false state. | model-change-assurance |
| Deployment types: Global Standard, Global Provisioned, Global Batch, Data Zone Standard, Data Zone Provisioned, Data Zone Batch, Standard, Regional Provisioned, Developer. Data zones are US, EU and APAC. Microsoft can add regions to a data zone without prior notice. Azure Policy can block a SKU. | https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types | ms.date 2026-08-06 | Processing location is a property of the SKU, not the resource region. Residency claims must be tied to SKU. | azure-ai-assurance |
| New models launch on Global Standard first; regional Standard and Provisioned arrive last with no guaranteed date. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | ms.date 2026-07-24 | Residency-bound workloads may have no in-region successor when the current model retires. | azure-ai-assurance, model-change-assurance |
| Provisioned throughput: PTUs are model-independent, quota is per subscription, region and deployment type. **Quota does not guarantee capacity; reservations do not guarantee capacity.** Billing is hourly per PTU or 1-month / 1-year Azure Reservations. Optional **spillover** routes overflow to a standard deployment. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput | ms.date 2026-07-15 | Capacity and cost assumptions need continuous checks. Spillover silently moves traffic to pay-per-token. | ai-cost-assurance, azure-ai-assurance |
| Service is **Foundry Agent Service**. Agent types: prompt agents, voice-based prompt agents (preview elements), hosted agents. Built on the Responses API. Toolboxes expose tools through one managed MCP endpoint. A2A v1.0 is GA. | https://learn.microsoft.com/en-us/azure/foundry/agents/overview | ms.date 2026-09-25 | Agents, tools and toolbox versions are separately versioned objects, each a source of drift. | ai-agent-assurance, azure-ai-assurance |
| Assistants API is replaced by the Responses API (Agents v2). Terminology changed: Threads, Messages, Runs, Assistants -> Conversations, Items, Responses, Agent Versions. API versioning moved from monthly `api-version` to stable `/openai/v1/` routes. | https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry | updated 2026-09-24 | Agents built on the older API need migration and re-validation. | ai-agent-assurance, azure-ai-assurance |
| Key migration dates in current docs: **2026-08-26** the `azure-ai-inference` package retires (replace with the `openai` package), and **2026-08-26** the Assistants API sunsets. An earlier blog summary gave 2026-05-30 for the package; the docs page is the later and authoritative source. | https://learn.microsoft.com/en-us/azure/foundry/how-to/navigate-from-classic | ms.date 2026-09-11, updated 2026-09-14 | SDK and API retirements expire evidence just as model retirements do. Both dates have passed. | azure-ai-assurance, ai-agent-assurance |
| Naming history stated by Microsoft: Azure AI Studio -> Azure AI Foundry -> Microsoft Foundry; Azure Cognitive Services -> Azure AI Services -> Foundry Tools. Azure resource type stays `Microsoft.CognitiveServices/accounts`. "Model-as-a-Service (MaaS)" billing is now **Foundry Direct Models**. | https://learn.microsoft.com/en-us/azure/foundry/how-to/navigate-from-classic | ms.date 2026-09-11 | Confirms former names from the vendor. Resource type in logs and policy still shows the oldest name. | azure-ai-assurance |
| Feature status in the current portal: Responses API GA, Agents v2 GA, hosted agents GA, agent publishing to M365/Teams GA, A2A v1.0 GA. **Preview**: multi-agent workflows, agent memory, Foundry IQ, Foundry Control Plane. The Responses API is not available in every Azure region. | https://learn.microsoft.com/en-us/azure/foundry/how-to/navigate-from-classic | ms.date 2026-09-11 | Preview features carry no SLA. Agents cannot run in a region without the Responses API, which limits residency options. | ai-agent-assurance, azure-ai-assurance |
| **Microsoft Agent Framework 1.0** is GA for .NET and Python (2026-04-03). It unifies Semantic Kernel and AutoGen. Foundry hosted agent integration, DevUI and Skills remain preview. | https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/ | 2026-04-03 | Framework choice is now settled for new Microsoft-stack agents. | ai-agent-assurance |
| Semantic Kernel v1.x receives critical bug and security fixes; most new features go to Agent Framework. Support promised for at least one year after Agent Framework GA. | https://devblogs.microsoft.com/agent-framework/semantic-kernel-and-microsoft-agent-framework/ | 2025-10-07 | Estates on Semantic Kernel or AutoGen carry a dated support horizon. | ai-agent-assurance |
| **Guardrails and controls**: a guardrail is a named set of controls. Intervention points are user input, tool call (preview), tool response (preview), output. Agent guardrails are preview. Default is `Microsoft.DefaultV2`. **An agent's guardrail fully overrides its model's guardrail.** Classifiers come from Azure AI Content Safety. Prompt Shields covers user prompt attacks and indirect attacks. | https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview | ms.date 2026-07-31 | A weaker agent guardrail replaces a stricter model one. Effective protection must be tested, not inferred from configuration. | ai-agent-assurance, azure-ai-assurance |
| Foundry observability covers evaluation, monitoring and tracing on OpenTelemetry and Application Insights. Includes continuous evaluation of sampled production traffic, scheduled evaluation, scheduled red teaming and the AI red teaming agent (PyRIT). Evaluations are consumption-billed; playground evaluations are on by default. | https://learn.microsoft.com/en-us/azure/foundry/concepts/observability | ms.date 2026-07-31 | Native tooling produces signals. It does not decide whether a business outcome is still met. | azure-ai-assurance, ai-agent-assurance, ai-cost-assurance |
| **Microsoft Entra Agent ID** provides agent identity blueprints and agent identities, Conditional Access, Identity Protection and governance for agents. Extending Entra security features to agents requires **Microsoft Agent 365**. | https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id | ms.date 2026-04-14, updated 2026-08-13 | Agent permissions and ownership become auditable objects that need periodic re-attestation. | ai-agent-assurance |
| **Copilot Studio**: from July 2026 an Entra Agent ID is created for every new agent with no environment opt-out. Agent evaluations are GA (March 2026). Computer use is GA (May 2026). A2A is GA (April 2026). Billing unit is Copilot Credits. Some external models may process data outside the organisation's geography. | https://learn.microsoft.com/en-us/microsoft-copilot-studio/whats-new | ms.date 2026-08-18, updated 2026-09-17 | Default orchestration models are replaced by Microsoft on its own schedule. Model choice also changes residency. | ai-agent-assurance, model-change-assurance, ai-cost-assurance |
| Copilot Studio model lifecycle: **GPT-5.5 Chat is the default** in all listed regions. GPT-4o and Claude Sonnet 4.5 are Retired. The default "is periodically upgraded". A retired model can be used for up to one month. Agents fall back to the default if the selected model is turned off or unavailable. "Cross-geo" models may process data outside the region. | https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-select-agent-model | ms.date 2026-09-18, updated 2026-09-19 | Agents on the default model change model without maker action. Silent fallback also changes the model. | ai-agent-assurance, model-change-assurance |
| **AutoGen is in maintenance mode**: no new features, community managed. **Semantic Kernel** README states it "is now Microsoft Agent Framework", the successor. | https://github.com/microsoft/autogen | Retrieved 2026-09-27 | Confirms both predecessor frameworks are end-of-line for new work. | ai-agent-assurance |
| **Microsoft Entra Agent ID is generally available.** | https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id | ms.date 2026-05-01, updated 2026-08-13 | Agent identity can be treated as a production control. | ai-agent-assurance |

### AWS

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Bedrock model states are **Active, Legacy, End-of-Life (EOL)**, exposed in the `modelLifecycle` field of `GetFoundationModel` / `ListFoundationModels`. **Two lifecycle policies now exist**: one for models launched on or after 2026-09-07, one for models launched before. | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html | Page undated; policy effective 2026-09-07 | Which policy applies depends on launch date. Assurance tooling must read the model card, not assume one rule. | aws-bedrock-assurance, model-change-assurance |
| New policy (launched on/after 2026-09-07): each model card shows an "EOL no sooner than" date and a Legacy period of **6 months or 45 days**. Legacy models are closed to new customers; existing customers may lose access after 15 days of inactivity. No new Provisioned Throughput on Legacy models. **Migration does not happen automatically.** | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html | Page undated | A 45-day notice period is shorter than most enterprise change cycles. Inactive DR or low-volume workloads can lose access. | aws-bedrock-assurance, model-change-assurance |
| Older policy (launched before 2026-09-07): at least 12 months on Bedrock before EOL, at least 6 months in Legacy. For EOL dates after 2026-02-01, a **public extended access** phase starts after a minimum 3 months in Legacy, with higher pricing set by the provider. | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html | Page undated | Staying on a Legacy model has a cost step that finance will not see coming. | ai-cost-assurance, model-change-assurance |
| Listed Legacy models include Claude Sonnet 4 (EOL 2026-10-14), Claude Opus 4.1 (EOL 2027-01-08), Claude 3 Haiku (EOL 2026-09-10), Nova Premier and Nova Sonic v1 (EOL 2026-09-14), Nova Canvas and Nova Reel (EOL 2026-09-30), Jamba 1.5 (EOL 2026-11-26), Cohere Command R and Command R+ (Legacy 2026-02-19, EOL 2026-08-19), TwelveLabs Marengo Embed v2.7 (EOL 2026-11-30). Bedrock dates may differ from the provider's own dates. | https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html | Page undated; retrieved 2026-09-27 | The same model retires on different dates on different platforms. | aws-bedrock-assurance, model-provider-migration |
| **Cross-Region inference** uses inference profiles: **Geographic** (US, EU, APAC) or **Global** (any commercial Region, about 10% cheaper). Requests can route to Regions not enabled in the account. CloudTrail records the processing Region in `additionalEventData.inferenceRegion`. Inference profiles do not support Provisioned Throughput. | https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html | Page undated | Residency is decided by the profile ID in the request. The processing Region is provable per request from CloudTrail. | aws-bedrock-assurance |
| **Service tiers**: Reserved, Priority, Standard, Flex. Reserved is 1 or 3 months, priced per 1K tokens-per-minute, overflows to Standard, targets 99.5% uptime. On-demand quota is shared across Priority, Standard and Flex. `ResolvedServiceTier` shows the tier that actually served the request. | https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html | Page undated | Requested tier and served tier can differ. Latency and cost evidence must use the resolved tier. | ai-cost-assurance, aws-bedrock-assurance |
| **Provisioned Throughput** is billed hourly per Model Unit with no commitment, 1-month or 6-month terms. Required to use customised models. Billing continues until deleted. | https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html | Page undated | Commitments can outlive the model they were bought for. | ai-cost-assurance |
| **Prompt caching**: implicit and explicit types. TTL 5 minutes or 1 hour on recent Claude models, 30 minutes on GPT-5.6 models. Cache writes can cost more than standard input. **A cache hit is never guaranteed**; cross-Region routing can increase cache writes. | https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html | Page undated | Cost models that assume a hit rate need continuous measurement from response usage fields. | ai-cost-assurance |
| **Amazon Bedrock Guardrails** safeguards: content filters (including Prompt Attack), denied topics, word filters, sensitive information filters, contextual grounding checks, Automated Reasoning checks. Classic and Standard tiers. Guardrails are versioned. `ApplyGuardrail` works without a model call. Reasoning content blocks are excluded from evaluation. | https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html | Page undated | Guardrail version and tier in force must be proven per workload. Reasoning output is a documented gap. | aws-bedrock-assurance, ai-agent-assurance |
| **Amazon Bedrock evaluations** cover programmatic, human and judge-model evaluation jobs, plus RAG evaluation for Knowledge Bases and external RAG sources. | https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html | Page undated | Job-based evaluation is point-in-time. It needs scheduling and thresholds to become assurance. | aws-bedrock-assurance, model-change-assurance |
| **Amazon Bedrock Agents is now "Amazon Bedrock Agents Classic"**, in maintenance mode and closed to new customers from **2026-07-30**. Model catalogue for Agents Classic is frozen at that date. No EOL date set. API namespace `bedrock-agent` unchanged. AWS recommends migrating to AgentCore. | https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html | Page undated; effective 2026-07-30 | Agents Classic workloads cannot move to newer models, so model retirement forces an agent platform migration. | ai-agent-assurance, aws-bedrock-assurance, model-change-assurance |
| **Amazon Bedrock AgentCore** services: Harness, Runtime, Memory, Gateway, Identity, Code Interpreter, Browser, Observability, Payments, Evaluations, Optimization, Policy, Registry. Works with any framework and with models outside Bedrock. Consumption-based pricing. | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html | Page undated | Agent behaviour depends on many independently versioned services. | ai-agent-assurance, aws-bedrock-assurance |
| AgentCore GA milestones: platform GA October 2025; Policy, Evaluations and AgentCore CLI GA March 2026; Harness, Recommendations, Batch Evaluations and A/B Testing GA July 2026; AWS Agent Registry GA August 2026. | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html | Updated September 2026 | Monthly feature change means control coverage needs frequent re-checking. | ai-agent-assurance |
| Provisioned Throughput supported list covers older models only: Amazon Nova and Titan, Claude up to 3.5 Sonnet v2, Cohere Embed v3, Llama 3.1 and 3.2. **Nova 2 Lite is the newest entry. No Claude 4 or later model is listed.** | https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-supported.html | Page undated; retrieved 2026-09-27 | Reserved capacity for current models has to come from the Reserved service tier. Capacity plans built on Provisioned Throughput do not carry forward. | ai-cost-assurance, aws-bedrock-assurance |
| **Amazon Bedrock Managed Knowledge Base** is GA: a fully managed RAG service with six native connectors, hybrid search, ranking and agentic retrieval. Available in eight Regions at launch. | https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-bedrock-managed-knowledge-base/ | 2026-06-17 | Retrieval quality and permission filtering are assurance targets separate from the model. | aws-bedrock-assurance |
| **Amazon SageMaker AI** is the name of the ML build, train and deploy service since 2024-12-03. "Amazon SageMaker" now means the wider data, analytics and AI platform, which includes SageMaker AI, SageMaker Unified Studio and Bedrock. `sagemaker` API namespaces and endpoints are unchanged. | https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html | Page undated | Self-hosted model endpoints sit under SageMaker AI. Naming must be precise on our pages. | aws-bedrock-assurance, vllm-production-assurance |
| **Amazon Nova 2** announced with Nova 2 Lite (GA) and Nova 2 Pro (Preview, early access for Amazon Nova Forge customers). The Bedrock model cards index lists Nova 2 Lite and Nova 2 Sonic; Nova 2 Pro and Nova 2 Omni do not appear there. First-generation Nova Premier, Sonic, Canvas and Reel are Legacy with September 2026 EOL. | https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock/ | 2025-12-02 | First-party models retire on the same short cycle as third-party ones. | aws-bedrock-assurance, model-change-assurance |
| **Amazon Q Developer** IDE plugins and paid subscriptions reach end of support **2027-04-30**; new sign-ups blocked from 2026-05-15. Successor is **Kiro**. Q Developer in the AWS console is unaffected. | https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/ | 2026-04-30 | Avoid presenting Amazon Q Developer as a current strategic product. | aws-bedrock-assurance |
| **Amazon Q Business is no longer open to new customers.** Bug and security fixes only. Successor is **Amazon Quick**. Q Business guardrails and Actions do not carry over through the BYOI migration path. | https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/qbusiness-availability-change.html | Page undated | Migration drops existing guardrails, so control coverage must be re-proven after cutover. | aws-bedrock-assurance, ai-agent-assurance |
| **Amazon Quick** naming: "Amazon Quick evolved from Amazon QuickSight. QuickSight continues as Amazon Quick Sight, a feature within Quick." AWS announced "Amazon Quick Suite" on 2025-10-09; the `/quicksuite/` docs path now redirects to `/quick/` and the guide is titled "Amazon Quick". | https://docs.aws.amazon.com/quick/latest/userguide/what-is.html | Page undated; retrieved 2026-09-27 | Use "Amazon Quick". "Quick Suite" and "QuickSight" are former product names. | aws-bedrock-assurance |
| Bedrock model cards index lists OpenAI GPT-6 (Astra, Sol, Luna), GPT-5.6 (Sol, Terra, Luna), GPT-5.5, GPT-5.4 and gpt-oss models. Document history shows `bedrock-runtime` is now the recommended endpoint for OpenAI-compatible APIs, ahead of `bedrock-mantle`. | https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html | Page undated; retrieved 2026-09-27 | Endpoint guidance changed within the year. Integrations built on the earlier endpoint need review. | model-provider-migration, aws-bedrock-assurance |
| OpenAI models are documented on Bedrock (for example `openai.gpt-5.6-sol`, `openai.gpt-5.5`) through the Responses API on `bedrock-runtime` and `bedrock-mantle` endpoints. | https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html | Page undated | The same model family is now reachable on several clouds with different lifecycle and caching rules. | model-provider-migration, aws-bedrock-assurance |

### Google Cloud

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| **Vertex AI has been renamed Gemini Enterprise Agent Platform** (short form "Agent Platform"). Announced at Google Cloud Next '26. Google states all Vertex AI services and roadmap are delivered through Agent Platform from now on, not as a standalone service. | https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform | 2026-04-23 | The page slug `vertex-ai-assurance` uses a former name. Copy must lead with the current name and cite "formerly Vertex AI". | vertex-ai-assurance |
| Official rename table: Vertex AI Agent Engine -> **Agent Runtime**; Vertex AI Studio -> **Agent Studio**; Vertex AI Search -> **Agent Search**; Gen AI evaluation service -> **Gemini Enterprise Agent Platform Evals**; Vertex AI Vector Search -> **Vector Search on Gemini Enterprise Agent Platform**; Vertex AI Vector Search 2.0 -> **Agent Retrieval**; Vertex AI Model Garden -> Gemini Enterprise Agent Platform Model Garden; Vertex AI API -> Gemini Enterprise Agent Platform API. RAG Engine keeps its name. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes | Last updated 2026-09-25 | Authoritative source for every Google product name we publish. | vertex-ai-assurance, ai-agent-assurance |
| Technical identifiers did not change with the brand: endpoints remain `aiplatform.googleapis.com`, and the Agent Runtime API resource is still `ReasoningEngine` for backwards compatibility. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime | Last updated 2026-09-25 | Audit logs, IAM and IaC still show old identifiers. Evidence mapping must bridge brand names and API names. | vertex-ai-assurance, ai-agent-assurance |
| Two model availability classes. Standard models stay available at least **12 months** after release. **Short-term availability** models stay active until a retirement date is announced with at least **45 days** notice. Retirement dates may be extended but never moved earlier. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | Last updated 2026-09-25 | 45 days is the real planning horizon for short-term models. | model-change-assurance, vertex-ai-assurance |
| `gemini-2.5-pro`, `gemini-2.5-flash` and `gemini-2.5-flash-lite` retire **2026-10-20**. Listed replacement for gemini-2.5-pro is `gemini-3.5-flash`. `gemini-2.0-flash` and `gemini-2.0-flash-lite` retired 2026-06-01. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | Last updated 2026-09-25 | Imminent retirement with a cross-tier replacement (Pro to Flash). Quality and cost must be re-validated. | model-change-assurance, vertex-ai-assurance, ai-cost-assurance |
| Current 12-month models include `gemini-3.5-flash` (released 2026-05-19), `gemini-3.5-flash-lite` (2026-07-21), `gemini-3.1-flash-lite` (2026-05-07). Short-term models include `gemini-3.6-flash`, `gemini-3.7-flash`, `gemini-3.8-flash`, `gemini-3.8-flash-cyber`, released July to September 2026. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | Last updated 2026-09-25 | Three short-term Flash releases in three months shows the cadence evidence must keep up with. | model-change-assurance |
| Embedding models `text-embedding-004`, `text-embedding-005`, `text-multilingual-embedding-002` and `multimodalembedding@001` retire 2027-04-01. `gemini-embedding-001` is kept no sooner than 2028-05-20. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | Last updated 2026-09-25 | Embedding retirement forces full re-indexing of vector stores and re-validation of retrieval quality. | vertex-ai-assurance, model-change-assurance |
| Google's quick-fix guidance for retirement errors: point to the recommended upgrade, test mission-critical features, deploy. Retirement is not an automatic upgrade. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions | Last updated 2026-09-25 | Unmigrated workloads fail at retirement rather than change silently. | model-change-assurance |
| Five consumption options: **Provisioned Throughput** (1-week, 1-month, 3-month, 1-year), **Standard PayGo**, **Priority PayGo**, **Flex PayGo**, **Batch inference**. Traffic above the Provisioned Throughput baseline spills over to Standard PayGo by default. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options | Last updated 2026-09-25 | Spillover changes both cost and performance class without an application change. | ai-cost-assurance, vertex-ai-assurance |
| Provisioned Throughput is a fixed-cost, fixed-term subscription tied to a specific model and location, measured in generative AI scale units (GSUs). | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput | Last updated 2026-09-25 | Commitments bound to a model become stranded when that model retires. | ai-cost-assurance |
| **Endpoints do not guarantee data residency or in-region ML processing.** Global endpoint gives no control over processing region. Jurisdictional multi-region endpoints exist for US and EU (`aiplatform.us.rep.googleapis.com`, `aiplatform.eu.rep.googleapis.com`). The EU endpoint excludes the UK and Switzerland. Private Google Access is not supported on multi-region endpoints. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations | Last updated 2026-09-25 | Residency depends on the hostname the client calls. One misconfigured client breaks the claim. | vertex-ai-assurance |
| Data at rest stays in the chosen location regardless of endpoint. ML processing location follows the endpoint type. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency | Last updated 2026-09-25 | Storage residency and processing residency are separate claims needing separate evidence. | vertex-ai-assurance |
| **RAG Engine** supports VPC-SC and CMEK. **Data residency and AXT controls are not supported.** New projects need allowlisting in us-central1, us-east1 and us-east4. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview | Last updated 2026-09-25 | A residency-compliant model call can sit on a retrieval layer that carries no residency commitment. | vertex-ai-assurance |
| **Agent Runtime** is a managed runtime for agents in any language or framework that can be containerised, with Agent2Agent protocol support. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime | Last updated 2026-09-25 | Runtime is framework-neutral, so agent behaviour is set by customer code and must be verified there. | ai-agent-assurance |
| Agent Platform pillars at launch: Agent Studio, Agent Development Kit (ADK), Agent Garden, Agent Runtime, Agent Sandbox, Memory Bank, Agent Sessions, Agent Identity, Agent Registry, Agent Gateway, Agent Anomaly Detection, Agent Threat Detection, Agent Simulation, Agent Evaluation, Agent Observability, Agent Optimizer. | https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform | 2026-04-23 | Broad native control surface. Each control needs proof it is switched on and effective per agent. | ai-agent-assurance, vertex-ai-assurance |
| **Agent evaluation** uses eval cases, simulated user responses, traces and metrics (predefined, custom LLM, custom code). It can score traces from production traffic or external logs. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation | Last updated 2026-09-25 | Provides the measurement primitive. Thresholds, ownership and corrective action sit outside it. | ai-agent-assurance, vertex-ai-assurance |
| **Model Armor** screens prompts and responses for prompt injection, jailbreak, responsible AI categories and sensitive data, using templates and confidence levels. Works for AI on Google Cloud or other clouds. Lower thresholds raise false positives. Integrates with Agent Gateway. | https://docs.cloud.google.com/model-armor/overview | Last updated 2026-09-24 | Threshold choice is a trade-off that needs continuous measurement of both misses and false blocks. | vertex-ai-assurance, ai-agent-assurance |
| Release notes record the rename on **2026-04-22** ("Vertex AI to Gemini Enterprise Agent Platform naming changes", "Initial release of Gemini Enterprise Agent Platform"). | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | Last updated 2026-09-25 | Dates the name change from Google's own change log. | vertex-ai-assurance |
| Component status from release notes: **Agent Gateway, Agent Registry and Agent Observability GA on 2026-06-18**; Model Armor for Agent Gateway GA 2026-06-24; Memory Bank memory profiles GA 2026-07-15; Computer Use and Shell sandboxes GA 2026-09-09. **Preview**: Agent Identity API (replaces the IAM Connectors API), Managed Agents API, Semantic Governance Policies, deferred tier. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | Last updated 2026-09-25 | Governance controls reached GA at different times. Control coverage claims must state which components were GA when evidence was taken. | ai-agent-assurance, vertex-ai-assurance |
| **Breaking SDK change 2026-09-18**: Agent Platform SDK for Python 2.0.1 (`google-cloud-agentplatform`) moves generative AI modules to the Google Gen AI SDK and splits the agent surface out of `google-cloud-aiplatform`. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | Last updated 2026-09-25 | Package and namespace change forces code migration and re-test, separate from any model change. | vertex-ai-assurance, ai-agent-assurance |
| Open model endpoints deprecated 2026-07-21 and **retired 2026-10-21**, including `deepseek-v3.2-maas`, `deepseek-r1-0528-maas`, `glm-5-maas`, `gpt-oss-20b-maas`, `llama-3.3-70b-instruct-maas`, `kimi-k2-thinking-maas`. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | Last updated 2026-09-25 | Managed open-model endpoints retire on roughly three months' notice. | model-change-assurance, vertex-ai-assurance, vllm-production-assurance |
| Retirement dates move: `gemini-2.5-flash-image` retirement was extended from 2026-10-02 to 2027-03-15 (notice dated 2026-09-14). Preview endpoints for 2.5 Flash, 2.5 Flash-Lite and 3.1 Flash-Lite were retired 2026-07-09. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | Last updated 2026-09-25 | A retirement register must be refreshed from source, not copied once. | model-change-assurance |
| Consumption changes in September 2026: Priority PayGo ramp limits removed, with traffic above the limit downgraded to Standard PayGo when no spare capacity; Priority PayGo supported on US and EU multi-region endpoints; Standard PayGo Tier 4 added; agent metering pricing updated 2026-09-01. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes | Last updated 2026-09-25 | Throughput tier and price rules changed three times in one month. | ai-cost-assurance |
| GA Gemini text models listed: 3.8 Flash, 3.7 Flash, 3.6 Flash, 3.5 Flash, 3.5 Flash-Lite, 3.1 Flash-Lite, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite. **Gemini 2.5 Pro is the only GA Pro-tier text model on the page.** Gemma 4 is listed as an open model. | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models | Last updated 2026-09-25 | Workloads on 2.5 Pro have no listed GA Pro successor before the 2026-10-20 retirement. | model-change-assurance, vertex-ai-assurance |

### Hugging Face and open-weight models

Licence values below are read from each model repository's metadata on the Hugging Face Hub on 2026-09-27. "Other" means a vendor-specific licence that needs legal review.

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| **Inference Endpoints** is Hugging Face's managed dedicated deployment service. Natively supported engines: vLLM, Text Generation Inference (TGI), SGLang, llama.cpp, Text Embeddings Inference (TEI). Engines run as prebuilt containers with autoscaling and scale-to-zero. | https://huggingface.co/docs/inference-endpoints/en/about | Page undated; retrieved 2026-09-27 | Engine, engine version and model revision are each separate change vectors on a dedicated endpoint. | vllm-production-assurance |
| **TGI is in maintenance mode as of 2025-12-11.** Hugging Face recommends vLLM or SGLang. The engine cannot be changed on an existing endpoint, so migration means a new endpoint. The TGI GitHub repository is archived. | https://huggingface.co/docs/inference-endpoints/en/engines/tgi | Page undated; maintenance notice dated 2025-12-11 | TGI estates need a planned engine migration with before and after performance and output evidence. | vllm-production-assurance, model-provider-migration |
| vLLM on Inference Endpoints defaults `tensor_parallel_size` to the GPU count and `data_parallel_size` to 1. KV cache dtype options (fp8 variants) reduce memory and "may slightly impact generation quality". | https://huggingface.co/docs/inference-endpoints/en/engines/vllm | Page undated; retrieved 2026-09-27 | Throughput and quality depend on engine flags, so configuration drift changes outcomes. | vllm-production-assurance, ai-cost-assurance |
| vLLM release cadence: v0.28.0 (2026-08-26), v0.29.0 (2026-09-09), v0.30.0 (2026-09-22). Roughly one minor release every two weeks. | https://github.com/vllm-project/vllm/releases | 2026-09-22 | Self-hosted serving changes faster than managed platforms. Each upgrade needs regression evidence. | vllm-production-assurance |
| Inference Endpoints security: no storage of payloads or tokens, logs kept 30 days, TLS in transit, AWS PrivateLink option, SOC 2 Type 2. | https://huggingface.co/docs/inference-endpoints/en/guides/security | Page undated; retrieved 2026-09-27 | Baseline controls to verify per endpoint, especially exposure level. | vllm-production-assurance |
| **Inference Providers** is a routing proxy to third-party providers (for example Cerebras, Groq, Together, Fireworks, Novita, Scaleway, OVHcloud, plus Hugging Face's own "HF Inference"). OpenAI-compatible endpoint at `router.huggingface.co/v1`. No markup on provider rates. | https://huggingface.co/docs/inference-providers/index | Page undated; retrieved 2026-09-27 | One model ID can be served by different companies with different hardware, quantisation and data terms. | model-provider-migration, vllm-production-assurance |
| Default routing picks the **fastest** available provider. Suffixes `:cheapest`, `:preferred` or a named provider change this. With automatic selection, requests fail over to other providers. | https://huggingface.co/docs/inference-providers/index | Page undated; retrieved 2026-09-27 | Unless pinned, the serving provider can change between requests. Evidence is only valid for a pinned provider. | model-provider-migration, ai-cost-assurance |
| **HF Inference** "used to be called 'Inference API (serverless)' prior to Inference Providers". As of July 2025 it focuses mostly on CPU inference for smaller models. | https://huggingface.co/docs/inference-providers/en/providers/hf-inference | Page undated; retrieved 2026-09-27 | Confirms the former name. Large LLM traffic through Hugging Face now runs on third-party providers. | model-provider-migration, vllm-production-assurance |
| **Llama 4** (Scout, Maverick) uses the custom `llama4` licence and gated access. Llama 3.3 uses `llama3.3`. Newest Llama 4 repositories date from April 2025. | https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct | Last modified 2025-05-22 | Custom community licence with acceptable-use terms. Needs legal sign-off and re-check on each version. | vllm-production-assurance, model-provider-migration |
| **Gemma 4** is tagged `apache-2.0` and is not gated. **Gemma 3** used the custom `gemma` licence with gated access. | https://huggingface.co/google/gemma-4-31B-it | Last modified 2026-07-20 | Licence terms changed between generations of the same family. Approval for one version does not carry over. | vllm-production-assurance |
| **Mistral**: Mistral Small 4 is `apache-2.0`. Mistral Medium 3.5 and Devstral 2 (123B) are tagged `other`. | https://huggingface.co/mistralai/Mistral-Medium-3.5-128B | Last modified 2026-07-15 | Licence varies by model size within one vendor. Each model needs its own check. | vllm-production-assurance |
| **Qwen**: Qwen3.8-27B is `apache-2.0`. Qwen3.8-Flash-Next and Qwen3.8-2.4T-A95B are tagged `other`. Qwen3 and Qwen3-Coder repositories are `apache-2.0`. | https://huggingface.co/Qwen | Repositories created 2026-08 | Same pattern: smaller weights permissive, larger weights restricted. | vllm-production-assurance |
| **DeepSeek** V3.2, V4-Flash and V4-Pro are tagged `mit`. Dated variants exist (V4-Flash-0731, V4-Pro-0813). | https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro | Last modified 2026-06-22 | Permissive licence. Dated variants mean the "same" model name has several weight sets. | vllm-production-assurance, model-change-assurance |
| **Phi-4** family is `mit`. **gpt-oss-120b / gpt-oss-20b** (OpenAI open-weight) are `apache-2.0`. **IBM Granite 4.2** is `apache-2.0`. | https://huggingface.co/microsoft/phi-4 | Last modified 2026-07-14 | Lowest licence risk group for regulated enterprises. | vllm-production-assurance |
| **Kimi K3** uses custom licence `kimi-k3`. **GLM-5.3** uses custom licence `glm-5.3`, while GLM-5.3-Flash and GLM-5.2 are `mit`. | https://huggingface.co/moonshotai/Kimi-K3 | Last modified 2026-09-02 | New custom licences appear with each flagship release. Licence review must be part of model intake. | vllm-production-assurance |
| Open-weight models on hyperscalers retire on the platform's schedule. Example: DeepSeek-R1 and V3.1 are Retired on Microsoft Foundry; Fireworks-hosted models there carry a 15-day retirement notice. | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule | ms.date 2026-09-21 | Open weights do not retire, but managed hosting of them does. Self-hosting is the only way to control the date. | vllm-production-assurance, model-change-assurance |

### OpenAI and Anthropic direct APIs

#### OpenAI

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Featured models on the OpenAI API: **GPT-6 Astra** (flagship), **GPT-5.6 Terra**, **GPT-5.6 Luna**. GPT-5.6 Sol is the replacement target for GPT-5 and o3 snapshots. | https://developers.openai.com/api/docs/models | Page undated; retrieved 2026-09-27 | Use these names when describing the current OpenAI line-up. | model-provider-migration, model-change-assurance |
| Release dates from the changelog: GPT-5.6 family 2026-07-09; **GPT-6 Astra 2026-09-03**; **GPT-6 Sol and GPT-6 Luna 2026-09-22**. GPT-6 Astra: model ID `gpt-6-astra`, $10 input and $50 output per 1M tokens, no custom `temperature` or `top_p`, no fine-tuning. | https://developers.openai.com/api/docs/changelog | Latest entry 2026-09-25 | Two model generations shipped within eleven weeks. Removed sampling parameters break existing requests. | model-change-assurance, ai-cost-assurance |
| On 2026-09-25 OpenAI fixed an image encoding bug in GPT-6 Sol and GPT-6 Luna and recommended "rerunning your evaluations". | https://developers.openai.com/api/docs/changelog | 2026-09-25 | Vendor-documented case of behaviour changing under an unchanged model ID. | model-change-assurance |
| **Agents API released in public beta on 2026-09-10.** | https://developers.openai.com/api/docs/changelog | 2026-09-10 | Beta status. Not yet a stable base for production evidence. | ai-agent-assurance |
| Minimum retirement notice: **6 months** for GA models, **3 months** for specialised variants (chat, Codex, deep research), and as little as **2 weeks** for preview models. Shorter if safety or compliance requires. | https://developers.openai.com/api/docs/deprecations | Latest entry 2026-09-11 | Notice depends on model class. Preview models in production are a standing risk. | model-change-assurance |
| Scheduled shutdowns: GPT-5 and o3 snapshots on 2026-12-11; legacy GPT snapshots on 2026-10-23; legacy audio and realtime families on 2027-01-20; `whisper-1` and gpt-4o transcription models on 2027-02-26; `gpt-5.4-cyber` on 2026-10-01 (20 days after announcement). | https://developers.openai.com/api/docs/deprecations | 2026-09-11 | Concrete expiry dates for evidence gathered on these models. | model-change-assurance, model-provider-migration |
| **Assistants API was shut down 2026-08-26.** Replacement is the Responses API and Conversations API. | https://developers.openai.com/api/docs/deprecations | Announced 2025-08-26 | Any content referring to Assistants API as current is wrong. | ai-agent-assurance |
| **OpenAI Evals platform is deprecated**: existing evals read-only from 2026-10-31, dashboard and API shut down 2026-11-30. OpenAI's migration guide points to Promptfoo. **Agent Builder** and **reusable prompts** (`v1/prompts`) also shut down 2026-11-30. ChatKit remains. | https://developers.openai.com/api/docs/deprecations | Announced 2026-06-03 | Vendor-hosted evaluation tooling itself can be retired. Evaluation assets should be portable. | ai-agent-assurance, model-change-assurance |
| Self-serve fine-tuning is being wound down: closed to new organisations from 2026-05-07; existing active customers cannot create new jobs from 2027-01-06. Inference on fine-tuned models continues until the base model is deprecated. | https://developers.openai.com/api/docs/deprecations | Announced 2026-05-07 | Fine-tuned models cannot be re-created on a successor. Retirement of the base model ends the capability. | model-change-assurance, model-provider-migration |
| Agent options: **Agents API** (OpenAI-managed Codex harness), **Agents SDK** (loop runs in your application), **Responses API**, **ChatKit**. | https://developers.openai.com/api/docs/guides/agents | Page undated; retrieved 2026-09-27 | Where the agent loop runs decides who holds state and evidence. | ai-agent-assurance |
| API data is not used for training by default. Abuse monitoring logs kept up to 30 days. Zero Data Retention and Modified Abuse Monitoring need approval. Endpoints that store application state are not ZDR-eligible. Data residency storage is offered in ten regions; **regional inference processing only in US and EU**. | https://developers.openai.com/api/docs/guides/your-data | Page undated; retrieved 2026-09-27 | Residency at rest and residency of processing differ by region. Stateful agent endpoints fall outside ZDR. | model-provider-migration, ai-agent-assurance |

#### Anthropic

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Current models: **Claude Fable 5.1**, **Claude Opus 5.5** (released 2026-09-22), **Claude Sonnet 5**, **Claude Haiku 4.5**. Still available: Fable 5, Opus 5, Opus 4.8, 4.7, 4.6, 4.5, Sonnet 4.6, 4.5. Claude Mythos 5.1 is restricted access. | https://platform.claude.com/docs/en/about-claude/models/overview | Page undated; retrieved 2026-09-27 | Use these names for the current Claude line-up. | model-provider-migration, model-change-assurance |
| Lifecycle states: Active, Legacy, Deprecated, Retired. At least **60 days** notice before retirement. Requests to retired models fail. Usage by model and API key can be exported from the Console. | https://platform.claude.com/docs/en/about-claude/model-deprecations | Latest entry 2026-06-05 | Sixty days is shorter than most enterprise release cycles. Compare OpenAI at 6 months for GA models. | model-change-assurance |
| Retired in 2026: Claude Opus 4.1 (2026-08-05), Claude Sonnet 4 and Opus 4 (2026-06-15), Claude Haiku 3 (2026-04-20), Claude Sonnet 3.7 and Haiku 3.5 (2026-02-19). Next "not sooner than" dates: Sonnet 4.5 on 2026-09-29, Haiku 4.5 on 2026-10-15, Opus 4.5 on 2026-11-24. | https://platform.claude.com/docs/en/about-claude/model-deprecations | Retrieved 2026-09-27 | Earliest possible retirement dates are published and can be tracked automatically. | model-change-assurance |
| **Retirement dates differ by platform.** Anthropic's dates apply to the Claude API, Claude Platform on AWS and Microsoft Foundry. Amazon Bedrock and Google Cloud set their own. Example: Claude Sonnet 4 retired 2026-06-15 on the Claude API but has EOL 2026-10-14 on Bedrock. | https://platform.claude.com/docs/en/about-claude/model-deprecations | Retrieved 2026-09-27 | One model, several expiry dates. Multi-cloud estates need a per-platform register. | model-provider-migration, model-change-assurance, aws-bedrock-assurance |
| Every Claude model ID is a pinned snapshot, including dateless IDs from the 4.6 generation. Weights do not change under an ID. **Serving infrastructure (router, safety classifiers, sampling logic) can change and cause minor behaviour differences.** | https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions | Page undated; retrieved 2026-09-27 | Vendor-documented reason why a pinned model can still drift. | model-change-assurance |
| Breaking parameter change on newer models: `temperature`, `top_p`, `top_k` return a 400 error on Claude Opus 4.7 and later when set to non-default values. | https://platform.claude.com/docs/en/about-claude/model-deprecations | Retrieved 2026-09-27 | A model upgrade can break existing requests, not only change output quality. | model-change-assurance |
| A new tokenizer was introduced with Claude Opus 4.7. 1M tokens holds roughly 555k words on it, against about 750k words on earlier models. | https://platform.claude.com/docs/en/about-claude/models/overview | Page undated; retrieved 2026-09-27 | The same text costs more tokens after upgrade even when the per-token price is unchanged. | ai-cost-assurance, model-change-assurance |
| Data residency: `inference_geo` accepts `global` (default) or `us`, on Claude 4.6 and later. US-only inference costs 1.1x. Workspace geo is `us` only. The response reports where inference ran. Not applicable on Bedrock, Google Cloud or Foundry. | https://platform.claude.com/docs/en/manage-claude/data-residency | Page undated; retrieved 2026-09-27 | No EU inference option on the direct API. Residency evidence is available per response. | model-provider-migration |
| Zero data retention is by arrangement per organisation. **Claude Managed Agents is not ZDR-eligible**; session transcripts persist until deleted. Claude Fable and Mythos models require 30-day retention. | https://platform.claude.com/docs/en/manage-claude/api-and-data-retention | Page undated; retrieved 2026-09-27 | Model choice and agent choice both change the data retention position. | ai-agent-assurance, model-provider-migration |
| **Claude Managed Agents** is a managed agent harness, status beta (header `managed-agents-2026-04-01`). Concepts: Agent, Environment, Session, Events. Also offered on Claude Platform on AWS. | https://platform.claude.com/docs/en/managed-agents/overview | Page undated; retrieved 2026-09-27 | Agent tooling name to use. Beta status means behaviour can change. | ai-agent-assurance |
| Release notes, read directly: Claude Managed Agents launched in public beta 2026-04-08; **Claude Platform on AWS** launched 2026-05-11; **Agent Skills** and the Skills API out of beta 2026-08-19; Console "Workbench is now playground" 2026-08-18, with the legacy Workbench access ending 2026-08-17. | https://platform.claude.com/docs/en/release-notes/overview | Latest entry 2026-09-22 | Names and status to use in copy. | ai-agent-assurance, model-provider-migration |
| "The Claude Code SDK has been renamed to the **Claude Agent SDK**." Packages changed from `@anthropic-ai/claude-code` and `claude-code-sdk` to `@anthropic-ai/claude-agent-sdk` and `claude-agent-sdk`. The SDK runs the agent loop in a process the customer operates. | https://code.claude.com/docs/en/agent-sdk/migration-guide | Page undated; retrieved 2026-09-27 | Confirms the former name. Self-run agent loop means evidence sits with the customer. | ai-agent-assurance |

### Terminology: current vs deprecated

Current names are taken from the vendor sources cited in the sections above. "Former names" are names that should not be used as the primary term in new copy. Former names marked with * were not confirmed on a vendor page during this research and are listed under "Could not verify".

#### Microsoft

| Current name (Sept 2026) | Former names | Notes |
|---|---|---|
| Microsoft Foundry | Azure AI Foundry, Azure AI Studio | Two portals coexist: Foundry and Foundry (classic). |
| Foundry Tools | Azure AI Services, Azure Cognitive Services | Resource type is still `Microsoft.CognitiveServices/accounts`. |
| Foundry Direct Models | Model-as-a-Service (MaaS) | First-party models billed directly through Azure meters. |
| Operate section (Foundry portal) | Management Center | Portal navigation change. |
| Foundry resource (with projects) | Hub + Azure OpenAI resource + Azure AI Services resource | Hub-based projects remain only in Foundry (classic). |
| Foundry Models | Azure AI model catalog* | Split into "sold by Azure" and "from partners and community". |
| Azure OpenAI in Microsoft Foundry Models | Azure OpenAI Service | Service Health and pricing pages still say "Azure OpenAI Service". |
| Foundry Agent Service | Azure AI Agent Service*, Azure AI Foundry Agent Service* | Agent types: prompt agents, voice-based prompt agents, hosted agents. |
| Responses API (Agents v2) | Assistants API (Agents v0.5 / v1) | Assistants API sunset 2026-08-26. |
| Conversations, Items, Responses, Agent Versions | Threads, Messages, Runs, Assistants | Object model rename that accompanies the API change. |
| `/openai/v1/` stable routes | Monthly `api-version` parameters | |
| `azure-ai-projects` 2.x plus `OpenAI()` client | `azure-ai-inference`, `azure-ai-generative`, `AzureOpenAI()` | `azure-ai-inference` retired 2026-08-26 per current docs. |
| Guardrails and controls | Content filters, content filtering | Classifiers still come from Azure AI Content Safety. Prompt Shields keeps its name. |
| Foundry User, Foundry Owner, Foundry Account Owner, Foundry Project Manager | Azure AI User, Azure AI Owner, Azure AI Account Owner, Azure AI Project Manager | Role IDs and permissions unchanged. |
| Regional Provisioned | Provisioned | Lifecycle page still says "Provisioned". SKU code is `ProvisionedManaged`. |
| Microsoft Agent Framework | Semantic Kernel, AutoGen | AutoGen README states maintenance mode. Agent Framework 1.0 GA 2026-04-03. |
| Microsoft Entra Agent ID | None | New product, generally available. Security features for agents need Microsoft Agent 365. |
| Copilot Credits | Messages (Copilot Studio billing unit) | Changed 2025-09-01. |

#### AWS

| Current name (Sept 2026) | Former names | Notes |
|---|---|---|
| Amazon Bedrock Agents Classic | Amazon Bedrock Agents | Maintenance mode. Closed to new customers from 2026-07-30. |
| Amazon Bedrock AgentCore | None | Recommended agent platform. Harness is the closest match to Agents Classic. |
| Amazon SageMaker AI | Amazon SageMaker | Renamed 2024-12-03. API namespace `sagemaker` unchanged. |
| Amazon SageMaker | None | Now the wider data, analytics and AI platform. Do not use it to mean the ML service. |
| Amazon SageMaker Unified Studio | Amazon SageMaker Studio (upgrade path exists) | Development environment within the wider platform. |
| Amazon Bedrock Knowledge Bases; Amazon Bedrock Managed Knowledge Base | Knowledge bases for Amazon Bedrock* | Managed Knowledge Base GA June 2026. |
| Amazon Bedrock Guardrails | Guardrails for Amazon Bedrock* | Classic and Standard tiers. |
| Amazon Bedrock evaluations | Model evaluation on Amazon Bedrock* | Covers model and RAG evaluation. |
| Geographic and Global cross-Region inference | Cross-region inference (single type) | Both use inference profiles. |
| Service tiers: Reserved, Priority, Standard, Flex | None | Added alongside Provisioned Throughput, which still exists. |
| Amazon Nova 2 (Lite, Pro, Sonic, Omni) | Amazon Nova first generation | First-generation Nova Premier, Sonic, Canvas, Reel are Legacy. |
| Kiro | Amazon Q Developer (IDE plugins, CLI, subscriptions) | Q Developer end of support 2027-04-30. Console experience unaffected. |
| Amazon Quick | Amazon QuickSight; Amazon Quick Suite; Amazon Q Business | QuickSight became Quick Suite (2025-10-09), now documented as Amazon Quick. Q Business is closed to new customers. |
| Amazon Quick Sight | Amazon QuickSight | BI feature inside Amazon Quick. QuickSight APIs and SDKs continue. |
| Amazon Bedrock in SageMaker Unified Studio | Amazon Bedrock Studio | Rename recorded in Bedrock document history. |

#### Google Cloud

| Current name (Sept 2026) | Former names | Notes |
|---|---|---|
| Gemini Enterprise Agent Platform (short: Agent Platform) | Vertex AI, Vertex AI Platform | Announced 2026-04-23. Endpoint remains `aiplatform.googleapis.com`. |
| Agent Runtime | Vertex AI Agent Engine | API resource is still `ReasoningEngine`. |
| Agent Studio | Vertex AI Studio | |
| Gemini Enterprise Agent Platform Model Garden | Vertex AI Model Garden | |
| Gemini Enterprise Agent Platform Evals | Gen AI evaluation service on Vertex AI | Some doc pages still use the old phrase. |
| Agent Search | Vertex AI Search | |
| Vector Search on Gemini Enterprise Agent Platform | Vertex AI Vector Search | |
| Agent Retrieval | Vertex AI Vector Search 2.0 | |
| RAG Engine on Gemini Enterprise Agent Platform | Vertex AI RAG Engine* | Google's rename table lists the same name on both sides. |
| Gemini Enterprise Agent Platform Memory Bank, Sessions, Code Execution | Vertex AI Agent Engine Memory Bank, Sessions, Code Execution | |
| Gemini Enterprise Agent Platform Inference, Endpoints, Pipelines | Vertex AI Inference, Endpoints, Pipelines | |
| Standard PayGo, Priority PayGo, Flex PayGo | Pay-as-you-go | Provisioned Throughput keeps its name. |
| Model Armor | None | Separate Google Cloud service, not renamed. |
| Agent Development Kit (ADK) | None | Open-source framework, name unchanged. |
| Agent Platform SDK for Python (`google-cloud-agentplatform`) | Agent surface of the `google-cloud-aiplatform` package | Version 2.0.1 released 2026-09-18 as a breaking change. |
| Agent Identity API (`agentidentity.googleapis.com`) | IAM Connectors API (`iamconnectors.googleapis.com`) | New API is in Preview. Both run side by side during migration. |

#### Hugging Face, OpenAI, Anthropic

| Current name (Sept 2026) | Former names | Notes |
|---|---|---|
| Inference Providers (Hugging Face) | None confirmed | Routing layer across third-party providers. |
| HF Inference (a provider within Inference Providers) | Inference API (serverless) | Now mostly CPU inference for smaller models. |
| Inference Endpoints (Hugging Face) | None | Dedicated deployments. Name unchanged. |
| vLLM or SGLang as serving engine | Text Generation Inference (TGI) | TGI in maintenance mode since 2025-12-11. |
| Responses API and Conversations API (OpenAI) | Assistants API | Shut down 2026-08-26. |
| Agents API, Agents SDK (OpenAI) | Agent Builder | Agent Builder shuts down 2026-11-30. Agents API is public beta since 2026-09-10. ChatKit remains. |
| GPT-6 Astra, GPT-6 Sol, GPT-6 Luna; GPT-5.6 Sol / Terra / Luna (OpenAI) | GPT-5, o3, GPT-4o, GPT-4.1 families | GPT-6 Astra released 2026-09-03. Older snapshots have shutdown dates through December 2026. |
| Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5, Claude Haiku 4.5 (Anthropic) | Claude Opus 4.1, Opus 4, Sonnet 4, Claude 3.x | The former models listed are retired on the Claude API. |
| Claude API, Claude Console | Anthropic API*, Anthropic Console* | Docs are at platform.claude.com. |
| Playground (Claude Console) | Workbench | Renamed 2026-08-18. Legacy Workbench access ended 2026-08-17. |
| Claude Agent SDK | Claude Code SDK | Confirmed in Anthropic's migration guide. Microsoft docs say "Anthropic Agent SDK". |

### Assurance angles per platform

These are Xyvionix operating insights drawn from the findings above. They are interpretation, not vendor statements.

#### Microsoft Foundry

- **The deployment name is not the model.** On Standard, Global Standard and Data Zone Standard, the model behind a deployment changes at retirement unless `versionUpgradeOption` says otherwise. Assurance must record the resolved model and version per deployment and re-run outcome tests when it changes.
- **Two opposite failure modes need different controls.** Pay-per-token deployments change silently. Provisioned and `NoAutoUpgrade` deployments stop with `410 Gone`. One needs drift detection, the other needs a migration deadline.
- **Residency is a property of the SKU.** A resource in West Europe with a Global Standard deployment processes anywhere. Continuous verification should check deployment SKU against the residency claim, and Azure Policy should enforce it.
- **The effective guardrail is the agent's, not the model's.** Because an agent guardrail fully overrides the model guardrail, a configuration review of model deployments gives false comfort. Test the agent endpoint with adversarial inputs.
- **Platform-initiated change is now normal.** Automatic upgrade of Azure OpenAI resources to Foundry resources, RBAC role renames and SDK retirements all change the control surface without a customer change ticket.
- **Capacity evidence expires daily.** PTU quota and reservations do not guarantee capacity, and spillover moves traffic to pay-per-token. Track utilisation, spillover rate and blended unit cost continuously.

#### Amazon Bedrock

- **Nothing upgrades itself, so the risk is a hard stop.** Bedrock states migration is never automatic. The assurance question is whether every model ID in use has a tested successor before its EOL date.
- **Read the model card, not a single policy.** Two lifecycle policies apply depending on launch date, with Legacy periods of 6 months or 45 days. A register must hold the rule per model.
- **Inactivity can remove access.** Legacy models may be lost after 15 days without use. Disaster recovery paths and seasonal workloads need a scheduled keep-alive or an earlier migration.
- **Residency is provable per request.** `additionalEventData.inferenceRegion` in CloudTrail records where each call ran. That turns a residency claim into continuous evidence rather than a design statement.
- **Agents Classic has a frozen model catalogue.** Every model retirement from now on shortens the life of agents built on it. Model lifecycle and agent platform migration must be planned together.
- **Cost evidence depends on served reality.** Resolved service tier, cache read and write tokens, and extended access pricing on Legacy models all change unit cost without any code change.

#### Google Cloud Gemini Enterprise Agent Platform

- **Brand and identifiers have diverged.** Logs, IAM roles and IaC still say `aiplatform` and `ReasoningEngine`. Evidence catalogues need a mapping layer so auditors can follow a control from policy name to API name.
- **Short-term availability models carry a 45-day horizon.** Three Flash releases appeared between July and September 2026. Workloads on these models need a standing, automated regression suite.
- **Recommended replacements can cross tiers.** The listed successor for `gemini-2.5-pro` is a Flash model. Quality, latency and cost must all be re-proven, not assumed equivalent.
- **The hostname decides residency.** Global, regional and multi-region endpoints give different processing guarantees. Verify the endpoint each client actually calls, and block the global endpoint by organisation policy where required.
- **RAG Engine sits outside the residency commitment.** A compliant model call does not make the retrieval path compliant. Assess each layer separately.
- **Embedding retirement is a data migration.** The 2027-04-01 retirement of several embedding models forces re-indexing. Retrieval quality needs a before and after baseline.

#### Hugging Face and self-hosted open-weight models

- **You own the whole change surface.** Model revision, serving engine version, quantisation and engine flags all alter output. Pin each one and treat any change as a release that needs evidence.
- **vLLM ships about every two weeks.** Staying current is a security need, so regression testing of throughput, latency and output quality has to be automated.
- **Unpinned routing invalidates evidence.** Inference Providers picks the fastest provider by default. Tests against one provider say little about another.
- **Licence is per model and per version.** Gemma moved to Apache 2.0 at version 4, while several flagship models from other vendors carry new custom licences. Licence review belongs in model intake and in every upgrade.
- **TGI estates have a forced migration.** Maintenance mode plus the inability to swap engines in place means a new endpoint and a cutover, with parity evidence.

#### OpenAI and Anthropic direct APIs

- **The same model has several expiry dates.** Claude Sonnet 4 retired on the Claude API in June 2026 but runs on Bedrock until October 2026. A multi-provider register must track model by platform.
- **Pinned does not mean frozen.** Anthropic documents that serving infrastructure changes can alter behaviour under a fixed model ID. Continuous output monitoring is needed even with pinned versions.
- **Upgrades can break requests and budgets.** Removed sampling parameters return errors on newer Claude models, and the newer tokenizer raises token counts for the same text.
- **Vendor tooling retires too.** OpenAI is shutting down its Evals platform, Agent Builder and reusable prompts in November 2026. Evaluation datasets, graders and prompts should be held in portable form.
- **Fine-tuned models are a dead end on retirement.** OpenAI is closing self-serve fine-tuning, so a tuned model cannot be rebuilt on a successor. Plan the replacement approach before the base model's shutdown date.
- **Stateful agent services change the data position.** Managed agent sessions and stored conversations fall outside zero data retention on both providers.

### Could not verify

Research method limits: the web search budget for the session was exhausted, so the second pass on 2026-09-27 read vendor pages directly by URL. Items confirmed in that pass were moved into the sections above. Items below remain open.

#### Former names not confirmed on a vendor page (marked * in the terminology table)

- "Azure AI model catalog", "Azure AI Agent Service", "Azure AI Foundry Agent Service" as former names for Foundry Models and Foundry Agent Service. The classic agent docs page was read and does not state a former name.
- "Knowledge bases for Amazon Bedrock", "Guardrails for Amazon Bedrock", "Model evaluation on Amazon Bedrock" as former AWS names. The Bedrock document history was searched and records no such renames.
- The date on which "Amazon Quick Suite" became "Amazon Quick". The docs path redirect confirms the change, but no announcement was found.
- "Vertex AI RAG Engine" as a former name. Google's rename table lists "RAG Engine on Gemini Enterprise Agent Platform" on both sides.
- "Anthropic API" and "Anthropic Console" as former names.

#### Microsoft

- Microsoft Foundry pricing structure beyond what is cited. Per-model prices and PTU hourly rates were not read.
- Whether the Assistants API sunset and the `azure-ai-inference` retirement on 2026-08-26 took effect as scheduled. Docs updated 2026-09-14 still phrase both in the present tense.
- Foundry Local details. Foundry Control Plane and Foundry IQ are confirmed as Preview only.
- Exact GA or preview status of Foundry tracing and the agent monitoring dashboard. The overview says some observability capabilities are in preview.
- The exact date Microsoft Entra Agent ID reached general availability. The what's new page (ms.date 2026-05-01) states it is GA but gives no date.
- Whether Claude Sonnet 5 is selectable in Copilot Studio. The what's new page lists it as GA in June 2026, but the standard harness model table does not show it.

#### AWS

- AWS doc pages carry no "last updated" date. Dates shown are retrieval dates or policy effective dates.
- Which models the Reserved service tier supports. The Provisioned Throughput list is confirmed to stop at older models.
- Current status of Amazon Nova 2 Pro and Nova 2 Omni. Neither appears in the Bedrock model cards index. Nova Act and Nova Forge details were not researched.
- The date OpenAI models became generally available on Bedrock. Docs list them as GA; a May 2026 AWS blog described limited preview.
- Cohere Command R and Command R+ still appear in the "pending EOL" table although their EOL date of 2026-08-19 has passed. Actual availability was not tested.
- SageMaker AI inference endpoint options and any lifecycle policy for JumpStart models.
- Amazon Bedrock Flows and Prompt management status after the Agents Classic change.

#### Google Cloud

- A search summary gave 2026-10-16 as the Gemini 2.5 retirement date. The model versions page, read directly, says 2026-10-20. The file uses 2026-10-20. No release note recording the change was found.
- Behaviour of auto-updated aliases (for example `-latest`) on Agent Platform. Not described on the pages read.
- GA or preview status of Agent Studio, Agent Runtime, Agent Simulation, Agent Evaluation, Agent Optimizer, Agent Anomaly Detection and Agent Threat Detection. Release notes confirm status only for the components listed in the Google Cloud section.
- Status of Gemini Pro-tier text models after 2.5. Release notes mention "Gemini 3.1 Pro Preview" and "Gemini 3.5 Pro and later models", but neither appears in the GA list or the lifecycle tables.
- Agent Development Kit version numbers.
- Provisioned Throughput pricing, GSU burndown rates and the supported model list.
- Model Armor pricing and floor settings detail.

#### Hugging Face and open-weight models

- Licence text for models tagged `other` (Mistral Medium 3.5, Devstral 2, Qwen3.8 large models, Kimi K3, GLM-5.3). Only the metadata tag was read, not the licence terms.
- Whether Meta has released a Llama family newer than Llama 4. None was found in the `meta-llama` organisation.
- Phi family beyond Phi-4. No Phi-5 repository was seen.
- Inference Endpoints cloud and region list, autoscaling limits and current hourly prices.
- Data handling terms of each Inference Providers partner.
- vLLM release contents. Only version numbers and dates were read.

#### OpenAI and Anthropic

- OpenAI enterprise controls beyond the "your data" guide, including regional pricing uplift and the scope of each residency region. The page was read through a summary.
- OpenAI retirement policy for GPT-6 models. No shutdown dates are published for them yet.
- AgentKit, Connector Registry and Guardrails as current OpenAI product names.
- Whether Claude Managed Agents has left beta. The overview page metadata says beta.
- Anthropic rate limit and Priority Tier structure, and any EU inference option on partner platforms.

#### General

- Model names and dates in this file reflect vendor pages on 2026-09-27. Lifecycle tables change weekly, so every date should be re-read from the cited URL before publication.

## Production reliability, cloud and SRE

Source file: `docs/research/07-reliability-cloud-sre.md`

Research date: 2026-09-27. Primary sources only; anything not confirmed from an authoritative source is listed under "Could not verify".

### 1. Kubernetes upstream

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Upstream supported minors are 1.37 (latest patch 1.37.0, released 2026-08-26, EOL 2027-10-28), 1.36 (1.36.4, EOL 2027-06-28) and 1.35 (1.35.8, EOL 2027-02-28). 1.34 and older are end of life upstream. 1.38 is in development. | https://kubernetes.io/releases/ | Checked 2026-09-27 | "Supported version" is a dated fact. A cluster proven in-support in spring is out of upstream support by winter without any change being made. | kubernetes-reliability-assurance, kubernetes-upgrade-risk |
| Project maintains release branches for the most recent three minors; 1.19 and newer receive approximately 1 year of patch support. Minor releases land roughly every four months (three per year). | https://kubernetes.io/releases/ | Checked 2026-09-27 | Three forced upgrade decisions per year per cluster. Upgrade readiness evidence has a shelf life of about four months. | kubernetes-upgrade-risk, kubernetes-reliability-assurance |
| v1.37 "Garhwal" released 2026-08-26: 67 enhancements (16 stable, 23 beta, 27 alpha, 1 deprecation/removal). Notable: HPA scale-to-zero beta, Memory QoS beta, Storage Version Migration on by default, Metrics API stable, rootless kubelet beta, scheduler preemption for in-place resize (alpha). | https://kubernetes.io/blog/2026/08/26/kubernetes-v1-37-release/ | 2026-08-26 | Beta features enabled by default change runtime behaviour on upgrade even when no manifest changes. Behaviour must be re-proven after each minor. | kubernetes-upgrade-risk, kubernetes-reliability-assurance |
| v1.37 deprecates the `--filename` / `-f` flag of `kubectl run` (named in the official sneak peek). | https://kubernetes.io/blog/2026/07/31/kubernetes-v1-37-sneak-peek/ | 2026-07-31 | Low blast radius, but it breaks scripts and pipelines rather than workloads: the failure shows up in tooling, not in the cluster. | kubernetes-upgrade-risk, change-assurance |
| v1.36 "Haru" released 2026-04-22: 70 enhancements (18 stable, 25 beta, 25 alpha). User Namespaces GA, fine-grained kubelet API authorization GA, PSI metrics GA, Volume Group Snapshots GA, in-place vertical scaling of pod-level resources beta. | https://kubernetes.io/blog/2026/04/22/kubernetes-v1-36-release/ | 2026-04-22 | Baseline for most managed fleets in Sept 2026 (EKS and AKS latest GA is 1.36). | kubernetes-reliability-assurance, eks-reliability-assurance, aks-reliability-assurance |
| v1.36 formally deprecates Service `.spec.externalIPs` (deprecation warnings from 1.36; full removal planned for v1.43; linked to CVE-2020-8554). | https://kubernetes.io/blog/2026/05/14/kubernetes-v1-36-deprecation-and-removal-of-service-externalips/ | 2026-05-14 | A long-dated removal. Evidence of "no usage" must be re-checked continuously because new Services can reintroduce it. | kubernetes-upgrade-risk |
| v1.36 closes the `gitRepo` in-tree volume path: workloads depending on it must move to init containers or git-sync style tooling. | https://kubernetes.io/blog/2026/03/30/kubernetes-v1-36-sneak-peek/ | 2026-03-30 | Pods that ran for years fail to start after upgrade. Found only by inventory, not by API-version scanners. | kubernetes-upgrade-risk |
| containerd 1.x: v1.35 was the final Kubernetes release supporting containerd 1.7 and other 1.x LTS releases; support is dropped in v1.36.0. Nodes must run containerd 2.x. | https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/ | 2025-11-26 | Runtime version is a node-image property, not a manifest property. Upgrade readiness must include node image evidence. | kubernetes-upgrade-risk, eks-reliability-assurance, aks-reliability-assurance |
| cgroup v1: since v1.35 the kubelet setting `failCgroupV1` defaults to true, so the kubelet does not start on a cgroup v1 node unless explicitly overridden. cgroup v1 had been in maintenance mode since v1.31; KEP-5573 tracks removal. | https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/5573-remove-cgroup-v1/README.md | KEP, checked 2026-09-27 | Hard failure at node start on older OS images (for example RHEL 8 era kernels). Assurance must cover OS and kernel, not only Kubernetes objects. | kubernetes-upgrade-risk, kubernetes-reliability-assurance |
| kube-proxy `ipvs` mode deprecated in v1.35: kube-proxy emits a warning on startup; recommended Linux mode is `nftables`. | https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/ | 2025-11-26 | Data-plane mode change alters service routing behaviour under load; needs performance re-proof, not only functional tests. | kubernetes-upgrade-risk |
| In-place Pod resize (in-place vertical scaling of CPU and memory without recreating the Pod) graduated to stable in v1.35. | https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/ | 2025-12-19 | Running pods can now diverge from their declared spec in Git. Right-sizing evidence and drift detection must read live allocation, not the manifest. | kubernetes-reliability-assurance, cloud-configuration-drift |
| Ingress NGINX (kubernetes/ingress-nginx) retirement announced 2025-11-11 by SIG Network and the Security Response Committee: best-effort maintenance until March 2026, then no releases, bug fixes or security updates. Existing deployments keep working and artifacts stay available. Recommended path: Gateway API or another ingress controller. | https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ | 2025-11-11 | The component still works, so nothing alerts. Any cluster still running it in Sept 2026 runs an unpatched internet-facing proxy. | kubernetes-upgrade-risk, kubernetes-reliability-assurance, production-reliability-assurance |
| Steering Committee and Security Response Committee statement on Ingress NGINX (2026-01-29) warned that staying on it after retirement leaves users vulnerable to attack. | https://kubernetes.io/blog/2026/01/29/ingress-nginx-statement/ | 2026-01-29 | Retirement is a governance event with a date: a control that passed before March 2026 fails after it with no configuration change. | kubernetes-upgrade-risk |
| Gateway API v1.6 (announced on the Kubernetes blog 2026-08-03): TCPRoute and UDPRoute graduate to the Standard channel, extending standard coverage from L7 (HTTP, TLS) to L4. Gateway API v1.4 was announced 2025-11-06. | https://kubernetes.io/blog/2026/08/03/gateway-api-v1-6-release/ | 2026-08-03 | Gateway API is the named successor to Ingress. Migration is a traffic-path change that needs before and after proof of routing, TLS and timeouts. | kubernetes-upgrade-risk, change-assurance |
| Removed APIs listed in the official migration guide: `flowcontrol.apiserver.k8s.io/v1beta3` removed in v1.32; `v1beta2` removed in v1.29. No further GA-blocking API group removals are listed for 1.33 to 1.37 in the guide. | https://kubernetes.io/docs/reference/using-api/deprecation-guide/ | Checked 2026-09-27 | Recent upgrade breakage has shifted from API removals to runtime, OS, networking mode and retired add-ons. API scanners alone give false comfort. | kubernetes-upgrade-risk |
| Version skew: kubelet may be up to three minor versions older than the API server (cited by both EKS and AKS docs). | https://kubernetes.io/releases/version-skew-policy/ | Checked 2026-09-27 | Control plane and nodes can legitimately differ, so "cluster version" is not one number. Skew must be measured per node pool. | kubernetes-reliability-assurance, kubernetes-upgrade-risk |

### 2. Managed Kubernetes (EKS, AKS, GKE)

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| **EKS versions.** Standard support: 1.36, 1.35, 1.34. Extended support: 1.33, 1.32, 1.31. 1.37 is not yet listed on EKS. End of standard support: 1.34 on 2026-12-02, 1.35 on 2027-03-27, 1.36 on 2027-08-02. End of extended support: 1.31 on 2026-11-26, 1.32 on 2027-03-23, 1.33 on 2027-07-29. | https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html | Checked 2026-09-27 | Two near-term cliffs: 1.31 clusters are force-upgraded after 2026-11-26; 1.34 clusters start paying extended support from 2026-12-02. | eks-reliability-assurance, kubernetes-upgrade-risk, aws-production-reliability |
| EKS lifecycle: 14 months standard support plus 12 months extended support (26 months total). Extended support is enabled by default (upgrade policy `EXTENDED`). At end of extended support the control plane is auto-upgraded to the oldest supported version, at any time after the date and without prior notification; nodes and add-ons are not upgraded. | https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html | Checked 2026-09-27 | An unplanned, unannounced control-plane change is a production change event. Assurance must show it cannot happen by surprise. | eks-reliability-assurance, change-assurance, kubernetes-upgrade-risk |
| EKS pricing: $0.10 per cluster per hour in standard support; $0.60 per cluster per hour in extended support (six times). Provisioned Control Plane tiers listed from XL ($1.65/h) to 8XL ($13.90/h). | https://aws.amazon.com/eks/pricing/ | Checked 2026-09-27 | Upgrade delay has a published price. Cost and reliability risk rise together, which makes version currency a board-readable measure. | eks-reliability-assurance, kubernetes-upgrade-risk |
| EKS version rollback: control plane can be rolled back one minor version (N to N-1) within 7 days of an in-place upgrade. Not rolled back: add-ons, managed node groups, self-managed and hybrid nodes, etcd data. Blocked if an incompatible EKS feature was enabled. Rollback readiness insights are point-in-time and exist only during the 7-day window. | https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html | Checked 2026-09-27 | Rollback is a capability with an expiry (7 days) and preconditions. Rollback readiness must be proven before the upgrade, and again before the window closes. | rollback-readiness-assurance, eks-reliability-assurance, kubernetes-upgrade-risk |
| EKS cluster insights (upgrade, configuration, rollback readiness) refresh every 24 hours or on demand. AWS temporarily rolled back enforcement that required `--force` to upgrade when certain insights failed. Rollback insights cover only EKS-managed add-ons, not self-managed ones. | https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html | Checked 2026-09-27 | Vendor checks are advisory, daily and partial. They do not cover self-managed add-ons, admission webhooks or workload behaviour. | eks-reliability-assurance, kubernetes-upgrade-risk |
| EKS Auto Mode: AWS manages compute autoscaling (Karpenter-based), pod and service networking, load balancing, cluster DNS, block storage and GPU support. Nodes use Bottlerocket-based immutable AMIs, no SSH or SSM, and a maximum node lifetime of 21 days (reducible). Blocking PDBs can require intervention. From 2026-04-22 new managed instances are hidden by default from EC2 console and list APIs. | https://docs.aws.amazon.com/eks/latest/userguide/automode.html | Checked 2026-09-27 | Every node is replaced at least every 21 days, so disruption tolerance (PDBs, graceful shutdown, startup time) is exercised continuously. Hidden instances change what inventory tools see. | eks-reliability-assurance, kubernetes-reliability-assurance, cloud-configuration-drift |
| EKS zonal shift and zonal autoshift (Amazon Application Recovery Controller): cordons nodes in the impaired AZ and removes their pod endpoints from EndpointSlices; nodes are not terminated and pods are not evicted. AWS states workloads must be pre-scaled to run with one AZ fewer, and that starting a shift without enough replicas can itself cause impact. Self-managed Karpenter requires version 1.12 or greater. Not supported on Fargate. | https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html | Checked 2026-09-27 | Enabling autoshift is not proof of AZ resilience. The proof is N-1 AZ capacity and spread, which change with every deployment and scaling decision. | eks-reliability-assurance, aws-production-reliability, disaster-recovery-assurance |
| **AKS versions.** Community support covers N-2. Calendar: 1.34 GA Nov 2025, EOL Nov 2026; 1.35 GA Mar 2026, EOL Mar 2027; 1.36 GA Jun 2026, EOL Jun 2027; 1.37 in preview Sep 2026 with GA planned Oct 2026, EOL Oct 2027. 1.33 reached end of life Jul 2026. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | 1.34 on AKS leaves community support within about two months of this research. | aks-reliability-assurance, kubernetes-upgrade-risk, azure-production-reliability |
| AKS policy: 12 months of support per GA version; platform support (N-3) covers Azure platform issues only, with no Kubernetes patches and no cluster creation. AKS auto-upgrades clusters about to fall to N-4 up to N-2. 30 days' notice before version removal. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | "Supported" has three grades on AKS (community, platform, LTS). Reporting must state which grade, not a yes or no. | aks-reliability-assurance, kubernetes-upgrade-risk |
| AKS Long-Term Support: one additional year after community support (about 24 months total). Requires Premium tier and the `AKSLongTermSupport` plan. All supported versions are LTS eligible. Only the two most recent patch versions are supported in LTS. Add-ons have separate lifecycles (for example OSM add-on support ends 2027-09-30; Entra pod-managed identity ended Sept 2025). | https://learn.microsoft.com/en-us/azure/aks/long-term-support | 2026-08-05 | LTS extends the Kubernetes version only. Add-on and OS lifecycles keep moving underneath, so an LTS cluster can still hold unsupported components. | aks-reliability-assurance, kubernetes-upgrade-risk |
| AKS upgrade rules: supported non-LTS clusters must upgrade one minor at a time; LTS to higher LTS can skip minors. Downgrade or rollback to an unsupported version is not supported. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | Falling behind multiplies the number of sequential upgrades and therefore change events. | aks-reliability-assurance, rollback-readiness-assurance |
| AKS auto-upgrade channels: `none` (default on Standard), `patch`, `stable` (latest patch on N-1), `rapid` (latest minor), `node-image` (legacy, planned for deprecation; use the `NodeImage` node OS channel). Maintenance window of four hours or more recommended. Channel changes take up to 24 hours to apply. | https://learn.microsoft.com/en-us/azure/aks/auto-upgrade-cluster | 2026-06-26 | Default `none` means version currency depends on a human. Channel plus maintenance window is the control to verify. | aks-reliability-assurance, change-assurance |
| AKS Automatic: node auto-provisioning preconfigured, `stable` upgrade channel fixed, `NodeImage` OS channel, Azure Linux system node pools, deployment safeguards in enforce mode, upgrades stopped on detected deprecated API usage. SLA: 99.95% API server uptime and a pod readiness SLA (99.9% of qualifying pod readiness operations complete within 5 minutes). From AKS 1.36 new Automatic clusters default to Gateway API via the application routing add-on. | https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic | 2026-07-07 | Managed defaults reduce operator error but move change timing to the provider. The pod readiness SLA is a measurable threshold customers can verify independently. | aks-reliability-assurance, kubernetes-reliability-assurance |
| AKS node auto-provisioning (NAP) deploys and manages Karpenter using the AKS Karpenter provider. Not supported: Windows node pools, IPv6 clusters, service principals, stopping the cluster. | https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning | 2026-02-15 (updated 2026-07-15) | Autoscaler choice changes failure modes (VM SKU availability, quota). Capacity evidence must reflect the provisioner actually in use. | aks-reliability-assurance |
| Azure Linux 2.0 on AKS: no support or security updates since 2025-11-30; node images are removed from 2026-10-31, after which affected node pools cannot scale. Migrate to Azure Linux 3.0. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | A dated capacity failure: after 2026-10-31 scale-out fails on affected pools. It will first appear during a load spike or an incident. | aks-reliability-assurance, azure-production-reliability, kubernetes-upgrade-risk |
| **GKE release channels:** Rapid (not covered by the GKE SLA), Regular (default), Stable, Extended. Standard support is 14 months per minor; Extended channel gives up to about 24 months in total, with pay-per-use cost during the extended period. At end of support GKE auto-upgrades clusters regardless of blocking issues. | https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels | 2026-09-24 | Forced upgrade at end of support ignores blockers. Assurance must surface blockers long before the date. | gcp-production-reliability, kubernetes-upgrade-risk, kubernetes-reliability-assurance |
| GKE schedule: 1.37 in Rapid since 2026-09-02, Regular planned 2026-09-30; 1.36 Regular since 2026-06-09, Stable planned 2026-10-06. End of standard support: 1.33 on 2026-08-12 (passed), 1.34 on 2027-01-25, 1.35 on 2027-04-11, 1.36 on 2027-08-09. Dates are best-effort. | https://docs.cloud.google.com/kubernetes-engine/docs/release-schedule | 2026-09-24 | Provider dates move. A plan built on last quarter's schedule can be wrong today. | gcp-production-reliability, kubernetes-upgrade-risk |
| GKE maintenance exclusions: "no upgrades" scope cannot exceed 90 days (Google recommends under 30); "no minor upgrades" and "no minor or node upgrades" can run to the end of support of the minor version. Up to 20 exclusions per cluster. | https://docs.cloud.google.com/kubernetes-engine/docs/concepts/maintenance-windows-and-exclusions | 2026-09-24 | Exclusions defer risk, they do not remove it. An exclusion that expires during a freeze period produces an upgrade at the worst time. | gcp-production-reliability, change-assurance |
| GKE Autopilot: Google manages nodes, scaling, security patching and bin-packing; SLA covers the control plane and the compute capacity used by Pods. Autopilot-mode workloads can run inside Standard clusters. Container-optimized compute platform available from GKE 1.32.3. | https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview | 2026-09-24 | Provider-managed nodes still restart customer pods. Workload disruption tolerance remains the customer's evidence to hold. | gcp-production-reliability, kubernetes-reliability-assurance |

### 3. AWS reliability

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| AWS Well-Architected Framework has six pillars. The Reliability Pillar's current publication date is 2024-11-06 (updates to REL 1, 2, 4, 6, 7, 8, 10, 12, 13; REL10-BP02 and REL12-BP03 merged into other practices). Best-practice areas: foundations, workload architecture, change management, failure management. | https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html | 2024-11-06 | A Well-Architected review is a point-in-time assessment against guidance that is itself revised. Findings age as both workload and guidance move. | aws-production-reliability, production-reliability-assurance |
| AWS Resilience Hub: define resiliency policies with RTO and RPO targets for application, infrastructure, Availability Zone and Region disruptions; assessments estimate whether the workload meets them; imports from CloudFormation stacks, Terraform state files, Resource Groups, EKS clusters and myApplications; can create and run AWS FIS experiments. | https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html | Checked 2026-09-27 | Estimated RTO and RPO are modelled, not measured. The assurance gap is the difference between an estimate from configuration and a timed recovery. | aws-production-reliability, disaster-recovery-assurance, untested-disaster-recovery |
| AWS Fault Injection Service (FIS): managed fault injection with experiment templates (actions, targets, stop conditions). Stop conditions are CloudWatch alarms. AWS warns that FIS performs real actions on real resources. Priced per action-minute. | https://docs.aws.amazon.com/fis/latest/userguide/what-is.html | Checked 2026-09-27 | An experiment result is valid for the architecture as it was on the day it ran. The date of the last passing experiment is a measurable freshness indicator. | aws-production-reliability, production-reliability-assurance |
| Amazon Application Recovery Controller (ARC): multi-AZ recovery (zonal shift, zonal autoshift) and multi-Region recovery (Region switch, routing control, readiness check). Manual zonal shifts are temporary with an extendable expiry of up to three days. Readiness check is "not intended to be used in the critical path for failover". | https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html | Checked 2026-09-27 | Name is "Amazon Application Recovery Controller (ARC)"; the older "Route 53 Application Recovery Controller" name survives only in URLs. Region switch plans need rehearsal to count as evidence. | aws-production-reliability, disaster-recovery-assurance |
| AWS DR strategies (whitepaper): backup and restore, pilot light, warm standby, multi-site active/active. AWS advises using data-plane operations only during failover because control planes have lower availability design goals, and warns that auto scaling during recovery is a control-plane dependency. It also says to make sure service quotas in the DR Region are high enough. | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html | Checked 2026-09-27 | Three silent DR failures to re-prove: control-plane dependency in the runbook, DR Region quota below production need, and DR Region infrastructure drifted from primary. | disaster-recovery-assurance, untested-disaster-recovery, aws-production-reliability |
| AWS Backup restore testing: scheduled, automated restore jobs on selected or random recovery points, records restore duration, optional validation window of 1 to 168 hours, restored resources then deleted. Integrates with AWS Backup Audit Manager control "restore time for resources meet target". | https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html | Checked 2026-09-27 | A successful backup job is not a recoverable backup. Restore duration measured on schedule is direct RTO evidence at the data layer only, not the application. | disaster-recovery-assurance, untested-disaster-recovery, aws-production-reliability |
| AWS Backup logically air-gapped vault: specialised vault with AWS Backup Vault Lock in compliance mode, encrypted with an AWS owned key by default or a customer-managed KMS key, and shareable with other accounts to speed recovery. | https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html | Checked 2026-09-27 | Ransomware resilience depends on immutability settings that can be weakened by later configuration. Settings and restore path both need recurring proof. | disaster-recovery-assurance, aws-production-reliability |
| AWS Elastic Disaster Recovery (DRS) continuously replicates server-hosted applications and databases using block-level replication; it implements a pilot light strategy with a staging area VPC. Usable for EC2-hosted workloads, not RDS. | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html | Checked 2026-09-27 | Replication lag and launch settings drift over time. Recovery drills are the only evidence that launch templates still produce a working server. | disaster-recovery-assurance, aws-production-reliability |
| **Incident, US-EAST-1, 19 to 20 October 2025.** AWS post-event summary: a latent race condition in the DynamoDB DNS management system (two DNS Enactors acting concurrently) led to the regional endpoint's DNS record being emptied. DynamoDB DNS failures began 11:48 PM PDT 19 Oct; DNS restored 2:25 AM 20 Oct. EC2 instance launches were impaired until 1:50 PM and Network Load Balancer health checks were affected 5:30 AM to 2:09 PM. Lambda, ECS, EKS, Fargate, Connect, STS and Redshift were also impacted. AWS disabled the DynamoDB DNS automation worldwide pending fixes. | https://aws.amazon.com/message/101925/ | October 2025 | The initial fault lasted under three hours; dependent recovery took most of the day. Evidence of resilience must cover regional control-plane dependencies (launching instances, scaling) and not only the data path. | aws-production-reliability, cloud-incident-recurrence, incident-recurrence-assurance, saas-production-reliability |
| AWS's post-event summary index lists the October 2025 DynamoDB event as the most recent entry; no 2026 summary is listed as of this research. | https://aws.amazon.com/premiumsupport/technology/pes/ | Checked 2026-09-27 | AWS publishes summaries only for events of broad impact. Absence of a summary is not absence of incidents; customers need their own impact record. | aws-production-reliability, cloud-incident-recurrence |

### 4. Azure reliability

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Azure Well-Architected Framework reliability design principles: design for business requirements, design for resilience, design for recovery, design for operations, keep it simple. Guidance prefers reliability outcomes per critical user flow over generic uptime, and calls for tested, documented recovery plans and regular recovery drills. | https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles | 2025-09-30 (updated 2026-03-17) | Microsoft's own framing is flow-level outcomes and tested recovery, which matches an outcome-based assurance model. | azure-production-reliability, production-reliability-assurance, slo-assurance |
| Availability zones: zone-redundant resources are spread or replicated across zones by the service with Microsoft-managed failover; zonal resources are pinned to one zone chosen by the customer and are not resilient to a zone outage on their own. Some services are zone-redundant automatically, others require configuration. | https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview | Checked 2026-09-27 | Zone resilience is a per-resource property. One zonal dependency in a zone-redundant design voids the claim. Must be checked per resource, continuously. | azure-production-reliability, cloud-configuration-drift |
| Azure Site Recovery provides continuous replication, failover and recovery for virtual machines, for planned and unplanned disruptions. | https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview | Checked 2026-09-27 | Replication health is not failover success. Test failover date and measured recovery time are the evidence. | azure-production-reliability, disaster-recovery-assurance, untested-disaster-recovery |
| Azure Business Continuity Center has been renamed "Resiliency" in Azure, covering zone resilience and high availability, backup and disaster recovery, and ransomware protection. Backup center has been removed from Azure portal global search and remains reachable from the Help menu. | https://learn.microsoft.com/en-us/azure/backup/backup-center-overview | Checked 2026-09-27 | Naming change matters for content accuracy: refer to "Resiliency in Azure (formerly Azure Business Continuity Center)". | azure-production-reliability, disaster-recovery-assurance |
| Azure Chaos Studio: managed chaos engineering service. Chaos Studio Workspaces and Scenarios (for example Compute Zone Down, DNS Outage) are in public preview and "not meant for production use"; Microsoft's blog targets general availability for late 2026, subject to change. | https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-scenarios | Checked 2026-09-27 | Do not describe Workspaces or Scenarios as generally available. Classic experiments remain the GA path. | azure-production-reliability, production-reliability-assurance |
| **Incident, Azure Front Door, 29 to 30 October 2025 (Tracking ID YKYN-BWZ).** 15:41 UTC 29 Oct to 00:05 UTC 30 Oct. Microsoft PIR: a specific sequence of customer configuration changes across two control-plane build versions produced incompatible configuration metadata that triggered a latent data-plane bug and propagated globally. Affected Azure Front Door, CDN, Azure portal, Microsoft 365, Entra ID and others. Repairs include synchronous configuration processing, a pre-canary stage with extended bake time and faster data-plane recovery. | https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ | PIR, 2025 | A global edge service is a single point of failure that zones and regions do not mitigate. Customers need proof of an alternate ingress path, tested. | azure-production-reliability, cloud-incident-recurrence, change-assurance, saas-production-reliability |
| **Incident, 2 to 3 February 2026 (Tracking ID FNJ8-VQZ).** 18:03 UTC 2 Feb to 06:05 UTC 3 Feb, multiple regions. Microsoft PIR: a remediation workflow incorrectly disabled anonymous access on storage accounts that intentionally allow anonymous read for platform functionality, blocking VM extension retrieval; on restoration, retry amplification overwhelmed the managed identity backend. Impacted Virtual Machines, VMSS, AKS, Azure DevOps, GitHub Actions, Managed Identities. | https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ | PIR, 2026 | An automated policy remediation caused the outage. Automated corrective action needs its own blast-radius proof. Identity is a shared dependency for scaling and deployment. | azure-production-reliability, aks-reliability-assurance, cloud-incident-recurrence, change-assurance |
| **Incident, West US 2, 29 to 30 May 2026 (Tracking ID GHRP-84G).** 04:24 UTC 29 May to 02:30 UTC 30 May. Microsoft PIR: a severe thunderstorm caused utility power disturbances; cooling components entered protective lockout, triggering infrastructure shutdowns in two physical availability zones (AZ-01 and AZ-03). Compute recovery took about 8 hours and storage validation about 14 hours. | https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G | PIR, 2026 | Two of three zones were affected at once. A design proven against single-zone loss was not proven against this event; regional failover evidence still matters. | azure-production-reliability, disaster-recovery-assurance, cloud-incident-recurrence |
| **Incident, West US, 23 July 2026 (Tracking ID ZJV6-SGG).** 14:44 to 19:41 UTC (4 h 57 min). Microsoft PIR: during optical device break-fix maintenance a defect in the blast radius analysis system expanded the repair scope to all optical devices egressing a datacenter; safety checks validated each device individually rather than the aggregate effect. More than 20 services affected including AKS, App Service and Cosmos DB. | https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG | PIR, 2026 | The pattern (per-item validation passes, aggregate change fails) applies equally to customer change pipelines. | azure-production-reliability, change-assurance, cloud-incident-recurrence |

### 5. Google Cloud reliability

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| The framework is named "Google Cloud Well-Architected Framework" (formerly Architecture Framework). Reliability pillar principles: define reliability based on user-experience goals; set realistic targets; build high availability through redundancy; use horizontal scalability; detect potential failures with observability; design for graceful degradation; test recovery from failures; test recovery from data loss; conduct thorough postmortems. | https://docs.cloud.google.com/architecture/framework/reliability | Last reviewed 2024-12-30 | Two of nine principles are explicit recovery tests. Google frames reliability by user experience, consistent with SLO-based assurance. | gcp-production-reliability, production-reliability-assurance, slo-assurance |
| Google Cloud documentation has moved from cloud.google.com/... to docs.cloud.google.com/... (301 redirects observed). | https://docs.cloud.google.com/kubernetes-engine/docs/release-schedule | Checked 2026-09-27 | Use the new host for citations and outbound links. | gcp-production-reliability |
| Backup and DR Service: managed, centralised backup with backup vaults described as Google-managed, isolated storage for immutable and indelible backups, with enforced retention up to 99 years. Covers Compute Engine, Persistent Disk, Cloud SQL, AlloyDB, self-managed databases (Oracle, SQL Server, SAP HANA, MySQL, PostgreSQL), Filestore and VMware Engine VMs. | https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr | 2026-09-24 | Immutability protects the copy, not the recovery. Restore time and application consistency still need timed proof. | gcp-production-reliability, disaster-recovery-assurance |
| **Incident, 12 June 2025 (global).** 10:49 to 13:49 PDT, about 3 hours. Google incident report: a Service Control change shipped 29 May 2025 added quota policy checks without appropriate error handling and without feature-flag protection; a policy change with unintended blank fields on 12 June replicated globally and caused a null pointer crash. Google Cloud and Google Workspace products were affected. Google stated "This incident should not have happened" and committed to fail-open design, feature flags for critical binaries and incremental validation of replicated data. | https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW | June 2025 | Dormant code activated by data, not by a deployment. Change assurance must cover configuration and policy data changes, not only code releases. | gcp-production-reliability, change-assurance, cloud-incident-recurrence, release-assurance |
| **Incident, us-west1, 20 August 2026.** 08:00 to 10:22 PDT (2 h 22 min). Google: scheduled fibre optic maintenance unexpectedly compromised network capacity between data centres and automated rerouting did not redistribute traffic properly. Multiple products affected including GKE, Compute Engine, Cloud Run, Pub/Sub. | https://status.cloud.google.com/incidents/utF3FMFdQfwBzJcGG6vf | August 2026 | A whole region degraded from planned provider maintenance. Multi-zone design within one region did not help. | gcp-production-reliability, cloud-incident-recurrence, disaster-recovery-assurance |
| **Incident, us-central1-b, 1 September 2026.** 07:41 to 11:52 US/Pacific. Google: during a scheduled router upgrade, a procedural error in a manually orchestrated process issued transceiver replacements without sequencing; all fibre paths on the affected devices were unplugged within 13 minutes, isolating compute capacity. Affected Compute Engine, Cloud Run, BigQuery, Cloud SQL, Spanner and others. | https://status.cloud.google.com/incidents/J5ia5t9p3g9Q5Wi7r8Ev | September 2026 | Zonal failure with a human procedural cause. Workloads pinned to one zone had no recourse; zonal spread must be verified per workload. | gcp-production-reliability, cloud-incident-recurrence, kubernetes-reliability-assurance |
| Other 2026 entries on the Google Cloud status summary: cooling failure in europe-west4-a on 15 July 2026 affecting VMware Engine, NetApp Volumes and Bare Metal Solution; network latency and packet loss for traffic from Delhi, Chennai and Mumbai from 5 June 2026 lasting more than 21 days. | https://status.cloud.google.com/summary | Checked 2026-09-27 | Long-duration degradations (weeks) consume error budget slowly and often fall below paging thresholds. | gcp-production-reliability, slo-assurance, cloud-incident-recurrence |

### 6. Infrastructure as code and drift

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Terraform latest stable is v1.16.4 (2026-09-23). v1.16.0 shipped 2026-08-26. v1.17.0-beta2 (2026-09-23) is a pre-release. | https://github.com/hashicorp/terraform/releases | Checked 2026-09-27 | Tool version is part of the evidence chain: a plan produced by one version is not proof for another. | terraform-drift-assurance, cloud-drift-assurance |
| Terraform licence: Business Source License 1.1. Licensor is IBM Corporation. Change licence is MPL 2.0, four years after first public distribution of each version. Production use is permitted except offering it to third parties as a hosted or embedded competitive offering. | https://github.com/hashicorp/terraform/blob/main/LICENSE | Checked 2026-09-27 | Do not describe Terraform as open source. "Source-available under BUSL 1.1" is accurate. | terraform-drift-assurance |
| IBM completed the acquisition of HashiCorp on 2025-02-27 ($35 per share in cash, about $7.2 billion equity value). | https://newsroom.ibm.com/2025-02-27-ibm-completes-acquisition-of-hashicorp,-creates-comprehensive,-end-to-end-hybrid-cloud-platform | 2025-02-27 | HashiCorp is an IBM company. Licensor naming in the licence file already reflects this. | terraform-drift-assurance |
| HCP Terraform health assessments comprise drift detection and continuous validation. Default cadence is 24 hours, configurable. Available in Standard and Premium editions. Requires remote or agent execution mode, Terraform 0.15.4+ for drift and 1.3.0+ for both. Assessments pause if the latest run errored and do not interrupt active runs. | https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health | Checked 2026-09-27 | Drift evidence is at most a day old by default, and stops silently when a run fails. It sees only resources Terraform manages, so unmanaged resources are outside it. | terraform-drift-assurance, cloud-drift-assurance, cloud-configuration-drift |
| HCP Terraform policy enforcement supports three frameworks: Terraform policy (beta, native HCL-based, needs Terraform v1.16 alpha or later), Sentinel and OPA (Rego). Sentinel and OPA policy sets support workspaces only; Terraform policy sets work with workspaces and Stacks. | https://developer.hashicorp.com/terraform/cloud-docs/policy-enforcement | Checked 2026-09-27 | Policy passes at plan time. It says nothing about changes made outside the pipeline afterwards. Stacks users have a policy coverage gap for Sentinel and OPA. | terraform-drift-assurance, change-assurance, cloud-drift-assurance |
| Terraform Stacks are generally available in HCP Terraform and Terraform Enterprise; not supported on legacy HCP Terraform team plans. Beta users must update configurations for GA. Documented limits include 20 deployments and 100 components per Stack. | https://developer.hashicorp.com/terraform/language/stacks | Checked 2026-09-27 | One Stack change fans out to many environments. Blast radius per change rises, so per-deployment verification matters more. | terraform-drift-assurance, change-assurance |
| OpenTofu latest stable is v1.12.6 (2026-08-19), a security release covering credential handling with OCI registries. v1.11.14 is maintained in parallel. v1.13.0-rc1 (2026-09-17) is a pre-release. | https://github.com/opentofu/opentofu/releases | Checked 2026-09-27 | Terraform and OpenTofu version numbers no longer correspond. State which tool, not only which version. | terraform-drift-assurance, cloud-drift-assurance |
| OpenTofu 1.12 features: dynamic `prevent_destroy`, broader provider checksums from `tofu init`, `-json-into` dual output, `destroy = false` lifecycle option, concurrent provider installation. WinRM provisioners deprecated. | https://opentofu.org/docs/intro/whats-new/ | Checked 2026-09-27 | The two tools are diverging in language features, so a module proven on one is not proven on the other. | terraform-drift-assurance |
| OpenTofu is a CNCF project at Sandbox maturity, accepted 2025-04-23. | https://www.cncf.io/projects/opentofu/ | Checked 2026-09-27 | Say "CNCF Sandbox project". Do not say incubating or graduated. | terraform-drift-assurance |
| AWS notes that a CloudFormation stack rollback to a template with a lower Kubernetes version does not trigger an EKS cluster version rollback. | https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html | Checked 2026-09-27 | A concrete case of declared state and real state diverging through normal tooling, with no manual change involved. | cloud-configuration-drift, eks-reliability-assurance, rollback-readiness-assurance |

### 7. Observability

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| OpenTelemetry signal status: tracing API, SDK and OTLP are stable; metrics API and OTLP are stable with SDK maturity varying by language; logs bridge API, SDK and OTLP are stable; baggage is stable; profiles are in development. | https://opentelemetry.io/docs/specs/status/ | Checked 2026-09-27 | Traces, metrics and logs can carry assurance evidence. Profiles cannot yet be treated as a stable evidence source. | production-observability-assurance |
| OpenTelemetry blog (2026) lists "OpenTelemetry Profiles Enters Public Alpha", "Declarative configuration is stable!", "Deprecating Span Events API" and "Kubernetes attributes promoted to release candidate in OTel Semantic Conventions". Titles only were confirmed; article bodies were not read. | https://opentelemetry.io/blog/2026/ | 2026 | Attribute renames and API deprecations break dashboards, alerts and SLO queries without any service change. | production-observability-assurance, slo-assurance |
| OpenTelemetry Collector latest release is v1.67.0 / v0.161.0, dated 14 September on the release page. | https://github.com/open-telemetry/opentelemetry-collector/releases | Checked 2026-09-27 | The Collector ships roughly fortnightly with breaking changes to deprecated APIs. The telemetry pipeline is itself a changing system. | production-observability-assurance, change-assurance |
| OpenTelemetry eBPF Instrumentation (OBI), current release v0.12.1: zero-code instrumentation via eBPF giving traces, RED metrics and network metrics. Requires Linux 5.8+ (or RHEL 4.18+ with backports) and BTF. | https://opentelemetry.io/docs/zero-code/obi/ | Checked 2026-09-27 | Coverage depends on kernel version, so a node image change can remove telemetry. Pre-1.0 version. | production-observability-assurance, kubernetes-reliability-assurance |
| Prometheus latest stable is v3.15.0 (2026-09-24). v3.13 is the current LTS line (v3.13.3, 2026-09-07). | https://github.com/prometheus/prometheus/releases | Checked 2026-09-27 | Current major is 3.x. Content referring to Prometheus 2.x as current is out of date. | production-observability-assurance |
| Grafana latest stable is v13.2.2 (2026-09-15), a security release fixing three CVEs. 13.1, 13.0 and 12.4 lines were patched the same day. | https://github.com/grafana/grafana/releases | Checked 2026-09-27 | Current major is 13. | production-observability-assurance |
| Grafana Mimir v3.2.1 (2026-09-10); Grafana Loki v3.7.8 (2026-09-17, security fixes); Grafana Tempo v3.0.3; Grafana Alloy v1.20.0 (2026-09-25, with breaking changes to OTel processors). | https://github.com/grafana/alloy/releases | Checked 2026-09-27 | All four are on active release trains with breaking changes. Collector upgrades need their own verification. | production-observability-assurance |
| Datadog supports OpenTelemetry three ways: the DDOT Collector embedded in the Datadog Agent (recommended by Datadog), a self-managed OpenTelemetry Collector exporting to Datadog, and direct agentless OTLP ingestion. Available Datadog features depend on the path chosen. | https://docs.datadoghq.com/opentelemetry/ | Checked 2026-09-27 | The ingestion path determines which signals and features exist. Changing path can remove data that an SLO or alert depends on. | production-observability-assurance |
| Kubernetes v1.37 kube-proxy default mode on Linux is still `iptables`; the documentation states a future version will change the default to `nftables`. | https://kubernetes.io/docs/reference/networking/virtual-ips/ | Checked 2026-09-27 | A future default change will alter the data plane on upgrade for clusters that never set the mode explicitly. | kubernetes-upgrade-risk, kubernetes-reliability-assurance |
| Promtail reached end of life on 2026-03-02. No further updates or support. Grafana Alloy is the replacement. | https://grafana.com/docs/loki/latest/send-data/promtail/ | Checked 2026-09-27 | Log shipping on Promtail still works and is unpatched. Same silent expiry pattern as Ingress NGINX. | production-observability-assurance, kubernetes-reliability-assurance |
| Azure Monitor managed Prometheus on AKS 1.37 moves to namespace-scoped secret access; `ServiceMonitor` or `PodMonitor` using `basicAuth` must be reconfigured before upgrade. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | A cluster upgrade that silently stops metric scraping. Monitoring must be re-proven after the upgrade, not assumed. | production-observability-assurance, aks-reliability-assurance, kubernetes-upgrade-risk |

### 8. SRE practice and DORA metrics

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| DORA now defines five software delivery performance metrics. Throughput: change lead time, deployment frequency, failed deployment recovery time. Instability: change fail rate, deployment rework rate. | https://dora.dev/guides/dora-metrics/ | 2026-01-05 | "Four keys" is out of date. Recovery time is grouped with throughput, and rework rate is a second instability measure. | high-change-failure-rate, change-assurance, release-assurance |
| DORA definitions: change fail rate is "the ratio of deployments that require immediate intervention following a deployment". Deployment rework rate is "the ratio of deployments that are unplanned but happen as a result of an incident in production". Failed deployment recovery time is "the time it takes to recover from a deployment that fails and requires immediate intervention". | https://dora.dev/guides/dora-metrics/ | 2026-01-05 | Change fail rate depends on recording which deployments needed intervention. Without that link between deployment and incident, the figure is an estimate. | high-change-failure-rate, incident-recurrence-assurance, change-assurance |
| Latest DORA report is the 2025 "State of AI-assisted Software Development", published 2025-09-24, nearly 5,000 respondents. No 2026 report is listed on dora.dev as of this research. | https://dora.dev/research/ | Checked 2026-09-27 | Cite as the 2025 DORA report. Do not refer to a 2026 report. | high-change-failure-rate, change-assurance |
| 2025 DORA findings: 90% of respondents use AI at work; AI adoption now has a positive relationship with software delivery throughput and product performance, and continues to have a negative relationship with software delivery stability. 30% report little or no trust in AI-generated code. 90% of organisations have adopted at least one platform. DORA describes AI as an amplifier of existing strengths and weaknesses. | https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report | 2025-09-24 | More change, delivered faster, with lower stability. This is the primary-source basis for change and release assurance in AI-assisted delivery. | high-change-failure-rate, change-assurance, release-assurance, rollback-readiness-assurance |
| Google SRE Workbook recommended starting parameters for multiwindow, multi-burn-rate alerts: page at burn rate 14.4 (1 hour long window, 5 minute short window, 2% of budget consumed); page at burn rate 6 (6 hours, 30 minutes, 5%); ticket at burn rate 1 (3 days, 6 hours, 10%). | https://sre.google/workbook/alerting-on-slos/ | Checked 2026-09-27 | Concrete thresholds for SLO content. A slow burn at rate 1 produces a ticket, not a page, which is how multi-week degradations go unaddressed. | slo-assurance, production-observability-assurance |
| Google Cloud Well-Architected Framework reliability pillar opens with "define reliability based on user-experience goals" and "set realistic targets for reliability", and closes with "conduct thorough postmortems". | https://docs.cloud.google.com/architecture/framework/reliability | Last reviewed 2024-12-30 | Vendor guidance already treats SLOs as the definition of reliability. The gap is proof that the SLO still reflects what users experience. | slo-assurance, production-reliability-assurance, incident-recurrence-assurance |
| Azure Well-Architected reliability guidance says to define reliability outcomes per critical user flow rather than generic uptime, to make sure RTO, RPO and SLO targets are achievable given dependencies outside the team's control, and to "continuously learn from incidents in production". | https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles | 2025-09-30 (updated 2026-03-17) | An SLO set without checking provider dependencies is a promise the team cannot keep. Dependency changes invalidate the target. | slo-assurance, azure-production-reliability, incident-recurrence-assurance |
| Provider post-incident reviews publish repair items with target dates. Azure Front Door PIR (YKYN-BWZ) listed items due February and March 2026; the West US PIR (ZJV6-SGG) lists items due August to October 2026. | https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG | PIR, 2026 | Hyperscalers publish dated corrective actions. Most enterprises cannot show the same for their own incidents: which actions closed, and whether the fix was verified. | incident-recurrence-assurance, cloud-incident-recurrence |
| Recurring cause pattern across 2025 to 2026 provider incidents: a change or automation passed its own validation and failed in aggregate or on activation (AWS DNS automation race, Google Service Control dormant code path, Azure Front Door configuration metadata, Azure remediation workflow, Azure blast radius analysis, Google manual maintenance sequencing). | https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW | 2025 to 2026 | Six incidents, one class of cause. Recurrence is measured by cause class, not by matching incident titles. | incident-recurrence-assurance, cloud-incident-recurrence, high-change-failure-rate, change-assurance |
| Google's June 2025 report and the Azure February 2026 PIR both describe recovery being slowed by retry load once the fault was fixed (Google committed to auditing exponential backoff; Azure cited retry amplification against the managed identity backend). | https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ | PIR, 2026 | Time to restore is driven by client retry behaviour as well as the fix. Retry and backoff settings are reliability controls that need periodic proof under load. | slo-assurance, production-reliability-assurance, incident-recurrence-assurance |

### 9. Disaster recovery

Regulatory items are brief by design; detail belongs to the regulatory research agent.

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| EU Digital Operational Resilience Act, Regulation (EU) 2022/2554, has applied since 2025-01-17. Pillars include ICT risk management, incident reporting, digital operational resilience testing (basic and advanced, including threat-led penetration testing) and ICT third-party risk. | https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en | Checked 2026-09-27 | Name clash: write "EU DORA regulation" and "DORA research" in full so the two are never confused on a page. | disaster-recovery-assurance, untested-disaster-recovery |
| UK FCA operational resilience: firms must identify important business services, set impact tolerances, carry out mapping and scenario testing, and had until 2025-03-31 to show they can remain within tolerance. New incident reporting requirements take effect 2027-03-18. | https://www.fca.org.uk/firms/operational-resilience | 2026-09-15 | The transition period has ended. Staying within impact tolerance is now an ongoing obligation, which is a continuous evidence requirement. | disaster-recovery-assurance, untested-disaster-recovery, production-reliability-assurance |
| AWS: "It is critical to regularly assess and test your disaster recovery strategy so that you have confidence in invoking it." Backup strategy "must include testing your backups". | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html | Checked 2026-09-27 | Vendor guidance treats an untested plan as unproven. | untested-disaster-recovery, disaster-recovery-assurance |
| AWS: recovery time and recovery point for data corruption, deletion or obfuscation are always greater than zero, and the recovery point is always before the disaster was discovered, even with multi-site active/active. | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html | Checked 2026-09-27 | Replication copies corruption. Ransomware RPO depends on detection time, so detection delay is part of the recovery evidence. | disaster-recovery-assurance, untested-disaster-recovery |
| AWS: without infrastructure as code, restoring workloads in the recovery Region is complex and may exceed RTO. EC2 backup metadata (instance type, VPC, security group, IAM role) is only used when restoring in the same Region. | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html | Checked 2026-09-27 | Drift between IaC and production directly lengthens recovery. Drift and DR are one problem, not two. | disaster-recovery-assurance, cloud-configuration-drift, terraform-drift-assurance |
| AWS Backup restore testing selects the latest or a random recovery point, measures restore job duration and supports validation for 1 to 168 hours before clean-up. Covers Aurora, DocumentDB, DynamoDB, EBS, EC2, EFS, FSx, Neptune, RDS and S3. | https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html | Checked 2026-09-27 | Measured restore time per resource is evidence. It is not an application RTO, which includes dependencies, DNS, secrets and data reconciliation. | disaster-recovery-assurance, untested-disaster-recovery |
| Azure: recovery plans should be structured, tested and documented, cover all components and the system as a whole, and be exercised with regular drills covering failover and failback. Backups should be immutable and transactionally consistent. | https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles | 2025-09-30 (updated 2026-03-17) | Failback is named explicitly. Many drills prove failover only. | disaster-recovery-assurance, untested-disaster-recovery, azure-production-reliability |
| Immutable backup options by provider: AWS Backup logically air-gapped vault (Vault Lock compliance mode); Google Backup and DR backup vaults (immutable and indelible, enforced retention); Resiliency in Azure includes ransomware protection. | https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr | 2026-09-24 | Immutability is a configuration. It needs the same drift checks as any other setting, plus a restore that proves the copy is usable. | disaster-recovery-assurance |
| EKS: AWS recommends testing AZ loss by starting a manual zonal shift or using zonal autoshift practice runs, and states this is "strongly recommended" though not required. | https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html | Checked 2026-09-27 | Practice runs give recurring, dated evidence of N-1 AZ operation. | disaster-recovery-assurance, eks-reliability-assurance |
| Observed recovery durations in 2026 provider incidents: Azure West US 2 storage validation about 14 hours after cooling was restored; AWS US-EAST-1 EC2 launches impaired for about 14 hours. | https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G | PIR, 2026 | Provider recovery can exceed a customer's stated RTO. An RTO that assumes fast provider recovery is an untested assumption. | disaster-recovery-assurance, untested-disaster-recovery |

### 10. Platform engineering, GitOps and CI/CD

GitHub Actions and GitLab changelogs were not read; see "Could not verify".

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Argo CD latest stable is v3.5.3 (14 September), with v3.4.9 maintained in parallel and v3.6.0-rc1 in pre-release. Releases carry signed images and SLSA Level 3 provenance. | https://github.com/argoproj/argo-cd/releases | Checked 2026-09-27 | Current major is 3. Content describing Argo CD 2.x as current is out of date. | release-assurance, change-assurance |
| Flux latest stable is v2.9.5 (2026-08-31): returns to upstream Helm v4.2.4 and hardens handling of kubeconfig Secrets. | https://github.com/fluxcd/flux2/releases | 2026-08-31 | Flux now builds on Helm 4. A GitOps controller upgrade can change how charts render, so rendered output needs re-checking. | release-assurance, change-assurance |
| Argo Rollouts latest stable is v1.10.0 (2026-08-27). Flagger latest stable is v1.45.0 (1 September). | https://github.com/argoproj/argo-rollouts/releases | Checked 2026-09-27 | Progressive delivery gates a release on metrics. If the metric query breaks, the gate passes on missing data unless configured otherwise. | release-assurance, rollback-readiness-assurance, high-change-failure-rate |
| Amazon EKS Capabilities offers managed Argo CD, ACK and KRO, priced with a base hourly rate plus per-resource charges. | https://aws.amazon.com/eks/pricing/ | Checked 2026-09-27 | GitOps tooling is becoming a managed platform feature. Sync status shows that the cluster matches Git, not that the service works. | release-assurance, eks-reliability-assurance, change-assurance |
| AKS and AKS Automatic stop cluster upgrades when deprecated Kubernetes API usage is detected. AKS Automatic also enforces deployment safeguards through Azure Policy. | https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic | 2026-07-07 | Platform guardrails are preventive gates. They do not verify outcome after the change. | change-assurance, aks-reliability-assurance, release-assurance |
| EKS rollback readiness insights are point-in-time: changes made after the check and before rollback completes are not captured. Resources bypassed with `--force` persist in etcd. | https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html | Checked 2026-09-27 | Rollback is a forward change with its own risks. Rollback readiness decays as new resources are created on the new version. | rollback-readiness-assurance, change-assurance |
| Azure incident of 2 to 3 February 2026 impacted GitHub Actions and Azure DevOps along with Virtual Machines and Managed Identities. | https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ | PIR, 2026 | The delivery pipeline shares dependencies with production. During an incident, the ability to deploy a fix or roll back can be lost at the same time. | rollback-readiness-assurance, release-assurance, change-assurance |
| Azure Front Door repairs after October 2025: synchronous configuration processing, a pre-canary stage and extended bake time at each rollout stage. | https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ | PIR, 2025 | Provider practice confirms staged rollout with bake time as the control for configuration changes, not only code. | release-assurance, change-assurance, high-change-failure-rate |
| Google committed after June 2025 to feature-flag protection for changes to critical binaries and to incremental validation of globally replicated data. | https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW | June 2025 | A release can pass every check and carry an unexercised code path. Verification must include the condition that activates the path. | release-assurance, change-assurance |

### 11. Software supply chain

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| SLSA current specification is v1.2, status Approved, with a Build track and a Source track. | https://slsa.dev/spec/ | Checked 2026-09-27 | The Source track is new relative to v1.0. Provenance proves how an artefact was built, not that it behaves correctly in production. | release-assurance, change-assurance |
| Sigstore: Cosign v3 released 2025-10-08; Rekor v2 reached general availability 2025-10-10. As of a June 2026 post, Rekor v1 remains the default on the public sigstore.dev instance. | https://blog.sigstore.dev/ | 2026-06-28 | Signing verifies origin. Verification at deploy time is the control to check, since a signature nobody verifies proves nothing. | release-assurance |
| CISA published "2025 Minimum Elements for a Software Bill of Materials (SBOM)" on 2025-08-22 as a draft for public comment (comment period to 2025-10-03), updating the 2021 NTIA minimum elements. | https://www.cisa.gov/resources-tools/resources/2025-minimum-elements-software-bill-materials-sbom | 2025-08-22 | Describe as a draft unless a final version is confirmed. An SBOM is accurate for one build only. | release-assurance |
| npm "Shai-Hulud" incident (CISA alert 2025-09-23): a self-replicating worm compromised over 500 npm packages, harvested GitHub personal access tokens and cloud API keys for AWS, GCP and Azure, and republished itself using stolen credentials. CISA advised pinning to versions released before 2025-09-16 and rotating credentials. | https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem | 2025-09-23 | A build-time compromise that yields production cloud credentials. Dependency state and credential age both become evidence with an expiry. | release-assurance, change-assurance, production-reliability-assurance |
| GitHub Actions compromise, March 2025: tj-actions/changed-files (CVE-2025-30066) and reviewdog/action-setup (CVE-2025-30154) exposed secrets including access keys, GitHub PATs, npm tokens and private RSA keys in workflow logs. Patched in tj-actions/changed-files v46.0.1. Both added to the CISA KEV catalogue 2025-03-26. | https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction | 2025-03-18 | The pipeline is a production dependency. Third-party actions referenced by mutable tag change without a commit in the customer's repository. | release-assurance, change-assurance |
| EU Cyber Resilience Act, Regulation (EU) 2024/2847: entered into force 2024-12-10; reporting obligations apply from 2026-09-11; main obligations apply from 2027-12-11. | https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act | Checked 2026-09-27 | Reporting obligations are already in force as of this research. Main obligations are about 14 months away. | release-assurance, saas-production-reliability |
| Retired upstream components keep running and stop receiving security fixes: Ingress NGINX (no fixes after March 2026) and Promtail (end of life 2026-03-02). | https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ | 2025-11-11 | Supply chain risk includes maintained status. An SBOM lists the component; it does not say the component was retired last quarter. | kubernetes-reliability-assurance, production-reliability-assurance, release-assurance |
| Ingress NGINX was maintained by one or two people in their own time, which the project cited in its retirement. | https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ | 2025-11-11 | Maintainer capacity is a leading indicator for critical dependencies. | kubernetes-upgrade-risk, production-reliability-assurance |
| Infrastructure tooling ships security fixes on a short cycle: OpenTofu v1.12.6 (credential handling with OCI registries), Grafana v13.2.2 (three CVEs), Loki v3.7.8 (high-severity dependency fixes). | https://github.com/opentofu/opentofu/releases | Checked 2026-09-27 | Platform tools are part of the supply chain. Patch currency of the toolchain needs the same evidence as application dependencies. | release-assurance, terraform-drift-assurance, production-observability-assurance |

### 12. Capacity and cost-reliability interplay

Provider GPU capacity documentation was not read; see "Could not verify".

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Karpenter upstream latest stable is v1.14.1 (21 August). v1.14.0 added a DRA allocator, CapacityBuffer API support and a Balanced consolidation policy. | https://github.com/kubernetes-sigs/karpenter/releases | Checked 2026-09-27 | Consolidation policy decides how much headroom survives cost optimisation. A policy change alters failure behaviour with no workload change. | kubernetes-reliability-assurance, eks-reliability-assurance |
| Karpenter is the basis of node autoscaling in EKS Auto Mode and in AKS node auto-provisioning. AKS ships `karpenter 1.12.2-aks` with Kubernetes 1.36 and `1.7.0-aks` with 1.35. EKS zonal shift needs self-managed Karpenter 1.12 or greater. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | Karpenter is past 1.0 and embedded in managed offerings. Autoscaler version is tied to cluster version, so an upgrade changes scaling behaviour. | kubernetes-reliability-assurance, eks-reliability-assurance, aks-reliability-assurance |
| AWS: if all worker nodes are at full capacity, recovery depends on adding nodes, which takes time and can hit compute capacity constraints during a zonal impairment. AWS recommends over-provisioning in each AZ. | https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html | Checked 2026-09-27 | Cost optimisation removes the headroom that resilience depends on. Consolidation settings and AZ headroom must be checked together. | eks-reliability-assurance, aws-production-reliability, production-reliability-assurance |
| AWS: service quotas in the DR Region must be high enough to scale to production capacity. ARC readiness check monitors quotas, capacity and routing policies for the replica. | https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html | Checked 2026-09-27 | Quota is a reliability limit that fails only under stress. Production growth makes last year's DR quota insufficient. | disaster-recovery-assurance, aws-production-reliability, untested-disaster-recovery |
| AKS Automatic pod readiness SLA: 99.9% of qualifying pod readiness operations complete within 5 minutes, covering scheduling and node provisioning. | https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic | 2026-07-07 | A published scale-out threshold. Five minutes is a useful reference when setting autoscaling expectations against traffic ramp rates. | aks-reliability-assurance, slo-assurance |
| Azure Linux 2.0 node pools on AKS cannot scale after node images are removed from 2026-10-31. | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions | 2026-09-15 | Capacity failure caused by lifecycle, not by quota or demand. | aks-reliability-assurance, kubernetes-upgrade-risk |
| Kubernetes: Dynamic Resource Allocation graduated to GA in v1.34; HPA scale-to-zero is beta in v1.37; EKS Auto Mode includes GPU support with NVIDIA drivers and plugins. | https://kubernetes.io/blog/2025/08/27/kubernetes-v1-34-release/ | 2025-08-27 | GPU scheduling is moving to a new API (DRA). Scale-to-zero adds cold-start latency as a new SLO risk. | kubernetes-reliability-assurance, slo-assurance |
| EKS Provisioned Control Plane offers tiers from XL to 8XL at $1.65 to $13.90 per hour. | https://aws.amazon.com/eks/pricing/ | Checked 2026-09-27 | Control-plane capacity is now a sizing decision with a price, and therefore something that can be under-provisioned. | eks-reliability-assurance |
| Azure: overprovision to mitigate failure of redundant instances before scaling operations start; design scale-out with regional capacity constraints in mind. | https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles | 2025-09-30 (updated 2026-03-17) | Both AWS and Azure state that autoscaling alone is not a failure response. | azure-production-reliability, production-reliability-assurance |

### Terminology: current vs deprecated

Only terms confirmed from a primary source in this research are listed.

| Use (current) | Avoid (deprecated, retired or inaccurate) | Source |
|---|---|---|
| Amazon Application Recovery Controller (ARC) | Route 53 Application Recovery Controller (survives only in the docs URL path) | https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html |
| AWS Fault Injection Service (AWS FIS) | AWS Fault Injection Simulator | https://docs.aws.amazon.com/fis/latest/userguide/what-is.html |
| EKS standard support / extended support | "EKS LTS" (AWS does not use this term) | https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html |
| AKS community support / platform support / Long-Term Support (LTS) | "AKS extended support" | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions |
| GKE Extended channel, extended support | "GKE LTS" | https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels |
| EKS Auto Mode; AKS Automatic; GKE Autopilot | Treating the three as equivalent products or using one name for another | Provider docs cited in section 2 |
| AKS node auto-provisioning (NAP) | "AKS Karpenter add-on" | https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning |
| AKS `NodeImage` node OS upgrade channel | `node-image` cluster auto-upgrade channel (legacy, planned for deprecation) | https://learn.microsoft.com/en-us/azure/aks/auto-upgrade-cluster |
| Azure Linux 3.0 | Azure Linux 2.0 (unsupported since 2025-11-30; images removed from 2026-10-31) | https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions |
| Microsoft Entra Workload ID | Microsoft Entra pod-managed identity (managed add-on support ended September 2025) | https://learn.microsoft.com/en-us/azure/aks/long-term-support |
| Istio-based service mesh add-on for AKS | Open Service Mesh add-on (support ends 2027-09-30) | https://learn.microsoft.com/en-us/azure/aks/long-term-support |
| Resiliency in Azure (formerly Azure Business Continuity Center) | Azure Business Continuity Center as the current name; Backup center as the entry point | https://learn.microsoft.com/en-us/azure/backup/backup-center-overview |
| Google Cloud Well-Architected Framework | Google Cloud Architecture Framework | https://docs.cloud.google.com/architecture/framework/reliability |
| docs.cloud.google.com/... | cloud.google.com/.../docs links (now redirect) | https://docs.cloud.google.com/kubernetes-engine/docs/release-schedule |
| HCP Terraform | Terraform Cloud | https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health |
| Terraform: source-available, Business Source License 1.1, licensor IBM Corporation | "Open source Terraform" | https://github.com/hashicorp/terraform/blob/main/LICENSE |
| OpenTofu: CNCF Sandbox project | "CNCF incubating" or "graduated" | https://www.cncf.io/projects/opentofu/ |
| Gateway API (or another maintained ingress controller) | Ingress NGINX (kubernetes/ingress-nginx), retired March 2026 | https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ |
| kube-proxy `nftables` mode | kube-proxy `ipvs` mode (deprecated in v1.35) | https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/ |
| cgroup v2 | cgroup v1 (kubelet refuses to start by default since v1.35) | https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/5573-remove-cgroup-v1/README.md |
| containerd 2.x | containerd 1.x (not supported from Kubernetes v1.36) | https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/ |
| Grafana Alloy | Promtail (end of life 2026-03-02) | https://grafana.com/docs/loki/latest/send-data/promtail/ |
| Prometheus 3.x; Grafana 13 | Prometheus 2.x or Grafana 11 described as current | https://github.com/prometheus/prometheus/releases |
| Five DORA software delivery metrics: change lead time, deployment frequency, failed deployment recovery time, change fail rate, deployment rework rate | "Four key metrics"; "MTTR" or "time to restore service" as a DORA metric; "change failure rate" as the DORA spelling | https://dora.dev/guides/dora-metrics/ |
| "DORA research" and "EU DORA regulation (Regulation (EU) 2022/2554)", each written in full | Bare "DORA" where both could be meant | https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en |
| SLSA v1.2 (Build and Source tracks) | SLSA v0.1 four-level model; "SLSA 1.0" as current | https://slsa.dev/spec/ |
| Argo CD 3.x; Flux 2.9 | Argo CD 2.x described as current | https://github.com/argoproj/argo-cd/releases |
| In-place Pod resize (stable since v1.35) | Describing pod resource changes as always requiring a restart | https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/ |

### Assurance angles

Original operating insight drawn from the findings above. Each states what evidence expires and why.

- **Support status expires on a calendar, not on a change.** A cluster that passed in April fails in December with nothing deployed. Kubernetes gives roughly 12 months per minor upstream; EKS 14 plus 12; AKS 12 plus 12 with LTS; GKE 14 plus about 10. The threshold that matters is days remaining to the next support boundary, per cluster.
- **"Supported" is graded.** AKS platform support and EKS extended support both read as supported on a dashboard and mean different things for patching. Evidence must name the grade.
- **Upgrade breakage has moved below the API.** The recent breaking items are cgroup v1, containerd 1.x, kube-proxy mode, a removed volume type and a retired ingress controller. API deprecation scanners return clean and the upgrade still fails. Readiness evidence must cover node OS, runtime, add-ons and data plane.
- **Retirement produces no signal.** Ingress NGINX and Promtail kept working after their retirement dates. Nothing alerts. The only detection is an inventory checked against upstream lifecycle, repeated on a schedule.
- **Forced upgrades are unscheduled changes.** EKS upgrades the control plane at the end of extended support without notification; GKE upgrades at end of support regardless of blockers. Proof needed: no cluster can reach that date.
- **Rollback is a capability with an expiry.** EKS rollback lasts 7 days, covers one minor version and excludes add-ons and node groups. Rollback readiness proven on day one is weaker on day six because new resources have been created on the new version.
- **Vendor checks are advisory and partial.** EKS insights refresh every 24 hours and skip self-managed add-ons. HCP Terraform health assessments run daily, pause after a failed run and see only managed resources. Passing a vendor check is one input, not assurance.
- **Zone resilience is proven by capacity, not by configuration.** Enabling zonal autoshift does nothing if the remaining zones cannot carry the load. N-1 zone headroom changes with every scaling and cost decision, so the evidence is only as fresh as the last capacity change.
- **Single-zone proof did not cover 2026.** Azure West US 2 lost two zones to one storm; Google us-west1 degraded region-wide from maintenance. A design tested against one zone failing has not been tested against these.
- **Global shared services defeat regional design.** Azure Front Door, Google Service Control and AWS regional DNS automation each failed across the boundaries customers had designed around. Assurance needs a dependency list of provider control-plane and edge services per critical flow.
- **The delivery pipeline fails with production.** The February 2026 Azure incident took GitHub Actions and Azure DevOps with it. The ability to deploy a fix or roll back is itself something to prove under failure.
- **Estimated RTO is not measured RTO.** Resilience Hub estimates from configuration; AWS Backup restore testing times a data restore. Neither is an application recovery with dependencies, DNS, secrets and reconciliation. The evidence is a timed end-to-end drill with a date.
- **Provider recovery can exceed the customer's RTO.** Around 14 hours for dependent recovery in two separate incidents. An RTO shorter than the provider's observed recovery is only valid if failover to another region is proven.
- **DR evidence expires with production growth.** Quotas, instance availability and replica sizing in the recovery region were set for an earlier production footprint. Every capacity increase in primary invalidates the last DR proof.
- **Drift and recovery are the same problem.** AWS states recovery without accurate infrastructure as code may exceed RTO. Drift in primary means the recovery region is rebuilt from a description that is no longer true.
- **In-place resize and automation create approved drift.** Pods can now differ from their manifest through a supported feature, and managed modes replace nodes every 21 days. Drift detection must separate intended divergence from unintended.
- **Automated remediation needs its own proof.** An Azure remediation workflow caused a multi-region outage by correcting something that was intentional. Corrective action must be bounded, staged and verified after it runs.
- **Observability is a changing system.** Collector releases, semantic convention renames, a deprecated span events API and an AKS upgrade that changes secret access for scraping can each stop an SLO being measured. An SLO with no data reads as an SLO with no breach.

### Could not verify

The session's web search allowance (200 calls) was used up part-way through, so later research relied on fetching known primary URLs. Nothing in this list should be written into content until it is checked against the primary source named.

**Not researched or not retrievable**

| Item | Status and primary source to check |
|---|---|
| OpenSLO specification version and project status | GitHub releases page lists no releases. Version not confirmed. https://github.com/OpenSLO/OpenSLO |
| Error budget policy and postmortem practice as stated by Google SRE | Not read. https://sre.google/ |
| Post-incident action-item completion rates and incident recurrence statistics | No primary source identified. Do not quote a figure. |
| DORA 2025 report: the seven AI capabilities by name, and any performance-tier thresholds | Report body not retrievable; only the announcement was read. https://dora.dev/research/2025/dora-report/ |
| EU DORA regulation: testing frequency, including threat-led penetration testing interval | Set in the regulation text and technical standards, not read. EUR-Lex, Regulation (EU) 2022/2554 |
| PRA and Bank of England operational resilience statements | Not read. Only the FCA page was confirmed. |
| FFIEC business continuity and testing expectations | Source returned HTTP 403. FFIEC IT Examination Handbook |
| CNCF maturity level of Argo, Flux and Karpenter | Not checked. Versions are confirmed in sections 10 and 12. |
| GitHub Actions and GitLab changes relevant to deployment safety | Not read. GitHub changelog, GitLab release notes |
| Final (non-draft) CISA SBOM minimum elements | Only the August 2025 draft is confirmed. https://www.cisa.gov/ |
| Supply chain incidents after September 2025 | Not researched. CISA alerts, GitHub and npm advisories |
| GPU capacity constraints, capacity reservations and quota behaviour | Not read. AWS, Azure and Google Cloud compute documentation |
| Datadog capabilities beyond OpenTelemetry ingestion | Not read. https://docs.datadoghq.com/ |
| Observability cost as a risk (any quantified claim) | No primary source identified. Do not quote a figure. |
| Azure Site Recovery recent feature changes | Not read. https://learn.microsoft.com/en-us/azure/site-recovery/feature-updates-whats-new |
| AWS Resilience Hub drift detection and scheduled assessment details | Not read. AWS Resilience Hub user guide |
| AWS Backup logically air-gapped vault retention limits and multi-party approval | Only the overview was read. |
| GKE cluster management fee and Extended channel fee | Pricing page content was truncated. https://cloud.google.com/kubernetes-engine/pricing |
| AKS Standard and Premium tier prices | Pricing page returned placeholders, no figures. https://azure.microsoft.com/pricing/details/kubernetes-service/ |

**Partly verified (treat with care)**

| Item | What is and is not confirmed |
|---|---|
| Kubernetes v1.37, v1.36, v1.35 and v1.34 full deprecation and removal lists | Release blog pages were truncated when read. Only the items in section 1 are confirmed. Read the full release notes before publishing an upgrade checklist. |
| kube-proxy `ipvs` removal timeline (disabled by default in v1.40, removed in v1.43) | Seen in search summaries only. The kubernetes.io virtual IPs page gives no removal version. Deprecation in v1.35 is confirmed. |
| Release year for Argo CD v3.5.3, Flagger v1.45.0 and Karpenter v1.14.1 | Release pages showed day and month without a year. Versions are confirmed as latest stable on 2026-09-27. |
| v1.37 prohibition of static pod references to Secrets or ConfigMaps | Seen in search summaries only. |
| Ingress NGINX repository archived on 2026-03-24 | Seen in search summaries only. Retirement in March 2026 is confirmed. |
| OpenTelemetry 2026 blog items (profiles public alpha, declarative configuration stable, span events API deprecation, Kubernetes semantic conventions release candidate) | Titles confirmed. Dates and detail not read. |
| OpenTelemetry Collector v1.67.0 / v0.161.0 and Grafana Tempo v3.0.3 release year | Release pages showed day and month without a year. Versions are confirmed; treat dates as 2026 only after checking. |
| GKE maintenance window minimum availability requirement | Figure returned was inconsistent; omitted from section 2. |
| Azure Chaos Studio Workspaces general availability "late 2026" | From a search summary of a Microsoft blog. Public preview status is confirmed on Microsoft Learn. |
| AKS Automatic and node auto-provisioning general availability dates | Documentation shows no preview label. GA dates not confirmed. |
| Terraform 1.16 feature list | From a search summary of the GitHub release notes, not read directly. Version and date are confirmed. |
| Publication dates of Google Cloud incident reports for 20 August and 1 September 2026 | Incident facts confirmed. One returned report date was later than the research date, so report dates are omitted. |

**Reported by secondary sources only**

| Item | Status |
|---|---|
| AWS Middle East (me-central-1) disruption, March 2026, attributed in press reports to physical damage to facilities | No AWS post-event summary is listed. Do not cite cause, scope or AWS statements without an AWS source. |
| Google Cloud India data centre fire, June 2026 | Google's status summary confirms a network degradation affecting Delhi, Chennai and Mumbai from 5 June 2026 lasting more than 21 days. The cause is not confirmed from a Google source. |

## Cyber exposure and identity

Source file: `docs/research/08-cyber-identity.md`

Research conducted 2026-09-27 from primary sources. Rows marked **(X)** were confirmed only from a search-engine excerpt of the cited page, not a full page read — re-check before quoting verbatim. "Published / updated" is the date shown by the source.

### 1. Microsoft Entra ID

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Mandatory MFA for Azure is enforced by Microsoft in two phases. Phase 1 (from Oct 2024): Azure portal, Microsoft Entra admin center, Intune admin center; Microsoft 365 admin center from Feb 2025. Phase 2 (from 1 Oct 2025): Azure CLI, Azure PowerShell, Azure mobile app, IaC tools, REST API control plane, for Create/Update/Delete. Phase 2 postponement was available only until 1 Jul 2026. No opt-out. | https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication | Updated 2026-07-06 | By Sept 2026 postponement windows have lapsed; content should say "enforced", not "coming". | entra-id-exposure-assurance, identity-exposure-assurance |
| Same page: enforcement applies to break-glass accounts and ignores Conditional Access user exclusions. Workload identities (managed identities, service principals) are not in scope; user accounts used as service accounts are. ROPC flow is incompatible with MFA. Public Azure cloud only — not Azure for US Government or sovereign clouds. | https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication | Updated 2026-07-06 | User-based service accounts are a drift pattern: they break or get quietly excluded. Assurance = prove none remain. | entra-id-exposure-assurance, identity-access-drift |
| Emergency access: two or more cloud-only `*.onmicrosoft.com` accounts, passkey (FIDO2) recommended or CBA, Global Administrator assigned permanent active in PIM, excluded from CA policies that block or restrict sign-in via a dedicated group. Validate "at least every 90 days" and on IT staff change; alert on every sign-in. | https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access | Updated 2026-06-05 | A vendor-stated 90-day evidence expiry for break-glass. Exclusion groups are where sprawl hides. | privileged-access-assurance, stale-privileged-access, entra-id-exposure-assurance |
| Microsoft recommends Global Administrator assigned to "fewer than five" people and privileged role assignments "fewer than 10"; portal warns when exceeded. Use PIM for just-in-time, recurring access reviews, cloud-native accounts for roles. | https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices | Updated 2026-06-01 | Concrete thresholds for a standing-privilege assurance check. | stale-privileged-access, privileged-access-assurance, entra-id-exposure-assurance |
| Licensing as stated by Microsoft: PIM requires Entra ID P2 or Entra ID Governance; entitlement management and access reviews require Entra ID Governance or Entra Suite (some capabilities with P2); Conditional Access requires P1. CAE critical-event evaluation is available in all tenants. | https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices | Updated 2026-06-01 | Avoid implying every tenant has PIM or access reviews. | entra-id-exposure-assurance |
| PIM: "Enforce Conditional Access policies like MFA on every PIM activation" is GA (via authentication context). | https://learn.microsoft.com/en-us/entra/fundamentals/whats-new | April 2026 entry | Activation-time reauthentication is now a checkable control setting. | privileged-access-assurance, entra-id-exposure-assurance |
| Token Protection (CA session control): GA for native apps on Windows, iOS/iPadOS and macOS; browser-based apps are Preview and limited to selected web apps accessing Azure Resource Manager. Native enforcement covers Exchange Online, SharePoint Online, Teams (plus AVD and Windows 365 on Windows). | https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection | Updated 2026-08-20 | Do not claim token protection covers browsers or all resources. Note the page's device section still labels Apple "(Preview)" — internal inconsistency. | entra-id-exposure-assurance, identity-exposure-assurance |
| Microsoft Entra Agent ID platform is GA (April 2026). Constructs: agent identity, agent identity blueprint, agent's user account; owners, sponsors, managers. Agent registry is converging into Microsoft Agent 365. | https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id | Updated 2026-08-13 | Agents are now first-class directory objects that need ownership and lifecycle evidence. | identity-exposure-assurance, entra-id-exposure-assurance |
| Conditional Access for agents requires Entra ID P1 or P2 and a Microsoft Agent 365 licence. Not applied when security defaults are enabled; "all users" policies do not include agents' user accounts; policies targeting an agent identity do not cover its user account; API-key access bypasses CA entirely. | https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id | Updated 2026-07-01 | Documented coverage gaps — "we have CA" does not mean agents are covered. | identity-exposure-assurance, entra-id-exposure-assurance, identity-access-drift |
| Extended CA protections for agents' user accounts (agent risk, compliant device, custom security attributes) are Public Preview (June 2026). Lifecycle Workflows for Agent ID sponsorship are GA (May 2026) to prevent orphaned agents. | https://learn.microsoft.com/en-us/entra/fundamentals/whats-new | June / May 2026 entries | Orphaned agent sponsor = stale ownership evidence. | identity-access-drift, entra-id-exposure-assurance |
| Passkeys: synced passkeys GA and passkey profiles GA (March 2026); passkeys supported in registration campaign GA (May 2026). "External MFA" (formerly external authentication methods) GA (Feb 2026). | https://learn.microsoft.com/en-us/entra/fundamentals/whats-new | Feb–May 2026 entries | Use "passkey (FIDO2)", "synced" vs "device-bound", "External MFA". | entra-id-exposure-assurance, identity-exposure-assurance |
| Microsoft Entra Backup and Recovery is GA (June 2026): daily backup of users, groups, apps, service principals, CA policies, named locations, agent IDs; difference reports; release note states 7-day retention with P1/P2. | https://learn.microsoft.com/en-us/entra/fundamentals/whats-new | June 2026 entry | Difference reports are a native drift signal but with a short window; longer evidence must be kept elsewhere. | identity-access-drift, entra-id-exposure-assurance |
| CA behaviour change (GA, Jan 2026): policies targeting All resources with resource exclusions are now enforced in flows requesting only OIDC or specific directory scopes. | https://learn.microsoft.com/en-us/entra/fundamentals/whats-new | January 2026 entry | Platform behaviour changes under a static policy; effectiveness must be re-tested, not assumed. | identity-access-drift, entra-id-exposure-assurance |
| Security defaults now include "Blocking device code flow"; "Starting July 1, 2026, all new Microsoft Entra tenants block device code flow as part of security defaults." No customisation (on or off). P1/P2 tenants are steered to Conditional Access and Microsoft-managed policies. | https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults | Updated 2026-07-01 | Existing tenants are not automatically covered by the new-tenant rule. | entra-id-exposure-assurance |
| Legacy MFA and SSPR policies: "Beginning September 30, 2025, authentication methods can't be managed in these legacy MFA and SSPR policies." A method enabled in any policy remains usable until migration state is "Migration Complete". | https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage | Updated 2026-03-27 | Weak methods can persist through a legacy policy even when the modern policy looks clean. | entra-id-exposure-assurance, identity-access-drift |
| Azure AD Graph: "August 31, 2025: End of extended access to Azure AD Graph. Azure AD Graph will be fully retired." | https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-overview | Dated 2025-09-29 | Any tooling still described as using Azure AD Graph is obsolete. | entra-id-exposure-assurance |
| MSOnline and AzureAD PowerShell modules deprecated 30 Mar 2024; "As of May 30, 2025, MSOnline is retired." Replacements: Microsoft Graph PowerShell SDK, Microsoft Entra PowerShell. AzureAD module end date not confirmed in our read. | https://learn.microsoft.com/en-us/powershell/azure/active-directory/migration-faq?view=azureadps-2.0 | Live doc, read 2026-09-27 | Evidence-collection scripts on old modules silently stop producing evidence. | entra-id-exposure-assurance |
| **(X)** Microsoft Entra Permissions Management: end of sale 1 Apr 2025; retirement extended from 1 Oct 2025 to 1 Nov 2025. Microsoft pointed customers to Delinea for CIEM. | https://techcommunity.microsoft.com/blog/microsoft-entra-blog/important-change-announcement-microsoft-entra-permissions-management-end-of-sale/4399382 | 2025 | Do not list Permissions Management as a current Entra product. | entra-id-exposure-assurance, cloud-security-exposure-assurance |
| **(X)** Entra recommendations: unused applications flagged after 90 days without use; unused app credentials flagged after 30 days; inactive guest report defaults to 90 days of inactivity. | https://learn.microsoft.com/en-us/entra/identity/monitoring-health/recommendation-remove-unused-apps ; https://learn.microsoft.com/en-us/entra/identity/users/clean-up-stale-guest-accounts | Not captured | Vendor-native staleness thresholds (30/90 days) to cite for drift checks. | identity-access-drift, stale-privileged-access, entra-id-exposure-assurance |
| Conditional Access for workload identities needs Workload Identities Premium; applies only to single-tenant service principals registered in the tenant; managed identities and multitenant/SaaS apps are not covered; group-assigned policies are not enforced for service principals. | https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity | Live doc, read 2026-09-27 | Most non-human identities sit outside CA; assurance must come from credential and permission evidence. | identity-exposure-assurance, entra-id-exposure-assurance |
| Microsoft Digital Defense Report 2025 (period July 2024–June 2025): "more than 97% of identity attacks are password attacks"; identity-based attacks "surged by 32%" in first half of 2025; in 80% of incidents investigated, attackers sought to steal data; over half of attacks with known motives driven by extortion or ransomware. | https://blogs.microsoft.com/on-the-issues/2025/10/16/mddr-2025/ | 2025-10-16 | Latest MDDR available to us; a 2026 edition was not confirmed. | identity-exposure-assurance, cyber-exposure-assurance |

### 2. AWS IAM

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| AWS IAM best practice: "Require human users to use federation with an identity provider to access AWS using temporary credentials"; AWS recommends IAM Identity Center for centralised access. Workloads should use IAM roles; outside AWS use IAM Roles Anywhere (X.509), `AssumeRoleWithWebIdentity` (JWT) or `AssumeRoleWithSAML`. | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html | Live doc, read 2026-09-27 | Baseline for "no long-lived keys" assurance; each IAM user access key is an exception needing a recorded reason. | aws-iam-exposure-assurance, identity-exposure-assurance |
| Same page names the legitimate long-term credential cases (workloads that cannot use roles, third-party clients, CodeCommit, Amazon Keyspaces) and recommends using "IAM access last used information" to update and remove keys. It also introduces "account access manager", an IAM feature to assign existing IAM roles to IAM Identity Center users and groups. | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html | Live doc, read 2026-09-27 | Last-used data is the evidence source for stale-key closure. Account access manager is new; verify detail before naming on site. | aws-iam-exposure-assurance, identity-access-drift |
| AWS recommends phishing-resistant MFA "such as passkeys and security keys wherever possible"; SCPs and RCPs are guardrails that grant no permissions; permissions boundaries cap delegated role creation. | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html | Live doc, read 2026-09-27 | Guardrail presence is not effective permission; assurance needs evaluated access, not policy inventory. | aws-iam-exposure-assurance, privileged-access-assurance |
| IAM now enforces MFA for root users across all account types including member accounts. AWS recommends centralised root access management and removing root credentials from member accounts. | https://aws.amazon.com/about-aws/whats-new/2025/06/aws-iam-mfa-root-users-across-all-account-types/ | 2025-06-17 | Root MFA is platform-enforced; the remaining question is whether member-account root credentials still exist at all. | aws-iam-exposure-assurance, privileged-access-assurance |
| **(X)** Centralised root access has two features: root credentials management (monitor, remove, disallow recovery of root credentials in member accounts) and privileged root actions. New accounts created in the organisation have no root password once enabled. | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-enable-root-access.html | Not captured | Verified closure = zero member accounts with root password, access keys or signing certificates. | aws-iam-exposure-assurance, stale-privileged-access |
| IAM Access Analyzer produces three finding families: external access (outside the zone of trust), internal access (access paths from principals inside the organisation to specified resources), unused access (unused roles, unused IAM user access keys and passwords, unused permissions within a "specified usage window"). External access findings are free; unused and internal access findings are charged. | https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html | Live doc, read 2026-09-27 | Native evidence source; cost means coverage is often partial — coverage itself must be evidenced. | aws-iam-exposure-assurance, identity-access-drift, stale-privileged-access |
| IAM Access Analyzer policy validation provides "more than 100 policy checks"; policy generation builds least-privilege policies from CloudTrail activity. **(X)** Custom policy checks detect policy changes more permissive than the previous version, for use before deployment. | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html ; https://aws.amazon.com/iam/access-analyzer/features/ | Live doc, read 2026-09-27 | Pre-deployment checks prove intent; post-deployment findings prove state. Both are needed. | aws-iam-exposure-assurance |
| **(X)** Resource control policies (RCPs) launched supporting S3, STS, KMS, SQS and Secrets Manager; support later extended to Amazon Cognito and CloudWatch Logs (Jan 2026) and DynamoDB (Feb 2026). RCP quota raised to 2,000 per organisation (Jul 2026). | https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html ; https://aws.amazon.com/about-aws/whats-new/2026/07/aws-organizations-resource-control-policy-limit-increase-2000/ | 2026 | RCPs do not cover every service; a data perimeter claim must state which services are in scope. | aws-iam-exposure-assurance, cloud-security-exposure-assurance |
| **(X)** Declarative policies are enforced in the service control plane, unlike SCPs and RCPs which are authorisation policies regulating API access; they "enforce durable intent". | https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_declarative_policies.html | Not captured | Distinguish three AWS Organizations policy types correctly in copy. | aws-iam-exposure-assurance |

### 3. Workload and non-human identity

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| **(X)** Amazon EKS offers two ways to grant IAM permissions to pods: IAM roles for service accounts (IRSA) and EKS Pod Identity. AWS recommends EKS Pod Identity "whenever possible". Pod Identity roles are not tied to a cluster OIDC provider; cross-account access needs role chaining, whereas IRSA can assume cross-account roles directly. | https://docs.aws.amazon.com/eks/latest/userguide/service-accounts.html ; https://docs.aws.amazon.com/eks/latest/best-practices/identity-and-access-management.html | Not captured | Two mechanisms coexist in most estates; trust policies referencing deleted clusters are a drift pattern. | aws-iam-exposure-assurance, identity-exposure-assurance |
| **(X)** AKS: Microsoft Entra pod-managed identity (preview) was deprecated 24 Oct 2022, project archived Sept 2023, managed add-on supported through Sept 2025. Replacement is Microsoft Entra Workload ID (federation via Kubernetes service account tokens). | https://learn.microsoft.com/en-us/azure/aks/use-azure-ad-pod-identity | Not captured | Clusters still on pod-managed identity are now out of support. | entra-id-exposure-assurance, identity-exposure-assurance |
| **(X)** Google Cloud recommends avoiding service account keys; prefer attached service accounts, Workload Identity Federation for GKE, or Workload Identity Federation. `constraints/iam.disableServiceAccountKeyCreation` is enforced by default for organisations created on or after 3 May 2024. Key expiry settings do not apply to existing keys. | https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys | Not captured | Older organisations are not covered by secure-by-default; pre-existing keys survive new policy. | identity-exposure-assurance, secrets-exposure-assurance |
| Kubernetes v1.22+ uses short-lived, automatically rotating, audience-bound service account tokens from the TokenRequest API via projected volumes. Earlier versions used long-lived static Secret-based tokens. Set `automountServiceAccountToken: false` where credentials are not needed. | https://kubernetes.io/docs/concepts/security/service-accounts/ | Live doc, read 2026-09-27 | Legacy Secret-based tokens that still exist are non-expiring credentials — a countable exposure. | identity-exposure-assurance, secrets-exposure-assurance |
| **(X)** SPIFFE and SPIRE are CNCF graduated projects (announced 20 Sept 2022). SPIFFE defines short-lived cryptographic identity documents (SVIDs); SPIRE issues them after workload attestation and rotates automatically. | https://www.cncf.io/announcements/2022/09/20/spiffe-and-spire-projects-graduate-from-cloud-native-computing-foundation-incubator/ ; https://spiffe.io/docs/latest/spiffe-about/overview/ | 2022-09-20 | Reference standard for secretless workload identity; evidence is attestation policy plus SVID lifetime. | identity-exposure-assurance |
| Azure mandatory MFA guidance tells customers to migrate user-based service accounts to workload identities (managed identities, service principals). | https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication | Updated 2026-07-06 | Human-shaped accounts doing machine work are a named anti-pattern. | entra-id-exposure-assurance, identity-access-drift |
| Microsoft Entra Agent ID supports non-Microsoft agents (AWS, GCP, n8n; Amazon Bedrock guide) via sidecar and federation patterns; migration guides exist for agents running as standard app registrations and Copilot Studio agents. | https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id | Updated 2026-08-13 | Agents built before Agent ID still run as ordinary app registrations and are invisible to agent-scoped policy. | identity-exposure-assurance, entra-id-exposure-assurance |
| Palo Alto Networks "2026 Identity Security Landscape" (2,900+ cybersecurity decision-makers surveyed): machine identities outnumber human identities "109:1". Vendor survey; methodology not shown on the landing page. | https://www.paloaltonetworks.com/idira/idira-identity-security-landscape | 2026 | Use as attributed vendor survey data only. Ratios vary widely by source; do not present as fact. | identity-exposure-assurance |

### 4. Privileged access

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Microsoft Entra Privileged Identity Management provides "time-based and approval-based role activation": just-in-time access, time-bound assignments with start and end dates, approval, justification, access reviews, downloadable audit history. Scopes: Microsoft Entra roles, Azure resource roles, PIM for Groups. | https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure | Live doc, read 2026-09-27 | PIM being licensed is not PIM being used; evidence is the ratio of eligible to permanent active assignments. | privileged-access-assurance, stale-privileged-access, entra-id-exposure-assurance |
| PIM role settings: activation maximum duration "can be from one to 24 hours"; settings allow permanent eligible and permanent active assignments unless expiry is configured. | https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings | Live doc, read 2026-09-27 | A 24-hour activation repeated daily is standing privilege in practice. Permanent active assignments are the measurable residue. | stale-privileged-access, privileged-access-assurance |
| Access reviews can recur "weekly, monthly, quarterly or annually". Microsoft names "too many users in privileged roles" and guests left in admin roles as review targets. Requires Entra ID Governance or Entra Suite (some capabilities with P2); reviews of inactive users need Entra ID Governance. | https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview | Live doc, read 2026-09-27 | A completed review is a point-in-time attestation; access granted the day after is unreviewed until the next cycle. | privileged-access-assurance, identity-access-drift |
| Continuous access evaluation: access tokens are valid for one hour by default; CAE enforces user termination, password change and network location change "in near real time" for enlightened services (Exchange Online, SharePoint Online, Teams). Critical event evaluation is available in any tenant. | https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation | Live doc, read 2026-09-27 | Revocation is only near-real-time for CAE-aware resources; elsewhere the token lifetime is the exposure window. | identity-exposure-assurance, entra-id-exposure-assurance |
| Emergency access accounts must be validated "at least every 90 days", with alerting on every sign-in and a post-use review. | https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access | Updated 2026-06-05 | Break-glass governance has three evidence types: sign-in test, alert fired, authorised-user list reviewed. | privileged-access-assurance |
| AWS root user: do not use for everyday tasks, "Don't create access keys for the root user", use multi-person approval for root sign-in where possible, use a group email address, restrict account recovery mechanisms, monitor access and usage. For Organizations, remove root credentials from member accounts. | https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html | Live doc, read 2026-09-27 | Root is AWS's break-glass; recovery paths (email, phone) are part of the privileged surface. | privileged-access-assurance, aws-iam-exposure-assurance |
| NIST SP 800-207 Zero Trust Architecture (August 2020): zero trust "assumes there is no implicit trust granted to assets or user accounts based solely on their physical or network location"; authentication and authorisation are discrete functions performed before a session is established. | https://csrc.nist.gov/pubs/sp/800/207/final | 2020-08 | Foundational reference; still current. Per-session evaluation is the basis for arguing standing access is an exception. | privileged-access-assurance, identity-exposure-assurance |
| CISA Zero Trust Maturity Model Version 2.0 (April 2023): five pillars and three cross-cutting capabilities, with traditional, initial, advanced and optimal stages. Identity pillar, Access Management: Traditional = "permanent access with periodic review"; Initial = access "that expires with automated review"; Advanced = "need-based and session-based access"; Optimal = "automation to authorize just-in-time and just-enough access tailored to individual actions and individual resource needs". Optimal authentication "continuously validates identity with phishing-resistant MFA, not just when access is initially granted". | https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf | 2023-04 | CISA classes permanent access with periodic review as the lowest maturity stage. Useful framing for standing privilege. | privileged-access-assurance, stale-privileged-access, identity-exposure-assurance |
| NIST SP 800-63-4 Digital Identity Guidelines final (July 2025) supersedes SP 800-63-3. SP 800-63B-4: "Verifiers SHALL offer at least one phishing-resistant authentication option at AAL2"; reauthentication overall timeout SHOULD be no more than 24 hours at AAL2, inactivity timeout no more than 1 hour; AAL3 requires a non-exportable private key and phishing resistance. | https://csrc.nist.gov/pubs/sp/800/63/4/final ; https://pages.nist.gov/800-63-4/sp800-63b/aal/ | 2025-07 | Gives defensible session-age thresholds for privileged sessions. Written for US federal systems. | privileged-access-assurance, identity-exposure-assurance |
| NIST SP 800-53 Release 5.2.0 issued 27 Aug 2025 (minor release focused on software update and patch security, responding to Executive Order 14306). SP 800-53A updated correspondingly; no change to SP 800-53B baselines. | https://csrc.nist.gov/News/2025/nist-releases-revision-to-sp-800-53-controls | 2025-08-27 | Cite as "SP 800-53 Rev. 5, Release 5.2.0". Access control families (AC-2, AC-6) unchanged in substance as far as verified. | privileged-access-assurance, vulnerability-remediation-assurance |
| OWASP Non-Human Identities Top 10 (2025): NHI1 Improper Offboarding, NHI2 Secret Leakage, NHI3 Vulnerable Third-Party NHI, NHI4 Insecure Authentication, NHI5 Overprivileged NHI, NHI6 Insecure Cloud Deployment Configurations, NHI7 Long-Lived Secrets, NHI8 Environment Isolation, NHI9 NHI Reuse, NHI10 Human Use of NHI. | https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/ | 2025 | Ready taxonomy for non-human privileged access findings. | privileged-access-assurance, identity-exposure-assurance, secrets-exposure-assurance |

### 5. Secrets exposure

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| GitGuardian "The State of Secrets Sprawl 2026": "28.65 million new hardcoded secrets" added to public GitHub commits in 2025, a "34% increase year over year". | https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/ | 2026-03-17 | Headline scale figure. Vendor report — attribute by name and year. | secrets-exposure-assurance, cyber-exposure-assurance |
| Same report: of credentials confirmed valid in 2022, nearly 70% were still valid in January 2025 and 64% in January 2026. | https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/ | 2026-03-17 | The strongest published evidence that detection without revocation is not closure. | secrets-exposure-assurance, unverified-vulnerability-closure, security-remediation-backlog |
| Same report: AI service secrets reached 1,275,105, up 81%; 24,008 unique secrets found in MCP configuration files, 2,117 of them valid; internal repositories roughly 6x more likely to contain hardcoded secrets than public; about 28% of incidents originate outside repositories (collaboration tools). | https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/ | 2026-03-17 | AI tooling config and chat/ticket systems are in scope for secrets assurance, not only source code. | secrets-exposure-assurance |
| Same report: commits co-authored with an AI coding assistant showed a 3.2% secret-leak rate against a 1.5% baseline; 59% of compromised machines in its Shai-Hulud 2 analysis were CI/CD runners. | https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/ | 2026-03-17 | Vendor-measured; read the full report for method before quoting. The source names a specific assistant. | secrets-exposure-assurance |
| GitHub has two types of push protection. Push protection for repositories "Requires GitHub Secret Protection to be enabled" and "Is disabled by default". Push protection for users is enabled by default and covers pushes to public repositories only. By default anyone with write access can bypass a repository block by giving a reason; a bypass creates an alert. Delegated bypass restricts this. | https://docs.github.com/en/code-security/concepts/secret-security/push-protection | Live doc, read 2026-09-27 | "Enabled" is a per-repository fact that drifts as repositories are created; bypass events are evidence of a control being overridden. Product name is GitHub Secret Protection. | secrets-exposure-assurance |
| **(X)** HCP Vault Secrets is being decommissioned; HashiCorp directs users to HCP Vault Dedicated. Search excerpts show end of sale 30 Jun 2025 and end-of-life dates of 27 Aug 2025 (pay-as-you-go) and 1 Jul 2026 or Flex contract expiry. Primary article now redirects to IBM support login. | https://developer.hashicorp.com/hcp/docs/vault-secrets/migrate-vault | 2025–2026 | Do not name HCP Vault Secrets as a current product. HashiCorp is now an IBM company. | secrets-exposure-assurance |
| **(X)** AWS Secrets Manager "managed external secrets" (announced Nov 2025) rotates third-party SaaS secrets without custom Lambda functions; extended to MongoDB Atlas and Confluent Cloud in Apr 2026. | https://aws.amazon.com/about-aws/whats-new/2025/11/aws-secrets-manager-managed-external-secrets ; https://aws.amazon.com/about-aws/whats-new/2026/04/secrets-manager-managed-external-secrets-mongodb-confluent/ | 2025-11 / 2026-04 | Rotation configured is not rotation succeeded; last-rotated timestamp is the evidence. | secrets-exposure-assurance, aws-iam-exposure-assurance |
| **(X)** Azure Key Vault publishes a "near expiry" event to Event Grid 30 days before secret expiry. Google Secret Manager rotation schedules only publish a Pub/Sub notification; the customer's own code performs the rotation. | https://learn.microsoft.com/en-us/azure/key-vault/secrets/tutorial-rotation ; https://docs.cloud.google.com/secret-manager/docs/secret-rotation | Not captured | A rotation schedule can exist while nothing rotates. Classic control-exists vs control-works gap. | secrets-exposure-assurance, cloud-security-exposure-assurance |
| Entra ID flags unused application credentials (30 days) and expiring service principal credentials as recommendations. **(X)** | https://learn.microsoft.com/en-us/entra/identity/monitoring-health/recommendation-remove-unused-credential-from-apps | Not captured | App registration secrets are the Entra form of secret sprawl. | secrets-exposure-assurance, entra-id-exposure-assurance |

### 6. Cloud security posture and exposure management

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Microsoft Security Exposure Management gives a unified view across endpoints, cloud resources and external attack surface in the Defender portal, with an enterprise exposure graph, attack paths (including hybrid), choke points, critical asset marking and initiatives. Microsoft says it aligns with "Gartner's Continuous Threat Exposure Management (CTEM) approach". Ingests Azure, AWS, GCP via Defender for Cloud and third-party data (ServiceNow CMDB, Tenable, Qualys, Rapid7). Public cloud only. | https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management | Updated 2026-07-26 | Exposure platforms show where risk is; they do not own closure or prove a fix held. That is the Xyvionix gap to describe. | cloud-security-exposure-assurance, cyber-exposure-assurance |
| Microsoft Defender for Cloud has two posture plans: Foundational CSPM (free) and Defender CSPM (paid, adds attack path analysis, security explorer, AI security posture, risk prioritisation). "Starting October 27, 2026, Foundational CSPM will move to an opt-in model and will no longer be enabled by default for new Azure subscriptions." | https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management | Live doc, read 2026-09-27 | From late Oct 2026 a new subscription can have no posture monitoring at all. Coverage becomes something to prove per subscription. | cloud-security-exposure-assurance, identity-access-drift |
| Defender for Cloud attack path analysis and cloud security graph need the Defender CSPM plan plus agentless scanning for VMs or Defender for Servers vulnerability assessment. | https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-attack-path | Live doc, read 2026-09-27 | Attack paths are only as complete as the scanning that feeds them. | cloud-security-exposure-assurance |
| AWS Security Hub (new generation) became generally available on 2 Dec 2025. It correlates signals from Security Hub CSPM control checks, Amazon Inspector, Amazon Macie and Amazon GuardDuty into exposure findings, uses OCSF, and shows an attack path graph. The former product is now "AWS Security Hub CSPM". | https://aws.amazon.com/about-aws/whats-new/2025/12/security-hub-near-real-time-risk-analytics/ ; https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub-v2.html | 2025-12-02 | Naming matters: "Security Hub" and "Security Hub CSPM" are different things in 2026. | cloud-security-exposure-assurance, aws-iam-exposure-assurance |
| Security Hub exposure findings assess network reachability (internet exposure and internal paths, security groups, network ACLs) and combine vulnerabilities, configurations, threats and resource relationships. | https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html | Live doc, read 2026-09-27 | An exposure can reopen when a reachability change restores the path without any new vulnerability. | cloud-security-exposure-assurance, unverified-vulnerability-closure |
| Google Security Command Center tiers are Standard-legacy, Standard, Premium and Enterprise (Deprecated). "The Security Command Center Enterprise service tier will shut down on May 21, 2027"; organisations move automatically to Premium. Standard has no additional charge. Risk Engine runs attack path simulations and reports toxic combinations. | https://docs.cloud.google.com/security-command-center/docs/service-tiers | Updated 2026-09-24 | Do not position SCC Enterprise as Google's current multicloud CNAPP tier without the deprecation note. | cloud-security-exposure-assurance |
| Google Cloud Threat Horizons Report H1 2026 (H2 2025 Mandiant engagements): threat actors "exploited identity issues to gain initial access in 83% of the incidents involving major cloud and SaaS-hosted environments"; 21% involved stolen human and non-human identities; 21% compromised third-party trusted relationships; 17% vishing; 7% improperly configured assets; 2% vulnerability exploitation. One case used AWS access keys suspected exposed in a 2022 incident. | https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026 | 2026 (H1 edition) | Cloud intrusions are identity-led; a key leaked in 2022 and used in late 2025 is the expiry argument in one sentence. Percentages are platform-agnostic cloud/SaaS cases, not all breaches. | cloud-security-exposure-assurance, identity-exposure-assurance, secrets-exposure-assurance |
| Same report describes an actor using LLMs to move from a developer's local environment to full cloud administration in under 72 hours by abusing OpenID Connect trust between a CI/CD provider and a cloud platform. | https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026 | 2026 (H1 edition) | Federation trust policies are exposure, not just secrets. Overly broad OIDC subject claims need continuous checking. | cloud-security-exposure-assurance, identity-exposure-assurance |
| Gartner CTEM: five steps commonly cited as scoping, discovery, prioritisation, validation, mobilisation. **(X)** Gartner's own article returned HTTP 403; only search excerpts of Gartner pages were seen, and "mobilization" was not in the excerpt. | https://www.gartner.com/en/articles/how-to-manage-cybersecurity-threats-not-episodes | Not captured | Use CTEM as a named Gartner framework; do not quote Gartner predictions or statistics. | cyber-exposure-assurance, cloud-security-exposure-assurance |
| Microsoft Entra Permissions Management (Microsoft's CIEM) was retired in 2025. **(X)** | https://learn.microsoft.com/en-us/entra/permissions-management/how-to-offboard-permissions-management | 2025 | Microsoft has no first-party multicloud CIEM product to name in 2026 copy. | cloud-security-exposure-assurance, entra-id-exposure-assurance |

### 7. Vulnerability remediation and verification

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| CISA BOD 26-04 "Prioritizing Security Updates Based on Risk" issued 10 Jun 2026. It supersedes and revokes BOD 22-01 (KEV, 2021) and BOD 19-02. The KEV Catalog continues and CISA keeps updating it. | https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk | 2026-06-10 | Any copy citing "BOD 22-01 due dates" as current is out of date. KEV remains a valid signal. | vulnerability-remediation-assurance, security-remediation-backlog, cyber-exposure-assurance |
| BOD 26-04 sets timelines from four SSVC-style decision points: publicly exposed, in KEV, automatable by adversary, technical impact (partial/total). Table 1 (16 rows, calendar days) uses only four outcomes: "3 days & forensic triage", "3 days", "14 days", "60 days", and "Fix on system upgrade". Examples: any KEV entry with total control and either exposed or automatable = 3 days & forensic triage; exposed + KEV + not automatable + partial control = 14 days; exposed, not KEV, not automatable, partial = 60 days; not exposed, not KEV, not automatable = fix on system upgrade. Table 1 is published as an image and was read directly. | https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk | 2026-06-10 | Applies to US federal civilian agencies only, but is the clearest public threshold model. Exposure status is an input, so exposure evidence must be current or the SLA is computed wrongly. | vulnerability-remediation-assurance, unverified-vulnerability-closure, security-remediation-backlog |
| BOD 26-04 requires agencies to tag all publicly reachable assets, attest quarterly to publicly exposed assets, and establish "internal validation and enforcement procedures". Metadata (KEV status, exploit automation, technical impact) comes from CISA's Vulnrichment programme. | https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk | 2026-06-10 | Regulator language that validation is distinct from remediation. | unverified-vulnerability-closure, vulnerability-remediation-assurance |
| NIST changed NVD operations on 15 Apr 2026: enrichment is prioritised for CVEs in CISA KEV (goal within one business day), software used in the federal government, and critical software under EO 14028. Unenriched CVEs published before 1 Mar 2026 moved to "Not Scheduled". NIST will no longer routinely add its own severity score where the CNA supplied one. | https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth | 2026-04-15 | Scanners relying on NVD CPE/CVSS enrichment have blind spots; "no findings" may mean "no data". | vulnerability-remediation-assurance, unverified-vulnerability-closure |
| Same NIST notice: CVE submissions rose 263% between 2020 and 2025; NIST enriched nearly 42,000 CVEs in 2025, 45% more than any prior year. | https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth | 2026-04-15 | Volume context for remediation backlog pages. | security-remediation-backlog |
| CVE Program funding: CISA extended the MITRE contract in Apr 2025 (to Mar 2026). CSO Online reported on 9 Mar 2026 that the CVE Board was told on 21 Jan 2026 there would be "no funding cliff in March"; CISA's acting director stated the programme "is fully funded". Secondary source. | https://www.csoonline.com/article/4142600/cve-program-funding-secured-easing-fears-of-repeat-crisis.html | 2026-03-09 | State governance risk factually; avoid alarmism. | vulnerability-remediation-assurance |
| EPSS is "a data-driven machine-learning model that estimates the probability that a published CVE will be exploited in the wild in the next 30 days"; scores 0–1 with percentiles, updated daily. | https://www.first.org/epss/ | Live page, read 2026-09-27 | EPSS changes daily, so a prioritisation decision has a short shelf life. Current model version not confirmed — see Could not verify. | vulnerability-remediation-assurance |
| CVSS v4.0 has Base, Threat, Environmental and Supplemental metric groups, with nomenclature CVSS-B, CVSS-BT, CVSS-BE, CVSS-BTE to stress that CVSS is not only the Base score. Supplemental includes Automatable, Recovery, Provider Urgency. | https://www.first.org/cvss/v4-0/ | Live page, read 2026-09-27 | Say which CVSS variant a threshold uses; v3.1 and v4.0 scores coexist in feeds. | vulnerability-remediation-assurance |
| Mandiant M-Trends 2026 (2025 investigations): exploits were the top initial infection vector at 32% for the sixth consecutive year; voice phishing 11%; prior compromise 10%; global median dwell time 14 days (11 in 2024); estimated mean time to exploit of -7 days; access hand-off to a secondary group fell to 22 seconds. | https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2026/ | 2026-03-24 | Patch SLAs measured in weeks are structurally behind; verification of compensating exposure controls matters. | vulnerability-remediation-assurance, cyber-exposure-assurance, security-remediation-backlog |
| Verizon 2026 Data Breach Investigations Report: "31% of breaches now start with software vulnerabilities, beating stolen passwords as the top way attackers get in." Verizon's release says this is the first time in the report's history. Shadow AI use rose from 15% to 45% of employees. | https://www.verizon.com/business/resources/reports/dbir/ ; https://www.verizon.com/about/news/breach-industry-wide-dbir-finds | 2026-05-19 | Exploitation overtaking credentials reframes remediation verification as a board-level topic. | vulnerability-remediation-assurance, cyber-exposure-assurance |
| Verizon 2026 DBIR Executive Summary (19th edition; more than 31,000 incidents, more than 22,000 confirmed breaches): "Only 26% of critical vulnerabilities" in the CISA KEV catalogue "were fully remediated by organizations in 2025, a drop from the previous year's 38%. The median time for full resolution went up to 43 days", from 32 days. Credential abuse as initial access is down to 13%. Ransomware is in 48% of breaches (44% prior); 69% of victims did not pay. | https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf | 2026-05 | The central statistic for remediation assurance: three quarters of KEV findings were not fully closed. Read from the PDF text. | vulnerability-remediation-assurance, security-remediation-backlog, unverified-vulnerability-closure |
| Same summary, third-party cloud exposure: "only 23% of third-party organizations fully remediated missing or improperly secured multifactor authentication (MFA)" on cloud accounts; for weak passwords and permission misconfigurations, time to resolve 50% of findings was "almost eight months". | https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf | 2026-05 | Identity and permission findings stay open far longer than patchable ones. Supports identity-exposure backlog pages. | identity-exposure-assurance, security-remediation-backlog, identity-access-drift |
| Microsoft guidance on token protection, CAE and AWS Security Hub all describe near-real-time re-evaluation; AWS says Security Hub lets teams "verify that remediation actions have reduced risk as expected". **(X)** | https://aws.amazon.com/blogs/aws/aws-security-hub-now-generally-available-with-near-real-time-analytics-and-risk-prioritization/ | 2025-12 | Platform vendors now use verification language; Xyvionix's distinction is cross-platform, owned closure. | unverified-vulnerability-closure, cloud-security-exposure-assurance |

### 8. Container and Kubernetes security

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| IngressNightmare: CVE-2025-1974, "rated 9.8 CVSS", lets anything on the Pod network exploit configuration injection through the ingress-nginx Validating Admission Controller, with "a good chance of taking over your Kubernetes cluster" without credentials. Fixed in ingress-nginx v1.12.1 and v1.11.5. | https://kubernetes.io/blog/2025/03/24/ingress-nginx-cve-2025-1974/ | 2025-03-24 | A patched controller redeployed from an old Helm values file or image tag silently regresses. | vulnerability-remediation-assurance, unverified-vulnerability-closure, cloud-security-exposure-assurance |
| Ingress NGINX retirement: "Best-effort maintenance will continue until March 2026. Afterward, there will be no further releases, no bugfixes, and no updates to resolve any security vulnerabilities". Existing deployments keep working; migrate to Gateway API or another controller. | https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ | 2025-11-11 | As of Sept 2026 any ingress-nginx in production is unsupported. "No open CVEs" there means "no one is fixing", not "safe". | vulnerability-remediation-assurance, cloud-security-exposure-assurance, security-remediation-backlog |
| runc container escape advisory GHSA-9493-h29p-rfm2 (published 5 Nov 2025): masked path abuse via mount race conditions; affected <=1.2.7, <=1.3.2, <=1.4.0-rc.2; patched 1.2.8, 1.3.3, 1.4.0-rc.3. Any attacker who can spawn containers with some control could reach host root. CVE identifier not captured in our read. | https://github.com/opencontainers/runc/security/advisories/GHSA-9493-h29p-rfm2 | 2025-11-05 | Runtime fixes land on nodes, not images; node pools and managed-service versions are the evidence. | vulnerability-remediation-assurance, unverified-vulnerability-closure |
| Kubernetes release support on 2026-09-27: 1.37 (latest 1.37.0, released 2026-08-26), 1.36, 1.35 and 1.34, with 1.34 end of life on 2026-10-27. | https://kubernetes.io/releases/ | Live page, read 2026-09-27 | Version support is evidence with a known expiry date; a compliant cluster becomes non-compliant by calendar alone. | cloud-security-exposure-assurance, vulnerability-remediation-assurance |
| Pod Security Standards define three profiles: Privileged, Baseline, Restricted, applied by the built-in Pod Security Admission controller in enforce, audit or warn mode per namespace. "PodSecurityPolicy was deprecated in Kubernetes v1.21, and removed from Kubernetes in v1.25." | https://kubernetes.io/docs/concepts/security/pod-security-standards/ ; https://kubernetes.io/docs/concepts/security/pod-security-policy/ | Live doc, read 2026-09-27 | A namespace in audit or warn mode has the control present but not enforcing. Mode is the threshold. | cloud-security-exposure-assurance |
| Validating Admission Policy is "Stable since Kubernetes v1.30": a declarative, in-process alternative to validating admission webhooks using CEL. | https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/ | Live doc, read 2026-09-27 | Admission policy failure modes (fail-open webhooks, exempt namespaces) decide whether the control works. | cloud-security-exposure-assurance |
| Falco, the CNCF runtime security project, reached Graduated maturity on 29 Feb 2024. | https://www.cncf.io/projects/falco/ | Live page, read 2026-09-27 | Runtime detection evidence is rule coverage and alert delivery, not agent install count. | cloud-security-exposure-assurance |
| "Distroless" images "contain only your application and its runtime dependencies", with no package managers or shells; images are signed with cosign. | https://github.com/GoogleContainerTools/distroless | Live repo, read 2026-09-27 | Minimal bases cut finding volume but only if rebuilds pick up new base digests. | vulnerability-remediation-assurance |
| CISA, NSA, FBI and international partners published "2026 Minimum Elements for a Software Bill of Materials (SBOM)" on 29 Jul 2026; it "updates and replaces" the 2021 NTIA minimum elements, following a 2025 public comment draft. | https://www.cisa.gov/resources-tools/resources/2026-minimum-elements-software-bill-materials-sbom | 2026-07-29 | Cite the 2026 document, not the 2021 NTIA one. An SBOM describes one build; it expires on the next. | vulnerability-remediation-assurance, security-trust |
| VEX: OpenVEX Specification v0.2.0 defines statuses `not_affected`, `affected`, `fixed`, `under_investigation`; `not_affected` must carry a justification or impact statement. CISA publishes "Minimum Requirements for Vulnerability Exploitability eXchange (VEX)". | https://github.com/openvex/spec/blob/main/OPENVEX-SPEC.md ; https://www.cisa.gov/resources-tools/resources/minimum-requirements-vulnerability-exploitability-exchange-vex | Live, read 2026-09-27 | A `not_affected` claim is an assertion that must be re-proven when code paths or configuration change. | unverified-vulnerability-closure, vulnerability-remediation-assurance |
| NSA and CISA Kubernetes Hardening Guide was last updated 30 Aug 2022 per CISA's alert. | https://www.cisa.gov/news-events/alerts/2022/03/15/updated-kubernetes-hardening-guide | 2022-08-30 | Still cited, but predates PSP removal being universal; pair with current Kubernetes docs. | cloud-security-exposure-assurance |

### 9. IaC security and DevSecOps controls

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| GitHub Actions: "Pinning an action to a full-length commit SHA is currently the only way to use an action as an immutable release." GitHub offers repository and organisation policies to require SHA pinning. `pull_request_target` and `workflow_run` with untrusted code "can be exploited to take over a repository". Anyone with write access can read all repository secrets. | https://docs.github.com/en/actions/reference/security/secure-use | Live doc, read 2026-09-27 | Pinning is a per-workflow fact that regresses with every new workflow file. Policy existence vs actual workflow content is the check. | secrets-exposure-assurance, cyber-exposure-assurance |
| CISA alert: tj-actions/changed-files (CVE-2025-30066) and reviewdog/action-setup@v1 (CVE-2025-30154) were compromised, disclosing secrets in workflow logs including access keys, GitHub PATs, npm tokens and private RSA keys. Patched in v46.0.1; both CVEs added to KEV on 26 Mar 2025. | https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction | 2025-03-26 (updated) | Upgrading the action closes the vulnerability; it does not close the exposure until every leaked secret is rotated. | secrets-exposure-assurance, unverified-vulnerability-closure |
| CISA alert on the npm "Shai-Hulud" self-replicating worm: "compromised over 500 packages"; harvested GitHub PATs and cloud API keys for AWS, GCP and Azure; CISA advised pinning dependencies to releases before 16 Sept 2025 and to "immediately rotate all developer credentials". | https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem | 2025-09-23 | Developer workstations and CI runners are credential stores. Closure means rotation evidence per credential. | secrets-exposure-assurance, cyber-exposure-assurance |
| SLSA specification Version 1.2, status Approved, has a Build Track and a Source Track. Build levels: L0 no guarantees, L1 provenance exists, L2 hosted build platform, L3 hardened builds. | https://slsa.dev/spec/v1.2/ ; https://slsa.dev/spec/v1.2/build-track-basics | Live, read 2026-09-27 | Cite "SLSA v1.2". Provenance proves how an artefact was built, not that the deployed artefact is the one attested. | security-trust, cyber-exposure-assurance |
| OWASP Top 10 CI/CD Security Risks uses identifiers CICD-SEC-1 to CICD-SEC-10, including CICD-SEC-2 Inadequate Identity and Access Management, CICD-SEC-4 Poisoned Pipeline Execution, CICD-SEC-6 Insufficient Credential Hygiene. | https://owasp.org/www-project-top-10-ci-cd-security-risks/ | Live page, read 2026-09-27 | Shared vocabulary for pipeline exposure findings. | secrets-exposure-assurance, cyber-exposure-assurance |
| OpenSSF Scorecard scores checks 0–10, including Pinned-Dependencies, Token-Permissions, Dangerous-Workflow, Branch-Protection, Signed-Releases. | https://github.com/ossf/scorecard | Live repo, read 2026-09-27 | A ready, automatable signal for pipeline control drift. | cyber-exposure-assurance, security-trust |
| Policy as code projects: Open Policy Agent graduated in CNCF on 29 Jan 2021; Kyverno graduated on 16 Mar 2026. | https://www.cncf.io/projects/open-policy-agent-opa/ ; https://www.cncf.io/projects/kyverno/ | Live, read 2026-09-27 | Kyverno can now be described as a CNCF graduated project. | cloud-security-exposure-assurance |
| Azure Policy assignments have an `enforcementMode`; `DoNotEnforce` evaluates without applying the effect. Exemptions have two categories, Mitigated and Waiver, and an optional expiration. Exempt resources "count toward overall compliance". | https://learn.microsoft.com/en-us/azure/governance/policy/concepts/assignment-structure ; https://learn.microsoft.com/en-us/azure/governance/policy/concepts/exemption-structure | Live doc, read 2026-09-27 | Compliance percentages can be green because of exemptions. Exemptions without expiry are permanent risk acceptance nobody re-approved. | cloud-security-exposure-assurance, identity-access-drift, security-remediation-backlog |
| AWS Control Tower implements "preventive, detective, and proactive controls". | https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html | Live doc, read 2026-09-27 | Correct AWS control taxonomy for copy. | aws-iam-exposure-assurance, cloud-security-exposure-assurance |
| HCP Terraform health assessments cover drift detection (real infrastructure vs configuration) and continuous validation (custom conditions still pass after provisioning). Available in Standard and Premium editions. | https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health | Live doc, read 2026-09-27 | Drift runs both ways: a console hotfix is reverted by the next apply, and an IaC fix is undone by a manual change. | unverified-vulnerability-closure, identity-access-drift |
| Azure mandatory MFA Phase 2 covers IaC tools; user identities running Terraform or similar must use MFA, so automation should use workload identities. | https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication | Updated 2026-07-06 | Pipelines still using a user account are both fragile and an identity exposure. | entra-id-exposure-assurance, identity-exposure-assurance |
| Verizon 2026 DBIR release: breaches involving a third party are "48% of all breaches", with third-party involvement "up 60%". | https://www.verizon.com/about/news/breach-industry-wide-dbir-finds | 2026-05-19 | Supply-chain exposure is now close to half of breaches in this dataset. | cyber-exposure-assurance, security-trust |

### 10. Evidence and audit

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| PCI DSS v4.0.1 is a limited revision with "no additional or deleted requirements"; PCI DSS v4.0 was retired on 31 December 2024, leaving v4.0.1 as the only active version. | https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1 | 2024-06 | Cite "PCI DSS v4.0.1". Any reference to v3.2.1 or v4.0 as current is wrong. | security-trust, cyber-exposure-assurance |
| PCI SSC blog: of the 64 new requirements in PCI DSS v4.x, "51 are future-dated and will be effective as of 31 March 2025". By Sept 2026 these have been mandatory for about 18 months. | https://blog.pcisecuritystandards.org/now-is-the-time-for-organizations-to-adopt-the-future-dated-requirements-of-pci-dss-v4-x | 2024 | Say "now in force", not "upcoming". Individual requirement numbers were not read from the standard — see Could not verify. | security-trust, privileged-access-assurance |
| ISO/IEC 27001:2022 transition: IAF MD 26:2022 sets a 36-month transition from the last day of the publication month, and states "All certifications based on ISO/IEC 27001:2013 shall expire or be withdrawn at the end of the transition period." BSI states the deadline as 31 October 2025. | https://iaf.nu/iaf_system/uploads/documents/IAF_MD_26_Transition_requirements_for_ISOIEC_27001-2022_09082022.pdf ; https://www.bsigroup.com/en-GB/products-and-services/standards/iso-iec-27001-information-security-management-system/ | 2022-08-09 (IAF) | The transition has ended. A 2013 certificate is no longer valid evidence. | security-trust |
| NIST Cybersecurity Framework 2.0 published 26 Feb 2024; scope widened to "all organizations", with new emphasis on governance and supply chains. It "does not prescribe how outcomes should be achieved". | https://csrc.nist.gov/pubs/cswp/29/the-nist-cybersecurity-framework-csf-20/final ; https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework | 2024-02-26 | CSF is outcome-based, which fits the Xyvionix claim: prove the outcome still holds. | cyber-exposure-assurance, security-trust |
| SEC cybersecurity disclosure rules (adopted 26 Jul 2023): material incidents disclosed under Item 1.05 of Form 8-K, generally due "four business days after a registrant determines that a cybersecurity incident is material"; Regulation S-K Item 106 requires annual description of risk management processes and board oversight. | https://www.sec.gov/newsroom/press-releases/2023-139 | 2023-07-26 | Annual statements about process effectiveness need evidence behind them. Any later amendment was not checked. | security-trust, cyber-exposure-assurance |
| NIS2 (Directive (EU) 2022/2555): on 7 May 2025 the Commission sent reasoned opinions to 19 Member States for failing to notify full transposition. A Commission press item dated 8 Jul 2026 reports referral of Ireland, Spain, France and the Netherlands to the Court of Justice for failing to transpose. | https://digital-strategy.ec.europa.eu/en/policies/nis-transposition | Read 2026-09-27 | NIS2 obligations depend on national law and are still uneven. Say "where transposed". | security-trust, cyber-exposure-assurance |
| EU DORA (Regulation 2023/2554) "entered into application on 17 Jan 2025", covering 20 types of financial entities and ICT third-party service providers. Critical ICT third-party providers fall under an oversight framework run by the ESAs as Lead Overseers. | https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en ; https://www.eba.europa.eu/activities/direct-supervision-and-oversight/digital-operational-resilience-act | Read 2026-09-27 | Financial-sector buyers need ongoing ICT risk evidence, including from providers. | security-trust, cyber-exposure-assurance |
| SOC reporting: AICPA describes SOC as "a suite of service offerings CPAs may provide in connection with system-level controls of a service organization". Criteria document is "2017 Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy (With Revised Points of Focus — 2022)". | https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2 ; https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022 | Read 2026-09-27 | Name the criteria correctly. The Type 1 / Type 2 definitions were not read from AICPA — see Could not verify. | security-trust |
| Azure Policy supports a manual effect with attestations and a designated evidence storage account (`evidenceStorages`). | https://learn.microsoft.com/en-us/azure/governance/policy/concepts/assignment-structure | Live doc, read 2026-09-27 | Platform-native attestation is self-declared and undated unless re-attested. | security-trust, cloud-security-exposure-assurance |
| CISA BOD 26-04 requires quarterly attestation of publicly exposed assets and seven-day reporting where reporting is not automated; CISA reassesses the timeline table once per fiscal year. | https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk | 2026-06-10 | A regulator-defined evidence cadence: weekly, quarterly, annual. | security-trust, vulnerability-remediation-assurance |
| Microsoft emergency access guidance has an "Auditability and compliance" section: alert on every use, post-mortem review after any use, validation drills at least every 90 days. | https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access | Updated 2026-06-05 | Example of vendor guidance that defines what operating evidence looks like. | security-trust, privileged-access-assurance |

### Terminology: current vs deprecated

| Current term (Sept 2026) | Deprecated / avoid | Note and source |
|---|---|---|
| Microsoft Entra ID | Azure Active Directory, Azure AD, AAD | Product family per Microsoft: Entra ID, Domain Services, Private Access, Internet Access, ID Governance, ID Protection, Verified ID, External ID, Workload ID, Agent ID. https://learn.microsoft.com/en-us/entra/fundamentals/what-is-entra |
| Microsoft Entra admin center | Azure AD portal | Same source. |
| Microsoft Graph; Microsoft Graph PowerShell SDK; Microsoft Entra PowerShell | Azure AD Graph API; MSOnline and AzureAD PowerShell modules | Azure AD Graph fully retired after 31 Aug 2025; MSOnline retired 30 May 2025. |
| Authentication methods policy | Legacy MFA policy, legacy SSPR policy, per-user MFA as the management model | Legacy policies cannot manage methods from 30 Sept 2025. |
| External MFA | External authentication methods (EAM); Conditional Access custom controls | GA under the new name Feb 2026. Custom controls do not satisfy mandatory MFA. |
| Passkey (FIDO2); synced passkey; device-bound passkey; passkey profiles | "FIDO2 security key" as the only passkey form | Synced passkeys GA March 2026. |
| Microsoft Entra Agent ID; agent identity; agent identity blueprint; agent's user account | "Agent service principal", "AI app registration" | GA April 2026. Registry converging into Microsoft Agent 365. |
| Microsoft Entra Workload ID; Workload Identities Premium | "Service account" for Entra objects | Managed identities and service principals are workload identities. |
| (no current Microsoft product) | Microsoft Entra Permissions Management | Retired 2025 (X). |
| Emergency access account (Microsoft's term); break-glass is accepted informal usage | — | Both appear in Microsoft docs. |
| AWS IAM Identity Center | AWS Single Sign-On (AWS SSO) | Rename not re-verified in this research; AWS docs read use only "IAM Identity Center". |
| AWS Security Hub (unified solution, GA 2 Dec 2025) and AWS Security Hub CSPM (posture checks) | "Security Hub" meaning only the CSPM standards service | Two distinct names. |
| Service control policies (SCPs), resource control policies (RCPs), declarative policies | Treating all as "SCPs" | Three AWS Organizations policy types. |
| EKS Pod Identity (recommended by AWS); IAM roles for service accounts (IRSA) still supported | IAM user access keys mounted into pods | (X) |
| Microsoft Entra Workload ID on AKS | Microsoft Entra pod-managed identity (pod identity) | Deprecated 2022; add-on support ended Sept 2025 (X). |
| Workload Identity Federation; Workload Identity Federation for GKE | Service account keys as default | (X) |
| Google Security Command Center Standard / Premium | Security Command Center Enterprise without caveat | Enterprise tier is marked Deprecated; shuts down 21 May 2027. |
| HCP Vault Dedicated; Vault Enterprise | HCP Vault Secrets | Decommissioned (X). HashiCorp support site now redirects to IBM. |
| GitHub Secret Protection (secret scanning, push protection) | Assuming secret scanning is sold only as "GitHub Advanced Security" | Push protection doc names Secret Protection as the prerequisite. Packaging history not re-verified. |
| CISA BOD 26-04 (issued 10 Jun 2026) | BOD 22-01 and BOD 19-02 as current directives | Both revoked. KEV Catalog itself continues. |
| 2026 Minimum Elements for an SBOM (CISA and partners, 29 Jul 2026) | 2021 NTIA SBOM minimum elements | Replaced. |
| PCI DSS v4.0.1 | PCI DSS v4.0, v3.2.1 | v4.0 retired 31 Dec 2024. |
| ISO/IEC 27001:2022 | ISO/IEC 27001:2013 | Transition ended 31 Oct 2025. |
| NIST SP 800-63-4 (July 2025) | SP 800-63-3 | Superseded. |
| NIST SP 800-53 Rev. 5, Release 5.2.0 | SP 800-53 Rev. 4 | Minor release 27 Aug 2025. |
| NIST CSF 2.0 | CSF 1.1 | Published 26 Feb 2024. |
| Pod Security Standards with Pod Security Admission; Validating Admission Policy | PodSecurityPolicy (PSP) | PSP removed in Kubernetes v1.25. |
| Gateway API, or a maintained ingress controller | Ingress NGINX (community ingress-nginx) | Retired March 2026; no further security fixes. |
| SLSA v1.2 (Build Track, Source Track; Build L0–L3) | "SLSA level 4" and other pre-1.0 level language | Status Approved. Build track tops out at L3 in v1.2. |
| CVSS v4.0 with CVSS-B / CVSS-BT / CVSS-BE / CVSS-BTE | "CVSS score" with no version or variant | v3.1 scores still circulate. |
| Exposure management; CTEM (Gartner) | "Vulnerability management" as a synonym for exposure management | Microsoft and AWS both use "exposure" product language. |

### Assurance angles

Original operating insight, derived from the findings above. These are Xyvionix positions, not sourced claims.

- **A closed ticket records an action; closure is a state.** Verizon's 2026 data shows only 26% of KEV vulnerabilities fully remediated. Verified closure needs an independent re-observation of the asset after the change, not the change record.
- **Closure evidence expires when the asset is rebuilt.** A patched host or container is replaced by the next image build, autoscale event or node pool upgrade. If the base image or Helm values still carry the old version, the finding returns with no new ticket. Evidence must bind to the artefact digest and be re-proven per deployment.
- **IaC and the console overwrite each other.** A console hotfix is reverted by the next apply; an IaC fix is undone by a manual change. Closure holds only when both the declared state and the observed state agree, checked after the next pipeline run.
- **Exposure status is an input to the deadline.** BOD 26-04 moves the same CVE between 3 days and "fix on system upgrade" depending on public exposure. A stale exposure inventory therefore produces a wrong SLA, so reachability evidence needs a shorter life than the SLA it drives.
- **A secret is closed when it is revoked, not when it is removed.** GitGuardian found 64% of secrets valid in 2022 still valid in January 2026. Deleting the line, rewriting history or closing the alert changes nothing. The proof is a failed authentication with the old value.
- **Rotation configured is not rotation performed.** Schedules in cloud secret stores can notify without rotating. The evidence that matters is the last successful rotation time and the consuming workload still working afterwards.
- **Access review evidence decays from the day it is signed.** A quarterly review says nothing about grants made the following week. Between reviews, the only valid evidence is a continuous diff of privileged assignments against the last attested baseline.
- **Just-in-time can hide standing privilege.** Eligible roles activated daily for the maximum duration, or approval by the same small group, are permanent access in practice. Measure activation frequency, duration and approver independence, not the count of eligible assignments.
- **Exclusions are the real policy.** Conditional Access exclusion groups, Azure Policy exemptions and scanner suppressions accumulate quietly. Each needs an owner, a reason and an expiry. An exclusion with no expiry is risk acceptance nobody renewed.
- **Break-glass evidence has a 90-day life.** Microsoft's own guidance sets the interval. Three things must be re-proven together: the account can sign in, the alert fires, and the list of authorised people is current.
- **Platform defaults move under a static configuration.** Mandatory MFA phases, Conditional Access enforcement changes and Foundational CSPM becoming opt-in from 27 October 2026 all change what an unchanged tenant actually does. Control effectiveness must be re-tested after vendor changes, not only after customer changes.
- **Coverage is evidence too.** Unused-access analysis, attack path analysis and agent Conditional Access are licensed or scoped features. "No findings" from an account, subscription or identity type that was never in scope is absence of data, not assurance.
- **"No CVE" can mean "no analyst".** With NVD enriching only priority CVEs and Ingress NGINX retired, a clean scan of unsupported or unenriched software proves little. Support status and data-source coverage belong in the evidence record.
- **Non-human identities have no leaver process.** Service principals, access keys, legacy Kubernetes tokens and agent identities outlive the project and the person who made them. Ownership is the first control to re-prove. An identity with no accountable human sponsor is already drifted.
- **Federation trust is an exposure surface.** Secretless does not mean riskless. An OIDC trust policy with a broad subject claim is equivalent to a shared credential. Trust conditions need the same review as secrets.
- **A vulnerability fix does not close the exposure it caused.** After tj-actions and Shai-Hulud, upgrading the component was step one. Closure required rotating every credential the compromised step could read. Remediation scope must follow the blast radius.
- **Remediation needs a named owner through to verification.** Verizon reports almost eight months to resolve half of third-party permission misconfigurations. Findings age when detection, fixing and verification sit with different teams and nobody owns the whole path.
- **Thresholds should be stated, not implied.** Fewer than five Global Administrators, 30 and 90 day unused-credential windows, 24-hour reauthentication at AAL2, 3/14/60-day remediation. Assurance is a measured value against a declared threshold, with the date it was last measured.

### Could not verify

Research limits: the web search quota and the page-summarising fetch tool were both exhausted part-way through. Later sources were fetched directly and read as raw text, which is why some pages expected in the brief are missing.

- **Rows marked (X)** in the tables: seen only as search-engine excerpts. Treat as leads, not quotable facts.
- **Microsoft Entra release notes after June 2026.** The "What's new" page read was last updated 2026-06-30. July to September 2026 changes were not read. Third-party blogs mention PIM custom extensions and Agent ID for Dataverse; unverified.
- **Microsoft Agent 365 licensing enforcement date.** Docs say enforcement "is coming soon"; no date found. Microsoft 365 E7 was seen only in a Message Center mirror (MC1395007), not on Microsoft Learn.
- **Token Protection on Apple platforms.** The same Microsoft page says Generally Available in one table and "Apple (Preview)" in another. Status is ambiguous.
- **AzureAD PowerShell module final shutdown date.** Only search excerpts (mid-October 2025).
- **Microsoft Entra Permissions Management retirement date** (1 Nov 2025) and the Delinea referral: search excerpts only.
- **Microsoft identity secure score** current behaviour and any rename: not researched.
- **Microsoft Digital Defense Report 2026.** Not found. Latest confirmed is the 2025 edition (published 16 Oct 2025). A 2026 edition may appear in October 2026.
- **CrowdStrike Global Threat Report 2026.** Not read; no statistics used.
- **AWS IAM "account access manager".** Appears in the IAM best practices page; launch date and scope not checked.
- **AWS IAM Identity Center rename history, IAM Roles Anywhere detail, IAM Access Analyzer unused-access window defaults.** Not read.
- **AWS root MFA grace period** (35 days) and **RCP service list**: search excerpts only.
- **EKS Pod Identity, AKS workload identity, GCP Workload Identity Federation detail.** Search excerpts only; Google Cloud docs pages are script-rendered and could not be read raw.
- **Scale of non-human identities.** Only the Palo Alto Networks survey figure (109:1) was read at source. Figures of 45:1, 80:1, 96:1 and 144:1 circulate and were not verified. The claim that 79 of the 109 are AI agents was not on the page read. "Idira" appears to be a Palo Alto Networks identity brand; not confirmed.
- **HCP Vault Secrets end-of-life dates.** HashiCorp's support article redirects to an IBM login. Dates are from search excerpts.
- **Azure Key Vault and Google Secret Manager rotation behaviour.** Search excerpts only.
- **EPSS current model version.** The FIRST EPSS page read does not state a version. A "version 4" talk at VulnCon 2025 was seen in a search excerpt. Do not name a version.
- **CVSS v4.0 publication date and adoption levels.** The FIRST page read shows no date. Adoption by NVD or vendors was not measured.
- **CVE Program funding mechanics.** Only CSO Online (secondary) was read. No CISA or MITRE primary statement was read. CVE Foundation status unclear.
- **NVD backlog size.** Figures of 27,000 to 29,000 appeared only in secondary excerpts. NIST's notice gives no count.
- **runc CVE identifiers** (CVE-2025-31133, CVE-2025-52565, CVE-2025-52881): the advisory GHSA-9493-h29p-rfm2 was read but the CVE number was not captured.
- **IngressNightmare naming and the other four CVEs.** The Kubernetes post does not use the name "IngressNightmare" in the text we extracted. The 40% adoption figure came from a summarised read.
- **M-Trends 2026 hours of investigation.** The summarised read said 500,000+; a secondary headline said 450,000. Not quoted.
- **Verizon 2026 DBIR full report.** Only the executive summary, landing page and press release were read.
- **Gartner CTEM.** Gartner pages returned HTTP 403. No Gartner definition, step list or prediction was read at source. Do not quote Gartner statistics.
- **CNAPP and CSPM market definitions.** No analyst source read.
- **PCI DSS v4.0.1 requirement text.** The standard sits behind a licence click-through. Requirement numbers for MFA, access review, system account management and patch timing were not read.
- **SOC 2 Type 1 and Type 2 definitions, and "operating effectiveness" wording.** AICPA pages are script-rendered. Only the SOC description and criteria title were read.
- **ISO/IEC 27001:2022 publication date and Amd 1:2024.** iso.org returned HTTP 403. The 31 Oct 2025 deadline is from BSI and IAF MD 26.
- **SEC cyber disclosure rule changes after 2023** and any 2025–2026 enforcement position: not checked.
- **NIS2 transposition count by country in Sept 2026** and the exact date of the Court referral: the Commission page shows a press item dated 8 Jul 2026 adjacent to the referral; treat the date as probable.
- **DORA critical third-party provider designations.** Not read.
- **Session recording guidance.** No authoritative source read. Do not attribute session recording requirements to NIST or CISA.
- **CIS Benchmarks, CIS Controls v8.1 and MITRE ATT&CK mappings.** Not researched in this pass.
- **Kyverno graduation date** (16 Mar 2026) and **Kubernetes 1.37** support dates were read from CNCF and kubernetes.io on 2026-09-27; they fall after the researcher's prior knowledge, so re-check if used prominently.

## Data platforms and technology value

Source file: `docs/research/09-data-and-finops.md`

Research date: 2026-09-27. Primary sources only; anything not confirmed from an authoritative source is listed under "Could not verify".

### 1. Databricks

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Databricks docs and product pages now name the platform "Databricks Data + AI Platform". "Data Intelligence Platform" no longer appears on the intro or platform product page (the old URL slug remains). | https://docs.databricks.com/aws/en/introduction/ ; https://www.databricks.com/product/data-intelligence-platform | Docs updated 2026-09-11 | Use "Databricks Data + AI Platform" or simply "Databricks"; avoid "Data Intelligence Platform" as current naming. | databricks-data-assurance |
| Delta Live Tables (DLT) is now "Lakeflow pipelines"; the open framework is "Spark Declarative Pipelines" (in Apache Spark from 4.1). No migration required; `import dlt` is replaced by `from pyspark import pipelines as dp`. | https://docs.databricks.com/aws/en/ldp/concepts/where-is-dlt ; https://docs.databricks.com/aws/en/ldp/ | Updated 2026-09-11 | Pipeline assurance content must not say "DLT" as current. Legacy code keeps running, so naming drift hides in estates. | databricks-data-assurance, data-pipeline-assurance |
| Lakeflow family: Lakeflow Connect (managed connectors), Lakeflow pipelines, Lakeflow Jobs (formerly Databricks Workflows), Lakeflow Designer (no-code, GA 2026-06-16). SQL alert task in Lakeflow Jobs GA 2026-06-29. | https://docs.databricks.com/aws/en/release-notes/product/2026/june | June 2026 | Each layer is a separate failure surface: ingestion, transformation, orchestration. | databricks-data-assurance, data-pipeline-assurance |
| Pipeline expectations: materialized views support expectations for data quality validation (2026-06-23). Unit testing for pipelines is Beta (July 2026); pipeline events system table is Beta (Aug 2026). | https://docs.databricks.com/aws/en/release-notes/product/2026/june ; https://docs.databricks.com/aws/en/release-notes/product/ | June to Sept 2026 | Expectations prove rule conformance at write time, not that the rule still matches business need. | data-quality-assurance, databricks-data-assurance |
| "Data quality monitoring" is the current umbrella: anomaly detection plus data profiling. "Data profiling was formerly known as Lakehouse Monitoring." Anomaly detection evaluates freshness and completeness (expected row count in the last 24 hours) from historical patterns. | https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-quality-monitoring/ | Updated 2026-09-11 | "Lakehouse Monitoring" is deprecated naming. Learned baselines drift with the data, so a gradual degradation can become the new normal. | data-freshness-assurance, data-quality-assurance, databricks-data-assurance |
| System tables: `system.billing.usage` and `system.billing.list_prices` GA; `system.access.table_lineage` and `column_lineage` GA, 365-day retention; `system.query.history` GA (Sept 2026); `system.access.audit` Public Preview; `system.data_quality_monitoring.table_results` Public Preview; `system.compute.node_timeline` 90-day retention. | https://docs.databricks.com/aws/en/admin/system-tables/ | Updated 2026-09-23 | Evidence sources for cost and lineage have retention limits: lineage older than 365 days is gone unless exported. | databricks-data-assurance, cloud-cost-assurance, schema-change-production-impact |
| External lineage GA (2026-06-08); Lakeflow Connect pipelines record source lineage automatically. | https://docs.databricks.com/aws/en/release-notes/product/2026/june | 2026-06-08 | Lineage beyond the platform boundary is now recordable, but only where configured. | data-assurance, schema-change-production-impact |
| Unity Catalog is open source under Apache 2.0 and is "currently a sandbox project with LF AI and Data Foundation". Compatible with the Hive metastore API and the Iceberg REST catalog API. Latest OSS release v0.6.0, published 2026-08-20: Spark 4.2 connector, metric views, SQL views as catalog objects, UC Delta API additions, Iceberg 1.11.0 dependency. | https://github.com/unitycatalog/unitycatalog ; https://github.com/unitycatalog/unitycatalog/releases/tag/v0.6.0 | 2026-08-20 | OSS Unity Catalog is pre-1.0 and is not feature-equal to the Databricks-managed service; do not imply parity. | databricks-data-assurance |
| Delta Lake 4.2.0 is the current release (blog dated 2026-04-17), built on Spark 4.1.0 and 4.0.1; atomic RTAS and dynamic partition overwrite on catalog-managed tables; synchronous UniForm Iceberg metadata generation. Delta 4.1.0 requires Java 17 and Spark 4.0.1+, drops Spark 3.5. | https://delta.io/blog/2026-04-17-delta-4-2-released/ ; https://github.com/delta-io/delta/releases/tag/v4.1.0 | 2026-04-17 | Table-format upgrades change reader/writer compatibility; older engines can lose access. | databricks-data-assurance, data-pipeline-assurance |
| Iceberg on Databricks: managed Iceberg tables in Unity Catalog, foreign Iceberg tables (read-only via federation), Iceberg REST Catalog API for external engines, Iceberg v3 deletion vectors. Iceberg v2 position and equality deletes are not supported; branching and tagging not available. | https://docs.databricks.com/aws/en/iceberg/ | Updated 2026-09-22 | Interoperability is conditional: a table written elsewhere with v2 deletes may not be readable. | databricks-data-assurance, data-assurance |
| Delta Sharing renamed to OpenSharing (2026-06-10). Vector Search renamed to AI Search (2026-06-01). | https://docs.databricks.com/aws/en/release-notes/product/2026/june | June 2026 | Current naming for sharing and retrieval; both matter for AI data dependency content. | databricks-data-assurance |
| Lakebase (managed Postgres) is GA, including for compliance security profile workspaces (HIPAA, C5, TISAX) as of March 2026. New instances default to Lakebase Autoscaling (scale-to-zero, branching, instant restore). Backup schedule and snapshots APIs are Beta (Sept 2026). | https://docs.databricks.com/aws/en/release-notes/product/2026/march ; https://www.databricks.com/blog/databricks-lakebase-generally-available | March to Sept 2026 | Operational data now sits on the same platform; restore capability exists but restore success still has to be exercised. | databricks-data-assurance, healthcare-data-assurance |
| Agent Bricks: Knowledge Assistant GA, Supervisor Agent GA, Agent Services Beta. "Mosaic AI" does not appear on the Agent Bricks docs page. AI Functions `ai_extract`, `ai_classify`, `ai_query` GA (June 2026). Managed agent memory Beta. | https://docs.databricks.com/aws/en/generative-ai/agent-bricks/ ; https://docs.databricks.com/aws/en/release-notes/product/2026/june | Updated 2026-09-15 | Agents read governed tables and indexes; stale sources produce confident wrong answers. | databricks-data-assurance, ai-cost-assurance |
| Cost and resilience controls released June 2026: Genie usage budgets with per-user limits (2026-06-04); managed disaster recovery Public Preview (2026-06-12); configurable recovery period for dropped managed tables, 0 hours to 30 days, Public Preview (2026-06-15); auto-TTL row deletion GA (2026-06-12). | https://docs.databricks.com/aws/en/release-notes/product/2026/june | June 2026 | A recovery period set to 0 hours removes the undo window; auto-TTL deletes must match retention policy. | databricks-data-assurance, cloud-cost-assurance, healthcare-data-assurance |
| Databricks Runtime 19 (Apache Spark 4.2.0) in Beta from 2026-06-15; Lakehouse Replay (Beta) replays workloads against upcoming runtimes. | https://docs.databricks.com/aws/en/release-notes/product/2026/june | 2026-06-15 | Runtime upgrades are a recurring change event that invalidates prior performance and correctness evidence. | databricks-data-assurance, data-pipeline-assurance |

### 2. Snowflake

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Data quality monitoring uses data metric functions (DMFs): system DMFs (freshness, volume, nullness, duplicates, accepted values) and custom DMFs. Expectations define pass/fail thresholds on DMF results. Anomaly detection covers volume and freshness. Default schedule hourly. Enterprise Edition required. Billed as serverless compute under "Data Quality Monitoring". Not supported on hybrid tables or streams. | https://docs.snowflake.com/en/user-guide/data-quality-intro | Fetched 2026-09-27 | DMFs measure at schedule time; between runs the state is unproven. Monitoring itself has a cost line that needs governing. | snowflake-data-assurance, data-quality-assurance, data-freshness-assurance |
| DMF FILTER: modify or clear a filter on an existing association, GA in release 10.32 (2026-09-05 to 09-09). | https://docs.snowflake.com/en/release-notes/new-features | Sept 2026 | Filters narrow what a check covers; a changed filter silently changes what the evidence proves. | snowflake-data-assurance, data-quality-assurance |
| Horizon Catalog is described as "the agentic catalog for all your data, whether it is inside or outside of Snowflake". Covers discovery, governance, data quality monitoring, column-level lineage (including external databases, BI tools and OpenLineage feeds), Iceberg REST Catalog API, catalog-linked databases. Horizon Catalog Explorer UI in Preview (2026-09-15); Iceberg Scan Plan API Public Preview (2026-09-10). | https://docs.snowflake.com/en/user-guide/snowflake-horizon ; https://docs.snowflake.com/en/release-notes/new-features | Sept 2026 | Lineage is the basis for blast-radius claims; coverage depends on which feeds are connected. | snowflake-data-assurance, schema-change-production-impact |
| Iceberg tables: Snowflake supports Iceberg spec versions 1, 2 and 3. Three catalog modes: Snowflake-managed, external catalog via catalog integration, catalog-linked database. Snowflake performs compaction only for Snowflake-managed tables. Row-level equality deletes unsupported. Fail-safe applies only to Iceberg tables on Snowflake storage, not customer-managed external volumes. Partition evolution GA (2026-09-18). | https://docs.snowflake.com/en/user-guide/tables-iceberg ; https://docs.snowflake.com/en/release-notes/new-features | Sept 2026 | Recovery and maintenance guarantees differ by catalog mode; externally managed tables carry the customer's own maintenance risk. | snowflake-data-assurance, data-assurance |
| Openflow is built on Apache NiFi. Deployment types: Snowflake Deployments (Snowpark Container Services) and BYOC. Second generation Openflow deployments and runtimes GA 2026-09-08; new deployments default to gen 2. | https://docs.snowflake.com/en/user-guide/data-integration/openflow/about ; https://docs.snowflake.com/en/release-notes/new-features | Sept 2026 | Ingestion is a managed service but connector health and source drift remain the customer's exposure. | snowflake-data-assurance, data-pipeline-assurance |
| Dynamic tables: "Target lag is a staleness target, not a refresh interval" and "Target lag is best-effort, not a guarantee." Minimum 60 seconds. A table with `TARGET_LAG = DOWNSTREAM` and no downstream consumers never refreshes and Snowflake produces no warning. EXPLAIN CHANGES GA (2026-09-15). | https://docs.snowflake.com/en/user-guide/dynamic-tables-target-lag | Fetched 2026-09-27 | Strong freshness proof point: configured lag is intent, actual lag is evidence. | data-freshness-assurance, data-pipeline-freshness-failure, snowflake-data-assurance |
| Snowpipe Streaming: Elastic Channels GA (2026-09-15); support for partitioned Iceberg tables GA (2026-09-24); event table monitoring added (2026-09-24). High-performance architecture supports Iceberg v2 and v3 tables. | https://docs.snowflake.com/en/release-notes/new-features ; https://docs.snowflake.com/en/user-guide/snowpipe-streaming/snowpipe-streaming-high-performance-overview | Sept 2026 | Channel-level errors and ingestion lag are the streaming freshness signals. | snowflake-data-assurance, data-freshness-assurance |
| AI naming: umbrella is "Snowflake Cortex". Current features: Cortex Agents, Cortex AI Functions (AISQL), Cortex Analyst, Cortex Search, Cortex Fine-tuning, Cortex Code, Cortex AI Guardrails, Snowflake CoWork. Snowflake CoWork was formerly Snowflake Intelligence (announced 2026-06-02). Cortex AI Gateway in Preview (2026-09-15). | https://docs.snowflake.com/en/guides-overview-ai-features ; https://www.snowflake.com/en/blog/snowflake-cowork-personal-work-agent/ | 2026-06-02; Sept 2026 | "Snowflake Intelligence" is deprecated naming. | snowflake-data-assurance, ai-cost-assurance |
| Time Travel: default 1 day; up to 90 days on Enterprise Edition and higher for permanent objects. Retention of 0 days deactivates Time Travel. | https://docs.snowflake.com/en/user-guide/data-time-travel | Fetched 2026-09-27 | Recovery window is a per-object setting that can be reduced without anyone noticing. | snowflake-data-assurance, healthcare-data-assurance |
| Fail-safe: non-configurable 7-day period, recoverable only by Snowflake, may take "several hours to several days". Fail-safe operations fail for tables containing data ingested by Snowpipe Streaming Classic. | https://docs.snowflake.com/en/user-guide/data-failsafe | Fetched 2026-09-27 | Fail-safe is not a customer-controlled recovery objective and should never be counted as one. | snowflake-data-assurance, data-assurance |
| Backups (formerly Snapshots): backup sets and backup policies; retention lock makes backups immutable and is irreversible; legal hold. GA. Retention lock and legal hold require Business Critical Edition or higher. Database roles included in backups (2026-09-18). | https://docs.snowflake.com/en/user-guide/backups | Sept 2026 | Immutable backups prove existence, not restorability or completeness. | snowflake-data-assurance, healthcare-data-assurance |
| Budgets: monthly spending limit for the account or custom object groups; notification when spend is projected to exceed the limit; default refresh interval 6.5 hours, low-latency budget 1 hour at 12 times the compute cost; custom actions via stored procedures; tag-based budgets. | https://docs.snowflake.com/en/user-guide/budgets | Fetched 2026-09-27 | A 6.5-hour refresh interval is the detection floor for spend overrun. | snowflake-data-assurance, cloud-cost-assurance, cloud-cost-anomaly |
| Resource monitors "work for warehouses only" and cannot track serverless features or AI services. Actions: notify, suspend, suspend immediate. | https://docs.snowflake.com/en/user-guide/resource-monitors | Fetched 2026-09-27 | The hard-stop control does not cover serverless and AI spend, where growth is fastest. | snowflake-data-assurance, ai-cost-spike, cloud-cost-assurance |
| Cost anomaly detection: needs at least 30 days of history; ignores accounts with under 10 credits in the last seven days; account and organisation level; notifications once daily. Custom anomaly monitors scoped by tag and service type are in Preview (release 10.29, Aug 2026), maximum 20 monitors per account. Per-user quotas GA (release 10.29). | https://docs.snowflake.com/en/user-guide/cost-anomalies ; https://docs.snowflake.com/en/release-notes/new-features | Aug to Sept 2026 | Organisation-level detection can miss offsetting spikes and dips; daily notification sets the response time floor. | cloud-cost-anomaly, snowflake-data-assurance |

### 3. Apache Kafka and Confluent

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Latest Apache Kafka release is 4.3.1 (2026-06-25). Supported releases listed: 4.3.1, 4.2.1 (2026-05-30), 4.1.2 (2026-03-17). The project aims for three releases a year. | https://kafka.apache.org/community/downloads/ | Fetched 2026-09-27 | Roughly 12 months of support per minor line; version currency is itself an expiring condition. | kafka-pipeline-assurance |
| Kafka 4.0.0 released 2025-03-18. "Apache Kafka 4.3 only supports KRaft mode - ZooKeeper mode has been removed." Broker upgrades to 4.x require KRaft mode with software and metadata versions at least 3.3.x; 3.9.x is the recommended stepping stone. 4.0 requires Java 17 for brokers, Connect and tools, Java 11 for clients and Streams. | https://kafka.apache.org/43/getting-started/upgrade/ ; https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/ | 2025-03-18; 4.3 docs | ZooKeeper-based clusters cannot upgrade in place to 4.x; they must migrate to KRaft on 3.x first. | kafka-pipeline-assurance, data-pipeline-assurance |
| Kafka 3.9.0 (2024-11-06) was "the final one in the 3.x line" and the final release to feature ZooKeeper mode. Apache Flink current release is 2.3.0 (release date not captured). | https://kafka.apache.org/blog/2024/11/06/apache-kafka-3.9.0-release-announcement/ ; https://flink.apache.org/downloads/ | 2024-11-06; fetched 2026-09-27 | 3.9.x is outside the three supported lines listed on the downloads page, so ZooKeeper-based clusters are on an unsupported version. | kafka-pipeline-assurance |
| Queues for Kafka (KIP-932, share groups) are production-ready in 4.2.0 (2026-02-17), with RENEW acknowledgement, strict and soft fetch limits and "comprehensive lag metrics". 4.3.0 (2026-05-22) adds share group tuning configs. | https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/ ; https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/ | 2026-02-17; 2026-05-22 | Share groups change ordering and redelivery behaviour; lag must be measured per share group as well as per consumer group. | kafka-pipeline-assurance |
| 4.3.0: 25 KIPs; deprecates the `streams-scala` module and the `group.coordinator.rebalance.protocols` broker config, both marked for removal in Kafka 5.0. 4.2.0 also corrected metric naming to the `kafka.COMPONENT` convention. | https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/ | 2026-05-22 | Metric renames break dashboards and alerts silently: the monitor stays green because it reads nothing. | kafka-pipeline-assurance |
| Tiered storage is GA. Limitations: no support for compacted topics; tiered storage must be disabled on all topics before disabling at broker level. Local and remote retention are configured separately (`local.retention.ms`, `retention.ms`). | https://kafka.apache.org/43/operations/tiered-storage/ | 4.3 docs | Replay and recovery depend on the remote tier being readable; retention settings define how far back evidence can be rebuilt. | kafka-pipeline-assurance, data-assurance |
| Delivery semantics: idempotent producer, transactions, `isolation.level=read_committed`. Exactly-once inside Kafka does not extend automatically to external systems; offsets and output must be coordinated. | https://kafka.apache.org/43/design/design/ | 4.3 docs | "Exactly-once" claims hold only within the transactional boundary; sinks need separate proof. | kafka-pipeline-assurance, data-quality-assurance |
| Schema Registry compatibility types: BACKWARD (default), BACKWARD_TRANSITIVE, FORWARD, FORWARD_TRANSITIVE, FULL, FULL_TRANSITIVE, NONE. Non-transitive modes check only against the latest version. Docs are for Confluent Platform 8.3. | https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html | Confluent Platform 8.3 docs | A subject set to NONE, or non-transitive checks across many versions, leaves replay of old data unprotected. | schema-change-production-impact, kafka-pipeline-assurance |
| IBM completed its acquisition of Confluent on 2026-03-17, approximately $11 billion, $31 per share in cash. | https://newsroom.ibm.com/2026-03-17-ibm-completes-acquisition-of-confluent,-making-real-time-data-the-engine-of-enterprise-ai-and-agents | 2026-03-17 | Confluent is now part of IBM; product names (Confluent Cloud, Confluent Platform) remain in use in docs. | kafka-pipeline-assurance |
| Confluent Cloud Q2 2026 launch (2026-05-19): dbt adapter for Confluent Cloud for Apache Flink GA; Streaming Agents GA; Real-Time Context Engine GA; managed MCP server GA; Schema IDs in Kafka headers GA; Tableflow additions (dead letter queue for JSON, CSFLE, observability metrics) GA. Tableflow materialises topics as Iceberg or Delta Lake tables. | https://www.confluent.io/blog/2026-q2-confluent-cloud-launch/ ; https://docs.confluent.io/cloud/current/topics/tableflow/overview.html | 2026-05-19 | Stream-to-table materialisation adds a second freshness boundary: topic lag and table commit lag. | kafka-pipeline-assurance, data-freshness-assurance |

### 4. Apache Airflow

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Latest Airflow is 3.3.2 (2026-09-17). 3.0.0 released 2025-04-22; 3.1.0 on 2025-09-25; 3.2.0 on 2026-04-07; 3.3.0 on 2026-07-06. | https://airflow.apache.org/docs/apache-airflow/stable/release_notes.html | 2026-09-17 | Four feature releases in about 15 months: orchestration behaviour is a moving baseline. | data-pipeline-assurance |
| Airflow 2 is end of life: limited maintenance from 2025-10-22, EOL 2026-04-22. Final line 2.11.x (2.11.2). Airflow 3 is the only maintained major version. | https://airflow.apache.org/docs/apache-airflow/stable/installation/supported-versions.html | Fetched 2026-09-27 | Any estate still on Airflow 2 in September 2026 runs an unsupported orchestrator with no security fixes. | data-pipeline-assurance, data-assurance |
| 3.0 architecture: Task Execution API and Task SDK, Edge Executor, scheduler-managed backfills, DAG versioning, rewritten React UI. "Task code can no longer directly import and use Airflow database sessions or models." | https://airflow.apache.org/docs/apache-airflow/stable/installation/upgrading_to_airflow3.html | Airflow 3.3.2 docs | Tasks that queried the metadata database directly break on upgrade; custom monitoring built on the metadata DB is affected. | data-pipeline-assurance |
| Removed in 3.0: SubDAGs, Sequential Executor, SLAs (replaced by Deadline Alerts), REST API v1 (use `/api/v2`), context variables such as `execution_date`. Datasets are renamed Assets (`airflow.sdk.Asset`). Must be on 2.7 or later before upgrading; Ruff AIR301/AIR302 rules flag breaking changes. | https://airflow.apache.org/docs/apache-airflow/stable/installation/upgrading_to_airflow3.html | Airflow 3.3.2 docs | Teams that relied on SLA misses for lateness detection lose that signal on upgrade unless Deadline Alerts are configured. | data-pipeline-assurance, data-pipeline-freshness-failure |
| Default changes: `catchup_by_default` is now False; `create_cron_data_intervals` defaults to False; a manually triggered run's data interval is not derived from `logical_date`. | https://airflow.apache.org/docs/apache-airflow/stable/installation/upgrading_to_airflow3.html | Airflow 3.3.2 docs | Same DAG code can process a different data window after upgrade: a silent correctness risk, not a failure. | data-pipeline-assurance, data-quality-assurance |
| Deadline Alerts (new in 3.1) need a reference, an interval and a callback. References include `DAGRUN_QUEUED_AT`, `DAGRUN_LOGICAL_DATE`, `FIXED_DATETIME`, `AVERAGE_RUNTIME`. Docs state they "should be considered experimental" and may change without warning. Documented at DAG-run level. 3.2 added synchronous callbacks; 3.3 added a Deadlines browsing page. | https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html | Airflow 3.3.2 docs | The replacement for SLAs is still experimental; lateness detection should not depend on it alone. | data-pipeline-freshness-failure, data-freshness-assurance |
| Event-driven scheduling: `AssetWatcher` monitors an external source and triggers an asset update. Only triggers inheriting `BaseEventTrigger` qualify. Examples: SQS, Kafka, Azure Service Bus, Google Cloud Pub/Sub. Triggers watching a permanently true state can cause infinite rescheduling. 3.3 added shared polling for sibling triggers. | https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/event-scheduling.html | Airflow 3.3.2 docs | Event-driven DAGs have no schedule to be late against; absence of an event looks identical to a quiet source. | data-pipeline-assurance, kafka-pipeline-assurance |
| 3.1 added Human in the Loop and decoupled Task SDK upgrades; 3.2 expanded asset partitioning and multi-team deployment, upgraded to SQLAlchemy 2.0; 3.3 added task and asset state store, pluggable retry policies, Task SDKs for Java and Go. | https://airflow.apache.org/docs/apache-airflow/stable/release_notes.html | 2026-07-06 | Provider and SDK versions now move independently of the scheduler, widening the compatibility matrix. | data-pipeline-assurance |

### 5. Apache Spark and dbt

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Latest Apache Spark feature release is 4.2.0 (2026-07-14), third release of the 4.x line. Maintenance releases 4.1.3 and 4.0.4 (2026-07-15), 3.5.9 (2026-07-16). No 4.3.x on the downloads page at research date. | https://spark.apache.org/downloads.html ; https://spark.apache.org/releases/spark-release-4-2-0.html | 2026-07-14 | Current version reference for all Spark statements. | data-pipeline-assurance, databricks-data-assurance |
| Spark 4.2.0: native GEOMETRY and GEOGRAPHY types; Change Data Capture with SQL `CHANGES` clause; Auto CDC in Spark Declarative Pipelines; Arrow-optimised Python UDFs on by default; Data Source V2 transactions and schema evolution for INSERT; metric views; runs on Java 25. | https://spark.apache.org/releases/spark-release-4-2-0.html | 2026-07-14 | Defaults changed (Arrow UDFs): same code can produce different type coercion or performance after upgrade. | data-pipeline-assurance, data-quality-assurance |
| Spark 4.0.0 changed defaults to ANSI SQL mode, JDK 17 and Scala 2.13; dropped Scala 2.12, JDK 8/11, Mesos, Python 3.8; added VARIANT type. | https://spark.apache.org/releases/spark-release-4-0-0.html | Spark 4.0.0 release notes | ANSI mode turns silent nulls and overflows into errors: jobs migrated from 3.x fail or change results. | data-pipeline-assurance, data-quality-assurance |
| Spark versioning policy: quarterly feature releases starting with 4.3.0; non-LTS feature releases maintained 6 months; LTS gets 18 months; 4.5.0 is designated the 4.x LTS; Spark 3.5.x extended LTS ends November 2027 (security fixes only). | https://spark.apache.org/versioning-policy.html | Fetched 2026-09-27 | A 6-month maintenance window means most self-managed Spark versions fall out of support within two quarters. | data-pipeline-assurance |
| dbt v2.0 is GA (2026-09-16): single Rust engine, `pip install dbt`. Naming: "The dbt Fusion engine is now just called dbt, and dbt Core v2 is now called dbt OSS." | https://docs.getdbt.com/blog/dbt-v2-is-ga ; https://docs.getdbt.com/blog/comparing-dbt-and-dbt-oss | 2026-09-16 | "dbt Fusion engine" and "dbt Core v2" are superseded names as of mid-September 2026. | data-pipeline-assurance, data-quality-assurance |
| Licensing: dbt OSS is Apache 2.0. The primary "dbt" distribution is proprietary (dbt Product Licensing Agreement), free to use, no login required. dbt Core v1.x stays Apache 2.0 with extended support through 1.13. ELv2 is no longer used. | https://www.getdbt.com/licenses-faq | Updated 2026-09-15 | Licence and distribution changed twice in 2026; procurement and platform teams need the current position. | data-pipeline-assurance |
| dbt v2 migration: upgrade first to dbt v1.12 or the Latest release track; test with `dbt parse --use-v2-parser`; use dbt-autofix. In v2, nesting test inputs under `arguments` is required. | https://docs.getdbt.com/blog/dbt-core-v2-is-here ; https://docs.getdbt.com/docs/build/data-tests | 2026-06-01 | Stricter language spec in v2 can reject project config that v1 silently accepted, including misconfigured tests that never ran. | data-pipeline-assurance, data-quality-assurance |
| Fivetran and dbt Labs completed their merger on 2026-06-01; combined company is "Fivetran + dbt Labs"; George Fraser CEO, Tristan Handy President. Announced with dbt State, dbt Wizard and Agents Schema. | https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents | 2026-06-01 | Refer to the company as Fivetran + dbt Labs; ingestion and transformation now share one vendor. | data-pipeline-assurance |
| dbt State (GA 2026-09-16) skips or clones nodes when logic and data have not changed, using warehouse metadata and model SQL. | https://www.fivetran.com/press/fivetran-dbt-labs-announces-new-capabilities-to-make-enterprise-data-agent-ready-at-dbt-summit-2026 ; https://docs.getdbt.com/blog/dbt-v2-is-ga | 2026-09-16 | A skipped model is not a re-verified model: skip logic relies on metadata being accurate. | data-freshness-assurance, cloud-cost-assurance |
| dbt data tests: four built-in generic tests (`unique`, `not_null`, `accepted_values`, `relationships`), plus singular tests and separate unit tests. "Data tests return a set of failing records." | https://docs.getdbt.com/docs/build/data-tests | Fetched 2026-09-27 | Tests prove assertions authors thought of, at build time only. | data-quality-assurance |
| dbt model contracts enforce column names, data types and constraints in a build-time preflight check. Constraint enforcement varies by platform: on Snowflake and Databricks, primary and foreign keys are definable but not enforced. Breaking changes detected: column removal, type change, constraint change. | https://docs.getdbt.com/docs/mesh/govern/model-contracts | Fetched 2026-09-27 | A declared constraint is not an enforced constraint; contracts cover shape, not content or timeliness. | schema-change-production-impact, data-quality-assurance |
| dbt source freshness uses `loaded_at_field`, `warn_after`, `error_after`. Guidance: run freshness jobs "with at least double the frequency of your lowest SLA". | https://docs.getdbt.com/docs/deploy/source-freshness | Fetched 2026-09-27 | Vendor-documented rule of thumb for check cadence against freshness objectives. | data-freshness-assurance, data-pipeline-freshness-failure |

### 6. Apache Iceberg

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Latest Apache Iceberg release is 1.11.0 (published 2026-05-20). | https://api.github.com/repos/apache/iceberg/releases ; https://iceberg.apache.org/releases/ | 2026-05-20 | Version reference. | data-assurance |
| Table spec: versions 1, 2 and 3 are complete and adopted; version 4 is under active development and not formally adopted. | https://github.com/apache/iceberg/blob/main/format/spec.md | Fetched 2026-09-27 | Do not describe v4 as available. | data-assurance, databricks-data-assurance, snowflake-data-assurance |
| v3 adds: nanosecond timestamp(tz), unknown, variant, geometry and geography types; default values; multi-argument transforms; row lineage (`_row_id`, `_last_updated_sequence_number`); binary deletion vectors; table encryption keys. v2 added row-level deletes via delete files. | https://github.com/apache/iceberg/blob/main/format/spec.md | Fetched 2026-09-27 | Upgrading a table to v3 can lock out engines that only read v2; row lineage gives a native change-tracking signal. | data-assurance, schema-change-production-impact |
| Engine support for v3 is uneven: Databricks supports v3 deletion vectors but not v2 position or equality deletes; Snowflake supports spec versions 1 to 3 but not row-level equality deletes. | https://docs.databricks.com/aws/en/iceberg/ ; https://docs.snowflake.com/en/user-guide/tables-iceberg | Sept 2026 | "Open format" does not mean every engine reads every table; interoperability has to be tested per table and per engine. | data-assurance, databricks-data-assurance, snowflake-data-assurance |
| Apache Polaris graduated to an Apache top-level project on 2026-02-19. It implements the Iceberg REST Catalog specification. Latest release 1.7.0 (2026-08-02): opt-in idempotency for table updates, OpenTelemetry event listener, Kafka event publishing. | https://polaris.apache.org/blog/2026/02/19/apache-polaris-graduates-to-top-level-project/ ; https://api.github.com/repos/apache/polaris/releases/latest | 2026-02-19; 2026-08-02 | "Apache Polaris (incubating)" is outdated. | data-assurance, snowflake-data-assurance |
| Catalog landscape: Unity Catalog exposes an Iceberg REST Catalog API; Snowflake Horizon Catalog exposes an Iceberg REST Catalog API; AWS Glue Data Catalog and Apache Polaris also serve Iceberg tables. Snowflake catalog-linked databases sync with remote REST catalogs. | https://docs.databricks.com/aws/en/iceberg/ ; https://docs.snowflake.com/en/user-guide/snowflake-horizon ; https://docs.aws.amazon.com/glue/latest/dg/table-optimizers.html | Sept 2026 | With several catalogs over the same files, the question is which catalog is authoritative for commits and access policy. | data-assurance |
| Iceberg maintenance: recommended tasks are expire snapshots, remove old metadata files, delete orphan files; optional are compact data files and rewrite manifests. Orphan file removal with a retention interval shorter than the longest write can delete files still being written. | https://iceberg.apache.org/docs/latest/maintenance/ | Iceberg 1.11.0 docs | Maintenance is both a cost control and a corruption risk; snapshot expiry also removes time-travel recovery points. | data-assurance, cloud-cost-assurance |
| AWS Glue Data Catalog offers three managed Iceberg table optimisers: compaction (binpack, sort, Z-order), snapshot retention, orphan file deletion. Snowflake performs maintenance only for Snowflake-managed Iceberg tables. | https://docs.aws.amazon.com/glue/latest/dg/table-optimizers.html ; https://docs.snowflake.com/en/user-guide/tables-iceberg | Fetched 2026-09-27 | Managed maintenance is opt-in and per table; tables outside it accumulate small files and storage cost. | data-assurance, cloud-cost-assurance |
| Format interoperability: Delta Lake 4.2.0 moves UniForm Iceberg metadata generation into the commit transaction (synchronous) rather than a post-commit hook. Confluent Tableflow writes topics as Iceberg or Delta Lake tables. | https://delta.io/blog/2026-04-17-delta-4-2-released/ ; https://docs.confluent.io/cloud/current/topics/tableflow/overview.html | 2026-04-17 | Before synchronous generation, Iceberg readers of Delta tables could lag the Delta commit; older versions still behave that way. | databricks-data-assurance, data-freshness-assurance |

### 7. Data observability, quality and lineage

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Monte Carlo's original five pillars of data observability: freshness, quality, volume, schema, lineage. (The pillar is named "quality"; "distribution" was the earlier label and is not used on the current page.) "Data downtime" is defined as "periods of time when data is partial, erroneous, missing, or otherwise inaccurate". | https://montecarlo.ai/blog-what-is-data-observability/ | Updated 2025-07-31 | Attribute the pillars to Monte Carlo; use "quality" not "distribution" if quoting. montecarlodata.com now redirects to montecarlo.ai. | data-assurance, data-freshness-assurance, data-quality-assurance |
| Monte Carlo monitors fall into five categories: Table, Metric, Validation, Job, Agent. Table monitors use metadata and start without configuration. Agent monitors use traces (Agent Evaluation, Agent Metric, Agent Trajectory, Agent Validation). Monitors can carry a data quality dimension: Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness. Vendor positions itself as "data + AI observability". | https://docs.getmontecarlo.com/docs/monitors-overview | Updated about Aug 2026 | Observability detects deviation from learned patterns; it does not state whether the business outcome is still met. | data-assurance, data-quality-assurance |
| Soda: current docs are "Soda v4". Offers ML-based data observability, data testing and data contracts. Soda Core is an open-source Python library and CLI for running data contracts and has no observability features; observability requires a Soda-hosted or self-hosted Runner. Soda defines data quality as completeness, accuracy, timeliness, uniqueness, consistency. | https://docs.soda.io/ | Updated about Aug 2026 | Soda's own framing: testing is proactive, observability is reactive. Assurance sits above both: is the evidence current and does it drive correction. | data-quality-assurance, data-assurance |
| Great Expectations: open-source library is "GX Core"; docs version 1.23.2 at research date. | https://docs.greatexpectations.io/docs/home/ | Fetched 2026-09-27 | Use "GX Core" for the library. | data-quality-assurance |
| Elementary describes itself as "The Data & AI Reliability Platform"; offers Elementary Cloud, a dbt package and tests, a Python SDK and Elementary OSS; now also connects directly to a warehouse without dbt; metadata-only architecture. | https://docs.elementary-data.com/ | Fetched 2026-09-27 | No longer accurate to call Elementary dbt-only. | data-quality-assurance |
| Anomalo positions as an "autonomous data management system" with agents for data quality, data insights, table observability and data documentation. | https://docs.anomalo.com/ | Fetched 2026-09-27 | Vendor category language is moving from "observability" to "agents"; keep Xyvionix language distinct. | data-quality-assurance |
| OpenLineage is an LF AI & Data Foundation Graduate project: "an open framework for data lineage collection and analysis". Core model: jobs, datasets, runs, extended by facets. Latest release 1.53.0 (2026-09-01) adds Spark 4.2 and Python 3.14 compatibility and several Databricks operation fixes. Integrations include Airflow, Spark, Flink, Hive, dbt, Great Expectations. | https://openlineage.io/docs/ ; https://github.com/OpenLineage/OpenLineage/releases/tag/1.53.0 | 2026-09-01 | Lineage is emitted at run time per integration; coverage gaps appear whenever an engine or integration version changes. | data-assurance, schema-change-production-impact |
| Snowflake Horizon Catalog lineage accepts OpenLineage feeds; Databricks supports external lineage (GA June 2026). | https://docs.snowflake.com/en/user-guide/snowflake-horizon ; https://docs.databricks.com/aws/en/release-notes/product/2026/june | 2026 | Platform lineage can be extended beyond the platform, but only for systems that emit it. | schema-change-production-impact, data-assurance |
| Open Data Contract Standard (ODCS, Bitol, Linux Foundation) latest release v3.2.0 (2026-09-08). Adds AI system context (how agents should use data, verification status, usage constraints), vectors for embeddings, variables for environment interpolation, deprecation mechanisms for fields and ports, new server types including Iceberg. Contract sections include schema, data quality, SLA, team, roles, servers, pricing. | https://github.com/bitol-io/open-data-contract-standard/releases/tag/v3.2.0 ; https://bitol-io.github.io/open-data-contract-standard/latest/ | 2026-09-08 | A contract states the promise; assurance is the continuing proof that the promise holds. ODCS now carries AI usage constraints, relevant to agent governance. | data-assurance, data-quality-assurance, schema-change-production-impact |
| Platform-native checks now cover the basics: Databricks anomaly detection (freshness, completeness), Snowflake DMFs (freshness, volume, nulls, duplicates, accepted values), dbt tests and contracts. | See sections 1, 2 and 5 | Sept 2026 | Basic detection is becoming a platform feature; the unaddressed gap is cross-platform evidence tied to business thresholds. | data-assurance |

### 8. AI data dependency

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Databricks AI Search (formerly Databricks Vector Search) builds an index from a Delta table, streaming table or managed Iceberg v3 table. Delta Sync indexes stay synced as the source is updated. A self-managed embedding index cannot be converted to a Databricks-managed one; embeddings must be recomputed in a new index. | https://docs.databricks.com/aws/en/vector-search/vector-search | Updated 2026-09-14 | Retrieval freshness is bounded by source table freshness plus index sync lag. Changing the embedding model invalidates the whole index. | data-freshness-assurance, databricks-data-assurance, ai-cost-assurance |
| Snowflake Cortex Search services are created with a `TARGET_LAG` (example in docs: 1 day), the amount of time service content should lag behind base data. Change tracking must be enabled on all underlying objects. A service can be suspended. | https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview | Fetched 2026-09-27 | The lag setting is a declared staleness tolerance for every answer the agent gives; it should trace to a business requirement. | data-freshness-assurance, snowflake-data-assurance |
| Amazon Bedrock knowledge bases: "Each time you add, modify, or remove files from your data source, you must sync the data source so that it is re-indexed". Syncing is incremental. | https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html | Fetched 2026-09-27 | Sync is an explicit action: a knowledge base with no recent sync serves deleted or superseded documents with no error. | data-freshness-assurance, data-pipeline-freshness-failure |
| Databricks Feature Store in Unity Catalog provides lineage, point-in-time joins and an Online Feature Store; models track lineage to training features and look up latest feature values at inference. Feature Views are in Public Preview. Workspace Feature Store is deprecated. | https://docs.databricks.com/aws/en/machine-learning/feature-store/ | Updated 2026-09-11 | "Latest feature value" is only as recent as the feature pipeline's last successful run. | databricks-data-assurance, data-freshness-assurance |
| Observability vendors now monitor agents as well as tables: Monte Carlo Agent monitors evaluate traces for output quality and operational metrics. | https://docs.getmontecarlo.com/docs/monitors-overview | Updated about Aug 2026 | Market recognises the data-to-agent dependency; failures upstream surface as answer quality problems downstream. | data-assurance, data-quality-assurance |
| Agent platforms sit directly on governed data: Databricks Agent Bricks Knowledge Assistant and Supervisor Agent (GA), managed agent memory backed by Lakebase (Beta); Snowflake Cortex Agents and Snowflake CoWork; Confluent Streaming Agents and Real-Time Context Engine (GA). | https://docs.databricks.com/aws/en/generative-ai/agent-bricks/ ; https://docs.snowflake.com/en/guides-overview-ai-features ; https://www.confluent.io/blog/2026-q2-confluent-cloud-launch/ | 2026 | Agents add no independent check on source data; a stale or wrong table becomes a stale or wrong action. | data-assurance, databricks-data-assurance, snowflake-data-assurance, kafka-pipeline-assurance |
| Unstructured data governance: Snowflake Openflow ingests "structured and unstructured text, images, audio, video, and sensor data"; Databricks Data Classification scans Unity Catalog tables and, in Beta, views (Sept 2026); Agent Bricks Supervisor Agent can use Unity Catalog volumes as subagent tools (June 2026). | https://docs.snowflake.com/en/user-guide/data-integration/openflow/about ; https://docs.databricks.com/aws/en/release-notes/product/ | 2026 | Documents in volumes and stages feed agents but usually lack owners, freshness targets and retention rules. | data-assurance, healthcare-data-assurance |
| ODCS v3.2.0 adds AI system context to data contracts: how agents should use data, verification status and usage constraints. | https://github.com/bitol-io/open-data-contract-standard/releases/tag/v3.2.0 | 2026-09-08 | A standard way to declare which data an agent may rely on; declaration still needs runtime proof. | data-assurance, data-quality-assurance |
| State of Tokenomics (Release Candidate 1.0, 2026-09-23): 39% are not confident they can connect AI spend to a measurable business outcome their CFO would accept; "measurement and data quality" was named as a challenge by 18%. | https://www.tokeneconomics.com/state-of-tokenomics/ | 2026-09-23 | AI value claims rest on measurement data whose quality is itself in question. | ai-cost-assurance, technology-value-assurance |

### 9. Data recovery and integrity

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Databricks: "Don't use table history as a long-term backup solution for data archival." Defaults: `logRetentionDuration` 30 days, `deletedFileRetentionDuration` 7 days. From Databricks Runtime 18.0, time travel queries older than `deletedFileRetentionDuration` are blocked. Applies to Delta Lake and Iceberg tables. | https://docs.databricks.com/aws/en/delta/history | Updated 2026-09-11 | Default point-in-time recovery is 7 days; corruption found on day 8 is not recoverable through time travel. | databricks-data-assurance, data-assurance |
| Databricks UNDROP recovers dropped Unity Catalog tables within a default 7-day recovery period, configurable at catalog or schema level (0 hours to 30 days, Public Preview June 2026). Primary and foreign key constraints are not recovered. | https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-syntax-ddl-undrop-table ; https://docs.databricks.com/aws/en/release-notes/product/2026/june | Updated 2026-09-11 | Recovery returns the table but not all its constraints; "restored" does not equal "as it was". | databricks-data-assurance, data-assurance |
| Databricks managed disaster recovery (Public Preview, 2026-06-12) replicates metadata and managed table data. Lakebase backup schedule and snapshots APIs are Beta (Sept 2026). | https://docs.databricks.com/aws/en/release-notes/product/2026/june ; https://docs.databricks.com/aws/en/release-notes/product/ | June to Sept 2026 | Preview features carry no production commitment; replication lag sets the real recovery point. | databricks-data-assurance |
| Snowflake recovery layers: Time Travel (1 day default, up to 90 days on Enterprise), Fail-safe (7 days, Snowflake-initiated only), Backups with retention lock and legal hold (Business Critical). | https://docs.snowflake.com/en/user-guide/data-time-travel ; https://docs.snowflake.com/en/user-guide/data-failsafe ; https://docs.snowflake.com/en/user-guide/backups | Fetched 2026-09-27 | Three mechanisms with different owners and time limits; only a test restore shows which one actually meets the recovery objective. | snowflake-data-assurance, healthcare-data-assurance |
| Deletion compliance on Databricks: for tables with deletion vectors, after DELETE "you must also run REORG TABLE ... APPLY (PURGE) to permanently delete underlying records"; VACUUM then removes old files. Delete in bronze first, then propagate to silver and gold. Without predictive optimisation or Lakeflow pipelines, VACUUM must be run manually. | https://docs.databricks.com/aws/en/security/privacy/gdpr-delta | Updated 2026-09-11 | A DELETE that succeeded is not proof of erasure: the data persists in files and history until purge and vacuum complete. | databricks-data-assurance, healthcare-data-assurance, data-assurance |
| Recovery and erasure conflict by design: time travel, Fail-safe and immutable backups keep data that a deletion request requires removed; Snowflake retention lock is irreversible. | https://docs.snowflake.com/en/user-guide/backups ; https://docs.databricks.com/aws/en/security/privacy/gdpr-delta | Sept 2026 | Retention settings must satisfy both recovery objectives and deletion deadlines; either can drift out of compliance when a setting changes. | healthcare-data-assurance, data-assurance |
| Iceberg snapshot expiry removes the snapshots that time travel and rollback depend on; orphan file deletion with too short a retention interval can remove files from in-progress writes. | https://iceberg.apache.org/docs/latest/maintenance/ | Iceberg 1.11.0 docs | Storage-cost maintenance directly reduces the recovery window. | data-assurance, cloud-cost-assurance |
| Kafka replay depends on topic retention; with tiered storage, local and total retention are set separately and compacted topics are not supported. | https://kafka.apache.org/43/operations/tiered-storage/ | Kafka 4.3 docs | Reprocessing after a bad deployment is only possible inside the retention window. | kafka-pipeline-assurance |
| Schema change controls: Schema Registry compatibility modes (default BACKWARD, non-transitive); dbt contracts flag column removal, type change and constraint change as breaking; Spark 4.2 adds schema evolution for INSERT in Data Source V2; Iceberg v3 adds default values. | https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html ; https://docs.getdbt.com/docs/mesh/govern/model-contracts ; https://spark.apache.org/releases/spark-release-4-2-0.html | 2026 | Each control guards one hop. Blast radius is a lineage question across hops, and additive changes that pass every check can still break consumers' logic. | schema-change-production-impact |
| Lineage evidence for blast radius: Databricks table and column lineage system tables retain 365 days; OpenLineage events must be collected by the customer. | https://docs.databricks.com/aws/en/admin/system-tables/ ; https://openlineage.io/docs/ | Sept 2026 | Consumers that run less often than the lineage retention window (annual jobs) can be invisible at change time. | schema-change-production-impact |
| HIPAA Security Rule, 45 CFR 164.308(a)(7): data backup plan (Required) to "create and maintain retrievable exact copies" of ePHI; disaster recovery plan (Required) to "restore any loss of data"; testing and revision procedures (Addressable). 45 CFR 164.316(b)(2)(i): retain required documentation for 6 years. | https://www.ecfr.gov/current/title-45/section-164.308 ; https://www.ecfr.gov/current/title-45/section-164.316 | eCFR current, fetched 2026-09-27 | "Retrievable exact copies" is a testable claim. The 6-year rule covers documentation, not medical records themselves. | healthcare-data-assurance |

### 10. FinOps Framework, State of FinOps, FOCUS

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| The FinOps Framework is updated annually and referred to as "FinOps Framework 2026" (published 2026-03-19, presented at the March 2026 FinOps Summit). It has no semantic version number. | https://www.finops.org/insights/2026-finops-framework/ | 2026-03-19 | Cite as "FinOps Framework 2026"; do not invent a version number. | technology-value-assurance, cloud-cost-assurance |
| Current FinOps definition: "FinOps is an operational framework and cultural practice which maximizes the business value of technology, enables timely data-driven decision making, and creates financial accountability through collaboration between engineering, finance, and business teams." Foundation mission changed from "Value of Cloud" to "Advancing the People who manage the Value of Technology". | https://www.finops.org/framework/ ; https://data.finops.org/ | 2026 | The definition now says "technology", not "cloud". Directly supports the Xyvionix "technology value" framing. | technology-value-assurance |
| Scopes: "A FinOps Scope is a defined segment of spending across technology categories, aligned to business constructs such as products, cost centers, or environment". Technology categories shown in the framework: Public Cloud, AI, SaaS, Data Platform, Private Cloud, Licenses, Data Center. Guidance pages exist for Public Cloud, SaaS, Data Center, Data Cloud Platforms and AI. "The Technology Category is the 'what.' The Scope is the 'why.'" | https://www.finops.org/framework/scopes/ ; https://www.finops.org/insights/2026-finops-framework/ | 2026-03-19 | Scopes are decision contexts, not infrastructure types. AI, SaaS and data centre are categories; the scope is the business construct across them. | technology-value-assurance, cloud-cost-assurance, ai-cost-assurance |
| Framework 2026 changes: new capability Executive Strategy Alignment; renames: Usage Optimization (was Workload Optimization), Governance, Policy & Risk (was Policy & Governance), Automation, Tools & Services (was FinOps Tools & Services), KPIs & Benchmarking (was Benchmarking), Architecting & Workload Placement (was Architecting for Cloud), Sustainability (was Cloud Sustainability). | https://www.finops.org/insights/2026-finops-framework/ | 2026-03-19 | Use current capability names. | technology-value-assurance, cloud-cost-assurance |
| Four domains: Understand Usage & Cost (Data Ingestion, Allocation, Reporting & Analytics, Anomaly Management); Quantify Business Value (Planning & Estimating, Forecasting, Budgeting, KPIs & Benchmarking, Unit Economics); Optimize Usage & Cost; Manage the FinOps Practice. Principles include "FinOps data should be accessible, timely, and accurate". | https://www.finops.org/framework/ | Fetched 2026-09-27 | Unit Economics and Anomaly Management are named capabilities; the principle on timely and accurate data is an assurance requirement in itself. | unit-economics-assurance, cloud-cost-anomaly |
| State of FinOps 2026: sixth annual survey, 1,192 respondents, representing $83bn+ annual cloud spend. 98% manage AI spend (63% in 2025, 31% in 2024). 90% manage SaaS or plan to (65% in 2025); licensing 64%; private cloud 57%; data centre 48%; 28% include or plan to include labour costs. | https://data.finops.org/ | 2026 | Verified headline numbers. Note the wording "manage or plan to" applies to SaaS. | technology-value-assurance, ai-cost-assurance |
| State of FinOps 2026: 78% of FinOps practices report into the CTO or CIO organisation; CFO reporting fell to 8%. Teams with VP-level and above engagement show 2 to 4 times more influence on technology selection. FinOps for AI is the top forward-looking priority; AI cost management is the most wanted skill. | https://data.finops.org/ | 2026 | Buyer for cost assurance sits in technology leadership, matching the CTO and FinOps leadership audience. | technology-value-assurance, cloud-cost-assurance |
| State of FinOps 2026: workload optimisation and waste reduction remain the top current priority but practitioners report diminishing returns ("We have hit the 'big rocks' of waste"). Top tool feature requested: granular monitoring of AI spend (tokens, LLM requests, GPU utilisation); second: pre-deployment architecture costing. Data cloud platforms and AI are the most actively managed SaaS/PaaS areas. | https://data.finops.org/ | 2026 | Supports moving the message from savings to sustained value proof. | technology-value-assurance, unit-economics-assurance, ai-cost-assurance |
| FOCUS 1.4 is the current specification, ratified 2026-06-04 (announced 2026-06-10). Adds 2 datasets (Invoice Detail, Billing Period), 47 columns, 6 attributes. Contract Commitment dataset grows from 13 to 30 columns. New Commitment Program Eligibility Details column. Zero incompatible changes; removes deprecated Provider Name and Publisher Name. | https://www.finops.org/insights/introducing-focus-1-4/ ; https://focus.finops.org/ | 2026-06-10 | FOCUS now covers invoice reconciliation and commitment structure, giving a standard basis for commitment coverage evidence. | cloud-cost-assurance, technology-value-assurance |
| FOCUS 1.4 defines data integrity behaviours: Correction Handling (Replacement, Delta, Ledger), Delivery Handling (Overwrite, Append), Dataset Completeness, Dataset Configuration. One rule for covering and covered charges so Effective Cost and Billed Cost sum to the same total. | https://www.finops.org/insights/introducing-focus-1-4/ | 2026-06-10 | Billing data is restated after first delivery; cost evidence for an open period is provisional. | cloud-cost-assurance, unit-economics-assurance |
| FOCUS describes itself as normalising billing datasets "across AI, cloud, SaaS, data center, and other technology vendors". Provider dataset versions listed: Snowflake, Databricks, MongoDB and Vercel at v1.3; AWS, Microsoft Azure, Google Cloud, IBM Cloud at v1.2; Oracle, Alibaba Cloud, CoreWeave at v1.0. FOCUS Validator supports 1.3; 1.4 support due later in Q3 2026. | https://focus.finops.org/ ; https://www.finops.org/insights/introducing-focus-1-4/ | Fetched 2026-09-27 | No provider is listed at 1.4 yet. Multi-cloud data arrives at mixed FOCUS versions, so column availability differs by provider. | cloud-cost-assurance |
| FOCUS 1.5 is in development: planned native AI support (model identity, input and output token consumption) and a Price Sheet dataset. | https://www.finops.org/insights/introducing-focus-1-4/ | 2026-06-10 | Token-level billing fields are not yet in the ratified standard. Do not state that FOCUS covers tokens today. | ai-cost-assurance |

### 11. Unit economics, anomaly detection and commitments

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| FinOps Unit Economics capability distinguishes resource efficiency unit metrics from business unit metrics (examples: cost per tenant, cost per transaction, cost to serve, cost per case resolved). Where revenue attribution is hard, outcome value proxies are used (demand, throughput, customer experience, risk reduction, service levels). Success is "whether unit economics is improving decisions and outcomes, not only whether dashboards exist". | https://www.finops.org/framework/capabilities/unit-economics/ | Fetched 2026-09-27 | A unit cost is a ratio of two datasets (cost and business volume); it is only valid while both are current and correctly joined. | unit-economics-assurance, technology-value-assurance |
| FinOps Allocation capability requires three strategies: allocation, tagging or metadata, and shared cost. Shifting left means ownership metadata is "enforced at the point a resource is created, not reconstructed later through tagging cleanup". | https://www.finops.org/framework/capabilities/allocation/ | Fetched 2026-09-27 | Allocation coverage decays as new resources are created; shared cost rules go stale when the consumers of the shared service change. | unit-economics-assurance, cloud-cost-assurance |
| AWS cost allocation tags (user-defined and AWS-generated) must be activated separately in the Billing console before they appear in Cost Explorer or cost allocation reports. | https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html | Fetched 2026-09-27 | A tag that exists on a resource but is not activated contributes nothing to allocation. | cloud-cost-assurance, unit-economics-assurance |
| AWS Cost Anomaly Detection runs about three times a day on net unblended cost. It relies on Cost Explorer data with up to 24 hours delay, so "it can take up to 24 hours to detect an anomaly after a usage occurs". New services need 10 days of history. It does not monitor AWS Marketplace products, except third-party foundation models on Amazon Bedrock. Root cause split by service, account, Region, usage type. | https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html | Fetched 2026-09-27 | Native detection has a floor of roughly a day; a runaway workload can spend for 24 hours or more before any alert. | cloud-cost-anomaly, ai-cost-spike |
| Azure Cost Management anomaly detection evaluates subscriptions daily against a forecast from the last 60 days (WaveNet model) and "runs 36 hours after the end of the day (UTC)". Subscription scope only. An anomaly alert email is sent once. Not available for Azure Government. No charge. | https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/analyze-unexpected-charges | ms.date 2025-06-26; page updated 2026-03-25 | Detection latency of 36 hours or more after day end; single notification means a missed email is a missed anomaly. | cloud-cost-anomaly |
| Google Cloud Billing anomaly detection covers all projects in a billing account or individual projects; thresholds for cost impact amount and deviation percentage are configurable; notifications by email and Pub/Sub; root cause analysis available. Thresholds for "early anomalies" are system-defined. | https://cloud.google.com/billing/docs/how-to/manage-anomalies | Updated 2026-09-24 | Thresholds are set per billing account and can hide small but persistent drift. | cloud-cost-anomaly |
| Snowflake cost anomaly detection needs 30 days of history and notifies once daily; budgets refresh every 6.5 hours by default. Databricks offers budgets for Genie usage and billing system tables. | See sections 1 and 2 | Sept 2026 | Data platform spend has its own detection tools, separate from cloud provider tools; anomalies split across both can evade each. | cloud-cost-anomaly, snowflake-data-assurance, databricks-data-assurance |
| AWS offers four Savings Plans types: Compute (up to 66%), EC2 Instance (up to 72%), SageMaker AI (up to 64%) and Database Savings Plans (up to 35%). Database Savings Plans cover Aurora, RDS, DynamoDB, ElastiCache, DocumentDB, Neptune, Keyspaces, Timestream, DMS (docs also list OpenSearch Service); 1-year term, one payment option. "The terms of the commitment can't be changed after purchase." | https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html ; https://aws.amazon.com/savingsplans/faqs/ | Fetched 2026-09-27 | Database commitments are now spend-based and flexible across engines, which changes the coverage calculation for data estates. | cloud-cost-assurance, technology-value-assurance |
| AWS Savings Plans return: only plans with hourly commitment of $100 or less, purchased in the past 7 days and in the same calendar month. Utilisation and coverage reports and Savings Plans budgets are available. | https://aws.amazon.com/savingsplans/faqs/ ; https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-monitoring.html | Fetched 2026-09-27 | Commitments are effectively irreversible; the decision evidence (usage forecast) must be sound at purchase and re-checked through the term. | cloud-cost-assurance |
| Azure has two savings plans: savings plan for compute and savings plan for databases, 1-year or 3-year. Hourly commitment; "Unused commitment for an hour expires and does not roll over." "Savings plan purchases can't be canceled or refunded." | https://learn.microsoft.com/en-us/azure/cost-management-billing/savings-plan/savings-plan-compute-overview | ms.date 2026-09-14 | Utilisation is judged hour by hour; an under-used hour is a permanent loss. | cloud-cost-assurance |
| Azure reservation exchange policy: "Starting February 1, 2027, reservations purchased after this date aren't eligible for exchange if the corresponding service is supported by savings plans." Earlier purchases keep one final exchange. Cancellation limit remains 50,000 USD per rolling 12 months. | https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/exchange-and-refund-azure-reservations | ms.date 2026-07-22 | Dated policy change: reservation flexibility assumptions in current commitment strategies expire on 2027-02-01. | cloud-cost-assurance, technology-value-assurance |
| Google Cloud CUDs are spend-based or resource-based. Some spend-based CUDs migrate automatically to a new consumption model that applies discounts directly instead of credits; the billing data model gained a Consumption Model field. Flexible Savings Plans provide cross-product spend-based discounts. | https://cloud.google.com/docs/cuds ; https://docs.cloud.google.com/docs/cuds-multiprice | Updated 2026-09-24 | A billing model change alters how cost appears in exports; reports built on credit fields can break or misstate savings. | cloud-cost-assurance, unit-economics-assurance |
| FinOps Rate Optimization: report "coverage and vacancy"; rate and usage optimisation interact, and acting on both recommendations can double count savings or strand commitments. FOCUS 1.4 adds commitment eligibility to compute eligibility-adjusted coverage. | https://www.finops.org/framework/capabilities/rate-optimization/ ; https://www.finops.org/insights/introducing-focus-1-4/ | 2026 | Rightsizing after a commitment purchase reduces utilisation; the two decisions need joint evidence. | cloud-cost-assurance, technology-value-assurance |

### 12. AI FinOps

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| FinOps for AI is a Technology Category in FinOps Framework 2026. It addresses "cost complexity, faster development cycle, spend unpredictability, and the need for a greater degree of policy and governance". Anomalies "carry more risks and require more attention" and there is "higher volatility and more difficulty in establishing correct criteria for defining anomalies". | https://www.finops.org/framework/technology-categories/ai/ | Fetched 2026-09-27 | Foundation guidance itself says AI anomaly thresholds are hard to set; static thresholds age quickly. | ai-cost-assurance, ai-cost-spike |
| FinOps for AI allocation challenges: "Lack of generally accepted frameworks for cost allocation across multi-agent workloads" and inconsistent vendor billing information. KPIs defined include Cost per Inference (total inference costs divided by inference requests), Cost per Token, training efficiency and token consumption efficiency. | https://www.finops.org/framework/technology-categories/ai/ | Fetched 2026-09-27 | Verified KPI names and formulas for AI unit economics content. | ai-cost-assurance, unit-economics-assurance |
| FinOps for AI rate guidance: bursty early usage argues against commitments, "but resource scarcity may require commitments"; more attention to unused capacity; wider use of quotas, reserved capacity and throttles. | https://www.finops.org/framework/technology-categories/ai/ | Fetched 2026-09-27 | Capacity is committed to secure supply, not only price, so under-utilisation risk is accepted knowingly and must be tracked. | ai-cost-assurance, technology-value-assurance |
| FinOps Foundation paper on token pricing: output tokens often cost three to five times more than input tokens; "Context Window Creep" means each turn resends the full history, so input tokens dominate spend in conversational and agentic systems; images in history are re-billed each turn; explicit prompt caching charges a write fee. | https://www.finops.org/wg/genai-finops-how-token-pricing-really-works/ | Publication date not captured | Cost per interaction rises with conversation length and agent loops; a unit cost measured at launch does not hold as usage patterns change. | ai-cost-spike, ai-cost-assurance, unit-economics-assurance |
| State of FinOps 2026: top AI challenges are visibility into AI costs, allocating AI costs to business units, and determining AI value or ROI. Top requested tool feature is granular monitoring of AI spend (tokens, LLM requests, GPU utilisation). | https://data.finops.org/ | 2026 | Verified market need for token-level and GPU-level evidence. | ai-cost-assurance |
| State of Tokenomics (Tokenomics Foundation, Release Candidate 1.0, 2026-09-23; 472 responses): 39% not confident they can connect AI spend to a business outcome a CFO would accept; 12% have no defined owner for AI economics; 86% are evaluating or using a model router; providers are asked for granular data (23%) far more than lower prices (4%). Promoted on finops.org. | https://www.tokeneconomics.com/state-of-tokenomics/ | 2026-09-23 | Release candidate status: cite with that caveat. Evidence that AI value proof, not price, is the gap. | ai-cost-assurance, technology-value-assurance |
| Amazon Bedrock application inference profiles let users attach tags to track costs for on-demand model invocation and collect usage metrics via CloudWatch. | https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html | Fetched 2026-09-27 | Token cost allocation depends on callers using the profile; direct model calls bypass attribution. | ai-cost-assurance, unit-economics-assurance |
| Databricks Unity Gateway (docs title "AI governance with Unity Gateway"): rate limits, budgets with per-user thresholds and hard caps, spend attribution by user, team or project using service tags and request tags. Genie usage budgets added 2026-06-04. | https://docs.databricks.com/aws/en/ai-gateway/ ; https://docs.databricks.com/aws/en/release-notes/product/2026/june | Updated 2026-09-22 | Hard caps stop spend but also stop service; the threshold needs to reflect business tolerance for both. | ai-cost-assurance, ai-cost-spike, databricks-data-assurance |
| Snowflake: resource monitors do not cover serverless features or AI services; per-user quotas GA (Aug 2026); Cortex AI Gateway in Preview (2026-09-15). | https://docs.snowflake.com/en/user-guide/resource-monitors ; https://docs.snowflake.com/en/release-notes/new-features | Sept 2026 | The established Snowflake cost control does not apply to AI spend. | ai-cost-spike, snowflake-data-assurance |
| Azure provisioned throughput (PTU) for Foundry Models is billed hourly per PTU deployed "regardless of the number of tokens consumed", or through Azure Reservations. "Having PTU quota doesn't guarantee that capacity is available." Spillover routes overflow to a standard deployment. | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/provisioned-throughput | ms.date 2026-07-15 | Fixed cost with variable use: utilisation is the assurance metric. Spillover moves overflow to pay-as-you-go, creating a second, unplanned cost line. | ai-cost-assurance, ai-cost-spike |
| AWS EC2 Capacity Blocks for ML reserve GPU instances for a future date, start time up to eight weeks ahead, for short-duration workloads. "Capacity Block cancellations aren't allowed." | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-blocks.html | Fetched 2026-09-27 | GPU commitment is non-cancellable; if the training job is not ready on the start date, the spend is lost. | ai-cost-assurance, technology-value-assurance |
| FOCUS 1.4 has no native token fields; AI model identity and input and output token consumption are scoped for FOCUS 1.5. | https://www.finops.org/insights/introducing-focus-1-4/ | 2026-06-10 | Token cost allocation today relies on provider-specific usage data joined to billing. | ai-cost-assurance |

### Terminology: current vs deprecated

| Current term (September 2026) | Deprecated or superseded term | Note and source |
|---|---|---|
| Databricks Data + AI Platform | Databricks Data Intelligence Platform | Current docs and product page use "Data + AI Platform". No rename announcement located; see Could not verify. |
| Lakeflow pipelines; Spark Declarative Pipelines (open framework) | Delta Live Tables, DLT; Lakeflow Declarative Pipelines (2025 interim name) | docs.databricks.com/aws/en/ldp/concepts/where-is-dlt |
| Lakeflow Jobs | Databricks Workflows, Databricks Jobs | Databricks release notes 2026 |
| Data quality monitoring (anomaly detection, data profiling) | Lakehouse Monitoring | "Data profiling was formerly known as Lakehouse Monitoring." |
| OpenSharing | Delta Sharing | Renamed 2026-06-10 |
| Databricks AI Search | Databricks Vector Search; Mosaic AI Vector Search | Renamed 2026-06-01 |
| Agent Bricks | Mosaic AI Agent Framework (as headline brand) | "Mosaic AI" absent from Agent Bricks docs page |
| Unity Gateway (docs title) | Mosaic AI Gateway; AI Gateway | docs.databricks.com/aws/en/ai-gateway/ |
| Databricks Feature Store (Unity Catalog) | Workspace Feature Store | Marked deprecated in docs |
| Snowflake CoWork | Snowflake Intelligence | Renamed 2026-06-02 |
| Snowflake Backups | Snowflake Snapshots | docs.snowflake.com/en/user-guide/backups |
| Cortex AI Functions (AISQL) | Cortex LLM functions | Snowflake AI features overview |
| Apache Kafka 4.x, KRaft only | ZooKeeper mode | Removed in 4.0; 3.9 was the last ZooKeeper release |
| Share groups (Queues for Kafka) alongside consumer groups | "Kafka cannot do queues" | Production-ready in 4.2.0 |
| Confluent (part of IBM since 2026-03-17) | Confluent as independent public company | IBM newsroom |
| Airflow 3 Assets | Airflow Datasets | `airflow.sdk.Asset` |
| Airflow Deadline Alerts (experimental) | Airflow SLAs, `sla_miss_callback` | SLAs removed in 3.0 |
| Airflow REST API v2 | REST API v1 | Removed in 3.0 |
| Airflow `logical_date` | `execution_date` | Context variable removed |
| dbt (v2, Rust engine, proprietary licence, free) | dbt Fusion engine | Renamed 2026-09-16 |
| dbt OSS (Apache 2.0) | dbt Core v2 | Renamed 2026-09-16; dbt Core v1.x continues through 1.13 |
| dbt platform | dbt Cloud | Used in dbt docs; rename date not verified in this research |
| Fivetran + dbt Labs | dbt Labs (as independent company) | Merger completed 2026-06-01 |
| dbt `data_tests:` | `tests:` | Old key still accepted as alias |
| Apache Polaris (top-level project) | Apache Polaris (incubating) | Graduated 2026-02-19 |
| Iceberg v3 deletion vectors | v2 position delete files | v2 still valid; engine support differs |
| GX Core, GX Cloud | "Great Expectations OSS" | docs.greatexpectations.io |
| montecarlo.ai | montecarlodata.com | Domain redirects |
| FinOps Framework 2026; "value of technology" | "Cloud FinOps"; "value of cloud" | finops.org |
| Usage Optimization | Workload Optimization | Framework 2026 |
| Governance, Policy & Risk | Policy & Governance | Framework 2026 |
| Architecting & Workload Placement | Architecting for Cloud | Framework 2026 |
| KPIs & Benchmarking | Benchmarking | Framework 2026 |
| Sustainability | Cloud Sustainability | Framework 2026 |
| Automation, Tools & Services | FinOps Tools & Services | Framework 2026 |
| FOCUS 1.4: Service Provider Name, Host Provider Name, Invoice Issuer Name | Provider Name, Publisher Name | Removed in FOCUS 1.4 |
| Amazon SageMaker AI Savings Plans | SageMaker Savings Plans | AWS docs use "SageMaker AI"; FAQ page still says "SageMaker Savings Plans" |
| Azure Prepayment | Monetary commitment | Microsoft Learn |

### Assurance angles

Original operating insight derived from the findings above. These are Xyvionix interpretations, not vendor claims.

- **Configured freshness is intent, observed freshness is evidence.** Snowflake states target lag is "best-effort, not a guarantee". Evidence of freshness expires at the next refresh cycle. The threshold that matters is the business tolerance for staleness, compared against actual lag, not against the configured value.
- **A pipeline with no consumers can stop silently.** A dynamic table set to DOWNSTREAM with no downstream reader never refreshes and raises no warning. Absence of failure is not evidence of operation. Re-prove by checking last successful refresh time against the expected cadence.
- **Learned baselines normalise slow decay.** Anomaly detection on Databricks, Snowflake and observability tools learns from recent history. A gradual decline in completeness becomes the baseline. Evidence from anomaly detection must be paired with fixed business thresholds that do not drift.
- **Check cadence sets evidence age.** dbt advises checking freshness at twice the frequency of the tightest SLA. DMFs default to hourly. Between checks the state is unproven, so the maximum evidence age equals the check interval plus alert delivery time.
- **A declared constraint is not an enforced one.** dbt contracts on Snowflake and Databricks define primary and foreign keys without enforcing them. Evidence that a constraint exists in metadata says nothing about the data. Re-prove with a data test on every build.
- **Version upgrades invalidate prior correctness evidence.** Spark 4 turns on ANSI mode; Airflow 3 changes catchup and data interval defaults; Spark 4.2 turns on Arrow UDFs. The same code yields different results. Every runtime or engine upgrade should reset assurance status to unproven until outputs are reconciled.
- **Unsupported versions are an expired assurance condition.** Airflow 2 reached end of life on 2026-04-22. Kafka 3.9 and ZooKeeper mode are outside supported lines. Spark feature releases get 6 months. Support status has a known expiry date and can be tracked like a certificate.
- **Removed features take their alerts with them.** Airflow SLAs were removed and the replacement is experimental. Kafka 4.2 renamed metrics. A monitor reading a metric that no longer exists stays green. Re-prove that each alert can still fire after every upgrade.
- **Lag has more than one boundary.** Topic to consumer, consumer to table, table to index, index to agent. Each hop has its own lag and its own owner. End-to-end freshness is the sum, and only the sum matters to the business outcome.
- **Exactly-once stops at the Kafka boundary.** Kafka documents that the guarantee does not extend to external systems automatically. Duplicate or missing records at the sink need reconciliation evidence, renewed whenever the sink connector or schema changes.
- **Schema compatibility is checked per hop; blast radius is cross-hop.** BACKWARD mode checks only the latest version. Lineage retention on Databricks is 365 days. Consumers that run less often than the retention window are invisible when a change is assessed.
- **Recovery windows shrink without notice.** Time Travel can be set to 0 days; the dropped-table recovery period can be set to 0 hours; snapshot expiry and VACUUM remove recovery points to save storage. Recovery evidence expires whenever a retention setting or maintenance job changes. A backup proves existence; only a test restore proves recoverability.
- **Deletion is not complete at DELETE.** With deletion vectors, records persist until REORG PURGE and VACUUM run. Deletion compliance evidence requires proof of the physical purge within the regulatory deadline, across bronze, silver, gold, backups and derived indexes.
- **An AI answer is as fresh as the oldest link in its data chain.** Bedrock knowledge bases need an explicit sync; Cortex Search has a target lag; AI Search follows the source table. Changing an embedding model invalidates the whole index. Evidence of retrieval quality expires when source data, index or model changes.
- **Cost evidence for an open billing period is provisional.** FOCUS 1.4 formalises corrections as replacement, delta or ledger. Provider anomaly detection lags by 24 to 36 hours or more. Unit cost computed mid-month can be restated. State the period status alongside the number.
- **Allocation coverage decays daily.** New resources arrive untagged; shared-cost apportionment rules age as consumers change; AWS tags must be activated to count. The threshold that matters is the share of spend allocated to an accountable owner, measured continuously.
- **Commitment evidence expires when usage changes.** Savings plans cannot be cancelled; unused hourly commitment is lost; Azure reservation exchanges end for new purchases from 2027-02-01. Rightsizing after purchase lowers utilisation. Coverage and utilisation should be re-proven after every material architecture change, not only at renewal.
- **AI hard-stop controls are uneven.** Snowflake resource monitors exclude AI services; provisioned throughput bills regardless of tokens used; GPU capacity blocks cannot be cancelled; context growth raises cost per interaction over time. A cost per inference measured at launch is evidence with a short life.

### Could not verify

Research note: web search and the page-summarising fetch tool reached their session limits partway through. Sections 7 to 12 were completed by retrieving known primary-source URLs directly. Topics that needed open search to locate a source are listed here rather than asserted.

- **Databricks platform rename.** Docs and product page use "Databricks Data + AI Platform" (docs updated 2026-09-11). No announcement stating when or whether "Data Intelligence Platform" was formally retired was located. Treat "Data + AI Platform" as current usage, not as a confirmed rename event.
- **Data + AI Summit 2026 announcements** reported only by a secondary source (datapao.com): Genie One, Genie Ontology, LTAP, Lakebase Search, "Unity AI Gateway" naming, launch statistics. Not confirmed against Databricks primary sources. Databricks docs use "Unity Gateway". Lakehouse Real-Time (Beta, 2026-06-30) and Omnigent (Beta) are confirmed in release notes.
- **Prior Databricks names** in the terminology table (Mosaic AI Vector Search, Mosaic AI Gateway, Mosaic AI Agent Framework, Databricks Workflows, Lakeflow Declarative Pipelines as the 2025 interim name) come from earlier documentation and secondary snippets; not re-verified on a primary page in this research. Whether "Mosaic AI" is fully retired as a brand is not confirmed.
- **Databricks data quality monitoring GA status.** The docs page does not state GA or Preview. The results system table is Public Preview.
- **Databricks serverless** current scope and any 2026 pricing or default changes: not researched beyond release note items.
- **Snowflake Cortex Code renamed "CoCo".** The name "Snowflake CoCo" appears in third-party material and the State of Tokenomics survey; Snowflake docs still list "Cortex Code". Rename not confirmed.
- **Snowflake Document AI** current name or status: not listed on the AI features overview page; not verified.
- **Snowpipe Streaming high-performance architecture:** GA status, throughput figures and pricing basis not verified.
- **Snowflake Iceberg v3 features** beyond deletion vectors (variant, row lineage): not confirmed on the page fetched.
- **Kafka tiered storage GA version.** Docs confirm GA; the specific release in which it became production-ready was not confirmed.
- **Confluent brand treatment under IBM** ("an IBM company") and any product renames after the acquisition: not confirmed.
- **Confluent Cloud cluster types** (Basic, Standard, Enterprise, Dedicated, Freight) current list: not verified.
- **Astronomer** current product naming (Astro) and Airflow 3 support status: not researched.
- **Apache Flink** 2.3.0 release date and features: version confirmed from downloads page only.
- **Apache Spark 4.3.** Versioning policy shows a 4.3 branch cut on 2026-08-01; no 4.3.0 release appears on the downloads page at research date.
- **dbt Cloud renamed "dbt platform":** term used in dbt docs; rename date not verified. dbt model freshness `build_after` configuration not verified.
- **Monte Carlo "distribution" pillar.** The current Monte Carlo page names the pillars freshness, quality, volume, schema, lineage. Earlier use of "distribution" was not verified from a primary source.
- **Soda, GX, Elementary, Anomalo** pricing, customer numbers and detailed feature status: not verified. GX Cloud current status not checked.
- **Open Data Contract Standard governance.** Version 3.2.0 and release date confirmed from the Bitol repository; Linux Foundation hosting of Bitol not re-verified on a primary page.
- **State of FinOps 2026 publication date.** Report content verified at data.finops.org; exact publication date not captured (expected early 2026).
- **State of Tokenomics** is labelled Release Candidate 1.0 (2026-09-23); figures may change in the final version. The relationship between the Tokenomics Foundation and the FinOps Foundation was not verified beyond the report being promoted on finops.org.
- **FinOps Foundation token pricing paper** publication date not captured.
- **AWS Database Savings Plans launch date** and **AWS Reserved Instance or Savings Plans policy changes in 2025 to 2026** (including restrictions affecting resellers and managed service providers): not located in a primary source. Discount ceiling differs between AWS pages only in service list (docs include OpenSearch Service; FAQ does not).
- **Google Cloud CUD migration dates** to the new consumption model are shown per account in the console; no single public date verified. Google Cloud anomaly detection latency not stated on the page fetched.
- **Azure cost anomaly detection** at scopes above subscription: not documented on the page fetched.
- **FinOps Framework "data centre" page and FOCUS for data centre** content: existence confirmed, detail not reviewed.
- **HIPAA Security Rule proposed update** (rulemaking status in 2026): not researched. HHS.gov returned an access error; rule text taken from eCFR.
- **GDPR, DPDP Act and other deletion deadlines:** not researched from primary legal sources in this pass.

## Industry and regulatory context

Source file: `docs/research/10-industry-regulatory.md`

Research date: 27 September 2026. Sources are regulator and standards-body publications unless stated.
This is factual context for content writers, not legal advice. Xyvionix is not a law firm.

Verification markers used at the end of each finding:
- `[D]` read directly on the cited source during this research. Where marked "OJ text", "FR text" or "PDF text", the official PDF was downloaded and the wording checked line by line.
- `[S]` confirmed through a search result pointing at the cited source; the page itself was not opened (blocked, timed out, or search budget exhausted).
- `[K]` settled legal or standard text cited from the instrument itself; not re-fetched this session. Check the article reference before quoting.

Anything weaker than these is listed under "Could not verify" and must not be published as fact.

Second verification pass (27 September 2026): open items were retried against official PDFs (EUR-Lex Official Journal, govinfo Federal Register, NAIC, IAF, APRA, NYDFS, ESAs). Markers were upgraded only where the primary text was read. One automated page summary was found to be wrong against its own PDF during this pass, so `[D]` items read only through a page summary (not PDF text) should still be spot-checked before a date is quoted in a headline.

### Financial services

#### EU

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| DORA (Regulation (EU) 2022/2554) has applied since 17 January 2025 to 20 types of financial entity. Six areas: ICT risk management, ICT incident reporting, digital operational resilience testing, ICT third-party risk, information sharing, oversight of critical ICT third-party providers. `[D]` | https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en | Applies from 17 Jan 2025 | Resilience is framed as a standing capability, not a project with an end date. | financial-services, insurance, disaster-recovery-assurance, security-trust |
| DORA Art. 28(3): financial entities "shall maintain and update" a register of information on all contractual arrangements with ICT third-party providers, and report on new arrangements at least yearly. Art. 24(6): entities other than microenterprises "shall ensure, at least yearly, that appropriate tests are conducted on all ICT systems and applications supporting critical or important functions". Art. 26(1): identified entities "shall carry out at least every 3 years advanced testing by means of TLPT". Art. 11(6): ICT continuity and recovery plans tested at least yearly. `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R2554 | OJ 27 Dec 2022; applies 17 Jan 2025 | Each item is a recurring evidence obligation: register currency, test results, remediation tracking. | financial-services, disaster-recovery-assurance, security-trust |
| DORA Art. 30(3)(a) requires contracts for ICT services supporting critical or important functions to include "full service level descriptions ... with precise quantitative and qualitative performance targets within the agreed service levels to allow effective monitoring by the financial entity". `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R2554 | As above | Financial entities must be able to show the supplier is meeting targets continuously, which flows down to SaaS vendors. | financial-services, software-technology, saas-production-reliability |
| The three ESAs designated the first critical ICT third-party providers (CTPPs) on 18 November 2025. Designated providers come under direct ESA oversight of their risk management and governance. The published list names 19 providers, including Amazon Web Services EMEA Sarl, Google Cloud EMEA Limited, Microsoft Ireland Operations Limited, Oracle Nederland B.V., SAP SE, IBM, Accenture, Capgemini, Kyndryl, Equinix and Tata Consultancy Services. `[D]` PDF text | https://www.eba.europa.eu/sites/default/files/2025-11/e388451b-356b-408a-bbf2-b8e425865d75/List%20of%20designated%20CTPPs.pdf | 18 Nov 2025 | Oversight of the provider does not move responsibility away from the financial entity. | financial-services, software-technology, security-trust |
| EU AI Act Annex III point 5(b): AI used to evaluate creditworthiness or establish a credit score of natural persons is high-risk (fraud detection excepted). Following the Digital Omnibus on AI, Annex III high-risk obligations apply from 2 December 2027, not 2 August 2026. The Omnibus did not amend Annex III point 5. `[D]` OJ text for both the Annex wording and the date | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744 | OJ 24 Jul 2026 | Lenders have a fixed date by which logging, monitoring and human oversight evidence must exist for credit models. | financial-services-ai-assurance, ai-governance-assurance, ai-audit-readiness |

#### United Kingdom

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| The operational resilience transition period ended 31 March 2025. Firms must have identified important business services, set impact tolerances, mapped and tested, and must now be able to remain within impact tolerances. Ongoing: scenario testing, lessons-learned exercises, communication plans, third-party risk management. `[D]` | https://www.fca.org.uk/firms/operational-resilience | Page updated 15 Sep 2026 | The obligation is now "remain within tolerance", which can only be shown with current evidence. | financial-services, disaster-recovery-assurance |
| PRA SS1/21 sets the PRA's expectations on impact tolerances for important business services. It applies to UK banks, building societies, PRA-designated investment firms, UK Solvency II firms, Lloyd's and its managing agents. Current version published 11 March 2022. `[D]` | https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-impact-tolerances-for-important-business-services-ss | 11 Mar 2022 (effective 31 Mar 2022) | Same framework covers banks and insurers, so one assurance model serves both industry pages. | financial-services, insurance, disaster-recovery-assurance |
| FCA PS26/2 (operational incident and third-party reporting) was published 18 March 2026. The new reporting requirements take effect 18 March 2027. `[D]` PRA PS7/26 (published 18 March 2026, implementation 18 March 2027) covers banks, building societies, designated investment firms, UK Solvency II firms and Lloyd's: initial incident report within 24 hours, final report within 30 working days of resolution, plus notification and an annual register of material third-party arrangements. `[D]` (https://www.bankofengland.co.uk/prudential-regulation/publication/2026/march/operational-incident-and-third-party-reporting-policy-statement) | https://www.fca.org.uk/publications/policy-statements/ps26-2-operational-incident-third-party-reporting | 18 Mar 2026; in force 18 Mar 2027 | Firms need incident classification and material third-party registers that are report-ready within six months of this research date. | financial-services, security-trust, disaster-recovery-assurance |
| HM Treasury designated the first UK critical third parties on 10 July 2026, effective 13 July 2026: Amazon Web Services EMEA SARL, Google Cloud EMEA Limited, Microsoft Ireland Operations Ltd, Oracle Corporation UK Limited. The regime "complements, but does not replace" firms' own outsourcing and operational resilience duties. `[D]` | https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt | 10 Jul 2026 | Firms cannot rely on the provider being overseen; their own due diligence and contingency planning remain. | financial-services, software-technology, security-trust |
| PRA SS1/23 (model risk management principles for banks) took effect 17 May 2024; the current version is effective 23 April 2026 after minor amendments. Five principles: model identification and risk classification; governance; development, implementation and use; independent validation; model risk mitigants. Scope is firms with internal model approval. It expressly covers AI and machine learning techniques. `[D]` | https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss | Current version 23 Apr 2026 | Model inventory, validation and mitigants are continuing controls with SMF accountability. | financial-services-ai-assurance, ai-governance-assurance |
| FCA position: "We do not plan to introduce extra regulations for AI." It relies on existing frameworks, principally the Consumer Duty and the Senior Managers and Certification Regime. `[D]` | https://www.fca.org.uk/firms/innovation/ai-approach | Page updated 13 Feb 2026 | No AI rulebook to tick off; firms must evidence outcomes under existing duties. | financial-services-ai-assurance, insurance-claims-ai-assurance, ai-governance-assurance |
| The Mills Review (AI and the future of retail financial services) was published 6 July 2026 with seven priority recommendations to the FCA Board. It describes retail financial services moving "towards AI-enabled, continuous and delegated services" and does not itself create new rules. `[D]` | https://www.fca.org.uk/publications/corporate-documents/mills-review | 6 Jul 2026 | Signals supervisory attention to delegated and agentic services without changing the rule set. | financial-services-ai-assurance, ai-governance-assurance |
| Bank of England Financial Stability Report, July 2026: frontier AI progress presents "a significant increase in the risks to financial stability from cyber and operational vulnerabilities", requiring firms to "identify, patch and mitigate vulnerabilities more quickly and frequently". The FPC asks firms to act on the May 2026 joint Bank, FCA and HM Treasury statement. `[D]` | https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026 | 7 Jul 2026 | Faster vulnerability cycles shorten the shelf life of any point-in-time security attestation. | financial-services, security-trust, disaster-recovery-assurance |
| Joint Bank of England, FCA and HM Treasury statement on frontier AI models and cyber resilience, addressed to regulated firms and FMIs. It states: "This note is not intended to introduce new expectations; it brings together and reinforces existing messages." It asks firms to remediate vulnerabilities "more quickly, more frequently, and at scale". `[D]` | https://www.bankofengland.co.uk/news/2026/may/boe-fca-and-hm-treasury-joint-statement-on-frontier-ai-models-and-cyber-resilience | 15 May 2026 | Board-level understanding and investment decisions are expected to track a changing threat. | financial-services, security-trust |

#### United States

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| SR 11-7 is no longer current. On 17 April 2026 the Federal Reserve, OCC and FDIC issued Revised Guidance on Model Risk Management. Fed SR 26-2 supersedes SR 11-7 and SR 21-8 and addresses banking organisations with over $30 billion in total assets. `[D]` | https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm | 17 Apr 2026 | Any page citing SR 11-7 as current guidance is out of date. | financial-services, financial-services-ai-assurance, ai-audit-readiness |
| OCC Bulletin 2026-13 rescinds OCC Bulletin 2011-12, OCC Bulletin 1997-24, OCC Bulletin 2021-19 and the Model Risk Management booklet of the Comptroller's Handbook. It states: "Generative AI and agentic AI models are novel and rapidly evolving. As such, they are not within the scope of this guidance." The agencies plan a request for information covering banks' use of AI. `[D]` | https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html | 17 Apr 2026 | US banks have no agency model risk guidance for generative or agentic AI; they must set and evidence their own standard. | financial-services-ai-assurance, ai-governance-assurance, ai-audit-readiness |
| Interagency Guidance on Third-Party Relationships: Risk Management (OCC, Federal Reserve, FDIC) covers the full third-party life cycle including ongoing monitoring. OCC Bulletin 2023-17 rescinded OCC Bulletins 2013-29 and 2020-10. `[D]` | https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html | 6 Jun 2023 | Ongoing monitoring is a named life-cycle stage, scaled to criticality. | financial-services, software-technology, security-trust |
| The FFIEC Cybersecurity Assessment Tool was sunset on 31 August 2025. `[S]` | https://www.ffiec.gov/news/press-releases/2024/an-09-29 | Announced 2024; sunset 31 Aug 2025 | Institutions moved to other frameworks; content must not reference the CAT as current. | financial-services, security-trust |
| The FFIEC IT Examination Handbook includes a Development, Acquisition, and Maintenance booklet (2024) replacing the 2004 Development and Acquisition booklet. `[S]` | https://www.occ.gov/news-issuances/bulletins/2024/bulletin-2024-26.html | 2024 | Examiner expectations cover maintenance and change, not only build. | financial-services, saas-production-reliability |
| NYDFS 23 NYCRR Part 500, second amendment, became effective 1 November 2023. Section 500.22(d)(4) gave two years (to 1 November 2025) for sections 500.12 (multi-factor authentication for any individual accessing any information system) and 500.13(a) (asset inventory). Section 500.17(b) requires an annual notice of compliance by 15 April. `[D]` PDF text (DFS notes this comparison copy is not the official version) | https://www.dfs.ny.gov/system/files/documents/2023/12/rf23_nycrr_part_500_amend02_20231101.pdf | Final phase 1 Nov 2025 | All amended requirements are now in force; annual certification requires evidence across the whole year. | financial-services, insurance, security-trust |
| NYDFS Cybersecurity Resource Centre lists 2026 industry letters on "Heightened Cybersecurity Risks Associated with Frontier AI Models" (May 2026) and "Guidance on How to Conduct and Use Risk Assessments Required by the DFS Cybersecurity Regulation" (September 2026). `[D]` | https://www.dfs.ny.gov/industry_guidance/cybersecurity | Sep 2026 | Risk assessment is treated as a living input to the programme, not an annual document. | financial-services, insurance, security-trust |
| SEC rules require Form 8-K Item 1.05 disclosure within four business days of determining a cybersecurity incident is material, and annual Regulation S-K Item 106 disclosure of risk management, strategy and governance. `[D]` A rulemaking petition (File 4-856) asks the SEC to rescind Item 1.05; no rescission was found. `[S]` | https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure | Page reviewed 10 Sep 2024 | Materiality decisions need current facts about what was affected; the rule is still in force as far as verified. | financial-services, software-technology, security-trust |

#### Australia, Canada, international

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| APRA Prudential Standard CPS 230 Operational Risk Management has been in force since 1 July 2025 for APRA-regulated banks, insurers and superannuation trustees. It covers operational risk controls, business continuity for critical operations, and material service provider management. Pre-existing service provider contracts had until the earlier of renewal or 1 July 2026. APRA released targeted amendments on 30 April 2026 (limited contractual exemptions, effective 1 July 2026). `[D]` | https://www.apra.gov.au/operational-risk-management | In force 1 Jul 2025; amended 2026 | Tolerance levels for critical operations must be tested, not only documented. | financial-services, insurance, disaster-recovery-assurance |
| APRA Prudential Standard CPS 234 Information Security commenced 1 July 2019. It requires testing of control effectiveness "through a systematic testing program" with nature and frequency commensurate with change and risk, notification to APRA no later than 72 hours after becoming aware of a material information security incident, and no later than 10 business days for a material control weakness. `[D]` PDF text | https://www.apra.gov.au/sites/default/files/cps_234_july_2019_for_public_release.pdf | In force since 1 Jul 2019 | Control testing frequency must match the rate of change in threats and systems. | financial-services, insurance, security-trust |
| APRA letter to industry on AI, 30 April 2026, to all APRA-regulated entities. It finds that governance "has not matured at the same pace" as adoption, that internal audit functions "lack the specialist skills and tools required", and that entities show "heavy dependence on a single provider". It expects "continuous validation or monitoring", controls detecting drift and control breakdowns, and identity controls covering "nonhuman actors such as AI agents". `[D]` | https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai | 30 Apr 2026 | The clearest regulator statement found that point-in-time AI assessment is insufficient. | financial-services-ai-assurance, insurance-claims-ai-assurance, ai-governance-assurance, ai-audit-readiness |
| OSFI Guideline E-21 (Operational Risk Management and Resilience) was published 22 August 2024. Full adherence was expected by 1 September 2026. Scenario testing of all critical operations is to be complete by 1 September 2027. `[D]` | https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/operational-risk-management-resilience-letter | 22 Aug 2024 | Canadian institutions are now inside the full-adherence period with testing still to finish. | financial-services, insurance, disaster-recovery-assurance |
| OSFI Guideline E-23 (Model Risk Management) was published 11 September 2025 and takes effect 1 May 2027 for all federally regulated financial institutions, including insurers. It requires an inventory that is "accurate, evergreen, and subject to robust controls" and monitoring standards "covering frequency, scope, and evaluation criteria". It addresses AI/ML models. `[D]` | https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027 | 11 Sep 2025; effective 1 May 2027 | Seven months of preparation time remain; inventory and monitoring are continuing duties. | financial-services-ai-assurance, insurance, ai-governance-assurance |
| OSFI Guideline B-13 (Technology and Cyber Risk Management) was published 31 July 2022 and covers governance, technology operations and resilience, and cyber security. `[D]` Its effective date of 1 January 2024 was not shown on the page read. `[K]` | https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/technology-cyber-risk-management | Published 31 Jul 2022 | Sits alongside E-21 for technology resilience. | financial-services, security-trust |
| FSB consultation report, Sound Practices for Responsible Adoption of AI, 10 June 2026: 12 sound practices, covering generative and agentic AI. Comments closed 22 July 2026. No final report date was given. `[D]` | https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/ | 10 Jun 2026 | Consultation status only. Do not describe as final or binding. | financial-services-ai-assurance, ai-governance-assurance |
| FSB report, Monitoring Adoption of AI and Related Vulnerabilities in the Financial Sector. It says authorities need to "address data gaps and develop more robust monitoring approaches" and includes a case study on AI-related third-party dependencies and provider concentration. `[D]` | https://www.fsb.org/2025/10/monitoring-adoption-of-artificial-intelligence-and-related-vulnerabilities-in-the-financial-sector/ | 10 Oct 2025 | Authorities themselves lack data on AI use, which raises the value of firm-held evidence. | financial-services-ai-assurance |
| MAS issued a consultation paper on proposed Guidelines on AI Risk Management for all financial institutions on 13 November 2025 (comments to 31 January 2026). It expects firms to "maintain accurate and up-to-date AI inventories" and covers generative AI and AI agents. `[D]` Finalisation was not confirmed at the research date. | https://www.mas.gov.sg/news/media-releases/2025/mas-guidelines-for-artificial-intelligence-risk-management | 13 Nov 2025 | Relevant only where customers operate in Singapore; treat as proposed. | financial-services-ai-assurance |
| PCI DSS v4.0.1 was published 11 June 2024 as a limited revision: "There are no additional or deleted requirements in this revision." PCI DSS v4.0 was retired 31 December 2024, so v4.0.1 is the only active version. Of 64 new requirements introduced in v4.0, 51 were future-dated and became effective 31 March 2025. `[D]` (second source: https://blog.pcisecuritystandards.org/now-is-the-time-for-organizations-to-adopt-the-future-dated-requirements-of-pci-dss-v4-x) | https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1 | 11 Jun 2024 | All v4.x requirements are now assessed. Several demand defined frequencies set by the entity's own risk analysis. | financial-services, software-technology, security-trust |

### Insurance

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| The NAIC Model Bulletin on the Use of AI Systems by Insurers was adopted 4 December 2023. As of 31 August 2026 the NAIC map shows 26 jurisdictions have adopted it (25 states plus the District of Columbia). Four more have insurance-specific regulation or guidance instead: California, Colorado, New York, Texas. `[D]` | https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf | Status as of 31 Aug 2026 | The bulletin expects a written AI systems programme with governance, risk controls and third-party oversight, examinable on request. | insurance, insurance-claims-ai-assurance, ai-governance-assurance |
| Most recent adoptions on the NAIC list: Mississippi (Bulletin 2026-9, 22 July 2026) and Hawaii (Memorandum 2025-13A, 10 December 2025). Earlier adopters include Alaska, Connecticut, Illinois, Maryland, Pennsylvania, Virginia and Washington. `[D]` | https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf | 31 Aug 2026 | Adoption is still spreading; a multi-state insurer faces the same expectation in most markets. | insurance, ai-audit-readiness |
| The NAIC map carries a caveat: it "does not reflect a determination as to whether the pending or enacted legislation contains all elements of the model". `[D]` | https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf | 31 Aug 2026 | Do not claim the bulletin is uniform law across adopting states. | insurance |
| The bulletin text expects insurers to "develop, implement, and maintain a written program (an 'AIS Program')". Section 1.6 says the programme should address AI use "across the insurance life cycle", listing underwriting, pricing, claim administration and payment, and fraud detection. It cites the Unfair Claims Settlement Practices Model Act (#900) and says AI-supported decisions are subject to investigation including market conduct actions. `[D]` PDF text | https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf | Adopted 4 Dec 2023 | Claims automation is inside the bulletin's scope. This is the primary US source for claims AI governance. | insurance-claims-ai-assurance, insurance, ai-audit-readiness |
| NAIC Big Data and AI (H) Working Group, 2026: an AI Systems Evaluation Tool is in pilot (version 4.0 in use; version 5.0 exposed for a 30-day comment period ending 29 September 2026). An AI model law request for information drew comments by July 2025; no model law has been adopted. Next listed meeting 8 October 2026. `[D]` The pilot summary names 12 participating states (California, Colorado, Connecticut, Florida, Iowa, Louisiana, Maryland, Pennsylvania, Rhode Island, Vermont, Virginia, Wisconsin), using the tool from March 2026 to September 2026 in market conduct and financial examinations. `[D]` PDF text (https://content.naic.org/sites/default/files/inline-files/Pilot%20Project%20Summary_1.pdf) | https://content.naic.org/committees/h/big-data-artificial-intelligence-wg | Sep 2026 | Regulators are building a structured way to ask insurers for AI inventory, governance and data detail. | insurance, insurance-claims-ai-assurance, ai-audit-readiness |
| Colorado regulation 3 CCR 702-10 (Regulation 10-1-1, governance and risk management for external consumer data, algorithms and predictive models) took effect 13 November 2023, with amendments effective 15 October 2025. `[D]` The amendments extend it from life insurance to private passenger auto and health benefit plan insurers. `[S]` | https://doi.colorado.gov/announcements/notice-of-adoption-amended-regulation-10-1-1-governance-and-risk-management-framework | Amended effective 15 Oct 2025 | Requires documented governance, testing and recurring compliance reporting to the Division. | insurance, ai-governance-assurance |
| New York DFS Insurance Circular Letter No. 7 (2024), issued 11 July 2024, covers AI systems and external consumer data in underwriting and pricing only. It does not cover claims. Insurers keep responsibility for vendor tools and should document testing, changes and consumer complaints. `[D]` | https://www.dfs.ny.gov/industry-guidance/circular-letters/cl2024-07 | 11 Jul 2024 | Do not cite this letter as a claims-handling rule. It supports ongoing testing and audit evidence for pricing models. | insurance, ai-audit-readiness |
| EIOPA Opinion on AI governance and risk management (EIOPA-BoS-25-360), 6 August 2025, addressed to national supervisors. It covers AI systems that are not prohibited or high-risk under the AI Act, and sets expectations on data governance, record-keeping, fairness, cyber security, explainability and human oversight under existing insurance law. It creates no new rules. `[D]` | https://www.eiopa.europa.eu/eiopa-publishes-opinion-ai-governance-and-risk-management-2025-08-06_en | 6 Aug 2025 | Record-keeping and explainability apply to ordinary insurance AI, including claims triage, not only high-risk uses. | insurance, insurance-claims-ai-assurance, ai-governance-assurance |
| EU AI Act Annex III point 5(c): AI used for risk assessment and pricing of natural persons in life and health insurance is high-risk. Application date after the Digital Omnibus on AI is 2 December 2027. Annex III point 5(c) reads: "AI systems intended to be used for risk assessment and pricing in relation to natural persons in the case of life and health insurance". `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689 | OJ 12 Jul 2024; date amended 24 Jul 2026 | Claims handling and non-life pricing are not listed in point 5(c); do not overstate scope. | insurance, ai-governance-assurance, ai-audit-readiness |
| DORA applies to insurance and reinsurance undertakings. `[D]` EIOPA revoked its Solvency II guidelines on ICT security and governance and on outsourcing to cloud service providers, effective 17 January 2025, because DORA "fully encompasses" them. `[D]` | https://www.eiopa.europa.eu/eiopa-revokes-previous-guidelines-avoid-duplications-and-overlaps-dora-2024-12-19_en | 19 Dec 2024 | Insurer ICT resilience evidence should be mapped to DORA, not to the withdrawn guidelines. | insurance, disaster-recovery-assurance, security-trust |
| Solvency II (Directive 2009/138/EC) requires an effective system of governance and risk management covering operational risk (Art. 41 and 44), and operational risk is part of the solvency capital requirement. `[K]` | https://eur-lex.europa.eu/eli/dir/2009/138/oj | In force | Operational risk from technology failure is a prudential matter for insurers, not only an IT one. | insurance |
| UK: PRA SS1/21 applies to UK Solvency II firms and Lloyd's. `[D]` PRA SS1/23 on model risk is scoped to banks with internal model approval, not insurers. `[D]` | https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-impact-tolerances-for-important-business-services-ss | 11 Mar 2022 | Claims payment is a natural important business service with an impact tolerance. | insurance, disaster-recovery-assurance |
| UK: the FCA applies the Consumer Duty and SM&CR to AI use and plans no AI-specific rules. `[D]` | https://www.fca.org.uk/firms/innovation/ai-approach | 13 Feb 2026 | Automated claims decisions must be shown to deliver good outcomes, which requires outcome monitoring over time. | insurance-claims-ai-assurance, ai-governance-assurance |
| California SB 1120 (Chapter 879, Statutes of 2024) applies to health care service plans and disability insurers using AI, algorithms or software tools for utilisation review. Tools must base determinations on the individual's history and clinical circumstances, not "solely on a group dataset", be periodically reviewed for accuracy, and be open to department audit. "A determination of medical necessity shall be made only by a licensed physician or licensed health care professional". `[D]` Operative date of 1 January 2025 is `[S]`. | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120 | Approved 28 Sep 2024 | A concrete example of a human-review requirement for automated claim and utilisation decisions. | insurance-claims-ai-assurance, healthcare-ai-assurance |
| GDPR Art. 22(1): "The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her." Exceptions are contract necessity, legal authorisation and explicit consent; for contract and consent the controller must provide "at least the right to obtain human intervention ... to express his or her point of view and to contest the decision". `[D]` OJ text. UK GDPR now differs and was not checked. | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679 | Applies since 25 May 2018 | Fully automated claim denial in the EU or UK needs a documented lawful basis and a working human review path. | insurance-claims-ai-assurance, ai-governance-assurance |
| APRA's 30 April 2026 AI letter and OSFI Guideline E-23 both apply to insurers as well as banks. `[D]` | https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai | 30 Apr 2026 | Australian and Canadian insurers face the same monitoring expectations as banks. | insurance, insurance-claims-ai-assurance |

### Healthcare

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| The HIPAA Security Rule update is still a proposal. The NPRM (RIN 0945-AA22) was published in the Federal Register on 6 January 2025 (90 FR, No. 3) with comments due 7 March 2025. `[D]` FR text. A Federal Register search for a final rule of that title published after 6 January 2025 returned none. `[D]` The Unified Agenda entry lists it under Long-Term Actions with final action dated 07/2027; the Spring 2025 entry had shown May 2026. `[D]` (https://www.reginfo.gov/public/do/eAgendaViewRule?pubId=202510&RIN=0945-AA22) | https://www.govinfo.gov/content/pkg/FR-2025-01-06/pdf/2024-30983.pdf | NPRM 6 Jan 2025 | The current Security Rule remains the enforceable text. Never describe the proposed controls as requirements. | healthcare, security-trust |
| The NPRM proposes to: "remove the distinction between 'addressable' and 'required' implementation specifications"; require a written technology asset inventory and network map; deploy multi-factor authentication; encrypt all ePHI at rest and in transit with limited exceptions; run automated vulnerability scans "at least once every six months"; perform penetration testing "at least once every 12 months"; have written procedures to restore critical systems and data "within 72 hours of the loss"; and audit compliance "at least once every 12 months". `[D]` FR text | https://www.govinfo.gov/content/pkg/FR-2025-01-06/pdf/2024-30983.pdf | 6 Jan 2025 | Shows the direction of travel toward fixed testing frequencies. Phrase as "proposed". | healthcare, disaster-recovery-assurance, security-trust |
| HHS OCR runs a Risk Analysis Initiative focused on the existing requirement for an accurate and thorough risk analysis. Settlements typically carry corrective action plans monitored by OCR for two years. `[S]` | https://www.hhs.gov/press-room/ocr-settles-four-ransomware-investigations.html | 2026 | Enforcement targets a stale or partial risk analysis, which is an evidence-currency problem. | healthcare, security-trust, ai-audit-readiness |
| 45 CFR 170.315(b)(11) (decision support interventions, introduced by HTI-1) requires certified health IT to support source attributes for predictive DSI, including intended use, out-of-scope use, training data, fairness approach, external validation, performance measures, ongoing maintenance and update schedule. Predictive DSI must be subject to risk analysis covering "validity, reliability, robustness, fairness, intelligibility, safety, security, and privacy". `[D]` | https://www.ecfr.gov/current/title-45/section-170.315 | Current CFR text | Currently in force for certified health IT developers. | healthcare-ai-assurance, ai-governance-assurance |
| HTI-5 proposed rule (released 22 December 2025, Federal Register 29 December 2025) proposes to "reduce the scope of the decision support interventions (DSI) certification criterion to fully remove the artificial intelligence (AI) 'model card' requirements", and to remove 34 and revise 7 of 60 certification criteria. It is a proposal, not a final rule. `[D]` | https://www.healthit.gov/topic/laws-regulation-and-policy/hti-5-proposed-rule-fact-sheet | 22 Dec 2025 | If finalised, federal transparency duties on EHR-embedded AI reduce, moving the burden of proof to the provider organisation. | healthcare-ai-assurance, ai-governance-assurance |
| FDA guidance "Marketing Submission Recommendations for a Predetermined Change Control Plan for AI-Enabled Device Software Functions" is final. The FDA guidance page shows an issue date of August 2025 (first issued as final in December 2024). A PCCP describes planned modifications, the protocol for developing and validating them, and an impact assessment. `[D]` | https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence | Aug 2025 | A PCCP is a pre-agreed change envelope; the manufacturer must show each change stayed inside it. | healthcare-ai-assurance, ai-audit-readiness |
| FDA guidance "AI-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations" remains a draft (issued January 2025). `[D]` | https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device | Page updated 22 Sep 2026 | Do not describe the lifecycle guidance as final. | healthcare-ai-assurance |
| FDA has not issued final guidance specific to generative AI-enabled devices. Its Digital Health Advisory Committee met in November 2024 on total product lifecycle considerations for generative AI-enabled devices and on 6 November 2025 on generative AI-enabled digital mental health devices. FDA also issued a request for public comment on measuring AI-enabled device performance in the real world. `[D]` | https://www.fda.gov/medical-devices/digital-health-center-excellence/artificial-intelligence-enabled-medical-devices | Page updated 22 Sep 2026 | FDA's open question is real-world performance after deployment, which is a monitoring problem. | healthcare-ai-assurance, ai-governance-assurance |
| EU: MDCG 2025-6 / AIB 2025-1 (19 June 2025) is a joint FAQ on the interplay between the MDR, IVDR and the AI Act. `[D]` AI that is a medical device requiring notified body assessment is high-risk through Annex I; after the Digital Omnibus on AI those obligations apply from 2 August 2028. `[D]` | https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en | 19 Jun 2025 | One technical file and one conformity route, but post-market monitoring duties stack. | healthcare-ai-assurance, ai-audit-readiness |
| European Health Data Space Regulation (EU) 2025/327 entered into force 26 March 2025. Commission implementing acts are due by March 2027. First priority data categories (patient summaries, ePrescriptions) and most secondary-use rules apply from March 2029; imaging, lab results and discharge reports from March 2031. `[D]` | https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en | In force 26 Mar 2025 | Most obligations are still years away. Do not present EHDS duties as live. | healthcare, software-technology |
| NHS England refreshed the Digital Technology Assessment Criteria (DTAC) form and guidance: "A new DTAC form with a 25% reduction in questions, de-duplicated with processes such as the data security and protection toolkit". The old form was to be fully replaced by 6 April 2026. `[D]` The NHS Innovation Service notice is dated 4 March 2026; secondary sources give 24 February 2026 as the DTAC publication date. | https://innovation.nhs.uk/news/updated-nhs-england-digital-technology-assessment-criteria-dtac-form-and-guidance/ | 4 Mar 2026 | Suppliers to the NHS must use the updated form; DTAC covers clinical safety, data protection, technical security, interoperability and usability. | healthcare, software-technology, security-trust |
| The NHS Data Security and Protection Toolkit for 2025-26 is version 8, "aligned to CAF version 3.4", with a submission deadline of 30 June 2026. It applies to NHS bodies and to external providers including IT suppliers. `[D]` | https://www.dsptoolkit.nhs.uk/News/161 | 18 Sep 2025 | Annual submission, but CAF outcomes describe continuing capability. | healthcare, security-trust |
| MHRA published the AI Airlock Sandbox Phase 2 programme report on 9 June 2026 (updated 27 July 2026). Phase 2 ran April 2025 to May 2026 with seven case studies. `[D]` | https://www.gov.uk/government/publications/ai-airlock-sandbox-phase-2-programme-report | 9 Jun 2026 | A sandbox, not a rule change. UK AI medical device regulation is still being reformed. | healthcare-ai-assurance |
| The MHRA's National Commission into the Regulation of AI in Healthcare (launched 26 September 2025) published its final report, "Recommendations for a future regulatory framework", on 10 September 2026. Its central conclusion is that "the regulation and assurance of AI in healthcare must become more proportionate, lifecycle-based and system-wide". A cross-government response is still to come. `[D]` | https://www.gov.uk/government/groups/national-commission-into-the-regulation-of-ai-in-healthcare | 10 Sep 2026 | Recommendations, not rules. "Lifecycle-based" assurance is the stated direction for UK healthcare AI. | healthcare-ai-assurance, ai-governance-assurance |
| TGA published its report "Clarifying and strengthening the regulation of Medical Device Software including Artificial Intelligence" in July 2025, with further targeted consultation planned. `[S]` | https://www.tga.gov.au/news/news-articles/tga-ai-review-outcomes-report-published | Jul 2025 | Australian position is review and refinement of the existing framework. | healthcare-ai-assurance |
| Joint Commission and the Coalition for Health AI released Guidance on Responsible Use of AI in Healthcare (RUAIH) on 17 September 2025. It is voluntary. It recommends policies, local validation and monitoring. Governance playbooks and a voluntary Joint Commission AI certification are planned. `[D]` | https://www.chai.org/news/joint-commission-and-coalition-for-health-ai-chai-release-initial-guidance | 17 Sep 2025 | Local validation and monitoring are the provider's job, not the vendor's. | healthcare-ai-assurance, ai-governance-assurance |
| Change Healthcare ransomware attack, February 2024. The affected-individual count reported to HHS OCR is widely cited as about 192.7 million. `[S]` (see Could not verify) | https://www.hhs.gov/hipaa/for-professionals/special-topics/change-healthcare-cybersecurity-incident-frequently-asked-questions/index.html | 2024 to 2025 | A single clearinghouse outage disrupted claims and payment nationally; concentration risk sits in third parties. | healthcare, disaster-recovery-assurance, security-trust |
| NIS2 lists health among its covered sectors, and the Commission referred four member states to the Court of Justice on 8 July 2026 for failing to notify transposition. `[D]` | https://digital-strategy.ec.europa.eu/en/policies/nis-transposition | 8 Jul 2026 | EU hospitals face national rules of uneven maturity. | healthcare, security-trust |

### Software and technology (SaaS)

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| SOC 2 reports are assessed against the AICPA 2017 Trust Services Criteria (with Revised Points of Focus, 2022). Categories: security, availability, processing integrity, confidentiality, privacy. `[D]` for title and categories. That the 2022 revision changed points of focus but not the criteria is `[S]` (not stated on the page read). | https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022 | 2022 revision; page dated 30 Sep 2023 | There is no "2022 TSC" or "SOC 2 version 2"; name the criteria correctly. | software-technology, security-trust, ai-audit-readiness |
| A SOC 2 Type II report covers the operating effectiveness of controls over a stated period; a Type I report covers design at a point in time. `[K]` | https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022 | Current | Type II describes a past period. It says nothing about the weeks since the period ended. | software-technology, saas-production-reliability, security-trust |
| IAF MD 26:2022 set a transition period of "3 Years (36 months)" from the last day of the publication month of ISO/IEC 27001:2022, and states: "All certifications based on ISO/IEC 27001:2013 shall expire or be withdrawn at the end of the transition period." `[D]` PDF text. The standard was published in October 2022, which gives 31 October 2025; the document does not print that calendar date. `[K]` for publication month | https://iaf.nu/iaf_system/uploads/documents/IAF_MD_26_Transition_requirements_for_ISOIEC_27001-2022_09082022.pdf | Issued 9 Aug 2022; deadline 31 Oct 2025 | Any vendor still showing a 2013 certificate has a lapsed certification. | software-technology, security-trust |
| ISO/IEC 42001:2023 specifies requirements for establishing, implementing, maintaining and continually improving an AI management system. It is certifiable. `[K]` | https://www.iso.org/standard/42001 | Published Dec 2023 | A management system standard certifies the system of governance, not the behaviour of a given model in production. | software-technology, ai-governance-assurance, ai-audit-readiness |
| Cloud Security Alliance STAR for AI is built on its AI Controls Matrix, the AI-CAIQ self-assessment questionnaire and ISO/IEC 42001. Level 1 is a self-assessment; Level 2 requires ISO/IEC 42001 certification plus a validated AI-CAIQ. `[D]` Launch date of 23 October 2025 is `[S]`. | https://cloudsecurityalliance.org/star/ai | 23 Oct 2025 | Evidence that buyer questionnaires now include AI-specific control sets. Industry body, not a regulator. | software-technology, ai-audit-readiness |
| EU Cyber Resilience Act: manufacturer reporting obligations have applied since 11 September 2026. Actively exploited vulnerabilities and severe incidents require an early warning within 24 hours and a notification within 72 hours, then a final report (14 days after a fix is available for vulnerabilities; one month for incidents). The Single Reporting Platform became operational 11 September 2026. Main obligations apply 11 December 2027. `[D]` | https://digital-strategy.ec.europa.eu/en/policies/cra-reporting | Page updated 11 Sep 2026 | Reporting is already live. Software makers need to know within hours whether a vulnerability is being exploited in their product. | software-technology, security-trust |
| EU Data Act has applied since 12 September 2025. Chapter VI obliges data processing service providers (including SaaS) to support switching, open interfaces and data export. Art. 29(1): "From 12 January 2027, providers of data processing services shall not impose any switching charges on the customer for the switching process." Art. 50: "It shall apply from 12 September 2025." `[D]` OJ text (https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32023R2854) | https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained | Page updated 15 Dec 2025 | Exit must work when invoked. Switching capability is a testable claim. | software-technology, saas-production-reliability |
| NIS2 transposition deadline was 17 October 2024. The Commission sent reasoned opinions to 19 member states on 7 May 2025 and referred Ireland, Spain, France and the Netherlands to the Court of Justice on 8 July 2026. `[D]` | https://digital-strategy.ec.europa.eu/en/policies/nis-transposition | 8 Jul 2026 | A SaaS provider's NIS2 duties depend on which national law applies to it. | software-technology, security-trust |
| NIS2 covers, among others, cloud computing service providers, data centre service providers, content delivery network providers, managed service providers, managed security service providers, and providers of online marketplaces, online search engines and social networking services. Health is an Annex I sector of high criticality. Art. 41: member states adopt measures by 17 October 2024 and apply them from 18 October 2024. Art. 23(4): early warning within 24 hours, incident notification within 72 hours, final report within one month. `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022L2555 | OJ 27 Dec 2022 | Not every SaaS company is in scope. Check entity type and size before claiming applicability. | software-technology, security-trust |
| Cloud providers serving financial services are now directly overseen in both the EU (DORA CTPPs, 18 November 2025) and the UK (CTPs, 13 July 2026). `[D]` | https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt | 10 Jul 2026 | SaaS vendors built on these clouds inherit customer questions about concentration and substitutability. | software-technology, saas-production-reliability |
| EU AI Act general-purpose AI model obligations have applied since 2 August 2025 and Art. 50 transparency obligations since 2 August 2026. Providers of systems generating synthetic audio, image, video or text that were placed on the market before 2 August 2026 must "comply with Article 50(2) by 2 December 2026". `[D]` OJ text of Regulation (EU) 2026/1744 | https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai | Page updated 3 Aug 2026 | SaaS products with AI chat or generated content have live transparency duties in the EU. | software-technology, ai-governance-assurance |
| The European Commission published updated model contractual clauses for AI procurement (MCC-AI) on 5 March 2025, in a full version for high-risk AI, a light version for non-high-risk AI, and a commentary, written for public buyers. `[D]` | https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses | 5 Mar 2025 | A public reference for what an AI contract addendum asks a supplier to evidence. | software-technology, ai-audit-readiness |
| California CCPA regulations on automated decision-making technology, risk assessments and cybersecurity audits were approved 22 September 2025 and took effect 1 January 2026. ADMT compliance is required from 1 January 2027. Cybersecurity audit certifications phase in from 1 April 2028 (revenue over $100M), 1 April 2029 ($50M to $100M) and 1 April 2030 (under $50M). `[D]` | https://cppa.ca.gov/announcements/2025/20250923.html | 23 Sep 2025 | B2B SaaS used for significant decisions about people will be asked by customers for ADMT detail before January 2027. | software-technology, ai-governance-assurance, security-trust |
| SaaS economics: on Microsoft's FY26 Q4 earnings call (29 July 2026), management said Microsoft Cloud gross margin percentage was 65%, "down year-over-year driven by sales mix shift to Azure, as well as continued investments in AI infrastructure and increased product usage, partially offset by ongoing efficiency gains". `[D]` | https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4 | 29 Jul 2026 | One company's disclosure, not an industry statistic. Use only with attribution. | software-technology, saas-production-reliability |

### Cross-industry

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages impacted |
|---|---|---|---|---|
| Regulation (EU) 2026/1744 (Digital Omnibus on AI) was adopted 8 July 2026, published in the Official Journal 24 July 2026, and entered into force on the third day after publication (27 July 2026). It amends the AI Act, Regulation (EU) 2018/1139 and Regulation (EU) 2023/1230. `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744 | 24 Jul 2026 | This is law, not a proposal. Pre-July 2026 AI Act timelines are wrong. | ai-governance-assurance, ai-audit-readiness, financial-services-ai-assurance, healthcare-ai-assurance |
| AI Act timeline now in force: prohibited practices from 2 February 2025; governance and general-purpose AI obligations from 2 August 2025; general application, including Art. 50 transparency, from 2 August 2026 (Art. 50(2) by 2 December 2026 for generative systems already on the market). Amended Art. 113(c): Chapter III Sections 1 to 3 apply from "2 December 2027 as regards AI systems classified as high-risk pursuant to Article 6(2) and Annex III" and "2 August 2028 as regards AI systems classified as high-risk pursuant to Article 6(1) and Annex I". `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744 | OJ 24 Jul 2026 | High-risk obligations are about 14 months away at the research date. | ai-governance-assurance, ai-audit-readiness, insurance, financial-services-ai-assurance, healthcare-ai-assurance |
| The Omnibus added two prohibited practices (non-consensual intimate imagery and child sexual abuse material), in Art. 5(1) points (ba) and (bb), which apply from 2 December 2026. `[D]` OJ text | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744 | OJ 24 Jul 2026 | Relevant to any product with image generation. | ai-governance-assurance, software-technology |
| The Omnibus rewrote Art. 4 so that providers and deployers "shall take measures to support the development of AI literacy of their staff", without having to guarantee any specific level of AI literacy of any individual. It also extended simplified documentation and quality management provisions to SMEs and small mid-caps. `[D]` | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202601744 | 24 Jul 2026 | Do not describe AI literacy as a strict training mandate. | ai-governance-assurance |
| The Omnibus requires Commission guidance on post-market monitoring by 2 September 2027 and on quality management and sectoral integration by 1 August 2027. `[D]` | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202601744 | 24 Jul 2026 | Detailed post-market monitoring guidance will arrive only three months before Annex III obligations apply. | ai-governance-assurance, ai-audit-readiness |
| AI Act continuing duties for high-risk systems. Art. 9(2): the risk management system is "a continuous iterative process planned and run throughout the entire lifecycle". Art. 12(1): systems "shall technically allow for the automatic recording of events (logs) over the lifetime of the system". Art. 19(1) and Art. 26(6): providers and deployers keep logs under their control "for a period appropriate to the intended purpose ... of at least six months". Art. 26(5): deployers monitor operation. Art. 72(2): post-market monitoring "shall actively and systematically collect, document and analyse relevant data". Art. 73(1): providers report serious incidents. `[D]` OJ text of the 2024 Act; the Omnibus amendments to these articles were not reviewed line by line. | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689 | OJ 12 Jul 2024 | These articles are the legal basis for saying high-risk AI needs continuing proof. | ai-governance-assurance, ai-audit-readiness, financial-services-ai-assurance, insurance-claims-ai-assurance, healthcare-ai-assurance |
| NIS2: transposition deadline 17 October 2024; reasoned opinions to 19 member states 7 May 2025; four member states referred to the Court of Justice 8 July 2026. `[D]` The Commission proposed amendments to NIS2 on 20 January 2026; these are proposals. `[S]` | https://digital-strategy.ec.europa.eu/en/policies/nis-transposition | 8 Jul 2026 | Say "NIS2 as transposed nationally". Avoid implying uniform application. | security-trust, software-technology, healthcare |
| SEC cybersecurity disclosure rules (Form 8-K Item 1.05; Regulation S-K Item 106) remain in force as far as verified. `[D]` | https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure | Reviewed 10 Sep 2024 | Applies to all SEC registrants in every industry covered. | security-trust, financial-services, software-technology |
| California ADMT regulations: effective 1 January 2026, ADMT compliance from 1 January 2027, risk assessment attestations due 1 April 2028. `[D]` | https://cppa.ca.gov/announcements/2025/20250923.html | 23 Sep 2025 | Covers significant decisions such as financial services, healthcare, employment. | ai-governance-assurance, insurance-claims-ai-assurance, financial-services-ai-assurance |
| GDPR Art. 22 (automated individual decision-making) remains in force. The Commission's Digital Omnibus proposals of 19 November 2025 on GDPR and data rules are separate from the AI Omnibus and were not confirmed as adopted. `[D]` OJ text for Art. 22, `[S]` for status | https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679 | In force | Do not state that GDPR has been amended. | ai-governance-assurance, insurance-claims-ai-assurance |
| Australia: from 10 December 2026, APP entities using personal information in automated decisions that could significantly affect individuals must describe in their privacy policies the kinds of personal information used and the kinds of decisions made `[D]` The clause numbers (APP 1.7 to 1.9, inserted by the Privacy and Other Legislation Amendment Act 2024) are `[S]`. OAIC opened a consultation on guidance on 18 May 2026, closing 15 June 2026; no final guidance was found on the page. `[D]` | https://www.oaic.gov.au/engage-with-us/consultations/consultation-on-guidance-for-transparency-in-automated-decision-making | Commences 10 Dec 2026 | Organisations need an accurate inventory of automated decisions to write a truthful policy. | ai-governance-assurance, insurance-claims-ai-assurance, financial-services-ai-assurance |
| Regulators in several jurisdictions issued frontier AI cyber warnings in 2026: UK joint statement (15 May 2026), NYDFS industry letter (May 2026), Bank of England FSR (7 July 2026). `[D]` | https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026 | May to Jul 2026 | A common regulatory theme of 2026: the speed of vulnerability exploitation is rising. | security-trust, disaster-recovery-assurance |

### Terminology and dates to get right

| Item | Correct current status (Sept 2026) | Common outdated claim to avoid |
|---|---|---|
| US model risk guidance | Revised Guidance on Model Risk Management, 17 April 2026 (Fed SR 26-2, OCC Bulletin 2026-13). | "SR 11-7 / OCC 2011-12 is the governing guidance." Both are superseded or rescinded. |
| US model risk guidance and generative AI | Generative and agentic AI are expressly outside the scope of the 2026 guidance; an RFI is planned. | "SR 26-2 governs LLMs" or "SR 11-7 applies to generative AI". |
| EU AI Act high-risk date (Annex III) | 2 December 2027. | "High-risk obligations apply from 2 August 2026." |
| EU AI Act high-risk date (Annex I products, incl. medical devices) | 2 August 2028. | "2 August 2027." |
| Digital Omnibus on AI | Adopted law: Regulation (EU) 2026/1744, in force 27 July 2026. | "The Commission has proposed a delay." |
| Digital Omnibus on data and GDPR | Separate proposal; adoption not confirmed. | "GDPR has been amended by the Omnibus." |
| AI Act Art. 4 AI literacy | Softened to a duty to take measures to support staff AI literacy. | "Mandatory AI literacy training for all staff." |
| DORA | Applies since 17 January 2025. First CTPPs designated 18 November 2025. | "DORA comes into force in 2025" (future tense), "CTPPs not yet designated". |
| UK operational resilience | Transition ended 31 March 2025; firms must remain within impact tolerances now. | "Firms have until March 2025." |
| EU AI Act marking of AI-generated content (Art. 50(2)) | Applies from 2 August 2026; systems already on the market before then must comply by 2 December 2026. | "Transparency obligations are delayed to 2027." |
| DORA CTPP count | 19 providers on the ESA list of 18 November 2025. | "Only hyperscalers were designated." The list includes data centre, telecom, market data and IT services firms. |
| UK incident and third-party reporting | FCA PS26/2 and PRA PS7/26 final, in force 18 March 2027. | "The FCA is consulting on incident reporting (CP24/28)." |
| UK critical third parties | Four providers designated, overseen from 13 July 2026. | "No CTPs have been designated yet." |
| PRA SS1/23 | In force since 17 May 2024; current version effective 23 April 2026; banks with internal model approval. | "SS1/23 applies to all firms" or "to insurers". |
| FCA and AI | No AI-specific rules planned; Consumer Duty and SM&CR apply. Mills Review published 6 July 2026. | "New FCA AI rules are coming." |
| APRA CPS 230 | In force since 1 July 2025. | "CPS 230 will commence in July 2025." |
| OSFI E-21 | Full adherence expected by 1 September 2026; scenario testing by 1 September 2027. | "E-21 is a draft." |
| OSFI E-23 | Final; effective 1 May 2027. | "E-23 is in force" or "E-23 is still in consultation". |
| NYDFS Part 500 | All phased requirements in force since 1 November 2025. | "Phased implementation through 2025." |
| PCI DSS | v4.0.1 is the current version; future-dated requirements effective since 31 March 2025. | "PCI DSS 4.0 best practices until 2025", "PCI DSS 3.2.1". |
| FFIEC CAT | Sunset 31 August 2025. | Citing the CAT as a current assessment tool. |
| NAIC AI Model Bulletin | 26 jurisdictions adopted as of 31 August 2026; it is a bulletin, not a model law. | "Adopted by 11 states", "about half the states" without a date, or "NAIC AI model law". |
| NYDFS Circular Letter 2024-7 | Underwriting and pricing only. | "Covers claims handling." |
| UK healthcare AI regulation | National Commission final recommendations published 10 September 2026; government response pending; no new rules yet. | "The UK has a new AI medical device framework." |
| APRA CPS 230 service provider contracts | Transition for pre-existing contracts ended 1 July 2026; targeted amendments effective 1 July 2026. | "Existing contracts are exempt until renewal." |
| HIPAA Security Rule update | Proposed only (NPRM 6 January 2025); not final. Unified Agenda lists final action as 07/2027 under Long-Term Actions. | "The new HIPAA Security Rule requires MFA and 72-hour restoration." |
| ONC / ASTP decision support transparency | HTI-1 DSI criterion in force; HTI-5 proposes removing AI model card requirements (not final). | "ONC requires model cards" without noting the pending proposal; or "model cards have been removed". |
| FDA AI guidance | PCCP guidance final; lifecycle guidance still draft; no final generative AI device guidance. | "FDA has finalised AI lifecycle guidance." |
| EHDS | In force 26 March 2025; most obligations apply from March 2029. | "EHDS obligations apply now." |
| NHS DTAC | Refreshed form and guidance published 24 February 2026. | Referencing the 2021 DTAC form. |
| ISO/IEC 27001 | 2022 edition only; 2013 certificates expired 31 October 2025. | "Transitioning to ISO 27001:2022." |
| SOC 2 criteria | 2017 Trust Services Criteria with Revised Points of Focus (2022). | "SOC 2 2022 criteria", "SSAE 16". |
| EU Cyber Resilience Act | Reporting obligations live since 11 September 2026; main obligations 11 December 2027. | "CRA applies from 2027" with no mention of live reporting. |
| EU Data Act | Applies since 12 September 2025; switching charges banned from 12 January 2027. | "The Data Act will apply in 2025." |
| NIS2 | In force; transposition incomplete in some member states; four referred to the CJEU 8 July 2026. | "NIS2 applies uniformly across the EU." |
| California ADMT rules | Effective 1 January 2026; ADMT compliance from 1 January 2027. | "CPPA is drafting ADMT rules." |
| Australia Privacy Act ADM transparency | Commences 10 December 2026. | "Australia has no automated decision rules" or "already in force". |
| HHS health IT office name | Assistant Secretary for Technology Policy / Office of the National Coordinator (ASTP/ONC). | "ONC" alone as the current full name. |

### Assurance angles per industry

These are operating observations drawn from the findings above. They are interpretation, not regulator statements, and should be written as Xyvionix's point of view.

#### Financial services

- The UK test changed tense in March 2025. Firms no longer show that they will be able to stay within impact tolerance; they must show that they can today. Mapping and scenario results age with every release, supplier change and reorganisation.
- US banks have a guidance gap for generative and agentic AI. The 2026 model risk guidance excludes them, so each bank's own standard becomes the thing examiners assess. A standard with no evidence behind it is a liability.
- Direct oversight of cloud providers (EU CTPPs, UK CTPs) does not transfer accountability. The regulators say so in terms. The firm still needs its own view of whether a dependency is meeting the service it relies on.
- Three regimes now converge on registers: DORA's register of information, UK material third-party reporting from March 2027, and APRA's material service provider lists. A register is only useful if it matches what is running in production.
- Regulators are describing a shorter vulnerability cycle. If exploitation time falls, the interval between control tests has to fall with it, or the last test result stops describing the estate.
- Credit scoring has a fixed AI Act date of 2 December 2027. Log retention, monitoring and human oversight evidence cannot be produced retrospectively for decisions already made.
- Model inventories are named as "evergreen" by OSFI and as a control weakness by APRA. The common failure is not a missing inventory but one that stopped being updated.

#### Insurance

- The NAIC bulletin is principle-led and examined through market conduct. An insurer is asked to produce its AI programme and show it operating, across up to 26 jurisdictions with local variations.
- Claims is where automation meets a statutory duty of fair handling. Pricing rules (New York, Colorado, AI Act Annex III) are more developed than claims rules, so claims evidence standards are being set by insurers themselves and tested in complaints and litigation.
- Every automated claim decision needs a record that can be reconstructed later: inputs, model version, rule set, human involvement, outcome. Model versions change faster than claim files close.
- Bias and drift testing are recurring duties in the Colorado regulation and the New York circular letter. A single pre-launch fairness test does not satisfy either.
- Vendor models do not move responsibility. NAIC, NYDFS, EIOPA and APRA all place accountability on the insurer, including audit rights and notice of model changes.
- Insurers in the EU answer to DORA for ICT resilience and Solvency II for operational risk. Claims payment availability is both a resilience measure and a conduct measure.
- UK Consumer Duty asks for outcome monitoring. For automated claims that means comparing outcomes across customer groups over time, which needs decision data kept in usable form.

#### Healthcare

- The enforceable HIPAA Security Rule is the existing one. OCR's enforcement focus is whether the risk analysis is accurate, thorough and acted on. Most failures are of currency: systems added or changed since the analysis was written.
- US federal transparency requirements for AI embedded in certified health IT may shrink if HTI-5 is finalised. Provider organisations would then hold more of the burden of knowing how a clinical AI tool behaves locally.
- FDA's PCCP model approves a change envelope in advance. The continuing question is whether each model update stayed inside the envelope and performed as expected on the local population.
- Joint Commission and CHAI guidance puts local validation and monitoring on the deploying organisation. A vendor's clearance or certification does not show performance at a particular hospital.
- Downtime is a clinical safety matter. Recovery objectives should be set from the clinical consequence of losing a system, and recovery should be proven by restoration tests, not by backup job status.
- The Change Healthcare incident showed that a third party outside the hospital can stop revenue and care coordination. Dependency mapping has to include clearinghouses, not only hosted clinical systems.
- NHS suppliers face DTAC at procurement and DSPT annually. Both are submissions at a date; the clinical safety case and cyber controls they describe have to stay true between submissions.

#### Software and technology (SaaS)

- A SOC 2 Type II report describes a period that has ended. Enterprise buyers increasingly ask what has changed since, which the report cannot answer.
- ISO/IEC 42001 certifies the management system. It does not attest to how a specific AI feature behaves in production this week. Buyers asking about AI features want the second thing.
- Availability SLAs are measured by the vendor and disputed by the customer. Evidence that both sides accept, measured from the customer's point of use, reduces credit disputes and renewal friction.
- The Data Act makes exit a legal capability from 12 January 2027 without switching charges. Export and switching paths that are never exercised tend to fail when invoked.
- CRA reporting is live. A software maker needs to know within 24 hours whether a vulnerability in its product is being actively exploited, which depends on telemetry it may not have.
- AI inference cost is a disclosed margin factor for at least one hyperscaler. For SaaS vendors the operational point is that AI features need cost and quality observed together, per feature, or margin erosion is found at quarter end.
- SaaS vendors selling to banks, insurers and hospitals inherit their customers' obligations through contract: DORA Art. 30 service levels, audit rights, incident notice, AI addenda. The vendor's evidence becomes part of the customer's assurance file.

#### Cross-industry

- The AI Act delay moved the date, not the duties. Logging and monitoring infrastructure takes longer to build than policy documents.
- Three 2026 to 2027 dates cluster: 10 December 2026 (Australia ADM transparency), 1 January 2027 (California ADMT), 18 March 2027 (UK incident reporting). Each depends on an accurate inventory of what is automated and what is critical.
- Regulators in the UK, US, EU and Australia avoided writing new AI rulebooks and applied existing duties instead. This raises the evidential burden, because there is no checklist that ends the conversation.
- Where a rule names a frequency (DORA yearly testing, three-yearly TLPT, proposed HIPAA six-monthly scans), treat it as a floor. The assurance question is whether the control worked on the day it was needed.

### Could not verify

Research limits after the second pass: the web search budget stayed exhausted, so only known or discoverable URLs could be retried. Still blocked: hhs.gov, iso.org, ffiec.gov and ithandbook.ffiec.gov (HTTP 403), doi.colorado.gov (HTTP 403), tga.gov.au (timeout), EUR-Lex PDFs for Solvency II and Directive (EU) 2025/2 (empty response). federalregister.gov redirected to an unblock page, but its API and the govinfo PDF worked.

#### Closed in the second pass (now `[D]` in the tables)

| Item | Confirmed from |
|---|---|
| DORA CTPP count of 19 | ESAs list PDF |
| DORA Art. 11, 24, 26, 28, 30 wording and 17 January 2025 application | Official Journal PDF |
| AI Act Annex III point 5(b) and 5(c), Art. 9, 12, 19, 26, 72, 73 | Official Journal PDF |
| Omnibus dates: 2 December 2027, 2 August 2028, Art. 50(2) by 2 December 2026, new prohibitions from 2 December 2026 | Official Journal PDF of Regulation (EU) 2026/1744 |
| GDPR Art. 22 wording | Official Journal PDF |
| NIS2 entity types, Art. 41 dates, Art. 23(4) timelines | Official Journal PDF |
| Data Act Art. 29 and application date | Official Journal PDF |
| HIPAA NPRM status and proposed frequencies | Federal Register PDF (govinfo), Federal Register API, reginfo.gov |
| NAIC bulletin scope including claims; pilot states and dates | NAIC PDFs |
| ISO/IEC 27001 transition rule | IAF MD 26:2022 PDF |
| PCI DSS v4.0 retirement 31 December 2024 | PCI SSC blog |
| NYDFS Part 500 phase dates and 15 April notice | DFS amendment text PDF |
| APRA CPS 234 requirements | APRA standard PDF |
| PRA PS7/26, UK joint frontier AI statement | Bank of England pages |
| MHRA National Commission final report (10 September 2026) | gov.uk |
| EIOPA guideline revocation, MDCG 2025-6, DTAC, DSPT, FSB October 2025 report, MAS consultation, EU MCC-AI, California SB 1120, CSA STAR for AI components | Source pages |

#### Still open

| Item | What is uncertain | Where to check |
|---|---|---|
| HIPAA Unified Agenda edition | The entry showing Long-Term Actions and final action 07/2027 was read at reginfo pubId 202510; the edition name was not shown. The target is non-binding. | reginfo.gov RIN 0945-AA22 |
| OCR Risk Analysis Initiative counts | Secondary sources cite 13 initiative actions and 19 ransomware investigations; hhs.gov returned HTTP 403. Do not publish counts. | HHS press room |
| Change Healthcare affected count | About 192.7 million is reported by secondary sources as the figure notified to OCR on 31 July 2025; HHS pages returned HTTP 403 and the breach portal listing could not be read. | HHS OCR Change Healthcare FAQ; OCR breach portal |
| Number of FDA-authorised AI-enabled devices | A figure of "over 1,600" came from a page summary and was not confirmed against the list. Do not publish a number. | FDA AI-enabled medical devices list |
| FDA PCCP guidance date | FDA page shows final, issue date August 2025, docket FDA-2022-D-2628. It carries no note explaining the relationship to the December 2024 final version. | FDA guidance page |
| AI Act high-risk articles after the Omnibus | Articles 9, 12, 19, 26, 72 and 73 were read in the 2024 text. Omnibus changes to those articles were not reviewed line by line. | Regulation (EU) 2026/1744 |
| ISO/IEC 27001:2022 publication month | October 2022 is from memory; iso.org refused access. The 31 October 2025 date depends on it. | iso.org; accreditation body notices |
| ISO/IEC 42001 details and adoption levels | Title, 2023 publication and certifiability are from memory. No authoritative certificate count was found. Do not state adoption figures. | iso.org; ISO Survey |
| SOC 2 Type I versus Type II definition | From memory of AICPA guidance; the AICPA page read did not define them. That the 2022 points of focus left the criteria unchanged is from secondary sources. | AICPA SOC 2 guide |
| Colorado Regulation 10-1-1 compliance dates | Interim report 1 December 2025 and compliance by 1 July 2026 for auto and health insurers are from law firm summaries. Only the 15 October 2025 amendment date is confirmed (NAIC map). | Colorado Division of Insurance |
| Solvency II Art. 41 and 44; Directive (EU) 2025/2 | Article references are from memory. Application of the amending directive from 30 January 2027 is from secondary sources. | EUR-Lex |
| OSFI B-13 effective date | 1 January 2024 is from memory; the page read showed only the 31 July 2022 publication date. | osfi-bsif.gc.ca |
| FFIEC CAT sunset and IT Handbook updates | 31 August 2025 sunset is from search results pointing at ffiec.gov; the February 2026 handbook update is from a vendor blog. Both FFIEC sites returned HTTP 403. | ffiec.gov; ithandbook.ffiec.gov |
| California SB 1120 operative date | 1 January 2025 is from secondary sources; the bill page confirmed content and approval date only. | California Legislative Information |
| DTAC publication date | NHS notice is dated 4 March 2026; 24 February 2026 is from secondary sources. | NHS England DTAC page |
| TGA report details | Page timed out three times. Date (July 2025) and content are from secondary sources. | tga.gov.au |
| OAIC ADM guidance | No final guidance was visible on the consultation page. Whether it has since been published elsewhere is unknown. | oaic.gov.au |
| MAS AI Risk Management Guidelines | Consultation confirmed; finalisation status unknown. | mas.gov.sg |
| SEC Item 1.05 status | No rescission found, but 2026 SEC rulemaking was not fully checked. | sec.gov rulemaking index |
| EU GDPR and data Digital Omnibus | Legislative status unknown. | EUR-Lex procedure file |
| UK GDPR automated decision rules | UK law on automated decisions has diverged from EU Art. 22 and was not checked. Do not apply the EU wording to UK pages. | legislation.gov.uk |
| NIS2 count of transposing states | No authoritative current count found. | Commission NIS2 transposition page |
| NYDFS amendment text | The PDF read is a DFS comparison copy marked as not the official version. | Official NYCRR text |
| Bank for International Settlements AI papers | Titles surfaced in search but were not read; omitted from findings. | bis.org |
| Agentic AI rules | No binding rule specific to agentic AI was found from any regulator. Statements found are supervisory letters, consultations (FSB, MAS) and reviews (FCA Mills, MHRA Commission). | n/a |
| Industry-wide SaaS gross margin impact of AI | No authoritative industry statistic found. Only the single Microsoft disclosure is sourced. | Company filings |
| Customer-driven availability SLA norms | No primary source sets standard SLA percentages. Do not quote typical uptime figures as fact. | n/a |
| Page-summary reliability | Findings marked `[D]` without "OJ text", "FR text" or "PDF text" were read through an automated page summary. One such summary misread a PDF during this pass. Spot-check dates before using them in headlines. | Source URLs in the tables |
