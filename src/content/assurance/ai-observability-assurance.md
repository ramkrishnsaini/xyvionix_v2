---
title: AI Observability Assurance
h1: Prove that AI telemetry would show when quality, safety or cost is lost
seoTitle: 'AI Observability Assurance: Traces, Scores, Cost | Xyvionix'
description: >-
  Continuous assurance that AI telemetry is complete enough to detect quality,
  safety and cost loss: trace coverage, scored samples and visible tool errors.
summary: >-
  A trace shows that a model call happened. It does not show that the answer
  was right. Trace coverage, content capture, scoring on sampled traffic, tool
  outcomes and token accounting are each held against a threshold.
lede: >-
  AI observability assurance is the continuing proof that a loss of answer
  quality, safety or cost control in an AI system would be detected from its
  own telemetry, and traced to the model, prompt or tool that caused it. Traces
  and token counts do not provide that proof on their own, because an answer
  can be fast, well formed and wrong. The evidence is a scored sample of
  production traffic, tied to the configuration that produced it, and a
  detection that was recently exercised.
ogQuestion: Would you know if the answers got worse this week?
kind: child
cluster: ai
secondary:
  - reliability
parent: ai-assurance
state: assured
audience:
  - VP Platform
  - Head of AI
  - Head of SRE
intent: >-
  Commercial: proving AI telemetry is complete enough to detect quality, safety
  and cost loss
related:
  assurance:
    - production-observability-assurance
    - llm-evaluation-assurance
    - ai-cost-assurance
  useCases:
    - rag-quality-degradation
    - ai-cost-spike
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vllm-production-assurance
  industries:
    - saas-production-reliability
  insights:
    - continuous-assurance-vs-monitoring
    - why-ai-evaluation-fails-after-launch
evidence:
  - name: Trace coverage record
    detail: >-
      For each AI path the business has named, the model calls, retrieval
      steps, tool calls and guardrail decisions on it, the span expected for
      each, and the share of production requests for which every span arrived.
  - name: Configuration attributes on traces
    detail: >-
      The requested model, the responding model, the prompt version and the
      agent version recorded on each trace, so that a score can be tied to the
      configuration that produced it.
  - name: Content capture decision
    detail: >-
      What prompt and response content is captured, for what share of traffic,
      with what redaction and retention, and who approved it.
  - name: Scored production samples
    detail: >-
      Quality and safety scores attached to sampled production traces by the
      scorer definitions used before release, with the sampling rule and the
      windows in which scoring did not run.
  - name: Tool call outcome record
    detail: >-
      For each tool, the calls made, the errors returned, the arguments that
      failed schema validation, and the model and tool calls made per agent
      invocation.
  - name: Token accounting by type
    detail: >-
      Input, output, cache read, cache write and reasoning tokens per request,
      attributed to a feature, and reconciled with the provider's usage
      record.
  - name: Telemetry schema register
    detail: >-
      The semantic convention version each service emits, and the dashboards,
      alerts and scorers that depend on each attribute and metric name.
thresholds:
  - signal: Production requests with a complete trace
    basis: The AI paths the business has named as carrying revenue, obligation or customer exposure
    lostWhen: A model, retrieval or tool step on a named path emits no span, or the complete share falls below the agreed floor
  - signal: Sampled production traffic carrying a quality score
    basis: The smallest change in answer quality the business needs to see, and how soon
    lostWhen: The scored sample is too small to show a change of the agreed size inside the agreed window, or scoring has stopped
  - signal: Time from seeded quality loss to detection
    basis: How long the business process can run on worse answers before the consequence is unacceptable
    lostWhen: A seeded degradation is not flagged to an owner within the agreed time
  - signal: Traces attributable to a configuration
    basis: Evaluation evidence applies to one model version, one prompt and one tool set
    lostWhen: A production trace cannot be tied to the model that answered and the prompt and agent version in force
  - signal: Tool calls with a recorded outcome
    basis: The consequence of the actions the tools perform
    lostWhen: A failed or invalid tool call cannot be told apart from a successful one in telemetry
  - signal: Metered tokens against billed tokens
    basis: The budget approved for the outcome and the tolerance finance will accept
    lostWhen: The two differ by more than the agreed tolerance, or cache and reasoning tokens are not recorded separately
