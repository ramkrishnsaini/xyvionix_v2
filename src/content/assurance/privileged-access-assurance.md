---
title: Privileged Access Assurance
h1: Prove that every privileged assignment is still justified today
seoTitle: 'Privileged Access Assurance: Standing Privilege | Xyvionix'
description: >-
  Continuing proof that privileged access is minimal, time-bound and reviewed:
  standing assignments, elevation records, emergency accounts and review
  quality.
summary: >-
  Privilege accumulates and is rarely removed. Assurance measures standing
  against eligible assignment, how elevation is used in practice, whether
  emergency accounts work and are watched, and whether reviews still decide
  anything.
lede: >-
  Privileged access assurance is the continuing proof that administrative
  access is held by the fewest identities that need it, for the shortest time
  the work requires, under a review that still makes real decisions. It
  measures standing privilege, the way elevation is used in practice, whether
  emergency accounts work and are watched, and what privileged non-human
  identities are able to do. A periodic access review is one input to that
  proof. It is not the proof.
ogQuestion: Is every standing privilege still justified today?
kind: child
cluster: cyber
secondary: []
parent: cyber-exposure-assurance
state: assured
audience:
  - CISO
  - Identity Engineering
  - Internal Audit
intent: >-
  Commercial: continuing proof that privileged access is minimal, time-bound and
  reviewed
related:
  assurance:
    - identity-exposure-assurance
    - secrets-exposure-assurance
    - ai-agent-assurance
  useCases:
    - stale-privileged-access
    - identity-access-drift
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - insurance
  insights:
    - standing-privilege-evidence-gap
evidence:
  - name: Privileged assignment register
    detail: >-
      Every assignment of a privileged role, standing or eligible, with its
      holder, scope, justification and grant date. Assignments that arrive
      through group membership are resolved to the people who hold them.
  - name: Baseline comparison
    detail: >-
      A continuing comparison of current privileged assignments against the
      last attested baseline, so that a grant made after a review is visible
      before the next one.
  - name: Elevation record
    detail: >-
      Each activation with its requester, approver, stated justification,
      duration and the actions taken while elevated.
  - name: Emergency account test record
    detail: >-
      Dated results of three tests taken together: the account can sign in, the
      sign-in alert reaches its recipient, and the list of people authorised
      to use the account is current.
  - name: Review decision record
    detail: >-
      For each review, the reviewer, the decisions made, the proportion that
      removed access and the time taken per decision.
  - name: Privileged non-human identity register
    detail: >-
      Each service, workload or agent identity holding administrative
      permission, with its owner, the permissions granted, the permissions
      exercised and the age of its credentials.
  - name: Recovery path record
    detail: >-
      The recovery mechanisms attached to the highest-privilege accounts, such
      as recovery mailboxes and telephone numbers, and who controls each.
thresholds:
  - signal: Standing privileged assignments
    basis: The smallest set of permanent administrators with which the business can still operate and recover
    lostWhen: The count exceeds the agreed number, or any standing assignment has no current justification
  - signal: Elevation frequency and duration
    basis: Elevation is granted for a task, so its pattern should follow the work
    lostWhen: An identity activates the same role for the maximum duration on most working days
  - signal: Approver independence
    basis: The separation the business requires between the person who asks and the person who decides
    lostWhen: Approvals circulate within a small group, or a requester is able to approve their own elevation
  - signal: Age of emergency account validation
    basis: The interval in the platform vendor's guidance, which Microsoft states as at least every 90 days, and the recovery the business depends on
    lostWhen: Sign-in, alerting and the authorised list have not all been re-proven inside the agreed interval
  - signal: Review decision quality
    basis: A review is evidence only if it is able to result in removal
    lostWhen: Reviews complete with no removals and decision times that indicate approval in bulk
  - signal: Unused administrative permission on non-human identities
    basis: The smallest permission set with which the workload still runs
    lostWhen: Administrative permission that is never exercised persists beyond the agreed window
