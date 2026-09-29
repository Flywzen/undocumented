# Copy and education references

## Google SRE — Part II: Principles
URL: https://sre.google/sre-book/part-II-principles/

Temuan yang dipakai untuk rewrite:
- Penjelasan dimulai dari masalah dan cara berpikir, bukan jargon.
- Risk, SLO, toil, monitoring, release engineering, dan simplicity diposisikan sebagai prinsip yang punya konsekuensi operasional.
- “Simplicity” dijelaskan sebagai kualitas engineering yang sulit direbut kembali setelah hilang.
- Copy yang ingin ditiru: konkret, observasional, dan menjelaskan hubungan sebab-akibat.

Catatan editorial: jangan menyalin kalimat sumber; ambil struktur penjelasannya—masalah nyata → konsep → konsekuensi → tindakan.

## AWS Well-Architected — Definitions
URL: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html

Temuan yang dipakai:
- Architecture dijelaskan sebagai cara komponen bekerja bersama dalam sebuah workload.
- Trade-off selalu dibaca dalam business context; reliability, performance, cost, security, dan operational excellence bisa saling memengaruhi.
- Pertanyaan evaluasi lebih kuat daripada klaim besar: siapa owner-nya, apa requirement-nya, apa konsekuensi keputusan ini.

## Microsoft Azure Architecture Center
URL: https://learn.microsoft.com/en-us/azure/architecture/

Temuan yang dipakai:
- Materi disusun sebagai fundamentals, patterns, reference architectures, technology decision guides, dan example workloads.
- Copy yang efektif mengantar pembaca dari situasi/problem ke pattern dan pilihan teknologi.
- Hindari jargon tanpa konteks; gunakan bentuk “kapan memilih ini” dan “apa yang perlu diwaspadai”.

## Rewrite rule derived from references
Gunakan urutan: situasi yang dikenali developer → keputusan yang harus dibuat → trade-off/failure mode → langkah kecil yang bisa dicoba. Hindari slogan motivasional dan klaim transformasional.

## Case-study research for dialogic rewrite

- Netflix TechBlog, “Caching for a Global Netflix” (2016): Netflix describes EVCache as a memcached-based, cloud-optimized cache used for low-latency, high-reliability access. The article states production EVCache deployments handled upwards of 30 million requests/sec at peak, stored hundreds of billions of objects across tens of thousands of memcached instances, and reached just under 2 trillion requests/day globally. Teaching angle: ask what happens to cold caches, database load, freshness, and consistency when traffic moves regions. Source: https://netflixtechblog.com/caching-for-a-global-netflix-7bcc457012f1
- Uber Engineering, “Introducing Domain-Oriented Microservice Architecture” (2020): Uber describes growth pains from microservice complexity, dependency cascades, debugging difficulty, and cross-team coordination. DOMA groups services into domains, uses layers/gateways to manage dependencies and blast radius, and enables teams to extend systems without modifying core services. Source: https://www.uber.com/us/en/blog/microservice-architecture/
- These facts will be paraphrased and labeled as company-reported context; no claim will imply that a learner should copy the same scale or architecture.

## Additional primary case sources

- Stripe Engineering, “Designing robust and predictable APIs with idempotency” (2017): networks and distributed calls can fail after work may already have happened; idempotency keys make retries safe by letting the server recognize the same operation. The article also discusses exponential backoff and the thundering herd problem. Source: https://stripe.com/blog/idempotency
- Netflix TechBlog, “Introducing Hystrix for Resilience Engineering” (2012): Hystrix was designed to control interactions between distributed services and increase tolerance of latency and failure. Teaching angle: when a dependency degrades, isolate the call and provide a bounded fallback instead of allowing a cascade. Search source: https://techblog.netflix.com/2012/11/hystrix.html