faqs:
  - q: Every model call is already traced. Is that not AI observability?
    a: >-
      It is the first part. A trace records that a call happened, how long it
      took and how many tokens it used. It does not record whether the answer
      was right. Under the OpenTelemetry GenAI conventions, prompt and
      response content is opt-in, so a default trace holds nothing that can
      be scored. Assurance asks whether a drop in quality would be detected,
      which needs captured content, scoring on sampled traffic and a
      threshold that has been exercised.
  - q: How much production traffic has to be scored?
    a: >-
      There is no fixed share. The basis is the size of change the business
      needs to see and how quickly. A low-volume category with a high
      consequence may need every request scored, while a common low-risk
      category needs far less. Scoring has a cost of its own, so the sample is
      a decision recorded with its owner.
  - q: Does capturing prompts and responses create a privacy exposure?
    a: >-
      It creates a decision that has to be made deliberately: what is
      captured, for which traffic, with what redaction, for how long and
      readable by whom. Assurance records that decision and tests that enough
      content remains to score. Where no content is captured, quality cannot
      be measured from production, and the state for quality is reported as
      Unassured.
  - q: How is this different from LLM evaluation assurance?
    a: >-
      LLM evaluation assurance covers the instrument: the test set, the
      graders and the calibration of any automated judge. AI observability
      assurance covers the supply of production data to that instrument:
      whether traces are complete, carry content and configuration, and are
      being scored. A valid scorer with nothing to score detects nothing.
sources:
  - title: 'OpenTelemetry GenAI semantic conventions: overview'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md'
  - title: 'OpenTelemetry: semantic conventions for generative AI'
    url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/'
  - title: 'OpenTelemetry GenAI semantic conventions: spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md'
  - title: 'OpenTelemetry GenAI semantic conventions: agent spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md'
  - title: 'OpenTelemetry GenAI semantic conventions: metrics'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md'
  - title: 'OpenTelemetry GenAI semantic conventions: token metrics'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-token-metrics.md'
  - title: 'Anthropic: a postmortem of three recent issues'
    url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'
  - title: 'OpenAI: reasoning guide'
    url: 'https://developers.openai.com/api/docs/guides/reasoning'
  - title: 'Microsoft Learn: Foundry Models retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Microsoft Learn: observability in Microsoft Foundry'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/observability'
  - title: 'Databricks: evaluate and monitor with MLflow 3'
    url: 'https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/'
  - title: 'Amazon Bedrock: service tiers'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html'
  - title: 'vLLM: production metrics'
    url: 'https://docs.vllm.ai/en/latest/usage/metrics/'
  - title: 'vLLM: tool calling'
    url: 'https://docs.vllm.ai/en/latest/features/tool_calling/'
  - title: 'vLLM on PyPI'
    url: 'https://pypi.org/project/vllm/'
  - title: 'ClickHouse: acquisition of Langfuse'
    url: 'https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability'
  - title: 'Arize Phoenix on PyPI'
    url: 'https://pypi.org/project/arize-phoenix/'
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

An AI system can return an answer that is fast, well formed, inexpensive and wrong. The request succeeds, latency is normal and the token count is unremarkable. The telemetry that detects an outage has nothing to report. AI telemetry therefore has to carry more than general telemetry does, and each addition is something that can be missing.

**The default trace carries no content.** Under the OpenTelemetry GenAI semantic conventions, input messages, output messages and system instructions are opt-in. A service instrumented with defaults produces spans, durations and token counts. None of those can be scored for correctness.

**Scoring stops while tracing continues.** A quality score reaches a trace because a scorer ran on a sample of traffic. The scorer has a schedule, a cost and often a judge model of its own. When it fails, or the sample is cut to save money, traces keep arriving and the dashboards stay populated.

**The conventions are still moving.** The GenAI conventions carry Development status, not Stable. In release v1.42.0 of the core semantic conventions, published on 12 June 2026, the gen_ai attributes, metrics, events and spans were deprecated there and moved to a dedicated repository. A dashboard or alert built on an attribute name can match nothing after an instrumentation upgrade.

**The model changes underneath.** On Microsoft Foundry, Standard deployments are upgraded automatically when a model retires. If the trace does not record which model answered, a change in quality cannot be separated from a change in traffic.

**Self-hosted metrics are removed on a schedule.** vLLM documents that a deprecated metric is hidden one minor version later and removed in the version after. With a release roughly every two weeks, an alert can lose its metric within a month of the notice.

## What is at stake

The period of exposure to worse answers is the time taken to detect them. Where production is not scored, detection comes from customers, and it arrives as complaints that have to be assembled into a pattern before anyone acts.

Providers have the same difficulty. Anthropic's postmortem of three infrastructure bugs that degraded output between August and September 2025 records that its evaluations did not capture the degradation users were reporting. Its fix included running evaluations continuously on production systems.

Cost loss is as quiet as quality loss. OpenAI documents that reasoning tokens are not visible through the API, occupy context and are billed as output tokens. Telemetry that records only the visible response understates the most expensive part of the request.

Other assurance positions draw on the same telemetry. Production evaluation samples, cost per outcome and the record of agent actions are all computed from it. When it is incomplete, each of them is computed on partial data and continues to report a result.

## What Xyvionix assures

Xyvionix holds six statements about the telemetry of each AI system as current facts, tested against thresholds agreed with the business.

