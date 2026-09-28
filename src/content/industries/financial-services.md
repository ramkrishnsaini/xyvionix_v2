---
title: Financial Services
h1: Resilience in financial services is a tested result with a date on it
seoTitle: 'Financial Services: Continuous Technology Assurance | Xyvionix'
description: >-
  How banks, payment firms and market infrastructure keep tested tolerances,
  third-party registers, privileged access and audit evidence current between
  tests.
summary: >-
  Operational resilience regimes ask firms to stay within tolerance now, not to
  plan to. That needs test results, registers and access records that still
  describe production on the day a supervisor or auditor asks.
lede: >-
  Financial services firms are expected to show that important services stay
  within tolerance under disruption, and to show it with tested results and
  retained records. The evidence is gathered at a date and production keeps
  moving after it. Continuous assurance holds each result against the tolerance
  the business set, detects when change has made it stale, and owns the
  correction until a re-test confirms the service is back inside tolerance.
ogQuestion: Can resilience and control be evidenced on demand?
kind: primary
cluster: industry
secondary:
  - ai
  - reliability
  - cyber
parent: industries
state: assured
audience:
  - CIO
  - CTO
  - CISO
  - Technology Risk
  - Operational Resilience
intent: >-
  Industry: continuous technology assurance for banks, payments, asset managers
  and market infrastructure
related:
  assurance:
    - production-reliability-assurance
    - ai-assurance
    - cyber-exposure-assurance
    - disaster-recovery-assurance
    - privileged-access-assurance
  useCases:
    - untested-disaster-recovery
    - ai-audit-readiness
    - stale-privileged-access
    - cloud-configuration-drift
  technologies:
    - azure-production-reliability
    - aws-production-reliability
    - entra-id-exposure-assurance
    - kafka-pipeline-assurance
  industries:
    - financial-services-ai-assurance
    - insurance
  insights:
    - disaster-recovery-plan-never-tested
    - ai-audit-evidence-requirements
    - standing-privilege-evidence-gap
evidence:
  - name: Important business service map
    detail: >-
      Each important service with the systems, data, people and suppliers it
      depends on, dated and reconciled against what is running in production.
  - name: Tolerance test results
    detail: >-
      For each scenario, the measured time outside service compared with the
      impact tolerance, together with the production footprint the test was
      run against.
  - name: Remediation and re-test record
    detail: >-
      Every weakness found in a test, its owner, the correction made and the
      repeat test that showed the weakness was gone.
  - name: Third-party register reconciliation
    detail: >-
      The register of third-party arrangements compared with the dependencies
      observed in production traffic, identity federation and billing, with
      differences listed.
  - name: Supplier service measurements
    detail: >-
      Performance against contracted targets for suppliers that support
      important services, measured from the firm's own point of use.
  - name: Privileged access record
    detail: >-
      Privileged grants held by people, service accounts and agents, compared
      with the privileges exercised over the measurement window.
  - name: Incident timing record
    detail: >-
      For incidents and exercises, the times of occurrence, detection,
      classification and notification, recorded as they happen.
thresholds:
  - signal: Time outside service in a tested disruption
    basis: The impact tolerance the firm has set for the important business service
    lostWhen: The measured time exceeds the tolerance, or the scenario tested no longer matches how the service is delivered
  - signal: Age of test evidence against change
    basis: The testing frequency named in the applicable regime, treated as a floor, and the rate of change in the service
    lostWhen: A material change to the service, its platform or a supplier has occurred since the last test
  - signal: Register against production
    basis: The register has to describe the arrangements the firm relies on today
    lostWhen: A supplier dependency is observed in production that the register does not list
  - signal: Standing privileged access
    basis: The smallest standing privilege that still allows the service to be operated and recovered
    lostWhen: A privileged grant is unused beyond the agreed window or is held by someone who has changed role
  - signal: Time to classify an incident
    basis: The shortest reporting period that applies to the firm
    lostWhen: Detection and classification in an exercise or real incident consume more of the period than the firm has agreed to allow
