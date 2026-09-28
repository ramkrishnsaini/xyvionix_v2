---
title: Disaster Recovery Assurance
h1: Hold recovery time and recovery point as measured results, not as figures in a plan
seoTitle: 'Disaster Recovery Assurance: Timed, Tested Recovery | Xyvionix'
description: >-
  Continuing proof that critical services can be recovered within the agreed
  time and data loss, from timed exercises, verified restores and current
  runbooks.
summary: >-
  Recovery objectives are claims until a timed exercise proves them. Measured
  recovery time and recovery point, restore verification, dependency order and
  runbook currency are held against thresholds and re-proven as production
  changes.
lede: >-
  Disaster recovery assurance is the continuing proof that a critical service
  can be restored within the recovery time and recovery point the business has
  agreed, shown by a timed exercise against the current production footprint.
  A recovery objective written in a plan is a claim. It becomes evidence when
  a recovery has been run, measured and verified at the level of the
  application, and it expires when production has changed enough that the
  exercise no longer describes it.
ogQuestion: 'When was recovery last proven, not planned?'
kind: child
cluster: reliability
secondary:
  - data
parent: production-reliability-assurance
state: assured
audience:
  - CTO
  - Technology Risk
  - Head of SRE
  - CIO
intent: >-
  Commercial: tested recovery capability against agreed recovery time and
  recovery point
related:
  assurance:
    - cloud-drift-assurance
    - data-pipeline-assurance
    - rollback-readiness-assurance
  useCases:
    - untested-disaster-recovery
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
  - name: Recovery objective register
    detail: >-
      Each critical service with its recovery time objective, its recovery
      point objective, the business owner who set them and the date they were
      last confirmed.
  - name: Timed exercise record
    detail: >-
      For each exercise, the date, the scenario, the production footprint at
      the time, and the measured interval from declaration to a verified
      working service. Failover and failback are recorded separately.
  - name: Restore verification results
    detail: >-
      Results of scheduled restores in which the restored data was opened,
      checked for integrity and used by the application, with the measured
      restore duration.
  - name: Dependency order map
    detail: >-
      The sequence in which identity, name resolution, secrets, data stores
      and services must return, as observed in the last exercise and not as
      drawn in the design.
  - name: Runbook currency record
    detail: >-
      Each runbook with the date it was last executed, the steps that failed
      or were improvised, and any step that depends on a provider control
      plane.
  - name: Recovery environment comparison
    detail: >-
      Quotas, capacity and configuration in the recovery location compared
      with the production footprint as it is today.
  - name: Backup protection settings
    detail: >-
      Immutability, retention and access settings on backup storage, compared
      with the approved baseline on a schedule.
thresholds:
  - signal: Measured recovery time against the objective
    basis: How long the business service can be unavailable before customers, obligations or safety are harmed
    lostWhen: The last timed exercise exceeded the objective, or no exercise has measured recovery at application level
  - signal: Measured recovery point against the objective
    basis: How much data the business process can lose or re-create
    lostWhen: Data loss measured in an exercise, or observed replication lag, exceeds the agreed recovery point
  - signal: Age of the last timed exercise
    basis: The rate of change in production and the testing interval the business or its regulator expects
    lostWhen: The exercise is older than the agreed interval, or production has changed materially since it ran
  - signal: Scheduled restore outcome
    basis: The data sets without which the service cannot operate
    lostWhen: A scheduled restore fails, exceeds its time target or returns data that fails verification
  - signal: Recovery environment capacity
    basis: The production footprint as it is now, not as it was when the recovery environment was sized
    lostWhen: Quota or capacity in the recovery location falls below what production load requires
  - signal: Runbook currency
    basis: The systems, credentials and dependencies as they currently exist
    lostWhen: A runbook names a system or step that no longer exists, or has not been executed within the agreed interval
faqs:
  - q: Backups complete successfully every night. Is that evidence of recoverability?
    a: >-
      It is evidence that a copy was written. It does not show that the copy
      can be restored, how long the restore takes, or whether the application
      works on the restored data. AWS guidance says a backup strategy must
      include testing the backups. Assurance holds the restore result, not
      the backup job status.
  - q: Does a multi-zone or multi-region design remove the need for recovery exercises?
    a: >-
      No. Replication copies corruption and deletion as faithfully as it
      copies good data. AWS states that for data corruption the recovery
      point is always before the disaster was discovered, even with a
      multi-site active/active strategy. Redundancy also depends on capacity
      in the surviving location, which changes with every scaling decision.
  - q: How often should recovery be exercised?
    a: >-
      The interval is set by the business and, where one applies, by
      regulation. The EU DORA regulation requires in-scope financial entities
      to test ICT continuity and recovery plans at least yearly. Xyvionix
      treats any stated frequency as a floor and also treats a material
      change to production as a reason to test again.
