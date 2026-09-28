Research was carried out on 2026-09-27 by ten parallel research passes, each restricted to
primary sources: vendor documentation, standards bodies, regulators and the projects' own
repositories. Every finding in the sections below carries its source URL, its publication
or update date, its relevance to Xyvionix and the pages it affects.

Rules applied to the site:

- A fact is used in content only if it appears in these files with a source.
- Items listed under "Could not verify" in any section are not used anywhere on the site.
- Rows marked `[K]` (from prior knowledge only), `(X)` (from a search excerpt only) or with an
  asterisk are not used as fact.
- Pages that depend on fast-moving facts are marked `freshnessCritical` and reviewed every
  90 days. See `docs/reports/content-review.md`.

## Changes that altered how the site was built

| Area | What changed | Effect on the build |
|---|---|---|
| Google rich results | FAQ rich results ended in May 2026 and HowTo is retired | No `FAQPage` or `HowTo` structured data is emitted. FAQs are visible page text for readers |
| Google AI features | A Search Console control governs inclusion in AI Overviews and AI Mode. `Google-Extended` does not affect Search | Documented as a launch step in `docs/search-console.md` |
| Google and llms.txt | Google states it does not use `llms.txt` | `llms.txt` is shipped as an agent navigation aid only. No ranking claim is made anywhere |
| Scaled content | Pages produced per query variant are treated as scaled content abuse | No combinatorial pages. Overlapping topics were merged and the rest moved to the backlog |
| Googlebot | Only the first 2 MB of HTML is read | Canonical and structured data are placed early in the head; no inline assets |
| Favicons | SVG is not in Google's list of supported favicon formats | PNG and ICO favicons are shipped alongside the SVG |
| Hidden content | Content behind accordions and tabs loses deep links | FAQs and sections are rendered open |
| OpenAI crawlers | Four documented agents, with separate purposes | `OAI-SearchBot` and `GPTBot` are both allowed, and documented as different things |
| Bing | `noarchive` and `nocache` limit Copilot use | The build fails if either directive appears in a robots meta tag |
| Cloudflare | AI bot defaults changed on 2026-09-15, and some settings also stop search crawlers | Recorded as a deployment check in `docs/ai-discovery.md` |
| Astro | Version 7 uses a strict Rust compiler, a new Markdown processor and Zod 4 | Collections use the Content Layer API; schemas import `z` from `astro/zod`; TypeScript is pinned to 6.x because `astro check` does not support 7 |
| EU AI Act | Application dates for high-risk systems were moved by an amending regulation in 2026 | Governance and industry pages use the amended dates |
| US model risk guidance | SR 11-7 was superseded in April 2026, and generative and agentic AI are outside the replacement's scope | Financial services pages describe the current position and do not cite SR 11-7 as in force |
| Google Cloud AI | Vertex AI was renamed | The page keeps the slug `vertex-ai-assurance` and uses the current name in its title and text |
| Microsoft AI | Azure AI Foundry became Microsoft Foundry, and related services were renamed | The Azure AI page uses current names and mentions former names once |
| AWS agents | Bedrock Agents became Bedrock Agents Classic; AgentCore is the recommended path | The Bedrock page reflects this |
| MCP | The specification revision of 2026-07-28 removed sessions and changed authorisation guidance | The MCP page and insight are written against that revision |
| OWASP | A 2026 edition of the LLM Top 10 and a Top 10 for Agentic Applications exist | AI security and agent pages reference the current editions |
| Kubernetes | Version and support-window facts, and the retirement of Ingress NGINX | Used on the Kubernetes, EKS and AKS pages with dates |
| Data tooling | Airflow 2 reached end of life; Kafka is KRaft only; dbt, Databricks and Snowflake renamed products | Data and technology pages use current names and versions |
