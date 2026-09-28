---
title: Amazon EKS Reliability Assurance
h1: Keep every Amazon EKS cluster in its chosen support grade, upgradable and reversible
seoTitle: 'Amazon EKS Reliability: Support Windows, Rollback | Xyvionix'
description: >-
  What has to stay proven on Amazon EKS: support grade and its price per
  cluster, readiness beyond upgrade insights, the 7-day rollback window and
  node replacement.
summary: >-
  On Amazon EKS an overdue upgrade is first priced, then performed by AWS
  without notice. Support grade, readiness beyond cluster insights, rollback
  inside its 7-day window and tolerance of node replacement are each held
  against a threshold.
lede: >-
  Amazon EKS reliability assurance is the continuing proof that each EKS
  cluster holds the support grade the business chose, can take its next
  upgrade, and can reverse that upgrade while AWS still allows it. EKS gives
  each Kubernetes version 14 months of standard support and 12 months of
  extended support. Extended support is enabled by default and is priced at
  six times the standard rate, so a cluster can change grade and cost without
  anyone deciding that it should.
ogQuestion: Which support grade is each EKS cluster in, and who chose it?
platform: Amazon EKS
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
  Technology + problem: proving EKS clusters remain supported, upgradable and
  resilient
related:
  assurance:
    - kubernetes-reliability-assurance
    - release-assurance
    - vulnerability-remediation-assurance
  useCases:
    - kubernetes-upgrade-risk
    - high-change-failure-rate
  technologies:
    - aws-production-reliability
    - aks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
  insights:
    - kubernetes-support-windows-upgrade-risk
evidence:
  - name: Support grade per cluster
    detail: >-
      Each cluster's Kubernetes version, whether it is in standard or
      extended support, its upgrade policy setting, the days remaining to
      the next boundary and the hourly price that grade carries.
  - name: Extended support decisions
    detail: >-
      For every cluster in extended support, the recorded decision to be
      there, with its owner, its reason and the date by which the cluster
      will return to standard support.
  - name: Readiness beyond cluster insights
    detail: >-
      The latest upgrade insight results with their refresh time, together
      with separate compatibility checks for what insights do not cover:
      self-managed add-ons, admission webhooks and workload behaviour.
  - name: Add-on and node image compatibility
    detail: >-
      The version of every EKS-managed and self-managed add-on and every
      node image, checked against the target Kubernetes version, including
      the container runtime on the image.
  - name: Rollback readiness record
    detail: >-
      Proof gathered before the upgrade that a control plane rollback is
      possible, the features enabled and resources created since, and the
      days left in the rollback window.
  - name: Node replacement results
    detail: >-
      For each critical workload, the disruption budget and the result of
      the last node drain, with node age measured against the maximum node
      lifetime where EKS Auto Mode is in use.
  - name: Zonal shift practice results
    detail: >-
      Dated results of manual zonal shifts or autoshift practice runs, with
      replica placement by zone and the capacity left in the remaining
      zones.
thresholds:
  - signal: Days to the next support boundary, per cluster
    basis: AWS's published end dates for standard and extended support, and the time the enterprise needs to rehearse and complete an upgrade
    lostWhen: The remaining time falls below the agreed upgrade lead time for any production cluster
  - signal: Clusters in extended support without a decision
    basis: The published prices of 0.10 US dollars per cluster per hour in standard support and 0.60 in extended support, and the support grade the business accepted
    lostWhen: Any cluster enters extended support through the default upgrade policy with no recorded owner and exit date
  - signal: Skew between control plane and node versions
    basis: The upstream policy that a kubelet may be up to three minor versions older than the API server
    lostWhen: Any node group is at the policy limit, or a control plane upgrade has left nodes and add-ons on versions not tested with it
  - signal: Rollback window and preconditions
    basis: AWS's limit of one minor version within 7 days of an in-place upgrade
    lostWhen: An upgrade proceeds without rollback readiness proven beforehand, or post-upgrade verification is incomplete as the window closes
  - signal: Node drains blocked by disruption budgets
    basis: The node replacement frequency the platform imposes, including the 21-day maximum node lifetime in EKS Auto Mode
    lostWhen: A node cannot be drained within the agreed window because a budget permits no disruption
  - signal: Capacity with one Availability Zone removed
    basis: Peak load on the critical journeys served by the cluster
    lostWhen: A zonal shift practice run shows the remaining zones cannot carry the load
