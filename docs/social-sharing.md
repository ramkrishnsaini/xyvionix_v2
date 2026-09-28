# Social sharing

## What every page carries

Built by `src/lib/seo.ts`, rendered by `src/components/social/SocialMeta.astro`.

| Tag | Source |
|---|---|
| `og:title` | `ogTitle` in frontmatter, otherwise the SEO title without the brand suffix |
| `og:description` | `ogDescription`, otherwise the meta description |
| `og:url` | The canonical URL |
| `og:type` | `article` for insights, `website` for everything else |
| `og:site_name` | Xyvionix |
| `og:locale` | `en_US` |
| `og:image`, `og:image:secure_url` | `https://xyvionix.com/og/<slug>.png` |
| `og:image:type` | `image/png` |
| `og:image:width`, `og:image:height` | 1200, 630 |
| `og:image:alt` | "Xyvionix: page name. Question line." |
| `twitter:card` | `summary_large_image` |
| `twitter:title`, `twitter:description` | Same as Open Graph |
| `twitter:image`, `twitter:image:alt` | Same image and alt text |
| `twitter:site` | Emitted only when a verified handle is set in `src/data/social.ts` |
| `article:published_time`, `article:modified_time`, `article:section` | Insights only |

`article:author` is not emitted, because authorship is organisational. Add it when real
author profiles exist.

The build fails if any of these is missing on any page, if the image is not an absolute
URL on this site, or if the image file does not exist.

## Image system

One image per page, generated at build by `src/pages/og/[slug].png.ts` using the template
in `src/lib/og.ts`. Images are rendered from the same page index as the metadata, so a
page cannot exist without its image.

| Element | Treatment |
|---|---|
| Size | 1200 x 630 PNG, about 40 KB |
| Surface | Obsidian for all pages. Off-white for insights |
| Wordmark | Mark and "Xyvionix", top left |
| State | Monochrome state mark with its text label, top right |
| Label | JetBrains Mono, uppercase, with the dashed lead rule |
| Title | Instrument Sans 600, sized to the length of the title |
| Line | The page's `ogQuestion` |
| Motif | A trace crossing the dashed threshold line |
| Footer | "Continuous Technology Assurance" and "Evidence · Threshold · State" |

No stock imagery, no gradients, no metrics and no fabricated data appear in any image.

| Page type | Label | Title | Line |
|---|---|---|---|
| Home | Continuous Technology Assurance | Critical technology must be continuously proven. | None |
| Assurance | Cluster name, for example "AI assurance" | Page title | `ogQuestion` |
| Use case | Use case | Page title | H1 or `ogQuestion`, with the state the situation describes |
| Technology | Technology | Page title | H1 or `ogQuestion` |
| Industry | Industry | Industry name | `ogQuestion` |
| Insight | Category | Headline | H1 |
| Static pages | Continuous Technology Assurance | Page title | `ogQuestion` from `static-pages.ts` |

To change the design, edit `src/lib/og.ts` and rebuild. Every image is regenerated.

## Validation before launch

Platforms cache previews. Validate after the site is live on its final domain, and
re-scrape whenever a title, description or image changes.

Test these five URLs on each platform: the home page, `/ai-assurance`, one use case, one
industry page and one insight.

| Platform | How to validate | What to confirm |
|---|---|---|
| LinkedIn | Post Inspector: linkedin.com/post-inspector | Large image, title, description. Use "Inspect" to refresh the cache |
| Facebook | Sharing Debugger: developers.facebook.com/tools/debug | No warnings. Use "Scrape Again" to refresh |
| X | Paste the URL into a draft post. The card validator has been retired | Large image card renders with the title |
| Slack | Paste the URL in a private channel | Unfurl shows title, description and image |
| Microsoft Teams | Paste the URL in a chat | Preview card renders. Teams caches heavily |
| WhatsApp | Send the URL to yourself | Image, title and description. Images are about 40 KB, so size is not a concern |
| iMessage | Send the URL to yourself | Rich link preview with the image |

### What to check on each

1. The image is the page's own image, not the home image.
2. The title is not cut off mid-word. Long insight headlines may wrap to two lines.
3. The description reads as a sentence and is not the same as another page's.
4. The URL shown is the canonical URL, with no `.html` and no trailing slash.

### If a preview is wrong

| Symptom | Cause | Fix |
|---|---|---|
| No image | Image URL blocked by the firewall or returning a non-200 status | Request the image URL directly. Check bot rules for `facebookexternalhit`, `LinkedInBot`, `Slackbot`, `Twitterbot` |
| Old image or title | Platform cache | Re-scrape with the platform's tool |
| Small thumbnail instead of large card | `twitter:card` or image dimensions not read | Confirm the tags in the page source and that the image is 1200 x 630 |
| Image blocked by policy | `img-src` in the Content-Security-Policy | Not applicable to crawlers, which do not apply the page's policy |

## Verified profiles

`src/data/social.ts` starts with an empty profile list. Add a profile only when the
account exists and is controlled by Xyvionix. Adding one automatically:

- adds it to `sameAs` in the Organization structured data
- shows it in the footer with `rel="me"`
- and, for X, sets `twitter:site` when `twitterSite` is filled in
