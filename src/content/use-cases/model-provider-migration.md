---
title: Model Provider Migration
h1: Moving a workload to another model or provider without losing the proof
seoTitle: 'Model Provider Migration: Re-Prove the Workload | Xyvionix'
description: >-
  What has to be re-proven when a production AI workload moves to a different
  model or provider: behaviour, requests, safety boundary, data position and
  cost.
summary: >-
  Evidence about a workload describes the model being left. On the target it
  is Unassured until behaviour, request compatibility, safety boundary, data
  position and cost have been proven there, with a reversal that still works.
lede: >-
  A workload that moves to a different model or provider is Unassured on the
  target until it has been proven there. The evaluation results, safety
  review, cost model and data commitments were all established on the source
  model through the source platform, and none of them travels. Five proofs are
  taken on the target with the production prompt and tools, the cutover is
  staged, and the reversal is tested while the source model can still be
  called.
ogQuestion: Which of the evidence travels with the workload?
cluster: ai
secondary:
  - change
  - value
parent: use-cases
state: unassured
audience:
  - Head of AI
  - CTO
  - FinOps Leadership
intent: >-
  Problem: moving a production workload to a different model or provider, by
  choice or by retirement
related:
  assurance:
    - model-change-assurance
    - llm-evaluation-assurance
    - ai-cost-assurance
    - rollback-readiness-assurance
  useCases:
    - ai-cost-spike
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
    - vllm-production-assurance
  industries:
    - insurance-claims-ai-assurance
  insights:
    - model-retirement-is-a-production-change
evidence:
  - name: Side-by-side verdict on the enterprise's own suite
    detail: >-
      Results for the source and the target on the same test set, with the
      production prompt, tools and retrieval, run several times, with the
      definition of equivalence agreed for each outcome.
  - name: Request compatibility results
    detail: >-
      Production request types replayed against the target, showing that
      parameters are accepted, structured output parses downstream and tool
      calls are valid against their schemas.
  - name: Safety boundary re-test
    detail: >-
      The guardrail configuration in force on the target platform and the
      results of testing content filters, refusal behaviour and handling of
      hostile input on the target model.
  - name: Data position comparison
    detail: >-
      Processing location, retention and eligibility for zero data retention
      on the source and the target, for each feature the workload uses, set
      against the commitments the enterprise has made.
  - name: Measured cost and latency envelope
    detail: >-
      Tokens per task, cache behaviour, reasoning tokens and latency at
      production concurrency, measured on the target and not estimated from
      its price sheet.
  - name: Portable asset inventory
    detail: >-
      Prompts, test sets, graders and tuned models that are held in the source
      provider's console, with the export status of each.
  - name: Cutover and reversal record
    detail: >-
      The share of traffic at each stage, the criteria for advancing, the
      dated reversal test and the last date on which the source model can
      still be called.
thresholds:
  - signal: Required outcomes on the target against the source
    basis: The error rate the business process can absorb, applied to each outcome the business has marked as required
    lostWhen: The target is below the agreed floor on any required outcome, or the verdict was taken with a prompt or tool set other than the production one
  - signal: Production request types accepted by the target
    basis: Every request type present in production traffic has to be served
    lostWhen: Any request type is rejected, or returns output the downstream system cannot read
  - signal: Data processing location and retention on the target
    basis: The commitments the enterprise has made to customers and supervisors about where data is processed and how long it is held
    lostWhen: The target's position differs from a commitment and no decision by its owner is recorded
  - signal: Cost per successful outcome on staged traffic
    basis: The value of the outcome and the budget approved for it
    lostWhen: The cost measured on the target exceeds the agreed ceiling
  - signal: Latency at production concurrency
    basis: The response time the user journey tolerates
    lostWhen: Latency on the target at the upper end of the distribution exceeds the agreed bound
  - signal: Reversal window
    basis: The date on which the source model stops being callable on the platform in use
    lostWhen: Full cutover is planned after that date, or the reversal has not been tested on the staged configuration
