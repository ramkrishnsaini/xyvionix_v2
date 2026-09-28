/**
 * Client-side search over /search-index.json. No third-party service.
 * Results are ranked by where the terms match: title, then summary, then
 * supporting text. The query is kept in the URL so a search can be shared.
 */

interface SearchRecord {
  u: string;
  t: string;
  s: string;
  k: string;
  c: string;
  x: string;
}

const MAX_RESULTS = 30;

const normalise = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function score(record: SearchRecord, terms: string[]): number {
  const title = normalise(record.t);
  const summary = normalise(record.s);
  const rest = normalise(`${record.x} ${record.k} ${record.c}`);
  let total = 0;

  for (const term of terms) {
    let best = 0;
    if (title === term) best = 12;
    else if (title.startsWith(term)) best = 9;
    else if (new RegExp(`\\b${term}`).test(title)) best = 7;
    else if (title.includes(term)) best = 5;
    else if (new RegExp(`\\b${term}`).test(summary)) best = 3;
    else if (summary.includes(term)) best = 2;
    else if (rest.includes(term)) best = 1;
    if (best === 0) return 0; // every term must match somewhere
    total += best;
  }

  return total;
}

async function init(): Promise<void> {
  const form = document.querySelector<HTMLFormElement>('[data-search-form]');
  const input = form?.querySelector<HTMLInputElement>('input[name="q"]');
  const list = document.querySelector<HTMLUListElement>('[data-search-results]');
  const count = document.querySelector<HTMLElement>('[data-search-count]');
  const template = document.querySelector<HTMLTemplateElement>('[data-search-template]');
  if (!form || !input || !list || !count || !template) return;

  let records: SearchRecord[] = [];
  try {
    const response = await fetch('/search-index.json', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(String(response.status));
    records = (await response.json()) as SearchRecord[];
  } catch {
    count.textContent = 'Search is unavailable. Use the sections below.';
    return;
  }

  const render = (query: string) => {
    const terms = normalise(query)
      .split(' ')
      .filter((t) => t.length > 1)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, ''));

    list.replaceChildren();

    if (terms.length === 0) {
      count.textContent = '';
      return;
    }

    const results = records
      .map((record) => ({ record, value: score(record, terms) }))
      .filter((r) => r.value > 0)
      .sort((a, b) => b.value - a.value || a.record.t.localeCompare(b.record.t))
      .slice(0, MAX_RESULTS);

    count.textContent =
      results.length === 0
        ? `No results for "${query.trim()}".`
        : `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${query.trim()}"`;

    for (const { record } of results) {
      const node = template.content.cloneNode(true) as DocumentFragment;
      const link = node.querySelector<HTMLAnchorElement>('a');
      const set = (selector: string, text: string) => {
        const el = node.querySelector<HTMLElement>(selector);
        if (el) el.textContent = text;
      };
      if (link) link.href = record.u;
      set('[data-kind]', record.k);
      set('[data-cluster]', record.c);
      set('[data-title]', record.t);
      set('[data-summary]', record.s);
      if (!record.c) node.querySelector('.meta__sep')?.remove();
      list.append(node);
    }
  };

  const syncUrl = (query: string) => {
    const url = new URL(location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  };

  let timer = 0;
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      render(input.value);
      syncUrl(input.value);
    }, 120);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    render(input.value);
    syncUrl(input.value);
  });

  const initial = new URL(location.href).searchParams.get('q') ?? '';
  if (initial) {
    input.value = initial;
    render(initial);
  }
}

void init();
