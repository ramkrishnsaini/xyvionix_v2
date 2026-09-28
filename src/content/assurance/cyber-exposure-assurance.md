---
title: Cyber Exposure Assurance
h1: 'Prove that exposure has stayed closed, not only that it was found'
seoTitle: 'Cyber Exposure Assurance: Closure Proven by Re-test | Xyvionix'
description: >-
  Continuous proof that identity, privilege, cloud, vulnerability and secrets
  exposure stays within threshold, with remediation closed only on re-test.
summary: >-
  Scanning lists what is wrong today and a ticket records that work was done.
  Exposure assurance holds a current, evidenced position on whether each
  condition is absent now, and closes remediation only when a re-test shows it.
lede: >-
  Cyber exposure assurance is the continuing proof that identity, privilege,
  cloud configuration, vulnerabilities and secrets remain within thresholds the
  business has agreed, and that every remediation was confirmed by re-test. It
  differs from scanning, which lists what is wrong on the day, and from ticket
  closure, which records that work was done. The evidence is re-gathered as the
  estate, the platforms and the threat data change.
ogQuestion: Can you prove what was closed has stayed closed?
kind: hub
tier: primary
cluster: cyber
secondary: []
parent: assurance
state: assured
audience:
  - CISO
  - Technology Risk
  - Security Engineering
intent: >-
  Commercial: continuing proof that exposure stays closed, with remediation
  owned to verified closure
related:
  assurance:
    - identity-exposure-assurance
    - privileged-access-assurance
    - cloud-security-exposure-assurance
    - vulnerability-remediation-assurance
    - secrets-exposure-assurance
  useCases:
    - identity-access-drift
    - stale-privileged-access
    - security-remediation-backlog
    - unverified-vulnerability-closure
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - security-findings-vs-verified-closure
    - how-identity-controls-drift
    - standing-privilege-evidence-gap
evidence:
  - name: Exposure inventory with declared coverage
    detail: >-
      The accounts, subscriptions, clusters, repositories and identity types in
      scope, with the evidence source that covers each. Anything in scope with
      no source is recorded as Unassured, not as clean.
  - name: Threshold register
    detail: >-
      Each assured condition with its agreed boundary, the business outcome
      that sets it, the person who agreed it and the date it was last measured.
  - name: Re-test results
    detail: >-
      For every remediation, an independent observation of the asset taken
      after the change, dated and retained with the closure record.
  - name: Exception register
    detail: >-
      Every exclusion, exemption, suppression and accepted risk with an owner, a
      reason and an expiry date. Entries without an expiry are listed as gaps.
  - name: Recurrence record
    detail: >-
      Closed conditions that reappeared, linked to the original closure so that
      a finding which returns after a rebuild is counted as a recurrence.
  - name: Ownership map
    detail: >-
      For each class of exposure, the named owner of detection, correction and
      verification, showing where one condition passes between teams.
  - name: Platform change log
    detail: >-
      Vendor changes to defaults, enforcement and data sources that alter what
      an unchanged configuration does, with the re-test each one triggered.
thresholds:
  - signal: Estate covered by a current evidence source
    basis: The assets and identity types on which the business requires a known position
    lostWhen: Any in-scope account, subscription, cluster or identity type has no current evidence source
  - signal: Age of open reachable exposure
    basis: How exploitable the condition is and how much the affected process matters to the business
    lostWhen: A reachable exposure stays open beyond its agreed window without an approved, unexpired exception
  - signal: Closures supported by re-test evidence
    basis: The audit expectation that a closure can be demonstrated, not asserted
    lostWhen: Any closure in the window rests on ticket status alone
  - signal: Recurrence of closed conditions
    basis: The cost of repeated correction and the exposure window each recurrence reopens
    lostWhen: A closed condition reappears and the source that reintroduced it has not been corrected
  - signal: Exceptions past expiry
    basis: Risk acceptance is a time-limited decision made by a named owner
    lostWhen: Any exception remains in force after its expiry date without renewal by its owner
faqs:
  - q: Does exposure assurance replace a vulnerability scanner or posture platform?
    a: >-
      No. Scanners and posture platforms are evidence sources. Assurance sits
      above them: it declares which parts of the estate they cover, holds their
      output against thresholds agreed with the business, owns correction and
      records closure only when a re-test confirms it.
  - q: How is this different from a penetration test or an annual audit?
    a: >-
      A penetration test and an audit are point-in-time. Both remain useful and
      neither says what is true the following month. Assurance holds the
      position between those dates and keeps the evidence that an auditor or
      tester would otherwise have to reconstruct.
  - q: What does Unassured mean for a security control?
    a: >-
      It means there is no current evidence either way. An account that was
      never in scope of the analysis, or a control last tested before a vendor
      changed its behaviour, is Unassured. It is reported as unknown and
      treated as not acceptable, not as a pass.
