---
title: 'What change failure rate proves, and what it does not'
h1: Change fail rate is evidence about the gates, not a score for the team
seoTitle: 'What Change Failure Rate Proves and What It Cannot | Xyvionix'
description: >-
  Change fail rate is a ratio with two counts that can each be moved. What the
  DORA research definition covers, where it misleads, and how to hold it as a
  threshold.
summary: >-
  The metric shows how often the release process let through a change that
  needed intervention. It does not show severity, exposure or latent faults.
  This article sets out counting rules, companion measures and its use as a
  threshold.
lede: >-
  Change fail rate proves one thing: over a stated period, under stated
  counting rules, a known share of deployments needed immediate intervention.
  That is evidence about the release process that approved them. It is not a
  measure of engineering quality, it carries no information about how bad each
  failure was, and it is silent on faults that have not yet been triggered.
  Used as a scorecard it rewards recounting. Used as a threshold with a
  consequence it is one of the most useful figures a technology leader has.
ogQuestion: What does change failure rate prove about a release process?
category: Change Assurance
author: Xyvionix Research
featured: false
cluster: change
secondary:
  - reliability
parent: insights
state: assured
audience:
  - VP Engineering
  - Head of SRE
  - CTO
intent: >-
  The metric is easy to flatter. Covers current definitions from research, what
  counts as a failed change, measurement traps, pairing with recovery time and
  rework, and using it as a threshold rather than a scorecard.
related:
  assurance:
    - release-assurance
    - rollback-readiness-assurance
    - change-assurance
  useCases:
    - high-change-failure-rate
  technologies:
    - eks-reliability-assurance
  industries:
    - software-technology
    - saas-production-reliability
  insights:
    - error-budgets-without-consequence
    - why-production-incidents-recur
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'DORA: software delivery performance metrics'
    url: 'https://dora.dev/guides/dora-metrics/'
  - title: 'DORA: research'
    url: 'https://dora.dev/research/'
  - title: 'Google Cloud: announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The definition, as it stands today

Most writing on this metric uses names and groupings that the research programme behind it has since changed. The current position matters, because the changes were made to close gaps in the older version.

DORA research now defines five software delivery performance metrics, in two groups. Its guide to the metrics is dated 5 January 2026.

| Group | Metrics |
|---|---|
| Throughput | Change lead time, deployment frequency, failed deployment recovery time |
| Instability | Change fail rate, deployment rework rate |

Three of the definitions matter for this argument. Change fail rate is "the ratio of deployments that require immediate intervention following a deployment". Deployment rework rate is "the ratio of deployments that are unplanned but happen as a result of an incident in production". Failed deployment recovery time is "the time it takes to recover from a deployment that fails and requires immediate intervention".

Three points follow. The name is change fail rate. "Change failure rate" is the older and still more common spelling, and this article uses the current one from here on. "Four key metrics" is out of date, since there are five. Recovery time is grouped with throughput, not with instability, and is scoped to failed deployments. It is not a general mean time to restore.

The source here is the DORA research programme on software delivery. It is unrelated to the EU regulation that shares the acronym.

## What the ratio is able to prove

A ratio proves what its two counts prove, and no more.

The denominator is the number of deployments in a period. The numerator is the number of those deployments that needed immediate intervention. If both counts are taken from records, under rules that did not change during the period, the result is a fact: this share of changes reached production in a state that someone had to correct straight away.

Every one of those changes was approved. Each passed review, tests, a pipeline and whatever staged exposure was in place. The rate is therefore a measure of how often the approval system was wrong. That is the most useful reading of it. It is evidence about the gates, and it points at the gates when it moves.

It is weaker evidence about people. A team that ships difficult changes through thin gates and a team that ships trivial changes through thick ones can report the same figure. The number does not separate them.

## What it cannot prove

Four things are outside the reach of the ratio, however carefully it is counted.

**Severity.** A failure that inconvenienced a handful of internal users and a failure that stopped payments each add one to the numerator.

**Exposure.** A fault caught at the first stage of a progressive rollout and a fault caught at full exposure count the same. The first is the release process working. The second is the release process failing. A rate that cannot tell them apart will penalise a team for having a canary that does its job.

**Latent faults.** The definition refers to immediate intervention following a deployment. A change that ships cleanly and fails weeks later, when some other change or condition reaches it, was a success on the day it was counted. The rate for that period is never restated.

**Changes that are not deployments.** A feature flag flipped in a console, a configuration value edited in place, a database migration run by hand and an infrastructure change applied outside the pipeline are all changes to production. Whether they appear in either count depends on a decision that is usually made by whoever built the dashboard.

## How the figure is flattered

The metric is easy to improve without improving anything. None of the following requires bad faith. Each is a reasonable local decision about counting.

