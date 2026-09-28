---
title: AWS Production Reliability
h1: Prove that workloads on AWS survive the loss of a zone, a Region or a control plane
seoTitle: 'AWS Production Reliability: Zones, Quotas, Recovery | Xyvionix'
description: >-
  What has to be re-proven on AWS: capacity with one zone fewer, failover that
  avoids control planes, quota in the recovery Region and restores that are
  timed.
summary: >-
  AWS supplies tooling that estimates, injects, shifts and restores. Each
  result is partial and dated. Zone headroom, control-plane dependency,
  recovery Region quota and restore time are held against thresholds and
  re-proven.
lede: >-
  AWS production reliability assurance is the continuing proof that a workload
  on AWS still survives the loss of an Availability Zone, a Region or a
  regional control plane within the thresholds the business has agreed. AWS
  provides services that estimate recovery, inject faults, shift traffic and
  test restores. Each returns a narrower result than the question the business
  is asking, and each result describes the architecture as it stood on the day
  it was produced.
ogQuestion: Would the workload survive a zone or Region loss today?
platform: Amazon Web Services (AWS)
group: cloud
cluster: reliability
secondary:
  - change
parent: technologies
state: assured
audience:
  - VP Platform
  - Head of SRE
  - CTO
intent: 'Technology + problem: proving reliability of workloads running on AWS'
related:
  assurance:
    - production-reliability-assurance
    - disaster-recovery-assurance
    - cloud-drift-assurance
    - slo-assurance
  useCases:
    - untested-disaster-recovery
    - cloud-incident-recurrence
    - cloud-configuration-drift
  technologies:
    - eks-reliability-assurance
    - aws-iam-exposure-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
    - financial-services
  insights:
    - disaster-recovery-plan-never-tested
    - cloud-drift-production-risk
evidence:
  - name: Zone headroom measurement
    detail: >-
      For each critical workload, the capacity running in each Availability
      Zone and the result of carrying peak load with one zone removed, dated
      and compared with the last scaling or consolidation change.
  - name: Control-plane dependency list
    detail: >-
      Every step in each failover runbook marked as a data-plane or
      control-plane operation, including any step that launches instances,
      changes scaling or creates resources during recovery.
  - name: Recovery Region quota comparison
    detail: >-
      Service quotas and capacity in the recovery Region compared with the
      production footprint as it is now, not as it was when the recovery
      Region was set up.
  - name: Fault injection record
    detail: >-
      Each AWS Fault Injection Service experiment with its template, targets,
      stop conditions, date and result, and the changes made to the workload
      since it last passed.
  - name: Traffic shift exercise record
    detail: >-
      Dated results of manual zonal shifts, zonal autoshift practice runs and
      Region switch rehearsals, with the service level indicators observed
      while traffic was shifted.
  - name: Restore test results
    detail: >-
      Scheduled AWS Backup restore tests with the recovery point selected, the
      measured restore duration and the validation performed before the
      restored resources were deleted.
  - name: Provider event impact record
    detail: >-
      The enterprise's own record of how each AWS service event affected its
      critical journeys, kept whether or not AWS published a post-event
      summary.
thresholds:
  - signal: Capacity with one Availability Zone removed
    basis: Peak load on the critical journeys and the service level objectives attached to them
    lostWhen: Measured capacity in the remaining zones no longer carries peak load, or has not been measured since the last scaling change
  - signal: Control-plane operations in the failover path
    basis: AWS guidance to use data-plane operations only during failover, and the recovery time the business has agreed
    lostWhen: A failover runbook for a critical service contains a step that depends on a control plane and has no tested alternative
  - signal: Recovery Region quota against production footprint
    basis: The capacity production needs today, which the recovery Region must be able to reach
    lostWhen: Any quota in the recovery Region is below what a full-scale recovery requires
  - signal: Age of the last passing fault experiment
    basis: The rate of change in the workload and the failure scenarios the business has named
    lostWhen: The architecture has changed materially since the experiment last passed, or a stop condition alarm no longer exists
  - signal: Measured restore duration
    basis: The recovery time objective of the service that depends on the data
    lostWhen: A scheduled restore test fails, exceeds its time target or is not validated before clean-up
