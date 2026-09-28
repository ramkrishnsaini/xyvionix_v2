---
title: RAG Vector Search Assurance
h1: Prove that the retrieval layer still returns the right context, to the right people
seoTitle: 'RAG Vector Search Assurance: Recall, Filters, Freshness | Xyvionix'
description: >-
  What has to be re-proven in a vector search layer: recall under approximate
  search and filters, embedding model coupling, hybrid and reranking settings,
  deletion.
summary: >-
  Approximate search trades recall for speed, and the trade moves with index
  settings, quantisation, filters and store upgrades. Recall, embedding
  coupling, permission filtering, freshness and deletion are measured on the
  live index and re-proven.
lede: >-
  RAG vector search assurance is the continuing proof that the retrieval layer
  beneath an AI system still returns the passages an answer needs, only to
  identities entitled to see them, and only while the source still holds them.
  It applies to any vector store. Approximate search gives up some recall for
  speed, and how much it gives up depends on index settings, quantisation,
  filters and the store version, each of which can change with no release of
  the application.
ogQuestion: What is recall at production settings, under production filters?
platform: Vector stores and retrieval engines
group: inference
cluster: ai
secondary:
  - data
parent: technologies
state: assured
audience:
  - Head of AI
  - Head of Data Engineering
  - VP Engineering
intent: >-
  Technology + problem: proving the retrieval layer still returns the right
  context
related:
  assurance:
    - production-rag-assurance
    - data-freshness-assurance
    - llm-evaluation-assurance
  useCases:
    - rag-quality-degradation
    - data-pipeline-freshness-failure
  technologies:
    - azure-ai-assurance
    - aws-bedrock-assurance
    - databricks-data-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - measuring-production-rag-quality
    - data-freshness-ai-quality
evidence:
  - name: Retrieval component record
    detail: >-
      The vector store and its version, index type and parameters,
      quantisation setting, embedding model and output dimensions, fusion
      method and reranker version in production, compared with the record
      taken at the last test.
  - name: Reference query set
    detail: >-
      Representative queries with the passages that should be returned for
      each, the date the set was last refreshed against live traffic, and the
      filters production applies to each class of query.
  - name: Recall against exact search
    detail: >-
      Recall at the cut-off production uses, measured on the live index under
      production filters and compared with an exact search over the same
      vectors.
  - name: Stage contribution results
    detail: >-
      Retrieval quality measured with vector search alone, with keyword
      search fused in, and with reranking applied, so that a change in any
      one stage can be located.
  - name: Permission filter probe results
    detail: >-
      Dated results of queries run as identities that hold and do not hold
      access to marker documents, including after an access change at the
      source.
  - name: Freshness and deletion probe results
    detail: >-
      The measured interval from a change or deletion of a marker document at
      the source to the point where every chunk derived from it is updated in
      or absent from query results.
  - name: Retrieval latency measurements
    detail: >-
      Query latency at production concurrency and filter selectivity, dated
      against the store version and storage tier in use.
thresholds:
  - signal: Recall at production cut-off under production filters
    basis: The share of questions the business process needs answered from the correct source passage
    lostWhen: Measured recall falls below the agreed floor, or a component in the record has changed and recall has not been re-measured
  - signal: Vectors produced by a model other than the query model
    basis: Embeddings from different models cannot be compared, so any mixture returns meaningless distances
    lostWhen: Any part of a live index is found embedded with a different model or dimension setting from the one used at query time
  - signal: Time to embedding model retirement
    basis: The measured time to re-embed and re-validate the whole corpus, compared with the provider's published date
    lostWhen: The time remaining is shorter than the time a full re-embedding and validation takes
  - signal: Permission exposure window
    basis: The disclosure risk of the content and the obligations that apply to it
    lostWhen: An identity that has lost access at the source still receives the marker document after the agreed interval
  - signal: Deletion propagation interval
    basis: Legal, safety or policy reasons for which content is withdrawn
    lostWhen: Any chunk of a deleted marker document is still returned after the agreed interval
faqs:
  - q: Can a vector store vendor's published recall figure be used as evidence?
    a: >-
      No. A published figure describes the vendor's data set, settings and
      cut-off. Recall in production depends on the enterprise's own vectors,
      the index parameters chosen, the quantisation in force and the filters
      applied to each query. The evidence is a measurement on the live index
      against an exact search over the same data.
  - q: Does a stronger generation model make up for weaker retrieval?
    a: >-
      It hides it. A stronger model answers plausibly from thinner context,
      so answer quality holds while recall falls. That is why retrieval is
      scored apart from generation, and why a generation model upgrade is
      treated as a reason to re-check retrieval rather than as proof that it
      is sound.
  - q: What should trigger a retrieval re-test if the application has not changed?
    a: >-
      Any change to a component in the retrieval record. That includes a
      vector store upgrade, a change of index or quantisation setting, a move
      to a different storage tier, a new embedding model or dimension
      setting, a new reranker version and a change to the filters applied.
