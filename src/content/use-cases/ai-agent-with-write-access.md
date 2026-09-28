---
title: AI Agent With Write Access
h1: An agent is about to change systems of record. Prove the boundary first
seoTitle: 'AI Agent With Write Access: Bound the Action | Xyvionix'
description: >-
  What has to be proven when an AI agent moves from read to write: scoped
  credentials, approval on the right actions, tested reversal and a limit on
  loss.
summary: >-
  Write access turns a model error or a hostile input into a completed
  transaction. Evidence gathered while the agent was read-only does not cover
  it. The boundary, the approval, the reversal and the limit are each proven.
lede: >-
  An agent that is granted write access is At risk from the moment of the
  grant, because its authority now exceeds the evidence held about it. Proof
  gathered while the agent could only read says nothing about what it can
  change, how much it can change before a person notices, or whether a change
  can be undone. Five things close that gap: a catalogue of write actions, a
  scoped credential, a boundary enforced outside the model, approval placed by
  consequence, and a tested limit on loss.
ogQuestion: What can the agent change before anyone notices?
cluster: ai
secondary:
  - cyber
parent: use-cases
state: risk
audience:
  - CISO
  - Head of AI
  - Technology Risk
intent: 'Problem: an agent is being granted the ability to change systems of record'
related:
  assurance:
    - ai-agent-assurance
    - mcp-security-assurance
    - privileged-access-assurance
    - ai-security-assurance
  useCases:
    - production-ai-going-live
    - stale-privileged-access
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - entra-id-exposure-assurance
  industries:
    - financial-services-ai-assurance
    - insurance-claims-ai-assurance
  insights:
    - ai-agent-permission-risk
    - human-oversight-evidence
evidence:
  - name: Write action catalogue
    detail: >-
      Every write tool the agent holds, the system of record it changes, its
      reversibility class and the largest single action the credential
      permits.
  - name: Credential scope and custody record
    detail: >-
      The identity the agent writes as, the scopes granted, the lifetime of the
      credential and where it is held, including whether it can be read from
      inside the agent's environment.
  - name: Boundary enforcement test results
    detail: >-
      Dated results of attempting a write outside the catalogue and confirming
      that the refusal comes from an enforcement point outside the model.
  - name: Approval placement and decision record
    detail: >-
      The action classes that require approval, the person each request
      reaches, and the rejection rate and time to decision for each reviewer.
  - name: Reversal test results
    detail: >-
      For each reversible and compensable class, a dated test in which the
      action was undone and the system of record returned to its earlier
      state.
  - name: Loss limit test results
    detail: >-
      The limits on count, value and rate of writes per period, and a dated
      test showing that a burst beyond the limit is stopped at the limit.
  - name: Write action record
    detail: >-
      For each write, the agent identity, the delegating user where one
      exists, the approval where one was required and the outcome in the
      target system.
thresholds:
  - signal: Write actions outside the catalogue
    basis: Every change to a system of record has to have been classified before it is permitted
    lostWhen: The agent completes a write of a type the catalogue does not list
  - signal: Irreversible actions completed without a decision
    basis: The consequence of an action that cannot be undone or compensated
    lostWhen: Any irreversible action completes without a recorded decision by a person with authority over the outcome
  - signal: Refusal of writes outside scope
    basis: The boundary has to hold whatever the model was told
    lostWhen: A test write outside the granted scope is accepted by the target system
  - signal: Writes per period against the loss limit
    basis: The loss the business can absorb from one fault before a person intervenes
    lostWhen: The limit is exceeded, or a test burst is not stopped at the limit
  - signal: Requests per reviewer and time to decision
    basis: The number of requests a reviewer can consider properly in the time available
    lostWhen: Volume and decision time show that requests are being granted without consideration
  - signal: Credential lifetime and custody
    basis: The period for which a leaked credential would remain usable
    lostWhen: The agent holds a long-lived key, or a credential that can be read from inside its own environment
