# Google Search and SEO — research, September 2026

Research date: 2026-09-27. Sources are Google primary documentation unless stated.

## AI Overviews and AI Mode

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Eligibility: "a page must be indexed and eligible to be shown in Google Search with a snippet". "There are no additional technical requirements." | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | No AI-specific build work. Page-level gate is indexability plus snippet eligibility. This older doc does not yet mention the Search Console control in the next row. | All pages; `robots.txt`; base layout `<head>` |
| New in 2026: a site must also be set to "Include" in the Search Console "Search generative AI control" (Settings > Search generative AI). Default is Include. Options: Include / Exclude / Inherit from parent. Covers AI Overviews, AI Mode, generative AI features in Discover. | https://support.google.com/webmasters/answer/16908024 | Rolled out to all sites worldwide 2026-08-31 | Property-level switch, not a page tag. Leave at default Include; check the domain property after verification. | Search Console property settings (no repo file) |
| Excluding via that control is not a ranking or inclusion signal for the rest of Search, and does not affect AI training. Change takes effect in roughly 1-2 days, some content longer. | https://support.google.com/webmasters/answer/16908024 | 2026-08-31 note | Documents that the control is scoped only to generative features. | Ops runbook |
| Page-level controls to limit what is shown: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`. Googlebot robots.txt rules are the crawl control. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Do not set `nosnippet` or a low `max-snippet` sitewide; it removes AI feature eligibility. | Base layout meta robots |
| `Google-Extended` limits AI training and grounding in "some of Google's other systems"; it is not the control for Search AI features. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Blocking Google-Extended does not remove pages from AI Overviews / AI Mode. Decide separately as a policy choice. | `public/robots.txt` |
| Both features may use "query fan-out" (multiple related searches); AI Overviews "often don't trigger". | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Supports deep topical pages over one page per query variant. | Information architecture |
| Listed fundamentals: crawling allowed in robots.txt and by CDN/hosting; internal links; important content in textual form; structured data matches visible text. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 | Key claims must be HTML text, not only in diagrams or images. | All content pages; CDN/WAF bot rules |

## Generative AI search guidance

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| New official guide "Optimizing your website for generative AI features on Google Search"; announced by John Mueller. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing | Published 2026-05-15; updated 2026-07-10 | Primary reference for the site's AI search strategy. | SEO strategy doc |
| Google's position on AEO/GEO: "optimizing for generative AI search is optimizing for the search experience, and thus still SEO." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Do not build a separate "GEO" layer. | Whole site |
| Things Google says to ignore: llms.txt and special markup/Markdown, "chunking" content, rewriting for AI, inauthentic mentions, overfocusing on structured data. "There's no ideal page length." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | No artificial Q&A fragmenting of pages. | Content templates |
| Priority is "non-commodity content": unique viewpoint, first-hand expertise, not content that "could easily be produced by a generative AI model". | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | 110 pages must each carry distinct expert substance; templated near-duplicates are a risk. | All content pages |
| Creating separate pages for every query variation or fan-out query "primarily to manipulate rankings or generative AI responses" violates the scaled content abuse policy. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Direct constraint on programmatic page sets (industry x capability matrices). | Industry, use-case, comparison page sets |
| Semantic HTML is recommended, not required; it helps screen readers and agents. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 | Astro components should emit real headings, lists, landmarks. | Layouts and components |
| Spam policies explicitly apply to generative AI responses in Search. | https://developers.google.com/search/updates | Doc update 2026-05-15 | Same compliance bar for AI surfaces. | Whole site |

## Search Console reporting

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Generative AI performance report (Search and Discover) launched. Shows impressions only, by Pages, Countries, Devices, Dates. Covers AI Overviews and AI Mode. | https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports ; https://support.google.com/webmasters/answer/16984139 | Announced 2026-06-03; all sites worldwide 2026-08-31 | Measurement source for AI visibility. No clicks or queries documented in this report. | Analytics plan |
| Data is attributed to the canonical URL; chart aggregates by property, table by page. Search Labs experiments excluded. | https://support.google.com/webmasters/answer/16984139 | 2026 | Correct canonicals are required for clean reporting. | Canonical tags |
| AI Overviews and AI Mode traffic is also counted in the main Performance report under the "Web" search type. | https://developers.google.com/search/docs/appearance/ai-features | Updated 2025-12-10 (AI Mode counted since 2025-06-16) | Total Web figures already include AI surfaces. | Analytics plan |
| Web multimodal search reporting added: new "multimodal" search type filter. Covers Lens, Circle to Search, image uploads, Chrome "Search this image". | https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc | 2026-09-24, rolling out globally | Diagrams and product imagery now have measurable search traffic. | Image assets |
| Search Analytics API `type` values documented: `discover`, `googleNews`, `news`, `image`, `video`, `web`. No generative AI or multimodal value is documented. | https://developers.google.com/webmaster-tools/v1/searchanalytics/query | Updated 2026-08-11 | Plan on UI export for AI and multimodal data; do not design dashboards around an API for it. | Analytics plan |
| Other 2025-2026 additions: branded queries filter (2025-11), custom annotations (2025-11), social channels (2025-12), weekly/monthly views (2025-12), AI-powered report configuration (2025-12), platform properties for social/video (2026-07). | https://developers.google.com/search/blog | 2025-11 to 2026-07 | Useful for launch monitoring; no build impact. | None |

## Structured data changes 2025-2026

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

## Crawling, indexing, canonicals, sitemaps, robots

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

## Image and multimodal search

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

## Preferred sources

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Users can pick preferred sources; chosen sites are more likely to appear in Top Stories with a "preferred" badge, and can be badged in AI Mode and AI Overviews. | https://developers.google.com/search/docs/appearance/preferred-sources | Doc published 2026-01-30; updated 2026-09-18 | Mainly a news/publisher feature. Low priority for a B2B product site; relevant only if the blog publishes timely content. | Blog layout (optional) |
| Availability: Top Stories globally in all Search languages (2026-04-30); AI Overviews and AI Mode rollout (2026-05-27). | https://developers.google.com/search/updates | 2026-04-30 / 2026-05-27 | Context. | None |
| Only domain-level and subdomain-level sites are eligible; a subdirectory such as `/blog` is not. | https://developers.google.com/search/docs/appearance/preferred-sources | Updated 2026-09-18 | Eligibility would attach to the whole xyvionix.com host. | Domain strategy |
| User-facing help states: "Sources that aren't updated regularly may not be available" in the source preferences tool. | https://support.google.com/websearch/answer/16379181 | Read 2026-09-27 | A site without regularly published content may not be listed at all. Check the tool before building any button. | Blog publishing cadence |
| AI feature eligibility for preferred sources requires the Search Console generative AI control set to Include. | https://developers.google.com/search/docs/appearance/preferred-sources | Updated 2026-09-18 | Same control as above. | Search Console settings |
| Implementation options: script `https://news.google.com/swg/js/v1/publisher.js` plus `<div google-add-preferred-source-btn>`; custom button via JS SDK (added 2026-08-20); or deeplink `https://www.google.com/preferences/source?q=example.com`. None is required to appear. | https://developers.google.com/search/docs/appearance/preferred-sources | Updated 2026-09-18 | If used, prefer the plain deeplink: no third-party script, no CSP or performance cost. | Footer or blog component, CSP |

