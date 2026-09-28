/**
 * JSON-LD builders. Truthful structured data only: no ratings, reviews,
 * clients, awards, offices, employee counts or certifications, and no
 * FAQPage or HowTo (Google retired both rich results).
 *
 * Every page emits one @graph. Organization and WebSite are referenced by
 * @id so there is a single definition and no conflicting copies.
 */

import { company, organization, site, websiteId, SITE_URL } from '../data/site.ts';
import { profiles } from '../data/social.ts';
import { og } from '../data/social.ts';
import type { Crumb } from './breadcrumbs.ts';

type Node = Record<string, unknown>;

const orgRef = { '@id': organization.id };
const siteRef = { '@id': websiteId };

/** Full Organization node. Emitted once per page, always with identical values. */
export function organizationNode(): Node {
  const node: Node = {
    '@type': 'Organization',
    '@id': organization.id,
    name: organization.name,
    url: organization.url,
    description: organization.description,
    slogan: organization.slogan,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: organization.logo,
      width: organization.logoWidth,
      height: organization.logoHeight,
      caption: organization.name,
    },
  };

  if (company.legalName) node.legalName = company.legalName;
  if (company.contactEmail) node.email = company.contactEmail;
  if (profiles.length > 0) node.sameAs = profiles.map((p) => p.url);

  return node;
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${SITE_URL}/`,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: orgRef,
  };
}

export function breadcrumbNode(pageUrl: string, crumbs: Crumb[]): Node | null {
  if (crumbs.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function imageNode(pageUrl: string, imageUrl: string, caption: string): Node {
  return {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: imageUrl,
    contentUrl: imageUrl,
    width: og.width,
    height: og.height,
    caption,
  };
}

export interface WebPageInput {
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  url: string;
  name: string;
  description: string;
  image: string;
  imageCaption: string;
  published?: Date;
  modified?: Date;
  reviewed?: Date;
  crumbs: Crumb[];
  /** @id of the node this page is mainly about, such as a Service or Article. */
  mainEntity?: string;
  about?: string[];
}

export function webPageNode(input: WebPageInput): Node {
  const node: Node = {
    '@type': input.type ?? 'WebPage',
    '@id': `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: site.language,
    isPartOf: siteRef,
    publisher: orgRef,
    primaryImageOfPage: { '@id': `${input.url}#primaryimage` },
  };

  if (input.crumbs.length >= 2) node.breadcrumb = { '@id': `${input.url}#breadcrumb` };
  if (input.published) node.datePublished = input.published.toISOString();
  if (input.modified) node.dateModified = input.modified.toISOString();
  if (input.reviewed) node.lastReviewed = input.reviewed.toISOString().slice(0, 10);
  if (input.mainEntity) node.mainEntity = { '@id': input.mainEntity };
  if (input.about && input.about.length > 0) node.about = input.about.map((name) => ({ '@type': 'Thing', name }));

  return node;
}

export interface ServiceInput {
  url: string;
  name: string;
  description: string;
  serviceType: string;
  audience: string[];
}

/** Used only on commercial assurance pages, where a service is what the page describes. */
export function serviceNode(input: ServiceInput): Node {
  const node: Node = {
    '@type': 'Service',
    '@id': `${input.url}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    category: site.category,
    provider: orgRef,
    url: input.url,
  };

  if (input.audience.length > 0) {
    node.audience = { '@type': 'BusinessAudience', audienceType: input.audience.join(', ') };
  }

  return node;
}

export interface ArticleInput {
  url: string;
  headline: string;
  description: string;
  section: string;
  published: Date;
  modified: Date;
  wordCount: number;
  author: string;
}

/** Organisational authorship: no named individuals are invented. */
export function articleNode(input: ArticleInput): Node {
  return {
    '@type': 'Article',
    '@id': `${input.url}#article`,
    headline: input.headline,
    description: input.description,
    articleSection: input.section,
    inLanguage: site.language,
    datePublished: input.published.toISOString(),
    dateModified: input.modified.toISOString(),
    wordCount: input.wordCount,
    author: { '@type': 'Organization', '@id': organization.id, name: input.author, url: organization.url },
    publisher: orgRef,
    image: { '@id': `${input.url}#primaryimage` },
    mainEntityOfPage: { '@id': `${input.url}#webpage` },
    isPartOf: siteRef,
  };
}

/** Wraps nodes in a single graph, dropping empty ones. */
export function graph(nodes: Array<Node | null | undefined>): Node {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter((n): n is Node => Boolean(n)),
  };
}

export interface PageGraphInput extends WebPageInput {
  extra?: Array<Node | null | undefined>;
}

/** Standard graph for any page: organisation, site, page, image, breadcrumbs, plus extras. */
export function pageGraph(input: PageGraphInput): Node {
  return graph([
    organizationNode(),
    websiteNode(),
    webPageNode(input),
    imageNode(input.url, input.image, input.imageCaption),
    breadcrumbNode(input.url, input.crumbs),
    ...(input.extra ?? []),
  ]);
}

export interface DefinedTermInput {
  term: string;
  definition: string;
  /** Fragment of the page where the term is defined, without the hash. */
  anchor: string;
}

/**
 * A glossary published on a page. Each term is addressable, so another page
 * or an agent can refer to the definition and not to the page as a whole.
 */
export function definedTermSetNode(pageUrl: string, name: string, description: string, terms: DefinedTermInput[]): Node {
  const setId = `${pageUrl}#glossary`;
  return {
    '@type': 'DefinedTermSet',
    '@id': setId,
    name,
    description,
    url: setId,
    inLanguage: site.language,
    publisher: orgRef,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${pageUrl}#${t.anchor}`,
      name: t.term,
      description: t.definition,
      url: `${pageUrl}#${t.anchor}`,
      inDefinedTermSet: { '@id': setId },
    })),
  };
}

export interface ListStepInput {
  name: string;
  description: string;
  /** Fragment of the page where the step is described, without the hash. */
  anchor: string;
}

/** An ordered list of steps. Plain ItemList: HowTo is not used. */
export function stepListNode(pageUrl: string, id: string, name: string, steps: ListStepInput[]): Node {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#${id}`,
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: steps.length,
    itemListElement: steps.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      description: s.description,
      url: `${pageUrl}#${s.anchor}`,
    })),
  };
}

export interface ReferenceArticleInput {
  url: string;
  headline: string;
  description: string;
  published: Date;
  modified: Date;
  wordCount: number;
  /** What the article is about, as the @id of a DefinedTerm on the page. */
  aboutTermId: string;
  /** @ids of other nodes on the page that are parts of the article. */
  parts: string[];
  audience: string;
}

/** A reference article written by the organisation. No named individuals are invented. */
export function referenceArticleNode(input: ReferenceArticleInput): Node {
  return {
    '@type': 'TechArticle',
    '@id': `${input.url}#article`,
    headline: input.headline,
    description: input.description,
    inLanguage: site.language,
    datePublished: input.published.toISOString(),
    dateModified: input.modified.toISOString(),
    wordCount: input.wordCount,
    author: { '@type': 'Organization', '@id': organization.id, name: site.editorialAuthor, url: organization.url },
    publisher: orgRef,
    image: { '@id': `${input.url}#primaryimage` },
    mainEntityOfPage: { '@id': `${input.url}#webpage` },
    isPartOf: siteRef,
    about: { '@id': input.aboutTermId },
    hasPart: input.parts.map((id) => ({ '@id': id })),
    audience: { '@type': 'BusinessAudience', audienceType: input.audience },
  };
}
