/**
 * Content for /assurance, the page that explains why, what and how Xyvionix
 * assures, in the order a buyer asks.
 *
 * This page is the detailed account. Nothing on it repeats a figure or a
 * paragraph from the home page: the home page shows the idea, this page shows
 * the working. Detail for each area is read from that area's own page.
 *
 * Statements describe the method and the operating model. Nothing names a
 * customer, a result, a duration or a figure. Worked examples are scenarios
 * and are written as scenarios.
 */

import type { AssuranceState } from './assurances.ts';
import type { ClusterKey } from './clusters.ts';

export interface Chapter {
  id: string;
  label: string;
}

export const chapters: Chapter[] = [
  { id: 'why', label: 'Why' },
  { id: 'what', label: 'What' },
  { id: 'how', label: 'How' },
  { id: 'states', label: 'States' },
  { id: 'receive', label: 'What you receive' },
  { id: 'compare', label: 'How it compares' },
  { id: 'start', label: 'How to start' },
];

/* --------------------------------------------------------------- hero */

/** What Xyvionix does, in three steps. Shown in the hero. */
export interface HeroStep {
  title: string;
  text: string;
  state: AssuranceState;
}

export const heroSteps: HeroStep[] = [
  {
    title: 'You set the limit',
    text: 'What has to stay true, and how far it may move, in your own terms.',
    state: 'unassured',
  },
  {
    title: 'Xyvionix proves it',
    text: 'Tested against that limit, and tested again each time something changes.',
    state: 'assured',
  },
  {
    title: 'Xyvionix puts it right',
    text: 'When a test falls short, the fix is carried until the same test passes.',
    state: 'assured',
  },
];

/* ---------------------------------------------------------------- 01 why */

/** Evidence most enterprises already hold, what it proves and what expires it. */
export interface ShelfItem {
  evidence: string;
  proves: string;
  expires: string;
  /** Share of the bar that is still solid, 0 to 100. Drawn, not measured. */
  valid: number;
}

export const shelf: ShelfItem[] = [
  {
    evidence: 'Launch review',
    proves: 'The system met its acceptance criteria on the day it went live',
    expires: 'The first release after go-live',
    valid: 14,
  },
  {
    evidence: 'AI evaluation',
    proves: 'One model, one prompt and one corpus answered correctly',
    expires: 'The model, prompt, data or tools change',
    valid: 26,
  },
  {
    evidence: 'Recovery test',
    proves: 'A restore completed inside its target, once',
    expires: 'The environment, the data volume or the platform version changes',
    valid: 44,
  },
  {
    evidence: 'Security test',
    proves: 'Which exposures existed when the test was run',
    expires: 'A deployment, a permission or an exception is added',
    valid: 32,
  },
  {
    evidence: 'Access review',
    proves: 'Entitlements matched roles on the review date',
    expires: 'People, roles or integrations change',
    valid: 38,
  },
  {
    evidence: 'Cost model',
    proves: 'Unit cost at the usage and price assumed at launch',
    expires: 'Usage, pricing or architecture moves',
    valid: 52,
  },
];

/** How a business learns that a system has stopped meeting its outcome. */
export interface Discovery {
  from: string;
  text: string;
  state: AssuranceState;
  own?: boolean;
}

export const discoveries: Discovery[] = [
  {
    from: 'From a customer',
    text: 'The failure reaches the people the system serves before it reaches the people who run it.',
    state: 'risk',
  },
  {
    from: 'From an auditor',
    text: 'The evidence offered describes a system that has since changed.',
    state: 'unassured',
  },
  {
    from: 'From an incident',
    text: 'The recovery, the rollback or the control is tested for the first time on the day it is needed.',
    state: 'risk',
  },
  {
    from: 'From the evidence',
    text: 'Movement toward the threshold is seen first, while there is still time to correct it.',
    state: 'assured',
    own: true,
  },
];

/* --------------------------------------------------------------- 02 what */

/** Three systems that a single health score would call healthy. */
export interface SeparateCase {
  name: string;
  verdict: string;
  /** State of each outcome, in cluster order. */
  states: Record<ClusterKey, AssuranceState>;
}

export const separateOrder: ClusterKey[] = ['ai', 'reliability', 'cyber', 'value', 'data', 'change'];

export const separateCases: SeparateCase[] = [
  {
    name: 'Reliable and unaffordable',
    verdict: 'Every service level is met. The cost of meeting them has passed what the price assumes.',
    states: { ai: 'assured', reliability: 'assured', cyber: 'assured', value: 'risk', data: 'assured', change: 'assured' },
  },
  {
    name: 'Secure and wrong',
    verdict: 'No open exposure. The answers it gives have drifted since the model behind it changed.',
    states: { ai: 'degrading', reliability: 'assured', cyber: 'assured', value: 'assured', data: 'assured', change: 'unassured' },
  },
  {
    name: 'Tested and stale',
    verdict: 'It passes every evaluation. The data it retrieves is three weeks old.',
    states: { ai: 'assured', reliability: 'assured', cyber: 'assured', value: 'assured', data: 'risk', change: 'assured' },
  },
];

