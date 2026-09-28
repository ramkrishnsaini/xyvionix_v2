---
title: Why AI models need assurance first
h1: An AI model changes on someone else's calendar. Proof has to come before reliance
seoTitle: 'Why AI Models Need Assurance Before Reliance | Xyvionix'
description: >-
  Why assurance is the precondition for relying on an AI model: what moves
  under a deployed model, what the business is exposed to, and what must be
  proven.
summary: >-
  A model is a dependency the enterprise does not control. Its behaviour is
  statistical, and its quality and cost move with no code change. Reliance
  needs proof first, and the proof has to be kept current.
lede: >-
  AI models need assurance first because the business relies on output it did
  not specify, from a dependency it does not control, at a unit cost it does
  not set. A model cannot be accepted once like conventional software. Its
  version, its prompt, the data it retrieves and its price all move after
  approval, and most of them move without a release on the enterprise side.
  Before a model is relied on, the business has to be able to show that the
  combination now running meets a threshold it set, and to keep showing it.
ogQuestion: Could you show today that the model you rely on still meets your threshold?
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary:
  - data
  - value
parent: why-assurance
state: degrading
audience:
  - CIO
  - CTO
  - Head of AI
  - CFO Office
  - Technology Risk
intent: >-
  Informational and commercial: the business case for assurance as the
  precondition for relying on a model the enterprise does not control. A model
  is a dependency with its own release and retirement calendar, its behaviour
  is statistical and not specified, and its cost and quality both move without
  a code change on the enterprise side. Covers why a model cannot be accepted
  once like conventional software; the four things that move under a deployed
  model (the model version, the prompt, the retrieved data, the price); why an
  evaluation result is evidence for one combination only; what the business is
  exposed to when it relies on a model without current proof; and what has to
  be proven before and while a model is relied on. Distinct from
  why-ai-evaluation-fails-after-launch, which is about how evaluation evidence
  expires, and from model-retirement-is-a-production-change, which is about
  one event.
related:
  assurance:
    - ai-assurance
    - model-change-assurance
    - llm-evaluation-assurance
    - ai-cost-assurance
  useCases:
    - model-provider-migration
    - production-ai-going-live
    - rag-quality-degradation
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - why-ai-evaluation-fails-after-launch
    - model-retirement-is-a-production-change
    - ai-cost-per-business-outcome
evidence:
  - name: Model and platform register
    detail: >-
      Every model the business relies on, keyed by model and by the platform
      it is served from, with the version that actually answers, its
      lifecycle state and its published retirement date, re-read from the
      provider and not from a spreadsheet.
  - name: Combination record
    detail: >-
      The model identifier, prompt version, retrieval index and embedding
      model that each evaluation result was measured on, stored with the
      result so that a difference from the running system marks it as out of
      date.
  - name: Outcome evaluation results
    detail: >-
      Dated results on cases drawn from the business process, run as repeated
      trials and scored against the threshold the owner of the process set.
  - name: Scored production samples
    detail: >-
      Samples of live output scored by the same method as the release
      evaluation, because a fault on the serving side is visible only in
      production.
  - name: Knowledge freshness and deletion record
    detail: >-
      The time since the last successful synchronisation of each knowledge
      source, and a test showing that withdrawn documents are no longer
      retrieved.
  - name: Cost per outcome record
    detail: >-
      The cost of a successful outcome, recomputed when the price sheet, the
      tokenizer, the service tier or the cache hit rate changes, and not only
      at month end.
  - name: Successor test result
    detail: >-
      A regression verdict on the replacement model for each model in use,
      produced inside the shortest notice period that applies to it.
