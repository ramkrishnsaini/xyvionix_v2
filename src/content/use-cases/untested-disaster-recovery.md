---
title: Untested Disaster Recovery
h1: A recovery plan that has never been run is a claim, not a capability
seoTitle: 'Untested Disaster Recovery: Scoping a First Exercise | Xyvionix'
description: >-
  How to move a recovery plan from Unassured to a measured position: scope a
  first exercise, time the recovery, verify the restore and own the findings.
summary: >-
  A documented plan with no timed exercise is Unassured. The position is
  established by scoping a first exercise for one service, measuring recovery
  time and recovery point, verifying the restore and assigning every finding.
lede: >-
  Untested disaster recovery is the situation in which a recovery plan exists
  and no timed exercise has shown that it works. The state is Unassured:
  nothing is known to be wrong, and nothing is known. The recovery time and
  recovery point in the plan are figures that were agreed, not figures that
  were measured. The position is established by one scoped exercise on one
  critical service, timed from declaration to a verified working service, with
  every finding given an owner and a re-test.
ogQuestion: Has the recovery plan ever been run against the clock?
cluster: reliability
secondary:
  - data
parent: use-cases
state: unassured
audience:
  - CTO
  - CIO
  - Technology Risk
intent: >-
  Problem: a recovery plan exists but has not been exercised under realistic
  conditions
related:
  assurance:
    - disaster-recovery-assurance
    - cloud-drift-assurance
    - data-pipeline-assurance
  useCases:
    - cloud-configuration-drift
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - gcp-production-reliability
  industries:
    - financial-services
    - healthcare
  insights:
    - disaster-recovery-plan-never-tested
evidence:
  - name: Exercise scope statement
    detail: >-
      The service, the scenario, what is inside and outside the exercise, the
      event that starts the clock, the business transaction that stops it and
      the conditions under which the exercise is halted.
  - name: First timed exercise record
    detail: >-
      The measured interval from declaration to a verified working service,
      with the date, the people who ran it and the production footprint on
      the day.
  - name: Measured recovery point
    detail: >-
      The last transaction accepted by the primary before declaration compared
      with the last transaction present after recovery, which gives data loss
      as an observed quantity.
  - name: Restore verification result
    detail: >-
      Confirmation that restored data was opened and used by the application
      that depends on it, with the restore duration. Completion of the restore
      job is not the result.
  - name: Improvisation log
    detail: >-
      Every step taken during the exercise that was not in the runbook, every
      step that failed as written, and the person whose knowledge supplied
      the answer.
  - name: Recovery location capacity check
    detail: >-
      Service quotas and available capacity in the recovery location compared
      with what production runs on today, gathered before the exercise and
      confirmed by scaling during it.
  - name: Findings register
    detail: >-
      Each finding from the exercise with an owner, a target date and the part
      of the exercise that will be repeated to close it.
thresholds:
  - signal: Critical services with no timed exercise on record
    basis: The business requires each critical service to have a recovery time that was measured
    lostWhen: A critical service passes the agreed date for its first exercise with none run
  - signal: First measured recovery time against the objective in the plan
    basis: How long the business owner of the service has said it can be unavailable
    lostWhen: The measured time exceeds the objective and neither a correction nor a revised objective has been agreed
  - signal: Observed data loss against the recovery point objective
    basis: How much data the business process can lose or re-create by hand
    lostWhen: Data lost in the exercise exceeds the agreed recovery point
  - signal: Steps completed from knowledge outside the runbook
    basis: Recovery has to be executable by whoever is on call when it is needed
    lostWhen: The exercise could be completed only with knowledge held by a named individual and not written down
  - signal: Exercise findings open past their date
    basis: The exposure that remains while the finding is uncorrected
    lostWhen: A finding that prevents recovery within the objective passes its date without completion or an owned decision
faqs:
  - q: Does a tabletop walkthrough count as a test of the plan?
    a: >-
      It tests the document and the understanding of the people in the room,
      and it is good preparation. It produces no measured time and exercises
      no technical step. A plan that has only been walked through is still
      Unassured for recovery time and recovery point.
  - q: Is it safe to run a recovery exercise against production?
    a: >-
      That depends on scope. A restore into an isolated environment touches no
      production traffic. Exercises that do act on production are bounded by
      halt conditions agreed beforehand. AWS states that its Fault Injection
      Service performs real actions on real resources, which is the reason
      its experiments are defined with stop conditions.
  - q: What if the first exercise fails?
    a: >-
      Then the business has learned, on a day of its choosing, what it would
      otherwise have learned during an outage. A failed exercise moves the
      state from Unassured to At risk. That is an improvement, because the
      condition is now known and the corrections can be named.
sources:
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'AWS Fault Injection Service user guide'
    url: 'https://docs.aws.amazon.com/fis/latest/userguide/what-is.html'
  - title: 'AWS Backup: restore testing'
    url: 'https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html'
  - title: 'Amazon Application Recovery Controller (ARC) developer guide'
    url: 'https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html'
  - title: 'Amazon EKS: zonal shift'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html'
  - title: 'AWS post-event summary: Amazon DynamoDB service disruption in US-EAST-1, October 2025'
    url: 'https://aws.amazon.com/message/101925/'
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'FCA: Operational resilience'
    url: 'https://www.fca.org.uk/firms/operational-resilience'
  - title: 'EIOPA: Digital Operational Resilience Act (DORA)'
    url: 'https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en'
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

In most cases nothing changed in the technology. Someone asked a question. A board member asked after a provider outage in the news. A customer sent a due diligence questionnaire. A supervisor asked for the date of the last test.

