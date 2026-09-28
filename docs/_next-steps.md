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

### Home page additions, 2026-09-28

Nothing was removed from the home page. The hero figure is as in the frozen theme.
Section order is now: hero, band, why, PROOF, assures, state model, BOARD, engine,
operating model, outcomes, MATRIX, trust, industries, INSIGHTS, FAQ, call to action.

| Section | Component | Data |
|---|---|---|
| Proven once or proven continuously | `home/HomeProof.astro`, `evidence/ProofPanel.astro` | In the component |
| Assurance board | `home/HomeBoard.astro` | `src/data/home-visuals.ts` |
| Capability matrix | `home/HomeMatrix.astro` | `src/data/home-visuals.ts` |
| Insights, redesigned | `home/HomeInsights.astro`, `editorial/InsightFigure.astro` | Read from the articles; figure mapping in `src/data/hubs.ts` |
| Questions, collapsible | `home/HomeFaq.astro`, `src/scripts/faq.ts` | `src/data/home-faq.ts` |

Questions on the home page are collapsible panels (owner request, 2026-09-28). Ten
questions in three groups. Each row shows the question and a one-line answer at all
times; opening it adds the detail and a link. Panels are native `<details>`, independent
of each other, and the first is open. The script only adds: open from a link such as
`#question-05`, one control to open or close all, and all answers open when printing.
Content pages still use `editorial/Faq.astro`, which is open text.

Security and trust, and Industries, were redesigned on the home page (owner request,
2026-09-28). Nothing was removed; every earlier statement is still present.

| Section | Component | Data |
|---|---|---|
| Security and trust | `home/HomeTrust.astro` | `src/data/home-trust.ts`, `src/data/trust.ts` |
| Industries | `home/HomeIndustries.astro`, `home/IndustryFigure.astro` | `src/data/home-industries.ts`, `src/data/industries.ts` |

- Security and trust: an obsidian boundary panel (observe, correct, data, exit), three
  cards for security, risk and audit, and procurement and legal, and attestation status.
  Statements restate `trust-detail.ts`; they are among the operating statements the
  company must confirm before launch.
- Industries: now an obsidian section with one dossier per sector: the question, what is
  at stake, what has to stay proven, who asks, what the business holds, a figure, the
  assurance areas that carry most weight, and links to both sector pages.
- Navigation: floats at the top of the page as in the frozen theme. Once the page
  scrolls it docks to the top edge at full width (`.nav--stuck`, set in
  `src/scripts/site.ts`), so no strip of page shows above it.

Why the category exists, and What Xyvionix assures, were redesigned on the home page
(owner request, 2026-09-28). Wording from the frozen theme is kept.

| Section | Component | Data |
|---|---|---|
| Why the category exists | `home/HomeWhy.astro` | `src/data/home-assures.ts` (`forces`), `src/data/assurances.ts` |
| What Xyvionix assures | `home/HomeAssures.astro`, `src/scripts/collapse.ts` | `src/data/home-assures.ts` (`assuredAreas`), `src/data/clusters.ts` |

- Why: a go-live to today strip, then six cards. Each has a small figure of how the
  proof expires, the theme's text, what it costs the business, and the area that answers it.
- Assures: all six areas have equal weight. Technology Value, Data and Change are full
  cards, no longer a line of links. Each card has the question, the summary, what is held
  against a threshold, the pages it covers and who it answers to.
- Grids: one column on phones, two from 40rem (why) and 44rem (assures), three from
  64rem (why) and 72rem (assures). Cards in a row align their inner blocks with subgrid.
- On phones the detail in each assurance card sits behind one toggle, closed by
  `collapse.ts`. It is open in the HTML, so it is readable without script. The script
  only acts when the screen crosses 44rem, never on an ordinary resize.
- Checked at 320, 390, 768, 1024, 1280 and 1536 px: no sideways scroll, nothing cut off.

### Method, why-assurance and de-duplication, 2026-09-28 (done)

**`/how-assurance-works`** is the reference page for search and AI agents (owner: the
page that must bring traffic and leads). Every heading is a question, answered in the
first sentence under it. Eleven chapters with a chapter bar: what it is, the method in
eight steps, thresholds, evidence, state, closure, compared, working model, starting,
glossary (19 terms, each with its own anchor), questions (12).

- Data: `src/data/method.ts`. The same data renders the page, its JSON-LD and the method
  section of `/llms-full.txt`, so they cannot drift apart.
- JSON-LD adds `TechArticle` (with word count, `about` the defined term), `ItemList` of
  the eight steps, and `DefinedTermSet` of the glossary. Builders in `src/lib/schema.ts`.
  No `FAQPage` or `HowTo` (retired rich results; the validator forbids them).