thresholds:
  - signal: Evidence older than the last change to the combination
    basis: >-
      A result describes one combination of model version, prompt, retrieved
      data and price, so its validity is set by the change record and not by
      the calendar alone
    lostWhen: >-
      Any element of the combination has changed since the evidence was
      gathered and no re-test has been run
  - signal: Quality of output on the business's own cases
    basis: >-
      The error rate the business process can absorb before review and rework
      cost more than the model saves
    lostWhen: >-
      The rate on sampled production output falls below the agreed floor for
      consecutive windows
  - signal: Consistency across repeated trials
    basis: >-
      Whether the process depends on every answer being acceptable or
      tolerates a retry, as judged by the owner of the process
    lostWhen: >-
      The share of cases that pass on every trial falls below the agreed
      floor, whatever the single-run score shows
  - signal: Age of the knowledge the model answers from
    basis: >-
      How quickly a changed or withdrawn document becomes harmful to the
      decision the answer informs
    lostWhen: >-
      The time since the last successful synchronisation exceeds the agreed
      limit, or a withdrawn document is still retrieved
  - signal: Cost per successful outcome
    basis: >-
      The value of the outcome to the business and the margin the process
      has to hold
    lostWhen: >-
      The recomputed cost crosses the agreed ceiling after a change of price,
      tokenizer, tier or cache behaviour
  - signal: Notice remaining before retirement
    basis: >-
      The provider's published notice period set against the time the
      enterprise needs to test and approve a successor
    lostWhen: >-
      A retirement is announced and no tested successor exists within the
      time the enterprise needs to produce a verdict
faqs:
  - q: Why do AI models need assurance before adoption and not after?
    a: >-
      Because reliance begins at adoption. Once a process depends on the
      model, the business is exposed to its errors, its cost and its
      retirement date. Evidence gathered afterwards describes an exposure
      that has already been taken, and the threshold is then set by what the
      system happens to do, not by what the process needs.
  - q: Is pinning a model version enough?
    a: >-
      No. Pinning removes one source of change and leaves the rest. Anthropic
      documents that each model ID is a fixed snapshot and that the serving
      infrastructure around it can change and cause minor differences in
      behaviour. The pinned version also has a retirement date, and requests
      to a retired model fail.
  - q: Does the provider's own testing cover the enterprise?
    a: >-
      It covers the model. The enterprise relies on a combination of that
      model with its own prompt, its own data and its own cases, which the
      provider has never seen. In its postmortem of September 2025 Anthropic
      reported that the evaluations it ran did not capture the degradation
      its users were reporting.
  - q: How can the cost of a model change when usage has not?
    a: >-
      Through the price sheet, the tokenizer and the cache. A promotional
      price ends on a published date. A newer tokenizer produces more tokens
      for the same text at an unchanged list price. An edit to a prompt or a
      tool definition can remove a caching discount. None of these is a
      change in traffic.
  - q: Does putting assurance first slow down adoption of AI?
    a: >-
      It changes the order and adds work before the first release. The
      threshold is agreed before the model is chosen, and the evidence is
      gathered before the process depends on it. The scope is set by
      consequence, so a drafting aid that a person always reviews warrants
      less than a model whose output reaches a customer unreviewed.
sources:
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'Anthropic: model IDs and versions'
    url: 'https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions'
  - title: 'Anthropic: models overview'
    url: 'https://platform.claude.com/docs/en/about-claude/models/overview'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'Anthropic: prompt caching'
    url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching'
  - title: 'Anthropic: a postmortem of three recent issues'
    url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'
  - title: 'Anthropic: demystifying evals for AI agents'
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
  - title: 'OpenAI: API changelog'
    url: 'https://developers.openai.com/api/docs/changelog'
  - title: 'Google Gemini API: models'
    url: 'https://ai.google.dev/gemini-api/docs/models'
  - title: 'Google Gemini API: pricing'
    url: 'https://ai.google.dev/gemini-api/docs/pricing'
  - title: 'Google Gemini API: embeddings'
    url: 'https://ai.google.dev/gemini-api/docs/embeddings'
  - title: 'Microsoft Foundry: model retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Amazon Bedrock: model lifecycle'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html'
  - title: 'Amazon Bedrock: model lifecycle for models launched before 7 September 2026'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html'
  - title: 'Amazon Bedrock Knowledge Bases: sync a data source'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'Azure AI Search: changed and deleted blobs'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs'
  - title: 'Ragas: faithfulness metric'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/'
  - title: 'arXiv 2307.09009: study of change in GPT-4 behaviour between March and June 2023'
    url: 'https://arxiv.org/abs/2307.09009'
  - title: 'FinOps Foundation: State of FinOps 2026'
    url: 'https://data.finops.org/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-28'
lastReviewed: '2026-09-28'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why does a system built on an AI model need assurance first?

