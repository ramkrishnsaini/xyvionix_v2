# Astro — research, September 2026

## 1. Upgrade guides: Astro 6 and Astro 7 (breaking changes, Node, TypeScript)

Sources: https://docs.astro.build/en/guides/upgrade-to/v6/ , https://docs.astro.build/en/guides/upgrade-to/v7/ ,
https://astro.build/blog/astro-6/ (released 2026-03-10), https://astro.build/blog/astro-7/ (released 2026-06-22),
`npm view` on 2026-09-27.

**Node.** `astro@7.3.5` declares `engines.node: ">=22.12.0"` (same floor as v6; Node 18/20 dropped in v6). Local Node 24.19.0 is fine.
`@astrojs/mdx@8.0.2` declares the same engine.

**TypeScript: do NOT install 7.x.** `@astrojs/check@0.9.10` declares `peerDependencies.typescript: "^5.0.0 || ^6.0.0"`.
With TS 7 installed, `astro check` behaves as if TypeScript is missing and prompts to install it
(https://github.com/withastro/astro/issues/17268, closed as upstream / unable to fix; maintainer: "TypeScript 7 does not
currently support languages like Astro, Vue, Svelte. We cannot fix it until they do."). Tracking:
https://github.com/withastro/roadmap/discussions/1321. Newest 6.x on npm is `typescript@6.0.3`. Pin it:

```bash
npm install astro@7.3.5 @astrojs/sitemap@3.7.4 @astrojs/rss@4.0.19
npm install -D @astrojs/check@0.9.10 typescript@6.0.3
```

**Bundled dependency majors in astro 7.3.5** (from npm metadata): Vite `^8.0.13`, Zod `^4.5.4`, Shiki `^4.0.2`,
`@astrojs/compiler-rs ^0.5.0`, `@astrojs/markdown-satteri 0.4.2`; `sharp ^0.35.4` is an optionalDependency;
`@astrojs/markdown-remark ^7.3.0` is an OPTIONAL peer (not installed by default any more).

### Astro 6 changes that matter for a static content site

| Change | Action |
|---|---|
| Legacy content collections removed; Content Layer API only | Every collection needs a `loader`; no `type: 'content'`; `entry.slug` -> `entry.id`; `entry.render()` -> `render(entry)`; `getEntryBySlug()` -> `getEntry()` |
| Zod 4; `z` from `astro:content` and `astro:schema` deprecated | `import { z } from 'astro/zod'` |
| `Astro.glob()` removed | `import.meta.glob('./x/*.md', { eager: true })` |
| `<ViewTransitions />` removed | `<ClientRouter />` (we use neither) |
| `Astro` inside `getStaticPaths()` deprecated / throws | Use `import.meta.env.SITE` instead of `Astro.site` |
| `getStaticPaths()` params must be strings | `params: { id: '123' }`, never a number |
| Endpoints with a file extension cannot have a trailing slash | `/sitemap.xml`, `/robots.txt`, `/og/x.png` are served without slash regardless of `trailingSlash` |
| Heading ids: trailing hyphens no longer stripped | `` ## `<Picture />` `` gives `id="picture-"`; check hand-written anchors |
| Scripts and styles render in source order | Was reversed before |
| Images: default service crops by default, never upscales; SVG can be rasterized when `format` is set | Review `width`/`height`/`fit` usage |
| Responsive image styles emitted at build time as hashed classes + `data-*` | Intended to remove the inline `style` attribute; docs disagree, see "Could not verify" item 3 |
| `import.meta.env` values always inlined, never coerced | Convert strings to booleans/numbers manually |
| `.cjs` / `.cts` config files unsupported | Use `astro.config.mjs` or `.ts` |
| Experimental flags removed because stable: `csp`, `fonts`, `liveContentCollections`, `preserveScriptOrder`, `staticImportMetaEnv`, `headingIdCompat` | Delete from `experimental` |

### Astro 7 changes that matter for a static content site

| Change | Action |
|---|---|
| Vite 8 (Rolldown bundler) | Only matters for custom Vite plugins/config |
| Rust `.astro` compiler is the only compiler | Unclosed non-void tags and unterminated attributes are build ERRORS; invalid HTML nesting is passed through, not auto-corrected |
| `compressHTML` default changed `true` -> `'jsx'` | Line breaks between inline elements no longer produce a space; write `{" "}` or set `compressHTML: true` |
| Markdown rendered by Sätteri (Rust) instead of remark/rehype | remark/rehype plugins need `npm i @astrojs/markdown-remark` + `markdown.processor: unified({...})` (see section 9) |
| `src/fetch.ts` is a reserved filename (advanced routing) | Do not create it, or set `fetchFile: null` |
| `@astrojs/db` removed | n/a |
| `astro:transitions` internals removed | n/a |
| Experimental flags removed because stable/default: `logger`, `queuedRendering`, `rustCompiler`, `advancedRouting`, `cache` | Delete from `experimental` |
| CSS values may serialize differently (`rebeccapurple` -> `#639`, `url()` quoting) | Cosmetic only |

Whitespace example from the v7 guide (the two elements are on separate lines in source):

```astro
<span>hello</span>
<em>world</em>
<!-- v6: "hello world"   v7 default: "helloworld" -->
<span>hello</span>{" "}<em>world</em>
```

## 2. Content collections

Sources: https://docs.astro.build/en/guides/content-collections/ ,
https://docs.astro.build/en/reference/modules/astro-content/ ,
https://docs.astro.build/en/reference/content-loader-reference/

- Config file: **`src/content.config.ts`** (`.js` / `.mjs` also supported). The old `src/content/config.ts` is gone with legacy collections.
- Imports: `defineCollection`, `reference`, `getCollection`, `getEntry`, `getEntries`, `render` from **`astro:content`**;
  `glob`, `file` from **`astro/loaders`**; **`z` from `astro/zod`** (Zod **4**; `z` from `astro:content` is deprecated since v6).
- Content files may live anywhere; `base` is relative to the project root.

```ts
// src/content.config.ts  (verbatim shape from the docs)
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
```

`glob()` options: `pattern` (`string | string[]`, micromatch syntax), `base` (`string | URL`, default `"."`),
`generateId({ entry, base, data })`, `retainBody` (default `true`, since 5.17; `false` makes `entry.body` undefined),
`deferRender` (default `false`, since 7.1).

**How `id` is derived.** Generated from the file path relative to `base`, extension removed, each path segment slugified
with `github-slugger` (kebab-case, **lowercased**), subfolders kept as `dir/name`, trailing `/index` removed. Docs example: `src/blog/hello-world.md` -> id `hello-world`. A `slug:` field in frontmatter
overrides the id and may contain slashes. To keep the original casing:

```ts
loader: glob({
  pattern: '**/*.json',
  base: './src/data/authors',
  generateId: ({ entry }) => entry.replace(/\.json$/, ''),
}),
```

Image fields use the schema function form: `schema: ({ image }) => z.object({ cover: image() })` (`image().refine()` unsupported).

Zod 4 gotchas (v6 upgrade guide): `z.string().email()` -> `z.email()`, `z.string().url()` -> `z.url()`;
`{ message: '...' }` -> `{ error: '...' }`; `.default()` after `.transform()` must match the OUTPUT type.

**Querying and rendering.**

```astro
---
import { getCollection, getEntry, render } from 'astro:content';

// Order is non-deterministic and platform-dependent: always sort yourself.
const posts = (await getCollection('blog', ({ data }) => data.draft !== true))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const entry = await getEntry('blog', 'post-1');   // undefined when missing
if (!entry) throw new Error('Entry not found');
const { Content, headings, remarkPluginFrontmatter } = await render(entry);
---
<Content />
```

- `headings` is `MarkdownHeading[]`: `{ depth: number; slug: string; text: string }` (slug via github-slugger).
- `CollectionEntry` fields: `id`, `collection`, `data`, `body` (raw uncompiled markdown, `string | undefined`),
  `rendered` (`rendered.html`, `rendered.metadata.headings`, `.imagePaths`, `.frontmatter`), `filePath` (relative to project root).
- Raw markdown for llms.txt or search indexes: `entry.body`. Pre-rendered HTML string: `entry.rendered?.html`.
- Type for props: `import type { CollectionEntry } from 'astro:content'` then `CollectionEntry<'blog'>`.

## 3. Dynamic routes and static file endpoints

Sources: https://docs.astro.build/en/reference/routing-reference/ , https://docs.astro.build/en/guides/endpoints/ ,
https://docs.astro.build/en/guides/typescript/#infer-getstaticpaths-types

Signature: `(options: GetStaticPathsOptions) => Promise<GetStaticPathsResult> | GetStaticPathsResult`.
Rules: `params` values must be **strings** (numbers throw since v6); `props` may be anything; the function runs once in an
isolated scope (only imports are visible); `Astro` must not be used inside it (use `import.meta.env.SITE`).
Use `[...slug]` (rest param) when ids contain `/`.

```astro
---
// src/pages/[slug].astro
import type { GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getCollection, render } from 'astro:content';

export const getStaticPaths = (async () => {
  const pages = await getCollection('pages');
  return pages.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
const { entry } = Astro.props;
const { Content, headings } = await render(entry);
---
<Content />
```

Static file endpoints: the `.ts` extension is stripped, so `src/pages/robots.txt.ts` builds `/robots.txt`. Export `GET`,
return a `Response`; at build time Astro writes the body to the file. Headers set on the Response are believed NOT to be
persisted in a static build (unverified, see "Could not verify" item 4). Endpoints with a file extension are never served with a
trailing slash.

```ts
// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET = (({ site }) => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}) satisfies APIRoute;
```

```ts
// src/pages/og/[slug].png.ts  (binary body)
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths = (async () => {
  const pages = await getCollection('pages');
  return pages.map((entry) => ({ params: { slug: entry.id }, props: { title: entry.data.title } }));
}) satisfies GetStaticPaths;

export const GET = (async ({ props }) => {
  const png: Uint8Array = await renderOgPng(props.title); // your own renderer (e.g. satori + resvg/sharp)
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}) satisfies APIRoute;
```

The docs' own binary example is `return new Response(await response.arrayBuffer());`. `src/pages/llms.txt.ts` follows the
robots.txt pattern, building the body from `getCollection()` and `entry.body`. In static mode only `request.url` is usable
on `request`.

## 4. astro.config options (site, trailingSlash, build.format, scripts, CSP)

Sources: https://docs.astro.build/en/reference/configuration-reference/ ,
https://docs.astro.build/en/guides/client-side-scripts/ , https://docs.astro.build/en/guides/styling/#bundle-control ,
https://docs.astro.build/en/reference/directives-reference/

| Option | Type / default | Verified behaviour |
|---|---|---|
| `site` | `string` | Final deployed URL; used for sitemap, canonical URLs, `Astro.site`, `context.site`, `import.meta.env.SITE` |
| `output` | `'static' \| 'server'`, default `'static'` | Leave as default |
| `trailingSlash` | `'always' \| 'never' \| 'ignore'`, default `'ignore'` | Affects the DEV server and on-demand routes only. "Trailing slashes on prerendered pages are handled by the hosting platform, and may not respect your chosen configuration." |
| `build.format` | `'file' \| 'directory' \| 'preserve'`, default `'directory'` | `file`: `about.astro` and `about/index.astro` both build `/about.html`. `directory`: `/about/index.html`. `preserve`: mirrors source layout |
| `build.inlineStylesheets` | `'always' \| 'auto' \| 'never'`, default `'auto'` | `auto` inlines stylesheets smaller than `vite.build.assetsInlineLimit` (4 kB); `never` always emits `<link rel="stylesheet">` |
| `build.assets` | `string`, default `'_astro'` | Output folder for hashed assets |
| `compressHTML` | `boolean \| 'jsx'`, default `'jsx'` (v7) | See section 1 |
| `scopedStyleStrategy` | `'where' \| 'class' \| 'attribute'`, default `'attribute'` | |
| `build.concurrency` | `number`, default `1` | Docs advise leaving it at 1 |

Docs pairing advice: `build.format: 'file'` with `trailingSlash: 'never'`; `'directory'` with `'always'`.
**Gotcha:** with `build.format: 'file'`, `Astro.url.pathname` during build includes `.html` (for example `/foo.html`), so never
build canonical URLs from `Astro.url` directly; strip `.html` or derive the canonical path from the route/entry id.

### Scripts: inline vs external

A `<script>` with no attributes (other than `src`) is processed: TypeScript, bundled imports, `type="module"`, de-duplicated,
and "If the script is small enough, Astro will inline it directly into the HTML". The styling guide states that
`vite.build.assetsInlineLimit` "affects script and image inlining as well". So to force every processed script and
stylesheet into an external file:

```js
export default defineConfig({
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
```

Still inline no matter what (avoid under a strict policy): `<script is:inline>`, any `<script>` with extra attributes
(unprocessed, rendered as written), `<script define:vars={...}>` (implies `is:inline`), inline event handlers
(`onclick="..."`), and `style="..."` attributes. For a hand-written external file use
`<script is:inline src="/my-script.js"></script>` with the file in `public/`.

### Built-in CSP: `security.csp` (stable since 6.0.0)

- `boolean | object`, default `false`. Adds `<meta http-equiv="content-security-policy">` to the `<head>` of each page with
  `script-src` and `style-src` plus hashes of the scripts and styles Astro processed for that page. For a static build this
  is the only mechanism: a meta tag, no headers.
- Not available in `astro dev`; test with `astro build` + `astro preview`.
- Documented limitations: external scripts/styles need your own hashes; `<ClientRouter />` unsupported; **Shiki unsupported**
  (inline styles; use Prism or allow style attributes); including `'unsafe-inline'` in a directive suppresses Astro's hashes.
- A `<meta>` policy cannot carry `frame-ancestors`, `report-uri` or `sandbox` (CSP spec, not Astro), so those must be
  real headers set by the host.

```js
export default defineConfig({
  security: {
    csp: {
      algorithm: 'SHA-256',                       // 'SHA-256' | 'SHA-384' | 'SHA-512'
      directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'"],
      scriptDirective: { resources: ["'self'"], hashes: [], strictDynamic: false },
      styleDirective: {
        resources: [
          "'self'",
          // v7.1+: scoped entries. Needed only if style="" attributes must be allowed (Shiki, define:vars):
          // { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
});
```

`resources` REPLACES the defaults, so `'self'` must be listed explicitly. `hashes` entries must start with `sha256-`,
`sha384-` or `sha512-`. Since v7.1 entries may be `{ hash | resource, kind: 'element' | 'attribute' | 'default' }`, mapping to
`script-src-elem` / `script-src-attr` / `style-src-elem` / `style-src-attr`.

### Two workable CSP strategies for this site

1. **Header-based, zero inline** (our plan): `assetsInlineLimit: 0` + `inlineStylesheets: 'never'`, no `is:inline`, no
   `define:vars`, no `style=""`, no Shiki; policy `script-src 'self'; style-src 'self'` sent by the host
   (`public/_headers` on Cloudflare Pages / Netlify, `vercel.json` on Vercel). Leave `security.csp` off.
   Watch the Fonts API `<Font />` inline `<style>` (section 5) and responsive-image output (section 6).
2. **Astro-managed hashes**: `security.csp: true`; Astro hashes whatever it inlines and writes a per-page meta tag.
   Simpler, but meta-only and per-page.

## 5. Fonts

Sources: https://docs.astro.build/en/guides/fonts/ , https://docs.astro.build/en/reference/configuration-reference/#fonts ,
https://docs.astro.build/en/reference/font-provider-reference/ ,
https://docs.astro.build/en/reference/modules/astro-assets/#font-

**Status: stable since Astro 6.0.0** (top-level `fonts` array; the `experimental.fonts` flag was removed in v6).
Fonts are downloaded/copied at build time and emitted to **`_astro/fonts/`**, i.e. always self-hosted.
Built-in providers (from `astro/config`): `adobe`, `bunny`, `fontshare`, `fontsource`, `google`, `googleicons`, `local`, `npm`.

Per-family options and defaults: `name`, `cssVariable` (must start with `--`), `provider`, `weights` (`[400]`),
`styles` (`["normal", "italic"]`), `subsets` (`["latin"]`), `formats` (`["woff2"]`), `fallbacks` (`["sans-serif"]`),
`optimizedFallbacks` (`true`), `display` (`"swap"`), `unicodeRange`, `stretch`, `featureSettings`, `variationSettings`, `options`.

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  fonts: [
    // A) Fontsource catalogue, fetched at build time (needs network on first build, then cached)
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],       // variable-font range; or [400, 600, 700]
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    // B) Local files committed to the repo (fully offline, deterministic)
    {
      provider: fontProviders.local(),
      name: 'Custom',
      cssVariable: '--font-custom',
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/custom-400.woff2'] },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/custom-700.woff2'] },
          // variable font: { weight: '100 900', style: 'normal', src: ['./src/assets/fonts/InterVariable.woff2'] }
        ],
      },
    },
    // C) From an installed npm package such as @fontsource/roboto, never touching a CDN
    {
      provider: fontProviders.npm({ remote: false }),
      name: 'Roboto',
      cssVariable: '--font-roboto',
      options: { package: '@fontsource/roboto' /*, file: 'latin.css' */ },
    },
  ],
});
```

```astro
---
// src/components/Head.astro  (must be rendered inside <head>)
import { Font } from 'astro:assets';
---
<Font cssVariable="--font-inter" preload />
<!-- preload also accepts [{ weight: 400, style: 'normal', subset: 'latin' }] -->

