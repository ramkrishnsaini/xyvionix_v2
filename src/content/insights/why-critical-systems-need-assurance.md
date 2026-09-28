---
title: Why critical systems need assurance first
h1: 'For the systems an enterprise cannot operate without, proof has to come before everything else'
seoTitle: 'Why Critical Systems Need Assurance First | Xyvionix'
description: >-
  Why payments, claims, clinical records and core platforms need current proof
  of recovery, access and integrity, and what supervisors ask a firm to show.
summary: >-
  When a critical system fails, the cost is harm to customers, a supervisory
  finding or a loss of the ability to trade. The case for holding current proof
  of recovery, access and integrity before anything else is built on top.
lede: >-
  A critical system needs assurance first because the cost of being wrong about
  it is carried by customers, supervisors and the business's ability to trade,
  and the people who ask for proof sit outside engineering. For payments,
  claims, clinical records and core platforms, "we believe it works" is not an
  answer a board or a supervisor can use. Recovery, access and integrity have
  to be shown by tested results with a date, held continuously, before anything
  else is built on top of them.
ogQuestion: 'Can you show the critical system works, or only believe it?'
category: Production Reliability
author: Xyvionix Research
featured: false
cluster: reliability
secondary:
  - cyber
  - data
parent: why-assurance
state: unassured
audience:
  - CIO
  - CISO
  - Technology Risk
  - Operational Resilience
intent: >-
  The case for putting assurance ahead of everything else for the systems an
  enterprise cannot operate without: payments, claims, clinical records, core
  platforms. For these systems the cost of being wrong is not a defect to fix
  but a harm to customers, a supervisory finding or a loss of the ability to
  trade, and the evidence is asked for by people outside the engineering
  function. Covers why criticality changes the standard of proof from 'we
  believe it works' to 'we can show it works'; why recovery, access and
  integrity are the three things most often assumed and least often tested; why
  a plan or a policy is not evidence; what operational resilience expectations
  ask an enterprise to be able to show; and why proof for a critical system has
  to be held continuously and not assembled before an audit. Distinct from
  disaster-recovery-plan-never-tested, which is about recovery only, and from
  the industry pages, which are by sector. This page is the argument by
  criticality.
related:
  assurance:
    - production-reliability-assurance
    - disaster-recovery-assurance
    - privileged-access-assurance
    - data-assurance
  useCases:
    - untested-disaster-recovery
    - stale-privileged-access
    - identity-access-drift
  technologies:
    - azure-production-reliability
    - entra-id-exposure-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - disaster-recovery-plan-never-tested
    - standing-privilege-evidence-gap
    - assurance-is-a-state-not-a-report
evidence:
  - name: Critical service register
    detail: >-
      Each critical service with the systems, data and suppliers it depends on,
      the business owner, the agreed tolerance for disruption and the date the
      mapping was last confirmed against production.
  - name: Timed recovery result
    detail: >-
      The measured interval from loss of the service to its verified return,
      with the date, the scenario and the production footprint at the time of
      the test.
  - name: Privileged access record
    detail: >-
      Every standing and eligible privileged assignment on the critical system,
      human and non-human, with a named owner and the date each was last
      exercised.
  - name: Emergency access validation
    detail: >-
      The dated result of signing in with each emergency access account,
      confirmation that the alert fired, and the current list of people
      authorised to use it.
  - name: Integrity reconciliation result
    detail: >-
      A dated comparison of critical records against an independent source or
      control total, with the variance found and how each difference was
      resolved.
  - name: Clean restore verification
    detail: >-
      Proof that a protected copy restores and that the application produces
      correct results on the restored data, including how the recovery point
      was judged to be free of corruption.
  - name: Expiry and re-test log
    detail: >-
      The changes that expired each piece of evidence, the corrective actions
      raised when a threshold was breached, and the re-test that confirmed each
      closure.
thresholds:
  - signal: Measured recovery time for the critical service
    basis: How long the service can be unavailable before customers are harmed, obligations are missed or the business cannot trade
    lostWhen: The last timed recovery exceeded the agreed tolerance, or production has changed materially since it ran
  - signal: Standing privileged access on the critical system
    basis: How many people and workloads the business accepts as able to alter or stop the service without a further approval
    lostWhen: A privileged assignment has no named owner or no recorded use inside the agreed window, or assignments have changed since the last confirmed baseline
  - signal: Age of the last emergency access validation
    basis: Microsoft's guidance that emergency access accounts are validated at least every 90 days, or a shorter interval set by the business
    lostWhen: The last validation is older than the interval, the sign-in failed or the alert did not fire
  - signal: Variance found by integrity reconciliation
    basis: The error the business process can absorb before a customer balance, a claim payment or a clinical decision is affected
    lostWhen: The variance exceeds the agreed tolerance, or the reconciliation did not run for the period
  - signal: Age of evidence against the rate of change
    basis: How often the system changes and the testing interval the business or its supervisor expects
    lostWhen: A result is older than its agreed validity, or predates a material change to the system, its data or its suppliers
