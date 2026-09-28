---
title: AI Assurance
h1: Prove that production AI still answers correctly, safely and within cost
seoTitle: 'AI Assurance: Continuous Proof for Production AI | Xyvionix'
description: >-
  AI assurance is continuing proof that a production AI system still meets its
  outcome after the model, prompt, data, tools or price sheet behind it change.
summary: >-
  Evidence about an AI system describes one model, prompt, corpus, tool set and
  price sheet. Each changes on its own calendar. AI assurance re-proves the
  outcome when they do, and owns the correction when the proof fails.
lede: >-
  AI assurance is the continuing proof that a production AI system still
  produces correct, safe and affordable outcomes after its model, prompt, data,
  tools or pricing have changed. Evidence about an AI system describes one
  combination of those components at one point in time. When any of them
  changes, the evidence expires and the outcome has to be re-proven from the
  running system.
ogQuestion: Can production AI still be proven?
kind: hub
tier: primary
cluster: ai
secondary:
  - value
  - data
parent: assurance
state: assured
audience:
  - Head of AI
  - CTO
  - CISO
  - AI Governance
intent: 'Commercial: what AI assurance covers and how it is held continuously'
related:
  assurance:
    - ai-agent-assurance
    - production-rag-assurance
    - llm-evaluation-assurance
    - model-change-assurance
    - ai-security-assurance
    - ai-governance-assurance
    - ai-observability-assurance
    - ai-cost-assurance
    - mcp-security-assurance
  useCases:
    - production-ai-going-live
    - rag-quality-degradation
    - ai-agent-with-write-access
    - model-provider-migration
    - ai-cost-spike
    - ai-audit-readiness
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
    - vllm-production-assurance
    - rag-vector-search-assurance
  industries:
    - financial-services-ai-assurance
    - healthcare-ai-assurance
    - insurance-claims-ai-assurance
  insights:
    - why-ai-evaluation-fails-after-launch
    - measuring-production-rag-quality
    - ai-agent-permission-risk
evidence:
  - name: AI system inventory
    detail: >-
      Every AI system in production with its owner, the business outcome it
      serves and the components it is built from. A system that is not listed
      has no evidence and is recorded as Unassured.
  - name: Component version record
    detail: >-
      For each system, the model and platform, prompt version, retrieval index,
      tool definitions and judge model in force, so that every result can be
      tied to the combination that produced it.
  - name: Regression evaluation results
    detail: >-
      Results of the enterprise's own test suite, run against the production
      configuration and re-run on each change to a component.
  - name: Sampled production quality scores
    detail: >-
      Scores taken from live traffic, so that the position reflects what users
      received and not only what was tested before release.
  - name: External change register
    detail: >-
      Model retirement dates, alias movements, tool definition changes and
      price sheet events, read from the provider's own source and refreshed,
      not copied once.
  - name: Cost per successful outcome
    detail: >-
      Spend divided by outcomes that met the quality threshold, recomputed when
      price, model or traffic mix changes.
  - name: Corrective action and closure record
    detail: >-
      Each loss of assurance with its cause, the correction made, the re-test
      that closed it and any recurrence against the same record.
thresholds:
  - signal: Evidence age against the last component change
    basis: An evaluation result describes one combination of model, prompt, data and tools
    lostWhen: Any component has changed since the most recent passing evaluation of the production configuration
  - signal: Regression pass rate on the production configuration
    basis: The error rate the business process can absorb before the consequence exceeds the benefit
    lostWhen: The pass rate falls below the agreed floor after a change, or the suite has not been run since the change
  - signal: Quality on sampled production traffic
    basis: The quality the business process was approved at, measured on what users receive
    lostWhen: The sampled score falls below the agreed floor, or departs from the pre-release score beyond the agreed tolerance
  - signal: Models in production with a retirement date and no tested successor
    basis: The provider's committed notice period compared with the enterprise's own change lead time
    lostWhen: The time remaining is shorter than the time needed to evaluate and release a replacement
  - signal: Cost per successful outcome
    basis: The value of the outcome to the business and the budget approved for it
    lostWhen: The unit cost exceeds the agreed ceiling for consecutive windows without a matching rise in outcomes
