/**
 * Content for /how-assurance-works: the reference page for what continuous
 * technology assurance is and how it works.
 *
 * Everything here is a statement of method, not of results achieved. Nothing
 * names a customer, a result, a duration or a figure. The same data feeds the
 * page, its structured data and the method section of /llms-full.txt, so the
 * three cannot drift apart.
 */

import type { AssuranceState } from './assurances.ts';

/* ------------------------------------------------------------ definition */

export const definition = {
  term: 'Continuous technology assurance',
  short:
    'Continuous technology assurance is the practice of keeping a technology outcome proven after it goes live.',
  full: 'The business states what must remain true. Evidence is gathered from the running system and tested against a threshold the business agreed. The result is held as a current state. When the evidence falls short, the correction is owned until a re-test shows the outcome is met again.',
};

/** The page in six sentences, for a reader or an agent that reads nothing else. */
export const inShort: string[] = [
  'It answers one question: can this outcome still be proven today?',
  'It needs four things: an outcome, a threshold, evidence, and an owner for the correction.',
  'It produces a state, not a report: Assured, Degrading, At risk or Unassured.',
  'A change to a system expires the evidence that described it.',
  'A correction is closed by a passing re-test, never by a closed ticket.',
  'It works alongside the teams that run the systems. It does not replace them or supply people to them.',
];

/** The five parts of one assured outcome, with one example followed through all five. */
export interface AnatomyPart {
  part: string;
  means: string;
  example: string;
}

export const anatomy: AnatomyPart[] = [
  {
    part: 'Outcome',
    means: 'What must remain true, in the words of the business.',
    example: 'Payments can be restored inside the time the business can tolerate.',
  },
  {
    part: 'Signal',
    means: 'Something in the running system that can be measured and that shows the outcome.',
    example: 'The time taken by a timed recovery exercise.',
  },
  {
    part: 'Threshold',
    means: 'The boundary beyond which the outcome can no longer be claimed.',
    example: 'The tolerance the business has stated, with a named owner who can change it.',
  },
  {
    part: 'Evidence',
    means: 'The dated result of a check that could have failed.',
    example: 'The result of the last exercise, tied to the platform version it ran on.',
  },
  {
    part: 'State',
    means: 'The current position, derived from the evidence and the threshold.',
    example: 'Assured while the result is current and inside the tolerance.',
  },
];

/* ---------------------------------------------------------------- method */

export interface MethodStep {
  title: string;
  text: string;
  who: string;
  produces: string;
  mistake: string;
}

export const methodSteps: MethodStep[] = [
  {
    title: 'Define the outcome',
    text: 'The business states what must remain true, in its own terms and not in the terms of a tool. A claim decision can be explained. A service recovers within its tolerance. A cost per transaction holds its margin.',
    who: 'The business owner of the outcome',
    produces: 'An outcome statement the business recognises as its own',
    mistake: 'Starting from what the tooling can measure, and calling that the outcome.',
  },
  {
    title: 'Find the signal',
    text: 'The outcome is traced to something that can be measured in the running system. Where no such signal exists, that absence is recorded. It is the first finding, and often the most useful one.',
    who: 'Xyvionix, with the teams that run the system',
    produces: 'A signal, or the finding that none exists',
    mistake: 'Accepting a proxy because it is already on a dashboard.',
  },
  {
    title: 'Agree the threshold',
    text: 'The boundary is set by the consequence of being wrong, the tolerance the business has stated and any external obligation that applies. Xyvionix proposes. The business decides, and a named owner is recorded.',
    who: 'The business decides',
    produces: 'A threshold with a basis, an owner and a review date',
    mistake: 'Inheriting an engineering default that no one chose.',
  },
  {
    title: 'Establish the baseline',
    text: 'The present state is measured against the threshold and recorded. The baseline separates what the enterprise can already prove from what it believes and from what no one has measured.',
    who: 'Xyvionix',
    produces: 'The first recorded state for the outcome',
    mistake: 'Treating an absence of incidents as proof.',
  },
  {
    title: 'Gather and test evidence',
    text: 'Checks that could fail are run on a schedule set by the consequence of being wrong, and again whenever a change could invalidate the last result. Each result records what was tested, on which version, when and how.',
    who: 'Xyvionix',
    produces: 'Tested results that are dated and attributable',
    mistake: 'Offering a configuration screenshot or a policy as evidence.',
  },
  {
    title: 'Hold the state',
    text: 'The state is derived from the evidence and the threshold by rule. It describes now. Where evidence is missing or has expired, the state is Unassured and is reported as such.',
    who: 'Xyvionix',
    produces: 'A current state for the outcome',
    mistake: 'Reporting the last period’s result as today’s position.',
  },
  {
    title: 'Correct',
    text: 'A state below Assured opens a correction with an owner. It begins at Degrading, before the threshold is breached, and it is carried within the access that was granted and through the enterprise’s own change process.',
    who: 'Xyvionix, inside your own change process',
    produces: 'A correction with an owner and a recorded cause',
    mistake: 'Handing the finding back and counting the work as done.',
  },
  {
    title: 'Verify closure, then improve',
    text: 'The check that detected the loss is run again on the corrected system. Only a pass closes the correction, and the pass is stored as new evidence. Causes that recur are tracked so they can be removed at source, and thresholds are raised when the business requires more.',
    who: 'Xyvionix, with the threshold owner',
    produces: 'A passing re-test, and a record of recurrence',
    mistake: 'Closing on deployment of the fix.',
  },
];

