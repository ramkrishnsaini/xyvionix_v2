/**
 * Builders for /llms.txt and /llms-full.txt. Both are generated from page
 * metadata, so they cannot drift from the site. They are navigation aids for
 * agents and language models. They are not a ranking signal: Google has
 * stated it does not use llms.txt.
 */

import { stateByKey, states } from '../data/assurances.ts';
import { clusters } from '../data/clusters.ts';
import {
  anatomy,
  assertionVsEvidence,
  closureRule,
  comparison,
  definition,
  evidenceProperties,
  glossary,
  inShort,
  methodFaqs,
  methodSteps,
  notClosure,
  relatedPractices,
  stateRules,
  thresholdParts,
} from '../data/method.ts';
import { site } from '../data/site.ts';
import { objections, systemKinds } from '../data/why-assurance.ts';
import { byTitle, getPageIndex, type PageRef } from './pages.ts';

const link = (p: PageRef, text = p.summary) => `- [${p.title}](${p.url}): ${text.replace(/\s+/g, ' ').trim()}`;

async function groups() {
  const pages = [...(await getPageIndex()).values()].filter((p) => p.index);
  const of = (kind: PageRef['kind']) => pages.filter((p) => p.kind === kind).sort(byTitle);
  const stat = (slug: string) => pages.find((p) => p.kind === 'static' && p.slug === slug);

  const assurance = of('assurance');
  return {
    hubs: assurance.filter((p) => p.label === 'hub'),
    children: assurance.filter((p) => p.label !== 'hub'),
    useCases: of('useCases'),
    industries: of('industries'),
    technologies: of('technologies'),
    insights: of('insights'),
    stat,
  };
}

const present = <T>(items: Array<T | undefined>): T[] => items.filter((i): i is T => i !== undefined);

export async function buildLlmsTxt(): Promise<string> {
  const g = await groups();
  const hubOrder = clusters.map((c) => c.hub);
  const hubs = [...g.hubs].sort((a, b) => hubOrder.indexOf(a.slug) - hubOrder.indexOf(b.slug));

  const section = (title: string, lines: string[]) => (lines.length > 0 ? [`## ${title}`, '', ...lines, ''] : []);

  return [
    `# ${site.name}`,
    '',
    `> ${site.definition}`,
    '',
    `${site.name} works in the category ${site.category}. It holds critical enterprise technology against thresholds agreed with the business, retains the evidence, and owns corrective action through to verified closure. It does not sell staffing, outsourcing or technology labour.`,
    '',
    'Every page is static HTML at a root-level URL. Canonical URLs have no trailing slash.',
    '',
    ...section(
      'Start Here',
      present([g.stat('how-assurance-works'), g.stat('why-assurance'), g.stat('assurance')]).map((p) => link(p)),
    ),
    ...section('Core Assurance', [
      ...hubs.map((p) => link(p)),
      ...present([g.stat('assurance-engine')]).map((p) => link(p)),
    ]),
    ...section('Assurance Areas in Detail', g.children.map((p) => link(p))),
    ...section('Use Cases', g.useCases.map((p) => link(p))),
    ...section('Industries', g.industries.map((p) => link(p))),
    ...section('Technologies', g.technologies.map((p) => link(p))),
    ...section('Research and Insights', g.insights.map((p) => link(p))),
    ...section('Security and Trust', present([g.stat('security-trust'), g.stat('security'), g.stat('subprocessors')]).map((p) => link(p))),
    ...section('Contact', present([g.stat('contact'), g.stat('company')]).map((p) => link(p))),
    ...section('Optional', [
      `- [Full content index](${site.url}/llms-full.txt): The method in full, the glossary, page summaries and category relationships in one file.`,
      `- [Sitemap](${site.url}/sitemap-index.xml): Every canonical URL with its last modification date.`,
      `- [RSS feed](${site.url}/rss.xml): Insight articles.`,
    ]),
  ]
    .join('\n')
    .trimEnd()
    .concat('\n');
}

/** The method in full, from the same data that renders /how-assurance-works. */
function methodInFull(): string[] {
  const url = `${site.url}/how-assurance-works`;
  const bullets = (items: string[]) => items.map((item) => `- ${item}`);

  return [
    '## How assurance works: the method in full',
    '',
    `Source: ${url}`,
    '',
    `${definition.short} ${definition.full}`,
    '',
    '### In short',
    '',
    ...bullets(inShort),
    '',
    '### The five parts of one assured outcome',
    '',
    ...anatomy.map((a) => `- ${a.part}: ${a.means} Example: ${a.example}`),
    '',
    '### The method, step by step',
    '',
    ...methodSteps.flatMap((step, i) => [
      `${i + 1}. ${step.title}. ${step.text}`,
      `   Who: ${step.who}. Produces: ${step.produces}. Common mistake: ${step.mistake}`,
    ]),
    '',
    '### What every threshold carries',
    '',
    ...thresholdParts.map((t) => `- ${t.title}: ${t.text}`),
    '',
    '### What counts as evidence',
    '',
    ...evidenceProperties.map((e) => `- ${e.title}: ${e.text}`),
    '',
    'The same subject as assertion and as evidence:',
    '',
    ...assertionVsEvidence.map(([claim, proof]) => `- Assertion: ${claim}. Evidence: ${proof}.`),
    '',
    '### How the state is decided',
    '',
    ...stateRules.map((r) => `- ${r.when}: the state is ${stateByKey[r.state].label}. ${r.follows}`),
    '',
    '### When a correction is closed',
    '',
    closureRule,
    '',
    'What is not closure:',
    '',
    ...notClosure.map(([claim, why]) => `- ${claim}: ${why}`),
    '',
    '### Compared with monitoring, periodic audit and managed service',
    '',
    ...comparison.rows.flatMap((row) => [
      `${row.aspect}:`,
      ...row.cells.map((cell, c) => `- ${comparison.columns[c]}: ${cell}`),
      '',
    ]),
    '### What assurance adds to practices already in place',
    '',
    ...relatedPractices.map((p) => `- ${p.practice}. Gives: ${p.gives}. Assurance adds: ${p.adds}.`),
    '',
    '### Glossary',
    '',
    ...glossary.map((g) => `- ${g.term}: ${g.definition}`),
    '',
    '### Questions about the method',
    '',
    ...methodFaqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']),
  ];
}

