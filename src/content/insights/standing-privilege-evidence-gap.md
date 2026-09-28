---
title: Standing privilege and the evidence gap
h1: 'Access reviews prove that privilege exists. Usage evidence shows whether it is needed'
seoTitle: 'Standing Privilege: Attestation vs Usage Evidence | Xyvionix'
description: >-
  An access review records that nobody objected to an assignment. Usage records
  show whether it was exercised. A privilege model that produces the second
  kind.
summary: >-
  Attestation certifies that privilege exists and that a reviewer confirmed it.
  Usage evidence shows whether it was exercised. Eligibility, time-bound
  elevation and recorded justification produce usage evidence as a by-product.
lede: >-
  An access review certifies that a privileged assignment exists and that a
  reviewer did not object to it. It does not show that the privilege is needed,
  because the reviewer is asked for an opinion and is rarely given the record
  of use. Usage evidence answers the question directly: what was exercised, by
  whom, for which task and for how long. A privilege model built on
  eligibility, time-bound elevation and recorded justification produces that
  evidence each time privilege is used, provided the model is measured.
ogQuestion: 'Which of your administrators used their privilege last quarter?'
category: Cyber Exposure
author: Xyvionix Research
featured: false
cluster: cyber
secondary: []
parent: insights
state: risk
audience:
  - CISO
  - Identity and Access Management
  - Internal Audit
  - Technology Risk
intent: >-
  Informational: why attestation does not prove that privilege is needed, how
  usage evidence differs, and what a privilege model based on eligibility,
  elevation and justification has to measure
related:
  assurance:
    - privileged-access-assurance
    - identity-exposure-assurance
  useCases:
    - stale-privileged-access
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - insurance
  insights:
    - how-identity-controls-drift
    - ai-agent-permission-risk
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Microsoft Entra: what are access reviews'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview'
  - title: 'Microsoft Entra: what is Privileged Identity Management'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure'
  - title: 'Microsoft Entra: configure role settings in Privileged Identity Management'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings'
  - title: 'Microsoft Entra: what is new'
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/whats-new'
  - title: 'Microsoft Entra: best practices for roles'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices'
  - title: 'Microsoft Entra: manage emergency access accounts'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access'
  - title: 'CISA Zero Trust Maturity Model Version 2.0'
    url: 'https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf'
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

## What a review certifies

An access review puts a list of assignments in front of a reviewer and asks for a decision on each. The reviewer is usually a manager or a role owner. The list shows a name and a role. It seldom shows when the role was last exercised, or for what.

The two possible answers carry unequal costs for the person giving them. Confirming an assignment has no consequence that day. Removing one may stop a task the reviewer did not know about, and the reviewer will be the person who stopped it. With no usage record to go on, confirmation is the rational choice.

What the completed review certifies is therefore narrow. It shows that the assignment existed on the review date and that a named person did not object to it. It is evidence of existence and of attention. It is not evidence of need.

This matters because the review is the evidence most enterprises offer when asked whether privilege is minimal. The CISA Zero Trust Maturity Model Version 2.0 describes "permanent access with periodic review" as the Traditional stage of access management, the lowest of its four. The position taken here is that the weakness of that model lies in the kind of evidence it produces, and that a different privilege model produces a better kind.

## Attestation and usage compared

Attestation is a statement made by a person about an assignment. Usage evidence is a record made by the platform about an action. They differ on every dimension that an auditor or a risk committee relies on.

| Dimension | Attestation evidence | Usage evidence |
|---|---|---|
| What it records | A reviewer's decision to keep or remove | A privileged action, its actor, time and target |
| Who produces it | A person, on request | The platform, as the action occurs |
| Period covered | The review date | Every day in the retention period |
| Question it answers | Did anyone object to this assignment | Was this privilege exercised, and for what |
| How it fails | Everything is confirmed | Actions are not logged, or logs are not retained |
| When it expires | At the next grant, which it did not examine | When the holder's task changes |
| What can be re-tested | That the review took place | That the recorded action matches a recorded need |

The period covered is the sharpest difference. Microsoft documents that access reviews can recur weekly, monthly, quarterly or annually. Whichever interval is chosen, the review describes one date in it. Usage evidence describes the interval.

Attestation still has a place. Usage records cannot say whether a task that was performed should have been performed by that person. That judgement belongs to someone who knows the work. The order matters: the usage record comes first, and the reviewer decides with it in hand.

## A model that produces usage evidence

Standing privilege produces no evidence when it is used. The holder signs in and acts, and the privileged action is one entry among ordinary ones. A model built on three elements changes that, because each element leaves a record at the moment of use.

**Eligibility.** The holder may request the role and does not hold it. The record is the list of who is eligible, with a start and an end date for each.

**Time-bound elevation.** The role is activated for a period and lapses at the end of it. The record is the activation: who, which role, when and for how long.

