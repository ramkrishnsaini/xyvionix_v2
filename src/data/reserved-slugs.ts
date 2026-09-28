/**
 * Slugs that a content entry may never use, because the root-level path is
 * already taken by a static page, an endpoint, an asset folder or the host.
 */

import { staticPages } from './static-pages.ts';

/** Paths owned by endpoints, generated files, asset folders and hosting conventions. */
export const systemSlugs = [
  '404',
  '500',
  'index',
  'og',
  'brand',
  'fonts',
  'js',
  'img',
  'images',
  'assets',
  '_astro',
  'api',
  'admin',
  'rss',
  'rss.xml',
  'feed',
  'robots',
  'robots.txt',
  'llms',
  'llms.txt',
  'llms-full',
  'llms-full.txt',
  'sitemap',
  'sitemap-index',
  'sitemap-index.xml',
  'search-index',
  'search-index.json',
  'favicon',
  'favicon.ico',
  'manifest',
  'site.webmanifest',
  '.well-known',
  'well-known',
  'fetch',
  'preview',
  'draft',
  'drafts',
  'staging',
] as const;

/**
 * Hierarchical prefixes the flat URL policy forbids. Reserving them stops an
 * entry from recreating /services, /blog and similar roots.
 */
export const forbiddenRoots = ['services', 'solutions', 'blog', 'articles', 'resources', 'news'] as const;

export const staticSlugs = staticPages.map((p) => p.slug).filter((s) => s !== '');

export const reservedSlugs: ReadonlySet<string> = new Set<string>([...staticSlugs, ...systemSlugs, ...forbiddenRoots]);
