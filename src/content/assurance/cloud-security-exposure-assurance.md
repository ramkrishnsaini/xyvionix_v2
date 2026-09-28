---
title: Cloud Security Exposure Assurance
h1: 'Know which cloud exposures are reachable now, and how long each has been open'
seoTitle: 'Cloud Security Exposure Assurance: Reachability | Xyvionix'
description: >-
  Continuing proof of cloud exposure position: what is publicly reachable, which
  paths to critical assets are open, how old each exposure is and who owns it.
summary: >-
  Posture tools list findings. Assurance holds a threshold on the exposures
  that can be reached, the age of each one, the regressions that reopen them
  and the named owner accountable for closing them.
lede: >-
  Cloud security exposure assurance is the continuing proof that the exposures
  an attacker could reach in a cloud estate are known, owned and inside an
  agreed age limit. A posture tool reports every deviation it finds. Assurance
  separates the deviations that sit on an open path to something the business
  values from those that do not, holds the first group against a threshold, and
  re-checks each closed exposure after the next deployment.
ogQuestion: Which exposures are reachable right now?
kind: child
cluster: cyber
secondary:
  - reliability
parent: cyber-exposure-assurance
state: assured
audience:
  - CISO
  - Cloud Security
  - VP Platform
intent: >-
  Commercial: continuing proof of cloud exposure position, prioritised by
  reachability
related:
  assurance:
    - vulnerability-remediation-assurance
    - cloud-drift-assurance
    - identity-exposure-assurance
  useCases:
    - security-remediation-backlog
    - cloud-configuration-drift
  technologies:
    - aws-iam-exposure-assurance
    - entra-id-exposure-assurance
    - terraform-drift-assurance
  industries:
    - healthcare
    - software-technology
  insights:
    - security-findings-vs-verified-closure
    - cloud-drift-production-risk
evidence:
  - name: Posture coverage register
    detail: >-
      Every account, subscription, project and cluster in scope, with the
      posture plan, scanning and analysis features enabled on each. A scope
      with no current evaluation is recorded as Unassured.
  - name: Public exposure register
    detail: >-
      Each resource that accepts traffic or requests from the internet, with
      the business reason, the owner and the date the reason was last
      confirmed. Anything reachable and not registered is an exposure.
  - name: Reachability results
    detail: >-
      For each open exposure, the path that makes it reachable, the asset at
      the end of the path, the date first detected and the date the path was
      last evaluated.
  - name: Enforcement mode record
    detail: >-
      For each preventive control, whether it blocks, audits or warns in each
      scope where it is assigned, so that a control that only reports is not
      counted as one that prevents.
  - name: Exemption register
    detail: >-
      Every policy exemption and finding suppression with its category, owner,
      reason and expiry date. Entries without an expiry are listed as gaps.
  - name: Regression record
    detail: >-
      Exposures that reopened after closure, linked to the original record and
      to the template, module or manual change that reintroduced them.
  - name: Ownership record
    detail: >-
      The named person accountable for closing each open exposure, confirmed
      as still in role and holding authority over the resource.
thresholds:
  - signal: Internet-reachable resources outside the public exposure register
    basis: The business decides which services are meant to be public and accepts nothing else by default
    lostWhen: Any resource is reachable from the internet without a registered reason and owner
  - signal: Age of open reachable exposure
    basis: The value of the asset at the end of the path and how readily the path can be used
    lostWhen: A reachable exposure stays open beyond its agreed window without an approved, unexpired exception
  - signal: Scopes without current posture evidence
    basis: The accounts, subscriptions and clusters on which the business requires a known position
    lostWhen: Any in-scope account, subscription or cluster has no completed evaluation inside the agreed cadence
  - signal: Preventive controls in a non-enforcing mode
    basis: The control objectives the business relies on to stop an exposure being created
    lostWhen: A relied-upon control is found auditing or warning in a production scope without a dated plan to enforce
  - signal: Reopened exposures
    basis: The exposure window each recurrence reopens and the cost of correcting it again
    lostWhen: A closed exposure reappears and the source that reintroduced it has not been corrected
  - signal: Open exposures without a named owner
    basis: Closure needs a person with authority to change the resource
    lostWhen: Any open reachable exposure has no owner, or an owner who has left the role