/* ------------------------------------------------------------ thresholds */

/** The six things every threshold carries. */
export const thresholdParts = [
  {
    title: 'Signal',
    text: 'What is measured. One signal to a threshold, so that a breach points to one thing.',
  },
  {
    title: 'Basis',
    text: 'Why the boundary sits where it does: the consequence of being wrong, a tolerance the business has stated, or an obligation set from outside.',
  },
  {
    title: 'Boundary',
    text: 'The value or condition at which the outcome can no longer be claimed. Engineering convention is an input to it, not the answer.',
  },
  {
    title: 'Owner',
    text: 'A named person in the business who can change it. A threshold no one can change is a default, not a decision.',
  },
  {
    title: 'Review',
    text: 'The date or event on which it is looked at again: when the system, its use or its obligations change.',
  },
  {
    title: 'Version',
    text: 'Every change to a threshold is kept, so that a past state can be explained against the threshold that applied then.',
  },
];

/* -------------------------------------------------------------- evidence */

export const evidenceProperties = [
  {
    title: 'Tested',
    text: 'Evidence is the result of a check that could have failed. A configuration screenshot or a policy document is a claim, not evidence.',
  },
  {
    title: 'Attributable',
    text: 'Each item records what was tested, against which version of the system, when, and by what means.',
  },
  {
    title: 'Retained',
    text: 'Evidence is kept for the period the business and its obligations require, so that a question asked a year later can be answered without reconstruction.',
  },
  {
    title: 'Current',
    text: 'Evidence has an age. When the system changes, or when the evidence is older than its agreed validity, the state becomes Unassured until it is re-gathered.',
  },
  {
    title: 'Held in the enterprise’s control',
    text: 'Evidence is stored where the enterprise decides and remains its property. Nothing is held that cannot be handed back.',
  },
];

/** What is often offered as proof, and what would be evidence of the same thing. */
export const assertionVsEvidence: [string, string][] = [
  ['A recovery plan, reviewed and signed', 'A timed restore, run on the current environment'],
  ['A policy that access is reviewed each quarter', 'The entitlements that exist today, compared with current roles'],
  ['An evaluation score from before launch', 'The same evaluation, run on the model and prompt now in production'],
  ['A closed remediation ticket', 'A re-test that shows the condition is absent'],
  ['An architecture diagram', 'The declared state compared with the running state'],
  ['A budget forecast', 'Unit cost calculated from closed billing periods'],
];

/* ----------------------------------------------------------------- state */

export interface StateRule {
  when: string;
  state: AssuranceState;
  follows: string;
}

export const stateRules: StateRule[] = [
  {
    when: 'The evidence is current and passes with room to spare',
    state: 'assured',
    follows: 'Checks continue on schedule and on every change.',
  },
  {
    when: 'The evidence is current and passes, and each result is closer to the threshold',
    state: 'degrading',
    follows: 'A correction opens, before the outcome is lost.',
  },
  {
    when: 'The evidence is current and fails the threshold',
    state: 'risk',
    follows: 'The owner of the threshold is told, and the correction is carried to a re-test.',
  },
  {
    when: 'The evidence does not exist, has aged past its validity, or describes a version no longer running',
    state: 'unassured',
    follows: 'The evidence is gathered again. No default pass is given.',
  },
];

/* --------------------------------------------------------------- closure */

/** What is often called closed, and why it is not closure. */
export const notClosure: [string, string][] = [
  ['The fix was deployed', 'Deployment shows that a change was made. It does not show that the condition is gone.'],
  ['The ticket was closed', 'A ticket records that work was done, not that the work had its effect.'],
  ['The alert cleared', 'An alert clears when a reading changes, which can happen for unrelated reasons.'],
  ['A management response was recorded', 'A response is an intention. It has not been tested.'],
];

export const closureRule =
  'Closure is one thing only: the check that detected the loss passes against the corrected system, and the pass is stored as evidence.';

/* ------------------------------------------------------------ comparison */

