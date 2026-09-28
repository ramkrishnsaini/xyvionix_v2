---
title: 'Findings closed, exposure open: remediation versus verification'
h1: 'A closed finding records work. A closed exposure is a fact about the asset'
seoTitle: 'Closed Findings vs Verified Closure in Security | Xyvionix'
description: >-
  A ticket closes when work is done. An exposure closes when a re-test of the
  running asset shows it. How fixes fail to hold, and a graded model of closure.
summary: >-
  A fix has to land in four places to hold: the running asset, the source it is
  rebuilt from, the declared configuration and the whole population. Closure
  should be recorded as a graded, dated claim that says which were observed.
lede: >-
  A closed security finding and a closed exposure are different records. The
  first says that work was done. The second says that a condition is absent
  from an asset as it runs, on a stated date. Fixes fail to hold because they
  land in one place and miss another: the running asset but not its image, the
  console but not the definition, one cluster but not the fleet. Closure
  therefore needs a grade that states what was observed, and a re-test that is
  repeated when the asset is regenerated.
ogQuestion: 'How many of your closed findings were ever re-tested?'
category: Cyber Exposure
author: Xyvionix Research
featured: false
cluster: cyber
secondary: []
parent: insights
state: risk
audience:
  - CISO
  - Security Engineering
  - Vulnerability Management
  - Internal Audit
intent: >-
  Informational: why a closed ticket and a closed exposure diverge, how fixes
  fail to hold, and what closure criteria based on re-test look like
related:
  assurance:
    - vulnerability-remediation-assurance
    - cyber-exposure-assurance
    - cloud-security-exposure-assurance
  useCases:
    - unverified-vulnerability-closure
    - security-remediation-backlog
  technologies:
    - eks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - healthcare
    - financial-services
  insights:
    - why-production-incidents-recur
    - assurance-is-a-state-not-a-report
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Verizon 2026 DBIR Executive Summary'
    url: 'https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf'
  - title: 'GitGuardian: The State of Secrets Sprawl 2026'
    url: 'https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/'
  - title: 'Azure Policy: exemption structure'
    url: 'https://learn.microsoft.com/en-us/azure/governance/policy/concepts/exemption-structure'
  - title: 'Kubernetes: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Two records that are treated as one

A remediation ticket is a work record. It closes when someone states that the change is complete, and every field in it describes an activity: who acted, what was changed, when, and who approved it.

An exposure is a condition of a running system. A version is present, a port is reachable, a credential is valid. The condition exists or does not exist whatever the ticket says.

The two records are joined by an assumption: that the change reached the right thing, everywhere it was needed, and that nothing has put the condition back since. The assumption is rarely tested. The Verizon 2026 Data Breach Investigations Report executive summary states that only 26% of critical vulnerabilities in the CISA Known Exploited Vulnerabilities catalogue were fully remediated by organisations in 2025, down from 38% the year before. These are vulnerabilities with known exploitation. The figure turns on the word "fully".

The argument here is that "closed" is too coarse a word to carry this. Closure should be recorded as a graded, dated claim about the asset, and the grade should say what was observed. A programme that records a single closed status cannot tell a fix that held from a fix that nobody looked at.

## A fix has to land in four places

A correction holds only when it is present in four places at once.

1. **The running asset.** The instance, container, node or tenant setting as it executes today.
2. **The source of regeneration.** The base image, machine image, chart values or template from which the asset will next be rebuilt.
3. **The declared configuration.** The infrastructure definition that the pipeline will apply on its next run.
4. **The whole population.** Every environment, region, cluster and account that carried the condition.

Most closures are recorded when one of the four is true. Each familiar failure is a fix that landed in one place and missed another.

| How the fix fails | Where it landed | Where it missed | When the condition returns | The observation that exposes it |
|---|---|---|---|---|
| Rebuild from an old image | The running asset | The source of regeneration | At the next build, scale-out or node replacement | A re-test after the first regeneration, matched to the running digest |
| Reverted configuration | The live setting | The declared configuration | At the next pipeline apply | Declared and observed values compared after that apply |
| Partial rollout | The first environment or cluster | The rest of the population | It never left | Assets observed counted against assets that carried the condition |
| Secret removed, not revoked | The repository | The issuer of the credential | It never left | A failed authentication with the old value |
| Exception that never expired | Nowhere: the fix was deferred | Everywhere | It never left | The exception register read by expiry date |

The second row runs in both directions: a manual change undoes a fix made in the definition just as the pipeline undoes a fix made in the console.

The fourth is the same failure in a different material. GitGuardian's State of Secrets Sprawl 2026 report found that, of credentials confirmed valid in 2022, 64% were still valid in January 2026. Removing the line from the code landed the fix in the repository. The credential was issued somewhere else, and that is where it stayed valid.

The fifth is not a failed fix at all, which is why it is the quietest.

## The exception is a closure with no end date

An exception removes a finding from the queue without removing the condition. It is granted for a reason: a patch that does not exist yet, a compensating control, an asset due for decommissioning. Each reason has its own life. The exception stays where it was put.

