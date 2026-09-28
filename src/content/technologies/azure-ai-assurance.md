---
title: Azure AI Assurance
h1: Prove which model, region and guardrail sit behind each Microsoft Foundry deployment today
seoTitle: 'Azure AI Assurance for Microsoft Foundry and Azure OpenAI | Xyvionix'
description: >-
  What has to be re-proven on Microsoft Foundry: the model behind each
  deployment, where requests are processed, the guardrail in force and
  provisioned capacity.
summary: >-
  On Microsoft Foundry the deployment type decides whether a model changes at
  retirement, where a request is processed and whether capacity is there. Each
  is read from the live estate, held against a threshold and re-proven.
lede: >-
  Azure AI assurance is the continuing proof that each AI workload on Microsoft
  Foundry (formerly Azure AI Foundry and Azure AI Studio) still runs the model,
  in the location and behind the guardrail that the business approved. On this
  platform those three facts are properties of the deployment type and its
  upgrade setting, not of the application, and Microsoft can change what sits
  behind a deployment name on its own schedule.
ogQuestion: Which model is behind each Foundry deployment name today?
platform: Microsoft Foundry
group: ai-platform
cluster: ai
secondary:
  - cyber
parent: technologies
state: assured
audience:
  - Head of AI
  - CTO
  - CISO
intent: >-
  Technology + problem: assurance for AI workloads built on Microsoft Foundry
  and Azure OpenAI in Microsoft Foundry Models
related:
  assurance:
    - ai-assurance
    - model-change-assurance
    - ai-agent-assurance
    - ai-security-assurance
  useCases:
    - production-ai-going-live
    - model-provider-migration
    - ai-agent-with-write-access
  technologies:
    - entra-id-exposure-assurance
    - azure-production-reliability
    - rag-vector-search-assurance
  industries:
    - financial-services-ai-assurance
    - healthcare-ai-assurance
  insights:
    - model-retirement-is-a-production-change
    - ai-agent-permission-risk
evidence:
  - name: Deployment register
    detail: >-
      Every deployment in every Foundry resource, with its deployment type,
      its upgrade setting and the model and version it resolves to now, read
      from the live estate and compared with the previous reading.
  - name: Retirement calendar per deployment
    detail: >-
      The retirement date of each model in use, re-read from Microsoft's
      schedule, with the named replacement once Microsoft declares it and the
      date the replacement becomes available in the regions in use.
  - name: Processing location record
    detail: >-
      For each workload with a residency requirement, the deployment type that
      serves it, the geography that type permits, and the Azure Policy
      assignment that blocks the types the requirement excludes.
  - name: Effective guardrail test results
    detail: >-
      Dated results of adversarial and policy test inputs sent to the endpoint
      the application calls, including agent endpoints, with the guardrail
      that was in force at the time.
  - name: Provisioned capacity and spillover measurements
    detail: >-
      Utilisation of provisioned throughput units, the share of requests that
      spilled over to a standard deployment, and the blended cost per outcome
      that resulted.
  - name: Role assignment scope after resource upgrade
    detail: >-
      Role assignments on each Foundry resource with the set of models each
      assignment can reach, taken before and after an upgrade from an Azure
      OpenAI resource.
  - name: Regression verdict per resolved model
    detail: >-
      The result of the enterprise's own regression suite against the model
      version each deployment resolves to, stored with the deployment type and
      upgrade setting in force.
thresholds:
  - signal: Deployments whose resolved model has no current verdict
    basis: The business outcome was approved on one model version, so a different version carries no proof
    lostWhen: A deployment resolves to a model version for which no regression verdict is held
  - signal: Time remaining before retirement without a tested successor
    basis: The enterprise's change lead time, compared with the period Microsoft allows between naming a replacement and retirement
    lostWhen: The time remaining is shorter than the change lead time and no successor holds a passing verdict
  - signal: Deployment types outside the residency requirement
    basis: The processing geography the business has committed to for the data the workload handles
    lostWhen: A workload with a residency requirement is served by a deployment type that permits processing outside it
  - signal: Effective guardrail at the called endpoint
    basis: The categories of input and output the business has decided must be blocked for this use
    lostWhen: Test inputs that the approved guardrail blocks are accepted at the endpoint the application calls
  - signal: Spillover from provisioned to standard deployments
    basis: The latency and unit cost the business approved for the workload
    lostWhen: The share of traffic served by spillover exceeds the agreed level for the measurement window
