---
title: Data Pipeline Assurance
h1: Prove what each pipeline delivered, not only that it ran
seoTitle: "Data Pipeline Assurance: Delivery, Replay, Currency | Xyvionix"
description: >-
  Continuous assurance that pipelines deliver complete data for the intended
  window, handle schema change, can replay and backfill, and run on supported
  platforms.
summary: >-
  A green run is not a correct delivery. Completeness, lateness, schema change
  handling, replay and backfill capability and orchestration platform currency
  are each held as evidence and re-proven after every upgrade.
lede: >-
  Data pipeline assurance is the continuing proof that each pipeline delivered
  every record it should have, for the window it was meant to process, once and
  in order, and that it can do so again after a fault. A run that finishes with
  a success status has proved that the process ended without an error. It has
  proved nothing about the payload. Assurance tests the delivery, exercises
  replay and backfill, and tracks the support status of the platforms the
  pipeline runs on.
ogQuestion: 'Did every pipeline deliver complete data, on time, in order?'
kind: child
cluster: data
secondary:
  - reliability
parent: data-assurance
state: assured
audience:
  - Head of Data Engineering
  - VP Platform
  - Chief Data Officer
intent: >-
  Commercial: continuing proof that pipelines deliver complete, timely, correct
  data and can recover
related:
  assurance:
    - data-freshness-assurance
    - data-quality-assurance
    - disaster-recovery-assurance
  useCases:
    - data-pipeline-freshness-failure
    - schema-change-production-impact
  technologies:
    - kafka-pipeline-assurance
    - databricks-data-assurance
    - snowflake-data-assurance
  industries:
    - insurance
    - software-technology
  insights:
    - data-freshness-ai-quality
evidence:
  - name: Pipeline inventory
    detail: >-
      Every pipeline that feeds a critical outcome, with its owner, its
      sources, its consumers, how it is triggered and the platform versions it
      runs on.
  - name: Delivery reconciliation
    detail: >-
      For each run, the count of records at source compared with the count at
      the destination for the same window, with duplicates and rejected
      records accounted for.
  - name: Processed window record
    detail: >-
      The data interval each run covered, compared with the interval it was
      meant to cover, and a list of any intervals that no run has processed.
  - name: Schema change log
    detail: >-
      Each change to a source or intermediate schema, how the pipeline handled
      it, and which consumers were assessed before the change reached them.
  - name: Replay and backfill exercise record
    detail: >-
      The date a replay and a backfill were last performed on each critical
      pipeline, how far back the source could be re-read, and whether the
      result matched the original delivery without duplication.
  - name: Alert test record
    detail: >-
      Proof that each failure and lateness alert fired when its condition was
      reproduced, dated after the most recent platform upgrade.
  - name: Platform currency record
    detail: >-
      The version of each orchestrator, engine and transformation tool, its
      vendor support status and the date that support ends.
thresholds:
  - signal: Records delivered against the reconciled source count
    basis: The share of expected records the consumer needs before it can act on the data
    lostWhen: A run reports success while delivered records fall short of source beyond the agreed tolerance
  - signal: Duplicate or out-of-order records at the destination
    basis: Whether the consuming process counts, sums or sequences the records
    lostWhen: Duplicates or ordering faults exceed the level the consumer has accepted
  - signal: Window processed against window intended
    basis: The reporting or decision period the consumer assumes the data covers
    lostWhen: A run covers a different interval from the one intended, or an interval remains unprocessed
  - signal: Schema changes reaching consumers without assessment
    basis: The business expectation that a structural change is assessed before it arrives
    lostWhen: A consumer receives a changed schema that was not assessed for that consumer
  - signal: Replay reach against time to detect a fault
    basis: The longest period a fault could run before it is found
    lostWhen: The source can be re-read for a shorter period than faults take to detect, or replay has not been exercised inside the agreed window
  - signal: Support status of orchestrator and engines
    basis: The published end of support for each version in the data path
    lostWhen: A version in the path is out of vendor support, or will be before an upgrade is planned to complete
faqs:
  - q: Every run is green. What is left to assure?
    a: >-
      What the run delivered. A job that finds an empty source, reads the
      wrong window or drops rejected records can finish with a success status.
      Assurance compares the records delivered with the records expected for
      the intended window, which is a test the orchestrator does not perform.
  - q: Why does an orchestrator or engine upgrade reset the evidence?
    a: >-
      Because defaults change. The same pipeline code can process a different
      window, handle types differently or lose an alert it relied on. After
      an upgrade Xyvionix treats delivery evidence as unproven until outputs
      have been reconciled and alerts have been shown to fire on the new
      version.
  - q: How often should replay and backfill be exercised?
    a: >-
      Often enough that the last exercise is more recent than the last change
      that could have broken it: a platform upgrade, a retention change or a
      change to the pipeline's write logic. The interval is agreed with the
      business against how long it could operate without the data.
