---
title: Measuring production RAG quality
h1: How to measure RAG quality in production so a failure has an address
seoTitle: 'Measuring Production RAG Quality: A Staged Method | Xyvionix'
description: >-
  A method for measuring RAG in production: score corpus, index, retriever and
  generator apart, sample live traffic, and trace each failure to one stage.
summary: >-
  A single answer-quality score cannot say what broke. This method scores
  corpus, index, retriever and generator separately, samples production
  traffic, sets thresholds per use and attributes each failure to one stage.
lede: >-
  Production RAG quality is measured by scoring each stage of the pipeline on
  its own, not by grading the final answer. Corpus, index, retriever and
  generator each get their own metric, their own sample and their own
  threshold, so that a bad answer can be traced to the stage that caused it. A
  single end-to-end score reports that something is wrong and cannot say where,
  and it can stay level while retrieval falls.
ogQuestion: 'When a RAG answer is wrong, can you say which stage failed?'
category: AI Assurance
author: Xyvionix Research
featured: false
cluster: ai
secondary:
  - data
parent: insights
state: assured
audience:
  - Head of AI
  - VP Engineering
  - Chief Data Officer
  - Head of SRE
intent: >-
  Informational: a measurement method for production RAG that separates
  retrieval from generation and attributes failure to corpus, index, retriever
  or generator
related:
  assurance:
    - production-rag-assurance
    - llm-evaluation-assurance
  useCases:
    - rag-quality-degradation
  technologies:
    - rag-vector-search-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - data-freshness-ai-quality
    - why-ai-evaluation-fails-after-launch
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Ragas: available metrics'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/'
  - title: 'Ragas: faithfulness'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/'
  - title: 'Ragas on PyPI'
    url: 'https://pypi.org/project/ragas/'
  - title: 'Anthropic: contextual retrieval'
    url: 'https://www.anthropic.com/engineering/contextual-retrieval'
  - title: 'pgvector'
    url: 'https://github.com/pgvector/pgvector'
  - title: 'Microsoft Learn: document-level access control in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'
  - title: 'Microsoft Learn: change and delete detection for blob indexers in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs'
  - title: 'OpenTelemetry GenAI semantic conventions: agent spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md'
  - title: 'Cohere: rerank'
    url: 'https://docs.cohere.com/docs/rerank'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## One score cannot say what broke

Most production RAG systems are watched through one number: a judged answer-quality score, a thumbs-up rate, or an escalation count. The number works as an alarm and fails as a diagnosis.

The recognisable pattern runs like this. The score falls over several weeks. The team changes the prompt, because the prompt is what the team can change quickly. The score recovers a little. Two months later it falls again. The cause was in the index all along: a synchronisation job had been skipping a folder. The prompt change hid the symptom and left the fault in place.

The opposite pattern is worse. The generation model is upgraded, the score rises, and the team records an improvement. Retrieval had been degrading for a quarter. The stronger model answers plausibly from thinner context, so the single score goes up while the evidence beneath each answer gets weaker.

Both patterns have the same root. A RAG answer is the product of four stages, and one score collapses four causes into one effect. Production RAG measurement must be built so that every failure has an address: corpus, index, retriever or generator. Anything less measures the system without making it correctable.

## Four stages, four obligations

Each stage owes something specific to the next, and each obligation can be tested on its own.

**Corpus.** The source content is current, complete and free of withdrawn material. This is a property of the source systems and the process that publishes to them.

**Index.** Every current source document is represented, in its current form, with its access metadata, and nothing deleted at the source remains. This is a property of the ingestion path: parsing, chunking, embedding and synchronisation.

**Retriever.** For a given query, under the filters production applies, the passages the answer depends on are returned within the cut-off. This covers query handling, vector and keyword search, fusion and the reranker.

**Generator.** Given the retrieved passages, the answer stays within them and addresses the question that was asked.

The stages fail independently and are owned by different people. A corpus fault belongs to a content owner. An index fault belongs to a data or platform team. Only the last two usually belong to the team that built the assistant, and that team receives every complaint.

## A metric for each stage

The table sets out one workable metric set. The retrieval and generation names follow Ragas, an open-source metric library that separates retrieval metrics (Context Precision, Context Recall) from generation metrics (Faithfulness, Response Relevancy). The corpus and index measures are probes, because no answer-level score can see them.

| Stage | Metric | What it measures | How it is obtained | What it cannot show |
|---|---|---|---|---|
| Corpus | Source currency | Whether the authoritative version of each document is the one published | Reconciliation against the system of record | Whether the index picked it up |
| Index | Freshness interval | Time from a source change to a retrievable change | Timed probe with a marker document | Whether the right passage ranks |
| Index | Deletion interval | Time from source deletion to removal of every derived chunk | Timed probe with a marker document | Anything about live content |
| Index | Access interval | Time from an access change to an enforced result | Canary document queried as a removed identity | Quality of permitted results |
| Retriever | Context Recall | Share of the passages known to be needed that were retrieved | Labelled reference set, production cut-off and filters | Whether the generator used them |
| Retriever | Context Precision | Whether relevant passages rank above irrelevant ones | Labelled reference set or judged sample | Whether anything was missed |
| Generator | Faithfulness | Claims supported by the retrieved context, divided by all claims in the response | Sampled live answers with context retained | Whether the context was right or current |
| Generator | Response Relevancy | Whether the answer addresses the question asked | Sampled live answers | Whether the answer is true |

The last column is the important one. Every metric has a blind spot, covered by a metric at a different stage. Faithfulness is the clearest case. Ragas defines it on a scale from 0 to 1 as supported claims over total claims, which is agreement with what was retrieved. An answer quoted accurately from a withdrawn document scores well.

