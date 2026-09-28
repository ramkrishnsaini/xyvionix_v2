---
title: Azure Production Reliability
h1: Prove that workloads on Azure hold when zones, identity or the global edge fail
seoTitle: 'Azure Production Reliability: Zones, Identity, Edge | Xyvionix'
description: >-
  What has to be re-proven on Azure: zone configuration per resource, regional
  failover and failback, a second ingress path and scale-out that does not
  wait on identity.
summary: >-
  On Azure, zone resilience is set resource by resource, and shared services
  such as the global edge and managed identity sit outside the zone model.
  Both are held against thresholds and re-proven as the estate changes.
lede: >-
  Azure production reliability assurance is the continuing proof that a
  workload on Azure still meets its service levels when a zone, a region or a
  shared platform service fails. Zone resilience on Azure is a property of
  each resource, so it is proven per resource and not per architecture. The
  services that failed most widely in Microsoft's recent post-incident reviews
  were shared ones, which zones and regions do not contain.
ogQuestion: Is every resource on the critical path still zone-redundant?
platform: Microsoft Azure
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
intent: 'Technology + problem: proving reliability of workloads running on Azure'
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
    - aks-reliability-assurance
    - entra-id-exposure-assurance
    - azure-ai-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - disaster-recovery-plan-never-tested
    - why-production-incidents-recur
evidence:
  - name: Zone configuration register
    detail: >-
      Every resource on a critical user flow recorded as zone-redundant or
      zonal, read from the live configuration, with the zone each zonal
      resource is pinned to.
  - name: Shared service dependency map
    detail: >-
      For each critical flow, the platform services it depends on that are
      not contained by a zone or region, including the ingress service,
      managed identity, the management portal and the delivery pipeline.
  - name: Regional failover and failback record
    detail: >-
      The date, scope and measured recovery time of each exercise, with
      failover and failback recorded separately and the production footprint
      at the time.
  - name: Alternate ingress test result
    detail: >-
      A dated test showing that customer traffic reaches the workload by a
      second path when the primary edge service is removed from the route.
  - name: Scale-out and headroom measurement
    detail: >-
      Capacity running before any scaling operation starts, compared with
      peak load, and the result of scaling out while a dependency such as
      identity or extension retrieval is degraded.
  - name: Retry and backoff test results
    detail: >-
      Client retry settings on calls to platform services, with a test under
      load showing that retries back off instead of amplifying.
  - name: Provider review tracking
    detail: >-
      Each Microsoft post-incident review that touches a service in use,
      with its published repair items and target dates and the enterprise's
      own mitigation in the meantime.
thresholds:
  - signal: Zonal resources on a zone-redundant path
    basis: The zone-loss scenario the business has named for the critical flow
    lostWhen: Any resource on the flow is found pinned to one zone without a recorded and accepted reason
  - signal: Age of the last regional failover and failback exercise
    basis: The rate of change in production and the testing interval the business or its regulator expects
    lostWhen: The exercise is older than the agreed interval, or failback has never been run
  - signal: Critical flows with a single ingress path
    basis: The revenue or obligation carried by the flow while the edge service is unavailable
    lostWhen: A critical flow has no alternate path, or the alternate has not been tested since it last changed
  - signal: Recovery steps that depend on a shared platform service
    basis: The recovery time objective, which has to be achievable given dependencies outside the team's control
    lostWhen: A recovery step relies on the portal, the pipeline or an identity service and has no tested alternative
  - signal: Headroom before scale-out
    basis: Peak load and the time a scaling operation takes to add usable capacity
    lostWhen: Running capacity cannot absorb the loss of a redundant instance before scaling completes
