---
title: AI Governance Assurance
h1: Show that AI governance is operating, not only documented
seoTitle: "AI Governance Assurance: Operating Evidence | Xyvionix"
description: >-
  Operating evidence behind AI governance commitments: a current inventory,
  oversight that intervenes, retained logs and incident records, held against
  dated obligations.
summary: >-
  A framework states the obligation. Assurance produces the evidence that it is
  met today: the inventory is complete, overseers can and do intervene, logs are
  retained and incidents are attributable inside the reporting window.
lede: >-
  AI governance assurance is the continuing proof that the commitments in an AI
  policy are being met by the systems in production today. It tests four things
  the policy can only assert: that the inventory matches what is running, that
  the people assigned to oversee a system can and do intervene, that operation
  is recorded and retained, and that an incident can be detected and attributed
  inside the period the applicable rules allow.
ogQuestion: 'Is governance evidenced by the system, or only by the policy?'
kind: child
cluster: ai
secondary: []
parent: ai-assurance
state: assured
audience:
  - AI Governance
  - Technology Risk
  - CISO
  - General Counsel office
intent: 'Commercial: operating evidence behind AI governance commitments'
related:
  assurance:
    - llm-evaluation-assurance
    - ai-security-assurance
    - ai-observability-assurance
  useCases:
    - ai-audit-readiness
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
  - name: AI system inventory
    detail: >-
      Every AI system and agent in production with its owner, purpose, model
      version, the decisions it informs and its risk classification, including
      the version of the guidance the classification relied on.
  - name: Obligation register
    detail: >-
      Each regulatory and contractual obligation the enterprise has decided
      applies, with the instrument, the application date, the systems in scope
      and the date the entry was last reviewed.
  - name: Oversight assignment record
    detail: >-
      The named person overseeing each system, with evidence that they are
      still in role and hold the training and authority the assignment assumes.
  - name: Intervention record
    detail: >-
      Overrides, rejections and stops made by overseers, together with dated
      tests showing that the override and stop functions work.
  - name: Operating logs and retention
    detail: >-
      Coverage of automatically recorded events for each system and the
      retention period applied, compared with the longest period that any
      applicable regime requires.
  - name: Incident and decision-review record
    detail: >-
      Each incident and each request for review of an automated decision, with
      the time of occurrence, detection, attribution and response.
  - name: Supplier evidence
    detail: >-
      The model provider's documentation for the exact model version in
      production, refreshed when the version changes.
thresholds:
  - signal: Systems in production without an inventory record
    basis: Every obligation is scoped from the inventory, so a missing system is outside all of them
    lostWhen: Discovery finds an AI system or agent in production that the inventory does not list
  - signal: Obligation register currency
    basis: The rate at which the instruments the enterprise is subject to are amended
    lostWhen: An entry cites a superseded instrument or date, or has passed its review date
  - signal: Overseer in role with authority
    basis: The oversight commitments the enterprise has made for each system
    lostWhen: A system's named overseer has left the role, or cannot override or stop the system in a test
  - signal: Log retention period
    basis: >-
      The longest retention requirement among applicable regimes. The EU AI Act
      sets at least six months for high-risk system logs and Colorado SB26-189
      sets at least three years for compliance records
    lostWhen: Logs for any in-scope system are retained for less than the governing period or have gaps in coverage
  - signal: Time from occurrence to attribution
    basis: The shortest reporting or response period that applies to the system
    lostWhen: Detection and attribution together consume more of the period than the agreed share
  - signal: Supplier documentation version
    basis: Documentation describes one model version
    lostWhen: The model version in production differs from the version the held documentation describes
faqs:
  - q: The EU AI Act high-risk dates moved. Can the work wait?
    a: >-
      The amending regulation moved the application date for Annex III systems
      to 2 December 2027. It did not change the kind of evidence expected. Logs,
      monitoring data and oversight records cannot be created retrospectively
      for operation that has already happened, and evidence prepared for the
      original date will be more than a year old at application unless it is
      kept current.
  - q: Does a management system certificate provide this evidence?
    a: >-
      ISO/IEC 42001 addresses the AI management system and is assessed through
      periodic, sampled audits. It does not state how a specific AI system
      behaved on a given day. Between audits the organisation carries the burden
      of showing that the system still conforms, and that is the period
      continuous assurance covers.
  - q: Does Xyvionix decide which regulations apply to a system?
    a: >-
      No. Xyvionix gives no legal or regulatory advice. The enterprise and its
      advisers decide which obligations apply and how a system is classified.
      Xyvionix tests whether the operating evidence those decisions depend on
      exists, is current and is complete.
