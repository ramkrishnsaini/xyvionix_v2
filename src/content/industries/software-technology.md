---
title: Software and Technology
h1: Prove that reliability and unit cost still support the product and its margin
seoTitle: 'Software and SaaS Technology Assurance: Margin, Uptime | Xyvionix'
description: >-
  Continuous assurance for software and SaaS companies: service levels, AI
  feature cost per tenant, release stability and the evidence enterprise buyers
  request.
summary: >-
  For a software company production is the product and the cost of running it
  is the cost of revenue. Service levels, cost to serve, release stability and
  customer-facing evidence are held current between audits and renewals.
lede: >-
  Technology assurance for a software company is the continuing proof that the
  service meets the levels it was sold at, that the cost of serving each
  customer stays inside what the price assumes, and that the evidence given to
  enterprise buyers still describes production. All three are re-set by every
  release, every new AI feature and every platform change. A company that ships
  daily cannot rely on evidence gathered once a year.
ogQuestion: Do reliability and unit cost still support the margin?
kind: primary
cluster: industry
secondary:
  - reliability
  - value
  - change
parent: industries
state: assured
audience:
  - CTO
  - VP Engineering
  - VP Platform
  - CFO office
intent: 'Industry: continuous technology assurance for software and SaaS companies'
related:
  assurance:
    - production-reliability-assurance
    - technology-value-assurance
    - change-assurance
    - unit-economics-assurance
    - ai-cost-assurance
  useCases:
    - high-change-failure-rate
    - ai-cost-spike
    - cloud-cost-anomaly
    - kubernetes-upgrade-risk
  technologies:
    - eks-reliability-assurance
    - vllm-production-assurance
    - aws-iam-exposure-assurance
  industries:
    - saas-production-reliability
  insights:
    - ai-cost-per-business-outcome
    - what-change-failure-rate-proves
    - error-budgets-without-consequence
evidence:
  - name: Cost to serve by tenant and by feature
    detail: >-
      Infrastructure, inference and shared platform cost attributed to each
      plan, each large tenant and each AI feature, with the allocation rule
      and the date it was last reviewed.
  - name: AI feature cost and quality record
    detail: >-
      Cost per completed outcome for each AI feature, held beside the quality
      score for the same feature and period, so that one cannot improve
      unseen at the expense of the other.
  - name: Deployment and incident link
    detail: >-
      Every production deployment with a record of whether it needed immediate
      intervention or caused an unplanned follow-up deployment, which is the
      basis of the instability measures.
  - name: Platform lifecycle register
    detail: >-
      Each cluster, runtime and critical dependency with its version, its
      support grade and the date of its next support boundary, checked against
      the provider's current calendar.
  - name: Customer evidence currency record
    detail: >-
      Each control described to customers with the date of its latest
      evidence and the material changes made since the last audit period
      ended.
  - name: Exit and export test results
    detail: >-
      Timed exports of a tenant's data in the documented format, with
      confirmation that the output can be read outside the service.
  - name: Production access record
    detail: >-
      The people, pipelines and service identities able to reach customer
      data, compared with the access each has exercised.
thresholds:
  - signal: Cost to serve against plan price
    basis: The gross margin the pricing model assumes for each plan
    lostWhen: >-
      Cost to serve a plan or a large tenant exceeds the agreed share of its
      revenue for consecutive periods
  - signal: AI feature cost per outcome, read with quality
    basis: >-
      The value of the outcome to the customer and the price, if any, charged
      for the feature
    lostWhen: >-
      Cost per outcome rises above the agreed boundary, or falls only because
      quality has fallen with it
  - signal: Change fail rate and deployment rework rate
    basis: >-
      The error budget of the journeys the releases touch and the share of
      capacity the roadmap can lose to unplanned work
    lostWhen: >-
      Either rate stays above the agreed boundary across consecutive windows
  - signal: Time remaining to the next platform support boundary
    basis: >-
      The provider's published support calendar and the time a tested upgrade
      takes
    lostWhen: >-
      The time remaining is shorter than the time needed to complete and
      verify the upgrade
  - signal: Age of customer-facing control evidence
    basis: >-
      What enterprise customers' procurement and third-party risk processes
      ask to see
    lostWhen: >-
      Evidence for a control predates a material change to the system it
      describes
  - signal: Time to establish whether a product vulnerability is being exploited
    basis: >-
      The 24-hour early warning period in the EU Cyber Resilience Act
      reporting obligations, where they apply
    lostWhen: >-
      Detection and attribution take longer than the agreed share of the
      reporting period
