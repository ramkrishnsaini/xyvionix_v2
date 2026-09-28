---
title: Why agentic AI needs assurance first
h1: An AI agent acts for the business. Proof has to come before reliance
seoTitle: 'Why Agentic AI Needs Assurance Before Autonomy | Xyvionix'
description: >-
  Why assurance is the precondition for agentic AI: what an agent puts at
  stake, why a launch review expires, and what must be proven before it is
  relied on.
summary: >-
  An agent acts, so its errors are completed transactions. A launch review
  proves one combination of model, tools and permissions, and that combination
  changes. Four things have to be proven before reliance, and kept proven.
lede: >-
  Agentic AI needs assurance first because an agent acts on the business with
  delegated authority, and the evidence that it acts within bounds expires
  whenever its model, tools or permissions change. A review at launch proves
  one combination on one date. Before an agent is relied on, four things have
  to be proven from the running system: what it is permitted to do, what it
  did, that a person can stop it, and that every action is attributable. The
  proof is then held continuously, because the agent keeps changing.
ogQuestion: Would you rely on your agent today on the evidence you hold today?
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary:
  - cyber
  - change
parent: why-assurance
state: unassured
audience:
  - CIO
  - CTO
  - CISO
  - Head of AI
  - Technology Risk
intent: >-
  Informational and commercial: the business case for assurance as the
  precondition for relying on an AI agent. Covers what an agent can do, what
  that puts at stake, why a review at launch cannot cover a system whose tools,
  permissions and model change afterwards, the four things that have to be
  proven before an agent is given write access, and why that proof has to be
  continuous. Distinct from ai-agent-permission-risk, which is about the
  permission model, and from the use case ai-agent-with-write-access, which is
  one scenario.
related:
  assurance:
    - ai-agent-assurance
    - ai-assurance
    - mcp-security-assurance
    - ai-security-assurance
  useCases:
    - ai-agent-with-write-access
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - ai-agent-permission-risk
    - mcp-servers-trust-boundary
    - human-oversight-evidence
evidence:
  - name: Register of acting agents
    detail: >-
      Every agent that can act in production, with the business process it
      serves, its owner and a sponsor who is still in role. The four proofs
      apply only to agents that are known.
  - name: Permitted-action record
    detail: >-
      The authority each agent holds, read from the systems that enforce it,
      set beside the authority its approved tasks need. The difference is
      standing exposure.
  - name: Outcome record
    detail: >-
      For each action of consequence, the state of the target system after the
      action, retained separately from the agent's own account of what it did.
  - name: Stop and override test results
    detail: >-
      Dated results of halting a running agent and of rejecting a pending
      action, with the time taken and the number of actions that completed
      before the halt took effect.
  - name: Attribution trace
    detail: >-
      A sampled action followed from request to outcome without reconstruction:
      one agent identity, one delegating user where there is one, one approval
      where required, one result.
  - name: Dependency change register
    detail: >-
      The model version, tool definitions, framework version and protocol
      revision the agent runs on, with the date each last changed. This is what
      decides whether the other evidence still applies.
thresholds:
  - signal: Evidence older than the agent's last change
    basis: >-
      Proof describes one combination of model, tools, permissions and
      framework, so its validity is set by the change record and not by the
      calendar alone
    lostWhen: >-
      Any element of the combination has changed since the evidence was
      gathered and no re-test has been run
  - signal: Authority held beyond what the approved tasks need
    basis: >-
      The largest loss the business process can absorb from a single wrong
      action, repeated across every record the agent can reach
    lostWhen: >-
      Write or administrative authority that the tasks do not use persists
      beyond the agreed review window
  - signal: Time and actions between the decision to stop and the halt
    basis: >-
      The cost of the actions the agent can complete while a stop is taking
      effect, as judged by the owner of the process
    lostWhen: >-
      A stop test fails, exceeds the agreed interval, or has not been repeated
      since the deployment path changed
  - signal: Actions that cannot be attributed
    basis: >-
      The audit, dispute and incident reporting obligations that apply to the
      process the agent operates in
    lostWhen: >-
      Any action of consequence cannot be traced to an agent identity, an
      authority and an outcome
  - signal: Agents acting outside the register
    basis: The requirement that every system acting for the business has a named owner
    lostWhen: An agent is found acting in production with no register entry or no sponsor in role
