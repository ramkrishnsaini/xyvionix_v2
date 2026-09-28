/**
 * Flat-routing safety rules. Pure functions, no Astro imports, so the same
 * code runs in the build, in scripts and in tests.
 */

export interface RouteEntry {
  slug: string;
  /** Where the slug came from, for error messages. */
  source: string;
}

export interface RouteProblem {
  code: 'empty' | 'invalid' | 'reserved' | 'duplicate';
  slug: string;
  source: string;
  message: string;
}

/** Lowercase letters and digits in hyphen-separated groups. No slashes, dots or underscores. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MAX_SLUG_LENGTH = 80;

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && slug.length > 0 && slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

export function findRouteProblems(entries: RouteEntry[], reserved: ReadonlySet<string>): RouteProblem[] {
  const problems: RouteProblem[] = [];
  const seen = new Map<string, string>();

  for (const { slug, source } of entries) {
    if (typeof slug !== 'string' || slug.trim() === '') {
      problems.push({ code: 'empty', slug: String(slug), source, message: `Empty slug in ${source}` });
      continue;
    }

    if (!isValidSlug(slug)) {
      problems.push({
        code: 'invalid',
        slug,
        source,
        message: `Invalid slug "${slug}" in ${source}: use lowercase letters, digits and single hyphens, at most ${MAX_SLUG_LENGTH} characters`,
      });
      continue;
    }

    if (reserved.has(slug)) {
      problems.push({
        code: 'reserved',
        slug,
        source,
        message: `Slug "${slug}" in ${source} collides with a reserved route`,
      });
    }

    const first = seen.get(slug);
    if (first !== undefined) {
      problems.push({
        code: 'duplicate',
        slug,
        source,
        message: `Duplicate slug "${slug}": ${first} and ${source}`,
      });
    } else {
      seen.set(slug, source);
    }
  }

  return problems;
}

/** Throws with every problem listed. Called from getStaticPaths so the build fails. */
export function assertRoutes(entries: RouteEntry[], reserved: ReadonlySet<string>): void {
  const problems = findRouteProblems(entries, reserved);
  if (problems.length > 0) {
    const list = problems.map((p) => `  - [${p.code}] ${p.message}`).join('\n');
    throw new Error(`Flat routing check failed with ${problems.length} problem(s):\n${list}`);
  }
}
