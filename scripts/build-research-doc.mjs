/**
 * Assembles docs/research-2026.md from the research files in docs/research/.
 * The per-topic files stay the working copies; this is the single document
 * the specification asks for.
 *
 *   node scripts/build-research-doc.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { projectRoot } from '../src/lib/content-index.mjs';

const dir = path.join(projectRoot, 'docs', 'research');
const files = fs.readdirSync(dir).filter((f) => /^\d{2}-.*\.md$/.test(f)).sort();
const highlights = fs.readFileSync(path.join(dir, '00-highlights.md'), 'utf8').trim();
const topics = files.filter((f) => !f.startsWith('00-'));

const demote = (markdown) =>
  markdown
    .split('\n')
    .map((line) => (/^#{1,5}\s/.test(line) ? `#${line}` : line))
    .join('\n');

const titleOf = (markdown, fallback) => markdown.match(/^#\s+(.+)$/m)?.[1]?.replace(/\s+[—-]\s+research.*$/i, '') ?? fallback;

const parts = topics.map((file) => {
  const markdown = fs.readFileSync(path.join(dir, file), 'utf8').trim();
  return { file, title: titleOf(markdown, file), body: demote(markdown).replace(/^##\s+.+\n+/, '') };
});

const out = [
  '# Research, September 2026',
  '',
  'Assembled by `scripts/build-research-doc.mjs` from the files in `docs/research/`. Edit those files, then run the script again.',
  '',
  highlights,
  '',
  '## Contents',
  '',
  ...parts.map((p, i) => `${i + 1}. ${p.title} (\`docs/research/${p.file}\`)`),
  '',
  ...parts.flatMap((p) => [`## ${p.title}`, '', `Source file: \`docs/research/${p.file}\``, '', p.body, '']),
].join('\n');

fs.writeFileSync(path.join(projectRoot, 'docs', 'research-2026.md'), out, 'utf8');
console.log(`Wrote docs/research-2026.md from ${parts.length} research files (${out.split('\n').length} lines)`);
