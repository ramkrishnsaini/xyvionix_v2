---
title: Model Change Assurance
h1: Re-prove the outcome when the model, provider or route changes
seoTitle: 'Model Change Assurance: Retirement and Routing | Xyvionix'
description: >-
  Continuous assurance for model retirement, alias upgrades, provider
  migration and routing: every change re-proven before it carries production
  traffic.
summary: >-
  Model retirement, alias movement, provider migration and routing are
  production changes on a provider's calendar. Each is tracked per platform,
  given a tested successor and re-proven for quality, compatibility and cost.
lede: >-
  Model change assurance is the continuing proof that an AI system still meets
  its outcome after the model behind it has changed, whether through
  retirement, an alias moving, a provider migration or a routing decision. The
  change date is usually set by the provider. The proof is a regression
  verdict on the replacement, taken on the enterprise's own test suite, before
  the replacement carries production traffic.
ogQuestion: 'When the model changes, is the outcome re-proven?'
kind: child
cluster: ai
secondary:
  - change
parent: ai-assurance
state: assured
audience:
  - Head of AI
  - CTO
  - Technology Risk
intent: >-
  Commercial: re-proving AI outcomes on model version, provider or routing
  change
related:
  assurance:
    - llm-evaluation-assurance
    - ai-cost-assurance
    - release-assurance
  useCases:
    - model-provider-migration
    - rag-quality-degradation
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
    - vllm-production-assurance
  industries:
    - insurance-claims-ai-assurance
  insights:
    - model-retirement-is-a-production-change
    - why-ai-evaluation-fails-after-launch
evidence:
  - name: Model register by platform
    detail: >-
      Every model identifier in production use, keyed by model and by the
      platform it is called through, with lifecycle state and retirement date
      read from the provider's lifecycle API or documentation and refreshed.
  - name: Pinning and upgrade settings
    detail: >-
      For each production path, whether it calls a fixed version or an alias,
      and the automatic upgrade setting of the deployment where the platform
      has one.
  - name: Requested and responding model record
    detail: >-
      The model each request asked for and the model that answered, taken from
      telemetry, so that an alias or router moving is a detected event.
  - name: Successor evaluation results
    detail: >-
      The regression verdict for each named replacement model, taken on the
      enterprise's own test suite with the production prompt, tools and
      retrieval.
  - name: Route and fallback inventory
    detail: >-
      Every model that routing or fallback policy can send production traffic
      to, with the evaluation result held for each.
  - name: Compatibility and cost comparison
    detail: >-
      Request parameters, structured output, token count for the same input
      and cost per successful outcome, compared between the current model and
      its replacement.
thresholds:
  - signal: Models with a retirement date and no tested successor
    basis: The provider's committed notice period compared with the enterprise's own change lead time
    lostWhen: The time remaining is shorter than the time needed to evaluate, approve and release a replacement
  - signal: Production paths that resolve through an alias or automatic upgrade
    basis: Whether the business accepts a change date chosen by the provider
    lostWhen: A production path can change model without a detection control and a re-evaluation trigger
  - signal: Responding model differs from the evaluated model
    basis: Evaluation evidence applies to one model version on one platform
    lostWhen: Production traffic is answered by a model for which no current regression verdict is held
  - signal: Regression verdict on the replacement model
    basis: The error rate the business process can absorb, applied to the replacement as it was to the original
    lostWhen: The replacement is below the agreed floor on any outcome the business has marked as required
  - signal: Routes and fallbacks without evaluation evidence
    basis: A fallback carries production traffic at the moment the primary is least available
    lostWhen: Any model reachable by routing policy has no current verdict on the enterprise's suite
  - signal: Cost per successful outcome after the change
    basis: The value of the outcome and the budget approved for it
    lostWhen: The unit cost on the replacement exceeds the agreed ceiling
faqs:
  - q: We pin model versions. Is that not enough?
    a: >-
      Pinning fixes the change date. It does not remove the change, because
      the pinned version still retires, and it does not freeze behaviour.
      Anthropic documents that serving infrastructure can change under a
      fixed model identifier and cause minor differences in behaviour.
      Pinning is a precondition for model change assurance, not a substitute
      for it.
  - q: How much notice will a provider give before a model is retired?
    a: >-
      It depends on the provider, the platform and the class of model.
      Published commitments at September 2026 range from as little as two
      weeks for OpenAI preview models, through 45 days for some Amazon Bedrock
      models and 60 days for Anthropic, to six months for generally available
      OpenAI models. The figure that matters is the shortest one that applies
      to a model in production.
  - q: Does a fallback model need the same evidence as the primary?
    a: >-
      Yes. A fallback is a second model in production. It serves real users
      at the moment the primary is unavailable, which is often a moment of
      high load. If it has not been evaluated on the same suite, the system is
      Unassured for every request it answers.
