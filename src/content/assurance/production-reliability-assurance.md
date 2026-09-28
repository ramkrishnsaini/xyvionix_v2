---
title: Production Reliability Assurance
h1: Prove that production still holds, with tested evidence instead of documented intent
seoTitle: 'Production Reliability Assurance: Proven, Not Planned | Xyvionix'
description: >-
  Continuing proof that production will keep running. Service levels that are
  tested, recovery that is timed, and environments verified against what was
  approved.
summary: >-
  Reliability is proven by tested service levels, timed recovery and verified
  environment parity. Each proof expires through change, growth or a vendor
  calendar, so each is held against a threshold and re-proven.
lede: >-
  Production reliability assurance is the continuing proof that critical
  systems still meet the service levels the business depends on, can still be
  recovered within the agreed time, and still match the state that was reviewed
  and approved. A design document, an architecture review and a recovery plan
  describe intent. Assurance holds the tested result, dated, against a
  threshold, and tests again when production, its platform or its provider
  changes.
ogQuestion: Can critical systems still meet their threshold?
kind: hub
tier: primary
cluster: reliability
secondary:
  - change
parent: assurance
state: assured
audience:
  - CTO
  - VP Engineering
  - VP Platform
  - Head of SRE
  - Technology Risk
intent: >-
  Commercial: continuing proof that production will keep running under real
  conditions
related:
  assurance:
    - slo-assurance
    - disaster-recovery-assurance
    - production-observability-assurance
    - kubernetes-reliability-assurance
    - cloud-drift-assurance
    - incident-recurrence-assurance
  useCases:
    - cloud-incident-recurrence
    - untested-disaster-recovery
    - kubernetes-upgrade-risk
    - cloud-configuration-drift
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - gcp-production-reliability
    - eks-reliability-assurance
    - aks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
    - financial-services
  insights:
    - disaster-recovery-plan-never-tested
    - error-budgets-without-consequence
    - why-production-incidents-recur
evidence:
  - name: Critical journey register
    detail: >-
      The user journeys and business services the enterprise has named as
      critical, each with an owner, its supporting systems and the provider
      services it depends on, including shared control-plane and edge services.
  - name: Service level results
    detail: >-
      Measured results for each critical journey against its objective, with a
      record of whether the indicator was reporting for the whole window.
  - name: Timed recovery exercise records
    detail: >-
      The date, scope, measured recovery time and measured recovery point of
      each exercise, with the production footprint it was run against.
  - name: Declared and running state comparison
    detail: >-
      The difference between the reviewed definition of each environment and
      what is running, with the age and owner of every unreconciled difference.
  - name: Platform lifecycle position
    detail: >-
      For each platform and component, the vendor's published support status
      and the time remaining to the next support boundary, including components
      that have been retired upstream.
  - name: Detection test results
    detail: >-
      Results of exercising alerts on critical paths, showing that a failure
      of the kind the business cares about produces a signal that reaches
      someone who can act.
  - name: Corrective action record
    detail: >-
      Every corrective action raised from an incident or a lost threshold, with
      its owner, its completion and the re-test that confirmed the condition
      was gone.
thresholds:
  - signal: Critical journeys with a current, reporting service level
    basis: The journeys the business has named as carrying revenue or obligation
    lostWhen: A critical journey has no objective, or its indicator has returned no data for the agreed window
  - signal: Age of the last timed recovery exercise
    basis: The rate of change in production and the testing interval the business or its regulator expects
    lostWhen: The exercise is older than the agreed interval, or production has changed materially since it ran
  - signal: Unreconciled difference between declared and running state
    basis: What was reviewed and approved for the environment, and how quickly the recovery path depends on it
    lostWhen: Drift on a critical path remains unreconciled beyond the agreed age
  - signal: Time remaining to the next support boundary
    basis: The vendor's published support calendar and the lead time the enterprise needs to upgrade with rehearsal
    lostWhen: The remaining time falls below the rehearsed upgrade lead time for any production platform
  - signal: Corrective actions closed by re-test
    basis: The business consequence of the same cause producing another incident
    lostWhen: An action is recorded as closed without a re-test, or an incident recurs in the same cause class
