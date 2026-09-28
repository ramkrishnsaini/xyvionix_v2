---
title: Azure AKS Reliability Assurance
h1: Know which grade of support each AKS cluster holds, and what drives its upgrades
seoTitle: 'AKS Reliability: Support Grades, Upgrade Channels | Xyvionix'
description: >-
  What has to stay proven on AKS: the support grade of each cluster, upgrade
  channel and maintenance window, node image lifecycle, add-on retirement and
  telemetry.
summary: >-
  On AKS, supported has three grades and upgrades run on a channel that
  defaults to none. Support grade, channel and window, node image, add-on
  lifecycle and post-upgrade telemetry are each held against a threshold.
lede: >-
  AKS reliability assurance is the continuing proof that each Azure Kubernetes
  Service cluster holds the grade of support the business accepted, is
  upgraded by a mechanism someone configured on purpose, and runs node images
  and add-ons that are still maintained. AKS gives each Kubernetes version 12
  months of community support. What happens after that depends on the tier,
  the plan and the upgrade channel, and each of those is a setting that can be
  wrong without producing an alert.
ogQuestion: Which grade of support is each AKS cluster in today?
platform: Azure Kubernetes Service (AKS)
group: kubernetes
cluster: reliability
secondary:
  - change
parent: technologies
state: assured
audience:
  - VP Platform
  - Head of SRE
intent: >-
  Technology + problem: proving AKS clusters remain supported, upgradable and
  resilient
related:
  assurance:
    - kubernetes-reliability-assurance
    - release-assurance
    - vulnerability-remediation-assurance
  useCases:
    - kubernetes-upgrade-risk
    - unverified-vulnerability-closure
  technologies:
    - azure-production-reliability
    - eks-reliability-assurance
    - entra-id-exposure-assurance
  industries:
    - saas-production-reliability
  insights:
    - kubernetes-support-windows-upgrade-risk
evidence:
  - name: Support grade per cluster
    detail: >-
      Each cluster's Kubernetes version and patch version, recorded as
      community support, platform support or Long-Term Support, with the
      tier and plan that Long-Term Support depends on.
  - name: Upgrade channel and maintenance window record
    detail: >-
      The cluster auto-upgrade channel, the node OS upgrade channel and the
      maintenance window configured on each cluster, with the date each
      last performed an upgrade.
  - name: Node image record
    detail: >-
      The operating system and image version of every node pool, checked
      against Microsoft's published support and image removal dates.
  - name: Add-on lifecycle inventory
    detail: >-
      Every managed add-on and extension in the cluster with its own
      retirement date, which is separate from the Kubernetes version's
      support period.
  - name: Upgrade path length
    detail: >-
      The number of sequential minor upgrades each cluster needs to reach a
      version in community support, and the rehearsal result for the next
      one.
  - name: Post-upgrade telemetry check
    detail: >-
      Confirmation that metrics, logs and traces behind each service level
      objective are still arriving after a cluster or node image upgrade.
  - name: Pod readiness measurement
    detail: >-
      The measured time from scheduling to ready for new pods when nodes
      have to be provisioned, compared with traffic ramp rates.
thresholds:
  - signal: Support grade held by each cluster
    basis: The grade the business accepted, given that platform support carries no Kubernetes patches
    lostWhen: Any production cluster holds a lower grade than accepted, or a Long-Term Support cluster is outside the two most recent patch versions
  - signal: Time to the end of community support, per cluster
    basis: Microsoft's published calendar and the enterprise's upgrade lead time, multiplied by the number of sequential minor upgrades required
    lostWhen: The remaining time is shorter than the upgrades outstanding would take
  - signal: Clusters with no upgrade mechanism
    basis: Version currency has to depend on a configured channel or a named owner with a schedule
    lostWhen: A cluster has its auto-upgrade channel set to none and no owned upgrade plan, or a configured channel has not upgraded when expected
  - signal: Node pools on an image with a published removal date
    basis: The removal date and the time needed to migrate and re-test the pool
    lostWhen: Any node pool remains on the image inside the agreed lead time before removal
  - signal: Add-ons past or near retirement
    basis: The add-on's published end of support and its position in the request or identity path
    lostWhen: A retired add-on is still running, or its replacement has not been rehearsed inside the agreed lead time
  - signal: Telemetry arriving after upgrade
    basis: The service level objectives that depend on the metric
    lostWhen: Any indicator behind a critical objective returns no data after an upgrade
