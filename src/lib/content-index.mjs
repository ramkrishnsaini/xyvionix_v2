/**
 * File-system view of the content collections for code that runs outside
 * Astro's module graph: astro.config.mjs, validation scripts, doc generators.
 * Reads frontmatter directly so it never depends on a build having run.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const here = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(here, '..', '..');
export const contentRoot = path.join(projectRoot, 'src', 'content');

/** Collection key -> folder name under src/content. */
export const collectionDirs = {
  assurance: 'assurance',
  useCases: 'use-cases',
  technologies: 'technologies',
  industries: 'industries',
  insights: 'insights',
};

function toIsoDate(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/**
 * @returns {Array<{slug:string, collection:string, file:string, data:Record<string,any>, body:string}>}
 */
export function readAllEntries({ includeDrafts = false } = {}) {
  const entries = [];

  for (const [collection, dir] of Object.entries(collectionDirs)) {
    const folder = path.join(contentRoot, dir);
    if (!fs.existsSync(folder)) continue;

    for (const name of fs.readdirSync(folder).sort()) {
      if (!name.endsWith('.md')) continue;
      const file = path.join(folder, name);
      const parsed = matter(fs.readFileSync(file, 'utf8'));
      if (parsed.data.draft === true && !includeDrafts) continue;

      entries.push({
        slug: name.replace(/\.md$/, ''),
        collection,
        file: path.relative(projectRoot, file).replaceAll('\\', '/'),
        data: parsed.data,
        body: parsed.content,
      });
    }
  }

  return entries;
}

/** slug -> { collection, lastmod, noindex } for published entries. */
export function readSitemapIndex() {
  const index = new Map();
  for (const entry of readAllEntries()) {
    index.set(entry.slug, {
      collection: entry.collection,
      lastmod: toIsoDate(entry.data.modifiedDate),
      noindex: entry.data.noindex === true,
    });
  }
  return index;
}

/** Approximate reading time in whole minutes, from markdown source. */
export function readingMinutes(markdown) {
  const words = String(markdown ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|\-\[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
