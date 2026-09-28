---
title: Stale Privileged Access
h1: When administrative access outlives the work it was granted for
seoTitle: 'Stale Privileged Access: Find, Remove, Verify | Xyvionix'
description: >-
  What to establish when privileged assignments persist after the need has
  ended: which are still exercised, who owns each removal and what proves it
  held.
summary: >-
  Administrative grants have a start event and no end event. The position is
  recovered by measuring privileged use per assignment, giving every removal an
  owner, re-testing after removal and putting an end date on each new grant.
lede: >-
  Stale privileged access is the situation in which specific administrative
  assignments are still in force after the project, role or contract that
  justified them has ended. The state is At risk: the agreed limit on standing
  privilege has been breached, by count or by assignments that no one can
  justify today. The position is recovered by identifying each assignment from
  its use, assigning the removal to a named owner, proving the removal held and
  stopping the same access from accumulating again.
ogQuestion: Which administrators still need the access they hold?
cluster: cyber
secondary: []
parent: use-cases
state: risk
audience:
  - CISO
  - Identity Engineering
  - Internal Audit
intent: 'Problem: privileged assignments persist after the need has ended'
related:
  assurance:
    - privileged-access-assurance
    - identity-exposure-assurance
  useCases:
    - identity-access-drift
    - ai-agent-with-write-access
  technologies:
    - entra-id-exposure-assurance
    - aws-iam-exposure-assurance
  industries:
    - financial-services
    - insurance
  insights:
    - standing-privilege-evidence-gap
evidence:
  - name: Holder list resolved by path
    detail: >-
      Each identity that holds a privileged role today, with the path by which
      it holds it: direct assignment, group membership or inherited scope.
  - name: Last privileged use
    detail: >-
      For each assignment, the date the privileged permission was last
      exercised, taken from audit records. The date of the account's last
      sign-in is recorded separately and is not a substitute.
  - name: Need confirmation
    detail: >-
      A dated statement from a named sponsor of the task the assignment
      serves today. An assignment whose sponsor cannot be found is recorded
      as unjustified.
  - name: End-event matching
    detail: >-
      Role changes, departures, project closures and contract ends, each
      matched to the privileged assignments that should have ended with them.
  - name: Removal record
    detail: >-
      For each removal, the owner who approved it, the dependency check made
      beforehand, the date of removal and the result of the re-test.
  - name: Emergency account record
    detail: >-
      The age of each emergency credential, the date of the last validation
      and the list of people authorised to use the account, confirmed against
      current staff.
  - name: Grant inflow
    detail: >-
      New privileged assignments in each window, with the share that arrived
      with an end date already set.
thresholds:
  - signal: Holders of the highest-privilege role
    basis: The smallest set with which the business can operate and recover. Microsoft recommends fewer than five Global Administrators
    lostWhen: The count exceeds the agreed number
  - signal: Assignments with no privileged use
    basis: The period after which unused administrative permission has no business justification
    lostWhen: A standing assignment shows no privileged use across the agreed window and no sponsor has confirmed the need
  - signal: Time from end of need to removal
    basis: The exposure the business accepts between a role change, departure or project closure and the loss of access
    lostWhen: An assignment remains in force beyond the agreed window after its end event
  - signal: New assignments without an end date
    basis: Privilege is granted for a task, so each grant should carry the date the task is expected to finish
    lostWhen: A privileged assignment is created as permanent without a recorded decision by the role owner
  - signal: Age of emergency account validation
    basis: Microsoft's guidance of at least every 90 days and on a change of IT staff
    lostWhen: The credential, the alert or the authorised list has not been re-proven inside the agreed interval, or since the last staff change
  - signal: Return of removed access
    basis: The business expects a removal to hold until a new need is stated
    lostWhen: A removed assignment is granted again without a new justification and end date
faqs:
  - q: The administrator signs in every day. Does that show the assignment is in use?
    a: >-
      No. Sign-in shows that the account is active. It does not show that the
      administrative permission was exercised. An assignment is measured by
      the last privileged action taken under it, which for many standing
      administrators is months older than the last sign-in.
  - q: What if removing an assignment breaks something?
    a: >-
      That risk is why stale access persists, and it is handled by sequence.
      Dependencies are checked first, the assignment is reduced to an eligible
      or narrower one where the platform allows, and an observation period
      follows before removal is final. The alternative is to keep access that
      nobody can explain.
  - q: Privileged identity management is not licensed in every directory. Can this still be done?
    a: >-
      Yes. Microsoft states that Privileged Identity Management requires
      Microsoft Entra ID P2 or Microsoft Entra ID Governance. Without it there
      is no just-in-time activation, and the same evidence applies: who holds
      the role, when it was last used, who sponsors it and when it ends.
sources:
  - title: 'Microsoft Entra: best practices for roles'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices'
  - title: 'Microsoft Entra: configure role settings in Privileged Identity Management'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings'
  - title: 'Microsoft Entra: manage emergency access accounts'
    url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access'
  - title: 'Microsoft Entra: access reviews overview'
    url: 'https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview'
  - title: 'AWS IAM Access Analyzer findings'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html'
  - title: 'AWS IAM: security best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
  - title: 'CISA Zero Trust Maturity Model Version 2.0'
    url: 'https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf'
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

The need ended and the assignment did not. A migration finished. An engineer moved to another team. A supplier's contract closed. An incident was resolved, and the administrative role granted at two in the morning to resolve it is still in place.