## AI agents and agentic browsing

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

## Spam policies

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

## Core Web Vitals

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Three metrics: LCP (good within 2.5 s), INP (good under 200 ms), CLS (good under 0.1). | https://developers.google.com/search/docs/appearance/core-web-vitals | Updated 2025-12-10 | Performance budget targets for every template. | All layouts, performance CI |
| Full thresholds at the 75th percentile: LCP good <=2500 ms, poor >4000 ms; INP good <=200 ms, poor >500 ms; CLS good <=0.1, poor >0.25. | https://web.dev/articles/defining-core-web-vitals-thresholds | Updated 2025-05-07 | Measured on field data, mobile and desktop separately. | Performance budget |
| "Core Web Vitals are used by our ranking systems." Other page experience aspects "don't directly help your website rank higher". No single page experience signal. | https://developers.google.com/search/docs/appearance/page-experience | Updated 2026-09-22 | Worth meeting, not worth chasing perfect scores. | Performance plan |
| Page experience self-check: HTTPS, mobile display, no intrusive interstitials, main content easy to distinguish. | https://developers.google.com/search/docs/appearance/page-experience | Updated 2026-09-22 | Consent banner and demo popups must not act as intrusive interstitials. | Consent banner, popups |

## llms.txt

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search ... as Google Search itself doesn't use them." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting | 2026-07-10 | llms.txt has no Google Search value. | `public/llms.txt` (optional) |
| Maintaining llms.txt for other services is fine: "Doing so will neither harm nor help your site's visibility or rankings in Google Search, as Google Search ignores them." | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting ; https://developers.google.com/search/updates (2026-06-15) | Clarified 2026-06-15 | Safe to ship for non-Google consumers; do not describe it as a Google SEO feature. | `public/llms.txt`, SEO documentation |
| Google may crawl and index such files like any other file, with no special treatment. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting | 2026-07-10 | An llms.txt or Markdown mirror can appear in results as a duplicate; consider `X-Robots-Tag: noindex` on it. | Host headers config |

## Trailing slash and canonical domain

| Finding | Source URL | Published / updated | Relevance to Xyvionix | Pages / files impacted |
|---|---|---|---|---|
| Google treats slash and non-slash URLs as separate URLs. Only the root is exempt: `https://example.com` equals `https://example.com/`. | https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash | 2010-04-21 (still the published Google reference) | Pick one form and enforce it. Google states no preference. | `astro.config` `trailingSlash`, host redirects |
| Recommended handling: choose one version, use it in internal links and sitemap, 301 the other; `rel="canonical"` if a redirect is not possible. | https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash | 2010-04-21 | Astro `trailingSlash` and `build.format` must match host behaviour so no internal link triggers a redirect. | `astro.config`, link helper, sitemap |
| Protocol variants (HTTP/HTTPS) are listed as a duplicate source; redirects are the strongest canonical signal. | https://developers.google.com/search/docs/crawling-indexing/canonicalization ; https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | Updated 2026-08-20 / 2026-07-10 | One canonical origin; 301 http and the non-chosen www/apex variant to it. | DNS / host redirect rules, `site` in `astro.config` |
| Site moves: use the Change of Address tool for all subdomain variants including www and non-www. | https://developers.google.com/search/updates (2026-06-17) | 2026-06-17 | Applies if v2 launches on a different host than v1. | Launch runbook |
| URLs are case sensitive; use hyphens, not underscores; do not use fragments to change content. | https://developers.google.com/search/docs/crawling-indexing/url-structure | Updated 2025-12-10 | Lowercase hyphenated slugs only. | Content collection slugs, routes |

## Terminology: current vs deprecated

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

## Implementation rules derived

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

## Could not verify

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