faqs:
  - q: What is the difference between community support and platform support on AKS?
    a: >-
      Community support covers the three most recent minor versions, each
      for 12 months from general availability, and includes Kubernetes
      patches. Platform support covers the next version back for Azure
      platform issues only. It carries no Kubernetes patches and does not
      allow new clusters to be created. Both appear as supported, which is
      why the evidence names the grade.
  - q: Does Long-Term Support remove the need to upgrade?
    a: >-
      It defers the Kubernetes version upgrade by one additional year,
      about 24 months in total. It requires the Premium tier and the
      Long-Term Support plan, and only the two most recent patch versions
      are supported. Add-ons and node operating systems keep their own
      lifecycles, so a cluster on Long-Term Support can still hold
      components that are out of support.
  - q: AKS Automatic manages upgrades. What is left to prove?
    a: >-
      The outcome. AKS Automatic fixes the stable upgrade channel and the
      NodeImage node OS channel, and enforces deployment safeguards. Those
      choices reduce operator error and move the timing of change to the
      platform. Whether workloads tolerate that change, and whether service
      levels hold after it, is still measured by the enterprise.
sources:
  - title: 'AKS supported Kubernetes versions'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'AKS Long-Term Support'
    url: 'https://learn.microsoft.com/en-us/azure/aks/long-term-support'
  - title: 'AKS cluster auto-upgrade channels'
    url: 'https://learn.microsoft.com/en-us/azure/aks/auto-upgrade-cluster'
  - title: 'AKS Automatic overview'
    url: 'https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic'
  - title: 'AKS node auto-provisioning'
    url: 'https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning'
  - title: 'Azure status history: post-incident review FNJ8-VQZ'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on AKS

On Azure Kubernetes Service the question "is the cluster supported" has three different ways of being answered yes.

Community support covers the latest three minor versions, written as N-2, and lasts 12 months from a version's general availability. Platform support covers N-3 for Azure platform issues only, with no Kubernetes patches and no cluster creation. Long-Term Support (LTS) adds one further year after community support, on the Premium tier with the LTS plan. A dashboard that shows a tick for all three hides the difference that matters, which is whether the cluster still receives Kubernetes fixes.

The second part of the problem is what drives the upgrade. AKS offers auto-upgrade channels, and on the Standard tier the default channel is `none`. Version currency then depends on a person remembering. If nobody acts, AKS upgrades clusters that are about to fall to N-4 up to N-2, and Microsoft gives 30 days' notice before a version is removed.

The third part is direction. Supported clusters outside LTS upgrade one minor version at a time, and downgrade or rollback to an unsupported version is not supported. A cluster that falls three versions behind faces three production changes in sequence, and it cannot return to a version that has left support.

The vendor-neutral position is set out in [Kubernetes Reliability Assurance](/kubernetes-reliability-assurance). This page covers what is particular to AKS.

## What expires, and on whose calendar

The dates below are from Microsoft's AKS support calendar as updated on 15 September 2026. Version 1.33 reached end of life in July 2026.

| AKS version | General availability | End of community support |
|---|---|---|
| 1.34 | November 2025 | November 2026 |
| 1.35 | March 2026 | March 2027 |
| 1.36 | June 2026 | June 2027 |
| 1.37 | In preview September 2026, planned for October 2026 | October 2027 |

The Kubernetes version is one calendar among several on AKS.

| Component | Dated fact |
|---|---|
| Azure Linux 2.0 node images | No support or security updates since 30 November 2025. Images are removed from 31 October 2026, after which affected node pools cannot scale |
| Open Service Mesh add-on | Support ends 30 September 2027 |
| Microsoft Entra pod-managed identity | Managed add-on support ended in September 2025. Microsoft Entra Workload ID is the current mechanism |
| `node-image` cluster auto-upgrade channel | Legacy and planned for deprecation. The `NodeImage` node OS channel replaces it |

Settings carry their own delays. Microsoft recommends a maintenance window of four hours or more, and a change of upgrade channel can take up to 24 hours to apply.

