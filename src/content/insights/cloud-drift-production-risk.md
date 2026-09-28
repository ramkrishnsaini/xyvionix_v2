---
title: Cloud drift as production risk
h1: 'Drift is a stored fault: rank it by what it is waiting for, and measure its age'
seoTitle: 'Cloud Drift as Production Risk: Rank by Consequence | Xyvionix'
description: >-
  Drift does no harm until the definition is executed. How it becomes failed
  recovery, security regression and failed deployment, and why age is the
  threshold.
summary: >-
  Drift stays harmless until something acts on the declared state. This article
  names the triggers, ranks drift by the consequence each trigger releases, and
  argues that the age of a difference is a better threshold than the count.
lede: >-
  Cloud drift becomes a production risk at the moment something executes the
  definition: a deployment, a recovery, a replacement node. Until then the
  difference between declared and running state is a stored fault, and it looks
  like untidiness. Treating drift as hygiene leads teams to count it. Treating
  it as risk leads them to ask what each difference is waiting for and how long
  it has been waiting. Age is the threshold that matters, because exposure and
  the cost of correction both grow with it.
ogQuestion: How old is the oldest difference between the definition and production?
category: Production Reliability
author: Xyvionix Research
featured: false
cluster: reliability
secondary:
  - cyber
parent: insights
state: degrading
audience:
  - VP Platform
  - Head of SRE
  - CISO
  - Technology Risk
intent: >-
  Drift is usually treated as hygiene. Shows how it becomes recovery failure,
  security regression and failed deployment, how to rank drift by consequence,
  and why drift age is the threshold that matters.
related:
  assurance:
    - cloud-drift-assurance
    - disaster-recovery-assurance
    - cloud-security-exposure-assurance
  useCases:
    - cloud-configuration-drift
  technologies:
    - terraform-drift-assurance
  industries:
    - financial-services
  insights:
    - disaster-recovery-plan-never-tested
    - security-findings-vs-verified-closure
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'HCP Terraform: health assessments'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health'
  - title: 'Amazon EKS: Auto Mode'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/automode.html'
  - title: 'AWS Backup: logically air-gapped vault'
    url: 'https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html'
  - title: 'Azure reliability: availability zones overview'
    url: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview'
  - title: 'Azure status history: post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## Why the hygiene framing fails

Drift is the difference between what the infrastructure definition declares and what the provider is running. Most organisations file it with untidiness, next to untagged resources and stale branches. It is reported as a count, reviewed when time allows and cleared in bulk before an audit.

The framing survives because drift is quiet. A value changed by hand in production causes no alert. The service keeps running, often better than before, since the change was usually made to fix something. Nothing in the daily experience of the team says that anything is wrong.

The framing fails because it measures the wrong property. A count says how many differences exist. It does not say which of them will cause an outage, or when. As an illustrative comparison, an estate with two hundred cosmetic differences is in better condition than an estate with three, if one of the three is a firewall rule opened during an incident eleven months ago.

This article argues for a different model. Drift is a stored fault. Each difference is waiting for a specific event to release it. Risk is ranked by what that event will do, and controlled by limiting how long the fault is allowed to wait.

## Drift is released by execution

A difference between declared and running state is inert while nothing acts on the declaration. The harm arrives when the definition is executed, and there are four common ways in which that happens.

**The next deployment.** The pipeline applies the definition. A value that was changed by hand is either returned to its declared setting, which removes the fix that someone made for a reason, or the apply fails on a conflict and the release stops part-way.

**A recovery.** The recovery environment is built from the definition. AWS states that without infrastructure as code, restoring workloads in the recovery Region is complex and may exceed the recovery time objective. A definition that has drifted has the same effect as a missing one, with less warning. AWS also notes that the metadata held with an EC2 backup, such as instance type, VPC, security group and IAM role, is used only when restoring in the same Region. In another Region the definition is all there is.

**Replacement and scale-out.** New capacity is created from the template, not from the instance that was adjusted. Some platforms make this routine. EKS Auto Mode gives nodes a maximum lifetime of 21 days, so every node is rebuilt from its declared configuration at least that often.

**Reliance on a control.** Here the definition is executed by a person. A reviewer, an auditor or an incident responder reads the declared state and acts on the belief that it is true. The network rule is declared closed, so nobody checks it. The backup vault is declared immutable, so the restore path is trusted. Immutability is a setting like any other. AWS Backup's logically air-gapped vault relies on Vault Lock in compliance mode, and a protection that depends on configuration is only as good as the last proof that the configuration holds.

In each case the incident is dated to the trigger, and the cause is dated much earlier. That gap is why drift is so often missing from post-incident reviews. The review finds the deployment that failed. The hand-made change it collided with was made two quarters before.

## Ranking drift by consequence

If drift is a stored fault, each difference can be ranked by establishing four things about it.

1. What would change in production if the definition were applied now.
2. What would be missing if the environment were rebuilt from the definition alone.
3. Whether the difference weakens a control that someone approved.
4. Whether anyone still knows why the change was made.

The answers place a difference in one of five classes.

