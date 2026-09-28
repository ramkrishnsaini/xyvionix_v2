---
title: Incident Recurrence Assurance
h1: Close incidents by proving the cause is gone, and keep proving it
seoTitle: 'Incident Recurrence Assurance: Causes Proven Absent | Xyvionix'
description: >-
  Continuous assurance that incident causes are removed and stay removed:
  corrective actions verified by test, recurrence measured by cause class.
summary: >-
  An incident is closed when its cause can be shown absent under test, not when
  the review document is filed. Corrective action completion, recurrence tests,
  contributing-factor coverage and repeat-incident rate are held as thresholds.
lede: >-
  Incident recurrence assurance is the continuing proof that the causes of past
  incidents have been removed from production and have not returned. An
  incident is closed when the condition that produced it is reproduced under
  test and the failure does not follow. The test is kept and run again, because
  a fix that held on the day it was deployed can be undone by a later release,
  a configuration change or a rebuilt environment.
ogQuestion: 'Has the cause been removed, or only the symptom?'
kind: child
cluster: reliability
secondary: []
parent: production-reliability-assurance
state: assured
audience:
  - Head of SRE
  - VP Engineering
  - Technology Risk
intent: 'Commercial: proving that incident causes are removed and stay removed'
related:
  assurance:
    - slo-assurance
    - production-observability-assurance
    - release-assurance
  useCases:
    - cloud-incident-recurrence
    - high-change-failure-rate
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - gcp-production-reliability
  industries:
    - saas-production-reliability
    - financial-services
  insights:
    - why-production-incidents-recur
evidence:
  - name: Corrective action register
    detail: >-
      Every action arising from an incident review, with its owner, its target
      date, the contributing factor it addresses and its current status,
      held in one place across teams.
  - name: Contributing-factor map
    detail: >-
      For each incident, the factors the review identified, including the
      trigger, the latent condition, the missed detection and whatever slowed
      recovery, each linked to an action or to a recorded decision not to act.
  - name: Recurrence test per cause
    detail: >-
      A repeatable test that recreates the triggering condition and shows the
      failure does not follow, with the date of its last passing run and the
      environment it ran in.
  - name: Detection proof
    detail: >-
      Evidence that the alert added after the incident fires when the
      condition is injected, reaches the intended responder and is not
      suppressed by later changes to telemetry.
  - name: Cause-class record
    detail: >-
      Each incident classified by the kind of cause, not by its title or the
      service affected, so that incidents sharing a cause are counted
      together.
  - name: Deployment-to-incident link
    detail: >-
      The record that ties an incident to the deployment that preceded it and
      to the unplanned deployments that followed, which is what makes change
      fail rate and deployment rework rate measured figures.
  - name: Provider incident impact record
    detail: >-
      The enterprise's own account of how each cloud provider incident
      affected its services, with the provider's published repair items and
      their dates where a review exists.
thresholds:
  - signal: Corrective actions open past their target date
    basis: The severity of the incident and the exposure that remains while the action is open
    lostWhen: An action on a high-severity incident passes its date without completion or a recorded, owned decision to extend
  - signal: Contributing factors without an action or a decision
    basis: The business requires every identified factor to be addressed or knowingly accepted
    lostWhen: Any factor from a closed review has neither an action nor an accepted-risk record with an owner
  - signal: Age of the last passing recurrence test
    basis: The rate of change in the service and the platform beneath it
    lostWhen: A release, configuration change or platform upgrade has reached the affected component since the test last passed
  - signal: Repeat incidents by cause class
    basis: The error budget of the affected journeys and the tolerance the business has set for repeat failure
    lostWhen: A second incident is attributed to a cause class that a previous review recorded as corrected
  - signal: Actions closed without re-test
    basis: Closure is a claim about production, so it requires evidence from production or a faithful copy of it
    lostWhen: Any action is marked complete on ticket status alone