faqs:
  - q: What does it cost to stay on an older Kubernetes version on EKS?
    a: >-
      AWS publishes the price. A cluster in standard support is charged 0.10
      US dollars per hour and a cluster in extended support 0.60 US dollars
      per hour, six times as much. Extended support is enabled by default,
      so the higher charge begins on the date standard support ends unless
      the cluster has been upgraded. Prices were checked on 27 September
      2026.
  - q: EKS upgrade insights show no issues. Is the cluster ready to upgrade?
    a: >-
      The insights are one input. They refresh every 24 hours or on demand,
      and rollback readiness insights cover EKS-managed add-ons only. They
      do not test self-managed add-ons, admission webhooks or how workloads
      behave on the new version. Readiness is shown by a rehearsal on a
      cluster built like production.
  - q: Does EKS Auto Mode remove the need for reliability evidence?
    a: >-
      It moves part of it. AWS manages compute autoscaling, networking, load
      balancing, cluster DNS and block storage in Auto Mode, and replaces
      every node within a maximum lifetime of 21 days. That replacement
      restarts the enterprise's pods, and AWS notes that blocking disruption
      budgets can require intervention. Disruption tolerance is exercised
      continuously and remains the enterprise's evidence to hold.
sources:
  - title: 'Amazon EKS Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'Amazon EKS pricing'
    url: 'https://aws.amazon.com/eks/pricing/'
  - title: 'Amazon EKS: roll back a cluster version'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html'
  - title: 'Amazon EKS cluster insights'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html'
  - title: 'Amazon EKS Auto Mode'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/automode.html'
  - title: 'Amazon EKS: zonal shift'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/zone-shift.html'
  - title: 'Kubernetes releases and support periods'
    url: 'https://kubernetes.io/releases/'
  - title: 'Kubernetes version skew policy'
    url: 'https://kubernetes.io/releases/version-skew-policy/'
  - title: 'Kubernetes v1.35 sneak peek: containerd 1.x support'
    url: 'https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Amazon EKS

Amazon EKS does three things to a cluster whose upgrade is overdue. It keeps the cluster running, it raises the price, and at the end it performs the upgrade itself.

Each Kubernetes version receives 14 months of standard support and 12 months of extended support. Extended support is enabled by default through the cluster's upgrade policy. A cluster that is not upgraded therefore moves from 0.10 US dollars per hour to 0.60 US dollars per hour on the day standard support ends. Nobody approved the change of grade. It was the default.

At the end of extended support AWS upgrades the control plane automatically to the oldest supported version. AWS states that this can happen at any time after the date and without prior notification. Nodes and add-ons are not upgraded with it. The result is a control plane on one version and a data plane on another, produced in production on a day nobody chose.

"Supported" on EKS is also a statement about AWS, not about the upstream project. Version 1.34 is in EKS standard support until 2 December 2026, while the Kubernetes project lists 1.34 as end of life upstream. Evidence names the grade and whose support it is.

The vendor-neutral position is set out in [Kubernetes Reliability Assurance](/kubernetes-reliability-assurance). This page covers the dates, prices and limits that are particular to EKS.

## What expires, and on whose calendar

The table shows the versions AWS lists for EKS as of 27 September 2026. Version 1.37, released upstream on 26 August 2026, is not yet listed.

| EKS version | Grade on 27 September 2026 | Next boundary |
|---|---|---|
| 1.36 | Standard support | Standard support ends 2 August 2027 |
| 1.35 | Standard support | Standard support ends 27 March 2027 |
| 1.34 | Standard support | Standard support ends 2 December 2026 |
| 1.33 | Extended support | Extended support ends 29 July 2027 |
| 1.32 | Extended support | Extended support ends 23 March 2027 |
| 1.31 | Extended support | Extended support ends 26 November 2026 |

Two boundaries are close. Clusters on 1.31 become eligible for the automatic control plane upgrade after 26 November 2026. Clusters on 1.34 start paying the extended support price from 2 December 2026.

Shorter clocks run inside the platform. A control plane can be rolled back one minor version within 7 days of an in-place upgrade. Cluster insights refresh every 24 hours or on demand. In EKS Auto Mode a node has a maximum lifetime of 21 days, which can be reduced.