faqs:
  - q: Which systems count as critical?
    a: >-
      The ones whose failure stops a service that customers or the business
      cannot do without. The test is the consequence of loss, not the
      technology. Supervisors define it the same way: the FCA speaks of
      important business services, the EU DORA regulation of critical or
      important functions and APRA of critical operations. The list is
      usually short, and it is set by the business, not by engineering.
  - q: The enterprise passes its audits. Why is that not enough for a critical system?
    a: >-
      An audit describes a period that has ended, and the system has changed
      since. The opinion was correct for the dates examined. It cannot say
      whether recovery, access and integrity still hold after the releases,
      data growth and supplier changes that followed. For a critical system
      the question is asked about today.
  - q: The cloud provider is resilient and is overseen by regulators. Does that cover the systems built on it?
    a: >-
      No. Oversight of a provider does not move responsibility away from the
      firm that depends on it. When HM Treasury designated the first UK
      critical third parties on 10 July 2026, the regime was described as one
      that complements, but does not replace, firms' own outsourcing and
      operational resilience duties. The enterprise still has to show that
      its own service recovers.
  - q: Does holding proof continuously mean running disruptive tests all the time?
    a: >-
      No. It means every result has an agreed validity and is re-proven when
      that validity ends or when a change expires it. Much of the evidence is
      gathered without disruption: access records, reconciliations, restore
      checks on copies. Full recovery exercises are scheduled, and the
      interval is set by how fast the system changes and what the business
      can tolerate.
  - q: Where should an enterprise start?
    a: >-
      With one critical service and three questions. When was recovery last
      timed, and against what tolerance. Who holds privileged access, and
      when was each assignment last used. When was the data last reconciled
      against an independent source. Any question without a dated answer
      marks an outcome that is Unassured.
sources:
  - title: 'FCA: Operational resilience'
    url: 'https://www.fca.org.uk/firms/operational-resilience'
  - title: 'PRA SS1/21: Operational resilience, impact tolerances for important business services'
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-impact-tolerances-for-important-business-services-ss'
  - title: 'Regulation (EU) 2022/2554, Digital Operational Resilience Act (Official Journal text)'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R2554'
  - title: 'EIOPA: Digital Operational Resilience Act (DORA)'
    url: 'https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en'
  - title: 'APRA: Prudential Standard CPS 230 Operational Risk Management'
    url: 'https://www.apra.gov.au/operational-risk-management'
  - title: 'APRA: Prudential Standard CPS 234 Information Security'
    url: 'https://www.apra.gov.au/sites/default/files/cps_234_july_2019_for_public_release.pdf'
  - title: 'OSFI: Guideline E-21, Operational Risk Management and Resilience'
    url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/operational-risk-management-resilience-letter'
  - title: 'PRA PS7/26: Operational incident and third-party reporting'
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2026/march/operational-incident-and-third-party-reporting-policy-statement'
  - title: 'Bank of England: UK financial regulators to begin overseeing critical third parties announced by HM Treasury'
    url: 'https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt'
  - title: 'Bank of England: Financial Stability Report, July 2026'
    url: 'https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026'
  - title: 'HHS: HIPAA Security Rule notice of proposed rulemaking, Federal Register, 6 January 2025'
    url: 'https://www.govinfo.gov/content/pkg/FR-2025-01-06/pdf/2024-30983.pdf'
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'Azure status history: post-incident review GHRP-84G, West US 2'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G'
  - title: 'CISA: Zero Trust Maturity Model Version 2.0'
    url: 'https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf'
  - title: 'Microsoft Entra: manage emergency access accounts'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-28'
lastReviewed: '2026-09-28'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## What makes a system critical, and what failure costs the business

A system is critical when its failure stops a service that customers or the business cannot do without. The definition is set by the consequence and has nothing to do with the technology. A payment does not arrive. A claim is not paid. A clinician cannot see a patient's record. A core platform stops, and every product that runs on it stops with it.

An ordinary defect is found, fixed and forgotten. A failure in a critical system has three consequences that a fix does not reverse.

**Harm to customers.** Money that did not move, cover that was not confirmed and care that was delayed are losses carried by people outside the enterprise.

**A supervisory finding.** In regulated sectors the failure is examined by someone with the power to require remediation and to set its timetable.