faqs:
  - q: Can prompt injection be prevented well enough to make write access safe?
    a: >-
      Vendors do not claim so. Microsoft's guidance is to assume that indirect
      prompt injection will happen, and OpenAI states that the risk cannot be
      eliminated completely. Resistance is a measured rate tied to one model
      version. What can be proven deterministically is containment: the scope
      of the credential, the enforcement point outside the model and the limit
      on loss.
  - q: Should every write require human approval?
    a: >-
      No. Approval loses its value as volume rises, because a reviewer who is
      asked too often stops deciding. Approval is placed on the classes of
      action where the consequence warrants a person's attention, mainly the
      irreversible ones. Reversible actions are better protected by limits and
      a tested reversal.
  - q: Does evidence from the read-only period carry over?
    a: >-
      Some of it does. The inventory record, the named owner and the identity
      the agent runs as remain valid if they have not changed. Evidence about
      scope, approval, reversal and loss limits has to be gathered new, because
      none of those conditions existed while the agent could only read.
sources:
  - title: 'Microsoft Learn: defend against indirect prompt injection'
    url: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection'
  - title: 'OpenAI: agent safety guidance'
    url: 'https://developers.openai.com/api/docs/guides/agent-builder-safety'
  - title: 'OpenAI Agents SDK documentation'
    url: 'https://openai.github.io/openai-agents-python/'
  - title: 'Anthropic: secure deployment of the Claude Agent SDK'
    url: 'https://code.claude.com/docs/en/agent-sdk/secure-deployment'
  - title: 'Google Cloud: Agent Identity overview'
    url: 'https://docs.cloud.google.com/iam/docs/agent-identity-overview'
  - title: 'Amazon Bedrock AgentCore release notes'
    url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html'
  - title: 'Model Context Protocol specification 2026-07-28: changelog'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/changelog'
  - title: 'LangGraph: interrupts'
    url: 'https://docs.langchain.com/oss/python/langgraph/interrupts'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
  - title: 'EU AI Act Service Desk: Article 26, obligations of deployers'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26'
  - title: 'European Commission: AI Omnibus enters into force'
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## What changed

An agent that could read is being given the ability to write. It will issue the refund, update the customer record or change the entitlement, where before it drafted a recommendation for a person to carry out.

The state is At risk from the moment the grant is made. The evidence gathered while the agent was read-only covers what it could see. It says nothing about what the agent can change, how much it can change before someone notices, or whether a change can be undone. Authority has moved ahead of proof, and that is a breached threshold.

Two things change with write access. An error by the model becomes a completed transaction. And hostile content in anything the agent reads becomes a possible route to an action. Vendors do not claim to have closed that route. Microsoft's guidance is to "assume indirect prompt injection will happen", and OpenAI states that the risk cannot be eliminated completely. The question therefore moves from whether the agent can be misled to what it is able to do when it is.

## The business outcome at risk

The business wants work completed without a person re-keying it. The outcome at risk is the integrity of the system of record: the balances, entitlements and customer data that every other process relies on.

The size of the loss is set by the boundary and not by the fault. One wrong refund is an error. The same fault repeated across every account the credential can reach, before anyone looks, is a different event. While the agent could only read, the worst case was disclosure or poor advice. With write access the worst case is whatever the credential permits, at the speed the agent works.

Accountability is the second exposure. When an action is disputed, the enterprise has to show who authorised it and on what basis. For high-risk systems under the EU AI Act, Article 26 requires deployers to assign human oversight to people who have the necessary competence, training and authority. High-risk obligations for Annex III systems apply from 2 December 2027. Which systems fall in scope is a decision for the enterprise and its advisers.

## What must be proven

Five statements are proven on the running system before the grant is treated as safe to hold.

