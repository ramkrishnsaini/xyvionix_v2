/**
 * Progress audit of content files, by inspecting the files themselves.
 *   node scripts/content-status.mjs          only files that are not finished
 *   node scripts/content-status.mjs --all    every file
 */
import { readAllEntries } from '../src/lib/content-index.mjs';
import { wordCount } from '../src/lib/text.ts';

const showAll = process.argv.includes('--all');
const rows = readAllEntries({ includeDrafts: true }).map((e) => {
  const sections = e.body.split(/^## /m).slice(1);
  const empty = sections.filter((s) => {
    const text = s.split('\n').slice(1).join('\n').trim();
    return text === '' || text === 'DRAFT';
  }).length;
  const fm = JSON.stringify(e.data);
  return {
    file: `${e.collection}/${e.slug}`,
    draft: e.data.draft === true,
    words: wordCount(e.body.replace(/\bDRAFT\b/g, '')),
    sections: sections.length,
    empty,
    placeholders: (fm.match(/DRAFT/g) ?? []).length + (e.body.match(/\bDRAFT\b/g) ?? []).length,
    brief: /<!--\s*BRIEF/.test(e.body),
    evidence: (e.data.evidence ?? []).length,
    thresholds: (e.data.thresholds ?? []).length,
    sources: (e.data.sources ?? []).length,
  };
});

const state = (r) =>
  !r.draft && r.placeholders === 0 && r.empty === 0 && !r.brief ? 'DONE' : r.words > 60 || r.evidence > 0 ? 'PARTIAL' : 'STUB';

const counts = { DONE: 0, PARTIAL: 0, STUB: 0 };
for (const r of rows) counts[state(r)] += 1;

console.log('state    words sect empty plch ev th src  file');
for (const r of rows) {
  const s = state(r);
  if (!showAll && s === 'DONE') continue;
  console.log(
    `${s.padEnd(8)} ${String(r.words).padStart(5)} ${String(r.sections).padStart(4)} ${String(r.empty).padStart(5)} ${String(r.placeholders).padStart(4)} ${String(r.evidence).padStart(2)} ${String(r.thresholds).padStart(2)} ${String(r.sources).padStart(3)}  ${r.file}${r.draft ? '  [draft:true]' : ''}${r.brief ? '  [brief]' : ''}`,
  );
}
console.log(`\n${rows.length} files: ${counts.DONE} done, ${counts.PARTIAL} partial, ${counts.STUB} untouched stubs`);
