/**
 * Inputs for the legal and policy pages. Nothing is invented: an empty list
 * or null renders an explicit "not yet published" statement on the page.
 */

import { company } from './site.ts';

export interface Subprocessor {
  name: string;
  purpose: string;
  dataProcessed: string;
  location: string;
  /** Link to the subprocessor's own security or trust page. */
  url: string;
}

/** Add an entry only when a contract with the subprocessor is in place. */
export const subprocessors: Subprocessor[] = [];

/** Days of notice given before a new subprocessor starts processing. Null until the company confirms it. */
export const subprocessorNoticeDays: number | null = null;

/** Analytics provider name, or null when the site runs no analytics. */
export const analyticsProvider: string | null = null;

/** What is still missing before each legal page can be treated as final. */
export const pendingInputs = {
  privacy: [
    !company.legalName && 'the registered name of the data controller',
    !company.registeredAddress && 'the controller’s registered address',
    !company.privacyEmail && 'a contact address for privacy requests',
  ].filter((v): v is string => Boolean(v)),
  terms: [
    !company.legalName && 'the registered company name',
    !company.governingLaw && 'the governing law and courts',
  ].filter((v): v is string => Boolean(v)),
  security: [!company.securityEmail && 'a monitored security contact address'].filter((v): v is string => Boolean(v)),
  subprocessors: [
    subprocessors.length === 0 && 'the subprocessor register',
    subprocessorNoticeDays === null && 'the notice period for changes',
  ].filter((v): v is string => Boolean(v)),
};

export function pendingSentence(items: string[]): string | undefined {
  if (items.length === 0) return undefined;
  const list = items.length === 1 ? items[0] : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
  return `This page has not yet been reviewed by legal counsel and is awaiting ${list}. It describes the intended position and will be finalised before launch.`;
}
