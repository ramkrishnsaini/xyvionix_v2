---
title: AI agent permission risk
h1: An AI agent's risk is the size of the credential it holds
seoTitle: 'AI Agent Permission Risk: A Five-Part Control Model | Xyvionix'
description: >-
  An agent can do whatever its credential allows, at machine speed, under
  hostile input. A control model in five parts bounds the loss outside the model.
summary: >-
  Agents inherit the permissions of the credential they are given and use them
  at machine speed under adversarial input. Five controls bound the loss:
  identity per agent, scope per task, approval by consequence, reversibility
  and action audit.
lede: >-
  AI agent permission risk is the loss an agent can cause with the credential
  it holds, and it is bounded by that credential, not by the agent's
  instructions. An agent decides at run time which permission to use, partly on
  the basis of content it has read, and vendors state that manipulation
  through that content cannot be fully prevented. The defensible position is to
  bound the authority outside the model: identity per agent, scope per task,
  approval by consequence, reversibility and action audit.
ogQuestion: 'If your agent were talked into misuse, what could it reach?'
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary:
  - cyber
parent: insights
state: risk
audience:
  - CISO
  - Head of AI
  - Head of Identity
  - Technology Risk
intent: >-
  Informational: why agent permission risk differs from service account risk,
  and a defensive control model for bounding it
related:
  assurance:
    - ai-agent-assurance
    - privileged-access-assurance
    - mcp-security-assurance
  useCases:
    - ai-agent-with-write-access
  technologies:
    - entra-id-exposure-assurance
    - azure-ai-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - mcp-servers-trust-boundary
    - human-oversight-evidence
    - non-human-identity-exposure
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Microsoft Learn: defend against indirect prompt injection'
    url: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection'
  - title: 'Anthropic: prompt injection defenses'
    url: 'https://www.anthropic.com/research/prompt-injection-defenses'
  - title: 'OpenAI: agent builder safety'
    url: 'https://developers.openai.com/api/docs/guides/agent-builder-safety'
  - title: 'OWASP Top 10 for LLM Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/'
  - title: 'OWASP Top 10 for Agentic Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/'
  - title: 'Microsoft Entra Agent ID: key concepts'
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/key-concepts'
  - title: 'Google Cloud: Agent Identity overview'
    url: 'https://docs.cloud.google.com/iam/docs/agent-identity-overview'
  - title: 'Amazon Bedrock AgentCore: release notes'
    url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html'
  - title: 'Claude Agent SDK: secure deployment'
    url: 'https://code.claude.com/docs/en/agent-sdk/secure-deployment'
  - title: 'Model Context Protocol specification 2026-07-28: authorization'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization'
  - title: 'Model Context Protocol specification 2026-07-28: security best practices'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices'
  - title: 'Model Context Protocol blog: tool annotations'
    url: 'https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
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

## The credential is the risk

Discussion of agent risk tends to centre on the model: whether it follows instructions, whether it can be manipulated, whether its guardrails hold. These matter, and they do not determine the size of a loss.

The size of a loss is determined by the credential. An agent can do whatever the identity it runs as is permitted to do. Its system prompt describes what it is meant to do. The two are different sets, and the gap between them is the permission risk.

The recognisable pattern starts with convenience. A team builds an agent to perform a narrow task and needs it to reach a system of record. An integration account already exists, with access that has accumulated over years. The agent is given that account. The pilot works and nobody revisits the credential. The agent's effective authority is now everything the integration account can do, and its intended authority is documented only in a prompt.

## Why an agent is not a service account

The obvious objection is that service accounts have carried broad permissions for decades. Three properties make the same permissions more dangerous in an agent's hands.

**The agent chooses at run time.** A conventional service runs fixed code. Which permissions it exercises is decided when the code is written, and unused permissions stay unused unless the code changes. An agent selects tools and arguments during each task. Every permission it holds is reachable on every run.

**The choice is influenced by what it reads.** An agent processes documents, messages, web pages and tool results, and any of them may contain text written to redirect it. The maintainers of the Model Context Protocol describe the exposure as a combination: access to private data, exposure to untrusted content and a channel for external communication. An agent holding all three is exposed however safe each tool appears alone.

**It acts at machine speed.** A person misusing access is limited by attention and working hours. An agent repeats an action across every record it can reach before anyone reviews the first one.

Where an agent acts for a person, a fourth question arises: whose authority the action carries. Microsoft Entra Agent ID distinguishes interactive agents, which act on behalf of a user with delegated permissions, from autonomous agents, which hold their own identity. The distinction decides whether the blast radius is one user's access or the agent's own.

## The model cannot be the control

The providers say so themselves. Microsoft's guidance is to assume indirect prompt injection will happen, and to pair probabilistic defences with deterministic ones such as least privilege and short-lived privileges. OpenAI's agent safety guidance states that complete elimination of injection risk is not possible. Anthropic reported in November 2025 a 1% attack success rate against Claude Opus 4.5 in browser use, and said that this still represents meaningful risk and that no browser agent is immune.

A resistance rate is a measurement of one model version against one set of attacks. It is useful, and it expires when the model changes. It is also a rate. At machine speed and production volume, a small rate is a schedule.

OWASP reached the same conclusion from the damage side. Its 2026 Top 10 for LLM Applications moved Excessive Agency to third place, and its Top 10 for Agentic Applications introduces the principle of least agency: autonomy that is not needed expands the attack surface without adding value.

The control therefore has to sit where the model's judgement is irrelevant. The design question is what the agent could reach if it were manipulated, and the answer has to be acceptable.

## A control model in five parts