faqs:
  - q: Is a yearly resilience test enough evidence?
    a: >-
      Whether a test meets an obligation is a matter for the firm and its
      advisers. The assurance question is different: does the last result
      still describe production. Where a regime names a frequency, Xyvionix
      treats it as a floor. A result taken before a platform migration or a
      supplier change is a record of the previous service.
  - q: Does regulatory oversight of cloud providers reduce what a firm has to evidence?
    a: >-
      The regulators say it does not. The Bank of England's announcement of
      the first UK critical third parties states that the regime complements,
      but does not replace, firms' own outsourcing and operational resilience
      duties. The firm still needs its own measurements of the services it
      depends on.
  - q: Does Xyvionix give regulatory advice?
    a: >-
      No. Xyvionix is not a law firm. The firm and its advisers decide which
      obligations apply and what they require. Xyvionix tests whether the
      evidence behind the firm's position exists, is current and can be
      retrieved.
sources:
  - title: 'FCA: Operational resilience'
    url: 'https://www.fca.org.uk/firms/operational-resilience'
  - title: 'PRA SS1/21: Operational resilience, impact tolerances for important business services'
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-impact-tolerances-for-important-business-services-ss'
  - title: 'EIOPA: Digital Operational Resilience Act (DORA)'
    url: 'https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en'
  - title: 'Regulation (EU) 2022/2554 (DORA), Official Journal text'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R2554'
  - title: 'European Supervisory Authorities: list of designated critical ICT third-party providers'
    url: 'https://www.eba.europa.eu/sites/default/files/2025-11/e388451b-356b-408a-bbf2-b8e425865d75/List%20of%20designated%20CTPPs.pdf'
  - title: 'Bank of England: UK financial regulators to begin overseeing critical third parties'
    url: 'https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt'
  - title: 'FCA PS26/2: Operational incident and third-party reporting'
    url: 'https://www.fca.org.uk/publications/policy-statements/ps26-2-operational-incident-third-party-reporting'
  - title: 'PRA PS7/26: Operational incident and third-party reporting'
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2026/march/operational-incident-and-third-party-reporting-policy-statement'
  - title: 'OCC Bulletin 2023-17: Third-Party Relationships, Interagency Guidance on Risk Management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html'
  - title: 'APRA: Operational risk management (CPS 230)'
    url: 'https://www.apra.gov.au/operational-risk-management'
  - title: 'APRA Prudential Standard CPS 234 Information Security'
    url: 'https://www.apra.gov.au/sites/default/files/cps_234_july_2019_for_public_release.pdf'
  - title: 'APRA letter to industry on artificial intelligence'
    url: 'https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai'
  - title: 'OSFI Guideline E-21: Operational Risk Management and Resilience'
    url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/operational-risk-management-resilience-letter'
  - title: 'Bank of England Financial Stability Report, July 2026'
    url: 'https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026'
  - title: 'Bank of England, FCA and HM Treasury joint statement on frontier AI models and cyber resilience'
    url: 'https://www.bankofengland.co.uk/news/2026/may/boe-fca-and-hm-treasury-joint-statement-on-frontier-ai-models-and-cyber-resilience'
  - title: 'PCI Security Standards Council: PCI DSS v4.0.1'
    url: 'https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1'
  - title: 'Federal Reserve SR 26-2: Revised Guidance on Model Risk Management'
    url: 'https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm'
  - title: 'OCC Bulletin 2026-13: Model Risk Management, revised guidance'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
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

A financial firm is judged on services, not systems. A payment is made or it is not. A trade settles or it fails. A customer can reach their funds or cannot. Supervisors have built their resilience regimes around that view, and the consequence they measure is harm to customers and markets.

