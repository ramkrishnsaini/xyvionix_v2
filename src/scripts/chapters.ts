/**
 * Chapter bar on a long page. Enhancement only: every chapter is a normal
 * link to an anchor, so the bar works without this script.
 *
 * Markup contract:
 *   [data-chapters]            the bar
 *   a[href="#<id>"]            one per chapter, in page order
 *
 * The script marks the chapter being read and keeps its link in view when the
 * bar scrolls sideways on a phone.
 */

function initChapters(): void {
  const bar = document.querySelector<HTMLElement>('[data-chapters]');
  if (!bar) return;

  const links = [...bar.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const pairs = links
    .map((link) => ({ link, target: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
    .filter((pair): pair is { link: HTMLAnchorElement; target: HTMLElement } => pair.target !== null);
  if (pairs.length === 0) return;

  const list = bar.querySelector<HTMLElement>('[data-chapters-list]');
  let current: HTMLAnchorElement | null = null;

  const mark = () => {
    // A chapter is being read once its top has passed under the bars at the top of the screen.
    const line = bar.getBoundingClientRect().bottom + 24;
    let active: HTMLAnchorElement | null = null;
    for (const { link, target } of pairs) {
      if (target.getBoundingClientRect().top <= line) active = link;
    }
    if (active === current) return;

    current?.removeAttribute('aria-current');
    active?.setAttribute('aria-current', 'true');
    current = active;

    if (active && list && list.scrollWidth > list.clientWidth) {
      const left = active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
      list.scrollTo({ left, behavior: 'auto' });
    }
  };

  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(() => {
        queued = false;
        mark();
      });
    },
    { passive: true },
  );
  window.addEventListener('resize', mark, { passive: true });
  mark();
}

initChapters();
