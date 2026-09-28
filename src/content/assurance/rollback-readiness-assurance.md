---
title: Rollback Readiness Assurance
h1: Prove the last change can still be reversed in the time that matters
seoTitle: 'Rollback Readiness Assurance: Proven Reversibility | Xyvionix'
description: >-
  Continuous assurance that production change can be reversed within an agreed
  time, across code, data migrations, platform upgrades, models and
  configuration.
summary: >-
  Rollback is a capability that silently disappears with irreversible
  migrations, state changes and dependency upgrades. Exercised rollback time
  and the point at which each change stops being reversible are held as
  thresholds.
lede: >-
  Rollback readiness assurance is the continuing proof that the most recent
  change to each critical service can be reversed, by a known route, within the
  time the business has agreed. Reversibility is not a permanent property of a
  pipeline. It is removed by data migrations, state written in a new format,
  dependency upgrades and provider time limits, usually without anyone deciding
  to remove it. The only evidence that it still exists is a reversal that was
  recently performed and timed.
ogQuestion: Can the last change be reversed inside the time that matters?
kind: child
cluster: change
secondary:
  - reliability
parent: change-assurance
state: assured
audience:
  - VP Engineering
  - Head of SRE
  - Technology Risk
intent: 'Commercial: continuing proof that change can be reversed within an agreed time'
related:
  assurance:
    - release-assurance
    - disaster-recovery-assurance
    - model-change-assurance
  useCases:
    - high-change-failure-rate
    - schema-change-production-impact
    - kubernetes-upgrade-risk
  technologies:
    - eks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - saas-production-reliability
  insights:
    - what-change-failure-rate-proves
evidence:
  - name: Reversibility classification per change
    detail: >-
      Each production change classed before release as reversible, reversible
      until a stated point, or irreversible, with the reason and the person
      who accepted the classification.
  - name: Exercised rollback record
    detail: >-
      For each critical service, the date a rollback was last performed in
      production or in an environment shown to match it, the route used, the
      time it took and the state of the service afterwards.
  - name: Migration reversal test
    detail: >-
      For each schema or data migration, the result of running the reverse
      path against data written by the new version, including what happens to
      records created after the migration.
  - name: Previous version availability
    detail: >-
      Confirmation that the prior artefact, configuration, model version and
      dependency set still exist, can still be retrieved and are still
      supported by the platform they would run on.
  - name: Rollback window register
    detail: >-
      Time limits and preconditions that bound a reversal, such as a
      provider's rollback period, with the date each window closes and the
      actions that would block it.
  - name: Deployment path independence
    detail: >-
      The dependencies of the route used to roll back, compared with the
      dependencies of production, and the alternative route available when
      they fail together.
thresholds:
  - signal: Measured rollback time for each critical service
    basis: The recovery time the business has agreed for the service and the customer impact of each minute beyond it
    lostWhen: The last exercised rollback took longer than the agreed time, or no rollback has been exercised since the release process changed
  - signal: Age of the last exercised rollback
    basis: The rate at which the service, its data model and its dependencies change
    lostWhen: A migration, dependency upgrade or platform upgrade has reached the service since a rollback was last exercised
  - signal: Irreversible changes released without a recorded decision
    basis: A one-way change is a business risk decision, so it requires an owner
    lostWhen: Any change to a critical service passes the point of no return without an accepted classification and a forward-fix plan
  - signal: Time remaining in an open rollback window
    basis: The published window of the platform, for example the 7 days in which an Amazon EKS control plane upgrade can be rolled back
    lostWhen: The window is about to close and the decision to keep or reverse the change has not been made on current evidence
  - signal: Previous versions no longer retrievable or supported
    basis: A reversal needs a target that still exists and that the platform will still run
    lostWhen: The prior artefact, model version or platform version for a critical service cannot be restored
