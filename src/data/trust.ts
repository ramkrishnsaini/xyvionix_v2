/**
 * Trust posture statements. These describe how Xyvionix is designed to
 * operate. Nothing here claims a certification, attestation or audit result.
 * Update the attestation entry only when its status genuinely changes.
 */

export interface TrustPrinciple {
  title: string;
  text: string;
}

export const trustSummary: TrustPrinciple[] = [
  {
    title: 'Bounded access',
    text: 'Read-only by standing default. Elevation granted per approved change, time-bound and recorded.',
  },
  {
    title: 'Data residency',
    text: 'Enterprise data remains in the enterprise’s own jurisdiction and infrastructure.',
  },
  {
    title: 'Evidence trail',
    text: 'Every action taken under assurance is attributable, retained and available for examination.',
  },
  {
    title: 'Attestation',
    text: 'A SOC 2 readiness programme is planned; ISO 27001 to follow. Status confirmed in writing before any engagement.',
  },
  {
    title: 'Continuity',
    text: 'A documented transition provision in every engagement. Nothing is held that cannot be handed back.',
  },
];

/** Stated plainly so no page can drift into implying more. */
export const attestationStatus = {
  soc2: 'Planned. A readiness programme is planned and no SOC 2 report has been issued.',
  iso27001: 'Planned to follow SOC 2 readiness. Xyvionix is not ISO/IEC 27001 certified.',
  note: 'Current status is confirmed in writing before any engagement begins.',
} as const;
