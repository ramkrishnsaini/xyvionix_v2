---
title: SLO Assurance
h1: Keep service level objectives true to what customers experience, and consequential
seoTitle: 'SLO Assurance: Valid Indicators, Enforced Budgets | Xyvionix'
description: >-
  Continuing proof that each service level objective still measures the
  customer journey, that burn is answered, and that the error budget changes
  decisions.
summary: >-
  An objective is evidence only while its indicator measures the journey and
  its error budget changes decisions. Indicator validity, data completeness,
  budget policy and burn response are each held against a threshold.
lede: >-
  SLO assurance is the continuing proof that each service level objective
  still measures a journey customers depend on, that its indicator is
  reporting, and that the error budget changes what the organisation does. An
  objective that reads as met while customers fail, or a budget that is spent
  with no effect on release decisions, is a number on a dashboard. It is not
  evidence about the service.
ogQuestion: Do your service levels still describe what customers experience?
kind: child
cluster: reliability
secondary: []
parent: production-reliability-assurance
state: assured
audience:
  - Head of SRE
  - VP Engineering
  - VP Platform
intent: 'Commercial: keeping service level objectives valid and consequential'
related:
  assurance:
    - production-observability-assurance
    - incident-recurrence-assurance
    - release-assurance
  useCases:
    - cloud-incident-recurrence
    - high-change-failure-rate
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - gcp-production-reliability
  industries:
    - saas-production-reliability
  insights:
    - error-budgets-without-consequence
    - continuous-assurance-vs-monitoring
evidence:
  - name: Journey and objective map
    detail: >-
      Each critical journey with the objective that covers it, the owner of
      that objective and the date the business last confirmed the target.
      Critical journeys with no objective are recorded as gaps.
  - name: Indicator definition history
    detail: >-
      The query, the data source and the point of measurement behind each
      indicator, with every change to them. A target that was met under one
      definition is not evidence under another.
  - name: Indicator completeness record
    detail: >-
      For each measurement window, whether the indicator received the data it
      expected. Attainment calculated on partial or absent data is marked as
      unknown.
  - name: Independent journey measurement
    detail: >-
      A second view of the journey, taken from the customer's side of the
      service, compared with the indicator on a schedule.
  - name: Error budget ledger
    detail: >-
      Budget consumed per window, the events that consumed it, and every
      exclusion with the reason and the person who approved it.
  - name: Budget policy decisions
    detail: >-
      Each occasion on which the policy was triggered, the decision that
      followed, and who made it. A waiver is a decision and is recorded as
      one.
  - name: Burn alert exercise results
    detail: >-
      Results of exercising fast and slow burn alerts, showing that each
      produces a page or a ticket that reaches an owner.
thresholds:
  - signal: Critical journeys covered by an owned objective
    basis: The journeys the business has named as carrying revenue or obligation
    lostWhen: A critical journey has no objective, or its objective has no owner in role
  - signal: Agreement between the indicator and an independent measurement
    basis: The amount of customer-visible failure the business will accept going unmeasured
    lostWhen: The two views of the journey diverge beyond the agreed tolerance for consecutive windows
  - signal: Indicator data completeness
    basis: An objective can only be judged on data that arrived
    lostWhen: The indicator returns absent or partial data for longer than the agreed gap, whatever attainment it reports
  - signal: Error budget policy followed
    basis: The release and change decisions the business has agreed to tie to the budget
    lostWhen: The budget is exhausted and the policy action is neither taken nor waived by a named owner
  - signal: Sustained slow burn without an owner
    basis: The measurement window of the objective and the rate at which budget can be lost without paging
    lostWhen: A slow burn ticket remains unowned or unanswered beyond the agreed period
  - signal: Target against dependency commitments
    basis: The service levels and observed recovery of the providers on the journey's dependency chain
    lostWhen: A dependency changes so that the target is no longer achievable and the target has not been reviewed
