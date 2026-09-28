---
title: Continuous assurance is not monitoring
h1: Monitoring reports what a system is doing. Assurance states whether the outcome is still proven
seoTitle: 'Continuous Assurance vs Monitoring: The Difference | Xyvionix'
description: >-
  Monitoring, audit, managed service and continuous assurance compared on
  evidence, threshold, ownership and closure, with the reasoning behind each
  difference.
summary: >-
  Monitoring observes, audit samples, a managed service performs. None holds a
  current position on whether a business outcome is proven, or owns the
  correction until a re-test confirms it. This article explains why the gap is
  structural.
lede: >-
  Monitoring reports what a system is doing. Continuous assurance states
  whether an outcome the business agreed is still proven, and who acts when it
  is not. The two are often confused because assurance uses monitoring data.
  The difference lies in four places: what counts as evidence, who sets the
  threshold, who owns the correction and what closes it. Audit and managed
  services differ from assurance in the same four places, in different ways.
ogQuestion: If everything is monitored, what is left to assure?
category: Assurance Practice
author: Xyvionix Research
featured: false
cluster: category
secondary:
  - reliability
parent: insights
state: assured
audience:
  - CIO
  - CTO
  - Head of SRE
  - Technology Risk
intent: >-
  Monitoring reports what a system is doing; assurance states whether an agreed
  outcome is still proven and who acts when it is not. Compares monitoring,
  audit, managed service and assurance across evidence, threshold, ownership and
  closure.
related:
  assurance:
    - production-observability-assurance
    - ai-observability-assurance
    - slo-assurance
  useCases:
    - cloud-incident-recurrence
  technologies: []
  industries:
    - financial-services
  insights:
    - assurance-is-a-state-not-a-report
    - error-budgets-without-consequence
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Google SRE Workbook: alerting on SLOs'
    url: 'https://sre.google/workbook/alerting-on-slos/'
  - title: 'Microsoft Learn: Azure Well-Architected Framework reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'Grafana Loki: Promtail'
    url: 'https://grafana.com/docs/loki/latest/send-data/promtail/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 365
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## Four functions that answer four different questions

An enterprise with a mature technology estate already has three functions that look at whether its systems are in order. Monitoring watches them. Audit examines them. A managed service, where one is used, operates them. Each does its job, and each answers a question that is worth asking.

The argument of this article is that none of the three answers the question the board and the regulator eventually ask: is the outcome the business depends on proven, today, and if not, who is correcting it. That is not a criticism of the three. It follows from how each is built. The [comparison on the method page](/how-assurance-works) summarises the differences in a table. This article explains where they come from, under four headings: evidence, threshold, ownership and closure.

One clarification first. Assurance does not replace monitoring. It depends on it. Telemetry is the largest source of signal an assurance function has. The relationship is that of a measurement to a conclusion.

## Evidence: an observation is not a proof

Monitoring produces observations. A metric had this value, a log line was written, a trace took this long. An observation becomes evidence when three things are added: a test that could have failed, a record of what was tested and when, and retention long enough for the question to be asked later.

The difference shows most clearly in silence. An alert that has not fired has two possible meanings. The condition did not occur, or the alert could not have detected it. Monitoring, read on its own, cannot tell them apart. A query that matches nothing evaluates as healthy. A log shipper that has passed its end of life continues to ship: Promtail reached end of life on 2 March 2026, and an installation of it still runs and is no longer updated. Nothing in the telemetry announces either condition.

The other functions have their own version of the gap.

- **Audit** gathers real evidence, and gathers it for a period. The sample is sound for the dates it covers. The estate continues to change after the fieldwork ends, and the report does not.
- **A managed service** produces records of activity: tickets handled, patches applied, requests fulfilled. These prove that work was done. They do not prove that the outcome the work was for is being met.
- **Assurance** holds tested results, each attributable to a version of the system and a point in time, and treats each as having an age. When the system changes, or the result is older than its agreed validity, the result stops counting.

The practical test is simple. For any green indicator, ask when the check behind it last failed on purpose. If nobody knows, the indicator is an observation.

## Threshold: who drew the line, and why there

Every function measures against something. What it measures against decides what it can conclude.

Monitoring thresholds are set by engineers, for a sound engineering reason: to page a person when action is needed and not otherwise. The Google SRE Workbook gives recommended starting parameters for alerting on service level objectives. A burn rate of 14.4 over one hour pages. A burn rate of 6 over six hours pages. A burn rate of 1 over three days raises a ticket. These are good defaults, and they are defaults about alerting. They manage the attention of the on-call team.

