# AI and search discovery

Source for every fact here: `docs/research/02-ai-crawlers-bing-indexnow.md` and
`docs/research/01-google-search.md`, researched 2026-09-27 from the vendors' own
documentation. Re-check every 90 days: crawler names and defaults change.

## Policy

Xyvionix wants to be found by search engines, AI search and AI assistants, and currently
allows AI training crawlers too. The public site is fully open.

| Decision | Setting | Owner of the decision |
|---|---|---|
| Search engines | Allowed | Fixed |
| AI search (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` and similar) | Allowed | Fixed |
| AI training (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot` and similar) | Allowed | Business decision. Can be changed later without affecting search |
| User-triggered fetchers | Allowed | Decided at the WAF, not in robots.txt |

Normal SEO remains the foundation for generative search. There is no separate technique
for AI search, and this site uses none.

## robots.txt

File: `public/robots.txt`. It contains a `*` group and one named group listing every
documented crawler, each with `Allow: /`, and the sitemap line.

Rules for maintaining it:

- Add a user-agent token only with a link to the vendor's own documentation.
- A crawler that matches a named group ignores the `*` group. Any future `Disallow` must
  be added to both groups.
- Keep pages out of indexes with a robots meta tag, never with `Disallow`.
- Never emit `noarchive`, `nocache` or `nosnippet` on public pages. Bing documents that
  these limit or remove use in Copilot. The build fails if one appears.
- Allow 24 hours after any change before testing, and 72 hours for `DuckAssistBot`.

## OpenAI: three different agents

These are often confused. They do different things.

| Agent | What it does | This site |
|---|---|---|
| `OAI-SearchBot` | Builds the index that ChatGPT search draws on. A site must allow it to appear in ChatGPT search | Allowed |
| `GPTBot` | Crawls content that may be used to train foundation models | Allowed, as a business decision |
| `ChatGPT-User` | Fetches a page when a user's request triggers it. It is not the search crawler, and OpenAI states robots.txt rules may not apply to it | Allowed |
| `OAI-AdsBot` | Validates landing pages submitted as ads | Allowed |

Blocking `GPTBot` later would not remove the site from ChatGPT search. Blocking
`OAI-SearchBot` would. OpenAI documents `utm_source=chatgpt.com` on referrals from
ChatGPT, which is how that traffic is identified in analytics.

## Documented crawlers

| Vendor | Token | Purpose | Honours robots.txt | IP list or verification |
|---|---|---|---|---|
| OpenAI | `OAI-SearchBot` | Search index | Yes | https://openai.com/searchbot.json |
| OpenAI | `GPTBot` | Training | Yes | https://openai.com/gptbot.json |
| OpenAI | `ChatGPT-User` | User-triggered fetch | May not apply | https://openai.com/chatgpt-user.json |
| OpenAI | `OAI-AdsBot` | Ad landing page validation | Not stated | https://openai.com/adsbot.json |
| Anthropic | `ClaudeBot` | Training | Yes | https://claude.com/crawling/bots.json |
| Anthropic | `Claude-SearchBot` | Search index | Yes | Same list |
| Anthropic | `Claude-User` | User-triggered fetch | Yes | Same list |
| Perplexity | `PerplexityBot` | Search index | Yes | https://www.perplexity.com/perplexitybot.json |
| Perplexity | `Perplexity-User` | User-triggered fetch | Generally not | https://www.perplexity.com/perplexity-user.json |
| Google | `Googlebot` | Search, including AI Overviews and AI Mode | Yes | Reverse DNS `*.googlebot.com`, and Google's published ranges |
| Google | `Google-Extended` | Control token for Gemini training and grounding. Does not affect Search | Yes | No crawler of its own |
| Google | `GoogleOther` | Research and development crawl | Yes | Google's published ranges |
| Google | `Google-CloudVertexBot` | Crawls requested by site owners for agents | Yes | Google's published ranges |
| Microsoft | `bingbot` | Bing index, also feeds Copilot | Yes | https://www.bing.com/toolbox/bingbot.json , reverse DNS `*.search.msn.com` |
| Apple | `Applebot` | Spotlight, Siri, Safari | Yes | Reverse DNS `*.applebot.apple.com` |
| Apple | `Applebot-Extended` | Control token for training opt-out | Yes | No crawler of its own |
| Amazon | `Amazonbot` | Amazon services, may train models | Yes | https://developer.amazon.com/amazonbot/ip-addresses/ |
| Amazon | `Amzn-SearchBot` | Search experiences | Yes | https://developer.amazon.com/amazonbot/searchbot-ip-addresses/ |
| Amazon | `Amzn-User` | User-triggered fetch | May not follow all directives | https://developer.amazon.com/amazonbot/live-ip-addresses/ |
| Meta | `meta-externalagent` | Training and product indexing | Yes | No IP list published |
| Meta | `meta-webindexer` | Meta AI search quality | Not stated | No IP list published |
| Meta | `meta-externalfetcher` | User-triggered fetch | May bypass | No IP list published |
| Meta | `facebookexternalhit` | Link previews | May bypass | No IP list published |
| DuckDuckGo | `DuckDuckBot` | Search | Yes | https://duckduckgo.com/duckduckbot.json |
| DuckDuckGo | `DuckAssistBot` | AI-assisted answers | Yes | https://duckduckgo.com/duckassistbot.json |
| Common Crawl | `CCBot` | Open crawl corpus | Yes | https://index.commoncrawl.org/ccbot.json |
| Mistral | `MistralAI-Index` | Search index | Yes | https://mistral.ai/mistralai-index-ips.json |
| Mistral | `MistralAI-User` | User-triggered fetch | Not stated | https://mistral.ai/mistralai-user-ips.json |
| Mistral | `MistralAI-Training` | Training | Yes | Not published |