<style is:global>
  body { font-family: var(--font-inter); }
</style>
```

`<Font />` "outputs style tags" (an inline `<style>` with the `@font-face` rules) plus optional `<link rel="preload">`.
That inline `<style>` matters for a strict `style-src` policy, see section 4.
Caches: delete `.astro/fonts` (dev) or `node_modules/.astro/fonts` (build) to reset. Preload sparingly.

**Plain `@fontsource` imports.** Importing a CSS file from an npm package (`import '@fontsource-variable/inter';` or
`@import` in a stylesheet) is ordinary Vite CSS handling and is covered generally by the styling guide
(https://docs.astro.build/en/guides/styling/#import-a-stylesheet-from-an-npm-package). The current fonts guide no longer
shows that pattern, so it is "works, but not the documented path"; you lose automatic fallback metrics and preload links.
It has one advantage for CSP: the `@font-face` rules land in the bundled external stylesheet instead of an inline `<style>`.

## 6. Images

Sources: https://docs.astro.build/en/guides/images/ , https://docs.astro.build/en/reference/modules/astro-assets/ ,
https://docs.astro.build/en/reference/configuration-reference/#image-options

- Keep optimisable images in `src/` and import them; files in `public/` are never processed and cannot be responsive.
- Default service is Sharp (`astro/assets/services/sharp`); `sharp` is an optionalDependency of `astro`, so a separate
  install is normally unnecessary. Default output format is **webp**. `alt` is mandatory on both components.
- v6 behaviour changes: crops by default when both dimensions are given, never upscales, SVG sources can be rasterised when
  `format` is set. `image.dangerouslyProcessSVG` (default `false`, since 6.3.0) gates SVG through the optimisation pipeline.
- `getImage()` is server-only (throws on the client since v6); use it for OG images, CSS backgrounds, endpoints.

```astro
---
import { Image, Picture } from 'astro:assets';
import hero from '../assets/hero.png';
import Logo from '../assets/logo.svg';   // SVG component, inlined into the HTML (since 5.7)
---
<Image src={hero} alt="Description" layout="constrained" width={800} height={600} priority />
<Picture src={hero} formats={['avif', 'webp']} alt="Description" />
<Logo width={64} height={64} fill="currentColor" />
```

Responsive images (since 5.10): `layout` is `'constrained' | 'full-width' | 'fixed' | 'none'` and auto-generates `srcset` and
`sizes`. Global defaults:

```js
image: {
  layout: 'constrained',
  responsiveStyles: true,   // default false; adds the small :where([data-astro-image]) global rules
  // breakpoints default for local services: [640, 750, 828, 1080, 1280, 1668, 2048, 2560]
},
```

`image.layout` also applies to Markdown `![]()` images. With Tailwind 4, leave `responsiveStyles` off and style yourself.
Props worth knowing: `widths` + `sizes`, `densities`, `quality` (`low|mid|high|max` or 0-100), `fit`, `position`,
`priority` (sets `loading="eager"`, `decoding="sync"`, `fetchpriority="high"`), `fallbackFormat`, `pictureAttributes`.

Content-collection images: `schema: ({ image }) => z.object({ cover: image() })`, then `<Image src={entry.data.cover} />`.

## 7. @astrojs/sitemap 3.7.x

Sources: https://docs.astro.build/en/guides/integrations-guide/sitemap/ ;
integration source and tests at https://github.com/withastro/astro/tree/main/packages/integrations/sitemap

Requires `site` (must start with `http://` or `https://`); without it the integration logs a warning and skips.
Only routes of type `page` are listed (endpoints and redirects are excluded); `404` and `500` pages are excluded automatically.

