---
title: What AI audit evidence requires
h1: Most AI audit evidence cannot be rebuilt. It is kept as the system runs, or it is lost
seoTitle: 'AI Audit Evidence: What Examiners Ask For | Xyvionix'
description: >-
  Six questions examiners ask about an AI system, the operating evidence that
  answers each, what makes it expire, and why little of it can be rebuilt later.
summary: >-
  An examination samples a past period. Documents describe the present. This
  article maps six examiner questions to the operating evidence that answers
  them, states what expires each kind, and shows how little can be rebuilt.
lede: >-
  AI audit evidence is a record of what a system did, made at the time it did
  it. An examiner samples a decision from a past date and asks which version
  produced it, what that version was tested on, how it was monitored and who
  could intervene. Documents assembled for the review describe the system as it
  is now. Evidence rebuilt afterwards is weaker than evidence retained, and most
  of what is asked for cannot be rebuilt at all, because it was never recorded
  or its source has been deleted.
ogQuestion: How much of your AI evidence exists before anyone asks for it?
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary: []
parent: insights
state: unassured
audience:
  - AI Governance
  - Technology Risk
  - Internal Audit
  - CISO
  - Head of AI
intent: >-
  Maps what examiners and auditors ask for to the operating evidence that
  answers it: inventory, version history, evaluation records, monitoring,
  incident log, oversight records. Argues that reconstructed evidence is weaker
  than retained evidence and that most of it cannot be reconstructed. Accurate
  on current regulatory timelines; not legal advice.
related:
  assurance:
    - ai-governance-assurance
    - llm-evaluation-assurance
    - ai-observability-assurance
  useCases:
    - ai-audit-readiness
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
  industries:
    - financial-services-ai-assurance
    - insurance-claims-ai-assurance
  insights:
    - human-oversight-evidence
    - assurance-is-a-state-not-a-report
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), HTML text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202601744'
  - title: 'Regulation (EU) 2024/1689 (AI Act), Official Journal'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689'
  - title: 'European Commission: AI Omnibus enters into force'
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force'
  - title: 'EU AI Act Service Desk: implementation timeline'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act'
  - title: 'EU AI Act Service Desk: Article 12, record-keeping'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-12'
  - title: 'EU AI Act Service Desk: Article 19, automatically generated logs'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-19'
  - title: 'EU AI Act Service Desk: Article 26, obligations of deployers'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26'
  - title: 'EU AI Act Service Desk: Article 72, post-market monitoring'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-72'
  - title: 'EU AI Act Service Desk: Article 73, reporting of serious incidents'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-73'
  - title: 'Colorado SB26-189'
    url: 'https://leg.colorado.gov/bills/sb26-189'
  - title: 'California Privacy Protection Agency: ADMT, risk assessment and cybersecurity audit regulations'
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html'
  - title: 'OCC Bulletin 2026-13: model risk management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
  - title: 'FCA speech: long-term review of AI in retail financial services'
    url: 'https://www.fca.org.uk/news/speeches/fca-long-term-review-ai-retail-financial-services-designing-unknown'
  - title: 'ISO/IEC 42001:2023'
    url: 'https://www.iso.org/standard/42001'
  - title: 'ISO/IEC 42006:2025'
    url: 'https://www.iso.org/standard/42006'
  - title: 'Model Context Protocol specification 2026-07-28: security best practices'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## An examination samples the past

An examiner does not ask whether an AI system is governed. A decision is picked from a date inside the review period, and the enterprise is asked to show which system made it, in which version, tested on what and watched by whom.

The usual preparation does not answer that. A team learns of the review some weeks ahead and assembles a pack: the AI policy, an architecture diagram, the current inventory, a fresh evaluation run and a view of the monitoring dashboard. Every item is accurate. Every item describes the system on the day the pack was built.

The examiner then samples a decision from five months earlier. The model behind the assistant has been replaced twice since, the prompt has been edited, and the reviewer who approved that class of action has moved to another team. The pack describes the present, in answer to a question about the past.

