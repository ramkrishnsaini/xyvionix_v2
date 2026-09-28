import type { StaticPage } from '../static-pages.ts';

const D = '2026-09-27';

export const hubPages: StaticPage[] = [
  {
    slug: 'use-cases',
    type: 'hub',
    title: 'Use Cases',
    h1: 'The moments when assurance is lost',
    seoTitle: 'Assurance Use Cases: AI, Reliability, Security, Data | Xyvionix',
    description:
      'Situations where enterprise technology stops being provable: AI going live, agents gaining write access, untested recovery, drift, unverified remediation.',
    summary:
      'Use cases are organised by what changed. Each one states the outcome at risk, the evidence required, the thresholds that matter and what verified closure looks like.',
    ogQuestion: 'What changed, and what must now be proven?',
    parent: '',
    schemaType: 'CollectionPage',
    audience: 'CTO, CISO, Head of AI, VP Platform, Technology Risk',
    intent: 'Problem-led navigation into assurance areas',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 180,
  },
  {
    slug: 'industries',
    type: 'hub',
    title: 'Industries',
    h1: 'Where the loss of assurance carries consequence',
    seoTitle: 'Industries: Technology Assurance by Sector | Xyvionix',
    description:
      'Continuous technology assurance for financial services, insurance, healthcare and software companies, shaped by each sector’s operational and regulatory exposure.',
    summary:
      'Four industries where technology failure has regulatory, clinical or commercial consequence, and what continuing proof means in each.',
    ogQuestion: 'What does continuing proof mean in your sector?',
    parent: '',
    schemaType: 'CollectionPage',
    audience: 'CIO, CTO, CISO, Technology Risk',
    intent: 'Sector-led navigation',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 180,
  },
  {
    slug: 'technologies',
    type: 'hub',
    title: 'Technologies',
    h1: 'Assurance on the platforms you already run',
    seoTitle: 'Technologies: Assurance for Cloud, AI and Data Platforms | Xyvionix',
    description:
      'What must be continuously re-proven on AWS, Azure, Google Cloud, Kubernetes, Entra ID, Terraform, Databricks, Snowflake, Kafka and AI platforms.',
    summary:
      'Technology pages connect a platform to the assurance problem it creates: what expires, on whose calendar, and what evidence shows the outcome still holds.',
    ogQuestion: 'What expires on this platform, and when?',
    parent: '',
    schemaType: 'CollectionPage',
    audience: 'VP Platform, Head of SRE, Head of AI, Head of Data Engineering, CISO',
    intent: 'Platform-led navigation into assurance areas',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 90,
  },
  {
    slug: 'insights',
    type: 'hub',
    title: 'Insights',
    h1: 'Insights',
    seoTitle: 'Insights: Research on Continuous Technology Assurance | Xyvionix',
    description:
      'Research and analysis from Xyvionix on AI evaluation, recovery testing, identity drift, verified remediation, unit economics and the practice of assurance.',
    summary:
      'Analysis of how evidence expires in production AI, infrastructure, security and data, and what it takes to keep an outcome proven.',
    ogQuestion: 'How evidence expires, and how to keep it current.',
    parent: '',
    schemaType: 'CollectionPage',
    audience: 'CTO, CISO, Head of AI, Head of SRE, Technology Risk',
    intent: 'Editorial hub',
    index: true,
    publishedDate: D,
    modifiedDate: D,
    lastReviewed: D,
    reviewCadence: 90,
  },
];
