/**
 * Social profiles and sharing defaults.
 *
 * `profiles` feeds Organization.sameAs and the footer. Add a profile only
 * after the account exists and is controlled by Xyvionix. An empty list is
 * correct until then: no sameAs is emitted and no icons are rendered.
 */

export interface SocialProfile {
  network: 'LinkedIn' | 'X' | 'GitHub' | 'YouTube';
  url: string;
}

export const profiles: SocialProfile[] = [];

/** X/Twitter handle including the @, or null when no verified account exists. */
export const twitterSite: string | null = null;

export const og = {
  width: 1200,
  height: 630,
  type: 'image/png',
  /** Build-time generated images live here: /og/<slug>.png */
  basePath: '/og',
  twitterCard: 'summary_large_image',
} as const;
