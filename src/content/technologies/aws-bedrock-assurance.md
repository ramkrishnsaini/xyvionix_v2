---
title: Amazon Bedrock Assurance
h1: Prove that every Amazon Bedrock model in use has a tested successor before its end-of-life date
seoTitle: 'Amazon Bedrock Assurance: Lifecycle, Regions, Guardrails | Xyvionix'
description: >-
  What has to be re-proven on Amazon Bedrock: model lifecycle state, the Region
  that processed each request, the guardrail version in force and the agent
  platform.
summary: >-
  Amazon Bedrock never migrates a workload to a new model, so the risk is a
  hard stop on a published date. Lifecycle state, inference Region, guardrail
  version and served tier are read from the account and held against
  thresholds.
lede: >-
  Amazon Bedrock assurance is the continuing proof that each model, inference
  profile, guardrail and agent in an AWS account is still the one the business
  approved, and that every model in use has a tested successor ahead of its
  end-of-life date. AWS states that migration does not happen automatically.
  Nothing changes silently at retirement on this platform. The workload stops,
  on a date and a notice period that are now set per model.
ogQuestion: Does every Bedrock model in use have a tested successor?
platform: Amazon Bedrock
group: ai-platform
cluster: ai
secondary:
  - cyber
parent: technologies
state: assured
audience:
  - Head of AI
  - CTO
  - CISO
intent: 'Technology + problem: assurance for AI workloads built on Amazon Bedrock'
related:
  assurance:
    - ai-assurance
    - model-change-assurance
    - production-rag-assurance
    - ai-agent-assurance
  useCases:
    - production-ai-going-live
    - model-provider-migration
    - ai-cost-spike
  technologies:
    - aws-iam-exposure-assurance
    - aws-production-reliability
    - rag-vector-search-assurance
  industries:
    - financial-services-ai-assurance
    - insurance-claims-ai-assurance
  insights:
    - model-retirement-is-a-production-change
    - measuring-production-rag-quality
evidence:
  - name: Model register with lifecycle rule
    detail: >-
      Every model ID invoked in each account and Region, with its lifecycle
      state read from the Bedrock API, the lifecycle policy that applies to
      it, its Legacy period and its end-of-life date.
  - name: Successor verdicts
    detail: >-
      For each model in Legacy state, the named successor and the result of
      the enterprise's own regression suite against it, with the date the
      verdict was taken.
  - name: Last invocation per Legacy model path
    detail: >-
      The date each Legacy model was last invoked on each path that depends
      on it, including recovery routes and seasonal workloads that are
      normally idle.
  - name: Inference Region record
    detail: >-
      The inference profile each workload calls and the Region that processed
      each request, taken from the CloudTrail record and compared with the
      geography the business has committed to.
  - name: Guardrail version and test results
    detail: >-
      The guardrail, version and tier attached to each workload, with dated
      results of test inputs that the approved configuration is expected to
      block.
  - name: Served tier and cache usage
    detail: >-
      The service tier that served each request, as reported by
      ResolvedServiceTier, with cache read and cache write tokens, reconciled
      to the unit cost the business approved.
  - name: Agent platform inventory
    detail: >-
      Each agent with the platform it runs on, Amazon Bedrock Agents Classic
      or Amazon Bedrock AgentCore, the model it calls and that model's
      lifecycle state.
thresholds:
  - signal: Models in Legacy state without a tested successor
    basis: The enterprise's change lead time, compared with the Legacy period stated for that model
    lostWhen: The time to end of life is shorter than the change lead time and no successor holds a passing verdict
  - signal: Days since last invocation of a Legacy model on a dependent path
    basis: AWS states that access to a Legacy model may be lost after 15 days of inactivity
    lostWhen: A path that depends on a Legacy model approaches the inactivity limit with no scheduled use and no migration date
  - signal: Requests processed outside the approved geography
    basis: The processing geography the business has committed to for the data the workload handles
    lostWhen: Any request from a residency-bound workload is recorded as processed in a Region outside that geography
  - signal: Guardrail version in force
    basis: Approval applies to one guardrail version and tier, tested against the inputs the business decided to block
    lostWhen: A workload calls a guardrail version other than the approved one, or approved test inputs pass
  - signal: Served tier against requested tier
    basis: The latency and unit cost the business approved for the workload
    lostWhen: The share of requests served by a tier other than the one requested exceeds the agreed level for the window
