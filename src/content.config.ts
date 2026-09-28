/**
 * Content collections. Every entry becomes a root-level URL: the file name is
 * the slug. Relationships are declared in frontmatter and validated at build.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cluster = z.enum(['ai', 'reliability', 'cyber', 'value', 'data', 'change', 'industry', 'category']);
const state = z.enum(['assured', 'degrading', 'risk', 'unassured']);
const slugList = z.array(z.string()).default([]);

const related = z
  .object({
    assurance: slugList,
    useCases: slugList,
    technologies: slugList,
    industries: slugList,
    insights: slugList,
  })
  .default({ assurance: [], useCases: [], technologies: [], industries: [], insights: [] });

const base = {
  /** Short name for navigation, cards and breadcrumbs. */
  title: z.string().min(3).max(90),
  /** Business-oriented page heading. */
  h1: z.string().min(10).max(120),
  seoTitle: z.string().min(20).max(70),
  description: z.string().min(90).max(170),
  /** Card and index summary, one or two sentences. */
  summary: z.string().min(60).max(260),
  /** Definition or direct answer shown under the H1. */
  lede: z.string().min(80).max(520),
  ogTitle: z.string().max(90).optional(),
  ogDescription: z.string().max(200).optional(),
  /** Line shown on the OG image. */
  ogQuestion: z.string().max(90).optional(),

  cluster,
  secondary: z.array(cluster).default([]),
  /** Slug of the conceptual parent used for breadcrumbs. */
  parent: z.string(),
  state: state.default('assured'),
  audience: z.array(z.string()).default([]),
  intent: z.string().default(''),
  related,

  /** Evidence required to hold the outcome. */
  evidence: z.array(z.object({ name: z.string(), detail: z.string() })).default([]),
  /** Threshold model. Always rendered with an "illustrative" caption. */
  thresholds: z
    .array(z.object({ signal: z.string(), basis: z.string(), lostWhen: z.string() }))
    .default([]),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  /** Primary sources for facts stated on the page. */
  sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),

  publishedDate: z.coerce.date(),
  modifiedDate: z.coerce.date(),
  lastReviewed: z.coerce.date(),
  /** Days between reviews. */
  reviewCadence: z.number().int().positive().default(180),
  freshnessCritical: z.boolean().default(false),
  owner: z.string().default('Xyvionix Research'),

  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
};

const md = (dir: string) => glob({ base: `./src/content/${dir}`, pattern: '*.md' });

const assurance = defineCollection({
  loader: md('assurance'),
  schema: z.object({
    ...base,
    kind: z.enum(['hub', 'child']),
    tier: z.enum(['primary', 'expansion']).optional(),
  }),
});

const useCases = defineCollection({
  loader: md('use-cases'),
  schema: z.object({ ...base }),
});

const technologies = defineCollection({
  loader: md('technologies'),
  schema: z.object({
    ...base,
    group: z.enum([
      'cloud',
      'kubernetes',
      'infrastructure-as-code',
      'ai-platform',
      'inference',
      'identity',
      'data-platform',
    ]),
    /** Platform name exactly as the vendor currently writes it. */
    platform: z.string().optional(),
  }),
});

const industries = defineCollection({
  loader: md('industries'),
  schema: z.object({
    ...base,
    kind: z.enum(['primary', 'industry-use-case']),
    industry: z.enum(['financial-services', 'insurance', 'healthcare', 'software-technology']).optional(),
  }),
});

const insights = defineCollection({
  loader: md('insights'),
  schema: z.object({
    ...base,
    category: z.string(),
    author: z.string().default('Xyvionix Research'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { assurance, useCases, technologies, industries, insights };
