---
title: Terraform Drift Assurance
h1: Prove that infrastructure still matches its Terraform or OpenTofu definition
seoTitle: 'Terraform Drift Assurance: State Versus Reality | Xyvionix'
description: >-
  What has to stay proven with Terraform and OpenTofu: coverage of the estate,
  fresh drift detection, plans free of noise, version position and owned
  reconciliation.
summary: >-
  A clean plan covers only what the tool manages. Coverage, detection
  freshness, plan noise, tool and provider version position, policy reach and
  reconciliation ownership are each held against a threshold, for Terraform
  and OpenTofu.
lede: >-
  Terraform drift assurance is the continuing proof that the running estate
  matches the Terraform or OpenTofu configuration that was reviewed, and that
  every difference has an age, a direction and an owner. Configuration, state
  and reality are three separate things. A plan reports on the resources the
  tool manages, with the tool and provider versions that produced it, on the
  day it ran. Everything outside that is unexamined.
ogQuestion: Does a clean plan mean production matches the definition?
platform: Terraform and OpenTofu
group: infrastructure-as-code
cluster: reliability
secondary:
  - change
  - cyber
parent: technologies
state: assured
audience:
  - VP Platform
  - Cloud Security
  - Technology Risk
intent: >-
  Technology + problem: proving infrastructure still matches its Terraform or
  OpenTofu definition
related:
  assurance:
    - cloud-drift-assurance
    - release-assurance
    - cloud-security-exposure-assurance
  useCases:
    - cloud-configuration-drift
    - unverified-vulnerability-closure
  technologies:
    - aws-production-reliability
    - azure-production-reliability
    - eks-reliability-assurance
  industries:
    - financial-services
  insights:
    - cloud-drift-production-risk
evidence:
  - name: Tool and version record
    detail: >-
      For each workspace or Stack, which tool runs it, Terraform or
      OpenTofu, at which version, with the provider and module versions
      pinned and the licence position of the tool recorded.
  - name: Coverage comparison
    detail: >-
      The resources listed by the cloud provider for each account,
      subscription or project compared with the resources held in state,
      with the unmanaged remainder listed by owner.
  - name: Detection run history
    detail: >-
      The date drift detection last completed for each workspace, including
      workspaces where detection is paused, unavailable in the edition or
      execution mode, or has never run.
  - name: Plan noise register
    detail: >-
      Every difference that appears in routine plans and is accepted, and
      every attribute excluded from comparison, each with a reason, an
      owner and a review date.
  - name: Policy coverage map
    detail: >-
      Which policy sets apply to which workspaces and Stacks, by framework,
      so that a Stack outside the reach of a policy set is visible.
  - name: Drift register
    detail: >-
      Each open difference with its first-detected date, its direction of
      correction, adopt or revert, and the person who owns the decision.
thresholds:
  - signal: Running resources held in no state
    basis: The business requires every production resource to be reviewable and rebuildable
    lostWhen: Unmanaged resources on a critical service exceed the agreed allowance, or any has no named owner
  - signal: Age of the last completed drift detection, per workspace
    basis: The rate of change in the environment and the configured assessment cadence, which defaults to 24 hours in HCP Terraform
    lostWhen: The last completed detection is older than the agreed cadence, including when assessments have paused after a failed run
  - signal: Unexplained differences in routine plans
    basis: A reviewer can only see real drift if an unchanged environment produces an empty plan
    lostWhen: A routine plan for a critical workspace shows differences that are not in the noise register
  - signal: Tool, provider and module version position
    basis: The publisher's release and security fix record, and the rehearsal an upgrade needs
    lostWhen: A workspace runs a version with a published security fix outstanding beyond the agreed window, or plan and apply use different versions
  - signal: Workspaces and Stacks outside policy enforcement
    basis: The controls the business requires to be checked before any change is applied
    lostWhen: A production workspace or Stack has no policy set that can evaluate it
  - signal: Drift without an owner or direction
    basis: How long the business accepts production differing from what was approved
    lostWhen: Any difference on a critical resource stays unclassified beyond the agreed age
