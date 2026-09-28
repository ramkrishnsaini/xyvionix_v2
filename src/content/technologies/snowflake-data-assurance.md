---
title: Snowflake Data Assurance
h1: Prove that Snowflake delivers the freshness, recovery and cost control its settings describe
seoTitle: 'Snowflake Data Assurance: Lag, Recovery, Spend | Xyvionix'
description: >-
  What has to be re-proven on Snowflake: measured dynamic table lag, data
  metric results, recovery windows that a restore confirms, role grants and
  spend per workload.
summary: >-
  On Snowflake, freshness, recovery and spend are expressed as settings, and a
  setting is intent. Measured lag, metric results, restore tests, grants and
  cost per workload are held against thresholds set by the consumers of the
  data.
lede: >-
  Snowflake data assurance is the continuing proof that data on Snowflake is as
  fresh, as correct and as recoverable as its consumers require, at a cost the
  business has agreed. Most of what matters on Snowflake is declared as a
  setting: a target lag, a metric schedule, a retention period, a budget.
  Snowflake's own documentation describes target lag as best-effort. Assurance
  measures what each setting delivered and tests the recovery it promises.
ogQuestion: Does Snowflake deliver what its settings declare?
platform: Snowflake
group: data-platform
cluster: data
secondary:
  - value
parent: technologies
state: assured
audience:
  - Chief Data Officer
  - Head of Data Engineering
  - FinOps Leadership
intent: >-
  Technology + problem: proving data on Snowflake remains fresh, correct and
  recoverable
related:
  assurance:
    - data-assurance
    - data-quality-assurance
    - data-freshness-assurance
    - cloud-cost-assurance
  useCases:
    - data-pipeline-freshness-failure
    - schema-change-production-impact
    - cloud-cost-anomaly
  technologies:
    - databricks-data-assurance
    - kafka-pipeline-assurance
  industries:
    - insurance
    - financial-services
  insights:
    - data-freshness-ai-quality
evidence:
  - name: Dynamic table lag record
    detail: >-
      For each dynamic table on a critical path, the target lag configured, the
      lag measured, the time of the last refresh and the consumers that read
      the table.
  - name: Data metric function register
    detail: >-
      Each data metric function association on a critical table, with its
      schedule, its filter, its expectation and the time of its last result,
      compared with the previous window to show any change of scope.
  - name: Recovery settings register
    detail: >-
      The Time Travel retention on each critical object, the backup policy that
      covers it, whether retention lock applies, and the storage and catalog
      mode of each Iceberg table.
  - name: Restore test results
    detail: >-
      Dated restores from Time Travel and from Backups, with the duration
      measured, the content validated and the grants checked after the
      restore.
  - name: Role and grant record
    detail: >-
      Privileges granted to each role on critical objects, the users and
      services that hold the role, and the grants exercised over the
      measurement window.
  - name: Spend per workload
    detail: >-
      Warehouse, serverless and AI service consumption attributed to each
      workload, with the budget that covers it and the volume the workload
      processed in the same period.
thresholds:
  - signal: Measured lag of dynamic tables and search services
    basis: The staleness the consuming report, model or agent can tolerate, which is not the configured target lag
    lostWhen: Measured lag exceeds the tolerance, or a table has not refreshed within its expected cadence
  - signal: Age and scope of data metric results on critical tables
    basis: The interval between checks has to be shorter than the consumer's tolerance for undetected error
    lostWhen: The last result is older than the agreed interval, or a filter on the association changed without review
  - signal: Recovery window on critical objects
    basis: The time the business takes to detect a fault and its recovery objective, against a Time Travel default of one day
    lostWhen: Retention on a critical object is below the agreed value, or no restore has been tested within the agreed period
  - signal: Spend outside a hard limit
    basis: The budget agreed for each workload, given that resource monitors apply to warehouses only
    lostWhen: Serverless or AI service spend for a workload has no budget, or projected spend exceeds the limit
  - signal: Cost per unit of work
    basis: The value of the outcome the workload serves
    lostWhen: Cost per unit rises across consecutive periods without a matching rise in volume