A system built on an AI model needs assurance first because reliance is the moment the business becomes exposed, and the proof that the model deserves reliance does not hold still. The model answers customers, drafts decisions, summarises records and classifies cases. People act on what it produces. From that point its errors are the business's errors, and its cost is a line in the business's margin.

Three properties separate a model from the other things an enterprise depends on.

**The enterprise does not control it.** The provider decides when a version is released, changed and retired.

**Its behaviour is statistical.** There is no specification that says what the output will be. There is only a rate at which the output has been acceptable on the cases tested.

**Quality and cost both move without a code change.** The enterprise can ship nothing for a quarter and still be running a different system at a different unit cost.

Most organisations already treat the spending side as a management problem. In the State of FinOps 2026 report, 98% of respondents said they now manage AI spend, against 31% two years earlier. The quality side rarely has the same standing. Assurance gives it one: an outcome the business depends on, a threshold the business set, and current evidence that the running system is within it.

## Why can an AI model not be accepted once, like conventional software?

A model cannot be accepted once because acceptance assumes two things that are not true of it: that behaviour is specified, and that nothing changes until the enterprise changes it.

| | Conventional software | A system built on a model |
|---|---|---|
| Behaviour | Specified. The same input gives the same output | Statistical. The same input can give different outputs |
| What acceptance proves | Conformance to the specification, until the code changes | A rate of acceptable output, on the cases tested, for the combination tested |
| Who schedules change | The enterprise, through its own release process | The provider, the team that owns the prompt, and whoever edits the source data |
| End of life | Support ends and the software keeps running | The model is retired and requests to it fail |
| Unit cost | Agreed in advance as a licence or a capacity | Billed per token, and moved by the tokenizer, the tier and the cache |

The statistical point has a practical consequence for sign-off. Anthropic's guidance on evaluation distinguishes the chance that at least one of several trials succeeds from the chance that all of them succeed. The first rises with the number of trials and the second falls. A single passing run is the most favourable reading of a system whose users will meet it many times.

The concern is older than the current generation of models. A study published in 2023 measured GPT-4 identifying prime numbers with 84% accuracy in March of that year and 51% in June, under the same model name. It is historical evidence and not a current measurement. It is the reason a model name on an approval record proves little about the model that answers today.

## What moves under a deployed model?

Four things move under a deployed model: the model version, the prompt, the retrieved data and the price. Only the prompt is fully in the enterprise's hands.

| What moves | How it moves | Who decides when | What the business sees |
|---|---|---|---|
| Model version | Aliases are repointed, deployments are upgraded at retirement, serving infrastructure is changed | The provider | Different answers to the same question |
| Prompt | Edited to fix one case, extended with a new tool or instruction | The delivery team | A fix in one place and a regression in another |
| Retrieved data | Documents are added, changed, withdrawn or re-indexed | Whoever owns the source, and the synchronisation job | Confident answers from content that is out of date |
| Price | Promotional prices end, tokenizers change, tiers and cache rules are revised | The provider | A higher cost for the same work |

**Model version.** The Gemini API documentation states that "latest" aliases are updated automatically. Microsoft Foundry upgrades Standard deployments when a model retires, region by region, unless the deployment is configured otherwise. Anthropic documents that a model ID is a fixed snapshot and that the serving infrastructure around it can change. On 25 September 2026 OpenAI fixed an image encoding bug in two GPT-6 models and recommended that customers rerun their evaluations. In each case the enterprise deployed nothing.

**Prompt.** A prompt is production logic held as text. It is often changed outside the release process, and the change that repairs one complaint is rarely tested against the cases that were passing.

**Retrieved data.** Where answers draw on enterprise documents, the knowledge base is part of the system. Microsoft's documentation for Azure AI Search states that an indexer does not track the deletion of objects in the data source, so a withdrawn document stays retrievable unless a deletion policy is in place. Amazon Bedrock Knowledge Bases require a synchronisation each time files are added, modified or removed. A quality score does not catch this on its own. The Ragas faithfulness metric measures the share of claims in a response that the retrieved context supports. It says the answer agrees with the index. It does not say the index agrees with the business. The pattern is described in [RAG quality degradation](/rag-quality-degradation).