The plan exists and it contains figures. The recovery time objective and recovery point objective were agreed in a workshop. No exercise has been run against the clock, or the last one was run against an architecture that has since been replaced.

The expectation around the plan has also moved. The UK Financial Conduct Authority gave firms until 31 March 2025 to show they can remain within impact tolerance for important business services, so that position is now a standing one. The EU DORA regulation, Regulation (EU) 2022/2554, has applied since 17 January 2025 and names digital operational resilience testing among its pillars. A plan written to satisfy a requirement to have a plan is now asked whether it works.

The state is Unassured. Nobody can show that recovery would fail. Nobody can show that it would succeed. For a critical service, an unknown condition is not an acceptable one.

## The business outcome at risk

The outcome is the ability to restore a critical service within the time and data loss that the business has already promised to others. The figures in the plan have been reused. Customer contracts quote them. Business units have sized their manual workarounds to last as long as the recovery time objective. If the real figure is longer, each of those commitments is wrong by the same margin.

Where no recovery has been proven, the working plan is to wait for the provider. AWS's summary of the US-EAST-1 event of October 2025 shows what that can mean. DNS for the DynamoDB regional endpoint was restored at 2:25 AM on 20 October, under three hours after failures began. EC2 instance launches remained impaired until 1:50 PM. A recovery that needed to launch instances in that Region would have waited for most of the day.

AWS's own guidance is direct on the point: "It is critical to regularly assess and test your disaster recovery strategy so that you have confidence in invoking it."

## What must be proven

The first exercise is scoped to one critical service and one scenario. An exercise that tries to cover everything is the one that gets postponed.

Exercises differ in what they prove. The scope statement says which kind is being run, so that the result is not reported as more than it is.

| Exercise | What it proves | What it leaves unproven |
|---|---|---|
| Walkthrough of the runbook | The people named understand the steps | Every timing and every technical step |
| Restore of a backup into an isolated environment | The copy restores, and how long the data restore takes | Application start-up, dependencies, traffic routing |
| Failover of one component | The replica starts and serves | Dependency order and the combined time |
| Timed recovery of the whole service | Recovery time and recovery point at application level | Other scenarios, and the return to primary unless it is included |

Four measurements are taken in the full exercise.

1. **Recovery time.** The clock starts at declaration. It stops when a named business transaction completes on the recovered service. A passing health check does not stop the clock.
2. **Recovery point.** The last transaction the primary accepted is compared with the last one present after recovery.
3. **Restore integrity.** Restored data is opened and used by the application that depends on it.
4. **The way back.** Microsoft's reliability guidance asks for drills that cover failover and failback. If the return is left out of the first exercise, the scope statement says so.

How these results are then held as continuing evidence is described in [Disaster Recovery Assurance](/disaster-recovery-assurance).

## What causes assurance to be lost

Here assurance was never established. The causes are the reasons the exercise has not happened.

**The exercise is feared.** The concern is legitimate. AWS notes that starting a zonal shift without enough replicas in the remaining zones can itself cause impact. The answer is scope and halt conditions, not abstention. A manual zonal shift in Amazon Application Recovery Controller is temporary and carries an expiry, which is the kind of bounded action a first exercise is built from.

**A substitute is accepted as the test.** Backup jobs report success. Replication reports healthy. An assessment tool estimates that the objectives are met. Each is a useful signal and none is a recovery.

**Nobody owns the exercise.** The plan belongs to risk, the infrastructure to the platform team and the application to a product team. An exercise needs all three, and no one of them can schedule the others. It is planned, moved for a release, then moved again.

**Production has left the plan behind.** AWS states that without infrastructure as code, restoring workloads in the recovery Region is complex and may exceed the recovery time objective. Where production has been changed by hand, the recovery environment is built from a definition that no longer describes it. That condition is covered in [Cloud Configuration Drift](/cloud-configuration-drift) and held under [Cloud Drift Assurance](/cloud-drift-assurance).

## Corrective action

A first exercise produces findings, usually several. Typical ones are a service quota in the recovery location set below what production now needs, a secret that was never copied there, and a runbook step that only its author can perform. AWS advises making sure that service quotas in the recovery Region are high enough.

Each finding becomes a correction with an owner, a date and a named re-test. Under assurance, Xyvionix owns those corrections through to completion within the access it has been granted, and schedules exercises and production changes through the enterprise's own change process.

Some findings are decisions. If the measured recovery time cannot meet the objective without a different architecture, the choice between funding the change and accepting a longer objective goes to the business owner of the service, with the measurements. The decision is recorded with an expiry date.

## What verified closure looks like

The Unassured state closes when a timed exercise at application level has been run and recorded. It closes whether the result was good or bad. A measured time inside the objective makes the service Assured. A measured time outside it makes the service At risk, with the gap known.

Each finding is closed by repeating the part of the exercise that exposed it. A raised quota is closed when the recovery location has scaled to production size. A rewritten runbook is closed when someone other than its author has executed it without asking for help. A restore finding is closed when the application has read the restored data.

The record carries the production footprint on the day of the exercise. That is what the evidence is valid for, and it sets the point at which the exercise has to be run again.

## What to do next

Two steps can be taken without any new tooling. The first is a one-page scope statement for the single most critical service: the scenario, the event that starts the clock, the business transaction that stops it and how the recovery point will be checked. Writing it usually shows that these were never agreed.

The second is the smallest real exercise. Restore the latest backup of that service's primary data store into an isolated environment, time it, and ask the application's owner to open the data. On AWS, restore testing in AWS Backup can run this on a schedule, records the restore duration and deletes the restored resources afterwards. If the data restore alone consumes most of the recovery time objective, the first finding exists before any failover has been attempted.
