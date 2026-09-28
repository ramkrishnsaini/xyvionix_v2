---
title: Data Quality Assurance
h1: Keep quality rules true to what the data means now
seoTitle: "Data Quality Assurance: Rules That Stay Current | Xyvionix"
description: >-
  Continuous assurance that data quality rules still cover the critical fields
  and still match what the data means, with every failed expectation owned to
  correction.
summary: >-
  Quality rules age as sources and semantics change. Rule coverage of critical
  fields, contract conformance, distribution shift and reconciliation are held
  as evidence, and each failed expectation is owned through to correction.
lede: >-
  Data quality assurance is the continuing proof that data is correct enough for
  the decisions that use it, and that the rules used to judge it still describe
  what correct means. A quality rule records what its author understood about
  the data on the day it was written. Sources change, meanings shift and engines
  are upgraded, and a rule that still passes may be testing a condition that no
  longer matters. Assurance holds the rules as well as the results.
ogQuestion: Is the data still fit for the decision that uses it?
kind: child
cluster: data
secondary: []
parent: data-assurance
state: assured
audience:
  - Chief Data Officer
  - Head of Data Engineering
  - Technology Risk
intent: >-
  Commercial: continuing proof that data meets the quality its consumers depend
  on
related:
  assurance:
    - data-freshness-assurance
    - data-pipeline-assurance
    - llm-evaluation-assurance
  useCases:
    - schema-change-production-impact
    - data-pipeline-freshness-failure
  technologies:
    - databricks-data-assurance
    - snowflake-data-assurance
  industries:
    - healthcare
    - insurance
    - financial-services
  insights:
    - data-freshness-ai-quality
evidence:
  - name: Critical field register
    detail: >-
      The fields that a consuming decision, report or model depends on, each
      with the consumer that named it, the meaning the consumer assumes and the
      error it can absorb.
  - name: Rule inventory with review dates
    detail: >-
      Every rule that tests a critical field, with its owner, the date it was
      last compared with the source's current behaviour, and the scope or
      filter it applies.
  - name: Rule execution record
    detail: >-
      Proof that each rule ran, on which data and when, with its result. A
      rule that is defined but has not executed is recorded as absent.
  - name: Contract conformance results
    detail: >-
      Results of testing the data against its published contract for shape and
      for content, including constraints that the platform accepts but does
      not enforce.
  - name: Distribution record
    detail: >-
      The distribution of key values over time, compared with fixed bounds
      agreed with the consumer as well as with recent history.
  - name: Reconciliation results
    detail: >-
      Counts and control totals compared between the system of record and the
      data at the point of use, with every difference explained.
  - name: Failed expectation register
    detail: >-
      Each failure with its owner, the decision on whether the data or the
      rule was wrong, the correction, the history repaired and the re-test.
thresholds:
  - signal: Critical fields covered by a rule that has executed
    basis: The business expectation that every field behind a material decision is tested
    lostWhen: A critical field has no rule, or its rule has not run inside the agreed window
  - signal: Time since each rule was reviewed against its source
    basis: The rate at which the source system and its meaning change
    lostWhen: A rule on a critical field passes the agreed review age, or its source changed and the rule was not re-examined
  - signal: Conformance of critical fields
    basis: The error rate the consuming process can absorb before its output is wrong in a way that matters
    lostWhen: Conformance falls below the agreed floor for the agreed number of consecutive runs
  - signal: Distribution of key values against fixed bounds
    basis: The range within which the consuming model or decision was designed to operate
    lostWhen: A key value moves outside its fixed bounds, whether or not learned anomaly detection has raised it
  - signal: Reconciliation difference against the system of record
    basis: The tolerance finance, risk or operations accepts between source and reported figures
    lostWhen: An unexplained difference exceeds the tolerance
  - signal: Age of open failed expectations
    basis: The time the consumer can continue on data known to be at fault
    lostWhen: A failure on a critical field has no owner, or stays open beyond the agreed window
faqs:
  - q: The tests all pass. Why would quality still be at risk?
    a: >-
      A passing test proves that the condition its author wrote still holds.
      It does not prove the condition is still the right one, that it covers
      the fields consumers now depend on, or that it ran at all. Assurance
      checks the rule set against the current critical fields and the current
      behaviour of the source, then checks the results.
  - q: Does Xyvionix replace the enterprise's data quality tooling?
    a: >-
      No. Tests, expectations, metric functions and observability monitors
      already in place are used as signal. Assurance adds what they do not
      provide on their own: a threshold set by the consumer, a review of
      whether the rules are still current, and ownership of each failure
      until a re-test passes.
  - q: What happens when the rule is wrong and the data is right?
    a: >-
      The rule is corrected, with the evidence that the source changed and the
      agreement of the consumer who relies on the field. That outcome is as
      common as the reverse, and a rule set in which it never happens is
      probably not being reviewed.