In the United Kingdom the test changed tense. The FCA's transition period ended on 31 March 2025. By that date firms had to have identified their important business services, set impact tolerances, and mapped and tested them. Since then the expectation is that a firm can remain within its impact tolerances. PRA SS1/21 sets the matching expectations for UK banks, building societies, PRA-designated investment firms, UK Solvency II firms and Lloyd's.

A statement about what a firm can do today rests on evidence gathered recently. The mapping of a service to its systems, people and suppliers ages with the next release, supplier change or reorganisation, and the scenario test result ages with it.

Other jurisdictions reached the same position on their own dates. The EU's DORA regulation has applied since 17 January 2025 to 20 types of financial entity. APRA's CPS 230 has been in force since 1 July 2025. OSFI expected full adherence to Guideline E-21 by 1 September 2026. In each, resilience is a standing capability with no end date.

## Reliability and recovery

DORA names testing frequencies in the regulation itself. Article 24(6) requires entities other than microenterprises to test, at least yearly, all ICT systems and applications that support critical or important functions. Article 11(6) requires ICT continuity and recovery plans to be tested at least yearly. Article 26(1) requires identified entities to carry out threat-led penetration testing at least every three years. The FCA lists scenario testing and lessons-learned exercises among its continuing expectations.

Xyvionix treats a named frequency as a floor. A yearly result describes the service on the day of the test. The useful question is whether it still describes production.

Three conditions separate a tested tolerance from a documented one.

- **The test measured the service.** A fast database failover says little about how long payment initiation was unavailable. The measurement runs from the customer's loss of service to its verified return.
- **The scenario included a shared dependency.** Identity, name resolution, secrets and the deployment pipeline are used by every service. A scenario that assumes they survive tests the easier half of the problem.
- **The weaknesses found were re-tested.** Findings and a remediation plan are intent. The evidence is the repeat test.

How recovery time and recovery point are held as measured figures is set out in [Disaster Recovery Assurance](/disaster-recovery-assurance).

## Third-party dependency

Supervisors now ask for registers. DORA Article 28(3) says financial entities "shall maintain and update" a register of information on all contractual arrangements with ICT third-party providers. In the UK, FCA PS26/2 and PRA PS7/26 were published on 18 March 2026 and take effect on 18 March 2027. The PRA statement includes an annual register of material third-party arrangements.

A register is written from contracts. Production is built from integrations. The two diverge when a team adopts a service under an existing supplier agreement, or when a tool adopted for a pilot becomes part of a payment path. The register is evidence only while it matches what is running, so the reconciliation is the control.

Contract terms create a second continuing duty. DORA Article 30(3)(a) requires contracts for ICT services supporting critical or important functions to include service level descriptions with precise quantitative and qualitative performance targets, "to allow effective monitoring by the financial entity". The US interagency guidance on third-party relationships, issued through OCC Bulletin 2023-17 on 6 June 2023, covers the whole life cycle of a relationship, including ongoing monitoring. A supplier's status page gives the supplier's view. The firm needs a measurement taken from its own point of use.

Direct oversight of large providers has begun. The European Supervisory Authorities designated the first critical ICT third-party providers on 18 November 2025, and the published list names 19. HM Treasury designated the first four UK critical third parties on 10 July 2026, effective 13 July 2026. The Bank of England's announcement states that the regime "complements, but does not replace" firms' own outsourcing and operational resilience duties.

## Identity and security exposure

Privileged access in a financial firm reaches payment operations, core banking databases, cloud administration and the break-glass accounts kept for recovery. The exposure comes from what is never removed: access kept after a role change, a supplier support account left enabled, a service account whose owner has left.

An access review attests to a position at a date. APRA's CPS 234, in force since 1 July 2019, requires control effectiveness to be tested "through a systematic testing program", with the nature and frequency of testing commensurate with the rate of change and the risk. PCI DSS v4.0.1 is the only active version of that standard, and the 51 future-dated requirements introduced in v4.0 became effective on 31 March 2025.

