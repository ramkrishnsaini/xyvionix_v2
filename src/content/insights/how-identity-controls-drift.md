---
title: How identity controls drift
h1: 'Identity controls drift by exception, and coverage is the measure that shows it'
seoTitle: 'How Identity Controls Drift: Measuring Coverage | Xyvionix'
description: >-
  Identity policy fails by accumulating exceptions, not by removal. The routes
  by which coverage shrinks under an unchanged policy, and the measures that
  show it.
summary: >-
  A control's reach is its scope less exclusions, untargetable identity types
  and unevaluated sign-in paths. Audits read the scope. Effective coverage,
  counted from evaluation records by identity type, shows the rest.
lede: >-
  Identity controls drift because exceptions are added by events and removed
  only by initiative, so the excluded population grows while the policy text
  stays the same. The reach of a control is its stated scope, less the
  identities excluded from it, the identity types it cannot target and the
  sign-in paths on which it is never evaluated. Policy counts measure intent.
  Effective coverage, counted from evaluation records and reported by identity
  type as a series, measures the control.
ogQuestion: 'What share of sign-ins does your identity policy actually evaluate?'
category: Cyber Exposure
author: Xyvionix Research
featured: false
cluster: cyber
secondary: []
parent: insights
state: degrading
audience:
  - CISO
  - Identity and Access Management
  - Security Engineering
  - Internal Audit
intent: >-
  Informational: how identity controls lose reach through exceptions while the
  policy stays unchanged, and which effective-coverage measures expose the loss
related:
  assurance:
    - identity-exposure-assurance
    - privileged-access-assurance
  useCases:
    - identity-access-drift
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - standing-privilege-evidence-gap
    - non-human-identity-exposure
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Verizon 2026 DBIR Executive Summary'
    url: 'https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf'
  - title: 'Microsoft Entra: manage emergency access accounts'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access'
  - title: 'Microsoft Entra: Conditional Access for workload identities'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity'
  - title: 'Microsoft Entra: security defaults'
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults'
  - title: 'AWS IAM: security best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
  - title: 'AWS IAM Access Analyzer: findings'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The policy that is never removed

Identity controls are rarely switched off. A policy that requires multifactor authentication, once approved, stays enabled for years and reads the same at every audit. What changes is how much of the estate it applies to.

The reach of a control is a subtraction. It is the stated scope, less the identities excluded from it, less the identity types it cannot target, less the sign-in paths on which it is never evaluated. A review of the policy reads the first term. Drift happens in the other three.

The position taken here is that the number of policies, and whether each is enabled, are measures of intent. The measure of the control is coverage: the share of identities and of sign-ins on which it was evaluated and applied. Coverage has to be counted from evaluation records, broken down by identity type, and kept as a series. A tenant that cannot produce that figure does not know what its policy does.

## Why exceptions only accumulate

An exclusion is granted at the speed of an incident. An integration fails a sign-in control, a service stops, and someone with authority adds the account to an excluded group. The benefit is immediate and visible, and it has a sponsor.

Removal has none of those properties. Nobody is harmed today by the exclusion staying in place. Removing it risks the outage it was created to end. The person who asked for it has moved to other work. The dependency that made it necessary is still there, and fixing it is a project.

The result is a ratchet. Additions are triggered by events. Removals depend on initiative. A stock with event-driven inflow and discretionary outflow grows, whatever the intentions of the people involved.

Published remediation data is consistent with this. The Verizon 2026 Data Breach Investigations Report executive summary, reporting on third-party cloud exposure, states that for weak passwords and permission misconfigurations the time to resolve 50% of findings was almost eight months. Identity conditions are slow to correct because each one is attached to something that works.

One kind of exclusion is designed, and it shows the form that the others lack. Microsoft's guidance on emergency access accounts recommends excluding them, through a dedicated group, from Conditional Access policies that block or restrict sign-in. The same guidance says the accounts should be validated at least every 90 days and that every sign-in should raise an alert. That is an exception with a stated purpose, a test interval and monitoring. Few other exclusions in a tenant have any of the three.

## Five routes, and what each one subtracts

Each route leaves something unchanged for a reviewer to read, and removes something the reviewer does not see.

| Route | What stays the same | What is subtracted | Where it becomes visible |
|---|---|---|---|
| Excluded groups grow, directly and through nesting | The policy text and its scope | Identities | Resolved membership of every excluded group, compared window to window |
| Identity types the control cannot target | The words "all users" | Whole classes of identity | Sign-ins counted by identity type against controls evaluated |
| Sign-in paths outside evaluation | The policy assignment | Paths such as stored keys and older protocols | Sign-in records counted by path |
| Defaults dated by creation | The vendor's announcement | Tenants and accounts created before the date | The setting read from each tenant |
| Guardrails read as permissions | The guardrail inventory | Nothing at the boundary, anything beneath it | Evaluated access for each principal |

