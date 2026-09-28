---
title: Identity Access Drift
h1: When the access people hold is no longer the access policy intended
seoTitle: 'Identity Access Drift: Effective vs Intended | Xyvionix'
description: >-
  What to establish when effective access has moved away from intended policy:
  the size of the gap, the routes that widen it and the evidence that closes it.
summary: >-
  Policy text stays the same while nesting, exclusions, guests and consents
  widen what identities can reach. The position is recovered by measuring
  effective against intended access, by route, as a series.
lede: >-
  Identity access drift is the situation in which the access identities hold in
  practice has moved away from the access the policy describes, with no edit to
  the policy itself. The state is Degrading: no threshold has been breached,
  and the gap between intended and effective access grows in each measurement
  window. The position is recovered by stating intended access in a testable
  form, resolving effective access through every route, and correcting the
  routes that add to the gap.
ogQuestion: Has effective access drifted away from your policy?
cluster: cyber
secondary: []
parent: use-cases
state: degrading
audience:
  - CISO
  - Identity Engineering
  - Internal Audit
intent: 'Problem: effective access has moved away from intended policy'
related:
  assurance:
    - identity-exposure-assurance
    - privileged-access-assurance
    - secrets-exposure-assurance
  useCases:
    - stale-privileged-access
    - cloud-configuration-drift
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - healthcare
  insights:
    - how-identity-controls-drift
evidence:
  - name: Intended access statement
    detail: >-
      Each relied-upon control written as a testable statement: the identity
      types, sign-in paths and resources it is meant to cover, with the owner
      who approved that scope.
  - name: Effective access resolution
    detail: >-
      For the same scope, the identities that can reach each resource today,
      resolved through direct assignment, nested groups, exclusions, guest
      invitations and application consents.
  - name: Gap register by route
    detail: >-
      Every difference between intended and effective access, with the route
      that produced it, the date it first appeared and the person accountable
      for it.
  - name: Exception register
    detail: >-
      Each accepted difference with its reason, its owner and its expiry date.
      An exception with no expiry is listed as part of the gap.
  - name: Gap series
    detail: >-
      The size of the gap in each measurement window, with access added and
      access removed shown separately, so that direction and rate are visible.
  - name: Platform change record
    detail: >-
      Vendor changes to enforcement behaviour, defaults and policy scope, each
      with the date it took effect and the date the affected controls were
      re-tested.
  - name: Retained configuration history
    detail: >-
      Snapshots of groups, policies and grants kept for longer than the
      platform's own retention, so that the date a difference appeared can be
      established.
thresholds:
  - signal: Difference between effective and intended access
    basis: The amount of unintended access the business accepts on the systems in scope
    lostWhen: The gap exceeds the agreed size, or grows across the agreed number of consecutive windows
  - signal: Exceptions without an owner or an expiry
    basis: Each departure from policy is a time-limited decision made by a named person
    lostWhen: Any exception on an in-scope control has no owner, no expiry, or an expiry that has passed
  - signal: Access held through indirect routes
    basis: The business requires that access can be traced to a decision someone made
    lostWhen: Access to an in-scope system arrives through nesting or consent that no review examines
  - signal: Identity types outside any policy statement
    basis: Every kind of identity able to reach in-scope systems is meant to be covered by a stated control
    lostWhen: Guests, workload identities or agents are found reaching in-scope systems under no intended access statement
  - signal: Age of the effective access measurement
    basis: The rate at which joiners, movers, grants and platform behaviour change
    lostWhen: The last resolution is older than the agreed interval, or predates a vendor enforcement change
faqs:
  - q: No policy has been edited. How can access have drifted?
    a: >-
      A policy is evaluated against groups, exclusions and identity types that
      change every day, on a platform whose enforcement behaviour also changes.
      Membership, nesting, consent and vendor releases all alter what the
      policy reaches. None of them appears in the policy's edit history.
  - q: Does drift always mean access has become too wide?
    a: >-
      No. Platform enforcement can also apply where tenant policy made an
      exception, which breaks accounts that relied on the exception. Both
      directions are a difference between intended and effective access, and
      both are found by the same measurement.
  - q: How is this different from an access review?
    a: >-
      A review asks an owner to confirm a list of assignments on one day. Drift
      measurement resolves what each identity can reach through every route,
      compares it with the intended position and tracks the difference over
      time. A review is one input to it.
sources:
  - title: 'Microsoft Entra: what is new'
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/whats-new'
  - title: 'Microsoft Entra: mandatory multifactor authentication for Azure'
    url: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication'
  - title: 'Microsoft Entra: manage authentication methods'
    url: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage'
  - title: 'Microsoft Entra: Conditional Access for agent identities'
    url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id'
  - title: 'Microsoft Entra: access reviews overview'
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

## What changed

No policy was edited. The Conditional Access policies, role definitions and group structures read as they did when they were approved. What changed is the population they are evaluated against, and the platform that evaluates them.

A project added one group to another. A supplier's staff were invited as guests. An integration failed a sign-in control and was excluded from it. An application was given consent to read mailboxes. Each event was small and was approved by someone. Each moved effective access a little further from the access the policy describes.

The state is Degrading. No threshold has been breached and no incident has occurred. The evidence is moving in one direction: the difference between intended and effective access is larger in each measurement window than in the one before. The trend usually becomes visible through a prompt from outside, such as an audit request for who could reach a system on a given date, or a vendor enforcement change that breaks accounts nobody knew were exempt.

