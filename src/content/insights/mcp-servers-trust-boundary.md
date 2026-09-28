---
title: MCP servers are a trust boundary
h1: A connected MCP server is a trust boundary, not an integration
seoTitle: 'Why Every MCP Server Is a Trust Boundary | Xyvionix'
description: >-
  A tool server influences an agent through its descriptions and results. What
  to inventory, authorise and re-verify so that the boundary can be assured.
summary: >-
  A tool server supplies text the model reads, on its publisher's calendar.
  Review as software misses that. Inventory, authorisation tests and change
  detection turn the boundary into something that can be evidenced.
lede: >-
  Every connected MCP server is a trust boundary because it supplies text the
  model reads and acts on: tool descriptions before a call and tool results
  after it. A review of the server as software does not examine either. The
  boundary becomes assurable when three things are held as current evidence:
  which servers are connected and to which agents, whether each one
  authenticates callers and handles tokens as the specification requires, and
  whether the tool definitions offered today are the ones that were approved.
ogQuestion: Are the tools your agents see today the ones you approved?
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
  - Security Engineering
  - Technology Risk
intent: >-
  Informational: why a tool server is a trust boundary, which risk classes are
  documented, and which inventory, authorisation and change-detection controls
  make the boundary assurable
related:
  assurance:
    - mcp-security-assurance
    - ai-agent-assurance
    - ai-security-assurance
  useCases:
    - ai-agent-with-write-access
  technologies:
    - azure-ai-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - ai-agent-permission-risk
    - non-human-identity-exposure
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Model Context Protocol specification 2026-07-28: changelog'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/changelog'
  - title: 'Model Context Protocol blog: the 2026-07-28 revision'
    url: 'https://blog.modelcontextprotocol.io/posts/2026-07-28/'
  - title: 'Model Context Protocol specification 2026-07-28: tools'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools'
  - title: 'Model Context Protocol specification 2026-07-28: authorization'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization'
  - title: 'Model Context Protocol specification 2026-07-28: security best practices'
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices'
  - title: 'Model Context Protocol blog: tool annotations'
    url: 'https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/'
  - title: 'Model Context Protocol blog: enterprise-managed authorization'
    url: 'https://blog.modelcontextprotocol.io/posts/enterprise-managed-auth/'
  - title: 'Model Context Protocol authorization extensions repository'
    url: 'https://github.com/modelcontextprotocol/ext-auth'
  - title: 'Model Context Protocol blog: roadmap'
    url: 'https://blog.modelcontextprotocol.io/posts/mcp-roadmap/'
  - title: 'MCP Registry: about'
    url: 'https://modelcontextprotocol.io/registry/about'
  - title: 'MITRE ATLAS data releases'
    url: 'https://github.com/mitre-atlas/atlas-data/releases'
  - title: 'OWASP Top 10 for Agentic Applications 2026'
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Reviewed as software, trusted as a colleague

Most enterprises approve a Model Context Protocol server the way they approve any third-party component. The publisher is checked. The package is scanned. The data flow is drawn. A reviewer confirms which systems the server reaches, and the server joins the approved list.

Each step is sound, and none examines the property that makes a tool server different. A conventional dependency executes code. A tool server also supplies text that the model reads and acts on: the name and description of each tool before any call is made, and the result of each call afterwards. The model has no separate channel for instructions and for data. What the server writes becomes part of what the agent reasons from.

Connecting a server therefore gives a party outside the agent's design a continuing means of influencing what the agent does, on a calendar that party controls. That is a trust boundary, and a boundary approved once is not a boundary held.

This article describes what has to be verified to hold it. It is written against specification revision 2026-07-28, which replaced 2025-11-25 and which the maintainers describe as the largest revision since launch.

## What crosses the boundary

Four things cross between an agent and a tool server. Conventional review concentrates on the last two.

| What crosses | Direction | What the specification states | What to verify |
|---|---|---|---|
| Tool names, descriptions, schemas and annotations | Server to model | Clients must treat annotations as untrusted unless they come from a trusted server. Tool lists can change at run time | The definitions offered now are the definitions approved |
| Tool results | Server to model | Servers must sanitise outputs | Which servers return content from outside the enterprise, and which agents read it |
| Tool arguments | Model to server | Servers must validate inputs, enforce access control and rate limit | What data an agent can place in an argument, and where the server sends it |
| Tokens | Client to server | Servers must validate the token audience and must not accept or transit any other tokens | A token for another audience is refused, and no client token appears downstream |

The first row is the one that expires fastest. A tool list can be updated while the agent is running, with a notification to the client, and list results now carry a time to live and a cache scope. The definition that was reviewed and the definition in use can differ within the same working day.

The second row explains why a server cannot be assessed alone. In a post of 16 March 2026 the protocol's maintainers state that annotations such as read-only hints do not prevent prompt injection and are not enforcement. They locate the risk in the combination of tools available in one session: access to private data, exposure to untrusted content, and a means of communicating externally. A server that returns public web content is low risk on its own. Beside a tool that reads customer records and another that sends email, it completes the combination.

## The documented risk classes

The published material sorts into three families. Each implies a different check.

**Influence.** MITRE ATLAS added AI Agent Tool Poisoning in its v2026.07 release, with sub-techniques covering a tool's definition, its implementation and its runtime response. The OWASP Top 10 for Agentic Applications 2026 lists Tool Misuse and Exploitation (ASI02) and Agentic Supply Chain Vulnerabilities (ASI04). The check is on content: what the server tells the model, and whether that has changed.