1. **Every step on a named path emits a span.** Model calls, retrieval steps, tool calls and guardrail decisions are each visible, and a request with a missing step is counted as incomplete.
2. **Every trace names what produced it.** The conventions define the requested and responding model as separate attributes and provide an agent version attribute. With the prompt version, these join a trace to the configuration that was evaluated.
3. **Content capture is a decision, and it is sufficient.** What is captured, redacted and retained has an owner, and enough remains to score.
4. **Production is scored.** The scorer definitions used before release run on sampled production traffic. The sample is sized to the change the business needs to see.
5. **Tool outcomes are visible.** A failed call, an argument that did not match the schema and a retry are each distinguishable from success.
6. **Tokens are counted by type.** Cache reads, cache writes and reasoning tokens are recorded separately from input and output, and the totals reconcile with the provider's usage record.

Three boundaries apply. Whether alerts fire, reach an owner and survive pipeline change is general telemetry, held under [Production Observability Assurance](/production-observability-assurance). Whether the scorers and judges are valid is held under [LLM Evaluation Assurance](/llm-evaluation-assurance). Whether the measured cost is acceptable is held under [AI Cost Assurance](/ai-cost-assurance).

## Common failure modes

- **Healthy dashboard, wrong answers.** Latency, error rate and token throughput are all in range. No panel measures whether the answers are correct.
- **Token count read as quality.** Responses become shorter after a change and the saving is welcomed. The shorter responses are refusals or truncated answers.
- **The error inside a success.** A tool returns a failure in its payload, the model works around it and the request completes. vLLM's documentation notes that without strict enforcement, tool call arguments may occasionally be malformed or violate the parameter schema. Unless validity is recorded per call, the failure has no signal.
- **The loop nobody counted.** An agent calls the same tool repeatedly before answering. The conventions define metrics for inference calls and tool calls per agent invocation. Where they are not collected, the loop first appears on the invoice.
- **A score with no version.** The production score fell on a given day. The traces do not record the responding model or the prompt version, so the cause cannot be isolated.
- **A sample that misses the category.** Uniform sampling scores the common questions well. The rare category with the highest consequence has too few scored traces to show any change.

## Corrective ownership

When a threshold is breached the state moves to At risk. Where a path has no production scoring at all, the state for quality is Unassured: the answers may be good, and nobody can show that they are. Xyvionix owns the corrective action through to completion within the access it has been granted, and works through the enterprise's change process where instrumentation or pipelines must change.

Corrections follow the gap. A step that emits nothing is given a span. Model, prompt and agent version are added to the trace where the call is made. A scorer that stopped is restored, and the windows it missed are marked unknown instead of being averaged away. A tool failure carried in a payload is surfaced as a failed span. A query broken by a renamed attribute is repointed, and the dependency is entered in the schema register.

Two decisions belong to the business. The first is how much content to capture, where privacy and measurability pull in opposite directions. The second is how much traffic to score, where cost and sensitivity do. Xyvionix sets out what each option would leave undetectable. The decision is recorded with its owner and an expiry date.

## Verified closure

Detection of quality loss is closed by seeding a loss and watching it be found.

A configuration with a known defect is run against a controlled replay of production traffic. The record shows that the production score moved, the threshold tripped, and an owner in role received it inside the agreed time. A scorer that was restored and is running has closed nothing until it has caught something.

Other corrections have their own test. For tool visibility, a tool is made to fail in a test environment, and the trace shows a failed span and the error count moves. For configuration attributes, the model behind a test deployment is changed, and the difference between requested and responding model is flagged. For token accounting, metered tokens over a window are reconciled with the provider's usage record by type.

Closure is tied to the instrumentation library, the convention version and the scorer version on which it was proven. An upgrade to any of them expires it.

## Technology and industry context

The platforms now supply the measurement and leave the judgement outside it. Microsoft Foundry observability includes continuous evaluation of sampled production traffic and bills evaluations by consumption. Databricks documents, under MLflow 3, that the scorers used in development run on sampled production traffic. Both attach scores to traces. Neither sets the threshold, names the owner or tests whether a loss would be caught.

What the platform served can differ from what was requested. Amazon Bedrock reports the service tier that handled each request, which may not be the tier asked for. Latency and cost telemetry built on the requested tier describes a request that did not happen.

Self-hosted inference exposes more and moves faster. vLLM publishes time to first token, queue time and cache usage as Prometheus metrics, and retires deprecated metrics on the schedule described above.

The tooling changes hands. ClickHouse announced its acquisition of Langfuse in January 2026, and Langfuse remains MIT-licensed. Arize Phoenix is published under the Elastic License 2.0, which is not an OSI open-source licence. Scored traces are evidence, and they are held in a form that survives a change of tool.

For software companies serving many tenants, an aggregate score can hold while one customer's answers degrade, because that customer's documents or prompts differ. The score is therefore kept per tenant where the business needs to see one. That setting is covered in [SaaS Production Reliability](/saas-production-reliability), and the most common first case in [RAG Quality Degradation](/rag-quality-degradation).