Documentation states what the system is meant to do. Operating evidence records what it did. A review of operation over a period accepts only the second, and operating evidence can be created only at the time.

## Why rebuilt evidence carries less weight

Evidence assembled after the question is known is weaker than evidence retained as the system ran. There are three reasons, and none depends on bad faith.

**The author knew the question.** A record made at the time was made without knowledge of what would be asked. A record assembled afterwards was selected by the party under examination, and the examiner cannot see what was left out.

**The sources have aged.** Rebuilding draws on whatever still exists: provider consoles, message threads, deployment history. Each has a retention period that was set for someone else's purposes.

**The system being described no longer exists.** An evaluation run today measures the model, prompt and tool set in place today. It says nothing about the combination that served requests in March.

Reconstruction still has a place when it is labelled as such, with its method and date. The steps for a review that is already scheduled are set out under [AI Audit Readiness](/ai-audit-readiness). The argument here concerns the period before any review is announced, the only period in which the stronger kind of evidence can be made.

## Retained, recoverable, unrecoverable

Every item an examiner asks for falls into one of three classes.

| Class | What it means | Typical contents |
|---|---|---|
| Retained | Recorded at the time, under the enterprise's control, tied to a version and a date | Traces carrying version identifiers. Evaluation verdicts stored with their configuration |
| Recoverable | Derivable from a system of record that still holds it | Deployment history, change records, access grants in the identity platform |
| Unrecoverable | Never recorded, or held only in a place that has since deleted it | The version a moving model alias resolved to on a date. The content of a request. The time a reviewer took |

The recoverable class is smaller than most teams expect, and it has a bias. It covers what was done to the system: releases, configuration changes, grants of access. Those pass through tools that keep history as a by-product. What the system did leaves a trace only where someone chose to capture one: its outputs, the version behind each, the checks that ran and the human decisions around it.

An enterprise can usually show how the system changed. It can rarely show how the system behaved unless behaviour was being recorded at the time.

## The checklist: question, evidence, expiry

Examiners differ in vocabulary and converge on six questions. Each is answered by one kind of operating evidence, which stops describing production when a particular event occurs.

| What the examiner asks | Operating evidence that answers it | What makes the evidence expire | If it was not retained |
|---|---|---|---|
| Which AI systems were in operation, and who owned each? | Inventory snapshots with dates, reconciled against discovery | A new deployment, a change of owner, a new use of an existing system | Partly recoverable from deployment records. Ownership on a past date usually is not |
| Which model, prompt and tool set produced this output? | Version identifiers on each trace, with a dated change history | Any release. A hosted model alias that moves to a new version | Unrecoverable where the resolved version was not logged |
| What was that version tested on, and what was the result? | Evaluation verdicts stored with model version, system prompt, tool set and test dataset | A change to any one of the four | Unrecoverable once that version can no longer be run |
| How was the system watched, and did the checks run? | Monitoring results across the period, with logs under the enterprise's own retention | A check that stops running. A gap in log coverage. Retention shorter than the review period | Unrecoverable. The period stays a gap |
| When did a fault occur, when was it known and when was it attributed? | Incident records with times of occurrence, detection and attribution, and the version involved | Closure without a re-test. A later release that changes the corrected version | Times can be estimated from tickets and messages, and are labelled as estimates |
| Who could intervene, and did they? | The named overseer, a tested stop or override, and each decision with identity and timing | The overseer changes role. A new version is not covered by the stop test. Approval volume outgrows review time | The assignment is recoverable. The decisions and their timing are not |

None of the expiry events follows an audit calendar. Evidence expires on a release, a role change or a vendor's alias update, so a set that was complete at the last review can be partial by the next with no fault anywhere.