faqs:
  - q: The deployment tool has a rollback button. Is that not rollback readiness?
    a: >-
      The button redeploys the previous application version. It does not
      reverse a schema migration, restore data written in a new format,
      downgrade a dependency other services now rely on, or undo a platform
      upgrade. Readiness is the proven ability to return the service to a
      working state, which covers all of those.
  - q: The team fixes forward and never rolls back. Does this still apply?
    a: >-
      Yes. Fixing forward is a valid strategy when it is chosen. It depends on
      a working delivery pipeline, a quick diagnosis and a fix that can be
      written in time. Assurance records which changes have no reverse path,
      so that fix-forward is a decision with an owner and a measured recovery
      time, not the discovery that nothing else is possible.
  - q: How is rollback readiness different from disaster recovery?
    a: >-
      Disaster recovery restores a service after loss of infrastructure or
      data. Rollback reverses a change that the enterprise itself made. The
      two share techniques and both need exercised evidence, and a rollback
      that fails can become a recovery event.
sources:
  - title: 'Amazon EKS: roll back a cluster version'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html'
  - title: 'Amazon EKS cluster insights'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html'
  - title: 'AKS supported Kubernetes versions'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'Azure post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'DORA research: software delivery performance metrics'
    url: 'https://dora.dev/guides/dora-metrics/'
  - title: 'Announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
  - title: 'Argo Rollouts releases'
    url: 'https://github.com/argoproj/argo-rollouts/releases'
  - title: 'Flux releases'
    url: 'https://github.com/fluxcd/flux2/releases'
  - title: 'AWS: disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
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

Rollback is assumed because it worked once. The pipeline can redeploy a previous version, so the change record states "rollback: redeploy previous release" and the question is considered answered. What that sentence describes is the reversal of stateless code. Most changes that matter are not that.

**A migration makes the old version unable to read the data.** A column is dropped, a field changes type, a message format gains a required attribute. The previous application version still exists and can still be deployed. It can no longer run against the data as it now stands.

**New state accumulates from the moment of release.** Every record written by the new version is a record the old version never expected. Reversal an hour after release and reversal a week after release are different operations, and only the first was ever tested.

**Dependencies move together.** A library or runtime upgrade is adopted by several services in the same period. Reverting one of them puts it out of step with the rest.

**The provider sets a time limit.** An Amazon EKS control plane can be rolled back one minor version within 7 days of an in-place upgrade. After that the option is gone. The readiness insights AWS provides exist only during that window and are point-in-time, so changes made after the check are not captured.

**The previous version stops being available.** Artefacts are removed by retention policies. Platform versions leave support. A model version that a provider has withdrawn is no longer a rollback target, whatever the runbook says.

**The rollback has never been performed.** The procedure exists as a document. The people who wrote it have changed roles, and the pipeline it refers to has been rebuilt.

## What is at stake

Rollback is the fastest recovery action available for a failed change. When it works, a bad release costs minutes. When it does not, the team is diagnosing and writing a fix under pressure while the service is degraded, and the duration of the incident is set by how quickly a correct fix can be produced.

DORA research measures this as failed deployment recovery time: the time it takes to recover from a deployment that fails and requires immediate intervention. A service with no working reverse path has a recovery time that depends on diagnosis, which cannot be committed to in advance.

A failed rollback is worse than none. A reversal that stops part-way leaves the application on one version and the data on another. AWS notes that for data corruption the recovery point is always before the point at which the problem was discovered, so every hour spent on a reversal that does not work is an hour of data at risk.

The volume of change raises the stakes. The 2025 DORA report found that AI adoption continues to have a negative relationship with software delivery stability. More releases with lower stability means the reverse path is needed more often.

## What Xyvionix assures

Xyvionix holds five statements about each critical service as current facts, tested against thresholds agreed with the business.

1. **Every change has a reversibility classification.** Before release it is known whether the change can be reversed, until when, and by what route.
2. **The reverse path has been exercised.** A rollback has been performed and timed since the service, its data model or its release process last changed.
3. **The rollback target exists.** The previous artefact, configuration, dependency set and model version can be retrieved and will run on the platform as it is today.
4. **Open windows are tracked to their close.** Where a platform limits the period in which a change can be reversed, the decision to keep or reverse is made on current evidence before the period ends.
5. **Irreversible changes are decisions.** A one-way change has an owner, a forward-fix plan and a rehearsal appropriate to a change that cannot be undone.

