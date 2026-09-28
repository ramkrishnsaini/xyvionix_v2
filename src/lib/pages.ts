/**
 * One index of every page on the site, static and content, in a common shape.
 * Everything that links, lists or describes pages reads from here.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { AssuranceState } from '../data/assurances.ts';
import type { ExtendedClusterKey } from '../data/clusters.ts';
import { reservedSlugs } from '../data/reserved-slugs.ts';
import { collectionKeys, ogImagePath, pathFor, urlFor, type CollectionKey } from '../data/routes.ts';
import { staticPages } from '../data/static-pages.ts';
import { assertRoutes } from './slug-rules.ts';

export type AnyEntry =
  | CollectionEntry<'assurance'>
  | CollectionEntry<'useCases'>
  | CollectionEntry<'technologies'>
  | CollectionEntry<'industries'>
  | CollectionEntry<'insights'>;

export type PageKind = CollectionKey | 'static';

export interface PageRef {
  slug: string;
  path: string;
  url: string;
  kind: PageKind;
  title: string;
  h1: string;
  seoTitle: string;
  description: string;
  summary: string;
  ogQuestion: string;
  ogImage: string;
  parent: string;
  cluster: ExtendedClusterKey | null;
  secondary: ExtendedClusterKey[];
  state: AssuranceState;
  index: boolean;
  published: Date;
  modified: Date;
  reviewed: Date;
  reviewCadence: number;
  freshnessCritical: boolean;
  /** Insight category, technology group or industry kind, when relevant. */
  label: string | null;
}

let entriesCache: AnyEntry[] | undefined;
let indexCache: Map<string, PageRef> | undefined;

/** Every published content entry. Runs the flat-routing check on first use. */
export async function getContentEntries(): Promise<AnyEntry[]> {
  if (entriesCache) return entriesCache;

  // XYV_INCLUDE_DRAFTS=1 renders drafts for layout review. Never set it for a production build.
  const includeDrafts = process.env.XYV_INCLUDE_DRAFTS === '1';
  const groups = await Promise.all(
    collectionKeys.map((key) => getCollection(key, ({ data }) => includeDrafts || data.draft !== true)),
  );
  const entries = (groups.flat() as AnyEntry[]).sort((a, b) => a.id.localeCompare(b.id));

  assertRoutes(
    entries.map((e) => ({ slug: e.id, source: e.filePath ?? `${e.collection}/${e.id}` })),
    reservedSlugs,
  );

  entriesCache = entries;
  return entries;
}

function labelFor(entry: AnyEntry): string | null {
  if (entry.collection === 'insights') return entry.data.category;
  if (entry.collection === 'technologies') return entry.data.group;
  if (entry.collection === 'industries') return entry.data.kind;
  if (entry.collection === 'assurance') return entry.data.kind;
  return null;
}

export function entryToRef(entry: AnyEntry): PageRef {
  const d = entry.data;
  return {
    slug: entry.id,
    path: pathFor(entry.id),
    url: urlFor(entry.id),
    kind: entry.collection,
    title: d.title,
    h1: d.h1,
    seoTitle: d.seoTitle,
    description: d.description,
    summary: d.summary,
    ogQuestion: d.ogQuestion ?? d.h1,
    ogImage: ogImagePath(entry.id),
    parent: d.parent,
    cluster: d.cluster,
    secondary: d.secondary,
    state: d.state,
    index: !d.noindex,
    published: d.publishedDate,
    modified: d.modifiedDate,
    reviewed: d.lastReviewed,
    reviewCadence: d.reviewCadence,
    freshnessCritical: d.freshnessCritical,
    label: labelFor(entry),
  };
}

export async function getPageIndex(): Promise<Map<string, PageRef>> {
  if (indexCache) return indexCache;

  const index = new Map<string, PageRef>();

  for (const p of staticPages) {
    index.set(p.slug, {
      slug: p.slug,
      path: pathFor(p.slug),
      url: urlFor(p.slug),
      kind: 'static',
      title: p.title,
      h1: p.h1,
      seoTitle: p.seoTitle,
      description: p.description,
      summary: p.summary,
      ogQuestion: p.ogQuestion,
      ogImage: ogImagePath(p.slug),
      parent: p.parent,
      cluster: null,
      secondary: [],
      state: 'assured',
      index: p.index,
      published: new Date(p.publishedDate),
      modified: new Date(p.modifiedDate),
      reviewed: new Date(p.lastReviewed),
      reviewCadence: p.reviewCadence,
      freshnessCritical: false,
      label: p.type,
    });
  }

  for (const entry of await getContentEntries()) {
    index.set(entry.id, entryToRef(entry));
  }

  indexCache = index;
  return index;
}

export async function getPage(slug: string): Promise<PageRef | undefined> {
  return (await getPageIndex()).get(slug);
}

/** Resolve slugs to pages, preserving the curated order and dropping unknown slugs. */
export async function resolveSlugs(slugs: readonly string[]): Promise<PageRef[]> {
  const index = await getPageIndex();
  const seen = new Set<string>();
  const out: PageRef[] = [];
  for (const slug of slugs) {
    const page = index.get(slug);
    if (page && !seen.has(slug)) {
      seen.add(slug);
      out.push(page);
    }
  }
  return out;
}

export async function getPagesByKind(kind: PageKind): Promise<PageRef[]> {
  return [...(await getPageIndex()).values()].filter((p) => p.kind === kind);
}

export async function getChildrenOf(parentSlug: string): Promise<PageRef[]> {
  return [...(await getPageIndex()).values()].filter((p) => p.parent === parentSlug && p.slug !== parentSlug);
}

/** Newest first. */
export function byNewest(a: PageRef, b: PageRef): number {
  return b.published.valueOf() - a.published.valueOf() || a.title.localeCompare(b.title);
}

export function byTitle(a: PageRef, b: PageRef): number {
  return a.title.localeCompare(b.title);
}