sources:
  - title: 'dbt: Add data tests to your DAG'
    url: 'https://docs.getdbt.com/docs/build/data-tests'
  - title: 'dbt: Model contracts'
    url: 'https://docs.getdbt.com/docs/mesh/govern/model-contracts'
  - title: 'dbt: dbt Core v2 is here'
    url: 'https://docs.getdbt.com/blog/dbt-core-v2-is-here'
  - title: 'Databricks release notes, June 2026'
    url: 'https://docs.databricks.com/aws/en/release-notes/product/2026/june'
  - title: 'Databricks: Data quality monitoring'
    url: 'https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-quality-monitoring/'
  - title: 'Snowflake: Introduction to data quality and data metric functions'
    url: 'https://docs.snowflake.com/en/user-guide/data-quality-intro'
  - title: 'Snowflake: new features'
    url: 'https://docs.snowflake.com/en/release-notes/new-features'
  - title: 'Apache Spark 4.0.0 release notes'
    url: 'https://spark.apache.org/releases/spark-release-4-0-0.html'
  - title: 'Apache Spark 4.2.0 release notes'
    url: 'https://spark.apache.org/releases/spark-release-4-2-0.html'
  - title: 'Apache Kafka 4.3 documentation: design'
    url: 'https://kafka.apache.org/43/design/design/'
  - title: 'Monte Carlo documentation: monitors overview'
    url: 'https://docs.getmontecarlo.com/docs/monitors-overview'
  - title: 'Soda documentation'
    url: 'https://docs.soda.io/'
  - title: 'Open Data Contract Standard'
    url: 'https://bitol-io.github.io/open-data-contract-standard/latest/'
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

Quality is judged by rules, and rules are written by people at a point in time. The result of a rule is evidence about the data. It is also, less obviously, evidence about how well the rule still fits.

**Rules cover what the author thought of.** dbt ships four built-in generic data tests: unique, not null, accepted values and relationships. They are useful and they are narrow. A column can be unique, populated and drawn from the accepted list while carrying the wrong value in every row.

**Meaning moves under a stable schema.** A source system starts recording an amount in a different unit, reuses a status code, or changes when a date field is set. The type is unchanged. Every structural check passes. The field no longer means what its consumers assume.

**Checks prove a moment.** A pipeline expectation validates data as it is written. A build-time test validates at build. Snowflake data metric functions run on a schedule that defaults to hourly. Between those moments the state is unproven, and data changed by another route is not examined.

**The scope of a check changes quietly.** Snowflake made it possible in September 2026 to modify or clear the filter on an existing data metric function association. A filter narrows what a check covers. When it is changed, the check keeps its name and its history and proves something different.

**The engine changes the answer.** Apache Spark 4.0.0 made ANSI SQL mode the default, which turns conditions that previously produced a silent null or overflow into errors. Spark 4.2.0 turned on Arrow-optimised Python UDFs by default. The same code on a new runtime can fail, or can succeed with different type handling.

**The baseline learns the fault.** Anomaly detection that builds its expectation from recent history absorbs a slow shift in distribution. By the time the change is large, it is normal.

## What is at stake

Wrong data produces confident output. A report reconciles to the warehouse and not to the ledger. A model scores on a feature whose distribution has moved away from the one it was built on, and its decisions degrade without any single one being identifiably wrong.

For regulated reporting the consequence is a restatement and the question that follows it: what control should have caught this, and what is its evidence. A rule that existed but had not been reviewed since the source changed is a weak answer.

For AI systems, poor data and poor model behaviour produce the same symptom. An evaluation score falls and the team investigates the prompt and the model. Unless data quality is measured on its own, the cause cannot be separated, which is why this page sits beside [LLM Evaluation Assurance](/llm-evaluation-assurance) and not inside it.

## What Xyvionix assures

Xyvionix holds six statements about the data behind each critical outcome. The first three concern the rules. The last three concern the data.

