/**
 * Data for the Industries section on the home page, keyed by the slug of the
 * primary industry page.
 *
 * Each entry restates what its industry page already says: the question it
 * answers, what has to stay proven, and who asks for the proof. Nothing here
 * names a customer, a result or a figure.
 */

import type { ClusterKey } from './clusters.ts';

export type IndustryFigureKind = 'tolerance' | 'decision' | 'care' | 'margin';

export interface HomeIndustry {
  slug: string;
  figure: IndustryFigureKind;
  /** The question a leader in the sector has to be able to answer. */
  question: string;
  /** What happens to the business when the proof is missing. */
  stake: string;
  /** Three things that have to stay proven. */
  proven: [string, string, string];
  /** Who asks for the proof. */
  asks: string;
  /** What the business holds as a result. */
  outcome: string;
  /** Assurance areas that carry most weight in the sector. */
  focus: ClusterKey[];
  /** Slug of the deeper page for the sector. */
  deeper: string;
}

export const homeIndustries: HomeIndustry[] = [
  {
    slug: 'financial-services',
    figure: 'tolerance',
    question: 'Can resilience and control be evidenced on demand?',
    stake: 'A resilience claim that cannot be shown on the day it is asked for becomes a supervisory finding.',
    proven: [
      'Important services recover inside the tolerance the business set',
      'Third-party registers still describe production',
      'Privileged access matches current roles',
    ],
    asks: 'Supervisors, internal audit and the board',
    outcome: 'A tested result with a date on it, ready on the day a supervisor asks.',
    focus: ['reliability', 'cyber', 'ai'],
    deeper: 'financial-services-ai-assurance',
  },
  {
    slug: 'insurance',
    figure: 'decision',
    question: 'Can a model decision be explained after the model has changed?',
    stake: 'A decision that cannot be reconstructed after the model has changed cannot be defended when it is disputed.',
    proven: [
      'Every decision keeps its inputs, model version and data version',
      'Pricing data is as fresh as the risk requires',
      'Claims platforms hold at the volume of a peak event',
    ],
    asks: 'A policyholder in dispute, a regulator and the actuarial function',
    outcome: 'A decision that can be explained years later, from records made on the day.',
    focus: ['ai', 'data', 'reliability'],
    deeper: 'insurance-claims-ai-assurance',
  },
  {
    slug: 'healthcare',
    figure: 'care',
    question: 'Can integrity, access and uptime be proven where care depends on them?',
    stake: 'A lost system, a wrong value or an unreviewed access grant reaches a patient before it reaches a report.',
    proven: [
      'Clinical systems restore inside the time care can tolerate',
      'Access to protected health information matches current roles',
      'Data arrives intact across every interface',
    ],
    asks: 'Clinical leadership, regulators and information governance',
    outcome: 'Recovery, access and integrity held as current, tested evidence.',
    focus: ['data', 'cyber', 'reliability'],
    deeper: 'healthcare-ai-assurance',
  },
  {
    slug: 'software-technology',
    figure: 'margin',
    question: 'Do reliability and unit cost still support the margin?',
    stake: 'When production is the product, a missed service level and a rising cost to serve both come out of revenue.',
    proven: [
      'The service meets the levels it was sold at',
      'Cost to serve each customer stays inside what the price assumes',
      'Evidence given to enterprise buyers still describes production',
    ],
    asks: 'Enterprise buyers, investors and the finance function',
    outcome: 'Service levels and unit cost proven between audits and renewals.',
    focus: ['reliability', 'value', 'change'],
    deeper: 'saas-production-reliability',
  },
];