faqs:
  - q: Why does agentic AI need assurance before launch and not after?
    a: >-
      Because authority is granted at launch. If evidence is gathered
      afterwards, the agent has already been acting on the business with
      permissions nobody measured. Identity, the outcome record and the stop
      path are also structural, so adding them later means changing a system
      the business has come to depend on.
  - q: Is a security review or red team exercise before go-live enough?
    a: >-
      It is necessary and it is dated. The review proves one combination of
      model, tools, permissions and framework. Tool definitions can change at
      run time, models are retired and replaced on the provider's calendar, and
      permissions accumulate. Each change voids the part of the review it
      touches.
  - q: Does a human approval step remove the need for assurance?
    a: >-
      No. An approval step is a control whose effectiveness has to be shown.
      The Microsoft AI Red Team reports approval being bypassed through consent
      fatigue and incremental escalation. A gate that is present and never
      rejects anything is a recorded click.
  - q: What does it mean for an agent to be Unassured?
    a: >-
      It means no current evidence exists for the agent as it now runs. The
      agent may be behaving correctly. Nobody can show that it is. The first
      action is to gather evidence, and until then the authority the agent
      holds is an unmeasured risk that the business cannot formally accept.
  - q: Does putting assurance first slow down the adoption of agents?
    a: >-
      It changes the order, and it adds work before the first release.
      Authority is extended in steps, each one granted when the evidence for
      the previous step is current. The scope is set by consequence, so an
      agent that only reads warrants far less than one that releases payments.
sources:
  - title: 'OWASP Top 10 for LLM Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/'
  - title: 'OWASP Top 10 for Agentic Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/'
  - title: 'EU AI Act Service Desk: Article 14, human oversight'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14'
  - title: 'EU AI Act Service Desk: Article 12, record-keeping'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-12'
  - title: 'EU AI Act Service Desk: Article 26, obligations of deployers'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26'
  - title: 'European Commission: AI Omnibus enters into force'
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force'
  - title: 'OCC Bulletin 2026-13: model risk management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
  - title: 'FCA: long-term review of AI in retail financial services (Mills Review speech)'
    url: 'https://www.fca.org.uk/news/speeches/fca-long-term-review-ai-retail-financial-services-designing-unknown'
  - title: 'Model Context Protocol specification 2026-07-28: tools'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools'
  - title: 'Model Context Protocol specification 2026-07-28: changelog'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/changelog'
  - title: 'Model Context Protocol specification 2026-07-28: security best practices'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices'
  - title: 'Microsoft Foundry: model retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Microsoft Copilot Studio: select an agent model'
    url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-select-agent-model'
  - title: 'Amazon Bedrock Agents Classic: maintenance mode'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html'
  - title: 'Anthropic: model deprecations'
    url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations'
  - title: 'Anthropic: model IDs and versions'
    url: 'https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions'
  - title: 'Anthropic: a postmortem of three recent issues'
    url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'
  - title: 'Anthropic: demystifying evals for AI agents'
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
  - title: 'Anthropic: prompt injection defenses'
    url: 'https://www.anthropic.com/research/prompt-injection-defenses'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
  - title: 'OpenAI: agent builder safety'
    url: 'https://developers.openai.com/api/docs/guides/agent-builder-safety'
  - title: 'Microsoft Learn: defend against indirect prompt injection'
    url: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
  - title: 'MITRE ATLAS data releases'
    url: 'https://github.com/mitre-atlas/atlas-data/releases'
  - title: 'Google ADK 2.0'
    url: 'https://adk.dev/2.0/'
  - title: 'Microsoft Entra Agent ID: key concepts'
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/key-concepts'
  - title: 'Microsoft Agent 365: general availability'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-28'
lastReviewed: '2026-09-28'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## What an AI agent can do that an assistant cannot

An AI agent acts, and an action changes the business where an answer only informs it. An assistant produces text that a person reads, judges and then uses or discards. An agent holds a credential, selects its own tools, chains steps together and writes to systems of record. It issues the refund, changes the entitlement, updates the customer record or merges the change.

That difference moves the error. A wrong answer is a draft that a person can still reject. A wrong action is a completed transaction that has to be found, reversed and explained.

OWASP draws the same line between its two lists. Its Top 10 for LLM Applications 2026, published in August 2026, owns the risk while the model is a component inside an application. Once the model becomes an actor with tools, memory and downstream consequences, OWASP says the risk moves to its Top 10 for Agentic Applications. In the same edition Excessive Agency climbed to third place, which OWASP described as the most consequential move on the list.

An enterprise that adopts an agent is delegating authority. The decisions are taken at run time, partly on the basis of content the agent has read, at a speed no person works at. Delegation of authority is a governance decision, and a governance decision is taken on evidence.

## What agentic AI puts at stake for the business

An agent puts four things at stake: money and records, the speed at which a loss grows, accountability for the action, and the ability to answer a supervisor.

**Direct loss.** The actions are real. A payment released, a record overwritten or a message sent to a customer has its consequence whether or not the reasoning behind it was sound.

**Loss at machine speed.** A person who makes a mistake is slowed by attention and working hours. An agent repeats the same action across every record it can reach before anyone has reviewed the first. The OWASP Top 10 for Agentic Applications names cascading failures as a category of its own, because in a chain of agents one wrong step becomes the input to the next.

