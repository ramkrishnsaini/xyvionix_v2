---
title: Insurance Claims AI Assurance
h1: Show how each automated claim decision was made, reviewed and paid
seoTitle: 'Insurance Claims AI Assurance: Decisions on Record | Xyvionix'
description: >-
  Continuing proof for AI in claims triage, assessment and settlement: decision
  reconstruction, extraction accuracy, effective human review and outcome
  monitoring.
summary: >-
  A claim decision is a chain of automated and human steps that may be disputed
  years later. Assurance holds the chain on record, measures extraction and
  review quality, re-tests after model change and compares outcomes across
  customer groups.
lede: >-
  Insurance claims AI assurance is the continuing proof that each automated
  step in a claim can be reconstructed, that the person reviewing it made a
  real decision, and that outcomes stay fair as models and documents change.
  Claims carry fair-treatment obligations and long dispute tails, so the
  evidence has to be recorded when the decision is made and tested for
  retrieval afterwards. It is re-proven when a model, a prompt, a rule or the
  mix of incoming documents changes.
ogQuestion: Can every automated claim decision still be reconstructed?
kind: industry-use-case
industry: insurance
cluster: industry
secondary:
  - ai
  - data
parent: insurance
state: assured
audience:
  - Head of Claims
  - Head of AI
  - Technology Risk
  - Compliance
intent: >-
  Industry + assurance: assurance for AI used in claims triage, assessment and
  settlement
related:
  assurance:
    - ai-governance-assurance
    - model-change-assurance
    - llm-evaluation-assurance
    - ai-agent-assurance
  useCases:
    - ai-audit-readiness
    - model-provider-migration
    - ai-agent-with-write-access
  technologies:
    - aws-bedrock-assurance
    - azure-ai-assurance
  industries:
    - insurance
    - financial-services-ai-assurance
  insights:
    - human-oversight-evidence
    - ai-audit-evidence-requirements
    - model-retirement-is-a-production-change
evidence:
  - name: Claim decision chain
    detail: >-
      For each claim, every automated and human step in order: documents
      received, values extracted, scores and recommendations with their model
      and rule versions, routing, review, decision and payment.
  - name: Extraction accuracy results
    detail: >-
      Accuracy measured per field and per document type on samples of
      production documents, checked against the source document by a person.
  - name: Reviewer decision record
    detail: >-
      For each reviewed claim, the reviewer's identity, what they were shown,
      what they decided, the time taken and whether the recommendation was
      changed.
  - name: Reviewer competence and authority
    detail: >-
      Who is assigned to review which decisions, the training they have
      received on the system's limits, and their authority to override it.
  - name: Claims regression results
    detail: >-
      The outcome of re-running a fixed set of past claims on each new model,
      prompt or rule version, with every changed outcome listed.
  - name: Outcome monitoring by customer group
    detail: >-
      Denial, settlement, referral, delay and complaint rates compared across
      customer groups over time, with each investigated difference recorded.
  - name: Adverse decision explanations
    detail: >-
      The explanation given to the customer for each adverse decision, the
      date it was given and the record it was drawn from.
thresholds:
  - signal: Reconstruction of sampled adverse decisions
    basis: The period over which a claim may be reopened, disputed or examined, as determined by the insurer
    lostWhen: A sampled decision cannot be reconstructed from records alone within the agreed time
  - signal: Extraction accuracy on critical fields
    basis: The consequence of an error in that field for cover, amount or payee
    lostWhen: Sampled accuracy falls below the agreed floor, or a new document type enters production without a baseline
  - signal: Review effectiveness
    basis: The consequence of the decision under review and the workload that still permits a real decision
    lostWhen: Override rate and time per review show recommendations being accepted without examination
  - signal: Consistency across model change
    basis: A claim should not be decided differently because of the date it was processed
    lostWhen: A new version changes outcomes on the regression set and the changes have not been reviewed and accepted
  - signal: Outcome differences between customer groups
    basis: The insurer's fair-treatment obligations and its own measured baseline
    lostWhen: A difference in denial, settlement or delay persists beyond the agreed window without an investigated explanation