sources:
  - title: 'Verizon 2026 Data Breach Investigations Report'
    url: 'https://www.verizon.com/business/resources/reports/dbir/'
  - title: 'Verizon: 2026 DBIR news release'
    url: 'https://www.verizon.com/about/news/breach-industry-wide-dbir-finds'
  - title: 'Verizon 2026 DBIR Executive Summary'
    url: 'https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf'
  - title: 'Google Cloud Threat Horizons Report H1 2026'
    url: 'https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026'
  - title: 'Microsoft Defender for Cloud: cloud security posture management'
    url: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management'
  - title: 'NIST updates NVD operations to address record CVE growth'
    url: 'https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth'
  - title: 'CISA BOD 26-04: Prioritizing Security Updates Based on Risk'
    url: 'https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk'
  - title: 'NIST Cybersecurity Framework 2.0'
    url: 'https://csrc.nist.gov/pubs/cswp/29/the-nist-cybersecurity-framework-csf-20/final'
  - title: 'EIOPA: Digital Operational Resilience Act (DORA)'
    url: 'https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en'
  - title: 'European Commission: NIS2 Directive transposition'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/nis-transposition'
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

A security finding is a statement about one asset at one moment. Most programmes handle it as a work item: found, assigned, fixed, closed. Exposure assurance handles it as a condition that is either shown to be absent now or not known to be absent. Every piece of evidence in this area expires, usually without anyone deciding to accept more risk.

**The estate is rebuilt.** A patched host is replaced by the next image build, scaling event or node upgrade. If the source still carries the old version, the finding returns without a new ticket.

**Access accumulates.** Grants are made to unblock work and are not withdrawn when the work ends. An access review signed at quarter end says nothing about a grant made the following week.

**Exclusions grow.** Policy exclusions, exemptions and scanner suppressions are added one at a time, each with a reason. Few carry an expiry. Taken together they become the real policy.

**Platform defaults move.** Vendors change what an unchanged configuration does. Microsoft states that from 27 October 2026 Foundational CSPM in Defender for Cloud moves to an opt-in model and is no longer enabled by default for new Azure subscriptions. A subscription created after that date can have no posture monitoring at all, with no change made by the enterprise.

**The data behind the scan changes.** NIST changed the operation of the National Vulnerability Database on 15 April 2026 to prioritise enrichment for defined groups of CVEs. A scanner that depends on that enrichment can report nothing because it has no data, which is a different condition from nothing being wrong.

## Scanning, ticket closure and assurance

The three are often treated as stages of one process. They answer different questions.

| | Scanning | Ticket closure | Exposure assurance |
|---|---|---|---|
| Question answered | What is wrong on the assets examined today | Whether the assigned work was recorded as done | Whether the condition is absent now and has stayed absent |
| What it records | A list of findings | A status and a date | Evidence against a threshold, and a state |
| What it cannot show | Anything outside the scanned scope, or whether a fix held | Whether the change took effect or was later undone | Anything outside its declared coverage, which is why coverage is itself evidence |

A finding list with no threshold cannot say whether the position is acceptable. A closed ticket with no re-test cannot say whether the condition is gone. Assurance supplies the boundary and the observation.

## What is at stake

The published data describes remediation that does not finish. The Verizon 2026 Data Breach Investigations Report states that "31% of breaches now start with software vulnerabilities", ahead of stolen passwords for the first time in the report's history. Its executive summary states that only 26% of critical vulnerabilities in the CISA Known Exploited Vulnerabilities catalogue were fully remediated by organisations in 2025, down from 38% the year before. These were known, listed and actively exploited, and most were still open.

Identity carries the same weight in cloud estates. The Google Cloud Threat Horizons Report H1 2026 found that threat actors exploited identity issues to gain initial access in 83% of the incidents it examined involving major cloud and SaaS-hosted environments. The supply chain widens the boundary: Verizon's 2026 release puts breaches involving a third party at 48% of all breaches.

