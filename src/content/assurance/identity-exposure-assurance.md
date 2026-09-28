---
title: Identity Exposure Assurance
h1: Prove that identity controls enforce the access your policy describes
seoTitle: 'Identity Exposure Assurance: Policy vs Enforcement | Xyvionix'
description: >-
  Continuing proof that identity policy is enforced as written, across
  exclusions, dormant accounts, guests, authentication strength and non-human
  identities.
summary: >-
  Identity policy decays through exclusions, guests, dormant accounts and
  application grants. Assurance measures what each control reaches in practice,
  how strong each sign-in is and who owns every identity that is not a person.
lede: >-
  Identity exposure assurance is the continuing proof that the access an
  enterprise's identity policy describes is the access its systems enforce. It
  measures effective coverage, not the presence of a policy: which identities
  each control reaches, which are excluded, which are dormant, how strongly each
  one authenticates and who is accountable for every identity that is not a
  person. The proof is re-gathered as people, applications and platform
  behaviour change.
ogQuestion: Do access controls still enforce what policy says?
kind: child
cluster: cyber
secondary: []
parent: cyber-exposure-assurance
state: assured
audience:
  - CISO
  - Identity Engineering
  - Technology Risk
intent: >-
  Commercial: continuing proof that identity controls enforce the intended
  access
related:
  assurance:
    - privileged-access-assurance
    - secrets-exposure-assurance
    - cloud-security-exposure-assurance
  useCases:
    - identity-access-drift
    - stale-privileged-access
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - how-identity-controls-drift
    - non-human-identity-exposure
evidence:
  - name: Identity inventory by type
    detail: >-
      Every workforce, guest, service, workload and agent identity, with its
      type, its source of record and its accountable owner. Identities that
      appear in a system but not in the inventory are recorded as gaps.
  - name: Effective enforcement coverage
    detail: >-
      For each control, the identities and sign-in paths it is evaluated
      against in practice, taken from sign-in and policy evaluation records
      and not from the policy definition.
  - name: Exclusion register
    detail: >-
      Every exclusion from an identity control, with its members, owner, reason
      and expiry date, compared against the previous window to show growth.
  - name: Last-use record
    detail: >-
      The date each identity and each credential was last used, so that
      dormancy is measured and not estimated.
  - name: Authentication method record
    detail: >-
      The methods each identity has registered and can still use, including
      weaker methods left in place after a stronger one was added.
  - name: Application grant register
    detail: >-
      Permissions granted or consented to applications, with who granted them,
      what they allow and when each was last exercised.
  - name: Revocation test results
    detail: >-
      Timed tests showing how long a disabled identity retains access on
      sampled resources, retained per resource type.
thresholds:
  - signal: Identities and sign-in paths outside enforcement coverage
    basis: The access routes the business requires to be subject to policy, including non-interactive ones
    lostWhen: An in-scope identity or sign-in path is evaluated by no control, or is excluded without an unexpired exception
  - signal: Exclusion growth
    basis: Each exclusion is a time-limited decision with a named owner
    lostWhen: Exclusion membership grows across consecutive windows, or any exclusion has no owner or no expiry
  - signal: Dormant identity age
    basis: The period after which unused access has no business justification, agreed per identity type
    lostWhen: An enabled identity or credential stays unused beyond the agreed window
  - signal: Weakest usable authentication method
    basis: The assurance level required by the data and actions the identity can reach
    lostWhen: An identity with access to in-scope systems can still sign in with a method below the agreed level
  - signal: Non-human identities with an accountable owner
    basis: The business requires every acting identity to have a named person answerable for it
    lostWhen: A non-human identity has no owner, or its owner has left the role
  - signal: Time to effective revocation
    basis: How long the business can tolerate a disabled identity keeping its access
    lostWhen: A sampled revocation takes longer than the agreed window to remove access on any in-scope resource