faqs:
  - q: Can a module proven on Terraform be treated as proven on OpenTofu?
    a: >-
      No. The two tools are diverging in language features and their version
      numbers no longer correspond. In September 2026 the latest stable
      releases are Terraform v1.16.4 and OpenTofu v1.12.6. A plan is
      evidence for the tool and version that produced it. Moving a workspace
      from one tool to the other is a change, and it is rehearsed like one.
  - q: Which workspaces does HCP Terraform drift detection not cover?
    a: >-
      Health assessments are available in the Standard and Premium editions
      and require remote or agent execution mode, so workspaces outside
      those conditions have no assessments. Assessments pause if the latest
      run ended in an error. In every case detection reads only the
      resources Terraform manages.
  - q: Does the Terraform licence matter for enterprise use?
    a: >-
      It is a fact to record. Terraform is source-available under the
      Business Source License 1.1, with IBM Corporation as licensor.
      Production use is permitted except for offering Terraform to third
      parties as a hosted or embedded competitive offering. Each version
      changes to MPL 2.0 four years after its first public distribution.
      Xyvionix gives no legal advice. The licence position is held with the
      tool record so that it is reviewed when the use changes.
sources:
  - title: 'Terraform releases'
    url: 'https://github.com/hashicorp/terraform/releases'
  - title: 'Terraform licence'
    url: 'https://github.com/hashicorp/terraform/blob/main/LICENSE'
  - title: 'IBM completes acquisition of HashiCorp'
    url: 'https://newsroom.ibm.com/2025-02-27-ibm-completes-acquisition-of-hashicorp,-creates-comprehensive,-end-to-end-hybrid-cloud-platform'
  - title: 'HCP Terraform health assessments'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health'
  - title: 'HCP Terraform policy enforcement'
    url: 'https://developer.hashicorp.com/terraform/cloud-docs/policy-enforcement'
  - title: 'Terraform Stacks'
    url: 'https://developer.hashicorp.com/terraform/language/stacks'
  - title: 'OpenTofu releases'
    url: 'https://github.com/opentofu/opentofu/releases'
  - title: "OpenTofu: what's new"
    url: 'https://opentofu.org/docs/intro/whats-new/'
  - title: 'CNCF: OpenTofu project'
    url: 'https://www.cncf.io/projects/opentofu/'
  - title: 'AWS Resilience Hub user guide'
    url: 'https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html'
  - title: 'AWS: Disaster recovery options in the cloud'
    url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Terraform and OpenTofu

Three things carry the same name in most conversations about infrastructure as code. The configuration is what was reviewed. The state is the tool's record of the resources it manages. Reality is what the cloud provider is running. Assurance depends on keeping them apart.

A plan compares the configuration with the resources in state. When it comes back empty, it has said something about those resources and nothing about the rest of the estate. A resource created in a console, by another tool or by a platform feature was never in state, so it cannot appear as a difference.

The plan is also only as readable as it is quiet. Where routine plans always show a handful of differences, reviewers learn to approve them. The one real change arrives among the familiar ones and is approved with them.

The last part of the problem is ownership. A tool can report a difference. It cannot decide whether production or the configuration is right, or who makes that call. The vendor-neutral position is set out in [Cloud Drift Assurance](/cloud-drift-assurance). This page covers what is particular to Terraform and OpenTofu.

## What expires, and on whose calendar

There are two tools, on two release trains, under different ownership.

| | Terraform | OpenTofu |
|---|---|---|
| Latest stable on 27 September 2026 | v1.16.4, released 23 September 2026 | v1.12.6, released 19 August 2026, a security release. v1.11.14 is maintained in parallel |
| Pre-release | v1.17.0-beta2 | v1.13.0-rc1 |
| Licence and ownership | Source-available under the Business Source License 1.1. Licensor is IBM Corporation, which completed its acquisition of HashiCorp on 27 February 2025 | A CNCF project at Sandbox maturity, accepted on 23 April 2025 |

The version numbers no longer correspond, so evidence names the tool as well as the version. OpenTofu 1.12 added language features of its own, including a dynamic `prevent_destroy` and a `destroy = false` lifecycle option. A module that uses them has been proven on OpenTofu only.

