---
title: Why production incidents recur
h1: Incidents recur because reviews close on actions raised, not on causes removed
seoTitle: 'Why Production Incidents Recur: A Closure Standard | Xyvionix'
description: >-
  Post-incident reviews produce actions at the moment attention starts to fall.
  Why actions stall, how mitigation differs from cause removal, and a graded
  closure standard.
summary: >-
  A review is judged by the actions it raises, and a cause is removed by
  something the review does not control. This article explains why actions
  stall, separates mitigation from cause removal, counts recurrence by cause
  class and grades closure.
lede: >-
  Production incidents recur because the post-incident process is built to
  produce actions, and producing an action is not the same as removing a cause.
  Actions are written when attention is highest and carried out after it has
  gone. Restoration and mitigation are recorded as fixes, and closure is taken
  from ticket status instead of a test against the condition that caused the
  failure. The remedy is a closure standard that states what each action
  removes, how that will be proven, and what reopens it.
ogQuestion: Which of last year's incident actions were proven to work?
category: Production Reliability
author: Xyvionix Research
featured: false
cluster: reliability
secondary: []
parent: insights
state: degrading
audience:
  - Head of SRE
  - VP Engineering
  - CTO
  - Technology Risk
intent: >-
  Post-incident reviews generate actions; few are completed and fewer are
  verified. Analyses the failure pattern, distinguishes mitigation from cause
  removal, and gives a closure standard for corrective actions.
related:
  assurance:
    - incident-recurrence-assurance
    - slo-assurance
  useCases:
    - cloud-incident-recurrence
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - gcp-production-reliability
  industries:
    - saas-production-reliability
  insights:
    - security-findings-vs-verified-closure
    - error-budgets-without-consequence
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'AWS post-event summary: Amazon DynamoDB service disruption in US-EAST-1, October 2025'
    url: 'https://aws.amazon.com/message/101925/'
  - title: 'Google Cloud status: incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
  - title: 'Google Cloud status: incident report, us-central1-b, 1 September 2026'
    url: 'https://status.cloud.google.com/incidents/J5ia5t9p3g9Q5Wi7r8Ev'
  - title: 'Azure status history: post-incident review YKYN-BWZ, Azure Front Door, 29 to 30 October 2025'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ'
  - title: 'Azure status history: post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Azure status history: post-incident review ZJV6-SGG, West US, 23 July 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=ZJV6-SGG'
  - title: 'AWS Fault Injection Service user guide'
    url: 'https://docs.aws.amazon.com/fis/latest/userguide/what-is.html'
  - title: 'Google Cloud Well-Architected Framework: reliability pillar'
    url: 'https://docs.cloud.google.com/architecture/framework/reliability'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## The review is measured by its output

A post-incident review is one of the better habits in technology operations. It is blameless, it is written down, and it ends with a list of actions. The Google Cloud Well-Architected Framework lists "conduct thorough postmortems" among its reliability principles.

Incidents recur all the same. The argument here is that the review is judged by what it produces, which is a document and a list, while the cause is removed by work that happens later, elsewhere, under different priorities. The process is thorough up to the point where the actions are raised and has no opinion about what follows.

This article quotes no figure for how many post-incident actions are completed or verified. No primary source for such a figure could be confirmed, and an invented one would weaken the argument. The pattern is described by its mechanism, which any organisation can check against its own records.

## Why actions stall

Four forces act on every action from the day it is written.

**Attention decays faster than work completes.** Interest in an incident is highest while it is happening and falls from the moment service is restored. The review is held near the top of that curve. The actions are scheduled weeks later, near the bottom, and must then compete with a roadmap that has sponsors and dates.

**Closing the incident removes the visibility.** The incident record closes when service is restored. From that point the actions live in a team backlog as ordinary tickets. The executive who asked hourly for updates during the outage has no view of them.

**The action is written as an activity.** "Investigate connection pool behaviour." "Improve monitoring." "Review timeout settings." Each can be completed without changing the system. An action that does not state the condition it removes cannot be tested, so it can only be closed by someone declaring it done.

**The cause sits in someone else's estate.** The incident happened in one service. The cause is a default in a shared platform, or a behaviour in a library owned by another team. The action is raised in the backlog of the team that suffered, which has no authority to make the change.

None of these is a failure of diligence. Each is a property of how the process is built. A process that measures itself on actions raised will raise actions.

## Mitigation is not cause removal

Most of what is done during and after an incident is legitimate work that leaves the cause in place. The trouble starts when that work is recorded as the fix.

| Response | What it does | What it leaves in place | What proves it |
|---|---|---|---|
| Restoration | Returns the service: restart, failover, rollback | The cause, entirely | Service is serving again |
| Mitigation | Reduces the likelihood or the impact: more capacity, a longer timeout, a disabled feature | The latent condition, now harder to reach | The original trigger produces a smaller effect |
| Detection | Shortens the time to notice | The cause and its impact | The alert fires when the condition is injected |
| Cause removal | Eliminates the condition that made the failure possible | Nothing of this cause | The trigger is recreated and the failure does not follow |
| Accepted risk | Records a decision to live with the cause | The cause, knowingly | A named owner and an expiry date |

