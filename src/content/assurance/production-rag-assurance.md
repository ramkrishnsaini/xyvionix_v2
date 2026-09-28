---
title: Production RAG Assurance
h1: Prove that retrieval still returns what the answer depends on
seoTitle: 'Production RAG Assurance: Retrieval and Grounding | Xyvionix'
description: >-
  Continuous assurance for retrieval-augmented generation: retrieval recall,
  grounding, corpus freshness, deletion propagation and permission-aware
  results.
summary: >-
  Retrieval and generation are assured separately. Recall, grounding, corpus
  freshness, deletion and access filtering are each held against a threshold
  and re-proven when the corpus, the index or a model in the chain changes.
lede: >-
  Production RAG assurance is the continuing proof that a retrieval-augmented
  system finds the content an answer depends on, that the content is current
  and permitted for the person asking, and that the answer stays within it.
  Retrieval is measured apart from generation, because a fluent answer can hide
  a retrieval failure. The proof is re-gathered when the corpus, the index, the
  embedding model or the reranker changes.
ogQuestion: Is retrieval still returning what the answer depends on?
kind: child
cluster: ai
secondary:
  - data
parent: ai-assurance
state: assured
audience:
  - Head of AI
  - VP Engineering
  - Chief Data Officer
intent: 'Commercial: assurance for retrieval-augmented generation in production'
related:
  assurance:
    - llm-evaluation-assurance
    - data-freshness-assurance
    - ai-observability-assurance
  useCases:
    - rag-quality-degradation
    - production-ai-going-live
  technologies:
    - rag-vector-search-assurance
    - azure-ai-assurance
    - aws-bedrock-assurance
    - databricks-data-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - measuring-production-rag-quality
    - data-freshness-ai-quality
evidence:
  - name: Retrieval reference set
    detail: >-
      Queries with known relevant passages, drawn from real traffic and run
      with the tenant, permission and metadata filters that production
      applies.
  - name: Retrieval scores held apart from generation scores
    detail: >-
      Recall and precision of the retrieved context recorded on their own, so
      that a change in the generation model cannot hide a change in
      retrieval.
  - name: Grounding results on sampled production answers
    detail: >-
      The share of claims in sampled answers that the retrieved context
      supports, with the context and the answer retained together.
  - name: Freshness probe results
    detail: >-
      Timed results of changing a known source document and querying for the
      new content, which measures the real interval from source change to
      retrievable change.
  - name: Deletion propagation results
    detail: >-
      Timed results of removing a marker document at the source and confirming
      that every chunk derived from it has left the index.
  - name: Permission canary results
    detail: >-
      Timed results of changing access to a marker document at the source and
      testing retrieval as an identity that should no longer see it.
  - name: Retrieval component record
    detail: >-
      The embedding model, chunking configuration, reranker and index version
      in force, with the published retirement date of each model in the
      chain.
thresholds:
  - signal: Retrieval recall at the production cut-off, under production filters
    basis: The share of answers that depend on one authoritative passage and the cost of missing it
    lostWhen: Recall on the reference set falls below the agreed floor, or has not been measured since the index, embedding model or reranker changed
  - signal: Grounding on sampled production answers
    basis: The error rate the business process can absorb before review cost exceeds benefit
    lostWhen: The sampled rate falls below the agreed floor for two consecutive windows
  - signal: Interval from source change to retrievable change
    basis: How quickly a change in source content must reach the people relying on the answer
    lostWhen: A probe document changed at the source is not retrievable in its new form within the agreed interval
  - signal: Interval from source deletion to removal from the index
    basis: The obligations that apply to withdrawn or superseded content in the process served
    lostWhen: A marker document deleted at the source can still be retrieved after the agreed interval
  - signal: Interval from access change to enforced result
    basis: The sensitivity of the content and the enterprise's own standard for access revocation
    lostWhen: An identity removed from access can still retrieve the marker document after the agreed interval
  - signal: Models in the retrieval chain with a retirement date
    basis: The time needed to re-embed the corpus and re-measure retrieval, compared with the provider's notice
    lostWhen: The time remaining before retirement is shorter than the time needed to migrate and re-prove
