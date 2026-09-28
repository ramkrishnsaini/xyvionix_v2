---
title: Google Cloud Production Reliability
h1: Prove that workloads on Google Cloud survive global, regional and zonal failure
seoTitle: 'Google Cloud Reliability: Global, Regional, Zonal | Xyvionix'
description: >-
  What has to be re-proven on Google Cloud: behaviour when a global control
  plane fails, regional failover, zonal placement, GKE support dates and slow
  degradation.
summary: >-
  Google's own incident reports describe failure at global, regional and zonal
  scope. Proof gathered at one scope does not cover the others. Each is held
  against a threshold, with GKE support dates and slow degradation alongside.
lede: >-
  Google Cloud production reliability assurance is the continuing proof that a
  workload on Google Cloud still meets its service levels when a failure
  arrives at global, regional or zonal scope. Google's published incident
  reports since June 2025 include all three. A design tested against the loss
  of one zone holds evidence for one of them, and that evidence ages as
  workloads move, clusters approach their support dates and maintenance
  exclusions run out.
ogQuestion: Which failure scope has the workload been tested against?
platform: Google Cloud
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
intent: 'Technology + problem: proving reliability of workloads running on Google Cloud'
related:
  assurance:
    - production-reliability-assurance
    - disaster-recovery-assurance
    - cloud-drift-assurance
    - slo-assurance
  useCases:
    - untested-disaster-recovery
    - cloud-incident-recurrence
  technologies:
    - vertex-ai-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
  insights:
    - why-production-incidents-recur
    - error-budgets-without-consequence
evidence:
  - name: Failure scope map
    detail: >-
      For each critical journey, the Google Cloud services it depends on,
      each marked as global, regional or zonal in scope, with the behaviour
      expected of the journey when that dependency is unavailable.
  - name: Client failure behaviour results
    detail: >-
      Tests showing what the application does when a platform API returns
      errors: whether it fails open or closed, and whether its retries back
      off under load.
  - name: Regional failover exercise record
    detail: >-
      The date, scope and measured recovery time of each exercise that moved
      a critical journey out of its home region, with the production
      footprint at the time.
  - name: Zonal placement measurement
    detail: >-
      Where the replicas of each critical workload are running by zone, read
      from the running estate, with any workload confined to one zone
      listed.
  - name: GKE lifecycle position
    detail: >-
      For each cluster, the version, the release channel, the days remaining
      to the end of standard support on Google's current schedule, and every
      maintenance exclusion with its end date.
  - name: Slow-burn record
    detail: >-
      Error budget consumption measured over long windows, with each ticket
      raised by a slow burn, its owner and its resolution.
  - name: Restore test results
    detail: >-
      Timed restores from backup vaults, with the restored data verified by
      the application that uses it.
thresholds:
  - signal: Critical journeys with an untested global dependency
    basis: The revenue or obligation carried by the journey while a global service is unavailable
    lostWhen: A journey depends on a global service and its behaviour without that service has not been tested
  - signal: Age of the last regional failover exercise
    basis: The rate of change in production and the testing interval the business or its regulator expects
    lostWhen: The exercise is older than the agreed interval, or production has changed materially since it ran
  - signal: Critical workloads confined to one zone
    basis: The zone-loss scenario the business has named for the journey
    lostWhen: Any critical workload is found with all serving replicas in a single zone
  - signal: Time remaining to the end of standard support, per GKE cluster
    basis: Google's published schedule, which is best-effort, and the lead time the enterprise needs to upgrade with rehearsal
    lostWhen: The remaining time falls below the rehearsed lead time, or a known blocker is unresolved inside it
  - signal: Maintenance exclusion end dates
    basis: The enterprise's own change calendar, including freeze periods
    lostWhen: An exclusion is due to end inside a freeze period with the upgrade it deferred still outstanding
  - signal: Error budget consumed by slow degradation
    basis: The service level objective of the affected journey
    lostWhen: A slow-burn ticket stays open beyond the agreed age while the budget continues to be consumed