For the business the consequence has three parts. There is the direct loss from an intrusion through a condition that was already known. There is the security leader who reports a falling count of open findings and cannot show that the closed ones are closed. And there is the audit question that asks for evidence of operation over a period, which a set of closed tickets does not answer.

## What Xyvionix assures

Xyvionix holds a current state for each class of exposure against thresholds agreed with the business, and owns correction when a threshold is breached. The cluster is divided by what expires and how closure is proven, because those differ more than the tooling does.

**Identity.** Policy says who may sign in, from where and with what strength of authentication. What is enforced depends on exclusions, dormant accounts, guests and non-human identities that the policy never reached. [Identity Exposure Assurance](/identity-exposure-assurance) holds the gap between the written policy and its effective coverage.

**Privilege.** Administrative access is granted quickly and removed slowly. [Privileged Access Assurance](/privileged-access-assurance) holds the amount of standing privilege, the evidence behind each elevation and the governance of emergency accounts.

**Cloud exposure.** Posture platforms produce findings in volume. [Cloud Security Exposure Assurance](/cloud-security-exposure-assurance) holds a threshold on the exposures that are reachable, how long each has been open and whether each has an owner.

**Remediation.** Every class of exposure ends in a correction that has to be proven. [Vulnerability Remediation Assurance](/vulnerability-remediation-assurance) is where closure is defined for security remediation: a re-test result, bound to the asset as deployed, and re-proven after rebuild.

**Secrets.** A credential in a repository, a pipeline log or a tool configuration file stays usable until it is revoked. [Secrets Exposure Assurance](/secrets-exposure-assurance) holds the inventory, the age of each credential and the time from detection to revocation.

The five are assured separately and read together. An exposed key is a secrets condition, the permissions it carries are an identity or privilege condition, and the resource it reaches is a cloud exposure condition.

## Common failure modes

- **Closure by status.** The ticket is closed when the change is deployed. Nobody looks at the asset again, so a change that failed, was rolled back or missed half the fleet is recorded as complete.
- **The finding that returns.** A corrected condition reappears after a rebuild, a redeployment from an old template or a manual change. It is raised as new, so the recurrence is invisible.
- **Clean results from an area never examined.** An account, subscription or identity type sits outside the licence or scope of the analysis. The absence of findings is read as assurance when it is absence of data.
- **Exceptions that never end.** A risk acceptance or suppression is granted for a quarter and is still in force two years later, with its original approver no longer in role.
- **Three owners, no owner.** Detection, correction and verification sit with different teams. Each completes its part. Nobody is accountable for the condition being gone.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production is affected.

Ownership covers the whole path. The correction is scoped to the source of the condition, not only the instance that was found: the image, the template, the policy or the pipeline that would reintroduce it. Where the correction needs a decision that belongs to the business, such as accepting an exposure that cannot be removed, the decision is recorded with a named owner and an expiry date.

A condition with no current evidence is Unassured. Bringing it into coverage is corrective action in its own right.

## Verified closure

Closure across this cluster has the same shape, whatever the subject. The asset is observed again after the change, by a means independent of the change record. The observation shows the condition is absent. The thing that depended on the old state still works. The result is dated, retained and attached to the closure.

Closure is also conditional on the next rebuild. Where an asset is regenerated from an image, a template or a pipeline, the re-test is repeated after the next run.

If the condition reappears, it reopens against the original record, so recurrence is measured. The method is described in [how assurance works](/how-assurance-works).

## Technology and industry context

Platform vendors now use the language of exposure and provide native evidence sources for it. Those sources differ in what they cover, what is licensed and what is enabled by default, so the same control question has a different answer on each platform. Identity platform detail is covered in [Microsoft Entra ID Exposure Assurance](/entra-id-exposure-assurance) and [AWS IAM Exposure Assurance](/aws-iam-exposure-assurance).

The frameworks point the same way. NIST Cybersecurity Framework 2.0, published on 26 February 2024, is written in terms of outcomes and does not prescribe how they are achieved. CISA Binding Operational Directive 26-04, issued on 10 June 2026 for United States federal civilian agencies, requires those agencies to establish internal validation and enforcement procedures and to attest quarterly to their publicly exposed assets. It is a clear public statement that validation is a separate duty from remediation.

In financial services in the European Union, the Digital Operational Resilience Act entered into application on 17 January 2025 and covers ICT third-party service providers as well as financial entities. NIS2 obligations depend on national law and apply where the directive has been transposed. In each case the expectation is evidence that continues.
