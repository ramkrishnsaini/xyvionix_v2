---
title: High Change Failure Rate
h1: 'When too many releases fail: measure honestly, then decide the pace'
seoTitle: 'High Change Failure Rate: Measure, Classify, Correct | Xyvionix'
description: >-
  What to prove when too many releases need a rollback or hotfix: an honest
  rate, failures by class, the gates they passed and when pace must change.
summary: >-
  Release risk shows up as failed changes and unplanned rework. The position is
  set by a rate calculated from records, failures classed by what let them
  through, exposure at detection and an agreed point at which pace changes.
lede: >-
  A high change failure rate is the situation in which too many production
  deployments need immediate intervention, such as a rollback, a hotfix or a
  flag switched off. The state is At risk: the rate is outside what the
  business agreed to absorb. What has to be established is whether the rate is
  measured from records, which class of failure is driving it, which gates
  those failures passed, how many customers were exposed, and what changes
  about release pace while the gates are repaired.
ogQuestion: Why do so many releases need a rollback or a hotfix?
cluster: change
secondary:
  - reliability
parent: use-cases
state: risk
audience:
  - VP Engineering
  - Head of SRE
  - CTO
intent: 'Problem: too many releases cause incidents, rollbacks or rework'
related:
  assurance:
    - release-assurance
    - rollback-readiness-assurance
    - incident-recurrence-assurance
  useCases:
    - cloud-incident-recurrence
    - schema-change-production-impact
  technologies:
    - eks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
    - software-technology
  insights:
    - what-change-failure-rate-proves
evidence:
  - name: Counting rules
    detail: >-
      The agreed, dated definition of what counts as a deployment and what
      counts as an intervention, including configuration, flag and
      infrastructure changes, so that the rate cannot move by redefinition.
  - name: Deployment log with intervention marks
    detail: >-
      Every production deployment in the period, marked with whether it
      needed immediate intervention and whether it was itself an unplanned
      deployment made because of an incident.
  - name: Failure classification
    detail: >-
      Each failed deployment classed by what let the fault through, such as
      gate coverage, exposure control, an ungated channel, an irreversible
      step or the combined effect of changes.
  - name: Gate pass record for failed releases
    detail: >-
      For each failed deployment, the gates it passed on its way to
      production, which identifies the gates that do not test the class of
      fault that is recurring.
  - name: Exposure at detection
    detail: >-
      The stage the release had reached and the share of customers or
      tenants receiving it when the failure was detected.
  - name: Recovery time per failed deployment
    detail: >-
      The interval from detection to restored service for each failure, with
      the route used: rollback, forward fix or flag.
  - name: Pace decision record
    detail: >-
      The decision taken when the boundary was crossed, its scope, the
      person who took it, and the evidence required to lift it.
thresholds:
  - signal: Change fail rate on critical services
    basis: The share of each journey's error budget that the business allows its own releases to consume
    lostWhen: The rate is outside the agreed boundary for consecutive periods
  - signal: Deployment rework rate
    basis: The delivery capacity the business accepts losing to unplanned deployments
    lostWhen: Unplanned deployments following incidents exceed the agreed share of all deployments
  - signal: Failed deployments that cannot be tied to a record
    basis: A rate used as a threshold has to be calculated from records, not estimated
    lostWhen: Any intervention in the period cannot be linked to the deployment that preceded it
  - signal: Failures detected at full exposure
    basis: The size of the customer population the business accepts exposing to an unverified release
    lostWhen: A failed release to a critical service is detected only after it has reached all customers
  - signal: Failed deployment recovery time
    basis: The recovery time the business has agreed for the service
    lostWhen: Recovery from a failed deployment takes longer than the agreed time
  - signal: Repeat failures within a class
    basis: A corrected gate is expected to stop the class of fault it was corrected for
    lostWhen: A release fails in a class whose gate was recorded as repaired
faqs:
  - q: What is an acceptable change failure rate?
    a: >-
      There is no figure that suits every service. The boundary is set from
      the error budget of the journeys a service supports and from how much
      of that budget the business is willing to spend on its own releases.
      Published survey figures describe the population that was surveyed.
      They do not describe what a particular service can absorb.
  - q: Should releases be frozen until the rate improves?
    a: >-
      A general freeze lowers the number of failures and proves nothing about
      the gates. Work accumulates behind it, and the first release afterwards
      is larger than any before. A targeted change of pace is more useful:
      smaller releases, smaller first stages, longer holds, or a pause on the
      one class of change that is failing.
  - q: Release volume rose with AI-assisted development. Is that the cause?
    a: >-
      The 2025 DORA report found that AI adoption has a positive relationship
      with delivery throughput and a negative relationship with delivery
      stability, and describes AI as an amplifier of existing strengths and
      weaknesses. That is a finding about a survey population. For one
      service, the failure classification shows whether the gates were
      sufficient for the earlier volume and are not for the present one.
sources:
  - title: 'DORA research: software delivery performance metrics'
    url: 'https://dora.dev/guides/dora-metrics/'
  - title: 'DORA research programme'
    url: 'https://dora.dev/research/'
  - title: 'Announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
  - title: 'Azure post-incident review YKYN-BWZ, Azure Front Door, 29 to 30 October 2025'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ'
  - title: 'Azure post-incident review ZJV6-SGG, West US, 23 July 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG'
  - title: 'Google Cloud incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## What changed

Too many releases now need someone to step in. A deployment is rolled back, patched within hours or disabled behind a flag. The rate has crossed the boundary the business agreed. Where no boundary was agreed, the pattern has become visible through customer impact.