**Accountability.** After an incident the business is asked which system acted, under whose authority and with whose approval. If the answer has to be reconstructed from several sets of logs, an operational incident becomes an audit finding.

**Supervisory exposure.** The published expectations are about continuing control, and they leave the standard of proof with the enterprise. Article 14 of the EU AI Act requires high-risk systems to be designed so that people can oversee them effectively, including the ability to override and to interrupt through a stop button or a similar procedure. It applies to Annex III systems from 2 December 2027. In US banking, OCC Bulletin 2026-13 of April 2026 replaced the 2011 model risk guidance and states that generative and agentic AI models are not within its scope. A bank that deploys an agent has no supervisory template to adopt, so its own documented threshold and its proof of meeting it carry the weight. In the UK, the FCA's Mills Review asked what reasonable steps under the Senior Managers and Certification Regime look like when the model updates weekly.

Each of the four is a cost that arrives after the agent is relied on. None of them is visible in a demonstration.

## Why a review at launch cannot cover an agent

A launch review proves one combination of model, tools, permissions and framework on one date, and every element of that combination changes afterwards. Most of them change on a calendar the enterprise does not set.

| What the agent depends on | How it changes after launch | Who decides when |
|---|---|---|
| Tool definitions | The Model Context Protocol lets a server change its tool list at run time and notify the client | The party that publishes the tool |
| Model version | Standard deployments in Microsoft Foundry are upgraded automatically when a model retires. Anthropic commits to at least 60 days' notice before a retirement, and OpenAI to as little as two weeks for preview models | The model provider |
| Default model | Copilot Studio states that its default model is periodically upgraded, and an agent falls back to the default if its selected model is unavailable | The platform |
| Agent platform | Amazon Bedrock Agents became Agents Classic, in maintenance mode and closed to new customers from 30 July 2026 | The platform |
| Framework and protocol | Google's Agent Development Kit 2.0 shipped breaking changes to its event schema. The Model Context Protocol revision of 28 July 2026 removed protocol-level sessions | The maintainers |
| Permissions | Scope is added to unblock a task and is not removed when the task is finished | Delivery teams, one grant at a time |
| Threat model | MITRE ATLAS now releases monthly. The Microsoft AI Red Team added new failure categories to its taxonomy in June 2026 | Researchers and attackers |

The review was correct when it was written. It describes a system that is no longer the one in production. An evaluation result is bound to the model version, the prompt, the tool set and the test data it was run on. Change one of them and the result describes a different agent.

A pinned model does not settle the matter. Anthropic documents that each model ID is a fixed snapshot, and that the serving infrastructure around it can change and cause minor differences in behaviour. In its postmortem of September 2025 it reported that three infrastructure bugs had degraded output and that the evaluations it ran did not capture the degradation users were reporting. Part of its fix was to run evaluations continuously on production systems. The provider's own conclusion was that a test taken before release was not sufficient.

## Why a more capable model does not remove the need

Capability and assurance answer different questions, and the providers themselves say that capability does not close the risk. Microsoft's guidance is to assume that indirect prompt injection will happen. OpenAI's agent safety guidance states that the risk cannot be eliminated completely. Anthropic said in November 2025 that no browser agent is immune to prompt injection.

Two consequences follow for the business case.

**The control has to sit outside the model.** What an agent is able to reach is decided by its credential and by the policy enforced around it, not by its instructions. That argument is made in full in [AI agent permission risk](/ai-agent-permission-risk).

**Every upgrade is also an expiry.** Resistance to manipulation is measured on one model version against one set of attacks. The upgrade the business wants for its capability is the same event that voids the measurement. A more capable agent is given more authority, so there is more to prove and the proof ages faster.

Human approval does not close the gap by being present. The Model Context Protocol says there should always be a person able to deny a tool invocation, which is a recommendation and not a requirement of the protocol. Microsoft calls human review the last line of defence, and its AI Red Team reports the gate being bypassed through consent fatigue and incremental escalation. Whether approval still intervenes in a given deployment is a fact to be established, as set out in [human oversight evidence](/human-oversight-evidence).

The OWASP Top 10 for Agentic Applications states the design rule as least agency: autonomy that a task does not need adds exposure and no value. Least agency is a claim made at design time. It needs proof at run time.

## What has to be proven before an agent is relied on

Four things have to be proven before an agent is given authority to write: what it is permitted to do, what it did, that a person can stop it, and that every action is attributable. Each is proven from the running system and not from the design document.

| Proof | What it tells the business | What counts as evidence | What voids it |
|---|---|---|---|
| What the agent is permitted to do | The largest loss the agent could cause | The live grant, read from the systems that enforce it, set beside what the tasks need | A new tool, a new scope, a change of identity |
| What the agent did | Whether the outcome matched the intent | The state of the target system after the action | A change to the log format, the framework or the target system |
| That a person can stop it | How much completes between the decision to stop and the halt | A stop exercised against a running agent, and timed | A new deployment path, a new orchestration layer, a change of overseer |
| That every action is attributable | Who answers for the action | One action traced to one identity, one authority and one outcome | A shared credential, a token passed through, a sponsor who has moved |

