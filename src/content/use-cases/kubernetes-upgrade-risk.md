---
title: Kubernetes Upgrade Risk
h1: An overdue Kubernetes upgrade gets longer and riskier every release
seoTitle: 'Kubernetes Upgrade Risk: Support Dates and Readiness | Xyvionix'
description: >-
  What to prove when clusters near end of support: the dated boundary, the
  versions to cross, what each crossing breaks, add-on fit and a rehearsal.
summary: >-
  Deferred upgrades compound: more versions to cross, more breaking changes,
  paid extended support or a forced upgrade. The position is set by the support
  calendar, the upgrade path, add-on compatibility and a dated rehearsal.
lede: >-
  Kubernetes upgrade risk is the situation in which a cluster is approaching a
  support boundary and the upgrade that would move it has not been proven. The
  state is Degrading: the cluster is in support today and the margin shrinks
  daily, while each upstream release adds another version to cross. Providers
  publish the date on which the choice is removed. What has to be proven is
  that the whole upgrade path can be completed, and verified, before that date.
ogQuestion: Can the upgrade finish before the provider forces it?
cluster: reliability
secondary:
  - change
parent: use-cases
state: degrading
audience:
  - VP Platform
  - Head of SRE
intent: 'Problem: clusters are approaching end of support or an upgrade is overdue'
related:
  assurance:
    - kubernetes-reliability-assurance
    - release-assurance
    - rollback-readiness-assurance
  useCases:
    - cloud-configuration-drift
    - high-change-failure-rate
  technologies:
    - eks-reliability-assurance
    - aks-reliability-assurance
  industries:
    - saas-production-reliability
  insights:
    - kubernetes-support-windows-upgrade-risk
evidence:
  - name: Support calendar per cluster
    detail: >-
      For each control plane and node pool, the version, the grade of support
      it holds, the date of the next boundary and the date on which that was
      last read from the provider's own page, since published dates move.
  - name: Upgrade path
    detail: >-
      The number of minor versions between the running version and the
      target, the order in which they must be taken under the provider's
      rules, and the measured duration of the last upgrade completed.
  - name: Crossing inventory
    detail: >-
      For each minor version on the path, the removals and behaviour changes
      it brings, checked against the node images, container runtime,
      data-plane mode, volumes and manifests the cluster actually uses.
  - name: Add-on compatibility record
    detail: >-
      Every add-on, operator and admission webhook with the version that
      supports the target release, and whether its upstream project is still
      maintained.
  - name: Rehearsal result
    detail: >-
      A dated run of the full path on a cluster built like production, with
      the failures met, the corrections made and the node image it ran on.
  - name: Reverse path statement
    detail: >-
      Whether the provider offers a rollback for this upgrade, the period in
      which it is available, what it excludes and the conditions that block
      it.
  - name: Post-upgrade verification
    detail: >-
      Versions reported by the control plane, node pools and add-ons, a
      completed node drain, confirmation that telemetry still arrives, and
      service level indicators over the agreed observation period.
thresholds:
  - signal: Time to the next support boundary against the time the path needs
    basis: The enterprise's measured duration for one minor upgrade and the number of minors to cross
    lostWhen: The time remaining is shorter than the path requires, so the boundary arrives before the upgrade can finish
  - signal: Clusters able to reach the provider's automatic upgrade date
    basis: A forced upgrade is an unscheduled production change on the provider's timing
    lostWhen: Any cluster's planned completion falls after the date on which the provider upgrades it
  - signal: Clusters in a paid or reduced grade of support
    basis: The provider's published price and terms, for example Amazon EKS at $0.60 per cluster per hour in extended support against $0.10 in standard support
    lostWhen: A cluster enters that grade without a recorded decision, an owner and an exit date
  - signal: Known blockers open on the path
    basis: The lead time needed to replace a node image, runtime or add-on through the change process
    lostWhen: A blocker remains open when the time left is shorter than the time its correction needs
  - signal: Rehearsal currency
    basis: The target version, node image and add-on versions the rehearsal ran against
    lostWhen: Any of them has changed since the last passing rehearsal
