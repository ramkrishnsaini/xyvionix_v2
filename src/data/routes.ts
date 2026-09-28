/**
 * URL construction. One trailing-slash strategy for the whole site:
 * no trailing slash, except the root which is always "/".
 */

import { SITE_URL } from './site.ts';

/** Root-relative path for a slug. '' is the home page. */
export function pathFor(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return clean === '' ? '/' : `/${clean}`;
}

/** Absolute canonical URL for a slug. */
export function urlFor(slug: string): string {
  const path = pathFor(slug);
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/** Absolute URL for any root-relative asset or endpoint path. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Slug used for OG image file names. The home page has no slug, so it uses "home". */
export function ogSlug(slug: string): string {
  return slug === '' ? 'home' : slug;
}

export function ogImagePath(slug: string): string {
  return `/og/${ogSlug(slug)}.png`;
}

/** Content collection keys mapped to the hub that owns them in breadcrumbs. */
export const collectionHubs = {
  assurance: 'assurance',
  useCases: 'use-cases',
  technologies: 'technologies',
  industries: 'industries',
  insights: 'insights',
} as const;

export type CollectionKey = keyof typeof collectionHubs;

export const collectionKeys = Object.keys(collectionHubs) as CollectionKey[];

/** Folder under src/content for each collection. */
export const collectionDirs: Record<CollectionKey, string> = {
  assurance: 'assurance',
  useCases: 'use-cases',
  technologies: 'technologies',
  industries: 'industries',
  insights: 'insights',
};

export const collectionLabels: Record<CollectionKey, string> = {
  assurance: 'Assurance',
  useCases: 'Use case',
  technologies: 'Technology',
  industries: 'Industry',
  insights: 'Insight',
};