| Option | Type / default | Notes |
|---|---|---|
| `filter` | `(page: string) => boolean` | `page` is the FULL URL including `site` |
| `customPages` | `string[]` | Extra absolute URLs not built by Astro |
| `customSitemaps` | `string[]`, default `[]` (3.5.0) | Extra sitemap URLs added to the index file |
| `entryLimit` | `number`, default `45000` | Max entries per file before a new numbered file |
| `changefreq`, `lastmod`, `priority` | site-wide values | `lastmod` is a `Date`; Google ignores changefreq/priority |
| `serialize` | `(item: SitemapItem) => SitemapItem \| undefined` (may be async) | Per-URL edits; return `undefined` to drop |
| **`chunks`** | `Record<string, (item: SitemapItem) => SitemapItem \| undefined>` (**3.7.0**) | Splits into named sitemap files |
| `i18n` | `{ defaultLocale: string; locales: Record<string, string> }` | Adds `xhtml:link` alternates |
| `xslURL` | `string` (3.2.0) | Stylesheet for the XML |
| `filenameBase` | `string`, default `sitemap` (3.4.0) | Changes the `sitemap` prefix |
| `namespaces` | `{ news?, xhtml?, image?, video? }` booleans (3.6.0) | Set to `false` to drop unused `xmlns:*` |

