/**
 * Small HTML readers for build validation. Regular expressions are enough
 * here because the input is this site's own generated markup.
 */

import fs from 'node:fs';
import path from 'node:path';

export function walk(dir, predicate = () => true) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

const decode = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

export const stripTags = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Attributes of a tag as an object. */
export function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    out[m[1].toLowerCase()] = decode(m[3] ?? m[4] ?? m[5] ?? '');
  }
  return out;
}

export const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => m[0]);

export function elements(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>([\\s\\S]*?)</${name}>`, 'gi'))].map((m) => ({
    open: `<${name}${m[1]}>`,
    inner: m[2],
  }));
}

export function meta(html) {
  const byName = new Map();
  const byProperty = new Map();
  for (const tag of tags(html, 'meta')) {
    const a = attrs(tag);
    if (a.name) byName.set(a.name.toLowerCase(), a.content ?? '');
    if (a.property) byProperty.set(a.property.toLowerCase(), a.content ?? '');
  }
  return { byName, byProperty };
}

export function links(html) {
  return tags(html, 'link').map(attrs);
}

export function anchors(html) {
  return tags(html, 'a').map(attrs);
}

export function jsonLd(html) {
  const blocks = [];
  for (const el of elements(html, 'script')) {
    const a = attrs(el.open);
    if ((a.type ?? '').toLowerCase() !== 'application/ld+json') continue;
    try {
      blocks.push({ ok: true, data: JSON.parse(el.inner) });
    } catch (error) {
      blocks.push({ ok: false, error: String(error) });
    }
  }
  return blocks;
}

/** Every node in a JSON-LD document, flattening @graph. */
export function graphNodes(doc) {
  if (Array.isArray(doc)) return doc.flatMap(graphNodes);
  if (doc && typeof doc === 'object') return Array.isArray(doc['@graph']) ? doc['@graph'] : [doc];
  return [];
}

/** Walks every string value in an object with its key path. */
export function* strings(value, keyPath = '') {
  if (typeof value === 'string') yield { key: keyPath, value };
  else if (Array.isArray(value)) for (const [i, v] of value.entries()) yield* strings(v, `${keyPath}[${i}]`);
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) yield* strings(v, keyPath ? `${keyPath}.${k}` : k);
}

export const isIsoDate = (text) => /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2}))?$/.test(text) && !Number.isNaN(Date.parse(text));
