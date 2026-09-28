/** RSS feed of insight articles. Links are canonical URLs with no trailing slash. */

import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pathFor } from '../data/routes.ts';
import { site } from '../data/site.ts';

export const GET = (async (context) => {
  const entries = (await getCollection('insights', ({ data }) => data.draft !== true && !data.noindex)).sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf() || a.id.localeCompare(b.id),
  );

  return rss({
    title: `${site.name} Insights`,
    description:
      'Research and analysis on how evidence expires in production AI, infrastructure, security and data, and what it takes to keep an outcome proven.',
    site: context.site ?? site.url,
    trailingSlash: false,
    xmlns: { atom: 'http://www.w3.org/2005/Atom', dc: 'http://purl.org/dc/elements/1.1/' },
    customData: [
      `<language>en-gb</language>`,
      `<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    ].join(''),
    items: entries.map((entry) => ({
      title: entry.data.h1,
      description: entry.data.description,
      link: pathFor(entry.id),
      pubDate: entry.data.publishedDate,
      categories: [entry.data.category],
      // RSS <author> must be an email address, so the organisational byline uses dc:creator.
      customData: `<dc:creator>${entry.data.author}</dc:creator><atom:updated>${entry.data.modifiedDate.toISOString()}</atom:updated>`,
    })),
  });
}) satisfies APIRoute;
