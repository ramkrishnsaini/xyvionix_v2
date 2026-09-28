---
title: Why AI evaluation fails after launch
h1: Why an AI evaluation stops being evidence after launch
seoTitle: 'Why AI Evaluation Evidence Expires After Launch | Xyvionix'
description: >-
  An evaluation result describes one configuration on one date. Four mechanisms
  expire it after launch, and each needs its own re-test trigger and cadence.
summary: >-
  Enterprise AI passes review once and is rarely examined again. Test sets age,
  judges drift, traffic shifts and the system changes without a release. Each
  expiry has a different trigger, so one re-test schedule cannot cover them.
lede: >-
  AI evaluation fails after launch because a result is a measurement of one
  configuration on one date, and the launch review records it as a property of
  the application. Four mechanisms then expire it: the test set ages, the judge
  drifts, production traffic shifts, and the system changes without a release.
  Each has a different trigger, so a regime that survives launch runs on events
  and on sampled traffic, not on the release calendar alone.
ogQuestion: 'When did your AI system last pass its evaluation, and on what?'
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary: []
parent: insights
state: degrading
audience:
  - Head of AI
  - VP Engineering
  - AI Governance
  - Technology Risk
intent: >-
  Informational: why evaluation evidence expires after launch, and what an
  evaluation regime that survives launch tests and how often
related:
  assurance:
    - llm-evaluation-assurance
    - ai-assurance
    - model-change-assurance
  useCases:
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - measuring-production-rag-quality
    - model-retirement-is-a-production-change
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Anthropic: demystifying evals for AI agents'
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
  - title: 'Anthropic: a postmortem of three recent issues'
    url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'
  - title: 'Judge reliability study (arXiv preprint 2606.19544)'
    url: 'https://arxiv.org/abs/2606.19544'
  - title: 'Gemini API: models'
    url: 'https://ai.google.dev/gemini-api/docs/models'
  - title: 'Microsoft Foundry: model deprecations and retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'OpenTelemetry GenAI semantic conventions: overview and status'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md'
  - title: 'OpenTelemetry GenAI semantic conventions: spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md'
  - title: 'OpenTelemetry GenAI semantic conventions: agent spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md'
  - title: 'Databricks: evaluate and monitor with MLflow 3'
    url: 'https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/'
  - title: 'Elasticsearch release notes'
    url: 'https://www.elastic.co/docs/release-notes/elasticsearch'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The review that happens once

Most enterprise AI systems are evaluated hardest in the weeks before launch. A test set is assembled, a grading method is agreed, a score is produced and a committee accepts it. The score goes into the approval record. The system goes into production.

What follows is a recognisable pattern. The suite is wired into the release pipeline and runs when the team ships. Releases become less frequent once the system is stable. A year later the score in the approval record is still quoted in risk reviews, about a system that has since changed its model version, its prompt, its retrieval index and its users.

Nobody decided to stop evaluating. The evaluation was attached to the act of releasing, and the things that change an AI system after launch mostly do not arrive as releases.

The failure is one of record-keeping before it is one of tooling. The launch review stores a result as a property of the application. It is a measurement of one configuration on one date, and it should be stored and expired as such.

## A result belongs to a configuration

An evaluation result is bound to a specific set of components: the model identifier, the prompt version, the tool schema, the retrieval index version, the embedding model, the reranker and the judge model that graded the output. Change any one of them and the result describes a system that no longer exists.

If the result is stored with the configuration it was measured on, expiry becomes mechanical: the running configuration is compared with the evaluated one, and any difference marks the evidence as out of date. If the result is stored against the application name, nothing marks it as out of date, and it is quoted until someone notices a failure in production.

The OpenTelemetry GenAI semantic conventions make part of this comparison cheap. They define the requested model and the responding model as separate span attributes, and they carry an agent version attribute that can join a production trace to the version that was evaluated. The conventions are still in Development status, so attribute names can change, but the running configuration is observable and evidence can be checked against it.

Four mechanisms expire the evidence. Each has a different trigger, and a regime built around one of them misses the other three.

## Four ways the evidence expires

### The test set ages

A test set ages from the inside. Its cases stay the same while the system under test improves against them, until the suite passes in full. Anthropic's engineering guidance on agent evaluation calls this saturation: once every solvable task passes, the suite no longer detects change. The same guidance separates capability evaluations, which start at a low pass rate and measure progress, from regression evaluations, which should hold near a 100% pass rate. A launch suite usually begins as the first kind and becomes the second without anyone recording the change of purpose.

The expected answers age as well. A case written against last year's policy, price list or product range has a reference answer that is now wrong. The system is marked down for being correct, or marked up for repeating something the business has withdrawn.

### The judge drifts

An automated judge is a model with a version and a provider. When the judge changes, scores move, and the movement is indistinguishable from a change in the system being graded unless the judge is held constant or recalibrated.

Stability of the judge is not the same as validity. A preprint published in June 2026 compared 21 judges over about 541,000 judgments and found that judge rankings shifted by up to 14 positions across benchmarks. A judge that ranks well on one kind of task cannot be assumed to grade a different kind of traffic equally well. Calibration belongs to one judge model, one rubric and one mix of traffic, and it lapses when any of the three moves.

### Production traffic shifts

