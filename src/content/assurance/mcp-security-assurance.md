---
title: MCP Security Assurance
h1: Know what every connected MCP server can reach, and prove it has not changed
seoTitle: "MCP Security Assurance: Servers, Tokens, Tools | Xyvionix"
description: >-
  Continuous assurance for Model Context Protocol servers: inventory,
  authorisation, token handling, tool definition integrity and change
  detection.
summary: >-
  Each MCP server extends the trust boundary of every agent that connects to
  it. The server inventory, its authorisation, its token handling, its tool
  definitions and the protocol revision it speaks are each held against a
  threshold and re-proven on change.
lede: >-
  MCP security assurance is the continuing proof that every Model Context
  Protocol server an enterprise connects to is known, authenticates its callers,
  handles tokens as the specification requires, and still offers the tool
  definitions that were approved. A tool server is operated and changed on its
  publisher's calendar, and the protocol itself is revised, so the proof is
  re-gathered when a server, a tool list or the specification revision changes.
ogQuestion: Do you know what every connected tool server can reach?
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
intent: 'Commercial: assurance for Model Context Protocol servers and tool connections'
related:
  assurance:
    - ai-agent-assurance
    - ai-security-assurance
    - secrets-exposure-assurance
  useCases:
    - ai-agent-with-write-access
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - mcp-servers-trust-boundary
    - non-human-identity-exposure
evidence:
  - name: MCP server inventory
    detail: >-
      Every server that any client in the enterprise connects to, local or
      remote, with its publisher, operator, transport, specification revision,
      the downstream systems it reaches and the clients that use it.
  - name: Authorisation record per server
    detail: >-
      Whether the server requires authorisation, which authorisation server
      issues its tokens, how clients are registered, and whether access is
      decided by the enterprise identity provider.
  - name: Token handling test results
    detail: >-
      Dated results showing that the server rejects a token issued for a
      different audience and does not forward the client's token to downstream
      services.
  - name: Scope grant and use record
    detail: >-
      Scopes each server requests and each client has been granted, compared
      with the scopes exercised, including step-up events with their
      correlation identifiers.
  - name: Tool definition change history
    detail: >-
      A fingerprint of each tool's name, description, input schema and
      annotations per server, with the time each change was published and the
      time it was detected.
  - name: Protocol revision and deprecation register
    detail: >-
      The specification revision each client and server speaks, the deprecated
      features still in use, and the dated plan to replace each one.
  - name: Tool call record at the boundary
    detail: >-
      Gateway or client logs of tool calls carrying trace context, so that a
      call can be followed from the client through the server to the
      downstream system.
thresholds:
  - signal: Servers in use outside the inventory
    basis: The business requires every system that can reach enterprise data to have a named owner
    lostWhen: Any client is found connected to a server that has no inventory record or sits outside identity provider policy
  - signal: Remote servers that accept unauthorised requests
    basis: The classification of the data and actions the server exposes
    lostWhen: A test request without a valid token is served by any server that reaches non-public data
  - signal: Token audience validation and passthrough
    basis: The specification requirement that a server validates the audience and does not accept or transit other tokens
    lostWhen: A token issued for another resource is accepted, or a client token is observed at a downstream service
  - signal: Time to detect a changed tool definition
    basis: How long a changed third-party tool may be offered to agents before review
    lostWhen: A definition differs from its approved fingerprint and the change was not detected within the agreed interval
  - signal: Deprecated protocol features in use
    basis: >-
      The published deprecation window, which the specification sets at a
      minimum of twelve months
    lostWhen: A deprecated feature is still relied on with no replacement scheduled inside the window
  - signal: Scope granted against scope exercised
    basis: The smallest scope set that still completes the approved operations
    lostWhen: Wildcard scopes are granted, or unused scope persists beyond the agreed review window
faqs:
  - q: Does a listing in the official MCP Registry show that a server is safe?
    a: >-
      No. The official documentation describes the registry as in preview. It
      verifies namespace ownership and hosts metadata only, and security
      scanning is delegated to package registries and downstream aggregators.
      A listing is evidence of who published a server. It is not evidence of
      what the server does.
  - q: What has to be re-proven after moving to specification revision 2026-07-28?
    a: >-
      Anything that depended on features the revision removed or deprecated.
      Protocol-level sessions were removed, so controls keyed to a session
      identifier no longer map to the protocol. Logging is deprecated, so an
      audit trail that relied on it needs another path. Client registration,
      gateway routing and approval handling all changed and are re-tested
      before the state returns to Assured.
  - q: How does this relate to AI agent assurance?
    a: >-
      AI agent assurance covers the client side: the identity an agent runs
      as, what it is permitted to do and which actions need approval. MCP
      security assurance covers the server side: which servers exist, how they
      authorise callers and handle tokens, and whether their tools are still
      the ones approved. An enterprise that runs agents against MCP servers
      needs both positions.
