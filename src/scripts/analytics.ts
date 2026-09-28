/**
 * Optional analytics. No provider is configured by default and no identifier
 * is hard-coded. Interaction events are always dispatched as DOM events so a
 * provider can be attached later without touching templates.
 *
 * Events: cta_click, contact_start, contact_submit, page_engaged,
 *         journey (use-case | technology | industry | insight -> assurance or contact)
 *
 * To attach a provider, listen once:
 *   document.addEventListener('xyv:track', (e) => provider.track(e.detail.name, e.detail.props));
 */

export interface TrackDetail {
  name: string;
  props: Record<string, string>;
}

const PAGE_TYPE_KEY = 'xyv:last-page-type';

export function track(name: string, props: Record<string, string> = {}): void {
  const pageType = document.body.dataset.pageType ?? 'unknown';
  const detail: TrackDetail = { name, props: { page_type: pageType, path: location.pathname, ...props } };
  document.dispatchEvent(new CustomEvent<TrackDetail>('xyv:track', { detail }));
}

function readLastPageType(): string | null {
  try {
    return sessionStorage.getItem(PAGE_TYPE_KEY);
  } catch {
    return null;
  }
}

function writeLastPageType(value: string): void {
  try {
    sessionStorage.setItem(PAGE_TYPE_KEY, value);
  } catch {
    // Storage can be unavailable. Journey tracking is then skipped.
  }
}

export function initAnalytics(): void {
  const pageType = document.body.dataset.pageType ?? 'unknown';

  // Journey: arriving on a commercial or contact page from an editorial or problem-led page.
  const previous = readLastPageType();
  const sources = ['useCases', 'technologies', 'industries', 'insights'];
  if (previous && sources.includes(previous) && (pageType === 'assurance' || pageType === 'contact')) {
    track('journey', { from: previous, to: pageType });
  }
  writeLastPageType(pageType);

  document.addEventListener('click', (event) => {
    const el = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    track(el.dataset.track ?? 'click', {
      location: el.dataset.trackLocation ?? '',
      href: el instanceof HTMLAnchorElement ? el.pathname : '',
    });
  });

  // Engagement on assurance pages: 30 seconds visible and half the page scrolled.
  if (pageType === 'assurance') {
    let timed = false;
    let scrolled = false;
    let sent = false;
    const maybeSend = () => {
      if (timed && scrolled && !sent) {
        sent = true;
        track('page_engaged');
      }
    };
    window.setTimeout(() => {
      timed = true;
      maybeSend();
    }, 30_000);
    window.addEventListener(
      'scroll',
      () => {
        const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (depth >= 0.5) {
          scrolled = true;
          maybeSend();
        }
      },
      { passive: true },
    );
  }
}