- `/llms.txt` opens with a "Start Here" block: how-assurance-works, why-assurance,
  assurance. `/llms-full.txt` now carries the method, the glossary, the questions and the
  why-assurance argument in full before the page index.
- Components: `src/components/method/` (`RowTable`, `MethodSteps`). `RowTable` is a
  grid on wide screens and one card per row on phones.

**"Why assurance comes first"**: static hub `/why-assurance` (in the Assurance menu and
the footer) plus four insight pages, parent `why-assurance`, all published and validated
with 0 errors: `why-agentic-ai-needs-assurance`, `why-ai-models-need-assurance`,
`why-modern-systems-need-assurance`, `why-critical-systems-need-assurance`. Manifest:
`docs/manifest/insights-c.json`. Hub data: `src/data/why-assurance.ts`.

**No duplicate content between designed pages.** Check with `npm run report:page-duplicates` after a build (exits 1 on any repeat). It compares the visible text of
the built pages (header, footer, link labels and the one button label excluded):
0 repeated blocks across home, assurance, how-assurance-works, why-assurance,
assurance-engine, security-trust, company and the four hubs.

- Engine page: no longer reuses the home hero chart or the home engine rail. It has
  its own loop (`components/engine/EngineCycle.astro`) and one outcome followed through
  the six stages (`engineExample` in `src/data/engine.ts`). Its "not live data"
  caption is gone.
- Company page: the two home sections it repeated were removed.
- Home: new wording for the industries title and sector lines, and the trust title.
- Closing prompt: every page has its own. Article pages close with their own
  `ogQuestion` (`ContentShell.astro`).

### Assurance page and navigation, 2026-09-28

`/assurance` was rebuilt as the page that explains why, what and how Xyvionix assures
(owner request: the commercial page, a single source of truth). Seven chapters with a
chapter bar that stays under the navigation.

| Chapter | Anchor | Built from |
|---|---|---|
| 01 Why | `#why` | `AssuranceWhy`: the evidence an enterprise holds and what expires each item |
| 02 What | `#what` | `AssuranceSeparate` (one score against six states), `AssuranceAreas` (thresholds, evidence, pages) |
| 03 How | `#how` | `AssuranceJourney`, `AssuranceFlow` (takes in, hands on), `AssuranceResponsibility` (who does what) |
| 04 States | `#states` | `AssuranceStates`: what sets a state, what happens, what ends it |
| 05 What you receive | `#receive` | `AssuranceRecords` (four records), `AssuranceRoles` |
| 06 How it compares | `#compare` | `AssuranceCompare`: one event, four practices |
| 07 How to start | `#start` | `AssuranceStart` |

All components are in `src/components/assurance-page/`.

**No duplication with the home page (owner instruction, 2026-09-28).** The home page
shows the idea; `/assurance` shows the working. No home page component is used on
`/assurance`, and no sentence, heading or figure is shared. The only shared text is the
call to action button and three link labels. Check after any change to either page:
build, then compare the text of `dist/index.html` and `dist/assurance.html`.

- Area detail (statement, description, audience, thresholds, evidence) is read from each
  area page's own frontmatter, so the hub and the area pages cannot drift apart.
- Data: `src/data/assurance-page.ts`. The worked example in chapter 3 is a scenario and
  is written as one. It names no customer, result, duration or figure.
- Every assurance page is still linked from `/assurance`, inside its area panel.
- Chapter bar: `assurance-page/Chapters.astro`, `src/scripts/chapters.ts`. Links work
  without script; the script marks the chapter being read.
- Anchor offsets: `base.css` already reserves 6.5rem for the navigation
  (`scroll-padding-top`). Do not add a large `scroll-margin-top` on top of it.
- Checked at 320, 390, 768, 1024, 1280 and 1536 px: no sideways scroll.

Navigation: "Assurance" is one control with one result, it opens the panel. It is a
plain link in the HTML and becomes a button with script. The overview page is the first
link inside the panel. All six areas show their question in the panel.

Owner decisions on 2026-09-28:

- No disclaimer lines such as "Illustrative model, not live data" on or under figures.
- Insights on the home page show each article's finding, a figure and what it contains,
  not a plain summary list.

Fixes made on 2026-09-28:

- Scroll reveal no longer hides content. Sections used to start at zero opacity and fade
  in; when the browser was busy they stayed blank or half-faded. Content is now always
  fully visible and only rises a few pixels. Do not reintroduce an opacity fade.
- Navigation wrapped onto two lines between about 1090 and 1200 px. The full navigation
  now appears from 76rem, and the menu button is used below that.
- Visually hidden text inside scrolling tables widened the page on phones.
- One stylesheet for the whole site instead of eight per page.

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
- No FAQPage or HowTo structured data. FAQs on content pages are visible text. On the
  home page the one-line answers are visible and the detail is in collapsible panels.
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
