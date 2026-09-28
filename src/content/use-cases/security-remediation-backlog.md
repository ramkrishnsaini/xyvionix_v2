---
title: Security Remediation Backlog
h1: When open security findings outnumber the capacity to fix them
seoTitle: 'Security Remediation Backlog: Reduce and Own | Xyvionix'
description: >-
  What to establish when open findings exceed remediation capacity: which are
  reachable, exploited and consequential, who owns each and what happens to the
  rest.
summary: >-
  A backlog is a breached threshold that has stopped being reported as one. The
  position is recovered by reducing the list to reachable, exploited and
  consequential exposure, naming an owner for each item and governing the rest.
lede: >-
  A security remediation backlog is the situation in which findings arrive
  faster than they can be corrected, so that agreed remediation windows are
  missed as a matter of routine. The state is At risk: the threshold has been
  breached for long enough that the breach is treated as normal. The position
  is recovered by reducing the list to the exposure that is reachable,
  exploited and consequential, giving each of those items an owner and a
  window, and recording a decision for everything else.
ogQuestion: Which open findings actually put the business at risk?
cluster: cyber
secondary: []
parent: use-cases
state: risk
audience:
  - CISO
  - Vulnerability Management
  - VP Engineering
intent: 'Problem: open findings exceed remediation capacity and age past agreed windows'
related:
  assurance:
    - vulnerability-remediation-assurance
    - cloud-security-exposure-assurance
  useCases:
    - unverified-vulnerability-closure
    - cloud-configuration-drift
  technologies:
    - eks-reliability-assurance
    - aws-iam-exposure-assurance
  industries:
    - healthcare
    - software-technology
  insights:
    - security-findings-vs-verified-closure
evidence:
  - name: Deduplicated finding register
    detail: >-
      Open findings from every detection source, merged so that one condition
      on one running asset appears once, with the earliest date it was
      detected by any source.
  - name: Reachability status
    detail: >-
      For each finding, whether the asset can be reached from the internet or
      from another network segment, with the date that status was last
      established. Unknown is recorded as unknown.
  - name: Exploitation status
    detail: >-
      Whether exploitation of the condition has been observed, including
      presence in the CISA Known Exploited Vulnerabilities catalogue, with the
      date of the last check.
  - name: Consequence mapping
    detail: >-
      The business process each affected asset serves and the data it can
      reach, confirmed by the owner of that process.
  - name: Owner assignment
    detail: >-
      For each item in the prioritised set, a named person with authority to
      change the asset, the window that applies and the date it ends.
  - name: Disposition record
    detail: >-
      For every finding outside the prioritised set, the recorded decision:
      corrected at the next upgrade, accepted with an expiry date, or awaiting
      replacement of unsupported software.
  - name: Inflow and closure series
    detail: >-
      New findings and verified closures per window for the prioritised set,
      so that the direction of the backlog is measured.
thresholds:
  - signal: Prioritised findings open beyond their window
    basis: Evidence of exploitation, reachability of the asset and the importance of the process it serves
    lostWhen: A reachable, exploited and consequential finding passes its window without an approved, unexpired exception
  - signal: Prioritised findings without a named owner
    basis: Correction needs a person with authority to change the asset
    lostWhen: Any item in the prioritised set is assigned to a queue, a team name or a person who has left the role
  - signal: Closure rate against inflow
    basis: The capacity the business has committed to remediation and the rate at which new exposure arrives
    lostWhen: Verified closures fall below new prioritised findings across the agreed number of consecutive windows
  - signal: Findings with unknown reachability or consequence
    basis: Priority cannot be set on inputs that do not exist
    lostWhen: The share of open findings with an unknown input exceeds the agreed limit
  - signal: Exceptions without an expiry
    basis: Risk acceptance is a time-limited decision made by a named owner
    lostWhen: Findings leave the backlog through an exception, exemption or suppression that has no owner or no end date
faqs:
  - q: Should the target be an empty backlog?
    a: >-
      No. The target is that nothing reachable, exploited and consequential is
      open beyond its window, and that every other finding has a recorded
      decision. A count of zero is neither achievable at current disclosure
      rates nor a measure of exposure.
  - q: Is reducing the list a way of hiding findings?
    a: >-
      It would be if the remainder were dropped. Every finding outside the
      prioritised set keeps its record, its detection date and a disposition,
      and is ranked again when its reachability or exploitation status
      changes. The reduction decides order. It deletes nothing.
  - q: Would more remediation capacity solve the problem?
    a: >-
      Only for a while. Where the same condition returns with each build, or
      arrives with each new resource, added capacity is consumed by repeat
      work. Correcting the image, template or pipeline that produces the
      findings lowers inflow, which is the side of the equation that capacity
      cannot reach.
sources:
  - title: 'NIST updates NVD operations to address record CVE growth'
    url: 'https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth'
  - title: 'CISA BOD 26-04: Prioritizing Security Updates Based on Risk'
    url: 'https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk'
  - title: 'Verizon 2026 DBIR Executive Summary'
    url: 'https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf'
  - title: 'GitGuardian: The State of Secrets Sprawl 2026'
    url: 'https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/'
  - title: 'Kubernetes: Ingress NGINX retirement'
    url: 'https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/'
  - title: 'Azure Policy: exemption structure'
    url: 'https://learn.microsoft.com/en-us/azure/governance/policy/concepts/exemption-structure'
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

At some point the number of findings arriving each month passed the number being corrected, and it has not come back. The remediation windows in the policy are the same. They are missed so regularly that a missed window is no longer raised as an exception. The monthly report shows the total, the total is larger than last month, and the meeting moves on.

