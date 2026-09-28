---
title: Databricks Data Assurance
h1: Prove that data on Databricks is still fresh, correct, governed and worth its compute
seoTitle: 'Databricks Data Assurance: Pipelines, Lineage, Cost | Xyvionix'
description: >-
  What has to be re-proven on Databricks: pipeline expectations, Unity Catalog
  lineage and grants, table maintenance, freshness of AI sources and cost per
  pipeline.
summary: >-
  Databricks records quality, lineage and cost in the platform, each with a
  retention limit or a preview status. Expectations, lineage coverage,
  retention settings, AI source freshness and cost per pipeline are held
  against thresholds.
lede: >-
  Databricks data assurance is the continuing proof that tables on Databricks
  are as recent, as correct and as controlled as the reports, models and agents
  reading them require. Databricks supplies pipeline expectations, data quality
  monitoring, lineage and billing records inside the platform. Each proves
  something narrower than the business question, several are still in preview,
  and the records themselves are kept for a fixed period.
ogQuestion: Is the data your Databricks agents read still fit to use?
platform: Databricks
group: data-platform
cluster: data
secondary:
  - ai
  - value
parent: technologies
state: assured
audience:
  - Chief Data Officer
  - Head of Data Engineering
  - Head of AI
intent: >-
  Technology + problem: proving data on Databricks remains fresh, correct and
  governed
related:
  assurance:
    - data-assurance
    - data-quality-assurance
    - data-pipeline-assurance
    - data-freshness-assurance
  useCases:
    - data-pipeline-freshness-failure
    - schema-change-production-impact
    - rag-quality-degradation
  technologies:
    - snowflake-data-assurance
    - kafka-pipeline-assurance
    - rag-vector-search-assurance
  industries:
    - insurance
    - healthcare
  insights:
    - data-freshness-ai-quality
evidence:
  - name: Expectation register
    detail: >-
      Every expectation on a critical pipeline dataset, with the business rule
      it represents, its owner, the date it was last reviewed against the
      source and its recent pass and fail counts.
  - name: Lineage export
    detail: >-
      Table and column lineage for critical tables, exported on a schedule so
      that it outlives the 365-day retention of the lineage system tables, with
      external lineage where a consumer sits outside the platform.
  - name: Grant and share record
    detail: >-
      Privileges granted on catalogs, schemas and tables compared with the
      access exercised, and each share with its recipient, owner and end date.
  - name: Retention and maintenance settings
    detail: >-
      For each critical table, the log and deleted file retention, the dropped
      table recovery period, any auto-TTL rule and the date maintenance last
      ran, compared with the approved values.
  - name: AI source freshness measurement
    detail: >-
      For each index, feature table and agent knowledge source, the observed
      age of the source table and the time the dependent index or feature was
      last updated.
  - name: Cost per pipeline record
    detail: >-
      Billing usage joined to list prices and attributed to the pipeline or job
      that incurred it, with the volume processed in the same window.
  - name: Runtime change comparison
    detail: >-
      For each runtime upgrade, outputs from the new runtime compared with
      outputs from the old for the same input, dated and retained.
thresholds:
  - signal: Age of tables that feed indexes, features and agents
    basis: The staleness the consuming model, agent or decision can tolerate, stated by its owner
    lostWhen: Source table age plus index or feature update delay exceeds the tolerance
  - signal: Expectation coverage and review age on critical fields
    basis: The fields each consumer has named as critical and the rate at which the source changes
    lostWhen: A critical field has no expectation, or its expectation has not been reviewed since the source last changed
  - signal: Lineage coverage for critical tables
    basis: Every consumer has to be identifiable before a change is made, including those that run less than once a year
    lostWhen: A consumer known to the business is absent from lineage, or lineage is not exported before the 365-day retention removes it
  - signal: Recovery reach against detection time
    basis: How long the business takes to notice corrupted or deleted data, compared with the default seven-day windows
    lostWhen: A retention or recovery period is shorter than the agreed detection time, or has been changed without approval
  - signal: Compute cost per pipeline run
    basis: The value of the outcome the pipeline serves and the budget agreed for it
    lostWhen: Cost per run rises across consecutive windows without a matching rise in volume, or usage cannot be attributed to a pipeline