**Loss of the ability to trade.** A firm that cannot take payments, settle or serve its customers has no revenue for as long as the system is down.

Supervisors draw the boundary the same way. The FCA asks firms to identify their important business services. The EU DORA regulation refers to critical or important functions. APRA's CPS 230 covers business continuity for critical operations. Each starts from the service and the harm, then works back to the systems.

The list is therefore short, and the business sets it. A higher standard of proof is applied to a small number of systems, chosen because being wrong about them is expensive.

## Why criticality changes the standard of proof

Criticality changes the standard from "we believe it works" to "we can show it works", because the people who ask are outside engineering and cannot rely on belief. A board, a risk committee, an internal auditor, a supervisor and a customer's own auditor have no means of inspecting the system. They can only examine what is put in front of them.

Belief is a reasonable standard for most technology. The consequence of being wrong is contained, and the error is corrected when it appears. For a critical system the consequence falls on customers, and the error appears on the day the system is needed most.

| Question asked from outside engineering | An answer based on belief | An answer based on proof |
|---|---|---|
| Can the service be recovered inside its tolerance | The design is resilient and a plan exists | Recovery was timed on a stated date and the result is retained |
| Who can alter or stop the service | Access is governed by policy and reviewed | Every privileged assignment has an owner and a record of use |
| Is the data correct | No errors have been reported | Records were reconciled against an independent source on a stated date |
| Does any of this still hold | Nothing significant has changed | The result is inside its validity and no change has expired it |

The standard has already moved in regulation. The FCA's operational resilience transition period ended on 31 March 2025, and since then a firm must be able to remain within its impact tolerances. That is a statement about the present, and only current evidence supports it.

## Why assurance comes before everything else

Assurance comes first because every other investment in a critical system assumes that the system underneath is recoverable, controlled and correct. A new product is launched on the payment platform. An AI model is placed in the claims process. A migration moves the clinical record to a new host. A cost programme removes spare capacity. Each of these is a decision taken on the condition of the base, and each one changes it.

If that condition is unknown, the new capability inherits the unknown. A baseline taken first gives every later change something to be measured against.

The order matters for a second reason. The business can accept a risk it has measured. It can record the decision, give it an owner and set a date to review it. It cannot accept a risk nobody has measured. Without proof, the decision to build on a critical system is an assumption that has not been written down.

## Recovery, access and integrity: assumed most often, tested least

Recovery, access and integrity are assumed because each one is invisible while the system runs normally, and each has a convenient proxy that looks like proof. The backup job is green. The access review is complete. No data errors have been reported. None of these is a test of the property it stands for.

### Recovery

Recovery is exercised only when something has failed, so an untested recovery fails for the first time during a real event. AWS's own guidance says it is critical to regularly assess and test a disaster recovery strategy so that there is confidence in invoking it.

The provider's resilience does not settle the matter. In Microsoft's post-incident review of the West US 2 event of 29 to 30 May 2026 (tracking ID GHRP-84G), storage validation took about 14 hours after cooling was restored. A service with a shorter tolerance holds it only if recovery to another location has been shown to work. Where the time goes in a recovery is examined in [the recovery plan that has never been tested](/disaster-recovery-plan-never-tested).

### Access

Privileged access is the ability to alter or stop the critical system, and it accumulates. Assignments are granted for a project and remain after it ends. CISA's Zero Trust Maturity Model Version 2.0 describes "permanent access with periodic review" as the Traditional stage of access management, the lowest of its four.

The access that matters most is the access used least. Microsoft's guidance is that emergency access accounts are validated at least every 90 days, with an alert on every sign-in. An emergency account that has never been tested is a recovery dependency and an exposure at once. How this evidence is held is described in [Privileged Access Assurance](/privileged-access-assurance).

### Integrity

Integrity is the least tested of the three because a system that serves wrong data looks healthy. It is available and it passes its health checks. The error is found by a customer, a finance team or a clinician, some time after it was made.

Redundancy does not protect against it. AWS states that for data corruption or deletion the recovery point is always before the disaster was discovered, even with a multi-site active/active strategy. A replica copies a corrupted record as faithfully as a good one. Microsoft's reliability guidance asks for backups that are immutable and transactionally consistent.

A wrong answer can cost more than no answer. An outage is visible and it stops. A payment posted twice or a record missing an entry spreads into every process that reads it. What has to be re-proven is set out under [Data Assurance](/data-assurance).

## Why a plan or a policy is not evidence

A plan states what the enterprise intends to do and a policy states what it requires. Evidence is a tested, retained result that is attributable to a point in time. The first two describe a wish about the system. Only the third describes the system.

