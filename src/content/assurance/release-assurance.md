---
title: Release Assurance
h1: Know what each release proved before and after it reached customers
seoTitle: 'Release Assurance: Gates, Exposure and Provenance | Xyvionix'
description: >-
  Continuous assurance for releases: gates that still test what they claim,
  staged exposure, verification in production and provenance of what shipped.
summary: >-
  A release is assured by evidence gathered before and after deployment. Gate
  validity, progressive exposure, post-deployment verification, provenance and
  change fail rate are each held against a threshold.
lede: >-
  Release assurance is the continuing proof that each release was tested by
  gates that still work, exposed to customers in stages, verified in production
  against the outcomes it could affect, and built from the source that was
  reviewed. A green pipeline is a record that checks ran. It becomes evidence
  only when each check is shown to fail on a faulty release, and that has to be
  shown again whenever the pipeline, the metrics or the platform change.
ogQuestion: What does each release prove before it reaches customers?
kind: child
cluster: change
secondary:
  - reliability
parent: change-assurance
state: assured
audience:
  - VP Engineering
  - VP Platform
  - Technology Risk
intent: 'Commercial: release evidence and production validation held against thresholds'
related:
  assurance:
    - rollback-readiness-assurance
    - slo-assurance
    - model-change-assurance
  useCases:
    - high-change-failure-rate
    - schema-change-production-impact
  technologies:
    - eks-reliability-assurance
    - aks-reliability-assurance
    - terraform-drift-assurance
  industries:
    - software-technology
    - saas-production-reliability
  insights:
    - what-change-failure-rate-proves
evidence:
  - name: Gate inventory with last proven failure
    detail: >-
      Every automated and manual gate between commit and full exposure, with
      what it is meant to stop and the date it last stopped a deliberately
      faulty release.
  - name: Analysis query health
    detail: >-
      For each metric that gates a staged rollout, confirmation that the query
      returns data for the version under test, and the configured behaviour
      when it returns none.
  - name: Exposure record
    detail: >-
      For each release, the stages it passed through, the share of traffic or
      tenants at each stage, the time held at each stage and the decision that
      promoted it.
  - name: Post-deployment verification result
    detail: >-
      The service level indicators of the journeys the release touched,
      compared before and after deployment over an agreed observation window,
      with synthetic checks of the critical paths.
  - name: Provenance and verification record
    detail: >-
      For the artefact running in production, the source revision and build
      that produced it, its signature, and the record that the signature and
      provenance were verified at deployment.
  - name: Pipeline dependency pins
    detail: >-
      Third-party actions, plugins and base images used by the pipeline, each
      referenced by an immutable identifier, with the date the reference was
      last reviewed.
  - name: Deployment and intervention log
    detail: >-
      Every production deployment, marked with whether it required immediate
      intervention and whether it was itself an unplanned deployment following
      an incident.
thresholds:
  - signal: Age of the last proven failure for each gate
    basis: How often the pipeline, the test suites and the metrics behind the gate change
    lostWhen: A gate has not been shown to stop a faulty release since the pipeline or its metric source last changed
  - signal: Rollout analyses that ran on missing data
    basis: A promotion decision requires a measurement, so an empty result is not a pass
    lostWhen: Any release is promoted at a stage where the gating query returned no data
  - signal: Releases promoted without the agreed exposure stages
    basis: The size of the customer population the business accepts being exposed to an unverified release
    lostWhen: A release to a critical service reaches full exposure without passing the agreed stages and hold times
  - signal: Change fail rate and deployment rework rate
    basis: The error budget of the affected journeys and the instability the business has agreed to absorb
    lostWhen: Either rate crosses the agreed boundary for consecutive windows, or deployments cannot be linked to interventions
  - signal: Production artefacts with unverified provenance
    basis: The business requires that what runs is what was reviewed and built by the approved pipeline
    lostWhen: Any running artefact on a critical service lacks a verified signature and provenance record
  - signal: Pipeline dependencies referenced by mutable tag
    basis: A pipeline with production credentials is a production dependency
    lostWhen: A third-party pipeline component on a release path is referenced by a tag that its publisher can move