faqs:
  - q: The architecture uses availability zones throughout. Why is regional failover still required?
    a: >-
      Because one event can affect more than one zone. Microsoft's review of
      the West US 2 incident of 29 to 30 May 2026 describes infrastructure
      shutdowns in two physical availability zones after power disturbances
      during a severe thunderstorm. A design proven against the loss of one
      zone was not proven against that. Regional failover, exercised and
      timed, is the evidence that covers it.
  - q: Microsoft publishes repair items after each incident. Does that close the risk?
    a: >-
      It closes Microsoft's part on Microsoft's dates. The published reviews
      list repair items with target dates months after the event. Until they
      are complete the exposure stands, and the enterprise's own dependency
      on the affected service is a separate question that only its own
      testing answers.
  - q: Can Azure Chaos Studio supply the evidence?
    a: >-
      Partly. Chaos Studio is a managed chaos engineering service, and a
      dated experiment result is evidence for the architecture as it stood
      that day. Chaos Studio Workspaces and Scenarios, such as Compute Zone
      Down and DNS Outage, are in public preview and Microsoft states they
      are not meant for production use, so results from them are labelled
      accordingly.
sources:
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'Azure availability zones overview'
    url: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview'
  - title: 'Azure Site Recovery overview'
    url: 'https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview'
  - title: 'Microsoft Learn: Resiliency in Azure (formerly Azure Business Continuity Center)'
    url: 'https://learn.microsoft.com/en-us/azure/backup/backup-center-overview'
  - title: 'Azure Chaos Studio: scenarios'
    url: 'https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-scenarios'
  - title: 'Azure status history: post-incident review YKYN-BWZ, Azure Front Door'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ'
  - title: 'Azure status history: post-incident review FNJ8-VQZ'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Azure status history: post-incident review GHRP-84G, West US 2'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G'
  - title: 'Azure status history: post-incident review ZJV6-SGG, West US'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG'
  - title: 'AKS supported Kubernetes versions'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Azure

On Azure, zone resilience is decided one resource at a time. Microsoft distinguishes zone-redundant resources, which the service spreads or replicates across zones with Microsoft-managed failover, from zonal resources, which the customer pins to a single zone and which are not resilient to a zone outage on their own. Some services are zone-redundant automatically. Others have to be configured.

"The workload is zone-redundant" is therefore a statement about every resource on the path. One zonal dependency voids it, and any deployment can introduce one.

The second part of the problem sits outside the zone model altogether. Microsoft published four post-incident reviews between October 2025 and July 2026 that matter here. One concerned a global edge service. One began in an automated remediation workflow and went on to overload the managed identity backend. One took out two zones of a region together. One began in network maintenance. None of them was the single-zone failure that most designs are tested against.

Microsoft's own reliability guidance asks teams to make sure recovery and service level targets are achievable given dependencies outside the team's control. The method for holding those targets is set out in [Production Reliability Assurance](/production-reliability-assurance). This page covers the dependencies that are particular to Azure.

## What expires, and on whose calendar

The calendar below is Microsoft's. Every entry is taken from a Microsoft post-incident review or from Microsoft's published support dates.

| Date | What Microsoft reported | What it invalidated |
|---|---|---|
| 29 to 30 October 2025 | Azure Front Door, 15:41 UTC to 00:05 UTC. Incompatible configuration metadata triggered a latent data-plane bug and propagated globally. Azure portal, Microsoft 365 and Entra ID were among the services affected | Proof of resilience that assumed the edge and the portal would be reachable |
| 2 to 3 February 2026 | 18:03 UTC to 06:05 UTC, multiple regions. Virtual Machines, scale sets, AKS, Azure DevOps, GitHub Actions and Managed Identities impacted | Proof that scale-out and deployment remain available during an incident |
| 29 to 30 May 2026 | West US 2. Shutdowns in two physical availability zones. Compute recovery took about 8 hours and storage validation about 14 hours | Proof gathered against the loss of one zone |
| 23 July 2026 | West US, 14:44 to 19:41 UTC. More than 20 services affected, including AKS, App Service and Cosmos DB | Proof that assumed maintenance is contained to one device |
| 31 October 2026 | Azure Linux 2.0 node images are removed from AKS. Affected node pools cannot scale | Capacity evidence for any node pool still on that image |
| November 2026 | AKS version 1.34 reaches end of life | Support position for clusters on 1.34 |

Provider repairs have their own dates. The Front Door review listed repair items due in February and March 2026, and the West US review lists items due from August to October 2026. Between the incident and the repair, the exposure is unchanged.