faqs:
  - q: The new model scores higher on public benchmarks. Is that evidence?
    a: >-
      It is evidence about the benchmark. The workload is a particular prompt,
      tool set, corpus and mix of questions, and a result on other tasks does
      not describe it. The proof that counts is the enterprise's own suite, run
      on the target with the production configuration, several times.
  - q: The model is the same and only the cloud is changing. Is that a migration?
    a: >-
      Yes. The platform sets the lifecycle dates, the caching rules, the
      guardrails and the data terms. Claude Sonnet 4 was retired on the Claude
      API on 15 June 2026 and has an end-of-life date of 14 October 2026 on
      Amazon Bedrock. The weights may match while everything around them
      differs, so each position is re-proven.
  - q: Can the production prompt be reused unchanged?
    a: >-
      It can be tried unchanged, and the result is measured. A prompt is tuned
      against one model's reading of it. Where the target falls short, the
      prompt, the tool definitions and the output handling are adjusted and the
      suite is run again. The verdict is recorded against the prompt version
      that will serve production.
sources:
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'Amazon Bedrock: model lifecycle for models launched before 7 September 2026'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html'
  - title: 'OpenAI: changelog'
    url: 'https://developers.openai.com/api/docs/changelog'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
  - title: 'OpenAI: your data'
    url: 'https://developers.openai.com/api/docs/guides/your-data'
  - title: 'OpenAI: prompt caching'
    url: 'https://developers.openai.com/api/docs/guides/prompt-caching'
  - title: 'Anthropic: data residency'
    url: 'https://platform.claude.com/docs/en/manage-claude/data-residency'
  - title: 'Anthropic: API and data retention'
    url: 'https://platform.claude.com/docs/en/manage-claude/api-and-data-retention'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'Amazon Bedrock: prompt caching'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html'
  - title: 'Amazon Bedrock: Guardrails'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html'
  - title: 'Microsoft Learn: guardrails and controls in Microsoft Foundry'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview'
  - title: 'vLLM: tool calling'
    url: 'https://docs.vllm.ai/en/latest/features/tool_calling/'
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

A production workload is moving to a different model. Sometimes the enterprise chooses the move, for a lower price, a better result or a commercial change of provider. Sometimes the provider chooses it by publishing a retirement date. In both cases the evidence held about the workload describes the model being left.

On the target the workload is Unassured from the first request it serves. The evaluation results, the safety review, the cost model and the latency measurements were taken on the source model through the source platform. None has been shown to hold anywhere else.

A change of provider moves more than the model. Guardrails, caching rules, data handling terms and lifecycle policy belong to the platform and change with it. For the same reason, moving an unchanged model to a different cloud is still a migration.

## The business outcome at risk

The outcome is continuity: the process keeps producing results the business accepted, at a cost it approved, under the commitments it has made about data. Migration puts each of the three at risk in a different way.

Behaviour changes quietly. The target gives a fluent answer to the same question, and the answer differs in a detail that a side-by-side reading of a few examples does not reveal. Structured output gains a field, and a downstream parser fails on a share of requests.

Commitments are inherited from the platform. The enterprise has told customers where their data is processed and how long it is held. Those statements were true of the source.

Time runs in one direction. A migration forced by retirement has a date after which the source can no longer be called, and after that date there is nothing to go back to.

## What must be proven

Five proofs are taken on the target, with the production prompt, tools and retrieval, before it carries full traffic.

1. **Behaviour is equivalent where it has to be.** The source and the target are run on the enterprise's own suite, several times each. Equivalence is defined per outcome by the business. It does not mean identical wording.
2. **Requests and tool schemas port.** Production request types are replayed. OpenAI's GPT-6 Astra accepts no custom temperature or top_p. On self-hosted vLLM, tool calling depends on a chat template and a parser matched to the model, and the documentation notes that without strict enforcement the arguments may occasionally be malformed or violate the parameter schema.
3. **The safety boundary holds.** Guardrails are platform configuration. On Microsoft Foundry an agent's guardrail fully overrides the guardrail of its model. On Amazon Bedrock Guardrails, reasoning content blocks are excluded from evaluation. Content filters, refusal behaviour and the handling of hostile input are tested again on the target.
4. **The data position matches the commitments.** Location and retention are read from the target platform's documentation for the features the workload uses.
5. **Cost and latency are measured.** Caching rules differ by provider. Anthropic offers cache lifetimes of five minutes or one hour. OpenAI applies a lifetime of 30 minutes and a write surcharge on GPT-5.6 and later models. Amazon Bedrock describes implicit caching as best effort. A prompt arranged for one provider's cache can miss on another's.