**Recorded justification.** Each activation states the task and, where approval is required, names the approver. The record ties the privilege to a piece of work that can be checked against a change or incident record.

Microsoft Entra Privileged Identity Management is one implementation. Microsoft describes it as providing time-based and approval-based role activation, with time-bound assignments, approval, justification and a downloadable audit history. The release notes for April 2026 record general availability of enforcing Conditional Access policies, such as multifactor authentication, on every activation. On AWS the usage side is served by what the IAM documentation calls access last used information, which AWS recommends using to update and remove access keys.

The tooling does not settle the matter. Microsoft documents that activation duration can be set from one to 24 hours, and that role settings allow permanent eligible and permanent active assignments unless an expiry is configured. A tenant can adopt the model and keep standing privilege inside it.

## Measuring the model, not its adoption

The count of eligible assignments shows that the model was adopted. Six measures show whether it is operating.

| Measure | How it is calculated | What a poor value means |
|---|---|---|
| Standing ratio | Permanent active assignments as a share of all privileged assignments | The model covers part of the estate |
| Elevated time share | Hours a holder was elevated as a share of hours in the period | Eligibility in name, standing access in practice |
| Use after activation | Activations followed by at least one privileged action | Activation has become a habit |
| Eligibility dormancy | Eligible assignments with no activation in the period | Privilege that exists and is not needed |
| Approver independence | Approvals given by someone outside the requester's own group | Approval confirms nothing |
| Justification traceability | Justifications that match a change or incident record | The reason cannot be checked |

Eligibility dormancy is the measure with no equivalent under attestation. An eligible assignment that is never activated is proof, produced by the platform, that the privilege was not needed in that period. The reviewer who receives that figure is no longer being asked for an opinion.

Thresholds for each measure are set by the business, by role. A role that can change identity policy warrants a tighter standing ratio than one that can restart a service.

## An illustrative quarter

In this illustrative case, a directory holds 60 privileged assignments: 22 permanent active and 38 eligible. The quarterly review confirmed all 60.

Usage evidence for the same quarter reads differently. Of the 22 permanent holders, 9 performed a privileged action and 13 performed none. Of the 38 eligible holders, 14 never activated. Five activated on almost every working day for the longest duration the settings allowed. The remaining 19 activated occasionally, with a justification that matched a change record.

The review reported 60 justified assignments. The usage record, in this illustrative case, supports 28: the 9 permanent holders who acted and the 19 who elevated for stated work. It identifies 27 assignments as unused and 5 as standing access under another label. Both documents describe the same directory on the same dates.

## Where the model costs something

**Elevation adds delay when delay is expensive.** During an incident, an activation that waits for an approver who is asleep will be followed by a request for standing access. The design has to anticipate this. Roles used in incident response can activate on justification alone and be examined afterwards, with approval reserved for the roles that can change identity policy or logging.

**Rare work looks like no work.** A privilege used once a year, for a certificate renewal or a recovery exercise, is dormant in any quarterly window. The usage window has to be longer than the longest legitimate cycle for the role, or the assignment has to carry its cycle on the record. Eligibility suits rare work well, since it holds nothing open between uses.

**Some standing privilege is deliberate.** Microsoft's guidance is that emergency access accounts hold the Global Administrator role as a permanent active assignment. These accounts are unused by design, so usage evidence cannot apply. Their evidence is a test: the same guidance calls for validation at least every 90 days and an alert on every sign-in. The standing ratio therefore has a floor above zero, and each assignment at the floor is evidenced by test.

**The evidence depends on licences and logs.** Microsoft states that Privileged Identity Management requires Microsoft Entra ID P2 or Microsoft Entra ID Governance, and that reviews of inactive users need Microsoft Entra ID Governance. A tenant without them has to derive usage from audit records. In every case the measures are only as complete as the platform's logging of privileged actions and the period for which the logs are kept.

**Justification can decay into a formula.** When the same sentence appears in every activation, the field is being filled in, not used. Traceability to a change or incident record is the test, and it requires those records to be reachable from the identity platform's data.

## What this means for assurance

Evidence that privilege is minimal expires quickly. An attestation describes its own date and is out of date at the next grant. A usage record stays valid until the holder's work changes. Neither is permanent, and both need a stated life.

Under the vocabulary of assurance, a role whose only evidence is a signed review is Unassured between reviews: the condition is unknown. A role whose measures sit inside the thresholds the business set is Assured. One whose elevated time share or dormancy is rising is Degrading, and the series shows it before an audit does.

The outcomes held under assurance are set out in [Privileged Access Assurance](/privileged-access-assurance). The backlog of assignments that outlived their purpose is the subject of [Stale Privileged Access](/stale-privileged-access). The way sign-in controls lose reach by a similar mechanism is traced in [how identity controls drift](/how-identity-controls-drift).

A review asks a person whether privilege should remain. A usage record shows whether it was exercised. An enterprise that can produce only the first is reporting what its reviewers believed on the day they were asked.
