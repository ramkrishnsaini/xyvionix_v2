---
title: Production AI Going Live
h1: 'Going live with AI: what to baseline so approval survives launch'
seoTitle: 'Production AI Going Live: Baseline Before Launch | Xyvionix'
description: >-
  What to baseline before an AI system takes live traffic, so that launch
  approval becomes evidence that can be held, tested and re-proven afterwards.
summary: >-
  Launch approval describes a test configuration on one date. Five baselines
  set before go-live let the outcome be held afterwards: configuration,
  evaluation set, thresholds, telemetry, and the cost and rollback position.
lede: >-
  An AI system is Unassured on the day it goes live, because the approval
  evidence describes a test configuration and nothing is yet known about
  production. That state closes only if the launch left something to compare
  production against. Five baselines do that work: the configuration that was
  approved, an evaluation that can be run again, thresholds agreed in advance,
  telemetry that carries what scoring needs, and a tested cost and rollback
  position.
ogQuestion: Will the launch approval still mean anything in ninety days?
cluster: ai
secondary:
  - change
parent: use-cases
state: unassured
audience:
  - Head of AI
  - CTO
  - Technology Risk
intent: >-
  Problem: an AI system is about to launch and approval evidence must survive
  launch
related:
  assurance:
    - ai-assurance
    - llm-evaluation-assurance
    - ai-governance-assurance
    - ai-observability-assurance
  useCases:
    - ai-audit-readiness
    - rag-quality-degradation
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
  industries:
    - financial-services-ai-assurance
    - healthcare-ai-assurance
  insights:
    - why-ai-evaluation-fails-after-launch
evidence:
  - name: Launch configuration record
    detail: >-
      The model identifier and platform, prompt version, tool definitions,
      retrieval index and judge model that the approval was given on, read from
      the deployment itself, with the published retirement date of each model.
  - name: Repeatable evaluation set and verdict
    detail: >-
      The test set, graders and approval verdict held under version control in
      a form that can be run again without the console it was first run in,
      with results from repeated trials and not from a single run.
  - name: Threshold register
    detail: >-
      Each outcome the business case depends on, with its threshold, the basis
      for it in business terms, the owner who agreed it and the date, all
      recorded before production data exists.
  - name: Telemetry coverage test
    detail: >-
      A dated check that a production trace carries the model that answered,
      the prompt version and the content needed to score the answer, together
      with the recorded decision on content capture.
  - name: Cost envelope
    detail: >-
      Expected cost per successful outcome, with the price, service tier and
      tokens per task it assumes, and any dated price or lifecycle event that
      will change it.
  - name: Rollback test result
    detail: >-
      The result of reverting the launch configuration in a production-like
      environment, covering prompt, index and tool definitions as well as code,
      with the time the reversal took.
  - name: First production window
    detail: >-
      Scores on sampled production traffic from the agreed period after launch,
      produced by the scorers used before release and compared with the
      approved result.
thresholds:
  - signal: Components changed between approval and launch
    basis: Approval applies to one combination of model, prompt, tools and data
    lostWhen: Any component in the live deployment differs from the launch configuration record and the evaluation has not been repeated
  - signal: Production score against the approved score
    basis: The degree to which the launch decision relied on the pre-release result
    lostWhen: The first production window departs from the approved score beyond the agreed tolerance, or no production sample has been scored inside the agreed period
  - signal: Traces that can be scored and attributed
    basis: What the business must be able to show about an individual answer after the event
    lostWhen: A sampled production trace cannot be tied to a model version, a prompt version and the content that was exchanged
  - signal: Cost per successful outcome against the launch envelope
    basis: The budget approved in the business case and the value of the outcome
    lostWhen: Measured unit cost exceeds the envelope for consecutive windows, or a dated price event passes without the envelope being recomputed
  - signal: Rollback test on the launched configuration
    basis: The length of time the business can tolerate a degraded AI feature
    lostWhen: The reversal has not been exercised on the configuration in production, or the measured time to revert exceeds the tolerance
  - signal: Time to model retirement at launch
    basis: The provider's committed notice period compared with the enterprise's own change lead time
    lostWhen: The system launches on a model whose retirement is closer than the time needed to evaluate and release a successor
faqs:
  - q: The system passed its evaluation. Why is it Unassured at launch?
    a: >-
      Because the evaluation describes the system that was tested, on test
      inputs, before any real user reached it. Unassured does not mean
      something is wrong. It means no current evidence exists about production.
      The state changes when sampled production traffic has been scored against
      the thresholds agreed before launch.
  - q: How soon after launch should the first production evidence exist?
    a: >-
      The period is agreed before launch and set by consequence. A system that
      informs a customer decision needs production evidence sooner than an
      internal drafting aid. What matters is that the period is written down
      with an owner, so that a launch with no production evidence is visible as
      a gap and does not pass unnoticed.
  - q: Is a preview model acceptable in a production launch?
    a: >-
      That is a decision for the business, made with the notice period in view.
      OpenAI states that preview models may be retired with as little as two
      weeks' notice, and Microsoft Foundry gives at least 30 days for preview
      models. If the enterprise cannot evaluate and release a replacement
      inside that period, the decision to launch on a preview model is recorded
      with its owner and an expiry date.
sources:
  - title: 'Anthropic: demystifying evals for AI agents'
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
  - title: 'OpenTelemetry GenAI semantic conventions: overview and status'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md'
  - title: 'OpenTelemetry GenAI semantic conventions: agent spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md'
  - title: 'OpenTelemetry GenAI semantic conventions: spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md'
  - title: 'Microsoft Learn: Foundry Models retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Google: Gemini API pricing'
    url: 'https://ai.google.dev/gemini-api/docs/pricing'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
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

