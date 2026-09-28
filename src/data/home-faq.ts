/**
 * Questions a first-time visitor asks, answered plainly.
 *
 * Each has a one-line answer that is always visible, and a fuller answer that
 * opens on request. Every answer states how Xyvionix works or what it does
 * and does not do. None claims a customer, a result, a response time or a
 * certification. No FAQPage markup is emitted.
 */

export interface HomeFaq {
  q: string;
  /** The direct answer in one line. Always visible. */
  short: string;
  /** The fuller answer, shown when the question is opened. */
  a: string;
  link?: { label: string; href: string };
}

export interface HomeFaqGroup {
  key: string;
  title: string;
  items: HomeFaq[];
}

export const homeFaqGroups: HomeFaqGroup[] = [
  {
    key: 'what',
    title: 'What Xyvionix does',
    items: [
      {
        q: 'What does Xyvionix do?',
        short: 'It keeps critical technology proven, and owns the correction when the proof fails.',
        a: 'Xyvionix agrees with the business what must remain true, gathers evidence from the running system, tests that evidence against a threshold, and keeps a current state for each outcome. When the evidence falls short, Xyvionix owns the correction until a re-test shows the outcome is met again.',
        link: { label: 'How assurance works', href: '/how-assurance-works' },
      },
      {
        q: 'What is Continuous Technology Assurance?',
        short: 'Keeping a technology outcome proven after go-live, not only on the day of launch.',
        a: 'Most enterprises prove a system works once, at launch, and then assume it. Models, infrastructure, access, data and cost all change afterwards, and each change expires part of the proof. Continuous assurance re-establishes the proof after every change, so the answer to “does it still work” is a fact and not an assumption.',
        link: { label: 'Assurance is a state, not a report', href: '/assurance-is-a-state-not-a-report' },
      },
      {
        q: 'What can be placed under assurance?',
        short: 'Six kinds of outcome: AI, reliability, cyber exposure, technology value, data and change.',
        a: 'AI systems that must stay correct, safe and within cost. Production services that must stay available and recoverable. Security exposure that must stay closed. Technology spend that must stay tied to the value it buys. Data that must stay fresh and fit for the decision. Releases that must stay safe to ship and to reverse. An enterprise usually begins with one.',
        link: { label: 'The six assurance areas', href: '/assurance' },
      },
      {
        q: 'How is this different from monitoring, an audit or a managed service?',
        short: 'Those report or perform. Assurance is answerable for the outcome staying true.',
        a: 'Monitoring reports what a system is doing. An audit states whether a control was in place during a period that has ended. A managed service performs agreed activity. Each is useful. Continuous assurance measures against a threshold the business agreed, holds a current state, owns the correction and closes it only on re-test.',
        link: { label: 'Continuous assurance is not monitoring', href: '/continuous-assurance-vs-monitoring' },
      },
    ],
  },
  {
    key: 'working',
    title: 'Working with Xyvionix',
    items: [
      {
        q: 'Does Xyvionix supply engineers or replace our internal teams?',
        short: 'No. Xyvionix sells assurance, not people or hours.',
        a: 'Xyvionix is not an outsourcing or staffing company. Your platform, security, data and AI teams continue to build and run the systems. Xyvionix is a separate function that holds the evidence that those systems still meet the agreed outcome. The separation is deliberate: a team that builds a system and also certifies it is marking its own work.',
        link: { label: 'About Xyvionix', href: '/company' },
      },
      {
        q: 'What happens when assurance is lost?',
        short: 'The state changes, the owner is told, and the correction is carried through to a re-test.',
        a: 'Movement toward the threshold sets the state to Degrading, and correction starts there, before the outcome is lost. A breach sets it to At risk. Xyvionix carries the correction through your own change process, and the state returns to Assured only when the check that found the problem passes against the corrected system.',
        link: { label: 'The Assurance Engine', href: '/assurance-engine' },
      },
      {
        q: 'Does it work across AWS, Azure and Google Cloud?',
        short: 'Yes. Assurance follows the outcome, not the platform.',
        a: 'What has to be re-proven differs by provider, because each has its own lifecycle, its own automatic changes and its own way of failing. The technology pages set out what expires on each platform and on whose calendar.',
        link: { label: 'Technologies', href: '/technologies' },
      },
    ],
  },
  {
    key: 'trust',
    title: 'Trust and getting started',
    items: [
      {
        q: 'What access does Xyvionix need, and where does our data stay?',
        short: 'Read-only by default. Your data stays in your own infrastructure.',
        a: 'Where a correction requires a change, elevation is requested for that change, approved by you, limited in time and recorded. Your data remains in your own jurisdiction and infrastructure, and the evidence gathered is your property. You can remove access at any moment.',
        link: { label: 'Security and trust', href: '/security-trust' },
      },
      {
        q: 'Is Xyvionix SOC 2 or ISO 27001 certified?',
        short: 'Not at present. A readiness programme is planned.',
        a: 'A SOC 2 readiness programme is planned, with ISO 27001 to follow, and no report or certificate has been issued. The current status is confirmed in writing before any engagement begins. A company that sells proof should state its own position plainly.',
        link: { label: 'Attestation status', href: '/security-trust' },
      },
      {
        q: 'How do we start?',
        short: 'With one outcome that matters, and a baseline of where it stands today.',
        a: 'The first step establishes what must be true, which signals can prove it, what threshold the business will agree, and what the state is today. That baseline often shows which outcomes you can already prove, which you believe but cannot prove, and which no one has measured.',
        link: { label: 'Assess an assurance priority', href: '/contact' },
      },
    ],
  },
];

export const homeFaqs: HomeFaq[] = homeFaqGroups.flatMap((g) => g.items);
