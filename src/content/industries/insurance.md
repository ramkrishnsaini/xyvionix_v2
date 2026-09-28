---
title: Insurance
h1: An insurance decision has to be explained after its model and data have changed
seoTitle: 'Insurance: Continuous Technology Assurance | Xyvionix'
description: >-
  How insurers keep underwriting, pricing and claims decisions explainable:
  decision records, model and data versions, pricing data freshness and
  capacity at peak.
summary: >-
  A policy is priced today and questioned years later, after the model has been
  retrained and the data feed replaced. Assurance holds the decision record,
  the versions behind it, the freshness of pricing data and platform capacity
  at peak claim events.
lede: >-
  Insurers have to be able to explain an underwriting, pricing or claims
  decision long after the model and data that produced it have changed. That
  depends on records made at the time of the decision: the inputs, the model
  and rule versions, the data versions and the human involvement. Continuous
  assurance tests that those records exist and can be retrieved, that pricing
  data is as fresh as the risk requires, and that claims platforms hold at the
  volume of a peak event.
ogQuestion: Can a model decision be explained after the model has changed?
kind: primary
cluster: industry
secondary:
  - ai
  - data
parent: industries
state: assured
audience:
  - CIO
  - Chief Data Officer
  - Head of AI
  - Technology Risk
  - Chief Actuary office
intent: 'Industry: continuous technology assurance for insurers and intermediaries'
related:
  assurance:
    - ai-assurance
    - data-assurance
    - ai-governance-assurance
    - model-change-assurance
    - data-quality-assurance
  useCases:
    - ai-audit-readiness
    - data-pipeline-freshness-failure
    - schema-change-production-impact
    - model-provider-migration
  technologies:
    - databricks-data-assurance
    - snowflake-data-assurance
    - aws-bedrock-assurance
  industries:
    - insurance-claims-ai-assurance
    - financial-services
  insights:
    - ai-audit-evidence-requirements
    - model-retirement-is-a-production-change
    - data-freshness-ai-quality
evidence:
  - name: Decision record
    detail: >-
      For each underwriting, pricing and claims decision, the inputs as they
      stood at the time, the outcome, the reasons recorded and any human
      involvement, written when the decision was made.
  - name: Model and rule version register
    detail: >-
      Every model and rule set that has made decisions, including retired
      ones, with the dates each was in service and the evaluation result
      held for it.
  - name: Data version and lineage record
    detail: >-
      For each internal and external dataset used in rating, the version
      received, the date it arrived, its supplier and the transformations
      applied before it reached the model.
  - name: Pricing data freshness measurements
    detail: >-
      The age of each rating input at the point of quotation, measured in the
      pricing path and compared with the age agreed for that input.
  - name: Peak capacity and recovery test results
    detail: >-
      Results of load and recovery tests on claims notification, policy
      lookup and payment, run at the volume of the peak event the business
      plans for.
  - name: Programme operating record
    detail: >-
      Dated evidence that the testing, oversight and supplier review
      described in the insurer's written AI programme took place.
  - name: Supplier change notices
    detail: >-
      Notices of model, data and schema changes from vendors, with the date
      received and the test that followed each one.
thresholds:
  - signal: Decision reconstruction
    basis: The longest period over which a decision may be disputed or examined, as determined by the insurer
    lostWhen: A sampled decision cannot be reconstructed with the model and data versions that produced it
  - signal: Age of rating inputs at quotation
    basis: How quickly the underlying risk factor changes and the pricing error the portfolio can absorb
    lostWhen: An input older than its agreed age is used to price new business or renewals
  - signal: Untested change in a data feed
    basis: The meaning of each field used as a rating factor
    lostWhen: A change in schema, coding or distribution reaches the pricing model without a test
  - signal: Claims platform capacity at peak
    basis: The claim volume of the peak event the business plans for and the tolerance set for claims notification and payment
    lostWhen: Tested capacity or recovery time falls short, or the platform has changed materially since the test
  - signal: Third-party access
    basis: Access for intermediaries and suppliers is justified by a live relationship
    lostWhen: Access persists after the delegated authority or contract behind it has ended