sources:
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'Anthropic: model IDs and versions'
    url: 'https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
  - title: 'OpenAI: changelog'
    url: 'https://developers.openai.com/api/docs/changelog'
  - title: 'Google: Gemini API models'
    url: 'https://ai.google.dev/gemini-api/docs/models'
  - title: 'Microsoft Learn: Foundry Models retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Microsoft Learn: Foundry Models retirement schedule'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule'
  - title: 'Amazon Bedrock: model lifecycle'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html'
  - title: 'Amazon Bedrock: model lifecycle for models launched before 7 September 2026'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html'
  - title: 'Google Cloud: Gemini Enterprise Agent Platform model versions'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions'
  - title: 'Hugging Face: Inference Providers'
    url: 'https://huggingface.co/docs/inference-providers/index'
  - title: 'OpenTelemetry GenAI semantic conventions: spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md'
  - title: 'Colorado SB26-189'
    url: 'https://leg.colorado.gov/bills/sb26-189'
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

Most production change is scheduled by the enterprise. Model change is scheduled by the provider, announced on the provider's documentation pages and applied whether or not the enterprise has finished testing.

**Retirement arrives with a fixed notice period.** The committed windows differ by provider and by class of model.

| Provider and channel | Published commitment at September 2026 | At retirement |
|---|---|---|
| Anthropic, Claude API | At least 60 days' notice | Requests to the model fail |
| OpenAI API | At least 6 months for generally available models, 3 months for specialised variants, as little as 2 weeks for preview models | The model is shut down |
| Microsoft Foundry | At least 60 days' notice for generally available models, 30 days for preview | Standard deployments are upgraded automatically, provisioned deployments are not, and retired models return 410 Gone |
| Amazon Bedrock, models launched from 7 September 2026 | A Legacy period of 6 months or 45 days, stated per model | Migration is never automatic |

**The same model has several end dates.** Anthropic's dates apply to its own platforms. Amazon Bedrock and Google Cloud set their own. Claude Opus 4.1 was retired on the Claude API on 5 August 2026 and has an end-of-life date of 8 January 2027 on Amazon Bedrock.

**An alias turns a dated change into an undated one.** On the Gemini API, names ending in "latest" are updated automatically, with two weeks' email notice of a breaking change. On Microsoft Foundry, a Standard deployment is upgraded at retirement unless its upgrade option says otherwise. Microsoft's schedule shows gpt-4o version 2024-05-13 retiring on 9 December 2026 and upgrading automatically to gpt-5.6-sol, a model from a different family.

**A pinned version still moves.** Anthropic documents that the weights behind a model identifier do not change, while the serving infrastructure around them can, with minor differences in behaviour as a result. On 25 September 2026 OpenAI fixed an image encoding bug in two GPT-6 models and recommended that customers re-run their evaluations.

**Routing adds models nobody approved.** A gateway fallback or a cost-based router puts a second model in the production path. Hugging Face Inference Providers selects the fastest available provider by default, so the company serving a given model can differ from one request to the next.

## What is at stake

Model change produces two opposite failures, and an estate usually carries both.

The first is a hard stop. Where nothing upgrades automatically, an unmigrated workload fails on the retirement date. The AI feature is unavailable, and the recovery is a rushed migration to a model that has not been tested.

The second is a silent change. Where the platform upgrades on the enterprise's behalf, the workload keeps running on a different model. No change record exists, no test ran, and the first evidence is a complaint.

Both are made worse by compressed time. Microsoft names the replacement model only 90 to 120 days before retirement. A preview model in production can carry a horizon of two weeks. An enterprise whose change cycle is longer than the notice period cannot complete a migration inside it, however early it starts reading the announcements.

## What Xyvionix assures

Xyvionix holds six statements about the models behind each AI system as current facts, tested against thresholds agreed with the business.