`SitemapItem`: `{ url: string; lastmod?: string; changefreq?: ChangeFreqEnum; priority?: number; links?: LinkItem[] }`
(note `lastmod` is an ISO **string** inside `serialize`/`chunks`).

**File names.** Default: `sitemap-index.xml` + `sitemap-0.xml` (then `sitemap-1.xml`, ...). With `chunks`:
`sitemap-<key>-0.xml` per key, plus `sitemap-pages-0.xml` for every URL no chunk claimed, all listed in `sitemap-index.xml`.
So `pages` is effectively a reserved chunk name. `serialize` runs BEFORE chunking (verified in source).

```js
import sitemap from '@astrojs/sitemap';

sitemap({
  filter: (page) => !page.includes('/drafts/'),
  namespaces: { news: false, video: false, image: false, xhtml: false },
  chunks: {
    blog: (item) => {
      if (/\/blog\//.test(item.url)) return item;
    },
    services: (item) => {
      if (/\/services\//.test(item.url)) return item;
    },
  },
});
// -> sitemap-index.xml, sitemap-blog-0.xml, sitemap-services-0.xml, sitemap-pages-0.xml
```

**`trailingSlash: 'never'` + `build.format: 'file'`.** The integration's own test suite asserts that with
`trailingSlash: 'never'` URLs are `http://example.com/`, `http://example.com/one`, `http://example.com/two`
(the root keeps its slash, other pages have none, and there is no `.html` suffix). The same output is asserted for
`trailingSlash: 'ignore'` + `build.format: 'file'`. Still inspect the generated XML after the first build.

