// Editorial Terminal: learning systems are explicit—nodes show dependency, capstones show proof.
export type GraphNode = { id: number; label: string; x: number; y: number; level: string };
export type GraphEdge = { from: number; to: number };
export const graphNodes: GraphNode[] = [
  { id: 1, label: "First Principles", x: 70, y: 110, level: "foundation" },
  { id: 65, label: "Cost of Complexity", x: 250, y: 70, level: "working" },
  { id: 97, label: "Big O & trade-offs", x: 250, y: 155, level: "working" },
  { id: 110, label: "Contract Testing", x: 440, y: 70, level: "working" },
  { id: 153, label: "ADR", x: 440, y: 155, level: "senior" },
  { id: 112, label: "Distributed Systems", x: 630, y: 110, level: "senior" },
];
export const graphEdges: GraphEdge[] = [{ from: 1, to: 65 }, { from: 1, to: 97 }, { from: 65, to: 110 }, { from: 65, to: 153 }, { from: 97, to: 112 }, { from: 110, to: 112 }, { from: 153, to: 112 }];
export const capstones = {
  "01": { title: "Lacak satu fitur sebelum mengubahnya", brief: "Pilih satu fitur kecil di project-mu. Lacak request-nya, tulis tiga asumsi yang belum terbukti, dan tunjukkan di mana perubahan berikutnya bisa jadi mahal.", constraints: ["Tidak boleh menambah library baru", "Gunakan satu halaman design note", "Sertakan satu failure mode"], deliverable: "Satu decision note + diagram request flow + tiga acceptance criteria.", rubric: ["Masalah dan asumsi eksplisit", "Trade-off dapat dijelaskan", "Failure path tidak diabaikan"] },
  "02": { title: "Ubah service tanpa mematahkan consumer", brief: "Rancang perubahan API yang tetap bisa dipakai consumer lama dan baru. Tunjukkan test contract dan cara membatalkan rilis jika sinyalnya memburuk.", constraints: ["Consumer lama tidak boleh rusak", "Tulis satu contract test", "Definisikan observability signal"], deliverable: "API change note, test plan, dan rollback checklist.", rubric: ["Boundary jelas", "Test menangkap behavior penting", "Recovery plan realistis"] },
  "03": { title: "Rancang untuk kegagalan sebagian", brief: "Desain checkout atau booking yang tetap aman saat dependency lambat, event terkirim dua kali, atau satu region tidak bisa dipakai.", constraints: ["Jelaskan consistency yang dipilih", "Gunakan idempotency", "Definisikan p95 latency dan SLO"], deliverable: "Architecture diagram, ADR, dan failure-mode table.", rubric: ["Failure mode lengkap", "Consistency trade-off eksplisit", "Blast radius terukur"] },
  "04": { title: "Pimpin review arsitektur", brief: "Pimpin review sistem lintas tim. Pilih satu boundary yang perlu diperjelas, satu investasi reliability, dan satu hal yang sengaja tidak dibangun sekarang.", constraints: ["Gunakan data/assumption log", "Sertakan cost of delay", "Tulis follow-up review date"], deliverable: "RFC 2 halaman + decision log + roadmap 30/60/90 hari.", rubric: ["Keputusan dapat diaudit", "Prioritas terhubung ke outcome", "Ownership dan next step jelas"] },
} as const;
