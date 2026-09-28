---
title: Secrets Exposure Assurance
h1: 'Prove every credential is known, inside its rotation age and revoked when exposed'
seoTitle: 'Secrets Exposure Assurance: Detection to Revocation | Xyvionix'
description: >-
  Continuing proof that credentials are inventoried, inside rotation policy and
  revoked when exposed, across code, pipelines, images and AI tool
  configuration.
summary: >-
  Secrets spread into repositories, pipelines, images and AI tool
  configuration. The inventory, the age of each credential, the time from
  detection to revocation and the move to federated identity are each held
  against a threshold.
lede: >-
  Secrets exposure assurance is the continuing proof that every credential the
  enterprise has issued is known, owned, inside the age its rotation policy
  allows, and revoked within an agreed time when it is found somewhere it
  should not be. A secret is closed when it stops working, not when it is
  deleted from the place it was found. Long-lived credentials are treated as
  exceptions to be replaced by federated identity wherever the platform
  supports it.
ogQuestion: 'Is every credential known, scoped, rotated and unexposed?'
kind: child
cluster: cyber
secondary:
  - ai
parent: cyber-exposure-assurance
state: assured
audience:
  - CISO
  - Security Engineering
  - VP Platform
intent: >-
  Commercial: continuing proof that credentials are inventoried, rotated and not
  exposed
related:
  assurance:
    - identity-exposure-assurance
    - privileged-access-assurance
    - mcp-security-assurance
  useCases:
    - identity-access-drift
    - unverified-vulnerability-closure
  technologies:
    - aws-iam-exposure-assurance
    - entra-id-exposure-assurance
  industries:
    - software-technology
  insights:
    - non-human-identity-exposure
evidence:
  - name: Credential inventory
    detail: >-
      Every long-lived credential with its type, issuer, owner, scope, the
      workload that consumes it, its creation date and the date it was last
      used. A credential found in use and absent from the inventory is a gap.
  - name: Rotation record
    detail: >-
      The time of the last successful rotation of each credential, with
      confirmation that the consuming workload authenticated afterwards. A
      schedule alone is not recorded as rotation.
  - name: Detection coverage register
    detail: >-
      The repositories, pipeline logs, image registries, collaboration tools
      and AI tool configuration examined for secrets, with the protection
      enabled on each and the date it was last confirmed.
  - name: Exposure record
    detail: >-
      For each exposed credential, where it was found, when it was detected,
      when it was revoked and the result of the test that showed the old value
      no longer authenticates.
  - name: Bypass and dismissal record
    detail: >-
      Each occasion on which a push block was bypassed or a secret alert was
      dismissed, with the person, the reason given and whether the credential
      was checked for validity.
  - name: Long-lived credential exceptions
    detail: >-
      Each credential that cannot yet be replaced by federated identity, with
      the recorded reason, the owner and the date the reason is next reviewed.
  - name: Federation trust record
    detail: >-
      The conditions under which each federated trust issues credentials, and
      the specific workloads, repositories or branches those conditions admit.
thresholds:
  - signal: Credentials outside the inventory
    basis: The business requires every credential to have a named owner and a known consumer
    lostWhen: Any credential is found in use, or found exposed, with no inventory record
  - signal: Credential age against rotation policy
    basis: The rotation policy the enterprise has set for each class of credential and the access it carries
    lostWhen: A credential is older than its policy allows and holds no approved, unexpired exception
  - signal: Time from exposure detection to revocation
    basis: The access the credential carries and how widely the location where it was found can be read
    lostWhen: An exposed credential still authenticates after the agreed time from detection
  - signal: Locations without secret detection
    basis: The places where the enterprise's code, pipelines and tools can hold a credential
    lostWhen: A repository, pipeline, registry or tool in scope has no current detection evidence
  - signal: Long-lived credentials without a recorded reason
    basis: Federated, short-lived credentials are the default wherever the platform supports them
    lostWhen: A long-lived credential exists where federation is available and no exception has been approved
  - signal: Breadth of federation trust
    basis: A trust condition should admit only the workload that needs the access
    lostWhen: A trust admits workloads, repositories or branches beyond those recorded for it
