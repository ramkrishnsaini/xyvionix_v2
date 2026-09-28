---
title: Kubernetes Reliability Assurance
h1: Keep every Kubernetes cluster inside its supported, rehearsed envelope
seoTitle: 'Kubernetes Reliability Assurance: Support, Upgrades | Xyvionix'
description: >-
  Continuous assurance for Kubernetes platforms: support position per cluster,
  upgrade readiness below the API, disruption tolerance and zone headroom.
summary: >-
  Kubernetes reliability expires on a release calendar. Support position,
  upgrade readiness, add-on lifecycle, disruption tolerance and capacity
  headroom are each held against a threshold and re-proven every release.
lede: >-
  Kubernetes reliability assurance is the continuing proof that each cluster is
  in support, can take its next upgrade, and can lose a node or a zone without
  breaching the service levels that depend on it. The proof is dated. Upstream
  ships a minor release roughly every four months and supports each for about a
  year, so evidence gathered in spring describes a different platform by
  winter, even when nothing was deployed.
ogQuestion: 'Is the cluster still inside its supported, tested envelope?'
kind: child
cluster: reliability
secondary:
  - change
parent: production-reliability-assurance
state: assured
audience:
  - VP Platform
  - Head of SRE
  - VP Engineering
  - Technology Risk
intent: >-
  Commercial: continuing proof that Kubernetes platforms remain supported,
  upgradable and resilient
related:
  assurance:
    - cloud-drift-assurance
    - release-assurance
    - slo-assurance
  useCases:
    - kubernetes-upgrade-risk
    - cloud-configuration-drift
  technologies:
    - eks-reliability-assurance
    - aks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
  insights:
    - kubernetes-support-windows-upgrade-risk
evidence:
  - name: Support position per cluster
    detail: >-
      The version of each control plane and each node pool, the grade of
      support it currently holds, and the days remaining to the next support
      boundary on the upstream and provider calendars.
  - name: Upgrade rehearsal result
    detail: >-
      A dated rehearsal of the next minor version on a representative cluster,
      covering node operating system, container runtime, data-plane mode,
      add-ons and admission webhooks as well as API versions.
  - name: Add-on and component lifecycle inventory
    detail: >-
      Every ingress controller, autoscaler, mesh, log shipper and operator in
      the cluster, with its version and its maintained status checked against
      the upstream project on a schedule.
  - name: Disruption tolerance record
    detail: >-
      For each critical workload, the disruption budget, replica count,
      graceful shutdown behaviour and start-up time, with the result of the
      last node drain performed against it.
  - name: Zone spread and headroom measurement
    detail: >-
      Where replicas are running by zone, which workloads are pinned to one
      zone by storage or affinity, and whether the remaining zones can carry
      peak load with one zone removed.
  - name: Live allocation against declared requests
    detail: >-
      Resource requests and limits read from running pods and compared with
      the manifests, so that in-place resizes are recorded as intended or
      unintended divergence.
  - name: Post-upgrade telemetry check
    detail: >-
      Confirmation that the metrics, logs and traces behind each service level
      objective are still arriving after a cluster or node image change.
thresholds:
  - signal: Days remaining to the next support boundary, per cluster
    basis: The time the enterprise needs to rehearse and complete an upgrade through its own change process
    lostWhen: The remaining time falls below the agreed upgrade lead time, or any cluster holds a lower grade of support than the business accepted
  - signal: Version skew between control plane and node pools
    basis: The upstream policy that a kubelet may be up to three minor versions older than the API server
    lostWhen: Any node pool is at the policy limit, so the next control plane upgrade cannot proceed without a node upgrade first
  - signal: Age of the last passing upgrade rehearsal
    basis: The upstream release cadence and the changes made to the platform since the rehearsal ran
    lostWhen: A new minor version, node image or add-on version has shipped into the estate since the last passing rehearsal
  - signal: Components past upstream retirement
    basis: The exposure of the component, with anything in the request path treated as least tolerant
    lostWhen: Any retired component remains in production beyond the agreed replacement window
  - signal: Capacity with one zone removed
    basis: Peak load on the critical user journeys and the service level objectives attached to them
    lostWhen: Measured headroom in the remaining zones no longer covers peak load, or a critical workload is found running in a single zone
  - signal: Drains blocked by disruption budgets
    basis: The node replacement frequency that patching and the provider's node lifetime require
    lostWhen: A node drain cannot complete within the agreed window because a budget permits no disruption
