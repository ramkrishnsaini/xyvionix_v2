---
title: AI Security Assurance
h1: Prove that AI security boundaries still hold against current attacks
seoTitle: "AI Security Assurance: Injection, Exfiltration | Xyvionix"
description: >-
  Continuing proof that prompt injection resistance, data exfiltration
  containment and guardrail behaviour still hold after every model, prompt and
  tool change.
summary: >-
  Injection resistance is a measured rate that expires with the model version.
  Containment can be proven deterministically. Both are re-tested when the
  system or the published attack techniques change.
lede: >-
  AI security assurance is the continuing proof that the boundaries around an AI
  system still hold: untrusted content cannot redirect it beyond an agreed rate,
  data cannot leave through its tools, and guardrails behave as they did when
  they were approved. The proof is bound to one model version, one prompt, one
  tool set and one attack set, so it is re-gathered when any of them changes.
ogQuestion: Do the safety boundaries still hold against current attacks?
kind: child
cluster: ai
secondary:
  - cyber
parent: ai-assurance
state: assured
audience:
  - CISO
  - Head of AI
  - Security Engineering
intent: 'Commercial: continuing proof that AI safety and security boundaries hold'
related:
  assurance:
    - ai-agent-assurance
    - mcp-security-assurance
    - ai-governance-assurance
    - secrets-exposure-assurance
  useCases:
    - ai-agent-with-write-access
    - production-ai-going-live
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
  industries:
    - financial-services-ai-assurance
    - healthcare-ai-assurance
  insights:
    - mcp-servers-trust-boundary
    - ai-agent-permission-risk
evidence:
  - name: Versioned threat model
    detail: >-
      The threat model for each AI system, recording the edition or release of
      every framework it was mapped to, so that a superseded mapping is visible
      as expired evidence.
  - name: Untrusted input inventory
    detail: >-
      Every channel through which content the enterprise does not control can
      reach the model: retrieved documents, email, web pages, uploaded files
      and tool results.
  - name: Boundary test results
    detail: >-
      Results of the agreed injection and disclosure test set, stored with the
      model version, system prompt version, tool set and guardrail
      configuration they were run against.
  - name: Guardrail configuration baseline
    detail: >-
      The approved filter settings, classifier versions and policy rules,
      compared with the live configuration on every change.
  - name: Containment test record
    detail: >-
      Dated proof that outbound network paths, credential reach and filesystem
      access are limited as designed, gathered by attempting the prohibited
      path and recording the refusal.
  - name: Tool combination review
    detail: >-
      For each session type, whether private data access, untrusted content
      and an external communication channel are present together, and the
      decision recorded where they are.
  - name: Boundary event log
    detail: >-
      Blocked, flagged and overridden requests, retained with the system
      version in force, so that a change in block rate can be traced to a
      change in the system.
thresholds:
  - signal: Threat model currency
    basis: The release cadence of the frameworks the threat model is mapped to
    lostWhen: A mapped framework version has been superseded and the threat model has not been re-checked within the agreed window
  - signal: Injection success rate on the agreed test set
    basis: The consequence of the most damaging disclosure or action reachable from the system
    lostWhen: The rate measured on the current model, prompt and tool set exceeds the agreed ceiling
  - signal: Age of boundary evidence
    basis: Evidence describes one model version, prompt, tool set and guardrail configuration
    lostWhen: Any of the four has changed in production since the last boundary test
  - signal: Outbound paths from the execution boundary
    basis: The classification of the data the system is able to read
    lostWhen: A test request to a destination outside the approved list succeeds
  - signal: Guardrail configuration against baseline
    basis: Approval applies to one configuration at one point in time
    lostWhen: Live configuration differs from the baseline without a recorded re-approval and re-test
  - signal: Sessions holding private data, untrusted content and an external channel together
    basis: The exfiltration path the business has explicitly accepted, if any
    lostWhen: The combination exists in a session type with no recorded decision and no deterministic control
faqs:
  - q: Can prompt injection be prevented completely?
    a: >-
      The vendors say it cannot. Microsoft's guidance is to assume indirect
      prompt injection will happen, and OpenAI states that complete elimination
      of the risk is not possible. Assurance therefore holds two positions: a
      measured resistance rate for the current system, and proof that a
      successful injection cannot reach data or actions beyond an agreed
      boundary.
  - q: How is this different from an AI red team exercise?
    a: >-
      A red team exercise produces findings about the system as it was during
      the exercise. Assurance keeps a position current between exercises. It
      records which system version each result describes, treats the result as
      expired when that version changes, and confirms each fix by re-test.
      Red team findings are one input to it.
  - q: Where does AI security assurance stop and AI agent assurance begin?
    a: >-
      AI security assurance covers the boundary: what untrusted content can
      cause, what data can leave and whether guardrails hold. AI agent
      assurance covers authority: the identity an agent runs as, the
      permissions it holds and the approvals it requires. OWASP draws the same
      line between its list for LLM applications and its list for agentic
      applications, and advises using both.