faqs:
  - q: The company already has an audit report. What does continuous assurance add?
    a: >-
      An audit report describes a period that has ended. Enterprise buyers
      increasingly ask what has changed since, and the report cannot answer.
      Continuous assurance holds the evidence for the period after the report:
      which controls have been re-tested, which systems have changed and
      whether the statements made to customers still describe production.
  - q: How is the cost of an AI feature connected to gross margin?
    a: >-
      Inference is a variable cost that scales with each customer's use, while
      most plans are sold at a fixed price. The connection is made by
      attributing inference and supporting infrastructure to the tenant and
      feature that consumed them, and comparing the result with what that
      tenant pays. The boundary is set by the business from its own pricing
      model.
  - q: Does assurance slow the release pace?
    a: >-
      It measures whether the pace is being paid for in stability. Where
      change fail rate and rework rate are inside their boundary, the evidence
      supports shipping faster. Where they are not, the unplanned work is
      already slowing delivery, and the evidence shows where.
sources:
  - title: 'DORA research: software delivery performance metrics'
    url: 'https://dora.dev/guides/dora-metrics/'
  - title: 'Google Cloud: announcing the 2025 DORA report'
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report'
  - title: 'Amazon EKS pricing'
    url: 'https://aws.amazon.com/eks/pricing/'
  - title: 'Amazon EKS: Kubernetes version lifecycle'
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html'
  - title: 'Microsoft FY26 Q4 earnings call, 29 July 2026'
    url: 'https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4'
  - title: 'AICPA: 2017 Trust Services Criteria with Revised Points of Focus (2022)'
    url: 'https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022'
  - title: 'European Commission: Cyber Resilience Act reporting obligations'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/cra-reporting'
  - title: 'European Commission: Data Act explained'
    url: 'https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained'
  - title: 'Regulation (EU) 2023/2854, Data Act'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32023R2854'
  - title: 'Regulation (EU) 2022/2554, Digital Operational Resilience Act'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R2554'
  - title: 'European Supervisory Authorities: list of designated critical ICT third-party providers'
    url: 'https://www.eba.europa.eu/sites/default/files/2025-11/e388451b-356b-408a-bbf2-b8e425865d75/List%20of%20designated%20CTPPs.pdf'
  - title: 'Bank of England: UK critical third parties announced by HM Treasury'
    url: 'https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt'
  - title: 'OCC Bulletin 2023-17: third-party relationships, risk management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html'
  - title: 'Directive (EU) 2022/2555, NIS2'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022L2555'
  - title: 'European Commission: regulatory framework for AI'
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  - title: 'California Privacy Protection Agency: ADMT, risk assessment and cybersecurity audit regulations'
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html'
  - title: 'CISA: widespread supply chain compromise impacting npm ecosystem'
    url: 'https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Operational risk when the technology is the product

In most industries technology supports the product. In a software company it is the product, and two consequences follow.

The first is that reliability is revenue. A service level is a term in a contract, an outage is a credit and a poor quarter of availability is a harder renewal. The second is that the cost of running production is the cost of revenue. Every inefficiency in the platform, and every AI feature priced below what it costs to serve, is taken directly from gross margin.

Both are re-set constantly. A software company changes production many times a day, adds customers whose usage differs from the last ones, and builds on platforms that change on their providers' calendars. Evidence gathered for an annual audit or a funding round describes a system that has since been redeployed many times over.

A third consequence is specific to companies that sell to enterprises. The buyer's own assurance depends on the vendor's. Procurement teams, security reviewers and regulated customers ask for evidence, and what the vendor says becomes part of the customer's file.

## Customer-facing service levels

A service level that is sold has to be measured where the customer experiences it. An aggregate availability figure can be met while one tenant, one region or one integration fails for days, and the affected customer is the one who reads the contract.

The measurement, the isolation between tenants and the evidence shared with customers are covered in depth in [SaaS Production Reliability](/saas-production-reliability). The discipline of keeping an objective true to the journey it describes is covered in [SLO Assurance](/slo-assurance).

## Release pace against stability

Release pace is a competitive measure, so the pressure on it only goes one way. The evidence that the pace is sustainable is the instability side of the delivery record.

DORA research now defines five software delivery metrics. Two measure instability: change fail rate, the ratio of deployments that require immediate intervention, and deployment rework rate, the ratio of deployments that are unplanned and happen as a result of an incident in production. Both depend on a recorded link between a deployment and what followed it. Without that link the figures are estimates.

The 2025 DORA report, published on 24 September 2025, found that AI adoption has a positive relationship with software delivery throughput and continues to have a negative relationship with software delivery stability. More change is being shipped, faster, with lower stability. For a software company that is a margin question as well as a reliability one, because rework consumes the capacity that was meant to build the roadmap.

Platform lifecycle adds changes the company did not choose. Amazon EKS charges $0.10 per cluster per hour in standard support and $0.60 in extended support, so delaying an upgrade has a published price, and at the end of extended support the control plane is upgraded automatically. The scenarios are covered in [High Change Failure Rate](/high-change-failure-rate) and [Kubernetes Upgrade Risk](/kubernetes-upgrade-risk), and the gate itself in [Release Assurance](/release-assurance).

## AI features and cost per tenant

An AI feature changes the cost structure of a software product. A conventional feature adds little cost with each use. An AI feature incurs inference cost on every use, and usage varies widely between tenants on the same plan.

