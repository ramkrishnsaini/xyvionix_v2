---
title: Why modern systems need assurance first
h1: 'A modern system changes without being touched, so proof has to come first'
seoTitle: 'Why Cloud-Native Systems Need Continuous Assurance | Xyvionix'
description: >-
  Modern systems change on provider calendars, by automation and by release.
  Why proof belongs to the running system and has to be held continuously.
summary: >-
  A cloud-native system is never finished. Providers, automation and releases
  each change it between reviews, so proof has to attach to the running system
  and be renewed as the system changes.
lede: >-
  A modern system needs assurance first because the proof behind every
  commitment expires without anyone acting. The system is assembled from
  managed services, open source components and platforms that change on
  calendars the enterprise does not set. It is reconfigured by automation and
  released many times between any two reviews. Proof therefore belongs to the
  running system, not to the release, and a system that changes continuously
  can only be proven continuously.
ogQuestion: What has changed in production since it was last proven?
category: Production Reliability
author: Xyvionix Research
featured: false
cluster: reliability
secondary:
  - change
  - cyber
parent: why-assurance
state: degrading
audience:
  - CTO
  - VP Engineering
  - VP Platform
  - Technology Risk
intent: >-
  The case for putting assurance ahead of delivery speed in cloud-native,
  distributed, continuously deployed systems. A modern system is never finished:
  it is assembled from managed services, open source components and platforms
  that each change on a calendar the enterprise does not set, it is reconfigured
  by automation, and it is released many times between any two reviews. Covers
  why the unit of proof has moved from the release to the running system; how
  provider-initiated change (platform versions leaving support, managed service
  defaults, deprecations) expires proof without any action by the enterprise;
  why infrastructure as code describes intent and not the running state; and why
  a system that changes continuously can only be proven continuously. Distinct
  from cloud-drift-production-risk and kubernetes-support-windows-upgrade-risk,
  which each cover one mechanism. This page is the argument across all of them.
related:
  assurance:
    - production-reliability-assurance
    - change-assurance
    - cloud-drift-assurance
    - kubernetes-reliability-assurance
  useCases:
    - cloud-configuration-drift
    - kubernetes-upgrade-risk
    - high-change-failure-rate
  technologies:
    - eks-reliability-assurance
    - terraform-drift-assurance
    - aws-production-reliability
  industries:
    - saas-production-reliability
  insights:
    - cloud-drift-production-risk
    - kubernetes-support-windows-upgrade-risk
    - what-change-failure-rate-proves
evidence:
  - name: Composition inventory for each critical journey
    detail: >-
      Every managed service, platform version, open source component and add-on
      the journey depends on, with an owner and the support grade it currently
      holds.
  - name: Provider and project lifecycle calendar
    detail: >-
      End of support, retirement and default-change dates read from the current
      provider and project pages, with the days remaining to the next boundary
      for each component.
  - name: Declared and running state comparison
    detail: >-
      A dated comparison of the infrastructure definition with what the provider
      is running, together with the date on which each detector last completed.
  - name: Record of change to the running system
    detail: >-
      Releases, automated actions and provider-initiated changes in one record,
      each linked to the outcomes it could affect.
  - name: Outcome evidence bound to a version
    detail: >-
      Tested results for each critical outcome, attributable to the platform
      version, configuration and date on which they were produced.
  - name: Detection coverage after change
    detail: >-
      Proof that each monitor and alert behind an outcome still receives data
      and can still fire after a platform or tooling upgrade.
  - name: Verified closure record
    detail: >-
      The re-test result that returned an outcome to Assured after corrective
      action, held with the change that prompted it.
thresholds:
  - signal: Days remaining to the next support or retirement boundary, per component
    basis: >-
      The time the crossing is known to take, set against the change windows
      the business allows
    lostWhen: >-
      The remaining days fall below the time the crossing needs, or the support
      grade of a component cannot be stated
  - signal: Age of the evidence behind each critical outcome
    basis: >-
      How often the running system changes and what it costs the business to be
      wrong about the outcome
    lostWhen: >-
      A release, an automated change or a provider date passes and the outcome
      is not re-proven inside the agreed validity
  - signal: Age of the oldest unreconciled difference between declared and running state
    basis: >-
      The interval before the next event that executes the definition, such as
      a deployment, a node replacement or a recovery
    lostWhen: >-
      A difference outlives the agreed limit, or the detector has not completed
      on schedule
  - signal: Share of changes to the running system that are recorded and attributed
    basis: >-
      What the business needs in order to explain an incident to a customer, an
      auditor or a regulator
    lostWhen: >-
      A change is found in production that no release, automation record or
      provider notice explains