faqs:
  - q: Post-incident reviews are already held and actions are tracked. What is missing?
    a: >-
      Usually two things. The first is proof: an action marked complete shows
      that work was done, not that the cause is absent. The second is
      continuity. A fix verified once is not re-verified when the component
      is next changed. Assurance adds a recurrence test for each cause and
      keeps running it.
  - q: How can recurrence be measured when no two incidents look the same?
    a: >-
      By classifying cause, not symptom. Two incidents with different titles
      on different services can share a cause, such as a change that passed
      its own validation and failed in aggregate. Counting by cause class
      shows repetition that a list of incident titles hides.
  - q: What about incidents caused by the cloud provider?
    a: >-
      The provider's cause is outside the enterprise's control. The
      enterprise's exposure to it is not. The corrective action is on the
      dependency: an alternate path, a tested failover or a tolerance for the
      provider's observed recovery time. Those are tested like any other
      correction.
sources:
  - title: 'DORA research: software delivery performance metrics'
    url: 'https://dora.dev/guides/dora-metrics/'
  - title: 'Azure post-incident review ZJV6-SGG, West US, 23 July 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG'
  - title: 'Azure post-incident review YKYN-BWZ, Azure Front Door, 29 to 30 October 2025'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ'
  - title: 'Azure post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Google Cloud incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
  - title: 'AWS post-event summary: Amazon DynamoDB disruption in US-EAST-1, October 2025'
    url: 'https://aws.amazon.com/message/101925/'
  - title: 'AWS post-event summaries'
    url: 'https://aws.amazon.com/premiumsupport/technology/pes/'
  - title: 'Google Cloud Well-Architected Framework: reliability pillar'
    url: 'https://docs.cloud.google.com/architecture/framework/reliability'
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'FCA operational resilience'
    url: 'https://www.fca.org.uk/firms/operational-resilience'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## Why assurance is lost

An incident review produces a document and a list of actions. Both are records of intent. The evidence that the cause has been removed is a different artefact, and in most organisations it is never produced.

**Closure is recorded on ticket status.** An action is marked complete when the work is merged. Nobody recreates the condition that caused the incident to see whether the failure still follows. The review is filed and the incident is counted as resolved.

**The symptom is corrected and the cause remains.** The instance that ran out of memory is resized. The reason it ran out of memory is not found. The incident returns on a different instance with a different title.

**Only the trigger is addressed.** A review identifies several contributing factors: the trigger, the latent condition it exposed, the alert that did not fire and the step that slowed recovery. Actions are raised for the first. The rest stay in the document.

**The fix is undone later.** A timeout raised after an incident is lowered by a later release. A guard added to a pipeline is removed in a refactor. An environment is rebuilt from a definition that never held the fix. Each change is reasonable on its own, and none of them reopens the incident.

**Incidents are matched by title.** Recurrence is looked for as the same service failing in the same way. Causes repeat across services. Six published cloud provider incidents between 2025 and 2026 had different services, regions and titles and one class of cause: a change or an automation passed its own validation and failed in aggregate or on activation.

**Actions age without a date.** Cloud providers publish repair items with target dates. Microsoft's review of the West US incident of 23 July 2026 lists items due from August to October 2026. Few enterprises can show the same for their own incidents: which actions closed, when, and whether the fix was verified.

## What is at stake

A repeat incident costs more than the first. The business was told the matter was resolved, so the second occurrence damages confidence in every other closure the team has reported.

Repeat incidents also consume the error budget that was meant to fund change. A service that spends its budget on causes it had already identified has nothing left for releases, and delivery slows for a reason that does not appear in any delivery metric.

The delivery figures are affected directly. DORA research defines deployment rework rate as the ratio of deployments that are unplanned but happen as a result of an incident in production. Every recurrence adds to it. The figure can only be measured if each incident is linked to the deployments around it. Without that link it is an estimate.

For technology risk the consequence is an audit position that cannot be defended. A register of completed actions with no evidence of effect shows that a process ran. It does not show that the risk reduced.

## What Xyvionix assures

Xyvionix holds five statements about the incident record as current facts, tested against thresholds agreed with the business.

