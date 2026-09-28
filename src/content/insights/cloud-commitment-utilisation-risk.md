---
title: Cloud commitments and utilisation risk
h1: A commitment discount is a fixed obligation that architecture change can strand
seoTitle: 'Cloud Commitments and Utilisation Risk Explained | Xyvionix'
description: >-
  Commitment discounts turn variable cloud cost into a fixed obligation. How
  to pair coverage with utilisation, track expiry and test commitments before
  a migration.
summary: >-
  A commitment is bought against a forecast of an architecture. When the
  architecture moves, the obligation stays. Coverage and utilisation have to
  be held as a pair, expiry tracked as a dated event, and planned change
  tested against the term.
lede: >-
  A cloud commitment is a purchase of future usage at a lower rate, and it is
  owed whether or not the usage occurs. The risk is rarely that the forecast
  was careless. It is that the architecture the forecast described is changed
  during the term by people who were never told a commitment depended on it.
  Coverage and utilisation therefore have to be read together, against the
  change plan as well as the bill, and re-proven after every material change.
ogQuestion: What happens to a cloud commitment when the architecture changes?
category: Technology Value
author: Xyvionix Research
featured: false
cluster: value
secondary: []
parent: insights
state: degrading
audience:
  - FinOps Leadership
  - CTO
  - VP Platform
intent: >-
  Commitment discounts convert variable cost into a fixed obligation that
  architecture change can strand. Covers coverage and utilisation as paired
  thresholds, expiry tracking, and commitment decisions ahead of migrations.
  Uses current instrument names from research.
related:
  assurance:
    - cloud-cost-assurance
    - technology-value-assurance
    - unit-economics-assurance
  useCases:
    - cloud-cost-anomaly
  technologies:
    - aws-production-reliability
    - snowflake-data-assurance
  industries:
    - software-technology
  insights:
    - ai-cost-per-business-outcome
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'AWS: Savings Plans types'
    url: 'https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html'
  - title: 'AWS: Savings Plans FAQs'
    url: 'https://aws.amazon.com/savingsplans/faqs/'
  - title: 'AWS: monitoring Savings Plans'
    url: 'https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-monitoring.html'
  - title: 'Microsoft Learn: what are Azure savings plans'
    url: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/savings-plan/savings-plan-compute-overview'
  - title: 'Microsoft Learn: self-service exchanges and refunds for Azure Reservations'
    url: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/exchange-and-refund-azure-reservations'
  - title: 'Google Cloud: committed use discounts'
    url: 'https://cloud.google.com/docs/cuds'
  - title: 'Google Cloud: committed use discounts, consumption model'
    url: 'https://docs.cloud.google.com/docs/cuds-multiprice'
  - title: 'FinOps Foundation: Rate Optimization capability'
    url: 'https://www.finops.org/framework/capabilities/rate-optimization/'
  - title: 'FinOps Foundation: introducing FOCUS 1.4'
    url: 'https://www.finops.org/insights/introducing-focus-1-4/'
  - title: 'FinOps Foundation: FinOps for AI'
    url: 'https://www.finops.org/framework/technology-categories/ai/'
  - title: 'Microsoft Learn: provisioned throughput for Foundry Models'
    url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/provisioned-throughput'
  - title: 'AWS: EC2 Capacity Blocks for ML'
    url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-blocks.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The discount is the visible half of the instrument

Commitment discounts are usually reported as savings. That is accurate and incomplete. The instrument has two halves: a lower rate, and an obligation to pay for a stated level of usage through the term. Reporting shows the first. The second becomes visible only when usage falls below the level committed.

The providers are plain about the obligation. AWS states of Savings Plans that "the terms of the commitment can't be changed after purchase". A return is possible only for a plan with an hourly commitment of $100 or less, purchased in the past seven days and in the same calendar month. Microsoft states that Azure savings plan purchases cannot be cancelled or refunded, and that "unused commitment for an hour expires and does not roll over".

The last point deserves attention. Utilisation is settled hour by hour. A quiet weekend cannot be offset by a busy Monday. Each under-used hour is a permanent loss, recorded at the moment it passes.

The position of this article follows from that. A commitment should be governed as a fixed obligation attached to an architecture, not as a discount attached to a bill. The people able to strand it are architects and platform teams, and they are usually not in the room when it is bought.

## How architecture change strands a commitment

A commitment is sized against a forecast. The forecast is a description of an architecture: these services, at this scale, in this pricing model, for this long. Four kinds of change break the description.

| Change during the term | Effect on eligible usage | Typical origin |
|---|---|---|
| Rightsizing or scheduling | Falls in volume | A cost optimisation programme |
| Re-platforming to a different service | Moves outside what the instrument covers | A modernisation or migration |
| Moving to another provider or back on premises | Leaves the provider | A sourcing or resilience decision |
| Retiring the workload | Disappears | A product decision |

The first row is the uncomfortable one, because the change is itself a cost saving. The FinOps Foundation's Rate Optimization guidance notes that rate and usage optimisation interact, and that acting on both sets of recommendations can double count savings or strand commitments. A rightsizing recommendation and a commitment recommendation are each computed from the same historical usage. Acting on the second fixes the usage that the first then removes.

The scope of the instrument decides how much change it can absorb. The current names matter here. AWS offers four Savings Plans types: Compute, EC2 Instance, SageMaker AI and Database Savings Plans. Azure offers a savings plan for compute and a savings plan for databases, with one-year or three-year terms, alongside reservations. Google Cloud offers spend-based and resource-based committed use discounts, and Flexible Savings Plans that apply across products. A spend-based instrument tolerates movement within the services it covers. A resource-based one is tied to the resource. Neither tolerates usage that leaves its scope.

## Coverage and utilisation only mean something as a pair

