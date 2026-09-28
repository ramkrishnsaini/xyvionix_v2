---
title: The disaster recovery plan that has never been tested is not a plan
h1: A recovery objective that was never timed is a total with no measured parts
seoTitle: 'Why an Untested Disaster Recovery Plan Fails | Xyvionix'
description: >-
  A recovery time objective is a sum of serial phases, most of them never
  measured. Where paper and practice part, and how a first exercise turns the
  total into evidence.
summary: >-
  Recovery runs as a chain of phases and the plan holds only the total. This
  article locates the four places the chain breaks, gives a phase-by-phase time
  budget, and sets out the design choices that decide what a first exercise
  proves.
lede: >-
  An untested disaster recovery plan fails because its recovery time objective
  is a single figure standing in for a chain of serial phases, and only one of
  those phases was ever estimated. Declaration, access, infrastructure, data,
  start-up order, traffic and verification each take time, and their overruns
  add. A first exercise is worth running for one reason: it replaces the total
  with measured parts, each with a date.
ogQuestion: Which phase of recovery has the plan never measured?
category: Production Reliability
author: Xyvionix Research
featured: false
cluster: reliability
secondary: []
parent: insights
state: unassured
audience:
  - CTO
  - CIO
  - Head of SRE
  - Technology Risk
intent: >-
  Why recovery objectives on paper diverge from recovery in practice: dependency
  order, stale runbooks, restore that was never timed, credentials that live in
  the failed region. How to structure a first exercise and what evidence it
  produces.
related:
  assurance:
    - disaster-recovery-assurance
    - production-reliability-assurance
  useCases:
    - untested-disaster-recovery
  technologies:
    - aws-production-reliability
    - azure-production-reliability
  industries:
    - financial-services
    - healthcare
  insights:
    - cloud-drift-production-risk
    - why-production-incidents-recur
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  - title: 'AWS post-event summary: Amazon DynamoDB service disruption in US-EAST-1, October 2025'
    url: 'https://aws.amazon.com/message/101925/'
  - title: 'Azure status history: post-incident review FNJ8-VQZ, 2 to 3 February 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=FNJ8-VQZ'
  - title: 'Azure status history: post-incident review GHRP-84G, West US 2, 29 to 30 May 2026'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=GHRP-84G'
  - title: 'AWS Backup: restore testing'
    url: 'https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html'
  - title: 'AWS Resilience Hub user guide'
    url: 'https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html'
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

## The plan holds a total, and recovery is a chain

A recovery time objective is written as one figure. Recovery is a chain of phases that run in series. Someone with authority declares. Operators obtain access. Infrastructure is brought up in the recovery location. Data is restored or promoted. Applications start in the order their dependencies allow. Traffic is moved. Someone confirms that the service does what the business needs.

The figure in the plan was usually sized from the phase that is easiest to estimate, which is the technical restore. The other phases were assumed to be short, or were not considered.

The phases are serial, so each waits for the one before it. A slow phase is never recovered by a fast one later. An optimistic assumption in each of seven phases produces a total that is wrong by the sum of all seven, and every error points the same way.

That is the argument of this article. The gap between the objective on paper and recovery in practice is structural. It sits in identifiable phases and stays invisible until the phases are timed separately. A document whose central figure has no measured parts is a statement of intent. It becomes a plan when someone has run it.

## Four places where paper and practice part

### Dependency order

A plan lists systems. Recovery needs a sequence. Identity, secrets and name resolution come first, then data stores, then the services that read them, then the edge.

The sequence in the plan reflects the architecture on the day the diagram was drawn. Services added since then have dependencies that nobody placed in the order, and some are circular. A configuration service reads from a database whose password is held in a secrets store that takes its own settings from the configuration service. In steady state the circle is harmless, because everything is already running. From a cold start, nothing in it can start first. No review of the document finds this.

### Runbooks that aged in place

A runbook is written by the person who knows the system best, and that is its weakness. The author leaves out what seems obvious.

Steps also acquire dependencies that are not visible in the text. AWS advises using only data-plane operations during failover, because control planes have lower availability design goals, and warns that auto scaling during recovery is a control-plane dependency. A step that reads "scale the group to production size" looks safe. It is a request to the part of the provider most likely to be impaired during a regional event.

AWS's post-event summary of the US-EAST-1 disruption of October 2025 shows the scale of the effect. DNS failures for the DynamoDB regional endpoint began at 11:48 PM PDT on 19 October and DNS was restored at 2:25 AM on 20 October. EC2 instance launches remained impaired until 1:50 PM. A runbook step that needed to launch instances in that Region was blocked long after the original fault had cleared.

### A restore that was never timed

A successful backup job proves that a copy was written. It says nothing about how long the copy takes to restore. Restore duration grows with data volume, so a figure that was accurate when the plan was written is wrong now.

Provider tooling supplies part of the answer. AWS Backup restore testing runs scheduled restores and records the duration of each restore job, which is a measurement at the data layer. AWS Resilience Hub estimates from configuration whether a workload meets its targets, which is a model. Neither is the time for an application to serve again.

A further phase hides inside the restore. AWS states that for data corruption or deletion, the recovery point is always before the disaster was discovered. The latest copy may be the damaged one. Deciding which recovery point is clean takes time, and no plan allots any.

### Credentials that live in the failed region