faqs:
  - q: Is paying for extended support a reasonable choice?
    a: >-
      It can be, as a decision with an owner and an end date. Amazon EKS lists
      extended support at $0.60 per cluster per hour against $0.10 in standard
      support. The payment defers the upgrade and does not shorten it. While
      the cluster waits, upstream continues to release and the path to a
      current version grows.
  - q: Can minor versions be skipped to catch up faster?
    a: >-
      That depends on the provider. Microsoft states that supported AKS
      clusters outside Long-Term Support must upgrade one minor version at a
      time, and that a move from one LTS version to a higher LTS version can
      skip minors. The rule for each platform is read from its current
      documentation before the path is planned.
  - q: The provider's upgrade checks report no issues. Is the cluster ready?
    a: >-
      The checks are one input. Amazon EKS cluster insights refresh every 24
      hours or on demand, and its rollback insights cover EKS-managed add-ons
      only. Self-managed add-ons, admission webhooks and workload behaviour are
      outside them. Readiness is shown by a rehearsal on a cluster built like
      production.
sources:
  - title: 'Kubernetes releases and support periods'
    url: 'https://kubernetes.io/releases/'
  - title: 'Kubernetes deprecated API migration guide'
    url: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/'
  - title: 'Kubernetes v1.35 sneak peek: containerd 1.x and kube-proxy ipvs mode'
    url: 'https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/'
  - title: 'KEP-5573: remove cgroup v1 support'
    url: 'https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/5573-remove-cgroup-v1/README.md'
  - title: 'Kubernetes v1.36 sneak peek'
    url: 'https://kubernetes.io/blog/2026/03/30/kubernetes-v1-36-sneak-peek/'
  - title: 'Kubernetes v1.36: deprecation and removal of Service externalIPs'
    url: 'https://kubernetes.io/blog/2026/05/14/kubernetes-v1-36-deprecation-and-removal-of-service-externalips/'
  - title: 'Kubernetes v1.37 sneak peek'
    url: 'https://kubernetes.io/blog/2026/07/31/kubernetes-v1-37-sneak-peek/'
  - title: 'Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'Amazon EKS Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'Amazon EKS pricing'
    url: 'https://aws.amazon.com/eks/pricing/'
  - title: 'Amazon EKS: roll back a cluster version'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html'
  - title: 'Amazon EKS cluster insights'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html'
  - title: 'AKS supported Kubernetes versions'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'AKS Long-Term Support'
    url: 'https://learn.microsoft.com/en-us/azure/aks/long-term-support'
  - title: 'AKS cluster auto-upgrade channels'
    url: 'https://learn.microsoft.com/en-us/azure/aks/auto-upgrade-cluster'
  - title: 'Kubernetes virtual IPs and service proxies'
    url: 'https://kubernetes.io/docs/reference/networking/virtual-ips/'
  - title: 'GKE release channels'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels'
  - title: 'GKE release schedule'
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

## What changed

Nothing changed in the cluster. The calendar moved. The Kubernetes project ships a minor release roughly every four months and supports each for about a year. On 27 September 2026 the supported upstream minors are 1.37, 1.36 and 1.35, and 1.38 is in development.

Each managed service publishes its own boundaries. These are the ones that fall within the next few months, as published on the date above.

| Platform | Version | Boundary | Date |
|---|---|---|---|
| AKS | Azure Linux 2.0 node images | Images removed, after which affected node pools cannot scale | From 31 October 2026 |
| AKS | 1.34 | End of life on the AKS calendar | November 2026 |
| Amazon EKS | 1.31 | End of extended support | 26 November 2026 |
| Amazon EKS | 1.34 | End of standard support | 2 December 2026 |
| GKE | 1.34 | End of standard support, a best-effort date | 25 January 2027 |
| Upstream | 1.35 | End of life | 28 February 2027 |

The state is Degrading. A cluster on one of these versions is in support today. Its margin shrinks daily without any action by the team, and each upstream release adds a version to the path it will have to travel.

## The business outcome at risk

The first outcome is control over when production changes. At the end of extended support, Amazon EKS upgrades the control plane to the oldest supported version, at any time after the date and without prior notification. Nodes and add-ons are not upgraded with it. Google states that GKE upgrades clusters at the end of support regardless of blocking issues. The upgrade that was deferred still happens, without the rehearsal and without the team choosing the day.

The second is cost. Extended support is enabled by default on EKS, and the published price moves from $0.10 to $0.60 per cluster per hour. Delay has a price that finance can read from the invoice.

The third is capacity. After Azure Linux 2.0 node images are removed, scale-out fails on the affected AKS node pools. The failure appears when the pool next needs to grow, which is during a load peak or an incident.

A cluster is shared. Every service that runs on it carries these consequences together.

## What must be proven

