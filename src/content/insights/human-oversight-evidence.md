---
title: Human oversight that leaves evidence
h1: When a human approval stops counting as a control
seoTitle: 'Human Oversight Evidence: Measuring AI Approvals | Xyvionix'
description: >-
  Approval steps decay into rubber stamps. Six measures show whether human
  oversight of AI still works, and when an approval no longer counts as a
  control.
summary: >-
  An approval record shows that someone clicked. It does not show that someone
  decided. Override rate, review time, reviewer load, sampled disagreement and
  escalation outcomes, read together, show which of the two happened.
lede: >-
  Human oversight counts as a control only while it can be shown to produce
  decisions. An approval log proves that a person responded, and nothing more.
  Six measures, read together, show whether the person reviewed: override rate,
  review time, reviewer load, sampled disagreement, challenge case results and
  escalation outcomes. When they show approvals granted faster than the material
  can be read, by reviewers who miss known faults, the gate is still present and
  the control has lapsed.
ogQuestion: Do your AI approvals record a decision, or only a click?
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary: []
parent: insights
state: degrading
audience:
  - Head of AI
  - Technology Risk
  - AI Governance
  - Internal Audit
intent: >-
  Informational: how approval steps degrade, how to measure whether human
  oversight of AI is effective, and the conditions under which an approval no
  longer counts as a control
related:
  assurance:
    - ai-agent-assurance
    - ai-governance-assurance
  useCases:
    - ai-agent-with-write-access
    - ai-audit-readiness
  technologies:
    - azure-ai-assurance
  industries:
    - insurance-claims-ai-assurance
    - healthcare-ai-assurance
  insights:
    - ai-audit-evidence-requirements
    - ai-agent-permission-risk
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'EU AI Act Service Desk: Article 14, human oversight'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14'
  - title: 'EU AI Act Service Desk: Article 26, obligations of deployers'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26'
  - title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'Colorado SB26-189'
    url: 'https://leg.colorado.gov/bills/sb26-189'
  - title: 'EIOPA: Opinion on artificial intelligence governance and risk management'
    url: 'https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en'
  - title: 'Microsoft: defend against indirect prompt injection'
    url: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
  - title: 'OWASP Top 10 for Agentic Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/'
  - title: 'Model Context Protocol specification 2026-07-28: tools'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools'
  - title: 'OpenAI: agent builder safety'
    url: 'https://developers.openai.com/api/docs/guides/agent-builder-safety'
  - title: 'LangGraph: interrupts'
    url: 'https://docs.langchain.com/oss/python/langgraph/interrupts'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The gate that is always open

An approval step is added when an AI system is first allowed to do something that matters: issue a payment, decline a claim, change a record. In the first weeks reviewers read each request and refuse a meaningful share. The refusals are used to improve the system. Volume grows.

Some months later the same step approves almost everything within seconds. It still appears in the architecture diagram and the policy, and it is still cited as the control that makes the system acceptable. Nothing in the approval log separates it from a working control. Every entry has a name, a time and a decision.

Vendors and standards bodies describe the same decay. Microsoft's guidance on indirect prompt injection calls human-in-the-loop "the last line of defense", and its AI Red Team reported in June 2026 that the control is bypassed through consent fatigue and incremental escalation. The OWASP Top 10 for Agentic Applications 2026 lists Human-Agent Trust Exploitation as ASI09. OpenAI's agent safety guidance advises keeping tool approvals on, and states that complete elimination of injection risk is not possible.

Human approval is therefore positioned as the compensating control for a problem that has no complete technical answer. A control carrying that weight needs evidence that it works.

## Why approval decays

The decay is not a failure of diligence. It follows from how the step is built.

**The base rate teaches approval.** If the system is right nearly every time, approving is nearly always correct. A reviewer who stops reading is rarely wrong, and the workflow gives no signal on the occasions when they are.

**Refusal costs more than approval.** Approving ends the task. Refusing starts one: a reason, a correction, a conversation with whoever is waiting. The effort sits on one side only.

**The reviewer sees a summary.** The request shows what the agent proposes. The evidence that would confirm or contradict it sits in another system. Review becomes a judgement of whether the summary sounds plausible.

**Requests escalate in small steps.** Each request is slightly larger than the last one approved. No single step looks like the moment to object.

**Volume outgrows attention.** The number of requests rises with adoption. The number of reviewers does not.

None of these changes the approval log. All of them change what an approval means.

## What the published expectations ask for

The expectations below are stated as published. Whether any of them applies to a given system is a decision for the enterprise and its advisers.

| Source | What it states | Date |
|---|---|---|
| EU AI Act, Article 14 | High-risk systems are designed so that natural persons can effectively oversee them. Overseers can understand the system's limitations, remain aware of automation bias, decide not to use or to override the output, and interrupt the system | Applies to Annex III systems from 2 December 2027, as amended by Regulation (EU) 2026/1744 |
| EU AI Act, Article 26 | Deployers assign oversight to natural persons who have the necessary competence, training and authority, and the necessary support | Same application date |
| Colorado SB26-189 | Consumers may request meaningful human review and reconsideration after an adverse consequential decision. Records are retained for at least three years | Signed 14 May 2026, operative from 1 January 2027 |
| EIOPA Opinion on AI governance and risk management | Sufficient staff training to ensure effective human oversight, for insurance AI systems that are neither prohibited nor high-risk under the AI Act | 6 August 2025 |
| Model Context Protocol specification, revision 2026-07-28 | There should always be a human in the loop with the ability to deny tool invocations | 28 July 2026 |