sources:
  - title: 'Apache Airflow: Upgrading to Airflow 3'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/upgrading_to_airflow3.html'
  - title: 'Apache Airflow: supported versions'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/supported-versions.html'
  - title: 'Apache Airflow: release notes'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/release_notes.html'
  - title: 'Apache Airflow: event-driven scheduling'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/event-scheduling.html'
  - title: 'Apache Spark versioning policy'
    url: 'https://spark.apache.org/versioning-policy.html'
  - title: 'Apache Spark downloads'
    url: 'https://spark.apache.org/downloads.html'
  - title: 'Apache Spark 4.2.0 release notes'
    url: 'https://spark.apache.org/releases/spark-release-4-2-0.html'
  - title: 'dbt: dbt v2 is GA'
    url: 'https://docs.getdbt.com/blog/dbt-v2-is-ga'
  - title: 'dbt: Comparing dbt and dbt OSS'
    url: 'https://docs.getdbt.com/blog/comparing-dbt-and-dbt-oss'
  - title: 'dbt: licenses FAQ'
    url: 'https://www.getdbt.com/licenses-faq'
  - title: 'Fivetran: Fivetran and dbt Labs complete merger'
    url: 'https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents'
  - title: 'Databricks: What happened to Delta Live Tables'
    url: 'https://docs.databricks.com/aws/en/ldp/concepts/where-is-dlt'
  - title: 'Delta Lake 4.1.0 release'
    url: 'https://github.com/delta-io/delta/releases/tag/v4.1.0'
  - title: 'Apache Kafka 4.3: upgrading'
    url: 'https://kafka.apache.org/43/getting-started/upgrade/'
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

An orchestrator reports on processes. It knows that a task started, ended and returned no error. It does not know how many records the source held, which window the task read or whether the destination now contains what the consumer expects. A success status is evidence about the run. Delivery needs evidence of its own, and that evidence expires for reasons specific to pipelines.

**Defaults change under unchanged code.** Airflow 3 changed `catchup_by_default` to False and changed how data intervals are derived, so that a manually triggered run's interval is no longer derived from its logical date. The same DAG file can process a different window after the upgrade. Nothing fails.

**Monitoring is built on internals that move.** The Airflow 3 upgrade guide states that task code can no longer directly import and use Airflow database sessions or models. Custom checks that queried the metadata database stop working, and SLAs, which many teams used to detect late runs, were removed in the same release.

**Support windows are short.** Airflow 2 reached end of life on 22 April 2026, which leaves Airflow 3 as the only maintained major version. Apache Spark's versioning policy gives a feature release that is not long-term support six months of maintenance. A self-managed engine can fall out of support within two quarters of being installed.

**The compatibility matrix widens.** Airflow providers and task SDKs now move independently of the scheduler. Delta Lake 4.1.0 requires Java 17 and Spark 4.0.1 or later and drops Spark 3.5. An upgrade to one layer can remove a reader or writer in another.

**The ability to replay decays.** Replay depends on the source still holding the data and on the pipeline being safe to run twice. Retention settings are changed to save storage, and write logic is changed for speed. Neither change is tested against recovery.

## What is at stake

A partial delivery is the most expensive kind of pipeline fault because it looks like a complete one. A report is published on part of the day's transactions. A model is retrained on a window that excludes a region. The figures are plausible, so they are used.

The second consequence appears after a fault has been found. If the source can no longer be re-read, or the pipeline duplicates records when it is run again, the enterprise cannot repair its own history. The gap becomes permanent, and every figure that spans it carries a caveat.

The third is exposure. An orchestrator that is out of support receives no security fixes, and it holds credentials to every system the pipelines touch.

## What Xyvionix assures

Xyvionix holds six statements about each critical pipeline, tested against thresholds agreed with the owners of the consuming outcomes.

1. **Each run delivered what the source held.** Records at the destination reconcile to records at the source for the same window, with rejected records counted and explained.
2. **Records arrived once and in order.** Where the consumer counts, sums or sequences, duplicates and ordering faults are measured at the destination.
3. **The intended window was processed.** Each run covered the interval it was meant to cover, and no interval has been left without a run.
4. **Schema change is handled deliberately.** A structural change at source is detected, and the consumers it reaches are assessed before it arrives.
5. **Replay and backfill work.** Both have been exercised recently enough to be trusted, and the source can be re-read for longer than a fault takes to detect.
6. **The platform is supported and its alerts still fire.** Each version in the path is inside vendor support, and every failure and lateness alert has been tested since the last upgrade.

