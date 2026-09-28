---
title: Gemini Enterprise Agent Platform Assurance
h1: Prove that workloads on Gemini Enterprise Agent Platform still hold their outcomes as models retire
seoTitle: 'Gemini Enterprise Agent Platform (Vertex AI) Assurance | Xyvionix'
description: >-
  What has to be re-proven on Gemini Enterprise Agent Platform, formerly
  Vertex AI: model version dates, replacement quality, endpoint location and
  agent controls.
summary: >-
  Google renamed Vertex AI in April 2026 and retires Gemini versions on
  published dates, some with 45 days' notice. Model versions, endpoint
  location, throughput commitments and agent controls are held against
  thresholds and re-proven.
lede: >-
  Gemini Enterprise Agent Platform assurance is the continuing proof that each
  AI workload on Google Cloud's AI platform, known as Vertex AI until April
  2026, still meets its outcome on the model version, endpoint and agent
  runtime it uses today. Google publishes a retirement date for every model
  version and does not upgrade a workload at retirement. Some current models
  carry a notice period of 45 days, and a recommended replacement can sit in a
  different model tier.
ogQuestion: Will the workload still pass on the model Google lists as the replacement?
platform: Gemini Enterprise Agent Platform
group: ai-platform
cluster: ai
secondary: []
parent: technologies
state: assured
audience:
  - Head of AI
  - CTO
intent: >-
  Technology + problem: assurance for AI workloads built on Gemini Enterprise
  Agent Platform (formerly Vertex AI) and Gemini models
related:
  assurance:
    - ai-assurance
    - model-change-assurance
    - llm-evaluation-assurance
    - ai-agent-assurance
  useCases:
    - production-ai-going-live
    - model-provider-migration
  technologies:
    - gcp-production-reliability
    - rag-vector-search-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - model-retirement-is-a-production-change
    - why-ai-evaluation-fails-after-launch
evidence:
  - name: Model version register
    detail: >-
      Every model version named in a production request, with its
      availability class, its retirement date re-read from Google's model
      versions page, and the listed replacement and that replacement's tier.
  - name: Name and identifier mapping
    detail: >-
      A maintained mapping from current product names to the API, role and
      resource identifiers that appear in audit logs and infrastructure code,
      so that a control can be followed from policy to log entry.
  - name: Replacement verdicts
    detail: >-
      The result of the enterprise's own regression suite against each listed
      replacement, with quality, latency and cost per outcome recorded
      separately where the replacement is in a different tier.
  - name: Endpoint record per client
    detail: >-
      The hostname each client and agent calls, the endpoint type it
      represents, and the processing jurisdiction that endpoint type allows.
  - name: Throughput commitment register
    detail: >-
      Each Provisioned Throughput subscription with its model, location and
      term end date, set beside the retirement date of that model and the
      measured share of traffic that spilled over.
  - name: Agent control coverage record
    detail: >-
      For each agent, the platform controls switched on, the release status
      of each control on the date the evidence was taken, and the result of
      a test showing the control acts.
  - name: Embedding model and index record
    detail: >-
      The embedding model behind each index, its retirement date, and the
      retrieval baseline measured before and after any re-embedding.
thresholds:
  - signal: Model versions in use without a tested replacement
    basis: The enterprise's change lead time, compared with the notice Google gives for that availability class, which is at least 45 days for short-term models
    lostWhen: The time to retirement is shorter than the change lead time and no replacement holds a passing verdict
  - signal: Replacement verdict across tiers
    basis: The quality floor, latency and cost per outcome the business approved on the original model
    lostWhen: The listed replacement fails any of the three on the enterprise's own suite
  - signal: Clients calling an endpoint outside the approved jurisdiction
    basis: The processing geography the business has committed to for the data the workload handles
    lostWhen: Any client of a residency-bound workload is found calling the global endpoint or an endpoint outside the jurisdiction
  - signal: Throughput commitment running past model retirement
    basis: The financial commitment the business approved and the life of the model it was bought for
    lostWhen: A subscription term ends after the retirement date of its model with no recorded decision
  - signal: Screening misses and false blocks
    basis: The harm of an unsafe response reaching a user, weighed against the cost of blocking legitimate requests
    lostWhen: Either rate on sampled traffic moves outside the range agreed for the template in use