faqs:
  - q: Is assurance the same as monitoring or observability?
    a: >-
      No. Monitoring reports signals from the system as it runs. Assurance
      holds a position on whether an agreed business outcome is currently
      proven, against evidence that has an age. A support date that has passed
      or a monitor that has stopped receiving data produces no alert, and both
      change what is proven.
  - q: The estate is defined in infrastructure as code with policy checks in the pipeline. Is that not proof?
    a: >-
      It is proof of intent at the moment of the apply. It does not cover
      changes made outside the pipeline, changes made by the platform, or
      resources the tool does not manage. Proof of the running state needs a
      dated comparison and a detector that is known to have completed.
  - q: Does using managed services move the risk to the provider?
    a: >-
      It moves the timing of change to the provider. The outcome stays with the
      enterprise. Managed Kubernetes services upgrade clusters automatically
      when support ends, and the workloads, add-ons and customer commitments
      affected by that upgrade belong to the enterprise.
  - q: Does putting assurance first mean adding another approval gate to every release?
    a: >-
      No. Assurance attaches to outcomes, not to releases. A release is one of
      the events that expires evidence and triggers a re-proof. The scope is
      set by the outcomes where being wrong is expensive, so the cost follows
      the consequence and not the number of deployments.
sources:
  - title: 'Kubernetes: releases'
    url: 'https://kubernetes.io/releases/'
  - title: 'Apache Airflow: release notes'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/release_notes.html'
  - title: 'Amazon EKS: Auto Mode'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/automode.html'
  - title: 'Google Cloud: announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
  - title: 'Google Cloud status: incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
  - title: 'Amazon EKS: Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'Amazon EKS: pricing'
    url: 'https://aws.amazon.com/eks/pricing/'
  - title: 'Google Cloud: GKE release channels'
    url: 'https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels'
  - title: 'Kubernetes blog: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'Grafana Loki: Promtail'
    url: 'https://grafana.com/docs/loki/latest/send-data/promtail/'
  - title: 'Apache Airflow: supported versions'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/supported-versions.html'
  - title: 'Apache Airflow: upgrading to Airflow 3'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/upgrading_to_airflow3.html'
  - title: 'Microsoft Learn: supported Kubernetes versions in AKS'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'Microsoft Learn: cloud security posture management in Defender for Cloud'
    url: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management'
  - title: "Microsoft Learn: what's new in Microsoft Entra"
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/whats-new'
  - title: 'Kubernetes blog: in-place Pod resize graduates to stable in v1.35'
    url: 'https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/'
  - title: 'Amazon EKS: roll back a cluster version'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/rollback-cluster.html'
  - title: 'HCP Terraform: health assessments'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health'
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'Azure status history: post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Amazon EKS: cluster insights'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-28'
lastReviewed: '2026-09-28'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why does a modern system need assurance before anything else?

A modern system needs assurance first because every other decision about it rests on proof that stops being true without anyone acting. Delivery speed, cost reduction, resilience design and new features all assume that the running system still does what it was last shown to do. In a cloud-native, distributed, continuously deployed system that assumption has a short life.

The business consequence is specific. A commitment to a customer, a recovery tolerance agreed with the board and a control described to an auditor are each held on evidence. That evidence was gathered against a system that has since been replaced, piece by piece. Nobody decided to let the proof lapse.

This is why assurance is a precondition and not a finishing step. Investment in speed raises the rate at which proof expires. Investment in managed services moves the timing of change to a provider. Investment in automation increases the number of changes that no person made. Each is a sound decision. Each also makes it harder to say what is currently proven, and the business carries that gap whether or not anyone has measured it. The same argument for agentic AI, AI models and critical systems is set out on [why assurance comes first](/why-assurance).

## What makes a modern system different from the one that was reviewed?

A modern system is never finished, so a review has no completed thing to approve. It is an assembly of managed services, open source components and platforms, and three sources of change act on it at the same time.

| Source of change | Who sets the timing | What it looks like | What it expires |
|---|---|---|---|
| The provider or project | The vendor or the open source project | A version leaves support, a default changes, a component is retired | Proof that the platform is supported, patched and behaving as tested |
| Automation | The platform, on rules set earlier | Nodes are replaced, capacity is consolidated, a policy is remediated | Proof that the running configuration is the one that was examined |
| Release | The enterprise's delivery teams | Code, configuration and policy data ship many times between reviews | Proof that what was tested is what serves customers |

