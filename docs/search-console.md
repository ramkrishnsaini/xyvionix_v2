# Google Search Console

Source: `docs/research/01-google-search.md`, researched 2026-09-27 from Google Search
Central. Interface names change, so confirm against the live product.

## Setup

| Step | Action |
|---|---|
| 1 | Add a **Domain property** for `xyvionix.com`. It covers `http`, `https`, `www` and every subdomain in one property |
| 2 | Verify by DNS TXT record at the domain registrar or DNS host |
| 3 | Keep the TXT record permanently. Removing it removes verification |
| 4 | Add at least two owners, so access survives one person leaving |
| 5 | Optionally add a URL-prefix property for `https://xyvionix.com/` to use tools that need one |

No verification file or meta tag is committed to this repository. DNS verification needs
neither.

## Sitemap

Submit one URL: `https://xyvionix.com/sitemap-index.xml`

The index lists one file per content type:

| File | Contents |
|---|---|
| `sitemap-pages-0.xml` | Home, hubs, method, trust, company, contact, legal |
| `sitemap-assurance-0.xml` | Assurance hubs and pages |
| `sitemap-use-cases-0.xml` | Use cases |
| `sitemap-technologies-0.xml` | Technology pages |
| `sitemap-industries-0.xml` | Industry pages |
| `sitemap-insights-0.xml` | Insights |

Splitting by type makes the Page indexing report filterable by content type. Each file
holds canonical, indexable URLs only. Drafts, `/search` and the 404 page are excluded.
`lastmod` is each page's real modification date. `priority` and `changefreq` are not
emitted, because Google ignores them.

## AI features

1. Find the generative AI control in Search Console settings and confirm the site is
   included in AI Overviews and AI Mode.
2. `Google-Extended` governs use for Gemini training and grounding. It does not affect
   Search or AI Overviews. This site allows it.
3. There is no special markup, file or technique for AI features. The same crawlable,
   indexable, snippet-eligible page serves both. Do not add `nosnippet`,
   `max-snippet:0` or `data-nosnippet` to content that should appear.

Every indexable page sends
`index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.

## First week after launch

| Day | Action |
|---|---|
| 0 | Submit the sitemap. Confirm it is read with no errors and the discovered URL count is about 112 |
| 0 | URL Inspection on the home page and the six assurance hubs. Use "Test live URL", confirm the rendered HTML contains the full content, then request indexing |
| 1 | Check Settings, Crawl stats. Responses should be 200. Any 403, 429 or 5xx means the firewall or host is blocking Googlebot |
| 3 | Page indexing report: review "Why pages aren't indexed" |
| 7 | Request indexing for the four industry pages and the featured insights |

## Reports to review

| Report | Frequency | What to look for |
|---|---|---|
| Page indexing | Weekly for a month, then monthly | "Crawled, currently not indexed" and "Discovered, currently not indexed" growing. "Duplicate without user-selected canonical" should be zero |
| Performance, Search results | Monthly | Impressions and clicks by page and by query. Filter by sitemap to compare content types |
| Performance, generative AI reporting | Monthly | Presence in AI features, where the report is available for the property |
| Core Web Vitals | Monthly | Needs field data, so it appears only after enough traffic. Targets: LCP 2.5 s, INP 200 ms, CLS 0.1 |
| Enhancements, Breadcrumbs | After launch and after schema changes | No errors |
| Crawl stats | Monthly | Status codes, response time, crawl by purpose |
| Links | Quarterly | Top linked pages, and external links to old URLs that need redirects |
| Manual actions, Security issues | Monthly | Both should be empty |

Multimodal and image search reporting: review Performance with the search type set to
Image, where diagrams and Open Graph images may appear.

## Expected findings that are not problems

| Finding | Explanation |
|---|---|
| `/search` excluded by `noindex` | Intended |
| `/404` not indexed | Intended |
| "Alternate page with proper canonical" for `.html` or trailing-slash variants | The host redirects these. Confirm the redirect is a single 301 |
| No FAQ or HowTo enhancement reports | Those rich results are retired and the site emits no such markup |
| Core Web Vitals "Not enough data" | Normal for a new site |

## When content changes

| Change | Action |
|---|---|
| New page | It enters the sitemap on the next build. Request indexing for important pages |
| Material update | Update `modifiedDate` in frontmatter so `lastmod` changes |
| Slug change | Add a 301 in `docs/redirects.md` and the host config in the same release |
| Page removed | Redirect to the page that absorbed it, or return 410 |

## Spam policy reminders

- Do not create a page for each variation of a query.
- Do not publish industry, service and technology combinations generated from a template.
- Do not interfere with the back button. The site uses no history manipulation beyond
  keeping the search query in the URL with `replaceState`.
