---
title: Cloud Configuration Drift
h1: Production has moved away from the code, the approvals and the recovery copy
seoTitle: 'Cloud Configuration Drift: Which Differences Matter | Xyvionix'
description: >-
  What to establish when running infrastructure no longer matches its code:
  what the comparison sees, how old each difference is and who reconciles it.
summary: >-
  Console fixes, partial applies and changes outside the pipeline separate
  running state from declared state. The position is set by dating each
  difference, classing it by what it controls and naming who reconciles it.
lede: >-
  Cloud configuration drift is the situation in which running infrastructure no
  longer matches the code that defines it, the approvals given on that code, or
  the recovery environment built from it. The state is Degrading: nothing has
  failed, while differences accumulate and the oldest grows older. Not all
  drift matters equally. The position is established by dating every
  difference, classing it by what the drifted setting controls, and naming the
  person who decides whether it is adopted or reverted.
ogQuestion: Which differences between code and production matter?
cluster: reliability
secondary:
  - cyber
  - change
parent: use-cases
state: degrading
audience:
  - VP Platform
  - Technology Risk
  - Cloud Security
intent: >-
  Problem: running infrastructure no longer matches code, approvals or the
  recovery environment
related:
  assurance:
    - cloud-drift-assurance
    - cloud-security-exposure-assurance
    - disaster-recovery-assurance
  useCases:
    - untested-disaster-recovery
    - identity-access-drift
  technologies:
    - terraform-drift-assurance
    - aws-production-reliability
    - azure-production-reliability
  industries:
    - financial-services
  insights:
    - cloud-drift-production-risk
evidence:
  - name: Drift baseline
    detail: >-
      A dated comparison of each critical environment with its definition,
      produced with no code change pending, so that every proposed change in
      the result is a difference that arose outside the pipeline.
  - name: First-seen date per difference
    detail: >-
      The date each difference arose, taken from provider audit logs where
      they reach back far enough, and otherwise the date it was first
      detected, marked as such.
  - name: Classification by what the setting controls
    detail: >-
      Each difference classed as affecting reachability, resilience, capacity,
      behaviour or description, and as intended or unintended, with the
      reason for the classification.
  - name: Writes made outside the pipeline
    detail: >-
      Write events in production made by identities other than the delivery
      pipeline, each tied to a person or automation and to the incident or
      request that prompted it.
  - name: Unmanaged resource list
    detail: >-
      Running resources that no definition describes, which no comparison
      can report on, with an owner and a decision to adopt or remove each.
  - name: Reconciliation decision record
    detail: >-
      For each difference, the decision to adopt it into the definition or
      revert it in production, the person who made it and the date by which
      it will be done.
  - name: Recovery environment comparison
    detail: >-
      The differences between production as it runs and the recovery
      environment as it would be built, covering configuration, capacity
      and quotas.
thresholds:
  - signal: Age of the oldest unintended difference, by class
    basis: How long the business accepts production differing from what was approved, shortest for settings that control reachability
    lostWhen: An unintended difference on a critical resource is older than the age agreed for its class
  - signal: Open differences over consecutive periods
    basis: Reconciliation has to keep pace with the rate at which new differences arise
    lostWhen: The number of open differences on critical resources rises across consecutive periods
  - signal: Differences with no decision
    basis: Every difference is either adopted or reverted, and that choice belongs to a named person
    lostWhen: A difference on a critical resource has no recorded decision and owner within the agreed period after detection
  - signal: Emergency changes absent from the definition
    basis: The time until the next routine deployment to the same resource, which would overwrite the change
    lostWhen: A deployment to the resource is scheduled while the emergency change is still missing from the definition
  - signal: Completed detection runs
    basis: The detection cadence the tooling is configured for and the rate of change in the environment
    lostWhen: Detection has not completed for a critical workspace within the agreed cadence
  - signal: Parity with the recovery environment
    basis: The recovery time objective, which assumes the recovery environment can carry production
    lostWhen: A difference in configuration, capacity or quota would prevent the recovery environment running production load
faqs:
  - q: Can drift be cleared by applying the code again?
    a: >-
      Not before each difference is classified. Applying the code returns
      every drifted setting to its declared value. That is correct for an
      unintended change and harmful for an emergency fix that is keeping
      production working. The direction of correction is decided per
      difference, then applied.
  - q: Is zero drift the target?
    a: >-
      No. Some divergence is approved. Autoscaling changes instance counts,
      Kubernetes can resize a running pod in place, and managed node services
      replace nodes on a schedule. The target is that no difference on a
      critical resource is unknown, undated or without an owner.
  - q: A GitOps controller already reverts changes automatically. Is that enough?
    a: >-
      It covers the objects the controller manages inside the cluster.
      Network rules, storage settings, quotas and identity configuration in
      the cloud account sit outside it. Automatic reversion also makes no
      distinction between a mistake and an emergency fix.
sources:
  - title: 'HCP Terraform health assessments'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health'
  - title: 'HCP Terraform policy enforcement'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/policy-enforcement'
  - title: 'Terraform Stacks'
    url: 'https://developer.hashicorp.com/terraform/language/stacks'
  - title: 'Azure availability zones overview'
    url: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview'
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'Amazon EKS Auto Mode'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/automode.html'
  - title: 'Kubernetes v1.35: in-place Pod resize graduates to stable'
    url: 'https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## What changed

