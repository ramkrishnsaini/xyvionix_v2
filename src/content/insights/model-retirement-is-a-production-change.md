---
title: Model retirement is a production change
h1: A model retirement date is a production change someone else scheduled
seoTitle: 'Model Retirement Is a Production Change: Plan for It | Xyvionix'
description: >-
  Providers retire models and move aliases on their own calendar. Provider
  notice periods compared, and four controls that turn each date into a planned
  change.
summary: >-
  Providers publish retirement dates and move aliases on their own calendar.
  Each is a production change with a fixed deadline. Four controls handle it:
  inventory, notice tracking, a re-evaluation gate and a staged cutover.
lede: >-
  A model retirement is a production change with a deadline the enterprise did
  not choose. Providers publish the date, commit to a notice period that ranges
  from two weeks to six months, and apply the change whether or not testing is
  complete. The enterprise that treats the date as a vendor notice discovers it
  as an incident. The one that treats it as a scheduled change holds an
  inventory, tracks notices from source, gates the successor on its own
  evaluation and cuts over while rollback is still possible.
ogQuestion: 'Which model in production retires next, and on which platform?'
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary:
  - change
parent: insights
state: degrading
audience:
  - Head of AI
  - CTO
  - VP Platform
  - Technology Risk
intent: >-
  Informational: why provider model retirement and alias movement should be
  run as scheduled production changes, with current provider lifecycle policies
related:
  assurance:
    - model-change-assurance
    - llm-evaluation-assurance
    - release-assurance
  useCases:
    - model-provider-migration
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
  industries:
    - insurance-claims-ai-assurance
  insights:
    - why-ai-evaluation-fails-after-launch
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
  - title: 'Google: Gemini API models'
    url: 'https://ai.google.dev/gemini-api/docs/models'
  - title: 'Google: Gemini API deprecations'
    url: 'https://ai.google.dev/gemini-api/docs/deprecations'
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
  - title: 'Google Cloud: Gemini Enterprise Agent Platform release notes'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes'
  - title: 'Google Cloud: Vertex AI name changes'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes'
  - title: 'OpenTelemetry GenAI semantic conventions: spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The change nobody raised

Enterprises control production change carefully. A database upgrade has a change record, a test plan, an approver, a window and a rollback. The discipline exists because a change that nobody planned cannot be tested or reversed.

A model retirement is handled differently. It arrives as an email to whoever created the API account. It is forwarded to an engineering team and becomes a ticket with no date pressure until the date is close. It does not appear on the change calendar, because the enterprise did not raise it.

The recognisable outcome has two forms. In the first, the date passes and requests start failing, and the migration is done in a day on a model nobody evaluated. In the second, the platform upgrades the deployment automatically, the feature keeps running, and the first sign of the change is a shift in output that a business user notices.

The position of this article is that a retirement date is a production change in every sense that matters. It replaces a component in the serving path. It has a date. It can fail. The only thing missing is a change record, and that is the enterprise's omission, not the provider's.

## What the providers commit to

The notice periods are published. They differ by provider, by channel and by class of model. The table states them as the providers' documentation did on 27 September 2026.

| Provider and channel | Published notice and lifecycle policy | At the date |
|---|---|---|
| Anthropic: Claude API, Claude Platform on AWS, Microsoft Foundry | At least 60 days' notice before retirement of publicly released models. States are Active, Legacy, Deprecated and Retired | Requests to a retired model fail |
| OpenAI API | At least 6 months for generally available models, at least 3 months for specialised variants, possibly as short as 2 weeks for preview models | The model is shut down |
| Gemini API | Stable names point to a fixed model. "Latest" aliases are updated automatically, with 2 weeks' email notice of breaking changes. Preview models get at least 2 weeks' notice before deprecation | An alias resolves to a different model |
| Microsoft Foundry | Generally available models retire 18 months from launch, or 12 months for Anthropic, DeepSeek, Fireworks and Mistral AI models. Notice is at least 60 days, or 30 days for preview. The replacement is named 90 to 120 days before retirement. Dates cannot be extended | Standard deployments are upgraded automatically, region by region. Provisioned deployments are not. Retired models return 410 Gone |
| Amazon Bedrock, models launched on or after 7 September 2026 | Each model card states an "EOL no sooner than" date and a Legacy period of 6 months or 45 days. Legacy models are closed to new customers, and access may lapse after 15 days of inactivity | Migration is never automatic |
| Amazon Bedrock, models launched before 7 September 2026 | At least 12 months' availability and at least 6 months in Legacy, followed by a public extended access phase at higher pricing | Migration is never automatic |
| Google Cloud Gemini Enterprise Agent Platform (formerly Vertex AI) | Standard models stay available at least 12 months after release. Short-term availability models retire with at least 45 days' notice. Dates may be extended, never moved earlier | Retirement is not an automatic upgrade |

Three things follow from the table.

**There is no single notice period to plan against.** The range runs from two weeks to six months, and on Amazon Bedrock the period is now an attribute of each model.

**The same model has a date per channel.** Anthropic's dates apply to the platforms it operates. Amazon Bedrock and Google Cloud set their own. Claude Sonnet 4 was retired on the Claude API on 15 June 2026 and has an end-of-life date of 14 October 2026 on Amazon Bedrock.