The data position differs even between two direct APIs. The table shows vendor documentation as read on 27 September 2026.

| Position | Claude API | OpenAI API |
|---|---|---|
| Inference location | Global by default, or US only at 1.1 times the price | Regional inference processing in the US and EU only |
| Retention | Zero data retention by arrangement. Claude Fable models require 30-day retention | Abuse monitoring logs kept up to 30 days. Endpoints that store application state are not eligible for zero data retention |

The events that force a migration are covered by [Model Change Assurance](/model-change-assurance). The validity of the suite is covered by [LLM Evaluation Assurance](/llm-evaluation-assurance).

## What causes assurance to be lost

- **Assets left in a console.** OpenAI's hosted Evals product becomes read-only on 31 October 2026 and shuts down on 30 November 2026, the same day as its reusable prompt objects. Test sets and prompts held only there do not move with the workload.
- **A comparison on a demonstration set.** A handful of chosen questions show the target doing well. The production mix was never run.
- **The prompt carried over unmeasured.** It is assumed to work because it is written in plain language.
- **A fallback that still points at the source.** The primary route is migrated. The route used when the primary fails leads to a model that is about to retire, or to one that was never evaluated.
- **A single cutover.** All traffic moves on one date, so the first production evidence arrives at full exposure.
- **A reversal window that closes unnoticed.** The plan assumes a return to the source is possible. The retirement date on the platform in use has already passed.

## Corrective action

The correction for an Unassured target is to produce the evidence in stages, so that exposure grows only as proof does. Under assurance, Xyvionix owns that work through to completion within the access it has been granted, and takes each production change through the enterprise's own change process.

The cutover has three stages. In the first, the target receives a copy of production requests and its output is scored and not served. In the second, it serves a small share of traffic. In the third, it serves all of it. The criteria for advancing are agreed before the first stage begins, and the fallback route is evaluated on the same suite as the primary.

Where the target fails a required outcome, the prompt, the tool definitions and the output handling are adjusted and the suite is run again. If it still fails, the choice belongs to the business: a different target, a lower floor or withdrawal of the feature. The decision is recorded with its owner and an expiry date. If a retirement date arrives first, the workload is reported as Unassured. It is not described as migrated.

## What verified closure looks like

A migration is closed when the outcome has been shown to hold on the model that now serves production.

Six conditions are true together. The target holds a passing verdict on the current suite with the production prompt. Every production request type is accepted and its output is read correctly downstream. The safety tests pass on the target platform's own guardrail configuration. The data position has been compared with each commitment, and any difference carries a recorded decision. Cost per successful outcome and latency, measured on production traffic, are inside their bounds. The reversal was tested while the source could still be called, and the source identifier has since been removed from live configuration, routing and recovery paths.

The verdict is stored with the model, platform, prompt version and tool schema it was taken on. The cost position then continues under [AI Cost Assurance](/ai-cost-assurance), and the reversal path under [Rollback Readiness Assurance](/rollback-readiness-assurance).

## What to do next

The first step is an inventory of everything the enterprise holds that names or depends on the current model or provider. It includes evaluation results, prompts, guardrail settings, fallback routes, the cost model and any statement in a customer contract about where data is processed.

The team marks each item in one of three ways: it travels unchanged, it has to be proven again, or it has to be exported before access ends. The team then reads the retirement date of the source model from the platform the workload calls, not from the model vendor's own page. That date is the end of the reversal window, and the plan is worked back from it.