1. **Every model in use is known, per platform.** The register is keyed by model and platform. Microsoft Foundry and Amazon Bedrock both expose lifecycle state through an API, so dates are re-read from the source.
2. **Every retirement date has a tested successor ahead of it.** The replacement is evaluated while the time remaining is still longer than the enterprise's change lead time.
3. **The model that answers is the model that was evaluated.** Where an alias or automatic upgrade remains, the requested and responding models are compared in telemetry. The OpenTelemetry GenAI conventions record them as separate attributes, which makes a moved alias a detectable event.
4. **The replacement meets the floor the original met.** The verdict is taken on the enterprise's own regression suite with the production prompt, tools and retrieval.
5. **Every reachable route is evaluated.** Each model that routing or fallback policy can reach holds a current verdict on the same suite.
6. **The outcome still costs what the business approved.** Cost per successful outcome is recomputed on the replacement from measured token counts.

How the suite is built and graded is covered by [LLM Evaluation Assurance](/llm-evaluation-assurance). This page covers the events that oblige it to be run again.

## Common failure modes

- **Lifecycle state read wrongly.** In the Microsoft Foundry Models API, "Deprecating" means the documented Deprecated stage and "Deprecated" means Retired. A check that takes the API term at face value reports a retired model as one stage healthier than it is.
- **The dormant path.** On Amazon Bedrock, access to a Legacy model may lapse after 15 days of inactivity. A recovery route or seasonal workload can lose its model before the published end date.
- **The request that no longer parses.** On Claude Opus 4.7 and later, setting temperature, top_p or top_k to a non-default value returns a 400 error. A test that scores quality on the requests that succeed does not count the ones that fail.
- **Same price, larger bill.** Claude models from Opus 4.7 use a tokenizer that produces about 30% more tokens for the same text. The price per token is unchanged. The cost of the outcome is not.
- **A tuned model with no path forward.** Under OpenAI's wind-down of self-serve fine-tuning, existing customers cannot create new jobs from 6 January 2027. A tuned model runs until its base model is deprecated and cannot then be rebuilt on the successor.

## Corrective ownership

Two conditions start corrective action, and they are handled differently.

The first is a breach with time still on the clock: a retirement date with no tested successor, or an alias in a production path. The state moves to At risk. Xyvionix owns the correction through to completion within the access it has been granted, and takes any production change through the enterprise's own change process. Candidate replacements are run against the regression suite. Where a candidate falls short, the prompt, tool definitions and output handling are adjusted and the suite is run again. An alias is replaced with a fixed version.

The second is a change that has already happened: telemetry shows a responding model for which no verdict is held. The state for that path is Unassured, because nothing is known about the outcome. The suite is run against the responding model before any decision to stay, pin back or move on.

If no candidate meets the floor inside the notice period, the choice belongs to the business: a lower floor, a different provider or withdrawal of the feature. The decision is recorded with its owner and an expiry date.

## Verified closure

A model change is closed when re-testing shows the outcome holds on the model now serving production.

For a migration, five things are true together. The replacement holds a passing verdict on the current suite. Requests carrying the production parameters are accepted. Telemetry shows the responding model is the evaluated model on every path, including fallback. Cost per successful outcome, measured on production traffic, is inside its ceiling. The retired identifier is absent from live configuration, routing policy and recovery paths.

For a pinning correction, the upgrade setting is read back from the live deployment and the requested and responding models match over the measurement window.

The verdict is stored with what it was taken on: model version, platform, prompt version, tool schema, retrieval index and suite version. When any of those changes, the evidence expires and the record reopens.

## Technology and industry context

The control that matters most differs by platform, because the platforms fail in different directions.

On Microsoft Foundry one estate can hold both failures. Standard deployments change model at retirement, so they need detection. Provisioned deployments stop, so they need a deadline. The detail is in [Azure AI Assurance](/azure-ai-assurance).

On Amazon Bedrock nothing upgrades itself, and the notice period is now a property of each model. The register holds the rule per model, not one rule for the platform. See [Amazon Bedrock Assurance](/aws-bedrock-assurance).

On Google Cloud's Gemini Enterprise Agent Platform (formerly Vertex AI), short-term availability models carry at least 45 days' notice of retirement. The replacement can sit in a different tier: gemini-2.5-pro retires on 20 October 2026 and its listed replacement is gemini-3.5-flash. Quality, latency and cost are each re-proven.

Sector rules add a record-keeping dimension. Colorado SB26-189, with operative requirements from 1 January 2027, gives consumers the right to request meaningful human review after an adverse consequential decision and requires records to be kept for at least three years. A decision may be reviewed after the model that made it has been retired. The evidence this implies is a record of which model version produced each decision and the verdict held for that version at the time. The insurance case is developed in [Insurance Claims AI Assurance](/insurance-claims-ai-assurance).

The scenario most enterprises meet first is a planned move between providers, covered in [Model Provider Migration](/model-provider-migration).