export const comparison = {
  columns: ['Monitoring', 'Periodic audit', 'Managed service', 'Continuous assurance'],
  rows: [
    {
      aspect: 'Question answered',
      cells: [
        'What is the system doing now?',
        'Was the control in place when we looked?',
        'Was the agreed activity performed?',
        'Is the agreed outcome still proven?',
      ],
    },
    {
      aspect: 'Measured against',
      cells: [
        'Technical limits set by engineering',
        'A control framework',
        'A service description',
        'A threshold agreed with the business',
      ],
    },
    {
      aspect: 'Evidence',
      cells: [
        'Telemetry, usually short retention',
        'Samples gathered for the audit period',
        'Tickets and activity reports',
        'Tested results, retained and attributable to a point in time',
      ],
    },
    {
      aspect: 'When it falls short',
      cells: [
        'An alert is raised',
        'A finding is reported',
        'A ticket is escalated',
        'Corrective action is owned until closure is verified',
      ],
    },
    {
      aspect: 'Closure',
      cells: [
        'Alert clears',
        'Management response recorded',
        'Ticket closed',
        'Re-test shows the outcome is met again',
      ],
    },
    {
      aspect: 'Validity',
      cells: ['The moment of measurement', 'The audit period', 'The reporting period', 'Current, and re-proven after change'],
    },
  ],
};

/** Practices an enterprise already runs, what each gives, and what assurance adds to it. */
export interface RelatedPractice {
  practice: string;
  gives: string;
  adds: string;
}

export const relatedPractices: RelatedPractice[] = [
  {
    practice: 'Observability',
    gives: 'Readings of what systems are doing',
    adds: 'A threshold the business agreed, a state, and an owner when it is breached',
  },
  {
    practice: 'Site reliability engineering',
    gives: 'Service level objectives and error budgets',
    adds: 'A consequence when the budget is spent, and evidence that recovery works',
  },
  {
    practice: 'Security scanning and penetration testing',
    gives: 'A list of exposures on the day of the test',
    adds: 'Re-verification after change, and closure proven by re-test',
  },
  {
    practice: 'Governance, risk and compliance',
    gives: 'Controls mapped to a framework and attested for a period',
    adds: 'Evidence that the control is operating today',
  },
  {
    practice: 'AI evaluation',
    gives: 'A score for one model, one prompt and one data set',
    adds: 'Re-evaluation when any of them changes, and quality sampled from production',
  },
  {
    practice: 'FinOps',
    gives: 'Visibility of spend, and allocation to owners',
    adds: 'Unit cost held to a threshold, with the correction owned',
  },
  {
    practice: 'Internal and external audit',
    gives: 'An independent opinion on a period that has ended',
    adds: 'A current position between audits, and evidence ready for the next one',
  },
];

/* ------------------------------------------------------------------ start */

/** What to bring to a first conversation. */
export const prepare = [
  {
    title: 'One outcome',
    text: 'The one it would cost most to be wrong about.',
  },
  {
    title: 'The system that delivers it',
    text: 'One system, not the estate.',
  },
  {
    title: 'Who carries the consequence',
    text: 'The person in the business who would answer for a failure.',
  },
  {
    title: 'The evidence that exists today',
    text: 'Whatever is currently offered as proof, and the date on it.',
  },
  {
    title: 'What has changed since',
    text: 'Releases, platform versions, models, suppliers and access, since that date.',
  },
];

/* --------------------------------------------------------------- glossary */

export interface Term {
  term: string;
  definition: string;
}

export const glossary: Term[] = [
  {
    term: 'Assurance',
    definition: 'The continuing proof that an outcome the business depends on is still being met.',
  },
  {
    term: 'Continuous technology assurance',
    definition:
      'The practice of keeping a technology outcome proven after go-live, by testing evidence against an agreed threshold and owning the correction when it falls short.',
  },
  {
    term: 'Outcome',
    definition: 'A statement, in business terms, of what a system must continue to do.',
  },
  {
    term: 'Signal',
    definition: 'A measurable property of a running system from which an outcome can be judged.',
  },
  {
    term: 'Threshold',
    definition: 'The agreed boundary on a signal beyond which the outcome can no longer be claimed.',
  },
  {
    term: 'Basis',
    definition: 'The reason a threshold sits where it does: a consequence, a stated tolerance or an obligation.',
  },
  {
    term: 'Evidence',
    definition: 'The recorded result of a check that could have failed, with what was tested, on which version, when and how.',
  },
  {
    term: 'Evidence age',
    definition: 'The time since a piece of evidence was gathered, compared with the period for which it is agreed to be valid.',
  },
  {
    term: 'State',
    definition: 'The current position of an outcome, derived by rule from evidence and threshold. One of four values.',
  },
  {
    term: 'Assured',
    definition: 'The state in which current evidence passes against the threshold.',
  },
  {
    term: 'Degrading',
    definition: 'The state in which evidence still passes and is moving toward the threshold.',
  },
  {
    term: 'At risk',
    definition: 'The state in which current evidence fails the threshold.',
  },
  {
    term: 'Unassured',
    definition: 'The state in which no current evidence exists. It means unknown, which is different from failing.',
  },
  {
    term: 'Baseline',
    definition: 'The first measurement of an outcome against its threshold, recorded before assurance begins.',
  },
  {
    term: 'Drift',
    definition: 'The difference that builds up between what was declared or approved and what is running.',
  },
  {
    term: 'Corrective action',
    definition: 'Work opened by a state below Assured, with an owner, that stays open until closure is verified.',
  },
  {
    term: 'Re-test',
    definition: 'The check that detected a loss, run again on the corrected system.',
  },
  {
    term: 'Verified closure',
    definition: 'The end of a corrective action, reached only when the re-test passes.',
  },
  {
    term: 'Recurrence',
    definition: 'The return of a condition that was closed, recorded against the original correction.',
  },
];

