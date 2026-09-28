# Structured data

Implementation: `src/lib/schema.ts`. Rendered by `src/components/schema/JsonLd.astro`
through `src/components/seo/Seo.astro`. Validated on every build by
`scripts/validate-dist.mjs`.

## Principles

1. Truthful only. Structured data describes what is on the page and what is true of the
   company. Nothing is added to win a search feature.
2. One graph per page. Each page emits a single `@graph` in one `application/ld+json` block.
3. One Organization. The Organization node is built from `src/data/site.ts` and is
   identical on every page. The build fails if two different definitions appear.
4. References by `@id`. Pages, articles and services point to the Organization and the
   WebSite by `@id`. They do not restate them.
5. Absolute URLs and ISO dates everywhere.

## What each page type emits

| Page type | Nodes |
|---|---|
| Home | Organization, WebSite, WebPage, ImageObject |
| Assurance hub and assurance page | Organization, WebSite, WebPage, Service, ImageObject, BreadcrumbList |
| Use case | Organization, WebSite, WebPage, ImageObject, BreadcrumbList |
| Technology | Organization, WebSite, WebPage, ImageObject, BreadcrumbList |
| Industry | Organization, WebSite, WebPage, ImageObject, BreadcrumbList |
| Insight | Organization, WebSite, WebPage, Article, ImageObject, BreadcrumbList |
| Hub (`/assurance`, `/use-cases`, `/industries`, `/technologies`, `/insights`) | Organization, WebSite, CollectionPage, ImageObject, BreadcrumbList |
| Company | Organization, WebSite, AboutPage, ImageObject, BreadcrumbList |
| Contact | Organization, WebSite, ContactPage, ImageObject, BreadcrumbList |
| Legal, method, trust | Organization, WebSite, WebPage, ImageObject, BreadcrumbList |
| 404 | None |

`Service` is used only on assurance pages, where a service is what the page describes.
It carries `name`, `description`, `serviceType`, `category`, `provider` and `audience`.
It carries no price, offer, rating or area served.

`Article` uses organisational authorship: the author is the Organization, displayed as
Xyvionix Research. No named individual is invented. When real authors are configured,
add a `Person` node with a real profile URL.

## Identifiers

| Node | `@id` |
|---|---|
| Organization | `https://xyvionix.com/#organization` |
| Logo | `https://xyvionix.com/#logo` |
| WebSite | `https://xyvionix.com/#website` |
| Page | `<canonical>#webpage` |
| Primary image | `<canonical>#primaryimage` |
| Breadcrumb | `<canonical>#breadcrumb` |
| Service | `<canonical>#service` |
| Article | `<canonical>#article` |

## Organization: entity consistency

Source of truth: `organization` and `company` in `src/data/site.ts`, and `profiles` in
`src/data/social.ts`.

| Property | Value | Rule |
|---|---|---|
| `name` | Xyvionix | Always |
| `url` | https://xyvionix.com | Always |
| `logo` | `/brand/xyvionix-logo-512.png`, 512 x 512 | Always |
| `description` | The company definition | Always |
| `slogan` | Critical technology must be continuously proven. | Always |
| `legalName` | Not emitted | Emitted only when `company.legalName` is confirmed |
| `email` | Not emitted | Emitted only when `company.contactEmail` is confirmed |
| `sameAs` | Not emitted | Emitted only for profiles added to `src/data/social.ts`, which must be real and controlled by Xyvionix |
| `foundingDate`, `founder`, `address`, `numberOfEmployees` | Not emitted | Add only when confirmed, and only to `site.ts` |

## Never emitted

| Type or property | Reason |
|---|---|
| `FAQPage` | Google retired FAQ rich results in 2026. FAQs are visible text for readers |
| `HowTo` | Retired |
| `AggregateRating`, `Review` | No reviews exist |
| `Offer`, `price` | Nothing is sold at a listed price |
| `SoftwareApplication` | The Assurance Engine is not sold as software |
| Awards, certifications, client lists, partners | None are verified |
| `SearchAction` | Site search is client-side and is not an indexable results URL |

The build fails if `FAQPage`, `HowTo`, `AggregateRating` or `Review` appears in any page.

## Breadcrumbs

`BreadcrumbList` reflects the conceptual hierarchy, not the URL. URLs are flat, so the
trail comes from each page's `parent`. Trails are three levels at most: Home, the nearest
parent, the page. Every `item` is an absolute canonical URL. The visible breadcrumb and
the structured data come from the same function, `breadcrumbsFor()`, so they match.

## Validation

Automatic, on every build:

- every block parses as JSON
- `@context` is `https://schema.org`
- every `url`, `item`, `contentUrl`, `logo` and `@id` is an absolute `https` URL
- every date property is ISO 8601
- exactly one Organization node per page, and one definition across the site
- a WebSite node and a page node on every page, and a BreadcrumbList on every page but home
- none of the forbidden types is present

Manual, before launch and after any change to `schema.ts`:

1. Schema Markup Validator (validator.schema.org): home, one assurance page, one insight,
   contact. Expect no errors.
2. Rich Results Test (search.google.com/test/rich-results): one insight and one assurance
   page. Article and Breadcrumb should be detected. Do not expect FAQ or HowTo results,
   and no page on this site promises any rich result.
3. Search Console, Enhancements: watch the Breadcrumbs report after launch.
