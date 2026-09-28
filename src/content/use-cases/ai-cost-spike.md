---
title: AI Cost Spike
h1: AI spend has jumped and usage has not. Attribute it before cutting
seoTitle: 'AI Cost Spike: Attribute the Cause, Then Correct | Xyvionix'
description: >-
  How to attribute a sharp rise in AI spend to a workload and a cause: loops,
  context growth, cache loss, retries or a tier change, and how to prove the
  fix held.
summary: >-
  Spend rose faster than usage and the cause is not yet known. Attribution runs
  in order: volume or unit cost, which workload, which factor moved and when.
  Containment is narrow, and closure proves the condition cannot silently recur.
lede: >-
  An AI cost spike is At risk until it has been attributed, because every
  response made before attribution is a guess. AI spend is a product of calls
  per outcome, tokens per call, effective price per token and success rate, and
  any one of them can move while request volume stays level. The spike is
  traced to a workload, an owner and a factor, contained at that point, and
  closed when the unit cost has returned inside its ceiling and the control
  has been shown to stop the same condition.
ogQuestion: Spend rose and usage did not. Which factor moved?
cluster: ai
secondary:
  - value
parent: use-cases
state: risk
audience:
  - FinOps Leadership
  - Head of AI
  - CTO
intent: 'Problem: AI spend has risen sharply and the cause is not yet attributed'
related:
  assurance:
    - ai-cost-assurance
    - unit-economics-assurance
    - ai-observability-assurance
  useCases:
    - cloud-cost-anomaly
    - model-provider-migration
  technologies:
    - vllm-production-assurance
    - azure-ai-assurance
    - aws-bedrock-assurance
  industries:
    - software-technology
  insights:
    - ai-cost-per-business-outcome
evidence:
  - name: Spend decomposition for two periods
    detail: >-
      For the spike period and an equal period before it: requests, calls per
      task, input and output tokens per call and effective price per token,
      taken from provider usage data.
  - name: Attribution by workload, tenant and key
    detail: >-
      The rise allocated to a workload, a feature, a tenant and an API key,
      with an accountable owner for each and the unattributed remainder stated
      as a figure.
  - name: Outcome count for the same periods
    detail: >-
      The number of outcomes that passed the agreed quality test in each
      period, so that a rise in spend can be set against a rise in what was
      delivered.
  - name: Change timeline
    detail: >-
      Every change to prompt, tools, model, service tier, routing and corpus
      synchronisation in the period, together with provider price and
      lifecycle events that fell inside it.
  - name: Agent step record
    detail: >-
      Model calls and tool calls per agent invocation, held as a distribution,
      with the share of invocations that ended at the step limit.
  - name: Cache share series
    detail: >-
      Cache-read and cache-write tokens as a share of input tokens, before and
      after the onset of the spike.
  - name: Served tier and model record
    detail: >-
      The service tier and model that served each request, as reported by the
      platform, compared with the tier and model that were planned.
thresholds:
  - signal: Spend growth against outcome growth
    basis: Spend is expected to rise in proportion to the outcomes delivered
    lostWhen: Spend rises faster than outcomes across the agreed window
  - signal: Time from onset to attribution
    basis: The amount the business is prepared to spend before it knows the cause
    lostWhen: The rise has not been attributed to a workload and a factor inside the agreed period
  - signal: Agent invocations that end at the step limit
    basis: The number of steps the task legitimately needs
    lostWhen: The share of invocations reaching the limit exceeds the agreed level, or no limit is enforced
  - signal: Requests above a long-context pricing boundary
    basis: The published boundary for the model in use and the share of long requests the cost model assumed
    lostWhen: The share of requests billed at the long-context rate exceeds the assumption
  - signal: Served tier against planned tier
    basis: The service tier the approved unit cost was calculated on
    lostWhen: Traffic is served on a higher-priced tier than the one approved and no decision records it
  - signal: Retries per successful request
    basis: The failure rate of the dependency and the retry policy agreed for it
    lostWhen: Retries exceed the agreed bound for consecutive windows