Records also have to be shown to be complete. Raw telemetry becomes evidence when it is linked to a control, retained and free of unexplained gaps, and identity is the usual weakness. The security guidance in the Model Context Protocol specification, revision 2026-07-28, notes that token passthrough breaks audit trails, because downstream logs show a different identity from the one that acted. The measures that show whether a human decision was a real one are covered in [human oversight evidence](/human-oversight-evidence).

## What the published expectations say about time

The facts below are stated as published. They are not legal advice, and which of them apply to a given system is a decision for the enterprise and its advisers.

The EU AI Act was amended by Regulation (EU) 2026/1744, in force since 27 July 2026. High-risk obligations now apply from 2 December 2027 for Annex III systems and from 2 August 2028 for systems in Annex I regulated products. The dates moved. The kind of evidence did not. In the 2024 text, Article 12(1) requires that high-risk systems "technically allow for the automatic recording of events (logs) over the lifetime of the system". Article 72(2) requires post-market monitoring to "actively and systematically collect, document and analyse relevant data". These quotations are from the Act as published in 2024, and the amended text is the one to read before any wording is relied on.

| Period | Where it is set | What it applies to |
|---|---|---|
| At least six months | EU AI Act, Articles 19(1) and 26(6) | Automatically generated logs of high-risk systems, kept by providers and deployers |
| At least three years | Colorado SB26-189 | Records necessary to demonstrate compliance |
| 30 days | Colorado SB26-189 | A plain-language explanation after an adverse outcome |
| 15, 10 or 2 days | EU AI Act, Article 73 | Serious incident reports for high-risk systems: 10 days in the event of a death, 2 days for a widespread infringement or a critical infrastructure incident |

Colorado SB26-189 was signed on 14 May 2026 and its duties are operative from 1 January 2027. Compliance with California's automated decision-making technology regulations is required from the same date, with risk assessment attestations due on 1 April 2028.

Three implications follow for evidence. A delay is not a reprieve: test results prepared for the original August 2026 date will be more than a year old in December 2027, and the systems they describe will have changed. Guidance arrives late: the Omnibus requires Commission guidance on post-market monitoring by 2 September 2027, three months before the Annex III date, so a team that waits for it before recording holds three months of record at most. And short response periods are consumed by retrieval, since a 30-day or 15-day period leaves little room for working out which version was involved.

Where no rulebook exists the burden rises. OCC Bulletin 2026-13 of 17 April 2026 states that generative AI and agentic AI models are "not within the scope of this guidance". An FCA speech of 28 January 2026 asked what reasonable steps under the Senior Managers and Certification Regime look like "when the model updates weekly". ISO/IEC 42001:2023 is a standard for an AI management system, and ISO/IEC 42006:2025 sets requirements for the bodies that audit against it. Such audits are periodic. Between them the enterprise holds the record, or nobody does.

## What retention costs

Retention has a cost, in three trade-offs.

**Content against privacy.** Recording requests and responses makes an output explainable and creates a store of personal data with its own obligations. The decision belongs to the people who own privacy and is recorded either way, so that an absence of content is a documented choice.

**Length against minimisation.** A longer period answers more questions and holds more data. It follows the longest regime the enterprise has decided applies, and it is tested by retrieving the oldest record.

**Coverage against cost.** Full capture on every system is rarely proportionate. Scope follows consequence, starting with systems that make or shape decisions about people, money or safety.

## What this means for assurance

An audit is a reading of a record that either exists or does not. The work that determines the result is done in the months when nobody is asking. Its unit is each kind of evidence, held with its date, its version and the event that will expire it.

In assurance terms, a system with no current operating evidence is Unassured. That is a statement about knowledge and not about fault. The state moves to Assured when evidence is retained, a sampled output can be followed through the records by someone who did not build the system, and each expiry event triggers fresh evidence. The continuing position on inventory, oversight and retention is held under [AI Governance Assurance](/ai-governance-assurance).

Reconstruction answers the question an examiner asked. Retention answers the ones that have not been asked yet.