How a release is gated and verified before reversal is ever needed is covered in [Release Assurance](/release-assurance). Recovery from loss of infrastructure or data is proven under [Disaster Recovery Assurance](/disaster-recovery-assurance).

## Common failure modes

- **Code reverted, schema not.** The application returns to the previous version and fails on start because the column it reads no longer exists.
- **The destructive step released with the additive one.** A migration adds the new structure and removes the old in one release. Separating them would have kept the reverse path open until the new version was proven.
- **Partial rollback of a platform upgrade.** An EKS version rollback returns the control plane to the previous minor version. It does not roll back add-ons, managed node groups, self-managed nodes or etcd data, and it is blocked if an incompatible feature was enabled after the upgrade.
- **Declared state reverted, real state unchanged.** AWS notes that rolling a CloudFormation stack back to a template with a lower Kubernetes version does not roll back the cluster version. The tooling reports a completed rollback.
- **Automated rollback that depends on a metric.** A progressive delivery controller reverses a release when its analysis fails. If the metric behind the analysis returns no data, the trigger does not fire.
- **The pipeline is down with production.** The Azure incident of 2 to 3 February 2026 affected GitHub Actions and Azure DevOps along with Virtual Machines and Managed Identities. A route used to deploy a reversal can share the dependencies of the service that needs it, and fail at the same moment.
- **Configuration with no previous version.** A feature flag or a routing rule is changed in a console. There is no record of the prior value to return to.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a change to production is required.

Corrections restore the reverse path or replace it with something proven. A migration that combines additive and destructive steps is split, so that the old version can run until the new one has been verified. Artefact retention is extended to cover the period in which a rollback could be called. Configuration is moved under version control so that a prior value exists. A rollback route that shares its dependencies with production is given an alternative that does not.

Where a change cannot be made reversible, the correction is a rehearsed forward fix and a smaller first exposure. The residual risk is recorded with its owner and an expiry date.

A service with no exercised rollback on record is Unassured. It is not treated as ready because a procedure has been written.

## Verified closure

Rollback readiness is closed by performing a rollback.

The reversal is run by the documented route, against data written by the new version, and it is timed from the decision to the point at which the service's indicators are back inside their objectives. Three results are recorded. The previous version is running. Records created while the new version was live are readable and correct. The measured time is inside the agreed recovery time.

For a migration, closure means the reverse path has been run on a copy of production data that includes records written after the migration. For a time-limited platform rollback, closure means the preconditions were checked before the upgrade and again before the window closed. For the delivery route, closure means a reversal was deployed with the primary pipeline unavailable.

Closure is dated and tied to the version it was proven on. The next migration, dependency upgrade or platform upgrade expires it, and the reversal is exercised again.

## Technology and industry context

Platforms differ in whether they offer a reverse path at all. Amazon EKS provides a control plane rollback with a fixed window and stated exclusions. Microsoft states that on AKS a downgrade or rollback to an unsupported version is not supported. The reversal plan for a cluster upgrade is therefore specific to the provider, and is covered in [Amazon EKS Reliability Assurance](/eks-reliability-assurance) and in [Kubernetes Upgrade Risk](/kubernetes-upgrade-risk).

Delivery tooling affects what a reversal produces. Flux v2.9.5 builds on Helm v4.2.4, and a change of rendering engine can mean that redeploying an older chart version does not recreate the objects it created when first released. A rollback exercised before a controller upgrade is evidence for the earlier controller only.

AI systems add targets that code rollback does not reach. A model version, a prompt, a routing rule and an index each change behaviour and each needs its own previous version. Reversal of those is held together with [Model Change Assurance](/model-change-assurance).

For software businesses serving many tenants, a reversal affects every customer at once, and tenants may have written data in the new format at different times. Sector context is covered in [SaaS Production Reliability](/saas-production-reliability).
