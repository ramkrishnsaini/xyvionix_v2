---
title: LLM Evaluation Assurance
h1: Prove that your evaluation still measures what production does
seoTitle: 'LLM Evaluation Assurance: Keep Test Evidence Valid | Xyvionix'
description: >-
  Continuous assurance for LLM evaluation: test sets that still represent
  production, judges calibrated against people, and results that repeat.
summary: >-
  An evaluation is an instrument, and instruments drift. Test set coverage,
  suite headroom, judge calibration and agreement between offline and
  production scores are each held against a threshold and re-proven.
lede: >-
  LLM evaluation assurance is the continuing proof that an evaluation can
  still tell a good system from a bad one. A test set ages as production
  traffic moves away from it, a suite stops detecting change once everything
  passes, and an automated judge is a model whose calibration expires. The
  evaluation is treated as an instrument that is itself tested, so that a
  passing score remains evidence and not habit.
ogQuestion: Does your evaluation still measure what production does?
kind: child
cluster: ai
secondary: []
parent: ai-assurance
state: assured
audience:
  - Head of AI
  - VP Engineering
  - AI Governance
intent: 'Commercial: keeping evaluation evidence valid after launch'
related:
  assurance:
    - model-change-assurance
    - production-rag-assurance
    - ai-observability-assurance
  useCases:
    - production-ai-going-live
    - model-provider-migration
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - vertex-ai-assurance
  industries:
    - financial-services-ai-assurance
  insights:
    - why-ai-evaluation-fails-after-launch
    - ai-audit-evidence-requirements
evidence:
  - name: Versioned test sets
    detail: >-
      Each test set with its version, the date and source of every case, and
      the production traffic categories it covers. Cases added from production
      failures are marked as such.
  - name: Coverage comparison
    detail: >-
      The categories present in sampled production traffic set against the
      categories present in the test set, so that gaps are measured and not
      assumed.
  - name: Grader and rubric record
    detail: >-
      Every grader in use, whether code, model or human, with the rubric, the
      judge model version and the dimension each one scores.
  - name: Judge calibration results
    detail: >-
      Agreement between each automated judge and human labels on the same
      items, corrected for chance, recorded against the judge model version
      and rubric it was measured on.
  - name: Repeated trial results
    detail: >-
      Results of running the same task several times, recording how often
      every trial succeeds and not only whether one did.
  - name: Offline and production score comparison
    detail: >-
      Scores from the pre-release suite and from sampled production traffic,
      produced by the same scorer definitions, with the difference tracked
      over time.
  - name: Portable evaluation assets
    detail: >-
      Test sets, graders, rubrics and historical results held in a form that
      does not depend on one provider's console remaining available.
thresholds:
  - signal: Regression suite pass rate on the production configuration
    basis: A regression suite is expected to hold close to a full pass, with the tolerance set by the consequence of a wrong answer
    lostWhen: The pass rate falls below the agreed floor after any change to model, prompt, tools or retrieval
  - signal: Headroom in the suite
    basis: A suite must be able to fail in order to detect change
    lostWhen: The suite passes in full across consecutive releases and no harder or newer cases have been added
  - signal: Coverage of production traffic categories
    basis: The share of production volume and consequence that each category carries
    lostWhen: A category above the agreed share of traffic has no cases in the test set
  - signal: Judge agreement with human labels, corrected for chance
    basis: The consequence of a wrong grade in the process being judged
    lostWhen: Agreement falls below the agreed floor, or the judge model or rubric has changed since calibration
  - signal: Difference between offline and production scores
    basis: The degree to which a release decision relies on the offline result
    lostWhen: The difference exceeds the agreed tolerance for consecutive windows
  - signal: Consistency across repeated trials
    basis: How often the business process can tolerate a different result for the same input
    lostWhen: The share of tasks on which every trial succeeds falls below the agreed floor