faqs:
  - q: Does a human reviewer make an automated claim decision sound?
    a: >-
      Only if the review is effective. Whether a process meets a legal test
      is a matter for the insurer and its advisers. The evidence question is
      whether the reviewer saw the source material, had time and authority to
      disagree, and sometimes did. A reviewer who accepts every
      recommendation within seconds has recorded a click.
  - q: Does New York's Circular Letter No. 7 cover claims?
    a: >-
      No. New York DFS Insurance Circular Letter No. 7 (2024), issued on 11
      July 2024, covers AI systems and external consumer data in
      underwriting and pricing only. The NAIC model bulletin does list claim
      administration and payment among the uses an insurer's AI programme
      should address.
  - q: Is claims AI high-risk under the EU AI Act?
    a: >-
      Classification is a decision for the insurer and its advisers. As
      published, Annex III point 5(c) lists AI systems intended for risk
      assessment and pricing in relation to natural persons in life and
      health insurance. Claims handling is not listed in that point. The
      EIOPA Opinion of 6 August 2025 sets expectations under existing
      insurance law for systems that are neither prohibited nor high-risk.
sources:
  - title: 'NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers'
    url: 'https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf'
  - title: 'NAIC: adoption map for the Model Bulletin on the Use of AI Systems by Insurers'
    url: 'https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf'
  - title: 'New York DFS Insurance Circular Letter No. 7 (2024)'
    url: 'https://www.dfs.ny.gov/industry-guidance/circular-letters/cl2024-07'
  - title: 'EIOPA publishes Opinion on AI governance and risk management'
    url: 'https://www.eiopa.europa.eu/eiopa-publishes-opinion-ai-governance-and-risk-management-2025-08-06_en'
  - title: 'EIOPA Opinion on artificial intelligence governance and risk management'
    url: 'https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en'
  - title: 'FCA: approach to AI'
    url: 'https://www.fca.org.uk/firms/innovation/ai-approach'
  - title: 'Regulation (EU) 2016/679 (GDPR), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679'
  - title: 'California SB 1120 (Chapter 879, Statutes of 2024)'
    url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120'
  - title: 'Colorado SB26-189: Automated Decision-Making Technology'
    url: 'https://leg.colorado.gov/bills/sb26-189'
  - title: 'EU AI Act Service Desk: Article 14, human oversight'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14'
  - title: 'Regulation (EU) 2024/1689 (AI Act), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689'
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'APRA letter to industry on artificial intelligence'
    url: 'https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai'
  - title: 'California Privacy Protection Agency: regulations on automated decision-making technology'
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Operational risk in claims

The claim is where the policy is tested. AI can now appear at each step of it: triage at first notification, extraction from documents, the cover check, the fraud referral, the estimate of value, the settlement offer and the payment. Each step can be sound and the claim can still be decided wrongly, because an error early in the chain is carried forward by everything after it.

The decisions that will be examined are the adverse ones: a denial, a reduced settlement, a referral for investigation, a delay. They are examined late. A claim closed this year can be reopened, complained about or litigated well after the models that handled it have been replaced.

