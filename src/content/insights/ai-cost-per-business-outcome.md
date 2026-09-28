---
title: AI cost per business outcome
h1: Token price is the wrong unit for managing AI cost
seoTitle: 'AI Cost per Business Outcome, Not per Token | Xyvionix'
description: >-
  Token price is one of four multipliers in AI cost. How to define an outcome
  unit, attribute retries, tool calls and failed attempts, and set a threshold.
summary: >-
  A cheaper token can produce a dearer outcome. Cost per successful outcome is
  the product of price, tokens per call, calls per attempt and attempts per
  success, and only the first of those is on the price sheet.
lede: >-
  Token price is the wrong unit for managing AI cost because it is one of four
  multipliers, and the other three move in the opposite direction when it is
  reduced. The unit the business pays for is a successful outcome, such as a
  resolved case. Its cost is everything spent in the period, including retries,
  tool calls and attempts that failed, divided by the outcomes that passed an
  agreed test. That figure needs a ceiling, a paired quality floor and a list of
  events that force it to be recomputed.
ogQuestion: What does one successful AI outcome cost, failed attempts included?
category: Technology Value
author: Xyvionix Research
featured: false
cluster: value
secondary:
  - ai
parent: insights
state: assured
audience:
  - FinOps Leadership
  - Head of AI
  - CTO
  - CFO office
intent: >-
  Informational: why token price misleads, how to define an outcome unit,
  attribute full cost to it and set a threshold, with an illustrative worked
  example
related:
  assurance:
    - ai-cost-assurance
    - unit-economics-assurance
    - technology-value-assurance
  useCases:
    - ai-cost-spike
  technologies:
    - vllm-production-assurance
  industries:
    - software-technology
  insights:
    - cloud-commitment-utilisation-risk
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'FinOps Foundation: Unit Economics capability'
    url: 'https://www.finops.org/framework/capabilities/unit-economics/'
  - title: 'FinOps Foundation: FinOps for AI technology category'
    url: 'https://www.finops.org/framework/technology-categories/ai/'
  - title: 'FinOps Foundation: how token pricing really works'
    url: 'https://www.finops.org/wg/genai-finops-how-token-pricing-really-works/'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'OpenAI: pricing'
    url: 'https://developers.openai.com/api/docs/pricing'
  - title: 'OpenAI: reasoning'
    url: 'https://developers.openai.com/api/docs/guides/reasoning'
  - title: 'Gemini API: pricing'
    url: 'https://ai.google.dev/gemini-api/docs/pricing'
  - title: 'FinOps Foundation: introducing FOCUS 1.4'
    url: 'https://www.finops.org/insights/introducing-focus-1-4/'
  - title: 'FOCUS 1.5 release scope'
    url: 'https://focus.finops.org/focus-1-5-release-scope/'
  - title: 'Linux Foundation: launch of the Tokenomics Foundation'
    url: 'https://www.linuxfoundation.org/press/linux-foundation-launches-the-tokenomics-foundation-to-define-the-economics-and-roi-of-ai-value'
  - title: 'State of Tokenomics, Release Candidate 1.0'
    url: 'https://www.tokeneconomics.com/state-of-tokenomics/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## A cheaper token, a dearer outcome

The pattern is common enough to describe generically. A team runs an AI workload on a capable model. The invoice grows. A review finds a smaller model at a fraction of the price per million tokens, and the workload is moved. Spend per request falls at once and the change is reported as a saving.

Over the following weeks the smaller model completes fewer tasks at the first attempt. The agent takes more steps to reach an answer. More cases are retried and more are handed to a person. None of this appears on the price sheet. Some of it appears on the invoice as volume, where it is read as growth in demand.

The decision rested on the one number that was easy to obtain. Token price is published, dated and comparable across providers. It is an input to cost, not a measure of it. A business buys resolved cases, processed documents and completed tasks, and the price of a token says little about what one of those costs.

## Four multipliers, and price is only the first