faqs:
  - q: The cluster runs on a managed service. Is support position not the provider's responsibility?
    a: >-
      The provider publishes the calendar and enforces it. The enterprise
      decides when to upgrade and carries the consequence of not deciding.
      Managed services upgrade clusters that reach the end of their support
      period, and that upgrade arrives as an unscheduled production change.
      Assurance shows that no cluster can reach that date.
  - q: API deprecation scans come back clean. Is the next upgrade safe?
    a: >-
      A clean scan proves one thing: no manifest uses a removed API version.
      The breaking changes in recent releases were in the node operating
      system, the container runtime, the data-plane mode and retired add-ons,
      none of which an API scan reads. Readiness is proven by rehearsal on a
      cluster built like production.
  - q: How is this different from monitoring cluster health?
    a: >-
      Monitoring reports what the cluster is doing now. Assurance holds a
      position on conditions that produce no signal until they fail: a support
      date approaching, a retired component still in the traffic path, a
      disruption budget that will block the next drain, headroom that would
      not survive a zone loss.
sources:
  - title: 'Kubernetes releases and support periods'
    url: 'https://kubernetes.io/releases/'
  - title: 'Kubernetes v1.37 release announcement'
    url: 'https://kubernetes.io/blog/2026/08/26/kubernetes-v1-37-release/'
  - title: 'Kubernetes deprecated API migration guide'
    url: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/'
  - title: 'Kubernetes v1.35 sneak peek: containerd 1.x and kube-proxy ipvs mode'
    url: 'https://kubernetes.io/blog/2025/11/26/kubernetes-v1-35-sneak-peek/'
  - title: 'KEP-5573: remove cgroup v1 support'
    url: 'https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/5573-remove-cgroup-v1/README.md'
  - title: 'Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'Kubernetes v1.35: in-place Pod resize graduates to stable'
    url: 'https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/'
  - title: 'Kubernetes version skew policy'
    url: 'https://kubernetes.io/releases/version-skew-policy/'
  - title: 'Kubernetes virtual IPs and service proxies'
    url: 'https://kubernetes.io/docs/reference/networking/virtual-ips/'
  - title: 'Promtail end of life'
    url: 'https://grafana.com/docs/loki/latest/send-data/promtail/'
  - title: 'Karpenter releases'
    url: 'https://github.com/kubernetes-sigs/karpenter/releases'
  - title: 'Amazon EKS Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'AKS supported Kubernetes versions'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'GKE release channels'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels'
  - title: 'GKE Autopilot overview'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview'
  - title: 'Google Cloud incident report, us-central1-b, 1 September 2026'
    url: 'https://status.cloud.google.com/incidents/J5ia5t9p3g9Q5Wi7r8Ev'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why assurance is lost

A Kubernetes platform is proven at a point in time: this version, these node images, these add-ons, this capacity. The proof then ages on a calendar the enterprise does not control.

**Support expires without a change.** The Kubernetes project maintains release branches for the most recent three minor versions and gives each approximately one year of patch support. As of September 2026 the supported minors upstream are 1.37, 1.36 and 1.35. Version 1.34 and older are end of life upstream, and 1.35 reaches end of life on 28 February 2027. A cluster that was in support at its last review leaves support with nothing deployed to it.

**The release cadence sets the shelf life.** Minor releases land roughly every four months. Each one is an upgrade decision, so readiness evidence gathered for one release is ageing when the next ships. Version 1.37, released on 26 August 2026, carried 67 enhancements, 23 of them at beta. Behaviour proven on the previous minor has to be proven again on this one.

**Breakage has moved below the API.** The official migration guide lists the removal of `flowcontrol.apiserver.k8s.io/v1beta3` in v1.32 and no further API group removals for 1.33 to 1.37. The recent breaking changes sit elsewhere. Since v1.35 the kubelet does not start on a cgroup v1 node unless explicitly overridden. Support for containerd 1.x was dropped in v1.36. The `ipvs` mode of kube-proxy was deprecated in v1.35. None of these is a manifest property, so an API scan returns clean and the upgrade still fails.

**Components retire silently.** Ingress NGINX moved to best-effort maintenance until March 2026 and now receives no releases, bug fixes or security updates. Existing deployments keep working, so nothing alerts. The same is true of Promtail, which reached end of life on 2 March 2026.

**Running state diverges from declared state by design.** In-place Pod resize became stable in v1.35. A running pod's CPU and memory allocation can now differ from the manifest in Git through a supported feature, so evidence read from the manifest describes what was requested, not what is running.

**Headroom erodes.** Every scaling change, autoscaler setting and cost decision alters how much spare capacity survives the loss of a node or a zone.

## What is at stake

A cluster is shared infrastructure. When it fails, every service on it fails together. Four consequences follow for the business.

The first is exposure. A cluster outside support receives no security patches for the layer every workload runs on, and a retired ingress controller is an unpatched proxy facing the internet.

The second is loss of control over timing. Managed services upgrade clusters that reach the end of their support period. Google states that GKE upgrades such clusters regardless of blocking issues. The upgrade the team deferred still happens, on the provider's date, without the rehearsal.

The third is compounding change. A platform that falls several minors behind faces a sequence of upgrades, each a production change event with its own failure modes.

