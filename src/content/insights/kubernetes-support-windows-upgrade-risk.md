---
title: Kubernetes support windows and the cost of deferred upgrades
h1: A deferred Kubernetes upgrade is a debt with a published due date
seoTitle: 'Kubernetes Support Windows and Upgrade Debt | Xyvionix'
description: >-
  Support windows give every deferred Kubernetes upgrade a date and a price.
  How the calendars compare across platforms, and what evidence proves
  readiness.
summary: >-
  Deferring a Kubernetes upgrade is not a neutral wait. Support calendars set
  the due date, each skipped version adds to the crossing, and readiness has to
  be proven before the date and after the upgrade.
lede: >-
  A deferred Kubernetes upgrade is a debt with a published due date. The
  project and every managed service publish when support for each minor version
  ends, and Amazon EKS publishes what the extension costs per cluster per hour.
  The amount owed grows while it waits, because each skipped version adds
  removed interfaces, runtime requirements and add-on incompatibilities to the
  eventual crossing. Waiting is a dated risk and should be held with evidence.
ogQuestion: 'What does a deferred Kubernetes upgrade cost, and when is it due?'
category: Production Reliability
author: Xyvionix Research
featured: false
cluster: reliability
secondary:
  - change
parent: insights
state: degrading
audience:
  - VP Platform
  - Head of SRE
  - CTO
  - Technology risk lead
intent: >-
  Upstream and managed-service support windows turn a deferred upgrade into a
  dated risk with a price. Covers current support policies from research,
  removed APIs, add-on compatibility, and an upgrade readiness evidence model.
related:
  assurance:
    - kubernetes-reliability-assurance
    - release-assurance
  useCases:
    - kubernetes-upgrade-risk
  technologies:
    - eks-reliability-assurance
    - aks-reliability-assurance
  industries:
    - saas-production-reliability
  insights:
    - cloud-drift-production-risk
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Kubernetes: releases'
    url: 'https://kubernetes.io/releases/'
  - title: 'Kubernetes: version skew policy'
    url: 'https://kubernetes.io/releases/version-skew-policy/'
  - title: 'Kubernetes: deprecated API migration guide'
    url: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/'
  - title: 'Kubernetes blog: v1.37 sneak peek'
    url: 'https://kubernetes.io/blog/2026/07/31/kubernetes-v1-37-sneak-peek/'
  - title: 'Kubernetes blog: v1.36 deprecation and removal of Service externalIPs'
    url: 'https://kubernetes.io/blog/2026/05/14/kubernetes-v1-36-deprecation-and-removal-of-service-externalips/'
  - title: 'Kubernetes blog: v1.36 sneak peek'
    url: 'https://kubernetes.io/blog/2026/03/30/kubernetes-v1-36-sneak-peek/'
  - title: 'Kubernetes blog: v1.35 sneak peek'
    url: 'https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/'
  - title: 'Kubernetes enhancements: KEP-5573, remove cgroup v1'
    url: 'https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/5573-remove-cgroup-v1/README.md'
  - title: 'Kubernetes blog: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'Amazon EKS: Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'Amazon EKS: pricing'
    url: 'https://aws.amazon.com/eks/pricing/'
  - title: 'Amazon EKS: roll back a cluster version'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html'
  - title: 'Amazon EKS: cluster insights'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html'
  - title: 'Microsoft Learn: supported Kubernetes versions in AKS'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'Microsoft Learn: AKS Long-Term Support'
    url: 'https://learn.microsoft.com/en-us/azure/aks/long-term-support'
  - title: 'Google Cloud: GKE release channels'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels'
  - title: 'Google Cloud: GKE release schedule'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/release-schedule'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Waiting is a position, and it has a date

Deferring an upgrade is usually recorded as no decision at all. The cluster works, the upgrade moves to next quarter, and nothing appears to have been risked.

The calendar says otherwise. The Kubernetes project maintains release branches for the most recent three minor versions, gives each approximately one year of patch support, and ships a new minor roughly every four months. As of 27 September 2026 the supported upstream minors are 1.37, 1.36 and 1.35. Version 1.37 was released on 26 August 2026. Version 1.34 and everything older is end of life upstream.