Two measures describe a commitment position. Coverage is the share of eligible spend that is covered by commitments. Utilisation is the share of the commitment that is being used. The FinOps Foundation's guidance is to report "coverage and vacancy", vacancy being the unused part.

Each measure, held alone, rewards the wrong behaviour.

- **Coverage alone rewards over-commitment.** Buying more always raises coverage. The cost appears later, as vacancy.
- **Utilisation alone rewards under-commitment.** A small commitment is always fully used. The cost is the discount forgone on everything above it.

There is a further trap, and it is the reason the pair has to be read against the change plan. When eligible usage falls, coverage rises. The commitment has not changed, but it now covers a larger share of a smaller base. A coverage report improves at the moment the commitment begins to be stranded.

### An illustrative example

The figures below are illustrative and are stated in units per hour to avoid implying any price or discount.

| | Before migration | After migration |
|---|---|---|
| Eligible usage | 120 | 70 |
| Commitment | 100 | 100 |
| Coverage | 83% | 100% |
| Utilisation | 100% | 70% |
| Vacancy | 0 | 30 |

A team that tracks coverage sees the figure move from 83% to 100% and reports progress. The 30 units of vacancy are paid for in every remaining hour of the term. Nothing failed. A migration delivered what it promised, and the commitment bought a year earlier was not among the things it was asked to consider.

A workable threshold model therefore has three parts: a floor for utilisation, a band for coverage with an upper as well as a lower edge, and a rule that both are recomputed when eligible usage changes materially. The basis for each is the forecast the commitment was bought against and the unused share that was accepted at purchase.

## Expiry is a dated event, and so are the rules

A commitment portfolio has a calendar, and three kinds of date belong on it.

**The end of each term.** When a commitment expires, the usage it covered is charged at the standard rate. Spend rises with no change in usage. If the date was not tracked, the rise is investigated as an anomaly. Renewal is also the one point at which the commitment can be resized without loss, so the evidence for the decision has to be ready before the date, not assembled after it.

**Changes to the provider's rules.** Microsoft has stated that, starting 1 February 2027, reservations purchased after that date are not eligible for exchange if the corresponding service is supported by savings plans. Earlier purchases keep one final exchange. A strategy that treats exchange as its exit from a poorly fitting reservation has an expiry date of its own.

**Changes to the billing model.** Google Cloud is moving some spend-based committed use discounts to a consumption model that applies the discount directly instead of as a credit, and its billing data gained a Consumption Model field. A utilisation report built on credit fields can misstate the position after the move, without an error.

The data for this calendar is improving. FOCUS 1.4, ratified on 4 June 2026, extends the Contract Commitment dataset from 13 to 30 columns and adds a Commitment Program Eligibility Details column, so that coverage can be computed against the spend that was eligible for a commitment. In September 2026 no provider was listed at version 1.4, so a multi-cloud commitment register is still assembled by hand from datasets of different versions.

One practice reduces the exposure without any tooling. Commitments bought in smaller tranches, with end dates spread through the year, create regular points at which the position can be reduced. A single large purchase creates one exit, a long way off.

## The decision before a migration

The expensive mistakes are made when a commitment and a migration are planned by different people in the same quarter. A short test, applied before either decision is final, prevents most of them.

1. **List every commitment whose term overlaps the change.** Include its scope, its hourly or resource level and its end date.
2. **Project eligible usage through the term, with the change applied.** The projection uses the migration plan, not the trailing average.
3. **Compute utilisation for each remaining period.** Where it falls below the agreed floor, the vacancy is a cost of the migration and belongs in its business case.
4. **Choose between the options that remain.** Delay the change until the term ends, move other eligible usage under the commitment, accept the vacancy as a recorded decision, or let a commitment lapse at its next end date instead of renewing.
5. **Name the owner of the decision.** The commitment has a financial owner and the migration has a technical one. The record shows who accepted the interaction between them.

The same test runs in the other direction. Before a commitment is bought or renewed, the change plan for its term is read, and the forecast is reduced by what the plan will remove.

## AI capacity raises the stakes

Commitments for AI capacity follow the same logic with less room for error. The FinOps Foundation's guidance on AI notes that bursty early usage argues against commitments, "but resource scarcity may require commitments". Capacity is often committed to secure supply, not to lower a rate.

The instruments are strict. Microsoft states that provisioned throughput for Foundry Models is billed hourly per unit deployed "regardless of the number of tokens consumed". AWS states of EC2 Capacity Blocks for ML that cancellations are not allowed. If the workload is not ready on the start date, or a model change reduces the throughput needed, the obligation is unchanged.

Where under-use is accepted knowingly as the price of supply, that acceptance is a decision. It is recorded with the utilisation that was expected, so that a later reading can be compared with it.

## What this means for assurance

A commitment is evidence of a forecast. The evidence expires when usage changes, and usage changes whenever the architecture does. Three conclusions follow.

First, commitment utilisation is a continuing measure. A position reviewed at purchase and again at renewal is unproven for the whole of the term between them.

Second, the trigger for re-proving is a change event as much as a date. Rightsizing, re-platforming, retirement and a change of pricing model each call for coverage and utilisation to be recomputed against what remains.

Third, the correction is a decision, and it has an owner. Xyvionix gives no financial advice and does not buy, exchange or return commitments. What assurance holds is the evidence around the decision: the forecast, the readings since purchase, the dates ahead, and the effect of planned change. How that sits with allocation, anomaly response and waste is set out in [Cloud Cost Assurance](/cloud-cost-assurance), and the wider question of whether technology spend still produces the outcome it was approved for is covered in [Technology Value Assurance](/technology-value-assurance).

A commitment that nobody has tested against the change plan is a fixed cost waiting for an architecture decision to expose it.