The inflow is not under the enterprise's control. NIST stated in April 2026 that CVE submissions rose 263% between 2020 and 2025, and that it enriched nearly 42,000 CVEs in 2025, 45% more than in any prior year. Over the same period most enterprises added detection sources for cloud configuration, containers, code and secrets. Each one opened a further queue.

The state is At risk. A backlog is a threshold breach that has been normalised. The breach is real whether or not anyone still reports it.

## The business outcome at risk

The outcome is that the exposures able to damage the business are corrected before they are used. A backlog puts that at risk through order, not through volume.

Remediation capacity is finite, and in a backlog it is spent in the order findings arrive, or in the order of a severity label. The finding that matters most, a known-exploited condition on a reachable asset that serves a critical process, waits in the same list as thousands that cannot be reached at all. Nothing in the list distinguishes them.

The second consequence is that the figure reported upward has no meaning. A count of open findings rises when a scanner is added and falls when resources are exempted. It does not tell the board whether exposure is larger or smaller than last quarter.

The third is the effect on the people doing the work. A window that is breached on the day a finding is raised is not a target. Teams stop treating any window as binding, including the ones that matter.

## What must be proven

Six things turn a list into a position.

1. **How many distinct conditions exist.** Findings are merged across sources and bound to running assets. One vulnerable image reported once per replica by three tools is one condition.
2. **Which are reachable.** Whether the asset can be reached, and from where, with the date that was last established.
3. **Which are exploited.** Whether exploitation has been observed, including presence in the CISA Known Exploited Vulnerabilities catalogue.
4. **Which are consequential.** What process the asset serves and what data it can reach, confirmed by the owner of that process.
5. **Who owns each item that meets all three tests.** A named person and a window with an end date.
6. **What has been decided about the rest.** A recorded disposition for every finding outside the prioritised set.

A public model shows that the sixth item is legitimate. In CISA Binding Operational Directive 26-04, issued on 10 June 2026 for United States federal civilian agencies, a vulnerability that is not publicly exposed, not in the catalogue and not automatable is assigned the outcome "fix on system upgrade". The directive binds only those agencies. Its method is general: deferral is a decision with stated conditions, and the decision changes when the conditions do.

## What causes assurance to be lost

**Windows are written for labels.** The policy gives every critical finding the same short window. The scanner produces more criticals than the team could correct in that time under any staffing. The window is breached on arrival and stops functioning as a threshold.

**Inputs are missing.** Reachability was never recorded, or was recorded once. Without it every finding has to be treated as reachable, which is the same as having no priority.

**Some findings have no patch.** Identity and configuration findings are corrected by a decision about access, not by an update. The Verizon 2026 Data Breach Investigations Report executive summary, looking at third-party cloud exposure, states that for weak passwords and permission misconfigurations the time to resolve 50% of findings was almost eight months. These items sit because no one with authority over the access has been asked to decide.

**Some findings will never have a fix.** The Kubernetes project stated that after March 2026 there would be no further releases, bug fixes or security updates for Ingress NGINX. A finding against retired software waits for a patch that is not coming. The correction is replacement, and it belongs in a plan with a date.

**Detection is counted as the end.** GitGuardian's State of Secrets Sprawl 2026 reports that of credentials confirmed valid in 2022, 64% were still valid in January 2026. A leaked credential that was found and never revoked is a backlog item that has been open for years.

**The backlog shrinks by exemption.** Microsoft documents that Azure Policy exemptions have an optional expiration and that exempt resources count toward overall compliance. A list can be shortened in an afternoon without one exposure being removed.

## Corrective action

Under assurance, Xyvionix owns the correction through to completion within the access it has been granted, and uses the enterprise's own change process where production is affected.

The first action is the reduction. The three tests are applied to the deduplicated list, and the missing inputs are gathered for the findings that cannot yet be tested. Reachability is held under [Cloud Security Exposure Assurance](/cloud-security-exposure-assurance), because it has a shorter life than the windows it informs.

The second is ownership. Each item in the prioritised set is assigned to a person with authority over the asset, with a window agreed for its class.

The third is to correct at the source. Where many findings trace to one base image, one template or one chart, that artefact is corrected and the assets are rebuilt from it. One change closes the group and stops it returning.

The fourth is disposition of the remainder. Findings that are unreachable and unexploited are scheduled with the next upgrade of the asset. Findings that the business accepts are recorded as exceptions with an owner, a reason and an expiry. Unsupported software is entered in a replacement plan. Each finding keeps its original detection date, and is ranked again when an input changes.

Windows and the definition of closure for individual findings are those set out in [Vulnerability Remediation Assurance](/vulnerability-remediation-assurance).

## What verified closure looks like

The backlog situation is not closed by a lower total. It is closed when four statements are true and have stayed true across consecutive windows.

No prioritised finding is open beyond its window without an unexpired exception. Every prioritised finding has a named owner who is still in role. Verified closures of prioritised findings keep pace with new ones. Every finding outside the prioritised set has a disposition, and none left the list through an exception without an end date.

Each individual closure counted towards the third statement rests on a re-test of the running asset. A backlog reduced by closures that were never checked has been moved, not reduced, which is the situation described in [Unverified Vulnerability Closure](/unverified-vulnerability-closure).

## What to do next

Export the open findings for one business service and add three columns: reachable, known to be exploited, and serving a process the business has named as critical. Allow three values in each: yes, no and unknown.

Two counts come out of the exercise. The rows with yes in all three columns are the prioritised set, and each should have a person's name against it by the end of the week. The rows with unknown in any column show which evidence is missing, and that count is often the larger one. It shows where the work of establishing a position has to begin.