faqs:
  - q: How long do decision records have to be kept?
    a: >-
      That depends on the regimes that apply, which is a matter for the
      insurer and its advisers. Published periods differ. The 2024 text of
      the EU AI Act sets at least six months for the logs of high-risk
      systems, and Colorado SB26-189 sets at least three years for records
      from 1 January 2027. Disputes can arise later than either. Xyvionix
      tests retrieval against the period the insurer has set.
  - q: Does a retired model have to be kept running to explain an old decision?
    a: >-
      A hosted model that has been retired cannot be called again. The
      explanation therefore has to come from the record: the inputs, the
      output, the version identifiers and the reasons captured when the
      decision was made. If those were not captured, the decision cannot be
      reproduced later.
  - q: Is the NAIC model bulletin the same in every adopting state?
    a: >-
      The NAIC does not say so. Its adoption map states that it does not
      reflect a determination as to whether the pending or enacted
      legislation contains all elements of the model. The map shows 26
      jurisdictions as of 31 August 2026, and four more with their own
      insurance-specific regulation or guidance.
sources:
  - title: 'NAIC: adoption map for the Model Bulletin on the Use of AI Systems by Insurers'
    url: 'https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf'
  - title: 'NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers'
    url: 'https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf'
  - title: 'NAIC Big Data and Artificial Intelligence (H) Working Group'
    url: 'https://content.naic.org/committees/h/big-data-artificial-intelligence-wg'
  - title: 'NAIC AI Systems Evaluation Tool: pilot project summary'
    url: 'https://content.naic.org/sites/default/files/inline-files/Pilot%20Project%20Summary_1.pdf'
  - title: 'Colorado Division of Insurance: notice of adoption, amended Regulation 10-1-1'
    url: 'https://doi.colorado.gov/announcements/notice-of-adoption-amended-regulation-10-1-1-governance-and-risk-management-framework'
  - title: 'New York DFS Insurance Circular Letter No. 7 (2024)'
    url: 'https://www.dfs.ny.gov/industry-guidance/circular-letters/cl2024-07'
  - title: 'EIOPA Opinion on AI governance and risk management'
    url: 'https://www.eiopa.europa.eu/eiopa-publishes-opinion-ai-governance-and-risk-management-2025-08-06_en'
  - title: 'Regulation (EU) 2024/1689 (AI Act), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689'
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'EIOPA revokes previous guidelines to avoid duplications and overlaps with DORA'
    url: 'https://www.eiopa.europa.eu/eiopa-revokes-previous-guidelines-avoid-duplications-and-overlaps-dora-2024-12-19_en'
  - title: 'PRA SS1/21: Operational resilience, impact tolerances for important business services'
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-impact-tolerances-for-important-business-services-ss'
  - title: 'APRA: Operational risk management (CPS 230)'
    url: 'https://www.apra.gov.au/operational-risk-management'
  - title: 'APRA letter to industry on artificial intelligence'
    url: 'https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai'
  - title: 'OSFI Guideline E-23: Model Risk Management'
    url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027'
  - title: 'Colorado SB26-189: Automated Decision-Making Technology'
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

## Operational risk in this sector

Insurance sells a promise that is tested later. A policy is priced and accepted today. The claim arrives months or years afterwards. The complaint, the dispute or the market conduct examination arrives later still. By then the pricing model has been retrained, the external data supplier has replaced its feed and the claims model may be running with a different provider.

The decision still has to be explained. That gives operational risk in insurance a dimension most sectors do not have: the record has to outlive the system that produced it. A bank's resilience question is mostly about the present. An insurer's is also about whether the past can be recovered.