faqs:
  - q: Access reviews are completed every quarter. Why is that not sufficient evidence?
    a: >-
      A completed review is an attestation about one day. Access granted the
      following week is unreviewed until the next cycle. Between reviews the
      only valid evidence is a continuing comparison of current access against
      the last attested baseline, which is what assurance holds.
  - q: Does moving workloads to federated identity remove the exposure?
    a: >-
      It removes the stored credential, which is a real gain. It moves the
      exposure to the trust policy. A federation trust with broad conditions
      behaves like a shared credential, so trust conditions are reviewed and
      re-tested in the same way as secrets.
  - q: Are AI agents in scope?
    a: >-
      Yes, as a type of non-human identity. An agent needs its own identity, an
      owner and a record of what it can reach. What the agent is permitted to
      do with that access is covered by AI Agent Assurance.
sources:
  - title: 'Verizon 2026 DBIR Executive Summary'
    url: 'https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf'
  - title: 'Microsoft Digital Defense Report 2025'
    url: 'https://blogs.microsoft.com/on-the-issues/2025/10/16/mddr-2025/'
  - title: 'Google Cloud Threat Horizons Report H1 2026'
    url: 'https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026'
  - title: 'Palo Alto Networks: 2026 Identity Security Landscape'
    url: 'https://www.paloaltonetworks.com/idira/idira-identity-security-landscape'
  - title: 'OWASP Non-Human Identities Top 10 (2025)'
    url: 'https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/'
  - title: 'Kubernetes documentation: service accounts'
    url: 'https://kubernetes.io/docs/concepts/security/service-accounts/'
  - title: 'CISA Zero Trust Maturity Model Version 2.0'
    url: 'https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf'
  - title: 'NIST SP 800-63-4 Digital Identity Guidelines'
    url: 'https://csrc.nist.gov/pubs/sp/800/63/4/final'
  - title: 'NIST SP 800-63B-4: authentication assurance levels'
    url: 'https://pages.nist.gov/800-63-4/sp800-63b/aal/'
  - title: 'Microsoft Entra: continuous access evaluation'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation'
  - title: 'AWS IAM: security best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
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

An identity policy is written once and evaluated against a population that changes every day. The document stays the same. What it reaches does not.

**Exclusions accumulate.** An account is excluded from a control so that a migration, a device problem or an integration can proceed. The exclusion has a reason on the day it is made. It rarely has an end date. Over time the excluded group becomes a second, weaker policy that nobody designed.

**Identities go dormant and stay enabled.** Contractors finish, projects end and guests invited for one piece of work keep their access to the workspace. Each dormant identity is a credential that nobody is watching, because nobody is using it.

**Application grants are forgotten.** Consent given to an application is a standing grant. It does not appear in a review of people, and it continues to work after the person who approved it has left.

**Weaker methods persist.** A stronger sign-in method is rolled out and the older one is left registered. The identity is as strong as the weakest method it can still use, not the strongest one it has.

**Non-human identities have no leaver process.** Service identities, workload identities and agents are created by a project and outlive it. There is no resignation to trigger their removal.

**The platform changes under the policy.** Identity vendors alter enforcement behaviour, defaults and the scope of existing policy types. A policy that was tested when written may evaluate differently now, with no edit in its history.

## What is at stake

Identity is where the attempts are concentrated. The Microsoft Digital Defense Report 2025 states that "more than 97% of identity attacks are password attacks" and that identity-based attacks rose by 32% in the first half of 2025.

Identity findings also stay open for longer than most. The Verizon 2026 Data Breach Investigations Report executive summary, looking at third-party cloud exposure, states that "only 23% of third-party organizations fully remediated missing or improperly secured multifactor authentication (MFA)" on cloud accounts. For weak passwords and permission misconfigurations, the time to resolve half of the findings was almost eight months.

The business consequence is access by someone who should not have it, to customer records, payment systems or source code, through an account the enterprise believed was controlled. The second consequence arrives later. When an auditor or an investigator asks who could reach a system on a given date, the enterprise has a policy document and a review signed some months earlier, and neither answers the question.

## What Xyvionix assures

Xyvionix holds six statements about the identity estate as current facts, each tested against a threshold agreed with the business.

1. **Every identity is known and owned.** Each one has a type, a source of record and a named owner who is still in role.
2. **Policy reaches what it is meant to reach.** Coverage is measured from evaluation records. An identity type or sign-in path that no control evaluates is reported as a gap, even where the policy list looks complete.
3. **Exclusions are bounded.** Each has an owner, a reason and an expiry. Growth from one window to the next is visible.
4. **Unused access is removed.** Dormancy is measured from last use, for identities, credentials and application grants alike.
5. **Authentication is as strong as the access requires.** The measure is the weakest method an identity can still use.
6. **Revocation takes effect.** Disabling an identity removes its access within the window the business has agreed, on the resources that matter.