faqs:
  - q: Is removing a secret from the repository enough to close the finding?
    a: >-
      No. Removal changes where the value can be read from now on. Anyone who
      copied it already still holds a working credential. The finding is closed
      when the credential has been revoked and a test shows that the old value
      is refused.
  - q: Does moving to federated identity remove the need for secrets assurance?
    a: >-
      It removes the stored secret and leaves the trust. A federation trust
      with broad conditions issues credentials to more workloads than intended,
      which is the same exposure as a shared key. The trust conditions are
      held against a threshold in the same way as credential age.
  - q: Are AI tools and assistants in scope?
    a: >-
      Yes. Configuration files for AI tools and tool servers hold API keys and
      tokens, and they are often kept outside the repositories that secret
      scanning covers. They are part of the detection coverage register.
sources:
  - title: 'GitGuardian: The State of Secrets Sprawl 2026'
    url: 'https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/'
  - title: 'GitHub Docs: push protection'
    url: 'https://docs.github.com/en/code-security/concepts/secret-security/push-protection'
  - title: 'GitHub Docs: secure use reference for GitHub Actions'
    url: 'https://docs.github.com/en/actions/reference/security/secure-use'
  - title: 'Google Cloud Threat Horizons Report H1 2026'
    url: 'https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026'
  - title: 'CISA alert: widespread supply chain compromise impacting npm ecosystem'
    url: 'https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem'
  - title: 'AWS IAM: security best practices'
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
  - title: 'Microsoft Entra: mandatory multifactor authentication'
    url: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication'
  - title: 'Kubernetes: service accounts'
    url: 'https://kubernetes.io/docs/concepts/security/service-accounts/'
  - title: 'OWASP Non-Human Identities Top 10 (2025)'
    url: 'https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/'
  - title: 'OWASP Top 10 CI/CD Security Risks'
    url: 'https://owasp.org/www-project-top-10-ci-cd-security-risks/'
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

A credential works for whoever holds it, and it keeps working until someone revokes it. Every other fact about it, where it is stored, who owns it and how old it is, is a record that goes out of date.

**Copies multiply.** A credential is issued once and then copied into a pipeline variable, a configuration file, an image layer, a ticket and a chat message. The issuer records one credential. The GitGuardian State of Secrets Sprawl 2026 report states that about 28% of the incidents it measured originate outside repositories, in collaboration tools.

**Age accumulates without an event.** Nothing happens on the day a credential passes the age its policy allows. It continues to authenticate, so no consumer reports a problem.

**Rotation is scheduled and not performed.** A rotation schedule is a configuration. It can exist while the rotation fails. The evidence is the time of the last successful rotation and a consumer that still works afterwards.

**Detection coverage drifts.** GitHub documents two kinds of push protection. Push protection for repositories requires GitHub Secret Protection and is disabled by default. Push protection for users is enabled by default and covers pushes to public repositories only. Each new private repository therefore starts outside the control until someone enables it.

**Blocks are overridden.** By default anyone with write access can bypass a repository push block by giving a reason, and the bypass creates an alert. Whether anyone acted on the alert is a separate fact.

**New stores appear.** AI tools keep keys in their own configuration files. The same GitGuardian report found 24,008 unique secrets in Model Context Protocol configuration files, of which 2,117 were valid.

## What is at stake

The GitGuardian State of Secrets Sprawl 2026 report counted 28.65 million new hardcoded secrets added to public GitHub commits in 2025, a 34% increase year over year. The more important figure is about what happened afterwards. Of the credentials the report confirmed as valid in 2022, 64% were still valid in January 2026. They had been detected. They had not been revoked.

Old exposures are used. The Google Cloud Threat Horizons Report H1 2026 describes a case in which the actor used AWS access keys suspected to have been exposed in an incident in 2022.

For the business the first consequence is access that looks legitimate. A valid credential passes authentication, so its misuse is recorded as normal activity, and the loss is bounded only by the permissions the credential carries. The second is the cost of an emergency. When a supplier or a build dependency is compromised, every credential it could read has to be rotated at once. An enterprise without an inventory cannot list them, and cannot rotate them without breaking consumers it did not know about.

## What Xyvionix assures

Xyvionix holds six statements about the enterprise's credentials as current facts, each tested against a threshold agreed with the business.

1. **Every credential is known.** It has an owner who is still in role, a stated scope and a named consumer.
2. **Every credential is inside its age.** Age is measured against the enterprise's rotation policy, and rotation is evidenced by a successful rotation, not by a schedule.
3. **Detection reaches where secrets go.** Repositories, pipeline logs, images, collaboration tools and AI tool configuration are each covered or listed as Unassured.
4. **Exposure ends in revocation.** The time from detection to the moment the credential stops working is inside the agreed limit.
5. **Long-lived credentials are exceptions.** Each one that remains has a recorded reason and a review date. The rest are replaced by federated, short-lived credentials.
6. **Federation trust is narrow.** Each trust admits the workload that needs it and nothing wider.

