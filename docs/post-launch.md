# Post-launch measurement

## What to measure

| Measure | Source | Frequency |
|---|---|---|
| Google impressions and clicks | Search Console, Performance | Monthly |
| Indexed pages against published pages | Search Console, Page indexing | Weekly for a month, then monthly |
| Visibility in generative AI search | Search Console generative AI reporting, where available | Monthly |
| Image and multimodal visibility | Search Console, Performance, search type Image | Quarterly |
| Bing visibility | Bing Webmaster Tools, Search Performance | Monthly |
| Copilot and AI answer citations | Bing Webmaster Tools, AI Performance | Monthly |
| ChatGPT referrals | Analytics, sessions with `utm_source=chatgpt.com` or referrer `chatgpt.com` | Monthly |
| Other AI referrals | Analytics, referrers `claude.ai`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com` | Monthly |
| `OAI-SearchBot` and other crawler activity | CDN or origin logs, by user agent and status code | Weekly for a month, then monthly |
| Branded search growth | Search Console, queries containing "xyvionix" | Monthly |
| Qualified enquiries | Contact form submissions judged to be a real assurance need | Monthly |
| Enquiry conversion | `contact_submit` divided by sessions reaching `/contact` | Monthly |
| Top assurance cluster | Sessions and enquiries by `assurance_area` | Monthly |
| Top use case, industry and technology | Sessions by page type | Monthly |
| Assisted conversion from insights | Sessions that viewed an insight and later reached an assurance page or `/contact` | Quarterly |

## Analytics events

The site dispatches interaction events as DOM events named `xyv:track`. No analytics
provider is installed and no identifier is hard-coded. See `src/scripts/analytics.ts`.

| Event | Fired when | Properties |
|---|---|---|
| `cta_click` | Any call to action is clicked | `location`, `page_type`, `path` |
| `contact_start` | First input in the contact form | `page_type` |
| `contact_submit` | The form is accepted by the endpoint | `assurance_area` |
| `page_engaged` | An assurance page is open for 30 seconds and scrolled past half | `page_type`, `path` |
| `journey` | A visitor arrives on an assurance or contact page from a use case, technology, industry or insight page | `from`, `to` |
| `related_click`, `listing_click`, `card_click`, `insight_click` | A related, listing, card or insight link is clicked | `location`, `href` |

The `journey` event provides the four conversions the specification asks for: use case to
assurance, technology to assurance, industry to assurance, and insight to commercial page.

### Attaching a provider

1. Choose a provider. A cookieless, privacy-preserving one avoids a consent banner in most
   jurisdictions. Confirm with counsel.
2. Set `PUBLIC_ANALYTICS_ORIGIN` to the provider's script origin, so
   `scripts/build-headers.mjs` adds it to the Content-Security-Policy.
3. Load the provider's script from a file in `src/scripts/`, and forward events:

   ```ts
   document.addEventListener('xyv:track', (event) => {
     const { name, props } = (event as CustomEvent).detail;
     provider.track(name, props);
   });
   ```

4. Set `analyticsProvider` in `src/data/legal.ts`, which updates the privacy notice.
5. Never add a provider identifier that is not real.

## Crawler log review

From CDN or origin logs, for each of `Googlebot`, `bingbot`, `OAI-SearchBot`, `GPTBot`,
`ClaudeBot`, `Claude-SearchBot` and `PerplexityBot`:

| Question | Healthy answer |
|---|---|
| Is it visiting? | Yes, within two weeks of launch |
| What status codes does it get? | 200 for pages, 301 for redirected variants, 404 only for URLs that never existed |
| Any 403, 429, 402 or challenge responses? | None. If present, the firewall or bot product is blocking it: see `docs/ai-discovery.md` |
| Does it fetch `robots.txt` and the sitemap? | Yes |
| Which pages does it fetch most? | Hubs and recently changed pages |

## Content health

| Check | Command | Frequency |
|---|---|---|
| Pages due for review | `npm run report:review -- --write` | Monthly |
| Unverified claims | `npm run report:claims -- --write` | Before every release that changes copy |
| Build validation | `npm run build` | Every release |
| Docs in step with content | `npm run docs:generate` | Every content release |

Review cadence by page type:

| Pages | Cadence |
|---|---|
| AI, vendor platform and security pages | 90 days |
| Cloud, Kubernetes and data platform pages | 90 to 180 days |
| Methodology and category pages | 365 days |

A review means checking every dated fact and product name against the vendor's or
regulator's current documentation, then updating `lastReviewed`, and `modifiedDate` if
the content changed.

## Decisions the data should drive

| Signal | Action |
|---|---|
| A use case draws enquiries | Write the P1 pages in its cluster, and an insight that goes deeper |
| A page is indexed but gets no impressions after 90 days | Check intent and title. Improve, merge or remove it |
| A page is "crawled, currently not indexed" | Assess whether it is distinct enough. Strengthen or merge it |
| Two pages compete for the same queries | Merge into the stronger and redirect |
| AI referrals land on one page repeatedly | Keep that page's facts current first |
| A backlog page's topic appears in search queries | Promote it in `docs/content-roadmap.md` |

## What not to do

- Do not publish pages in volume to increase page count.
- Do not add FAQ blocks to pages for search purposes.
- Do not rewrite titles monthly. Change a title when the intent is wrong, then leave it.
- Do not claim or imply that `llms.txt` affects ranking.
