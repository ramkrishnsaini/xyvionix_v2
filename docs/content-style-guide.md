# Xyvionix content style guide

Read this fully before writing any page. It is the contract between the content
and the build: the frontmatter is validated by a schema and the build fails on
violations.

## 1. What Xyvionix is

Category: **Continuous Technology Assurance**.
Statement: *Critical technology must be continuously proven.*

Xyvionix continuously verifies whether critical enterprise technology still meets
the outcomes the business depends on, and drives corrective action when assurance
is lost.

Xyvionix does not sell technology labour. It never sells engineers, developers,
hours, pods, headcount, resources, offshore capacity or rate cards. It is not
staffing, outsourcing, a managed service provider, a software agency, a cloud
migration consultancy or a digital transformation firm.

It sells: assurance coverage, evidence, outcomes, corrective ownership,
measurable thresholds, verified closure, continuing accountability.

## 2. The assurance lens (the differentiator)

Every page answers these, in its own subject's terms:

1. What outcome matters to the business?
2. What causes the evidence to expire?
3. What must be continuously re-proven?
4. Which threshold matters, and who sets it?
5. What is the business consequence of loss?
6. What counts as verified closure?

Vocabulary to use consistently:

| Term | Meaning |
|---|---|
| Signal | Raw telemetry, configuration, cost or usage from the estate |
| Evidence | A tested, retained result attributable to a point in time |
| Threshold | The agreed boundary, set by the business outcome |
| State | Assured, Degrading, At risk, Unassured |
| Corrective action | Remediation owned by Xyvionix through to completion |
| Verified closure | Closure confirmed by re-test, not by ticket status |

The four states: **Assured** (current evidence proves the outcome within
threshold), **Degrading** (evidence is moving toward the threshold), **At risk**
(threshold breached), **Unassured** (no current evidence; condition unknown, not
acceptable).

## 3. Voice

Enterprise, technically credible, concise, evidence-driven, original, clear,
non-hype. British spelling (organisation, prioritise, programme). Write for a
CIO, CTO, CISO, Head of AI, VP Platform, Head of SRE or technology risk lead who
has read a hundred vendor pages and trusts none of them.

- Short declarative sentences. One idea per paragraph.
- State the point, then support it. No warm-up paragraphs.
- Be specific: name the mechanism, the artefact, the failure.
- Second person is rare. Prefer "the enterprise", "the business", "the team".
- No exclamation marks. No rhetorical questions in body copy (headings and
  `ogQuestion` may be questions).
- No em dashes. Use a full stop, comma or colon instead.
- No emoji.

### Banned words and phrases

revolutionize, supercharge, unleash, transform your business, cutting-edge,
next-generation, world-class, seamless, end-to-end solutions, digital
transformation, expert team, highly skilled developers, best-in-class,
game-changing, holistic, empower, synergy, state-of-the-art, turnkey,
mission-critical (use "critical"), in today's fast-paced world, it is important
to note, delve, tapestry, navigate the complexities.

Avoid where a plainer word exists: leverage (use "use"), robust, unlock,
landscape, realm. "User journey" in the reliability sense is fine.

Also banned, because Xyvionix does not sell labour: staff augmentation, rate
card, offshore team, dedicated developers, our engineers, our developers,
headcount, billable hours.

The validator enforces these lists: `node scripts/validate-content.mjs --only <slug>`.

## 4. Claims: what must never appear

Never state or imply any of the following, because none is verified:

- existing customers, client names, logos, testimonials, case studies
- customer counts, "Fortune 500", "trusted by"
- savings percentages, ROI figures, performance or response-time figures about Xyvionix
- 24x7 operation, named offices or headcount
- certifications or attestations (SOC 2, ISO 27001 and similar are planned, not held)
- technology partnerships, reseller or "certified partner" status
- that the Assurance Engine is a live product with specific shipped features.
  Describe it as the method and design behind the assurance, in present-tense
  terms of what assurance does, not product feature claims.
- named individuals as authors or experts

Xyvionix gives no legal, regulatory or financial advice. On regulatory topics
state facts with dates and say what evidence the expectation implies. Do not
say a page "ensures compliance".

## 5. Facts and sources

- Use only facts present in the research files under `docs/research/`.
- Do not use any item listed under "Could not verify" in a research file, and
  do not use rows marked `[K]`, `(X)` or with an asterisk as fact.
- Product names must match the "Terminology: current vs deprecated" tables. If
  a product was renamed, use the current name and mention the former name once
  in parentheses where a reader may search for it.
- When a page states a dated or numeric fact from a third party, add the
  source to the `sources` frontmatter list (title + URL from the research file).
- Statistics from third-party reports must name the report and year in the
  sentence.
- Never invent numbers. Illustrative examples must be labelled "illustrative"
  in the sentence or heading.
- Do not summarise vendor documentation. Use the fact to make an assurance
  point: what expires, on whose calendar, and what has to be re-proven.

## 6. Frontmatter contract

Do not change: `title` (unless a product was renamed, see below), `cluster`,
`secondary`, `parent`, `kind`, `tier`, `group`, `industry`, `category`, `state`,
`related`, `publishedDate`, `reviewCadence`, `freshnessCritical`, `owner`,
`author`. The file name is the URL and must not change.

Write or replace:

| Field | Rule |
|---|---|
| `h1` | 10-120 chars. Business-oriented. Not identical to `title` or `seoTitle`. No "DRAFT". |
| `seoTitle` | 20-70 chars, aim for 50-62. Ends with ` \| Xyvionix`. Unique across the site. |
| `description` | 90-170 chars, aim for 140-160. States what the page proves or answers. Unique. |
| `summary` | 60-260 chars. One or two sentences for cards and indexes. No brand name needed. |
| `lede` | 80-520 chars. The definition or direct answer. First sentence must stand alone as the answer. |
| `ogQuestion` | Up to 90 chars. Keep the existing one if present. |
| `audience` | Keep or refine. |
| `intent` | Keep or refine. |
| `evidence` | 4-7 items `{ name, detail }`. What must exist and stay current. Omit on insights (leave `[]`). |
| `thresholds` | 3-6 rows `{ signal, basis, lostWhen }`. See section 7. Omit on insights (leave `[]`). |
| `faqs` | 0-4 items `{ q, a }`. Only real buyer questions specific to this page. Leave `[]` if none add value. |
| `sources` | `{ title, url }` for every third-party fact stated. URLs must come from the research files. |
| `platform` | Technologies only: the platform name exactly as the vendor writes it today. |
| `modifiedDate`, `lastReviewed` | Set to 2026-09-27. |
| `draft` | Set to `false` when the page is complete. |

If a vendor renamed the product a page is about, update `title` to the current
name (for example the `vertex-ai-assurance` page title becomes the platform's
current name followed by "Assurance"). The slug stays as it is.

YAML rules: wrap any string containing a colon, `#`, or starting with a quote in
double quotes. Use `>-` folded style for long strings. Keep straight quotes.

## 7. Threshold rows

Thresholds are agreed per engagement, so rows describe the basis, not a number.

```yaml
thresholds:
  - signal: Groundedness on sampled production answers
    basis: The error rate the business process can absorb before review cost exceeds benefit
    lostWhen: The sampled rate falls below the agreed floor for two consecutive windows
```

- `signal`: what is measured.
- `basis`: what determines the threshold. Business terms.
- `lostWhen`: the condition that moves the state to At risk.
- No invented numeric values. A number is allowed only when it comes from a
  cited standard, regulation or vendor policy (for example a published support
  window), and then the source goes in `sources`.

## 8. Body structure

Markdown body, `##` for sections, `###` for sub-points. No `#` heading (the
layout renders the H1). No HTML. Tables are GitHub-flavoured Markdown. Remove
the `<!-- BRIEF -->` comment and every `DRAFT` placeholder.

The layout renders, after the body: evidence list, threshold table, FAQs,
related links and the call to action. So the body must NOT contain an evidence
list, a threshold table, an FAQ section, a "related pages" list or a closing
sales paragraph.

Link inside body copy to 2-5 other Xyvionix pages where it helps the reader,
using root-relative links such as `[AI Agent Assurance](/ai-agent-assurance)`.
Link only to slugs that exist in `docs/manifest/*.json` or these static pages:
`/assurance`, `/how-assurance-works`, `/assurance-engine`, `/security-trust`,
`/use-cases`, `/industries`, `/technologies`, `/insights`, `/company`, `/contact`.
Use descriptive link text, never "click here" or "learn more".

### Assurance pages (hub and child): 900-1,500 words

1. `## Why assurance is lost` — the specific ways evidence expires here
2. `## What is at stake` — business consequence, in business terms
3. `## What Xyvionix assures` — the outcomes held, stated as what stays true
4. `## Common failure modes` — concrete, recognisable, 4-7 of them
5. `## Corrective ownership` — what happens when assurance is lost and who acts
6. `## Verified closure` — what re-test proves before closure is recorded
7. `## Technology and industry context` — where this differs by platform or sector

Headings may be reworded to suit the subject, but the ground must be covered.
Hub pages stay at cluster level and introduce their child pages by linking to
them in context; they do not repeat child page content.

### Use case pages: 800-1,300 words

Must answer all ten, as sections or within them:
what changed; what business outcome is at risk; what must be proven; what
evidence is required (frontmatter); what thresholds matter (frontmatter); what
causes assurance loss; what corrective action follows; what verified closure
looks like; which Xyvionix assurance areas apply (link them in body); what the
buyer should do next (a practical first step, not a sales pitch).

### Technology pages: 800-1,300 words

Connect the platform to the assurance problem. Not "we offer X services".
1. `## The assurance problem on <platform>`
2. `## What expires, and on whose calendar` — vendor lifecycle, support windows,
   automatic changes. A small table of dated facts is welcome here.
3. `## What must be continuously re-proven`
4. `## Common failure modes`
5. `## Corrective ownership and verified closure`

Two pages about similar platforms (AWS and Azure, EKS and AKS, Databricks and
Snowflake) must differ in substance. If a paragraph would read correctly with
the other vendor's name swapped in, rewrite it around a platform-specific fact.

### Industry pages: 1,000-1,600 words

Original to the sector. Cover operational risk, AI assurance, reliability,
identity and security exposure, data, regulatory and audit context (facts with
dates), technology economics and change, and representative use cases (linked).
State which regulatory expectations require continuing proof rather than
point-in-time attestation.

### Insights: 1,000-1,800 words

An argument, not a summary. Include several of: a real operational failure
pattern (described generically, never attributed to a named company unless the
research file cites the company's own published report), a decision framework,
a threshold or evidence model, an implementation trade-off, a measurement
method, a table or checklist, current vendor detail, a practical example
labelled illustrative, and a conclusion tied to assurance. Leave `evidence` and
`thresholds` empty.

## 9. Final test before setting `draft: false`

- Could this page belong to any generic IT services company? If yes, rewrite.
- Does it explain what must be proven, why proof expires, what evidence matters
  and what happens when assurance is lost? If no, rewrite.
- Is it valuable even if it never ranks? If no, say so in your report instead
  of publishing.
- No banned words, no unverified claims, no invented numbers, no em dashes.
- Every third-party fact has a source in frontmatter.
- The YAML parses.