Only the third is under the enterprise's control, and it is the only one that most governance watches. A change approval process sees the release. It does not see the node image, the support calendar or the default that changed in a provider's release notes.

The pace of the other two is published. The Kubernetes project ships a minor release roughly every four months and maintains the most recent three. Apache Airflow made four feature releases between April 2025 and July 2026. Amazon EKS Auto Mode gives nodes a maximum lifetime of 21 days, so every node is rebuilt at least that often. A quarterly review examines a system whose platform, nodes and code have all changed since the previous one.

## Why has the unit of proof moved from the release to the running system?

The unit of proof has moved because a release gate proves an artefact, and the business depends on a running system that is more than its last artefact.

When change arrived one way, a tested release stayed as tested until the next one. Two things have ended that.

The first is volume. The 2025 DORA research report, State of AI-assisted Software Development, found that AI adoption has a positive relationship with software delivery throughput and continues to have a negative relationship with software delivery stability. More change is arriving, and it is arriving with less stability. Proof attached to one release describes a shrinking share of the system's life.

The second is change that is not a release. Google's report on its incident of 12 June 2025 describes a change shipped on 29 May without feature-flag protection and without appropriate error handling. It did nothing for two weeks. A policy change with unintended blank fields then replicated globally and the binary crashed. The release had passed. The failure was activated by data, on a day when nothing was deployed.

A model that proves releases has nothing to say at that moment. Nor does it when a platform version changes underneath a workload, or when automation replaces the nodes it runs on.

So the thing to prove is the outcome on the running system: the customer journey completes, the service recovers inside its tolerance, the control enforces. A release is one event that can expire that proof. It is no longer the only one.

## How does provider-initiated change expire proof without any action by the enterprise?

Provider-initiated change expires proof by altering the facts the proof depended on, while the enterprise's own configuration stays exactly as it was. It takes three forms.

**Versions leave support.** When extended support for a version ends on Amazon EKS, the control plane is upgraded automatically to the oldest supported version, at any time after the date and without prior notification. Nodes and add-ons are not upgraded with it. GKE upgrades clusters at the end of support regardless of blocking issues. The calendars are compared in [Kubernetes support windows and the cost of deferred upgrades](/kubernetes-support-windows-upgrade-risk).

**Components are retired.** A retired component keeps running, so nothing alerts. The only detection is an inventory checked against lifecycle dates, repeated on a schedule.

**Defaults and behaviours change.** In January 2026 Microsoft Entra extended the enforcement of Conditional Access policies that target all resources with resource exclusions to sign-in flows that request only OIDC or specific directory scopes. The policy in the tenant was the same before and after. Airflow 3 changed the default of `catchup_by_default` to False, so pipeline code written for Airflow 2 can behave differently after the upgrade without a line being edited.

| Provider-initiated change | Date | What stopped being proven |
|---|---|---|
| Ingress NGINX retired by its project | March 2026 | That an internet-facing proxy receives security fixes |
| Promtail reached end of life | 2 March 2026 | That the log shipping component is maintained |
| Apache Airflow 2 reached end of life | 22 April 2026 | That the orchestrator receives security fixes |
| Foundational CSPM in Microsoft Defender for Cloud moves to opt-in for new Azure subscriptions | From 27 October 2026 | That a new subscription has posture monitoring at all |
| Azure Linux 2.0 node images removed on AKS | From 31 October 2026 | That affected node pools can scale |

In every row the enterprise changed nothing. A review completed the month before each date was correct when it was written, and wrong afterwards.

## Why does infrastructure as code describe intent and not the running state?

Infrastructure as code records what the enterprise asked for. The provider runs what actually exists, and the two agree only for as long as something keeps comparing them.

The definition is reviewed, policy is evaluated against the plan, and the pipeline applies it. All of that is evidence about intent at the moment of the apply. Three things separate it from the running state.

**Supported features change the running system.** In-place Pod resize became stable in Kubernetes v1.35. The CPU and memory of a running Pod can be changed without recreating it, so a workload can differ from its manifest in Git through a feature working as designed.

