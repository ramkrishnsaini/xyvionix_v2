---
title: 'Assurance is a state, not a report'
h1: A report describes the day it was written. A state describes today
seoTitle: 'Assurance Is a State, Not a Report: The Four States | Xyvionix'
description: >-
  Why point-in-time attestation describes the past, how evidence expires, and
  how four states (Assured, Degrading, At risk, Unassured) describe the
  present.
summary: >-
  A report is true on its date and ages from then on. A state is held against
  current evidence and changes when the evidence does. This article sets out
  the four states, how evidence expires, and why unknown is not the same as
  failing.
lede: >-
  Assurance is a state: a current position on whether an agreed outcome is
  proven, held against evidence that has an age. A report is a record of what
  was found on a date. Technology changes continuously and on calendars the
  enterprise does not control, so a report begins to lose its meaning as soon
  as it is issued. Four states describe the present instead: Assured,
  Degrading, At risk and Unassured. The fourth, which says that nothing is
  currently known, is the one most reporting leaves out.
ogQuestion: Is your assurance a current state or a dated report?
category: Assurance Practice
author: Xyvionix Research
featured: false
cluster: category
secondary: []
parent: insights
state: assured
audience:
  - CIO
  - CTO
  - CISO
  - Technology Risk
intent: >-
  The founding argument of the category. Point-in-time attestation describes the
  past; the four-state model (assured, degrading, at risk, unassured) describes
  now. Explains evidence expiry and why 'unassured' is distinct from 'failing'.
related:
  assurance:
    - ai-assurance
    - production-reliability-assurance
    - cyber-exposure-assurance
  useCases:
    - ai-audit-readiness
    - untested-disaster-recovery
  technologies: []
  industries:
    - financial-services
  insights:
    - continuous-assurance-vs-monitoring
    - security-findings-vs-verified-closure
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Kubernetes: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'Grafana Loki: Promtail'
    url: 'https://grafana.com/docs/loki/latest/send-data/promtail/'
  - title: 'Apache Airflow: supported versions'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/supported-versions.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 365
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## What a report is able to say

A point-in-time attestation makes a precise claim. On the dates examined, against the criteria stated, these controls were found to be in place. The claim is honest and it is useful. It is also a claim about the past, and it is read as a claim about the present.

The reader cannot easily do otherwise. A recovery test report from the spring is the most recent statement available on whether the service can be recovered, so it is the one that is used when the question arises in the autumn. The report does not say that it still holds. It does not say that it has stopped holding. It has no means of saying either.

Between the two dates the system has been released to many times, its data has grown, its dependencies have been upgraded and its suppliers have changed their terms. Some of what changed was outside the enterprise altogether. Ingress NGINX, a Kubernetes ingress controller, was retired by its project in March 2026 and receives no further fixes. Promtail reached end of life on 2 March 2026. Apache Airflow 2 reached end of life on 22 April 2026. In each case the software went on running exactly as before. An estate that passed a review in February contained an unsupported component by May, and nothing in the estate had been touched.

This is the central difficulty. A report can be wrong without anyone having made a mistake. The finding was correct. The world moved.

## Why producing reports more often does not solve it

The usual response is frequency. An annual review becomes quarterly, then monthly. This narrows the gap and leaves the structure intact. A monthly report is still a series of photographs, and three problems remain.

**The reader still has to infer the present.** Between reports there is no statement. A change on the second day of the month is unexamined for the rest of it.

**The report is organised by the reviewer's calendar.** Evidence expires when the system changes or when an external date passes. Neither follows a reporting cycle. A review scheduled for the end of the quarter examines a release that shipped at the start of it, after customers have already met the result.

**Absence is invisible.** A report lists what was examined. What was not examined is simply missing from the page. A reader sees a set of green results and has no way to see the checks that did not run.

A state addresses each of these. It is a value that is held continuously, that changes on events, and that has an explicit way to say that nothing is known.

## Evidence has an age

The idea that makes a state possible is that evidence expires. A tested result is attributable to a version of the system and a moment in time. It stops counting when either has moved far enough.

| What expires the evidence | Example | Who controls the timing |
|---|---|---|
| Time | A restore test older than its agreed validity | The enterprise, by setting the validity |
| Change to the system | A model, a schema or a platform version is replaced | The enterprise's delivery teams |
| Change outside the system | A vendor ends support or alters a default | The vendor |
| Change to the requirement | The business tightens a tolerance, or a new consumer arrives | The business |
| Change to the scope | A new service joins a critical journey | The enterprise |

