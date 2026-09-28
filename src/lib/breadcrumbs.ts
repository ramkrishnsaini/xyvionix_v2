/**
 * Semantic breadcrumbs. URLs are flat; the hierarchy comes from each page's
 * `parent`. Trails are capped at three levels: Home > parent > page.
 */

import { pathFor, urlFor } from '../data/routes.ts';
import { getPageIndex, type PageRef } from './pages.ts';

export interface Crumb {
  name: string;
  path: string;
  url: string;
}

const HOME: Crumb = { name: 'Home', path: '/', url: urlFor('') };

const MAX_DEPTH = 8;

export async function breadcrumbsFor(page: Pick<PageRef, 'slug' | 'title' | 'parent'>): Promise<Crumb[]> {
  if (page.slug === '') return [HOME];

  const index = await getPageIndex();
  const chain: Crumb[] = [{ name: page.title, path: pathFor(page.slug), url: urlFor(page.slug) }];

  let parentSlug = page.parent;
  let guard = 0;
  while (parentSlug !== '' && guard < MAX_DEPTH) {
    const parent = index.get(parentSlug);
    if (!parent) break;
    chain.unshift({ name: parent.title, path: parent.path, url: parent.url });
    parentSlug = parent.parent;
    guard += 1;
  }

  // Home > nearest parent > page. Deeper ancestors stay reachable from the parent itself.
  const trimmed = chain.length > 2 ? chain.slice(-2) : chain;
  return [HOME, ...trimmed];
}