faqs:
  - q: Is a high faithfulness score enough to show the system is working?
    a: >-
      No. Faithfulness measures whether the answer agrees with the retrieved
      context. It says nothing about whether that context was the right
      content, the current version or content the requester may see. An answer
      drawn accurately from a withdrawn document scores well. Freshness,
      deletion and permission have to be measured alongside it.
  - q: Do larger context windows remove the need for retrieval assurance?
    a: >-
      They change the economics, not the obligation. Anthropic includes a
      one-million-token context window at standard pricing on Claude 4.6 and
      later models, while OpenAI and Google price long-context requests at a
      higher rate. Whether to retrieve or to load the whole corpus is a cost
      and latency decision that is revisited with each model generation.
      Either way the content supplied to the model still has to be current and
      permitted.
  - q: The indexer reports success on every run. Why is that not evidence of freshness?
    a: >-
      A successful run shows that the job completed, not that the index matches
      the source. Change detection that relies on timestamps misses content
      whose timestamp did not move, and deletion is often not detected at all
      without explicit configuration. Freshness is proven by probing for known
      content, not by reading job status.
sources:
  - title: 'Ragas: available metrics'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/'
  - title: 'Ragas: faithfulness'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/'
  - title: 'Microsoft Learn: change and delete detection for blob indexers in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs'
  - title: 'Microsoft Learn: document-level access control in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'
  - title: 'Microsoft Learn: agentic retrieval in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview'
  - title: 'Amazon Bedrock: sync your data with your knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'Google: Gemini API embeddings'
    url: 'https://ai.google.dev/gemini-api/docs/embeddings'
  - title: 'Google: Gemini API deprecations'
    url: 'https://ai.google.dev/gemini-api/docs/deprecations'
  - title: 'Cohere: rerank'
    url: 'https://docs.cohere.com/docs/rerank'
  - title: 'Anthropic: pricing'
    url: 'https://platform.claude.com/docs/en/about-claude/pricing'
  - title: 'OpenAI: pricing'
    url: 'https://developers.openai.com/api/docs/pricing'
  - title: 'Google: Gemini API pricing'
    url: 'https://ai.google.dev/gemini-api/docs/pricing'
  - title: 'Google Cloud: RAG Engine overview'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## Why assurance is lost

A retrieval-augmented system is tested against a corpus as it stood on the day of the test. The corpus does not stay there, and neither do the models that index and rank it.

**Content is added, changed and withdrawn.** New documents are easy for an index to pick up. Deletions are not. Microsoft states that an Azure AI Search indexer does not track object deletion in data sources, so without a deletion policy a removed source document remains in the index as an orphan. The documented soft-delete methods do not apply where one source document produces many search documents, which is exactly the case for a chunked index.

**Synchronisation is a job, and jobs lapse.** Amazon Bedrock Knowledge Bases require the data source to be synchronised each time files are added, modified or removed. The age of the corpus is therefore the time since the last successful sync plus the time the new embeddings take to become queryable.

**Access rights move at the source.** Azure AI Search enforces document-level access against permission metadata stored in the index, and a source permission change is reflected only after that metadata has been synchronised. For SharePoint content, changes inherited from a site, library or folder require an explicit refresh. Inherited changes are the common case in an enterprise.

**The models in the chain retire.** The embedding model and the reranker are models with their own versions and end dates. Google shut down text-embedding-004 on the Gemini API on 14 January 2026, and its documentation states that embeddings from one model cannot be compared with embeddings from another, so all existing data must be re-embedded. Retirement of an embedding model is a migration of the whole corpus.

**The generation model improves.** A stronger model answers plausibly from thinner context. End-to-end quality holds while recall falls, and the loss stays hidden until a question arrives that the model cannot cover from its own knowledge.

## What is at stake

The failure that matters is an answer that is well written, correctly cited and wrong. A policy that was withdrawn last quarter is quoted as current. A clinical guideline that has been superseded is returned because the old version still sits in the index. The answer is grounded, so the usual quality score passes it.

The second consequence is disclosure. A person who has left a project, a team or the company's employment continues to receive content through the assistant, because the index still holds the access list from before the change. The source system was corrected promptly. The retrieval layer was not, and the period between the two is an exposure that nobody measured.

## What Xyvionix assures

Xyvionix holds six statements about each retrieval-augmented system as current facts, tested against thresholds agreed with the business.

1. **Retrieval finds what the answer needs.** Recall and precision are measured at the cut-off production uses and under the filters production applies. Ragas, a widely used open-source metric library, separates retrieval metrics such as Context Precision and Context Recall from generation metrics such as Faithfulness and Response Relevancy. Assurance keeps the same separation in the evidence.
2. **The answer stays within what was retrieved.** Grounding is scored on sampled production answers, with the retrieved context retained beside each one.
3. **The corpus is current.** The interval from a source change to a retrievable change is measured by probe, not inferred from job status.
4. **Withdrawn content is gone.** Deleting a document at the source removes every chunk derived from it within the agreed interval.
5. **Retrieval respects access.** A change of access at the source is enforced in results within the agreed interval, for direct and inherited permissions.
6. **The chain is known.** The embedding model, chunking configuration, reranker and index version are recorded, with a retirement date against each model.