A system that has been evaluated in a test environment is about to take live traffic. Approval was given on a launch pack: an evaluation report, a security review, a cost estimate and a sign-off. Each is a proof about one configuration on one date.

On the day of go-live the production system is Unassured. Nothing is known to be wrong. Nothing is yet known at all about how the system behaves on real requests, at real volume, from users who phrase questions in ways the test set did not contain. The approval evidence describes a rehearsal.

Launch also starts clocks that the enterprise does not set. On Microsoft Foundry, generally available models retire 18 months after their own launch, and 12 months for models from several partner providers, so the model behind a new system has an end date that can be read on the day the system goes live. Prices carry dates as well. The Gemini API lists Gemini 3.8 Flash at a promotional price until 31 December 2026. A system approved in the autumn on that price meets a different unit cost in January, with no change in its traffic.

## The business outcome at risk

The outcome at risk is the one the business case promised: cases resolved, documents drafted, questions answered correctly at a cost the business accepted. Launch is the point at which people start to act on what the system produces.

The risk on day one is rarely that the system fails. It is that the enterprise has no means of knowing when it starts to fail. Three months after launch a complaint arrives, and the questions that follow cannot be answered. Nobody can say whether the system was always like this, what changed, or which version produced the answer. An approval with no baseline behind it can be neither defended nor repeated.

A second consequence is slower. The go-live report becomes the standing evidence, shown to the risk committee a year later while the model, the prompt and the corpus have each moved on.

## What must be proven

Five things are baselined before go-live so that the outcome can be held after it.

1. **The configuration that was approved is the configuration that launches.** Model identifier and platform, prompt version, tool definitions, retrieval index and judge model are read from the deployment and recorded. Evidence taken on any other combination describes a different system.
2. **The evaluation can be run again.** The test set, the graders and the verdict are held under version control, outside any one provider's console. A single passing run is weak evidence. Anthropic's engineering guidance separates the chance that at least one of several trials succeeds from the chance that all of them do. The two are identical for one trial and diverge as trials are added. A launch verdict records the second.
3. **Thresholds are agreed before the data arrives.** Each outcome has a threshold, a basis in business terms and an owner. A threshold chosen after the first production figures are in tends to be set at whatever those figures were.
4. **Telemetry carries what scoring needs.** Under the OpenTelemetry GenAI semantic conventions, capture of prompt and response content is opt-in. Default instrumentation records that a request happened and not what was said, so scoring production answers needs a deliberate decision on content capture and its privacy consequences. The same conventions record the requested model and the responding model as separate attributes. They remain in Development status, so the version in use is pinned.
5. **Cost and rollback are tested positions.** Expected cost per successful outcome is stated with the price, tier and tokens per task it assumes. The reversal is exercised on the configuration being launched and timed.

How the suite itself is kept valid is covered by [LLM Evaluation Assurance](/llm-evaluation-assurance). The inventory record, oversight assignment and retention decisions that a launch should create are covered by [AI Governance Assurance](/ai-governance-assurance).

## What causes assurance to be lost

Launch evidence is lost in the weeks either side of go-live, through ordinary work.

- **The late edit.** The prompt is reworded after the evaluation to answer a stakeholder's comment. The approval is not repeated, because the change was described as wording.
- **The launch without thresholds.** The system goes live with a dashboard and no agreed boundary. Every later reading is judged against the reading before it, so a slow decline never crosses anything.
- **Telemetry without content.** Latency, error rate and token volume are all recorded. None of them says whether an answer was right.
- **A preview model in the production path.** It scored best in testing. OpenAI states that preview models may be retired with as little as two weeks' notice.
- **Rollback that reverts code only.** The application can be redeployed at its previous version. The prompt, the index and the tool definitions are versioned somewhere else, or nowhere.
- **Test traffic that was written, not sampled.** The evaluation set came from the project team's expectations. Real users arrive with different questions, and the approved score does not describe them.

## Corrective action

Where go-live is close and a baseline is missing, the correction is to create the evidence. Under assurance, Xyvionix owns that work through to completion within the access it has been granted, and uses the enterprise's own change process for anything that alters the deployment.

The actions are specific. The configuration record is built from the live deployment, not from the design document. The evaluation set is exported with its graders and re-run against the launch configuration, several times. The content capture decision is put to the people who own privacy. Each threshold is put to the owner of the outcome it protects.

Some gaps cannot be closed before the date. The decision to launch with one belongs to the business. It is recorded with its owner and an expiry date, and the system stays Unassured for the outcome concerned. If the first production window then departs from the approved result, the state moves to At risk and the configuration record is the starting point for finding what differs.

## What verified closure looks like

The Unassured state closes when production evidence exists and agrees with what was approved. A completed launch checklist is not closure.

Four results are recorded together. Sampled production traffic has been scored by the same scorers that were used before release, and the result sits within the agreed tolerance of the approved score. The configuration read back from the live deployment matches the launch record. A sampled trace can be followed to the model that answered, the prompt version and the content exchanged, without reconstruction. Cost per successful outcome, measured on production usage, is inside the envelope.

The evidence is stored with the configuration it was taken on. From that point the system is Assured, and the next change to any component is seen to expire the evidence. The continuing position across every outcome is described in [AI Assurance](/ai-assurance), and the events that most often expire it in [Model Change Assurance](/model-change-assurance).

## What to do next

One exercise can be done before any tooling is bought or any engagement begins. The team takes the launch pack and writes three things beside each piece of evidence: the configuration it was taken on, the event that would make it expire, and the person who would know that the event had happened.

The team then reads the model identifier from the live or staging deployment and compares it with the identifier in the evaluation report. If the two differ, or if the report does not name one, that is the first finding, and it is better found before launch than during an examination of the kind described in [AI Audit Readiness](/ai-audit-readiness).
