---
title: Non-human identity exposure
h1: 'Non-human identities have no leaver process, and AI agents are multiplying them'
seoTitle: 'Non-Human Identity Exposure: No Leaver Process | Xyvionix'
description: >-
  Service principals, keys, tokens and agent identities have no joiner, mover
  or leaver events. The four facts to re-prove instead, and how AI agents add
  to them.
summary: >-
  Human accounts are governed by personnel events. Non-human identities have
  none, so they are governed by four facts that must be re-proven: inventory,
  ownership, credential age and credential form. AI agents enlarge every one.
lede: >-
  Non-human identities are exposed because nothing in the enterprise produces
  the events that govern them. A person's account is created, changed and
  removed when the personnel record changes. A service principal, access key,
  token or agent identity is created by a project and has no record that ends
  it. Governance therefore rests on four facts that have to be re-proven: the
  identity is known, it has a current owner, its credential is inside its
  age, and a stored secret is used only where federation cannot be.
ogQuestion: 'Who owns each service identity and agent in your estate today?'
category: Cyber Exposure
author: Xyvionix Research
featured: false
cluster: cyber
secondary:
  - ai
parent: insights
state: risk
audience:
  - CISO
  - Identity and Access Management
  - Platform Engineering
  - Head of AI
intent: >-
  Informational: why non-human identities escape lifecycle governance, which
  facts have to be re-proven in its place, and how AI agents enlarge the
  population
related:
  assurance:
    - secrets-exposure-assurance
    - identity-exposure-assurance
    - mcp-security-assurance
  useCases:
    - identity-access-drift
    - ai-agent-with-write-access
  technologies:
    - aws-iam-exposure-assurance
    - entra-id-exposure-assurance
  industries:
    - software-technology
  insights:
    - ai-agent-permission-risk
    - how-identity-controls-drift
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'OWASP Non-Human Identities Top 10 (2025)'
    url: 'https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/'
  - title: 'AWS IAM: security best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
  - title: 'Google Cloud Threat Horizons Report H1 2026'
    url: 'https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026'
  - title: 'Microsoft Entra Agent ID: what is new'
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id'
  - title: 'Microsoft Entra Agent ID: key concepts'
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/key-concepts'
  - title: 'Microsoft Entra: what is new'
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/whats-new'
  - title: 'Microsoft Entra: Conditional Access for agents'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id'
  - title: 'Microsoft Agent 365 general availability'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/'
  - title: 'Google Cloud: agent identity overview'
    url: 'https://docs.cloud.google.com/iam/docs/agent-identity-overview'
  - title: 'GitGuardian: The State of Secrets Sprawl 2026'
    url: 'https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Governance that depends on an event nobody sends

Human identity is governed by events. A person joins, moves or leaves, the personnel record changes, and the change drives the account. The process has faults, but it has a source: one system that knows a person exists and knows when that stops being true.

Non-human identities have no such source. A service principal is created by an engineer during a project. An access key is issued from a console. A token is minted by a pipeline. An agent is published from a low-code tool by someone in a business unit. There are many creators and no register that all of them write to.

There is also no ending. A project closes without informing the directory. A workload is decommissioned and its role remains. The engineer who created the key changes team, and the key continues to authenticate.

The OWASP Non-Human Identities Top 10 for 2025 places Improper Offboarding first, as NHI1. The argument here is that offboarding fails for a structural reason, and that adding non-human identities to the existing access review does not repair it. The lifecycle has to be rebuilt from substitute events, and the condition of the population has to be held as four facts that are re-proven on a schedule.

## Substitute events for a missing lifecycle

Each stage of the human lifecycle has an equivalent. The equivalents exist in the enterprise already. They are recorded in systems that the identity platform does not read.

| Human event | Non-human equivalent | Where the event is recorded | What it should cause |
|---|---|---|---|
| Joiner | An identity is created by a person, a pipeline or a platform | Directory and cloud audit records | Registration with an owner, a purpose and an expected end |
| Mover | The owner changes role, or the workload changes purpose | The personnel record of the owner, and the change record | Ownership transferred and confirmed, permissions re-examined |
| Leaver | The project closes, the repository is archived, the workload is retired, the supplier contract ends | Project, repository and contract records | The identity disabled, its credentials revoked, deletion after a holding period |
| None | Last use passes the dormancy limit | Last-used data from the platform | The same as a leaver, begun by the absence of activity |

The last row has no human parallel and is the most dependable. When no business event arrives, the absence of use is the signal. AWS recommends using IAM access last used information to update and remove access keys, which makes dormancy an observable fact.

One vendor has begun connecting the mover event. Microsoft's release notes record that Lifecycle Workflows for Agent ID sponsorship became generally available in May 2026, to prevent orphaned agents when a sponsor leaves. The general point stands for every other type: ownership of a machine identity is a fact about a person, and it expires on that person's calendar.

## Four facts to re-prove

Substitute events will be missed. The backstop is a set of facts about the population, each with a denominator, measured on a schedule.