faqs:
  - q: The pipelines have expectations and the tables have anomaly detection. What does assurance add?
    a: >-
      A fixed threshold and an owner. An expectation proves that a rule held
      when the data was written. Anomaly detection compares the table with its
      own history. Neither states what the consuming report, model or agent
      requires, and neither owns the correction when the requirement is
      missed.
  - q: Can Delta table history serve as the backup?
    a: >-
      Databricks advises against it. Its documentation says not to use table
      history as a long-term backup solution for data archival. With default
      settings, deleted files are retained for seven days, so corruption found
      later cannot be undone through time travel.
  - q: Is Xyvionix a Databricks partner or reseller?
    a: >-
      No. Xyvionix is not a reseller or partner of any vendor. It is
      independent, and it gathers evidence using the access the enterprise
      grants.
sources:
  - title: 'Databricks: where is DLT (Lakeflow pipelines)'
    url: 'https://docs.databricks.com/aws/en/ldp/concepts/where-is-dlt'
  - title: 'Databricks release notes: June 2026'
    url: 'https://docs.databricks.com/aws/en/release-notes/product/2026/june'
  - title: 'Databricks platform release notes'
    url: 'https://docs.databricks.com/aws/en/release-notes/product/'
  - title: 'Databricks: data quality monitoring'
    url: 'https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-quality-monitoring/'
  - title: 'Databricks: system tables'
    url: 'https://docs.databricks.com/aws/en/admin/system-tables/'
  - title: 'Databricks: table history and time travel'
    url: 'https://docs.databricks.com/aws/en/delta/history'
  - title: 'Databricks: UNDROP TABLE'
    url: 'https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-syntax-ddl-undrop-table'
  - title: 'Databricks: prepare data for GDPR compliance'
    url: 'https://docs.databricks.com/aws/en/security/privacy/gdpr-delta'
  - title: 'Databricks AI Search'
    url: 'https://docs.databricks.com/aws/en/vector-search/vector-search'
  - title: 'Databricks Feature Store'
    url: 'https://docs.databricks.com/aws/en/machine-learning/feature-store/'
  - title: 'Databricks Agent Bricks'
    url: 'https://docs.databricks.com/aws/en/generative-ai/agent-bricks/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Databricks

Databricks keeps its own records of quality, lineage, access and cost, inside the platform, as tables. That is a strength. It also means the evidence has the same properties as any other table: a retention period, a release status and a schema that the vendor can change.

The status varies by record. Databricks lists the billing usage and lineage system tables as generally available. The audit table and the data quality monitoring results table are in Public Preview, and the pipeline events table is in Beta. An assurance position built on a preview table rests on something the vendor has not yet committed to keep stable.

The checks are also narrower than they sound. A pipeline expectation proves that a rule held when the data was written. It does not prove that the rule still matches what the business needs. Data quality monitoring, which Databricks now uses as the name for anomaly detection plus data profiling (formerly Lakehouse Monitoring), evaluates freshness and completeness from historical patterns. It compares the table with its own past, not with a requirement.

The third part is the consumer. Agent Bricks agents, Databricks AI Search indexes and feature tables read governed tables directly, and none of them checks the age of what it reads.

The vendor-neutral method is set out in [Data Assurance](/data-assurance). This page covers what is particular to Databricks.

## What expires, and on whose calendar

| Dated fact, as published by Databricks | What it means for evidence |
|---|---|
| The table lineage and column lineage system tables retain 365 days. The compute node timeline table retains 90 days | Lineage and utilisation evidence older than the window is gone unless it was exported |
| Defaults are 30 days for log retention and seven days for deleted file retention. From Databricks Runtime 18.0, time travel queries older than the deleted file retention are blocked | Default point-in-time recovery reaches back seven days |
| A dropped Unity Catalog table can be recovered within a default seven-day period. A configurable period of 0 hours to 30 days has been in Public Preview since 15 June 2026 | The undo window is a setting, and it can be set to nothing |
| Delta Sharing was renamed OpenSharing on 10 June 2026. Vector Search was renamed AI Search on 1 June 2026. Delta Live Tables is now Lakeflow pipelines, with no migration required | Runbooks, alerts and evidence records keyed on the old names no longer match the product |
| Databricks Runtime 19, on Apache Spark 4.2.0, has been in Beta since 15 June 2026 | Correctness evidence is bound to a runtime. Each upgrade resets it until outputs are compared |