sources:
  - title: 'pgvector README'
    url: 'https://github.com/pgvector/pgvector'
  - title: 'Qdrant releases'
    url: 'https://github.com/qdrant/qdrant/releases'
  - title: 'Weaviate releases'
    url: 'https://github.com/weaviate/weaviate/releases'
  - title: 'Milvus releases'
    url: 'https://github.com/milvus-io/milvus/releases'
  - title: 'Elasticsearch release notes'
    url: 'https://www.elastic.co/docs/release-notes/elasticsearch'
  - title: 'Elastic: hybrid search'
    url: 'https://www.elastic.co/docs/solutions/search/hybrid-search'
  - title: 'OpenSearch releases'
    url: 'https://opensearch.org/releases/'
  - title: 'OpenSearch documentation: hybrid search'
    url: 'https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/'
  - title: 'Amazon S3 User Guide: S3 Vectors'
    url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html'
  - title: 'Gemini API: embeddings'
    url: 'https://ai.google.dev/gemini-api/docs/embeddings'
  - title: 'Gemini API: deprecations'
    url: 'https://ai.google.dev/gemini-api/docs/deprecations'
  - title: 'Gemini Enterprise Agent Platform: model versions and lifecycle'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions'
  - title: 'OpenAI API: embeddings guide'
    url: 'https://developers.openai.com/api/docs/guides/embeddings'
  - title: 'Voyage AI documentation: rerankers'
    url: 'https://docs.voyageai.com/docs/reranker'
  - title: 'Anthropic: contextual retrieval'
    url: 'https://www.anthropic.com/engineering/contextual-retrieval'
  - title: 'Ragas: available metrics'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/'
  - title: 'Microsoft Learn: document-level access control in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'
  - title: 'Amazon Bedrock User Guide: sync a data source with a knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem in vector search

A vector index does not return the nearest passages. It returns an approximation of them, quickly. Vector stores offer approximate indexes because exact search over a large corpus is slow, and an approximate index has settings that trade recall for speed and memory. The retrieval quality a system was approved on is therefore a property of those settings on that data, not of the product.

Three couplings make the approval fragile. The index is coupled to one embedding model, because vectors from different models cannot be compared. Recall is coupled to the filters applied, because a filter changes which candidates survive. The ranking is coupled to every stage after the vector search: the keyword search fused with it and the reranker applied to the result.

None of this is visible in the answer. A generation model given weaker context still writes a fluent response. The whole system, including grounding, freshness at the source and access rights, is covered in [Production RAG Assurance](/production-rag-assurance). This page covers the index and the search path, for any vector store.

## What expires, and on whose calendar

The calendars belong to the vector store projects and to the providers of the embedding and reranking models. The entries below were read in September 2026.

| Component | Published position | What it does to evidence |
|---|---|---|
| pgvector 0.8.6 | With approximate indexes, filtering is applied after the index scan. Iterative index scans, added in 0.8.0, fetch more candidates when a filter leaves too few | Recall measured without filters does not describe filtered queries |
| Elasticsearch 9.5 | Version 9.5.0 added DiskBBQ auto-calibration at merge time | Quantisation is recalibrated when segments merge, so recall can move with no change by anyone |
| Milvus | Version 3.0.0, a major release, on 29 July 2026. Version 3.0.2 on 20 September 2026. The 2.6 line still receives releases | Evidence gathered on 2.x describes the previous line |
| OpenSearch | A minor release roughly every eight weeks. Version 3.9.0 scheduled for 29 September 2026. The 2.x line is in maintenance | The release interval sets a natural interval for re-measurement |
| Qdrant | Version 1.19.1 current. Version 1.18 added 4-bit quantisation | A new compression option is a new recall trade to measure |
| Embedding models | Google shut down text-embedding-004 on the Gemini API on 14 January 2026. Four embedding models on Gemini Enterprise Agent Platform retire on 1 April 2027 | The index built with a retired model cannot be queried until it is re-embedded |
| Rerankers | Voyage lists rerank-3 and rerank-3-lite in preview alongside rerank-2.5 and rerank-2.5-lite | The reranker is a third model with its own version and end date |

Google's documentation states the consequence of an embedding change plainly: embeddings from one model cannot be compared with those from another, and all existing data must be re-embedded. An embedding retirement is a migration of the corpus, with a deadline.

## What must be continuously re-proven