faqs:
  - q: Bedrock does not upgrade models automatically. Is that not the safer design?
    a: >-
      It removes silent change and replaces it with a deadline. The model that
      answers is the model that was requested, so evidence stays valid until
      end of life. On that date an unmigrated workload fails. The assurance
      question becomes whether a tested successor exists while the time
      remaining is still longer than the enterprise's change lead time.
  - q: Can processing location on Amazon Bedrock be proven, or only designed?
    a: >-
      It can be proven per request. AWS documents that CloudTrail records the
      Region that processed a cross-Region inference request in
      additionalEventData.inferenceRegion. That turns a residency statement
      into a measurement that can be checked continuously against the
      geography the business committed to.
  - q: Agents Classic has no end-of-life date. Why plan a migration now?
    a: >-
      Because its model catalogue was frozen on 30 July 2026. An agent on
      Agents Classic cannot move to a model released after that date, so each
      model retirement narrows the choice of successor. The end date for the
      agent is set by the end-of-life dates of the models it can still use.
  - q: Does Xyvionix resell AWS services?
    a: >-
      No. Xyvionix is not a reseller or partner of any vendor. It is
      independent of AWS, and the evidence it holds concerns the enterprise's
      own workloads.
sources:
  - title: 'Amazon Bedrock User Guide: model lifecycle'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html'
  - title: 'Amazon Bedrock User Guide: model lifecycle for models launched before 7 September 2026'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html'
  - title: 'Amazon Bedrock User Guide: cross-Region inference'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html'
  - title: 'Amazon Bedrock User Guide: service tiers for inference'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html'
  - title: 'Amazon Bedrock User Guide: Provisioned Throughput supported models'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-supported.html'
  - title: 'Amazon Bedrock User Guide: Amazon Bedrock Guardrails'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html'
  - title: 'Amazon Bedrock User Guide: evaluations'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html'
  - title: 'Amazon Bedrock User Guide: Agents Classic maintenance mode'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html'
  - title: 'Amazon Bedrock AgentCore Developer Guide: what is Amazon Bedrock AgentCore'
    url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html'
  - title: 'Amazon Bedrock User Guide: sync a data source with a knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'Claude Platform documentation: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Amazon Bedrock

Amazon Bedrock fails in one direction. AWS states that migration does not happen automatically, so a model ID in a request resolves to that model until the day it reaches end of life. Then the workload stops.

That makes the problem one of dates, and the dates are no longer governed by a single rule. Two lifecycle policies apply, selected by whether a model launched before or on and after 7 September 2026. Under the newer policy the notice period is stated on each model card.

Three further properties are decided per request, not per account. The inference profile named in the request decides where it is processed. The service tier that serves it can differ from the tier requested. The guardrail that screens it is a numbered version, and the version is chosen by the caller.

Agents add a fourth. Amazon Bedrock Agents Classic (formerly Amazon Bedrock Agents) is in maintenance mode with a frozen model catalogue, so model lifecycle and agent platform are one planning problem.

The vendor-neutral method is set out in [AI Assurance](/ai-assurance). This page covers what is particular to Amazon Bedrock.

## What expires, and on whose calendar

Every entry is AWS's published position as read in September 2026. AWS notes that its dates may differ from the model provider's own.

| What expires | AWS's published position | What it does to evidence |
|---|---|---|
| Models launched on or after 7 September 2026 | Each model card states an "EOL no sooner than" date and a Legacy period of 6 months or 45 days | The notice period is a property of the model and is recorded per model |
| Models launched before 7 September 2026 | At least 12 months on Bedrock before end of life and at least 6 months in Legacy. A public extended access phase follows, with higher pricing set by the provider | Staying on the model has a cost step as well as an end date |
| Access to a Legacy model | Closed to new customers. Existing customers may lose access after 15 days of inactivity. No new Provisioned Throughput | An idle path can lose its model before the published date |
| Claude Sonnet 4 | End of life on Bedrock 14 October 2026. Retired on the Claude API on 15 June 2026 | One model, two dates. The register is keyed by platform |
| Jamba 1.5 and TwelveLabs Marengo Embed v2.7 | End of life 26 November 2026 and 30 November 2026 | The second is an embedding model, so the index built with it expires too |
| Claude Opus 4.1 | End of life 8 January 2027 | Verdicts held on it expire on that date |
| Amazon Bedrock Agents Classic | Closed to new customers from 30 July 2026. Catalogue frozen at that date. No end-of-life date set | Every model retirement shortens the life of agents built on it |