| Class | Typical drifted property | Trigger that releases it | Consequence |
|---|---|---|---|
| Recovery-critical | Capacity, quotas, routes, tuning values set by hand after an incident | Regional recovery or rebuild | Recovery environment starts without the fixes production depends on, and the recovery time objective is missed |
| Security-regressing | Access rules, public exposure, encryption, logging, backup immutability | Reliance on the declared control | A control that was reviewed and approved is absent, and the approval still stands |
| Deployment-blocking | Any value the next apply will revert or collide with | The next pipeline run for that resource | The release fails part-way, or an earlier incident returns when its fix is reverted |
| Resilience-reducing | Zonal placement, replica counts, health check settings | Loss of a zone or an instance | The design tolerated the failure. The running system does not |
| Cosmetic | Tags, descriptions, naming | None | Noise that hides the other four classes |

A resource can sit in more than one class, and takes the rank of the most serious. The resilience class is easy to enter by accident. In Azure a zone-redundant resource is spread across zones by the service, and a zonal resource is pinned to one zone and is not resilient to a zone outage on its own. A dependency recreated as zonal during a hurried repair leaves every service above it exposed to one zone, with a design document that says otherwise.

The cosmetic class carries no consequence of its own, and it is where most of the count comes from. A report dominated by cosmetic drift trains its readers to stop reading.

## Why age is the threshold

Count fails as a threshold because it responds to the wrong things. It falls when attributes are excluded from comparison. It rises when a harmless tagging change touches many resources. Neither movement says anything about risk.

Age behaves differently, for three reasons.

**Exposure accumulates.** Every day that a difference stays open is another day on which its trigger can occur. An old deployment-blocking difference has survived only because nobody has deployed to that resource, and eventually someone will.

**Knowledge decays.** Reconciliation has two directions. An intended change is adopted into the definition. An unintended one is reverted. Choosing correctly depends on knowing why the change was made. A week later the person who made it remembers. A year later that person may have left, and the ticket says "applied fix". An old difference cannot be safely reverted or safely adopted, so it is left alone, and grows older.

**Dependence grows.** Other changes are built on the drifted value. A timeout raised by hand becomes the assumption behind a retry setting elsewhere. The longer the difference stands, the larger the change needed to remove it.

The age limit for each class is set by how often its trigger occurs. Deployment-blocking drift has to be reconciled before the next planned release to the resource. Recovery-critical drift has to be reconciled before the next recovery exercise, and in any case inside the interval for which the business accepts an unproven recovery. Security-regressing drift is bounded by the exposure window the business is willing to accept. Where the platform publishes the trigger interval, as EKS Auto Mode does with its 21-day node lifetime, the limit is known in advance.

### Measuring age honestly

Age is normally counted from the first detection. That is a lower bound. The change happened at some point between the last clean comparison and the first one that showed a difference.

The size of that uncertainty depends on the detector. HCP Terraform health assessments run every 24 hours by default, so under normal conditions the true age is known to within a day. They pause if the latest run ended in an error, and they see only the resources that Terraform manages. When the detector has paused, the last clean comparison recedes into the past and the age of any drift is unbounded. A workspace in that condition is not free of drift. It is Unassured.

A usable record therefore holds three dates for each difference: the last clean comparison, the first detection and the present. It also holds one date for each detector, which is when it last completed.

## The trade-off in automatic correction

The obvious way to hold drift age at zero is to revert every difference as soon as it appears. For some resource classes that is the right design.

It has a cost. An automatic revert cannot tell an unintended change from an intentional one that nobody declared. Microsoft's post-incident review of 2 to 3 February 2026 (tracking ID FNJ8-VQZ) describes a remediation workflow that incorrectly disabled anonymous access on storage accounts which allowed it intentionally for platform functionality. Virtual machine extension retrieval was blocked across multiple regions. The automation was enforcing a sound policy against a legitimate exception.

The choice is between two risks. Manual reconciliation allows drift to age. Automatic reconciliation removes age and adds the chance of reverting something that mattered. A workable rule is to automate by class. Differences whose declared value is certainly correct and whose revert is reversible can be corrected at once. The rest are classified by a person, inside the age limit for their class.

## What this means for assurance

Treating drift as risk changes what is reported upward. The count of differences is replaced by three figures: the age of the oldest unreconciled difference in each consequence class, the share of differences with a known reason and owner, and the age of the detection evidence itself.

Those figures map directly to state. An estate in which every difference is inside its age limit and every detector has reported on schedule is Assured. One in which ages are rising toward the limit is Degrading. One with a difference past its limit is At risk. One whose detectors have stopped is Unassured, whatever the last report said. How those states are held for a whole estate is described in [Cloud Drift Assurance](/cloud-drift-assurance), and the tool-level mechanics in [Terraform Drift Assurance](/terraform-drift-assurance).

Recovery is where the argument matters most. A recovery exercise is the only trigger that an organisation can choose to pull on its own schedule, and it releases every recovery-critical difference at once. That makes it the most complete drift test available, a point developed in [the disaster recovery plan that has never been tested](/disaster-recovery-plan-never-tested).

Drift cannot be prevented. People will change production by hand during incidents, and they are usually right to. What can be controlled is how long the change stays outside the definition. The count of differences describes how tidy the estate is. The age of the oldest one that matters describes how much risk it is carrying.
