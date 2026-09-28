---
title: Microsoft Entra ID Exposure Assurance
h1: Prove what Microsoft Entra ID enforces once exclusions, standing roles and agents are counted
seoTitle: 'Microsoft Entra ID Exposure Assurance: Exclusions, Roles | Xyvionix'
description: >-
  What has to be re-proven in a Microsoft Entra ID tenant: Conditional Access
  exclusions, standing directory roles, guests, application credentials and
  agent identities.
summary: >-
  A tenant's real policy is the written one minus its exclusions. Exclusion
  groups, permanent role assignments, guests, application credentials and
  agent identities are held against thresholds and re-tested after each
  Microsoft enforcement change.
lede: >-
  Microsoft Entra ID exposure assurance is the continuing proof that a tenant
  enforces the access its Conditional Access policies and role assignments
  describe. The proof is measured from what each policy evaluates in practice:
  who is excluded, which roles are permanently active, which guests and
  application credentials are still live, and which agents no policy reaches.
  It is re-gathered when the tenant changes and when Microsoft changes what an
  unchanged tenant does.
ogQuestion: Does your Entra ID tenant enforce what its policies say?
platform: Microsoft Entra ID
group: identity
cluster: cyber
secondary: []
parent: technologies
state: assured
audience:
  - CISO
  - Identity Engineering
  - Internal Audit
intent: 'Technology + problem: proving Entra ID controls still enforce intended access'
related:
  assurance:
    - identity-exposure-assurance
    - privileged-access-assurance
    - secrets-exposure-assurance
  useCases:
    - identity-access-drift
    - stale-privileged-access
    - ai-agent-with-write-access
  technologies:
    - azure-ai-assurance
    - azure-production-reliability
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - how-identity-controls-drift
    - standing-privilege-evidence-gap
evidence:
  - name: Conditional Access exclusion register
    detail: >-
      For every policy, each excluded group and its current members, with an
      owner, a reason and an expiry date for every member, compared with the
      previous window so that growth is visible.
  - name: Directory role assignment record
    detail: >-
      Every privileged role assignment classed as permanent active, permanent
      eligible or time-bound, including assignments held through groups, with
      the activation history for eligible roles.
  - name: Emergency access validation record
    detail: >-
      The dated result of each validation: the account signed in, the alert
      reached a person, and the list of people authorised to use the account
      was confirmed as current.
  - name: Guest account register
    detail: >-
      Each guest with its inviter, its sponsor, its last sign-in and the groups
      and roles it holds, so that a guest with no current sponsor or purpose is
      identifiable.
  - name: Application credential inventory
    detail: >-
      Every client secret and certificate on an application registration or
      service principal, with its owner, expiry, last use and the permissions
      the application has been granted.
  - name: Agent identity register
    detail: >-
      Each agent identity and agent's user account with its blueprint, owner
      and sponsor, and a list of agents that still run as ordinary application
      registrations.
  - name: Platform change re-test log
    detail: >-
      Each dated Microsoft enforcement or behaviour change, with the date the
      tenant's controls were re-tested against it and the result.
thresholds:
  - signal: Members of Conditional Access exclusion groups
    basis: Each exclusion is a time-limited decision with a named owner, agreed per policy
    lostWhen: Any excluded member has no owner, no reason or no unexpired end date, or membership grows across consecutive windows
  - signal: Permanent active privileged role assignments
    basis: Microsoft's guidance of fewer than five Global Administrators and fewer than 10 privileged role assignments, adjusted to the ceiling the business accepts
    lostWhen: The count exceeds the agreed ceiling, or a permanent active assignment has no current justification
  - signal: Age of the last emergency access validation
    basis: Microsoft's guidance to validate at least every 90 days and when IT staff change
    lostWhen: The last passing validation is older than 90 days, or the sign-in alert did not reach a person
  - signal: User accounts performing automated work
    basis: Microsoft's mandatory MFA scope, which includes user accounts used as service accounts and excludes workload identities
    lostWhen: Any user account is found running automation against Azure management interfaces
  - signal: Agents outside agent-scoped policy
    basis: The business requires every acting identity to be evaluated by a control and to have a sponsor in role
    lostWhen: An agent runs as an ordinary application registration, authenticates by API key, or has no current sponsor
  - signal: Weakest authentication method still usable
    basis: The assurance level required by what the identity can reach
    lostWhen: A method below the agreed level remains enabled in any policy, including a legacy policy that has not reached Migration Complete