Grounding is the statement most often mistaken for the whole. Ragas defines Faithfulness as the claims in the response that the retrieved context supports, divided by all the claims in the response. That is agreement with the index. It is not agreement with the world, which is why statements three to five exist.

Whether the scorers themselves remain valid is a separate question, covered by [LLM Evaluation Assurance](/llm-evaluation-assurance). The condition of the sources that feed the corpus is covered by [Data Freshness Assurance](/data-freshness-assurance).

## Common failure modes

- **Orphaned chunks.** The source document was deleted. Its chunks are still retrieved and cited, because deletion detection was never configured or does not cover a one-to-many index.
- **A deletion policy added late.** Microsoft notes that documents deleted before the policy existed stay in the index even after a reset, and suggests building a new index. A control switched on after go-live does not repair what came before it.
- **Access control lost at chunking.** Permission and sensitivity metadata must be projected onto each chunk row. Microsoft's documentation is direct about the result when it is not: chunk-level references are not filtered.
- **Change that leaves no timestamp.** Renaming an ADLS Gen2 directory does not update blob timestamps, so the indexer does not reindex the moved content. The run succeeds and the index is stale.
- **Recall tested without filters.** The benchmark ran against the whole index. Production applies tenant and permission filters, and recall under those filters was never measured.
- **Two embedding models in one index.** A migration was started and not finished, so part of the corpus is embedded with a model whose vectors cannot be compared with the rest.

## Corrective ownership

When a threshold is breached the state moves to At risk and corrective action begins. Xyvionix owns that action through to completion within the access it has been granted, and works through the enterprise's own change process where production must change.

The correction depends on which statement failed. A freshness breach leads to the synchronisation job: its schedule, its failures and the content it cannot see. A deletion breach leads to explicit removal of the orphaned chunks and, where history cannot be repaired in place, a rebuilt index. A permission breach is treated as an exposure: the metadata is refreshed, the affected content is identified and the period of exposure is recorded for the enterprise's own incident process. A recall breach is traced to the component that changed, which may be the embedding model, the chunking, the reranker or the vector store beneath them.

Where the business accepts a limit, such as a freshness interval that the source system cannot improve on, the acceptance is recorded with its owner and an expiry date.

## Verified closure

A retrieval correction is closed by probing the live index, not by a successful job run.

For freshness, a marker document is changed at the source and the new content is retrieved inside the agreed interval. For deletion, a marker document is removed and a query that previously returned it returns nothing derived from it. For access, an identity that has lost permission queries for the marker document and receives no result, and an identity that holds permission still does. For recall, the reference set is re-run under production filters and meets the floor, and grounding on sampled answers has not fallen as a side effect.

Each result is stored with the retrieval component record in force at the time. If the embedding model or reranker later changes, the evidence is seen to expire with it.

## Technology and industry context

Managed retrieval services differ in what they automate, and the gaps sit in different places. On Azure AI Search, string security filters are generally available while native access control list, SharePoint permission and Purview label enforcement are in preview. Agentic retrieval, which breaks a question into parallel subqueries, is generally available for extractive retrieval on the 2026-04-01 REST API while query planning and answer synthesis remain in preview, and it bills retrieval in tokens. On Amazon Bedrock the sync is explicit and handles deletions, so the exposure is a sync that did not run. On Google Cloud, RAG Engine supports VPC Service Controls and customer-managed keys but not data residency controls, so a residency position on the model does not extend to retrieval. Where a managed service hides ingestion, freshness and permission lag still exist and have to be measured from outside.

The reranker is a third model in the chain. Cohere lists rerank-v4.0-pro and rerank-v4.0-fast alongside the earlier rerank-v3.5, and a move between them changes the order of results with no change to the index. Vector store behaviour, including filtered recall and quantisation, is covered in [RAG and Vector Search Assurance](/rag-vector-search-assurance).

In healthcare the currency of the source is a safety matter, since a superseded guideline that is still retrievable can reach a clinical decision. That context is covered in [Healthcare AI Assurance](/healthcare-ai-assurance). The pattern most teams meet first, a gradual fall in answer quality with no release to explain it, is set out in [RAG Quality Degradation](/rag-quality-degradation).