Provider reports make the distinction in their own words. AWS's post-event summary for the US-EAST-1 disruption of October 2025 traces the event to a latent race condition in the DynamoDB DNS management system, and states that AWS disabled the DynamoDB DNS automation worldwide pending fixes. Disabling the automation is a mitigation. The fixes are separate work and come afterwards.

Microsoft's post-incident review of the Azure Front Door event of 29 to 30 October 2025 (tracking ID YKYN-BWZ) lists repairs of different kinds side by side: synchronous configuration processing, a pre-canary stage with extended bake time, and faster data-plane recovery. The first addresses how the fault arose. The second is a gate against the class of fault. The third shortens the next event without preventing it. All three are worth doing, and a reader can tell which is which.

The common enterprise pattern loses that clarity. A service runs out of memory and the instance is resized. The ticket reads "fixed". What was done is a mitigation, and the reason memory ran out has not been found. The next incident has a different title and the same cause.

## Counting recurrence by cause class

Recurrence is usually looked for by matching incidents: the same service, failing the same way. That method finds very little, because causes move between services while titles change.

The alternative is to classify each incident by the kind of cause and count the classes. Six published provider reports from 2025 and 2026 show what this reveals.

| Provider report | The change or automation | How it failed |
|---|---|---|
| AWS post-event summary, US-EAST-1, October 2025 | DNS management automation for DynamoDB | Two DNS Enactors acted concurrently and the regional endpoint's DNS record was emptied |
| Google incident report, 12 June 2025 | A Service Control change shipped on 29 May 2025, without feature-flag protection | A policy change with blank fields replicated globally and met code with no error handling for it |
| Microsoft PIR YKYN-BWZ, October 2025 | Customer configuration changes across two control-plane build versions | Incompatible configuration metadata triggered a latent data-plane bug and propagated globally |
| Microsoft PIR FNJ8-VQZ, February 2026 | A remediation workflow | It disabled anonymous access on storage accounts that allowed it intentionally |
| Microsoft PIR ZJV6-SGG, July 2026 | Break-fix maintenance on optical devices | A defect in blast radius analysis widened the repair. Safety checks validated each device and not the aggregate effect |
| Google incident report, us-central1-b, 1 September 2026 | A scheduled router upgrade, manually orchestrated | Transceiver replacements were issued without sequencing |

The incidents belong to three providers. Nothing here suggests that any provider repeated its own incident. The table is about method. Sorted by title, these are six unrelated events: DNS, quota policy, edge configuration, storage access, optical maintenance, a router upgrade. Sorted by cause, they are one class six times. A change or an automation passed its own validation and failed in aggregate or on activation.

An enterprise that classifies its own history this way can measure two things. The first is the share of incidents whose cause class already has a closed record. The second is the interval between occurrences within a class. A shortening interval is the earliest sign that closures are not holding.

## A closure standard for corrective actions

The standard has two parts. The first governs how an action is written. The second grades how it is closed.

An action is accepted into the record only when it states five things:

- the condition it removes or reduces, in terms that can be recreated
- its type from the table above, so that a mitigation is never filed as cause removal
- an owner with authority over the system where the cause sits
- a date
- the test that will close it, agreed when the action is written and not when it is due

Microsoft's published reviews show that dates are practical. The Azure Front Door review listed repair items due in February and March 2026, and the West US review of July 2026 lists items due from August to October 2026.

Closure is then graded by the evidence behind it.

| Grade | Evidence | What it proves |
|---|---|---|
| 0 | The ticket is closed or the change is merged | That work was done |
| 1 | The change is found in the running system today | That the fix exists in production |
| 2 | The triggering condition is recreated and the failure does not follow | That the fix works |
| 3 | The test is retained, re-run when the component changes, and a failing run reopens the record | That the fix still works |

An incident record that holds grade 0 evidence and reports it as closure is closed on intent. Grade 2 is the lowest level that says anything about the cause.

The standard has costs, and they should be stated. Recreating a failure is itself a risk. AWS warns that its Fault Injection Service performs real actions on real resources, and defines experiments with stop conditions for that reason. Where the condition cannot safely be recreated in production, the test runs elsewhere and the record says so. The standard also reduces the number of actions a review can raise, since each now needs an owner and a test. That is a benefit. A short list that is proven removes more causes than a long list that is filed.

## What this means for assurance

A corrective action is a claim that a cause has gone. Like any claim about production it rests on evidence, and the evidence ages. A later release lowers the timeout that was raised. A rebuild from a definition that never held the fix removes it, which is the mechanism described in [cloud drift as production risk](/cloud-drift-production-risk). Grade 2 evidence describes the system on the day of the test. Only grade 3 follows the system as it changes.

The assurance position is set by grade. A cause class with current grade 3 evidence is Assured. One whose tests are ageing, or whose interval between occurrences is shortening, is Degrading. One that has recurred after closure is At risk. A closed action with grade 0 evidence is Unassured, because nothing is known about whether it worked. How that position is held across the incident record is set out in [Incident Recurrence Assurance](/incident-recurrence-assurance), and the steps for an enterprise already seeing repeats are in [Cloud Incident Recurrence](/cloud-incident-recurrence).

The review is worth keeping. It finds causes well. What it lacks is a definition of done that refers to the system and not to the ticket. Incidents stop recurring when closure means that the failure was attempted again and did not happen.
