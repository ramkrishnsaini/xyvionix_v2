---
title: Financial Services AI Assurance
h1: Validation assumed the model would stand still. Generative and agentic AI do not
seoTitle: 'Financial Services AI Assurance: Model Risk Evidence | Xyvionix'
description: >-
  Continuing proof for generative and agentic AI in banks and payment firms:
  monitoring, outcome analysis, supplier model change and attributable agent
  actions.
summary: >-
  Model risk practice validates a fixed model on a cycle. Hosted generative
  models and agents change between cycles, so validation, monitoring and the
  action record have to be held as current evidence against the firm's own
  standard.
lede: >-
  Financial services AI assurance is the continuing proof that a generative or
  agentic system still meets the standard the firm set for it, on the model
  version that is answering today. Model risk practice was designed for models
  that stay fixed between reviews. A hosted model changes on its provider's
  calendar and an agent takes actions, so the validation result, the monitoring
  record and the record of who authorised each action have to be re-proven
  whenever the system changes.
ogQuestion: Does the AI still meet model risk expectations today?
kind: industry-use-case
industry: financial-services
cluster: industry
secondary:
  - ai
parent: financial-services
state: assured
audience:
  - Head of AI
  - Model Risk
  - Technology Risk
  - CISO
intent: >-
  Industry + assurance: AI assurance where model risk management and conduct
  obligations apply
related:
  assurance:
    - ai-assurance
    - ai-governance-assurance
    - llm-evaluation-assurance
    - ai-agent-assurance
    - model-change-assurance
  useCases:
    - ai-audit-readiness
    - ai-agent-with-write-access
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
  industries:
    - financial-services
    - insurance-claims-ai-assurance
  insights:
    - ai-audit-evidence-requirements
    - why-ai-evaluation-fails-after-launch
    - ai-agent-permission-risk
evidence:
  - name: AI system inventory
    detail: >-
      Every generative and agentic system in a customer, credit or payment
      process, including those held outside the formal model inventory, with
      owner, purpose, risk classification and the model version in use.
  - name: The firm's own standard
    detail: >-
      The documented standard the firm applies to generative and agentic AI,
      with its thresholds, its accountable owner and the date it was last
      reviewed against changes in guidance.
  - name: Version-bound validation results
    detail: >-
      Each validation or evaluation result stored with the model version,
      prompt, retrieval source and tool set it was taken on, so that it can
      be matched to what is running.
  - name: Production monitoring and outcome analysis
    detail: >-
      Graded samples of production output, together with what followed each
      sampled interaction: complaint, correction, reversal or human override.
  - name: Supplier model record
    detail: >-
      For each hosted model, the provider's documentation for the version in
      production, its published retirement date and the tested alternative.
  - name: Agent action and approval record
    detail: >-
      Each action an agent takes in a customer or payment process, linked to
      the agent's identity, the person who authorised it where approval is
      required, and the result in the system of record.
  - name: Decision record
    detail: >-
      For decisions that affect a customer, the inputs, the system version,
      the human involvement and the outcome, retained for the longest period
      that applies to the firm.
thresholds:
  - signal: AI systems outside the inventory
    basis: Every system in a customer, credit or payment process needs an owner and a risk classification
    lostWhen: A generative or agentic system is found in production without an inventory record
  - signal: Validation currency
    basis: A validation result applies to the configuration it was taken on
    lostWhen: The model, prompt, retrieval source or tool set in production differs from the validated configuration
  - signal: Quality of sampled production output
    basis: The error rate the customer process can absorb, set by the accountable owner
    lostWhen: The sampled rate falls below the agreed floor for consecutive measurement windows
  - signal: Downstream corrections
    basis: The complaint, reversal and override rates recorded for the process before the system was introduced
    lostWhen: Corrections attributable to the system rise above the agreed level
  - signal: Attributable agent actions
    basis: The authorisation and segregation of duty rules of the process the agent acts in
    lostWhen: Any action in a customer or payment process cannot be traced to an agent identity and an authorisation
  - signal: Record retrieval
    basis: The longest retention period that applies to the firm
    lostWhen: A sampled decision from the start of the period cannot be retrieved with its system version
faqs:
  - q: Does the 2026 US model risk guidance cover generative AI?
    a: >-
      No. The Federal Reserve, the OCC and the FDIC issued Revised Guidance on
      Model Risk Management on 17 April 2026. Federal Reserve SR 26-2
      supersedes SR 11-7. OCC Bulletin 2026-13 states that generative AI and
      agentic AI models are not within the scope of the guidance, and the
      agencies plan a request for information on banks' use of AI. How a bank
      responds is a matter for the bank and its advisers.
  - q: The firm validates models before deployment. Why does a hosted model need more?
    a: >-
      Pre-deployment validation describes one version with one prompt, one
      retrieval source and one tool set. A hosted model is retired or updated
      by its provider, and the surrounding configuration is changed by the
      firm's own teams. Each change produces a system that the validation did
      not examine.
  - q: Does assurance replace independent model validation?
    a: >-
      No. The model risk function sets the standard and challenges the
      results. Assurance keeps the evidence behind that standard current
      between validation cycles and owns the correction when a threshold is
      breached.
