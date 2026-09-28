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