Discovery: add `<link rel="sitemap" href="/sitemap-index.xml" />` in `<head>` and a `Sitemap:` line in robots.txt.

## 8. @astrojs/rss 4.x

Source: https://docs.astro.build/en/recipes/rss/ (README: https://github.com/withastro/astro/tree/main/packages/astro-rss)

`@astrojs/rss@4.0.19` depends on `zod ^4.3.6` and `fast-xml-parser`. Needs `site` in astro.config.
Item fields: `title`, `description`, `link`, `pubDate`, `content` (title OR description required).
RSS links get a trailing slash by default regardless of astro config; with `trailingSlash: 'never'` pass `trailingSlash: false`.

```ts
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET = (async (context) => {
  const blog = await getCollection('blog');
  return rss({
    title: 'Site title',
    description: 'Site description',
    site: context.site!,          // undefined if `site` is not configured
    trailingSlash: false,         // match trailingSlash: 'never'
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}) satisfies APIRoute;
```

Optional: `stylesheet: '/rss/styles.xsl'`; `rssSchema` from `@astrojs/rss` can be used as a collection schema.
Auto-discovery tag: `<link rel="alternate" type="application/rss+xml" title="..." href={new URL('rss.xml', Astro.site)} />`.
Full-content feeds: the docs render `post.body` with `markdown-it` and pass it through `sanitize-html`.

