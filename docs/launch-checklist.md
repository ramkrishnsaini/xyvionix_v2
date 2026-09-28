# Launch checklist

Work through this in order. Items marked **BLOCKER** must be complete before the site
goes live.

## 1. Company inputs

Set in `src/data/site.ts`, `src/data/social.ts` and `src/data/legal.ts`, or as environment
variables. Nothing here may be invented.

| Input | Where | Effect until supplied | Blocker |
|---|---|---|---|
| Contact form endpoint | `PUBLIC_CONTACT_ENDPOINT` | The form is rendered disabled with a notice | **BLOCKER** |
| Legal entity name | `company.legalName` | Legal pages show "Pending review" | **BLOCKER** |
| Governing law and courts | `company.governingLaw` | `/terms` shows a placeholder sentence | **BLOCKER** |
| Registered address | `company.registeredAddress` | Omitted from `/privacy` | **BLOCKER** |
| Privacy contact | `company.privacyEmail` | `/privacy` directs to the contact form | **BLOCKER** |
| Security contact | `company.securityEmail` | `/security` directs to the contact form; no `security.txt` | **BLOCKER** |
| Legal review of `/privacy`, `/terms`, `/security`, `/subprocessors` | Counsel | Pages are drafts of the intended position | **BLOCKER** |
| Confirmation of trust statements | `docs/claim-audit.md` | Unconfirmed operating commitments are published | **BLOCKER** |
| Subprocessor register and notice period | `src/data/legal.ts` | `/subprocessors` states the register is not yet published | Before any customer data is processed |
| General contact email, phone | `company.contactEmail`, `company.phone` | Not shown | No |
| Verified social profiles | `src/data/social.ts` | No `sameAs`, no footer links | No |
| Analytics provider | `src/data/legal.ts`, `PUBLIC_ANALYTICS_ORIGIN` | No analytics | No |
| IndexNow key | `INDEXNOW_KEY` in the deploy environment | IndexNow not used | No |

### security.txt

Create `public/.well-known/security.txt` only when a monitored security address exists:

```
Contact: mailto:<security address>
Expires: <ISO 8601 date, at most one year ahead>
Preferred-Languages: en
Canonical: https://xyvionix.com/.well-known/security.txt
Policy: https://xyvionix.com/security
```

Set a reminder to renew `Expires` before it passes.

## 2. Content

- [ ] `npm run status:content` shows every page done
- [ ] `npm run status:integrity` shows no problems
- [ ] `node scripts/validate-content.mjs` passes with no flags
- [ ] Duplication pass complete on similar pages: AWS, Azure and Google Cloud reliability;
      EKS and AKS; Databricks and Snowflake; Entra ID and AWS IAM; the three cloud AI platforms
- [ ] `npm run report:claims -- --write` reviewed, decisions recorded in `docs/claim-audit.md`
- [ ] Every page asked: could this belong to any generic IT services company? If yes, rewrite
- [ ] Facts on `freshnessCritical` pages re-checked if more than 30 days have passed since research

## 3. Build

- [ ] `npm ci`
- [ ] `npm test` passes
- [ ] `npm run check` reports 0 errors
- [ ] `npm run build` passes, including content and build validation
- [ ] `npm run validate:dist` writes `docs/reports/build-validation.md` with 0 errors
- [ ] `npm run docs:generate` and `npm run docs:research` run, results committed
- [ ] No draft is published: `XYV_INCLUDE_DRAFTS` is not set in the production environment

## 4. Hosting

- [ ] Apex `xyvionix.com` and `www` both attached, apex set as primary
- [ ] HTTPS enforced, certificate valid for both hosts
- [ ] `www` to apex redirect is a single 301
- [ ] `http` to `https` redirect is a single 301
- [ ] `/ai-assurance/` and `/ai-assurance.html` each redirect once to `/ai-assurance`
- [ ] A missing URL returns status 404 with the branded page, not a 200 and not a redirect
- [ ] `_headers` or `vercel.json` applied: confirm with the checks in section 5
- [ ] Compression on (Brotli or gzip) for HTML, CSS, JavaScript, JSON, XML and text
- [ ] `/_astro/*` served with a one-year immutable cache; HTML revalidated
- [ ] Legacy URLs from any earlier site mapped in `docs/redirects.md` and tested

