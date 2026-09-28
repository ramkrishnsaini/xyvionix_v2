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
    h1: 'Your systems were proven at launch. Xyvionix keeps them proven.',
    seoTitle: 'Assurance Areas: AI, Reliability, Cyber, Value, Data | Xyvionix',
    description:
      'The six areas Xyvionix holds under continuous assurance: AI, production reliability, cyber exposure, technology value, data and change. What each one proves.',
    summary:
      'Why proof expires, the six outcomes Xyvionix holds under assurance, how one outcome is carried through a change, the four states, and how to begin.',
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
    h1: 'What continuous technology assurance is, and how it works',
    seoTitle: 'Continuous Technology Assurance: What It Is, How It Works | Xyvionix',
    description:
      'Continuous technology assurance explained: the definition, the method in eight steps, thresholds, evidence, the four states, verified closure and a glossary.',
    summary:
      'The reference for continuous technology assurance. What it is, the method step by step, how thresholds and evidence work, how state is decided, when a correction is closed, how it differs from monitoring and audit, and a glossary of terms.',
    ogQuestion: 'What is it, and how does it work?',
    parent: 'assurance',
    schemaType: 'WebPage',
    audience: 'CIO, CTO, CISO, Head of AI, Technology Risk, Procurement',
    intent: 'Informational and commercial: the reference for what assurance is and how it works',
    index: true,
    publishedDate: D,
    modifiedDate: '2026-09-28',
    lastReviewed: '2026-09-28',
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
    slug: 'why-assurance',
    type: 'core',
    title: 'Why Assurance',
    h1: 'The more a system can do, the more has to be proven first',
    seoTitle: 'Why Assurance Comes First: Agents, Models, Systems | Xyvionix',
    description:
      'Why assurance has to come before capability for agentic AI, AI models, modern cloud systems and critical systems, and what has to be proven for each.',
    summary:
      'The argument for putting assurance first. For agentic AI, AI models, modern systems and critical systems: what each can now do, what that puts at stake, and what has to be proven before it is relied on.',
    ogQuestion: 'What has to be proven before it is relied on?',
    parent: 'assurance',
    schemaType: 'CollectionPage',
    audience: 'CIO, CTO, CISO, Head of AI, Technology Risk',
    intent: 'Informational and commercial: why assurance is a precondition, by kind of system',
    index: true,
    publishedDate: '2026-09-28',
    modifiedDate: '2026-09-28',
    lastReviewed: '2026-09-28',
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
