/**
 * Collapsible questions. Enhancement only: each panel is a native <details>,
 * so it opens and closes, takes keyboard focus and is announced correctly
 * without this script. The script adds three conveniences.
 *
 * Markup contract:
 *   [data-faq]           container
 *   details              one per question, each with an id
 *   [data-faq-all]       button that opens or closes every panel, hidden until script runs
 *
 * 1. A link to a question (#question-05) opens that question.
 * 2. One control opens or closes every answer.
 * 3. Printing shows every answer, then restores what was open.
 */

function initFaq(): void {
  const root = document.querySelector<HTMLElement>('[data-faq]');
  if (!root) return;

  const panels = [...root.querySelectorAll<HTMLDetailsElement>('details')];
  if (panels.length === 0) return;

  const all = root.querySelector<HTMLButtonElement>('[data-faq-all]');
  const allLabel = all?.querySelector<HTMLElement>('[data-faq-all-label]') ?? all;

  const everyOpen = () => panels.every((p) => p.open);

  const syncAll = () => {
    if (!all || !allLabel) return;
    const open = everyOpen();
    allLabel.textContent = open ? 'Close all answers' : 'Open all answers';
    all.setAttribute('aria-expanded', String(open));
  };

  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const target = panels.find((p) => p.id === id);
    if (target) target.open = true;
  };

  if (all) {
    all.hidden = false;
    all.addEventListener('click', () => {
      const open = !everyOpen();
      for (const panel of panels) panel.open = open;
    });
  }

  for (const panel of panels) panel.addEventListener('toggle', syncAll);

  let beforePrint: boolean[] | null = null;
  window.addEventListener('beforeprint', () => {
    beforePrint = panels.map((p) => p.open);
    for (const panel of panels) panel.open = true;
  });
  window.addEventListener('afterprint', () => {
    if (!beforePrint) return;
    panels.forEach((panel, i) => (panel.open = beforePrint?.[i] ?? panel.open));
    beforePrint = null;
  });

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
  syncAll();
}

initFaq();
