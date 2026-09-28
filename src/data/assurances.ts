/**
 * The assurance model itself: states, engine stages, operating stages and
 * what the business receives. Wording is taken from the frozen theme.
 */

export type AssuranceState = 'assured' | 'degrading' | 'risk' | 'unassured';

export interface StateDefinition {
  key: AssuranceState;
  label: string;
  /** How the mark is drawn, so the state is legible without colour. */
  mark: string;
  meaning: string;
}

export const states: StateDefinition[] = [
  {
    key: 'assured',
    label: 'Assured',
    mark: 'Solid square',
    meaning: 'Current evidence proves the outcome is being met within threshold.',
  },
  {
    key: 'degrading',
    label: 'Degrading',
    mark: 'Striped square',
    meaning: 'Evidence shows movement toward the threshold. Corrective action begins here.',
  },
  {
    key: 'risk',
    label: 'At risk',
    mark: 'Hollow square',
    meaning: 'Threshold breached. The outcome can no longer be proven as agreed.',
  },
  {
    key: 'unassured',
    label: 'Unassured',
    mark: 'Dashed square',
    meaning: 'No current evidence exists. The system’s condition is unknown, not acceptable.',
  },
];

export const stateByKey = Object.fromEntries(states.map((s) => [s.key, s])) as Record<AssuranceState, StateDefinition>;

export interface Stage {
  title: string;
  text: string;
  state?: AssuranceState;
}

export const engineStages: Stage[] = [
  { title: 'Signals', text: 'Telemetry, configuration, cost and usage drawn from the estate.', state: 'assured' },
  { title: 'Evidence', text: 'Tested, retained and attributable to a point in time.', state: 'assured' },
  { title: 'Thresholds', text: 'Agreed with the business, not set by engineering convention.', state: 'assured' },
  { title: 'State', text: 'Current rather than historical. Held, not reported.', state: 'assured' },
  {
    title: 'Corrective action',
    text: 'Owned through to completion, not escalated back to the client.',
    state: 'degrading',
  },
  { title: 'Verified closure', text: 'Re-tested before it is closed. Closure returns as new signal.', state: 'assured' },
];

export const operatingStages: Stage[] = [
  {
    title: 'Baseline',
    text: 'The outcome is defined in the enterprise’s own terms, thresholds are agreed, and the present condition is measured and recorded.',
  },
  {
    title: 'Assure',
    text: 'Evidence is gathered continuously and tested against the thresholds. State is maintained as a current fact rather than a periodic report.',
  },
  {
    title: 'Correct',
    text: 'Where assurance is lost, remediation is owned by Xyvionix and carried through to closure that is verified, not asserted.',
  },
  {
    title: 'Improve',
    text: 'Thresholds are raised as the business requires more, and the causes of recurring loss are engineered out rather than re-remediated.',
  },
];

export const outcomes: Stage[] = [
  {
    title: 'Proof',
    text: 'A current answer to whether the outcome can still be proven, available at any moment, not at quarter end.',
  },
  {
    title: 'Evidence',
    text: 'Proof that survives executive review, internal audit and external examination without reconstruction.',
  },
  {
    title: 'Corrective ownership',
    text: 'Remediation carried by Xyvionix and continued until closure is verified, not a finding handed back to the client.',
  },
  {
    title: 'Accountability',
    text: 'Someone answerable when the evidence fails, against thresholds the business agreed, not against activity performed.',
  },
];

export const whyAssuranceIsLost: Stage[] = [
  { title: 'AI changes', text: 'Models, data, routing and retrieved context shift beneath a system that was correct when it launched.' },
  { title: 'Infrastructure drifts', text: 'Reliability and environment parity erode quietly unless they are continuously verified.' },
  { title: 'Threats evolve', text: 'An exposure closed last quarter does not stay closed. Controls decay as estates change.' },
  { title: 'Data degrades', text: 'Freshness and quality drift without visible failure. Systems keep answering, less correctly.' },
  { title: 'Economics move', text: 'Unit cost changes continuously as usage, pricing and architecture evolve.' },
  { title: 'Change accumulates', text: 'Every release introduces new operating assumptions that no one revisits.' },
];