The test set is a sample of what the team expected users to ask. Production is what they ask. The divergence grows as the system is offered to new teams, new markets and new document types.

This failure has a different signature from test set ageing. An aged suite scores too high on everything. A suite that has lost touch with traffic scores accurately on the cases it has, and says nothing about a growing share of requests. The remedy is cases drawn from sampled production traffic, not harder cases.

### The system changes without a release

The fourth mechanism is the one the release pipeline cannot see. Several routes lead to it.

- **Aliases.** The Gemini API documentation states that "latest" aliases are updated automatically, with two weeks' email notice of breaking changes behind them. The change date is chosen by the provider.
- **Automatic upgrades.** Microsoft Foundry upgrades Standard deployments at model retirement, region by region, unless the deployment's upgrade option is set otherwise. Provisioned deployments are not, so two deployments of one application can diverge.
- **Serving-side faults.** Anthropic's postmortem of September 2025 describes three infrastructure bugs that degraded output over the preceding weeks, and records that the evaluations it ran did not capture the degradation users were reporting. The model had not changed. The serving path had.
- **Index internals.** Elasticsearch 9.5.0 added automatic calibration of its DiskBBQ quantisation at merge time. Retrieval recall can therefore move when segments merge, with no change to the application.

In none of these cases does anything cause the pipeline suite to run. The change arrives on a calendar the enterprise does not control.

## What a surviving regime tests, and how often

"How often" has no single answer because the four mechanisms run on different clocks. A regime that survives launch has four layers, each with its own trigger.

| Layer | What it tests | What triggers it | What sets the cadence |
|---|---|---|---|
| Regression suite on the production configuration | That known-good behaviour still holds | Any change to model, prompt, tools, index, embedding model or reranker, and any mismatch between requested and responding model | Events, with a time-based floor no longer than the shortest provider notice period that applies |
| Scoring of sampled production traffic | That quality holds on what users ask now | Continuous, on a sample | Traffic volume and the cost of a wrong answer in the process |
| Test set refresh | That the suite can still fail, and still resembles traffic | Saturation, or divergence between the offline and production scores | Measured trigger, not calendar |
| Judge recalibration | That the grader still agrees with people | Judge model change, rubric change, or a shift in traffic mix | Events, plus a periodic human-labelled sample |

Two points in the table carry most of the weight.

The first is the time-based floor. Event triggers depend on detecting the event, and detection fails. A scheduled run of the regression suite against the live endpoint is the backstop, and its interval should be derived from provider commitments. Where a workload calls a "latest" alias with two weeks' notice of breaking change, a quarterly run leaves most of each quarter unexamined.

The second is that the offline suite and the production sample must use the same scorer definitions. Databricks documents this pattern under MLflow 3: the scorers used in development run automatically on sampled production traffic. Without it the divergence between the two scores, which triggers test set refresh, cannot be measured.

## The trade-offs are real

Continuous evaluation is not free, and the costs shape the design.

**Judge cost against coverage.** Scoring every production response with a model-based judge adds at least one further model call to each response. Sampling reduces the cost and widens the interval in which a rare failure goes unseen. The sampling rate is therefore a risk decision, set by the consequence of an undetected failure in that process, and it belongs to the business owner of the process.

**Content capture against privacy.** Quality scoring needs the prompt and the response. In the OpenTelemetry conventions that content is opt-in, so default telemetry carries none of it. Capturing it is a deliberate decision with retention and access consequences, and a team that makes it after an incident has no history to score.

**Pinning against currency.** Pinning a model version turns an undated change into a dated one, which makes evidence easier to hold. It also concentrates change at the retirement date. Pinning is the right default, provided re-evaluation is scheduled before retirement forces it. That schedule is the subject of [Model Change Assurance](/model-change-assurance).

## An illustrative example

In this illustrative case, a policy assistant launches with a suite of 300 cases and passes 94% of them. Over three releases the score rises to 100% and stays there. Read as stability, this is a good result. Read as an instrument, the suite saturated at the second release and has detected nothing since.

In the same period the assistant is opened to a second business unit. Sampled production traffic, graded by the same scorers, shows 82% on requests from the new unit, which asks about document types the suite does not contain. The offline score and the production score are now 18 points apart, in this illustrative case, and only one of them is in the approval record.

Then the judge model behind the scorers is retired and replaced. Production scores rise by three points overnight. Nothing in the assistant changed. Without recalibration against human labels, the team cannot say whether the new judge is more accurate or more lenient.

None of these events involved a release. The pipeline suite reported a full pass throughout.

## What this means for assurance

An evaluation result is evidence in the strict sense: a tested result attributable to a point in time. It is stored with the configuration it describes. It expires when that configuration changes or when its instrument is shown to have drifted. When it expires and has not been replaced, the state of the system is Unassured, which means unknown, and unknown is not a passing grade.

The threshold for each layer is a business decision. How far the production score may fall, and how long a system may run on expired evidence, depend on what a wrong answer costs in the process the system serves. The team that operates the system can measure these. It should not be the only party that sets them.

The commercial treatment of these controls is set out in [LLM Evaluation Assurance](/llm-evaluation-assurance), and the launch decision they feed in [Production AI Going Live](/production-ai-going-live). Launch review answers whether a system was good enough on the day. The question a risk committee is asking a year later is whether it is good enough now, and only evidence gathered since can answer it.
