---
title: Cloud Drift Assurance
h1: Prove that what is running is still what was reviewed and approved
seoTitle: 'Cloud Drift Assurance: Declared vs Running State | Xyvionix'
description: >-
  Continuous assurance that cloud environments match their declared, approved
  state: coverage of the definition, out-of-band change, drift age and parity.
summary: >-
  Drift is the difference between what was reviewed and what is running.
  Declared-versus-actual state, environment parity, out-of-band change, drift
  age and reconciliation ownership are held against thresholds.
lede: >-
  Cloud drift assurance is the continuing proof that each production
  environment matches the definition that was reviewed and approved, and that
  every difference is known, dated and owned. Reviews, policy checks and
  recovery plans all describe the declared state. When the running state
  departs from it, each of those controls goes on passing while describing an
  environment that no longer exists.
ogQuestion: Does production still match what was approved?
kind: child
cluster: reliability
secondary:
  - change
  - cyber
parent: production-reliability-assurance
state: assured
audience:
  - VP Platform
  - Technology Risk
  - Head of SRE
intent: >-
  Commercial: continuing proof that environments match their declared and
  approved state
related:
  assurance:
    - disaster-recovery-assurance
    - kubernetes-reliability-assurance
    - cloud-security-exposure-assurance
  useCases:
    - cloud-configuration-drift
    - untested-disaster-recovery
  technologies:
    - terraform-drift-assurance
    - aws-production-reliability
    - azure-production-reliability
  industries:
    - financial-services
  insights:
    - cloud-drift-production-risk
evidence:
  - name: Definition coverage
    detail: >-
      The share of running resources in each account, subscription or project
      that is described by an infrastructure definition, with the unmanaged
      remainder listed by owner and purpose.
  - name: Declared-versus-actual comparison
    detail: >-
      A dated comparison of each definition with the live configuration it
      describes, gathered from the provider and not only from the tool's state
      file, with the tool and version that produced it.
  - name: Detection run history
    detail: >-
      The record of when drift detection last completed for each workspace or
      stack, so that a detector that has paused or failed is visible as
      missing evidence and not as an absence of drift.
  - name: Out-of-band change record
    detail: >-
      Changes made in production outside the delivery pipeline, taken from
      provider audit logs, each linked to an identity, a reason and the
      emergency or incident that justified it.
  - name: Drift register
    detail: >-
      Every open difference with its first-detected date, its classification
      as intended or unintended, the resource's criticality and the owner of
      the decision to reconcile it.
  - name: Environment parity comparison
    detail: >-
      The differences between production and the environments that stand in
      for it, including pre-production and the recovery environment, covering
      configuration, capacity and quotas.
thresholds:
  - signal: Running resources not covered by a definition
    basis: The business requires every production resource to be reviewable and rebuildable
    lostWhen: Unmanaged resources on a critical service exceed the agreed allowance, or any appears without a named owner
  - signal: Age of unresolved drift on critical resources
    basis: How long the business accepts production differing from what was approved, by resource criticality
    lostWhen: Any unintended difference on a critical resource remains open beyond the agreed age
  - signal: Freshness of drift evidence
    basis: The rate of change in the environment and the detection cadence the tooling is configured to run
    lostWhen: The last completed detection for a workspace is older than the agreed cadence, including when detection has paused
  - signal: Out-of-band changes without reconciliation
    basis: Change control obligations and the need for the next deployment to be predictable
    lostWhen: A change made outside the pipeline is neither adopted into the definition nor reverted within the agreed window
  - signal: Parity between production and the recovery environment
    basis: The recovery time objective, which assumes the recovery environment can be built and scaled to production size
    lostWhen: Configuration, capacity or quota in the recovery environment no longer matches what production requires