How old the data is when it reaches its consumer is held in [Data Freshness Assurance](/data-freshness-assurance). Whether the values are right is held in [Data Quality Assurance](/data-quality-assurance).

## Common failure modes

- **Success on an empty source.** The extract returns no rows because an upstream export failed. The pipeline loads nothing, correctly, and reports success.
- **Intervals that were never run.** The scheduler was down for a day. With catch-up off by default, the missed intervals are not created when it returns, and no task exists to fail.
- **The event that never came.** An event-driven pipeline waits on a message queue or a stream. It has no schedule to be late against, so a broken source and a quiet source produce the same result: nothing.
- **A backfill that doubles the data.** The job appends. Running it again for a repaired window adds the records a second time, and the totals are now wrong in the other direction.
- **An additive change that breaks logic.** A new column or a new value passes every compatibility check at every hop. A downstream join or filter was written on the assumption that it would never exist.
- **A monitor that reads nothing.** After an upgrade the check queries a table or a metric that has been removed or renamed. It finds no failures and stays green.
- **Old names in a running estate.** Databricks renamed Delta Live Tables to Lakeflow pipelines and states that no migration is required, so legacy code keeps running. Runbooks, alerts and ownership records that use the old name no longer match what operators see.

## Corrective ownership

When a delivery threshold is breached the state moves to At risk. Xyvionix owns the correction through to completion within the access it has been granted, and uses the enterprise's change process for changes to production pipelines.

The order of work matters. The consumers of the affected data are told first, with the window and the shortfall, so that nothing further is published on it. The cause is then corrected in the pipeline or taken to the owner of the source. The affected window is repaired by replay or backfill, which is also the moment the enterprise learns whether replay works.

Where a platform version is approaching the end of support, the correction is an upgrade plan with a date that precedes it, owned by a named person. Where replay reach is shorter than detection time, the choice between longer retention and faster detection is put to the business with its cost, and the decision is recorded.

## Verified closure

A pipeline correction is closed by reconciling the delivery, not by observing the next green run.

Closure requires that the repaired window reconciles to source with no shortfall and no duplication, that the following scheduled runs reconcile without intervention, and that the alert which should have raised the fault fires when the fault is reproduced. After a platform upgrade, closure also requires that outputs from the new version have been compared with outputs from the old for the same input, because a changed default leaves no error to find.

The record holds the counts as well as the verdict. If the same pipeline breaches again it reopens against that record.

## Technology and industry context

The tools in the data path publish their own calendars, and each date is an expiry on evidence gathered before it.

| Component | Dated fact | What it means for evidence |
|---|---|---|
| Apache Airflow | Airflow 2 reached end of life on 22 April 2026. Version 3.3.2 was released on 17 September 2026. | An estate still on Airflow 2 runs an unsupported orchestrator. |
| Apache Spark | Version 4.2.0 was released on 14 July 2026. Feature releases become quarterly from 4.3.0, and 3.5.x extended support ends in November 2027. | Correctness evidence is bound to a runtime version with a short life. |
| dbt | dbt v2 became generally available on 16 September 2026. The engine formerly called dbt Fusion is now called dbt, and dbt Core v2 is now dbt OSS. | Build behaviour and licence position both changed in 2026 and need re-reading. |

The vendor picture has moved as well. Fivetran and dbt Labs completed their merger on 1 June 2026, so ingestion and transformation can now come from one supplier. dbt OSS is licensed under Apache 2.0, and the primary dbt distribution is proprietary and free to use.

Streaming and platform-managed pipelines have their own constraints. Clusters that still run Apache Kafka in ZooKeeper mode cannot upgrade in place to Kafka 4, which is covered in [Kafka Pipeline Assurance](/kafka-pipeline-assurance). Managed pipeline services are covered in [Databricks Data Assurance](/databricks-data-assurance) and [Snowflake Data Assurance](/snowflake-data-assurance).

Recovery of the data stores themselves is held in [Disaster Recovery Assurance](/disaster-recovery-assurance). The effect of a structural change on consumers is described in [Schema Change Production Impact](/schema-change-production-impact). In [insurance](/insurance), where period-end figures depend on complete loads, reconciliation of the final runs before close is the delivery evidence that matters most.