Two failures follow from this. The first is a decision that cannot be reconstructed, because the model, the data or the rule that made it was overwritten and nothing was kept. The second is a platform that is unavailable on the day a large number of policyholders need it at once. Both are failures of the promise, and both are found late.

## AI assurance: decisions that outlive the model

An explanation given years later can only be as good as the record made on the day. That record needs the inputs as they stood, the model and rule versions, the versions of the data behind the rating factors, the output, the reasons captured and any human involvement. A model register that lists only what is in service today cannot answer a question about a version retired two years ago.

Model change is frequent and is often outside the insurer's control. Hosted models are retired on the provider's schedule, and a retired model cannot be called again to reproduce an answer. Internal pricing models are recalibrated on the actuarial calendar. Each change is a point at which the link between a past decision and its explanation can be broken. The events that oblige re-testing are covered in [Model Change Assurance](/model-change-assurance).

The NAIC model bulletin places this inside a wider programme. It expects insurers to "develop, implement, and maintain" a written AI systems programme, and says the programme should address AI use "across the insurance life cycle", listing underwriting, pricing, claim administration and payment, and fraud detection. The verb that matters for assurance is "maintain". Claims automation has its own evidence problems, which are covered in [Insurance Claims AI Assurance](/insurance-claims-ai-assurance).

## Data assurance: freshness and versions in pricing

A pricing model is a function of its inputs, and many of those inputs come from outside the insurer: property attributes, vehicle data, credit-based scores, telematics, geographic risk. Each arrives on its supplier's schedule. When a feed stops refreshing, quotes continue to be issued. Nothing fails. The portfolio is priced on facts that are no longer true, and the error appears later as loss ratio.

Freshness is one property. Meaning is another. A supplier changes a code list, a unit or the definition of a field, and the column still arrives with the same name. The model accepts it. A rating factor now measures something different from what was validated.

Both have to be measured in the pricing path, at the point where the quote is calculated. A pipeline that reports success has shown that a job ran. How the content and meaning of data are held against a threshold is covered in [Data Quality Assurance](/data-quality-assurance).

Versioned data is also part of the decision record. To explain a premium, the insurer needs the value of each rating factor as it was on the day of the quote. The current value in the supplier's feed is a different fact.

## Reliability and recovery: peak claim events

Demand in insurance is correlated. A storm, a flood or a freeze produces claims from a whole region in the same days, and it can affect the insurer's own staff, suppliers and sites in that region. Platforms sized and tested for an ordinary week meet their real test at a far higher volume, with call centres, repair networks and payment providers under the same strain.

Capacity and recovery evidence therefore has to be taken at the volume of the event the business plans for. A recovery exercise run at ordinary load measures a different service. The paths that matter are claim notification, policy and cover lookup, and payment, including the third parties each one calls.

Resilience regimes apply to insurers directly. DORA applies to insurance and reinsurance undertakings, and EIOPA revoked its guidelines on ICT security and governance and on outsourcing to cloud service providers with effect from 17 January 2025 because DORA "fully encompasses" them. PRA SS1/21 applies to UK Solvency II firms and to Lloyd's. APRA's CPS 230 has been in force for insurers since 1 July 2025. In Xyvionix's view claims payment is a natural candidate for an important business service with its own tolerance. How recovery is held as a measured result is covered in [Disaster Recovery Assurance](/disaster-recovery-assurance).

## Identity and security exposure

An insurer's systems are used by many people who do not work for it. Brokers and agents quote and bind. Loss adjusters, third-party administrators and repair networks read and update claims. Each holds access under a delegated authority or a contract, and the access tends to outlast the relationship that justified it.

The data involved is sensitive: health records, financial details, and the contents of claims files. The actions are sensitive too. The ability to change a payee or a bank detail on a claim is a privilege that deserves the same scrutiny as database administration, and it is often held more widely.

