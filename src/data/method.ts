/** Content for /how-assurance-works. Statements of method, not of results achieved. */

export const comparison = {
  columns: ['Monitoring', 'Periodic audit', 'Managed service', 'Continuous assurance'],
  rows: [
    {
      aspect: 'Question answered',
      cells: [
        'What is the system doing now?',
        'Was the control in place when we looked?',
        'Was the agreed activity performed?',
        'Is the agreed outcome still proven?',
      ],
    },
    {
      aspect: 'Measured against',
      cells: [
        'Technical limits set by engineering',
        'A control framework',
        'A service description',
        'A threshold agreed with the business',
      ],
    },
    {
      aspect: 'Evidence',
      cells: [
        'Telemetry, usually short retention',
        'Samples gathered for the audit period',
        'Tickets and activity reports',
        'Tested results, retained and attributable to a point in time',
      ],
    },
    {
      aspect: 'When it falls short',
      cells: [
        'An alert is raised',
        'A finding is reported',
        'A ticket is escalated',
        'Corrective action is owned until closure is verified',
      ],
    },
    {
      aspect: 'Closure',
      cells: [
        'Alert clears',
        'Management response recorded',
        'Ticket closed',
        'Re-test shows the outcome is met again',
      ],
    },
    {
      aspect: 'Validity',
      cells: ['The moment of measurement', 'The audit period', 'The reporting period', 'Current, and re-proven after change'],
    },
  ],
};

export const thresholdSteps = [
  {
    title: 'Start from the outcome',
    text: 'The business states what must remain true, in its own terms: a claim decision can be explained, a payment service recovers within its tolerance, a cost per transaction holds its margin.',
  },
  {
    title: 'Find the signal that proves it',
    text: 'The outcome is traced to something that can be measured in the running system. If no such signal exists, that absence is the first finding.',
  },
  {
    title: 'Agree the boundary',
    text: 'The threshold is set by the consequence of being wrong, the tolerance the business has stated and any external obligation that applies. Engineering convention is an input, not the answer.',
  },
  {
    title: 'Record the owner',
    text: 'Each threshold has a named owner in the business who can change it. A threshold no one can change is a default, not a decision.',
  },
  {
    title: 'Revisit on change',
    text: 'Thresholds are reviewed when the system, its use or its obligations change, and raised as the business requires more.',
  },
];

export const evidenceProperties = [
  {
    title: 'Tested',
    text: 'Evidence is the result of a check that could have failed. A configuration screenshot or a policy document is a claim, not evidence.',
  },
  {
    title: 'Attributable',
    text: 'Each item records what was tested, against which version of the system, when, and by what means.',
  },
  {
    title: 'Retained',
    text: 'Evidence is kept for the period the business and its obligations require, so that a question asked a year later can be answered without reconstruction.',
  },
  {
    title: 'Current',
    text: 'Evidence has an age. When the system changes, or when the evidence is older than its agreed validity, the state becomes Unassured until it is re-gathered.',
  },
  {
    title: 'Held in the enterprise’s control',
    text: 'Evidence is stored where the enterprise decides and remains its property. Nothing is held that cannot be handed back.',
  },
];

export const methodFaqs = [
  {
    q: 'How is continuous assurance different from monitoring?',
    a: 'Monitoring reports what a system is doing. Assurance states whether an outcome the business agreed is still proven, and carries ownership of the correction when it is not. Monitoring is one source of signals for assurance. It does not decide thresholds, retain evidence for examination or verify that a fix held.',
  },
  {
    q: 'How are thresholds established?',
    a: 'With the business, starting from the outcome and the consequence of losing it. Xyvionix proposes the signals that can prove the outcome and the enterprise decides the boundary. Each threshold has a named owner who can change it.',
  },
  {
    q: 'What evidence is retained, and where?',
    a: 'Tested results with the system version, time and method that produced them, together with the record of any corrective action and its re-test. Evidence is held in the location and for the period the enterprise specifies and remains the enterprise’s property.',
  },
  {
    q: 'What happens when assurance is lost?',
    a: 'The state moves to At risk, the owner of the threshold is informed, and corrective action begins. Xyvionix owns that action within the access it has been granted and through the enterprise’s own change process. The state returns to Assured only when a re-test shows the outcome is met.',
  },
  {
    q: 'Does Xyvionix replace internal platform, security or data teams?',
    a: 'No. Those teams build and run the systems. Xyvionix holds the evidence that the systems still meet the agreed outcome and carries corrections through to verified closure. It is an assurance function, not additional capacity for the engineering backlog.',
  },
  {
    q: 'How is access controlled?',
    a: 'Standing access is read-only. Elevation is requested for a specific approved change, is limited in time and is recorded. The full position is set out on the security and trust page.',
  },
  {
    q: 'Can assurance cover AWS, Azure and Google Cloud environments together?',
    a: 'Yes. The method is defined by the outcome and its evidence, not by the platform. The signals differ by provider, and the technology pages describe what has to be re-proven on each.',
  },
  {
    q: 'How are production AI changes re-evaluated?',
    a: 'A change to the model, prompt, retrieval corpus, tools or routing invalidates the evidence that depended on it. The affected evaluations are re-run against the changed system before the state returns to Assured.',
  },
];
