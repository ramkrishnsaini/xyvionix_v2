---
title: Data Pipeline Freshness Failure
h1: When data stopped arriving and the people using it were not told
seoTitle: 'Data Pipeline Freshness Failure: Stale Data | Xyvionix'
description: >-
  What to establish after data arrived late or stopped while every job passed:
  the stale window, the outputs produced inside it and proof that the repair
  is complete.
summary: >-
  Jobs succeeded while data aged, and a consumer found out first. The position
  is recovered by dating the stale window per consumer, tracing what was
  produced inside it, verifying the backfill and moving detection to the
  consumer.
lede: >-
  A data pipeline freshness failure is the situation in which data arrived late
  or stopped arriving, the pipelines reported success, and the people and
  systems using the data were not told. The state is At risk: the age of the
  data has passed what at least one consumer can tolerate. The position is
  recovered by dating the stale window for each consumer, tracing the outputs
  produced inside it, verifying that the backfill is complete and measuring
  freshness where the data is used.
ogQuestion: Who was using the data while it was stale?
cluster: data
secondary:
  - ai
parent: use-cases
state: risk
audience:
  - Head of Data Engineering
  - Chief Data Officer
  - Head of AI
intent: 'Problem: data arrived late or stopped arriving and consumers were not told'
related:
  assurance:
    - data-freshness-assurance
    - data-pipeline-assurance
    - production-rag-assurance
  useCases:
    - rag-quality-degradation
    - schema-change-production-impact
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
  - name: Stale window per consumer
    detail: >-
      For each consumer of the affected data, the time of the newest source
      event it could see when the failure began and when it ended, measured on
      event time and not on load time.
  - name: Hop timing during the failure
    detail: >-
      The age of the data at each boundary between source and consumer during
      the window, which identifies the stage where the delay entered.
  - name: Downstream impact trace
    detail: >-
      Every table, extract, report, model score, index and agent answer derived
      from the affected data during the window, found through lineage and
      through the consumers' own records.
  - name: Consumer notification record
    detail: >-
      Who was told, when, by whom and with what statement of the window, for
      each consumer in the trace.
  - name: Backfill reconciliation
    detail: >-
      Records in the repaired window compared with the source by event time,
      with duplicates counted, and the rebuild time of each derived object
      compared with the time the backfill completed.
  - name: Detection test result
    detail: >-
      The dated result of holding the flow back on purpose and observing
      whether the freshness alert fired and reached an owner inside the
      consumer's tolerance.
  - name: Consumer register
    detail: >-
      The consumers known to read each critical dataset, with the tolerance
      each has stated and the contact who is told when it is breached.
thresholds:
  - signal: Data age at each consumer
    basis: The staleness each consuming decision, report or AI system can tolerate, stated by its owner
    lostWhen: Observed age at any consumer exceeds that consumer's tolerance, whatever the job status shows
  - signal: Time from breach to an alerted owner
    basis: The number of decisions the consumer makes on the data in each period
    lostWhen: A breach lasts longer than the agreed detection time, or is first reported by a consumer
  - signal: Time from detection to consumer notification
    basis: The consumer's need to pause, caveat or proceed with knowledge
    lostWhen: A consumer in the impact trace is not told inside the agreed window
  - signal: Outputs from the stale window still in circulation
    basis: The consequence of each output and whether it can be reissued
    lostWhen: An output produced on stale data has been neither reissued nor marked by the agreed date
  - signal: Backfill completeness
    basis: The completeness the consumer requires of its history
    lostWhen: The repaired window does not reconcile to source, or a derived object was last built before the backfill finished
  - signal: Consumers outside the register
    basis: The producer can only tell the consumers it knows about
    lostWhen: A consumer is found reading a critical dataset without a registered tolerance and contact
faqs:
  - q: How is the start of the stale window established?
    a: >-
      From event time. The start is the timestamp of the newest source event
      that had reached the consumer when fresh data stopped arriving. Load
      timestamps and job run times are not used, because a job can run and
      write nothing new.
  - q: Is re-running the pipeline enough to repair the window?
    a: >-
      It repairs the first table. Aggregates, extracts, indexes and caches
      built during the window still hold stale results until each is rebuilt
      after the backfill, in dependency order. Reports and decisions already
      issued are not repaired by any re-run and are handled with their owners.
  - q: Which consumers have to be told?
    a: >-
      Every consumer that read the affected data, or anything derived from it,
      during the window. That includes consumers the producing team did not
      know about, which is why the trace uses lineage and access records as
      well as the register.
sources:
  - title: 'dbt: Source freshness'
    url: 'https://docs.getdbt.com/docs/deploy/source-freshness'
  - title: 'Apache Airflow: Deadline Alerts'
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html'
  - title: 'Apache Kafka 4.2.0 release announcement'
    url: 'https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/'
  - title: 'Apache Kafka 4.3.0 release announcement'
    url: 'https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/'
  - title: 'Databricks: Feature Store'
    url: 'https://docs.databricks.com/aws/en/machine-learning/feature-store/'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: false
owner: Xyvionix Research
draft: false
noindex: false
---

## What changed

The data stopped moving and the pipeline did not notice. A source export arrived empty, or a stream consumer fell behind, or a refresh further down the chain did not run. Every job finished with a success status, because every job did what it was written to do with the input it was given.