faqs:
  - q: The pipeline is green on every release. Why is that not sufficient evidence?
    a: >-
      Green shows that the checks ran and none reported a failure. It does not
      show that the checks can fail. A test suite that was skipped, a
      threshold that was relaxed or a metric query that returns nothing all
      produce the same green result. A gate is evidence when it has recently
      been shown to stop a release that should be stopped.
  - q: Releases are already canaried. What is left to assure?
    a: >-
      That the canary measures the right thing on the right population. The
      common gaps are an analysis that passes on missing data, a canary
      population too small or too unlike the rest to reveal the fault, and a
      hold time shorter than the time the fault takes to appear.
  - q: Does signed and attested software mean the release is safe?
    a: >-
      It means the artefact came from the stated build and has not been
      altered since. That is worth having and says nothing about behaviour.
      Provenance and post-deployment verification answer different questions,
      and both are held.
sources:
  - title: 'DORA research: software delivery performance metrics'
    url: 'https://dora.dev/guides/dora-metrics/'
  - title: 'Announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
  - title: 'Argo Rollouts releases'
    url: 'https://github.com/argoproj/argo-rollouts/releases'
  - title: 'Argo CD releases'
    url: 'https://github.com/argoproj/argo-cd/releases'
  - title: 'Flux releases'
    url: 'https://github.com/fluxcd/flux2/releases'
  - title: 'SLSA specification'
    url: 'https://slsa.dev/spec/'
  - title: 'Sigstore blog'
    url: 'https://blog.sigstore.dev/'
  - title: 'CISA: 2025 Minimum Elements for a Software Bill of Materials (draft)'
    url: 'https://www.cisa.gov/resources-tools/resources/2025-minimum-elements-software-bill-materials-sbom'
  - title: 'CISA alert: supply chain compromise of tj-actions/changed-files and reviewdog/action-setup'
    url: 'https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction'
  - title: 'CISA alert: widespread supply chain compromise impacting npm ecosystem'
    url: 'https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem'
  - title: 'Google Cloud incident report, 12 June 2025'
    url: 'https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW'
  - title: 'Azure post-incident review YKYN-BWZ, Azure Front Door, 29 to 30 October 2025'
    url: 'https://azure.status.microsoft/en-us/status/history/?trackingId=YKYN-BWZ'
  - title: 'AKS Automatic overview'
    url: 'https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic'
  - title: 'EU Cyber Resilience Act'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act'
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

A release pipeline is built once and trusted for years. Its gates were valid on the day they were written. They are changed, bypassed and starved of data in ways that leave the pipeline green.

**Gates decay.** A flaky test is marked as allowed to fail. A coverage threshold is lowered to unblock a deadline. A security scan is moved to a non-blocking stage. Each decision is local and reasonable. Together they leave a gate that reports a pass on a release it would once have stopped.

**The analysis has no data.** Progressive delivery tools such as Argo Rollouts and Flagger promote or halt a release on the result of a metric query. When a metric is renamed or a collector changes, the query returns nothing. Unless the analysis is configured to treat an empty result as a failure, the release is promoted on the absence of evidence.

**Synchronised is read as working.** A GitOps controller reports that the cluster matches the repository. That is a statement about manifests. It says nothing about whether the service answers requests correctly.

**The tooling changes what is rendered.** Flux v2.9.5, released on 31 August 2026, builds on Helm v4.2.4. An upgrade to the controller can change how a chart renders, so the same commit can produce different objects in the cluster from one month to the next.

**The pipeline's own dependencies move.** In March 2025 the GitHub Action tj-actions/changed-files was compromised and exposed secrets in workflow logs, including access keys and tokens. An action referenced by a mutable tag changes without any commit in the repository that uses it.

**A release passes and carries a fault that waits.** Google's report on its incident of 12 June 2025 describes a change shipped on 29 May without feature-flag protection, in a code path that was not exercised until a later policy change reached it. Every check on the release passed, because none of them created the condition that activated the path.

## What is at stake

The first consequence is customer impact from the enterprise's own releases. It is the category of incident the business has most control over and therefore the least excuse for.

The second is the instability the delivery figures record. The 2025 DORA report found that AI adoption has a positive relationship with software delivery throughput and continues to have a negative relationship with software delivery stability. It also reported that 30% of respondents have little or no trust in AI-generated code. More code reaches the pipeline, and the gates are what stands between that distrust and production.

The third is exposure through the pipeline itself. The npm compromise that CISA reported on 23 September 2025 affected over 500 packages and harvested cloud API keys and GitHub tokens. A build-time compromise of that kind yields production credentials, so a release process without provenance and pinned dependencies is a route into the estate.

The fourth is an inability to answer a plain question after an incident: what exactly was running, where it came from and what it was tested against.

## What Xyvionix assures