sources:
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'AWS Resilience Hub user guide'
    url: 'https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html'
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
  - title: 'Azure Site Recovery overview'
    url: 'https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview'
  - title: 'Microsoft Learn: Resiliency in Azure (formerly Azure Business Continuity Center)'
    url: 'https://learn.microsoft.com/en-us/azure/backup/backup-center-overview'
  - title: 'Azure status history: post-incident review GHRP-84G, West US 2'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G'
  - title: 'Azure status history: post-incident review FNJ8-VQZ'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Google Cloud Backup and DR Service'
    url: 'https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr'
  - title: 'Regulation (EU) 2022/2554, Digital Operational Resilience Act'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R2554'
  - title: 'FCA: Operational resilience'
    url: 'https://www.fca.org.uk/firms/operational-resilience'
  - title: 'APRA: Operational risk management (CPS 230)'
    url: 'https://www.apra.gov.au/operational-risk-management'
  - title: 'OSFI Guideline E-21: Operational Risk Management and Resilience'
    url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/operational-risk-management-resilience-letter'
  - title: 'Federal Register: HIPAA Security Rule notice of proposed rulemaking, 6 January 2025'
    url: 'https://www.govinfo.gov/content/pkg/FR-2025-01-06/pdf/2024-30983.pdf'
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

A recovery plan is accurate on the day it was last exercised. From then on, production moves underneath it.

**Production grows and the recovery location does not.** Quotas, replica sizes and reserved capacity in the recovery location were set for an earlier footprint. They fail only under the load of a real recovery, which is the one moment they cannot be raised quickly.

**The environment is rebuilt from a description that is no longer true.** AWS states that without infrastructure as code, restoring workloads in the recovery Region is complex and may exceed the recovery time objective. It also notes that the metadata held with an EC2 backup, such as instance type, network and security group, is used only when restoring in the same Region. Every manual change in production widens the gap between the definition and the system. That gap is held under [Cloud Drift Assurance](/cloud-drift-assurance).

**The runbook ages.** Steps name a host that was replaced, a credential that was rotated, a console screen that was redesigned. Runbooks also acquire hidden dependencies. AWS advises using only data-plane operations during failover, because control planes have lower availability design goals, and warns that scaling during recovery is a control-plane dependency.

**The dependency order changes.** A service added last quarter needs identity, secrets and name resolution before it can start. The order in the plan was correct for the services that existed when it was drawn.

**Backups succeed and restores are never run.** Job status reports that a copy was written. It says nothing about whether the copy restores, how long that takes, or whether the application accepts the result.

## What is at stake

The first consequence is duration. Provider recovery can take longer than an enterprise's own objective. In the Azure West US 2 incident of 29 to 30 May 2026, Microsoft reported compute recovery of about 8 hours and storage validation of about 14 hours after infrastructure shut down in two availability zones. In the AWS US-EAST-1 event of October 2025, EC2 instance launches were impaired for most of a day. A recovery time objective shorter than these durations depends on moving to another location, and that move has either been proven or been assumed.

The second consequence is data. AWS states that for corruption, deletion or obfuscation of data, the recovery point is always before the disaster was discovered. Replication does not help, because it copies the damage. The real recovery point in a ransomware event is therefore set by how long detection took.

The third is obligation. In regulated sectors the ability to recover is a standing requirement that a supervisor can ask to see. In healthcare, the loss of a clinical system is a patient safety matter, and the objective should be set from the clinical consequence of being without it.

## What Xyvionix assures

Xyvionix holds seven statements about each critical service as current facts.

1. **Recovery time is measured.** The figure comes from a timed exercise that ran from declaration to a verified working service, including name resolution, secrets and data reconciliation.
2. **Recovery point is measured.** The data actually lost in the exercise is recorded and compared with what the business process can absorb.
3. **Restores are verified.** Scheduled restores are opened and used by the application. A restore that completes and cannot be read is a failed restore.
4. **The dependency order is known.** The sequence observed in the last exercise is the sequence in the runbook.
5. **Runbooks are current.** Each has been executed within the agreed interval by someone other than its author, and its control-plane dependencies are listed.
6. **The recovery location can carry production.** Quota, capacity and configuration match the footprint as it is now.
7. **The way back works.** Failback to the primary location has been exercised, with the data written during the outage reconciled.