sources:
  - title: 'Federal Reserve SR 26-2: Revised Guidance on Model Risk Management'
    url: 'https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm'
  - title: 'OCC Bulletin 2026-13: Model Risk Management, revised guidance'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
  - title: 'PRA SS1/23: Model risk management principles for banks'
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss'
  - title: 'FCA: approach to AI'
    url: 'https://www.fca.org.uk/firms/innovation/ai-approach'
  - title: 'FCA speech: long-term review into AI and retail financial services'
    url: 'https://www.fca.org.uk/news/speeches/fca-long-term-review-ai-retail-financial-services-designing-unknown'
  - title: 'OSFI Guideline E-23: Model Risk Management'
    url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027'
  - title: 'APRA letter to industry on artificial intelligence'
    url: 'https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai'
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'Regulation (EU) 2024/1689 (AI Act), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689'
  - title: 'FSB consultation report: Sound Practices for Responsible Adoption of AI'
    url: 'https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/'
  - title: 'FSB: Monitoring Adoption of AI and Related Vulnerabilities in the Financial Sector'
    url: 'https://www.fsb.org/2025/10/monitoring-adoption-of-artificial-intelligence-and-related-vulnerabilities-in-the-financial-sector/'
  - title: 'Colorado SB26-189: Automated Decision-Making Technology'
    url: 'https://leg.colorado.gov/bills/sb26-189'
  - title: 'California Privacy Protection Agency: regulations on automated decision-making technology'
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html'
  - title: 'OAIC: consultation on guidance for transparency in automated decision-making'
    url: 'https://www.oaic.gov.au/engage-with-us/consultations/consultation-on-guidance-for-transparency-in-automated-decision-making'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Where model risk practice strains

Model risk management grew up around a model the firm builds or buys, validates independently, records in an inventory and reviews on a cycle. Between reviews the model is assumed to be fixed. Generative and agentic systems break that assumption in three ways.

**The firm does not set the date of change.** A hosted model is retired or updated on its provider's calendar. The validation report stays on file and describes a version that may no longer be answering.

**The model is one part of the system.** Behaviour comes from the base model, the prompt, the retrieval source, the tools and the filters around them. A change to the product terms in a retrieval index alters what a customer is told as surely as a change of model. Validation that names only the model has examined one component.

**The output is not a score.** A credit model produces a number that can be compared with what later happened. An assistant produces a sentence, and an agent produces an action. Outcome analysis has to be rebuilt around what followed the interaction: a complaint, a correction, a reversed transaction, a human override.

The consequence in this sector is specific. A customer acts on a wrong statement about a fee or a rate. A payment is initiated that nobody with authority approved. A credit decision is challenged and the firm cannot say which version of the system made it.

## The supervisory position, with dates

In the United States the long-standing guidance has been replaced. On 17 April 2026 the Federal Reserve, the OCC and the FDIC issued Revised Guidance on Model Risk Management. Federal Reserve SR 26-2 supersedes SR 11-7 and SR 21-8 and addresses banking organisations with over $30 billion in total assets. OCC Bulletin 2026-13 rescinds OCC Bulletin 2011-12 and the Model Risk Management booklet of the Comptroller's Handbook.

The replacement sets generative and agentic systems aside. The OCC bulletin states: "Generative AI and agentic AI models are novel and rapidly evolving. As such, they are not within the scope of this guidance." The agencies plan a request for information on banks' use of AI. A policy that cites SR 11-7 as governing guidance cites a superseded letter, and one that treats the 2026 guidance as covering a language model assistant misreads its scope.

Other supervisors have taken different routes.

| Supervisor | Dated fact | Position |
|---|---|---|
| PRA, SS1/23 | In effect since 17 May 2024. Current version effective 23 April 2026 | Applies to firms with internal model approval. Expressly covers AI and machine learning techniques |
| FCA | Page updated 13 February 2026 | "We do not plan to introduce extra regulations for AI." Relies principally on the Consumer Duty and the Senior Managers and Certification Regime |
| OSFI, Guideline E-23 | Published 11 September 2025. Takes effect 1 May 2027 | Inventory that is "accurate, evergreen, and subject to robust controls". Monitoring standards "covering frequency, scope, and evaluation criteria" |
| APRA, letter to industry | 30 April 2026 | Expects "continuous validation or monitoring" and controls that detect drift and control breakdowns |
| EU AI Act, Annex III point 5(b) | High-risk obligations apply from 2 December 2027 | AI used to evaluate creditworthiness or establish a credit score of natural persons is high-risk, fraud detection excepted |
| Financial Stability Board | Consultation report of 10 June 2026. Comments closed 22 July 2026 | 12 sound practices covering generative and agentic AI. A consultation, with no final report date given |