## The business outcome at risk

The outcome is that access to customer data, financial systems and source code is limited to the people and systems the business decided should have it. Drift does not remove that outcome at once. It erodes the margin by which it holds.

Three consequences follow if the trend continues. The first is unintended access: an identity reaches a system through a route no one reviewed. The second is a question the enterprise cannot answer. When an auditor asks who could reach a system and under which control, the policy document gives the intended answer and nothing gives the effective one. The third is cost. A gap that has grown for a quarter is a contained task. One that has grown for years means untangling dependencies that nobody remembers creating.

## What must be proven

Four things establish the position.

1. **Intended access is stated in a form that can be tested.** "All users require multifactor authentication" is a sentence. A testable statement names the identity types, the sign-in paths and the resources it covers.
2. **Effective access is resolved through every route.** Direct assignment, nested group membership, exclusion from a control, guest invitation and application consent are each followed to the identity at the end.
3. **The difference is attributed.** Every item of unintended access has a route, a date on which it first appeared and an owner.
4. **The direction is known.** The gap is measured as a series, so that growth is visible together with the route producing it.

The continuing form of this proof is described in [Identity Exposure Assurance](/identity-exposure-assurance). Administrative roles are a narrower case with their own evidence, held under [Privileged Access Assurance](/privileged-access-assurance) and described as a situation in [Stale Privileged Access](/stale-privileged-access).

## What causes assurance to be lost

In this situation the loss arrives through routes that leave the policy text untouched. Several of them belong to the platform, not to the enterprise.

**The platform changes what a policy does.** Microsoft's release notes for January 2026 record a change in Conditional Access behaviour. Policies that target all resources and carry resource exclusions are now enforced in sign-in flows that request only OpenID Connect or specific directory scopes. The policy is the same. Its effect differs from the effect that was tested.

**Enforcement and policy disagree.** Microsoft enforces multifactor authentication for Azure management itself. Its documentation states that the enforcement applies to emergency access accounts, ignores Conditional Access user exclusions, and covers user accounts that are used as service accounts. An account that tenant policy excludes is still challenged by the platform. An automation running as a person's account stops, and the change that restores it is rarely checked against intended access.

**A weaker method survives in an older policy.** Microsoft states that since 30 September 2025 authentication methods can no longer be managed in the legacy multifactor and password reset policies. A method enabled in any policy remains usable until the migration is marked complete. The current policy reads as clean while the method still works.

**A new kind of identity arrives outside the policy.** Microsoft documents that Conditional Access policies scoped to all users do not include agents' user accounts, and that access by API key bypasses Conditional Access entirely. As agents are added, "all users" describes a smaller share of the identities that act.

**Review evidence has a gap by design.** Access reviews in Microsoft Entra can recur weekly, monthly, quarterly or annually. Whatever interval is chosen, a grant made after one cycle is unexamined until the next.

**Native change records are short.** Microsoft Entra Backup and Recovery, generally available since June 2026, produces difference reports across users, groups, applications and Conditional Access policies. The release note states seven-day retention with P1 or P2 licences. A gap that took six months to form cannot be dated from a seven-day record.

## Corrective action

Under assurance, Xyvionix owns the reduction through to completion within the access it has been granted. Changes are made through the enterprise's identity governance process, by the owners of the groups, applications and policies concerned.

The work is ordered by route, not by identity. The route that adds the most unintended access in each window is corrected first. Removing individual grants while the route stays open restores the gap within a cycle. A nesting that carries access to the wrong population is flattened. A provisioning rule that places every joiner in a broad group is narrowed. An exclusion is traced to the dependency that required it, and the dependency is fixed so that the exclusion can end.

Each exception that remains is given an owner, a reason and an expiry date. Where the business decides that a difference is acceptable, the intended position is changed to match, by a named person. That is a legitimate result. Drift is sometimes evidence that the policy was wrong.

Credentials issued to applications and workloads along these routes are handled under [Secrets Exposure Assurance](/secrets-exposure-assurance), because removing a grant does not revoke a credential that was already issued under it.

## What verified closure looks like

The situation is closed when the gap is inside the agreed size and has stopped growing, and both are shown by measurement.

For each corrected route, effective access is resolved again after the change. The identities that should have lost access are shown to have lost it: the next sign-in is evaluated by the control, or an attempt to reach the resource is refused and logged. The processes that depended on the old access still run.

Two further results separate closure from a clean-up. The measurement is repeated after the next provisioning and synchronisation cycle, because automated onboarding is the usual route by which removed access returns. The series then shows the gap flat or falling across consecutive windows, with new exceptions arriving with an expiry date already set. A clean-up lowers the figure once. Closure changes its direction.

## What to do next

One exercise needs no new tooling. Choose a single control the business relies on, such as the requirement for multifactor authentication on every sign-in. Write down, in one paragraph, who it is intended to cover.

Then export the members of every group excluded from that control, resolved through nested groups to individual identities. For each identity record three things: why it is excluded, who owns that decision and when the decision ends. Count the entries in which any of the three is blank. If an earlier export exists, compare the totals.

The blank entries are the size of the unowned gap, and the comparison is its direction. Together they show which route to examine first. Platform detail is in [Microsoft Entra ID Exposure Assurance](/entra-id-exposure-assurance).