A Legacy period of 45 days is shorter than many enterprise change cycles. Migration has to be under way on the date a model enters Legacy, not started on it.

## What must be continuously re-proven

**Lifecycle state, read from the API.** Bedrock exposes Active, Legacy and End-of-Life states in the `modelLifecycle` field of `GetFoundationModel` and `ListFoundationModels`. The register is rebuilt from that field and from the model card, under the method in [Model Change Assurance](/model-change-assurance).

**Use of every Legacy path.** Because access may lapse after 15 days of inactivity, the date of last invocation is evidence. A disaster recovery route that is exercised twice a year cannot rely on a Legacy model.

**The Region that processed each request.** Cross-Region inference uses inference profiles, which are Geographic (US, EU or APAC) or Global. A Global profile can route to any commercial Region and is priced about 10% lower, and requests can be routed to Regions that are not enabled in the account. CloudTrail records the processing Region in `additionalEventData.inferenceRegion`. A residency statement is tested against that field, per request.

**The guardrail version in force.** Amazon Bedrock Guardrails are versioned and come in Classic and Standard tiers. The evidence names the version and tier each workload calls. AWS documents one gap directly: reasoning content blocks are excluded from guardrail evaluation.

**The tier that served the request.** Service tiers are Reserved, Priority, Standard and Flex, and the Reserved tier overflows to Standard. `ResolvedServiceTier` shows which tier served the request, and latency and cost evidence is built on it.

**Capacity plans for current models.** The Provisioned Throughput supported list stops at older models, and no Claude 4 or later model appears on it. Inference profiles do not support it either. A capacity plan written around Provisioned Throughput does not carry forward to a successor model.

**Agent platform and permissions.** Amazon Bedrock AgentCore is made up of separately delivered services, including Runtime, Gateway, Identity, Policy, Memory and Observability. Each can diverge from what was approved, which is the subject of [AI Agent Assurance](/ai-agent-assurance).

**Knowledge base synchronisation.** Amazon Bedrock Knowledge Bases require a sync each time files are added, modified or removed at the source. Corpus age is measured as described in [Production RAG Assurance](/production-rag-assurance).

## Common failure modes

- **One notice period assumed for all models.** The register applies the six-month rule to a model whose card states 45 days.
- **The dormant recovery path.** The primary workload migrated in time. The fallback still names a Legacy model, sat idle for more than 15 days, and fails when needed.
- **Residency by profile name.** A workload approved on a Geographic profile is moved to a Global profile for price. Only an identifier in the request changed.
- **The wrong guardrail version.** The approved guardrail version exists. The application calls a different one.
- **Reasoning output unscreened.** The guardrail screens the final answer. Reasoning content, which is excluded from evaluation, is logged or shown to the user.
- **Agent stranded by a model retirement.** The agent runs on Agents Classic and its model reaches end of life. The newer models are not in the frozen catalogue, so a model migration becomes an agent platform migration with the same deadline.
- **Evaluation run once.** An Amazon Bedrock evaluations job passed before launch. No schedule or threshold turns that result into continuing proof.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and changes to production go through the enterprise's own change process.

Corrections on Amazon Bedrock follow the signal. For a Legacy model, candidate successors are run against the enterprise's regression suite using the method in [LLM Evaluation Assurance](/llm-evaluation-assurance). For a dormant path, the path is migrated first, or a scheduled invocation is put in place until it is. For a residency breach, the profile is corrected and the affected requests are identified from CloudTrail. For a guardrail gap, the workload is pinned to the approved version and reasoning output is handled outside the guardrail.

An agent on Agents Classic is a larger correction. AWS recommends migration to AgentCore, which changes identity, policy and the action record together. It is planned against the end-of-life dates of the models the agent can still use.

Closure is recorded by re-test. For a model migration, the successor holds a passing verdict, the retired model ID is absent from configuration on every path including recovery, and lifecycle state for every model in use reads Active. For residency, the inference Region recorded for a full window of requests sits inside the approved geography. For a guardrail, the approved test inputs are blocked through the version the workload calls, and `ApplyGuardrail`, which works without a model call, returns the same result.

Each closure is stored with the model ID, inference profile, guardrail version and resolved tier in force. When AWS changes the lifecycle state of any model in the register, the evidence is re-read and the record reopens.
