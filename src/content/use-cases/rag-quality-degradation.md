---
title: RAG Quality Degradation
h1: Answers are getting worse and nothing is down. Find which part moved
seoTitle: 'RAG Quality Degradation: Isolate the Cause | Xyvionix'
description: >-
  How to diagnose a retrieval-augmented system whose answers are declining with
  no outage: confirm the decline, split retrieval from generation, find what
  moved.
summary: >-
  Users report worse answers and no alert has fired. The diagnosis runs in
  order: confirm the decline, separate retrieval from generation, trace the
  component that moved, then prove restoration on the questions users raised.
lede: >-
  A retrieval-augmented system that is getting worse without an outage has
  changed in a part that no release touched: the corpus, the index, a model in
  the retrieval chain, the model that writes the answer, or the questions
  being asked. The diagnosis confirms the decline on the questions users
  reported, separates retrieval from generation, and traces the component that
  moved. Restoration is proven on those same questions, not on a rebuilt index
  or a successful job run.
ogQuestion: Answers are worse and nothing is down. Which part moved?
cluster: ai
secondary:
  - data
parent: use-cases
state: degrading
audience:
  - Head of AI
  - VP Engineering
  - Chief Data Officer
intent: >-
  Problem: answers from a retrieval-augmented system are getting worse without
  an obvious failure
related:
  assurance:
    - production-rag-assurance
    - data-freshness-assurance
    - llm-evaluation-assurance
  useCases:
    - data-pipeline-freshness-failure
    - model-provider-migration
  technologies:
    - rag-vector-search-assurance
    - databricks-data-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - measuring-production-rag-quality
    - data-freshness-ai-quality
evidence:
  - name: Reported question set
    detail: >-
      The questions users raised, each with the passage that should have been
      retrieved and the answer that should have been given, as identified by
      the person who owns the content.
  - name: Retrieved context retained with each answer
    detail: >-
      For sampled and reported answers, the passages that were retrieved,
      stored beside the answer, so that a wrong answer can be traced to what
      the model was given.
  - name: Separate retrieval and generation series
    detail: >-
      Retrieval scores and generation scores recorded apart and over time, with
      the earliest available measurement marked as the baseline and its date
      stated.
  - name: Change timeline for the period
    detail: >-
      Every change to the corpus, index, vector store version, embedding model,
      reranker, generation model and prompt since the baseline, including
      changes made by a platform that produced no change record.
  - name: Corpus age and orphan probe results
    detail: >-
      The time of the last synchronisation that delivered content, and the
      result of querying for documents known to have been replaced or deleted
      at the source.
  - name: Requested and responding model record
    detail: >-
      The generation model each request asked for and the model that answered,
      taken from telemetry across the period of decline.
  - name: Question mix comparison
    detail: >-
      The subjects present in current production questions compared with the
      subjects covered by the corpus and by the reference set.
thresholds:
  - signal: Direction of retrieval recall across consecutive windows
    basis: The margin between the current level and the agreed floor, compared with the time a correction takes to release
    lostWhen: Recall reaches the floor, or is falling at a rate that reaches it before a correction can be released
  - signal: User-reported wrong answers against the measured score
    basis: The measurement has to detect what users detect
    lostWhen: Reports rise across the agreed number of windows while the measured score does not move
  - signal: Retrieved passages drawn from replaced or withdrawn sources
    basis: The consequence of acting on outdated content in the process the system serves
    lostWhen: The sampled share exceeds the agreed level, or a document deleted at the source is retrieved
  - signal: Retrieval chain changes without re-measurement
    basis: Retrieval evidence describes one index, one embedding model and one reranker
    lostWhen: Any of them has changed and the reference set has not been run since
  - signal: Recall under production filters against unfiltered recall
    basis: The smallest tenant or permission group that must still receive complete results
    lostWhen: The difference between filtered and unfiltered recall exceeds the agreed tolerance
  - signal: Production questions outside corpus coverage
    basis: The share of volume and consequence each subject carries
    lostWhen: A subject above the agreed share of questions has no current source content
