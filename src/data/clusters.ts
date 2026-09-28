/**
 * Cluster definitions. Flat URLs carry no hierarchy, so the hierarchy lives here
 * and is expressed through breadcrumbs, hubs, related modules and schema.
 */

export type ClusterKey = 'ai' | 'reliability' | 'cyber' | 'value' | 'data' | 'change';
export type ExtendedClusterKey = ClusterKey | 'industry' | 'category';

export interface Cluster {
  key: ClusterKey;
  /** Slug of the hub page for the cluster. */
  hub: string;
  name: string;
  shortName: string;
  /** Mono band label used on the home page. */
  band: string;
  tier: 'primary' | 'expansion';
  question: string;
  summary: string;
}

export const clusters: Cluster[] = [
  {
    key: 'ai',
    hub: 'ai-assurance',
    name: 'AI Assurance',
    shortName: 'AI',
    band: 'AI Trust',
    tier: 'primary',
    question: 'Can we still prove this system answers correctly, safely and within cost?',
    summary:
      'Retrieval accuracy, grounding, safety boundaries and unit economics verified against thresholds on every change, not measured once at launch.',
  },
  {
    key: 'reliability',
    hub: 'production-reliability-assurance',
    name: 'Production Reliability Assurance',
    shortName: 'Production Reliability',
    band: 'Production Reliability',
    tier: 'primary',
    question: 'Can we still prove the business will keep running under real conditions?',
    summary:
      'Service levels, recovery capability and environment parity tested rather than documented, with drift surfaced before it becomes an incident.',
  },
  {
    key: 'cyber',
    hub: 'cyber-exposure-assurance',
    name: 'Cyber Exposure Assurance',
    shortName: 'Cyber Exposure',
    band: 'Cyber Exposure',
    tier: 'primary',
    question: 'Can we still prove what was closed has stayed closed?',
    summary:
      'Identity and cloud exposure re-verified continuously, with remediation owned through to confirmed closure and evidence retained for audit.',
  },
  {
    key: 'value',
    hub: 'technology-value-assurance',
    name: 'Technology Value Assurance',
    shortName: 'Technology Value',
    band: 'Technology Value',
    tier: 'expansion',
    question: 'Can we still prove technology spend is tied to the outcome it buys?',
    summary:
      'Unit cost, commitment utilisation and anomaly response held against thresholds the business agreed, with correction owned until the spend changes.',
  },
  {
    key: 'data',
    hub: 'data-assurance',
    name: 'Data Assurance',
    shortName: 'Data',
    band: 'Data Integrity',
    tier: 'expansion',
    question: 'Can we still prove the data behind the decision can be trusted?',
    summary:
      'Freshness, quality and pipeline integrity held against tolerances set by the decisions and AI systems that consume the data.',
  },
  {
    key: 'change',
    hub: 'change-assurance',
    name: 'Change Assurance',
    shortName: 'Change',
    band: 'Change Risk',
    tier: 'expansion',
    question: 'Can we still prove each release is safe to ship and safe to reverse?',
    summary:
      'Release evidence, change failure rate and rollback readiness held as thresholds rather than reviewed after an incident.',
  },
];

export const clusterByKey = Object.fromEntries(clusters.map((c) => [c.key, c])) as Record<ClusterKey, Cluster>;

export const clusterByHub = Object.fromEntries(clusters.map((c) => [c.hub, c])) as Record<string, Cluster>;

export const primaryClusters = clusters.filter((c) => c.tier === 'primary');
export const expansionClusters = clusters.filter((c) => c.tier === 'expansion');

/** Display label for any cluster key, including the two non-assurance groupings. */
export function clusterLabel(key: ExtendedClusterKey): string {
  if (key === 'industry') return 'Industries';
  if (key === 'category') return 'Assurance Practice';
  return clusterByKey[key].shortName;
}