DORA research names the measure change fail rate and defines it as "the ratio of deployments that require immediate intervention following a deployment". It is widely written as change failure rate. It is one of five software delivery metrics and one of two that measure instability. The other is deployment rework rate: "the ratio of deployments that are unplanned but happen as a result of an incident in production".

The volume of change has moved as well. The 2025 DORA report, the latest edition, found that 90% of respondents use AI at work. It found that AI adoption has a positive relationship with software delivery throughput and continues to have a negative relationship with software delivery stability. More change is passing through gates that were sized for less.

The state is At risk. A threshold has been breached, so corrective action is due.

## The business outcome at risk

The first outcome is service to customers. Failures caused by the enterprise's own releases are the ones it has most control over, and customers do not distinguish them from any other outage.

The second is delivery capacity. Every failed deployment produces at least one unplanned deployment to correct it. The team delivers the same change twice and the plan for the quarter absorbs the difference.

The third is the freedom to release at the pace the business wants. A team that cannot show why releases fail will have its pace set for it, usually by a freeze. A team that can show the class of failure and the gate responsible can propose a narrower remedy and keep releasing.

## What must be proven

**The rate is calculated from records.** Each intervention is linked to the deployment that preceded it. The counting rules are written down: what is a deployment, what is an intervention, and whether configuration, flag and infrastructure changes are included in both.

**Failures are classed by what let them through.** The class points to where the correction belongs.

| Failure class | What let it through | Where the correction sits |
|---|---|---|
| A defect that a test could have caught | Gate coverage | Pre-release gates |
| A fault that appears only under production load or data | Exposure control | Stage size and hold time |
| A configuration or flag change made outside the pipeline | An ungated channel | Controls on that channel |
| A migration or state change that could not be undone | Reversibility | The reverse path |
| Changes that each passed and failed together | Aggregate validation | Release composition |

**The gates that failed releases passed.** A gate that passed every failed release in a class does not test that class, whatever its name suggests.

**Exposure at the moment of detection.** A failure found at the first stage and a failure found at full exposure count the same in the rate. They are not the same to customers.

**Recovery.** DORA research measures failed deployment recovery time, the time taken to recover from a deployment that fails and requires immediate intervention. It is recorded per failure with the route used.

How gates and staged exposure are held as continuing evidence is described in [Release Assurance](/release-assurance). Whether a failed release can be reversed in time is covered by [Rollback Readiness Assurance](/rollback-readiness-assurance).

## What causes assurance to be lost

**The figure is flattered.** Only declared incidents are counted as failures, so a quiet rollback does not register. Hotfixes are counted as ordinary deployments. In an illustrative case, one failed release followed by three hotfixes is recorded as four deployments and one failure. The rate falls and deployment frequency rises, and both charts improve because of the failure.

**Each change is validated alone.** Microsoft's review of the West US incident of 23 July 2026 found that safety checks validated each optical device individually and not the aggregate effect of the repair. Release pipelines share the pattern. Every service passes its own checks, and nothing tests the set of changes that ship together.

**The fault waits for a condition.** Google's report on its incident of 12 June 2025 describes a change shipped on 29 May without feature-flag protection, which failed when a later policy change reached it. A release of that kind is recorded as a success on the day it ships.

**The boundary has no consequence.** The rate is reported monthly and nothing is decided when it crosses the line. It is a statistic, not a threshold.

Changes that reach production through routes other than the release pipeline are part of the same problem, described at cluster level in [Change Assurance](/change-assurance).

## Corrective action

Crossing the boundary changes the pace of release. The change is targeted.

- **Smaller releases.** Fewer changes in each deployment reduce the combinations that were never tested together.
- **Smaller first stages and longer holds.** Fewer customers are exposed before the evidence arrives.
- **A pause on one class.** If migrations are the failures, migrations wait while other changes continue.
- **Reversible changes only.** Until the reverse path is proven, changes that cannot be undone need a recorded decision.

Providers have taken the same course after their own failures. Microsoft's repair items following the Azure Front Door incident of October 2025 include a pre-canary stage and extended bake time at each rollout stage. Google committed to feature-flag protection for changes to critical binaries. Both slowed exposure. Neither stopped change.

The gates are repaired in parallel, beginning with the class that fails most. Under assurance, Xyvionix owns those corrections through to completion within the access it has been granted, and uses the enterprise's own change process. The pace decision belongs to the business and is recorded with its owner and the evidence that will lift it.

## What verified closure looks like

The situation is closed when four results hold together.

Change fail rate is inside the agreed boundary for consecutive periods, calculated under the same counting rules as before. Deployment rework rate has fallen as well, which shows that failures were not moved from one count to the other. Deployment frequency has not collapsed, because a rate that improves when releases stop has proved nothing. For each failure class that drove the breach, a deliberately faulty release of that class has been submitted and stopped by the repaired gate.

The pace restriction is then lifted by decision. If a release later fails in a class recorded as corrected, the original finding reopens. Failures that return in this way are examined in [Cloud Incident Recurrence](/cloud-incident-recurrence).

## What to do next

The first step needs a deployment history and an incident history. Take every production deployment from a fixed recent period. Mark each one twice: whether it needed immediate intervention, and whether it was itself an unplanned deployment made because of an incident. Calculate both rates by hand and compare them with the figures currently reported.

For each failure, write its class and the gates it passed. The class with the most entries shows which gate to repair first and which kind of change to slow down. What the metric can and cannot support is examined in [What Change Failure Rate Proves](/what-change-failure-rate-proves).