faqs:
  - q: Nothing was released. How can quality have changed?
    a: >-
      Several parts of a retrieval-augmented system change without a release.
      Documents are added, replaced and removed at the source. A search engine
      can recalibrate its quantisation during routine segment merging. A
      platform can upgrade the generation model behind a deployment at
      retirement. Users begin asking about subjects the corpus does not cover.
      None of these passes through the enterprise's change process.
  - q: Should the index be rebuilt as a first response?
    a: >-
      Not before the cause is known. A rebuild may clear the symptom, and it
      also removes the evidence of what went wrong, so the same condition can
      return unnoticed. It has a cost as well. Amazon Bedrock documents that
      changed documents are re-ingested in full, which means parsing, chunking
      and embedding again. Diagnosis comes first and the rebuild follows if the
      cause requires it.
  - q: How is a Degrading state different from an incident?
    a: >-
      The threshold has not yet been breached. The evidence is moving toward
      it, which leaves time to find the cause and correct it through the normal
      change process. The purpose of acting in the Degrading state is that the
      business never experiences the At risk state.
sources:
  - title: 'Ragas: available metrics'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/'
  - title: 'Elasticsearch release notes'
    url: 'https://www.elastic.co/docs/release-notes/elasticsearch'
  - title: 'pgvector README'
    url: 'https://github.com/pgvector/pgvector'
  - title: 'Microsoft Learn: change and delete detection for blob indexers in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs'
  - title: 'Amazon Bedrock: sync your data with your knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'Google Cloud: Gemini Enterprise Agent Platform model versions'
    url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions'
  - title: 'Google: Gemini API embeddings'
    url: 'https://ai.google.dev/gemini-api/docs/embeddings'
  - title: 'Microsoft Learn: Foundry Models retirements'
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements'
  - title: 'OpenTelemetry GenAI semantic conventions: spans'
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 90
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## What changed

Users say the answers have got worse. No alert has fired. Availability, latency and error rate are where they were last month, and nobody can point to a release that would explain it.

This is the Degrading state. The outcome is still inside its threshold, or is believed to be, and the evidence is moving toward the boundary. Something changed, and it did not pass through the change process.

A retrieval-augmented system has several parts that move without a deployment. The corpus changes at its source every working day. The index changes underneath the application: Elasticsearch 9.5.0 added automatic calibration of its DiskBBQ quantisation at segment merge time, so index behaviour can be adjusted by routine background work. The generation model changes on the platform's calendar: on Microsoft Foundry, Standard deployments are upgraded automatically when a model retires. And the questions change, because users learn what the system is for and ask it new things.

## The business outcome at risk

The outcome is that a person can act on the answer without checking it. That is what the system was approved to deliver.

As quality declines, users split into two groups. Careful users go back to reading the source documents, and the time the system was meant to return to them is spent again. Less careful users keep trusting the answer and act on a passage that has been replaced, or on half of what the policy says.

Gradual decline is tolerated because no single day is bad enough to raise an incident. Trust then returns more slowly than quality: after the fault is corrected, users keep checking. Without a measurement, the team cannot tell a real decline from a few memorable failures, and cannot show afterwards that the correction worked.

## What must be proven

Four questions are answered in order. Each narrows the one after it.

1. **Is the decline real, and since when?** The reported questions are collected and run again. The person who owns the content marks each result. Where a stored baseline exists the results are compared with it. Where none exists, this measurement becomes the baseline and the gap is recorded.
2. **Is it retrieval or generation?** For each failing question the retrieved passages are examined apart from the answer. Ragas, an open-source metric library, keeps retrieval metrics such as Context Recall separate from generation metrics such as Faithfulness, and a manual review can follow the same split.
3. **Which component moved?** A timeline is built of every change in the period, including the ones that left no change record.
4. **Have the questions changed?** Current questions are compared with what the corpus covers.

The review of failing questions points to the place to look.

