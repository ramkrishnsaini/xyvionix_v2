---
title: Production Observability Assurance
h1: Prove that production telemetry would detect the failures that matter
seoTitle: 'Observability Assurance: Proven Detection Coverage | Xyvionix'
description: >-
  Continuous assurance that telemetry detects the failures the business cares
  about: critical path coverage, alerts proven by exercise, signal kept through
  change.
summary: >-
  Observability is assured by detection coverage, not by tool ownership.
  Critical path coverage, alert validity, signal survival through change,
  sampling and cost-driven signal removal are each held against a threshold.
lede: >-
  Production observability assurance is the continuing proof that the failures
  the business cares about would be detected, and would reach someone able to
  act, in time to matter. Owning a telemetry platform does not provide that
  proof. Detection is lost when a path is never instrumented, when an alert
  stops evaluating, when a change renames or removes a signal, and when
  sampling or cost reduction discards the data that would have shown the
  failure. The evidence is a detection that was recently exercised.
ogQuestion: Would your telemetry detect the failure that matters?
kind: child
cluster: reliability
secondary: []
parent: production-reliability-assurance
state: assured
audience:
  - VP Platform
  - Head of SRE
  - VP Engineering
intent: >-
  Commercial: proving that telemetry can detect the failures the business cares
  about
related:
  assurance:
    - slo-assurance
    - ai-observability-assurance
    - incident-recurrence-assurance
  useCases:
    - cloud-incident-recurrence
    - cloud-configuration-drift
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - eks-reliability-assurance
  industries:
    - saas-production-reliability
  insights:
    - continuous-assurance-vs-monitoring
    - why-production-incidents-recur
evidence:
  - name: Critical path detection map
    detail: >-
      Each critical journey with the failure modes the business has named, and
      the signal, alert and route to an owner expected to detect each one.
      Failure modes with no detection are recorded as gaps.
  - name: Alert exercise record
    detail: >-
      For each alert guarding a critical path, the date it was last fired by an
      induced condition, who received it, and the time from condition to
      acknowledgement.
  - name: Telemetry completeness record
    detail: >-
      For each source, whether the expected metrics, logs and traces arrived in
      each window. A window with absent data is recorded as unknown.
  - name: Signal dependency register
    detail: >-
      The queries, attributes, labels and scrape targets that each alert and
      release gate depends on, checked after every change to services,
      collectors and the platform.
  - name: Sampling and retention record
    detail: >-
      The sampling rules, drop rules and retention periods in force for each
      signal, what each one excludes, and who approved it.
  - name: Telemetry reduction decisions
    detail: >-
      Each removal of telemetry made to reduce cost, with the alerts and
      investigations that depended on the data and the person who accepted
      the loss.
  - name: Telemetry pipeline inventory
    detail: >-
      Every agent, collector and exporter on a critical path, with its version
      and its upstream support status.
thresholds:
  - signal: Named failure modes with an exercised detection
    basis: The failure modes the business has named for journeys that carry revenue or obligation
    lostWhen: A named failure mode has no detection, or its detection has not been exercised since the path last changed
  - signal: Time from induced failure to acknowledged alert
    basis: The customer impact the business will accept before someone is acting on it
    lostWhen: The exercised detection time exceeds the agreed time, or the alert reaches no owner in role
  - signal: Alerts evaluating on absent data
    basis: An alert can only fire on data that arrived
    lostWhen: An alert on a critical path receives no data for longer than the agreed gap and no missing-data condition is raised
  - signal: Signal dependencies changed since last verification
    basis: The rate at which services, collectors and the platform change
    lostWhen: A release, collector upgrade or platform upgrade reaches production and the alerts that depend on it have not been verified again
  - signal: Failing populations excluded by sampling
    basis: The smallest failing population, such as one tenant or one region, that the business needs to be able to see
    lostWhen: An exercised failure of that size cannot be found in retained telemetry
  - signal: Telemetry components past end of support
    basis: The published lifecycle of the component, for example the end of life of Promtail on 2 March 2026
    lostWhen: An agent or collector on a critical path is unsupported and has no dated replacement