| Counting decision | Effect on the figure | What it hides |
|---|---|---|
| Only declared incidents count as failures | Numerator falls | Quiet rollbacks and same-day patches |
| Fix-forward deployments are counted as ordinary deployments | Denominator rises | Rework, which is the cost of the failure |
| Deployments are split into smaller units for counting | Denominator rises | Nothing changed in what reached customers |
| Configuration and flag changes are excluded from failures but included in deployments | Both counts move in the flattering direction | An ungated route into production |
| The attribution window is shortened | Numerator falls | Failures that take longer than the window to appear |
| Failures are attributed to the platform or a dependency | Numerator falls for the team | The change that triggered the failure |

The common thread is that the person who benefits from the figure also defines it. A metric used to rank teams will be recounted by the teams it ranks. This is the mechanism by which a scorecard destroys the information it was built to show.

### An illustrative comparison

The figures in this example are illustrative. Two teams report the same change fail rate for a quarter.

| | Team A | Team B |
|---|---|---|
| Deployments | 200 | 20 |
| Deployments needing immediate intervention | 20 | 2 |
| Change fail rate | 10% | 10% |
| Where failures were detected | First rollout stage | Full exposure |
| Failed deployment recovery time, typical | Minutes | Most of a day |
| Unplanned deployments caused by incidents | 20 | 6 |

Team A has a release process that catches faults early and reverses them quickly. Team B has a process that exposes every customer to each fault and needs three attempts to correct it. On the rate alone they are equal. Team B's figure is also far less stable: with 20 deployments, one failure more or less moves the rate by five points, so a single quarter says little about the trend.

## The companions that make it readable

The five metrics are designed to be read together, and three of the pairings close specific gaps.

**Deployment rework rate closes the hotfix gap.** A failed deployment that is followed by unplanned corrective deployments lowers change fail rate if those corrections are counted as ordinary deployments. Rework rate counts them for what they are. If change fail rate falls while rework rate rises, failures have been moved between counts, not removed.

**Failed deployment recovery time supplies part of the severity that the rate lacks.** It does not measure customer impact directly, but a process that recovers in minutes and one that recovers in hours are different processes. Recording the route used for each recovery, whether rollback, flag or fix-forward, shows whether the reverse path exists in practice. That capability is held in [Rollback Readiness Assurance](/rollback-readiness-assurance).

**Deployment frequency guards against the freeze.** The fastest way to improve change fail rate is to stop deploying. A rate that improves while frequency collapses has proved nothing about the gates.

The wider context makes the pairing more urgent. The 2025 DORA report, the latest edition, drew on nearly 5,000 respondents. It found that 90% use AI at work, that AI adoption has a positive relationship with software delivery throughput, and that it continues to have a negative relationship with software delivery stability. More change is arriving at the same gates. A throughput figure that rises on its own is not good news until the instability figures are read beside it.

## A threshold, not a scorecard

A scorecard compares teams and rewards the best figure. A threshold states a boundary agreed in advance and what happens when it is crossed. The same number behaves very differently in the two roles.

Five conditions turn change fail rate into a threshold that can carry weight.

1. **The counting rules are written and versioned.** What counts as a deployment, what counts as an intervention, which change routes are included and how long the attribution window is. A change to the rules is recorded, and figures from before and after are not compared as if they were the same measure.
2. **Both counts come from records.** Each intervention is linked to the deployment that preceded it. Where that link does not exist, the figure is an estimate and should be labelled as one.
3. **The boundary is set by the business outcome.** The basis is how much release-caused disruption the service and its customers can absorb. It is not an industry league table. A payment service and an internal reporting tool do not share a boundary.
4. **Crossing it has a consequence that was agreed beforehand.** Smaller releases, longer holds, a pause on one class of change. If nothing is decided when the line is crossed, the figure is a statistic.
5. **The figure has an age.** A rate calculated last quarter describes last quarter's pipeline. When the gates, the delivery tooling or the volume of change moves, the earlier figure stops being evidence about the present.

The fifth condition is the one most often missed. A low rate is read as a standing property of the team. It is a result obtained under conditions that have since changed. Where no current figure exists under known counting rules, the honest state is Unassured: the condition of the release process is unknown, which is different from good.

## What this means for assurance

Change fail rate is a lagging measure. It reports that the gates failed after customers have met the result. Its value in an assurance model is as a check on the leading evidence, not as a replacement for it.

The leading evidence is whether each gate can still fail: whether a deliberately faulty release is stopped, whether rollout analysis halts on missing data, whether the reverse path works inside the time allowed. That evidence is described in [Release Assurance](/release-assurance). If every gate is shown to work and the rate still rises, a class of failure exists that no gate tests. If the rate is low and the gates cannot be shown to fail, the low rate is luck that has not yet run out.

Read that way, the metric earns its place. It is a periodic test of whether the release process is as good as its own evidence says. The practical steps for an enterprise whose rate has already crossed its boundary are set out in [High Change Failure Rate](/high-change-failure-rate).

The position of this article can be stated briefly. Change fail rate proves how often the approval system was wrong, under the rules by which it was counted. Fix the rules, pair it with rework, recovery and frequency, attach a consequence, and date the result. Without those, it is a number that improves whenever someone needs it to.