**Recall under approximate search.** Recall is measured at the cut-off production uses, on the live index, against an exact search over the same vectors. The reference queries are drawn from real traffic and refreshed, because a set that no longer resembles what users ask passes while users fail.

**Recall under filters.** Tenant, permission and metadata filters are part of the test. Where a store filters after the index scan, a selective filter can leave fewer results than the query asked for, and the passages that would have answered the question are never considered.

**Quantisation.** Compression lowers memory cost and changes distances. Qdrant's release notes describe its 4-bit option as compression "without the recall tax", and a Weaviate release candidate adds a 4-bit option of its own. Those are vendor statements about vendor benchmarks. The evidence is recall on the enterprise's data after the setting is switched on, and again after the store recalibrates.

**Embedding model coupling.** The record holds the embedding model and its output dimensions. OpenAI's text-embedding-3 models and Google's gemini-embedding-2 both allow the output dimension to be chosen, so the dimension is a setting that has to match between indexing and query. A partial re-embedding leaves two vector spaces in one index.

**Hybrid and reranking configuration.** Elasticsearch recommends reciprocal rank fusion for hybrid search, and OpenSearch uses search pipelines with a normalisation processor or a rank-based one. The fusion method, its weights and the reranker each move the final order. Anthropic's 2024 contextual retrieval tests, on its own test set, reported a top-20 retrieval failure rate of 5.7% falling to 1.9% once contextual embeddings, keyword search and reranking were combined. That shows how much of retrieval quality sits in these stages, which is why each stage is measured on its own. Ragas, an open-source metric library, keeps retrieval metrics such as Context Precision and Context Recall separate from generation metrics for the same reason. How the scorers are kept valid is covered in [LLM Evaluation Assurance](/llm-evaluation-assurance).

**Permission filtering at chunk level.** Microsoft's documentation for Azure AI Search states that permission metadata must be projected onto each chunk row, and that without the projection chunk-level references are not filtered. The general point holds for any store: access control that exists on the document has to be shown to exist on every vector derived from it.

**Freshness and deletion propagation.** The index is a copy. The interval from a source change to a retrievable change is measured by probe, under the method in [Data Freshness Assurance](/data-freshness-assurance). On Amazon Bedrock Knowledge Bases, AWS notes that after a sync it could take a few minutes for new embeddings to be queryable on some vector stores. Job completion and query visibility are different moments.

**Latency after a storage change.** Amazon S3 Vectors documents subsecond latency for infrequent queries and as low as 100 milliseconds for more frequent ones. A move to a cheaper vector tier is a change to the latency the answer path was approved on.

## Common failure modes

- **Recall measured on the unfiltered index.** The benchmark passed. Production applies a tenant filter to every query, and filtered recall was never tested.
- **Defaults changed by an upgrade.** The store was upgraded for a fix. Index or quantisation behaviour changed with it, and no retrieval test was attached to the upgrade.
- **Recall that moved at merge.** Nothing was deployed. Segments merged, quantisation was recalibrated, and results for the same query changed.
- **Two embedding models in one index.** A migration was started and paused. Queries embedded with the new model are compared with vectors from the old one.
- **Dimension mismatch by configuration.** The indexing job and the query path set different output dimensions for the same model.
- **The reranker nobody versioned.** The index and embedding model are pinned. The reranker is called by an unpinned name and the final order changes.
- **Deleted at source, present in the index.** The document was removed. Some of its chunks remain, because deletion was applied to the document record and not to every vector derived from it.
- **Stronger model, weaker retrieval.** The generation model was upgraded and answer scores held, so falling recall went unseen. Model upgrades are covered in [Model Change Assurance](/model-change-assurance).

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk. When a component in the retrieval record has changed and nothing has been re-measured, the state is Unassured. Xyvionix owns the corrective action through to completion within the access it has been granted, and changes to production go through the enterprise's own change process.

Corrections follow the stage that moved. A recall breach under filters leads to the search settings for filtered queries or to the index design. A breach after quantisation leads to a different setting, or to a rescoring step, with the memory cost of each put to the business. A mixed index is completed or rebuilt. A permission gap is treated as an exposure: the metadata is projected, the affected chunks are identified and the period is recorded for the enterprise's own incident process. Orphaned chunks are removed explicitly.

An embedding retirement is planned backwards from the provider's date. The time a full re-embedding and validation takes is measured in advance, so that the start date is known.

Closure is recorded by probing the live index. For recall, the reference set meets its floor under production filters, compared with exact search. For permissions, an identity without access receives nothing derived from the marker document, and an identity with access still does. For deletion, no chunk of the removed marker is returned. For an embedding migration, every vector in the index is shown to come from the query model, and recall is compared with the baseline taken before the change.

Each closure is stored with the retrieval component record. When any component in it changes, the evidence expires and the record reopens.
