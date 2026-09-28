/**
 * Detail blocks that are always open on wide screens and collapsed on phones,
 * where six open cards would make a very long scroll.
 *
 * Markup contract:
 *   details[data-collapse][open]   open in the HTML, so it is readable without script
 *
 * On a phone the script closes each block and leaves the visitor a toggle.
 * On a wide screen the toggle is hidden by CSS and the block stays open.
 *
 * The blocks are only changed when the screen crosses the breakpoint, never on
 * an ordinary resize: a phone resizes every time its address bar hides, and
 * that must not close a block the visitor has just opened.
 */

// Held at module level so the listener is never collected.
const wide = window.matchMedia('(min-width: 44rem)');

function initCollapse(): void {
  const panels = [...document.querySelectorAll<HTMLDetailsElement>('details[data-collapse]')];
  if (panels.length === 0) return;

  let applied: boolean | null = null;
  const apply = () => {
    const isWide = wide.matches;
    if (isWide === applied) return;
    applied = isWide;
    for (const panel of panels) panel.open = isWide;
  };

  wide.addEventListener('change', apply);
  // Fallbacks for a page that was laid out before it had its final width.
  window.addEventListener('resize', apply, { passive: true });
  window.addEventListener('pageshow', apply);
  window.addEventListener('load', apply);
  apply();

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
}

initCollapse();