faqs:
  - q: Does this replace a cloud posture or exposure management platform?
    a: >-
      No. Those platforms are the evidence sources. Assurance declares which
      parts of the estate each one covers, holds its output against thresholds
      agreed with the business, assigns an owner to every open exposure and
      records closure only when the path is shown to be gone.
  - q: Why is the threshold set on reachability and age instead of severity?
    a: >-
      Severity describes a weakness in isolation. Reachability describes
      whether anyone can get to it, and age describes how long they have been
      able to. A moderate weakness that has sat on an open path to customer
      data for months is a larger exposure than a critical one that nothing
      can reach. Severity still informs the window.
  - q: How does this differ from Cloud Drift Assurance?
    a: >-
      Drift assurance asks whether the running environment matches the
      definition that was approved. Exposure assurance asks whether the running
      environment can be reached in a way it should not be. An exposure can be
      present in a perfectly reconciled estate, because the definition itself
      declares it.
sources:
  - title: 'AWS Security Hub: exposure findings'
    url: 'https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html'
  - title: 'AWS Security Hub: general availability announcement'
    url: 'https://aws.amazon.com/about-aws/whats-new/2025/12/security-hub-near-real-time-risk-analytics/'
  - title: 'Microsoft Defender for Cloud: attack path analysis'
    url: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-attack-path'
  - title: 'Microsoft Defender for Cloud: cloud security posture management'
    url: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management'
  - title: 'Azure Policy: assignment structure'
    url: 'https://learn.microsoft.com/en-us/azure/governance/policy/concepts/assignment-structure'
  - title: 'Azure Policy: exemption structure'
    url: 'https://learn.microsoft.com/en-us/azure/governance/policy/concepts/exemption-structure'
  - title: 'Kubernetes: Pod Security Standards'
    url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/'
  - title: 'Kubernetes: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'AWS IAM Access Analyzer findings'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html'
  - title: 'Google Security Command Center service tiers'
    url: 'https://docs.cloud.google.com/security-command-center/docs/service-tiers'
  - title: 'Google Cloud Threat Horizons Report H1 2026'
    url: 'https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026'
  - title: 'CISA BOD 26-04: Prioritizing Security Updates Based on Risk'
    url: 'https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk'
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

A posture platform evaluates resources against rules and returns the deviations. The list has no boundary, so it cannot say whether the position is acceptable, and the evidence behind it expires in ways the list does not show.

**Reachability changes without a new finding.** AWS documents that Security Hub exposure findings assess network reachability, covering internet exposure and internal paths through security groups and network ACLs, and combine it with vulnerabilities, configurations, threats and resource relationships. A weakness that was deprioritised because nothing could reach it becomes reachable when a network rule is opened. No scanner raises a new vulnerability, because there is none.

**The path analysis covers part of the estate.** Microsoft states that attack path analysis in Defender for Cloud needs the Defender CSPM plan, together with agentless scanning for virtual machines or the vulnerability assessment in Defender for Servers. A subscription without them produces no attack paths. The empty result reads the same as a subscription that has none.

**Controls are assigned in a mode that does not block.** An Azure Policy assignment carries an enforcement mode, and `DoNotEnforce` evaluates resources without applying the policy effect. Kubernetes Pod Security Admission applies a profile per namespace in enforce, audit or warn mode. The control appears in the inventory either way. Whether it prevents anything depends on a setting that is rarely reported.

**Exemptions are counted as compliant.** Azure Policy exemptions have an optional expiration, and Microsoft documents that exempt resources count toward overall compliance. A compliance percentage can therefore rise because resources were exempted.

**Ownership lapses.** The exposure was assigned to a team that has since been reorganised. The assignment remains on the record and nobody is acting on it.

## What is at stake

Cloud intrusions seldom depend on an unpatched flaw alone. The Google Cloud Threat Horizons Report H1 2026 found that threat actors exploited identity issues to gain initial access in 83% of the incidents it examined involving major cloud and SaaS-hosted environments. Improperly configured assets accounted for 7% and vulnerability exploitation for 2%. A programme that ranks cloud findings by vulnerability severity is ordering its work by the smallest of those categories.

The first consequence is disclosure through a resource that nobody knew was public: a data store, a management interface or a snapshot opened for a short task and left open. The enterprise learns of the exposure from outside.

The second is misdirected effort. When the queue is ordered by severity, finite capacity is spent on weaknesses that cannot be reached while reachable ones age.

The third is a report that cannot be relied on. A falling count of open findings does not show that the reachable exposure is smaller, or say which exposures are open today, for how long and under whose ownership.

## What Xyvionix assures

Xyvionix holds six statements about the cloud estate as current facts, each tested against a threshold agreed with the business.