No undocumented bot name appears in `robots.txt`.

## WAF, CDN and bot protection

Crawler access is decided in more places than `robots.txt`. A firewall or bot product can
return 403, 429, 402 or a challenge page to a legitimate crawler while `robots.txt` says
it is welcome.

### Rules

- Match a crawler by user-agent substring and by the vendor's IP list or reverse DNS.
  A user agent alone can be forged. An exact-match user agent breaks on a version change.
- Fetch the vendors' IP list files on a schedule. Do not copy ranges into firewall rules
  or documentation by hand, and never use a range that a vendor has not published.
- For Google, Bing and Apple, prefer reverse then forward DNS verification.
- User-triggered fetchers may ignore `robots.txt`, so their access is set at the WAF.

### By provider

| Provider | What to check |
|---|---|
| Cloudflare | AI bot policy for Search, Agent and Training set to Allow. Since 2026-09-15 the Block options for Training also stop Googlebot, Bingbot and Applebot. Keep managed `robots.txt` from adding `Disallow` lines. Keep pay per crawl off. Review Bot Fight Mode, which cannot be bypassed by rule on the free plan |
| AWS WAF | If Bot Control is enabled, override `CategoryAI`, which blocks verified AI bots |
| Akamai | Set AI and search bot categories to allow or monitor explicitly. Categories not chosen are denied |
| Vercel, Netlify | Defaults block nothing. Record that as a setting to keep |

### Verification after every deploy or firewall change

1. Fetch the live `/robots.txt` and compare it with `public/robots.txt`. They must match.
2. Request the home page and one content page with each major crawler user agent. Expect
   200 and the full HTML, not 403, 402, 429 or a challenge page.
3. Check response headers for `crawler-price`. It must be absent.
4. Review origin or CDN logs weekly for `OAI-SearchBot`, `GPTBot`, `Googlebot`, `bingbot`,
   `ClaudeBot` and `PerplexityBot`, and look at the status codes they receive.

User-agent strings as documented by the vendors on the research date. Version numbers
change, so copy the current string from the vendor's page before testing.

```
# OAI-SearchBot
curl -sS -o /dev/null -w "%{http_code}\n" \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot" \
  https://xyvionix.com/

# GPTBot
curl -sS -o /dev/null -w "%{http_code}\n" \
  -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot" \
  https://xyvionix.com/ai-assurance
```

This proves user-agent rules only. It does not prove IP rules, which need the log review.

## llms.txt and llms-full.txt

| File | Purpose | Built by |
|---|---|---|
| `/llms.txt` | A short map for agents and language models: what Xyvionix is, then links grouped by section | `src/pages/llms.txt.ts`, `src/lib/llms.ts` |
| `/llms-full.txt` | A fuller index: company definition, the assurance framework, one summary per page and how pages relate | `src/pages/llms-full.txt.ts` |

Both are generated from page metadata at build, so they cannot drift from the site. Neither
reproduces page content, and neither creates duplicate content.

Google has stated that it does not use `llms.txt`. These files are not a ranking factor and
must never be described as one. Their value is to agents and tools that do read them.

## Agent-friendly HTML

Every page is complete static HTML. No content depends on script.

- Semantic landmarks: `header`, `nav`, `main`, `aside`, `footer`, one `h1` per page
- Real links with descriptive text. Buttons only for actions
- Tables are real tables with header cells and captions
- Form fields have visible labels and described errors
- Diagrams are SVG with a title and description, and the explanation is repeated in text
- FAQs are open text, not accordions
- Filters on hub pages change visibility only. They create no URLs

`scripts/validate-dist.mjs` checks most of this on every build.

## Google specifics

- Inclusion in AI Overviews and AI Mode is governed by the generative AI control in Search
  Console. Confirm it is set to include. See `docs/search-console.md`.
- FAQ and HowTo rich results are retired. No `FAQPage` or `HowTo` markup is emitted.
- Sitemap `priority` and `changefreq` are ignored. `lastmod` is emitted and is accurate.
- Pages created for each query variant are treated as scaled content abuse. The content
  roadmap forbids combinatorial pages for this reason.