**Authority.** The specification's security best practices cover the confused deputy, token passthrough, state handle hijacking, mix-up attacks and scope minimisation. The requirements are testable. A proxy server must implement consent per client. Token passthrough is forbidden. Possession of a state handle must not be treated as authentication. The check is on behaviour: what the server accepts and what it forwards.

**Presence.** The same guidance covers compromise through local servers and requires a client to show the exact command and obtain consent before starting one. The official registry is described in its own documentation as in preview. It verifies namespace ownership and hosts metadata only. A listing shows who published a server. The check is on existence: which servers are connected at all.

The scale is not hypothetical. Version 2.0 of the Microsoft AI Red Team's taxonomy of failure modes in agentic systems, published in June 2026, added MCP and plugin abuse as a category and cites 99 CVEs published for MCP-related software in 2025.

## Three controls, and what each one proves

### Inventory proves the extent of the boundary

An inventory that lists approved servers is a policy. An inventory that lists connected servers is evidence. The second includes local servers configured on individual machines, and it records for each agent the full set of tools available in a session, because that set is the unit the risk attaches to.

The Enterprise-Managed Authorization extension, described by the maintainers in June 2026 and listed as stable in the official extensions repository, lets the enterprise identity provider decide which servers a user's client may reach. Where it is adopted, the measure is the number of connections made outside that policy.

Inventory evidence expires whenever a client configuration changes.

### Authorisation proves who is on the other side

Authorisation is optional in the protocol. A deployed server is not necessarily an authenticated one, so the condition is established by test. A request without a token is refused. A token issued for a different audience is refused. The downstream system's log shows the server's own credential. Granted scopes are compared with exercised scopes.

The roadmap published on 22 August 2026 lists proof-of-possession tokens and workload identity federation as priorities. Bearer tokens remain the norm until then, which raises the value of the audience and passthrough tests.

### Change detection proves the approval still applies

Each tool's name, description, input schema and annotations are fingerprinted at approval. The fingerprint is compared when the server signals a list change and when the list's time to live expires. The measure is the interval between a definition changing and the enterprise knowing.

The protocol changes too. Revision 2026-07-28 removed protocol-level sessions, so a control keyed to a session identifier no longer refers to anything. The same revision requires Streamable HTTP requests to carry the method and tool name in headers, so that a gateway can route and authorise without parsing the body. That makes gateway policy practical. It also adds something to verify: that the gateway rejects a request whose headers and body disagree.

## How much verification a server needs

Verification depth follows two questions: who operates the server, and what the agents that use it can reach.

| Operator | What the enterprise can test | Where the control sits |
|---|---|---|
| The enterprise | Token handling, scopes, input validation and the downstream log | In the server and at the boundary |
| A contracted supplier | Authorisation behaviour from the client side, and tool definitions | At the boundary, with notice of change agreed in the contract |
| An unknown or community publisher, often run locally | Tool definitions and the command that starts the server | Around the server: the maintainers point to deterministic controls such as network controls or sandboxing |

The second question can override the first. A well-run supplier server still needs the deepest scrutiny if it is the component that completes the three-way combination for an agent holding customer data.

## The trade-offs

**Strict change detection against availability.** If any fingerprint change withholds a tool, a publisher's edit to a description stops a business process until someone reviews it. The tempting relaxation is to treat description changes as cosmetic and review only schema changes. That relaxation removes the control, because the description is the part the model reads. The better economy is to withhold the changed tool and not the whole server, and to make review fast.

**Concentration against visibility.** Routing every server through one gateway gives a single place to log and enforce. It also presents many servers as one endpoint. The inventory still has to record what sits behind it.

**Approval against attention.** The specification says there should always be a human in the loop with the ability to deny tool invocations. That is a recommendation, and whether it exists in a given deployment has to be shown. Applied to every call it produces volume, and volume erodes the decision. The measurement of that erosion is covered in [AI Agent Assurance](/ai-agent-assurance).

**Stability against the deprecation clock.** Staying on an earlier revision keeps existing controls meaningful. The protocol's lifecycle policy gives deprecated features a minimum window of twelve months, so the delay has a date on it.

## An illustrative example

In this illustrative case, an enterprise approves a supplier's document server with three tools, all of which read. The review records the data flow and the scopes. Six weeks later the supplier publishes a fourth tool that shares a document by link, and rewrites the description of an existing tool. The client refreshes its list. No release has occurred inside the enterprise and no change record exists.

Without change detection, the agent now holds a means of external communication that no review examined, alongside its access to internal documents. With it, the two definitions fail their fingerprint comparison when the cached list expires. Both are withheld. The reviewer sees the old and new text side by side, approves the description, and declines the sharing tool for agents that read confidential material. The interval between publication and detection is recorded.

The supplier did nothing wrong in this illustrative case. The boundary moved, and only an enterprise that compares definitions would have known.

## What this means for assurance

Approval of a tool server is evidence about one set of definitions, one authorisation configuration and one protocol revision on one date. Each of the three expires on a different trigger, and two of the triggers belong to someone else.

Held as a state, the position is plain. A server is Assured while its inventory record, its authorisation tests and its definition fingerprints are all current. It is At risk when a test fails or a definition differs from its approved form. It is Unassured when it is connected and unrecorded, which is a statement about the enterprise's knowledge and not about the server's quality.

The continuing controls are set out in [MCP Security Assurance](/mcp-security-assurance), and the scenario in which most enterprises first meet the problem in [AI Agent With Write Access](/ai-agent-with-write-access). A tool server is a participant in the agent's reasoning, and participants are verified continuously, not admitted once.