faqs:
  - q: The workload runs across three zones in one region. What is left to prove?
    a: >-
      Recovery from a failure at regional scope. Google reported that on 20
      August 2026 scheduled fibre optic maintenance compromised network
      capacity between data centres in us-west1 and automated rerouting did
      not redistribute traffic properly. Spreading across zones inside that
      region did not avoid it. The evidence that covers a regional event is
      a timed failover to another region.
  - q: GKE Autopilot manages the nodes. What remains for the enterprise to hold?
    a: >-
      The workload's tolerance of disruption. With Autopilot, Google manages
      nodes, scaling, security patching and bin-packing. Managed nodes still
      restart the pods that run on them, so disruption budgets, graceful
      shutdown and start-up time remain the enterprise's evidence.
  - q: Can a GKE upgrade be deferred with a maintenance exclusion?
    a: >-
      For a time. An exclusion of the "no upgrades" scope cannot exceed 90
      days, and Google recommends keeping it under 30. Exclusions that block
      minor upgrades can run to the end of support of the minor version. At
      the end of support GKE upgrades the cluster regardless of blocking
      issues, so an exclusion moves the date and leaves the work.
sources:
  - title: 'Google Cloud Well-Architected Framework: reliability pillar'
    url: 'https://docs.cloud.google.com/architecture/framework/reliability'
  - title: 'Google Cloud incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
  - title: 'Google Cloud incident report, us-west1, 20 August 2026'
    url: 'https://status.cloud.google.com/incidents/utF3FMFdQfwBzJcGG6vf'
  - title: 'Google Cloud incident report, us-central1-b, 1 September 2026'
    url: 'https://status.cloud.google.com/incidents/J5ia5t9p3g9Q5Wi7r8Ev'
  - title: 'Google Cloud service health: incident summary'
    url: 'https://status.cloud.google.com/summary'
  - title: 'GKE release channels'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels'
  - title: 'GKE release schedule'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/release-schedule'
  - title: 'GKE maintenance windows and exclusions'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/maintenance-windows-and-exclusions'
  - title: 'GKE Autopilot overview'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview'
  - title: 'Google Cloud Backup and DR Service'
    url: 'https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr'
  - title: 'Google SRE Workbook: alerting on SLOs'
    url: 'https://sre.google/workbook/alerting-on-slos/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Google Cloud

Google's incident reports from June 2025 to September 2026 describe failure at three scopes. Most designs have been tested at one.

**Global.** On 12 June 2025 Google Cloud and Google Workspace products were affected for about three hours, from 10:49 to 13:49 PDT. Google's report traces the cause to Service Control. A change shipped on 29 May 2025 had added quota policy checks without appropriate error handling and without feature-flag protection. On 12 June a policy change with unintended blank fields replicated globally and caused a null pointer crash. Nothing was deployed that day. The trigger was data, and because it replicated globally no region was a refuge. Google wrote that the incident should not have happened.

**Regional.** On 20 August 2026 the us-west1 region was degraded for 2 hours 22 minutes. Scheduled fibre optic maintenance compromised network capacity between data centres and automated rerouting did not redistribute traffic properly. GKE, Compute Engine, Cloud Run and Pub/Sub were among the products affected.

**Zonal.** On 1 September 2026 compute capacity in us-central1-b was isolated from 07:41 to 11:52 US/Pacific. During a scheduled router upgrade, a procedural error in a manually orchestrated process led to every fibre path on the affected devices being unplugged within 13 minutes.

A multi-zone design answers the third case only. The vendor-neutral method is set out in [Production Reliability Assurance](/production-reliability-assurance). This page covers what the three scopes, and the GKE calendar, require on Google Cloud.

## What expires, and on whose calendar

Google Kubernetes Engine sets most of the dates. Standard support lasts 14 months per minor version, and the Extended channel gives up to about 24 months in total, with pay-per-use cost during the extended period.

| GKE milestone | Date on Google's schedule, checked 27 September 2026 |
|---|---|
| 1.33 end of standard support | 12 August 2026, already passed |
| 1.37 available in the Regular channel | Planned for 30 September 2026 |
| 1.36 available in the Stable channel | Planned for 6 October 2026 |
| 1.34 end of standard support | 25 January 2027 |
| 1.35 end of standard support | 11 April 2027 |
| 1.36 end of standard support | 9 August 2027 |

Google describes these dates as best-effort. A plan built on last quarter's schedule can be wrong today, so the schedule itself is re-read on a cadence.

Two further limits run on Google's terms. At the end of support, GKE upgrades clusters regardless of blocking issues. A maintenance exclusion of the "no upgrades" scope cannot exceed 90 days, and a cluster can hold up to 20 exclusions. Each exclusion has an end date, and nothing aligns that date with the enterprise's change freeze.

