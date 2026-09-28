---
title: AI Audit Readiness
h1: An examiner will ask about last quarter. Find out now what can be shown
seoTitle: 'AI Audit Readiness: Evidence Retained, Not Rebuilt | Xyvionix'
description: >-
  What an audit, regulator or customer asks about an AI system, which evidence
  answers each question, and why evidence rebuilt afterwards carries less
  weight.
summary: >-
  An examination asks about a period that has already passed. Evidence retained
  as the system ran answers it. Evidence rebuilt afterwards is weaker, and some
  of it cannot be rebuilt at all. The gaps are found by testing retrieval.
lede: >-
  An AI system is Unassured for audit purposes until the enterprise has tested
  what it can produce about a past period. An examiner asks which version
  produced an output, what that version was tested on, who could intervene and
  what was recorded. Those answers exist only if they were retained while the
  system ran. Readiness is established by sampling a past output and following
  it through the records, and by stating plainly which periods have no evidence.
ogQuestion: Which version produced that answer, and can it be shown?
cluster: ai
secondary: []
parent: use-cases
state: unassured
audience:
  - AI Governance
  - Technology Risk
  - Internal Audit
  - CISO
intent: >-
  Problem: an audit, regulator or customer will ask for evidence about an AI
  system
related:
  assurance:
    - ai-governance-assurance
    - llm-evaluation-assurance
    - ai-observability-assurance
  useCases:
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
  industries:
    - financial-services-ai-assurance
    - insurance-claims-ai-assurance
    - healthcare-ai-assurance
  insights:
    - ai-audit-evidence-requirements
    - human-oversight-evidence
evidence:
  - name: Dated inventory snapshots
    detail: >-
      The AI systems in operation at points across the period, each with its
      owner and purpose at that date. The current inventory describes today and
      does not answer a question about last quarter.
  - name: Version-attributed traces
    detail: >-
      For each recorded request, the model that answered, the prompt version
      and the agent version in force, captured at the time of the request.
  - name: Evaluation verdicts stored with their configuration
    detail: >-
      Each verdict with the model, prompt, tool set and test set it was taken
      on, so that the result for a version can be shown after that version has
      been retired.
  - name: Oversight decision record
    detail: >-
      Each approval or override with the identity of the person who decided,
      the time taken, the decision and the state of the request at the point
      it was paused.
  - name: Operating logs under the enterprise's own control
    detail: >-
      Logs of actions and events retained by the enterprise for the period its
      obligations require, with the agent identity and the delegating user
      where one exists.
  - name: Incident timeline records
    detail: >-
      For each incident, the times of occurrence, detection and attribution,
      and the system version involved.
  - name: Supplier documentation by version
    detail: >-
      The provider's documentation for each model version that served
      production during the period, held with the dates that version was in
      use.
thresholds:
  - signal: Sampled outputs attributable to a version
    basis: An examiner's question concerns one output on one date
    lostWhen: A sampled output from the period cannot be tied to a model version, a prompt version and the evaluation verdict in force
  - signal: Time to assemble evidence for a sampled request
    basis: The shortest response period among the obligations the enterprise has decided apply
    lostWhen: The evidence for a sampled item cannot be assembled inside the agreed share of that period
  - signal: Evidence held only in a provider's system
    basis: A provider sets its own retention period, which can be shorter than the enterprise's obligation
    lostWhen: Any class of evidence for an in-scope system exists only in provider-side logs or a provider console
  - signal: Reconstructed evidence relied on for a control
    basis: The weight an examiner gives to evidence assembled after the question was known
    lostWhen: Reconstructed evidence is presented for a control in the period without being labelled as reconstructed
  - signal: Periods with no retained evidence
    basis: An examination covers a period and not a date
    lostWhen: A gap exists inside the period for an in-scope system and is not recorded with its dates and an owner
  - signal: Supplier documentation against versions in use
    basis: Documentation describes one model version
    lostWhen: A version that served production in the period has no supplier documentation held for it
