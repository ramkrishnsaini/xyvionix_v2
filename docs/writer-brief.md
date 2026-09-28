# Writer brief

You are writing production pages for xyvionix.com. Today is 2026-09-27.
Project root: `C:\Users\Ramkrishn\sources\xyvionix\xyvionix.com_v2`

## Read first, in this order

1. `docs/content-style-guide.md` — the contract. Read all of it.
2. `src/content/assurance/ai-agent-assurance.md` — a finished page. Match its
   depth, specificity, tone and frontmatter quality. Do not copy its sentences.
3. The research files named in your assignment. They are long tables. Read the
   sections relevant to your pages, plus each file's "Terminology", "Assurance
   angles" and "Could not verify" sections.
4. Each assigned content file. It is a draft stub whose frontmatter already
   holds the slug's relationships and a `<!-- BRIEF -->` comment describing the
   page's distinct intent.

## How to write each page

Work on ONE page at a time and finish it before starting the next.

1. Read the stub.
2. Write the file in steps, never in one large call:
   - Step A: use the Write tool for the complete frontmatter plus the first two
     body sections.
   - Step B and C: use the Edit tool to append the remaining sections, two or
     three sections per call. Anchor each Edit on the last line you wrote.
3. Set `draft: false`, `modifiedDate` and `lastReviewed` to `'2026-09-27'`.
4. Validate: run from the project root

   ```
   node scripts/validate-content.mjs --only <slug>
   ```

   Fix every ERROR. Read every warning: a "possible unsupported claim" warning
   is often a false positive on a technical phrase, but if the sentence makes a
   claim about Xyvionix that is not verified, rewrite it.
5. Move to the next page.

## Rules that are easy to break

- Keep these frontmatter fields exactly as the stub has them: `cluster`,
  `secondary`, `parent`, `kind`, `tier`, `group`, `industry`, `category`,
  `state`, `related`, `publishedDate`, `reviewCadence`, `freshnessCritical`,
  `owner`, `author`, `featured`, `noindex`.
- The body must not contain an evidence list, threshold table, FAQ section,
  related-links list or sales paragraph. The layout adds those from frontmatter.
- No `#` heading, no HTML, no em dashes, no "DRAFT", no banned words.
- Facts come only from the research files. Nothing from "Could not verify",
  nothing marked `[K]`, `(X)` or with an asterisk. Add a `sources` entry for
  every third-party fact you state, using the URL from the research file.
- Never invent numbers, customers, certifications, partnerships or case studies.
- Thresholds describe the basis, not a made-up number.
- Links in the body are root-relative and only to slugs that exist in
  `docs/manifest/*.json` or the static pages listed in the style guide.
- Two pages on similar subjects must differ in substance, not only in nouns.
- If, after trying, you conclude a page cannot be made substantive and
  distinct, leave it as `draft: true` and explain why in your final reply.

## Boundaries

- Edit only the content files assigned to you. Do not edit code, layouts,
  styles, scripts, manifests or other writers' pages.
- Do not run `astro build` or `npm run build`. Other writers are working in
  the same repository. The validator command above is safe to run.
- Do not use web search. The research is already done.

## Final reply

At most 120 words: the slugs you completed, any left as draft and why, and any
fact you wanted to use but could not verify from the research files.
