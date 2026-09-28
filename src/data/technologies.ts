/** Editorial groupings for the technologies hub. Order here is display order. */

export type TechnologyGroupKey =
  | 'cloud'
  | 'kubernetes'
  | 'infrastructure-as-code'
  | 'ai-platform'
  | 'inference'
  | 'identity'
  | 'data-platform';

export interface TechnologyGroup {
  key: TechnologyGroupKey;
  name: string;
  /** Why the grouping matters, in assurance terms. */
  description: string;
}

export const technologyGroups: TechnologyGroup[] = [
  {
    key: 'cloud',
    name: 'Cloud platforms',
    description:
      'Each cloud fails differently. What has to be re-proven depends on how the provider isolates zones and regions, and on which shared control planes a workload silently depends.',
  },
  {
    key: 'kubernetes',
    name: 'Managed Kubernetes',
    description:
      'Cluster reliability expires on a published calendar. Support windows, removed interfaces and platform-managed upgrades make the evidence date-bound.',
  },
  {
    key: 'infrastructure-as-code',
    name: 'Infrastructure as code',
    description:
      'Code describes intent. Assurance is the continuing proof that what is running still matches what was reviewed and approved.',
  },
  {
    key: 'ai-platform',
    name: 'AI platforms',
    description:
      'Model lifecycles, automatic upgrades and capacity commitments are set by the vendor. Evaluation evidence is valid only for the version it was gathered on.',
  },
  {
    key: 'inference',
    name: 'Inference and retrieval',
    description:
      'Self-hosted inference and retrieval move model risk from the vendor to the platform team, along with the duty to prove throughput, quality and cost.',
  },
  {
    key: 'identity',
    name: 'Identity platforms',
    description:
      'Identity policy rarely fails by removal. It fails by exception, and the gap between written policy and effective enforcement widens quietly.',
  },
  {
    key: 'data-platform',
    name: 'Data platforms',
    description:
      'A successful pipeline run is not a correct delivery. Freshness, completeness and contract conformance have to be measured where the data is consumed.',
  },
];

export const technologyGroupByKey = Object.fromEntries(technologyGroups.map((g) => [g.key, g])) as Record<
  TechnologyGroupKey,
  TechnologyGroup
>;
