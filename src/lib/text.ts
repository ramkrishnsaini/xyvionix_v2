/** Text helpers shared by layouts, endpoints and scripts. No Astro imports. */

const WORDS_PER_MINUTE = 220;

export function wordCount(markdown: string | undefined): number {
  return String(markdown ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

export function readingMinutes(markdown: string | undefined): number {
  return Math.max(1, Math.round(wordCount(markdown) / WORDS_PER_MINUTE));
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** 27 September 2026 */
export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** 2026-09-27 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

/** Collapse whitespace and trim to a length on a word boundary. */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