faqs:
  - q: Can missing evidence be rebuilt before the audit?
    a: >-
      Some of it can be recovered from sources that still exist, such as usage
      exports, change records and deployment history. It is then labelled as
      reconstructed, with the method and the date. What was never recorded, for
      example the content of a request or the version that answered it, cannot
      be created afterwards. The gap is stated with its dates.
  - q: How long does AI evidence have to be kept?
    a: >-
      The period is set by the longest requirement among the regimes that apply
      to the system, which is a decision for the enterprise and its advisers.
      As published, the EU AI Act sets at least six months for automatically
      generated logs of high-risk systems, and Colorado SB26-189 sets at least
      three years for compliance records. Xyvionix gives no legal advice. It
      tests whether records for the chosen period can be retrieved.
  - q: What do teams most often fail to produce?
    a: >-
      The link between one output and the version that produced it. Logs show
      that a request happened. They often do not show which model answered,
      which prompt was in force or what that combination scored when it was
      last evaluated. Without that link the rest of the evidence describes the
      system in general and the examiner's question is about a particular
      case.
sources:
  - title: 'Colorado SB26-189'
    url: 'https://leg.colorado.gov/bills/sb26-189'
  - title: 'California Privacy Protection Agency: ADMT, risk assessment and cybersecurity audit regulations'
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html'
  - title: 'European Commission: AI Omnibus enters into force'
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force'
  - title: 'EU AI Act Service Desk: Article 19, automatically generated logs'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-19'
  - title: 'EU AI Act Service Desk: Article 26, obligations of deployers'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26'
  - title: 'European Commission: General-Purpose AI Code of Practice'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai'
  - title: 'OpenTelemetry GenAI semantic conventions: agent spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md'
  - title: 'Hugging Face Inference Endpoints: security'
    url: 'https://huggingface.co/docs/inference-endpoints/en/guides/security'
  - title: 'OpenAI: your data'
    url: 'https://developers.openai.com/api/docs/guides/your-data'
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'OpenAI Agents SDK: human in the loop'
    url: 'https://openai.github.io/openai-agents-python/human_in_the_loop/'
  - title: 'Google Cloud: Agent Identity overview'
    url: 'https://docs.cloud.google.com/iam/docs/agent-identity-overview'
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

An examination is coming. It may be internal audit, a regulator, or a customer's due diligence before a contract is signed. Whoever asks, the questions will concern a period that has already passed.

That is the difficulty. Evidence about a past period was either retained while the system ran or it has to be rebuilt now. The enterprise does not yet know which of the two it holds, so the state is Unassured. Nothing is known to be missing. What can be shown has not been tested.

The calendar adds weight. Colorado SB26-189 has operative requirements from 1 January 2027, and compliance with California's automated decision-making technology regulations is required from the same date. High-risk obligations under the EU AI Act apply to Annex III systems from 2 December 2027. Which of these apply to a given system is a decision for the enterprise and its advisers. In each case the record of operation cannot be started retrospectively.

## The business outcome at risk

The outcome is the ability to answer with evidence, inside the time allowed. Colorado SB26-189 gives 30 days for a plain-language explanation after an adverse outcome. A customer's procurement process gives whatever its questionnaire says.

Evidence rebuilt for the occasion is weaker than evidence retained, for three reasons. It was assembled by the party under examination after the question was known. Its sources may have expired. And it often cannot be tied to the version of the system that was running on the date in question.

The consequences are practical. An observation becomes a finding because the answer depended on reconstruction. A contract is delayed while a questionnaire goes unanswered. A decision about a customer cannot be explained because nobody can say which model made it.

## What must be proven

Examiners differ in vocabulary and ask much the same questions. Each has one kind of evidence that answers it.