/** Why assurance comes first, by kind of system. */
function whyInFull(index: Map<string, PageRef>): string[] {
  return [
    '## Why assurance comes first',
    '',
    `Source: ${site.url}/why-assurance`,
    '',
    'For four kinds of system, proof has to exist before the business relies on the system, and has to be kept for as long as the reliance lasts.',
    '',
    ...systemKinds.flatMap((kind) => {
      const page = index.get(kind.slug);
      return [
        `### ${kind.name}: ${kind.reason.toLowerCase()}`,
        '',
        ...(page ? [`Full argument: ${page.url}`, ''] : []),
        kind.line,
        '',
        `- What it can now do: ${kind.can}`,
        `- What that puts at stake: ${kind.stake}`,
        `- What is usually assumed: ${kind.assumed}`,
        '- What has to be proven first:',
        ...kind.prove.map((item) => `  - ${item}`),
        '',
      ];
    }),
    '### Objections, answered',
    '',
    ...objections.flatMap((o) => [`Q: ${o.says}`, `A: ${o.answer}`, '']),
  ];
}

export async function buildLlmsFullTxt(): Promise<string> {
  const g = await groups();
  const index = await getPageIndex();
  const hubOrder = clusters.map((c) => c.hub);

  const describe = (p: PageRef) => {
    const parent = p.parent ? index.get(p.parent) : undefined;
    return [
      `### ${p.title}`,
      '',
      `URL: ${p.url}`,
      parent && parent.slug !== '' ? `Part of: ${parent.title} (${parent.url})` : undefined,
      `Last reviewed: ${p.reviewed.toISOString().slice(0, 10)}`,
      '',
      p.description,
      '',
      p.summary,
      '',
    ].filter((line): line is string => line !== undefined);
  };

  const block = (title: string, intro: string, pages: PageRef[]) =>
    pages.length > 0 ? [`## ${title}`, '', intro, '', ...pages.flatMap(describe)] : [];

  const clusterBlocks = clusters.flatMap((c) => {
    const hub = g.hubs.find((p) => p.slug === c.hub);
    if (!hub) return [];
    const children = g.children.filter((p) => p.parent === c.hub);
    return [
      `## ${c.name}`,
      '',
      `Question held: ${c.question}`,
      '',
      c.summary,
      '',
      ...describe(hub),
      ...children.flatMap(describe),
    ];
  });

  return [
    `# ${site.name}: full content index`,
    '',
    `> ${site.definition}`,
    '',
    'This file has two parts. The first sets out what continuous technology assurance is, how it works and why it comes first, in full. The second is an index: one summary per page and the relationships between pages. Follow each URL for the full text of a page.',
    '',
    '## Company definition',
    '',
    `Name: ${site.name}`,
    `Category: ${site.category}`,
    `Statement: ${site.statement}`,
    `Website: ${site.url}/`,
    '',
    `${site.name} sells assurance coverage, evidence, corrective ownership, measurable thresholds and verified closure. It does not sell engineers, developers, hours or headcount, and it is not a staffing, outsourcing or general IT services company.`,
    '',
    '## Assurance framework',
    '',
    'Assurance is held as a current state, determined by evidence tested against thresholds agreed with the business.',
    '',
    ...states.map((s) => `- ${s.label}: ${s.meaning}`),
    '',
    'Method: signals become evidence; evidence is tested against thresholds; thresholds determine state; state that falls short triggers corrective action; corrective action closes only when re-testing verifies it.',
    '',
    `Assurance areas, in order: ${hubOrder.map((slug) => index.get(slug)?.title).filter(Boolean).join(', ')}.`,
    '',
    ...methodInFull(),
    ...whyInFull(index),
    ...clusterBlocks,
    ...block('Use cases', 'Situations in which assurance is lost. Each states what changed, the outcome at risk and what verified closure looks like.', g.useCases),
    ...block('Industries', 'Sectors where loss of assurance has regulatory, clinical or commercial consequence.', g.industries),
    ...block('Technologies', 'Platforms connected to the assurance problem each one creates.', g.technologies),
    ...block('Research and insights', `Analysis published by ${site.editorialAuthor}.`, g.insights),
    ...block(
      'Company, trust and contact',
      'Method, trust posture and contact.',
      present(
        [
          'assurance',
          'how-assurance-works',
          'why-assurance',
          'assurance-engine',
          'security-trust',
          'security',
          'subprocessors',
          'company',
          'contact',
        ].map(g.stat),
      ),
    ),
  ]
    .join('\n')
    .trimEnd()
    .concat('\n');
}
