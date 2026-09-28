/**
 * The typed SEO model. Every page builds exactly one `Seo` object and hands
 * it to <Seo />, which is the only component that writes head metadata.
 */

import { og as ogDefaults, twitterSite } from '../data/social.ts';
import { absoluteUrl, ogImagePath, urlFor } from '../data/routes.ts';
import { site } from '../data/site.ts';
import type { Crumb } from './breadcrumbs.ts';

export type RobotsDirective = 'index, follow' | 'noindex, follow' | 'noindex, nofollow';

export interface Seo {
  title: string;
  description: string;
  canonical: string;
  robots: RobotsDirective;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  ogImageWidth: number;
  ogImageHeight: number;
  ogType: 'website' | 'article';
  ogSiteName: string;
  ogLocale: string;
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageAlt: string;
  twitterSite: string | null;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  articleAuthor?: string;
  schema: Record<string, unknown>[];
  breadcrumbs: Crumb[];
}

export interface SeoInput {
  slug: string;
  title: string;
  description: string;
  /** Used in the OG image alt text and as the social title fallback. */
  pageName: string;
  ogTitle?: string;
  ogDescription?: string;
  ogQuestion?: string;
  index?: boolean;
  type?: 'website' | 'article';
  published?: Date;
  modified?: Date;
  section?: string;
  author?: string;
  schema?: Record<string, unknown>[];
  breadcrumbs?: Crumb[];
}

/** Search results show the brand once. Strip it from social titles, which show the site name separately. */
function socialTitle(title: string): string {
  return title.replace(/\s*\|\s*(Contact\s+)?Xyvionix\s*$/i, '').trim();
}

export function buildSeo(input: SeoInput): Seo {
  const image = absoluteUrl(ogImagePath(input.slug));
  const ogTitle = input.ogTitle ?? socialTitle(input.title);
  const ogDescription = input.ogDescription ?? input.description;
  const alt = input.ogQuestion
    ? `${site.name}: ${input.pageName}. ${input.ogQuestion}`
    : `${site.name}: ${input.pageName}`;

  return {
    title: input.title,
    description: input.description,
    canonical: urlFor(input.slug),
    robots: input.index === false ? 'noindex, follow' : 'index, follow',
    ogTitle,
    ogDescription,
    ogImage: image,
    ogImageAlt: alt,
    ogImageWidth: ogDefaults.width,
    ogImageHeight: ogDefaults.height,
    ogType: input.type ?? 'website',
    ogSiteName: site.name,
    ogLocale: site.locale,
    twitterCard: ogDefaults.twitterCard,
    twitterTitle: ogTitle,
    twitterDescription: ogDescription,
    twitterImage: image,
    twitterImageAlt: alt,
    twitterSite,
    publishedTime: input.published?.toISOString(),
    modifiedTime: input.modified?.toISOString(),
    articleSection: input.section,
    articleAuthor: input.author,
    schema: input.schema ?? [],
    breadcrumbs: input.breadcrumbs ?? [],
  };
}