**Price.** Google lists Gemini 3.8 Flash at a promotional price until 31 December 2026, after which the listed price doubles. Anthropic's models from Claude Opus 4.7 onward use a tokenizer that produces about 30% more tokens for the same text, at an unchanged price per token. On Anthropic's platform a change to tool definitions invalidates the whole prompt cache, and a cache read is priced at a tenth of base input or less. A small edit can therefore multiply input cost. The unit that makes these movements visible is set out in [AI cost per business outcome](/ai-cost-per-business-outcome).

## Why is an evaluation result evidence for one combination only?

An evaluation result is evidence for one combination because the output is produced by the combination and not by the model alone. The score was measured on one model version, one prompt, one state of the knowledge base and one set of cases. Replace any of them and the score describes a system that is no longer running.

This matters to the business because approval is usually recorded against the application. The committee believes it approved the claims assistant. What it approved was the claims assistant on one model version, with one prompt, over the documents as they stood that week. The record outlives every one of those.

Two details widen the gap. A fallback route to a second model, added for resilience, is a second combination in production with no evidence of its own. And the same model carries different end dates on different platforms: Anthropic's retirement dates apply to its own platforms, while Amazon Bedrock and Google Cloud set their own schedules. A result is evidence only for the combination that was measured, on the platform where it was measured.

The mechanisms by which the evidence ages are covered in [why AI evaluation fails after launch](/why-ai-evaluation-fails-after-launch). The point for the business case is narrower. An approval without a recorded combination cannot be shown to apply to the system now running.

## What is the business exposed to without current proof?

A business that relies on a model without current proof is exposed in five ways: wrong output acted on, a hard stop, a cost it did not budget, a capability it cannot rebuild, and a question it cannot answer.

**Wrong output, acted on.** Quality rarely fails loudly. The system keeps answering in the same fluent register while the share of acceptable answers falls. The cost appears downstream as rework, complaints and decisions taken on a poor summary. Where the output informs a decision about a person, as in [healthcare](/healthcare-ai-assurance), the threshold is set by the consequence of the error and not by an average score.

**A hard stop.** Anthropic states that requests to retired models fail. Microsoft Foundry returns an error for a retired model and does not extend retirement dates. Amazon Bedrock states that migration is never automatic. A process built on a model with no tested successor has an outage scheduled by a third party.

**Unbudgeted cost.** The movements in price described above arrive in the invoice, after the work has been done. A business case approved at one unit cost is running at another. For models launched before 7 September 2026, Amazon Bedrock adds that customers in the extended access phase should expect higher pricing, so staying on an old model to avoid re-testing has its own price.

**A capability that cannot be rebuilt.** OpenAI is winding down self-serve fine-tuning. Inference on a fine-tuned model continues only until its base model is deprecated. An enterprise whose advantage rests on a tuned model holds an asset with an end date set by someone else.

**A question with no answer.** After an incident, the business is asked which model produced the output, on what evidence it was relied on, and whether that evidence still applied. Even the record is exposed. OpenAI will make its hosted evaluations read-only on 31 October 2026 and shut the service down on 30 November 2026. Evidence held only in a provider's console has the provider's lifespan.

All five can arrive while the enterprise's own code is unchanged and every release check is passing.

## What has to be proven before a model is relied on?

Five things have to be proven before a model is relied on: which model is answering, that its output meets the threshold of the process, that it answers from current knowledge, that each outcome costs what the business can bear, and that a tested successor exists.

| Proof | What it tells the business | What counts as evidence | What voids it |
|---|---|---|---|
| Which model is answering | What the approval actually covers | The resolved version for each deployment, on each platform, read from the running system | An alias moved, an automatic upgrade, a new fallback route |
| Output meets the threshold | Whether the process can depend on the result | Repeated trials on cases drawn from the process, scored against a floor the process owner set | A new model version, a prompt edit, a shift in what users ask |
| Answers come from current knowledge | Whether a correct-looking answer is correct today | Time since the last successful synchronisation, and a test that withdrawn content is gone | A failed synchronisation, a change of embedding model, a late deletion policy |
| Each outcome costs what the business can bear | Whether the business case still holds | Cost per successful outcome, including retries and hidden overhead | A price change, a new tokenizer, a fall in cache hit rate |
| A tested successor exists | Whether retirement is a planned change or an outage | A regression verdict on the replacement, produced inside the notice period | A successor named late, a change of platform |