faqs:
  - q: Usage did not rise. How can the bill have risen?
    a: >-
      Because request count is only one factor. The price paid per token
      changes with the service tier, the length of the context, the share of
      input served from cache and the model that answered. Tokens per request
      change with conversation length and tool definitions. Calls per task
      change when an agent loops. Each of these can move while the number of
      requests stays where it was.
  - q: Should a hard spending cap be the first response?
    a: >-
      Only as a decision by the business, because a cap that stops spend also
      stops the service. Narrow containment is usually available once the rise
      has been attributed: a step limit on one agent, a rate limit on one
      tenant or key, or a service tier set back to the planned one. These stop
      the loss without interrupting workloads that are behaving as approved.
  - q: Could the spike be misuse and not a fault?
    a: >-
      It could. OWASP's Top 10 for LLM Applications 2026 lists Unbounded
      Consumption, which rose four places from the previous edition.
      Attribution by tenant and key is what separates the two cases. A fault
      appears across the users of a workload. Misuse concentrates in one key or
      one tenant, and the response then belongs to the security process as
      well as the cost owner.
sources:
  - title: 'OpenTelemetry GenAI semantic conventions: metrics'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'OpenAI: pricing'
    url: 'https://developers.openai.com/api/docs/pricing'
  - title: 'OpenAI: prompt caching'
    url: 'https://developers.openai.com/api/docs/guides/prompt-caching'
  - title: 'Amazon Bedrock: pricing'
    url: 'https://aws.amazon.com/bedrock/pricing/'
  - title: 'Amazon Bedrock: service tiers for inference'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html'
  - title: 'Google Cloud: Gemini Enterprise Agent Platform consumption options'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options'
  - title: 'Microsoft Learn: observability in Microsoft Foundry'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/observability'
  - title: 'Amazon Bedrock: sync your data with your knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'OWASP Top 10 for LLM Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## What changed

AI spend has risen sharply and nobody can yet say why. Request volume is level, or up a little. The provider's usage page shows a step that the traffic does not explain.

The state is At risk. The cost threshold has been breached and the cause has not been attributed. Until it is, each possible response is a guess. Cutting a workload or capping the account may land on something that was behaving as approved, and leave the cause running.

AI spend is a product of four factors, and any one of them can move alone.

Cost per outcome equals calls per outcome, multiplied by tokens per call, multiplied by the effective price per token, divided by the success rate.

A usage dashboard that counts requests sees none of the four directly. That is why a spike so often arrives with flat usage.

## The business outcome at risk

The first outcome at risk is the margin or budget the workload was approved on. The spend continues while the investigation runs, so slow attribution has a price of its own.

The second is the service. The quickest response to a spike is an account-wide cap, and a cap that stops spend stops every workload behind it. A cost incident becomes an availability incident, by decision.

The third is the quality of the response. A move to a cheaper model lowers the cost of each request. If it also lowers the success rate, more attempts are needed for each outcome, and the cost the business cares about goes up. A spike handled without attribution tends to be handled twice.

## What must be proven

Attribution runs in order, and each answer narrows the next question.

1. **Is it volume or unit cost?** Spend is set against outcomes for the same period. If outcomes rose in proportion, the rise is growth and the finding goes to the budget owner.
2. **Where is it?** The rise is allocated to a workload, a feature, a tenant and a key. The part that cannot be allocated is stated as a figure.
3. **Which factor moved?** The spike period is compared with an equal period before it.
4. **What changed at the onset?** The factor is matched to an entry in the change timeline, including changes made by a provider.

