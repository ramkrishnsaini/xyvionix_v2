/**
 * Data behind the three explanatory figures on the home page.
 *
 * Everything here is illustrative. It explains the model; it is not a
 * measurement of any system, and every figure is labelled to say so.
 */

import type { AssuranceState } from './assurances.ts';
import type { ClusterKey } from './clusters.ts';

/** One row of the assurance board: what is held, and what makes the proof expire. */
export interface BoardRow {
  cluster: ClusterKey;
  holds: string;
  expires: string;
  /** Illustrative state, chosen so the board shows all four states. */
  state: AssuranceState;
}

export const boardRows: BoardRow[] = [
  {
    cluster: 'ai',
    holds: 'Answers stay correct, safe and within cost',
    expires: 'A model is retired, a prompt changes or the corpus goes stale',
    state: 'assured',
  },
  {
    cluster: 'reliability',
    holds: 'Service levels and recovery hold under real conditions',
    expires: 'An environment drifts or a platform version leaves support',
    state: 'assured',
  },
  {
    cluster: 'cyber',
    holds: 'What was closed has stayed closed',
    expires: 'An exception is added or a fix is rebuilt away',
    state: 'degrading',
  },
  {
    cluster: 'value',
    holds: 'Spend stays tied to the outcome it buys',
    expires: 'Usage, pricing or architecture moves the unit cost',
    state: 'risk',
  },
  {
    cluster: 'data',
    holds: 'Data is fresh and fit for the decision',
    expires: 'A source changes, a pipeline lags or a field shifts meaning',
    state: 'assured',
  },
  {
    cluster: 'change',
    holds: 'Each release is safe to ship and to reverse',
    expires: 'A migration removes the way back',
    state: 'unassured',
  },
];

/** Signal shapes for the board, drawn against a threshold at y = 28 in a 160 x 44 box. */
export const boardTraces: Record<AssuranceState, string> = {
  assured: '0,14 16,10 32,15 48,9 64,13 80,10 96,7 112,12 128,9 144,6 160,9',
  degrading: '0,7 16,8 32,8 48,11 64,13 80,15 96,18 112,20 128,22 144,24 160,25',
  risk: '0,9 16,11 32,14 48,18 64,23 80,28 96,33 112,35 128,37 144,36 160,38',
  unassured: '0,13 16,11 32,14 48,12 64,15',
};

export type Answer = 'yes' | 'part' | 'no';

export interface MatrixRow {
  capability: string;
  detail: string;
  /** Monitoring, periodic audit, managed service, continuous assurance. */
  answers: [Answer, Answer, Answer, Answer];
}

export const matrixColumns = ['Monitoring', 'Periodic audit', 'Managed service', 'Continuous assurance'] as const;

export const matrixRows: MatrixRow[] = [
  {
    capability: 'Observes the running system',
    detail: 'Reads what the system is doing now',
    answers: ['yes', 'part', 'yes', 'yes'],
  },
  {
    capability: 'Tests against a threshold the business agreed',
    detail: 'Not an engineering default or a service description',
    answers: ['no', 'part', 'part', 'yes'],
  },
  {
    capability: 'Retains evidence for examination',
    detail: 'Attributable to a version and a point in time',
    answers: ['part', 'yes', 'part', 'yes'],
  },
  {
    capability: 'Holds a current state',
    detail: 'A statement about today, not about a period that has ended',
    answers: ['part', 'no', 'no', 'yes'],
  },
  {
    capability: 'Re-proves after every change',
    detail: 'A release, a model update or a vendor change expires the proof',
    answers: ['no', 'no', 'no', 'yes'],
  },
  {
    capability: 'Owns the correction',
    detail: 'Carries it to completion instead of handing back a finding',
    answers: ['no', 'no', 'part', 'yes'],
  },
  {
    capability: 'Closes only on re-test',
    detail: 'Closure is a test result, not a ticket status',
    answers: ['no', 'no', 'no', 'yes'],
  },
];

export const answerLabels: Record<Answer, string> = {
  yes: 'Yes',
  part: 'In part',
  no: 'No',
};
