/**
 * Registry of every page implemented as an .astro file in src/pages.
 * Drives SEO metadata, breadcrumbs, OG images, reserved slugs, sitemap
 * lastmod, llms.txt, the search index and the generated docs.
 *
 * `slug` is the root-level path segment; '' is the home page.
 */

export type StaticPageType = 'home' | 'hub' | 'core' | 'company' | 'contact' | 'legal' | 'utility';

export interface StaticPage {
  slug: string;
  type: StaticPageType;
  /** Short name for navigation, breadcrumbs and cards. */
  title: string;
  h1: string;
  seoTitle: string;
  description: string;
  /** One or two sentences for hubs, llms-full.txt and search. */
  summary: string;
  /** Line shown on the OG image under the page name. */
  ogQuestion: string;
  /** Slug of the conceptual parent for breadcrumbs. '' is home. */
  parent: string;
  schemaType: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  audience: string;
  intent: string;
  index: boolean;
  publishedDate: string;
  modifiedDate: string;
  lastReviewed: string;
  /** Days between reviews. */
  reviewCadence: number;
}

import { hubPages } from './static/hubs.ts';
import { companyPages } from './static/company.ts';

const D = '2026-09-27';

const corePages: StaticPage[] = [
  {
    slug: '',
    type: 'home',
    title: 'Home',
    h1: 'Critical technology must be continuously proven.',
    seoTitle: 'Xyvionix | Continuous Technology Assurance',
    description:
      'Xyvionix continuously verifies that AI systems, production infrastructure, security controls and critical data still meet the outcomes the business depends on.',
    summary:
      'Xyvionix is a Continuous Technology Assurance company. It holds critical enterprise technology against agreed thresholds, retains the evidence and owns corrective action through to verified closure.',
    ogQuestion: 'Critical technology must be continuously proven.',
    parent: '',
    schemaType: 'WebPage',
    audience: 'CIO, CTO, CISO, Head of AI, Technology Risk',
    intent: 'Brand and category definition',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 180,
  },
  {
    slug: 'assurance',
    type: 'hub',
    title: 'Assurance',
    h1: 'Six outcomes that cannot be left to assumption',
    seoTitle: 'Assurance Areas: AI, Reliability, Cyber, Value, Data | Xyvionix',
    description:
      'The six areas Xyvionix holds under continuous assurance: AI, production reliability, cyber exposure, technology value, data and change. What each one proves.',
    summary:
      'An overview of the six assurance areas, how the three primary areas relate to the three expansion areas, and which page answers which question.',
    ogQuestion: 'Which outcome must stay proven?',
    parent: '',
    schemaType: 'CollectionPage',
    audience: 'CIO, CTO, CISO, Technology Risk',
    intent: 'Navigational and commercial: choose an assurance area',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 365,
  },
  {
    slug: 'how-assurance-works',
    type: 'core',
    title: 'How Assurance Works',
    h1: 'How continuous assurance works',
    seoTitle: 'How Continuous Technology Assurance Works | Xyvionix',
    description:
      'The operating method behind continuous assurance: define the outcome, agree thresholds, gather evidence, hold a current state, correct, and verify closure.',
    summary:
      'The method: baseline, assure, correct, improve. How outcomes are defined, how thresholds are agreed, what evidence is retained and what happens when assurance is lost.',
    ogQuestion: 'Baseline. Assure. Correct. Improve.',
    parent: 'assurance',
    schemaType: 'WebPage',
    audience: 'CIO, CTO, Technology Risk, Procurement',
    intent: 'Informational: understand the operating model before engaging',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 365,
  },
  {
    slug: 'assurance-engine',
    type: 'core',
    title: 'Assurance Engine',
    h1: 'The Assurance Engine',
    seoTitle: 'The Assurance Engine: Signals to Verified Closure | Xyvionix',
    description:
      'How the Assurance Engine turns signals into evidence, tests evidence against thresholds, holds a current state and tracks corrective action to verified closure.',
    summary:
      'The design of the intelligence layer beneath continuous assurance: signals, evidence, thresholds, state, corrective action and verified closure.',
    ogQuestion: 'Signals. Evidence. Thresholds. State.',
    parent: 'assurance',
    schemaType: 'WebPage',
    audience: 'CTO, VP Platform, Enterprise Architecture, Security Architecture',
    intent: 'Informational: understand the evidence model and its design',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 180,
  },
  {
    slug: 'security-trust',
    type: 'core',
    title: 'Security and Trust',
    h1: 'Assurance requires access. Access requires proof of its own.',
    seoTitle: 'Security and Trust: How Xyvionix Handles Access | Xyvionix',
    description:
      'How Xyvionix bounds its own access: read-only by default, time-limited elevation, customer-controlled data, full audit trail and a documented transition out.',
    summary:
      'The trust overview for security and procurement teams: access model, data handling, evidence trail, attestation status stated plainly, continuity and transition.',
    ogQuestion: 'Bounded access. Retained evidence.',
    parent: 'company',
    schemaType: 'WebPage',
    audience: 'CISO, Procurement, Third-Party Risk, Legal',
    intent: 'Due diligence: evaluate Xyvionix before a conversation',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 90,
  },
];

export const staticPages: StaticPage[] = [...corePages, ...hubPages, ...companyPages];

export const staticPageBySlug = Object.fromEntries(staticPages.map((p) => [p.slug, p])) as Record<string, StaticPage>;

export function getStaticPage(slug: string): StaticPage {
  const page = staticPageBySlug[slug];
  if (!page) throw new Error(`Static page "${slug}" is not registered in src/data/static-pages.ts`);
  return page;
}
