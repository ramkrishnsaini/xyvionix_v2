---
title: Cloud Incident Recurrence
h1: When a production incident returns after it was reported as resolved
seoTitle: 'Cloud Incident Recurrence: Why Incidents Return | Xyvionix'
description: >-
  What to establish when a class of production incident keeps returning: which
  fixes were verified, which causes repeat, and what evidence closes them.
summary: >-
  Repeat incidents show that corrective actions were recorded but not completed
  or not verified. The position is recovered by re-reading past incidents by
  cause, testing each claimed fix and tracking repeats against the error budget.
lede: >-
  Cloud incident recurrence is the situation in which a class of production
  incident returns after it was reported as resolved. The state is Degrading:
  objectives are still met, while the interval between similar incidents
  shortens and more of the error budget is spent on causes already identified.
  The position is recovered by classifying past incidents by cause, finding the
  corrective actions that were never verified, and proving each fix under test.
ogQuestion: Why does the same incident keep coming back?
cluster: reliability
secondary: []
parent: use-cases
state: degrading
audience:
  - Head of SRE
  - VP Engineering
  - CTO
intent: 'Problem: the same class of production incident keeps returning'
related:
  assurance:
    - incident-recurrence-assurance
    - slo-assurance
    - production-observability-assurance
  useCases:
    - high-change-failure-rate
    - cloud-configuration-drift
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - gcp-production-reliability
  industries:
    - saas-production-reliability
  insights:
    - why-production-incidents-recur
evidence:
  - name: Incident history re-read by cause
    detail: >-
      Every incident in the agreed look-back period, classified again by the
      kind of cause and by what slowed detection and recovery, so that
      incidents with different titles and services can be counted together.
  - name: Action state in production
    detail: >-
      For each corrective action raised in that period, the condition of the
      running system today: whether the change is present, where, and whether
      a later release or rebuild removed it. Ticket status is not the source.
  - name: Test result for each claimed fix
    detail: >-
      A dated result from recreating the triggering condition and observing
      that the failure does not follow, with the environment it ran in. A fix
      with no such result is recorded as unproven.
  - name: Repeat timeline per cause class
    detail: >-
      The dates of each incident within a cause class and the interval between
      them, which shows whether repeats are isolated or arriving faster.
  - name: Error budget attribution
    detail: >-
      The share of each journey's error budget consumed by incidents whose
      cause a previous review had already identified, separated from budget
      consumed by new causes.
  - name: Provider dependency impact record
    detail: >-
      The enterprise's own account of each cloud provider incident that reached
      its services, naming the dependency through which the impact arrived and
      the action taken on that dependency afterwards.
thresholds:
  - signal: Interval between incidents that share a cause class
    basis: The period over which the business expects a reported fix to hold
    lostWhen: A repeat occurs inside that period, or the interval shortens across consecutive occurrences
  - signal: Error budget spent on previously identified causes
    basis: The budget exists to fund change, so the share lost to known causes is set by how much change the business needs
    lostWhen: Known causes consume more than the agreed share of a journey's budget in a window
  - signal: Claimed fixes with no passing test
    basis: Closure is a claim about production and the severity of the incident sets how much proof it needs
    lostWhen: A fix for a high-severity incident in the look-back period cannot be shown by a dated test
  - signal: Past review actions still open
    basis: The exposure that remains while the action is incomplete
    lostWhen: An action passes its agreed date without completion or an owned decision to extend or accept
  - signal: Provider incidents arriving through the same dependency
    basis: How long the affected journey can be unavailable compared with the provider's observed recovery time
    lostWhen: A second provider incident reaches the enterprise through a dependency that has no tested alternative
faqs:
  - q: How far back should the incident history be re-read?
    a: >-
      Far enough for causes to appear more than once and to reach the oldest
      fix the service still relies on. The look-back is set by incident volume
      and by the age of those fixes, not by a reporting year. A period with a
      handful of incidents rarely shows a pattern.
  - q: The repeat incidents were caused by the cloud provider. Is that recurrence?
    a: >-
      On the enterprise's side it is. The provider's cause may differ each
      time. If the impact arrived through the same ingress path, identity
      dependency or region, the enterprise's own contributing factor repeated,
      and it is the one factor the enterprise can act on.
  - q: Incident numbers are falling. Does that settle the question?
    a: >-
      Not by itself. A falling count can reflect changed severity rules,
      incidents merged into one record or degradations that never opened an
      incident. Recurrence is read from cause classes and error budget, which
      are harder to improve by reclassification.
sources:
  - title: 'Azure post-incident review YKYN-BWZ, Azure Front Door, 29 to 30 October 2025'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ'
  - title: 'Azure post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Azure post-incident review ZJV6-SGG, West US, 23 July 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG'
  - title: 'Azure post-incident review GHRP-84G, West US 2, 29 to 30 May 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G'
  - title: 'Google Cloud incident report, us-west1, 20 August 2026'
    url: 'https://status.cloud.google.com/incidents/utF3FMFdQfwBzJcGG6vf'
  - title: 'AWS post-event summaries'
    url: 'https://aws.amazon.com/premiumsupport/technology/pes/'
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

A production incident has occurred that the team has seen before. The service is different and so is the title. The review reaches a finding that an earlier review also reached: a timeout that was too short, a dependency with no fallback, a change that passed its checks and failed on contact with the rest of the system.

