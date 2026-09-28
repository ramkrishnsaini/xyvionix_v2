---
title: AI Agent Assurance
h1: Prove what your AI agents are permitted to do, and what they did
seoTitle: "AI Agent Assurance: Permissions, Approvals, Audit | Xyvionix"
description: >-
  Continuous assurance for AI agents that act through tools: scoped identity,
  permitted actions, approval that works, and a complete record of every action.
summary: >-
  Agents act, so the assured outcome is bounded action. Identity, tool scope,
  approval gates and the action record are each held against a threshold and
  re-proven when the agent, its tools or its model change.
lede: >-
  AI agent assurance is the continuing proof that an agent can only take the
  actions it was approved to take, that a person with authority intervenes where
  the consequence requires it, and that every action is attributable afterwards.
  The proof is gathered from the running system, not from the design document,
  and it is re-gathered whenever the agent, its tools or its model change.
ogQuestion: 'Can you prove what your agents are permitted to do, and did?'
kind: child
cluster: ai
secondary:
  - cyber
parent: ai-assurance
state: assured
audience:
  - Head of AI
  - CISO
  - CTO
  - Technology Risk
intent: 'Commercial: assurance for agents that take actions through tools'
related:
  assurance:
    - mcp-security-assurance
    - ai-security-assurance
    - llm-evaluation-assurance
  useCases:
    - ai-agent-with-write-access
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - ai-agent-permission-risk
    - human-oversight-evidence
    - mcp-servers-trust-boundary
evidence:
  - name: Agent inventory
    detail: >-
      Every agent in production, with its owner, sponsor, purpose, model version
      and the environments it runs in. An agent that is not in the inventory
      cannot be governed.
  - name: Identity and credential record
    detail: >-
      The identity each agent runs as, how its credentials are issued and how
      long they live. Agents running on shared service accounts or a person's
      account are recorded as gaps.
  - name: Granted and exercised permissions
    detail: >-
      The tools and scopes each agent has been granted, compared with the tools
      and scopes it has used over the measurement window.
  - name: Tool definition baseline
    detail: >-
      A fingerprint of every tool definition at the point of approval, compared
      on each change so that a modified tool is detected before it is trusted.
  - name: Approval decisions
    detail: >-
      Each approval request with the approver, the decision, the time taken and
      the action that followed, retained against the identity of the person who
      decided.
  - name: Action record
    detail: >-
      An append-only log that links one action to one agent identity, one
      approval where required, and one outcome in the target system.
  - name: Trajectory evaluation results
    detail: >-
      Results of replaying representative tasks against the current agent,
      scoring tool choice and argument correctness rather than final text alone.
thresholds:
  - signal: Agents outside the inventory
    basis: The business requires every acting system to have a named owner
    lostWhen: Any agent is found acting in production without an inventory record and sponsor
  - signal: Granted scope that is never exercised
    basis: The smallest permission set that still completes the approved tasks
    lostWhen: Unused write or administrative scope persists beyond the agreed review window
  - signal: Tool definitions changed since approval
    basis: Approval applies to one definition at one point in time
    lostWhen: A tool definition differs from its approved fingerprint and has not been re-approved
  - signal: Approval effectiveness
    basis: The consequence of the action being approved and the reviewer workload that still permits a real decision
    lostWhen: Rejection rate and time to decision show that approvals are being granted without review
  - signal: Attributable actions
    basis: Audit and dispute obligations that apply to the process the agent operates in
    lostWhen: Any write action cannot be traced to an agent identity, an approval and an outcome
faqs:
  - q: How is AI agent assurance different from AI security testing?
    a: >-
      Security testing asks whether an attack succeeds on the day of the test.
      Agent assurance holds a continuing position on what the agent is able to
      do: its identity, its permissions, its approvals and its record. Both are
      needed. The OWASP guidance separates the two in the same way, treating a
      model inside an application differently from a model that acts with
      tools, memory and downstream consequences.
  - q: Does an approval step make an agent safe to give write access?
    a: >-
      Only if the approval is effective. An approval that is always granted,
      granted in seconds, or granted by someone without authority over the
      outcome is a recorded click, not a control. Assurance measures approval
      quality and treats a gate that no longer intervenes as lost.
  - q: What happens when an agent framework or protocol is upgraded?
    a: >-
      The evidence gathered on the previous version is treated as expired for
      anything the upgrade changed. Log formats, approval behaviour and
      authorisation semantics are re-verified before the state returns to
      Assured.
sources:
  - title: 'OWASP Top 10 for Agentic Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/'
  - title: 'OWASP Top 10 for LLM Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
  - title: 'Microsoft Entra Agent ID: key concepts'
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/key-concepts'
  - title: 'Model Context Protocol specification 2026-07-28: tools'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools'
  - title: 'Google ADK 2.0'
    url: 'https://adk.dev/2.0/'
  - title: 'CISA: Careful Adoption of Agentic AI Services'
    url: 'https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why assurance is lost

An agent is approved as a design: this model, these tools, these permissions, this approval step. What runs in production six months later is rarely that design. Each of the following changes it without anyone deciding to change the risk.

**The tools change after approval.** Tool lists can be updated at run time, and a tool that was reviewed as read-only can be redefined by the party that publishes it. Approval is evidence about one definition at one moment. The Model Context Protocol specification tells clients to treat tool annotations as untrusted unless they come from a trusted server, which is an acknowledgement that a description is a claim, not a guarantee.

**Permissions accumulate.** Scope is added to unblock a task and is not removed when the task is finished. The agent's effective authority grows while its documented purpose stays the same.