Consider what the third line means. A service consuming its error budget at exactly the sustainable rate produces a ticket, not a page. That is the correct alerting decision. It is also how a degradation that lasts for weeks proceeds with every alert behaving as designed. The alerting threshold was never meant to state what the business can tolerate.

Audit measures against a control framework, which says what controls should exist. A managed service measures against its service description, which says what activity is owed. In both cases the line was drawn before anyone asked what this business, with this process, stands to lose.

An assurance threshold starts from the other end. Microsoft's Azure Well-Architected guidance makes the same point about reliability: define outcomes per critical user flow, not as generic uptime, and check that targets are achievable given dependencies outside the team's control. The threshold is set by the consequence of being wrong. It has a named owner in the business who can change it. Engineering convention is an input.

## Ownership: what happens after the signal

The third difference is what each function does when it finds something wrong. In every case except one, it tells someone else.

| Function | What it produces | Who then owns the problem |
|---|---|---|
| Monitoring | An alert | Whoever is on call |
| Audit | A finding | Management, through a response |
| Managed service | A ticket or an escalation | The provider for in-scope work, the client for everything else |
| Continuous assurance | A change of state and a corrective action | The assurance function, until closure is verified |

The managed service row needs care, because a managed service does own work. What it owns is the activity in its service description. When the cause of a problem sits outside that scope, in an application, a supplier or a design decision, the ticket is escalated to the client. That is the contract working correctly. The outcome has no single owner across the boundary.

Audit independence produces a similar result by design. An auditor who fixed what they found would be auditing their own work next year. The finding is therefore handed over, and its progress is tracked by someone else.

Assurance takes a different position. The function that holds the evidence also carries the correction, within the access it has been granted and through the enterprise's own change process. Decisions that belong to the business, such as accepting a risk, are returned to the business and recorded with an owner and an expiry date. The point is that the item is never without an owner, and is not closed by being passed on.

This has a cost that should be stated. A function that owns correction needs access, and access is a risk. Standing access that is read-only, with elevation requested for a specific approved change, is the trade that keeps ownership from becoming a new exposure.

## Closure: the alert cleared, so is it fixed?

Each function has a natural end state, and the end states are not equivalent.

An alert clears when the metric returns inside its limit. That can happen because the fault was corrected. It can also happen because traffic fell overnight, a retry succeeded or the instance was restarted. A ticket closes when the assignee marks the work complete. A finding closes when a management response is accepted and, later, when a follow-up review samples the control again.

None of these is a test of the outcome. Verified closure is: the condition that caused the loss is reproduced or probed, and the system is shown to behave correctly. A restore is performed and timed. A removed permission is exercised and refused. A faulty release is submitted and stopped. The closure record holds the result of that test.

The distinction matters most for recurrence. A problem closed by status returns as a new problem with a new ticket number. A problem closed by re-test, if it returns, reopens against the same record. Only the second makes recurrence visible.

## One event, seen four ways

The following example is illustrative. A customer-facing service depends on a nightly job that refreshes reference data. After a platform upgrade, the job continues to run and complete, but it processes an empty input.

**Monitoring** shows the job as successful. Duration is shorter than usual, which no alert was written to notice. Service metrics are normal, because serving stale reference data is not an error.

**The managed service** applied the platform upgrade as scheduled and closed the change ticket. The upgrade succeeded.

**Audit**, some months later, samples the job's change records and finds them in order.

**Assurance** holds a threshold on the age of the reference data at the point of use, agreed with the owner of the customer process. The evidence is a probe that compares the data served with the source. After the upgrade the earlier result is treated as expired, because the platform it was gathered on has changed. The probe is re-run, the age exceeds the tolerance, and the state moves to At risk. A corrective action is opened and owned. It closes when the probe shows current data across a full cycle.

Every function behaved correctly. Only one was asking whether the outcome held.

## How to tell which one is in place

Many enterprises believe they have assurance because they have extensive monitoring and a clean audit. Five questions separate the two.

1. For each critical outcome, is there a threshold that a named person in the business agreed and can change?
2. Does the evidence for it have a date, and a rule for when it expires?
3. When evidence is missing, is that reported as unknown, or does it default to green?
4. When the threshold is breached, does one party own the correction across team and supplier boundaries?
5. Is closure recorded by a re-test, with the result retained?

A "no" to any of them describes a gap that more dashboards will not close. Detection itself has to be proven, which is the subject of [Production Observability Assurance](/production-observability-assurance). The model that holds the answers as a current position is described in [Assurance is a state, not a report](/assurance-is-a-state-not-a-report).

Monitoring is necessary. So is audit, and for many enterprises so is a managed service. Assurance is the function that connects what they produce to a standing answer: the outcome is proven, or it is not, and someone is accountable for the difference.
