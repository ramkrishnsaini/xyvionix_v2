---
title: AWS IAM Exposure Assurance
h1: Prove that AWS access is still least privilege across keys, roles, trust and guardrails
seoTitle: 'AWS IAM Exposure Assurance: Keys, Roles, Trust | Xyvionix'
description: >-
  What has to be re-proven in AWS IAM: long-lived access keys, unused roles and
  permissions, cross-account trust, root credentials and organisation policy
  coverage.
summary: >-
  In AWS very little access expires by itself. Access keys, roles, trust
  policies and guardrail attachments persist until someone removes them, so
  each is held against a threshold and closed by a refused request, not a
  deleted line.
lede: >-
  AWS IAM exposure assurance is the continuing proof that access in an AWS
  organisation is still the least the business needs. Access in AWS is the
  evaluated result of many policy documents and trust relationships, and almost
  none of them carries an end date. The proof is therefore measured from use:
  which keys, roles and permissions are exercised, which principals each role
  trusts, which accounts the guardrails reach and whether root credentials
  exist where they should not.
ogQuestion: Is access in your AWS accounts still least privilege?
platform: AWS Identity and Access Management (IAM)
group: identity
cluster: cyber
secondary: []
parent: technologies
state: assured
audience:
  - CISO
  - Cloud Security
  - Internal Audit
intent: 'Technology + problem: proving AWS identity and access remains least-privilege'
related:
  assurance:
    - identity-exposure-assurance
    - privileged-access-assurance
    - secrets-exposure-assurance
    - cloud-security-exposure-assurance
  useCases:
    - identity-access-drift
    - stale-privileged-access
  technologies:
    - aws-production-reliability
    - aws-bedrock-assurance
    - entra-id-exposure-assurance
  industries:
    - software-technology
    - financial-services
  insights:
    - non-human-identity-exposure
    - how-identity-controls-drift
evidence:
  - name: Access key inventory
    detail: >-
      Every IAM user access key in every account, with its owner, its consumer,
      its age, its last-used date and the recorded reason it has not been
      replaced by a role.
  - name: Role and permission usage record
    detail: >-
      For each role, the permissions granted compared with the permissions
      exercised over the agreed usage window, and the date the role was last
      assumed.
  - name: Trust policy register
    detail: >-
      Every role whose trust policy admits a principal in another account, an
      identity provider or a partner, with the owner of the relationship, its
      end date and the conditions that narrow the trust.
  - name: Root credential status
    detail: >-
      For each account, whether root credentials exist, whether any root access
      key exists, which mailbox and recovery mechanisms control the root user,
      and every recorded root sign-in.
  - name: Organisation policy attachment map
    detail: >-
      Each service control policy and resource control policy with the
      organisational units and accounts it is attached to, and the accounts it
      does not reach.
  - name: Access analysis coverage record
    detail: >-
      Which accounts have external access, internal access and unused access
      analysis running, the usage window configured, and the findings raised
      and resolved in each window.
  - name: Policy validation and deployed state comparison
    detail: >-
      The validation result for each policy before deployment, compared with
      the policy attached in the account after deployment.
thresholds:
  - signal: IAM user access keys without a current exception
    basis: AWS guidance that people use federation with temporary credentials and workloads use roles, which makes each long-term key an exception
    lostWhen: An active key has no owner or recorded reason, or stays unused beyond the agreed window
  - signal: Roles and permissions unused inside the usage window
    basis: The longest legitimate interval between uses of the workload, including annual and recovery tasks
    lostWhen: A role or permission that is unused across the window is still present after the agreed review period
  - signal: Trust policies that admit external principals
    basis: Each external relationship has a named owner and an end date set by its contract or project
    lostWhen: A trust policy admits a principal whose relationship has ended, or admits more principals than the relationship requires
  - signal: Root credentials and root access keys
    basis: AWS guidance to remove root credentials from member accounts and not to create access keys for the root user
    lostWhen: Any member account holds root credentials, any root access key exists, or a root sign-in has no matching approval
  - signal: Accounts outside guardrail and analysis coverage
    basis: The business requires every account to be subject to organisation policy and to access analysis
    lostWhen: An account is not reached by the intended service control and resource control policies, or has no analysis running