faqs:
  - q: Target lag is configured. Is the table that fresh?
    a: >-
      Not necessarily. Snowflake states that target lag is a staleness target,
      not a refresh interval, and that it is best-effort, not a guarantee. The
      configured value is what was requested. Evidence is the lag measured on
      the table, compared with what its consumer can tolerate.
  - q: Does Fail-safe count towards the recovery objective?
    a: >-
      It should not. Fail-safe is a fixed seven-day period, data in it is
      recoverable only by Snowflake, and Snowflake states that recovery may
      take several hours to several days. The enterprise controls neither the
      start nor the duration, so it cannot be held to a recovery time.
  - q: Resource monitors suspend warehouses at the quota. Is cost controlled?
    a: >-
      For warehouses. Snowflake documents that resource monitors work for
      warehouses only and cannot track serverless features or AI services.
      Those are covered by budgets, which notify on projected overspend and
      refresh every 6.5 hours by default.
sources:
  - title: 'Snowflake: dynamic tables target lag'
    url: 'https://docs.snowflake.com/en/user-guide/dynamic-tables-target-lag'
  - title: 'Snowflake: introduction to data quality and data metric functions'
    url: 'https://docs.snowflake.com/en/user-guide/data-quality-intro'
  - title: 'Snowflake release notes: new features'
    url: 'https://docs.snowflake.com/en/release-notes/new-features'
  - title: 'Snowflake: Time Travel'
    url: 'https://docs.snowflake.com/en/user-guide/data-time-travel'
  - title: 'Snowflake: Fail-safe'
    url: 'https://docs.snowflake.com/en/user-guide/data-failsafe'
  - title: 'Snowflake: Backups'
    url: 'https://docs.snowflake.com/en/user-guide/backups'
  - title: 'Snowflake: Apache Iceberg tables'
    url: 'https://docs.snowflake.com/en/user-guide/tables-iceberg'
  - title: 'Snowflake Horizon Catalog'
    url: 'https://docs.snowflake.com/en/user-guide/snowflake-horizon'
  - title: 'Snowflake: budgets'
    url: 'https://docs.snowflake.com/en/user-guide/budgets'
  - title: 'Snowflake: resource monitors'
    url: 'https://docs.snowflake.com/en/user-guide/resource-monitors'
  - title: 'Snowflake: cost anomalies'
    url: 'https://docs.snowflake.com/en/user-guide/cost-anomalies'
  - title: 'Snowflake Cortex Search overview'
    url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview'
  - title: 'Snowflake: AI features overview'
    url: 'https://docs.snowflake.com/en/guides-overview-ai-features'
publishedDate: '2026-09-27'
modifiedDate: '2026-09-27'
lastReviewed: '2026-09-27'
reviewCadence: 180
freshnessCritical: true
owner: Xyvionix Research
draft: false
noindex: false
---

## The assurance problem on Snowflake

Snowflake removes most of the operating work from a data platform, and replaces it with declarations. A dynamic table declares a target lag. A data metric function declares a schedule. An object declares a retention period. A budget declares a limit. Each declaration is easy to make and easy to read back, and that is the risk: the setting is taken for the result.

Snowflake is direct about the difference. Its documentation for dynamic tables states that "Target lag is a staleness target, not a refresh interval" and that "Target lag is best-effort, not a guarantee."

Two further features of the platform shape the problem. The first is edition. Data quality monitoring requires Enterprise Edition. Time Travel beyond one day requires Enterprise Edition or higher. Retention lock and legal hold on Backups require Business Critical Edition or higher. What can be evidenced depends on what has been bought.

The second is control. Some protections are operated by Snowflake and not by the customer. Fail-safe is the clearest case: it exists for every permanent table, and the enterprise can neither start a recovery from it nor say how long one will take.

The vendor-neutral method is set out in [Data Assurance](/data-assurance). This page covers what is particular to Snowflake.

## What expires, and on whose calendar

| Fact, as published by Snowflake | What it means for evidence |
|---|---|
| Data metric functions run on a schedule that defaults to hourly | Between runs the state of the table is unproven |
| Modifying or clearing the filter on an existing data metric function association became generally available in release 10.32, 5 to 9 September 2026 | The scope of a check can change while its name and history stay the same |
| Time Travel defaults to one day, extends to 90 days on Enterprise Edition and higher, and is deactivated by a retention of 0 days | The recovery window is set per object and can be reduced without notice |
| Fail-safe is a non-configurable seven-day period, recoverable only by Snowflake | It is not a recovery objective the enterprise controls |
| Budgets refresh every 6.5 hours by default. A low-latency budget refreshes hourly at 12 times the compute cost | The refresh interval is the earliest an overrun can be seen |
| Cost anomaly detection needs at least 30 days of history and notifies once a day | A new workload has no anomaly detection in its first month |