## 9. Markdown pipeline

Sources: https://docs.astro.build/en/guides/markdown-content/ ,
https://docs.astro.build/en/reference/configuration-reference/#markdown-options ,
https://docs.astro.build/en/guides/syntax-highlighting/

- **Default processor in v7 is Sätteri** (Rust, https://satteri.bruits.org/), bundled with `astro`; zero config needed.
  `markdown.processor` exists since 6.4.0.
- **GFM is on by default** in both processors: tables, strikethrough, task lists, footnotes. **MDX is NOT needed for tables.**
  Only add `@astrojs/mdx` if components/JSX are required inside content.
- Smart punctuation is on by default (straight quotes become curly, `--` becomes a dash, `...` becomes an ellipsis).
- Heading ids: Astro injects `id` on `h1`-`h6` using `github-slugger`; ids are injected AFTER user plugins run.
  Since v6 trailing hyphens are kept (`` ## `<Picture />` `` -> `picture-`).
- Syntax highlighting default: `{ type: 'shiki', excludeLangs: ['math'] }`, theme `github-dark`. Shiki emits inline `style`
  attributes (relevant to CSP, see section 4). Alternatives: `'prism'` (class-based, bring your own stylesheet) or `false`.
- Deprecated but still working (they require `@astrojs/markdown-remark` to be installed): `markdown.remarkPlugins`,
  `markdown.rehypePlugins`, `markdown.remarkRehype`, `markdown.gfm`, `markdown.smartypants`.

Configure Sätteri (only needed to change features or add plugins; requires `npm install @astrojs/markdown-satteri`):

```js
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism', // or false, or { type: 'shiki', excludeLangs: ['mermaid', 'math'] }
    processor: satteri({
      features: {
        smartPunctuation: false, // or { quotes: true, dashes: false, ellipses: false }
        // gfm: false,
      },
      // mdastPlugins: [], hastPlugins: [],   <- Sätteri-format plugins, NOT remark/rehype
    }),
  },
});
```

Keep remark/rehype plugins (requires `npm install @astrojs/markdown-remark`):

```js
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkToc, { heading: 'contents' }]],
      rehypePlugins: [],
      // gfm: false, smartypants: false
    }),
  },
});
```

## 10. astro check and tsconfig

Sources: https://docs.astro.build/en/guides/typescript/ , https://docs.astro.build/en/reference/cli-reference/#astro-check ,
https://github.com/withastro/astro/tree/main/packages/astro/tsconfigs , `npm view @astrojs/check@0.9.10`

- Required packages: `@astrojs/check` and `typescript` as devDependencies. Peer range is `^5.0.0 || ^6.0.0`, so the
  installed **`typescript@6.0.3` is correct; do not move to 7.x** (section 1).
- `astro dev` and `astro build` do NOT type-check. `astro check` checks `.astro` and `.ts` files, runs `astro sync` first
  (generates `.astro/types.d.ts` and the `astro:content` types) and exits with code 1 on errors.
- Flags: `--watch`, `--root <dir>`, `--tsconfig <file>`, `--minimumFailingSeverity <error|warning|hint>` (default `error`),
  `--minimumSeverity <error|warning|hint>` (default `hint`), `--preserveWatchOutput`, `--noSync`.

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro check && astro build",
    "preview": "astro preview"
  }
}
```

```json
// tsconfig.json (docs recommendation, with the strict preset)
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

What the presets contain (read from the repo `main` branch):