The cost of one successful outcome is a product of four terms: price per token, tokens per model call, model calls per attempt, and attempts per successful outcome. Each term has a different driver and a different owner.

| Multiplier | What moves it | Who controls it |
|---|---|---|
| Price per token | Price sheet, service tier, context length, caching | The provider, and the routing decision |
| Tokens per call | Conversation history, tool definitions, reasoning output | Prompt and tool design, and the behaviour of users |
| Calls per attempt | Agent loops, tool errors, step limits | Agent design and model capability |
| Attempts per successful outcome | The success rate against the quality test | Model capability, retrieval quality and the test itself |

The terms are not independent, and that is the mechanism behind the pattern above. A change that lowers the first term can raise the third and fourth.

The first term is itself several figures. Anthropic's published list prices set output at five times input across its current range. OpenAI bills long-context requests at twice the input rate and one and a half times the output rate.

The second term contains cost that the response does not show. OpenAI documents that reasoning tokens are not visible through the API and are billed as output tokens. Anthropic bills tool overhead as input: its tool-use system prompt adds 286 to 675 tokens depending on the model. The FinOps Foundation's paper on token pricing describes how each conversational turn resends the full history, so input grows with every step an agent takes.

## Defining the outcome unit

The FinOps Foundation's Unit Economics capability separates resource efficiency metrics from business unit metrics, and gives cost per case resolved as an example of the second kind. Its KPIs for AI sit on the other side of that line. Cost per Inference is defined as total inference costs divided by inference requests. A request is not an outcome. One resolved case may take forty requests or four.

An outcome unit that can carry a threshold passes five tests.

1. **It is counted outside the AI platform.** The count comes from the case, claims or order system, not from the application's own logs.
2. **It has a pass test.** "Resolved" means the case was closed and stayed closed for an agreed period. Without a test, every completed response counts as a success.
3. **It has a business owner.** Someone outside the engineering team owns the definition.
4. **It is stable, or restated.** When the counting rule changes, the historic series is recomputed. Otherwise the change shows up as a false step in cost.
5. **It can be joined to cost.** An identifier from the business record is carried into the trace of every model call made on its behalf, including the calls that failed.

The second test creates a timing problem. If success means a case was not reopened within seven days, the denominator for a given week is not known until the following week. Cost per outcome is therefore provisional twice: until the success window closes, and until the billing period is final. Both statuses belong beside the number.

## What belongs in the numerator

The rule is asymmetric. Every unit of spend in the period goes into the numerator, whatever became of the attempt it paid for. Only outcomes that passed the test go into the denominator. Most understated figures come from applying the success filter to both sides.

| Cost line | Why it is commonly left out |
|---|---|
| Retries after a tool or validation error | Logged as new requests with no link to the original task |
| Attempts that failed or were abandoned | Removed as unrepresentative, which deletes the cost a falling success rate creates |
| Reasoning output | Billed as output, absent from the response body |
| Tool definitions and system overhead | A fixed charge on every call, repeated on each loop iteration |
| Evaluation and judge calls | Run under a separate key or project and treated as an engineering cost |

One boundary has to be decided, not discovered: the cost of the person who handles a case the system could not resolve. Including it turns the figure into the cost of the process. Excluding it keeps the figure to technology cost. The defensible position is to hold technology cost per successful outcome as the threshold figure and report the volume passed to people beside it, so that a saving achieved by moving work onto staff is visible as such.

## An illustrative worked example

Every figure in this section is illustrative. The amounts are round numbers in an unnamed currency, chosen so the arithmetic can be followed, and they are not any provider's prices.

A support assistant receives 10,000 cases in a week. An outcome is a case closed by the assistant and not reopened within seven days. Configuration A uses a larger model. Configuration B uses a smaller model at one third of the token price.