faqs:
  - q: We already run evaluations before every release. What does this add?
    a: >-
      It tests the evaluation. A release gate is only as good as the suite
      behind it, and a suite that passes in full every time, was written
      before launch, or is graded by a judge nobody has checked against people
      can no longer fail. Evaluation assurance measures coverage, headroom and
      judge calibration, so that a pass still carries information.
  - q: Can an LLM judge replace human review?
    a: >-
      It can extend human review, provided its agreement with human labels is
      measured and kept current. Anthropic's guidance is that model-based
      graders should be closely calibrated with human experts. That calibration
      belongs to one judge model, one rubric and one mix of traffic. When any
      of them changes it is measured again.
  - q: How often should a test set be refreshed?
    a: >-
      On a measured trigger, not a calendar. The two triggers are saturation,
      where the suite passes in full and has stopped detecting change, and
      divergence, where the offline score and the score on sampled production
      traffic move apart beyond the agreed tolerance.
sources:
  - title: 'Anthropic: demystifying evals for AI agents'
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
  - title: 'Judge reliability study (arXiv preprint 2606.19544)'
    url: 'https://arxiv.org/abs/2606.19544'
  - title: 'OpenAI: deprecations'
    url: 'https://developers.openai.com/api/docs/deprecations'
  - title: 'promptfoo: joining OpenAI'
    url: 'https://www.promptfoo.dev/blog/promptfoo-joining-openai/'
  - title: 'Anthropic: a postmortem of three recent issues'
    url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'
  - title: 'Databricks: evaluate and monitor with MLflow 3'
    url: 'https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/'
  - title: 'Amazon Bedrock: evaluations'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html'
  - title: 'Microsoft Learn: observability in Microsoft Foundry'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/observability'
  - title: 'Google Cloud: Vertex AI name changes'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes'
  - title: 'OCC Bulletin 2026-13: model risk management'
    url: 'https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html'
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

An evaluation is an instrument. It was built before launch from the questions the team expected, graded by a method the team trusted, and stored in the tool the team was using. Each of those ages.

**The suite saturates.** Anthropic's engineering guidance describes the point at which an agent passes every solvable task in a suite. From then on the suite cannot detect change, because there is nowhere for the score to go. A full pass on a saturated suite is a statement about the suite.

**Traffic moves away from the test set.** Users ask about products that did not exist at launch, in phrasing nobody anticipated. The test set keeps passing while a growing share of real requests falls outside anything it covers.

**The judge changes.** An automated judge is a model. It has a version, a retirement date and, where it is called through an alias, a provider who may move it. Calibration against human labels was measured on one judge version with one rubric. It does not transfer.

**Consistency is mistaken for validity.** A preprint published in June 2026 examined 21 judges across about 541,000 judgments. It reported chance-corrected agreement 33 to 41 points lower than raw agreement on the MT-Bench benchmark, and found two production judges with test-retest reliability above 0.95 that also showed position bias above 0.10. A judge can give the same answer every time and still prefer whichever response it reads first.

**One run is counted as a result.** Anthropic distinguishes the chance that at least one of several trials succeeds from the chance that all of them do. The two measures are identical for a single trial and tell opposite stories by ten. Production needs the second.

**The tooling retires.** OpenAI announced in June 2026 that its hosted Evals dashboard and API become read-only on 31 October 2026 and shut down on 30 November 2026. Evaluation history held only in a provider's console has an end date that the provider sets.

## What is at stake

Every other statement about an AI system rests on evaluation. The decision to release, the decision to accept a replacement model and the position reported to a risk committee all cite a score. If the instrument behind the score has drifted, each of those decisions was made on a number that no longer measures the thing it is named after.

A broken evaluation is worse than a missing one. A team without evaluation knows it is exposed and behaves with care. A team with a suite that always passes has a release gate that cannot close, and it ships with confidence.

The cost appears later and elsewhere. Anthropic's postmortem of three infrastructure bugs in August and September 2025 records that its evaluations did not capture the degradation users were reporting. The provider added continuous evaluation on production systems as part of the fix. The same gap exists in any enterprise whose evidence stops at the release gate.

## What Xyvionix assures

Xyvionix holds seven statements about each evaluation as current facts, tested against thresholds agreed with the business.

