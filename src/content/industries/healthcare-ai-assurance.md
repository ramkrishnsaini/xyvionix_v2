---
title: Healthcare AI Assurance
h1: Prove clinical AI still performs here, on these patients, on this model version
seoTitle: 'Healthcare AI Assurance: Local Clinical Performance | Xyvionix'
description: >-
  Continuous assurance for clinical and operational AI: local performance
  monitoring, current clinical sources, protected data in prompts and model
  change control.
summary: >-
  Performance validated at one site and one time does not hold across
  populations, workflows and model updates. Local performance, source currency,
  protected data handling and model change are each held as current evidence.
lede: >-
  Healthcare AI assurance is the continuing proof that an AI tool performs on
  the organisation's own patients and workflows as it did when it was
  validated, on the model version that is serving today. A supplier's
  validation describes another population at an earlier date. Local case mix,
  documentation practice, source content and the model itself all change
  afterwards, so performance, grounding, data handling and oversight are
  measured in production and re-measured on every change.
ogQuestion: Is clinical and operational AI still performing as validated?
kind: industry-use-case
industry: healthcare
cluster: industry
secondary:
  - ai
  - data
parent: healthcare
state: assured
audience:
  - Chief Medical Information Officer
  - Head of AI
  - CISO
  - Clinical Safety
intent: >-
  Industry + assurance: assurance for AI in clinical documentation, decision
  support and operations
related:
  assurance:
    - ai-governance-assurance
    - production-rag-assurance
    - llm-evaluation-assurance
    - ai-security-assurance
    - data-quality-assurance
  useCases:
    - production-ai-going-live
    - rag-quality-degradation
    - ai-audit-readiness
  technologies:
    - azure-ai-assurance
    - vertex-ai-assurance
    - rag-vector-search-assurance
  industries:
    - healthcare
  insights:
    - measuring-production-rag-quality
    - human-oversight-evidence
    - why-ai-evaluation-fails-after-launch
evidence:
  - name: Local validation record
    detail: >-
      Performance measured on the organisation's own population before use, by
      site and by patient subgroup, tied to the model version and the date of
      the test.
  - name: Production performance samples
    detail: >-
      Outputs sampled from live use and compared with the confirmed outcome or
      with clinician review, including the rate at which outputs are edited,
      overridden or rejected.
  - name: Model and version register
    detail: >-
      Each AI tool with its supplier, its clinical owner, the model version now
      serving, the date it last changed and, for a regulated device, the change
      envelope the manufacturer agreed in advance.
  - name: Clinical source currency record
    detail: >-
      Every guideline, formulary and pathway available to retrieval, with its
      version, its owner, its review date and whether it has been withdrawn or
      superseded.
  - name: Protected data flow map
    detail: >-
      Where protected health information enters prompts, retrieval indexes,
      logs and stored session state, the retention that applies at each point
      and the agreement that covers each service feature in use.
  - name: Oversight decision record
    detail: >-
      For outputs that require review, who reviewed, what was decided, how long
      it took and whether the output was changed, retained against the
      reviewer's identity.
thresholds:
  - signal: Local performance against the validated baseline
    basis: >-
      The clinical consequence of a missed or false output for this use, set
      by the clinical safety owner
    lostWhen: >-
      Sampled performance falls below the agreed floor for any site or
      subgroup, or no sample has been taken since the model version changed
  - signal: Serving model version against the last locally validated version
    basis: Validation applies to one version on one population
    lostWhen: >-
      The version serving requests differs from the version that was last
      validated locally
  - signal: Withdrawn or superseded clinical sources still retrievable
    basis: >-
      The review cycle of the source owner and the consequence of superseded
      advice reaching a decision
    lostWhen: >-
      A withdrawn source remains retrievable beyond the agreed interval after
      withdrawal
  - signal: Service features holding protected data without a confirmed retention position
    basis: >-
      The obligations that apply to protected health information and the terms
      agreed with each supplier
    lostWhen: >-
      A feature that stores prompts, context or session state is in use with
      no current record of its retention and contractual coverage
  - signal: Review effectiveness
    basis: >-
      The consequence of the decision being supported and the reviewer
      workload that still permits a real examination
    lostWhen: >-
      Acceptance rates and review times show that outputs are being accepted
      without examination
faqs:
  - q: Does a supplier's regulatory clearance show that an AI tool performs at our organisation?
    a: >-
      It shows what was assessed, on the data and at the time of the
      assessment. It does not measure performance on a particular
      organisation's patients, equipment and workflows. The voluntary guidance
      released by the Joint Commission and the Coalition for Health AI on 17
      September 2025 recommends local validation and monitoring, which is
      evidence only the deploying organisation can hold.
  - q: What has to be re-proven when the model behind a clinical tool is updated?
    a: >-
      Everything that was measured on the previous version. Evaluation results
      are bound to the model version, the prompt, the tools and the test set.
      After an update, local performance is re-sampled, the supplier's
      documentation is checked against the serving version, and for a
      regulated device the change is compared with the envelope agreed in
      advance.
  - q: Can an agent platform that stores session state be used with protected health information?
    a: >-
      That depends on the specific feature and the agreement that covers it,
      and it is a decision for the organisation and its advisers. As an
      example of why the question has to be asked per feature, Anthropic's
      documentation, read on 27 September 2026, states that Claude Managed
      Agents is in beta, stores conversation history, sandbox state and
      outputs server-side, and is not currently eligible for Zero Data
      Retention or HIPAA Business Associate Agreement coverage. Such positions
      change, so the record carries a date.