faqs:
  - q: The workload runs in three Availability Zones. What is left to prove?
    a: >-
      That the two remaining zones can carry the load. AWS states that
      workloads must be pre-scaled to run with one zone fewer, and that
      adding nodes during a zonal impairment takes time and can meet compute
      capacity constraints. Zone count is a design fact. Headroom is a
      running fact that changes with every scaling and cost decision.
  - q: AWS Resilience Hub reports that the application meets its resiliency policy. Is that sufficient?
    a: >-
      It is a useful estimate and a reason to test. The assessment works
      from imported definitions such as CloudFormation stacks and Terraform
      state files, so it models the architecture those sources describe. It
      does not time a recovery of the application with its dependencies, and
      it inherits any drift in the source it imported.
  - q: Is Xyvionix an AWS partner or reseller?
    a: >-
      No. Xyvionix is not a reseller or partner of any cloud provider. It is
      independent, and it holds evidence about the enterprise's workloads
      using the enterprise's own access and tooling.
sources:
  - title: 'AWS Resilience Hub user guide'
    url: 'https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html'
  - title: 'AWS Fault Injection Service user guide'
    url: 'https://docs.aws.amazon.com/fis/latest/userguide/what-is.html'
  - title: 'Amazon Application Recovery Controller (ARC) developer guide'
    url: 'https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html'
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'AWS Backup: restore testing'
    url: 'https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html'
  - title: 'AWS Backup: logically air-gapped vault'
    url: 'https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html'
  - title: 'Amazon EKS: zonal shift'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html'
  - title: 'Amazon EKS Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'AWS post-event summary: Amazon DynamoDB service disruption in US-EAST-1, October 2025'
    url: 'https://aws.amazon.com/message/101925/'
  - title: 'AWS post-event summaries index'
    url: 'https://aws.amazon.com/premiumsupport/technology/pes/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on AWS

AWS offers a service for almost every part of resilience. Each answers a narrower question than the one the business is asking, and a passing result from any of them is easily read as proof of the whole.

AWS Resilience Hub estimates whether a workload meets the recovery time and recovery point targets in a resiliency policy, for application, infrastructure, Availability Zone and Region disruptions. The estimate is built from imported definitions, including CloudFormation stacks and Terraform state files. It is modelled from configuration. It is not a timed recovery.

AWS Fault Injection Service (AWS FIS) performs real actions on real resources, so its results are measured, against the architecture on the day the experiment ran. Amazon Application Recovery Controller (ARC) moves traffic away from an impaired zone or Region. It does not create the capacity that traffic lands on. AWS Backup restore testing times a restore at the data layer, which is one part of an application recovery.

The second half of the problem is the control plane. AWS advises using data-plane operations only during failover, because control planes have lower availability design goals, and warns that auto scaling during recovery is a control-plane dependency. A workload can be spread across three zones and still depend on a regional service to launch, scale or register anything.

The vendor-neutral method is set out in [Production Reliability Assurance](/production-reliability-assurance). This page covers what is particular to AWS.

## What expires, and on whose calendar

Some of these dates are set by AWS. Others are properties of AWS features that limit the life of the evidence they produce.

| Dated fact, as published by AWS | What it means for evidence |
|---|---|
| A manual zonal shift in ARC is temporary, with an expiry of up to three days that can be extended | A shift is a holding action. If the impairment outlasts it, traffic returns to the impaired zone |
| An AWS Backup restore test holds restored resources for a validation window of 1 to 168 hours, then deletes them | Validation has to run inside the window |
| The most recent entry in the post-event summary index is the US-EAST-1 event of 19 to 20 October 2025. No 2026 summary was listed on 27 September 2026 | The index is not a record of what affected a given workload |
| Amazon EKS 1.31 reaches the end of extended support on 26 November 2026. EKS 1.34 reaches the end of standard support on 2 December 2026 | Two support boundaries fall within ten weeks of this review |

The October 2025 event shows why the control plane belongs on the calendar of things to prove. AWS's post-event summary attributes it to a latent race condition in the DynamoDB DNS management system, which left the regional endpoint's DNS record empty. DNS failures began at 11:48 PM PDT on 19 October and DNS was restored at 2:25 AM on 20 October. EC2 instance launches stayed impaired until 1:50 PM, and Network Load Balancer health checks were affected from 5:30 AM to 2:09 PM. Lambda, ECS, EKS, Fargate and STS were among the services impacted.

