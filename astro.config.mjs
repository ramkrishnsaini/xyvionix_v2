// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readSitemapIndex } from './src/lib/content-index.mjs';
import { staticPages } from './src/data/static-pages.ts';

const SITE = 'https://xyvionix.com';

// slug -> collection / lastmod, read from frontmatter so lastmod is accurate
const contentIndex = readSitemapIndex();
const staticIndex = new Map(staticPages.map((p) => [p.slug, p]));

/** @param {string} url */
const slugOf = (url) => new URL(url).pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');

/** @param {string} collection */
const chunkFor = (collection) => (/** @type {import('@astrojs/sitemap').SitemapItem} */ item) =>
  contentIndex.get(slugOf(item.url))?.collection === collection ? item : undefined;

export default defineConfig({
  site: SITE,
  output: 'static',

  // One URL form everywhere: no trailing slash, /page.html served as /page by the host.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // External CSS and JS only, so the host can send a strict Content-Security-Policy.
    inlineStylesheets: 'never',
  },
  vite: {
    // One stylesheet for the whole site: fewer render-blocking requests, cached across pages.
    build: { assetsInlineLimit: 0, cssCodeSplit: false },
    // Native and WASM-backed image tooling stays outside the bundle.
    ssr: { external: ['@resvg/resvg-js', 'satori'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },

  // Keep normal HTML whitespace between inline elements.
  compressHTML: true,

  markdown: {
    // Shiki writes inline style attributes, which a strict policy blocks.
    syntaxHighlight: false,
  },

  integrations: [
    sitemap({
      namespaces: { news: false, video: false, image: false, xhtml: false },
      filter: (page) => {
        const slug = slugOf(page);
        if (slug === '404' || slug.startsWith('og/')) return false;
        const fixed = staticIndex.get(slug);
        if (fixed) return fixed.index;
        const entry = contentIndex.get(slug);
        return entry ? !entry.noindex : true;
      },
      serialize: (item) => {
        const slug = slugOf(item.url);
        const lastmod = staticIndex.get(slug)?.modifiedDate ?? contentIndex.get(slug)?.lastmod;
        if (lastmod) item.lastmod = new Date(lastmod).toISOString();
        return item;
      },
      // Logical sitemaps. Anything unclaimed (core and hub pages) lands in sitemap-pages-0.xml.
      chunks: {
        assurance: chunkFor('assurance'),
        'use-cases': chunkFor('useCases'),
        technologies: chunkFor('technologies'),
        industries: chunkFor('industries'),
        insights: chunkFor('insights'),
      },
    }),
  ],
});