faqs:
  - q: Does setting a deployment to no automatic upgrade remove the model change risk?
    a: >-
      It exchanges one risk for another. With automatic upgrade the model can
      change with no change record on the customer side. With the
      NoAutoUpgrade option Microsoft documents that the deployment stops at
      retirement, and a retired model returns 410 Gone. The first needs
      detection. The second needs a migration finished before a fixed date.
  - q: The Foundry resource is in an EU region. Is processing in the EU?
    a: >-
      Not necessarily. Processing location follows the deployment type. A
      Global Standard deployment in a resource created in an EU region can be
      processed elsewhere. Data Zone deployment types keep processing inside
      the named data zone, and regional types inside the region. The evidence
      is the deployment type, read per deployment.
  - q: Does Foundry observability already provide this assurance?
    a: >-
      It provides signals. Microsoft documents evaluation, monitoring and
      tracing in Foundry, including continuous evaluation of sampled
      production traffic and scheduled red teaming. Those results become
      assurance when they are held against a threshold the business set, have
      an owner, and lead to a correction that is closed by re-test.
  - q: Is Xyvionix a Microsoft partner or reseller?
    a: >-
      No. Xyvionix is not a reseller or partner of any vendor. It is
      independent, and the evidence it holds is about the enterprise's
      workloads, not about the platform's merits.
sources:
  - title: 'Microsoft Learn: What is Microsoft Foundry'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry'
  - title: 'Microsoft Learn: Azure OpenAI in Microsoft Foundry Models, model deprecations and retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'Microsoft Learn: model retirement schedule'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule'
  - title: 'Microsoft Learn: automatic upgrade of Azure OpenAI resources to Foundry resources'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/how-to/upgrade-azure-openai-auto'
  - title: 'Microsoft Learn: deployment types for Foundry Models'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types'
  - title: 'Microsoft Learn: provisioned throughput'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput'
  - title: 'Microsoft Learn: navigate from Foundry (classic)'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/how-to/navigate-from-classic'
  - title: 'Microsoft Learn: Foundry Agent Service overview'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/overview'
  - title: 'Microsoft Learn: guardrails and controls overview'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview'
  - title: 'Microsoft Learn: observability in Microsoft Foundry'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/observability'
  - title: 'Microsoft Learn: what is new in Microsoft Entra Agent ID'
    url: 'https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Microsoft Foundry

An application on Microsoft Foundry calls a deployment name. What answers behind it is decided by two settings that most approval documents do not record: the deployment type and the version upgrade option.

The deployment type is a commercial choice with three assurance consequences. It decides where the request is processed, because processing location is a property of the type and not of the resource's region. It decides whether Microsoft replaces the model at retirement, because Global Standard, Data Zone Standard and Standard deployments are upgraded automatically and provisioned deployments are not. It decides whether capacity is reserved or shared.

The platform around the deployment is also moving. Microsoft is upgrading eligible Azure OpenAI resources to Foundry resources in stages, after which the resource can reach the wider set of Foundry Models. Two portals coexist, and hub-based projects live only in Foundry (classic). Evidence gathered against a classic hub project does not describe the resource model the workload may now run on.

Names have split three ways. Microsoft's documentation calls the model service Azure OpenAI in Microsoft Foundry Models (formerly Azure OpenAI Service). Azure Service Health and the pricing page still use the former name. The Azure resource type remains `Microsoft.CognitiveServices/accounts`. An alert rule on Service Health that filters on the current name misses retirement advisories published under the former one.

The vendor-neutral method is set out in [AI Assurance](/ai-assurance). This page covers what is particular to Microsoft's platform.

## What expires, and on whose calendar

Every entry below is Microsoft's published position in September 2026. Microsoft states that retirement dates cannot be extended.

| What expires | Microsoft's published position | What it does to evidence |
|---|---|---|
| A generally available model | Retires 18 months after launch. Anthropic, DeepSeek, Fireworks and Mistral AI models follow a 12-month lifecycle | Every verdict has a known end date from the day the model is deployed |
| The choice of successor | The replacement is declared about 90 to 120 days before retirement, and reaches provisioned regions about 30 days before | The test window opens late, and latest for provisioned capacity |
| gpt-4.1-nano, then o1, o3, o3-mini and o4-mini | Retire 14 October 2026 and 19 November 2026 | Verdicts held on them expire on those dates |
| gpt-4o version 2024-05-13 | Retires 9 December 2026 and upgrades automatically to gpt-5.6-sol | The deployment continues on a model from a different family |
| Assistants API and the `azure-ai-inference` package | Microsoft's documentation gives 26 August 2026 for both | Agents and clients built on them need migration to the Responses API and re-test |
| Azure OpenAI resources | Upgraded to Foundry resources in stages unless `foundryAutoUpgrade.mode` is set to `Disabled` | Permission scope gathered before the upgrade describes a smaller model set |