**Permitted.** The question is what the agent could do if it were wrong or manipulated, and whether the business could absorb it. The answer is read from the enforcing systems, because a prompt describes intent and a grant describes authority.

**Did.** Anthropic's guidance on evaluating agents separates the outcome, which is the final state of the environment, from what the agent claims happened. An agent that reports success has produced a sentence. The record in the target system is the evidence. The same guidance shows why one successful run proves little: the chance that at least one of several trials succeeds rises with the number of trials, and the chance that all of them succeed falls.

**Stoppable.** A stop control that has never been exercised is an assumption. Article 26 of the EU AI Act places oversight with people who have the competence, training and authority to carry it out, so the proof covers the person as well as the switch.

**Attributable.** Microsoft states that traditional service principals and regular user accounts are not recommended for AI agents, and Microsoft Entra Agent ID provides lifecycle workflows that transfer sponsorship when a sponsor leaves. The Model Context Protocol security guidance forbids token passthrough, in part because downstream logs then name a different identity from the one that acted.

One condition sits beneath all four. The agent has to be known. Microsoft Agent 365 includes discovery of unmanaged local agents, which is an acknowledgement that they exist in volume. A statement of assurance covers only the agents in the register.

## Why the proof has to be continuous

The proof has to be continuous because the agent changes continuously, and proof that predates a change describes a different system. Expiry is triggered by events as well as by time: a tool definition that differs from the one approved, a model that has been replaced, a permission that has been added, a framework that has been upgraded, a sponsor who has changed role.

The notice periods set the pace. Where a provider commits to 60 days before a retirement, or two weeks for a preview model, a re-approval cycle that takes a quarter leaves the agent running on a model nobody has examined.

This is why assurance is held as a state and not issued as a report. An agent is Assured when current evidence shows the four proofs hold within threshold. It is Degrading when the evidence is moving toward the threshold, for example when approvals are granted faster each month. It is At risk when a threshold is breached. It is Unassured when its evidence predates its last change.

Unassured is the condition most agents are in shortly after launch, and it is the one that matters most to a board. The agent may be behaving correctly. Nobody can show that it is. A known risk can be accepted, given an owner and a review date. Authority that has not been measured cannot be accepted, because its size is unknown.

Continuous does not mean everything, all the time. Article 12 of the EU AI Act requires high-risk systems to allow the automatic recording of events over the lifetime of the system, which makes the record a property of the system and not an exercise before an audit. What is re-tested, and how often, is set by consequence. An agent that reads and summarises warrants less than one that releases payments.

## Why assurance comes before capability

Assurance comes first because it decides how much capability the business can use. The usual order is to build the agent, demonstrate it, extend its access and review it before launch. In that order the evidence is produced last, under pressure to pass, and the authority has been granted before anyone has measured it.

Two practical reasons support the reverse order. Identity for each agent, an outcome record and a stop path are structural, so adding them later means changing a system the business has come to depend on. And authority, once granted, is rarely withdrawn, because each permission was added to make something work.

Putting assurance first turns autonomy into something that is extended on evidence.

| Authority given to the agent | What has to be current before it is given |
|---|---|
| Read only | The register entry, the agent's own identity, the permitted-action record |
| Write, with a person approving each action of consequence | The outcome record, the attribution trace, a measured approval step |
| Write within limits, reviewed afterwards | A tested stop, a tested path to reverse the action, limits enforced outside the model |
| Autonomous within its scope | All of the above, re-proven after the last change to model, tools or permissions |

The steps run in both directions. When evidence expires, the agent returns to the level its current evidence supports until the proof is gathered again.

The order has a cost. The first release takes longer, evidence has to be gathered repeatedly, and someone has to own the state when it moves. The cost is controlled by scope, and it is set against the four things at stake.

## What this means for assurance

The method follows from the argument. Xyvionix holds each of the four proofs as a state against a threshold agreed with the business, and treats the evidence as expired when the agent, its tools or its model change. When a state is lost, corrective action is owned through to completion, and closure is recorded on a re-test and not on a deployed change. The continuing controls are described in [AI Agent Assurance](/ai-agent-assurance), the scenario most enterprises meet first in [AI Agent With Write Access](/ai-agent-with-write-access), and the method in [how assurance works](/how-assurance-works).

The same argument applies to models, modern systems and critical systems, and is set out for each under [why assurance comes first](/why-assurance). For agents it reduces to an order of events. An agent is relied on for what it can do. It can be relied on only for what has been proven, and only for as long as the proof is current.
