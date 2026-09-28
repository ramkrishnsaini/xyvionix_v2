/**
 * Editorial and claim rules shared by the content validator and the claim audit.
 * Source of the rules: docs/content-style-guide.md and the implementation spec.
 */

/** Words and phrases that must not appear in published copy. Matched case-insensitively on word boundaries. */
export const bannedPhrases = [
  'revolutionize',
  'revolutionise',
  'revolutionary',
  'supercharge',
  'unleash',
  'transform your business',
  'cutting-edge',
  'cutting edge',
  'next-generation',
  'next generation',
  'world-class',
  'world class',
  'seamless',
  'seamlessly',
  'end-to-end solution',
  'end-to-end solutions',
  'digital transformation',
  'expert team',
  'team of experts',
  'highly skilled',
  'best-in-class',
  'best in class',
  'game-changing',
  'game changer',
  'state-of-the-art',
  'turnkey',
  'mission-critical',
  'synergy',
  'holistic',
  'empower',
  'empowers',
  'empowering',
  'delve',
  'tapestry',
  "in today's",
  'fast-paced',
  'it is important to note',
  'navigate the complexities',
];

/** Labour-selling vocabulary. Xyvionix does not sell people or time. */
export const labourPhrases = [
  'staff augmentation',
  'resource augmentation',
  'body shopping',
  'body-shopping',
  'rate card',
  'rate cards',
  'offshore team',
  'offshore development',
  'dedicated developers',
  'hire developers',
  'hire engineers',
  'our engineers',
  'our developers',
  'headcount',
  'man-hours',
  'man hours',
  'billable hours',
  'pod of',
];

/**
 * Unsupported-claim patterns. Each is a claim the company has not verified.
 * `allow` lists phrasing that is acceptable because it states the true position.
 */
export const claimPatterns = [
  { id: 'certified', pattern: /\b(SOC ?2|ISO(?:\/IEC)? ?27001|ISO(?:\/IEC)? ?42001|HITRUST|FedRAMP|PCI DSS)[^.\n]{0,40}\b(certified|compliant|attested|accredited)\b/i, note: 'Certification or compliance claim about a framework' },
  { id: 'we-certified', pattern: /\b(we are|xyvionix is|fully)\s+(certified|compliant|accredited)\b/i, note: 'Certification claim about Xyvionix' },
  { id: 'customers', pattern: /\b(our (clients|customers)|trusted by|clients include|customers include|used by leading|fortune ?(100|500)|global enterprises trust)\b/i, note: 'Customer or client claim' },
  { id: 'case-study', pattern: /\b(case stud(y|ies)|testimonial|success stor(y|ies))\b/i, note: 'Case study or testimonial reference' },
  { id: 'always-on', pattern: /\b(24\s?[x\/]\s?7|24-7|around the clock|round-the-clock|follow-the-sun)\b/i, note: 'Operating-hours claim' },
  { id: 'savings', pattern: /\b(save|saves|saving|reduce[sd]?|cut[s]?|lower[s]?)\b[^.\n]{0,60}\bby\s+(up to\s+)?\d{1,3}\s?%/i, note: 'Quantified saving or reduction claim' },
  { id: 'guarantee', pattern: /\b(guarantee[sd]?|guaranteed|ensures? compliance|100% (uptime|accuracy|secure))\b/i, note: 'Guarantee or absolute claim' },
  { id: 'response-time', pattern: /\b(respond|response|resolution)[^.\n]{0,40}\bwithin\s+\d+\s?(minutes?|hours?|mins?|hrs?)\b/i, note: 'Response-time claim' },
  { id: 'partner', pattern: /\b(certified partner|premier partner|gold partner|advanced partner|(aws|azure|microsoft|google cloud|databricks|snowflake)[^.\n]{0,20}\bpartner\b)/i, note: 'Technology partnership claim' },
  { id: 'offices', pattern: /\b(offices in|headquartered in|our (london|new york|sydney|singapore|bangalore|bengaluru) office)\b/i, note: 'Office or location claim' },
  { id: 'team-size', pattern: /\b\d{2,}\+?\s+(engineers|experts|consultants|employees|specialists)\b/i, note: 'Team-size claim' },
  { id: 'years', pattern: /\b\d{1,2}\+?\s+years of (experience|expertise)\b/i, note: 'Experience claim' },
  { id: 'awards', pattern: /\b(award-winning|recogni[sz]ed by (gartner|forrester)|leader in the)\b/i, note: 'Award or analyst recognition claim' },
];

/** Phrases that look like a claim but state the true position, so they pass. */
export const claimAllowances = [
  /not\s+(SOC ?2|ISO)/i,
  /is not (ISO|SOC)/i,
  /no SOC ?2 report/i,
  /readiness programme is planned/i,
  /not recommended/i,
  /does not (guarantee|ensure)/i,
  /cannot guarantee/i,
  /no guarantee/i,
  /not a guarantee/i,
  /delivery guarantee/i,
  /ordering guarantee/i,
  /not a (reseller|partner)/i,
  /not a reseller or partner/i,
];

export const lengthRules = {
  h1: [10, 120],
  seoTitle: [20, 70],
  description: [90, 170],
  summary: [60, 260],
  lede: [80, 520],
};

export const minWords = {
  assurance: 750,
  useCases: 700,
  technologies: 700,
  industries: 850,
  insights: 850,
};

export function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function findPhrases(text, phrases) {
  const hits = [];
  for (const phrase of phrases) {
    const re = new RegExp(`(^|[^A-Za-z])${escapeRegExp(phrase)}(?![A-Za-z])`, 'i');
    if (re.test(text)) hits.push(phrase);
  }
  return hits;
}

export function findClaims(text) {
  const hits = [];
  for (const line of text.split(/\n/)) {
    if (claimAllowances.some((allow) => allow.test(line))) continue;
    for (const claim of claimPatterns) {
      const match = line.match(claim.pattern);
      if (match) hits.push({ id: claim.id, note: claim.note, excerpt: line.trim().slice(0, 160) });
    }
  }
  return hits;
}