faqs:
  - q: Is Vertex AI still a product?
    a: >-
      The name has been replaced. Google states that Vertex AI services and
      roadmap are delivered through Gemini Enterprise Agent Platform. The
      technical identifiers did not change with the brand, so endpoints
      remain on aiplatform.googleapis.com and older names still appear in
      logs, roles and infrastructure code.
  - q: Google lists a replacement model. Is testing still needed?
    a: >-
      Yes. A listed replacement is a migration target, not an equivalence
      statement. The listed replacement for gemini-2.5-pro is
      gemini-3.5-flash, which is a different tier. Quality, latency and cost
      per outcome are each measured on the enterprise's own suite before the
      retirement date.
  - q: Does choosing a location keep processing in that location?
    a: >-
      Data at rest stays in the chosen location. Processing location follows
      the type of endpoint the client calls, and Google states that the
      global endpoint gives no control over processing region. The evidence
      is therefore the hostname in use, per client.
  - q: Is Xyvionix a Google Cloud reseller?
    a: >-
      No. Xyvionix is not a reseller or partner of any vendor. It is
      independent of Google Cloud and holds evidence about the enterprise's
      own workloads.
sources:
  - title: 'Google Cloud Blog: introducing Gemini Enterprise Agent Platform'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform'
  - title: 'Gemini Enterprise Agent Platform: Vertex AI name changes'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes'
  - title: 'Gemini Enterprise Agent Platform: release notes'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes'
  - title: 'Gemini Enterprise Agent Platform: model versions and lifecycle'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions'
  - title: 'Gemini Enterprise Agent Platform: Google models'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models'
  - title: 'Gemini Enterprise Agent Platform: Agent Runtime'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime'
  - title: 'Gemini Enterprise Agent Platform: consumption options'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options'
  - title: 'Gemini Enterprise Agent Platform: Provisioned Throughput'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput'
  - title: 'Gemini Enterprise Agent Platform: locations'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations'
  - title: 'Gemini Enterprise Agent Platform: data residency'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency'
  - title: 'Gemini Enterprise Agent Platform: RAG Engine overview'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview'
  - title: 'Gemini Enterprise Agent Platform: agent evaluation'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation'
  - title: 'Google Cloud: Model Armor overview'
    url: 'https://docs.cloud.google.com/model-armor/overview'
  - title: 'Gemini API: models'
    url: 'https://ai.google.dev/gemini-api/docs/models'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Gemini Enterprise Agent Platform

Google renamed Vertex AI to Gemini Enterprise Agent Platform in April 2026. Its release notes record the naming change on 22 April 2026, and Google states that Vertex AI services and roadmap are now delivered through the new platform.

The rename changed the brand and left the identifiers alone. Endpoints remain on `aiplatform.googleapis.com`. Agent Runtime (formerly Vertex AI Agent Engine) still exposes its API resource as `ReasoningEngine`. A control described under its current product name is recorded in audit logs, roles and infrastructure code under the former one. Evidence that cannot bridge the two cannot be followed by an auditor.

The second problem is pace. Google sorts models into two availability classes, and the faster class is where the newest models sit. Three short-term Flash models were released between July and September 2026.

The third is that retirement is not an upgrade. Google's guidance for a retirement error is to point to the recommended model, test critical features and deploy. An unmigrated workload fails on the date. A migrated one runs on a model that may belong to a different tier.

The vendor-neutral method is set out in [AI Assurance](/ai-assurance). This page covers what is particular to Google's platform.

## What expires, and on whose calendar

Every entry is Google's published position as read in September 2026. Google states that a retirement date may be extended but is never moved earlier.

| What expires | Google's published position | What it does to evidence |
|---|---|---|
| Standard models | Available for at least 12 months after release | The verdict has a known minimum life |
| Short-term availability models, including gemini-3.6-flash, gemini-3.7-flash and gemini-3.8-flash | Active until a retirement date is announced with at least 45 days' notice | The planning horizon is 45 days |
| gemini-2.5-pro, gemini-2.5-flash, gemini-2.5-flash-lite | Retire 20 October 2026. The listed replacement for gemini-2.5-pro is gemini-3.5-flash | The successor is in a different tier, so quality, latency and cost are all open |
| Managed open model endpoints, including llama-3.3-70b-instruct-maas and gpt-oss-20b-maas | Deprecated 21 July 2026, retirement 21 October 2026 | Open weights on a managed endpoint follow the platform's dates |
| text-embedding-004, text-embedding-005, text-multilingual-embedding-002, multimodalembedding@001 | Retire 1 April 2027 | Every index built with them has to be re-embedded |
| gemini-2.5-flash-image | Retirement extended from 2 October 2026 to 15 March 2027, by a notice dated 14 September 2026 | A date copied once into a register is wrong |
| Agent surface of the Python SDK | Agent Platform SDK for Python 2.0.1 released 18 September 2026 as a breaking change | Code migration and re-test, separate from any model change |