Platforms make this easy to miss. Azure Policy exemptions come in two categories, Mitigated and Waiver, and the expiration date is optional. Microsoft's documentation states that exempt resources count toward overall compliance. A compliance percentage can therefore be high because of what was exempted, and an exemption created without an expiry is a risk acceptance that nobody is asked to renew. Scanner suppressions behave the same way.

Retired software produces a related case. The Kubernetes project announced that best-effort maintenance of Ingress NGINX would continue until March 2026, with no further releases, bugfixes or security updates after that. No patch will arrive for a finding on software in that position. The only correction that can be re-tested is replacement, and a ticket closed as "no fix available" is an exception under another name.

Three rules turn an exception back into a decision:

- its expiry is no later than the expiry of the reason it was granted for
- its compensating control is tested as a correction would be, on the asset, with a dated result
- at expiry the finding returns to the queue with its original detection date, unless the owner renews it

## Closure as a graded claim

If a fix must land in four places, a closure record should say how many were observed. The grades below are a model for doing that. They are cumulative: each includes the one before.

| Grade | What the record rests on | What it proves | What remains unknown |
|---|---|---|---|
| 0. Asserted | A ticket transition or a statement | Someone believes the work is done | Everything about the asset |
| 1. Changed | A deployment record, merge or change approval | A change was released | Whether it reached the asset, and how many assets |
| 2. Observed | A re-test of the running asset, taken after the change | The condition was absent from that asset on that date | The rest of the population, and the next rebuild |
| 3. Observed across the population | A re-test of every asset that carried the condition | The condition was absent everywhere on that date | Whether the source or the definition will bring it back |
| 4. Held | A repeat observation after the first regeneration and the next pipeline apply | The fix is in the source and in the declared state | Later changes, which a standing check has to cover |

The closure criteria follow from the table. Grades 0 and 1 are reported as changed and unverified. A finding counts as closed at grade 3. It counts as verified closure at grade 4. The record keeps the grade, the date and the asset generation observed.

A re-test earns grade 2 or above only when it meets these conditions:

- it names the asset generation it observed: the host, the node or the image digest
- it was taken from the asset, by a means that does not read the change record
- the same check is shown to have detected the condition before the fix
- it states its denominator: how many assets carried the condition and how many were observed
- it is dated, and repeated on a regeneration event, with the calendar only as backstop

The third condition is the one most often skipped. A check that would have passed before the fix proves nothing after it.

## Measuring whether closures hold

Open-finding counts and remediation times are measures of work. Four further measures describe the closures themselves.

**Grade mix.** The share of closures in a period at each grade. It shows how much of the reported position rests on observation and how much on belief.

**Hold rate.** Of the closures that reached grade 2, the share still absent at the observation after the first regeneration. This is the measure that a ticket system cannot produce, because it requires looking again.

**Recurrence by route.** Each returned condition is classified by the place the fix missed. The distribution points to the correction that matters: a base image process, a pipeline rule, a rollout practice or an exception register.

**Verification lag.** The time between the change and the first observation. During the lag the condition is unknown, and the finding should be reported as such.

An illustrative example shows how the measures change a report. In this illustrative case a programme records 400 findings closed in a quarter. Classified by grade, 240 rest on a deployment record, 120 on a re-test of the running asset and 40 on a repeat observation after rebuild. The 240 are then observed. In 204 the condition is absent. In 36 it is present: 22 on assets rebuilt from an unchanged image, 9 where the rollout stopped short of the full fleet and 5 where a pipeline run reverted a manual change. The quarter's figure, in this illustrative case, becomes 364 closed and 36 open with their original detection dates. Most of the recurrences trace to one route, the image, and that is where correction starts.

## The costs of grading closure

The model has costs, and they decide how it is applied.

**Remediation time lengthens on paper.** A clock that stops at grade 4 includes the wait for the next rebuild, which for a long-lived asset can be months unless a regeneration is forced in a test environment. The answer is to report two intervals: time to change and time to verified closure. The first measures the team. The second measures the exposure.

**Observation is not free.** Re-testing every asset for every finding is justified for conditions with known exploitation on reachable assets. For low-consequence findings a sample may be enough. The sampling rule is a risk decision, and the owner of the business process should make it.

**Independence competes with knowledge.** The team that made the change understands best how to test it and is least independent of the result. The requirement is independence of the evidence. An automated observation read from the asset satisfies it, whoever runs it.

## What this means for assurance

A closure at grade 0 or 1 is not evidence of anything about the asset. The state of that finding is Unassured: the condition may be absent or present, and the enterprise cannot say which. That is a different position from At risk, where the condition is known, owned and timed.

Evidence of closure expires on events. A rebuild, a scale-out, a pipeline apply and an exception's end date each void what was observed before them, so the re-test is bound to those events.

The standard that closures are held to under assurance is set out in [Vulnerability Remediation Assurance](/vulnerability-remediation-assurance). The recovery of closures recorded before any such standard applied is described in [Unverified Vulnerability Closure](/unverified-vulnerability-closure). Agreement between declared and running configuration belongs to [Cloud Drift Assurance](/cloud-drift-assurance).

A board that is told a finding is closed hears a statement about the asset. The record should be able to support that statement, with a grade, a date and the name of what was observed.