The exercise is scoped to the scenario the business is concerned about. Loss of one zone, loss of a region, loss of a shared provider service and loss of data integrity are four different tests, and passing one does not prove another.

## Common failure modes

- **A data restore time quoted as an application recovery time.** AWS Backup restore testing records restore job duration on a schedule, which is direct evidence at the data layer. The application is not running until its dependencies, configuration and traffic routing have returned as well.
- **An estimate reported as a result.** AWS Resilience Hub assessments estimate whether a workload meets its recovery targets from its configuration. An estimate is a reason to run the exercise. It is not the exercise.
- **Replication health read as failover readiness.** Azure Site Recovery replicates virtual machines continuously. A healthy replication status shows that data is arriving, and does not show that the replica starts and serves.
- **A readiness check placed in the failover path.** AWS states that the readiness check in Amazon Application Recovery Controller is not intended to be used in the critical path for failover. Recovery that waits on it has added a dependency.
- **Zonal shift enabled without the capacity behind it.** AWS strongly recommends testing the loss of a zone through a manual shift or autoshift practice runs. Without them, the first test is the incident.
- **Failover exercised, failback never attempted.** Microsoft's guidance asks for drills that cover both. The return is where data written during the outage has to be reconciled.
- **The delivery pipeline lost with production.** The Azure incident of 2 to 3 February 2026 affected GitHub Actions and Azure DevOps along with virtual machines and managed identities. A recovery that depends on deploying through the pipeline can lose the pipeline in the same event.

## Corrective ownership

When an exercise misses its objective, or when the last exercise is too old to describe production, the state changes and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Exercises and changes to production are scheduled through the enterprise's own change process.

An exercise that fails is a useful result, and it usually produces several corrections. A quota is raised in the recovery location. A runbook step is rewritten to use a data-plane operation. A start-up sequence is reordered. A backup vault whose immutability setting was relaxed is returned to its approved configuration. Each correction has an owner and its own re-test.

Some findings are decisions for the business. If the measured recovery time cannot meet the objective without a different architecture, the choice between funding the change and accepting a longer objective is returned to the owner of the service with the evidence, and the decision is recorded with an expiry date.

## Verified closure

A recovery correction is closed by repeating the exercise that exposed it. A raised quota is closed when the recovery location has scaled to production load in a test. A rewritten runbook is closed when someone who did not write it has executed it without improvising. A restore finding is closed when the restored data has been verified by the application that uses it.

Closure records the measured figures, the scenario and the production footprint on the day. That footprint is what the evidence is valid for. When production has moved materially away from it, the state returns to Unassured until the exercise is run again. Rollback of a single release is a narrower capability with its own evidence, covered in [Rollback Readiness Assurance](/rollback-readiness-assurance).

## Technology and industry context

Each provider supplies part of the evidence. AWS Backup restore testing times restores and deletes the restored resources afterwards. Resiliency in Azure (formerly Azure Business Continuity Center) brings backup, disaster recovery and ransomware protection into one view. Google Cloud's Backup and DR Service offers backup vaults for immutable and indelible backups. These protect and measure components. The application-level result still has to come from an exercise, and immutability is a setting that can drift like any other.

Regulation increasingly names testing directly. Xyvionix does not give regulatory advice, and the facts below are stated for what they imply about evidence.

| Regime | Dated fact | What it implies |
|---|---|---|
| EU DORA regulation, Regulation (EU) 2022/2554 | Applies since 17 January 2025. Article 11(6) requires ICT continuity and recovery plans to be tested at least yearly | A dated test result per plan, no more than a year old |
| UK FCA operational resilience | Transition period ended 31 March 2025 | Firms must be able to remain within impact tolerance now, shown with current evidence |
| APRA CPS 230 | In force since 1 July 2025, covering business continuity for critical operations | Tolerances for critical operations that are tested, not only documented |
| OSFI Guideline E-21 | Scenario testing of all critical operations to be complete by 1 September 2027 | A test record for every critical operation by a fixed date |
| HIPAA Security Rule | The update published on 6 January 2025 is a proposal, not a final rule. It proposes written procedures to restore critical systems and data within 72 hours of loss | A direction of travel toward stated restoration times, not a current requirement |

Sector detail is covered in [financial services](/financial-services) and [healthcare](/healthcare). The scenario most enterprises recognise first is described in [Untested Disaster Recovery](/untested-disaster-recovery).