This is the least examined of the four and the one that stops recovery earliest.

Operators have to authenticate before they can act. Workloads have to obtain tokens before they can start. The delivery pipeline has to run before anything can be deployed. If the identity service, the secrets store, the key management service or the pipeline sits in the failed location, or depends on it, recovery halts at its first step.

Provider reports show that these services fail alongside the rest. AWS's summary of October 2025 lists STS among the services impacted. Microsoft's post-incident review of 2 to 3 February 2026 (tracking ID FNJ8-VQZ) describes retry amplification overwhelming the managed identity backend, and lists Managed Identities, GitHub Actions and Azure DevOps among the services affected. In both events the means of acting was impaired together with the thing to be acted upon.

## A recovery time budget, phase by phase

The practical remedy is to stop treating the objective as one figure. It is a budget, and each phase has an allowance that can be compared with a measurement.

| Phase | What the plan tends to assume | What breaks the assumption | What a timed exercise records |
|---|---|---|---|
| Detection to declaration | The decision is immediate | Authority to declare is unclear, or the team waits for the provider to recover | Time from first alert to declaration, and who declared |
| Access | Operators sign in as usual | Identity, secrets or keys depend on the failed location | Time to the first authenticated action in the recovery location, and the credential path used |
| Infrastructure | The environment is defined and ready | Drift, quotas set for an older footprint, control-plane calls | Time to reach production capacity, and every control-plane call made |
| Data | The restore completes in the estimated time | Volume growth, and the search for a clean recovery point | Restore duration, the recovery point chosen and the data lost |
| Application start | Services start when asked | Dependency order, circular dependencies | The start sequence observed, and each start that failed |
| Traffic | A routing change moves users | Certificates, allow-lists and endpoints held by other parties | Time to the first real request served |
| Verification | A passing health check | Health checks do not exercise the business transaction | Time to a named business transaction completing |

### An illustrative result

The figures in this example are illustrative. A service has a recovery time objective of four hours. When the plan was written, three hours were allowed for the data restore and one hour for everything else.

| Phase | Measured in the exercise |
|---|---|
| Detection to declaration | 40 minutes |
| Access | 35 minutes |
| Infrastructure | 55 minutes |
| Data | 150 minutes |
| Application start | 70 minutes |
| Traffic | 25 minutes |
| Verification | 20 minutes |
| Total | 6 hours 35 minutes |

The restore, which was the phase everyone worried about, finished inside its allowance. The other six phases took 245 minutes against an allowance of 60. None of the overrun came from the phase the plan had studied. A single total would have reported a failure. The budget reports where the time went.

## Design choices that decide what the first exercise proves

How to scope a first exercise to one service and one scenario is set out in [Untested Disaster Recovery](/untested-disaster-recovery). Inside that scope, five design choices decide how much the result is worth. Each is a trade between safety and the honesty of the measurement.

**Announced or unannounced.** An announced exercise is safer and is the right choice the first time. It also flatters the first phase, because the people are assembled and the decision is already made. The record should say that declaration was not measured.

**Author or another operator.** If the author of the runbook runs the exercise, the exercise measures the author. A different operator executes the steps while the author observes. Every question put to the author is a finding.

**Primary reachable or severed.** This is the rule that matters most. For the length of the exercise, the primary location is treated as unreachable for everything: credentials, secrets, the pipeline, the artefact registry and the wiki that holds the runbook. Any step that reaches back is recorded as a failed step. Without this rule the credential dependency is satisfied without anyone noticing.

**Isolated environment or live traffic.** An isolated recovery measures access, infrastructure, data and start-up. It does not measure traffic, and the record marks that phase as unproven.

**One clock or several.** A timekeeper who is not operating records a timestamp at each phase boundary. One start time and one end time produce a total, which is what the plan already had.

The exercise produces five things that did not exist before it: a timing record by phase, the start sequence that worked, every step taken that the runbook did not contain, every reach back to the primary, and a measured recovery point.

## Evidence with a date

The result describes production as it stood on the day of the exercise. It begins to age at once, and the causes are ordinary.

Production grows. AWS advises making sure that service quotas in the recovery Region are high enough, and a quota that was sufficient last year can fall short of this year's footprint. New services join the dependency order. Configuration changed by hand moves production away from the definition that the recovery location is built from, which is the subject of [Cloud drift as production risk](/cloud-drift-production-risk).

The provider's own recovery sets a floor under all of it. In Microsoft's post-incident review of the West US 2 event of 29 to 30 May 2026 (tracking ID GHRP-84G), compute recovery took about 8 hours and storage validation about 14 hours. An objective shorter than that holds only if recovery to another location has been shown to work. Microsoft's reliability guidance asks for drills that cover failback as well as failover.

A service whose recovery has never been timed is Unassured. Its condition is unknown, which is different from acceptable. A timed exercise that misses the objective moves it to At risk, and that is progress, because the overrun now has a location. A timed exercise inside the objective makes it Assured for the footprint that was tested, until that footprint moves. How the position is then held as continuing evidence is described in [Disaster Recovery Assurance](/disaster-recovery-assurance).

The plan that has never been tested contains one figure that nobody measured and seven assumptions that nobody wrote down. The first exercise does not need to succeed. It needs to be timed by phase, run without the primary and recorded with its date.