faqs:
  - q: An observability platform is already in place. What does assurance add?
    a: >-
      It tests whether the platform would detect the failures the business has
      named. That means inducing the failure, watching the alert reach a
      person, and repeating the test after change. A platform stores and
      queries telemetry. It does not test its own coverage, and it reports
      nothing about the signals it never received.
  - q: Does this require replacing the tools already in use?
    a: >-
      No. Detection coverage depends on what is instrumented, how alerts are
      defined and where they are routed, whichever tools hold the data. The
      evidence is gathered through the tooling the enterprise already runs.
  - q: Telemetry cost has to come down. Does that mean losing assurance?
    a: >-
      Not if the reduction is made with knowledge of what depends on the data.
      Assurance identifies which streams, labels and retention periods carry a
      detection and which carry none, so that volume is removed where no alert
      or investigation relies on it. Where a reduction does remove a
      detection, that is recorded as a decision with an owner.
  - q: How is this different from SLO assurance?
    a: >-
      SLO assurance asks whether an objective still describes what customers
      experience and whether its budget changes decisions. Observability
      assurance asks whether a failure would be seen at all, by whom, and how
      quickly. An objective depends on the telemetry. Detection covers
      failures that no objective was written for.
sources:
  - title: 'OpenTelemetry specification status summary'
    url: 'https://opentelemetry.io/docs/specs/status/'
  - title: 'OpenTelemetry eBPF Instrumentation (OBI)'
    url: 'https://opentelemetry.io/docs/zero-code/obi/'
  - title: 'Grafana Alloy releases'
    url: 'https://github.com/grafana/alloy/releases'
  - title: 'Grafana Loki documentation: Promtail'
    url: 'https://grafana.com/docs/loki/latest/send-data/promtail/'
  - title: 'AKS supported Kubernetes versions'
    url: 'https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions'
  - title: 'Datadog: OpenTelemetry in Datadog'
    url: 'https://docs.datadoghq.com/opentelemetry/'
  - title: 'AWS Fault Injection Service user guide'
    url: 'https://docs.aws.amazon.com/fis/latest/userguide/what-is.html'
  - title: 'Amazon EKS Auto Mode'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/automode.html'
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

Detection is usually proven once, when an alert is first written and someone watches it fire. After that the service, the telemetry pipeline, the platform and the budget all move. Six things separate a telemetry estate from proven detection.

**The critical path was never fully covered.** Instrumentation follows the teams that had time to add it. A journey that carries revenue passes through a queue, a batch step or a third-party call that emits nothing, and the failure modes of that step have no signal at all.

**The alert stops evaluating.** A query that once returned a series returns nothing. Most alerting treats no data as no breach, so the rule stays quiet. The alert exists in configuration and has stopped being a control.

**A platform change removes the signal.** On AKS 1.37, Azure Monitor managed Prometheus moves to namespace-scoped secret access, and any ServiceMonitor or PodMonitor using basicAuth must be reconfigured before the upgrade. A cluster upgrade can therefore stop metric scraping with no change to any service. OpenTelemetry eBPF Instrumentation requires Linux 5.8 or later and BTF, so a node image change can remove traces that needed no code to produce.

**The pipeline is itself a changing system.** Grafana Alloy v1.20.0, released on 25 September 2026, carries breaking changes to its OpenTelemetry processors. Promtail reached end of life on 2 March 2026 and continues to ship logs wherever it is still installed, without updates.

**Sampling decides what can be seen.** A sampling decision taken at the start of a request is taken before anyone knows whether the request will fail. A rare failure, or one confined to a single tenant, is discarded at the same rate as everything else.

**Cost pressure removes signal.** Telemetry cost grows with volume, and reduction is usually made by volume: the largest log streams, the labels with the most values, the longest retention. Whether an alert or an investigation depended on the data is rarely part of the decision.

## What is at stake

The time to detect a failure sets the minimum length of the incident. Until a signal reaches someone able to act, nothing else in the response has started. When detection fails, the first report comes from a customer.

A failure that goes undetected is one cost. A failure that cannot be explained is the other. If the telemetry that would show the cause was sampled out, dropped or expired, the review ends with a probable cause and an action that cannot be tested. The same failure returns, which is the subject of [Incident Recurrence Assurance](/incident-recurrence-assurance).

Other controls stand on the same telemetry. A service level objective is calculated from it. A progressive delivery gate passes or fails a release on it. The stop conditions of an AWS Fault Injection Service experiment are CloudWatch alarms, and AWS warns that the service performs real actions on real resources. An alarm that no longer evaluates cannot halt the experiment it guards. When a signal is lost, every control that reads it is lost with it, and each continues to report a healthy state.

## What Xyvionix assures

Xyvionix holds six statements about the detection of failure on each critical journey as current facts, tested against thresholds agreed with the business.