None of these events is recorded as a change to privileged access, because none of them was one. The grant had a start event: a request, an approval, a ticket. Its end was an event in the business, and nothing connected the two.

The state is At risk. A threshold the business agreed has been breached. There are more holders of the highest-privilege role than the agreed number, or there are assignments that no one can justify today. Microsoft recommends that the Global Administrator role is assigned to fewer than five people, and the portal shows a warning when the recommended limits are exceeded. Many enterprises first see the situation through that warning, or through an audit sample that includes an administrator who changed role a year earlier.

## The business outcome at risk

The outcome is that administrative control of identity, cloud and data platforms rests only with people and systems that are doing administrative work now.

A stale assignment carries a particular risk because it is unused. The holder does not think of the account as an administrator account, so it is handled as an ordinary one. There is no pattern of normal privileged activity to compare against, so the first use after a long silence does not stand out from a baseline. And nobody will notice if the assignment changes, because nobody depends on it.

The second consequence is accountability. After an incident, every holder of a privileged role is a person whose actions have to be ruled out. Each stale assignment adds to that list without adding anyone who could have helped.

## What must be proven

Five things establish the position, one assignment at a time.

1. **Who holds privilege, by every path.** Direct assignments, membership of groups that hold roles, and scopes inherited from a parent are resolved to named identities.
2. **When the privilege was last exercised.** The measure is the last privileged action, not the last sign-in. An account can be used daily while its administrative role has not been touched in a year.
3. **Whether a need exists today.** A named sponsor states the current task. A need that existed at the time of the grant is not an answer.
4. **What depends on the assignment.** Scheduled jobs, integrations and recovery procedures that would fail on removal are found before the removal, not by it.
5. **That emergency accounts are judged differently.** They are unused by design, so their staleness is measured by the age of the credential, of the last validation and of the authorised list.

The continuing form of this proof is [Privileged Access Assurance](/privileged-access-assurance). This page concerns the backlog of assignments that already exist. Whether access across the whole workforce has moved away from policy is a different question, described in [Identity Access Drift](/identity-access-drift).

## What causes assurance to be lost

**Permanence is the default.** Microsoft documents that role settings in Privileged Identity Management allow permanent eligible and permanent active assignments unless an expiry is configured. Where nobody configured one, every grant is open-ended.

**The leaver process does not see movers.** Departure from the enterprise triggers removal. A move between teams does not, so the engineer keeps the old team's roles and gains the new team's.

**Guests are left in administrative roles.** Microsoft names guests left in admin roles, and too many users in privileged roles, as targets for access reviews. A supplier's administrator is outside the enterprise's own joiner and leaver records altogether.

**Usage data is missing where it is needed.** IAM Access Analyzer reports unused roles, unused access keys and passwords, and unused permissions within a specified usage window. AWS charges for unused access findings, while external access findings are free. Accounts left out of the analysis report nothing, and their stale roles stay invisible.

**Removal has no owner.** Everyone agrees the access looks unnecessary. Nobody is willing to be the person who removed it on the day the payroll integration stopped. Without a named owner, the safe choice for each individual is to leave it.

**Emergency credentials age in storage.** Microsoft's guidance is to validate emergency access accounts at least every 90 days and when IT staff change. A credential that has not been rotated since the people who knew it left is access held by former employees.

**The clean-up ends and granting continues.** A project removes stale assignments and closes. Grants resume the next morning at the same rate, with the same defaults.

## Corrective action

Under assurance, Xyvionix owns the correction through to completion within the access it has been granted. The removals themselves are made or approved by the enterprise's own role owners, through its change and identity governance processes.

Identification is by use. Assignments are ranked by the time since the privilege was last exercised and by the reach of the role, so that the widest unused access is dealt with first.

Each removal is given an owner and a sequence. Dependencies are checked. Where the platform supports it, a standing assignment is first reduced to an eligible or narrower one, which leaves a route back if a real need appears. After an observation period with no activation, the assignment is removed. A person who turns out to need the access states the task and receives a grant with an end date.

Emergency accounts are corrected in one change: the credential is rotated, the sign-in and its alert are tested, and the authorised list is confirmed person by person.

Re-accumulation is prevented at the point of grant. Every new privileged assignment carries an end date and a sponsor, and mover events are connected to the assignment register. The CISA Zero Trust Maturity Model Version 2.0 describes its Initial stage of access management as access "that expires with automated review". Expiry is the first step beyond permanent access, and it is the step that stops a clean-up from having to be repeated. Agents and pipelines that hold administrative tools are corrected in the same way, as described in [AI Agent With Write Access](/ai-agent-with-write-access).

## What verified closure looks like

An individual removal is closed when the assignment is absent by every path, an attempt to use the role is refused and logged, and the observation period has passed with no dependent process failing.

The situation is closed on three further results. The count of standing holders is inside the agreed number and has stayed there across consecutive windows. Every assignment created since the correction has an end date and a sponsor. No removed assignment has returned without a new justification. If one has, the record reopens against the original removal, which shows whether the need was real or the habit was.

## What to do next

Take the highest-privilege role in one directory or one cloud organisation and list its holders, including those who hold it through a group.

Against each name write two dates from the audit log: the last sign-in, and the last action that required the role. AWS recommends using last-used information for the same purpose on access keys and roles. Then ask each holder's manager one question: what task does this person perform today that needs this role.

Holders with no privileged action in the period examined, and no answer to the question, are the first removals. The list also gives the count to compare with the limit the business would choose if it were setting one today.