Production was changed by a route other than the code. The team usually learns of it in one of three ways. A plan proposes changes that nobody wrote. A routine deployment undoes a fix and an old fault returns. A reviewer asks for evidence that production is what was approved, and the only evidence on offer is the repository.

Drift is measured against three reference points, and they fail separately.

- **The code.** The definition holds one value and the provider holds another.
- **The approvals.** Architecture, security and change reviews were performed on the definition. They describe a system that is no longer the one running.
- **The recovery environment.** It is built from the definition, so it reproduces what was declared and omits whatever was changed by hand.

The state is Degrading. No outage or exposure has been traced to drift. The number of differences is rising, the oldest is getting older and nobody has been asked to decide what to do with any of them.

## The business outcome at risk

The first outcome is predictable change. When a plan contains changes the team did not write, the plan stops being trusted. Applies are postponed, changes are batched and each release becomes larger than the one before.

The second is controlled exposure. A network rule or storage setting opened by hand is reachable from the day it was opened. No review examined it, because reviews read the definition. Exposure of this kind is assessed under [Cloud Security Exposure Assurance](/cloud-security-exposure-assurance).

The third is recovery. AWS states that without infrastructure as code, restoring workloads in the recovery Region is complex and may exceed the recovery time objective. Code that no longer describes production has the same effect, and it is found during the recovery. A plan in that position is described in [Untested Disaster Recovery](/untested-disaster-recovery).

## What must be proven

**What the comparison can see.** A drift report covers the resources a definition manages. Resources created by hand or by another tool are absent from it, and their absence reads as a clean result. The unmanaged list is established first.

**How old each difference is.** A count of differences says little. A difference that arose yesterday during an incident and one that has stood for a year are different findings.

**Which differences matter.** Differences are classed by what the drifted setting controls.

| The setting controls | Typical difference | Consequence if left |
|---|---|---|
| Reachability | A network rule or storage setting opened by hand | Exposure that no review examined |
| Resilience | A zone-redundant resource recreated as zonal | Zone resilience lost for everything that depends on it |
| Capacity | An instance size or quota raised in production only | Pre-production and recovery environments stop representing production |
| Behaviour | A timeout or retry setting changed during an incident | The next deployment restores the old value and the fault returns |
| Description | Tags, labels and names | Cost and ownership reporting degrade |

The resilience row rests on how providers define it. In Azure, a zonal resource is pinned to one zone chosen by the customer and is not resilient to a zone outage on its own.

**Who decides.** Each difference has a person who chooses between adopting it and reverting it.

**Whether the recovery environment still stands in for production.** The comparison covers capacity and quotas as well as configuration.

How these are held as continuing evidence is described in [Cloud Drift Assurance](/cloud-drift-assurance).

## What causes assurance to be lost

Drift begins with a single change. It becomes a Degrading state because differences are not reconciled as fast as they arise.

**The report has no owner.** Detection posts differences to a channel. Nobody is assigned to decide on them, so the list grows.

**Approved divergence hides the rest.** In-place Pod resize has been stable since Kubernetes v1.35, and EKS Auto Mode gives nodes a maximum lifetime of 21 days. Both produce differences that are intended. A team that receives them as noise mutes the detector, and the unintended differences go quiet with them.

**An apply stops part-way.** Some resources hold the new configuration and others the old. HCP Terraform health assessments pause if the latest run ended in an error, so detection stops for that workspace at the same moment.

**One change fans out.** Terraform Stacks has a documented limit of 20 deployments per Stack. A change that succeeds in some deployments and fails in others leaves environments that were meant to be identical in different states.

**Policy no longer reads what is deployed.** In HCP Terraform, Sentinel and OPA policy sets support workspaces only. An estate that moved to Stacks and kept those policies has approvals that do not evaluate the new deployments.

**Reconciliation is feared.** Reverting may remove a fix that production depends on. Adopting may legitimise a mistake. Without classification both look dangerous, so neither is done.

## Corrective action

Work is ordered by class and age. Unintended differences that control reachability come first, oldest first. Emergency fixes are written into the definition before the next deployment to the same resource. Unmanaged resources on critical services are brought under a definition or removed.

The direction of each correction is decided by the owner of the resource. Under assurance, Xyvionix owns the correction through to completion within the access it has been granted, and uses the enterprise's own change process for changes to production.

Approved divergence is declared, so that detection reports on properties that should be stable and leaves out those the platform is expected to change. Where the business keeps a difference, the decision is recorded with its owner and an expiry date.

## What verified closure looks like

A single difference is closed by a fresh comparison. The plan reports no change for the resource, the provider returns the intended value, and the behaviour the setting controls has been tested. For an adopted emergency fix, the next routine deployment is observed to leave it in place.

The situation is closed when the trend has reversed. Every difference on a critical resource has a date, a class and an owner. The oldest unintended difference is inside the age agreed for its class. Detection has completed on schedule for every workspace. The recovery environment has been compared with production as it runs today and has scaled to production size in a test.

## What to do next

Two lists can be produced with tools the team already has. The first is a plan for one critical service, run with no code change pending. Every change it proposes is a difference. Beside each, write what the setting controls, using the five classes above.

The second comes from the provider's audit log: write events in that environment over a fixed period, made by any identity other than the pipeline's. Compare the lists. Writes with no matching difference were reverted or were made to resources the definition does not manage. Differences with no matching write are older than the log. Both results show where evidence is missing. Permissions that have moved in the same way are covered in [Identity Access Drift](/identity-access-drift).
