---
title: Kafka Pipeline Assurance
h1: Prove that Apache Kafka streams deliver complete, timely data to the systems that depend on them
seoTitle: 'Kafka Pipeline Assurance: Lag, Schema, Replay | Xyvionix'
description: >-
  What has to be re-proven on Apache Kafka: lag measured as time, schema
  compatibility per subject, sink reconciliation, replay inside retention and
  a supported version.
summary: >-
  A Kafka cluster can be healthy while the data it carries arrives late,
  duplicated or unreadable on replay. Lag, compatibility settings, sink
  reconciliation, retention and version position are held against thresholds
  set by the consumers.
lede: >-
  Kafka pipeline assurance is the continuing proof that event streams on Apache
  Kafka deliver complete and timely data to each consumer, and that the data
  can be replayed when a consumer has to be rebuilt. Broker health does not
  establish any of this. The proof is taken at the consumer and the sink: lag
  expressed as time, records reconciled at the destination, schemas that old
  data can still be read with, and a release that the project still supports.
ogQuestion: Is the stream healthy, or is the data arriving on time and complete?
platform: Apache Kafka
group: data-platform
cluster: data
secondary:
  - reliability
parent: technologies
state: assured
audience:
  - Head of Data Engineering
  - VP Platform
intent: >-
  Technology + problem: proving event streams deliver complete, ordered, timely
  data
related:
  assurance:
    - data-pipeline-assurance
    - data-freshness-assurance
    - data-quality-assurance
  useCases:
    - data-pipeline-freshness-failure
    - schema-change-production-impact
  technologies:
    - databricks-data-assurance
    - snowflake-data-assurance
  industries:
    - financial-services
    - insurance
  insights:
    - data-freshness-ai-quality
evidence:
  - name: Lag record per group
    detail: >-
      For each consumer group and share group on a critical topic, the lag
      measured, converted to the age of the oldest unprocessed record, with the
      consumer that depends on it and the tolerance that consumer has stated.
  - name: Schema compatibility register
    detail: >-
      The compatibility type set on each subject, the number of registered
      versions, and the date and author of the last change to the setting.
      Subjects set to NONE are listed as gaps.
  - name: Sink reconciliation results
    detail: >-
      Dated comparisons of records produced to a topic with records present in
      each external destination, showing duplicates and omissions, repeated
      after any change to a connector, a schema or a sink.
  - name: Retention and replay record
    detail: >-
      Local and total retention on each critical topic, whether tiered storage
      applies, and the result of the last timed replay from the earliest
      retained offset, including reads from the remote tier.
  - name: Version and mode position
    detail: >-
      The release each cluster, client, Connect worker and Streams application
      runs, compared with the releases the project lists as supported, with
      the metadata mode and Java version of each.
  - name: Alert firing tests
    detail: >-
      For each lag and availability alert, the metric name it reads and the
      date it was last made to fire on purpose, repeated after every upgrade.
thresholds:
  - signal: Age of the oldest unprocessed record, per group
    basis: The staleness the consuming process can tolerate, stated by its owner in units of time
    lostWhen: Measured age exceeds the tolerance, or a group on a critical topic has no lag measurement
  - signal: Compatibility setting on critical subjects
    basis: Whether consumers must be able to read every retained version, which replay requires
    lostWhen: A critical subject is set to NONE, or a non-transitive mode guards a topic whose retained data spans several versions
  - signal: Records reconciled at each external sink
    basis: The cost of a duplicate or a missing record in the process the sink serves
    lostWhen: Reconciliation shows a difference beyond the agreed tolerance, or none has run since the connector or schema changed
  - signal: Retention against replay need
    basis: The time the business takes to detect a fault, plus the time needed to correct and redeploy the consumer
    lostWhen: Retention on a critical topic is shorter than that period, or no replay has been tested within the agreed interval
  - signal: Release support position
    basis: The supported releases listed by the Apache Kafka project at the date of review
    lostWhen: A production cluster runs a release outside the supported list, or remains in ZooKeeper mode