faqs:
  - q: Microsoft now enforces MFA on Azure sign-ins. What is left to prove?
    a: >-
      Mandatory MFA covers Azure management interfaces. It does not cover the
      applications the enterprise protects with its own Conditional Access
      policies, and workload identities are outside its scope. What remains to
      be proven is exclusion membership, standing role assignments, guest and
      application credential lifecycle, and whether any automation still runs
      as a user account.
  - q: The tenant has Conditional Access. Are service principals and agents covered?
    a: >-
      Not by default. Microsoft documents that Conditional Access for workload
      identities needs Workload Identities Premium and covers only single-tenant
      service principals registered in the tenant. Agents need their own
      policies and a Microsoft Agent 365 licence, and an "all users" policy
      does not include agents' user accounts.
  - q: Is Xyvionix a Microsoft partner or reseller?
    a: >-
      No. Xyvionix is not a reseller or partner of any vendor. It is
      independent, and it gathers evidence about the enterprise's tenant using
      the access the enterprise grants.
sources:
  - title: 'Microsoft Entra: mandatory multifactor authentication for Azure and admin portals'
    url: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication'
  - title: 'Microsoft Entra: manage emergency access accounts'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access'
  - title: 'Microsoft Entra: best practices for roles'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices'
  - title: "Microsoft Entra: what's new (release notes)"
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/whats-new'
  - title: 'Microsoft Entra Conditional Access: token protection'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection'
  - title: "Microsoft Entra Agent ID: what's new"
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id'
  - title: 'Microsoft Entra Conditional Access for agent identities'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id'
  - title: 'Microsoft Entra Conditional Access for workload identities'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity'
  - title: 'Microsoft Entra: security defaults'
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults'
  - title: 'Microsoft Entra: manage authentication methods'
    url: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage'
  - title: 'Microsoft Graph: migrate from Azure AD Graph'
    url: 'https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-overview'
  - title: 'Microsoft: MSOnline and AzureAD PowerShell migration FAQ'
    url: 'https://learn.microsoft.com/en-us/powershell/azure/active-directory/migration-faq?view=azureadps-2.0'
  - title: 'Microsoft Entra Privileged Identity Management: overview'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure'
  - title: 'Microsoft Entra Privileged Identity Management: role settings'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings'
  - title: 'Microsoft Entra ID Governance: access reviews overview'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Microsoft Entra ID

In Microsoft Entra ID (formerly Azure Active Directory), access is decided at sign-in by Conditional Access policies. Each policy has two halves: who it includes and who it excludes. The include half is reviewed when the policy is written. The exclude half is usually a group, and group membership changes without any edit to the policy. The tenant's real policy is the written one minus everyone in its exclusion groups.

Two further populations sit outside the written policy by design.

**Workload identities.** Microsoft documents that Conditional Access for workload identities needs Workload Identities Premium, applies only to single-tenant service principals registered in the tenant, and does not cover managed identities or multitenant applications. For most non-human identities, proof has to come from credential and permission evidence.

**Agents.** Microsoft Entra Agent ID became generally available in April 2026. Conditional Access for agents requires a Microsoft Agent 365 licence and is not applied when security defaults are enabled. An "all users" policy does not include agents' user accounts, and access by API key bypasses Conditional Access entirely.

The vendor-neutral method is set out in [Identity Exposure Assurance](/identity-exposure-assurance). This page covers what is particular to Entra ID.

## What expires, and on whose calendar

Microsoft changes what an unchanged tenant does. Each date below ends the life of evidence gathered before it.

| Dated fact, as published by Microsoft | What it means for evidence |
|---|---|
| Mandatory MFA Phase 1, from October 2024, covers the Azure portal, Microsoft Entra admin center and Intune admin center | Enforced by Microsoft whatever the tenant's policy says |
| Phase 2, from 1 October 2025, covers Azure CLI, Azure PowerShell, infrastructure as code tools and the REST API control plane, for create, update and delete operations. Postponement was available only until 1 July 2026 | No postponement remains. A user account that runs automation satisfies MFA or fails |
| From 30 September 2025, authentication methods cannot be managed in the legacy MFA and SSPR policies | A method enabled in any policy stays usable until the migration state is Migration Complete |
| Azure AD Graph was fully retired after 31 August 2025. The MSOnline PowerShell module was retired on 30 May 2025 | Evidence collection built on either has stopped producing evidence |
| From 1 July 2026, all new tenants block device code flow as part of security defaults | The rule is for new tenants. An existing tenant has to establish its own position |