Two consequences follow. Validity is a decision, made per kind of evidence and set by the consequence of being wrong. A result that protects a payment service is allowed to age for less time than one that protects an internal report. And expiry has to be triggered by events as well as by the clock, which means the assurance function has to know when a change has happened.

Expiry is not a judgement that something is wrong. It is a statement that the proof no longer applies to the system as it now stands.

## The four states

Each outcome under assurance holds exactly one of four states at any moment.

| State | Meaning | What follows |
|---|---|---|
| Assured | Current evidence proves the outcome is being met within threshold | Evidence continues to be gathered |
| Degrading | Evidence shows movement toward the threshold | Corrective action begins here, before a breach |
| At risk | The threshold is breached. The outcome can no longer be proven as agreed | Correction is owned until a re-test confirms it |
| Unassured | No current evidence exists. The condition is unknown, not acceptable | Evidence is gathered before anything else is concluded |

Three features of the model carry most of its value.

**The state belongs to an outcome.** It is attached to something the business named: a claim decision can be explained, a service recovers inside its tolerance, a cost per transaction holds its margin. A server does not have a state in this sense. An outcome does.

**Degrading exists so that action starts early.** A two-value model of pass and fail gives no warning. A trend toward the threshold is evidence in its own right, and the period before the breach is when correction is cheapest.

**Only evidence moves the state toward Assured.** A deployment, a closed ticket or a statement that the fix is in place does not change it. The state returns to Assured when a re-test shows the outcome is met. The method is set out in full on [how assurance works](/how-assurance-works).

## Why Unassured is not the same as failing

Most reporting has two values, and a missing result quietly takes one of them. A check that did not run is usually shown as green, because nothing failed. Occasionally it is shown as red, because nothing passed. Both are false statements. The first hides exposure. The second raises an alarm about a system that may be perfectly healthy, and teaches people to ignore the colour.

Unassured is the third answer. It says that the condition of the system is not known. It may be meeting its outcome. Nobody can show that it is.

The two states call for different responses, which is the practical reason to keep them apart.

| | At risk | Unassured |
|---|---|---|
| What is known | The threshold is breached | Nothing current |
| First action | Correct the cause | Gather the evidence |
| Typical origin | A fault, a drift, a change that went wrong | An expired result, a check that stopped, a system never brought into scope |
| Risk to the business | Known and measurable | Unknown, so it cannot be priced or accepted |

The last row explains why unknown is described as not acceptable. An enterprise can decide to accept a known risk. It can record the decision, give it an owner and set a date to review it. It cannot accept a risk it has not measured. A decision taken on an Unassured system is taken on an assumption, and the assumption is usually that the last report still holds.

Unassured is also the most common state in an estate that has never been examined this way. That is uncomfortable and it is accurate. A first baseline often shows few outcomes At risk and many Unassured. The work that follows is mostly the gathering of evidence.

## An illustrative timeline

The following example is illustrative. A service has an agreed recovery time, and a recovery test is given a validity of six months.

| Event | State | Reason |
|---|---|---|
| Recovery test passes inside the agreed time | Assured | Current evidence proves the outcome |
| Successive backup restores take longer as data grows | Degrading | Evidence is moving toward the threshold |
| The database platform is upgraded to a new major version | Unassured | The test was run on a system that no longer exists |
| A new test is run and recovery exceeds the agreed time | At risk | The threshold is breached |
| The restore path is corrected and a further test passes | Assured | A re-test shows the outcome is met |

A report-based view of the same service shows one line: recovery test passed. That line is true throughout. It stops being informative at the third row and misleading at the fourth. The pattern is common enough to have its own page, [Untested Disaster Recovery](/untested-disaster-recovery).

## What the model costs, and what reports are still for

Holding a state costs more than producing a report. Evidence has to be gathered repeatedly, changes have to be detected, and someone has to own the state when it moves. The cost is controlled by scope. Not every system warrants a continuing position. The outcomes that do are the ones where being wrong is expensive and where the system changes often. For the rest, a periodic review may be the proportionate answer.

Reports do not disappear. Boards, auditors and regulators need a document with a date on it. The difference is in how the document is made. When a state is held, a report is a reading of it at a moment, with the evidence already retained behind each line. Nothing has to be reconstructed for the occasion. The report becomes an output of assurance and stops being a substitute for it.

The argument reduces to a change of question. A report answers whether the control was in place when someone looked. A state answers whether the outcome is proven now, and says so plainly when it is not. The areas in which Xyvionix holds that position are listed under [assurance](/assurance).
