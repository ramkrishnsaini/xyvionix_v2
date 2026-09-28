# Project status

Generated 2026-09-28 03:33 UTC by `node scripts/checkpoint.mjs` from the files on disk.
This file is the resume point. Regenerate it rather than editing it.

## On resume, do this first

1. `node scripts/checkpoint.mjs` to refresh this file.
2. `npm run status:integrity` to find pages an interrupted writer left half-written.
3. `node scripts/validate-content.mjs --allow-drafts` to validate what is published.
4. Relaunch writers only for the batches listed as incomplete below. At most four at once.
5. Do not trust agent "completed" or "failed" statuses. Check the files.

## Notes and next steps

Last updated by hand: 2026-09-28, after the final build.

### State

The build is complete. Nothing is in progress and no agent is running.

| Check | Result on 2026-09-28 |
|---|---|
| Content pages | 97 of 97 published, 0 drafts |
| Static pages | 17 of 17 |
| `npm test` | 22 of 22 pass |
| `npx astro check` | 0 errors, 0 warnings |
| `node scripts/validate-content.mjs` (strict) | 0 errors, 0 warnings |
| `npm run build` | 114 pages, 113 Open Graph images, 112 sitemap URLs |
| Build validation | 0 errors, 0 warnings |
| Duplication | Closest pair 0.047 with names masked. No pair needs rewriting |
| Claim audit | 53 pattern matches, none an unsupported claim about Xyvionix |
| Content integrity | 97 pages, 0 problems |

### What is left, all of it outside the code

These need the company, not the build. See `docs/launch-checklist.md`.

1. Contact form endpoint (`PUBLIC_CONTACT_ENDPOINT`). The form renders disabled until set.
2. Legal entity name, registered address, governing law.
3. Privacy and security contact addresses. Then publish `/.well-known/security.txt`.
4. Legal review of `/privacy`, `/terms`, `/security`, `/subprocessors`.
5. Confirmation of the eleven operating statements in `docs/claim-audit.md`.
6. Subprocessor register. Verified social profiles. Analytics provider. IndexNow key.
7. Redirect map for any earlier live site (`docs/redirects.md`).
8. Hosting: choose the host, attach the domain, confirm headers and redirects.

### QA not yet done

- Screen reader pass.
- Zoom to 200% and reflow at 320 px (335 px was checked, with no sideways scroll).
- Contact form end to end, once an endpoint exists.
- Lighthouse and field Core Web Vitals against the production host.
- Social preview validation on the live domain.

### Facts flagged by writers for a second look before launch

- `/model-retirement-is-a-production-change`: Google Cloud notice periods. Sourced in
  research file 06, listed as unverified in file 05.
- `/ai-audit-evidence-requirements`: EU AI Act quotations are from the 2024 text and are
  labelled so. The 2026 amendments to Articles 12, 19, 26, 72 and 73 were not reviewed.
- `/financial-services-ai-assurance`: the Mills Review publication date conflicts between
  research files, so only the FCA speech of 28 January 2026 is cited.
- `/healthcare`: names the Change Healthcare incident, sourced to the HHS OCR publication.
- `/ai-cost-assurance`, `/technology-value-assurance`: State of Tokenomics figures are
  from a release candidate and are cited as such.
- `/healthcare` has eight body links and the finance and insurance pages six, above the
  style guide's two to five.

### Decisions already made

- Flat URLs, no trailing slash, `https://xyvionix.com`, `build.format: 'file'`.
- Plain CSS with design tokens. No Tailwind. No inline script or style, so the host can
  send a strict Content-Security-Policy. One bundled stylesheet.
- No FAQPage or HowTo structured data. FAQs are visible text.
- TypeScript pinned to 6.x: `astro check` does not support TypeScript 7.
- `vertex-ai-assurance` keeps its slug; its title uses the platform's current name.
- Deviations from the frozen theme: faint text colour adjusted for WCAG AA contrast;
  hero glow drawn as a gradient; navigation blur moved to its own layer.
- Two sentences describing corrective ownership recur on about 37 pages, by design.

### To work on the site again

1. `npm run checkpoint` and read `docs/_status.md`.
2. `npm run status:integrity` and `node scripts/validate-content.mjs`.
3. New pages: follow "Adding a page" in `README.md`.
4. Not a git repository yet. Run `git init` and commit before further changes.