/* ---------------------------------------------------------------- 03 how */

/** One outcome followed through a change, from agreement to verified closure. */
export interface JourneyStep {
  title: string;
  who: string;
  text: string;
  state: AssuranceState;
}

export const journeyScenario =
  'Take a customer-facing AI assistant that must answer correctly from current policy documents. This is what happens to that one outcome when the model behind it changes.';

export const journey: JourneyStep[] = [
  {
    title: 'Agree',
    who: 'The business, with Xyvionix',
    text: 'The outcome is stated in business terms. A threshold is agreed and given a named owner.',
    state: 'unassured',
  },
  {
    title: 'Baseline',
    who: 'Xyvionix',
    text: 'The running system is tested against the threshold. The state is recorded for the first time.',
    state: 'assured',
  },
  {
    title: 'Change',
    who: 'The model provider',
    text: 'A model version is retired. Evidence gathered on the old version no longer describes production.',
    state: 'unassured',
  },
  {
    title: 'Re-prove',
    who: 'Xyvionix',
    text: 'The affected checks are run again on the changed system. Answer quality has moved toward the threshold.',
    state: 'degrading',
  },
  {
    title: 'Correct',
    who: 'Xyvionix, through your change process',
    text: 'The cause is traced and the correction is carried through your own approval. Your team keeps control of production.',
    state: 'degrading',
  },
  {
    title: 'Verify',
    who: 'Xyvionix',
    text: 'The check that found the problem is run again and passes. Closure is a test result, not a ticket status.',
    state: 'assured',
  },
];

/** What each stage of the loop takes in and hands on. */
export interface FlowStage {
  stage: string;
  takes: string;
  gives: string;
}

export const flow: FlowStage[] = [
  {
    stage: 'Signals',
    takes: 'Telemetry, configuration, cost and change events, read where they already are',
    gives: 'A reading of the running system',
  },
  {
    stage: 'Evidence',
    takes: 'A reading, and a check that could have failed',
    gives: 'A tested result, dated and tied to a system version',
  },
  {
    stage: 'Thresholds',
    takes: 'The consequence of being wrong, stated by the business',
    gives: 'A boundary with a basis, an owner and a review date',
  },
  {
    stage: 'State',
    takes: 'The evidence and the threshold that applies to it',
    gives: 'One of four states, derived by rule and current',
  },
  {
    stage: 'Corrective action',
    takes: 'Any state below Assured',
    gives: 'A correction with an owner, carried through your change process',
  },
  {
    stage: 'Verified closure',
    takes: 'The corrected system, and the check that found the loss',
    gives: 'A passing re-test, stored as new evidence',
  },
];

/** Who does what at each stage of an engagement. */
export interface Responsibility {
  stage: string;
  business: string;
  teams: string;
  xyvionix: string;
}

export const responsibilities: Responsibility[] = [
  {
    stage: 'Baseline',
    business: 'States the outcome and agrees the threshold',
    teams: 'Grant read access and point to the signals',
    xyvionix: 'Measures the present state and records it',
  },
  {
    stage: 'Assure',
    business: 'Holds a current state for each outcome',
    teams: 'Build and run the systems, as before',
    xyvionix: 'Gathers evidence and tests it against the threshold',
  },
  {
    stage: 'Correct',
    business: 'Takes the decisions that belong to it, each with an owner and an expiry',
    teams: 'Approve each change through their own process',
    xyvionix: 'Owns the correction until a re-test passes',
  },
  {
    stage: 'Improve',
    business: 'Raises a threshold when it requires more',
    teams: 'Remove at source the causes that recur',
    xyvionix: 'Tracks recurrence, so the same loss is not corrected twice',
  },
];

/* ------------------------------------------------------------- 04 states */

export interface StateDetail {
  state: AssuranceState;
  setWhen: string;
  then: string;
  leavesWhen: string;
}

export const stateDetails: StateDetail[] = [
  {
    state: 'assured',
    setWhen: 'Current evidence passes against the agreed threshold.',
    then: 'Evidence keeps being gathered. Nothing is carried forward from the last pass.',
    leavesWhen: 'Evidence moves toward the threshold, ages out, or a change invalidates it.',
  },
  {
    state: 'degrading',
    setWhen: 'Evidence still passes, and is moving toward the threshold.',
    then: 'The owner of the threshold is told and a correction opens, while there is time to act.',
    leavesWhen: 'A re-test shows the movement has been reversed.',
  },
  {
    state: 'risk',
    setWhen: 'The threshold is breached.',
    then: 'The correction is carried through your change process, with its cause recorded.',
    leavesWhen: 'The check that found the breach passes on the corrected system.',
  },
  {
    state: 'unassured',
    setWhen: 'Evidence is missing, older than its validity, or invalidated by a change.',
    then: 'The evidence is gathered again. Until then, nothing is reported as acceptable.',
    leavesWhen: 'A fresh test returns a result, whether pass or fail.',
  },
];