1. **Coverage is declared.** Every account, subscription, project and cluster in scope has a current evaluation, and the analysis features that the thresholds depend on are enabled there. A scope without them is Unassured.
2. **Public exposure is intended.** Every resource reachable from the internet appears in a register with a business reason, an owner and a date on which the reason was last confirmed.
3. **Reachable exposure is inside its age limit.** Each open exposure on a path to a valued asset has a first-detected date and a window. The window is set by the asset and by how readily the path can be used.
4. **Preventive controls prevent.** The controls the business relies on are in an enforcing mode in production scopes, and exemptions from them are bounded by an owner and an expiry.
5. **Closed exposures stay closed.** A corrected configuration is still correct after the next deployment from its source.
6. **Every open exposure has an owner.** The owner is a named person with authority to change the resource, not a queue.

Three neighbouring subjects are assured separately. Software weaknesses on a reachable asset are corrected and re-tested under [Vulnerability Remediation Assurance](/vulnerability-remediation-assurance). The permissions an identity carries along a path are held under [Identity Exposure Assurance](/identity-exposure-assurance). Divergence between the approved definition and the running estate is held under [Cloud Drift Assurance](/cloud-drift-assurance).

## Common failure modes

- **The queue sorted by severity.** Critical findings on isolated assets are worked first. A moderate misconfiguration on an internet-facing service with access to customer data waits behind them.
- **Public for a reason that has ended.** A resource was opened for a supplier test, a migration or a demonstration. The work finished and the opening did not.
- **A clean result from a scope that was never analysed.** IAM Access Analyzer external access findings are free of charge, while its unused access and internal access findings are charged. Coverage that follows cost is often partial, and the accounts left out report nothing.
- **Fixed in the console, reopened by the pipeline.** The live resource was corrected during triage. The definition was not, and the exposure returned on the next run with a new finding identifier and no history.
- **An unsupported component at the edge.** The Kubernetes project stated that best-effort maintenance of Ingress NGINX would continue until March 2026, with no further releases, bug fixes or security updates afterwards. A controller of that kind is internet-facing by design. An absence of open findings against it means that nobody is publishing fixes.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production is affected.

A reachable weakness can be closed by removing the path, by removing the weakness or by reducing what the asset at the end of the path can access. The quickest safe option is taken first to end the exposure window, and the lasting one follows.

The correction is then made at the source. A network rule or storage setting is changed in the module or template that declares it, so that the pipeline carries the fix. A control in a non-enforcing mode is moved to enforcement after the resources that would fail it have been corrected or exempted with an expiry. A scope with no evaluation is brought into coverage.

Where the business decides that an exposure must remain, such as a service that has to be public, the decision is entered in the public exposure register with its owner and a review date. Where no owner can be found, finding one is the first action, and the exposure is reported as unowned until it is done.

## Verified closure

An exposure is closed when a fresh observation shows that the path is gone, not when the change was approved or the finding changed status.

Closure requires four results. The live configuration, read from the provider, holds the corrected value. The resource refuses the access it should refuse when tested from the position the exposure described, whether that is the internet or another network segment. The next evaluation by the posture platform no longer reports the path. The service that depended on the resource still works for the users and systems that are meant to reach it.

A fifth result is collected later. After the next deployment from the source definition, the observation is repeated. If the exposure has returned, the record reopens against the original closure and the source is corrected. A resource that is opened repeatedly is then visible as a fault in a template or a working practice.

## Technology and industry context

The platforms name and package these capabilities differently. AWS Security Hub, generally available since 2 December 2025, correlates signals from several services into exposure findings, and the earlier standards-based product is now AWS Security Hub CSPM. The two names refer to different things.

Evidence sources also change on the vendor's calendar. Microsoft states that from 27 October 2026 Foundational CSPM is no longer enabled by default for new Azure subscriptions. Google states that the Security Command Center Enterprise service tier will shut down on 21 May 2027, with organisations moved automatically to Premium. In each case the analysis available to the enterprise changes on a date it did not choose, and the coverage register has to be re-confirmed afterwards.

Public exposure is now treated as an input to remediation deadlines. CISA Binding Operational Directive 26-04, issued on 10 June 2026 for United States federal civilian agencies, requires those agencies to tag all publicly reachable assets and to attest quarterly to them. Its remediation timelines depend on whether the asset is publicly exposed. An out-of-date exposure inventory therefore produces the wrong deadline.

In sectors that hold regulated personal data, such as healthcare, the question after an incident is how long the data could be reached and who was accountable for the resource. It is answered from a dated exposure record, not from a current scan.