sources:
  - title: '45 CFR 170.315: certification criteria for health IT, decision support interventions'
    url: 'https://www.ecfr.gov/current/title-45/section-170.315'
  - title: 'ASTP/ONC: HTI-5 proposed rule fact sheet'
    url: 'https://www.healthit.gov/topic/laws-regulation-and-policy/hti-5-proposed-rule-fact-sheet'
  - title: 'FDA: predetermined change control plan guidance for AI-enabled device software functions'
    url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence'
  - title: 'FDA: artificial intelligence in software as a medical device'
    url: 'https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device'
  - title: 'FDA: artificial intelligence-enabled medical devices'
    url: 'https://www.fda.gov/medical-devices/digital-health-center-excellence/artificial-intelligence-enabled-medical-devices'
  - title: 'MDCG 2025-6: interplay between the medical device regulations and the AI Act'
    url: 'https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en'
  - title: 'Regulation (EU) 2026/1744, Digital Omnibus on AI'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601744'
  - title: 'Regulation (EU) 2024/1689, Artificial Intelligence Act'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689'
  - title: 'EU AI Act Service Desk: Article 14, human oversight'
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14'
  - title: 'National Commission into the Regulation of AI in Healthcare'
    url: 'https://www.gov.uk/government/groups/national-commission-into-the-regulation-of-ai-in-healthcare'
  - title: 'Joint Commission and Coalition for Health AI: guidance on responsible use of AI in healthcare'
    url: 'https://www.chai.org/news/joint-commission-and-coalition-for-health-ai-chai-release-initial-guidance'
  - title: 'California SB 1120 (Chapter 879, Statutes of 2024)'
    url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120'
  - title: 'Anthropic: Claude Managed Agents overview'
    url: 'https://platform.claude.com/docs/en/managed-agents/overview'
  - title: 'Microsoft AI Red Team: updated taxonomy of failure modes in agentic AI systems'
    url: 'https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why validated performance does not travel

An AI tool arrives with a validation result. That result was produced on a particular population, with particular equipment and documentation habits, at a particular date. The organisation that deploys the tool differs on each of these, and keeps changing after go-live.

Four things move the result:

- **Population.** Case mix, age profile and referral pattern differ from the validation set. A tool that performed well overall can perform poorly on a subgroup that is a small share of the validation data and a large share of one clinic.
- **Inputs.** An analyser is replaced, a scanner protocol changes, a coding scheme is updated or a template is redesigned. The model receives data that no longer resembles what it was trained and tested on.
- **Workflow.** Where the output appears, who sees it and what they are expected to do decide whether a correct output leads to a correct action. A workflow change can remove the benefit without touching the model.
- **The model.** Suppliers update models. An update can arrive inside a routine product release, with no separate notice to the clinical owner.

None of these raises an alert. The tool keeps producing outputs of the same form, and the evidence that it works belongs to a system that is no longer the one in use. The general pattern is described in [why AI evaluation fails after launch](/why-ai-evaluation-fails-after-launch).

## Local performance monitoring

The assured statement is narrow: this tool, on this model version, performs inside the agreed boundary on this organisation's patients.

Holding it requires measurement in production. For predictive tools, outputs are compared with the confirmed outcome once it is known, by site and by subgroup. The outcome often arrives weeks later, so the evidence carries a lag that has to be stated. For generative tools such as documentation assistants and summarisers, a sample of outputs is reviewed by clinicians against the source record, and the rate at which outputs are edited or rejected is tracked alongside.

An aggregate score is not sufficient. A fall on one ward, one scanner or one patient group is outweighed by everything else, which is the failure local monitoring exists to find.

The threshold belongs to the clinical safety owner. Xyvionix measures against it and does not set it. How scoring methods are kept valid is covered in [LLM Evaluation Assurance](/llm-evaluation-assurance).

## Grounding in current clinical sources

An assistant that answers from guidelines, formularies and local pathways is only as current as its corpus. Clinical sources are revised and withdrawn on their owners' calendars, and a retrieval index picks up new documents far more reliably than it removes old ones.

The failure is an answer that cites a real document accurately and is wrong, because the document was superseded. A grounding score passes it. The proof therefore sits with the corpus: each source has an owner, a version and a review date, and a withdrawal at the source removes every derived chunk within an agreed interval. Local documents need the most attention, since a pathway written inside the organisation has no external publisher to announce its replacement.

The mechanism is covered in [Production RAG Assurance](/production-rag-assurance), and a gradual decline in answer quality in [RAG Quality Degradation](/rag-quality-degradation).

## Protected data in prompts, retrieval and stored state

Every prompt that contains a patient's details is a copy of protected health information. So is the retrieved context placed beside it, the log that records both, and the evaluation set built from sampled conversations. The record system has access controls that took years to build. The AI layer can hold the same data with none of them.