Administrative roles and elevation are assured separately in [Privileged Access Assurance](/privileged-access-assurance). The credentials that identities hold, and where those credentials end up, are covered by [Secrets Exposure Assurance](/secrets-exposure-assurance).

## Common failure modes

- **A person's account doing machine work.** A pipeline or integration runs as a named user. It is excluded from sign-in controls so that it keeps working. The OWASP Non-Human Identities Top 10 lists the reverse pattern as well, human use of a non-human identity, and both defeat attribution.
- **The exclusion group as a permanent home.** Accounts added for a temporary reason are never removed, and new accounts are added because the group is known to make problems go away.
- **A policy for all users that is not for all identities.** The control is scoped to people. Workload identities, service identities and agents sign in by other routes and are evaluated by nothing.
- **The session that outlives the account.** The account is disabled and its existing tokens remain valid until they expire. Where the resource does not re-evaluate, the token lifetime is the exposure window.
- **Legacy tokens that never expire.** Kubernetes has issued short-lived, audience-bound service account tokens since v1.22. Earlier versions used long-lived tokens stored as Secrets, and those that still exist are non-expiring credentials.
- **Federation trust that is too broad.** The Google Cloud Threat Horizons Report H1 2026 describes an actor moving from a developer's local environment to full cloud administration in under 72 hours by abusing OpenID Connect trust between a CI/CD provider and a cloud platform. No stored secret was needed.
- **Improper offboarding.** OWASP places it first in its list for non-human identities. The project closes, the identity and its permissions remain.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change and identity governance processes.

The corrections are specific. An exclusion without an owner is traced to the account that needs it, the underlying reason is fixed and the exclusion is removed. A dormant identity is disabled after its dependencies have been checked, and deleted after an agreed holding period. A person's account that runs a pipeline is replaced by a workload identity with only the permissions the pipeline uses. A weaker sign-in method is removed from the identities that no longer need it.

Some corrections need a decision from the business: a supplier integration that cannot support stronger authentication, or a guest population that a business unit wants to keep. The decision is recorded with its owner and an expiry date, and it returns for renewal. It does not become a silent addition to the exclusion list.

## Verified closure

A correction is closed when a re-test shows the condition is gone.

For a removed exclusion, closure means the identity is absent from the excluded set and its next sign-in is recorded as evaluated by the control. For a dormant identity, closure means an authentication attempt is refused and no dependent process has failed during the observation period. For a removed sign-in method, closure means an attempt with that method is rejected. For a revocation threshold, closure means a timed test on the resources in scope shows access ending inside the agreed window.

For ownership, closure is a confirmation by the named owner, not an entry made on their behalf. The re-test is repeated after the next provisioning cycle, because directory synchronisation and automated onboarding are the usual routes by which a corrected condition returns.

## Technology and industry context

The standards describe identity as something evaluated continuously. The CISA Zero Trust Maturity Model Version 2.0 sets its optimal stage for authentication as one that "continuously validates identity with phishing-resistant MFA, not just when access is initially granted". NIST SP 800-63B-4, final in July 2025 and written for United States federal systems, requires verifiers to offer at least one phishing-resistant option at AAL2. Both give a defensible basis for a threshold.

The scale of the non-human population is reported differently by every source. The Palo Alto Networks 2026 Identity Security Landscape, a vendor survey of more than 2,900 cybersecurity decision-makers, puts machine identities at 109:1 against human identities. That is a survey figure, and each enterprise has to count its own estate.

Platforms differ in where the gaps are. Microsoft documents that continuous access evaluation enforces revocation in near real time for the services that support it, with access tokens otherwise valid for one hour by default. AWS recommends that human users reach AWS through federation with temporary credentials, which makes every long-lived access key an exception that needs a recorded reason. Platform detail is covered in [Microsoft Entra ID Exposure Assurance](/entra-id-exposure-assurance) and [AWS IAM Exposure Assurance](/aws-iam-exposure-assurance). The scenario most enterprises recognise first is described in [Identity Access Drift](/identity-access-drift).