AI adds actors to this picture. APRA's letter to industry of 30 April 2026, which applies to insurers as well as banks, expects identity controls to cover "nonhuman actors such as AI agents". An agent that reads claim documents or drafts settlement offers needs its own identity and a scope limited to the task.

## Regulatory and audit context

The facts below are stated as published. Xyvionix gives no legal or regulatory advice, and which of them apply to an insurer is a decision for the insurer and its advisers.

| Instrument | Dated fact | Scope as published |
|---|---|---|
| NAIC Model Bulletin on the Use of AI Systems by Insurers | Adopted 4 December 2023. The NAIC map shows 26 adopting jurisdictions as of 31 August 2026 | A written AI systems programme across the insurance life cycle. A bulletin, not a model law |
| Colorado Regulation 10-1-1 | Amendments effective 15 October 2025 | Governance and risk management for external consumer data, algorithms and predictive models. The amendments extend it from life insurance to private passenger auto and health benefit plan insurers |
| New York DFS Insurance Circular Letter No. 7 (2024) | Issued 11 July 2024 | AI systems and external consumer data in underwriting and pricing only. It does not cover claims |
| EIOPA Opinion on AI governance and risk management | 6 August 2025 | AI systems that are not prohibited or high-risk under the AI Act. Addressed to national supervisors. Creates no new rules |
| EU AI Act, Annex III point 5(c) | High-risk obligations apply from 2 December 2027 | Risk assessment and pricing in relation to natural persons in life and health insurance. Claims handling and non-life pricing are not listed in point 5(c) |
| OSFI Guideline E-23 | Takes effect 1 May 2027 | Model risk management for all federally regulated financial institutions, including insurers |

Several of these describe continuing activity. The NAIC bulletin's programme is to be maintained. The New York circular letter says insurers keep responsibility for vendor tools and should document testing, changes and consumer complaints. The EIOPA Opinion sets expectations on record-keeping and explainability for systems outside the high-risk category. OSFI's guideline asks for an inventory that is "accurate, evergreen, and subject to robust controls". None of these is a single assessment before launch.

Examination is becoming more structured. The NAIC's Big Data and Artificial Intelligence Working Group has an AI Systems Evaluation Tool in pilot. The pilot summary names 12 participating states using the tool from March 2026 to September 2026 in market conduct and financial examinations. No NAIC model law on AI has been adopted. An insurer asked to complete a structured questionnaire needs standing evidence behind each answer.

## Technology economics and change

Policy administration platforms are long-lived. Models, data feeds and AI providers change far faster. The gap between the two rates is where explainability is lost, because each migration is a chance to drop the history along with the old system.

The economics favour keeping the record. Storing a decision with its versions costs little at the time. Reconstructing it later means restoring retired systems, locating superseded data and asking people to recall what they did, and it may not succeed.

Stale pricing data has a cost that never appears as an incident. Under-priced risk is written and over-priced customers leave, and both are found in results months later. Measuring the age of inputs at quotation turns that into a signal that can be acted on the same day.

## Representative use cases

Four situations recur in insurance, and each is described from the position of the team that finds itself in it.

A move from one model provider to another, with past decisions still to be explained, is covered in [Model Provider Migration](/model-provider-migration). The insurer's difficulty is that the old model has to remain explainable after it has stopped running.

A rating input that has stopped refreshing while quotes continue is described in [Data Pipeline Freshness Failure](/data-pipeline-freshness-failure). The pipeline reports success throughout, which is why the age of the data has to be measured where the price is calculated.

A change to a field in a policy administration or claims system that alters what downstream models receive is covered in [Schema Change Production Impact](/schema-change-production-impact). Nothing fails. The model keeps scoring on an input that no longer means what it meant when the model was validated.

A request from a supervisor, an auditor or a customer for the evidence behind an automated decision is covered in [AI Audit Readiness](/ai-audit-readiness). Evidence reconstructed after the request is weaker than evidence retained as the decision was made.