faqs:
  - q: Service level objectives and dashboards are already in place. What does assurance add?
    a: >-
      It tests whether the objectives are still true. That means checking the
      indicator against an independent view of the journey, checking that data
      is arriving, and checking that an exhausted budget produced the decision
      the policy describes. A dashboard does not run any of these tests on
      itself.
  - q: Who sets the target?
    a: >-
      The business does. The target expresses how much failure a journey can
      absorb before customers, revenue or obligations are affected. Xyvionix
      supplies the evidence for that decision, including what the dependency
      chain can support, and holds the agreed target as the threshold.
  - q: Should provider outages be excluded from the error budget?
    a: >-
      The customer experienced the failure whoever caused it, so the journey
      view counts it. Whether it counts against a team's budget is a policy
      decision for the business. Assurance requires that every exclusion is
      recorded with a reason and an approver, so that the budget cannot be
      restored by reclassification.
sources:
  - title: 'Google SRE Workbook: Alerting on SLOs'
    url: 'https://sre.google/workbook/alerting-on-slos/'
  - title: 'Google Cloud service health: incident summary'
    url: 'https://status.cloud.google.com/summary'
  - title: 'Azure Well-Architected Framework: reliability design principles'
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles'
  - title: 'Google Cloud Well-Architected Framework: reliability pillar'
    url: 'https://docs.cloud.google.com/architecture/framework/reliability'
  - title: 'Kubernetes v1.37 release announcement'
    url: 'https://kubernetes.io/blog/2026/08/26/kubernetes-v1-37-release/'
  - title: 'Microsoft Learn: AKS Automatic'
    url: 'https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic'
  - title: 'Google Cloud incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
  - title: 'Azure status history: post-incident review FNJ8-VQZ'
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

## Why assurance is lost

A service level objective is written against a journey as it was instrumented on one day. It stays on the dashboard long after the journey, the telemetry or the organisation has moved. Five things separate the number from the service.

**The journey changes and the indicator does not.** A checkout gains a fraud check served by a third party. A mobile client starts calling a new endpoint. The indicator still counts successful responses on the old path at the load balancer. It is accurate about something customers no longer do.

**The indicator stops reporting.** A telemetry pipeline upgrade renames an attribute, a scrape target loses access after a platform upgrade, or a query starts returning an empty series. Most tooling evaluates an objective with no data as an objective with no breach. The detection side of this problem is covered in [Production Observability Assurance](/production-observability-assurance).

**The target stops being achievable.** Microsoft's reliability guidance says service level targets must be achievable given dependencies outside the team's control. Those dependencies change. Kubernetes v1.37 moved scale-to-zero for the Horizontal Pod Autoscaler to beta. A service that adopts it adds start-up time to the first request after an idle period, and a latency objective set before that decision no longer describes the service.

**The budget stops changing decisions.** The policy says that releases pause when the budget is spent. The first time, an exception is granted for a commercial deadline. By the third time the exception is the practice.

**The burn is too slow to page.** The Google SRE Workbook's recommended starting parameters page at burn rates of 14.4 and 6, and raise a ticket at a burn rate of 1 measured over three days. A ticket competes with every other ticket. Google Cloud's status history records a network degradation for traffic from Delhi, Chennai and Mumbai that began on 5 June 2026 and lasted more than 21 days. A degradation of that length consumes budget steadily and may never cross a paging threshold.

## What is at stake

The service level objective is the instrument through which the business decides how much change production can take. When the instrument is wrong, the decisions made with it are wrong in a direction nobody chose.

If it reads better than the service, releases continue while customers are failing, and support teams learn of the problem before engineering does.

If it reads worse than the service, releases are held for failures nobody experienced. The organisation learns that the number can be ignored, and the next real breach is ignored with it.

There is a commercial exposure as well. Where service levels are written into customer contracts, the vendor's measurement and the customer's experience are compared at renewal and in credit claims. An indicator that both sides accept, measured close to the customer's point of use, removes an argument that otherwise recurs every quarter.

## What Xyvionix assures

Xyvionix holds six statements about the service levels of each critical journey as current facts.

1. **Every critical journey has an objective.** The journeys the business has named are each covered, and each objective has an owner who is still in role.
2. **The indicator measures the journey.** It is compared on a schedule with an independent measurement taken from the customer's side, and the two agree within tolerance.
3. **The indicator is reporting.** Attainment is calculated only on windows where the expected data arrived. A window without data is reported as unknown, not as met.
4. **The target is achievable and agreed.** It has been checked against what the dependency chain can support and confirmed by the business, not inherited from a template.
5. **The budget has consequences.** When the policy is triggered, the decision it describes is taken, or is waived on the record by someone with authority to waive it.
6. **Burn is answered at every speed.** Fast burn pages someone. Slow burn reaches an owner and is acted on before the window closes.

