export type RealWorldCaseStudy = {
  company: string;
  title: string;
  setup: string;
  decision: string;
  consequence: string;
  takeaway: string;
  source: string;
  sourceLabel: string;
  facts: string[];
  topics: string[];
  judgmentLoop?: {
    situation: string;
    observation: string;
    hypotheses: string;
    evidence: string;
    decision: string;
    consequence: string;
  };
};

export const realWorldCaseStudies: Record<string, RealWorldCaseStudy> = {
  "Caching Strategies (cache invalidation, cache stampede, cache aside)": {
    company: "Netflix", title: "Saat traffic pindah region, cache yang dingin bisa ikut menjatuhkan database.",
    setup: "Kamu sedang melayani request dari banyak region. Ketika traffic berpindah, cache di region baru belum punya data yang sering diminta.",
    decision: "Netflix memakai EVCache dan replikasi global untuk membuat data non-kritis tersedia lebih dekat ke request. Mereka menerima eventual consistency karena rekomendasi dan viewing history tidak selalu butuh strong consistency.",
    consequence: "Pada peak yang dilaporkan Netflix, EVCache menangani lebih dari 30 juta request per detik, menyimpan ratusan miliar object, dan mendekati 2 triliun request per hari secara global. Angka ini bukan target aplikasi kecil; pelajarannya adalah cache perlu keputusan freshness, replication, dan failure mode.",
    takeaway: "Sebelum menambah cache, jawab: data boleh stale berapa lama, siapa yang mengisi ulang, dan apa yang terjadi ketika semua key miss bersamaan?",
    source: "https://netflixtechblog.com/caching-for-a-global-netflix-7bcc457012f1", sourceLabel: "Netflix TechBlog · Caching for a Global Netflix", facts: ["30M+ request/s pada peak yang dilaporkan", "Ratusan miliar object", "~2T request/hari secara global"], topics: ["Caching", "Scaling"],
    judgmentLoop: { situation: "Traffic berpindah region dan request tetap masuk, tetapi cache di region baru belum berisi key yang sering diminta.", observation: "Masalahnya bukan sekadar database lambat: cache miss serentak dapat memindahkan beban ke origin tepat saat traffic sedang berubah.", hypotheses: "Kemungkinan penyebabnya mencakup cache yang dingin, replication yang tertinggal, freshness yang terlalu ketat, atau strategi pengisian ulang yang tidak punya guardrail.", evidence: "Lihat cache hit ratio per region, origin load, latency miss, pola key, dan timing perpindahan traffic sebelum memilih intervensi.", decision: "Netflix memakai EVCache dan replikasi global untuk mendekatkan data non-kritis ke request, dengan menerima eventual consistency untuk use case tertentu.", consequence: "Keputusan itu menurunkan ketergantungan pada origin, tetapi memperkenalkan trade-off freshness, replication cost, invalidation, dan failure mode baru." }
  },
  "Domain-Oriented Microservice Architecture": {
    company: "Uber", title: "Banyak service tidak otomatis membuat sistem lebih mudah dipahami.",
    setup: "Kamu menambah service karena domain dan tim bertambah. Beberapa bulan kemudian, satu perubahan harus melewati banyak owner dan dependency yang tidak jelas.",
    decision: "Uber merangkum service ke dalam domain, layer, dan gateway untuk mengurangi dependency cascade serta memperjelas ownership. Extension point dipakai agar tim bisa menambah kemampuan tanpa mengubah core service.",
    consequence: "Boundary menjadi alat untuk mengurangi blast radius dan biaya koordinasi, bukan sekadar folder atau endpoint baru. Microservices tetap punya biaya network call, observability, migration, dan operasional.",
    takeaway: "Sebelum memecah service, gambar dependency dan ownership-nya. Kalau kamu tidak bisa menjelaskan siapa yang boleh mengubah apa, boundary baru hanya memindahkan kebingungan.",
    source: "https://www.uber.com/us/en/blog/microservice-architecture/", sourceLabel: "Uber Engineering · Domain-Oriented Microservice Architecture", facts: ["Domain menjadi unit pengelompokan dan ownership", "Gateway membantu membatasi dependency", "Extension point mengurangi perubahan pada core service"], topics: ["Scaling", "Architecture"]
  },
  "Idempotency": {
    company: "Stripe", title: "Request bisa timeout setelah server melakukan pekerjaannya.",
    setup: "User menekan tombol bayar. Client tidak mendapat response karena koneksi putus. User mencoba lagi, padahal server mungkin sudah membuat charge pertama.",
    decision: "Stripe menggunakan idempotency key agar retry untuk operasi yang sama bisa dikenali sebagai operasi yang sama. Client boleh mencoba lagi tanpa mengandalkan asumsi bahwa timeout berarti pekerjaan belum terjadi.",
    consequence: "Safety dipindahkan dari harapan client ke invariant server: satu operasi bisnis tidak boleh menghasilkan side effect ganda. Key, parameter conflict, result storage, dan expiry tetap harus dirancang.",
    takeaway: "Untuk operasi yang punya side effect, jangan hanya bertanya 'bagaimana retry-nya?'. Tanya juga 'apa identitas operasi ini, dan bagaimana server membuktikan ia sudah pernah dikerjakan?'",
    source: "https://stripe.com/blog/idempotency", sourceLabel: "Stripe Engineering · Designing robust and predictable APIs with idempotency", facts: ["Idempotency key mengikat retry ke operasi yang sama", "Timeout tidak membuktikan server belum bekerja", "Exponential backoff membantu menghindari herd saat retry"], topics: ["Resilience", "APIs"]
  },
  "Circuit Breaker": {
    company: "Netflix", title: "Dependency lambat bisa menghabiskan thread sebelum benar-benar error.",
    setup: "Service rekomendasi mulai lambat. Service utama terus menunggu dan retry. Akhirnya request yang sebenarnya sehat ikut antre sampai timeout.",
    decision: "Netflix memperkenalkan Hystrix untuk mengisolasi interaksi antar distributed service, mengontrol latency, dan menyediakan fallback ketika dependency gagal.",
    consequence: "Circuit breaker membatasi blast radius, tetapi threshold yang salah bisa terlalu cepat menolak traffic sehat atau terlalu lambat memutus cascade. State open, half-open, dan fallback perlu diamati, bukan dianggap magic.",
    takeaway: "Circuit breaker bukan cara membuat dependency selalu sehat. Ia adalah keputusan untuk berhenti menunggu sebelum satu dependency menjatuhkan seluruh request path.",
    source: "https://techblog.netflix.com/2012/11/hystrix.html", sourceLabel: "Netflix TechBlog · Introducing Hystrix for Resilience Engineering", facts: ["Mengisolasi akses ke remote systems", "Mengontrol latency dan failure interaction", "Fallback harus punya behavior yang bisa diterima"], topics: ["Resilience", "Distributed Systems"]
  },
  "Event-Driven Architecture": {
    company: "Uber", title: "Menghitung event dua kali bisa berubah menjadi masalah uang.",
    setup: "Kamu memproses impression dan click untuk iklan. Event bisa datang terlambat, terkirim ulang, atau diproses oleh consumer yang restart.",
    decision: "Uber membangun near-real-time exactly-once ad event processing dengan Apache Flink, Kafka, Pinot, dan Hive. Sistemnya dirancang untuk menjaga speed, reliability, dan accuracy karena event memengaruhi reporting serta revenue.",
    consequence: "Exactly-once bukan slogan di ujung pipeline; ia muncul dari kombinasi source, checkpoint, sink, deduplication, dan aturan bisnis. Event-driven system menukar coupling langsung dengan ordering, duplicate, replay, dan debugging lintas waktu.",
    takeaway: "Saat mendesain event, tulis dulu: event ini fakta atau command, boleh diproses ulang atau tidak, dan apa kerugian jika dihitung dua kali?",
    source: "https://www.uber.com/us/en/blog/real-time-exactly-once-ad-event-processing/", sourceLabel: "Uber Engineering · Exactly-Once Ad Event Processing", facts: ["Near-real-time processing untuk impression dan click", "Flink + Kafka + Pinot + Hive", "Double counting dapat mengubah billing dan reporting"], topics: ["Scaling", "Distributed Systems"]
  },
  "Online Schema Change (Meta)": {
    company: "Meta", title: "Mengubah schema tanpa menghentikan traffic tetap butuh bukti, bukan keberanian.",
    setup: "Tabel MySQL besar harus berubah ketika traffic tetap berjalan. DDL yang memblokir dapat mengubah migration kecil menjadi downtime produksi.",
    decision: "Meta mengembangkan OnlineSchemaChange, lalu membangunnya ulang dalam Python dengan data consistency check, integrasi yang lebih dalam, dan testing yang lebih komprehensif.",
    consequence: "Schema change menjadi rollout operasional yang bisa diuji dan dilindungi dari edge case, bukan sekadar statement DDL. Trade-off-nya adalah tooling, monitoring, copy/sync work, dan validasi tambahan.",
    takeaway: "Migration yang aman bukan migration yang tidak pernah gagal; ia migration yang bisa mendeteksi inkonsistensi sebelum perubahan merusak data atau memblokir sistem.",
    source: "https://engineering.fb.com/2017/05/05/production-engineering/onlineschemachange-rebuilt-in-python/", sourceLabel: "Engineering at Meta · OnlineSchemaChange rebuilt in Python", facts: ["OnlineSchemaChange pertama kali open-sourced pada 2010", "Data consistency check untuk mencegah data loss/corruption", "Python rewrite menekankan testability dan reliability"], topics: ["Database Migration", "Reliability"]
  },
  "Spanner Schema Migration (Google)": {
    company: "Google", title: "Migrasi schema bukan konversi sekali klik; ia rangkaian keputusan kecil yang bisa divalidasi.",
    setup: "Schema database sumber perlu dipindahkan ke Spanner, tetapi type mapping, primary key, index, dan fitur vendor tidak otomatis kompatibel.",
    decision: "Google merekomendasikan extraction, initial conversion, review manual, staging deployment, iterative testing dengan sample data, schema validation, lalu final production deployment.",
    consequence: "Risiko perubahan besar dipecah menjadi langkah yang lebih kecil dan dapat diuji. Konsekuensinya, migration membutuhkan analisis manual, refactor aplikasi, pengujian representative, dan fallback/cutover planning.",
    takeaway: "Kalau migration tool menghasilkan schema yang tampak benar, pekerjaanmu belum selesai: uji semantics, workload, index behavior, dan incompatibility yang tidak bisa diterjemahkan otomatis.",
    source: "https://docs.cloud.google.com/spanner/docs/schema-migration", sourceLabel: "Google Cloud Documentation · Migrate your schema", facts: ["Menggabungkan automated tooling dengan manual refinement", "Menguji schema dengan representative application interactions", "Final deployment dilakukan setelah validation"], topics: ["Database Migration", "Scaling"]
  },
  "Control Plane Backpressure (Amazon)": {
    company: "Amazon", title: "Fleet yang lebih besar tidak boleh menentukan seberapa cepat service kecil bekerja.",
    setup: "Dalam arsitektur data plane dan control plane, fleet besar dapat mengirim request berkorelasi setelah outage, bug, atau retry, lalu membanjiri fleet control plane yang lebih kecil.",
    decision: "Amazon membahas load shedding, request tuning, backoff dan jitter, static stability melalui S3, serta membalik arah kontrol agar service kecil mengatur pace pekerjaan.",
    consequence: "Sistem dapat terus membuat progress pada laju lebih lambat, alih-alih jatuh ke overload. Trade-off-nya adalah inventory, connection management, assignment, latency propagation, dan kompleksitas koordinasi.",
    takeaway: "Backpressure bukan cuma menambah queue. Tentukan siapa yang mengontrol rate kerja, kapan load harus ditolak, dan bagaimana sistem tetap membuat progress saat kapasitas turun.",
    source: "https://builder.aws.com/content/3EukISjbJAGNdrxjKaN6RG0wlHG/avoiding-overload-in-distributed-systems-by-putting-the-smaller-service-in-control", sourceLabel: "AWS Builder Center · Avoiding overload in distributed systems", facts: ["Data plane dapat melebihi control plane 100x atau lebih", "Retry dan recovery dapat memicu correlated overload", "Load shedding, jitter, dan pace control menjaga progress"], topics: ["Backpressure", "Scaling", "Resilience"]
  }
};