sources:
  - title: 'Model Context Protocol specification 2026-07-28: changelog'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/changelog'
  - title: 'Model Context Protocol specification 2026-07-28: authorization'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization'
  - title: 'Model Context Protocol specification 2026-07-28: security best practices'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices'
  - title: 'Model Context Protocol specification 2026-07-28: tools'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools'
  - title: 'Model Context Protocol blog: the 2026-07-28 revision'
    url: 'https://blog.modelcontextprotocol.io/posts/2026-07-28/'
  - title: 'Model Context Protocol blog: tool annotations'
    url: 'https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/'
  - title: 'Model Context Protocol blog: enterprise-managed authorization'
    url: 'https://blog.modelcontextprotocol.io/posts/enterprise-managed-auth/'
  - title: 'Model Context Protocol blog: roadmap'
    url: 'https://blog.modelcontextprotocol.io/posts/mcp-roadmap/'
  - title: 'MCP Registry: about'
    url: 'https://modelcontextprotocol.io/registry/about'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
  - title: 'MITRE ATLAS data releases'
    url: 'https://github.com/mitre-atlas/atlas-data/releases'
  - title: 'OWASP: A Practical Guide for Secure MCP Server Development'
    url: 'https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/'
  - title: 'Linux Foundation: formation of the Agentic AI Foundation'
    url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation'
  - title: 'Linux Foundation: A2A protocol first year'
    url: 'https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year'
  - title: 'Amazon Bedrock AgentCore release notes'
    url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html'
  - title: 'Amazon Bedrock AgentCore: overview'
    url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html'
  - title: 'Microsoft Learn: Foundry Agent Service overview'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/overview'
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

An MCP server is approved as it was on the day it was reviewed: this publisher, these tools, this authorisation setup, this revision of the protocol. Four of those can change without the enterprise taking any action.

**The server estate grows unrecorded.** A local server is added to a developer's client as a configuration entry. A remote server is connected during a trial and stays. Neither passes through the process that approved the first servers, so the inventory describes a smaller estate than the one in use.

**Third-party servers change on their publisher's calendar.** The specification allows a server to change its tool list at run time and notify clients that it has done so. Tool list results now carry a time to live and a cache scope. A tool description is text that the model reads, so a changed description changes what the model is told. Approval given to the earlier definition says nothing about the new one.

**The protocol is revised.** The current specification revision is 2026-07-28, which the maintainers describe as the largest since launch. It removed protocol-level sessions and the initialisation handshake, deprecated the Roots, Sampling and Logging features, and made Client ID Metadata Documents the preferred form of client registration in place of Dynamic Client Registration. Controls and log parsers built on the earlier semantics continue to run after an upgrade. They no longer measure what they were built to measure.

**Tokens and scopes accumulate.** Scopes are added to make an integration work and are not withdrawn. The roadmap published in August 2026 lists proof-of-possession tokens as a priority, which means bearer tokens remain the norm today and a token that leaves its intended path can be used by whoever holds it.

## What is at stake

Every server an agent connects to is inside that agent's trust boundary. The server supplies instructions the model reads, receives the arguments the model sends, and holds credentials for the systems behind it. A weakness in one server is therefore available to every agent and every user that reaches it.

The exposure is documented. The Microsoft AI Red Team's 2026 taxonomy of agentic failure modes cites 99 CVEs published for MCP-related software in 2025 and adds MCP and plugin abuse as a category. MITRE ATLAS catalogued AI Agent Tool Poisoning in its v2026.07 release.

The business consequences are data reached through a server nobody registered, actions taken through a tool that changed after review, and an audit trail that names the wrong actor. The specification's security guidance notes that token passthrough makes downstream logs show a different identity from the one acting, which makes investigation harder at the moment it is needed.

## What Xyvionix assures

Xyvionix holds six statements about the server estate as current facts, tested against thresholds agreed with the business.

1. **Every server is known.** Each server that any client connects to, local or remote, has an inventory record with its publisher, its operator, the systems it reaches and a named owner.
2. **Servers that reach non-public data authenticate their callers.** Authorisation is optional in the protocol, so it is established by test for each server and not inferred from deployment.
3. **Tokens are used only where they were issued for.** The specification requires a server to validate the token audience and not to accept or transit any other token. Both are tested on a schedule and after every server change.
4. **Scopes match use.** The scopes a client holds are compared with the scopes it exercises.
5. **The tools offered are the tools approved.** Each tool's name, description, input schema and annotations are fingerprinted at approval and compared whenever the list changes or its cache lifetime expires.
6. **The protocol revision is known.** Every deprecated feature still in use has a dated replacement.

