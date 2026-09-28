/** Builds the SEO model and breadcrumbs for a page registered in src/data/static-pages.ts. */

import { ogImagePath } from '../data/routes.ts';
import { site } from '../data/site.ts';
import { getStaticPage, type StaticPage } from '../data/static-pages.ts';
import { breadcrumbsFor, type Crumb } from './breadcrumbs.ts';
import { pageGraph } from './schema.ts';
import { buildSeo, type Seo } from './seo.ts';

export interface StaticPageContext {
  page: StaticPage;
  seo: Seo;
  crumbs: Crumb[];
}

export async function staticPageContext(
  slug: string,
  extraSchema: Array<Record<string, unknown> | null> = [],
): Promise<StaticPageContext> {
  const page = getStaticPage(slug);
  const crumbs = await breadcrumbsFor({ slug: page.slug, title: page.title, parent: page.parent });
  const url = slug === '' ? `${site.url}/` : `${site.url}/${slug}`;

  const schema = pageGraph({
    type: page.schemaType,
    url,
    name: page.seoTitle,
    description: page.description,
    image: `${site.url}${ogImagePath(slug)}`,
    imageCaption: `${site.name}: ${page.title}`,
    published: new Date(page.publishedDate),
    modified: new Date(page.modifiedDate),
    crumbs,
    extra: extraSchema,
  });

  const seo = buildSeo({
    slug,
    title: page.seoTitle,
    description: page.description,
    pageName: slug === '' ? site.category : page.title,
    ogQuestion: page.ogQuestion,
    index: page.index,
    schema: [schema],
    breadcrumbs: crumbs,
  });

  return { page, seo, crumbs };
}