Lakehouse Replay, in Beta, replays workloads against an upcoming runtime. It gathers the outputs. Comparing them is still the enterprise's work.

## What must be continuously re-proven

**Expectations still express the rule.** Each expectation on a critical dataset is tied to a business rule and an owner, and is reviewed when the source changes. Materialized views have supported expectations since 23 June 2026, so coverage can extend to datasets that had none. The method is set out in [Data Quality Assurance](/data-quality-assurance).

**Lineage reaches every consumer.** Lineage is recorded for what runs on the platform. External lineage became generally available on 8 June 2026 and Lakeflow Connect pipelines record source lineage automatically, but a consumer outside the platform appears only where external lineage was configured. Coverage is compared with the consumers the business knows about, which is the basis of [Schema Change Production Impact](/schema-change-production-impact).

**Grants match use.** Privileges in Unity Catalog are compared with the access exercised. Shares made through OpenSharing (formerly Delta Sharing) are held to the same questions: who receives the data, who owns the relationship and when it ends.

**Maintenance ran, and left the recovery window intact.** Removing old files lowers storage cost and shortens how far back a table can be restored. Databricks states that without predictive optimisation or Lakeflow pipelines, VACUUM must be run manually. Retention settings, auto-TTL rules and the last maintenance run are compared with approved values.

**Tables that feed AI are as recent as the AI needs.** A Delta Sync index in Databricks AI Search follows its source table. A model served with Databricks Feature Store looks up the latest feature values at inference. In both cases the latest value is as recent as the last successful pipeline run. Age is measured at the source table and at the index, under [Data Freshness Assurance](/data-freshness-assurance).

**Each pipeline has a cost and an owner.** Billing usage is joined to list prices and attributed to the pipeline that incurred it, alongside the volume it processed. The price table holds list prices, so where rates have been negotiated the result is a consistent measure and not the invoiced amount.

## Common failure modes

- **The expectation passes and the rule is out of date.** The source began sending a new status value. The expectation was written for the old list and still passes on the fields it checks.
- **Completeness that follows the decline.** Anomaly detection judges completeness on the row count expected in the last 24 hours, learned from history. A source that loses records gradually moves the expectation down with it.
- **The yearly job that lineage forgot.** A consumer that runs once a year last appeared in lineage more than 365 days ago. When the table changes, the consumer is not on the list.
- **The recovery period set to zero.** The configurable recovery period for dropped tables accepts 0 hours. A schema configured that way has no undo.
- **Restored, and not as it was.** Databricks documents that UNDROP does not recover primary key and foreign key constraints. The table returns without them.
- **The delete that did not erase.** For tables with deletion vectors, Databricks states that after a DELETE the table must also be reorganised with REORG TABLE and APPLY (PURGE) to permanently delete the underlying records, and then vacuumed. A successful DELETE is not proof of erasure.
- **The agent reading a table that stopped.** The pipeline failed upstream. The index is in sync with a table that is no longer updated, and the agent answers from it.
- **Spend with no pipeline attached.** Usage is recorded and cannot be attributed, so a pipeline whose cost has doubled is not visible as one.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and a correction is opened with a named owner. Xyvionix owns that correction through to completion within the access it has been granted, and uses the enterprise's change process for changes to production pipelines, catalogs and settings.

Corrections are specific to the mechanism. An expectation is rewritten with the consumer who depends on the field. A retention setting is returned to its approved value and the change that altered it is traced. A stale source is repaired at the hop that stopped, and the consumers of the index or feature are told the period affected.

Closure is recorded by re-test.

- **Expectation.** The revised expectation fails when the original fault is reproduced on test data, and passes on current data.
- **Recovery.** A test table is dropped and recovered, or restored to an earlier version, inside the configured window. Constraints are checked after recovery and reapplied where they were lost.
- **Erasure.** After purge and vacuum, the record cannot be read from the table at any version the retention settings still allow.
- **AI source freshness.** A marker row written at source is retrievable through the index within the tolerance the consumer set.
- **Cost.** Usage for the pipeline is attributed in the billing record for a full window and cost per run is back inside the agreed range.

After a runtime upgrade, closure also requires the output comparison, because a changed default leaves no error to find. Delivery and replay are covered in [Data Pipeline Assurance](/data-pipeline-assurance).