Releases also carry fixes. OpenTofu v1.12.6 addressed credential handling with OCI registries. A workspace pinned to an earlier version is pinned to the earlier behaviour.

Detection has a clock too. HCP Terraform (formerly Terraform Cloud) health assessments run every 24 hours by default, so drift evidence is up to a day old when everything works. Assessments pause if the latest run ended in an error.

## What must be continuously re-proven

**Coverage.** The provider's own inventory is compared with what is held in state. The difference is the unmanaged estate. Each unmanaged resource is adopted into a configuration, removed, or listed with an owner and a reason.

**Freshness of detection, per workspace.** The record shows when detection last completed, not whether it is switched on. Health assessments are available in the Standard and Premium editions and need remote or agent execution mode. A workspace outside those conditions produces no drift evidence at all, and its silence is recorded as missing evidence.

**A quiet plan.** An unchanged environment should produce an empty plan. Every standing difference and every attribute excluded from comparison is entered in a register with a reason and a review date. Anything in a plan that is not in the register is treated as real.

**Version position.** Tool, provider and module versions are pinned and recorded, and the pin is reviewed against the publisher's releases. Lag has two costs. A version left too long misses fixes. A version left unpinned changes without a commit. A plan produced by one version is not proof for another, so plan and apply run on the same one.

**Policy reach.** HCP Terraform supports three policy frameworks: Sentinel, OPA and a native Terraform policy framework that is in beta. Sentinel and OPA policy sets support workspaces only. Terraform policy sets work with workspaces and Stacks. An estate that has moved to Stacks and relies on Sentinel or OPA has a coverage gap. Policy also passes at plan time and says nothing about changes made afterwards by another route.

**Ownership of every difference.** Each drift item carries a direction and a name. Exposure created by drift is assessed under [Cloud Security Exposure Assurance](/cloud-security-exposure-assurance).

## Common failure modes

- **Clean plan, unmanaged estate.** Every workspace reports no changes. A share of production was never in any workspace.
- **Detection paused by the failure it should report.** A run errored, assessments paused, and the workspace most likely to have drifted stopped being checked.
- **The plan nobody reads.** Routine plans show the same differences every time. A changed firewall rule appears among them and is applied.
- **An exclusion that outlived its reason.** An attribute was excluded from comparison to silence a provider quirk. Two years later it hides a change that matters.
- **Proven on one tool, run on the other.** A shared module is tested with Terraform in one team and executed with OpenTofu in another.
- **One change, many environments.** Terraform Stacks are generally available, with documented limits of 20 deployments and 100 components per Stack. A single change fans out, so verification per deployment matters more than it did per workspace.
- **State read as the architecture.** AWS Resilience Hub can import Terraform state files to assess resilience. An assessment built on a drifted state models an estate that is not running.
- **A recovery built from a stale definition.** AWS states that without infrastructure as code, restoring workloads in the recovery Region is complex and may exceed the recovery time objective. A definition that has drifted rebuilds the environment without the fixes made by hand. The scenario is covered in [Cloud Configuration Drift](/cloud-configuration-drift).

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production must change.

Reconciliation has two directions and they are opposites. An intended change, such as a fix made during an incident, is adopted: the configuration is updated to match production, reviewed and applied. An unintended change is reverted through the pipeline. The decision belongs to a named owner for each workspace, and it is made per difference. Applying the configuration over everything is a decision to revert, including the fixes.

Other corrections follow the finding. Unmanaged resources are imported or retired. Noise is removed at its cause so that the plan is empty when nothing has changed. A failing run is repaired so that assessments resume. A version pin is moved forward after a rehearsal on a non-production workspace. A Stack outside policy reach is given a policy set that can evaluate it.

Closure is recorded by re-test. A fresh plan, produced by the recorded tool and version, reports no change for the resource. The value read from the provider matches the configuration. The next scheduled assessment completes and agrees. For an adopted fix, the next routine apply is observed to leave it in place. For coverage, a new comparison of provider inventory with state shows the resource managed or gone.

Each closure is dated with the tool, version and workspace that produced it. Platform detail for one provider is covered in [AWS Production Reliability](/aws-production-reliability).