1. **Every contributing factor has an outcome.** Each factor in a review is linked to a corrective action or to an accepted-risk decision with an owner and an expiry date.
2. **Every action has an owner and a date.** Actions that pass their date are visible to the people accountable for the service, not only to the team that raised them.
3. **Every cause has a recurrence test.** The triggering condition can be recreated, and the last passing run is dated.
4. **Detection has been proven.** The alert that should have fired is shown to fire when the condition is injected.
5. **Recurrence is measured by cause class.** A second incident with a cause recorded as corrected reopens the original record.

The objectives and error budgets that incidents draw on are held under [SLO Assurance](/slo-assurance). Whether the telemetry behind an alert still arrives is held under [Production Observability Assurance](/production-observability-assurance).

## Common failure modes

- **Validated per item, failed in aggregate.** In the West US incident of July 2026, Microsoft reports that safety checks validated each optical device individually and not the aggregate effect of the repair. The same pattern appears in enterprise change pipelines where each service passes its own checks and the combined release fails.
- **Dormant code activated by data.** Google's report on its incident of 12 June 2025 describes a code path shipped on 29 May without error handling or feature-flag protection, which crashed when a policy change with blank fields replicated globally. A fix tested against deployments does not cover a cause that is triggered by data.
- **Recovery slowed by retries.** Google's June 2025 report and Microsoft's review of the February 2026 Azure incident both describe retry load delaying recovery after the fault was fixed. Reviews that stop at the trigger leave retry and backoff settings untested.
- **A long tail treated as a short incident.** In the AWS US-EAST-1 event of October 2025 the DynamoDB DNS fault lasted under three hours, and EC2 instance launches were impaired until the following afternoon. A review scoped to the initial fault misses the dependencies that set the real duration.
- **No record of provider incidents.** AWS's index of post-event summaries lists the October 2025 event as its most recent entry. Provider summaries cover selected events, so an enterprise without its own impact record has no evidence for the others.
- **The alert that was added and never tested.** A new alert is created after the incident. A later change to metric names or collectors stops it matching, and it stays silent through the recurrence.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a change to production is required.

Ownership here means carrying an action across the boundaries where actions usually stall. The cause of an incident in one service is often a default in a shared platform or a behaviour in a dependency owned by another team. The action is followed to wherever the cause sits.

Where no recurrence test exists, building it is the first correction. Where the cause cannot be removed, such as a dependency on a provider's regional control plane, the correction is a tested mitigation, and the residual risk is recorded with an owner and an expiry date.

Corrections are themselves changes. They are staged and verified like any other, under the controls described in [Release Assurance](/release-assurance).

## Verified closure

An incident is closed when four results are recorded.

The triggering condition is recreated in production or in an environment shown to match it, and the failure does not follow. The alert for the condition fires and reaches the intended responder. Each contributing factor in the review has a completed action with its own re-test, or an accepted-risk record. The recurrence test is added to the set that runs when the affected component changes.

The last of these is what separates assurance from a well-run review. Closure proven once describes one version of the system. The test is re-run on each release, configuration change and platform upgrade that reaches the component, and a failing run reopens the original incident record. Recurrence is then detected by a test, before it is detected by customers.

Where the condition cannot safely be recreated in production, the closure record states that, names the environment used and lists the differences between it and production. The evidence is then graded accordingly.

## Technology and industry context

Provider guidance treats learning from incidents as part of reliability. The Google Cloud Well-Architected Framework lists "conduct thorough postmortems" among its reliability principles, and the Azure Well-Architected Framework says to "continuously learn from incidents in production". Neither defines what evidence shows that the learning was applied. That is left to the enterprise.

The three large providers publish post-incident reports in different forms. How each provider's incidents map to dependencies on critical journeys is covered in the platform pages for AWS, Azure and Google Cloud. The enterprise scenario is covered in [Cloud Incident Recurrence](/cloud-incident-recurrence).

In financial services, incident handling is moving from internal practice to external obligation. The UK Financial Conduct Authority's new incident reporting requirements take effect on 18 March 2027. Reporting an incident raises the question of what changed afterwards. A dated corrective action with a passing recurrence test answers it. A filed review does not.

The argument for measuring recurrence by cause is set out in [Why Production Incidents Recur](/why-production-incidents-recur).