faqs:
  - q: Drift detection is already switched on in the infrastructure tooling. What does assurance add?
    a: >-
      Tool-level detection compares the definition with the resources that
      tool manages, on a schedule, and reports a difference. It does not see
      resources created outside it, it can pause without drawing attention,
      and it does not decide who reconciles the difference or by when.
      Assurance holds coverage, freshness, age and ownership as thresholds and
      treats the tool's output as one input.
  - q: Should all drift be reverted to the declared state automatically?
    a: >-
      No. Some differences are intended, such as an emergency change that
      fixed an incident, and reverting them reintroduces the fault. Each
      difference is classified first. An intended change is adopted into the
      definition and reviewed. An unintended one is reverted through the
      change process. Automatic reversion is reserved for resource classes
      where the business has agreed it is safe.
  - q: Is drift a security matter or a reliability matter?
    a: >-
      Both, and the evidence is shared. A security group opened by hand is
      exposure. A timeout changed by hand is a reliability risk. In each case
      the control that reviewed the definition did not review what is running.
sources:
  - title: 'HCP Terraform health assessments'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health'
  - title: 'HCP Terraform policy enforcement'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/policy-enforcement'
  - title: 'Terraform releases'
    url: 'https://github.com/hashicorp/terraform/releases'
  - title: 'OpenTofu releases'
    url: 'https://github.com/opentofu/opentofu/releases'
  - title: 'Amazon EKS: roll back a cluster version'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html'
  - title: 'Amazon EKS Auto Mode'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/automode.html'
  - title: 'Kubernetes v1.35: in-place Pod resize graduates to stable'
    url: 'https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/'
  - title: 'AWS: disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'Azure availability zones overview'
    url: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview'
  - title: 'Azure post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
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

An environment is approved as a definition: a set of files that were reviewed, scanned against policy and applied. Every control that follows takes the definition as its subject. The running environment is a separate thing, and it departs from the definition in ways that no pipeline run records.

**Change is made outside the pipeline.** During an incident a timeout is raised, a rule is opened or an instance is resized in the console. The fix works. The definition still holds the old value, so the next deployment either reverts the fix or fails on a conflict.

**Policy is checked at plan time only.** Policy frameworks such as Sentinel and OPA evaluate a proposed change before it is applied. A pass is evidence about the plan. It says nothing about changes made to the resource afterwards by another route.

**The detector sees part of the estate.** Drift detection built into infrastructure tooling compares a definition with the resources that definition manages. A resource created by hand, by another tool or by a provider feature is outside the comparison. The result reads as no drift because the resource was never in scope.

**The detector stops.** HCP Terraform health assessments run every 24 hours by default and pause if the latest run ended in an error. A workspace with a failing run therefore stops producing drift evidence at the moment it is most likely to have drifted.

**The platform changes running state by design.** In-place Pod resize became stable in Kubernetes v1.35, so a running pod can hold a different CPU and memory allocation from its manifest through a supported feature. Managed node services replace nodes on a schedule. Divergence of this kind is approved, and it has to be told apart from the kind that is not.

**Tooling does not always do what the definition implies.** AWS notes that rolling a CloudFormation stack back to a template with a lower Kubernetes version does not roll back the EKS cluster version. The template and the cluster then disagree, and no manual change was involved.

## What is at stake

The first consequence is that review stops meaning anything. Architecture review, security review and change approval were each performed on the definition. If production differs, the business holds approvals for a system it is not running.

The second is recovery. AWS states that without infrastructure as code, restoring workloads in a recovery Region is complex and may exceed the recovery time objective. The same is true of infrastructure as code that is wrong. A recovery environment rebuilt from a drifted definition is rebuilt without the hand-made fixes that keep production working, and that is discovered during the recovery.

The third is resilience that was designed and then lost. Zone resilience in Azure is a property of each resource: a zone-redundant resource is spread across zones by the service, and a zonal resource is pinned to one. A single dependency recreated as zonal, outside the definition, removes the zone resilience of everything that relies on it.

The fourth is unpredictable change. When the definition and production disagree, the effect of the next deployment cannot be read from the plan, because the plan will also undo or collide with whatever changed out of band.

## What Xyvionix assures

Xyvionix holds five statements about each environment as current facts, tested against thresholds agreed with the business.

1. **The definition covers the estate.** Resources that serve a critical outcome are described by a definition. Those that are not are listed, owned and either adopted or removed.
2. **Declared and running state agree, or the difference is known.** Every difference has a first-detected date, a classification and an owner.
3. **Drift evidence is current.** Detection has completed within the agreed cadence for every workspace, and a paused or failed detector is reported as lost evidence.
4. **Out-of-band change is reconciled.** A change made outside the pipeline is adopted into the definition or reverted, within an agreed window, by a named owner.
5. **Stand-in environments still stand in.** Pre-production and recovery environments match production in the properties that tests and recovery depend on, including capacity and quota.

