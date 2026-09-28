/**
 * Flat routing safety. Every content entry becomes /<slug>, so a bad slug
 * can shadow a real page. These tests pin the rules that fail the build.
 *
 *   npm test
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { reservedSlugs, staticSlugs } from '../src/data/reserved-slugs.ts';
import { staticPages } from '../src/data/static-pages.ts';
import { assertRoutes, findRouteProblems, isValidSlug, MAX_SLUG_LENGTH } from '../src/lib/slug-rules.ts';

const entry = (slug: string, source = `test/${slug}.md`) => ({ slug, source });
const codes = (slugs: string[], reserved: ReadonlySet<string> = new Set()) =>
  findRouteProblems(slugs.map((s) => entry(s)), reserved).map((p) => p.code);

describe('isValidSlug', () => {
  it('accepts lowercase words separated by single hyphens', () => {
    for (const slug of ['ai-assurance', 'slo-assurance', 'mcp-servers-trust-boundary', 'a', 'soc2', '2026-review']) {
      assert.equal(isValidSlug(slug), true, slug);
    }
  });

  it('rejects anything that could create a nested, ambiguous or unsafe path', () => {
    const bad = [
      '',
      ' ',
      'AI-Assurance',
      'ai_assurance',
      'ai assurance',
      'ai--assurance',
      '-ai-assurance',
      'ai-assurance-',
      'services/ai-assurance',
      'ai-assurance/',
      '/ai-assurance',
      'ai-assurance.html',
      '../secret',
      'ai-assurance?x=1',
      'ai-assurance#top',
      'café',
      'a'.repeat(MAX_SLUG_LENGTH + 1),
    ];
    for (const slug of bad) assert.equal(isValidSlug(slug), false, JSON.stringify(slug));
  });

  it('rejects values that are not strings', () => {
    for (const value of [undefined, null, 42, {}, []]) assert.equal(isValidSlug(value), false);
  });
});

describe('findRouteProblems', () => {
  it('reports nothing for a clean set', () => {
    assert.deepEqual(codes(['ai-assurance', 'slo-assurance', 'insurance']), []);
  });

  it('reports an empty slug', () => {
    assert.deepEqual(codes(['']), ['empty']);
    assert.deepEqual(codes(['   ']), ['empty']);
  });

  it('reports an invalid slug', () => {
    assert.deepEqual(codes(['Bad_Slug']), ['invalid']);
  });

  it('reports a duplicate slug and names both sources', () => {
    const problems = findRouteProblems([entry('release-assurance', 'assurance/release-assurance.md'), entry('release-assurance', 'insights/release-assurance.md')], new Set());
    assert.equal(problems.length, 1);
    assert.equal(problems[0]!.code, 'duplicate');
    assert.match(problems[0]!.message, /assurance\/release-assurance\.md/);
    assert.match(problems[0]!.message, /insights\/release-assurance\.md/);
  });

  it('reports a collision with a reserved route', () => {
    assert.deepEqual(codes(['contact'], new Set(['contact'])), ['reserved']);
  });

  it('reports both problems when a slug is reserved and duplicated', () => {
    assert.deepEqual(codes(['contact', 'contact'], new Set(['contact'])), ['reserved', 'reserved', 'duplicate']);
  });
});

describe('assertRoutes', () => {
  it('throws with every problem listed, so the build fails', () => {
    assert.throws(
      () => assertRoutes([entry('contact'), entry('Bad Slug'), entry('')], new Set(['contact'])),
      (error: Error) => /3 problem/.test(error.message) && /reserved/.test(error.message) && /invalid/.test(error.message) && /empty/.test(error.message),
    );
  });

  it('does not throw for a clean set', () => {
    assert.doesNotThrow(() => assertRoutes([entry('ai-assurance'), entry('insurance')], reservedSlugs));
  });
});

describe('reserved slugs', () => {
  it('include every static page', () => {
    for (const page of staticPages) {
      if (page.slug === '') continue;
      assert.equal(reservedSlugs.has(page.slug), true, page.slug);
    }
    assert.equal(staticSlugs.includes(''), false);
  });

  it('include system paths and the hierarchical roots the flat URL policy forbids', () => {
    for (const slug of ['404', 'og', 'rss.xml', 'robots.txt', 'llms.txt', 'sitemap-index.xml', '_astro', 'fetch', 'services', 'blog']) {
      assert.equal(reservedSlugs.has(slug), true, slug);
    }
  });

  it('stop an article from taking the URL of a static page', () => {
    for (const slug of ['contact', 'insights', 'privacy', 'use-cases', 'assurance', 'search']) {
      assert.deepEqual(codes([slug], reservedSlugs), ['reserved'], slug);
    }
  });

  it('static page slugs are themselves valid and unique', () => {
    const slugs = staticPages.map((p) => p.slug).filter((s) => s !== '');
    for (const slug of slugs) assert.equal(isValidSlug(slug), true, slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });
});
