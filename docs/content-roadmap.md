# Content roadmap

## How pages were chosen

Every candidate page from the specification was assessed against nine criteria:
commercial relevance, enterprise demand, search demand, differentiation, technical depth,
fit with the assurance method, freshness, usefulness for internal linking and the ability
to write original content. Scores were used for planning only and are not published.

A page was built only if it had a distinct audience, a distinct search intent, a distinct
business problem and enough distinct substance to stand alone. Where two candidates would
have shared most of their content, one canonical page was built and the other merged into
it. No page exists because a keyword variation exists, and no industry, service and
technology combinations were generated.

## P0: launch

97 content pages and 17 static pages. The full list with metadata is in
`docs/content-inventory.md`.

| Group | Pages |
|---|---|
| Static and core | 17 |
| Assurance hubs | 6 |
| Assurance pages | 27 |
| Use cases | 18 |
| Technologies | 16 |
| Industries | 8 |
| Insights | 22 |

## Merged into a canonical page

These candidates were not built as separate pages. Each is covered where shown.

| Candidate | Canonical page | Reason |
|---|---|---|
| `/ai-retrieval-assurance` | `/production-rag-assurance` | Retrieval is half of RAG assurance; a separate page would repeat it |
| `/ai-knowledge-freshness-assurance` | `/production-rag-assurance`, `/data-freshness-assurance` | Freshness of a corpus is data freshness with an AI consumer |
| `/ai-tool-use-assurance` | `/ai-agent-assurance` | Tool use is what makes a system an agent |
| `/agent-permission-assurance` | `/ai-agent-assurance` | Same subject, same buyer |
| `/model-routing-assurance` | `/model-change-assurance` | A routing change is a model change from the outcome's point of view |
| `/ai-data-assurance` | `/data-assurance`, `/production-rag-assurance` | No distinct intent |
| `/ai-finops-assurance` | `/ai-cost-assurance` | Identical intent under a different label |
| `/cloud-resilience-assurance` | `/disaster-recovery-assurance` | Resilience is proven by exercised recovery |
| `/recovery-readiness-assurance` | `/disaster-recovery-assurance` | Same evidence, same thresholds |
| `/deployment-reliability-assurance` | `/release-assurance` | One release process, one page |
| `/deployment-assurance` | `/release-assurance` | As above |
| `/production-validation-assurance` | `/release-assurance` | Post-deployment verification is part of release evidence |
| `/change-failure-assurance` | `/high-change-failure-rate` | Better answered as the situation a buyer is in |
| `/release-risk` | `/high-change-failure-rate` | Same situation |
| `/security-remediation-assurance` | `/vulnerability-remediation-assurance` | Identical intent |
| `/cost-anomaly-assurance` | `/cloud-cost-assurance`, `/cloud-cost-anomaly` | The assurance page and the use case cover it between them |
| `/cloud-commitment-assurance` | `/cloud-cost-assurance`, `/cloud-commitment-utilisation-risk` | Covered by the assurance page and an insight |
| `/data-change-assurance` | `/schema-change-production-impact` | Better answered as a situation |
| `/kubernetes-upgrade-assurance` | `/kubernetes-upgrade-risk` | A use case already owns this intent |
| `/insurance-ai-model-assurance` | `/insurance-claims-ai-assurance`, `/insurance` | Claims is the distinct, high-consequence case |
| `/healthcare-data-assurance` | `/healthcare`, `/healthcare-ai-assurance` | Not enough distinct substance yet |

## P1: first 30 days after launch

Build when search and enquiry data from launch confirms demand.

| Page | Cluster | Why it is likely to be justified |
|---|---|---|
| `/human-in-the-loop-assurance` | AI | Oversight has its own evidence and its own regulatory driver. Currently covered by `/ai-agent-assurance` and an insight |
| `/workload-identity-assurance` | Cyber | Non-human identity is growing faster than any other identity population |
| `/container-exposure-assurance` | Cyber | Distinct evidence: image provenance, admission control, runtime |
| `/infrastructure-change-assurance` | Change | Infrastructure change has different gates from application release |
| `/gke-reliability-assurance` | Technology | Completes managed Kubernetes coverage. Must be built on GKE-specific facts |
| `/airflow-pipeline-assurance` | Technology | The Airflow 2 end of life and the major version change create a dated assurance problem |
| `/financial-services-production-resilience` | Industry | Operational resilience regimes are a distinct driver from AI |
| `/saas-ai-cost-assurance` | Industry | AI cost per tenant is a margin question specific to software companies |
| 4 to 6 insights | All | One per primary cluster per month keeps the research current |

## P2: 30 to 90 days

| Page | Cluster |
|---|---|
| `/capacity-assurance` | Reliability |
| `/platform-reliability-assurance` | Reliability |
| `/iac-security-assurance` | Cyber |
| `/devsecops-control-assurance` | Cyber |
| `/data-integrity-assurance` | Data |
| `/data-recovery-assurance` | Data |
| `/data-observability-assurance` | Data |
| `/cicd-assurance` | Change |
| `/gitops-assurance` | Change |
| `/sagemaker-production-assurance` | Technology |
| Additional industry pages for the four sectors | Industry |

Each P2 page must pass the four-question test before it is written. If it fails, merge it.

## P3: future

Expansion areas named in the specification, to be opened as clusters when the primary
clusters have depth: AI evaluation, AI economics, SRE practice, exposure management,
FinOps, data reliability, platform reliability. Also `/technology-value-realization`.

Each new cluster needs a hub page before any child page is published.

## Rules for adding a page

1. Add an entry to `docs/manifest/` with its brief, cluster, parent and related links.
2. Run `node scripts/scaffold-content.mjs` to create the draft.
3. Write it to `docs/content-style-guide.md`.
4. `node scripts/validate-content.mjs --only <slug>` must pass.
5. `npm run build`, which also validates the built site.
6. `npm run docs:generate` to refresh the matrix, inventory and cluster map.
7. After deploy, `npm run indexnow`.

## Questions to ask before every new page

- Does it have a distinct audience?
- Does it have a distinct search intent?
- Does it address a distinct business problem?
- Does it have distinct, useful content?

If any answer is no, merge it into the stronger canonical page.