Exposure created by drift, such as a storage account or network rule opened by hand, is assessed under [Cloud Security Exposure Assurance](/cloud-security-exposure-assurance). Whether recovery meets its objectives is proven under [Disaster Recovery Assurance](/disaster-recovery-assurance).

## Common failure modes

- **The emergency fix that was never written back.** The change that ended the incident exists only in production. A routine deployment weeks later restores the old value and the incident returns.
- **State file mistaken for reality.** The comparison is made against the tool's record of what it last applied, not against the provider. The record and the definition agree. Production differs from both.
- **Resources the inventory cannot see.** From 22 April 2026, new instances managed by EKS Auto Mode are hidden by default from the EC2 console and list APIs. An inventory built on those APIs reports fewer resources than are running.
- **Ignored attributes.** A field is excluded from comparison to silence a noisy difference. The exclusion outlives its reason and hides a later change that matters.
- **Parity lost through growth.** Production was scaled up several times. The recovery environment and its service quotas still reflect the earlier size.
- **One definition, two tools.** Terraform and OpenTofu are diverging in language features, and their version numbers no longer correspond: the latest stable releases in September 2026 are Terraform v1.16.4 and OpenTofu v1.12.6. A plan produced by one tool or version is not evidence for another.
- **Drift with no age.** Differences are reported as a count. Nobody can say which have been open for a day and which for a year.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a change to production is required.

Reconciliation starts with classification, because the two directions of correction have opposite effects. An intended change is adopted: the definition is updated to match production, reviewed and applied so that the plan shows no difference. An unintended change is reverted: production is returned to the declared value through the pipeline. Choosing the wrong direction either legitimises a mistake or reintroduces a fault.

Automated correction is bounded. In February 2026 an Azure remediation workflow disabled anonymous access on storage accounts that allowed it intentionally for platform functionality, and Microsoft's post-incident review records a multi-region outage as the result. A reconciler that reverts everything it does not recognise carries the same risk at enterprise scale. Corrections are staged, limited to agreed resource classes and verified after they run.

Where the business chooses to keep a difference, the decision is recorded with its owner and an expiry date.

## Verified closure

A difference is closed when a fresh comparison shows it gone, not when the pull request was merged.

Closure requires three results. A new plan against the corrected definition reports no change for the resource. The live configuration, read from the provider, holds the intended value. The behaviour that the value controls is confirmed where it can be tested: the rule refuses the traffic it should refuse, the resource is spread across the zones it should occupy, the recovery environment scales to the size production needs.

For an adopted emergency change there is a further test. The next routine deployment is observed to leave the fix in place.

Closure is recorded with the comparison that supports it. If the same resource drifts again the record reopens, so that a resource which is repeatedly changed by hand is visible as a process problem and not as a series of unrelated findings.

## Technology and industry context

The mechanics differ by tool. Workspaces, state, policy sets and health assessments in Terraform and OpenTofu are covered in [Terraform Drift Assurance](/terraform-drift-assurance). Inside a cluster, a GitOps controller reports that the cluster matches Git, which is a statement about manifests and not about node images, live resource allocation or add-on versions. Those are held under [Kubernetes Reliability Assurance](/kubernetes-reliability-assurance).

Provider automation adds approved divergence. EKS Auto Mode gives nodes a maximum lifetime of 21 days, so the set of running instances is never the set that was present at the last review. Drift assurance on such platforms compares properties that should be stable, such as image lineage, configuration and placement, and not instance identity.

In financial services the question is an ongoing obligation. The UK Financial Conduct Authority required firms to show by 31 March 2025 that they can remain within impact tolerance for important business services, supported by mapping and scenario testing. A map of the resources behind a service is a declared state. It is evidence only while production matches it. Sector context is covered in [Financial Services](/financial-services), and the scenario most teams meet first in [Cloud Configuration Drift](/cloud-configuration-drift).