- `base`: `target`/`module` `ESNext`, `moduleResolution: "Bundler"`, `allowImportingTsExtensions`, `resolveJsonModule`,
  `verbatimModuleSyntax: true` (so type-only imports MUST be written `import type { ... }`), `isolatedModules`, `noEmit`,
  `forceConsistentCasingInFileNames`, `esModuleInterop`, `skipLibCheck`, `allowJs`, `jsx: "preserve"`.
- `strict`: extends base, adds `"strict": true`.
- `strictest`: extends strict, adds `noFallthroughCasesInSwitch`, `noImplicitOverride`, `noImplicitReturns`,
  `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `allowUnreachableCode: false`, `allowUnusedLabels: false`.

Optional `src/env.d.ts` for global types starts with `/// <reference path="../.astro/types.d.ts" />`.

## 11. Accessibility, ClientRouter, static deployment

Sources: https://docs.astro.build/en/guides/dev-toolbar/ , https://docs.astro.build/en/guides/images/#alt-text ,
https://docs.astro.build/en/guides/view-transitions/ , https://docs.astro.build/en/guides/deploy/cloudflare/ ,
https://docs.astro.build/en/guides/deploy/netlify/ , https://docs.astro.build/en/guides/deploy/vercel/

**Accessibility.** There is no dedicated accessibility guide page (`/en/guides/accessibility/` returns 404). What exists:

- Dev toolbar **Audit** app: runs basic performance and accessibility audits on the current page in `astro dev`. Docs say
  it is "not a replacement for dedicated tools like Pa11y or Lighthouse, or even better, humans".
- `alt` is required on `<Image />` and `<Picture />` (build error without it); use `alt=""` for decorative images.
- Docs "strongly recommend you always include a `<title>` in each page".

**ClientRouter (not used).** Skipping it is the simpler path: a plain multi-page site needs no route announcer, no script
re-execution handling, and stays compatible with `security.csp` (which does not support `<ClientRouter />`). If page
animations are wanted later, browser-native cross-document view transitions are CSS-only and add no JavaScript.
`prefetch` is separate and opt-in (`prefetch.prefetchAll` defaults to `false` without `<ClientRouter />`); it injects a
client script, so leave it off for the zero-inline plan unless tested.

**Static deployment: no adapter needed.** Adapters are only for on-demand rendering. Output directory is `dist/`.

| Host | Verified from Astro docs |
|---|---|
| Netlify | "You don't need any extra configuration to deploy a static Astro site to Netlify." Build `astro build`, publish `dist`. Node must be `v22.12.0` or higher (set `NODE_VERSION` if on a legacy build image) |
| Vercel | "You don't need any extra configuration to deploy a static Astro site to Vercel." `vercel.json` can attach headers |
| Cloudflare | The Astro guide now targets **Cloudflare Workers static assets**, stating "Cloudflare recommends using Cloudflare Workers for new projects"; Pages is treated as the existing/legacy option |

```jsonc
// wrangler.jsonc for a static site (from the Astro Cloudflare guide)
{
  "name": "my-astro-app",
  "compatibility_date": "YYYY-MM-DD", // the day you deploy
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"   // needed to serve a custom 404 page
  }
}
```

Build command `npx astro build`, deploy command `npx wrangler deploy`. Cloudflare "Auto Minify" can break hydration
(irrelevant without islands). Because prerendered trailing-slash behaviour is decided by the host, confirm on the chosen
host that `/about` serves `about.html` without redirecting to `/about/` or `/about.html`.

## 12. Windows-specific issues

Sources: https://docs.astro.build/en/reference/cli-reference/#--background ,
https://docs.astro.build/en/install-and-setup/ , https://docs.astro.build/en/guides/content-collections/

Documented, Windows-specific:

- `astro dev --background` (since 7.0.0; `astro preview --background` since 7.2.0): "On Windows, automatic backgrounding
  does not happen: when an AI agent is detected, the server stays in the foreground so the agent can manage the process
  directly." The flag can still be passed manually. Practical effect: when a coding agent runs `astro dev` on this
  machine the command blocks, so run it as a background task and stop it explicitly (`astro dev stop`, `astro dev status`).
  The lock file is `.astro/dev.json` / `.astro/preview.json`.

Documented, platform-dependent (bites on Windows vs Linux CI):

- "The sort order of generated collections is non-deterministic and platform-dependent." Always `.sort()` the result of
  `getCollection()`, otherwise local Windows builds and Linux CI builds order pages differently.
- `forceConsistentCasingInFileNames` is on in all tsconfig presets. Windows file systems are case-insensitive while
  Linux build hosts are not, so an import with the wrong letter case works locally and fails in CI. Keep file names lowercase.
- Node: "`v22.12.0` or higher. Odd-numbered versions like `v23` are not supported." Local v24.19.0 is an even release.

No other Windows-specific notes were found in the upgrade guides, troubleshooting page, or deploy guides.

## Recommended astro.config.mjs