faqs:
  - q: Service control policies block the dangerous actions. Why is that not proof of least privilege?
    a: >-
      AWS states that service control policies and resource control policies
      are guardrails that grant no permissions. They set an outer limit. What
      a principal can do inside that limit is decided by the policies attached
      to it and to the resources it reaches, so least privilege is proven from
      evaluated and exercised access, not from the guardrail.
  - q: IAM Access Analyzer shows no findings. Is the account clean?
    a: >-
      Only for the analysis that is running. External access findings are
      free. Unused access and internal access findings are charged, so they
      are often enabled for some accounts and not others. No findings from an
      account that was never analysed is absence of data.
  - q: Everyone signs in through IAM Identity Center. Do access keys still matter?
    a: >-
      Yes. Federation for people does not remove the keys issued earlier to
      IAM users, pipelines and third-party tools. Each remains valid until it
      is deactivated or deleted, which is why the inventory is built from the
      accounts and not from the identity provider.
sources:
  - title: 'AWS IAM: security best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
  - title: 'AWS IAM: root user best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html'
  - title: 'AWS: IAM enforces MFA for root users across all account types'
    url: 'https://aws.amazon.com/about-aws/whats-new/2025/06/aws-iam-mfa-root-users-across-all-account-types/'
  - title: 'AWS IAM Access Analyzer: findings'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html'
  - title: 'Google Cloud Threat Horizons Report H1 2026'
    url: 'https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on AWS IAM

In AWS no single object states who can do what. A request is allowed or denied by evaluating several policy documents together: the policies attached to the identity, the policies attached to the resource, any permissions boundary, and the service control policies (SCPs) and resource control policies (RCPs) set by the organisation. Least privilege is a property of the evaluated result. It cannot be read from any one document.

AWS is explicit about one consequence. SCPs and RCPs are guardrails that grant no permissions. A guardrail shows what can never be allowed. It says nothing about what is allowed beneath it.

The second part of the problem is trust. A role is not signed in to. It is assumed, and its trust policy names who may assume it: a principal in another account, an identity provider, a supplier's account. The trust is written when the relationship starts. Nothing removes it when the relationship ends.

The third is the long-term credential. AWS recommends that human users reach AWS through federation with temporary credentials, and that workloads use IAM roles. Every IAM user access key is therefore an exception, and an exception needs a recorded reason.

The vendor-neutral method is set out in [Identity Exposure Assurance](/identity-exposure-assurance). This page covers what is particular to AWS.

## What expires, and on whose calendar

Very little in IAM expires by itself, and that is the difficulty. An access key, a role, a trust policy and a policy attachment all persist until someone removes them. The calendar has to be the enterprise's own.

| Fact, as published | What it means for evidence |
|---|---|
| AWS recommends using IAM access last used information to update and remove access keys | A key has no end date of its own. Last use is the only native signal that it is no longer needed |
| IAM Access Analyzer reports unused roles, unused access keys and passwords, and unused permissions within a specified usage window | Unused is relative to a window that someone chose. A shorter window than the workload's real cycle produces false findings, a longer one hides stale access |
| External access findings are free. Unused access and internal access findings are charged | Coverage is a cost decision, so coverage has to be evidenced account by account |
| On 17 June 2025 AWS announced that IAM enforces MFA for root users across all account types, including member accounts | Root MFA is settled by the platform. The open question is whether member accounts hold root credentials at all |
The cost of a missing calendar is documented. The Google Cloud Threat Horizons Report H1 2026 describes a case in which the actor used AWS access keys suspected to have been exposed in an incident in 2022. The keys had outlived the incident that exposed them.

## What must be continuously re-proven

