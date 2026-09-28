/**
 * Content for /why-assurance: the argument that assurance has to come before
 * capability, made for four kinds of system. Each kind has its own page in
 * the insights collection, which carries the sources.
 *
 * Statements are general and describe the method. Nothing names a customer,
 * a result, a duration or a figure.
 */

import type { AssuranceState } from './assurances.ts';
import type { ClusterKey } from './clusters.ts';

export type WhyFigureKind = 'agent' | 'model' | 'modern' | 'critical';

/** Two orders of work, step by step. The mark is the state at that step. */
export interface OrderTrack {
  name: string;
  steps: { label: string; state: AssuranceState }[];
  verdict: string;
  own?: boolean;
}

export const orders: OrderTrack[] = [
  {
    name: 'Capability first',
    steps: [
      { label: 'Build', state: 'unassured' },
      { label: 'Launch', state: 'unassured' },
      { label: 'Rely', state: 'unassured' },
      { label: 'Incident', state: 'risk' },
      { label: 'Prove', state: 'assured' },
    ],
    verdict: 'Proof arrives after the harm.',
  },
  {
    name: 'Assurance first',
    steps: [
      { label: 'Agree', state: 'unassured' },
      { label: 'Build', state: 'unassured' },
      { label: 'Prove', state: 'assured' },
      { label: 'Rely', state: 'assured' },
      { label: 'Re-prove', state: 'assured' },
    ],
    verdict: 'Reliance begins after the proof.',
    own: true,
  },
];

export interface SystemKind {
  key: WhyFigureKind;
  name: string;
  /** Slug of the page that makes the argument in full. */
  slug: string;
  /** The reason, in a few words. */
  reason: string;
  line: string;
  can: string;
  stake: string;
  assumed: string;
  prove: string[];
  areas: ClusterKey[];
}

export const systemKinds: SystemKind[] = [
  {
    key: 'agent',
    name: 'Agentic AI',
    slug: 'why-agentic-ai-needs-assurance',
    reason: 'It acts',
    line: 'An agent does not hand an answer to a person to check. It calls tools, holds permissions and changes other systems.',
    can: 'Read, decide and carry out a task across several systems, with no person in between.',
    stake: 'An error is no longer a wrong sentence. It is a payment made, a record changed or an access granted.',
    assumed: 'That the permissions it had at launch are the permissions it has now, and that someone could stop it.',
    prove: [
      'What it is permitted to do, against what it was approved to do',
      'What it did, action by action, attributable to the agent',
      'That a person can intervene, shown by test and not only by design',
      'That the tools it calls are the tools that were reviewed',
    ],
    areas: ['ai', 'cyber', 'change'],
  },
  {
    key: 'model',
    name: 'AI models',
    slug: 'why-ai-models-need-assurance',
    reason: 'It moves without you',
    line: 'A model is a dependency you do not control. Its version, its behaviour and its price change on someone else’s calendar.',
    can: 'Produce answers, summaries and decisions that were never written down as rules.',
    stake: 'Quality and cost both shift with no change on your side, and nothing fails visibly when they do.',
    assumed: 'That the evaluation passed at launch still describes the system in production.',
    prove: [
      'Which model version, prompt and data the last passing result was taken on',
      'That answers on live traffic still meet the quality the business approved',
      'That a successor is tested before the current model is withdrawn',
      'That each successful outcome still costs less than it is worth',
    ],
    areas: ['ai', 'data', 'value'],
  },
  {
    key: 'modern',
    name: 'Modern systems',
    slug: 'why-modern-systems-need-assurance',
    reason: 'It is never finished',
    line: 'A cloud system is assembled from services, components and platforms that each change on a calendar you do not set.',
    can: 'Release many times between any two reviews, and reconfigure itself by automation.',
    stake: 'What was reviewed and what is running drift apart, and the first sign is an incident.',
    assumed: 'That the running system still matches what was designed, tested and approved.',
    prove: [
      'That what is running matches what was declared',
      'That every platform in use is still inside its support window',
      'That the last release can be reversed, shown by exercise',
      'That service levels are met on the journeys customers use',
    ],
    areas: ['reliability', 'change', 'cyber'],
  },
  {
    key: 'critical',
    name: 'Critical systems',
    slug: 'why-critical-systems-need-assurance',
    reason: 'It cannot be wrong',
    line: 'For the systems a business cannot operate without, the people who ask for proof sit outside engineering.',
    can: 'Carry the payments, claims, records and platforms the business runs on.',
    stake: 'Failure is a harm to customers, a supervisory finding or the loss of the ability to trade.',
    assumed: 'That the recovery plan works, that access is as it was reviewed, and that the data is intact.',
    prove: [
      'That recovery completes inside the time the business can tolerate, by timed test',
      'That privileged access is held only by those whose role still needs it',
      'That data arrives complete and unaltered',
      'That the evidence exists on the day it is asked for',
    ],
    areas: ['reliability', 'cyber', 'data'],
  },
];

/** What "first" means in practice. */
export const firsts = [
  {
    title: 'Before it is relied on',
    text: 'What must stay true is agreed, and the present state is measured, before the business depends on the system.',
  },
  {
    title: 'At every change',
    text: 'Proof is taken again whenever the system, its platform or its provider changes. A change is the moment proof expires.',
  },
  {
    title: 'Before anyone asks',
    text: 'The evidence is held continuously, so it already exists on the day a board, a supervisor or a customer asks for it.',
  },
];

/** The four objections heard most often, each with its answer. */
export const objections = [
  {
    says: 'We already monitor everything.',
    answer:
      'Monitoring shows what a system is doing. It does not hold a limit the business agreed, and it does not own the fix. A dashboard no one is answerable for is a record of the failure, not a defence against it.',
  },
  {
    says: 'We passed the audit.',
    answer:
      'An audit gives an opinion on a period that has ended, and the system has changed since. Assurance holds the position between audits, which is where the business operates.',
  },
  {
    says: 'We will add assurance after launch.',
    answer:
      'After launch the system is relied on, and each day of reliance without proof is risk that no one has agreed to carry. The first baseline is simplest before go-live, while what must be true is still being decided.',
  },
  {
    says: 'Our teams test before every release.',
    answer:
      'They should. A release test proves the release. It does not cover what changes between releases: a provider withdrawing a model, a platform leaving support, a permission added by hand.',
  },
];