faqs:
  - q: How is reliability assurance different from monitoring?
    a: >-
      Monitoring reports what production is doing now. Assurance holds a
      position on whether production can still meet the outcome: whether the
      objective still describes the journey, whether recovery has been timed
      against the current footprint, whether the environment still matches
      what was approved. Monitoring is one source of signal. It does not say
      when a recovery test has gone stale or a component has been retired.
  - q: The architecture has already passed a well-architected review. What does assurance add?
    a: >-
      A review is an assessment at a point in time against guidance that is
      itself revised. It records the design as it was described on the day.
      Assurance tests the running system, dates the result and tests again
      when the workload, the platform or the guidance changes. The review is
      a useful input. It is not evidence about production six months later.
  - q: Does Xyvionix operate the production environment?
    a: >-
      No. Xyvionix is not a managed service provider. It holds the evidence,
      states the assurance position and owns corrective action through to
      verified closure within the access it has been granted, working through
      the enterprise's own change process where production must change.
sources:
  - title: 'Kubernetes blog: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'AWS Well-Architected Framework: Reliability Pillar'
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html'
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'AWS post-event summary: Amazon DynamoDB service disruption in US-EAST-1, October 2025'
    url: 'https://aws.amazon.com/message/101925/'
  - title: 'Azure status history: post-incident review GHRP-84G, West US 2'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G'
  - title: 'Azure status history: post-incident review FNJ8-VQZ'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'FCA: Operational resilience'
    url: 'https://www.fca.org.uk/firms/operational-resilience'
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'Google Cloud Well-Architected Framework: reliability pillar'
    url: 'https://docs.cloud.google.com/architecture/framework/reliability'
  - title: 'Amazon EKS: zonal shift'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html'
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

Reliability is usually documented once and assumed afterwards. The architecture review, the recovery plan and the service level definition each describe production as it was on the day they were written. Production keeps moving, and the evidence about it expires in four ways.

**Through change.** Every release, configuration edit and scaling decision alters the system that was tested. A fault injection experiment proves something about the architecture as it stood on the day it ran. The date of the last passing test measures how much change that test has not seen.

**On a vendor calendar.** Support status ends on a published date whether or not anything is deployed. The Kubernetes project retired Ingress NGINX in March 2026, after which it receives no releases, bug fixes or security updates. Existing deployments keep working, so nothing alerts. A control that passed before the retirement date fails after it with no configuration change.

**Through growth.** Recovery capacity, service quotas and zone headroom were sized for an earlier production footprint. AWS advises making sure that service quotas in the recovery Region are high enough. Each capacity increase in the primary environment makes the last recovery proof describe a smaller system than the one now running.

**Through revised guidance.** The frameworks that reviews are scored against are themselves revised. The current AWS Well-Architected Reliability Pillar is dated 6 November 2024 and carries updates to nine of its question areas. A review finding ages as both the workload and the guidance move.

None of these produces an event. The position decays quietly, which is why an absence of incidents is not evidence of reliability.

## What is at stake

Reliability failures are paid for in revenue not taken, service credits, contractual penalties and regulatory attention. The cost is set less by the initial fault than by how long recovery takes.

Provider incidents show the shape. In the AWS US-EAST-1 event of 19 to 20 October 2025, AWS reported that DNS for the affected DynamoDB endpoint was restored in under three hours, while EC2 instance launches stayed impaired until early afternoon on 20 October. Dependent recovery took most of the day. In the Azure West US 2 event of 29 to 30 May 2026, Microsoft reported that power disturbances during a severe thunderstorm led to infrastructure shutdowns in two physical availability zones. A design proven against the loss of one zone had not been proven against that event.

For regulated firms the question has changed tense. The FCA's operational resilience transition period ended on 31 March 2025. Firms must now be able to remain within impact tolerance for their important business services, and that can only be shown with current evidence.

Having no current evidence is a consequence in its own right. An enterprise that cannot say whether recovery works is carrying a risk it has not priced. Xyvionix records that condition as Unassured. It is not treated as acceptable because nothing has yet gone wrong.

## What Xyvionix assures

Xyvionix holds three kinds of proof about production, each tested, dated and compared with a threshold agreed with the business. Vendor guidance points the same way: Microsoft's reliability principles prefer outcomes per critical user flow over generic uptime, and two of the nine principles in Google Cloud's reliability pillar are explicit recovery tests. What is usually missing is the continuing proof.

### Tested service levels

The outcome is that customers can complete the journeys that matter. [SLO Assurance](/slo-assurance) keeps each objective tied to a real journey, keeps its indicator valid and keeps the error budget consequential for decisions about change.

An objective is only as sound as the telemetry beneath it. [Production Observability Assurance](/production-observability-assurance) proves, by exercise, that the failures the business cares about would be detected and would reach someone able to act.

### Tested recovery