Notice of retirement is at least 60 days for generally available models and 30 days for preview models. Preview deployments are upgraded by force or terminated.

Availability follows its own order. New models launch on Global Standard first. Regional Standard and provisioned types arrive last, with no guaranteed date. A workload bound to one region can reach its retirement date with no successor available in that region.

## What must be continuously re-proven

**The resolved model, per deployment.** The register records the model and version each deployment resolves to, and the value of `versionUpgradeOption`. Microsoft documents three values: `OnceNewDefaultVersionAvailable`, `OnceCurrentVersionExpired` and `NoAutoUpgrade`, under which the deployment stops at retirement. Each implies a different control, so the setting is read back from the live deployment and not from the template that created it. The events that oblige a regression suite to run again are covered in [Model Change Assurance](/model-change-assurance).

**Processing location, per deployment type.** Data zones exist for the US, the EU and APAC, and Microsoft can add regions to a data zone without prior notice. A residency statement is therefore tied to the deployment type and enforced with Azure Policy, which can block a type outright.

**The guardrail that is in force.** Microsoft now documents content filtering as guardrails and controls, with `Microsoft.DefaultV2` as the default. One rule matters more than the rest: an agent's guardrail fully overrides the guardrail of the model it calls. A review of model deployments can show a strict configuration while the agent in front of them runs a weaker one. The proof is a test at the endpoint the application calls.

**Capacity and what overflow costs.** Microsoft states that quota does not guarantee capacity, and that a reservation does not guarantee capacity either. Optional spillover routes overflow from a provisioned deployment to a standard one, which moves that traffic to pay-per-token pricing.

**Permission scope after a resource upgrade.** Role names changed with the platform, for example Azure AI User became Foundry User, while role IDs did not. A broad role assigned when the resource held a few deployments is re-examined once the resource can reach more models.

**Agent objects and identity.** In Foundry Agent Service, agents, tools and toolbox versions are separately versioned objects, and each can drift from what was approved. Microsoft Entra Agent ID is generally available, so agent identity can be held as a production control under [AI Agent Assurance](/ai-agent-assurance).

## Common failure modes

- **The deployment that changed family.** A Standard deployment is left to upgrade automatically. At retirement it resolves to a model from another family. Prompts, structured output and cost were approved on the previous one.
- **The deployment that stopped.** `NoAutoUpgrade` was chosen to prevent silent change and no migration date was set. Requests return `410 Gone`.
- **Provisioned capacity with the shortest window.** Provisioned deployments are not upgraded automatically, and the replacement reaches provisioned regions about 30 days before retirement. The largest commitment has the least time to test.
- **Residency claimed from the resource region.** The resource sits in the required region. The deployment is Global Standard.
- **Spillover mistaken for headroom.** Spend rises while utilisation looks healthy, because overflow is served by a standard deployment.
- **Preview controls counted as coverage.** Guardrail intervention at tool call and tool response is in preview, as are agent guardrails. A control in preview is recorded as such in the evidence.
- **An agent that cannot follow the workload.** The Responses API is not available in every Azure region, so an agent may have no home in the region the residency requirement names.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk. A deployment found resolving to a model with no verdict is Unassured. Xyvionix owns the corrective action through to completion within the access it has been granted, and changes to production go through the enterprise's own change process.

Corrections on this platform are specific. An upgrade setting is changed to the value the business chose, with a migration date where that value is `NoAutoUpgrade`. A successor is evaluated as soon as Microsoft names it, using the method in [LLM Evaluation Assurance](/llm-evaluation-assurance). A deployment of the wrong type is replaced and the excluded types are blocked by policy. An agent guardrail is brought up to the level of the model guardrail it overrides.

Where no in-region successor exists before retirement, the choice belongs to the business and is recorded with its owner and an expiry date.

Closure is recorded by re-test, not by a completed change. For an upgrade setting, the value is read back from the live deployment and the responding model matches the evaluated model over the measurement window. For residency, an attempt to create an excluded deployment type is refused by policy. For a guardrail, the test inputs that were accepted are now blocked at the agent endpoint. For capacity, the spillover share is inside its threshold across a full window of representative load.

Each closure is stored with the deployment type, upgrade setting and model version in force. When Microsoft's schedule changes any of them, the evidence expires and the record reopens.