faqs:
  - q: The cluster dashboards are green. Is the pipeline assured?
    a: >-
      Not on that evidence. Broker dashboards describe the platform. They do
      not show whether a given consumer is reading data inside its tolerance,
      whether the sink holds every record once, or whether an alert still
      reads a metric that exists. Apache Kafka 4.2.0 corrected metric names to
      a new convention, so an alert built on an earlier name can stay silent
      for the wrong reason.
  - q: Transactions are enabled. Is delivery exactly-once?
    a: >-
      Inside Kafka, within the transactional boundary. The Kafka design
      documentation is clear that the result does not extend automatically to
      external systems: offsets and output have to be coordinated. A database,
      warehouse or index fed from a topic needs its own reconciliation.
  - q: Can a ZooKeeper-based cluster move directly to Kafka 4?
    a: >-
      No. Kafka 4.x supports KRaft mode only. The upgrade documentation
      requires a cluster to be in KRaft mode, with software and metadata
      versions of at least 3.3.x, before a broker upgrade to 4.x, and
      recommends 3.9.x as the stepping stone. The migration to KRaft is a
      separate change that comes first.
sources:
  - title: 'Apache Kafka: downloads and supported releases'
    url: 'https://kafka.apache.org/community/downloads/'
  - title: 'Apache Kafka 4.3: upgrading'
    url: 'https://kafka.apache.org/43/getting-started/upgrade/'
  - title: 'Apache Kafka 4.0.0 release announcement'
    url: 'https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/'
  - title: 'Apache Kafka 3.9.0 release announcement'
    url: 'https://kafka.apache.org/blog/2024/11/06/apache-kafka-3.9.0-release-announcement/'
  - title: 'Apache Kafka 4.2.0 release announcement'
    url: 'https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/'
  - title: 'Apache Kafka 4.3.0 release announcement'
    url: 'https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/'
  - title: 'Apache Kafka 4.3: tiered storage'
    url: 'https://kafka.apache.org/43/operations/tiered-storage/'
  - title: 'Apache Kafka 4.3: design'
    url: 'https://kafka.apache.org/43/design/design/'
  - title: 'Confluent Platform: schema evolution and compatibility'
    url: 'https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html'
  - title: 'Confluent Cloud: Tableflow overview'
    url: 'https://docs.confluent.io/cloud/current/topics/tableflow/overview.html'
  - title: 'IBM completes acquisition of Confluent'
    url: 'https://newsroom.ibm.com/2026-03-17-ibm-completes-acquisition-of-confluent,-making-real-time-data-the-engine-of-enterprise-ai-and-agents'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Apache Kafka

Apache Kafka separates the party that writes data from the parties that read it. That is its strength, and it is the source of the assurance problem. A producer receives an acknowledgement and considers its work done. The broker stores the record and reports itself healthy. Whether the record reached the fraud model, the ledger or the search index on time, once, and in a form the reader could parse is a question the platform does not answer on its own, because each consumer keeps its own position and its own pace.

Four properties have to be proven at the consuming end, not inferred from the cluster.

- **Timeliness.** Lag is normally reported as a count of records a group has yet to read. The business tolerance is a period of time, and the same count means a different delay on a busy topic and a quiet one.
- **Completeness.** Delivery semantics hold inside Kafka. Records are lost or duplicated at the boundary with other systems.
- **Readability.** A schema that is compatible with the previous version is not necessarily compatible with older data that is still retained.
- **Replayability.** A consumer can be rebuilt from the log only while the log still holds the records.

Xyvionix is independent of every vendor in this market, including the distributions and managed services built on Kafka. The vendor-neutral method is set out in [Data Pipeline Assurance](/data-pipeline-assurance). This page covers what is particular to Kafka.

## What expires, and on whose calendar

The Apache Kafka project aims for three releases a year and lists three releases as supported. The calendar belongs to the project, not to the enterprise.

| Fact, as published | What it means for evidence |
|---|---|
| The latest release is 4.3.1, dated 25 June 2026. Supported releases listed are 4.3.1, 4.2.1 (30 May 2026) and 4.1.2 (17 March 2026) | Version position is an expiring condition that can be tracked like a certificate |
| Kafka 3.9.0, released 6 November 2024, was the final release in the 3.x line and the last to include ZooKeeper mode | A cluster in ZooKeeper mode runs a release outside the supported list |
| Kafka 4.0.0 was released on 18 March 2025. Kafka 4.3 supports KRaft mode only | There is no in-place upgrade from ZooKeeper mode to 4.x |
| Kafka 4.2.0, released 17 February 2026, made share groups (Queues for Kafka) production-ready and corrected metric names to the `kafka.COMPONENT` convention | Alerts and dashboards built on earlier metric names need to be re-proven |
| Kafka 4.3.0, released 22 May 2026, deprecated the `streams-scala` module and the `group.coordinator.rebalance.protocols` broker configuration, both marked for removal in Kafka 5.0 | The next major release already has a list of things that will stop working |