| The question | Evidence that answers it | Why it cannot be rebuilt later |
|---|---|---|
| Which AI systems were running, and who owned them? | Dated inventory snapshots | The current inventory describes the present |
| Which version produced this output? | A trace carrying model, prompt and agent version | A version that was not recorded cannot be inferred from the output |
| Was that version tested, and on what? | The verdict stored with its configuration | A test run today measures the model that is available today |
| Who could intervene, and did they? | Decisions with approver identity and timing | A policy shows intent and not what was decided |
| What did the system do? | Action logs with agent and user identity | Provider-side logs are kept for the provider's purposes |
| How quickly was a fault known? | Incident records with occurrence, detection and attribution times | Times recalled afterwards are estimates |
| What did the supplier state about the model? | Provider documentation for the version in use | The provider's current documentation describes the current model |

Attribution to a version is the link that holds the rest together. The OpenTelemetry GenAI semantic conventions include an agent version attribute, which joins a trace to the version that was evaluated. For supplier evidence, the transparency chapter of the EU General-Purpose AI Code of Practice includes a Model Documentation Form, and a deployer can hold the form for the exact model version in production.

The continuing position on inventory, oversight and retention is held under [AI Governance Assurance](/ai-governance-assurance). The validity of the evaluation evidence is covered by [LLM Evaluation Assurance](/llm-evaluation-assurance).

## What causes assurance to be lost

These are the gaps most often found when retrieval is tested.

- **Logs without a version.** The request, the time and the user are recorded. The model that answered and the prompt in force are not.
- **Content that was never captured.** Under the OpenTelemetry GenAI conventions, prompt and response content is opt-in. Where nobody opted in, the record shows that an answer was given and not what it said.
- **Provider logs treated as the record.** Hugging Face Inference Endpoints keeps logs for 30 days, and OpenAI keeps abuse monitoring logs for up to 30 days. Those periods serve the provider. The EU AI Act sets at least six months for the logs of high-risk systems.
- **An evaluation that cannot be repeated.** Anthropic states that requests to a retired model fail. If the verdict for that version was not stored, it cannot be obtained again.
- **Actions under a shared identity.** Google Cloud logs show both the agent and the user when an agent acts on a user's behalf. Where agents run on a shared account, the log names an account and no actor.
- **Approval stored as an outcome.** In the OpenAI Agents SDK a paused run returns its interruptions and a state that can be serialised and stored. Where only the final action is kept, the decision behind it is not evidenced.

## Corrective action

The correction runs on two tracks, because the past and the future need different treatment. Under assurance, Xyvionix owns the corrective action through to completion within the access it has been granted. Decisions about which obligations apply stay with the enterprise and its advisers.

For the period that has passed, the work is to preserve and to state. Sources that still exist are exported before they expire: provider usage data, deployment history, change records. Anything assembled from them is labelled as reconstructed, with its method and date. Periods for which nothing can be produced are recorded as gaps, with their dates and an owner. A gap that is stated plainly can be assessed by an examiner. One found during the examination is assessed less kindly.

For the period from now, the work is to start retaining. Version identifiers are added to traces. A decision on content capture is put to the people who own privacy. Evaluation verdicts are stored with their configuration. Logs are moved under the enterprise's own retention, for the period its obligations require. Agents are moved off shared identities, as described in [AI Agent Assurance](/ai-agent-assurance).

## What verified closure looks like

Readiness is proven by a retrieval test. A configuration review does not prove it.

An output from the period is chosen by sampling, by someone who did not build the system. From the records alone, that person establishes the model and prompt version that produced it, the verdict held for that version, the identity it ran as, the approval where one was required and the log of what followed. The time taken is recorded and compared with the shortest response period that applies. The oldest record inside the retention period is retrieved and read, since a retention setting shows intent and a retrieved record shows the result.

The state then moves to Assured for the period from which retention began. The earlier period stays on the record as a gap with its dates. It does not become evidenced by the passage of time.

## What to do next

A rehearsal can be run before any examiner arrives. The team picks one real output from a past quarter and tries to answer five questions from records alone: which model and prompt produced it, what that version scored when it was last evaluated, who could have stopped it, what the system did next, and how long the answers took to find.

Each question that cannot be answered is a gap, and each gap is dated from today for as long as nothing changes. The baselines that prevent these gaps at launch are set out in [Production AI Going Live](/production-ai-going-live).
