/**
 * Internal linking engine. Links are curated in frontmatter first; metadata
 * fills gaps so a page never ends in a dead end. Groups are capped to keep
 * modules useful rather than exhaustive.
 */

import { clusterByKey, type ClusterKey } from '../data/clusters.ts';
import type { CollectionKey } from '../data/routes.ts';
import { byTitle, getPageIndex, resolveSlugs, type AnyEntry, type PageRef } from './pages.ts';

export interface RelatedGroup {
  key: CollectionKey;
  label: string;
  /** Sentence explaining why these links are here, shown under the label. */
  context: string;
  pages: PageRef[];
}

const LIMIT: Record<CollectionKey, number> = {
  assurance: 5,
  useCases: 4,
  technologies: 4,
  industries: 3,
  insights: 3,
};

const MINIMUM = 2;

const LABELS: Record<CollectionKey, { label: string; context: string }> = {
  assurance: { label: 'Assurance areas', context: 'The assurance that holds this outcome.' },
  useCases: { label: 'Related use cases', context: 'Situations where this assurance is typically lost.' },
  technologies: { label: 'Technology context', context: 'Platforms where this evidence is gathered.' },
  industries: { label: 'Industry context', context: 'Sectors where the consequence is greatest.' },
  insights: { label: 'Related insights', context: 'Analysis behind the approach.' },
};

const isAssuranceCluster = (key: string): key is ClusterKey => key in clusterByKey;

export async function relatedFor(entry: AnyEntry): Promise<RelatedGroup[]> {
  const index = await getPageIndex();
  const all = [...index.values()];
  const self = entry.id;
  const { related, cluster, secondary, parent } = entry.data;

  const clusterKeys = [cluster, ...secondary];
  const groups: RelatedGroup[] = [];

  for (const key of Object.keys(LABELS) as CollectionKey[]) {
    const curated = await resolveSlugs(related[key].filter((slug) => slug !== self));
    const pages = [...curated];
    const have = new Set(pages.map((p) => p.slug));

    // The parent hub always leads the assurance group when the page is not itself that hub.
    if (key === 'assurance') {
      const hubSlug = isAssuranceCluster(cluster) ? clusterByKey[cluster].hub : index.get(parent)?.kind === 'assurance' ? parent : null;
      const hub = hubSlug ? index.get(hubSlug) : undefined;
      if (hub && hub.slug !== self && !have.has(hub.slug)) {
        pages.unshift(hub);
        have.add(hub.slug);
      }
    }

    // Fill from shared cluster metadata only when curation left the group thin.
    if (pages.length < MINIMUM) {
      const candidates = all
        .filter((p) => p.kind === key && p.slug !== self && !have.has(p.slug) && p.index)
        .filter((p) => p.cluster !== null && clusterKeys.includes(p.cluster))
        .sort(byTitle);
      for (const candidate of candidates) {
        if (pages.length >= MINIMUM) break;
        pages.push(candidate);
      }
    }

    const limited = pages.filter((p) => p.index).slice(0, LIMIT[key]);
    if (limited.length > 0) groups.push({ key, ...LABELS[key], pages: limited });
  }

  return groups;
}

/** Slugs a page links to through its related modules. Used by the docs generator and link checks. */
export async function outgoingSlugs(entry: AnyEntry): Promise<string[]> {
  return (await relatedFor(entry)).flatMap((g) => g.pages.map((p) => p.slug));
}