| Upstream minor | Upstream end of life |
|---|---|
| 1.37 | 28 October 2027 |
| 1.36 | 28 June 2027 |
| 1.35 | 28 February 2027 |

A cluster therefore faces about three upgrade decisions a year, and one that is in support in spring can be out of upstream support by winter with nothing deployed to it.

So the deferred upgrade is a debt in a precise sense. It has a principal, which is the work of crossing to a supported version. It has a due date, which the vendor publishes. It has interest, which is set out below. The wider model for holding a cluster's condition as evidence is described in [Kubernetes Reliability Assurance](/kubernetes-reliability-assurance).

## One version, four calendars

Support status is usually reported as a yes or a no. Across platforms it is neither. Take version 1.34 as it stood on 27 September 2026.

| Calendar | Position of 1.34 | Next boundary |
|---|---|---|
| Upstream Kubernetes | End of life | Already passed |
| Amazon EKS | Standard support | Standard support ends 2 December 2026 |
| AKS | Community support | End of life November 2026 |
| GKE | Standard support | Standard support ends 25 January 2027 |

The same version is unsupported by the project that wrote it and supported by three providers for a few months more. The managed windows differ in length, and they differ more in what happens when they close.

| Platform | Standard window | Extension | When the window closes |
|---|---|---|---|
| Amazon EKS | 14 months of standard support | 12 months of extended support, enabled by default | Control plane upgraded automatically to the oldest supported version, at any time after the date and without prior notification |
| AKS | 12 months per generally available version | Long-Term Support adds one year and requires the Premium tier | Platform support at N-3 with no Kubernetes patches. Clusters about to fall to N-4 are upgraded automatically to N-2 |
| GKE | 14 months per minor version | The Extended channel gives up to about 24 months in total | Clusters upgraded automatically regardless of blocking issues |

Two points follow. First, "supported" is graded. A cluster in AKS platform support reads as supported on a dashboard and receives no Kubernetes patches. A report that does not name the grade has not said whether a vulnerability will be fixed.

Second, every managed calendar ends in an automatic upgrade. The debt is not forgiven at the due date. It is collected, at a time the provider chooses. On EKS the control plane moves while nodes and add-ons are not upgraded, which is a partial upgrade nobody planned. On GKE the upgrade proceeds whatever is blocking it, and the schedule dates are published as best effort, so a plan built on last quarter's dates may already be wrong. The platform-specific calendars are set out in [EKS Reliability Assurance](/eks-reliability-assurance) and [AKS Reliability Assurance](/aks-reliability-assurance).

## The published price, and the larger one

Amazon publishes the price of waiting. An EKS cluster costs $0.10 per hour in standard support and $0.60 per hour in extended support, six times as much. Extended support is enabled by default, so the higher rate starts on the boundary date without anyone choosing it.

In this illustrative example, a fleet of 10 clusters spends a full year of 8,760 hours in extended support. At the standard rate the cluster fee would be $8,760. At the extended rate it is $52,560. The difference of $43,800 buys no capacity and no feature. It buys twelve months, after which the automatic upgrade applies anyway.

Microsoft and Google attach a cost as well. AKS Long-Term Support requires the Premium tier, and GKE applies a pay-per-use cost during the extended period. No figure for either is stated here.

The fee is the smaller part of the cost. Its value is that it appears on an invoice, where people who do not read release notes can see it. The larger cost is the growth of the crossing itself.

## Why the debt compounds

A team that upgrades every release meets each version's changes one at a time. A team that defers meets them together, and has to separate their effects inside one change window.

| Version | Change | Where it shows |
|---|---|---|
| 1.32 | `flowcontrol.apiserver.k8s.io/v1beta3` removed | Stored objects and API clients |
| 1.35 | Kubelet setting `failCgroupV1` defaults to true, so the kubelet does not start on a cgroup v1 node unless overridden | Node operating system image |
| 1.35 | kube-proxy `ipvs` mode deprecated. `nftables` is the recommended Linux mode | Service routing under load |
| 1.36 | Support for containerd 1.x dropped. Nodes must run containerd 2.x | Node runtime |
| 1.36 | `gitRepo` in-tree volume path closed | Workloads that still mount it |
| 1.36 | Service `.spec.externalIPs` deprecated, with full removal planned for v1.43 | Service definitions |
| 1.37 | `--filename` flag of `kubectl run` deprecated | Scripts and pipelines |