These statements stop at the server boundary. The identity an agent runs as, its permissions and the approvals on its actions are covered by [AI Agent Assurance](/ai-agent-assurance). The credentials a server holds for the systems behind it are covered by [Secrets Exposure Assurance](/secrets-exposure-assurance).

## Common failure modes

- **Annotations read as enforcement.** A client policy allows any tool marked read-only without review. The maintainers state that annotations such as readOnlyHint and destructiveHint are not enforcement, and the specification tells clients to treat them as untrusted unless the server is trusted.
- **Review of the server alone.** The maintainers describe risk as a property of the tools available together in one session: private data, untrusted content and a channel to the outside. Connecting one more server changes that combination for every agent that uses it.
- **Omnibus scopes.** The official guidance names wildcard scopes, and publishing every scope in the server's supported list, as common mistakes.
- **Controls keyed to a session.** Allowlists built on the session identifier refer to something the 2026-07-28 revision removed. The guidance now states that possession of a state handle must not be treated as authentication.
- **Local servers added out of sight.** The guidance requires a client to show the exact command and obtain consent before it starts a local server. Configuration copied between machines can bypass that step.
- **Audit trail on a deprecated feature.** Tool activity is collected through MCP Logging, which is deprecated. The published alternatives are standard error output and OpenTelemetry. Without a scheduled move, the record ends when the feature is removed.

## Corrective ownership

When a threshold is breached the state moves to At risk. A server found outside the inventory is Unassured, because nothing about it has been tested. In both cases Xyvionix owns the corrective action through to completion within the access it has been granted, and uses the enterprise's change process for any change to production.

The correction depends on who operates the server.

Where the enterprise operates it, the server is corrected. Audience validation is added, the forwarded token is replaced with a credential issued to the server for the downstream system, and wildcard scopes are replaced with scopes per operation.

Where a third party operates it, the correction is made on the enterprise's side of the boundary. A changed tool definition is withheld from agents until it has been compared with the approved version and reviewed. A server that fails a token test is reported to its publisher and blocked at the gateway or removed from client configuration until a re-test passes. An unregistered server is brought into the inventory with an owner, or disconnected.

Continuing to use a third-party server with a known weakness is a decision for the business. It is recorded with its owner and an expiry date.

## Verified closure

A correction is closed when a re-test against the live server shows the condition is gone. A publisher's release note is a signal that a re-test is due. It is not the evidence.

- **Authorisation.** A request with no token and a request with a token issued for another audience are both refused and logged.
- **Token handling.** The downstream system's own log shows the server's credential for a test call, not the client's token.
- **Scope.** The removed scope is absent from the live grant, the approved operations still complete, and a call that needs the removed scope is refused.
- **Tool definitions.** The list read after its cache lifetime has expired matches the approved fingerprints.
- **Inventory.** A fresh discovery across clients finds no connection to a server without a record.

After a protocol upgrade, each test is run again against the new revision before the state returns to Assured. A condition that reappears reopens the same record.

## Technology and industry context

**Access decisions are moving to the identity provider.** The Enterprise-Managed Authorization extension, published in June 2026, lets the enterprise identity provider decide which MCP servers a user's client may reach. Where it is adopted, the assurance question becomes whether any connection is made outside that policy.

**Managed platforms concentrate the boundary.** Microsoft Foundry Agent Service exposes tools to agents through toolboxes, each served from one managed MCP endpoint. Amazon Bedrock AgentCore provides a Gateway, and AWS Agent Registry reached general availability in August 2026. A single endpoint gives one place to log and enforce policy. It does not show what sits behind it, so the inventory still records each server and tool. Platform detail is in [Azure AI Assurance](/azure-ai-assurance) and [Amazon Bedrock Assurance](/aws-bedrock-assurance).

**Governance sets the deprecation clock.** MCP is now a project of the Agentic AI Foundation, hosted by the Linux Foundation, and its features follow a lifecycle of Active, Deprecated and Removed. Each deprecated feature therefore has a dated deadline. The Linux Foundation positions the Agent2Agent protocol as complementary, covering communication between agents across organisations. An estate that uses both has two boundaries, each needing its own evidence.

**An independent baseline exists.** The OWASP GenAI Security Project publishes a practical guide for secure MCP server development, which gives server review a reference that is not a vendor's.

In regulated sectors, a tool server that reaches customer or payment records falls under the audit obligations of the process it serves. The record has to name the acting identity at every hop. The scenario most enterprises meet first is covered in [AI Agent With Write Access](/ai-agent-with-write-access).