sources:
  - title: 'OWASP Top 10 for LLM Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/'
  - title: 'OWASP Top 10 for Agentic Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/'
  - title: 'Microsoft: defend against indirect prompt injection'
    url: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
  - title: 'Anthropic: prompt injection defenses'
    url: 'https://www.anthropic.com/research/prompt-injection-defenses'
  - title: 'Anthropic: Claude Agent SDK secure deployment'
    url: 'https://code.claude.com/docs/en/agent-sdk/secure-deployment'
  - title: 'OpenAI: agent builder safety'
    url: 'https://developers.openai.com/api/docs/guides/agent-builder-safety'
  - title: 'MITRE ATLAS data releases'
    url: 'https://github.com/mitre-atlas/atlas-data/releases'
  - title: 'Model Context Protocol blog: tool annotations'
    url: 'https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/'
  - title: 'Amazon Bedrock AgentCore release notes'
    url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html'
  - title: 'NIST AI 100-2 E2025: Adversarial Machine Learning taxonomy'
    url: 'https://csrc.nist.gov/pubs/ai/100/2/e2025/final'
  - title: 'NIST Control Overlays for Securing AI Systems (COSAiS)'
    url: 'https://csrc.nist.gov/projects/cosais'
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

A security test result describes one system on one day. AI systems stop matching that description faster than conventional software, because four things move independently of each other.

**The model changes.** Resistance to prompt injection is a measured rate, not a property. Anthropic's November 2025 research on prompt injection defences reported a 1% attack success rate for Claude Opus 4.5 in browser use, and stated that this still represents meaningful risk. The figure belongs to that model and that attack set. A model upgrade, a hosted alias that moves, or a new input modality leaves the enterprise holding a number that describes a system it no longer runs. The mechanics of that change are covered in [Model Change Assurance](/model-change-assurance).

**The published techniques change.** MITRE ATLAS now ships date-based releases every month, and its v2026.07 release added AI Agent Tool Poisoning as a catalogued technique. OWASP issued the 2026 edition of its Top 10 for LLM Applications in August 2026. It renamed System Prompt Leakage to Hidden Context Exposure, widened Prompt Injection to cover cross-modal attacks, and changed which identifier belongs to which risk. A control mapping keyed to the 2025 identifiers now points at the wrong entries.

**The system context changes.** A new document source, connector or tool adds a path by which untrusted content reaches the model, or by which data leaves. The test set that was run before the change did not include that path.

**Guardrails regress.** Guardrails are configuration: filter settings, classifier versions, policy rules and the system prompt. They are relaxed to reduce false positives, loosened for a pilot, or altered by a platform update. Nothing fails visibly when a guardrail weakens, so the regression is found only by testing for it.

## What is at stake

The vendors do not claim the problem is solved. Microsoft's guidance is to assume indirect prompt injection will happen. OpenAI states that complete elimination of injection risk is not possible. The business question is therefore how much can be lost when an injection succeeds, and whether that limit has been proven recently.

Three consequences matter. The first is disclosure: customer or regulated data leaves through a model response or a tool call, a channel that existing data loss controls were not designed to inspect. OWASP lists Sensitive Information Disclosure as LLM02:2026. The second is unintended action, where instructions carried in a document or web page are followed as if they came from the user. The third is loss of the ability to answer a regulator or customer who asks what the system could have exposed during a given period. Without dated boundary evidence, the only accurate answer is that nobody knows.

## What Xyvionix assures

Xyvionix holds five statements about each AI system as current facts, each tested against a threshold agreed with the business.

1. **The threat model is current.** It records the framework editions it was mapped to and is re-checked when one is superseded.
2. **Resistance is measured.** The injection and disclosure test set has been run against the model version, prompt, tool set and guardrail configuration that are in production now, and the rate is within the agreed ceiling.
3. **Containment holds whatever the model was told.** Outbound network paths, credential reach and data scope are limited by controls that sit outside the model, and each limit has been proven by attempting to cross it.
4. **Guardrails match their approval.** The live configuration equals the approved baseline, and behaviour has been re-tested after every change to it.
5. **Boundary events are recorded.** Blocked and flagged requests are retained with the system version in force, so a shift in the rate can be explained.