The threshold in each row belongs to the business. A provider publishes what a model can do. Only the owner of the process can say what error rate, what delay and what cost the process can absorb.

The last row is set by the provider's notice. Anthropic commits to at least 60 days before a retirement. OpenAI commits to at least six months for generally available models and as little as two weeks for preview models. Amazon Bedrock now states a Legacy period of six months or 45 days on each model card for models launched on or after 7 September 2026. An enterprise that needs a quarter to approve a replacement cannot rely on a model with a shorter window than that. The work is described in [Model Change Assurance](/model-change-assurance), and the first release in [production AI going live](/production-ai-going-live).

## Why does the proof have to be kept current while the model is relied on?

The proof has to be kept current because reliance is continuous and the combination keeps moving. A result taken last quarter is a statement about last quarter's system. What ends its validity is usually an event and not a date: a responding model that differs from the one approved, a prompt edit, a synchronisation that failed, a price sheet that changed, a retirement notice.

Several of these events can be read directly from the provider. Microsoft Foundry exposes lifecycle status and deprecation dates through its Models API, and Amazon Bedrock exposes the lifecycle of each model through its own API. A retirement date is a signal the enterprise can collect, not only an email it may miss. Other changes are larger than they look. Google's documentation states that embeddings from one model cannot be compared with embeddings from another, so a change of embedding model means re-embedding all existing data.

Providers have reached the same conclusion about their own systems. After the faults described in its postmortem of September 2025, part of Anthropic's fix was to run evaluations continuously on production systems. A test taken before release had not been enough for the organisation that built the model.

A report cannot carry this, because a report has a date and the system does not stop on that date. The condition of the system is held as one of four states. It is Assured when current evidence shows the five proofs hold within threshold. It is Degrading when the evidence is moving toward a threshold: acceptable answers falling window by window, cost per outcome rising, the notice period running down with no successor tested. It is At risk when a threshold is breached. It is Unassured when the evidence predates the last change.

Degrading is the state that repays attention. It is the period in which the business can still act on its own timetable. Without current evidence that period passes unseen, and the first signal is a complaint or an invoice.

Keeping proof current is not the same as re-running every test on every day. The events above decide when a proof is re-taken, and the consequence of the process failing decides how deep the re-test goes.

## Why does assurance come before every other AI decision?

Assurance comes first because every other decision about a model is taken on evidence, and assurance is what keeps that evidence true. Choosing a model, approving a launch, upgrading, changing provider and cutting cost are all claims that one combination is better than another for a given process.

| Decision | What it rests on |
|---|---|
| Choose a model | A threshold set by the process, and results on the business's own cases |
| Go live | Current evidence for the combination that will run, not the one that was demonstrated |
| Accept an upgrade | A regression verdict on the new version, with cost per outcome recomputed |
| Move to another provider | The same cases and the same scoring applied on both sides |
| Reduce cost with a cheaper model or tier | Proof that the outcome still holds at the lower price |

A more capable model does not remove the need. Capability is what the provider publishes about the model. Fitness for one process is what the enterprise has to measure, and the measurement taken on the previous version does not transfer to the new one. The faster providers release, the more there is to gain and the more there is to re-prove.

The usual order is to select the model, build the system, demonstrate it and evaluate it before launch. In that order the threshold is set last, by what the system happens to achieve, under pressure to pass. Reversing the order has a cost. The first release takes longer, the cases have to be built from the process itself, and someone has to own the state when it moves. That cost is limited by scoping the proof to the processes where an error matters, and it is weighed against the five exposures.

## What this means for assurance

In the Xyvionix method, the five proofs are held as states against thresholds agreed with the owner of each process. The evidence is stored with the combination it was measured on, and it is treated as expired when the model version, the prompt, the retrieved data or the price changes. When a state is lost, the corrective action has an owner until it is complete, and closure is recorded only when a re-test on the running combination passes. A changed setting or a closed ticket does not count. The continuing controls are described in [AI Assurance](/ai-assurance) and the method in [how assurance works](/how-assurance-works).

Models are one of several kinds of system for which the order matters, and the others are set out under [why assurance comes first](/why-assurance). For a model the argument comes down to what an approval can honestly claim. It can claim that one combination met one threshold on one date. Reliance lasts longer than that, so the proof has to be in place before the business depends on the model and has to be renewed for as long as it does.