The fourth is resilience that exists on the diagram only. On 1 September 2026 a procedural error during a scheduled router upgrade isolated compute capacity in one Google Cloud zone, us-central1-b, for roughly four hours. A zonal failure is survived only by workloads that have replicas and capacity in other zones. Whether a service is one of them is a fact about the running cluster on that day, not about its architecture document.

## What Xyvionix assures

Xyvionix holds six statements about each cluster as current facts, tested against thresholds agreed with the business.

1. **The support position is known and has margin.** Each control plane and node pool has a recorded version, a named grade of support and a count of days to the next boundary. The margin is longer than the time an upgrade takes.
2. **The next upgrade has been rehearsed.** The rehearsal covers node operating system and kernel, container runtime, data-plane mode, add-ons and admission webhooks, on a cluster built like production.
3. **Every component is maintained.** Add-ons are checked against their upstream lifecycle on a schedule, because retirement produces no signal inside the cluster.
4. **Workloads tolerate disruption.** Disruption budgets permit a drain and still protect the service. Shutdown is graceful and start-up time is known.
5. **Capacity survives the loss of a zone.** Replicas are spread across zones in fact, and the remaining zones can carry peak load.
6. **Measurement survives the upgrade.** The telemetry behind each objective is confirmed after every cluster and node image change.

The objectives themselves are held under [SLO Assurance](/slo-assurance). The match between the cluster's declared and running configuration is held under [Cloud Drift Assurance](/cloud-drift-assurance).

## Common failure modes

- **One version number for the whole cluster.** The kubelet may be up to three minor versions older than the API server, so control plane and node pools legitimately differ. A report that gives a single version hides the node pool that will block the next upgrade.
- **Clean scan, failed upgrade.** The API scanner passes. Nodes on an older operating system image then fail at kubelet start because the image uses cgroup v1.
- **A disruption budget that blocks or protects nothing.** A budget that permits no unavailable replicas stalls node replacement, and patching stops at that node. A budget on a service with one replica is present and the drain still takes the service down.
- **A retired controller in the request path.** Ingress NGINX continues to route traffic and appears healthy. It has received no security fixes since March 2026.
- **A default that changes underneath.** In v1.37 the kube-proxy default mode on Linux is still `iptables`, and the documentation states that a future version will change the default to `nftables`. Clusters that never set the mode explicitly will change data plane on an upgrade.
- **Consolidation that removed the headroom.** An autoscaler policy tuned for cost packs workloads onto fewer nodes. Consolidation is a setting, and Karpenter v1.14.0 added a further policy for it. Changing it alters failure behaviour with no workload change.
- **Zone spread declared, not real.** Topology rules exist, but a volume or an affinity rule pins the replicas that matter to one zone.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a change to production is required.

The corrections are specific to the finding. A node pool on an operating system image that cannot start the next kubelet is moved to a current image before the control plane upgrade is scheduled. A retired ingress controller is replaced by Gateway API or a maintained controller, with routing, TLS and timeouts compared before and after. A disruption budget that blocks drains is reset to a value the replica count can support. Headroom lost to consolidation is restored, and the zone-loss test is repeated.

A cluster with no current evidence is recorded as Unassured, not as healthy, however stable it looks.

Some corrections need a decision that belongs to the business, such as paying for a longer support period instead of upgrading this quarter. The decision is recorded with its owner and an expiry date, and the boundary it defers is still tracked.

## Verified closure

A correction is closed when re-testing shows the condition is gone, not when the change was merged.

For an upgrade, closure means the control plane and every node pool report the target version, the add-ons report versions compatible with it, a node drain completes, and the service level indicators for the critical journeys are inside their objectives after the change. For a retired component, closure means it is absent from the running cluster, not only from the manifests, and traffic is shown flowing through its replacement. For zone headroom, closure means a test with one zone removed from service shows the remaining zones carrying the load.

Each closure is recorded with its evidence and the date it was gathered. The next minor release starts the clock again.

## Technology and industry context

Managed Kubernetes changes who holds the calendar. It does not change who holds the evidence. Each provider publishes its own support periods, and the word "supported" is graded: standard and extended support on Amazon EKS, community support, platform support and Long-Term Support on AKS, and release channels including an Extended channel on GKE. These read alike on a dashboard and mean different things for patching, so evidence names the grade. Provider dates, prices and rollback rules are covered in [Amazon EKS Reliability Assurance](/eks-reliability-assurance) and [AKS Reliability Assurance](/aks-reliability-assurance).

EKS Auto Mode, AKS Automatic and GKE Autopilot move node management to the provider. They are different products with different boundaries. Provider-managed nodes still restart the enterprise's pods, so disruption tolerance remains evidence the enterprise has to hold.

For software businesses the concerns are covered in [SaaS Production Reliability](/saas-production-reliability). The scenario most platform teams meet first, a cluster approaching a support boundary with an upgrade overdue, is covered in [Kubernetes Upgrade Risk](/kubernetes-upgrade-risk).