faqs:
  - q: How is AI assurance different from buying an evaluation or observability tool?
    a: >-
      A tool produces measurements. Assurance is a position held against a
      threshold the business has agreed, with an owner for the correction when
      the threshold is breached and a re-test before closure is recorded. The
      tools are useful inputs. They do not decide whether the outcome is still
      met, and they do not act when it is not.
  - q: Does a passing evaluation at launch count as assurance?
    a: >-
      It counts as evidence for the system that was tested on that date. It
      stops describing production when the model, prompt, data or tools change.
      Assurance records what the evidence was taken against and treats it as
      expired when that combination no longer exists.
  - q: Where should an enterprise with several AI systems start?
    a: >-
      With the inventory and the component version record. Until it is known
      which systems exist, which model each one calls on which platform and
      when that model retires, no other statement about them can be tested.
sources:
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'Anthropic: a postmortem of three recent issues'
    url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'
  - title: 'Microsoft Learn: document-level access control in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'
  - title: 'Model Context Protocol specification 2026-07-28: tools'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'European Commission: AI Omnibus enters into force'
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force'
  - title: 'Microsoft Learn: Foundry Models retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Amazon Bedrock: model lifecycle'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html'
  - title: 'Google Cloud: Vertex AI name changes'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes'
  - title: 'Google Cloud: Agent Runtime on Gemini Enterprise Agent Platform'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime'
  - title: 'OCC Bulletin 2026-13: model risk management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why assurance is lost

An AI system is approved as a combination: one model version, one prompt, one body of data, one set of tools, one price sheet. The evaluation that supported go-live describes that combination and nothing else. Each part then changes on its own calendar, and most of those calendars belong to a party outside the enterprise.

**The model changes.** Providers retire models on published schedules. Anthropic retired six models from its own API on four dates between February and August 2026, and commits to at least 60 days' notice before a retirement. A pinned version is not a fixed system either. Anthropic's postmortem of three infrastructure bugs that degraded output in August and September 2025 records that the evaluations it ran did not capture the degradation users were reporting.

**The prompt changes.** Prompts are edited more often than code and usually with less review. A revised instruction or a new example produces a system that has not been evaluated, even when the change record calls it a wording fix.

**The data changes.** Documents are added, superseded and deleted, and access rights change at the source. Microsoft documents that in Azure AI Search a permission change in the source system is reflected in results only after the permission metadata has been synchronised to the index. Until then the index answers according to the previous access rules.

**The tools change.** Under the Model Context Protocol a server can change its tool list at run time. The definition that was reviewed at approval may not be the definition in use.

**The cost changes.** Unit cost moves with no change in traffic. Anthropic's models from Claude Opus 4.7 onward use a tokenizer that produces about 30% more tokens for the same text, so an upgrade at an unchanged list price still raises the bill.

None of these events is a fault. Each is an ordinary change that leaves earlier evidence describing a system that no longer exists.

## What is at stake

A conventional system that fails returns an error. An AI system that fails returns a fluent answer. Loss of quality does not show in availability or latency, so the business finds it through its consequences: a customer told the wrong entitlement, a decision made on an incomplete retrieval, an action taken that nobody approved.

Four consequences reach the board. Commitments are made on wrong answers. Content is disclosed to people who are no longer entitled to see it. Spend grows faster than the outcomes it buys. And the enterprise cannot show, when an auditor or regulator asks, that the system was within its limits on a given date.

The last of these has a calendar. Regulation (EU) 2026/1744 entered into force on 27 July 2026 and moved the application of the EU AI Act's high-risk obligations for Annex III systems to 2 December 2027. Evidence assembled for a launch in 2026 will be more than a year old on that date unless it has been kept current.

## What Xyvionix assures

Xyvionix holds a current, evidenced position on each outcome a production AI system depends on. The outcomes are assured separately because each one expires for a different reason.

**Answers rest on the right content.** Where a system retrieves before it answers, the retrieved material has to be current, sufficient and limited to what the requester may see. This is [Production RAG Assurance](/production-rag-assurance).

**The measurement still means something.** Test sets age and automated judges drift, so a passing score can outlive its validity. [LLM Evaluation Assurance](/llm-evaluation-assurance) keeps the evaluation itself in a proven condition.

**The outcome survives a model change.** Retirement, alias movement, provider migration and routing are production changes that arrive on a provider's schedule. [Model Change Assurance](/model-change-assurance) re-proves the outcome on each one.