Xyvionix gives no legal or regulatory advice. Which of these apply to a firm is a decision for the firm and its advisers.

Several of these expectations are written as continuing activity. APRA's phrase is "continuous validation or monitoring". OSFI's inventory is "evergreen". In the 2024 text of the EU AI Act, Article 9 describes risk management for high-risk systems as "a continuous iterative process", Article 12 requires automatic recording of events over the lifetime of the system, and Articles 19 and 26 require logs to be kept for at least six months. How the obligation register and oversight assignments are kept current is covered in [AI Governance Assurance](/ai-governance-assurance).

In Xyvionix's view the absence of a rulebook raises the evidential burden. Where guidance leaves a class of system out, the firm's own standard is what remains to be examined, and a standard with no operating evidence behind it is a statement of intent.

## Ongoing monitoring and outcome analysis

Monitoring a generative system means grading what it produced in production, on a sample large enough to detect movement, against criteria the accountable owner has agreed. The criteria belong to the process. For a servicing assistant they include whether each statement about a product, fee or rate matches the current terms.

Outcome analysis then asks what happened next. Interactions are joined to complaints, corrections, reversals and overrides, so that the firm can see whether the system's errors reach customers and which customers they reach. The FCA relies on the Consumer Duty, so in the UK the measure is the outcome delivered.

Two properties make this evidence usable. Each graded sample carries the version of the model, prompt and retrieval source that produced it. And the grading method is itself kept stable, or re-baselined openly when it changes, so that a movement in the score reflects the system and not the measurement.

## Third-party model dependency

A firm that consumes a generative model as a hosted service depends on the provider for its behaviour and its availability. APRA's letter reports "heavy dependence on a single provider". The Financial Stability Board's report of 10 October 2025 on monitoring AI adoption examines AI-related third-party dependencies and provider concentration, and says authorities need to "address data gaps and develop more robust monitoring approaches".

For a single firm the dependency has three parts. The version in production has an end date set by the provider. The provider's documentation describes a specific version, and the file often holds the documentation for the one that was first evaluated. An exit to another model is a plan until the alternative has been run against the firm's own test set with the production prompt and tools.

Evidence therefore expires on the provider's schedule. The events that oblige re-validation, and how a replacement is tested before it carries production traffic, are covered in [Model Change Assurance](/model-change-assurance).

## Agent actions in customer and payment processes

Payment and servicing processes already have controls that predate AI: limits, dual authorisation, segregation between the person who makes an instruction and the person who checks it. An agent has to operate inside those controls. The common failure is an agent that runs under a staff member's credentials or a shared service account. The log then names an account, and maker and checker can no longer be told apart.

APRA's letter expects identity controls to cover "nonhuman actors such as AI agents". The FCA has framed the accountability question in its own terms. In a speech of 28 January 2026 on its long-term review of AI in retail financial services, it said the review does not change its regulatory approach, and asked what reasonable steps under the Senior Managers and Certification Regime look like "when the model updates weekly".

The evidence this implies is an action record in which one action resolves to one agent identity, one authorisation and one result in the system of record. Approval also has to be shown to work. An approval step that is granted every time, within seconds, is a recorded click. The continuing position on agent identity, scope and approval is covered in [AI Agent Assurance](/ai-agent-assurance).

## Data and decision records

Decision records cannot be created after the fact. The EU date for credit scoring systems is 2 December 2027, and the logs for a decision made before a logging capability existed will not exist. Other dates are nearer. Colorado SB26-189 has operative requirements from 1 January 2027, including a plain-language explanation within 30 days of an adverse outcome, a right to request meaningful human review and records retained for at least three years. Compliance with California's automated decision-making technology regulations is required from 1 January 2027. In Australia, from 10 December 2026, privacy policies must describe automated decisions that could significantly affect individuals.

Each of these rests on knowing which decisions are automated and being able to retrieve one. A record is proven retained when it has been retrieved.

Data currency matters as much as the record. An assistant that retrieves last quarter's rate sheet gives a fluent and wrong answer, and the model evaluation will not detect it because the model behaved as designed.

## Reliability, cost and change

An AI component in a customer or payment path inherits the tolerance of the service it sits in. The fallback has to be decided and tested: a queue, a person, or a second model. A fallback model that has never been evaluated is an unvalidated model that runs only on the firm's worst day.

Review is the main cost. If a person checks every output, the business case depends on reviewer time. If outputs are sampled, the sampling rate is a threshold, set by the consequence of an error reaching a customer. Both figures move when the model changes, which is why cost and quality are measured together on the version in production.

## Representative use cases

The scenario most firms meet first is an examination of a period that has already passed, described in [AI Audit Readiness](/ai-audit-readiness). The second is an agent given the ability to change records or move money, covered in [AI Agent With Write Access](/ai-agent-with-write-access). The wider resilience, third-party and access context for the sector is on the [financial services](/financial-services) page.