| Illustrative measure | Configuration A | Configuration B |
|---|---|---|
| Model calls per attempt | 6 | 9 |
| Cost per attempt | 0.30 | 0.15 |
| Spend on first attempts | 3,000 | 1,500 |
| Attempts retried | 1,500 | 4,000 |
| Spend on retries | 450 | 600 |
| Evaluation and judge spend | 200 | 200 |
| Total spend | 3,650 | 2,300 |
| Successful outcomes | 7,300 | 4,000 |
| Cost per successful outcome | 0.50 | 0.575 |
| Cases passed to people | 2,700 | 6,000 |

In this illustrative case the token price fell by two thirds, total spend fell by 37% and the cost of each successful outcome rose by 15%. The invoice records a saving. The outcome figure records a workload that costs more for each case it resolves and sends 3,300 more cases a week to staff.

Configuration B pays a third of the price per token but only halves the cost of an attempt, because each attempt takes nine calls instead of six. The remainder of the advantage is lost in the fourth multiplier.

The example does not show that larger models are better value. With a different task and success rate the comparison reverses. It shows that the comparison cannot be made from the price sheet.

## Setting the threshold

A threshold on cost per outcome is a ceiling with a basis. Three bases are in common use, and the choice belongs to the owner of the outcome, not to the team that runs the model.

- **The alternative.** What the same outcome costs when a person or the previous system produces it. Above that figure the AI workload has no economic case.
- **The margin.** What the product or process can spend on the outcome and still hold the margin in its plan.
- **The approved case.** The unit cost stated when the workload was funded, until someone with authority changes it.

Three further decisions make the ceiling usable.

First, the ceiling is paired with a floor on the success rate. Cost per outcome can be improved by attempting only the easy cases, and a cost threshold alone rewards that.

Second, the threshold is applied to the distribution as well as the mean. A small share of looping tasks can consume a large share of spend while the average stays inside its limit.

Third, the figure has recomputation triggers as well as a schedule. Some are dated in advance. The Gemini API lists Gemini 3.8 Flash at a promotional price of $0.75 per million input tokens and $3.75 per million output tokens until 31 December 2026, and $1.50 and $7.50 afterwards. Any workload on that model has a known change in its first multiplier on 1 January 2027. Others are events: a change of model, prompt, tool definition, service tier or outcome definition. A figure that has not been recomputed since one of these is not inside its threshold. Its position is unknown.

## What the measurement costs

Cost per outcome is harder to produce than cost per token, and the difficulty is the reason it is rarely held.

**The join has to be built.** Billing data does not know which business record a request served. The FinOps Foundation ratified FOCUS 1.4 on 4 June 2026 without native token columns. Model identity and token consumption are scoped for FOCUS 1.5, with ratification planned for 3 December 2026. Until then the numerator comes from provider usage data and application traces, joined to billing by the enterprise.

**Precision has a price.** Per-case attribution of every token is expensive to maintain. Attribution at workload level is often enough to hold a threshold. The finer join is needed when the threshold is breached and the cause has to be found.

**The standards are unfinished.** The Linux Foundation launched the Tokenomics Foundation on 4 August 2026, and its named deliverables include a reference model for full AI cost accounting. Its State of Tokenomics survey, published as Release Candidate 1.0 on 23 September 2026, reports that 39% of respondents are not confident they can connect AI spend to a business outcome a CFO would accept.

## What this means for assurance

Cost per successful outcome is evidence in the strict sense. It is a tested result, attributable to a period, a price sheet, a configuration and an outcome definition. It expires when any of those changes.

Held that way, it supports a state. The workload is Assured while the current figure is inside its ceiling and the success rate is above its floor. It is Degrading when the figure is moving toward the ceiling, and At risk when the ceiling is breached. It is Unassured when the figure has not been recomputed since a trigger, or when the outcome count cannot be reconciled to the business system.

Token price remains useful as one of four explanations for movement in the figure that matters. The continuing controls around that figure are set out in [AI Cost Assurance](/ai-cost-assurance), and the general method for unit cost across the estate in [Unit Economics Assurance](/unit-economics-assurance).