**The support position, per control plane and per node pool.** The record names the grade of support as well as the version. Standard and extended support on EKS, and community support, platform support and Long-Term Support on AKS, differ in what is patched.

**The length of the path.** A cluster three minors behind needs three upgrades where the provider requires them in sequence, and each is a production change.

**What each crossing brings.** Removals are tied to versions, so the list depends on where the cluster starts.

| Crossing into | What arrives |
|---|---|
| 1.32 | `flowcontrol.apiserver.k8s.io/v1beta3` is removed |
| 1.35 | The kubelet does not start on cgroup v1 nodes unless overridden. kube-proxy `ipvs` mode is deprecated |
| 1.36 | containerd 1.x is no longer supported. The `gitRepo` in-tree volume path is closed. Service `externalIPs` produces deprecation warnings |
| 1.37 | The `--filename` flag of `kubectl run` is deprecated, which affects scripts and pipelines |

The official migration guide lists no further API group removals for 1.33 to 1.37. Most of the items above are properties of node images, runtimes and tooling, which an API scan does not read.

**Add-ons fit the target and are still maintained.** Ingress NGINX was retired in March 2026 and receives no further security updates. It continues to run, so the upgrade plan is where it gets noticed.

**The path has been rehearsed.** The rehearsal runs on a cluster built like production, including its node images.

**The way back is known before the start.** An EKS control plane can be rolled back one minor version within 7 days of an in-place upgrade. Add-ons, node groups and etcd data are not rolled back. Microsoft states that on AKS a downgrade or rollback to an unsupported version is not supported.

The continuing form of this evidence is described in [Kubernetes Reliability Assurance](/kubernetes-reliability-assurance), and reversal in [Rollback Readiness Assurance](/rollback-readiness-assurance).

## What causes assurance to be lost

**Deferral compounds.** Each quarter of delay adds a crossing to the path and removes time from the margin. The work grows while the period available for it shrinks.

**The plan rests on an old calendar.** Google describes its GKE schedule dates as best-effort. A plan built on last quarter's page can be wrong today.

**Long-Term Support is read as cover for everything.** AKS Long-Term Support extends the Kubernetes version. Add-ons keep their own lifecycles, so a cluster in LTS can still hold unsupported components.

**Nobody is assigned the date.** The default auto-upgrade channel on AKS Standard is `none`, so version currency depends on a person remembering.

**The upgrade is treated as an infrastructure task.** It changes the platform under every workload, and it needs the staging and verification given to any release, as described in [Release Assurance](/release-assurance).

## Corrective action

Blockers are removed before the upgrade is scheduled, because they have their own lead times. Node pools move to images that use cgroup v2 and containerd 2.x. Workloads that mount `gitRepo` volumes move to init containers or git-sync style tooling. A retired ingress controller is replaced by Gateway API or a maintained controller, with routing, TLS and timeouts compared before and after. The kube-proxy mode is set explicitly so that a future change of default does not alter the data plane.

The path is then taken in stages: a rehearsal cluster, a production cluster of lower criticality, then the rest, with node pools upgraded in groups. Under assurance, Xyvionix owns these corrections through to completion within the access it has been granted, and uses the enterprise's own change process.

Where the business chooses to pay for a longer support period, the decision is recorded with its owner and an exit date. The boundary it defers stays on the calendar.

## What verified closure looks like

An upgrade is closed by evidence from the running cluster. The control plane and every node pool report the target version. Add-ons report versions that support it. A node drain completes. Service level indicators for the critical journeys stay inside their objectives through the observation period.

Telemetry is checked separately, because an upgrade can stop the measurement. On AKS 1.37, Azure Monitor managed Prometheus moves to namespace-scoped secret access, and monitors that use `basicAuth` have to be reconfigured before the upgrade. Without that, scraping stops and the dashboards show no breach.

On EKS, the decision to keep or reverse the upgrade is taken on current evidence before the 7 days end.

Closure restores the margin. The next minor release starts to reduce it again.

## What to do next

Build one table from the provider consoles and the provider documentation, read today. It has one row per cluster: control plane version, the version of each node pool, the grade of support, the date of the next boundary and the number of minor versions to the newest one offered.

Then add one figure from the team's own history: how long the last minor upgrade took from the start of planning to verified completion. Multiply it by the number of versions to cross and compare the result with the time to the boundary. Clusters where the path is longer than the time left are the ones to act on first. Platform detail is covered in [Amazon EKS Reliability Assurance](/eks-reliability-assurance) and [AKS Reliability Assurance](/aks-reliability-assurance).