The second route is documented by the vendor. Microsoft states that Conditional Access for workload identities requires Workload Identities Premium licences and applies only to single-tenant service principals registered in the tenant. Managed identities and multitenant applications are not covered, and policies assigned through groups are not enforced for service principals. A large part of the non-human population is therefore outside the control by construction. That population is the subject of [non-human identity exposure](/non-human-identity-exposure).

The fourth route follows from how vendors introduce stronger defaults. Microsoft states that from 1 July 2026 all new Microsoft Entra tenants block device code flow as part of security defaults. The statement is dated by tenant creation. An enterprise with tenants of different ages, including those that arrived through acquisition, cannot infer its position from the announcement. The setting has to be read from each tenant.

The fifth belongs to AWS estates. AWS describes service control policies and resource control policies as guardrails that grant no permissions. An inventory of guardrails states what cannot happen at the organisation boundary. It says nothing about what the principals inside that boundary have been granted, which is where drift occurs.

## Effective coverage: four measures

Four measures expose the routes. Each is a ratio with a stated denominator, because the denominator is where drift hides.

| Measure | Numerator | Denominator | What it exposes |
|---|---|---|---|
| Identity coverage | Identities in scope and not excluded, resolved through nested groups | Every identity able to sign in to the resource, by type | Excluded and untargetable populations |
| Evaluation coverage | Successful sign-ins on which the control was evaluated and applied | Every successful sign-in to the resource, by path | Paths the control never sees |
| Exception flow | Exclusions removed in the window | Exclusions added in the window | Whether the excluded stock is growing |
| Exception quality | Exclusions with a current owner, a reason and an expiry date | Every exclusion | Risk acceptance that nobody renewed |

Three rules govern their use.

**Report by identity type.** An average conceals the classes with no coverage at all. Employees, guests, workload identities, agents and emergency accounts are reported separately.

**Keep the series.** A single value shows the position. Consecutive values show the direction, and direction is what identifies a control in the Degrading state before any threshold is breached.

**Measure the measurement.** AWS documents three families of IAM Access Analyzer findings: external access, internal access and unused access. External access findings are free, and the other two are charged. An analyser enabled on some accounts reports nothing for the rest. Accounts and tenants outside the analysis are counted and reported as unexamined.

## An illustrative tenant

In this illustrative case, a tenant holds 9,000 employee accounts, 600 guests and 2,400 workload identities, all able to reach a finance application. One policy requires multifactor authentication for all users. It has been enabled for three years and has never been edited.

The excluded group lists 140 members. Resolved through nested groups, it contains 470 identities. Identity coverage for employees and guests is therefore 9,130 of 9,600, or 95%. That figure is the one usually reported.

Counted against every identity that can reach the application, in this illustrative case, coverage is 9,130 of 12,000, or 76%. For workload identities it is zero, because the policy cannot target them. In the last quarter 38 exclusions were added and 6 were removed. Of the 470 excluded identities, 52 have an owner, a reason and an expiry date on record.

Nothing in the policy history shows any of this. The control reads as it did on the day it was approved.

## What the measures cost

**Expiry dates create work and risk.** An exclusion that expires while the dependency behind it remains will stop a service. If renewals are then approved without examination, the expiry date has become a formality. The expiry is useful only when it is paired with a correction of the dependency, and the renewal count for each exclusion is itself a signal.

**Evaluation records have limits.** Counting sign-ins by path depends on log retention, on licensing and on the platform recording which control was evaluated. Where the records are short, the series has to be kept outside the platform.

**The denominator is the hard part.** Identity coverage requires a list of every identity that can reach the resource, including those no person created. Building that inventory is most of the effort, and the first count is usually lower than expected because the denominator grew.

**Zero exclusions is the wrong target.** Emergency access accounts are excluded deliberately. The target is that every exclusion has the form of that one: a purpose, an owner, a test and an end or review date.

## What this means for assurance

An identity control is evidence of intent on the day it was approved. Its reach expires as the population changes and as the platform changes beneath it, and neither event appears in the policy's history.

The threshold is a business decision made for each class of resource: the coverage below which the control is no longer relied on, by identity type. A falling series inside that threshold is Degrading. A breach is At risk. A tenant with no coverage figure is Unassured, however many policies it has enabled.

The continuing form of this proof is described in [Identity Exposure Assurance](/identity-exposure-assurance), and the situation in which the gap is first noticed in [Identity Access Drift](/identity-access-drift). Administrative roles drift by a related mechanism, examined in [standing privilege and the evidence gap](/standing-privilege-evidence-gap).

A policy review establishes that the rule exists. Only a coverage figure, with its denominator and its date, establishes what the rule reaches.
