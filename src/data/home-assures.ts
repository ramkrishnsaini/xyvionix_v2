/**
 * Data for two sections on the home page:
 *
 *   forces   why the category exists: six ways proof expires after go-live
 *   areas    what Xyvionix assures: six outcomes, each with what is held
 *
 * Titles and texts of the forces are the wording of the frozen theme, taken
 * from `assurances.ts`. What is added here is the consequence for the
 * business and the assurance area that answers it. Nothing names a customer,
 * a result or a figure.
 */

import type { ClusterKey } from './clusters.ts';

export type ForceShape = 'step' | 'drift' | 'reopen' | 'fade' | 'curve' | 'stairs';

export interface Force {
  /** Matches a title in `whyAssuranceIsLost`. */
  title: string;
  cluster: ClusterKey;
  shape: ForceShape;
  /** What the business meets when this goes unnoticed. */
  cost: string;
}

export const forces: Force[] = [
  {
    title: 'AI changes',
    cluster: 'ai',
    shape: 'step',
    cost: 'A customer receives a wrong answer, and no one can say when it started.',
  },
  {
    title: 'Infrastructure drifts',
    cluster: 'reliability',
    shape: 'drift',
    cost: 'Recovery fails on the one day it is needed.',
  },
  {
    title: 'Threats evolve',
    cluster: 'cyber',
    shape: 'reopen',
    cost: 'A risk reported to the board as closed is open again.',
  },
  {
    title: 'Data degrades',
    cluster: 'data',
    shape: 'fade',
    cost: 'Decisions are taken, with full confidence, on data that is late or wrong.',
  },
  {
    title: 'Economics move',
    cluster: 'value',
    shape: 'curve',
    cost: 'Margin erodes before the invoice explains why.',
  },
  {
    title: 'Change accumulates',
    cluster: 'change',
    shape: 'stairs',
    cost: 'A release cannot be reversed at the moment it has to be.',
  },
];

export interface AssuredArea {
  cluster: ClusterKey;
  /** Three things held against a threshold. */
  held: [string, string, string];
  /** Who in the enterprise it answers to. */
  answersTo: string;
  /** Slugs of pages inside the area, in the order shown. */
  covers: string[];
}

export const assuredAreas: AssuredArea[] = [
  {
    cluster: 'ai',
    held: ['Answers correct and grounded', 'Safety boundaries intact', 'Cost per answer within budget'],
    answersTo: 'Head of AI, CTO, CISO',
    covers: ['production-rag-assurance', 'llm-evaluation-assurance', 'model-change-assurance', 'ai-agent-assurance'],
  },
  {
    cluster: 'reliability',
    held: ['Service levels met', 'Recovery timed by test', 'Environments match what was approved'],
    answersTo: 'CTO, VP Platform, Head of SRE',
    covers: ['slo-assurance', 'disaster-recovery-assurance', 'cloud-drift-assurance', 'kubernetes-reliability-assurance'],
  },
  {
    cluster: 'cyber',
    held: ['Identity and privilege within bounds', 'Cloud configuration as intended', 'Remediation closed on re-test'],
    answersTo: 'CISO, Technology Risk',
    covers: [
      'identity-exposure-assurance',
      'privileged-access-assurance',
      'vulnerability-remediation-assurance',
      'secrets-exposure-assurance',
    ],
  },
  {
    cluster: 'value',
    held: ['Unit cost within what the business agreed', 'Commitments used as bought', 'Anomalies answered in time'],
    answersTo: 'CIO, CTO, CFO office',
    covers: ['cloud-cost-assurance', 'unit-economics-assurance', 'ai-cost-assurance'],
  },
  {
    cluster: 'data',
    held: ['Data as fresh as the decision needs', 'Complete and correct', 'Pipelines deliver on time'],
    answersTo: 'Chief Data Officer, Head of AI',
    covers: ['data-freshness-assurance', 'data-quality-assurance', 'data-pipeline-assurance'],
  },
  {
    cluster: 'change',
    held: ['Release evidence complete', 'Change failure rate within threshold', 'Rollback proven to work'],
    answersTo: 'VP Engineering, VP Platform',
    covers: ['release-assurance', 'rollback-readiness-assurance', 'model-change-assurance'],
  },
];
