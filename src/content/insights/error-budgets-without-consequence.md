---
title: Error budgets without consequence are dashboards
h1: An error budget that changes no decision is a report with a threshold drawn on it
seoTitle: 'Error Budget Policy: Authority and Burn-Rate Response | Xyvionix'
description: >-
  An error budget is a decision agreed in advance. How to write the policy, who
  may enforce and waive it, how burn rate sets the response, and the signs of
  decay.
summary: >-
  An error budget works only when spending it changes what the organisation
  does. This article treats the budget as a pre-agreed decision and covers the
  consequence ladder, waiver authority, burn-rate arithmetic and the signs of a
  reporting programme.
lede: >-
  An error budget is a decision made in advance: when reliability falls below
  the agreed level, the organisation will do something different, and everyone
  accepted that before the conflict arrived. If exhausting the budget changes
  nothing, the objective is a chart. The difference between the two is a written
  policy, a named holder of authority, a response matched to the speed of the
  burn, and a record showing that the decision was taken.
ogQuestion: What did the organisation do the last time the error budget ran out?
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
  - VP Platform
  - CTO
intent: >-
  An error budget only works if exhausting it changes what the organisation
  does. Covers budget policy, who holds authority, burn-rate response, and the
  signs that an SLO programme has become reporting.
related:
  assurance:
    - slo-assurance
    - production-observability-assurance
    - release-assurance
  useCases:
    - high-change-failure-rate
  technologies:
    - gcp-production-reliability
  industries:
    - saas-production-reliability
  insights:
    - continuous-assurance-vs-monitoring
    - what-change-failure-rate-proves
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Google SRE Workbook: alerting on SLOs'
    url: 'https://sre.google/workbook/alerting-on-slos/'
  - title: 'Google Cloud status: incident report, us-west1, 20 August 2026'
    url: 'https://status.cloud.google.com/incidents/utF3FMFdQfwBzJcGG6vf'
  - title: 'Google Cloud status: incident summary'
    url: 'https://status.cloud.google.com/summary'
  - title: 'Google Cloud: announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## A budget is a decision made before the argument

Every technology organisation holds a standing disagreement between shipping change and protecting the service. Both sides are right. Left unresolved, the disagreement is settled case by case, by whoever has more authority on the day.

An error budget replaces that negotiation with arithmetic. The business agrees a level of reliability for a journey. The gap between that level and perfection is the budget. While budget remains, change proceeds at the pace the delivery teams choose. When it is spent, reliability work takes priority. The decision was taken when the objective was set, by people who were not under deadline pressure at the time.

The budget has value only as a commitment made in advance. Remove the commitment and what remains is a measurement of how unreliable the service has been, which the incident record already supplied.

A simple test separates the two conditions. Take the last three occasions on which the budget for a critical journey was exhausted, and find what was done differently as a result. If the answer is nothing, the programme is reporting. It may be accurate reporting. It is not control.

The pressure on this mechanism is rising. The 2025 DORA report found that AI adoption has a positive relationship with software delivery throughput and continues to have a negative relationship with software delivery stability. The budget is the instrument that rations change against reliability, and more change is arriving at it.

## Burn rate is a statement about time to decide

A burn rate of 1 means the budget is being consumed at exactly the pace that would spend it over the whole window. A burn rate of 6 spends it six times faster. The figure matters because it converts directly into the time left before the budget is gone, and so into how quickly someone must act.

The Google SRE Workbook gives recommended starting parameters for alerts that use two windows at each rate. The percentages in its table correspond to a 30-day window. The final column below is arithmetic on that basis, not a figure from the Workbook.

| Burn rate | Long window | Short window | Budget consumed when the alert fires | Workbook response | Time to exhaustion if sustained |
|---|---|---|---|---|---|
| 14.4 | 1 hour | 5 minutes | 2% | Page | 50 hours |
| 6 | 6 hours | 30 minutes | 5% | Page | 5 days |
| 1 | 3 days | 6 hours | 10% | Ticket | 30 days |

Two observations follow.

The first is that each rate implies a different kind of decision. At 14.4 the decision is operational: halt the rollout in progress, reverse the last change, shed load. It belongs to whoever is on call, and it must not need permission. At 1 the decision is about priorities: which planned work gives way. It belongs to whoever owns the plan.

The second is that the slowest rate is the one most likely to exhaust the budget unanswered. A page interrupts a person. A ticket joins a queue. Google Cloud's status summary records network latency and packet loss for traffic from Delhi, Chennai and Mumbai that began on 5 June 2026 and lasted more than 21 days. A degradation of that shape can consume most of a window without ever reaching a paging threshold. The alert does its job. The organisation around the alert does not.

## The policy is a ladder, not a switch

Many budget policies contain one rule: when the budget is spent, releases stop. A single rule of that weight is rarely enforced. It is too blunt for a small overrun and arrives too late for a large one, so the first time it is triggered an exception is made. After that the exception is the policy.

A policy that survives contact with a deadline has several rungs, and each rung has a consequence in proportion to the condition.

