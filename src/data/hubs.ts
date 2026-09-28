/** Editorial structure for the hub pages. Hubs explain the grouping; they are not directories. */

import type { ExtendedClusterKey } from './clusters.ts';

export interface UseCaseGroup {
  key: string;
  /** Short label for the filter control. */
  short: string;
  clusters: ExtendedClusterKey[];
  title: string;
  text: string;
}

/** Use cases are grouped by what changed, because that is how the problem is first noticed. */
export const useCaseGroups: UseCaseGroup[] = [
  {
    key: 'ai',
    short: 'AI',
    clusters: ['ai'],
    title: 'An AI system is launching, changing or acting',
    text: 'Approval of an AI system is evidence about one model, one prompt, one corpus and one set of tools. Launch, migration, new permissions and rising cost each replace part of what was approved, and the proof has to be re-established against what is now running.',
  },
  {
    key: 'reliability',
    short: 'Reliability',
    clusters: ['reliability'],
    title: 'Production no longer matches what was tested',
    text: 'Recovery plans age, clusters fall out of support, configuration drifts and the same incident returns. Nothing announces these changes. They are found when the capability is needed, which is the worst time to learn it has gone.',
  },
  {
    key: 'cyber',
    short: 'Cyber exposure',
    clusters: ['cyber'],
    title: 'Exposure that was closed has reopened',
    text: 'Access widens by exception. Privilege outlives its purpose. Findings are marked closed when a fix is deployed, not when the exposure is shown to be gone. Each is a gap between the recorded position and the real one.',
  },
  {
    key: 'data-value',
    short: 'Data and value',
    clusters: ['data', 'value'],
    title: 'Data or cost has moved without warning',
    text: 'Pipelines succeed while data goes stale. A schema changes meaning upstream and consumers keep running. Spend rises faster than usage. These failures are silent because the systems involved continue to report success.',
  },
  {
    key: 'change',
    short: 'Change',
    clusters: ['change'],
    title: 'Change itself has become the risk',
    text: 'When too many releases cause incidents, rollbacks or rework, the release process has stopped producing evidence that a change is safe. The question becomes what each release proves before it reaches customers.',
  },
];

export const useCaseQuestions = [
  'What changed?',
  'What business outcome is at risk?',
  'What must be proven?',
  'What evidence is required?',
  'What thresholds matter?',
  'What causes assurance to be lost?',
  'What corrective action follows?',
  'What does verified closure look like?',
  'Which assurance areas apply?',
  'What should happen next?',
];

/** Slugs featured at the top of each hub. A featured page is shown only if it is published. */
export const featured = {
  /** The three articles shown on the home page, matching the frozen theme: AI, reliability, cyber. */
  home: ['why-ai-evaluation-fails-after-launch', 'disaster-recovery-plan-never-tested', 'security-findings-vs-verified-closure'],
  useCases: ['ai-agent-with-write-access', 'untested-disaster-recovery', 'unverified-vulnerability-closure'],
  technologies: ['azure-ai-assurance', 'eks-reliability-assurance', 'entra-id-exposure-assurance'],
  insights: ['assurance-is-a-state-not-a-report', 'why-ai-evaluation-fails-after-launch', 'security-findings-vs-verified-closure'],
};

export interface InsightTheme {
  cluster: ExtendedClusterKey;
  title: string;
  text: string;
  /** The question a business leader is asking, which this research answers. */
  question: string;
  /** What is at stake for the business if the question goes unanswered. */
  stake: string;
}

export const insightThemes: InsightTheme[] = [
  {
    cluster: 'category',
    title: 'The practice of assurance',
    text: 'What separates assurance from monitoring, audit and managed service, and why a current state is a different thing from a periodic report.',
    question: "Can we prove it still works today?",
    stake: "Without a current answer, a leader is asked to sign for a system on the strength of what was true last quarter.",
  },
  {
    cluster: 'ai',
    title: 'AI assurance',
    text: 'How evaluation, retrieval quality, agent permissions and human oversight lose their validity after launch, and what it takes to keep them current.',
    question: "Are the answers still right, safe and affordable?",
    stake: "Quality, safety and cost all move after launch. Someone has to notice before customers do.",
  },
  {
    cluster: 'reliability',
    title: 'Production reliability',
    text: 'Recovery that has never been exercised, error budgets that change nothing, drift, and incidents that return.',
    question: "Will the service recover when it has to?",
    stake: "Availability is what customers bought. The ability to recover has to be shown, not assumed.",
  },
  {
    cluster: 'cyber',
    title: 'Cyber exposure',
    text: 'The gap between a closed finding and a closed exposure, and the ways identity and privilege drift from the policy that describes them.',
    question: "Has what we closed stayed closed?",
    stake: "Risk reported as removed gets no further attention, whether or not it is gone.",
  },
  {
    cluster: 'data',
    title: 'Data assurance',
    text: 'Why data that arrives late or changes meaning is a quality problem for every system that consumes it, AI included.',
    question: "Is the decision based on current data?",
    stake: "Stale data does not fail. It keeps producing answers, and the cost appears later in pricing, reporting and AI output.",
  },
  {
    cluster: 'change',
    title: 'Change assurance',
    text: 'What delivery metrics prove, what they conceal, and how to use them as thresholds rather than scorecards.',
    question: "Is each release safe to ship and to reverse?",
    stake: "Every release is a bet on stability. Without evidence, the pace of change is set by hope and corrected by incidents.",
  },
  {
    cluster: 'value',
    title: 'Technology value',
    text: 'Cost held as an outcome: unit economics for AI and the risk carried by cloud commitments.',
    question: "Is the spend still buying the outcome?",
    stake: "Cost moves with usage, pricing and architecture. Unmeasured, it is discovered at the invoice, after the margin has gone.",
  },
];

