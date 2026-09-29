# Research notes: three additional source-backed cases

## Meta — OnlineSchemaChange rebuilt in Python
Source: https://engineering.fb.com/2017/05/05/production-engineering/onlineschemachange-rebuilt-in-python/

Verified points: Facebook open-sourced OnlineSchemaChange.php in 2010 to perform MySQL schema changes while minimizing downtime. The Python rewrite added richer integration and testing. Meta describes a data consistency check intended to avoid data loss or corruption, and says the tool improves confidence for production rollouts, edge-case detection, and protection. The engineering lesson is that schema migration is an operational rollout problem: consistency checks, testability, and minimizing blocking matter as much as the DDL itself.

Proposed topic: Database migration
Proposed concept link: Database Migration

## Google — Migrate your schema to Spanner
Source: https://docs.cloud.google.com/spanner/docs/schema-migration

Verified points: Google recommends a multi-step migration combining automated tooling with manual analysis and refinement. The process includes schema extraction, initial conversion using the Spanner migration tool, detailed review of data types/primary keys/indexes/incompatibilities, staging deployment, iterative testing with representative interactions, schema validation, and final production deployment. The engineering lesson is to avoid changing everything at once and treat compatibility, performance, and validation as explicit stages.

Proposed topic: Database migration
Proposed concept link: Database Migration

## Amazon — Avoiding overload by putting the smaller service in control
Source: https://builder.aws.com/content/3EukISjbJAGNdrxjKaN6RG0wlHG/avoiding-overload-in-distributed-systems-by-putting-the-smaller-service-in-control

Verified points: Amazon describes data-plane/control-plane architectures where the data-plane fleet can outnumber the control-plane fleet by 100x or more. Correlated retries, outage recovery, or client bugs can overload the smaller control plane and drive useful work toward zero. Amazon discusses load shedding, request-frequency tuning, backoff and jitter, S3-based polling/static stability, and reversing control flow so the smaller fleet controls work pace. The engineering lesson is that backpressure is often about who controls the rate of work, not only about adding capacity.

Proposed topic: Backpressure / Scaling
Proposed concept link: Backpressure

Implementation constraint: These are source-backed teaching cases, not claims that the user's application has the same scale. Keep the facts scoped to the published sources and state the transfer lesson separately.
