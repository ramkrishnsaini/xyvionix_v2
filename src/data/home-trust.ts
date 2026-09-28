/**
 * Data for the Security and trust section on the home page.
 *
 * Every statement restates the operating model in `trust.ts` and
 * `trust-detail.ts`. Nothing here adds a commitment, and nothing claims a
 * certification, an attestation or an audit result.
 */

/** One line across the boundary between Xyvionix and the enterprise. */
export interface TrustChannel {
  key: 'observe' | 'correct' | 'data' | 'exit';
  name: string;
  /** What Xyvionix does. */
  ours: string;
  /** The short term on the line itself. */
  rule: string;
  /** What stays with the enterprise. */
  yours: string;
}

export const trustChannels: TrustChannel[] = [
  {
    key: 'observe',
    name: 'Observe',
    ours: 'Reads signals and configuration from the running system.',
    rule: 'Read-only',
    yours: 'Standing access changes nothing in production.',
  },
  {
    key: 'correct',
    name: 'Correct',
    ours: 'Requests elevation for one change, when a correction needs it.',
    rule: 'Your approval',
    yours: 'You approve it. It is limited in time, recorded and removed afterwards.',
  },
  {
    key: 'data',
    name: 'Data',
    ours: 'Works on data where it lives.',
    rule: 'Stays in place',
    yours: 'Your data remains in your jurisdiction and infrastructure. The evidence is your property.',
  },
  {
    key: 'exit',
    name: 'Exit',
    ours: 'Holds nothing that cannot be handed back.',
    rule: 'Revocable',
    yours: 'You can remove access at any moment. Thresholds, evidence and records transfer to you.',
  },
];

/** What each function in the enterprise can settle before an engagement. */
export interface TrustAudience {
  who: string;
  asks: string;
  outcome: string;
  points: string[];
}

export const trustAudiences: TrustAudience[] = [
  {
    who: 'Security',
    asks: 'What can they reach, and who decides?',
    outcome: 'Grant access knowing exactly what it can reach.',
    points: [
      'Access through your own identity provider, under your policies',
      'Named individuals and dedicated workload identities, no shared credentials',
      'Changes follow your change process, with no parallel route into production',
    ],
  },
  {
    who: 'Risk and audit',
    asks: 'Can we examine what was done in our environment?',
    outcome: 'Answer an examiner from records, not from recollection.',
    points: [
      'Every action attributable to an identity and an approval',
      'Records retained for the period your obligations set',
      'Available to your security, risk and audit functions and to external examiners',
    ],
  },
  {
    who: 'Procurement and legal',
    asks: 'What do we own, and can we leave?',
    outcome: 'Sign without creating a dependency you cannot exit.',
    points: [
      'Thresholds, evidence and action records are your property',
      'A documented transition provision in every engagement',
      'Records kept in open formats, so assurance can continue without Xyvionix',
    ],
  },
];
