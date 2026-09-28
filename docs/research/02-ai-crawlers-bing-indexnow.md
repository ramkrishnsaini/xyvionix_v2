# AI crawlers, Bing and IndexNow — research, September 2026

Research date: 2026-09-27. Primary vendor documentation only; anything not confirmed there is listed under "Could not verify".

## 1. OpenAI crawlers

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

## 2. Other documented AI and search crawlers

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

## 3. Bing Webmaster Tools

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

## 4. IndexNow

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

## 5. llms.txt

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

## 6. WAF/CDN bot handling

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

## Recommended robots.txt

Every token below appears in the vendor's own documentation cited in sections 1 and 2. Assumptions to confirm before shipping: canonical host (`https://xyvionix.com` vs `www`) and sitemap filename (`sitemap-index.xml` is the Astro sitemap integration default). Add `Disallow` lines only for paths that really exist.

```
# Xyvionix robots.txt
# Policy: open to search, AI search, AI assistants and AI training crawlers.
# Keep pages out of indexes with <meta name="robots" content="noindex">, not Disallow.

User-agent: *
Allow: /

# Named group (one group, many user-agents). A crawler that matches a named group
# ignores the * group, so any future Disallow must be added to BOTH groups.
# Vendors in order: OpenAI, Anthropic, Perplexity, Google, Microsoft, Apple, Amazon,
# Meta, DuckDuckGo, Common Crawl, Mistral.

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

## Implementation rules derived

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

## Could not verify

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