## Content

97 of 97 pages finished.

| Collection | Done | Partial | Not started | Total |
|---|---|---|---|---|
| Assurance | 33 | 0 | 0 | 33 |
| Use cases | 18 | 0 | 0 | 18 |
| Technologies | 16 | 0 | 0 | 16 |
| Industries | 8 | 0 | 0 | 8 |
| Insights | 22 | 0 | 0 | 22 |

### Pages still to finish

None. Every content page is finished.

### Writer batches

| Batch | Subject | Research files | Done | Status |
|---|---|---|---|---|
| W1-W6 | Assurance clusters | 04-10 | 33 of 33 | complete |
| W7 | Use cases: AI | 04, 05, 06 | 6 of 6 | complete |
| W8 | Use cases: reliability and change | 07 | 5 of 5 | complete |
| W9 | Use cases: cyber, data, value | 08, 09 | 7 of 7 | complete |
| W10 | Technologies: cloud, Kubernetes, IaC | 07 | 6 of 6 | complete |
| W11 | Technologies: AI platforms and inference | 06, 05 | 5 of 5 | complete |
| W12 | Technologies: identity and data | 08, 09 | 5 of 5 | complete |
| W13 | Industries: financial services and insurance | 10, 04 | 4 of 4 | complete |
| W14 | Industries: healthcare and software | 10, 07, 04 | 4 of 4 | complete |
| W15 | Insights: AI A | 05, 04, 06 | 4 of 4 | complete |
| W16 | Insights: AI B | 05, 04, 09, 10 | 4 of 4 | complete |
| W17 | Insights: reliability | 07 | 5 of 5 | complete |
| W18 | Insights: cyber | 08 | 4 of 4 | complete |
| W19 | Insights: data, change, value, practice | 09, 07, 05 | 5 of 5 | complete |

## Code and assets

### Pages (17 of 17)

- [x] src/pages/index.astro
- [x] src/pages/assurance.astro
- [x] src/pages/how-assurance-works.astro
- [x] src/pages/assurance-engine.astro
- [x] src/pages/security-trust.astro
- [x] src/pages/use-cases.astro
- [x] src/pages/industries.astro
- [x] src/pages/technologies.astro
- [x] src/pages/insights.astro
- [x] src/pages/company.astro
- [x] src/pages/contact.astro
- [x] src/pages/security.astro
- [x] src/pages/privacy.astro
- [x] src/pages/terms.astro
- [x] src/pages/subprocessors.astro
- [x] src/pages/search.astro
- [x] src/pages/404.astro

### Build scripts (13 of 13)

- [x] scripts/validate-content.mjs
- [x] scripts/validate-dist.mjs
- [x] scripts/claim-audit.mjs
- [x] scripts/review-report.mjs
- [x] scripts/generate-docs.mjs
- [x] scripts/build-headers.mjs
- [x] scripts/indexnow.mjs
- [x] scripts/generate-icons.mjs
- [x] scripts/content-status.mjs
- [x] scripts/content-integrity.mjs
- [x] scripts/build-research-doc.mjs
- [x] scripts/checkpoint.mjs
- [x] scripts/scaffold-content.mjs

### Other files (12 of 12)

- [x] README.md
- [x] .env.example
- [x] vercel.json
- [x] public/robots.txt
- [x] public/favicon.ico
- [x] public/site.webmanifest
- [x] public/brand/xyvionix-logo-512.png
- [x] tests/slug-rules.test.ts
- [x] tests/content-routes.test.ts
- [x] docs/reports/claim-audit-hits.md
- [x] docs/reports/content-review.md
- [x] docs/reports/build-validation.md

## Documentation (15 of 15)

- [x] docs/research-2026.md
- [x] docs/information-architecture.md
- [x] docs/seo-matrix.md
- [x] docs/cluster-map.md
- [x] docs/content-roadmap.md
- [x] docs/content-inventory.md
- [x] docs/redirects.md
- [x] docs/ai-discovery.md
- [x] docs/social-sharing.md
- [x] docs/search-console.md
- [x] docs/bing-indexnow.md
- [x] docs/schema.md
- [x] docs/launch-checklist.md
- [x] docs/post-launch.md
- [x] docs/claim-audit.md

## Summary of what is left

- Content pages: 0
- Static pages: none
- Scripts: none
- Docs: none
- Other files: none