**The framework moves.** Agent frameworks now ship major versions with breaking changes. Google's Agent Development Kit 2.0 changed its event schema for custom session storage. When the event format changes, the parsers that build the audit record have to be re-validated, or the record quietly stops being complete.

**The threat model ages.** The Microsoft AI Red Team published a second version of its taxonomy of failure modes in agentic systems in June 2026, adding categories that the first version did not contain, including inter-agent trust escalation and session context contamination. A threat model written against last year's list has gaps that did not exist when it was approved.

**Approval degrades.** The same Microsoft report describes human approval being bypassed through consent fatigue and incremental escalation. The gate is still present. It has stopped intervening.

## What is at stake

An agent with write access performs real actions in systems of record: it issues a refund, changes an entitlement, updates a customer record, merges a change. The consequence of an error is no longer a wrong answer that a person may or may not act on. It is a completed transaction.

Three consequences follow for the business. The first is direct loss from actions that should not have been taken. The second is an inability to answer, after the fact, which agent did what under whose authority, which turns an operational incident into an audit finding. The third is that a single compromised input can be exercised at machine speed across every record the agent can reach, so the size of the loss is set by the permission boundary, not by the attacker's effort.

OWASP moved Excessive Agency to third place in the 2026 edition of its Top 10 for LLM Applications and described it as the most consequential move on the list. That reflects where damage is being reported.

## What Xyvionix assures

Xyvionix holds five statements about each agent as current facts, tested against thresholds agreed with the business.

1. **The agent is known.** It has an inventory record, a named owner and a sponsor who is still in role.
2. **The agent runs as itself.** It has its own identity with short-lived credentials, not a shared service account and not a person's account. Where it acts on behalf of a user, the record shows both.
3. **The agent can do only what it needs.** Granted tools and scopes match the tasks it performs. Write and administrative authority that is never exercised is removed.
4. **A person intervenes where the consequence requires it.** Approval is placed on the actions that matter, reaches someone with authority over the outcome, and is measured for whether it still produces real decisions.
5. **Every action is attributable.** One action links to one identity, one approval where required, and one outcome.

These are assured separately from the quality of what the agent produces, which is covered by [LLM Evaluation Assurance](/llm-evaluation-assurance), and from the tool servers it connects to, which are covered by [MCP Security Assurance](/mcp-security-assurance).

## Common failure modes

- **Shared identity.** Several agents run on one service principal, so no action can be attributed to a specific agent. Microsoft states that traditional service principals and regular user accounts are not recommended for AI agents.
- **Orphaned agents.** The person who sponsored the agent has moved on. The agent continues to run with no one accountable for it.
- **Permission gate mistaken for containment.** Approval rules decide what the agent asks to do. They do not limit what a compromised process can reach. Containment needs network and filesystem controls that hold regardless of what the model was told.
- **Risky tool combinations.** Each tool passes review on its own. Together, access to private data, exposure to untrusted content and a channel to the outside form an exfiltration path that no single review examined.
- **Approval that runs the action twice.** In some frameworks a paused step re-executes from its start on resume. If a write happens before the pause, approval can cause it to happen again.
- **Logs in four places.** The model platform, the gateway, the identity provider and the target system each hold part of the story. Without correlation there is no single record of an action.
- **Evaluation of the answer only.** The final response reads well while the path to it included a wrong tool call that happened to succeed.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a change to production is required.

Typical corrections are specific. Unused write scope is removed and the agent's tasks are replayed to confirm nothing depended on it. An agent on a shared identity is moved to its own, and the shared credential is rotated. A changed tool definition is quarantined until it has been reviewed against its previous version. An approval step that no longer intervenes is re-scoped to fewer, higher-consequence actions so that each request can be given real attention.

Where a correction requires a decision that belongs to the business, such as accepting a permission that cannot be reduced, the decision is recorded with its owner and an expiry date. It does not become a permanent exception by default.

## Verified closure

A correction is closed when re-testing shows the condition is gone, not when the change was deployed.

For a permission reduction, closure means the grant is absent from the live configuration, the agent's representative tasks still complete, and an attempt to use the removed scope is refused and logged. For an approval gate, closure means a test action of the relevant class produces a request that reaches the intended approver and that a rejection prevents the action. For the action record, closure means a sampled action can be traced from request to outcome without reconstruction.

Closure is recorded with the evidence that supports it and returns to the engine as a new signal. If the condition reappears, it reopens against the same record, so recurrence is visible.

## Technology and industry context

The major platforms now provide separate services for agent identity, policy, registry and evaluation. Microsoft Entra Agent ID gives each agent an identity governed by Conditional Access. Amazon Bedrock AgentCore evaluates authorisation policy at a gateway outside the model. Google Cloud Agent Identity issues short-lived certificates bound to the agent. These are strong building blocks, and each is also a separate place where configuration can diverge from intent. Platform detail is covered in [Azure AI Assurance](/azure-ai-assurance) and [Amazon Bedrock Assurance](/aws-bedrock-assurance).

Standards for agents are still forming. CISA published joint guidance on the careful adoption of agentic AI services in May 2026, and the OWASP Top 10 for Agentic Applications names identity and privilege abuse, tool misuse and cascading failures as distinct risks. Controls therefore have to be justified from first principles and from vendor documentation, and re-examined as the standards settle.

In regulated sectors the question is sharper. Where an agent acts in a customer or payment process, the enterprise must be able to show who authorised the action and on what basis. The scenario most enterprises meet first is covered in [AI Agent With Write Access](/ai-agent-with-write-access).