| Control | Question it answers | Where it is enforced | It lapses when |
|---|---|---|---|
| Identity per agent | Which agent did this, and for whom | Identity provider | Agents share a credential, or the sponsor leaves |
| Scope per task | What can this agent reach at all | Gateway, proxy or resource server | Scope is added to unblock work and never removed |
| Approval by consequence | Which actions need a person first | Orchestration layer, before the side effect | Volume turns the decision into a reflex |
| Reversibility | Can the action be undone, and how fast | Target system and process design | The undo path is never exercised |
| Action audit | What happened, under whose authority | Logs correlated across systems | Identity is lost between hops |

### Identity per agent

Each agent runs as itself. Microsoft states that traditional service principals and regular user accounts are not recommended for AI agents. Google Cloud Agent Identity issues certificates with 24-hour validity, and its agent identities are not shared by default, cannot be impersonated and have no long-lived keys. A long-lived key held by an agent now falls below the platform norm.

### Scope per task

Scope is sized to the task and enforced outside the model. The Model Context Protocol authorisation guidance tells servers to challenge with the minimum scopes for each operation and to step up on demand, and names wildcard scopes as a common mistake. Amazon Bedrock AgentCore Policy evaluates authorisation rules written in Cedar at the gateway. Anthropic's deployment guidance keeps credentials outside the agent's boundary and injects them at a proxy, so that the agent never sees them. The same guidance says that a permission gate is not a sandbox: approval rules shape what the agent asks for, and containment limits what a compromised process can reach.

### Approval by consequence

Approval is rationed. Microsoft calls human review the last line of defence, and its AI Red Team reports the gate being bypassed through consent fatigue and incremental escalation. A gate placed on every action trains its reviewers to approve. Two properties of the action decide where a gate belongs.

| | Reversible | Irreversible |
|---|---|---|
| **Low consequence** | Act and log | Act within a rate limit, and log |
| **High consequence** | Act within a limit, review after the fact | A person approves before the action |

Placement needs testing as well as design. LangGraph documents that on resume a node re-executes from its start, so a side effect that precedes the pause must be idempotent or it can run twice.

### Reversibility

Reversibility is the control most often left out, and it changes the economics of the other four. If an action can be undone quickly and completely, a wrong action is an incident with a bounded cost. If it cannot, prevention is the only control and it has to be perfect. Payments released, messages sent outside the organisation and records deleted without a recovery point belong to the second group. Designing a staging step, a hold period or a compensating transaction into the process moves actions from the bottom-right cell of the matrix to the bottom-left, which reduces approval volume and the fatigue that comes with it.

### Action audit

One action resolves to one agent identity, one delegating user where there is one, one approval where required, and one outcome in the target system. The Model Context Protocol security guidance forbids token passthrough partly for this reason: downstream logs then show a different identity from the one that acted.

## What the controls cost

Each control has a price, and ignoring it is how controls get removed.

**Narrow scope causes failures.** An agent with task-sized scope will meet requests it cannot complete. Each refusal looks like a defect to the team that owns the agent, and the quickest fix is a broader grant. The discipline is to treat a refusal as information: either the task definition was wrong, or the request was outside the agent's purpose.

**An identity per agent multiplies identities.** Every agent becomes an object with an owner, a sponsor, credentials and a review date. Without lifecycle management, the estate trades one over-privileged account for many unowned ones. [Privileged Access Assurance](/privileged-access-assurance) addresses the same problem for human administrators. Agents bring it at higher volume.

**Rationed approval accepts some risk.** Moving a class of action out of pre-approval means some wrong actions will complete. That is acceptable only where reversibility is real, which is why the two controls are designed together.

**Reversibility costs latency.** A hold period delays the legitimate action as well as the wrong one. The business owner of the process decides how much delay the outcome can bear.

## An illustrative example

The figures in this example are illustrative. An agent reconciles supplier invoices. It runs on a finance integration account that holds 40 permissions in the finance system. Over a 30-day window the agent exercises 3 of them: read invoice, read purchase order, write reconciliation note. The other 37 include changing supplier bank details and releasing payment.

The agent reads supplier emails, which are untrusted content. Its resistance to manipulation is high and is not total. The exposure is therefore not the three permissions it uses. It is the 37 it does not.

Applying the model changes the position in a specific order. The agent receives its own identity. Its scope is cut to the three permissions it exercises, and its task set is replayed to confirm nothing else was needed. Writing a reconciliation note is reversible and low in consequence, so it proceeds without approval and is logged. If the business later wants the agent to propose payment holds, that action is added as a separate scope, with a hold period, and approval is placed on release and not on proposal.

## What this means for assurance

Every control in the model is a configuration, and configuration drifts. Scope is widened to clear a blocked task. A sponsor changes role. An approval step that once rejected requests now rejects none. The design document still describes the original position.

Permission risk is therefore a measurement problem. Three comparisons carry most of it: permissions granted against permissions exercised over a rolling window, approvals requested against approvals rejected and the time each took, and actions taken against actions that can be traced to an identity and an outcome. Each is evidence with a date. Each expires when the agent gains a tool, changes model or changes owner.

Closure is proven at the boundary. A removed permission is closed when an attempt to use it is refused and logged, and the agent's tasks still complete. An undo path is closed when it has been run against a real action in a test environment and the record returned to its prior state.

The continuing controls are described in [AI Agent Assurance](/ai-agent-assurance), and the tool servers an agent connects to in [MCP Security Assurance](/mcp-security-assurance). The scenario most enterprises meet first is set out in [AI Agent With Write Access](/ai-agent-with-write-access). The argument here is simpler. An agent will at some point attempt something it should not. What it is able to reach on that day is decided now, by the credential.