Mandatory MFA overrides the tenant. Microsoft states that enforcement applies to emergency access accounts, ignores Conditional Access user exclusions and has no opt-out. Workload identities are out of scope. User accounts used as service accounts are in scope.

A second kind of change leaves no date in the tenant's own history. In January 2026 Microsoft made generally available a change under which policies that target all resources, with resource exclusions, are enforced in sign-in flows that request only OpenID Connect or specific directory scopes. The policy text did not change. What it evaluates did.

## What must be continuously re-proven

**Exclusion membership, policy by policy.** Every member of every excluded group has an owner, a reason and an end date. Microsoft's guidance is to exclude emergency access accounts, through a dedicated group, from policies that block or restrict sign-in. That group is the most sensitive list in the tenant, and its membership is confirmed in every window.

**Standing directory roles.** Microsoft recommends that Global Administrator is assigned to fewer than five people and that privileged role assignments number fewer than 10. Privileged Identity Management (PIM) requires Microsoft Entra ID P2 or Microsoft Entra ID Governance, and its role settings allow permanent active assignments unless an expiry is configured. A licence does not shrink the count. The measure is the number of permanent active assignments. Enforcing Conditional Access policies such as MFA on every PIM activation has been generally available since April 2026, so reauthentication at activation can be checked role by role. The method is set out in [Privileged Access Assurance](/privileged-access-assurance).

**Guest lifecycle.** A guest invited for one piece of work keeps its group memberships and any role it was given. Microsoft names guests left in administrative roles as a target for access reviews. Reviews of inactive users require Microsoft Entra ID Governance, so a tenant without that licence has to establish guest dormancy from its own sign-in records.

**Application credentials.** Client secrets and certificates on application registrations authenticate identities that Conditional Access mostly does not evaluate. Each needs an owner, an expiry, a last-use date and a current reason for the permissions behind it. Credential handling is covered in [Secrets Exposure Assurance](/secrets-exposure-assurance).

**Agent identities.** Each agent identity has a sponsor who is still in role. Lifecycle Workflows for Agent ID sponsorship became generally available in May 2026 to prevent orphaned agents. Agents built before Agent ID still run as standard application registrations, for which Microsoft publishes migration guides, and no agent-scoped policy can see them. What an agent may do with its access is held in [AI Agent Assurance](/ai-agent-assurance).

## Common failure modes

- **The exclusion that mandatory MFA ignored.** A user account that runs a deployment was excluded from Conditional Access so that it would keep working. Microsoft's enforcement ignores the exclusion. Its guidance is to move user-based service accounts to workload identities.
- **The emergency account that cannot sign in.** Emergency access accounts are inside the scope of mandatory MFA. Microsoft recommends a passkey (FIDO2) or certificate-based authentication for them. An account that holds only a password fails at the moment it is needed.
- **The legacy policy that keeps a weaker method alive.** The authentication methods policy looks clean. A legacy policy still enables the weaker method.
- **Token Protection assumed to cover the browser.** Microsoft documents native enforcement for Exchange Online, SharePoint Online and Teams. For browser-based applications the control is in Preview and limited to selected web apps that access Azure Resource Manager.
- **Seven days of memory.** Microsoft Entra Backup and Recovery, generally available since June 2026, takes a daily backup of directory objects and Conditional Access policies and produces difference reports. The release note states seven-day retention with P1 or P2. Drift noticed later has no native baseline.
- **The evidence script that returns nothing.** A scheduled export written against Azure AD Graph or the MSOnline module returns nothing, and nothing is filed as no findings.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Changes to policies and role assignments go through the enterprise's own change process.

Corrections in a tenant are specific. An excluded account is traced to the dependency that needs the exclusion, the dependency is fixed and the account leaves the group. A permanent active assignment is converted to an eligible one with an expiry, or removed. An agent on a standard application registration is migrated to an agent identity with a named sponsor.

Closure is recorded by re-test in the tenant.

- **Removed exclusion.** The account is absent from the excluded group, and its next sign-in appears in the sign-in record with the policy applied.
- **Replaced service account.** The automation completes under the workload identity. The user account is disabled and a sign-in attempt with it is refused.
- **Legacy methods.** The migration state reads Migration Complete and an attempt with the removed method is rejected.
- **Emergency access.** A test sign-in succeeds with the phishing-resistant method, the alert reaches the intended person and the authorised list is confirmed. The result is dated and expires 90 days later.

A closed item reopens on recurrence, and on a dated Microsoft change: when Microsoft alters enforcement or evaluation, the controls it touches are re-tested even though nothing in the tenant was edited. The scenario is described in [Identity Access Drift](/identity-access-drift).
