/**
 * Content for /assurance-engine. The engine is described as the design behind
 * the assurance method. No feature, integration or performance claim is made.
 */

export interface EngineStageDetail {
  title: string;
  question: string;
  text: string;
  points: string[];
}

export const engineDetail: EngineStageDetail[] = [
  {
    title: 'Signals',
    question: 'What is the estate reporting?',
    text: 'Signals are the raw material: what the systems already emit and what their configuration already states. The engine reads them where they are and does not require the enterprise to move its data.',
    points: [
      'Telemetry: traces, metrics, logs and evaluation results',
      'Configuration: declared and actual state of infrastructure, identity and policy',
      'Cost and usage: billing data, consumption, commitments',
      'Change: releases, model versions, schema versions, vendor lifecycle dates',
    ],
  },
  {
    title: 'Evidence',
    question: 'What has been tested, and when?',
    text: 'A signal becomes evidence when it is the result of a check that could have failed, recorded with what was tested, against which version, at what time. Evidence has an age and a validity period.',
    points: [
      'Each item is attributable to a system version and a point in time',
      'Evidence is retained for the period the enterprise specifies',
      'A change to the system marks dependent evidence as expired',
    ],
  },
  {
    title: 'Thresholds',
    question: 'Where is the boundary the business agreed?',
    text: 'Thresholds are decisions made by the business and held as data. Each has an owner, a basis and a review date. The engine applies them. It does not set them.',
    points: [
      'Set by consequence and obligation, not by engineering default',
      'Owned by a named person who can change them',
      'Versioned, so a past state can be explained against the threshold that applied then',
    ],
  },
  {
    title: 'State',
    question: 'Is the outcome proven right now?',
    text: 'State is derived from evidence and thresholds by rule. It is one of four values and it is current. A report describes a period that has ended. A state describes now.',
    points: [
      'Assured, Degrading, At risk or Unassured',
      'Every state change records the evidence that caused it',
      'Missing or expired evidence produces Unassured, never a default pass',
    ],
  },
  {
    title: 'Corrective action',
    question: 'Who is acting, and on what?',
    text: 'A state below Assured opens a corrective action with an owner. The action is carried within granted access and through the enterprise’s change process, and it stays open until closure is verified.',
    points: [
      'Begins at Degrading, before the threshold is breached',
      'Decisions that belong to the business are recorded with owner and expiry',
      'Recurring causes are tracked so they can be engineered out',
    ],
  },
  {
    title: 'Verified closure',
    question: 'Does the re-test show the outcome is met?',
    text: 'Closure is a test result. The check that detected the loss is run again against the corrected system. Only a pass closes the action, and the pass is stored as new evidence.',
    points: [
      'Deployment of a fix is not closure',
      'A closed ticket is not closure',
      'Closure returns as a new signal, so regression reopens the same record',
    ],
  },
];

export const designPrinciples = [
  {
    title: 'Deterministic before probabilistic',
    text: 'Where a condition can be checked by rule, it is checked by rule. Model-based judgement is used where rules cannot reach, and its own reliability is measured.',
  },
  {
    title: 'Read before write',
    text: 'The engine needs to observe far more than it needs to change. Standing access is read-only, and any change is a separate, approved, time-limited act.',
  },
  {
    title: 'Evidence stays with the enterprise',
    text: 'Evidence is held in the enterprise’s own jurisdiction and infrastructure. The engine works on the enterprise’s data where it lives.',
  },
  {
    title: 'Unknown is never a pass',
    text: 'The absence of evidence produces the state Unassured. Nothing is reported as acceptable because nothing was measured.',
  },
  {
    title: 'Every state is explainable',
    text: 'Any state, current or past, can be traced to the evidence and the threshold version that produced it.',
  },
  {
    title: 'Nothing that cannot be handed back',
    text: 'Thresholds, evidence and action records are the enterprise’s property in open formats, so a transition out is possible at any time.',
  },
];
