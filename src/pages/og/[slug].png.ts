/**
 * One Open Graph image per page: /og/<slug>.png, and /og/home.png for the
 * home page. Generated from the same page index that drives the metadata, so
 * every indexable route has an image and the two cannot drift apart.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { clusterLabel } from '../../data/clusters.ts';
import { collectionLabels, ogSlug } from '../../data/routes.ts';
import { renderOgPng, type OgInput } from '../../lib/og.ts';
import { getPageIndex, type PageRef } from '../../lib/pages.ts';
import { site } from '../../data/site.ts';

function labelFor(page: PageRef): string {
  if (page.slug === '') return site.category;
  if (page.kind === 'static') return site.category;
  if (page.kind === 'assurance') return page.cluster ? `${clusterLabel(page.cluster)} assurance` : 'Assurance';
  if (page.kind === 'insights') return page.label ?? 'Insight';
  return collectionLabels[page.kind];
}

function inputFor(page: PageRef): OgInput {
  const isHome = page.slug === '';
  return {
    label: labelFor(page),
    title: isHome ? page.h1 : page.title,
    line: isHome ? undefined : page.ogQuestion !== page.title ? page.ogQuestion : undefined,
    state: page.state,
    surface: page.kind === 'insights' ? 'offwhite' : 'obsidian',
  };
}

export const getStaticPaths = (async () => {
  const index = await getPageIndex();
  return [...index.values()].map((page) => ({
    params: { slug: ogSlug(page.slug) },
    props: { input: inputFor(page) },
  }));
}) satisfies GetStaticPaths;

export const GET = (async ({ props }) => {
  const png = await renderOgPng(props.input as OgInput);
  return new Response(png as BodyInit, { headers: { 'Content-Type': 'image/png' } });
}) satisfies APIRoute;