The initial fault lasted under three hours. The ability to launch an instance in the Region was impaired for most of the following day.

## What must be continuously re-proven

**Capacity with one zone fewer.** AWS states that workloads must be pre-scaled to run with one Availability Zone removed, and that starting a zonal shift without enough replicas can itself cause impact. If every worker node is full, recovery depends on adding nodes, which takes time and can meet compute capacity constraints during a zonal impairment. AWS recommends over-provisioning in each zone. Headroom is the proof, and it changes with every scaling and rightsizing decision.

**A failover path free of control-plane steps.** Each runbook step is classified. A step that launches instances, changes an Auto Scaling group or creates a resource in the impaired Region waits on the same control plane that the October 2025 event impaired.
**Quota in the recovery Region.** AWS says to make sure service quotas in the recovery Region are high enough to scale to production capacity. Quota is a limit that fails only under the load of a real recovery. Every increase in the primary Region makes the last comparison out of date.

**A recovery Region that can be rebuilt.** AWS notes that the metadata held with an EC2 backup, such as instance type, VPC, security group and IAM role, is used only when restoring in the same Region. A cross-Region recovery rebuilds them from the infrastructure definition, so the definition has to be true. That comparison is held under [Cloud Drift Assurance](/cloud-drift-assurance).

**Restores, timed and validated.** AWS Backup restore testing selects the latest or a random recovery point and records the restore duration. The application-level result, with dependencies, secrets and traffic routing, comes from an exercise held under [Disaster Recovery Assurance](/disaster-recovery-assurance).

**Backup protection settings.** A logically air-gapped vault applies AWS Backup Vault Lock in compliance mode. That protection is a configuration, so it is compared with its approved baseline on a schedule.

## Common failure modes

- **Autoshift enabled, zones full.** Zonal autoshift is switched on and read as zone resilience. The remaining zones were consolidated to save cost and cannot absorb the traffic.
- **The shift that lapsed.** A manual zonal shift was started during an impairment and reached its expiry. Traffic returned to the zone before the zone had recovered.
- **An assessment of a stale import.** A Resilience Hub assessment passes against a Terraform state file or stack that no longer describes production. The estimate is accurate for an architecture that is not running.
- **Recovery that scales on demand.** The plan starts small in the recovery Region and relies on auto scaling to reach production size. AWS names this as a control-plane dependency.
- **A pilot light that covers half the application.** AWS Elastic Disaster Recovery replicates server-hosted applications and databases at block level. It applies to workloads hosted on EC2, not to Amazon RDS, so a managed database tier needs its own recovery path.
- **An experiment with no working stop condition.** FIS stop conditions are CloudWatch alarms. If the alarm was renamed or its metric stopped reporting, the experiment has no brake.
- **No summary, so no incident.** AWS published no post-event summary and the enterprise kept no impact record of its own. That pattern is covered in [Cloud Incident Recurrence](/cloud-incident-recurrence).

## Corrective ownership and verified closure

When a threshold is breached, or when the evidence is older than the changes made since it was gathered, the state moves and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Changes to production, and any experiment that acts on production resources, go through the enterprise's own change process with a named approver.

Corrections on AWS are specific. Zone headroom is restored and the consolidation setting that removed it is changed. A runbook step that launches capacity during failover is replaced by capacity that is already running, or by a recorded decision to accept the dependency. A quota increase is requested in the recovery Region before it is needed.

Closure is recorded by re-test. For zone headroom, a zonal shift or an autoshift practice run is carried out at representative load and the service level indicators stay within objective. AWS strongly recommends this kind of test for EKS workloads, which are covered in [Amazon EKS Reliability Assurance](/eks-reliability-assurance). For quota, the recovery Region is scaled to production size in an exercise. For a control-plane dependency, the failover is run with the step removed. For a restore, the restored data is opened and used inside the validation window.

Each closure is dated and records the production footprint it was tested against. When the footprint moves materially, the evidence expires and the test is run again.