1. **The test set represents production.** The categories in sampled production traffic are present in the test set in proportion to their volume and consequence.
2. **The suite can still fail.** There is headroom between the current score and a full pass, maintained by adding cases from production failures and harder variants.
3. **The judge agrees with people.** Each automated judge is calibrated against human labels, with agreement corrected for chance, and the calibration is tied to the judge model version and rubric.
4. **Results repeat.** Tasks are run several times and the share on which every trial succeeds is recorded.
5. **Offline and production scores agree.** The same scorer definitions run before release and on sampled production traffic, so the two results are comparable and the difference is a signal.
6. **The outcome is checked, not the claim.** Where a system acts, the grader inspects the final state of the environment. What the system says it did is not the result.
7. **The assets are portable.** Test sets, graders and results are held in a form that survives a change of tool or provider.

This page assures the instrument. What the instrument is pointed at is covered elsewhere: retrieval and grounding in [Production RAG Assurance](/production-rag-assurance), and the re-test that a model or provider change requires in [Model Change Assurance](/model-change-assurance).

## Common failure modes

- **The suite that always passes.** Every release scores in full. The team reads this as stability. It is saturation.
- **A judge swapped without recalibration.** The judge model was retired or upgraded, scores moved by a few points, and the movement was attributed to the system under test.
- **Raw agreement reported as validity.** The judge matches human labels most of the time on a set where most items pass. Corrected for chance, the agreement is far lower.
- **One prompt grading several things.** A single judge call scores accuracy, tone and completeness together. Anthropic's guidance is to grade one dimension at a time and to give the judge an explicit way to answer that it does not know.
- **Grading the transcript.** The response reads as a success. The record in the target system was never written.
- **Evaluation at release only.** The suite runs in the pipeline and nowhere else, so a change that arrives without a release is never tested.
- **History in a console.** Two years of results sit in a hosted dashboard with a published shutdown date, in a format that does not export with its graders.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where a release gate or pipeline must change.

A breach here has a consequence that other breaches do not: the results produced while the instrument was out of tolerance are themselves in doubt. The first step is therefore to mark them. Release decisions and reported positions that relied on the affected scores are identified, and the systems they covered are treated as Unassured until re-measured.

The correction then follows the cause. A saturated suite is extended with cases drawn from production failures. A coverage gap is closed by sampling the missing category and labelling it. A judge that has lost calibration is re-measured against fresh human labels, and replaced or given a narrower rubric if it cannot meet the floor. Assets held in a retiring tool are exported with their graders and re-run elsewhere to confirm that they produce the same results.

## Verified closure

An evaluation is returned to Assured when it has been shown to detect what it is meant to detect.

The test is direct. A version of the system with a known defect is run through the suite, and the suite fails it. A set of items with known human labels, not used in calibration, is passed to the judge, and agreement corrected for chance meets the floor. The refreshed test set is compared with sampled production traffic and the coverage gap is closed. The offline score and the production score are brought back within tolerance and stay there for the agreed window.

Closure is recorded with the test set version, the judge model version and the rubric in force. Systems marked Unassured during the breach are re-measured with the corrected instrument before their own state is restored.

## Technology and industry context

Each major platform now ships evaluation as a service, and each has a different shape. Amazon Bedrock evaluations run as jobs, covering programmatic, human and judge-model evaluation, so a result exists only when a job was scheduled. Microsoft Foundry offers continuous evaluation of sampled production traffic and bills evaluations by consumption. Google's Gen AI evaluation service is now named Gemini Enterprise Agent Platform Evals. Databricks documents, under MLflow 3, that the scorers used in development can run on sampled production traffic. These services produce measurements. The threshold, the owner and the action on a breach sit outside them.

Independence of tooling has narrowed. promptfoo, which OpenAI names as the migration path from its hosted Evals product, announced in March 2026 that it is joining OpenAI, with the statement that it will remain open source. Where the evaluator and the evaluated model share an owner, portability of test sets and graders is the practical safeguard.

In US banking, OCC Bulletin 2026-13 places generative and agentic AI models outside the scope of the revised model risk guidance. A bank's own evaluation standard therefore carries the weight that external guidance does not, as set out in [Financial Services AI Assurance](/financial-services-ai-assurance). How evaluation evidence feeds a launch decision is covered in [Production AI Going Live](/production-ai-going-live), and the telemetry that supplies production samples in [AI Observability Assurance](/ai-observability-assurance).
