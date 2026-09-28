/**
 * Single source of truth for site and organisation facts.
 *
 * RULE: nothing here may be invented. A value that the company has not
 * confirmed stays `null` and the feature that needs it degrades gracefully.
 * See docs/launch-checklist.md > "Company inputs required".
 */

export const SITE_URL = 'https://xyvionix.com';

export const site = {
  name: 'Xyvionix',
  url: SITE_URL,
  language: 'en',
  locale: 'en_US',
  category: 'Continuous Technology Assurance',
  statement: 'Critical technology must be continuously proven.',
  definition:
    'Xyvionix continuously verifies whether critical enterprise technology still meets the outcomes the business depends on, and drives corrective action when assurance is lost.',
  description:
    'Xyvionix continuously verifies that AI systems, production infrastructure, security controls and critical data still meet the outcomes the business depends on, and drives corrective action when they do not.',
  cta: {
    label: 'Assess an assurance priority',
    href: '/contact',
  },
  themeColor: '#0C0C0B',
  editorialAuthor: 'Xyvionix Research',
  copyrightYear: 2026,
} as const;

/** Company inputs. `null` means "not yet confirmed by Xyvionix". */
export const company = {
  /** Registered legal entity name. Used in legal pages and Organization.legalName. */
  legalName: null as string | null,
  /** Registered office, used on legal pages only. */
  registeredAddress: null as string | null,
  /** Governing law and venue for the terms page. */
  governingLaw: null as string | null,
  /** General enquiries mailbox. */
  contactEmail: null as string | null,
  /** Security disclosure mailbox. Required before /.well-known/security.txt is published. */
  securityEmail: null as string | null,
  /** Privacy requests mailbox. */
  privacyEmail: null as string | null,
  /** Optional phone number. */
  phone: null as string | null,
  /** HTTPS endpoint that accepts the contact form POST. */
  contactFormEndpoint: (import.meta.env?.PUBLIC_CONTACT_ENDPOINT as string | undefined) ?? null,
};

/**
 * The one Organization object used by every JSON-LD graph on the site.
 * Optional properties are added only when the matching company input exists.
 */
export const organization = {
  id: `${SITE_URL}/#organization`,
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/xyvionix-logo-512.png`,
  logoWidth: 512,
  logoHeight: 512,
  description: site.definition,
  slogan: site.statement,
} as const;

export const websiteId = `${SITE_URL}/#website`;