The official migration guide lists the `flowcontrol` removal in v1.32 and no further API group removals for versions 1.33 to 1.37. Only the first row is visible to a tool that scans manifests for deprecated API versions. The rest are properties of the node image, the container runtime, the data plane, a volume type and the tooling around the cluster. A scanner can return clean and the upgrade can still fail at node start.

Consider an illustrative case: a cluster held on 1.31 and then moved to 1.36. On EKS, extended support for 1.31 ends on 26 November 2026. That crossing meets the first six rows in one programme. When a node fails to join or a workload fails to start, the cause could be the cgroup mode, the runtime, the routing mode or the volume type. Diagnosis time is the interest on the debt, and it is paid during the change window.

Sequencing adds to it. AKS requires supported clusters outside Long-Term Support to upgrade one minor at a time, so every deferred version becomes a separate change event later. The upstream skew policy allows the kubelet to be up to three minor versions older than the API server, so the version of a cluster is not one number.

The reverse path does not grow with the debt. EKS can roll a control plane back one minor version within 7 days of an in-place upgrade, and the rollback excludes add-ons, managed node groups and etcd data. A five-version crossing has no five-version reversal.

## Add-ons and retired components keep their own clocks

The Kubernetes version is the calendar everyone watches. The components around it expire separately, and some give no signal when they do.

Ingress NGINX is the clearest case. Its retirement was announced on 11 November 2025, with best-effort maintenance until March 2026 and no releases, bug fixes or security updates after that. Existing deployments keep working, so nothing alerts. The recommended path is Gateway API or another maintained ingress controller, and that is a change to the traffic path, not a version bump.

Managed services do not close this gap. AKS Long-Term Support extends the Kubernetes version only, while add-ons keep separate lifecycles: support for the Open Service Mesh add-on ends on 30 September 2027. Azure Linux 2.0 node images are removed from 31 October 2026, after which affected node pools cannot scale. On EKS, rollback readiness insights cover EKS-managed add-ons only. A vendor readiness check is one input. It is not an inventory of what the cluster depends on.

## An evidence model for upgrade readiness

If the upgrade is a debt, readiness is the proof that it can be paid on a chosen date.

| Subject | Proven before the upgrade | Proves the upgrade completed |
|---|---|---|
| Support position | Version, support grade and days to the next boundary, read from the current provider calendar | Version and grade recorded for the control plane and each node pool |
| Interfaces | No use of removed or deprecated interfaces in live objects or manifests | The same check returns clean on the new version |
| Nodes | Operating system image, cgroup mode and container runtime meet the target version | Every node has joined on the target image, with skew measured per pool |
| Add-ons and controllers | Each add-on, admission webhook and ingress controller is compatible with the target and still maintained | Each runs the compatible version and its function has been tested |
| Workload behaviour | Critical workloads pass on the target version, including during node replacement | Service level indicators for critical flows are within threshold |
| Reverse path | The rollback route, its exclusions and its time limit are tested | A decision to keep or reverse is recorded before the window closes |

Completion is the right-hand column. A closed ticket proves that a command ran. It does not prove that the nodes followed the control plane, or that an add-on left behind still works.

Every row has an age. The first expires by calendar alone. The others expire when a new workload, node image or add-on version arrives. Practical steps for an estate that is already behind are set out in [Kubernetes Upgrade Risk](/kubernetes-upgrade-risk).

## What this means for assurance

The threshold that matters is the number of days to the next support boundary for each cluster, set against the time the crossing is known to take. While that margin is wide and the readiness evidence is current, the state is Assured. As the margin narrows the state is Degrading, although nothing in the cluster has changed. Where nobody can say which grade of support a cluster holds, the state is Unassured.

Deferral can be a sound decision. It is sound when it is made with the date, the price and the accumulated crossing in view, and with a named date on which the debt will be paid. Without those it is not a decision to wait. It is a change to production that the provider will schedule.
