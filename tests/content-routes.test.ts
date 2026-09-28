/**
 * Checks the real content on disk against the routing rules, and the
 * relationships between pages. Drafts are included: a draft with a bad slug
 * would break the build the moment it is published.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readAllEntries } from '../src/lib/content-index.mjs';
import { clusters } from '../src/data/clusters.ts';
import { reservedSlugs } from '../src/data/reserved-slugs.ts';
import { staticPages } from '../src/data/static-pages.ts';
import { findRouteProblems } from '../src/lib/slug-rules.ts';

interface Entry {
  slug: string;
  collection: string;
  file: string;
  data: Record<string, any>;
}

const entries: Entry[] = readAllEntries({ includeDrafts: true });
const bySlug = new Map(entries.map((e) => [e.slug, e]));
const staticSlugs = new Set(staticPages.map((p) => p.slug));

describe('content routes', () => {
  it('has content to check', () => {
    assert.ok(entries.length > 0);
  });

  it('has no empty, invalid, duplicate or reserved slug', () => {
    const problems = findRouteProblems(
      entries.map((e) => ({ slug: e.slug, source: e.file })),
      reservedSlugs,
    );
    assert.deepEqual(problems.map((p) => p.message), []);
  });

  it('keeps every URL at the root, with no nested content folders', () => {
    for (const e of entries) assert.equal(e.slug.includes('/'), false, e.file);
  });
});

describe('content relationships', () => {
  it('gives every page a parent that exists', () => {
    for (const e of entries) {
      const parent = e.data.parent;
      assert.ok(bySlug.has(parent) || staticSlugs.has(parent), `${e.file}: parent "${parent}" does not exist`);
    }
  });

  it('points every related link at a page in the matching collection', () => {
    for (const e of entries) {
      for (const [key, slugs] of Object.entries(e.data.related ?? {}) as [string, string[]][]) {
        for (const slug of slugs) {
          const target = bySlug.get(slug);
          assert.ok(target, `${e.file}: related.${key} lists "${slug}", which does not exist`);
          assert.equal(target.collection, key, `${e.file}: related.${key} lists "${slug}" from ${target.collection}`);
          assert.notEqual(slug, e.slug, `${e.file}: links to itself`);
        }
      }
    }
  });

  it('has a hub page for every assurance cluster', () => {
    for (const cluster of clusters) {
      const hub = bySlug.get(cluster.hub);
      assert.ok(hub, `hub ${cluster.hub} is missing`);
      assert.equal(hub.data.kind, 'hub');
      assert.equal(hub.data.cluster, cluster.key);
    }
  });

  it('attaches every assurance child to a hub in its own cluster', () => {
    for (const e of entries.filter((x) => x.collection === 'assurance' && x.data.kind === 'child')) {
      const hub = bySlug.get(e.data.parent);
      assert.ok(hub && hub.data.kind === 'hub', `${e.file}: parent is not a hub`);
      assert.equal(hub.data.cluster, e.data.cluster, `${e.file}: cluster differs from its hub`);
    }
  });
});