## What must be continuously re-proven

**The grade each cluster is in, and that someone chose it.** Extended support is a legitimate decision when it is made. It is recorded with an owner and an exit date. A cluster that arrived there by default is a finding.

**That no cluster can reach the end of extended support.** The automatic upgrade is an unscheduled production change. The proof is margin: days remaining, per cluster, against the time an upgrade takes through the enterprise's own change process.

**Readiness beyond what insights test.** EKS cluster insights are advisory and partial. AWS temporarily rolled back the enforcement that required a force flag to upgrade when certain insights failed, so a failing insight does not necessarily stop an upgrade. Self-managed add-ons, admission webhooks and node images are checked separately. Upstream Kubernetes dropped support for containerd 1.x in v1.36, so a node image is part of readiness for the newest version EKS offers.

**Rollback, before the upgrade and before the window closes.** Rollback covers the control plane only. Add-ons, managed node groups, self-managed and hybrid nodes and etcd data are not rolled back, and rollback is blocked if an incompatible EKS feature was enabled after the upgrade. Rollback readiness insights are point-in-time and exist only during the 7-day window. Readiness weakens each day as new resources are created on the new version. The general capability is covered in [Rollback Readiness Assurance](/rollback-readiness-assurance).

**Tolerance of node replacement.** Auto Mode nodes run immutable Bottlerocket-based images with no SSH or SSM access, and each is replaced within its maximum lifetime. Every workload is drained on a cycle whether or not anything was released.

**Zone loss.** An EKS zonal shift cordons the nodes in the impaired zone and removes their pod endpoints from EndpointSlices. It does not terminate nodes or evict pods, and it adds no capacity elsewhere. The regional picture is covered in [AWS Production Reliability](/aws-production-reliability).

**The outcome after the upgrade.** A completed upgrade is a deployment result. Whether the services on the cluster still meet their objectives is verified afterwards, as described in [Release Assurance](/release-assurance).

## Common failure modes

- **Extended by default.** The cluster passed its standard support date unnoticed. The first signal was the invoice.
- **Upgraded by AWS, nodes left behind.** The control plane moved at the end of extended support. Node groups and add-ons stayed where they were, on versions never tested with the new control plane.
- **Clean insights, broken webhook.** Every insight passed. A self-managed admission webhook, outside their coverage, rejected requests on the new version.
- **Rollback expected to restore add-ons.** The control plane returned to the previous version. The add-ons and node groups upgraded alongside it did not.
- **Rollback blocked by a new feature.** An EKS feature incompatible with the previous version was enabled on day two. The rollback needed on day five was refused.
- **Template rolled back, cluster not.** AWS notes that a CloudFormation stack rollback to a template with a lower Kubernetes version does not roll back the cluster version. Declared and running versions then disagree.
- **A budget that stalls node replacement.** A disruption budget permits no unavailable replicas, so the node cannot be drained when its lifetime ends.
- **Zonal shift where it does not apply.** Zonal shift is not supported on Fargate, and self-managed Karpenter must be version 1.12 or greater. Clusters outside those conditions have the setting and not the behaviour.
- **Nodes the inventory cannot see.** From 22 April 2026, new instances managed by Auto Mode are hidden by default from the EC2 console and list APIs.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production must change.

Corrections on EKS are specific. A cluster inside its upgrade lead time is rehearsed and upgraded, with its add-ons and node groups brought to versions tested against the new control plane. A cluster in extended support by default is either upgraded or given a recorded decision with an exit date. An upgrade policy is set deliberately per cluster. A disruption budget that blocks drains is reset to a value the replica count supports. Node images are moved to a container runtime the target version accepts before the control plane upgrade is scheduled.

Closure is recorded by re-test. For an upgrade, the control plane, every node group and every add-on report versions compatible with each other, a node drain completes, and the service level indicators of the critical journeys hold after the change. Verification is finished while the rollback window is still open, so that a failed result can still be acted on. For zone loss, a zonal shift practice run at representative load stays within objective. For support grade, the cluster reports the intended version and the charge on the next bill matches the grade.

Each closure is dated. The next boundary on AWS's calendar starts the clock again. The scenario most teams meet first is described in [Kubernetes Upgrade Risk](/kubernetes-upgrade-risk).