Supervisors describe the interval between tests as shrinking. The Bank of England's Financial Stability Report of July 2026 says frontier AI progress presents "a significant increase in the risks to financial stability from cyber and operational vulnerabilities". The joint statement from the Bank, the FCA and HM Treasury of 15 May 2026 asks firms to remediate vulnerabilities "more quickly, more frequently, and at scale", and says it is not intended to introduce new expectations. If exploitation takes less time, a control tested last quarter says less about today.

Identity now includes actors that are not people. APRA's letter to industry of 30 April 2026 expects identity controls to cover "nonhuman actors such as AI agents". The continuing position on who holds privilege and whether it is used is covered in [Privileged Access Assurance](/privileged-access-assurance).

## AI assurance

AI raises a separate evidence problem, which this page notes only briefly. On 17 April 2026 the Federal Reserve, the OCC and the FDIC issued Revised Guidance on Model Risk Management. Federal Reserve SR 26-2 supersedes SR 11-7, and OCC Bulletin 2026-13 states that generative AI and agentic AI models are not within the scope of the guidance. In Xyvionix's view this leaves a US bank that uses such systems relying on the standard it sets for itself and on the evidence behind that standard. The detail, and the positions taken in the UK, Canada, Australia and the EU, are covered in [Financial Services AI Assurance](/financial-services-ai-assurance).

## Data assurance

In most sectors a late or duplicated record is a quality problem. In a payment or settlement flow it is a financial error: a customer debited twice, a position reported wrongly. The properties that have to be re-proven are completeness, ordering and timeliness on the flows that feed important services, measured where the data is consumed.

Resilience evidence is itself data. The service map, the supplier register and the incident record are datasets with their own freshness. A map last reconciled before a platform migration describes the previous estate, and a firm classifying an incident depends on that map to say which services and customers were affected.

## Regulatory and audit context

The facts below are stated as published. Xyvionix gives no legal or regulatory advice, and which expectations apply to a given firm is a decision for the firm and its advisers. The third column is Xyvionix's reading of what evidence each one implies.

| Expectation | Dated fact | Evidence that has to stay current |
|---|---|---|
| UK operational resilience (FCA, PRA SS1/21) | Transition ended 31 March 2025 | Proof that each important business service can remain within its impact tolerance as it is delivered now |
| DORA Article 24(6) | Applies since 17 January 2025. Tests at least yearly | A test result for every system supporting a critical or important function, with remediation tracked |
| DORA Article 28(3) | Register to be maintained and updated | A register reconciled against production dependencies |
| PRA PS7/26 | Takes effect 18 March 2027. Initial incident report within 24 hours, final report within 30 working days of the incident being resolved | Incident timing and classification recorded as events happen |
| OSFI Guideline E-21 | Scenario testing of all critical operations complete by 1 September 2027 | A scenario test record for every critical operation |

Each row describes continuing activity: testing, maintaining, recording. The evidence is produced over time, and a document signed on one day records only that day.

Audit follows the same logic. An auditor asks about a period that has passed, and evidence retained during that period carries more weight than evidence assembled once the question was known.

## Technology economics and change

Change is the main cause of expired evidence in this sector. Frequent releases, core platforms run alongside cloud services during long migrations, and functions moved to suppliers each shorten the life of a test result.

There is a cost argument as well. Evidence collected by hand is paid for every time it is requested. Evidence gathered from the running estate, as a by-product of testing and monitoring, is paid for once.

Resilience spending also needs a measure. Standby capacity, a second region and duplicate suppliers are bought to hold a tolerance. Without a test result, the firm knows what it spent and does not know what it bought.

## Representative use cases

Three scenarios recur in financial services. A recovery plan that has not been exercised since the service was re-platformed is described in [Untested Disaster Recovery](/untested-disaster-recovery). Privileged grants that outlived the project or the person they were made for are covered in [Stale Privileged Access](/stale-privileged-access). Cloud settings that have moved away from the approved baseline between reviews are covered in [Cloud Configuration Drift](/cloud-configuration-drift).