sources:
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'European Commission: AI Omnibus enters into force'
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force'
  - title: 'EU AI Act Service Desk: implementation timeline'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act'
  - title: 'Regulation (EU) 2024/1689 (AI Act), Official Journal'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689'
  - title: 'EU AI Act Service Desk: Article 14, human oversight'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14'
  - title: 'EU AI Act Service Desk: Article 26, obligations of deployers'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26'
  - title: 'EU AI Act Service Desk: Article 73, reporting of serious incidents'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-73'
  - title: 'European Commission: guidelines for high-risk AI systems'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems'
  - title: 'European Commission: General-Purpose AI Code of Practice'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai'
  - title: 'Colorado SB26-189'
    url: 'https://leg.colorado.gov/bills/sb26-189'
  - title: 'California Privacy Protection Agency: ADMT, risk assessment and cybersecurity audit regulations'
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html'
  - title: 'OAIC: consultation on guidance for transparency in automated decision-making'
    url: 'https://www.oaic.gov.au/engage-with-us/consultations/consultation-on-guidance-for-transparency-in-automated-decision-making'
  - title: 'OCC Bulletin 2026-13: model risk management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
  - title: 'FCA: AI approach'
    url: 'https://www.fca.org.uk/firms/innovation/ai-approach'
  - title: 'NIST AI Risk Management Framework'
    url: 'https://www.nist.gov/itl/ai-risk-management-framework'
  - title: 'ISO/IEC 42001:2023'
    url: 'https://www.iso.org/standard/42001'
  - title: 'Microsoft Agent 365 general availability'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/'
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

A governance framework is written at a point in time and describes the estate as it was understood then. The estate and the obligations both move afterwards, and the policy does not record either movement.

**The inventory falls behind.** New assistants and agents are deployed by teams that do not think of themselves as deploying AI systems. Microsoft Agent 365, generally available since 1 May 2026, includes discovery of unmanaged local agents, which exists as a feature because such agents exist in volume. Every governance commitment is scoped from the inventory, so a system missing from it is outside all of them.

**The obligations change.** The EU AI Act was amended by Regulation (EU) 2026/1744, in force since 27 July 2026, which moved the application dates for high-risk obligations. Colorado repealed and re-enacted its provisions through SB26-189, signed on 14 May 2026. US banking supervisors replaced their 2011 model risk guidance on 17 April 2026. An obligation register compiled in 2025 now cites dates and instruments that are no longer correct.

**People move.** Oversight is assigned to named individuals. When an overseer changes role, the assignment stays in the document and the oversight stops.

**The system changes under its classification.** A risk classification describes a purpose and a model. A new use of the same assistant, or a new model version behind it, can make the classification and the supplier documentation describe something that is no longer in production.

## What is at stake

Governance without operating evidence fails at the moment it is examined. A regulator, an auditor or a customer asks for proof that a control worked during a specific period. If the proof was not recorded at the time, it cannot be produced later.

The consequence is sharper because several regulators have chosen not to write AI rulebooks. The FCA states that it does not plan to introduce extra regulations for AI and relies on existing frameworks. OCC Bulletin 2026-13 states that generative AI and agentic AI models are not within the scope of the revised model risk guidance. Where no checklist exists, the enterprise's own documented standard, and its proof of meeting that standard, is what gets assessed.

Timing is the second exposure. Reporting and response periods start when an event occurs or is recognised, so every day taken to detect and attribute an incident is a day removed from the period available to respond.

## What Xyvionix assures

Xyvionix holds six statements as current facts, each tested against a threshold agreed with the business. The enterprise decides which obligations apply. Xyvionix tests whether the evidence behind them exists and is current.

1. **The inventory matches production.** Systems found by discovery are reconciled against the inventory, and the difference is the first number reported.
2. **The obligation register is current.** Each entry names its instrument and application date and has been reviewed since that instrument last changed.
3. **Oversight is assigned to someone who can act.** The named overseer is in role, has the training the assignment assumes and holds the authority to override.
4. **Oversight intervenes.** Override and stop functions have been tested, and the record of real interventions shows decisions being made. How that is measured is set out in [human oversight evidence](/human-oversight-evidence).
5. **Operation is recorded and retained.** Log coverage is complete for in-scope systems and retention meets the longest applicable period.
6. **Incidents are attributable in time.** An event can be traced to a system, a model version and an owner quickly enough to leave the reporting period usable.

