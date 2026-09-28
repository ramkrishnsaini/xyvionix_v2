/**
 * Static search index. Metadata only, so it stays small and needs no search
 * service. Consumed by src/scripts/search.ts on /search.
 */

import type { APIRoute } from 'astro';
import { clusterLabel } from '../data/clusters.ts';
import { collectionLabels } from '../data/routes.ts';
import { getContentEntries, getPageIndex } from '../lib/pages.ts';

export interface SearchRecord {
  /** Root-relative URL. */
  u: string;
  /** Title. */
  t: string;
  /** Summary. */
  s: string;
  /** Type label, for example "Use case". */
  k: string;
  /** Cluster label. */
  c: string;
  /** Extra searchable text: heading, audience, evidence names. */
  x: string;
}

export const GET = (async () => {
  const index = await getPageIndex();
  const entries = new Map((await getContentEntries()).map((e) => [e.id, e]));

  const records: SearchRecord[] = [...index.values()]
    .filter((p) => p.index && p.slug !== '')
    .map((p) => {
      const entry = entries.get(p.slug);
      const extra = entry
        ? [p.h1, entry.data.audience.join(' '), entry.data.evidence.map((e) => e.name).join(' ')].join(' ')
        : p.h1;
      return {
        u: p.path,
        t: p.title,
        s: p.summary,
        k: p.kind === 'static' ? 'Page' : collectionLabels[p.kind],
        c: p.cluster ? clusterLabel(p.cluster) : '',
        x: extra.replace(/\s+/g, ' ').trim(),
      };
    })
    .sort((a, b) => a.t.localeCompare(b.t));

  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}) satisfies APIRoute;