The second and third statements are different kinds of proof. Microsoft separates probabilistic defences, such as Prompt Shields and spotlighting, from deterministic ones, such as information flow control, least privilege and short-lived privileges. A probabilistic defence yields a rate. A deterministic control yields a pass or a fail. Assurance holds both and does not let one stand in for the other.

What an agent is permitted to do is held separately in [AI Agent Assurance](/ai-agent-assurance). The tool servers it connects to are covered by [MCP Security Assurance](/mcp-security-assurance), and the credentials it can reach by [Secrets Exposure Assurance](/secrets-exposure-assurance).

## Common failure modes

- **The exercise treated as standing evidence.** A red team report from before the last model upgrade is cited as the current position. It describes a predecessor system.
- **Filtering on the user channel only.** Input checks are applied to what the user types. Content arriving through retrieval, email, files and tool results reaches the model unchecked, and that is the channel indirect injection uses.
- **A rate counted as containment.** A classifier with a high block rate is recorded as the control against exfiltration. The remaining fraction is unbounded because no network or scope limit sits behind it.
- **The three-way combination.** Each tool passed review alone. The MCP maintainers state that session risk comes from combining private data access, untrusted content and external communication, and that tool annotations do not prevent prompt injection.
- **Credentials inside the boundary.** Secrets are present in the environment the model can read. Anthropic's deployment guidance is to inject credentials at a proxy so that the agent never sees them.
- **Persistence across sessions.** The Microsoft AI Red Team reports memory poisoning combined with injection, so that one successful input continues to act in later sessions. Testing that resets state between cases does not detect it.
- **Output trusted downstream.** Model output is passed to an interpreter, a query or a browser without validation. OWASP's 2026 entry on Improper Output Handling now extends to insecure generated code.

## Corrective ownership

When a threshold is breached the state moves to At risk. When a system has changed and no boundary test has been run since, the state is Unassured, which is treated as a condition to correct and not as a neutral gap. Xyvionix owns the corrective action through to completion within the access it has been granted, and uses the enterprise's own change process for anything that alters production.

The correction follows the kind of control that failed. A containment failure is corrected at the control outside the model: the outbound allowlist is tightened, the credential is moved behind a proxy, the data scope is reduced. A resistance failure is corrected in layers, by adjusting the guardrail or prompt and by checking that containment still bounds what the residual rate can reach. A guardrail that drifted is restored to its baseline, or the new setting is put through approval and test. A stale threat model is re-mapped to the current framework edition, and any newly listed risk without a control is raised as a finding.

Some residual risk cannot be removed. Where the business decides to accept it, for example by keeping a tool combination that a process depends on, the decision is recorded with a named owner and an expiry date.

## Verified closure

A correction is closed when re-testing shows the condition is gone. A deployed change is not closure.

For containment, closure means the prohibited path was attempted after the change, was refused, and the refusal was logged. For resistance, closure means the full agreed test set was re-run against the corrected system, not only the case that failed, because a fix for one input can weaken the response to another. For a guardrail, closure means the live configuration matches the baseline and representative legitimate requests still succeed, so that the correction did not trade a security failure for a service failure.

Each closure is stored with the system version it was proven on. When that version changes, the closure becomes history and the boundary is tested again.

## Technology and industry context

The platforms place enforcement in different positions, and the evidence follows the position. Amazon Bedrock AgentCore Policy evaluates authorisation rules at a gateway outside the model, and since July 2026 Bedrock Guardrails can be referenced from that policy. The check there is that the policy set matches approved intent and denies by default. For agents run on the Claude Agent SDK, Anthropic describes the permission gate as not a sandbox, so isolation is a separate control with separate evidence. Platform detail is in [Azure AI Assurance](/azure-ai-assurance) and [Amazon Bedrock Assurance](/aws-bedrock-assurance).

Reference standards are uneven. NIST AI 100-2 E2025 provides stable terminology for direct and indirect prompt injection. NIST's control overlays for AI systems are still proposals, and only the predictive AI overlay had reached annotated outline stage in January 2026. Controls for generative and agentic systems therefore rest on vendor guidance and the OWASP lists, both of which are revised often.

In financial services and healthcare the disclosure consequence carries regulatory weight, because the data an assistant can read is usually data with a legal owner. The governance obligations that sit above these controls are covered in [AI Governance Assurance](/ai-governance-assurance).