faqs:
  - q: A privileged access management product is already in place. What does assurance add?
    a: >-
      The product provides the mechanism. Assurance measures whether the
      mechanism is used as intended: how many assignments remain permanent,
      how elevation is activated, who approves and whether the emergency path
      works. A licensed control that most administrators bypass through a
      standing assignment is a common finding.
  - q: Does just-in-time access remove standing privilege?
    a: >-
      Only if activation follows the work. An eligible role activated every
      morning for the longest permitted period is permanent access with an
      extra step. Assurance measures frequency, duration and approver
      independence, not the count of eligible assignments.
  - q: How often should emergency access accounts be tested?
    a: >-
      Microsoft's guidance for Microsoft Entra ID is to validate them at least
      every 90 days and when IT staff change. Whatever interval is agreed, the
      test has three parts that are proven together: the sign-in, the alert
      and the list of authorised people.
sources:
  - title: 'CISA Zero Trust Maturity Model Version 2.0'
    url: 'https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf'
  - title: 'NIST SP 800-207 Zero Trust Architecture'
    url: 'https://csrc.nist.gov/pubs/sp/800/207/final'
  - title: 'NIST SP 800-63B-4: authentication assurance levels'
    url: 'https://pages.nist.gov/800-63-4/sp800-63b/aal/'
  - title: 'OWASP Non-Human Identities Top 10 (2025)'
    url: 'https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/'
  - title: 'Microsoft Entra: manage emergency access accounts'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access'
  - title: 'AWS IAM: root user best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html'
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

Privilege is added under pressure and removed at leisure. An outage, a migration or a deadline produces an administrative grant within the hour. Nothing produces its removal. The evidence that privilege is minimal therefore starts to expire as soon as it is gathered.

**Eligibility becomes standing access.** Just-in-time elevation replaces permanent assignment on paper. In practice some roles are activated at the start of every working day for the longest period the settings allow. The assignment is listed as eligible. The access is continuous.

**Review evidence decays from the day it is signed.** A review confirms the assignments that existed when it ran. A grant made the following week is outside it until the next cycle, which may be three months away.

**Reviewers stop deciding.** A reviewer faced with a long list and no usage data approves everything. The review is recorded as complete. It removed nothing and could not have.

**Emergency accounts are left alone.** They are created, stored and not touched, which is the intention. It also means nobody knows whether the credential still works, whether the alert still reaches anyone, or whether the people authorised to use it still work for the enterprise.

**Privilege arrives indirectly.** A person is added to a group that is a member of another group that holds an administrative role. The role's assignment list does not show the person.

**Automation is given administrator rights to make it work.** A pipeline fails on a permission error, the identity is made an owner, and the pipeline passes. The grant is never narrowed.

## What is at stake

A privileged identity sets the ceiling on loss. It can create other identities, change policy, alter logging and grant itself further access, so its compromise removes the controls that would otherwise contain the damage. Every standing assignment is that ceiling held open permanently, whether or not the holder is doing administrative work.

The model most enterprises still operate is the one the standards treat as a starting point. The CISA Zero Trust Maturity Model Version 2.0 describes its Traditional stage of access management as "permanent access with periodic review". Its Optimal stage uses automation to authorise just-in-time and just-enough access tailored to individual actions and resource needs. The distance between the two is the exposure.

For internal audit the consequence is practical. A sample of privileged users taken on the audit date shows who held access that day. It does not show who held it in between, who approved each elevation or whether the emergency account would have opened. Without continuing evidence those questions are answered by reconstruction, and reconstruction is what turns an observation into a finding.

## What Xyvionix assures

Xyvionix holds five statements about privileged access as current facts, tested against thresholds agreed with the business.

1. **Standing privilege is minimal and justified.** Every permanent assignment has a holder, a reason and a date on which the reason was last confirmed. Indirect assignments through groups are counted.
2. **Elevation follows the work.** Activations are tied to a stated task, last as long as the task and are approved by someone independent of the requester.
3. **Emergency access works and is watched.** The account opens, its use raises an alert that reaches a person, and the authorised list is current.
4. **Reviews decide.** Each review has the usage data a decision needs, and its outcomes show that removal is a real possibility.
5. **Privileged non-human identities are owned and narrow.** Each has an accountable person and holds only the administrative permission it exercises.

