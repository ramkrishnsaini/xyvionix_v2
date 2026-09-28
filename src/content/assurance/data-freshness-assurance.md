---
title: Data Freshness Assurance
h1: Know how old the data is at the moment it is used
seoTitle: "Data Freshness Assurance: Data Age at Point of Use | Xyvionix"
description: >-
  Continuous assurance of data age, measured end to end at the point of use
  against the staleness each report, decision and AI system can tolerate.
summary: >-
  Freshness is defined by the consumer, not the pipeline schedule. Data age is
  measured end to end at the point of use, silent staleness is detected, and
  propagation into reports, decisions and AI retrieval is proven.
lede: >-
  Data freshness assurance is the continuing proof that data is no older, at the
  moment it is used, than the consuming outcome can tolerate. The tolerance is
  set by the consumer: the report, the decision or the AI system that reads the
  data. A pipeline schedule is a statement of intent by the producer. Assurance
  measures the observed age across every hop between source and use, and treats
  a missing update as a condition to detect, not as the absence of a problem.
ogQuestion: How old is the data behind today's decision?
kind: child
cluster: data
secondary:
  - ai
parent: data-assurance
state: assured
audience:
  - Chief Data Officer
  - Head of Data Engineering
  - Head of AI
intent: >-
  Commercial: continuing proof that data arrives within the age the consuming
  outcome tolerates
related:
  assurance:
    - data-pipeline-assurance
    - data-quality-assurance
    - production-rag-assurance
  useCases:
    - data-pipeline-freshness-failure
    - rag-quality-degradation
  technologies:
    - kafka-pipeline-assurance
    - databricks-data-assurance
    - snowflake-data-assurance
  industries:
    - insurance
    - healthcare
  insights:
    - data-freshness-ai-quality
evidence:
  - name: Consumer tolerance register
    detail: >-
      For each report, decision, model and agent, the maximum data age it can
      tolerate, stated by the owner of that outcome, with the reason and the
      date it was agreed.
  - name: Hop map
    detail: >-
      Every stage between the source event and the point of use, such as
      ingestion, transformation, table commit, index sync and cache, with the
      owner of each stage and the lag it is expected to add.
  - name: Observed end-to-end age
    detail: >-
      The measured difference between the time an event occurred at source and
      the time it became available to the consumer, recorded as a series, not
      as a single reading.
  - name: Last successful update record
    detail: >-
      For each critical dataset and index, the time of the last update that
      delivered new data, compared with the cadence at which new data is
      expected.
  - name: Probe results
    detail: >-
      Results of marker records or documents introduced at source and timed to
      the consumer, including markers that are deleted to confirm that removal
      propagates.
  - name: Check cadence record
    detail: >-
      How often each freshness check runs and how long an alert takes to reach
      an owner, which together set the maximum age of the evidence.
thresholds:
  - signal: Data age at the point of use
    basis: The staleness the consuming decision, report or AI answer can tolerate before its output is wrong in a way that matters
    lostWhen: Observed end-to-end age exceeds the consumer's tolerance, whatever the configured schedule or lag states
  - signal: Time since the last update that delivered new data
    basis: The cadence at which the source is known to produce new data
    lostWhen: No new data has arrived for longer than the expected cadence allows and the source has not been confirmed quiet
  - signal: Check interval and alert delivery time
    basis: The consumer's tolerance, since the state is unproven between checks
    lostWhen: The interval between checks plus alert delivery time is longer than the tolerance the check protects
  - signal: Time for a deletion or correction at source to reach the consumer
    basis: The obligation to stop serving content that has been withdrawn or superseded
    lostWhen: A removed or corrected item can still be retrieved after the agreed propagation window
  - signal: Consumers with a stated tolerance
    basis: The business expectation that every material use of data has an agreed freshness requirement
    lostWhen: A material consumer is found reading data for which no tolerance has been agreed
faqs:
  - q: The pipeline meets its schedule. Why is that not enough?
    a: >-
      A schedule describes when the producer runs. It says nothing about what
      the consumer needs, how long the later hops take, or whether the run
      delivered new data. A job can finish on time every hour and the report
      can still be a day old, because the source stopped sending or a
      downstream refresh did not follow.
  - q: Who decides how fresh is fresh enough?
    a: >-
      The owner of the outcome that uses the data. Xyvionix records the
      tolerance with its reason, so that it can be challenged and revised. A
      tolerance tighter than the business needs costs money. One looser than
      the business needs costs decisions.
  - q: How is freshness proven for AI retrieval?
    a: >-
      By probing content, not by reading job status. A marker document is
      changed or removed at source and the time until the retrieval system
      reflects the change is measured. That covers source lag, index sync and
      deletion handling in one reading.
