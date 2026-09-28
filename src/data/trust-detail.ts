/**
 * Content for /security-trust.
 *
 * These are statements of the operating model Xyvionix commits to in an
 * engagement. They are not audit results. Every statement here must be
 * confirmed by the company before launch: see docs/claim-audit.md.
 */

export interface TrustSection {
  id: string;
  label: string;
  title: string;
  intro: string;
  items: { title: string; text: string }[];
}

export const trustSections: TrustSection[] = [
  {
    id: 'access',
    label: 'Access',
    title: 'Least privilege, bounded and time-limited',
    intro:
      'Assurance needs to observe far more than it needs to change. The access model reflects that difference and is agreed in writing before any access is granted.',
    items: [
      {
        title: 'Read-only by standing default',
        text: 'Standing access is limited to what is needed to read signals and configuration. No standing write or administrative access is requested.',
      },
      {
        title: 'Elevation per approved change',
        text: 'Where a correction requires a change, elevation is requested for that change, approved by the enterprise, limited in time and removed afterwards.',
      },
      {
        title: 'The enterprise’s identity provider',
        text: 'Access is granted through the enterprise’s own identity platform and is subject to its authentication, conditional access and review policies.',
      },
      {
        title: 'Named, individual access',
        text: 'Access is attributable to an individual or to a dedicated workload identity. Shared credentials are not used.',
      },
      {
        title: 'Revocable at any moment',
        text: 'The enterprise can remove access at any time without notice. Assurance state then moves to Unassured, which is the honest result.',
      },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Customer-controlled data and residency',
    intro:
      'Evidence is only useful if it can be trusted and examined. It stays under the control of the enterprise it belongs to.',
    items: [
      {
        title: 'Data stays in place',
        text: 'Enterprise data remains in the enterprise’s own jurisdiction and infrastructure. Assurance works on data where it lives.',
      },
      {
        title: 'Evidence belongs to the enterprise',
        text: 'Thresholds, evidence and corrective action records are the enterprise’s property and are held where the enterprise specifies.',
      },
      {
        title: 'Minimum necessary',
        text: 'Signals are read at the level of detail needed to test a threshold. Personal and regulated data is avoided wherever a threshold can be tested without it.',
      },
      {
        title: 'Agreed retention',
        text: 'Retention periods are set by the enterprise’s obligations and recorded in the engagement. Data is deleted or returned at the end of the period.',
      },
    ],
  },
  {
    id: 'trail',
    label: 'Accountability',
    title: 'An audit trail of the assurance itself',
    intro:
      'Every action taken under assurance is recorded so that the enterprise can examine what was done in its environment, by whom and why.',
    items: [
      {
        title: 'Attributable actions',
        text: 'Each read of a sensitive source and each change is recorded with the identity that performed it and the approval it was performed under.',
      },
      {
        title: 'Change through the enterprise’s process',
        text: 'Changes to production follow the enterprise’s own change approval process. Xyvionix does not operate a parallel route into production.',
      },
      {
        title: 'Available for examination',
        text: 'Records are available to the enterprise’s security, risk and audit functions and to its external examiners on request.',
      },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering practice',
    title: 'Secure development and vulnerability handling',
    intro:
      'The tooling used to gather and test evidence is software, and is held to the practices expected of software that touches production.',
    items: [
      {
        title: 'Reviewed change',
        text: 'Changes to assurance tooling are peer reviewed and traceable from source to deployment.',
      },
      {
        title: 'Dependency and secret hygiene',
        text: 'Dependencies are tracked and updated, and credentials are held in a secrets manager rather than in code or configuration.',
      },
      {
        title: 'Vulnerability disclosure',
        text: 'Reports from researchers and customers are handled under the published security policy.',
      },
    ],
  },
  {
    id: 'continuity',
    label: 'Continuity',
    title: 'Incidents, continuity and transition out',
    intro:
      'An enterprise should be able to end an assurance engagement without losing the evidence it has accumulated or the ability to continue on its own.',
    items: [
      {
        title: 'Incident notification',
        text: 'A security incident affecting an enterprise’s data or access is notified to that enterprise’s nominated contact. Notification terms are set in the engagement agreement.',
      },
      {
        title: 'Documented transition provision',
        text: 'Every engagement includes a transition provision covering handover of thresholds, evidence, action records and runbooks.',
      },
      {
        title: 'Nothing that cannot be handed back',
        text: 'Records are kept in open formats so that the enterprise or another party can continue the assurance.',
      },
    ],
  },
];