What a credential is permitted to do once it authenticates is held under [Identity Exposure Assurance](/identity-exposure-assurance), and under [Privileged Access Assurance](/privileged-access-assurance) where it carries administrative rights. Credentials held by AI tool servers are examined with the servers themselves in [MCP Security Assurance](/mcp-security-assurance).

## Common failure modes

- **Removed, not revoked.** The line is deleted, the history is rewritten and the alert is closed. The credential still authenticates.
- **Dismissed without a validity check.** An alert is closed as a test value or a false positive. Nobody confirmed that the value does not work.
- **The internal repository assumed to be safe.** The GitGuardian State of Secrets Sprawl 2026 report found internal repositories roughly six times more likely to contain hardcoded secrets than public ones. Private visibility does not limit the readers to the people who need the credential.
- **Every secret available to every contributor.** GitHub documents that anyone with write access to a repository can read all of its repository secrets. The credential is held by the contributor list, not by the pipeline.
- **The value in an earlier image layer.** A later build step deletes the file. The layer that added it is still part of the image and is distributed with it.
- **Rotation switched off after an outage.** A rotation broke a consumer that nobody had recorded. The schedule was disabled to restore service and never re-enabled.
- **Partial emergency rotation.** After the npm supply chain compromise of September 2025, CISA advised organisations to "immediately rotate all developer credentials". Without an inventory the known credentials are rotated and the rest are assumed.
- **Federation with a broad condition.** The stored key is replaced by a trust that accepts any repository or branch in the organisation. The secret is gone and the exposure is unchanged.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change and incident processes.

For an exposed credential the order is fixed. A replacement is issued, the recorded consumers are moved to it, the old value is revoked and the revocation is tested. Revocation is not deferred until every copy has been found. The copies are traced afterwards, along with the route by which the value reached the place it was found, so that the template, script or habit that put it there is corrected. Activity under the credential during the exposure window is passed to the enterprise's incident process for review.

For an aged credential the correction is rotation with a confirmed consumer. For a long-lived credential the correction is replacement. AWS recommends that workloads use IAM roles, and names federation options for workloads that run outside AWS. It also names cases where long-term credentials remain legitimate. Those become exceptions with a recorded reason, an owner and a review date.

## Verified closure

A secrets finding is closed when the credential is shown not to work. Removal from the location where it was found is recorded, and it is not closure.

**Revocation.** The issuer reports the credential as revoked or deleted, and an authentication attempt with the old value, made under the enterprise's authorisation, is refused. The consuming workload authenticates with the replacement. The copies that were found have been removed.

**Rotation.** The last successful rotation is dated inside the policy age, and the consumer has authenticated since.

**Replacement by federation.** The long-lived credential has been deleted, not left unused. The workload obtains short-lived credentials through the trust, and the trust conditions admit only that workload.

**Detection coverage.** A harmless test pattern committed to a newly covered location is detected or blocked, and the event reaches the owner.

The observation is repeated after the next pipeline run and image build, because build arguments, templates and cached layers are the usual routes by which a removed value returns. If it does, the finding reopens against the original record. How closure is defined for the vulnerabilities that expose credentials is set out in [Vulnerability Remediation Assurance](/vulnerability-remediation-assurance).

## Technology and industry context

Each platform supplies part of the evidence. AWS recommends using IAM access last used information to update and remove keys, which is the source for showing that a key is dormant before it is deleted. Microsoft's guidance on mandatory multifactor authentication for Azure tells customers to move user-based service accounts to workload identities, so an automation account that signs in as a person runs against the vendor's own guidance. Kubernetes has issued short-lived, automatically rotating service account tokens since v1.22. Tokens of the earlier Secret-based kind that still exist are credentials with no expiry, and they belong in the inventory.

The shared vocabulary is settled enough to use in a register. The OWASP Non-Human Identities Top 10 for 2025 lists Secret Leakage as NHI2 and Long-Lived Secrets as NHI7. The OWASP Top 10 CI/CD Security Risks lists Insufficient Credential Hygiene as CICD-SEC-6.

AI tooling is a growing store. The GitGuardian State of Secrets Sprawl 2026 report counted 1,275,105 AI service secrets, up 81%. For software companies, where developer workstations and build runners hold credentials to customer-facing production, the inventory has to include those machines and the tools installed on them.