**The calendar is dense.** Anthropic retired six models on four dates between February and August 2026. At the time of writing, Microsoft's schedule shows gpt-4.1-nano retiring on 14 October 2026 and the o1, o3, o3-mini and o4-mini models on 19 November 2026. Google Cloud retires gemini-2.5-pro, gemini-2.5-flash and gemini-2.5-flash-lite on 20 October 2026. OpenAI shuts down older GPT-5 and o3 snapshots on 11 December 2026. An estate that uses three providers can expect a model change in most months.

## The arithmetic of notice

Notice only helps if it is longer than the time the enterprise needs. That time is rarely measured.

The figures in this paragraph are illustrative. Suppose the path from a named successor to a completed migration takes 20 days to evaluate, 15 to adjust prompts and output handling, 10 to approve, 14 to cut over in stages and 14 to observe. That is 73 days. Against a 60-day notice the work cannot start when the notice arrives and still finish. Against a 45-day Legacy period it is not close. Against six months it is comfortable, until the workload turns out to depend on a preview model with two weeks' notice.

The second calculation is less obvious. Rollback has an expiry date. Until retirement, a failed cutover can return to the old model. After retirement the old model returns an error, so there is nothing to return to. A cutover completed on the final day is a change with no rollback, which most change policies would refuse for any other component. The latest acceptable cutover date is therefore the retirement date minus the observation period, and the plan is built backwards from that.

## Four controls that make it a planned change

### Inventory, keyed by model and platform

The register lists every model identifier in production use with the platform it is called through, because the date belongs to the pair. It includes embedding models and rerankers, the judge models used in evaluation, fallback routes, and paths that run rarely. Rare paths matter on Amazon Bedrock, where access to a Legacy model may lapse after 15 days of inactivity: a recovery route can lose its model before the published date.

It also records how each path names its model. A fixed version has a retirement date. An alias or an automatically upgrading deployment has a change date chosen by the provider.

### Notice tracking from source

Dates are read from the provider, repeatedly. Microsoft Foundry exposes lifecycle status and deprecation dates through its Models API, and Amazon Bedrock exposes model lifecycle through its foundation model APIs, so the register can be refreshed by query and not by reading email.

Dates also move. Google's release notes record that the retirement of gemini-2.5-flash-image was extended from 2 October 2026 to 15 March 2027, in a notice dated 14 September 2026. Anthropic publishes some dates as "not sooner than", which sets an earliest date and not a final one. A register copied once is wrong within the quarter.

### A re-evaluation gate

The successor carries production traffic only after it passes the enterprise's own regression suite, with the production prompt, tools and retrieval. The provider's benchmark results describe the provider's tasks.

The gate tests more than answer quality. On Claude Opus 4.7 and later, setting temperature, top_p or top_k to a non-default value returns a 400 error, so a request that worked on the old model can be rejected by the new one. Models from Opus 4.7 onwards also use a tokenizer that produces about 30% more tokens for the same text, which raises cost at an unchanged list price. Requests accepted, outputs parsed, quality held and cost per outcome within budget are four separate verdicts.

### A staged cutover

Traffic moves in steps, with the old model still available behind it. Telemetry confirms which model answered: the OpenTelemetry GenAI conventions record the requested model and the responding model as separate attributes, so each stage can be verified from traces. The observation period ends before the retirement date. The retired identifier is then removed from configuration, routing policy and recovery paths, so that nothing calls it after it is gone.

## The decisions that have no free option

**Automatic upgrade on or off.** On Microsoft Foundry the upgrade option of a Standard deployment decides the failure mode. Left on, the workload changes model at retirement and keeps running, which protects availability and gives up control of the date. Set to no automatic upgrade, the deployment stops at retirement, which protects control and risks an outage. Neither setting removes the need to migrate. The choice is which failure the business would prefer if the migration is late.

**Pin or alias.** A fixed version gives a known date and evidence that stays valid until then. An alias gives currency and a change date chosen by the provider. For a workload that holds evidence against a threshold, the fixed version is the defensible default, with detection on any path where an alias remains.

**Migrate early or late.** Moving at the first opportunity spreads the work and means more migrations over the life of the system. Waiting reduces their number and compresses each one. On older Amazon Bedrock models, waiting also has a price: the extended access phase that follows Legacy carries higher pricing.

**One successor or two.** Evaluating a second candidate from a different provider costs more evaluation effort. It also means that a failed verdict on the first candidate does not consume the notice period. The broader case is set out in [Model Provider Migration](/model-provider-migration).

## What this means for assurance

Evaluation evidence is bound to the model it was taken on. When the model behind a production path changes, the evidence for that path expires, whether the change was a migration the enterprise ran or an upgrade the platform applied. The reasons evidence expires more generally are covered in [why AI evaluation fails after launch](/why-ai-evaluation-fails-after-launch).

The state of a model in production can therefore be read from two dates: the retirement date, and the date by which a tested successor must exist. A path whose time remaining is longer than the enterprise's measured lead time, with a successor under evaluation, is Assured. One where the margin is shrinking is Degrading. One where the time remaining is shorter than the lead time is At risk, even though nothing has failed. One where telemetry shows a responding model that was never evaluated is Unassured.

Closure is the verdict on the model now serving, together with proof that the old identifier is gone from every path. The continuing controls are described in [Model Change Assurance](/model-change-assurance), and the general discipline of proving a change before it carries traffic in [Release Assurance](/release-assurance).

The provider has already scheduled the change. The remaining decision is whether the enterprise records it as one.