export interface IndustryNote {
  slug: string;
  proof: string;
}

/** What continuing proof means in each sector, shown on the industries hub. */
export const industryNotes: IndustryNote[] = [
  {
    slug: 'financial-services',
    proof: 'Resilience and control have to be evidenced on demand, to supervisors and to internal audit, from tests that were run rather than plans that were written.',
  },
  {
    slug: 'insurance',
    proof: 'A decision made by a model has to remain explainable for as long as it can be disputed, which is usually longer than the model stays in service.',
  },
  {
    slug: 'healthcare',
    proof: 'Integrity of clinical data, control of access to it and availability of the systems that hold it have to be shown to hold under real conditions.',
  },
  {
    slug: 'software-technology',
    proof: 'The service level that was sold and the unit cost that supports the margin both have to be proven continuously, because customers and investors ask.',
  },
];

/** The small figure drawn beside an insight. See components/editorial/InsightFigure.astro. */
export type FigureKind = 'expiry' | 'recovery' | 'closure' | 'state' | 'trace';

/** Figures chosen for specific articles, because the figure draws that article's argument. */
export const figureBySlug: Record<string, FigureKind> = {
  'why-ai-evaluation-fails-after-launch': 'expiry',
  'model-retirement-is-a-production-change': 'expiry',
  'disaster-recovery-plan-never-tested': 'recovery',
  'security-findings-vs-verified-closure': 'closure',
  'assurance-is-a-state-not-a-report': 'state',
  'continuous-assurance-vs-monitoring': 'state',
};

/** Fallback by theme for any article without a figure of its own. */
export const figureByCluster: Partial<Record<ExtendedClusterKey, FigureKind>> = {
  ai: 'expiry',
  reliability: 'recovery',
  cyber: 'closure',
  category: 'state',
};

export function figureFor(slug: string, cluster: ExtendedClusterKey): FigureKind {
  return figureBySlug[slug] ?? figureByCluster[cluster] ?? 'trace';
}

/**
 * Why a piece of research matters to the business, for the home page.
 * Written from each piece's own argument. Add an entry when featuring a new one.
 */
export const insightImpact: Record<string, { stake: string; outcome: string }> = {
  'why-ai-evaluation-fails-after-launch': {
    stake: 'An AI system approved at launch can drift into wrong answers with no alert, and the business carries every decision made on them.',
    outcome: 'Know when an approval has stopped being true, before a customer or an auditor finds out first.',
  },
  'disaster-recovery-plan-never-tested': {
    stake: 'A recovery target that was never exercised is a promise to customers and regulators that nobody has tested.',
    outcome: 'Find the gap between the plan and the real recovery in an exercise, not in an outage.',
  },
  'security-findings-vs-verified-closure': {
    stake: 'A finding marked closed is reported upward as risk removed. If the exposure is still open, the business is carrying risk it believes it no longer has.',
    outcome: 'Report closure only when the exposure is shown to be gone.',
  },
  'assurance-is-a-state-not-a-report': {
    stake: 'Leaders decide on the last report. If it no longer describes the system, the decision rests on a past that has ended.',
    outcome: 'Hold a current answer for every outcome that matters, available on the day it is asked for.',
  },
  'continuous-assurance-vs-monitoring': {
    stake: 'Dashboards show activity. They do not say whether the outcome the business agreed is still being met, or who acts when it is not.',
    outcome: 'Know who is answerable for the outcome, not only who is watching the system.',
  },
  'ai-cost-per-business-outcome': {
    stake: 'AI spend can rise faster than the value it produces, and a price per token hides it.',
    outcome: 'Hold the cost of each business outcome against the margin it has to protect.',
  },
};
