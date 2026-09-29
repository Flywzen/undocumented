# Company case research notes

## Netflix — fault tolerance in a high-volume distributed system
Source: https://techblog.netflix.com/2012/02/fault-tolerance-in-high-volume.html

Netflix describes an API that fans out to dozens of underlying subsystems and explains that intermittent failure is guaranteed at high volume. The article discusses isolating failures, shedding load, network timeouts and retries, per-dependency thread pools, semaphores, and circuit breakers. This case maps to Cost of Complexity, Fault Isolation, Circuit Breaker, Retry, Bulkheads, and Distributed Systems.

## Uber — Domain-Oriented Microservice Architecture
Source: https://www.uber.com/us/en/blog/microservice-architecture/

Uber describes organizing related microservices into domains, grouping domains into layers, exposing domain gateways, and keeping domains agnostic to each other with explicit extension architecture. The goal is to make large distributed systems more comprehensible and governable. This case maps to Domain-Driven Design, Architecture Boundaries, Service Ownership, API Design, and Complexity Management.

## Usage note

These are educational case summaries based on primary company engineering sources. Claims should be framed as what the companies describe in their published engineering material, not as universal architecture prescriptions.

## Netflix — Caching for a Global Netflix / EVCache
Source: https://netflixtechblog.com/caching-for-a-global-netflix-7bcc457012f1

Netflix describes EVCache as a low-latency, high-reliability cache used across its microservice architecture. The case highlights a global replication design where eventual consistency is acceptable for non-critical data, replication is asynchronous, and local cache operations should remain reliable even when cross-region replication is slow or temporarily unavailable. It also explains how global replication helps avoid cold-cache overload and database pressure during traffic shifts between regions. This case maps to Caching Strategies, Eventual Consistency, Replication, Thundering Herd, and Complexity Trade-offs.