Names move as well. Azure Business Continuity Center has been renamed Resiliency in Azure, and Backup center has been removed from the portal's global search. A runbook that tells an operator where to click describes a console as it was on the day it was written.

## What must be continuously re-proven

**Zone configuration, per resource.** The register is read from live configuration, not from the design. A resource recreated as zonal outside the definition is a drift finding with a reliability consequence, held under [Cloud Drift Assurance](/cloud-drift-assurance).

**Recovery from the loss of more than one zone.** The West US 2 event makes regional failover part of the proof even for a fully zone-redundant design. Azure Site Recovery provides continuous replication, failover and recovery for virtual machines. The evidence is the date of the last test failover and the recovery time measured in it, with failback exercised as Microsoft's guidance asks. Both are held under [Disaster Recovery Assurance](/disaster-recovery-assurance).

**A second way in.** In the Front Door incident the fault was in a global service, so no choice of zone or region avoided it. A critical flow that enters through one edge service needs an alternate path that has carried traffic in a test.

**Operation without the portal.** The same incident affected the Azure portal. Recovery steps that are performed in the portal are re-proven by another route.

**Scale-out that does not wait on identity.** In the February 2026 incident, virtual machine extension retrieval was blocked, and when access was restored, retry amplification overwhelmed the managed identity backend. New instances could not be relied on to arrive. Microsoft advises overprovisioning to cover the failure of redundant instances before scaling operations start, and designing scale-out with regional capacity constraints in mind. The proof is running headroom, measured against peak load.

**Retry behaviour under load.** Retry settings on calls to platform services are reliability controls. They are tested to show that they back off.

## Common failure modes

- **One zonal resource in a zone-redundant design.** Compute and data are spread across zones. One supporting resource was created zonal and sits on the path of every request.
- **Tested for one zone, hit by two.** The exercise removed a single zone and passed. No evidence exists for the scenario Microsoft reported in May 2026.
- **One front door.** All customer traffic enters through the same global edge service.
- **The pipeline lost with production.** Azure DevOps and GitHub Actions were impacted in February 2026. A fix that can only be shipped through the pipeline cannot be shipped while the pipeline shares the fault.
- **Autoscaling treated as the failure response.** Capacity runs at the minimum and the plan relies on adding instances, which depends on extension retrieval, identity and regional capacity all being available.
- **Each change valid, the set of changes not.** Microsoft's review of the July 2026 incident found that a defect expanded a repair to every optical device leaving a datacentre, while safety checks validated each device individually and not the aggregate effect. Enterprise change pipelines that approve items one at a time have the same gap.
- **A node pool that cannot grow.** After 31 October 2026 an AKS node pool on Azure Linux 2.0 cannot scale. The failure will first appear during a load spike. Cluster lifecycle is covered in [AKS Reliability Assurance](/aks-reliability-assurance).

## Corrective ownership and verified closure

When a threshold is breached, or when an event has shown that the existing evidence covered the wrong scenario, the state moves and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Changes to production go through the enterprise's own change process.

Corrections on Azure are specific. A zonal resource on a critical path is replaced by a zone-redundant one, or the decision to keep it is recorded with an owner and an expiry date. An alternate ingress path is built and given real traffic on a schedule. Recovery steps are rewritten so that none depends on the portal alone. Headroom is raised to the level that survives the loss of an instance without a scaling operation.

Automated correction is bounded. The February 2026 incident began when a remediation workflow disabled anonymous access on storage accounts that allowed it intentionally. A correction that is right for most resources and wrong for a few is staged, limited to agreed resource classes and checked after it runs.

Closure is recorded by re-test. For zone configuration, the live resource reports the intended setting and a zone-removal test passes. For regional recovery, a timed failover and failback meet the objective against the current footprint. For ingress, traffic is served with the primary edge taken out of the route. For scale-out, the workload holds peak load with scaling disabled for the length of the test.

Each closure is dated. A new Microsoft post-incident review that touches a service in use is treated as a reason to ask whether the evidence still covers the scenario it describes.