## 5. Security headers

Request the home page and check each header is present.

| Header | Expected |
|---|---|
| `Content-Security-Policy` | `default-src 'self'` with no `unsafe-inline`; the form endpoint origin in `connect-src` and `form-action` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Camera, microphone, geolocation and others denied |
| `X-Frame-Options` | `DENY`, with `frame-ancestors 'none'` in the policy |

Then, with the browser console open, confirm there are no policy violations while:

- [ ] Fonts load (Instrument Sans, JetBrains Mono)
- [ ] The navigation panel and mobile menu open
- [ ] Hub filters work
- [ ] Search returns results
- [ ] The contact form submits and shows the confirmation
- [ ] Analytics sends events, if a provider is configured
- [ ] Open Graph images load when requested directly

## 6. Crawlers

Full detail in `docs/ai-discovery.md`.

- [ ] Live `/robots.txt` matches `public/robots.txt` exactly
- [ ] `/sitemap-index.xml`, `/llms.txt`, `/llms-full.txt`, `/rss.xml` return 200
- [ ] Firewall and bot protection allow search and AI crawlers: no 403, 429, 402 or challenge
- [ ] On Cloudflare, AI bot policies for Search, Agent and Training are set to Allow
- [ ] Requests with `OAI-SearchBot`, `GPTBot`, `Googlebot` and `bingbot` user agents return 200

## 7. Search engines

- [ ] Search Console: domain property verified by DNS, sitemap submitted (`docs/search-console.md`)
- [ ] Search Console: generative AI control set to include
- [ ] Bing Webmaster Tools: verified, sitemap submitted (`docs/bing-indexnow.md`)
- [ ] IndexNow: key file reachable, first submission sent with `--all`
- [ ] URL Inspection run on the home page and the six assurance hubs

## 8. Structured data and sharing

- [ ] Schema Markup Validator: home, one assurance page, one insight, contact. No errors
- [ ] Rich Results Test: one insight. Article and Breadcrumb detected
- [ ] LinkedIn, Facebook, X, Slack, Teams, WhatsApp and iMessage previews checked for five URLs (`docs/social-sharing.md`)

## 9. Accessibility

Target: WCAG 2.2 AA.

- [ ] Keyboard only: reach and operate every link, the navigation panel, the mobile menu, filters, search and the form. Focus is always visible
- [ ] Skip link appears on first Tab and moves focus to the main content
- [ ] Escape closes the navigation panel and the mobile menu and returns focus
- [ ] Screen reader: one `h1`, headings in order, landmarks announced, breadcrumb announced, table headers read with cells
- [ ] Form: every field has a label; errors are announced and tied to their field
- [ ] State marks are always accompanied by text or an accessible name
- [ ] Contrast: body and label text at least 4.5:1 on both surfaces
- [ ] Reduced motion: with the setting on, no reveal or line animation runs
- [ ] Zoom to 200% and reflow at 320 px: no loss of content, no horizontal page scroll
- [ ] Print preview: readable, navigation and calls to action removed, state marks visible

## 10. Visual check

At 360, 390, 430, 768, 1024, 1440 and 1920 px: home, `/assurance`, one assurance page,
one use case, one industry page, one technology page, one insight, `/insights`,
`/contact`, `/security-trust`, a legal page and the 404 page.

- [ ] No horizontal page scroll
- [ ] Tables scroll inside their own container
- [ ] Obsidian and off-white sections alternate as in the frozen theme
- [ ] Nothing resembles a generic template: no stock imagery, gradients, icons or colour accents

## 11. Performance

- [ ] Lighthouse on home and one content page, mobile profile
- [ ] Targets: LCP under 2.5 s, INP under 200 ms, CLS under 0.1
- [ ] Fonts: only the needed subsets download
- [ ] No third-party requests, other than analytics if configured

## 12. After launch

- [ ] Day 1: crawl stats and origin logs show 200 responses to crawlers
- [ ] Day 7: Page indexing report reviewed
- [ ] Day 30: first `npm run report:review`; P1 backlog reassessed against real queries
- [ ] Measurement running as set out in `docs/post-launch.md`