The effect on margin is visible at the largest scale. On its FY26 Q4 earnings call on 29 July 2026, Microsoft said that Microsoft Cloud gross margin percentage was 65%, down year-over-year, driven by sales mix shift to Azure as well as continued investments in AI infrastructure and increased product usage, partially offset by ongoing efficiency gains. That is one company's disclosure and not an industry figure. The operating point for any software company is that the cost has to be seen per tenant and per feature before the quarter closes.

Cost alone is a poor control. A cheaper model, a shorter context or a tighter limit each lowers cost and can lower quality with it. The two are therefore held together for each feature, as described in [AI Cost Assurance](/ai-cost-assurance). Attribution to the tenant is covered in [Unit Economics Assurance](/unit-economics-assurance), and a sudden rise in [AI Cost Spike](/ai-cost-spike).

AI features also carry disclosure duties in some markets. EU AI Act transparency obligations under Article 50 have applied since 2 August 2026, and providers of generative systems placed on the market before that date have until 2 December 2026 to meet Article 50(2).

## Identity, security and customer evidence requests

Enterprise buyers ask for evidence, and the usual answer is an audit report. SOC 2 reports are assessed against the AICPA 2017 Trust Services Criteria with Revised Points of Focus (2022), across security, availability, processing integrity, confidentiality and privacy. Any such report describes a period that has ended. The buyer's next question is what has changed since, and the answer has to come from current evidence.

The exposure that matters most is the path to customer data. Support tooling, production access for on-call staff, pipeline credentials and service identities each reach tenant data, and each accumulates scope. The build pipeline is part of that path. CISA reported on 23 September 2025 that a self-replicating worm had compromised over 500 npm packages and harvested GitHub tokens and cloud API keys, which is a build-time compromise that yields production credentials.

Detection speed is now a regulated matter for products sold in the EU. Reporting obligations under the Cyber Resilience Act have applied to manufacturers since 11 September 2026: an early warning within 24 hours and a notification within 72 hours for actively exploited vulnerabilities and severe incidents. Meeting the first deadline depends on telemetry that shows whether a vulnerability is being exploited in the product.

## Customer data and exit

A software company holds its customers' data, and two properties of that custody are testable. Isolation: one tenant's data cannot be reached through another tenant's session, query or AI retrieval. Exit: a customer can take its data out in a usable form.

Exit is a legal capability in the EU. The Data Act has applied since 12 September 2025, and its Chapter VI obliges providers of data processing services to support switching. Article 29(1) provides that from 12 January 2027 providers shall not impose any switching charges on the customer for the switching process. An export path that is never exercised tends to fail when it is invoked, so the evidence is a timed export that a third party can read.

## Procurement, regulatory and audit context

Xyvionix is not a law firm and gives no legal or regulatory advice. Whether an instrument applies to a given company depends on its entity type, size and markets.

| Instrument | Status at September 2026 | What reaches the software vendor |
|---|---|---|
| EU DORA regulation (Regulation (EU) 2022/2554), Article 30(3)(a) | Applies since 17 January 2025 | Contracts supporting critical or important functions include full service level descriptions with precise quantitative and qualitative performance targets, to allow effective monitoring by the financial entity |
| Critical third-party designations | The European Supervisory Authorities designated 19 providers on 18 November 2025. HM Treasury designated four in the UK on 10 July 2026, effective 13 July 2026 | Vendors built on the designated clouds are asked about concentration and substitutability |
| US interagency guidance on third-party relationships | OCC Bulletin 2023-17, 6 June 2023 | Ongoing monitoring is a named stage of the third-party life cycle |
| NIS2 Directive | Covers cloud computing, data centre and managed service providers among others, as transposed nationally | Early warning within 24 hours and incident notification within 72 hours where the entity is in scope |
| EU Cyber Resilience Act | Reporting live since 11 September 2026. Main obligations apply 11 December 2027 | Manufacturers report actively exploited vulnerabilities and severe incidents |
| California regulations on automated decision-making technology | In effect 1 January 2026. Compliance required from 1 January 2027 | Customers using the product for significant decisions ask how it reaches them |

The expectations that call for continuing proof are ongoing monitoring of a supplier, performance targets that allow effective monitoring, and reporting periods that start at detection. An audit report, a questionnaire response and a certificate are point-in-time. They are the beginning of a buyer's enquiry.

## Technology economics and change

Margin is lost in small, continuous ways: a shared platform whose cost is never attributed, a large tenant served below its price, capacity held for a peak that has moved, a cluster left in a paid support tier. The pattern is covered in [Cloud Cost Anomaly](/cloud-cost-anomaly).

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted and through the company's own change process. Pricing, packaging and roadmap decisions stay with the business. Closure is recorded when re-measurement shows the condition is gone: cost to serve is back inside its boundary with quality unchanged, the upgraded cluster carries production traffic, the export completes and can be read.