Nothing new was introduced. What changed is what the business knows. The earlier incident was reported as resolved, its actions were marked complete, and the cause was still present. Every other closure in the incident record now carries the same doubt.

The state is Degrading. Services meet their objectives in most windows and no single incident is severe. The evidence is moving the wrong way. Intervals between similar incidents are shortening, actions from older reviews remain open, and a growing share of the error budget goes to causes that had already been named.

## The business outcome at risk

The outcome at risk is the service level the business has committed to its customers, which has not yet been breached. A Degrading state is a forecast. If repeats continue at the current interval, the date on which the objective is missed can be estimated, and that estimate is what makes the situation worth acting on while it is still inexpensive.

The second outcome is the pace of delivery. Error budget spent on a known cause is budget that a release cannot use. Teams slow down or release without margin, and neither choice appears in the incident record as a consequence of recurrence.

The third is the cost of the first response. The earlier incident consumed a review, a set of actions and the attention of the people who completed them. A repeat shows that the expense bought a document. The business paid for a correction and received a description.

## What must be proven

Four things establish the position. None of them requires a new incident to occur.

1. **Which incidents are the same incident.** The history is re-read and each incident is classified by cause, including the factors that delayed detection and slowed recovery. Titles, services and severity are set aside.
2. **Which fixes exist in production today.** Each action recorded as complete is checked against the running system. The question is whether the change is present now, not whether it was merged then.
3. **Which fixes work.** The triggering condition is recreated and the failure is shown not to follow. A fix that cannot be tested is recorded as unproven.
4. **What recurrence is costing.** Budget consumed by known causes is separated from budget consumed by new ones, per journey.

The continuing form of this proof, in which every cause keeps a test that is re-run as the system changes, is described in [Incident Recurrence Assurance](/incident-recurrence-assurance). The objectives and budgets that the fourth item draws on are held under [SLO Assurance](/slo-assurance).

## What causes assurance to be lost

In this situation the loss has already happened. The useful question is which route each failed fix took, because the routes need different corrections.

**The fix was scoped to the incident, not to the cause.** After a zone outage, a workload is spread across zones. That corrects the incident that occurred. The cause was dependence on one location, and the correction covers one size of failure. In the Azure West US 2 incident of 29 to 30 May 2026, Microsoft reports infrastructure shutdowns in two physical availability zones after a storm. Google reports that on 20 August 2026 scheduled fibre optic maintenance compromised network capacity between data centres in us-west1, affecting multiple products in the region. A design corrected for the loss of one zone was not corrected for either event.

**Provider attribution ended the review.** Microsoft's post-incident reviews for October 2025, February 2026 and July 2026 describe three different causes: incompatible configuration metadata in Azure Front Door, a remediation workflow that disabled anonymous access on storage accounts, and a maintenance defect that widened a repair across optical devices. An enterprise affected by more than one of them did not meet the same provider fault twice. It was reached twice through its own design, such as a single ingress path, a shared identity dependency or a single region. A review that records "provider fault" and stops has left the repeating factor unexamined.

**No published report, so no record.** As of September 2026, AWS's index of post-event summaries lists the October 2025 event in US-EAST-1 as its most recent entry. An enterprise that relies on provider reports as its incident record has no record of any event the provider did not write up.

**The fix was present and then removed.** A value changed by hand during the incident was restored to its old setting by a routine deployment, which is the pattern described in [Cloud Configuration Drift](/cloud-configuration-drift). A guard added to the pipeline was lost in a later refactor.

**The repeat arrived with a release.** Where similar incidents follow deployments, recurrence and release risk are one problem, covered in [High Change Failure Rate](/high-change-failure-rate).

## Corrective action

Correction begins with the record. Under assurance, Xyvionix owns that work through to completion within the access it has been granted, and uses the enterprise's own change process for anything that alters production.

The first action is to reopen every incident whose fix has no passing test. Reopening is an accurate statement of the evidence. It is not a judgement on the team that closed the incident.

The second is to build the missing test for each cause class, starting with the classes that have repeated. One test written against a cause covers every service that shares it.

The third is to follow each cause to where it sits. A cause that repeats across services usually lives in a shared platform default, a common library or a dependency owned by another team, and the action is raised against that owner.

For provider dependencies the correction is a tested alternative, or a decision. Where the business accepts exposure to a single region or edge service, the acceptance is recorded with its owner and an expiry date.

## What verified closure looks like

The situation is closed when the trend has reversed and the reason is known.

Each cause class that repeated has a test that recreates its trigger, and the latest run passed against the current version of the system. Each action recorded as complete has been found in production. The alert for the condition fires when the condition is injected. The share of error budget spent on known causes has fallen for consecutive windows, on journeys where the fixes were applied.

One further result separates closure from a quiet month. The test for each cause runs again when the affected component changes, and a failing run reopens the original incident record. Absence of incidents is weak evidence, because a cause can lie dormant until traffic, data or a release reaches it.

## What to do next

One exercise can be done with the records the team already holds. Take the incident reviews from a fixed look-back period and list them in a table with three columns: the cause class, the action that was meant to remove the cause, and the evidence that it did.

The third column is the finding. Where it reads "ticket closed", "merged" or is empty, the incident is closed on intent. Count those rows, then sort the table by cause class and count the classes that appear more than once. Those two numbers describe the current position more accurately than the incident count, and they show which test to build first.