Claims automation sits inside existing conduct obligations. The NAIC model bulletin cites the Unfair Claims Settlement Practices Model Act (#900) and says AI-supported decisions are subject to investigation, including market conduct actions. In Xyvionix's view, rules are more developed for pricing than for claims, so the evidence standard for claims is being set by insurers themselves and tested in complaints and disputes.

## Decision reconstruction

Reconstruction means that for one claim, chosen by someone else, the insurer can show from records alone what happened at each step. The list is specific.

- The documents received, and the values extracted from each.
- The model, prompt and rule versions that produced each score or recommendation.
- The route the claim took and the reason for it.
- What the reviewer was shown, what they decided and how long they took.
- What was paid, to whom, and on whose authority.

The chain usually breaks at the joins. The document platform, the claims system, the model endpoint and the payment system each hold part of the story under a different identifier. A recommendation is stored without the version that made it. A reviewer's decision is stored as a status change with no record of what was on the screen.

The test is retrieval. A person who did not build the system takes a sample of adverse decisions from a past period and tries to rebuild each one, and the time taken is recorded. How that rehearsal is run is described in [AI Audit Readiness](/ai-audit-readiness). The wider question of keeping model and data versions for underwriting and pricing is covered on the [insurance](/insurance) page.

## Document extraction accuracy

A claim is assessed from documents: invoices, repair estimates, medical reports, incident reports, photographs. Extraction turns them into the fields that every later step relies on. An extraction error is silent. A misread amount, a wrong date of loss or a missed exclusion clause passes to a model that then behaves exactly as designed on the wrong input.

Accuracy is a property of a field on a document type, and an average hides the failures that matter. The date of loss decides whether cover applies. The amount decides what is paid. The payee decides who receives it. Thresholds are set per field by that consequence.

The evidence expires when the documents change, and they change without notice. A repair network adopts a new invoice layout. A medical provider sends scans where it used to send text. A new region brings a new language. Accuracy measured on last year's mix does not describe this year's. The measurement is therefore taken on samples of current production documents, checked against the source by a person, and a document type with no baseline is treated as Unassured.

## Human review that reviews

Several instruments describe human review of automated decisions. The descriptions share one feature: the review has to be real.

| Instrument | Dated fact | What it says about review |
|---|---|---|
| GDPR Article 22 | Applies since 25 May 2018 | A right not to be subject to a decision based solely on automated processing that produces legal or similarly significant effects. Where the contract or consent exceptions are used, at least the right to obtain human intervention, to express a point of view and to contest the decision |
| California SB 1120 | Approved 28 September 2024 | For health care service plans and disability insurers using AI in utilisation review: "A determination of medical necessity shall be made only by a licensed physician or licensed health care professional" |
| Colorado SB26-189 | Operative requirements from 1 January 2027 | A right to request meaningful human review and reconsideration after an adverse consequential decision |
| EIOPA Opinion | 6 August 2025 | Expects sufficient staff training for effective human oversight of AI systems that are neither prohibited nor high-risk |
| EU AI Act Article 14 | Applies to Annex III high-risk systems from 2 December 2027 | Overseers must be able to understand limitations, stay aware of automation bias, override and interrupt |

The GDPR wording above is the EU text and is not a description of UK law. Article 14 applies to high-risk systems, and claims handling is not listed in Annex III point 5(c). Xyvionix gives no legal advice on which of these apply.

The assurance question is whether review intervenes. Four measurements answer it: how often the reviewer changes the recommendation, how long each review takes, how many reviews one person completes in a shift, and what a second reviewer finds on a sample of accepted cases. Review quality is most exposed at peak claim events, when volume is highest and the pressure to clear the queue is greatest. The method is set out in [human oversight evidence](/human-oversight-evidence).

## Drift after model change

A claims model changes more often than its owners expect. The provider updates or retires a version. A prompt is edited to fix one class of error. A fraud rule is added after a loss. Each change can alter the outcome for claims that are nothing to do with its purpose.

Claims also straddle changes. A claim triaged by one version may be settled by the next, so two customers with the same loss can be treated differently because of the week in which each step ran.

The control is a fixed regression set of past claims with known, reviewed outcomes. It includes denials, borderline cover decisions and poor-quality documents. It is re-run on every change, and each changed outcome is examined before the new version handles live claims. What obliges a re-run is covered in [Model Change Assurance](/model-change-assurance), and a planned move between providers in [Model Provider Migration](/model-provider-migration).

## Outcome monitoring across customer groups

A claims process can be accurate on average and still treat some customers worse. The FCA plans no AI-specific rules and applies the Consumer Duty and the Senior Managers and Certification Regime to AI use. In Xyvionix's view that places the weight on outcomes observed over time, which for automated claims means comparing results across customer groups.

The comparisons are practical ones: the rate of denial, the settlement paid against the amount claimed, the time to settle, the rate of referral for investigation and the rate of complaint. A difference is a signal to investigate. It may have a sound explanation in the mix of claims. It is recorded with the explanation found, or it is corrected.

This depends on data kept in a usable form. If decisions are stored as free text in a claim note, or the group attributes needed for comparison are held in a system that cannot be joined to the claim, the monitoring cannot be run. APRA's letter to industry of 30 April 2026, which applies to insurers, expects "continuous validation or monitoring" and controls that detect drift.

## Regulatory and audit context

The NAIC model bulletin, adopted on 4 December 2023, is the main US reference for claims. Section 1.6 lists claim administration and payment among the uses an insurer's AI programme should address. The NAIC map shows 26 adopting jurisdictions as of 31 August 2026, and states that it does not determine whether each enactment contains all elements of the model.

Timed duties are arriving. Colorado SB26-189 requires a plain-language explanation within 30 days of an adverse outcome and records kept for at least three years, from 1 January 2027. Compliance with California's automated decision-making technology regulations is required from the same date. An explanation produced inside a fixed period has to be drawn from a record that already exists.

Each of these expectations continues after launch: a programme maintained, outcomes monitored, records retained, review kept effective. A fairness test or validation completed before go-live is evidence about the system on that day.

## Reliability, identity and cost

An agent that can approve a settlement or release a payment acts in a system of record. It needs its own identity, a scope limited to the claims it handles and an approval step placed on the actions that carry consequence. The scenario is described in [AI Agent With Write Access](/ai-agent-with-write-access).

The saving from claims automation is mostly reviewer time, which creates pressure to review less. The review rate is a threshold, set by the consequence of a wrong decision reaching a customer. If it is set by the capacity available that week, the control has been resized to fit the queue.
