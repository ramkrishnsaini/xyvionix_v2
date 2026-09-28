/**
 * Contact form definition. The questions are about the outcome to be assured.
 * The form never asks for team size, developer count, budget per hour or
 * staffing need, because Xyvionix does not sell labour.
 */

import { clusters } from './clusters.ts';

export const assuranceOptions = [
  ...clusters.map((c) => ({ value: c.key, label: c.name })),
  { value: 'unsure', label: 'Not sure yet' },
];

export const timingOptions = [
  { value: 'now', label: 'There is a live concern now' },
  { value: 'quarter', label: 'Within the next three months' },
  { value: 'half', label: 'Within the next six months' },
  { value: 'exploring', label: 'Exploring, no fixed date' },
];

export const roleOptions = [
  'CIO',
  'CTO',
  'CISO',
  'Head of AI',
  'VP Engineering',
  'VP Platform',
  'Head of SRE',
  'Technology Risk',
  'Enterprise Architecture',
  'AI Governance',
  'FinOps leadership',
  'Data leadership',
  'Other',
];

export const formCopy = {
  success:
    'Thank you. Your assessment request has been received. A reply will come from a person who has read what you wrote.',
  failure:
    'The request could not be sent. Nothing you entered has been lost. Please try again, or use the contact details on this page.',
  notConfigured:
    'The assessment form is not yet connected. It will accept requests once the company has configured a secure endpoint.',
  privacy:
    'Information you submit is used to respond to your request and for no other purpose. Do not include credentials, personal data about other people or confidential system detail.',
};