1. **Critical fields are covered.** Every field a consumer has named as critical is tested by at least one rule, and the rule has been shown to execute.
2. **Rules are current.** Each rule has an owner and a review date, and is re-examined when its source system changes, not only when it fails.
3. **The contract is tested for content as well as shape.** Conformance covers column names and types and also the constraints and value rules the contract declares, including those the platform does not enforce.
4. **Key values stay inside fixed bounds.** Distribution is compared with limits agreed with the consumer, alongside any learned baseline, so that a slow shift cannot redefine normal.
5. **The data reconciles.** Counts and control totals at the point of use agree with the system of record within a tolerance the business has accepted.
6. **Every failed expectation has an owner.** A failure is an open item with a name against it until a re-test passes.

Whether the data arrived in time is held in [Data Freshness Assurance](/data-freshness-assurance). Whether the run that delivered it was complete is held in [Data Pipeline Assurance](/data-pipeline-assurance).

## Common failure modes

- **The test that never ran.** dbt v2 applies a stricter language specification and can reject project configuration that version 1 accepted without complaint. Migration can surface tests that were misconfigured and had never executed. Until then, the project listed them as coverage.
- **The constraint that is declared and not enforced.** dbt documents that on Snowflake and Databricks, primary and foreign keys can be defined in a model contract but are not enforced. The metadata says the key is unique. The table holds duplicates.
- **The accepted list that lags the source.** A new category appears upstream. Either the test fails every run and is muted, or the list is widened without anyone asking what the new value means to consumers.
- **Warnings nobody reads.** A failing rule is downgraded from error to warning so that the pipeline can proceed. The warning has fired on every run since.
- **Duplicates at the sink.** Kafka documents that exactly-once delivery within Kafka does not extend automatically to external systems. A sink that does not coordinate its writes with offsets can duplicate or drop records that the stream handled correctly.
- **The fix is a filter.** Failing records are removed so that the table conforms. Conformance rises and completeness falls, and only one of the two is reported.
- **The aggregate hides the segment.** The overall pass rate is high. All the failures belong to one source, one region or one product, and the consumers of that segment are working on bad data.

## Corrective ownership

When a quality threshold is breached the state moves to At risk and the failed expectation is assigned an owner. Xyvionix owns the correction through to completion within the access it has been granted, and uses the enterprise's change process for production changes.

The first decision is which is wrong, the data or the rule. If the data is wrong, the fault is traced to the hop that introduced it and corrected there, and the consumers of the affected fields are told what is affected and from what date. If the rule is wrong because the source has changed legitimately, the rule is revised with the agreement of the consumer who depends on the field.

Correction includes the history. Fixing the pipeline stops new bad records. The records already written remain until they are repaired or marked as unreliable, and a model or report that reads history will keep reading them.

Where the fault lies in a source application owned elsewhere, the evidence is taken to that owner. Muting the rule is not a correction, and a muted rule is recorded as a gap in coverage.

## Verified closure

A quality correction is closed when the data passes at the point of use and the rule has been shown to work. A merged fix is not closure.

Closure requires four results. New data passes the rule against the consumer's threshold. The affected history has been repaired and passes, or is marked as unreliable with the consumers informed. The data reconciles to the system of record for the repaired period. The rule fails when the original fault is reproduced on test data, which proves that the same fault would now be caught.

Closure is recorded with those results. A failure that recurs reopens against the same record, so that a rule which is repeatedly fixed and repeatedly fails is visible as a pattern.

## Technology and industry context

The tooling market does not agree on what quality is. Soda defines it as completeness, accuracy, timeliness, uniqueness and consistency. Monte Carlo lets a monitor carry one of six dimensions, adding validity. Soda also draws a line between testing, which it describes as proactive, and observability, which it describes as reactive. These are useful vocabularies. None of them says which fields matter or how much error a decision can absorb. That has to come from the consumer.

Standards now give the promise a place to be written down. The Open Data Contract Standard includes a data quality section in the contract itself. A rule stated in a contract is still a declaration until it is run against the data.

Platform checks differ in when they run, what they cover and what they cost, and that detail is covered in [Databricks Data Assurance](/databricks-data-assurance) and [Snowflake Data Assurance](/snowflake-data-assurance). The effect of a structural change on downstream consumers is described in [Schema Change Production Impact](/schema-change-production-impact).

Sector sets the tolerance. In [financial services](/financial-services), reconciliation to the system of record is the central control because reported figures must be reproducible. In [healthcare](/healthcare) and [insurance](/insurance), a wrong value in a single record can reach an individual decision, so segment-level conformance matters more than the aggregate.