/* -------------------------------------------------------------- questions */

export const methodFaqs = [
  {
    q: 'How is continuous assurance different from monitoring?',
    a: 'Monitoring reports what a system is doing. Assurance states whether an outcome the business agreed is still proven, and carries ownership of the correction when it is not. Monitoring is one source of signals for assurance. It does not decide thresholds, retain evidence for examination or verify that a fix held.',
  },
  {
    q: 'How is assurance different from compliance?',
    a: 'Compliance shows that required controls existed and operated during a period. Assurance shows that an outcome the business depends on is being met now. The two support each other: evidence held under assurance is evidence an auditor can examine.',
  },
  {
    q: 'How are thresholds established?',
    a: 'With the business, starting from the outcome and the consequence of losing it. Xyvionix proposes the signals that can prove the outcome and the enterprise decides the boundary. Each threshold has a named owner who can change it.',
  },
  {
    q: 'How often is evidence gathered?',
    a: 'As often as the outcome requires, and again on every change that could invalidate the last result. The interval is set with the threshold, by the consequence of being wrong, not by a fixed calendar.',
  },
  {
    q: 'What evidence is retained, and where?',
    a: 'Tested results with the system version, time and method that produced them, together with the record of any corrective action and its re-test. Evidence is held in the location and for the period the enterprise specifies and remains the enterprise’s property.',
  },
  {
    q: 'What happens at the moment an outcome stops being proven?',
    a: 'The state moves to At risk, the owner of the threshold is informed, and corrective action begins. Xyvionix owns that action within the access it has been granted and through the enterprise’s own change process. The state returns to Assured only when a re-test shows the outcome is met.',
  },
  {
    q: 'Does Xyvionix replace internal platform, security or data teams?',
    a: 'No. Those teams build and run the systems. Xyvionix holds the evidence that the systems still meet the agreed outcome and carries corrections through to verified closure. It is an assurance function, not additional capacity for the engineering backlog.',
  },
  {
    q: 'How is access controlled?',
    a: 'Standing access is read-only. Elevation is requested for a specific approved change, is limited in time and is recorded. The full position is set out on the security and trust page.',
  },
  {
    q: 'Can assurance cover AWS, Azure and Google Cloud environments together?',
    a: 'Yes. The method is defined by the outcome and its evidence, not by the platform. The signals differ by provider, and the technology pages describe what has to be re-proven on each.',
  },
  {
    q: 'How are production AI changes re-evaluated?',
    a: 'A change to the model, prompt, retrieval corpus, tools or routing invalidates the evidence that depended on it. The affected evaluations are re-run against the changed system before the state returns to Assured.',
  },
  {
    q: 'What happens to the evidence if an engagement ends?',
    a: 'It stays with the enterprise. Thresholds, evidence and action records are the enterprise’s property and are kept in open formats, and every engagement includes a documented transition provision.',
  },
  {
    q: 'Where should an enterprise start?',
    a: 'With one outcome that matters and the one system that delivers it. The first step establishes what must be true, which signals can prove it, what threshold the business will agree, and what the state is today.',
  },
];

/* --------------------------------------------------------------- chapters */

export const methodChapters = [
  { id: 'definition', label: 'What it is' },
  { id: 'method', label: 'The method' },
  { id: 'thresholds', label: 'Thresholds' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'state', label: 'State' },
  { id: 'closure', label: 'Closure' },
  { id: 'compare', label: 'Compared' },
  { id: 'working', label: 'Working model' },
  { id: 'start', label: 'Starting' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'questions', label: 'Questions' },
];