1. **Every write action is catalogued and classed.** A reversible action can be undone with no loss. A compensable action can be corrected by a further transaction. An irreversible action, such as a payment that has left the enterprise or a message that has been sent, cannot be recalled.
2. **The credential is scoped and out of the agent's reach.** Anthropic's deployment guidance keeps credentials outside the agent's boundary and injects them at a proxy, so that the agent never sees them. Google Cloud Agent Identity issues certificates that are valid for 24 hours. A long-lived key stored in the agent's environment falls below what the platforms now provide.
3. **The boundary is enforced outside the model.** Amazon Bedrock AgentCore Policy evaluates authorisation rules at a gateway, and OpenAI's guidance places validation next to the tool that creates the side effect. An instruction in a prompt is a request. A rule at the enforcement point is a control.
4. **Approval sits on the actions that warrant it.** Under revision 2026-07-28 of the Model Context Protocol, a tool can return a result that asks for input in the middle of a call. The proof required is that the request is shown to a person with authority and is not answered automatically by the client or by another agent.
5. **The loss has a limit.** Count, value and rate of writes per period are capped at the enforcement point, and every write can be traced to an identity, an approval and an outcome.

The continuing position is held under [AI Agent Assurance](/ai-agent-assurance). The tool servers the agent writes through are covered by [MCP Security Assurance](/mcp-security-assurance), and administrative permission held by non-human identities by [Privileged Access Assurance](/privileged-access-assurance).

## What causes assurance to be lost

- **The read credential is widened.** Write scope is added to the identity the agent already uses. It is granted at the level that made the first task work and never narrowed to the catalogue.
- **Approval on everything.** Every write raises a request. The Microsoft AI Red Team reports approval being bypassed through consent fatigue, and a reviewer who is asked constantly stops deciding.
- **Approval that repeats the write.** LangGraph documents that on resume a node runs again from its start, so side effects before the pause must be idempotent. A gate placed after the write can cause a second one.
- **Reversal that was never exercised.** The design includes a way to undo the action. Nobody has run it against realistic data.
- **Limits written in the prompt.** A ceiling on refund value appears in the instructions and nowhere else.
- **A tool added later.** The catalogue described the agent at the time of the grant. A new connector brings a write that nobody classed.

## Corrective action

An At risk state is corrected in one of two directions. Authority is reduced until it matches the proof, or proof is produced until it matches the authority. Under assurance, Xyvionix owns the corrective action through to completion within the access it has been granted, and changes to production permissions go through the enterprise's own change process.

The usual sequence starts with reduction, because it is faster. Scope is cut back to the catalogued actions. Irreversible classes are placed behind approval, or withdrawn until approval and attribution have been proven. The credential is moved out of the agent's environment and its lifetime is shortened. Limits are set at the enforcement point. Approval is then re-scoped to fewer actions of higher consequence, so that each request can be given real attention.

Some decisions belong to the business, such as permitting an irreversible action with no approval because the process cannot wait for one. That decision is recorded with its owner and an expiry date, and the action class remains At risk for as long as it stands.

## What verified closure looks like

Closure is recorded from tests against the running system. A reviewed configuration file is not closure.

Five results are held together. A write outside the granted scope is attempted, refused by the target system and logged. A test action of an irreversible class produces a request that reaches the intended approver. A rejection prevents the action, and an approval results in exactly one write. A reversible action is undone and the system of record returns to its earlier state. A burst beyond the limit is stopped at the limit. A sampled write is traced from request to outcome without reconstruction.

The agent's approved tasks are then replayed to confirm that they still complete. The results are stored with the agent version, the tool definitions and the model in force, so that a change to any of them is seen to expire the evidence.

## What to do next

The first step is a table that the team can build from what it already knows. Each row is one write tool the agent will hold. The columns are what the tool changes, whether the change can be undone and by whom, and the largest single action the credential permits.

Any row where the last column reads "whatever the account allows" is the place to begin. Any row where nobody can say how the change would be undone is an irreversible action, whatever the design document calls it. The same exercise applied to human administrators is described in [Stale Privileged Access](/stale-privileged-access).