**Every long-lived access key has a reason.** AWS names the cases where long-term credentials remain legitimate: workloads that cannot use IAM roles, third-party clients, AWS CodeCommit and Amazon Keyspaces. A key outside those cases is a candidate for replacement. A key inside them still needs an owner, an age and a last-used date. How the key is stored and rotated is held in [Secrets Exposure Assurance](/secrets-exposure-assurance).

**Granted access matches exercised access.** Roles and permissions are compared with use across a window that fits the workload. IAM Access Analyzer can generate a policy from CloudTrail activity, which gives a measured basis for narrowing a broad policy.

**Each trust relationship still exists.** Every trust policy that admits an external account, an identity provider or a workload outside AWS is matched to a living relationship with an owner. AWS offers IAM Roles Anywhere, `AssumeRoleWithWebIdentity` and `AssumeRoleWithSAML` for workloads outside AWS. Each removes a stored key and adds a trust condition that has to be as narrow as the key was.

**Root is governed, account by account.** AWS advice for the root user is specific: do not use it for everyday tasks, do not create access keys for it, use a group email address, restrict account recovery mechanisms, and monitor access and usage. In an organisation, AWS recommends removing root credentials from member accounts. The method for privileged identities is set out in [Privileged Access Assurance](/privileged-access-assurance).

**Guardrails reach every account.** Each SCP and RCP is mapped to the organisational units and accounts it is attached to. A statement about a data perimeter names the accounts and services it covers. Permissions boundaries are checked wherever teams are allowed to create roles, because AWS provides them to cap what a delegated role can be given.

**Analysis is running where it is assumed to be.** For each account, the record shows which of the three finding types is enabled: external access, internal access and unused access.

## Common failure modes

- **The key that outlived its workload.** The application was retired. Its IAM user and access key were not. The key still authenticates.
- **The role a former supplier can still assume.** The contract ended and the supplier's account remains in the trust policy. The access is cross-account, so it appears in no review of the enterprise's own users.
- **The guardrail read as proof.** An SCP denies a set of actions and the account is reported as least privilege. Everything beneath the guardrail is unexamined.
- **The account outside the organisational unit.** A new account is created, or an existing one is moved, and the policies attached to the intended unit do not reach it.
- **No analyser, no findings.** Unused access analysis was never enabled for a group of accounts because it is charged. The empty findings list is read as a clean result.
- **Validated before deployment, changed after.** IAM Access Analyzer policy validation provides more than 100 policy checks and the policy passed them. A later change in the console altered what is attached. The validation proved intent. It did not prove state.
- **Delegated role creation with no boundary.** A team is permitted to create roles for its own workloads, and no permissions boundary limits what those roles can hold.
- **The root mailbox that belongs to one person.** The root user's email address is an individual's. That person's mailbox is now a route to the account.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted. Changes to policies, roles and organisation settings go through the enterprise's own change process and its infrastructure definitions, so that the next deployment does not restore what was removed.

Corrections follow the dependency. A key is replaced by a role before it is deactivated, and deactivated before it is deleted, so that a missed consumer shows itself while the change can still be reversed. A broad policy is narrowed to the permissions the workload exercised across its full cycle. A trust policy is reduced to the principals the relationship requires, or the role is removed.

Closure is recorded by a refused request.

- **Access key.** The key is deleted, a call signed with it is refused, and the workload runs on role credentials.
- **Unused permission.** The permission is absent from the evaluated policy, the workload completes its cycle, and a call that needs the removed permission is denied and logged in CloudTrail.
- **Trust.** An attempt to assume the role from the removed principal is denied, and the external access finding does not return on the next analysis.
- **Root.** The member account shows no root credentials and no root access key.
- **Guardrail coverage.** A denied action is attempted in the newly covered account and is refused.

The observation is repeated after the next deployment from the infrastructure definition. If the condition returns, the item reopens against the same record. The wider cloud posture is held in [Cloud Security Exposure Assurance](/cloud-security-exposure-assurance).