On Google's list of generally available Gemini text models, Gemini 2.5 Pro is the only Pro-tier entry. A workload approved on Pro-tier quality has until 20 October 2026 to show that it holds on something else.

## What must be continuously re-proven

**The model version, by stable name.** The register holds the version each request names and re-reads its retirement date from Google's page, because dates move. Auto-updated aliases need separate care. For the Gemini API, Google documents that names ending in "latest" are updated automatically, with two weeks' email notice of a breaking change. Whatever an alias resolves to on a given day, an alias in a production request is recorded as a finding and replaced with a stable version name. The events that oblige re-testing are covered in [Model Change Assurance](/model-change-assurance).

**The replacement, on three measures.** A move from a Pro model to a Flash model is tested for quality on the enterprise's regression suite, for latency at production concurrency and for cost per outcome. Gemini Enterprise Agent Platform Evals (formerly the Gen AI evaluation service) supplies metrics and can score traces from production traffic. The threshold and the owner sit outside it, as set out in [LLM Evaluation Assurance](/llm-evaluation-assurance).

**The hostname each client calls.** Processing location follows the endpoint type. Google states that the global endpoint gives no control over processing region. Jurisdictional multi-region endpoints exist for the US and the EU, and the EU endpoint excludes the UK and Switzerland. Private Google Access is not supported on multi-region endpoints.

**The retrieval layer, separately.** RAG Engine supports VPC Service Controls and customer-managed encryption keys. Google states that data residency controls are not supported for it. A residency position proven for the model call says nothing about the grounding source beneath it.

**Throughput commitments against model life.** Provisioned Throughput is a fixed-term subscription tied to one model and one location, with terms from one week to one year. Traffic above the purchased level spills over to Standard PayGo by default. The register sets each term end date beside the retirement date of its model.

**Agent controls, with their status.** Agent Runtime runs agents in any language or framework that can be put in a container, so the agent's behaviour is set by the enterprise's own code. Agent Gateway, Agent Registry and Agent Observability became generally available on 18 June 2026. The Agent Identity API is in preview. A statement of control coverage names the status of each component on the date the evidence was taken, under [AI Agent Assurance](/ai-agent-assurance).

**Screening thresholds.** Model Armor screens prompts and responses using templates and confidence levels, and Google notes that lower thresholds raise false positives. Both misses and false blocks are measured.

## Common failure modes

- **The register that was copied once.** Retirement dates were entered by hand. One has since been extended, and a newer short-term model is missing.
- **A Pro workload moved to Flash on trust.** The listed replacement was adopted because it was listed. Quality on the hardest cases was never compared.
- **One client on the global endpoint.** The service was configured for the EU endpoint. A batch job written later uses the default hostname.
- **A UK workload on the EU endpoint.** Google's documentation states that the EU endpoint excludes the UK.
- **A commitment that outlives its model.** A one-year Provisioned Throughput term was bought for a model that retires inside the term.
- **Spillover that hides a capacity shortfall.** Overflow is served by Standard PayGo, at a different cost and performance class.
- **Audit by product name.** The control is described as Agent Runtime. The log query searches for that name and returns nothing, because the resource is `ReasoningEngine`.
- **The index nobody scheduled.** The embedding model behind the index retires on 1 April 2027 and re-embedding has no owner. That migration is covered in [RAG and Vector Search Assurance](/rag-vector-search-assurance).

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and changes to production go through the enterprise's own change process.

Corrections on this platform are specific. A model version without a tested replacement is evaluated against the listed successor and, where that fails, against alternatives. An alias is replaced with a stable version name. A client on the wrong endpoint is moved. A throughput commitment that runs past retirement is taken to the business with the measured options.

Where no replacement meets the floor before the retirement date, the decision belongs to the business and is recorded with its owner and an expiry date.

Closure is recorded by re-test. For a migration, the replacement holds a passing verdict on quality, latency and cost, and the retired version name is absent from every request path. For an endpoint correction, requests over a full window are observed on the intended hostname only. For an agent control, a test action shows that the control acts, and the log entry is found under the identifier the platform writes.

Each closure is stored with the model version, endpoint, SDK version and component status in force. When Google's release notes change any of them, the evidence expires and the record reopens.