Every option below is verified against the v7 configuration reference. Replace the `site` value and chunk patterns.

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',          // no trailing slash; required by sitemap, rss, canonical URLs
  output: 'static',                     // default, shown for clarity
  trailingSlash: 'never',
  build: {
    format: 'file',                     // /about.html (docs pair this with trailingSlash: 'never')
    inlineStylesheets: 'never',         // always <link rel="stylesheet">
  },
  vite: {
    build: { assetsInlineLimit: 0 },    // no inlined scripts, styles or data: URI assets
  },
  // compressHTML: true,                // uncomment to restore pre-v7 whitespace handling
  markdown: {
    syntaxHighlight: false,             // Shiki (default) emits inline style attributes; false or 'prism' for strict CSP
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { weight: '100 900', style: 'normal', src: ['./src/assets/fonts/InterVariable.woff2'] },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      namespaces: { news: false, video: false, image: false, xhtml: false },
      chunks: {
        blog: (item) => {
          if (/\/blog\//.test(item.url)) return item;
        },
      },
    }),
  ],
});
```

If the header-based CSP must contain no inline `<style>` at all, drop the `fonts` block and `<Font />`, and import the
font CSS into the global stylesheet instead (section 5). If Astro-managed hashes are acceptable, add
`security: { csp: true }` and keep `fonts`.

## Recommended src/content.config.ts skeleton

```ts
// src/content.config.ts
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';          // Zod 4

const seo = {
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(200),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
};

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    ...seo,
    updatedDate: z.coerce.date().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      ...seo,
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      author: reference('authors'),
      tags: z.array(z.string()).default([]),
      canonical: z.url().optional(),    // Zod 4: z.url(), not z.string().url()
    }),
});

const authors = defineCollection({
  loader: file('src/data/authors.json'), // array of objects, each with a unique `id`
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { pages, blog, authors };
```

Id rules to design URLs around (verified in `packages/astro/src/content/utils.ts` and `loaders/glob.ts`): the path relative
to `base` loses its extension, each path segment is passed through `github-slugger`, segments are joined with `/`, and a
trailing `/index` is removed. So `blog/2026/My Post.md` -> `2026/my-post` and `services/index.md` -> `services`. Nested ids
need a `[...slug].astro` rest route. A frontmatter `slug` wins over all of this. Do not name a schema field `slug` for any
other purpose.

## Could not verify

Method note: docs were read from the raw sources of `withastro/docs` and `withastro/astro` (`main` branch) on 2026-09-27,
plus `npm view`. `main` can be slightly ahead of the published `astro@7.3.5` / `@astrojs/sitemap@3.7.4`. Nothing below was
confirmed by running a build. The web search quota ran out, so GitHub issues were not searched broadly.

1. **Forcing external scripts.** The styling guide says `vite.build.assetsInlineLimit` "affects script and image inlining
   as well", but the scripts guide itself names no option. Not tested on 7.3.5 (Vite 8 / Rolldown). After the first build,
   search `dist/**/*.html` for `<script` tags without `src` and for `<style` tags.
2. **`<Font />` and CSP.** Docs only say it "outputs style tags". Whether that is always an inline `<style>`, and whether
   `security.csp` hashes it, is not stated.
3. **Responsive image inline styles.** The v6 upgrade guide says inline `style="--fit; --pos"` was replaced by a hashed class
   plus `data-astro-fit` / `data-astro-pos`, but the images guide still shows `style="--fit: cover; --pos: center;"` in its
   sample output. Inspect real output before relying on either.
4. **Response headers from static endpoints.** Section 3 states that headers set on a `Response` are not persisted in a
   static build. This is from prior knowledge, not from the current docs. Set Content-Type via host config if it matters.
5. **Prism for Markdown.** `markdown.syntaxHighlight: 'prism'` is documented; whether `@astrojs/prism` must be installed
   separately for Markdown code blocks (it must for the `<Prism />` component) is not stated.
6. **TypeScript 7 timeline.** No official date for `@astrojs/check` support. Issue #17268 references PR #18053, which was
   not read.
7. **Host trailing-slash behaviour.** Whether Cloudflare, Netlify or Vercel serve `about.html` at `/about` without a
   redirect is host documentation, not checked here.
8. **Sitemap edge cases.** Behaviour when a `chunks` function matches zero URLs (empty file or none) and per-chunk
   `lastmod` in the index were seen only in `main` source, not confirmed for 3.7.4.
9. **github-slugger on unusual filenames.** Effect of dots, underscores or non-ASCII characters in filenames on the
   generated id was not tested. Keep content filenames lowercase kebab-case.
10. **tsconfig `include`/`exclude`.** On `main`, `base.json` already sets them using `${configDir}`; whether the published
    7.3.5 preset does too was not checked. Keeping them in `tsconfig.json` as the docs show is harmless.
11. **Windows.** No documented problems for `sharp@0.35.4`, `@astrojs/compiler-rs` or Sätteri native binaries on Windows
    were found, but absence from the docs is not proof.