**Normal tooling leaves gaps.** AWS notes that rolling a CloudFormation stack back to a template with a lower Kubernetes version does not trigger a rollback of the EKS cluster version. The declaration says one version and the cluster runs another, with no manual change involved.

**Detection is partial and can stop.** HCP Terraform health assessments run every 24 hours by default. They pause if the latest run ended in an error, and they see only the resources Terraform manages. A paused detector reports nothing, and nothing reads as clean.

The gap matters most when the definition is executed. AWS states that without infrastructure as code, restoring workloads in a recovery Region is complex and may exceed the recovery time objective. A definition that no longer matches production carries the same risk with less warning, which is the subject of [cloud drift as production risk](/cloud-drift-production-risk).

## What is the business exposed to?

The business is exposed to failures that arrive on someone else's schedule, and to decisions taken on proof that has already expired.

| Exposure | How it arrives | Business consequence |
|---|---|---|
| An unplanned production change | The provider upgrades the platform when support ends | Disruption in a period the business did not choose, such as a trading peak |
| An unpatched component in the traffic path | A component is retired and keeps running | A vulnerability found later receives no fix |
| Capacity that fails under load | Node images are withdrawn and pools cannot scale | The failure first appears during a demand spike |
| Recovery that misses its tolerance | The recovery environment is built from a definition that no longer matches production | The agreed recovery time is missed when it is needed |
| Cost with no benefit | Extended support begins on a boundary date | On Amazon EKS the cluster fee moves from $0.10 to $0.60 per hour |
| A control believed to be present | A default changes, or a detector stops | A statement to a customer, auditor or regulator rests on an assumption |

Automation adds an exposure of its own. Microsoft's post-incident review of 2 to 3 February 2026 (tracking ID FNJ8-VQZ) describes a remediation workflow that incorrectly disabled anonymous access on storage accounts which allowed it intentionally. The impact reached Virtual Machines, AKS, Azure DevOps and GitHub Actions, which include the delivery pipelines an enterprise would use to ship a fix.

The last row of the table is the hardest to price. A known risk can be accepted, given an owner and reviewed on a date. An unknown one cannot.

## Why can a system that changes continuously only be proven continuously?

Proof has to be renewed at least as often as the thing it describes changes. Otherwise it describes a system that no longer exists.

Evidence is a tested result attributable to a version of the system and a point in time. A periodic review produces evidence on the reviewer's calendar. The system changes on three others: the provider's, the automation's and the delivery team's. An annual or quarterly result is out of date for most of its life.

Reviewing more often narrows the gap. The alternative is to hold proof as a state that changes when the evidence does.

1. Each outcome is named by the business and given a threshold.
2. Evidence is bound to the version and the date it was produced on.
3. Expiry is triggered by events as well as by time: a release, a provider date, an automated action.
4. The outcome holds one state at any moment: Assured, Degrading, At risk or Unassured.
5. Loss of assurance leads to corrective action with an owner, and closure is recorded on a re-test.

This is not monitoring, and it is not the provider's own checks. Monitoring reports what the running system emits. It does not report that a support date has passed. Provider checks are one input: Amazon EKS cluster insights refresh every 24 hours, and its rollback readiness insights cover only EKS-managed add-ons. Neither states whether the outcome the business depends on is currently proven.

Continuous proof has a cost, and the cost is controlled by scope. The systems that warrant a continuing position are those where being wrong is expensive and change is frequent. The method is set out on [how assurance works](/how-assurance-works).

## What does putting assurance first look like in practice?

Putting assurance first means establishing what is currently proven before committing to the next change. A practical start is four lists, made for one critical journey.

1. The outcomes the business depends on, with the threshold for each.
2. What the journey is assembled from, including the provider control-plane and edge services it relies on.
3. The calendars: support, retirement and default-change dates for each component, with the days remaining.
4. The age of the current evidence for each outcome, and the next event that will expire it.

Where the fourth list shows no current evidence, the accurate state is Unassured. That does not mean the system is failing. It means nobody can show that it is not.

The order of work follows. Evidence is gathered for the outcomes that are Unassured. Outcomes that are Degrading are corrected before the boundary date. Each release, platform change and provider notice expires evidence, and the affected outcomes are proven again. How Xyvionix holds that position for a running estate is described in [Production Reliability Assurance](/production-reliability-assurance).

Speed, managed platforms and automation are the right choices for a modern system. They are also the reason proof cannot be a stage at the end of delivery. A system that is never finished is never finally approved. It is proven now, or it is not.