sources:
  - title: 'Snowflake: Understanding dynamic table target lag'
    url: 'https://docs.snowflake.com/en/user-guide/dynamic-tables-target-lag'
  - title: 'dbt: Source freshness'
    url: 'https://docs.getdbt.com/docs/deploy/source-freshness'
  - title: 'Apache Airflow: Deadline Alerts'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html'
  - title: 'Apache Airflow: Upgrading to Airflow 3'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/upgrading_to_airflow3.html'
  - title: 'Databricks: Data quality monitoring'
    url: 'https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-quality-monitoring/'
  - title: 'Confluent Cloud: Tableflow overview'
    url: 'https://docs.confluent.io/cloud/current/topics/tableflow/overview.html'
  - title: 'dbt: dbt v2 is GA'
    url: 'https://docs.getdbt.com/blog/dbt-v2-is-ga'
  - title: 'Delta Lake 4.2 released'
    url: 'https://delta.io/blog/2026-04-17-delta-4-2-released/'
  - title: 'Amazon Bedrock: Sync your data with your knowledge base'
    url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html'
  - title: 'Microsoft Learn: Change and delete detection for blob indexers in Azure AI Search'
    url: 'https://learn.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs'
  - title: 'Snowflake: Cortex Search overview'
    url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview'
  - title: 'Databricks: AI Search'
    url: 'https://docs.databricks.com/aws/en/vector-search/vector-search'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## Why assurance is lost

Freshness is usually specified by the team that builds the pipeline. The job runs hourly because hourly was practical. The consumer's requirement was never asked for, so there is nothing to test the schedule against.

**The schedule is taken for the requirement.** A refresh interval is the producer's intent. When a new consumer with a tighter need starts reading the same table, the schedule still reports success and the consumer is already out of tolerance.

**Configured lag is not observed lag.** Snowflake's documentation for dynamic tables is direct about this: "Target lag is a staleness target, not a refresh interval", and it is "best-effort, not a guarantee". The configured value is what was asked for. Only the measured value is evidence.

**Age accumulates across hops.** Data passes from source to stream, stream to table, table to index and index to the system that answers. Each hop has its own lag and its own owner. Materialising a stream as a table, for example, adds a second boundary: lag on the topic and lag on the table commit. The consumer experiences the sum, and nobody owns the sum.

**The check is slower than the tolerance.** Between two checks the state is unproven. dbt's guidance is to run source freshness jobs with at least double the frequency of the lowest service level. A check that runs daily cannot protect a requirement measured in hours.

**Lateness detection is lost in an upgrade.** Airflow 3 removed SLAs. Their replacement, Deadline Alerts, is described in the Airflow documentation as something that "should be considered experimental". An estate that relied on SLA misses to detect late data loses that signal on upgrade unless it is rebuilt.

**The baseline learns the delay.** Platform anomaly detection evaluates freshness from historical patterns. A table that arrives a little later each month teaches the detector that late is normal.

## What is at stake

A decision made on old data is made with full confidence, because nothing on the screen shows the age. A pricing engine quotes on yesterday's exposure. A fraud rule scores against a profile that stopped updating. An operations team allocates stock against a position that has since moved.

AI retrieval makes the exposure wider. A retrieval system answers from its index, and the index is a copy. If a policy document was replaced at source and the index was not updated, the assistant quotes the superseded version and cites it correctly. A quality score that measures whether the answer agrees with the retrieved text will rate that answer highly.

Withdrawn content is the sharper case. A document removed at source for legal or safety reasons, and still present in an index, continues to be served to every user who asks.

## What Xyvionix assures

Xyvionix holds five statements about each critical flow of data, tested against the tolerance its consumers have set.

1. **Every material consumer has a stated tolerance.** The owner of the report, decision or AI system has said how old the data may be, and why.
2. **Age is measured where the data is used.** The measurement runs from the event at source to availability at the consumer, across every hop, and is compared with the tolerance and not with the schedule.
3. **Silence is detected.** The time since new data last arrived is compared with the cadence at which the source produces it. A flow that has stopped is found because it stopped, without waiting for a job to fail.
4. **The evidence is younger than the tolerance.** Checks run often enough, and alerts arrive fast enough, that a breach is seen inside the window it matters in.
5. **Removal and correction propagate.** Content deleted or corrected at source disappears from, or is corrected in, every copy that serves a consumer.