Xyvionix holds five statements about the release process as current facts, tested against thresholds agreed with the business.

1. **Each gate can still fail.** Every gate on a release path has recently stopped a deliberately faulty release, and a gate that cannot be shown to fail is recorded as absent.
2. **Exposure is staged and measured.** Releases to critical services reach customers in agreed stages, and promotion at each stage rests on a query that returned data for the new version.
3. **The outcome is verified in production.** After deployment, the indicators of the journeys the release touched are compared with their objectives over an agreed window. Deployment success is not treated as release success.
4. **What runs is what was built and reviewed.** The running artefact has a signature and provenance, and both were verified at deployment.
5. **Instability is measured from records.** Change fail rate and deployment rework rate are calculated from deployments linked to interventions.

The objectives used in verification are held under [SLO Assurance](/slo-assurance). Whether a failed release can be reversed is a separate capability, held under [Rollback Readiness Assurance](/rollback-readiness-assurance). Releases that change a model version or provider are re-proven under [Model Change Assurance](/model-change-assurance).

## Common failure modes

- **The gate that cannot fail.** A required check exists and has reported a pass on every run for a year, including runs where the suite it wraps did not execute.
- **Promotion on an empty result.** The rollout analysis queries a metric that no longer exists under that name. Each stage passes.
- **A canary that cannot reveal the fault.** The first stage receives internal traffic only, or a share too small to exercise the path that fails under real load.
- **Hold time shorter than the failure.** The release is promoted after minutes. The fault is a slow leak or a scheduled job that appears hours later, at full exposure.
- **Signed and never verified.** Artefacts are signed at build. Nothing at deployment checks the signature, so an unsigned or altered artefact would be admitted in the same way.
- **An inventory for a different build.** A software bill of materials is accurate for one build only. One generated at an earlier release describes components that are no longer what is running.
- **Preventive guardrails mistaken for verification.** AKS Automatic enforces deployment safeguards and stops cluster upgrades when deprecated API usage is detected. Controls of that kind stop known bad inputs. They do not confirm the outcome after the change.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a change to production is required.

Corrections are made to the release process, not only to the release that exposed the gap. A gate that cannot fail is repaired or removed, since a gate that always passes costs time and gives false comfort. A rollout analysis is set to treat missing data as a failure, and its queries are corrected against current metric names. A pipeline component on a mutable tag is pinned to an immutable reference. Signature verification is enforced at the point of admission. Where deployments cannot be linked to interventions, the link is built first, because without it the instability thresholds cannot be evaluated.

Where the business accepts a release path without staged exposure, such as an urgent security fix, the exception is recorded with its owner, its scope and an expiry date.

## Verified closure

A finding about the release process is closed by a release that should fail, and does.

For a repaired gate, closure means a release carrying the fault the gate exists to catch is submitted and stopped. For a rollout analysis, closure means a version that degrades the gated metric is halted at the first stage, and a run with the metric source removed is halted as well. For provenance, closure means an unsigned artefact is refused at deployment and the refusal is logged. For a pinned dependency, closure means the pipeline definition holds the immutable reference and a build confirms it resolves to the reviewed version.

For post-deployment verification, closure means the comparison ran against the journeys the release touched, over the agreed window, and the result is retained against the release.

Each closure is dated. It expires when the pipeline, the metric source or the delivery tooling next changes, and the gate is proven again.

## Technology and industry context

Delivery tooling is on its own release train. Argo CD is on major version 3 and its releases carry signed images and SLSA provenance. Argo Rollouts v1.10.0 shipped on 27 August 2026. Material written for earlier major versions describes behaviour that may have changed, so gate evidence names the tool version it was gathered on.

Supply chain standards are still moving. The current SLSA specification is v1.2, which has a Build track and a Source track. Sigstore released Cosign v3 and made Rekor v2 generally available in October 2025. CISA's 2025 minimum elements for a software bill of materials were published in August 2025 as a draft for public comment. A control designed against one version of these is reviewed when the next is published.

Regulation is adding dates. Reporting obligations under the EU Cyber Resilience Act, Regulation (EU) 2024/2847, have applied since 11 September 2026, and its main obligations apply from 11 December 2027. Xyvionix gives no legal advice. The evidence the expectation implies is a record of what each shipped release contained and how it was built.

The DORA software delivery metrics, and what change fail rate does and does not prove, are examined in [What Change Failure Rate Proves](/what-change-failure-rate-proves). The enterprise scenario is covered in [High Change Failure Rate](/high-change-failure-rate).