## What must be continuously re-proven

**The grade, by name.** Each cluster is recorded as community, platform or LTS. For LTS the record includes the tier, the plan and the patch version, because only the two most recent patch versions are supported.

**The upgrade mechanism, and that it ran.** The channels are `none`, `patch`, `stable`, which follows the latest patch on N-1, and `rapid`, which follows the latest minor. A configured channel is a control. The evidence that it works is the date it last upgraded the cluster inside its maintenance window.

**Node images.** Node operating system updates run on their own channel and their own lifecycle. A cluster on a current Kubernetes version can sit on a node image that Microsoft has stopped patching.

**Add-ons under LTS.** LTS extends the Kubernetes version only. The add-on inventory is checked against each add-on's own end date.

**Scaling behaviour after an upgrade.** AKS node auto-provisioning manages Karpenter through the AKS Karpenter provider, and the Karpenter version is tied to the cluster version: AKS ships `1.12.2-aks` with Kubernetes 1.36 and `1.7.0-aks` with 1.35. An upgrade from 1.35 to 1.36 therefore changes the autoscaler as well. For AKS Automatic, Microsoft publishes a pod readiness service level: 99.9% of qualifying pod readiness operations complete within 5 minutes. That figure can be measured independently and compared with how quickly traffic rises.

**Telemetry after an upgrade.** On AKS 1.37, Azure Monitor managed Prometheus moves to namespace-scoped secret access. A `ServiceMonitor` or `PodMonitor` that uses `basicAuth` must be reconfigured before the upgrade, or scraping stops. An objective with no data reports no breach.

**The platform beneath the cluster.** Microsoft's review of the incident of 2 to 3 February 2026 lists AKS among the services impacted when virtual machine extension retrieval was blocked and the managed identity backend was overwhelmed. Those dependencies are covered in [Azure Production Reliability](/azure-production-reliability).

## Common failure modes

- **Supported, grade unstated.** The report says every cluster is supported. One is in platform support and has received no Kubernetes patches since it moved there.
- **Channel none, owner none.** The default was never changed and no team holds the upgrade schedule.
- **An upgrade that was stopped quietly.** AKS stops a cluster upgrade when it detects deprecated Kubernetes API usage. The channel is configured, the cluster is assumed current, and the version has not moved.
- **A node pool that cannot grow.** A pool on Azure Linux 2.0 works until it has to scale after 31 October 2026. The failure first appears under load.
- **LTS with a retired add-on.** The Kubernetes version is inside LTS. The mesh or identity add-on beside it is past its own end of support.
- **A legacy channel still set.** The cluster uses the `node-image` auto-upgrade channel, which is planned for deprecation.
- **Auto-provisioning assumed where it is not supported.** Node auto-provisioning does not support Windows node pools, IPv6 clusters or service principals, and a cluster that uses it cannot be stopped.
- **Guardrail read as verification.** Deployment safeguards in AKS Automatic stop known bad input. They say nothing about the outcome after a change, which is the subject of [Release Assurance](/release-assurance).

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production must change.

Corrections on AKS are specific. A cluster with no upgrade mechanism is given a channel, a maintenance window and an owner. A cluster several versions behind is given a sequence of rehearsed upgrades with a date for each. A node pool on Azure Linux 2.0 is migrated to Azure Linux 3.0 before the image removal date. A retired add-on is replaced, for example pod-managed identity by Microsoft Entra Workload ID, and the workloads that used it are re-tested. Monitors that depend on `basicAuth` are reconfigured before the 1.37 upgrade is scheduled.

Where the business chooses LTS or platform support for a period, the decision is recorded with its owner and an expiry date, and the boundary it defers is still tracked.

Closure is recorded by re-test. For an upgrade, the control plane and every node pool report the target version, a node drain completes, the indicators behind each objective return data, and service levels hold. For a channel, the next scheduled upgrade is observed to run inside the window. For a node image migration, the pool is scaled out in a test. For an add-on replacement, the old add-on is absent from the running cluster and the dependent workloads authenticate or route through the new one.

Each closure is dated. Microsoft revises its calendar, so the published dates are re-read on a cadence. The scenario most teams meet first is described in [Kubernetes Upgrade Risk](/kubernetes-upgrade-risk).
