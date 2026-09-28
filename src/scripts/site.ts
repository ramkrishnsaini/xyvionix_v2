/**
 * Site-wide enhancement. Everything here is optional: the page is complete
 * and navigable as static HTML without it.
 */

import { initAnalytics } from './analytics.ts';

const root = document.documentElement;

function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.rv:not(.in)');
  if (targets.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
    return;
  }

  // Anything already on screen is shown immediately, so nothing visible is ever hidden.
  const viewport = window.innerHeight;
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < viewport) el.classList.add('in');
  });

  root.classList.add('js-reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  );

  document.querySelectorAll('.rv:not(.in)').forEach((el) => observer.observe(el));
}

function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  const toggle = nav.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const mobile = nav.querySelector<HTMLElement>('[data-nav-mobile]');
  const disclose = nav.querySelector<HTMLButtonElement>('[data-nav-disclose]');
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
  disclose?.addEventListener('click', () => setPanel(Boolean(panel?.hidden ?? true)));

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

  window.matchMedia('(min-width: 68rem)').addEventListener('change', (event) => {
    if (event.matches) setMobile(false);
  });
}

initNav();
initReveal();
initAnalytics();