| Condition | Consequence | Who decides | Who may waive |
|---|---|---|---|
| Fast burn alert fires | Rollout in progress halts and the last change is reversed | On-call engineer, without approval | Nobody. The action is reversible and is reviewed afterwards |
| Slow burn ticket raised | The ticket is assigned to the owner of the cause, with a date inside the window | Reliability owner for the journey | Reliability owner, on the record |
| Budget passes an agreed fraction before the window is half gone | Release size and rollout pace are reduced for the journey | Engineering owner of the service | Business owner of the journey |
| Budget exhausted | Only reliability fixes and security patches are released until the budget recovers | Already decided by the policy | Business owner of the journey, with an expiry date |
| Budget exhausted in consecutive windows | The target and the architecture are reviewed with the business | Business owner of the journey | Not waivable. The review happens |

The fractions and windows are for each organisation to agree. The structure is what matters. Early rungs are cheap and automatic. Later rungs are costly and deliberate. The last rung admits that the target may be wrong. Microsoft's reliability guidance says that targets must be achievable given dependencies outside the team's control. A budget that is exhausted every window is evidence that the target, the architecture or the dependency chain has to change. Repeating the freeze changes none of them.

## Authority is where policies fail

A policy is as strong as the rule for setting it aside.

In the common failure, the person who grants the waiver is the person whose delivery date depends on it. No bad faith is needed. The deadline is certain and the reliability risk is a probability. A person holding both will choose the deadline most of the time, and will be right often enough to keep doing it.

Three rules make waiver authority workable.

1. **The waiver sits with someone who owns both outcomes.** That is normally the business owner of the journey, who answers for the revenue from the release and for the customers harmed by the outage. It is not the delivery lead and it is not the reliability lead.
2. **Every waiver is a record.** It names the approver, the reason, the change it permits and the date on which it lapses. A waiver without an expiry is a change of policy made without saying so.
3. **Waivers are counted.** The ratio of triggers to waivers is a measure of the programme's health. A policy that is waived every time it fires has been repealed.

The trade-off is speed. Escalating to a business owner takes longer than asking a colleague. That cost is intended. A waiver should be slightly harder to obtain than compliance.

## Three trade-offs the policy has to settle

**A freeze stores risk.** While releases are held, changes accumulate. When the freeze lifts they ship together, as a larger release than the pipeline normally carries. A policy that stops change should also say how change resumes: in the usual batch sizes, at the usual rollout pace. The measures that show whether resumed change is stable are discussed in [what change fail rate proves](/what-change-failure-rate-proves).

**The calendar forgives.** A budget measured over calendar months resets on the first day of each month, whatever happened on the last day of the one before. A rolling window does not reset. It is harder to explain and much harder to wait out.

**Provider failures still spend the budget.** Removing provider-caused incidents from the calculation is tempting, since the team did not cause them. The customer experienced them all the same. As an illustrative calculation, an objective of 99.9% over 30 days leaves a budget of about 43 minutes. Google's incident report for us-west1 on 20 August 2026 records a disruption of 2 hours 22 minutes following scheduled fibre optic maintenance. A journey that failed for that whole period would have spent more than three windows of budget in one morning. The sound treatment is to count the burn and change the consequence: a review of the dependency and the failover path, not a freeze on the team's own releases.

## Signs that the programme has become reporting

Each of the following can be checked from records. None needs a judgement about culture.

- The budget was exhausted in a recent window and no release, plan or priority changed.
- Every policy trigger on record was followed by a waiver.
- Waivers have no named approver, no reason or no expiry.
- The budget recovered through reclassification of incidents, not through the passage of a clean window.
- Slow burn tickets are closed by age, or closed with no linked change.
- The regular review discusses attainment and never records a decision.
- No target has been raised or lowered since it was first set.
- An objective with no data is shown as met.
- Nobody can name the person who holds waiver authority for a given journey.

Several of these together describe a programme that produces charts. The instrumentation may be excellent. The defect is in the organisation, which is why tooling does not repair it.

## What this means for assurance

Attainment is the usual evidence offered for an SLO programme. It shows how the service behaved. It does not show whether the budget governs anything.

The evidence that matters is the decision record: each trigger, the consequence the policy named, the decision actually taken, the person who took it and any waiver with its expiry. That record ages like any other evidence. A policy that was enforced a year ago, under a previous owner and a lighter release load, proves little about today.

A programme in which triggers and decisions match is Assured on consequence. One in which waivers are rising is Degrading, and that is visible well before an outage makes it obvious. One with no decision record is Unassured: the budget may be working, and nobody can show it. How validity and consequence are held together for each critical journey is set out in [SLO Assurance](/slo-assurance), and the release gates that read the same indicators are covered in [Release Assurance](/release-assurance).

An error budget is a small transfer of authority from the moment of conflict to a calmer moment before it. Without the consequence, the transfer never took place. The chart still updates and the threshold line is still drawn on it, and the organisation makes the same decisions it would have made with no budget at all.