The outcome is that a critical service returns within the time, and with the data, the business has agreed it can tolerate. [Disaster Recovery Assurance](/disaster-recovery-assurance) holds recovery time and recovery point as measured results from timed exercises against the current footprint.

Recovery also means not repeating the failure. [Incident Recurrence Assurance](/incident-recurrence-assurance) holds the position that an incident's cause has been removed and stays removed, shown under test.

### Verified parity

The outcome is that production is still the system that was reviewed. [Cloud Drift Assurance](/cloud-drift-assurance) holds the difference between the declared state and the running state, with its age and its owner.

[Kubernetes Reliability Assurance](/kubernetes-reliability-assurance) holds the platform's position inside its supported and tested envelope, which moves on a release calendar the enterprise does not control.

These six areas are assured separately because they expire separately. They are reported together because each depends on another. AWS states that without infrastructure as code, restoring a workload in the recovery Region is complex and may exceed the recovery time objective, so drift is a recovery problem. A service level whose indicator has stopped reporting shows no breach, so observability is a service level problem.

## Common failure modes

- **Uptime reported, journey unmeasured.** Availability is green at the component while customers cannot complete a transaction that crosses several components and a third party.
- **Recovery objective modelled, never timed.** The figure in the plan came from configuration or from a vendor estimate. No exercise has measured it against the application with its dependencies.
- **Zone resilience configured, capacity absent.** Traffic can be shifted away from an impaired zone, but the remaining zones were not scaled to carry it. AWS states that workloads must be pre-scaled to run with one zone fewer, and that a shift without enough replicas can itself cause impact.
- **A shared provider service behind every region.** The design spreads across zones and regions while depending on one global edge, identity or control-plane service that those boundaries do not contain.
- **Headroom removed as a saving.** Consolidation and rightsizing take out the spare capacity that recovery assumed.
- **A retired component still serving traffic.** The software works and receives no fixes. Only an inventory checked against upstream lifecycle on a schedule will find it.
- **Review filed, cause still present.** The incident review was written and its actions were ticketed. No test has shown that the condition cannot occur again.

## Corrective ownership

When a threshold is breached, or when evidence has expired and the position is unknown, the state changes and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Where production must change, the change goes through the enterprise's own change process with a named approver.

Corrective action in this cluster is rarely one fix. A stale recovery proof is corrected by running the exercise, and the exercise usually finds further work: a quota to raise, a runbook step that names a system since replaced. Each becomes its own action with its own owner and its own re-test.

Correction is itself a change to production. Microsoft's review of the Azure incident of 2 to 3 February 2026 describes a remediation workflow that incorrectly disabled anonymous access on storage accounts which allowed it intentionally, with impact across multiple regions. Any automated correction is therefore bounded to the resources in scope, staged, and verified after it runs.

Where the correction requires a decision that belongs to the business, such as accepting a recovery time longer than the target, the decision is recorded with its owner and an expiry date. How the states and the corrective loop work across all clusters is described in [how assurance works](/how-assurance-works).

## Verified closure

A corrective action in this cluster is closed by a test that repeats the condition, not by a deployment or a ticket status.

The form of the re-test follows the outcome. A service level is closed when the indicator reports, agrees with an independent measurement of the journey, and has stayed within threshold for the agreed window. Recovery is closed when a timed exercise against the current footprint meets the objective. Parity is closed when a fresh comparison shows the difference is gone and has not returned after the next deployment. A recurring incident is closed when the original trigger, reproduced under controlled conditions, no longer produces the failure.

Closure is recorded with the evidence that supports it and the date it was gathered. That date starts the clock on the evidence's own expiry.

## Technology and industry context

The three large providers publish reliability guidance, fault injection services and recovery tooling, and each publishes post-incident reviews for events of broad impact. Their platforms differ in ways that change what has to be proven: how zone redundancy is configured per resource, how support windows and forced upgrades are scheduled, and which shared services sit behind every region. Those differences are covered in [AWS Production Reliability](/aws-production-reliability), [Azure Production Reliability](/azure-production-reliability) and [Google Cloud Production Reliability](/gcp-production-reliability).

Sector changes the threshold more than the method. In [financial services](/financial-services), impact tolerances for important business services set the boundary and the supervisor expects the firm to show it can stay inside them. For software companies, the boundary is set by the service levels written into customer contracts, which is the subject of [SaaS Production Reliability](/saas-production-reliability).

Most reliability evidence is invalidated by a change. The release and rollback evidence that sits beside this cluster is covered under [Change Assurance](/change-assurance).
