/**
 * Site-wide enhancement. Everything here is optional: the page is complete
 * and navigable as static HTML without it.
 */

import { initAnalytics } from './analytics.ts';

const root = document.documentElement;

function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.rv:not(.in)');
  if (targets.length === 0) return;

  const showAll = () => document.querySelectorAll('.rv:not(.in)').forEach((el) => el.classList.add('in'));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  // Anything already on screen is shown immediately, so nothing visible is ever hidden.
  const viewport = window.innerHeight;
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < viewport) el.classList.add('in');
  });

  root.classList.add('js-reveal');

  // Reveal starts a third of a screen before an element scrolls into view, so content is
  // already in place when the reader reaches it.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px 35% 0px' },
  );

  document.querySelectorAll('.rv:not(.in)').forEach((el) => observer.observe(el));

  // Safety nets. Content must never stay hidden because an animation did not run:
  // jumping by keyboard or anchor, printing, or a tab that was in the background.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    const limit = window.innerHeight * 1.35;
    document.querySelectorAll<HTMLElement>('.rv:not(.in)').forEach((el) => {
      if (el.getBoundingClientRect().top < limit) el.classList.add('in');
    });
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(sweep);
      }
    },
    { passive: true },
  );
  window.addEventListener('beforeprint', showAll);
  window.addEventListener('hashchange', () => window.setTimeout(sweep, 50));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sweep();
  });
}

function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  const toggle = nav.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const mobile = nav.querySelector<HTMLElement>('[data-nav-mobile]');
  const disclose = nav.querySelector<HTMLElement>('[data-nav-disclose]');
  const panel = nav.querySelector<HTMLElement>('[data-nav-panel]');

  const setMobile = (open: boolean) => {
    if (!toggle || !mobile) return;
    mobile.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  const setPanel = (open: boolean) => {
    if (!disclose || !panel) return;
    panel.hidden = !open;
    disclose.setAttribute('aria-expanded', String(open));
  };

  toggle?.addEventListener('click', () => setMobile(Boolean(mobile?.hidden ?? true)));

  // "Assurance" is a link in the HTML. With script it is a button with one result: it opens
  // the panel. The overview page is the first link inside the panel.
  if (disclose && panel) {
    disclose.setAttribute('role', 'button');
    disclose.setAttribute('aria-expanded', 'false');
    disclose.setAttribute('aria-controls', panel.id);

    disclose.addEventListener('click', (event) => {
      event.preventDefault();
      setPanel(Boolean(panel.hidden));
    });
    disclose.addEventListener('keydown', (event) => {
      if (event.key !== ' ') return;
      event.preventDefault();
      setPanel(Boolean(panel.hidden));
    });
    panel.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a')) setPanel(false);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (panel && !panel.hidden) {
      setPanel(false);
      disclose?.focus();
    }
    if (mobile && !mobile.hidden) {
      setMobile(false);
      toggle?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (panel && !panel.hidden && !panel.contains(target) && !disclose?.contains(target)) setPanel(false);
  });

  panel?.addEventListener('focusout', (event) => {
    const next = (event as FocusEvent).relatedTarget as Node | null;
    if (next && !panel.contains(next) && !disclose?.contains(next)) setPanel(false);
  });

  window.matchMedia('(min-width: 76rem)').addEventListener('change', (event) => {
    if (event.matches) setMobile(false);
  });

  // Dock the bar to the top edge once the page has moved, so nothing shows above it.
  let queued = false;
  const dock = () => {
    queued = false;
    nav.classList.toggle('nav--stuck', window.scrollY > 4);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(dock);
      }
    },
    { passive: true },
  );
  dock();
}

initNav();
initReveal();
initAnalytics();