The first four statements are about validity and the last two are about consequence. A precise indicator with an ignored budget changes nothing, and a strictly enforced budget on a wrong indicator enforces the wrong thing.

## Common failure modes

- **Success at the server, failure at the client.** The indicator counts responses that left the service. It does not see the request that never arrived, the page that did not render or the response the client timed out on.
- **The aggregate hides the segment.** Attainment is calculated across all traffic. One region, one tenant or one payment method is failing badly and is outweighed by everything else.
- **No data read as no breach.** The series went empty after a change to the telemetry pipeline. The objective has shown full attainment ever since.
- **Budget restored by exclusion.** Incidents are reclassified as planned maintenance or provider fault and removed from the calculation. The budget recovers. The customer's experience does not.
- **Retries that flatter the ratio.** Client retries turn failed first attempts into eventual successes. The success ratio holds while latency and load on the service rise.
- **Target copied from a provider commitment.** The objective was set to match a provider's published service level. The journey depends on several such services in series and cannot be better than their combination.
- **The slow burn ticket with no owner.** The alert fired as designed and raised a ticket. The ticket sits in a shared queue while the budget drains.

## Corrective ownership

When a threshold is lost the state moves to At risk. When the indicator has no data the state is Unassured, because the condition of the journey is unknown. In both cases Xyvionix owns the corrective action through to completion within the access it has been granted, and uses the enterprise's change process where production or its telemetry must change.

The corrections are specific to the cause. An indicator that has drifted from the journey is redefined at the point of measurement closest to the customer, and the old and new definitions are run side by side until the difference is understood. A missing-data condition is changed so that it raises an alert instead of passing. An exclusion with no recorded approver is reversed and the budget recalculated. A slow burn ticket is routed to the team that owns the cause, with a date.

Two corrections belong to the business and are returned to it with evidence. The first is the target itself, where the dependency chain can no longer support it. The second is a budget policy that is waived every time it is triggered. Xyvionix does not set the target or rewrite the policy. It records the decision, its owner and the date on which it will be reviewed.

Where a release gate reads the same indicator, the correction covers the gate as well. A gate that passes on missing data has the same defect as the objective, and is treated under [Release Assurance](/release-assurance).

## Verified closure

Closure is recorded when a test shows the objective behaving correctly, not when the query was edited.

For indicator validity, a known failure of the journey is introduced under controlled conditions and the indicator is observed to move by the expected amount. For data completeness, the telemetry source is interrupted in a test and the objective is observed to report unknown. For burn response, a test burn at each alert rate produces a page or a ticket that reaches an owner and is acknowledged. For budget policy, closure waits for the next occasion the policy is triggered and records the decision that followed.

The last of these cannot be staged, so it stays open longer than the others. Closing a policy correction on the strength of a rewritten document would be closing on intent.

## Technology and industry context

The provider frameworks agree on the principle. Google Cloud's reliability pillar opens by defining reliability from user-experience goals and setting realistic targets. Microsoft's guidance asks for reliability outcomes per critical user flow. Whether an objective still meets that description a year later is left to the enterprise.

Providers also publish thresholds that an enterprise can measure for itself. AKS Automatic carries a pod readiness service level: 99.9% of qualifying pod readiness operations complete within 5 minutes. That is a useful reference when an objective depends on scale-out keeping pace with a traffic ramp, and it is a dependency commitment that belongs in the target review.

Recovery time is part of the budget, and it is not only the provider's to determine. Google's report on its incident of 12 June 2025 and Microsoft's review of the Azure incident of 2 to 3 February 2026 both describe recovery slowed by retry load after the fault had been fixed. Retry and backoff settings in the enterprise's own clients decide how much budget an incident consumes after its cause is gone. Whether those causes return is the subject of [Incident Recurrence Assurance](/incident-recurrence-assurance).

For software companies the objective is often a contractual term, which changes who reads the evidence. That setting is covered in [SaaS Production Reliability](/saas-production-reliability). The argument for tying budgets to decisions is made at length in [Error Budgets Without Consequence](/error-budgets-without-consequence).
