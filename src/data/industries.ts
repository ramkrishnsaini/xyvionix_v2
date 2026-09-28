/** Industry groupings for the industries hub and home page. */

export type IndustryKey = 'financial-services' | 'insurance' | 'healthcare' | 'software-technology';

export interface Industry {
  key: IndustryKey;
  /** Slug of the primary industry page. */
  slug: string;
  name: string;
  consequence: string;
}

export const industries: Industry[] = [
  {
    key: 'financial-services',
    slug: 'financial-services',
    name: 'Financial services',
    consequence:
      'Where auditability, resilience and control over AI decisions are business requirements rather than engineering preferences.',
  },
  {
    key: 'insurance',
    slug: 'insurance',
    name: 'Insurance',
    consequence:
      'Where model decisions and operational continuity must remain explainable long after the model that made them has changed.',
  },
  {
    key: 'healthcare',
    slug: 'healthcare',
    name: 'Healthcare',
    consequence: 'Where data integrity, access control and uptime carry direct clinical and regulatory consequence.',
  },
  {
    key: 'software-technology',
    slug: 'software-technology',
    name: 'Software and technology',
    consequence:
      'Where reliability and technology economics translate directly into product value and gross margin.',
  },
];

export const industryByKey = Object.fromEntries(industries.map((i) => [i.key, i])) as Record<IndustryKey, Industry>;
