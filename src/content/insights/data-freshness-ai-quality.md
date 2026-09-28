---
title: Data freshness is an AI quality problem
h1: 'A stale corpus answers with confidence: why data age belongs in the AI quality score'
seoTitle: 'Data Freshness Is an AI Quality Problem | Xyvionix'
description: >-
  Why AI evaluation cannot see stale data, how age accumulates between source
  and index, and how to set freshness and deletion thresholds from the
  consumer's side.
summary: >-
  Grounding scores measure agreement with the index, not with the source. This
  article traces where age enters between source and answer, why successful
  jobs hide it, and how to set consumer-defined tolerances for change and
  deletion.
lede: >-
  An AI system that answers from a stale corpus is not a data engineering
  defect with an AI symptom. It is an AI quality failure that the usual AI
  quality measures are built not to see. Grounding metrics compare the answer
  with what was retrieved. They have no term for how old the retrieved content
  is, or whether it should still exist. Age has to be measured separately,
  against a tolerance set by the use, and reported beside the quality score.
ogQuestion: Can an AI answer be well grounded and out of date?
category: Data Assurance
author: Xyvionix Research
featured: false
cluster: data
secondary:
  - ai
parent: insights
state: degrading
audience:
  - Head of AI
  - Chief Data Officer
  - Head of Data Engineering
intent: >-
  An AI system with a stale corpus answers confidently and wrongly. Traces lag
  from source to index, shows why pipeline success hides age, and sets out
  consumer-defined freshness thresholds and deletion propagation.
related:
  assurance:
    - data-freshness-assurance
    - production-rag-assurance
    - data-pipeline-assurance
  useCases:
    - data-pipeline-freshness-failure
    - rag-quality-degradation
  technologies:
    - kafka-pipeline-assurance
    - databricks-data-assurance
    - rag-vector-search-assurance
  industries:
    - healthcare-ai-assurance
  insights:
    - measuring-production-rag-quality
evidence: []
thresholds: []
faqs: []
sources:
  - title: 'Ragas: faithfulness'
    url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/'
  - title: 'Amazon Bedrock: sync your data with your knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'Microsoft Learn: change and delete detection for blob indexers in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs'
  - title: 'Snowflake: dynamic tables target lag'
    url: 'https://docs.snowflake.com/en/user-guide/dynamic-tables-target-lag'
  - title: 'Snowflake Cortex Search overview'
    url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview'
  - title: 'Databricks: AI Search'
    url: 'https://docs.databricks.com/aws/en/vector-search/vector-search'
  - title: 'Databricks: prepare data for GDPR compliance'
    url: 'https://docs.databricks.com/aws/en/security/privacy/gdpr-delta'
  - title: 'dbt: source freshness'
    url: 'https://docs.getdbt.com/docs/deploy/source-freshness'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## The quality score has no term for age

The position of this article is simple. Freshness should be scored as a property of the AI system, by the people accountable for its answers, and not left as a service level inside the data platform.

The reason is in the arithmetic of the metric most teams rely on. Ragas defines Faithfulness as the number of claims in the response that the retrieved context supports, divided by the total number of claims in the response. Both halves of that ratio come from the same place: the response and the context retrieved for it. The source system does not appear. Nor does the date.

A system can therefore score at the top of the range while quoting a price list that was replaced last month. The answer is supported by the context. The context is a faithful copy of a document that is no longer true. The metric is working as designed. It measures agreement with the index, and the index is a copy of the world as it stood when it was last updated.

A reviewer reading the answer has the same blind spot. The text is fluent, the citation resolves, and the cited passage says what the answer says. Nothing on the screen shows the age of the passage.

This is why stale data does more damage in an AI system than in a dashboard. A dashboard shows a number. An assistant produces a referenced statement, and the reference lends it an authority the underlying data has lost.

## Where age enters between the source and the answer

Age is not added in one place. It is added at every copy, and an AI system sits at the end of more copies than most consumers.

| Hop | What a success status proves | What it leaves unproven |
|---|---|---|
| Source system to landing table | The load job ran | That the source had sent anything new |
| Landing table to curated table | A refresh completed | That the refresh met the lag that was configured |
| Curated table or document store to index | The sync or indexer run finished | That changed and deleted items were detected |
| Index to queryable state | Embeddings were written | That they are yet available to queries |
| Retrieved passage to answer | The answer agrees with the passage | That the passage is current |

Vendor documentation is candid about several of these hops. Snowflake states that the target lag on a dynamic table is "best-effort, not a guarantee". A Snowflake Cortex Search service is created with its own target lag, the time its content may trail the base data. Databricks AI Search (formerly Databricks Vector Search) keeps a Delta Sync index in step with its source table, which means the index is bounded by the freshness of that table. Amazon Bedrock states that each time files are added, modified or removed, the data source must be synced, and that after a sync it could take a few minutes for new embeddings to be queryable on vector stores other than Aurora.

Each statement is reasonable on its own. Together they describe a chain in which every link has a separate owner, a separate setting and a separate definition of success. The answer is as old as the sum of the links, and no job status reports the sum.

## Why successful pipelines hide the problem

Three mechanisms keep the chain green while the corpus ages.

**Success is defined by the producer.** A job succeeds when it completes. If the source sent nothing, the job completes quickly and updates its own timestamp. Freshness measured on load time then reports a table as current because the pipeline touched it, not because the content changed.