Names have moved as well. Snowflake Intelligence became Snowflake CoWork on 2 June 2026, and the feature once called Snapshots is now Backups.

## What must be continuously re-proven

**Measured lag, table by table.** The lag observed on each dynamic table is compared with what its consumer tolerates. The same applies to a Cortex Search service, which is created with a target lag that states how far its content may trail the base data. That value is a declared staleness tolerance for every answer drawn from the service, so it should trace to a requirement. The method is set out in [Data Freshness Assurance](/data-freshness-assurance).

**Metric results that are recent and unchanged in scope.** Data metric functions measure freshness, volume, nulls, duplicates and accepted values, and expectations set a pass or fail threshold on the result. Each association is checked for the age of its last result and for any change to its filter. Snowflake does not support data metric functions on hybrid tables or streams, so those objects need another check or are reported as Unassured. Rules are covered in [Data Quality Assurance](/data-quality-assurance).

**A recovery window that a restore confirms.** Snowflake has three recovery layers with three owners and three time limits: Time Travel, Fail-safe and Backups. Only a timed restore shows which of them meets the recovery objective for a given object.

**Grants that match use.** Privileges on critical objects are compared with the roles that exercise them. Backups have included database roles since 18 September 2026, so a restore returns roles as they stood when the backup was taken. Access is re-checked after every restore.

**Lineage that reaches the consumers.** Horizon Catalog provides column-level lineage and accepts feeds from external databases, BI tools and OpenLineage. Coverage depends on which feeds are connected.

**Spend per workload, on every meter.** Warehouse, serverless and AI service consumption are attributed to the workload that caused them. Data quality monitoring is itself billed as serverless compute, so the frequency of checking is a cost decision that has to be made deliberately. The method is set out in [Cloud Cost Assurance](/cloud-cost-assurance).

## Common failure modes

- **The dynamic table with no reader.** Snowflake documents that a table whose target lag is DOWNSTREAM, with no downstream consumer, never refreshes, and that no warning is produced.
- **Fail-safe written into the recovery plan.** The plan counts seven further days of protection. Those days belong to Snowflake's process and carry no recovery time.
- **Fail-safe that cannot recover the table.** Snowflake states that Fail-safe operations fail for tables containing data ingested by Snowpipe Streaming Classic.
- **Retention reduced to save storage.** Time Travel on a large table is set to 0 days. The saving is visible on the next invoice. The loss is visible at the next incident.
- **An immutable backup that was never restored.** Retention lock makes a backup immutable and is irreversible. It proves the backup exists. It does not prove the backup is complete or that a restore fits inside the recovery objective. An irreversible lock also holds data that a deletion request may require removed.
- **The Iceberg table outside Snowflake's care.** Snowflake performs compaction only for Snowflake-managed Iceberg tables, and Fail-safe applies only to Iceberg tables on Snowflake storage. A table on a customer-managed external volume carries the customer's own maintenance and recovery risk.
- **The resource monitor as the only brake.** The monitor suspends warehouses at the quota. The growth is in serverless features and AI services, which it cannot track.
- **The offsetting anomaly.** Cost anomaly detection runs at account and organisation level. A spike in one workload and a dip in another cancel out, and neither is reported.

## Corrective ownership and verified closure

When a threshold is breached the state moves to At risk and a correction is opened with a named owner. Xyvionix owns that correction through to completion within the access it has been granted, and uses the enterprise's change process for changes to production objects and account settings.

The first decision is often whether the setting or the requirement is wrong. Where measured lag exceeds the tolerance, either the refresh path is corrected or the consumer accepts a looser tolerance, and the decision is recorded with its owner. Where a retention period has been reduced, it is returned to the approved value and the change is traced. Where spend sits outside any limit, a budget is placed on the workload and its owner is named.

Closure is recorded by measurement.

- **Lag.** Measured lag stays inside the tolerance across a full cycle, including the busiest period, and a table held back on purpose raises the alert.
- **Metric scope.** The association's filter matches the approved definition, and the expectation fails when the original fault is reproduced on test data.
- **Recovery.** An object is restored from Time Travel or from a backup, the duration is inside the recovery objective, the content reconciles and the grants are checked.
- **Spend.** The workload's consumption appears under its budget for a full period, and a test threshold produces a notification that reaches the owner.

A retention setting, a filter and a budget can each be changed by one statement. The evidence is therefore re-gathered on a schedule, not only when someone reports a change. The scenario most teams meet first is described in [Data Pipeline Freshness Failure](/data-pipeline-freshness-failure).