IBM completed its acquisition of Confluent on 17 March 2026. The product names Confluent Cloud and Confluent Platform remain in use in the documentation.

## What must be continuously re-proven

**Lag as time, for every kind of group.** Lag on each consumer group is converted to the age of the oldest unprocessed record and compared with what the consumer tolerates. Share groups are measured separately. They have their own lag metrics, and they change ordering and redelivery behaviour, so a consumer moved to a share group needs its ordering assumptions re-tested as well as its lag. The threshold method is set out in [Data Freshness Assurance](/data-freshness-assurance).

**Lag at every boundary.** The topic is rarely the last hop. Confluent Tableflow, for example, materialises topics as Apache Iceberg or Delta Lake tables, which adds a second freshness boundary: the lag of the topic and the commit lag of the table. The age that matters to the business is the sum across hops, and each hop has a different owner.

**Compatibility that covers the retained history.** Schema Registry offers seven compatibility types. The default, BACKWARD, is non-transitive: a new schema is checked against the latest version only. After many versions, a consumer on the current schema may be unable to read the oldest records still in the topic. A replay asks it to do exactly that. The setting on each critical subject is recorded, and a subject set to NONE is treated as having no protection.

**Completeness at the sink.** The idempotent producer, transactions and `isolation.level=read_committed` give exactly-once processing inside Kafka. The design documentation states that this does not extend automatically to external systems. Each external sink is therefore reconciled against its topic, and the reconciliation is repeated when the connector, the schema or the sink changes.

**Replay inside retention.** With tiered storage, local and total retention are configured separately, through `local.retention.ms` and `retention.ms`. Older records are readable only if the remote tier is readable. A timed replay from the earliest retained offset is the only evidence that the retention setting delivers the recovery it implies.

**Alerts that can still fire.** Every alert on a critical stream is made to fire on purpose after an upgrade. An alert that reads a renamed metric receives no values, and an alert with no values is silent.

## Common failure modes

- **Lag judged by count.** The alert threshold is a number of records chosen when the topic carried a different volume.
- **NONE set to unblock a release.** Compatibility is relaxed on a subject so that a breaking change can ship, and is never restored. Every later change to that subject passes without a check.
- **Exactly-once claimed across the sink.** The design review records exactly-once delivery because transactions are enabled. The warehouse table fed by the connector holds duplicates after every connector restart.
- **Retention shorter than detection.** A fault in a consumer is found after the topic has aged out the records needed to rebuild its output.
- **Tiered storage assumed for compacted topics.** Kafka documents that tiered storage does not support compacted topics. A plan that depends on the remote tier for those topics has no basis.
- **The ZooKeeper cluster left for later.** The migration to KRaft is deferred because the cluster is stable. It is stable on a release line the project no longer lists as supported.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and a correction is opened with a named owner. Xyvionix owns that correction through to completion within the access it has been granted, and uses the enterprise's change process for changes to brokers, topics, subjects and connectors.

Corrections on Kafka often need a decision between the owner of a topic and the owner of a consumer. Where lag exceeds a tolerance, either the consumer is given the capacity to keep up or its owner accepts a looser tolerance, and the decision is recorded. Where a subject is set to NONE, the compatibility type is restored and the versions registered in the interval are reviewed against the retained data. A stream with no current evidence is reported as Unassured.

Closure is recorded by measurement.

- **Lag.** The age of the oldest unprocessed record stays inside the tolerance across a full business cycle, including the peak, and a consumer stopped on purpose raises the alert.
- **Schema.** A schema that breaks compatibility with a retained version is rejected by the registry in a test, and a consumer on the current schema reads a sample of the oldest retained records.
- **Completeness.** Reconciliation between topic and sink shows a difference inside the tolerance after a forced restart of the connector.
- **Replay.** A replay from the earliest retained offset completes inside the agreed time, including records served from the remote tier.
- **Version.** Every broker reports a supported release in KRaft mode, and each alert has been made to fire since the upgrade.

An upgrade resets the evidence it touches. The scenario most teams meet first is described in [Data Pipeline Freshness Failure](/data-pipeline-freshness-failure), and the effect of a schema change on downstream consumers in [Schema Change Production Impact](/schema-change-production-impact).