| What is offered | What it shows | What it cannot show |
|---|---|---|
| Recovery plan | That recovery was designed | That recovery works, or how long it takes |
| Access policy | That a rule exists | That the rule is followed in production |
| Completed access review | That assignments were looked at on a date | That each one is still needed, or what was granted since |
| Backup job report | That a copy was written | That the copy restores, and that the data in it is clean |
| Supplier's attestation | That the supplier's controls were examined over a past period | That the enterprise's own service recovers when the supplier fails |

Supervisors make the same distinction. APRA's CPS 234 requires the effectiveness of information security controls to be tested through a systematic testing program, with nature and frequency commensurate with change and risk. The requirement is for a test of whether the control works. A document that says the control exists does not meet it.

Oversight of a supplier does not change the position. When HM Treasury designated the first UK critical third parties on 10 July 2026, the regime was described as one that complements, but does not replace, firms' own outsourcing and operational resilience duties.

## What operational resilience expectations ask an enterprise to show

Operational resilience expectations ask for four things: that critical services are identified, that tolerances are set, that the ability to stay inside them has been tested, and that the facts of an incident can be reported quickly. The table states the expectations as published. Xyvionix gives no legal or regulatory advice, and which of them apply to a given enterprise is a decision for the enterprise and its advisers.

| What has to be shown | Where the expectation appears | Dated fact |
|---|---|---|
| The service stays inside its tolerance | FCA operational resilience. PRA SS1/21, current version published 11 March 2022 | Transition period ended 31 March 2025 |
| Systems behind critical functions are tested | EU DORA regulation, Article 24(6) | Applies since 17 January 2025. Tests at least yearly on all ICT systems and applications supporting critical or important functions |
| Recovery plans are tested | EU DORA regulation, Article 11(6) | ICT continuity and recovery plans tested at least yearly |
| Critical operations have continuity arrangements | APRA CPS 230 | In force since 1 July 2025 |
| Critical operations are scenario tested | OSFI Guideline E-21 | Scenario testing of all critical operations complete by 1 September 2027 |
| The facts of an incident are reported | PRA PS7/26, published 18 March 2026 | From 18 March 2027, an initial incident report within 24 hours |

Healthcare in the United States is moving the same way, although not yet in force. The HIPAA Security Rule notice of proposed rulemaking, published on 6 January 2025, proposes written procedures to restore critical systems and data within 72 hours of the loss. It remains a proposal, and the existing Security Rule is the enforceable text.

Where a rule names a frequency, Xyvionix treats it as a floor. A yearly test describes the system on the day of the test. The question a supervisor asks after an incident is whether the control worked on the day it was needed.

## Why proof has to be held continuously, not assembled before an audit

Proof has to be held continuously because a critical system changes between audits, and the failure does not wait for the audit calendar. Evidence assembled before a review describes the weeks of preparation. It says little about the months in between, when customers depended on the system.

**Evidence expires on change.** A recovery result belongs to the system as it stood when the test ran. A release, a growth in data volume or a change of supplier produces a system the test never examined.

**Evidence cannot be produced in retrospect.** A record of who used privileged access in March has to be captured in March. A reconciliation that did not run leaves a period for which integrity was never shown.

**Incident reporting runs on a short clock.** A firm that must file an initial report within 24 hours needs to know already which services are critical, what they depend on and what their last test showed. That cannot be established during the incident.

The pace is rising. The Bank of England's Financial Stability Report of July 2026 says firms need to identify, patch and mitigate vulnerabilities more quickly and frequently. When the threat moves faster, a test result describes the estate for a shorter time.

Continuous does not mean constant disruption. Each kind of evidence is given a validity, set by the consequence of being wrong and by how often the system changes. It is re-proven when the validity ends or when a change expires it. The reasoning is set out in [assurance is a state, not a report](/assurance-is-a-state-not-a-report).

## What this means for assurance

A critical system with no current evidence of recovery, access and integrity is Unassured. Its condition is unknown. It may be sound, and nobody can show that it is. For a system the enterprise cannot operate without, that is the position to correct before any other work begins.

The first step is small. Name one critical service and the tolerance the business has set for it. Ask when recovery was last timed, when each privileged assignment was last used, and when the data was last reconciled. A question without a dated answer marks an outcome that has never been proven.

The method is the same for each outcome. Xyvionix holds it against a threshold the business has agreed, gathers evidence as the system changes, and owns corrective action when the threshold is breached. Closure is recorded when a re-test shows the outcome is met, and not when a ticket is closed. The steps are described in [how assurance works](/how-assurance-works).

The cost is contained by scope. Continuous proof applies to the short list of systems where being wrong harms customers, draws a finding or stops the business trading. For those systems, proof is the condition on which everything else is built.