**Change detection is narrower than change.** Microsoft documents that renaming a directory in ADLS Gen2 does not update blob timestamps, so an Azure AI Search indexer that detects change by timestamp does not reindex the moved content. The run succeeds. The index is behind.

**The check is slower than the need.** Evidence of freshness has an age of its own: the interval between checks plus the time an alert takes to reach someone. dbt advises running source freshness jobs with at least double the frequency of the lowest service level. A daily check cannot protect an assistant whose users expect this morning's position.

None of these raises an error. The first detection is normally a person who knows the subject and notices that the answer is out of date. By then the same answer has been given to everyone who asked.

## Deletion is the harder half

Freshness is usually discussed as the speed at which new content arrives. For an AI system the more serious question is the speed at which old content leaves.

The two failures are not symmetrical. When an addition is late, the assistant lacks something and may say so. When a deletion is late, the assistant holds something it should not, and presents it as current. The first produces an incomplete answer. The second produces a wrong one, with a citation.

Deletion is also where the tooling is weakest. Microsoft states that an Azure AI Search indexer does not track object deletion in data sources. Without a deletion policy, removed documents stay in the index as orphans. The policy has to exist from the first indexer run: documents deleted before it was added remain even after a reset, and Microsoft suggests building a new index. Neither documented soft-delete method applies where one source document produces many search documents. A chunked retrieval index is exactly that case.

The data platform beneath the index has the same property. Databricks documents that for tables with deletion vectors, a DELETE must be followed by a purge of the underlying records before they are permanently removed, and that deletion should begin in the bronze layer and propagate to silver and gold. A deletion that succeeded at one layer is a statement about that layer.

The consequence for threshold setting is that deletion needs its own tolerance. It should not inherit the tolerance for additions. For withdrawn content, the basis is the obligation that caused the withdrawal: a legal instruction, a safety notice, a superseded policy. That tolerance is often far tighter than the one for new material, and it is rarely written down.

## Setting the tolerance from the consumer's side

A freshness threshold set by the platform team describes what the platform can do. A threshold set by the consumer describes what the answer needs. Only the second can be used to judge the first.

Three questions produce a usable tolerance for each class of content an AI system reads.

1. **How fast does the truth change?** A product catalogue, a rate table and an archive of closed cases change at very different speeds. Content that does not change needs no tight tolerance.
2. **What does a stale answer cost?** An out-of-date opening hour causes an inconvenience. An out-of-date dosage, limit or entitlement causes harm or loss.
3. **What does a retained answer cost?** This is the deletion question, asked separately, for content that has been withdrawn and not only replaced.

The result is a small table per system, owned by whoever is accountable for the answers.

### An illustrative tolerance table

The figures below are illustrative. They show the shape of the model, not recommended values.

| Content class | Rate of change | Tolerance for a change to appear | Tolerance for a withdrawal to take effect |
|---|---|---|---|
| Published prices and rates | Weekly | 4 hours | 1 hour |
| Internal policy documents | Monthly | 1 day | 4 hours |
| Closed case archive | Rarely | 7 days | 1 day |

Two things follow from a table of this kind. The first is that one index may need more than one threshold, because it holds content of more than one class. The second is that the configured settings in the chain can be added up and compared with the tolerance before anything goes wrong. If the target lag of the table, the target lag of the search service and the sync schedule together exceed the tolerance, the system is out of tolerance by design.

## The trade-off: freshness is bought with compute

Tighter freshness is not free, and an argument for it should say so.

Amazon Bedrock documents that a changed document is re-ingested in full: parsed, chunked, embedded and indexed again. More frequent synchronisation of a corpus that changes often means more embedding work. A tolerance that is tighter than the use requires is a recurring cost with no return.

The opposite error is to choose the schedule for cost and never state the tolerance, so the saving is counted while the exposure is not. Stating the tolerance makes the trade visible. The owner of the answers can then choose between a faster path, a narrower corpus that is cheaper to keep current, or a looser tolerance that is recorded as a decision with a name against it.

A third option is often overlooked. Where content cannot be kept as fresh as the use requires, the answer can carry the date of its source. An assistant that says when the passage was last updated gives the reader what the quality score does not. It does not remove the staleness. It removes the false confidence.

## What this means for assurance

Four practices follow from treating age as a quality dimension.

- **Report age beside grounding.** A quality result for a retrieval system should state the grounding score and the measured age of the corpus together. A grounding score without an age is a claim about a copy.
- **Measure by probe, not by status.** A marker document is changed at source and timed until the assistant returns the new content. A second marker is deleted and timed until nothing derived from it can be retrieved. One reading covers every hop, including the ones nobody listed.
- **Treat an unmeasured corpus as Unassured.** If no probe has run within the agreed interval, the age of the corpus is unknown. Unknown is not the same as fresh, and it should not be reported as green.
- **Expire the evidence on change.** A freshness result belongs to one arrangement of source, pipeline and index. When a sync schedule, an indexer configuration or a lag setting changes, the earlier result describes a system that no longer exists.

The continuing version of this discipline, with the evidence and thresholds it requires, is set out in [Data Freshness Assurance](/data-freshness-assurance). Freshness is one of several properties a retrieval system has to keep proving, alongside recall, grounding and access control, and those are covered in [Production RAG Assurance](/production-rag-assurance).

The argument reduces to one sentence. An AI answer is as current as the oldest link in the chain behind it, and a quality score that cannot see the chain certifies the wrong thing.