This page covers administrative access. The wider question of whether sign-in policy reaches every identity is covered by [Identity Exposure Assurance](/identity-exposure-assurance). Agents that hold privileged tools are covered by [AI Agent Assurance](/ai-agent-assurance).

## Common failure modes

- **The daily activation.** The same person activates the same role each morning for the maximum duration. The record shows hundreds of compliant elevations and one permanent administrator.
- **The approval circle.** Four administrators approve each other's requests. Every activation has an approver and none has an independent one.
- **The emergency account that does not open.** The credential was rotated, the hardware key is in a drawer nobody can find, or a later policy blocks the sign-in. This is discovered during the emergency.
- **The emergency account that opens silently.** The sign-in works and the alert goes to a mailbox belonging to someone who left.
- **The administrator by inheritance.** Privilege is held through nested group membership and appears in no review of role assignments.
- **The review with no removals.** Several cycles complete with every assignment confirmed, in a time per decision that rules out consideration.
- **The over-privileged pipeline.** A deployment identity holds owner rights across the estate and uses a small part of them. The OWASP Non-Human Identities Top 10 lists this as NHI5, Overprivileged NHI.
- **The recovery path as a side door.** The highest-privilege account can be recovered through one person's mailbox or telephone number, which makes that person a standing administrator nobody listed.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change and identity governance processes. Changes to privileged assignments are made or approved by the enterprise's own role owners.

The corrections are specific. A standing assignment without a current reason is converted to an eligible one, or removed. A role that is activated daily is examined for the task behind it, and the task is given a narrower role. An approval circle is broken by moving approval to someone outside the requesting group. An emergency account that fails its test is repaired and re-tested in the same change. A pipeline identity is reduced to the permissions its recent runs exercised.

Where the business decides to keep a standing assignment, the decision is recorded with its owner and an expiry date and is counted against the threshold.

## Verified closure

A correction is closed when a re-test shows the condition is gone and the work that depended on the access still gets done.

For a removed standing assignment, closure means the assignment is absent from the live configuration by every path, including groups. It also means the person can still elevate to complete the task, and an attempt to use the role without elevation is refused and logged. For an emergency account, closure means a test sign-in succeeds, the alert reaches the intended recipient and each person on the authorised list has confirmed they hold that responsibility. For a pipeline identity, closure means the permission is gone, the next scheduled run completes and an attempt to use the removed permission is refused.

Review quality closes differently, because it is a behaviour. It closes when the following cycle shows decisions made with usage data and a removal rate that is consistent with the dormancy measured in the estate.

## Technology and industry context

The standards treat standing access as the exception. NIST SP 800-207, published in August 2020 and still current, describes authentication and authorisation as discrete functions performed before a session is established, with no implicit trust granted on the basis of network location. NIST SP 800-63B-4, final in July 2025 and written for United States federal systems, states that the overall reauthentication timeout should be no more than 24 hours at AAL2 and the inactivity timeout no more than one hour, and that AAL3 requires a non-exportable private key and phishing resistance. These give a defensible basis for the age of a privileged session.

Platform vendors publish their own boundaries. Microsoft's guidance is to validate emergency access accounts at least every 90 days. AWS advises against creating access keys for the root user and recommends removing root credentials from member accounts in an organisation. The mechanisms and the gaps differ by platform and are covered in [Microsoft Entra ID Exposure Assurance](/entra-id-exposure-assurance) and [AWS IAM Exposure Assurance](/aws-iam-exposure-assurance).

In financial services and insurance, privileged access to systems of record is a standing subject for internal audit. The useful evidence is evidence of operation across the period, not a sample taken on the day. The scenario is described in [Stale Privileged Access](/stale-privileged-access).