**Systems that act stay within bounds.** [AI Agent Assurance](/ai-agent-assurance) covers what an agent is permitted to do and what it did. [MCP Security Assurance](/mcp-security-assurance) covers the tool servers it connects to.

**A successful attack is contained.** [AI Security Assurance](/ai-security-assurance) covers exposure to hostile input and the limits on what a compromised system can reach.

**Obligations have owners.** [AI Governance Assurance](/ai-governance-assurance) covers inventory, accountability and the evidence that regulatory expectations imply.

**Loss would be noticed.** [AI Observability Assurance](/ai-observability-assurance) tests whether telemetry is complete enough to show a fall in quality, safety or cost control.

**Spend tracks outcome.** [AI Cost Assurance](/ai-cost-assurance) holds cost per successful outcome against the value of that outcome.

The state of a system is the state of its weakest outcome. A system with current evaluation evidence and no current retrieval evidence is Unassured for every answer that depends on retrieval.

## Common failure modes

- **Launch evidence presented as current.** The evaluation report from go-live is still the document shown to risk committees. Nothing in it records which model, prompt or index it was taken against.
- **Healthy dashboards over degraded answers.** Latency, error rate and token volume are within range. None of them measures whether the answer was right.
- **Change with no change record.** An alias moves, a deployment is upgraded by the platform, an index re-syncs, a tool is redefined. None of these passes through the enterprise's change process, so none triggers a re-test.
- **Components owned, outcome unowned.** The platform team owns the model endpoint, the data team owns the index and the product team owns the prompt. Nobody owns whether the answer is still correct.
- **One score for the whole system.** A single end-to-end score falls and nobody can say whether retrieval, generation or a tool caused it, so correction starts with guesswork.
- **Quality and cost judged apart.** A cheaper model passes the budget review and a better model passes the quality review. Neither review sees the cost of a correct answer.
- **Systems nobody listed.** AI features arrive inside purchased software and team-level projects. They are in production and outside the inventory.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production must change.

The first task is attribution. The component version record is compared with the last combination that passed, which identifies what changed: the model, the prompt, the corpus, a tool or the price. The correction follows from the cause. A moved alias is pinned and the replacement is evaluated before it is accepted. A prompt change that failed regression is reverted. An index that serves withdrawn content is re-synchronised and probed. A redefined tool is held back until it has been reviewed.

Some corrections need a decision that belongs to the business, such as accepting a successor model that scores lower on one task because the current model is being retired. That decision is recorded with its owner and an expiry date.

## Verified closure

A correction is closed when re-testing shows the outcome is back within threshold, not when the change was deployed or the ticket was resolved.

For an AI system that means three things. The regression suite has been re-run against the production configuration and has passed. Sampled production traffic has been scored over an agreed window and agrees with the pre-release result. The evidence has been stored with the component versions it was taken against, so that the next change can be seen to expire it.

Closure returns to the record as a new signal. If the same condition reappears it reopens against the same record, which makes recurrence visible and separates a fix from a postponement.

## Technology and industry context

The platforms deliver change in different ways, and the difference decides which control matters. Microsoft Foundry upgrades Standard deployments automatically at retirement, so the risk is a model that changes under a live workload. Amazon Bedrock states that migration is never automatic, so the risk is a request that stops working on a known date. Google has renamed Vertex AI to Gemini Enterprise Agent Platform while the underlying API identifiers stay as they were, so evidence has to map the names in policy to the names in logs. Platform detail is covered in [Azure AI Assurance](/azure-ai-assurance), [Amazon Bedrock Assurance](/aws-bedrock-assurance) and [Gemini Enterprise Agent Platform Assurance](/vertex-ai-assurance).

Sector changes the weight of the evidence. In US banking, OCC Bulletin 2026-13 of April 2026 replaced the 2011 model risk guidance and states that generative and agentic AI models are not within its scope. A bank therefore has to define its own standard and show that it is met, which is covered in [Financial Services AI Assurance](/financial-services-ai-assurance).

Most enterprises meet these questions first at launch. The evidence needed before a system takes live traffic, and the point at which that evidence starts to age, is set out in [Production AI Going Live](/production-ai-going-live).