Three questions are held as current facts. Whether retrieval enforces the same record-level access as the source system, including after a clinician changes role. Where prompts and outputs are stored, for how long, and who can read them. Which supplier features are covered by the agreements the organisation relies on.

The third is a per-feature fact. Agent platforms that keep session state change the retention position of the service they belong to. Anthropic's documentation for Claude Managed Agents, a beta service at 27 September 2026, states that sessions store conversation history, sandbox state and outputs server-side, and that the service is not currently eligible for Zero Data Retention or HIPAA Business Associate Agreement coverage. A design approved on a stateless interface does not carry its data position over to a stateful one. The position is re-checked whenever the architecture or the supplier's terms change, and recorded with a date. Exposure through the model itself is covered in [AI Security Assurance](/ai-security-assurance).

## Change control for models and the role of review

For regulated devices, the FDA's final guidance on predetermined change control plans describes a plan that sets out planned modifications, the protocol for developing and validating them, and an impact assessment. The plan is an envelope agreed in advance. The continuing questions are whether each update stayed inside it and whether the updated model still performs locally.

Tools that are not regulated devices have no such plan. For those the register of serving versions is the control: a version change reopens local validation.

Human review is the other control, and it degrades. The Microsoft AI Red Team reported in June 2026 that human approval is bypassed through consent fatigue and incremental escalation. A clinician who accepts every draft note in seconds is recording a click. Review is measured by edit rate and time taken, and is concentrated on the outputs where an error carries consequence. The measurement method is set out in [human oversight evidence](/human-oversight-evidence).

Availability belongs here too. Once a team relies on an AI tool, its loss is a workflow failure, and the fallback has to be known and practised.

## Regulatory and audit context

Xyvionix is not a law firm and gives no legal, regulatory or clinical advice. Several of the instruments below are proposals or drafts, and are described as such.

| Instrument | Status at September 2026 |
|---|---|
| 45 CFR 170.315(b)(11), decision support interventions, United States | In force for certified health IT. Requires support for source attributes for predictive interventions, including intended use, external validation, performance measures and update schedule |
| HTI-5 proposed rule | Released 22 December 2025. Proposes to remove the AI model card requirements from the decision support criterion. A proposal, not a final rule |
| FDA guidance on predetermined change control plans | Final |
| FDA guidance on lifecycle management of AI-enabled device software functions | Draft, issued January 2025 |
| FDA guidance specific to generative AI-enabled devices | None issued in final form. FDA has requested public comment on measuring AI-enabled device performance in the real world |
| EU AI Act, AI that is a medical device requiring notified body assessment | High-risk through Annex I. After Regulation (EU) 2026/1744, those obligations apply from 2 August 2028 |
| UK National Commission into the Regulation of AI in Healthcare | Final report published 10 September 2026. Recommendations, with a cross-government response still to come |
| Joint Commission and Coalition for Health AI guidance | Released 17 September 2025. Voluntary |
| California SB 1120 | Approved 28 September 2024. Applies to health care service plans and disability insurers using AI for utilisation review, and provides that tools are periodically reviewed for accuracy and open to department audit |

The direction is consistent. The UK Commission concluded that regulation and assurance of AI in healthcare must become more proportionate, lifecycle-based and system-wide. FDA's open question is performance after deployment. If HTI-5 is finalised as proposed, less will be disclosed about AI embedded in certified record systems, and more of the burden of knowing how a tool behaves will rest with the organisation using it.

The expectations that call for continuing proof are stated in those terms. In the 2024 text of the EU AI Act, Article 9 describes risk management as a continuous iterative process run throughout the lifecycle, Article 12 requires automatic recording of events over the lifetime of the system, Article 14 requires that people can effectively oversee the system and stay aware of automation bias, and Article 72 requires post-market monitoring that actively and systematically collects and analyses data. The Omnibus amendments to these articles were not reviewed line by line for this page. Local validation and monitoring, periodic accuracy review and a change control envelope are all continuing by design. A clearance, a certification and a procurement assessment are point-in-time. Governance above these controls is covered in [AI Governance Assurance](/ai-governance-assurance), and preparation for an examination in [AI Audit Readiness](/ai-audit-readiness).

## Technology economics and change

The economic case for clinical AI is usually time returned to clinicians. It holds only while review takes less time than the task it replaces. If outputs need heavy correction, review cost absorbs the benefit, and the pressure to review less rises at the same moment. Cost per completed clinical task and edit rate are therefore read together.

Change arrives from outside. Model versions retire on the provider's calendar, record system vendors embed and update AI features on theirs, and clinical sources are revised on a third. Each is a production change to a tool in clinical use.

When a threshold is breached the state moves to At risk. Xyvionix owns corrective action through to completion within the access granted, working through the organisation's clinical safety process. Whether a tool stays in use is a clinical decision and remains with the organisation. Closure is recorded when a fresh sample on the serving version is back inside the boundary, when a withdrawn source can no longer be retrieved, or when a test shows that access removed at the source is refused in retrieval. The first assessment before a tool enters use is described in [Production AI Going Live](/production-ai-going-live).