Guidance ages too. The reliability pillar of the Google Cloud Well-Architected Framework (formerly the Architecture Framework) shows a last review date of 30 December 2024.

## What must be continuously re-proven

**Behaviour when a global service fails.** After June 2025 Google committed to fail-open design, feature flags for critical binaries and incremental validation of replicated data. The enterprise has the matching question about its own software: when a platform API returns errors, does each critical journey fail open or closed, and was that a decision. Google also committed to auditing exponential backoff, because retry load slowed recovery once the fault was fixed. Client retry settings are tested under load for the same reason.

**Recovery at regional scope.** The August 2026 event degraded a whole region through planned provider maintenance. The proof is a timed move of the critical journey to another region, held under [Disaster Recovery Assurance](/disaster-recovery-assurance).

**Zonal placement, per workload.** Placement is read from the running estate. A workload whose definition says three zones and whose replicas sit in one is a difference between declared and running state, held under [Cloud Drift Assurance](/cloud-drift-assurance).

**Detection of slow degradation.** Google's status summary records network latency and packet loss for traffic from Delhi, Chennai and Mumbai that began on 5 June 2026 and lasted more than 21 days. A degradation of that shape consumes error budget slowly. In the starting parameters recommended by the Google SRE Workbook, a burn rate of 1 over a three-day window raises a ticket, not a page. Whether anyone acts on that ticket is held under [SLO Assurance](/slo-assurance).

**Support position of every GKE cluster.** Version, channel, days to the end of standard support and the end date of each exclusion are recorded per cluster. The readiness evidence behind an upgrade is described in [Kubernetes Reliability Assurance](/kubernetes-reliability-assurance).

**Restores from the vault.** Backup and DR Service stores backups in backup vaults, which Google describes as isolated storage for immutable and indelible backups, with enforced retention of up to 99 years. Immutability protects the copy. Restore time and application consistency are proven by a timed restore.

## Common failure modes

- **Three zones read as three regions.** The architecture document says highly available. Every replica is in one region.
- **Replicas pinned to one zone.** Spread is declared, and a storage or placement constraint keeps the serving replicas together. A zonal event such as us-central1-b leaves them with no recourse.
- **Policy changed everywhere at once.** A policy or configuration value is treated as data and applied to every project in one step, with none of the staging a code release would receive. It is the pattern in Google's June 2025 report.
- **A code path nothing exercised.** The release passed every check because no check created the condition that activates the new path.
- **The forced upgrade with known blockers.** A cluster reaches the end of support with an unresolved blocker. The upgrade happens anyway.
- **An exclusion that ends in the freeze.** The upgrade was deferred to protect a busy period and the exclusion runs out inside it.
- **Production on the Rapid channel.** Google states that the Rapid channel is not covered by the GKE service level agreement.
- **Specialised services in a single zone.** A cooling failure in europe-west4-a on 15 July 2026 affected VMware Engine, NetApp Volumes and Bare Metal Solution. The zonal question applies to specialised services as much as to compute.
- **A ticket nobody owns.** The slow burn raised a ticket three weeks ago. The budget is gone and no page was ever sent.

## Corrective ownership and verified closure

When a threshold is breached, or when Google's schedule moves and the evidence no longer fits it, the state changes and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Changes to production go through the enterprise's own change process.

Corrections on Google Cloud follow the scope of the finding. A journey with an undecided failure behaviour is given one, and its retries are given backoff. A workload confined to one zone is re-placed and the constraint that pinned it is removed. A cluster inside its upgrade lead time is rehearsed and upgraded on a date the enterprise chooses. An exclusion due to end inside a freeze is replaced by an upgrade before the freeze. A policy rollout is given stages.

Where the business decides to stay in a single region, the decision is recorded with its owner and an expiry date, and the regional scenario is reported as accepted risk, not as assured.

Closure is recorded by re-test. For failure behaviour, the platform dependency is made to return errors in a test and the journey behaves as decided. For regional recovery, a timed exercise meets the objective against the current footprint. For zonal placement, a test with one zone removed shows the journey within its objective. For a GKE upgrade, the control plane and every node pool report the target version and the service level indicators hold afterwards. For slow degradation, a synthetic burn at the ticket threshold reaches a named owner who acts on it.

Each closure is dated against the footprint and the schedule it was tested on.