The quality of what a system produces is held separately in [LLM Evaluation Assurance](/llm-evaluation-assurance). The telemetry that these records depend on is covered by [AI Observability Assurance](/ai-observability-assurance).

## Common failure modes

- **The inventory as a project deliverable.** It was complete on the day the governance programme closed and has not been reconciled with production since.
- **Oversight by job title.** The policy assigns oversight to a role. Nobody can name the person, or the person named has never used the override.
- **A stop function that has never been pressed.** The design includes a means to interrupt the system. No test shows that it works on the current version.
- **Classification without a version.** A system was classified against draft guidance. The record does not say which draft, so nobody knows whether the final text changes the answer. The Commission's draft guidelines on high-risk classification were in targeted consultation until 23 July 2026 and had not been adopted in final form at the date of this review.
- **Supplier documentation for a previous model.** The file holds the provider's documentation for the version that was evaluated, not the version now serving requests.
- **Literacy recorded as attendance.** Training completion is logged once. The Omnibus rewrote Article 4 as a duty to take measures to support staff AI literacy. A dated attendance list does not show which measures are in place for the people who oversee systems today.

## Corrective ownership

When a threshold is breached the state moves to At risk. Where no current evidence exists, for example an overseer assignment that has never been tested, the state is Unassured and is treated as a condition to correct. Xyvionix owns corrective action through to completion within the access it has been granted. Decisions that belong to the enterprise stay with the enterprise.

Xyvionix reconciles the inventory, closes logging gaps, extends retention, runs the override and stop tests and rebuilds the link between an incident record and the system version involved. The enterprise decides how a newly discovered system is classified, who the overseer is and whether an obligation applies. Where such a decision is pending, the item is held open against a named decision owner with a date, so that an undecided question does not pass for a closed one.

When an instrument changes, the register entry is updated and every system in its scope is re-checked against the new text or date.

## Verified closure

Closure is recorded when re-testing shows the condition is gone. An updated document is not closure.

For the inventory, closure means a fresh discovery run finds no system that the inventory does not list. For oversight, it means the named person used the override or stop function on the current version in a test, and the system responded. For retention, it means a record from the start of the required period can be retrieved and read, since a retention setting proves intent and a retrieved record proves the outcome. For incident attribution, it means a sampled event was traced to a system, a model version and an owner within the agreed share of the reporting period.

## Regulatory and industry context

The dates below are stated as published. They are not legal advice, and which of them apply to a given system is a decision for the enterprise and its advisers.

| Date | What applies | Instrument |
|---|---|---|
| 2 August 2026 | General application, including Article 50 transparency rules | EU AI Act |
| 2 December 2026 | Prohibitions added by the Omnibus; Article 50(2) marking for generative systems already on the market before 2 August 2026 | EU AI Act as amended by Regulation (EU) 2026/1744 |
| 10 December 2026 | Privacy policies must describe automated decisions that could significantly affect individuals | Australian Privacy Act amendments |
| 1 January 2027 | Operative duties, including the right to request meaningful human review | Colorado SB26-189 |
| 1 January 2027 | Compliance with automated decision-making technology requirements | California CCPA regulations |
| 2 December 2027 | High-risk obligations for Annex III systems | EU AI Act as amended |
| 2 August 2028 | High-risk obligations for systems in Annex I regulated products | EU AI Act as amended |

Several of these expectations describe continuing activity. In the 2024 text of the AI Act, Article 9 describes risk management as a continuous iterative process run throughout the lifecycle, Article 12 requires automatic recording of events over the lifetime of a high-risk system, and Article 14 requires that overseers are able to override and interrupt it. Article 73 sets serious incident reporting periods of 15 days, 10 days in the event of death and 2 days for a widespread infringement or a critical infrastructure incident. The Omnibus amendments to these articles were not reviewed line by line for this page, so the amended text should be checked before relying on detail. The Commission's guidance on post-market monitoring is due by 2 September 2027, three months before the Annex III date.

Voluntary frameworks are also moving. NIST states that AI RMF 1.0 is being revised, and no revised version has been published.

Sector positions differ. US banks hold generative AI outside agency model risk guidance, as described in [Financial Services AI Assurance](/financial-services-ai-assurance). Insurers face human review and explanation duties on adverse decisions, covered in [Insurance Claims AI Assurance](/insurance-claims-ai-assurance). The scenario of preparing for an examination is set out in [AI Audit Readiness](/ai-audit-readiness).