| Factor that moved | How it appears in usage data | Usual causes |
|---|---|---|
| Calls per outcome | Model and tool calls per invocation rise while requests from users stay level | Agent loop, retry storm |
| Input tokens per call | Input tokens rise and output tokens do not | Context growth, larger retrieved payload, added tool definitions |
| Output tokens per call | Output or reasoning tokens rise | Raised reasoning effort, a more verbose output format |
| Effective price per token | Token counts are level and cost rises | Lost cache share, higher service tier, long-context boundary, changed model |
| Success rate | Cost per request is level and cost per outcome rises | A fall in quality, so more attempts per outcome |

The continuing position on these signals is held under [AI Cost Assurance](/ai-cost-assurance). How the unit itself is defined and reconciled is covered by [Unit Economics Assurance](/unit-economics-assurance).

## What causes assurance to be lost

**An agent loops.** The OpenTelemetry GenAI conventions define metrics for inference calls and tool calls per agent invocation, which are the signals that show a loop. Each iteration pays a fixed overhead again. Anthropic documents a tool-use system prompt of 286 to 675 tokens depending on the model, and about 4,500 tokens per request for its computer-use toolset.

**Context crosses a pricing boundary.** OpenAI bills long-context requests at twice the input rate and one and a half times the output rate. Context that grows gradually produces a step in cost on the day it passes the boundary.

**The cache stops matching.** OpenAI documents that changing the model, the tools, the reasoning effort or the output format breaks reuse of the cached prefix, and that compacting the conversation does the same.

**The tier changed.** Amazon Bedrock prices its Priority tier at a 75% premium over Standard and reports the tier that served each request. A tier raised during a latency incident and never set back looks like a price rise.

**Committed capacity overflows.** On Google Cloud's Gemini Enterprise Agent Platform (formerly Vertex AI), traffic above the Provisioned Throughput baseline spills over to Standard PayGo by default.

**A dependency fails and clients retry.** Each retry sends the full context again. The user sees one slow answer. The bill shows several requests.

**Spend sits outside the product.** Microsoft Foundry bills evaluations by consumption. Amazon Bedrock Knowledge Bases re-ingest a changed document in full, and CSV files are always re-ingested when their metadata changes.

## Corrective action

The order is contain, then correct. Under assurance, Xyvionix owns the corrective action through to completion within the access it has been granted, and uses the enterprise's own change process for changes to production.

Containment is as narrow as the attribution allows: a step limit on the agent that loops, a rate limit on one tenant or key, a tier set back to the planned one. An account-wide cap is a decision for the business, made with the interruption it causes in view.

The correction follows the factor. A loop is corrected at the tool call that caused it, and the step limit stays in place afterwards. Context growth is corrected by bounding the history and the retrieved payload that are sent with each call. A broken cache prefix is restored by moving the changing content behind the cached section. A retry storm is corrected in the retry policy and at the failing dependency. Where the factor is the success rate, the fault is one of quality and passes to [LLM Evaluation Assurance](/llm-evaluation-assurance), because spending less on a failing workload does not repair it.

## What verified closure looks like

Closure has to show that the correction held and that the same condition would now be caught.

Four results are recorded. Cost per successful outcome has returned inside its ceiling across a full window of representative use, and the quality threshold for the workload still holds. The factor that moved is back at its earlier level, named and measured: calls per invocation, cache share or served tier. The condition has been re-created in a test and the control has stopped it, for example a test invocation that is made to loop ends at the step limit. The usage figures have been reconciled to billing once the period is final.

The record keeps the factor and the change that caused it. If spend breaches again, the record reopens and shows whether the cause is the same.

## What to do next

The first step uses data the provider already supplies. The team takes the usage export for the spike period and for an equal period before it. For each API key or workload it computes four numbers: requests, input tokens per request, output tokens per request and the cached share of input tokens.

The number that moved names the factor. The key names the owner. If usage cannot be separated by key or workload, that is the first correction to make, since a spike that cannot be located cannot be contained narrowly. The general method for a rise in cloud spend is set out in [Cloud Cost Anomaly](/cloud-cost-anomaly).