Whether the values in the data are right is a separate question, held in [Data Quality Assurance](/data-quality-assurance). Whether a run delivered every record is held in [Data Pipeline Assurance](/data-pipeline-assurance).

## Common failure modes

- **A refresh with no reader never runs.** Snowflake documents that a dynamic table whose target lag is set to DOWNSTREAM, with no downstream consumer, never refreshes, and that no warning is produced. The absence of failure is not evidence of operation.
- **The load time is fresh and the data is not.** Freshness is measured on the time the job wrote to the table. The job ran, found nothing new at source and updated the timestamp.
- **A skipped step is read as a verified step.** dbt State, generally available since 16 September 2026, skips or clones nodes when logic and data have not changed, judged from warehouse metadata and model SQL. The skip is only as sound as the metadata it relied on.
- **The knowledge base was never synced.** Amazon Bedrock states that each time files are added, modified or removed, the data source must be synced so that it is re-indexed. Sync is an explicit action. A knowledge base with no recent sync serves superseded documents and raises no error.
- **Deleted documents stay retrievable.** Microsoft states that an Azure AI Search indexer does not track object deletion in data sources. Without a deletion policy in place from the first indexer run, documents removed at source remain in the index.
- **Change detection has blind spots.** Renaming a directory in ADLS Gen2 does not update blob timestamps, so an indexer that detects change by timestamp does not reindex the moved content.
- **A format translation lags the commit.** Delta Lake 4.2 generates Iceberg metadata inside the commit transaction. Earlier versions generated it afterwards, so an Iceberg reader of a Delta table could see an older state than a Delta reader of the same table.
- **A quiet source and a broken source look the same.** An event-driven flow has no schedule to be late against. Without an expected cadence, no event means nothing.

## Corrective ownership

When observed age breaches a tolerance the state moves to At risk. Xyvionix owns the correction through to completion within the access it has been granted, using the enterprise's change process for production changes.

The first action is to tell the consumers. The owner of each affected report, decision or AI system is told how old the data is and since when, so that they can pause, caveat or proceed with knowledge. The second is to find the hop. Age is measured at each boundary in the hop map until the stage that added the delay is identified, and the correction is made there.

Where the cause is a source outside the enterprise's control, the finding is taken to the owner of that relationship. Where the tolerance itself is tighter than the architecture can meet, that is put to the consumer as a decision: accept a looser tolerance, or fund a faster path. Either answer is recorded with an owner.

## Verified closure

A freshness correction is closed by a measurement at the consumer, not by a successful run.

The re-test introduces a marker at source and times its arrival at the point of use. Closure requires that the marker arrives inside the tolerance, that observed age stays inside the tolerance across a full cycle of the flow including its busiest period, and that the check which should have raised the breach has been shown to fire when the flow is deliberately held back. For retrieval systems, a marker document that is deleted at source must stop being retrievable inside the agreed window.

The result is recorded with the hop that was corrected. If age breaches again, the record reopens and shows whether the same hop is responsible.

## Technology and industry context

AI platforms expose freshness as a setting, which makes the declared tolerance visible. A Snowflake Cortex Search service is created with a target lag, the time its content may trail the base data. Databricks AI Search (formerly Databricks Vector Search) keeps a Delta Sync index in step with its source table, so the index can be no fresher than that table. Changing the embedding model is a different event: a self-managed embedding index cannot be converted to a managed one, and the embeddings must be recomputed in a new index.

In each case the setting is a declaration and should trace to a business requirement. Platform detail is covered in [Snowflake Data Assurance](/snowflake-data-assurance), [Databricks Data Assurance](/databricks-data-assurance) and, for stream lag, [Kafka Pipeline Assurance](/kafka-pipeline-assurance). Retrieval quality as a whole is held in [Production RAG Assurance](/production-rag-assurance).

Tolerance differs sharply by sector and by use. In [insurance](/insurance), a claims decision and a quarterly reserving report can read the same data with requirements that differ by orders of magnitude. The threshold belongs to the use, which is why one dataset can be Assured for one consumer and At risk for another at the same moment. The scenario most teams meet first is described in [Data Pipeline Freshness Failure](/data-pipeline-freshness-failure).
