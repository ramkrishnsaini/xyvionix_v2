/**
 * Navigation. Every href is a real root-level route. Kept deliberately small:
 * one dropdown, no mega-menu.
 */

import { clusters } from './clusters.ts';
import { pathFor } from './routes.ts';
import { site } from './site.ts';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Present only for the one item that opens a panel. */
  groups?: NavGroup[];
}

const primaryAssurance: NavLink[] = clusters
  .filter((c) => c.tier === 'primary')
  .map((c) => ({ label: c.name, href: pathFor(c.hub), description: c.question }));

const expansionAssurance: NavLink[] = clusters
  .filter((c) => c.tier === 'expansion')
  .map((c) => ({ label: c.name, href: pathFor(c.hub) }));

export const primaryNav: NavItem[] = [
  {
    label: 'Assurance',
    href: '/assurance',
    groups: [
      { label: 'Primary assurance', links: primaryAssurance },
      { label: 'Also assured', links: expansionAssurance },
      {
        label: 'Method',
        links: [
          { label: 'How assurance works', href: '/how-assurance-works' },
          { label: 'The Assurance Engine', href: '/assurance-engine' },
        ],
      },
    ],
  },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Insights', href: '/insights' },
  { label: 'Company', href: '/company' },
];

export const navCta: NavLink = { label: site.cta.label, href: site.cta.href };

export const footerNav: NavGroup[] = [
  {
    label: 'Assurance',
    links: clusters.map((c) => ({ label: c.name, href: pathFor(c.hub) })),
  },
  {
    label: 'Explore',
    links: [
      { label: 'Use cases', href: '/use-cases' },
      { label: 'Industries', href: '/industries' },
      { label: 'Technologies', href: '/technologies' },
      { label: 'Insights', href: '/insights' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'How assurance works', href: '/how-assurance-works' },
      { label: 'Assurance Engine', href: '/assurance-engine' },
      { label: 'Security and trust', href: '/security-trust' },
      { label: 'About Xyvionix', href: '/company' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Security policy', href: '/security' },
  { label: 'Subprocessors', href: '/subprocessors' },
];