| What the review shows | Likely cause | First check |
|---|---|---|
| The right passage exists and was not retrieved | Index, embedding or ranking change | Reference set re-run under production filters |
| The retrieved passage is outdated or withdrawn | Stale corpus or orphaned chunks | Time since the last sync that delivered content, and a query for a deleted document |
| Results are complete for some users and thin for others | Filters starving the search | Recall with tenant and permission filters applied |
| The right passage was retrieved and the answer departs from it | Generation model or prompt change | Requested and responding model in telemetry, and prompt history |
| Retrieval and answer are sound and the user is still not served | Question outside the corpus | Question subjects against corpus coverage |

## What causes assurance to be lost

**Filters grow more selective.** pgvector documents that with approximate indexes, filtering is applied after the index scan. A narrow filter can therefore leave too few results, and iterative index scans were added in version 0.8.0 to fetch more candidates. A system tested with a few large tenants behaves differently once it holds many small ones.

**A deletion window closes.** For Azure Blob soft delete, Microsoft advises a retention period much longer than the indexer interval, because the indexer removes a document only if it processes the blob while the blob is in the soft-deleted state. If the indexer is interrupted for longer than the retention period, those deletions are never applied, and the withdrawn content stays retrievable after the indexer recovers.

**An embedding migration stops halfway.** On Google Cloud's Gemini Enterprise Agent Platform (formerly Vertex AI), text-embedding-004 and text-embedding-005 are among the embedding models that retire on 1 April 2027. Google's documentation states that embeddings from different models cannot be compared. An index that holds vectors from both the old and the new model returns results that depend on which part of the corpus was migrated first.

**The answering model moved.** The OpenTelemetry GenAI conventions record the requested model and the responding model as separate attributes. Where they differ, an alias or an automatic upgrade has changed the model, and the prompt that was tuned for its predecessor is now read differently.

## Corrective action

In the Degrading state the threshold has not been breached, so the correction can go through the normal change process. If the trend reaches the floor first, the state moves to At risk and the correction takes priority over planned work. Under assurance, Xyvionix owns the corrective action through to completion within the access it has been granted.

The correction follows the cause. A stale corpus leads to the synchronisation job and to explicit removal of orphaned chunks. Filter starvation is corrected in the search configuration and re-measured for the smallest tenant. A half-finished embedding migration is completed or reversed, so that the index holds one model's vectors. A moved generation model is pinned, and the replacement is evaluated before it is accepted. A gap in the corpus goes to the owner of the content, because no engineering change supplies a document that was never written.

Rebuilding the index or moving to a stronger generation model is held back until the cause is known. Either may clear the symptom and leave the cause in place.

The continuing position on retrieval is held under [Production RAG Assurance](/production-rag-assurance). The age of the sources that feed the corpus is held under [Data Freshness Assurance](/data-freshness-assurance).

## What verified closure looks like

Restoration is proven on the questions users raised. They are run again, and the content owner confirms that the right passage was retrieved, that it is current and that the answer follows it.

Three further results are recorded. Retrieval and generation scores, measured apart, have returned to the baseline and have held there across the agreed windows. The specific cause has been re-tested: a query for the deleted document returns nothing derived from it, recall for the smallest tenant meets the floor, or the responding model matches the evaluated one. User reports have fallen.

One more check applies where the measured score stayed level while users complained. In that case the measurement was part of the fault. The reported questions are added to the reference set, and the set is shown to fail on the faulty configuration before it is relied on again. Keeping the instrument valid is the subject of [LLM Evaluation Assurance](/llm-evaluation-assurance).

## What to do next

The first step needs no new tooling. The team gathers the questions users have complained about and, for each one, saves the retrieved passages beside the answer. The person who owns the content then marks three columns: whether the right passage was retrieved, whether that passage is current, and whether the answer follows it.

The pattern across the three columns shows whether the fault is in retrieval, in the corpus or in generation. The team also writes down the date of the last synchronisation that delivered new content and the embedding model in use. If either cannot be found quickly, that is a finding in its own right.