/* ------------------------------------------------------------ 05 receive */

/** The four records an enterprise holds. They are its property. */
export interface RecordCard {
  name: string;
  answers: string;
  fields: string[];
  usedBy: string;
}

export const records: RecordCard[] = [
  {
    name: 'Current state',
    answers: 'Is it still proven, today?',
    fields: ['Outcome', 'State', 'Evidence that set it', 'Time of the last change'],
    usedBy: 'Executives and the board',
  },
  {
    name: 'Evidence record',
    answers: 'What was tested, and when?',
    fields: ['What was tested', 'System version', 'Time and method', 'Result'],
    usedBy: 'Internal audit and external examiners',
  },
  {
    name: 'Threshold register',
    answers: 'Who decided the boundary, and on what basis?',
    fields: ['Signal', 'Basis', 'Named owner', 'Review date'],
    usedBy: 'Risk, and the business owners who set them',
  },
  {
    name: 'Correction record',
    answers: 'What went wrong, and is it really closed?',
    fields: ['Cause', 'Correction made', 'Re-test that closed it', 'Recurrence'],
    usedBy: 'Engineering and security leadership',
  },
];

/** The question each leader is asked, and what assurance lets them answer. */
export interface Role {
  who: string;
  asked: string;
  answer: string;
  cluster: ClusterKey;
}

export const roles: Role[] = [
  {
    who: 'CIO and CTO',
    asked: 'Is the technology the business runs on still doing what we approved?',
    answer: 'A current state for each critical outcome, available at any moment and not at quarter end.',
    cluster: 'reliability',
  },
  {
    who: 'CISO',
    asked: 'Is what we closed still closed?',
    answer: 'Closure proven by re-test, with the evidence retained for examination.',
    cluster: 'cyber',
  },
  {
    who: 'Head of AI',
    asked: 'Is the AI still correct, safe and affordable after the last change?',
    answer: 'Evaluations run again whenever the model, prompt, data or tools change.',
    cluster: 'ai',
  },
  {
    who: 'CFO office',
    asked: 'Is the spend still buying the outcome we agreed to pay for?',
    answer: 'Unit cost held to a threshold, with correction owned until the spend itself changes.',
    cluster: 'value',
  },
  {
    who: 'Chief Data Officer',
    asked: 'Can the data behind the decision be relied on today?',
    answer: 'Freshness, quality and delivery held to the tolerance of the decision that uses the data.',
    cluster: 'data',
  },
  {
    who: 'VP Engineering',
    asked: 'Can we ship at this pace and still reverse a release?',
    answer: 'Release evidence and rollback held as thresholds, not reviewed after an incident.',
    cluster: 'change',
  },
];

/* ------------------------------------------------------------ 06 compare */

/** One event, and what each practice does about it. */
export const compareEvent =
  'A security fix is in place and recorded as closed. A later rebuild of the environment removes it.';

export interface Practice {
  name: string;
  notices: string;
  does: string;
  endsWhen: string;
  /** Where along the line the event is noticed, 0 to 100. Drawn, not measured. */
  at: number;
  /** Whether noticing depends on something having been set up in advance. */
  conditional?: boolean;
  own?: boolean;
}

export const practices: Practice[] = [
  {
    name: 'Monitoring',
    notices: 'Only if an alert was written for this condition',
    does: 'Raises an alert',
    endsWhen: 'The alert clears',
    at: 30,
    conditional: true,
  },
  {
    name: 'Periodic audit',
    notices: 'At the next audit, as a sample',
    does: 'Reports a finding',
    endsWhen: 'A management response is recorded',
    at: 88,
  },
  {
    name: 'Managed service',
    notices: 'When someone raises a ticket',
    does: 'Works the ticket',
    endsWhen: 'The ticket is closed',
    at: 62,
    conditional: true,
  },
  {
    name: 'Continuous assurance',
    notices: 'At the first check after the rebuild',
    does: 'Moves the state, and owns the correction',
    endsWhen: 'A re-test shows the exposure is closed',
    at: 12,
    own: true,
  },
];

/* -------------------------------------------------------------- 07 start */

export interface StartStep {
  title: string;
  text: string;
}

export const startSteps: StartStep[] = [
  {
    title: 'Choose one outcome',
    text: 'One outcome that matters and one system that delivers it. Assurance does not begin with an estate-wide assessment.',
  },
  {
    title: 'Agree what must be true',
    text: 'The threshold is set by the consequence of being wrong, and it has a named owner in the business who can change it.',
  },
  {
    title: 'Establish the baseline',
    text: 'The present state is measured. It shows what you can already prove, what you believe but cannot prove, and what no one has measured.',
  },
  {
    title: 'Hold it under assurance',
    text: 'Evidence is gathered continuously. When it falls short, Xyvionix owns the correction until a re-test passes.',
  },
];
