# Claim audit

Audit run: 2026-09-28, over all published content, static pages, components and data.
Re-run before every release that changes copy: `npm run report:claims -- --write`.
The raw list of matches is in `docs/reports/claim-audit-hits.md`.

## What the audit looks for

Statements the company has not verified:

| Claim type | Examples |
|---|---|
| Customers | Client names, "trusted by", customer counts, "Fortune 500", case studies, testimonials |
| Certifications | SOC 2, ISO 27001 or any framework described as held or achieved |
| Savings and results | Percentage reductions, return on investment, performance figures about Xyvionix |
| Response and operating hours | Response times, "24x7", round-the-clock operation |
| Locations and size | Offices, headquarters, headcount, years of experience |
| Partnerships | Vendor partner or reseller status |
| Recognition | Awards, analyst rankings |
| Product capability | Assurance Engine described as a shipped product with live features |
| Labour | Staffing, augmentation, rate cards, engineers or hours for sale |

The patterns are in `scripts/lib/rules.mjs`. The content validator also blocks banned
wording and labour vocabulary on every build.

## Result

Final run over all 97 content pages and 17 static pages: 53 pattern matches.

| Finding | Count | Decision |
|---|---|---|
| Unsupported claims about Xyvionix | 0 | Nothing to remove |
| Third-party statistics and labelled illustrative figures | 48 | Keep. Each statistic names its report and year and lists the source in frontmatter. Figures in worked examples are labelled illustrative |
| Partnership pattern | 4 | Keep. Each is an FAQ asking whether Xyvionix is a vendor partner or reseller, answered that it is not |
| Labour vocabulary | 1 | Keep. It is in the "What is not sold" list on `/company` |
| CSS false positive | 1 | `width: 100%` in a component stylesheet |

### Third-party statistics in use

All come from `docs/research/` with a primary source. They must be re-checked at each
review, because new editions of these reports replace the figures.

| Source | Used on |
|---|---|
| Verizon 2026 Data Breach Investigations Report | Cyber exposure, vulnerability remediation, identity, remediation use cases |
| Mandiant M-Trends 2026 | Vulnerability remediation |
| Google Cloud Threat Horizons Report H1 2026 | Cyber exposure, cloud security exposure, identity |
| Microsoft Digital Defense Report 2025 | Identity exposure |
| GitGuardian State of Secrets Sprawl 2026 | Secrets exposure, unverified closure |
| NIST statements on CVE volume, April 2026 | Remediation backlog |
| DORA report 2025 | Release assurance, change failure rate, error budgets |
| Google SRE Workbook, alerting on SLOs | Error budgets insight. Alert parameters quoted; the derived column is marked as arithmetic |
| State of FinOps 2026 | Technology value |
| State of Tokenomics, Release Candidate 1.0, September 2026 | AI cost, technology value. Cited as a release candidate |
| Vendor documentation: Anthropic tokenizer change, Amazon Bedrock tier pricing, AKS Automatic service level | AI cost, Bedrock, AKS |

## Statements that need company confirmation before launch

These are not pattern matches. They are statements about how Xyvionix operates, taken from
the frozen theme or the specification. They are worded as commitments or design intent,
not as results, but the company must confirm each is true.

| Statement | Where | Source | Status |
|---|---|---|---|
| "Designed for enterprises operating across North America, the United Kingdom, Europe and Australia" | Footer, `/company` | Frozen theme | Confirm. It states intended market, not offices |
| Standing access is read-only; elevation is per approved change, time-limited and recorded | `/security-trust`, home | Frozen theme | Confirm |
| Enterprise data remains in the enterprise's own jurisdiction and infrastructure | `/security-trust`, `/assurance-engine`, home | Frozen theme | Confirm |
| Every action under assurance is attributable, retained and available for examination | `/security-trust`, home | Frozen theme | Confirm |
| A SOC 2 readiness programme is planned; ISO 27001 to follow; status confirmed in writing before any engagement | `/security-trust`, home | Frozen theme | Confirm. Change the wording in `src/data/trust.ts` the day the status changes |
| A documented transition provision in every engagement | `/security-trust`, home | Frozen theme | Confirm |
| Access is granted through the enterprise's identity provider; shared credentials are not used | `/security-trust` | Specification section 54 | Confirm |
| Changes to assurance tooling are peer reviewed; credentials are held in a secrets manager | `/security-trust` | Specification section 54 | Confirm |
| A security incident affecting an enterprise is notified to its nominated contact | `/security-trust` | Specification section 54 | Confirm, and set terms in the engagement agreement |
| Corrective action is owned by Xyvionix through to verified closure | Throughout | Frozen theme and specification | Confirm the engagement terms support it |
| No paid bug bounty is operated | `/security` | Drafted | Confirm |

## How specific risks were handled

| Risk | Handling |
|---|---|
| Certifications | No page claims one. `/security-trust` states that none is held. `src/data/trust.ts` holds the wording in one place |
| Assurance Engine capability | Described as the design and method behind the assurance. `/assurance-engine` states it is not sold as software and that the figure is not a product screen |
| Diagrams and traces | Every figure is labelled illustrative in the graphic and in the caption. Threshold tables are captioned as illustrative |
| Threshold values | Rows state the basis for a threshold, not a number, unless the number comes from a cited standard or vendor policy |
| Customers and case studies | None appear. Failure patterns in insights are described generically |
| Named authors | None. Insights are attributed to Xyvionix Research |
| Contact details | None are invented. Email, phone and form endpoint are `null` in `src/data/site.ts` until supplied |
| Social profiles | None are listed. `sameAs` is not emitted |
| Legal pages | Each shows a "Pending review" notice until company inputs are supplied and counsel has reviewed it |
| Regulatory statements | Facts with dates, from primary sources. No page says it ensures compliance, and no page gives legal advice |
| Vendor relationships | Technology pages carry a note that Xyvionix is not a reseller or partner of the vendors named |

## Process for every release

1. `npm run report:claims -- --write`
2. Review each new item in `docs/reports/claim-audit-hits.md`. For each: sourced fact
   (keep), technical phrase (keep), or unverified claim about Xyvionix (rewrite).
3. Record any new decision in this file.
4. When a company fact becomes true, such as a certification being issued, update the
   single source in `src/data/` and let the pages follow.