| Fact | Measure | What a poor value means |
|---|---|---|
| The identity is known | Identities in the register as a share of identities discovered in directories, cloud accounts, clusters and pipeline systems | Governance applies to part of the population |
| It has a current owner | Identities whose named owner is an active person who has confirmed the responsibility | Nobody will answer for the identity or approve its removal |
| Its credential is inside its age | Credentials within the age the policy allows, and the count with no expiry at all | Exposure from any past leak is still open |
| Its credential form is justified | Workloads using attached or federated identity as a share of all workloads, with a reason recorded for each stored secret | Long-lived secrets are the default, not the exception |

Order matters. Ownership cannot be measured for identities that are not in the register, and credential age cannot be corrected for an identity with no owner to approve the rotation. An identity without an accountable person has already drifted, whatever its permissions are.

## Choosing the credential form

The fourth fact rests on a decision made for each workload. The forms below are ordered from least to most standing exposure.

| Credential form | What is held by the workload | What has to be evidenced |
|---|---|---|
| Identity attached by the platform | Nothing that can be copied | The role or identity attached, and the permissions it carries |
| Federation from an external issuer | A short-lived token exchanged under a trust | The conditions of the trust, and which workloads satisfy them |
| Stored secret with rotation | A value that changes on a schedule | The last successful rotation, and the consumer working afterwards |
| Stored secret without rotation | A value valid until revoked | The reason it exists, its owner and its review date |

AWS guidance follows this order. It recommends that workloads use IAM roles, and for workloads outside AWS it names IAM Roles Anywhere and federation through web identity or SAML. It also names the cases in which long-term credentials remain legitimate, such as workloads that cannot use roles and certain third-party clients. Those cases are exceptions with a reason, and the reason is part of the evidence.

Federation carries a trade-off that is easy to overlook. It removes the secret and moves the exposure into the trust policy. The Google Cloud Threat Horizons Report H1 2026 describes an actor who moved from a developer's local environment to full cloud administration in under 72 hours by abusing OpenID Connect trust between a CI/CD provider and a cloud platform. A trust whose conditions admit any repository or branch is a shared credential in another form. Trust conditions need the review that secrets used to receive.

Short-lived credentials carry a second cost. A workload that must renew its credential depends on the issuer being available at renewal. The design has to state what the workload does when it is not. A renewal failure that stops a service is commonly answered with a long-lived secret, which restores the exposure the design had removed.

## How AI agents enlarge the population

Agents add to each of the four facts, by mechanisms that are already documented.

**More creators.** Agents are built by people outside engineering as well as inside it. Microsoft Agent 365, generally available since 1 May 2026, includes discovery of unmanaged local agents through Defender and Intune. A vendor builds discovery for a population that exists.

**More identities for each workload.** In Microsoft Entra Agent ID, an agent identity holds no credentials of its own. An agent identity blueprint holds them, and an agent may also have a user account. Microsoft documents that Conditional Access policies targeting an agent identity do not cover its user account, and that access by API key bypasses Conditional Access entirely. One agent can therefore present an identity, an account and a set of keys, each governed separately.

**Older agents registered as something else.** Microsoft states that traditional service principals and regular user accounts are not recommended for AI agents, and publishes migration guides for agents running as standard app registrations. An agent built before the platform existed sits in the directory as an application, and nothing marks it as an agent.

**Keys in tool configuration.** GitGuardian's State of Secrets Sprawl 2026 report found 24,008 unique secrets in Model Context Protocol configuration files, of which 2,117 were valid. An agent's tools are reached with credentials, and those credentials are stored where the agent is configured.

**A higher baseline.** Google Cloud documents that its agent identities use a SPIFFE-formatted identity for each agent and automatically provisioned X.509 certificates valid for 24 hours. They are not shared by default, cannot be impersonated and have no long-lived keys. An agent that holds a long-lived API key is now below what the platforms provide.

Agents also divide the ownership fact in two. Microsoft Entra distinguishes interactive agents, which act on behalf of a user with delegated permissions, from autonomous agents, which act under their own identity. The record has to show who is accountable for the agent and whose authority each action carried.

## An illustrative count

In this illustrative case, a software company's register lists 1,200 non-human identities. Discovery across its directory, its cloud organisations and its pipeline system finds 3,100. The first fact stands at 39%.

Of the 1,200 registered identities, 700 name an owner, and 410 of those owners are still in a role connected to the workload. Measured against the discovered population, in this illustrative case, 13% of identities have a current owner. The company's access review covered the 1,200 and reported them complete.

## What this means for assurance

Every fact about a non-human identity is a record that goes out of date. The register ages with each identity created outside it. Ownership ages when people move. Credential age advances daily without an event. A trust policy written for one repository is widened for a second.

An identity outside the register is Unassured: no evidence about it exists. One with a departed owner or a credential past its age is At risk. The thresholds are set by the business for each class of workload, and the first of them is how large an unregistered population it will accept.

The credentials these identities hold are assured under [Secrets Exposure Assurance](/secrets-exposure-assurance), and what they can reach under [Identity Exposure Assurance](/identity-exposure-assurance). Agents, their permissions and their approval steps are held under [AI Agent Assurance](/ai-agent-assurance). The reasons sign-in policy does not reach most of this population are set out in [how identity controls drift](/how-identity-controls-drift).

A leaver process works because something announces the departure. For non-human identities nothing does, so the enterprise has to look, count and look again.