A consumer found it. A finance analyst saw that today's figures matched yesterday's to the last digit. A customer was told a balance by an assistant that the branch knew to be out of date. By then the data had been stale for a period that nobody could state.

The state is At risk. The age of the data has passed the tolerance of at least one consumer. The failure has two parts, and the second matters more than the first: the data was late, and the people relying on it were not told.

## The business outcome at risk

An outage stops output. A freshness failure does not. Reports are generated, models score and agents answer throughout the stale window, and each output looks exactly like a correct one.

The first outcome at risk is therefore the set of decisions already made. They have to be found before they can be reviewed, and nothing marks them.

The second is reliance on models and agents. Databricks documents that models served through its Feature Store look up the latest feature values at inference. The latest value is the one written by the last successful run of the feature pipeline. If that run was two days ago, every score since has been computed on a two-day-old customer.

The third is what consumers do next. A team that has been caught by stale data once builds its own checks and its own copies. The enterprise gains several private versions of the same dataset, each with a different age.

## What must be proven

Five things establish the position after the event.

1. **The stale window, per consumer.** When the newest visible source event stopped advancing, and when it resumed. Two consumers of one table can have different windows, because each reads through different later stages.
2. **The hop where the delay entered.** Age is read at each boundary between source and consumer for the period of the failure.
3. **What was produced inside the window.** Tables, extracts, reports, scores, index updates and agent answers derived from the affected data.
4. **That the repair is complete.** The backfilled window reconciles to source, and everything derived from it has been rebuilt since.
5. **That the next failure would be seen.** The alert fires when the flow is held back, and it reaches someone who knows which consumers to tell.

The continuing measurement behind the first and fifth items is [Data Freshness Assurance](/data-freshness-assurance). Reconciliation, replay and backfill as standing capabilities are held under [Data Pipeline Assurance](/data-pipeline-assurance).

## What causes assurance to be lost

The routes below are the ones that let a freshness failure run unreported. Each is a check that existed and measured something other than the age of the data at the consumer.

**The check measured load time.** dbt source freshness compares a `loaded_at_field` with `warn_after` and `error_after` limits. Where the chosen field records when a row was loaded and not when the event occurred, a run that reloads old rows passes.

**The breach was a warning.** The warning limit was crossed for weeks. The error limit was set far enough out that it never was, and warnings were not routed to anyone.

**The deadline was on the run.** Airflow's Deadline Alerts are documented at the level of the DAG run, against references such as the time the run was queued. A run that finishes on time has met its deadline. The alert makes no statement about the data the run carried.

**The lag alert read a metric that had been renamed.** Apache Kafka 4.2.0 corrected metric names to the `kafka.COMPONENT` convention. A lag alert built on the earlier name receives no values after the upgrade, and an alert with no values does not fire.

**Lag was watched on the wrong group.** Kafka 4.2.0 made share groups production-ready, with their own lag metrics. Monitoring that covers consumer groups alone does not see a share group falling behind.

**The producer did not know its consumers.** The table had readers the owning team had never met. When the failure was found there was no list of whom to tell, so the people told were the ones who had complained.

## Corrective action

Under assurance, Xyvionix owns the correction through to completion within the access it has been granted, and uses the enterprise's change process for changes to production pipelines.

The work follows the data downstream before it goes upstream. The impact trace is built first, from lineage and from access records, and each consumer in it is given the window in plain terms: the data was no newer than this time, between these times. Owners of reports and decisions choose whether to reissue, correct or let stand. That choice belongs to them.

The cause is then corrected at the hop where the delay entered, or taken to the owner of the source where it lies outside the enterprise.

The backfill is run as a controlled change. The window is reloaded by event time. Derived tables, aggregates and indexes are rebuilt afterwards in dependency order, because an aggregate built during the window is still wrong after the base table is right. Retrieval indexes that serve AI systems are part of that order, and the effect on answers is covered in [RAG Quality Degradation](/rag-quality-degradation).

Last, detection is moved. Each consumer in the register states a tolerance, and age is measured on event time at the point where that consumer reads.

## What verified closure looks like

The failure is closed when five results are recorded.

The repaired window reconciles to the source by event time, with no shortfall and no duplicates. Every derived object in the trace carries a build time later than the completion of the backfill. Every output from the stale window has been reissued, corrected or marked, by a decision of its owner. Every consumer in the trace has been told, and consumers found during the trace have been added to the register with a tolerance.

The fifth result is a test. The flow is held back on purpose. The alert fires inside the tightest tolerance among the consumers, reaches an owner, and the consumers are notified from the register. If the same hop fails again, the record reopens against this one.

## What to do next

Choose one report, model or assistant that the business would not want to be wrong. Ask its owner a single question: how old can the data behind it be before the output should not be used. Write the answer down with the owner's name.

Then go to the table or index that the consumer reads, at the time of day it is normally read, and find the newest event timestamp in it. Use the time the event happened, not the time the row was written. The difference between that timestamp and the clock is the age the consumer is experiencing.

Compare the two figures. Then ask who would be told if the second exceeded the first, and how they would find out. If the answer is that the consumer would notice, the consumer is the monitoring. Stream lag as a source of age is covered in [Kafka Pipeline Assurance](/kafka-pipeline-assurance).