1. **Every named failure mode has a detection.** For each critical path, the failures the business has named are mapped to a signal, an alert and a route to an owner. A failure mode with none is recorded as a gap.
2. **Alerts are valid.** Each alert on a critical path has been fired by an induced condition, has reached a person in role, and has told that person what is failing.
3. **Absent data is reported as unknown.** A source that stops reporting raises its own condition.
4. **Signal survives change.** After a release, a collector upgrade or a platform upgrade, the queries, attributes and scrape targets that detection depends on are verified again.
5. **Sampling keeps the failures that matter.** Errors, slow requests and the smallest population the business needs to see are retained at a rate that lets them be found.
6. **Telemetry reduction is a decision.** Data is removed with knowledge of what depended on it, by someone with authority to accept the blind spot.

Whether an objective built on these signals still describes the customer's experience is held under [SLO Assurance](/slo-assurance). Telemetry specific to AI systems, including trace coverage of model and tool calls and quality scoring on sampled traffic, belongs to [AI Observability Assurance](/ai-observability-assurance).

## Common failure modes

- **Detection by dashboard.** The signal exists and is charted. No alert reads it, so detection depends on someone looking at the right panel at the right time.
- **The renamed label.** A release or a collector upgrade changes an attribute name. The alert query matches nothing and evaluates as healthy.
- **The route to nobody.** The alert fires and pages a rotation that was dissolved in a reorganisation, or posts to a channel nobody reads.
- **Sampled out.** The failing requests were a small share of traffic. Every retained trace is a successful one.
- **The log line that was dropped.** A cost reduction raised the log level on a high-volume service. The alert matched a message at the level that is no longer shipped.
- **Shared fate.** Telemetry agents and alert delivery depend on the same identity service, network or region as production. Microsoft's review of the Azure incident of 2 to 3 February 2026 lists Managed Identities among the affected services. Telemetry that authenticates through a dependency of production can stop reporting during the incident it exists to report.

## Corrective ownership

When a threshold is lost the state moves to At risk. Where a critical path has no exercised detection at all, the state is Unassured: the path may be healthy, and nobody can show that it is. Xyvionix owns the corrective action through to completion within the access it has been granted, and works through the enterprise's change process where production or its telemetry pipeline must change.

Corrections follow the cause. An uninstrumented step is given a signal at the point closest to the customer's experience of it. An alert that passes on absent data gains a condition for absence. A query broken by a renamed attribute is repointed, and the dependency is recorded so that the next rename is caught before release. A collector that has left support is replaced, and the output of old and new is compared before the old one is removed.

Two decisions belong to the business and are returned to it with evidence. The first is a sampling or retention policy that excludes a population the business has said it needs to see. The second is a telemetry reduction that would remove data an alert depends on. Xyvionix sets out what would stop being detectable. The decision is recorded with its owner and an expiry date.

## Verified closure

Detection is closed by causing the failure and watching the alert arrive.

The condition is induced under controlled conditions, on the path and at the size that matters. The record shows four things. The signal moved. The alert fired. A person in role acknowledged it. The time from condition to acknowledgement was inside the agreed detection time. An alert that fired into an unattended queue has closed nothing.

The test matches the correction. For absent data, the source is interrupted and the absence itself raises an alert. For sampling, failing requests are introduced at the smallest population the business named, and they are found in retained telemetry afterwards. For a telemetry reduction, the alerts that depended on the affected data are exercised after the reduction takes effect.

Closure is dated and tied to the versions of the service, the collector and the platform on which it was proven. A later upgrade to any of them expires it. A rule that was edited and loaded without error is not evidence of detection.

## Technology and industry context

Signal maturity sets what can carry evidence. The OpenTelemetry specification lists tracing, metrics and logs as stable and profiles as in development. Detection that has to hold through change is built on the stable signals.

The route into a platform matters as much as the platform. Datadog supports OpenTelemetry by three ingestion paths, and the features available depend on the path chosen. A change of ingestion path is a change to what can be detected, and it is verified as one.

Managed Kubernetes changes what telemetry can reach. Nodes in Amazon EKS Auto Mode allow no SSH or SSM access and have a maximum lifetime of 21 days, so host-level collection has to start unaided on every replacement node. On AKS, the scraping change in 1.37 makes observability part of upgrade readiness, which is covered in [AKS Reliability Assurance](/aks-reliability-assurance).

For software companies serving many tenants, the smallest population that must be visible is often a single customer. Aggregate signals can stay healthy while one tenant fails completely. That setting is covered in [SaaS Production Reliability](/saas-production-reliability).