Articles 14 and 26 are cited from the text of Regulation (EU) 2024/1689. The amendments made to them by the 2026 regulation were not reviewed line by line for this article, so the amended text should be checked before relying on detail.

In the regulatory sources the recurring words are "effective" and "meaningful". The existence of a step answers neither. The AI Act names automation bias, which is the tendency the previous section describes. The evidence implied is a record that oversight changed outcomes, that the overseer had the means and authority to do so, and that the stop function works.

## Six measures of oversight

Each measure is taken from records the approval workflow already produces, or from a small amount of additional sampling.

| Measure | How it is taken | What it cannot show alone |
|---|---|---|
| Override rate | Share of requests refused or modified, by request type and by reviewer | Whether a low rate reflects a good system or an absent reviewer |
| Review time | Distribution of time from request presented to decision, compared with the time a competent reviewer needs to read the material | Whether the time was spent reading |
| Reviewer load | Decisions per reviewer per hour, and the longest unbroken run | Whether the load is too high for this type of request |
| Sampled disagreement | A second reviewer decides a sample of approved requests without seeing the first decision | Which of the two reviewers was right |
| Challenge case results | Requests with a known fault are placed in the queue in a form that cannot execute, and the share refused is recorded | Performance on faults nobody anticipated |
| Escalation outcomes | What happened to each escalated request: changed, approved unchanged, or left unanswered | Whether the right requests were escalated |

The first three describe the reviewer's behaviour. The next two test it against an independent reference. The last tests whether the organisation behind the reviewer responds. An escalation path that returns every request approved and unchanged teaches reviewers not to use it.

## Reading the measures together

Override rate is the measure most often reported and the least informative alone. A rate near zero is what a well-tuned system produces. It is also what an unread queue produces. The approval log cannot tell the two apart, which is why the independent measures matter.

| Override rate | Review time | Sampled disagreement and challenge cases | Reading |
|---|---|---|---|
| Low | At or above reading time | Low disagreement, faults caught | The system is performing and oversight is working |
| Low | Below reading time | High disagreement, faults missed | Approval without review |
| High | Any | Any | Oversight is working, and the system is not ready for the volume it is given |
| Falling over time | Falling over time | Not measured | Unknown. This is the usual position |

The fourth row deserves attention. A falling override rate is normally presented as evidence that the system has improved. Without the independent measures it is equally evidence that review has thinned. Both trends look identical in the log.

## The point at which approval stops being a control

An approval step no longer counts as a control when any one of five conditions holds. The boundaries are agreed for each process by its business owner, because they depend on what a wrong action costs.

1. **Decisions are faster than reading.** The typical review time for a request type is below the time a competent reviewer needs to read what is presented.
2. **Known faults pass.** Challenge cases are approved more often than the process can tolerate.
3. **Independent reviewers disagree.** Sampled disagreement exceeds the error rate the process can absorb.
4. **The reviewer cannot act.** The named reviewer lacks the authority to refuse, or a test of the stop function on the current version fails.
5. **The load is arithmetically impossible.** Requests per reviewer, multiplied by the reading time, exceed the hours available.

The fifth can be checked without any sampling. In an illustrative case, one reviewer decides 400 requests in a seven-hour shift, which allows 63 seconds each. If reading the evidence for that request type takes three minutes, the queue needs 20 hours of review and receives seven. No further measurement is needed to know that most approvals in this illustrative case were not reviews.

When a condition holds, the state of the control is At risk, whatever the approval log shows. Where none of the measures has been taken, the state is Unassured.

## The trade-offs

**Fewer approvals, better decisions.** The usual correction is to move the gate to fewer, higher-consequence actions so that each receives attention. That leaves lower-consequence actions without a person in the path. They need a deterministic limit in its place, such as a policy evaluated outside the model.

**Measurement changes behaviour.** Reviewers who know that decision time is recorded can wait before approving. Time alone is therefore weak evidence, and challenge cases and sampled disagreement carry more weight.

**Challenge cases must be safe.** A seeded fault that an inattentive reviewer approves must not execute. The mechanism that prevents execution is part of the control and needs its own test.

**Placement matters as much as presence.** LangGraph documents that on resume a node re-executes from its start, so side effects before the interrupt must be idempotent. A gate placed after a write can repeat the write when it is approved. Approval logic is tested, not only configured.

## What this means for assurance

An approval is a signal. It becomes evidence of oversight when it is accompanied by measures showing that a decision was made by someone able to make it. That evidence expires. Reviewers change role, volume grows, the system's error rate moves, and a framework upgrade alters how a paused action resumes.

The record an examiner will ask for is therefore a series over the period: the six measures by request type, the dated tests of override and stop, and the corrections made when a condition was met. How that record fits with the other evidence an examination draws on is set out in [what AI audit evidence requires](/ai-audit-evidence-requirements).

The continuing controls are described in [AI Agent Assurance](/ai-agent-assurance), and the assignment of overseers with authority in [AI Governance Assurance](/ai-governance-assurance). A person in the loop is a design decision. A person who decides is a measured outcome, and only the second is a control.