Two details in the retrieval rows are often missed.

The first is the cut-off. Recall is only meaningful at the number of passages production passes to the generator. Anthropic's 2024 contextual retrieval article reported its results as a top-20 retrieval failure rate, falling from 5.7% to 1.9% on its own test set as contextual embeddings, contextual BM25 and reranking were added. The figures belong to that test set. The form of the measurement is what transfers: failure rate at a stated cut-off.

The second is the filter. The pgvector documentation states that with approximate indexes, filtering is applied after the index scan, and that iterative index scans, available since version 0.8.0, fetch more candidates when filters starve the results. Recall measured on the whole index is therefore not the recall a tenant-filtered or permission-filtered query receives. The reference set has to run with the filters production applies.

## Sampling production traffic

Two samples are needed, and they are not interchangeable.

**A labelled reference set** supports recall. Recall needs to know which passages should have been returned, so it cannot be computed on unlabelled traffic. The set is drawn from real queries, labelled once, and re-run on events: an index rebuild, an embedding model change, a reranker change, a vector store upgrade. The reranker counts: Cohere lists rerank-v4.0-pro and rerank-v4.0-fast alongside the earlier rerank-v3.5, and a move between them reorders results.

**A live sample** supports faithfulness and response relevancy, which need no reference answer. It is scored continuously.

Three design choices decide whether the live sample is worth having.

1. **Stratify by use.** A uniform random sample is dominated by the most common question type. Low-volume, high-consequence queries need their own quota, or they are never scored.
2. **Retain the whole record.** The query, the filters applied, the identifiers and versions of the chunks retrieved, the index version and the answer are stored together. Without the chunk identifiers a failure cannot be attributed. In the OpenTelemetry GenAI conventions, prompt and completion content is opt-in, so this capture is a deliberate decision with privacy consequences.
3. **Score the stages from one record.** Retrieval precision and generation faithfulness are computed from the same sampled interaction, so the two can be compared case by case.

## Thresholds per use, not per system

One assistant usually serves several uses, and they do not share a tolerance. A query that depends on one authoritative clause fails completely if that clause is not retrieved. A request to summarise a topic can lose a passage and remain useful. A single recall floor for the whole system is too strict for the second and too loose for the first.

The threshold is set by what the use can absorb.

- **Recall** follows the share of answers that depend on a single passage and the cost of missing it.
- **Faithfulness** follows the cost of an unsupported claim reaching a decision, and whether a person reviews the answer before it is acted on.
- **Freshness interval** follows how quickly a change in the source must reach the people relying on it.
- **Deletion and access intervals** follow the obligations attached to withdrawn or restricted content.

The numbers are agreed with the owner of the business process. The measurement team supplies the current value and its variation.

## Attributing a failure

When a sampled answer fails, the retained record is walked from the source forward. The first stage that fails its check is the address.

| Check, in order | If it fails | Stage |
|---|---|---|
| The source holds the correct, current content | The content is missing, superseded or wrong at the source | Corpus |
| That content is in the index, in its current form, with correct access metadata | Ingestion skipped it, holds an old version or holds an orphan | Index |
| It was returned within the cut-off under the filters applied | It was indexed and not retrieved | Retriever |
| The answer stays within the retrieved passages and addresses the question | It was retrieved and not used, or the answer added to it | Generator |

The order matters. Working forwards from the source finds the earliest fault, which is the one that has to be corrected.

Platform behaviour makes the index checks more than a formality. Microsoft documents that an Azure AI Search indexer does not track object deletion in data sources, and that for chunked indexes, permission metadata must be projected to each chunk row or chunk-level references are not filtered. An index can pass every job status check and fail both probes.

### An illustrative attribution

The figures here are illustrative. Over one window, faithfulness on the live sample holds at 0.93 while the judged answer score falls. Recall on the reference set, re-run that week, has dropped from 0.91 to 0.78 under production filters. The generator is doing its job on what it receives. The fault is at or before the retriever. The freshness probe passes, so the index is current. The embedding model has not changed. The vector store was upgraded nine days earlier. The address is the retriever, and the correction is tested by re-running the reference set, not by reading the answer score.

## What the method costs

**Labels are the expensive part.** The reference set needs people who know the content, and it ages as the corpus and the questions change, for the reasons set out in [why AI evaluation fails after launch](/why-ai-evaluation-fails-after-launch).

**Judged metrics are themselves model output.** The default faithfulness computation uses a language model to extract and check claims. Ragas documents a non-LLM alternative that uses the Vectara HHEM-2.1-Open classifier. The choice is recorded with the score.

**Metric libraries move.** Ragas now names its answer relevance metric Response Relevancy, and its latest release, 0.4.3, dates from January 2026. Metric definitions should be held by the enterprise with a version, so that a library upgrade does not silently redefine a threshold.

## What this means for assurance

A quality score becomes evidence when it is attributable to a stage, a configuration and a date. The method above produces that: each result names what was measured, at which cut-off, under which filters, on which index version.

It also makes correction verifiable. A fault assigned to the index is closed when the probe passes, and a fault assigned to the retriever is closed when recall on the reference set returns above its floor. Neither is closed because the answer score recovered.

The controls that hold these measurements against agreed thresholds are described in [Production RAG Assurance](/production-rag-assurance). Vector store behaviour, including filtered recall and quantisation, is covered in [RAG and Vector Search Assurance](/rag-vector-search-assurance), and the scenario of a gradual decline with no release to explain it in [RAG Quality Degradation](/rag-quality-degradation).
