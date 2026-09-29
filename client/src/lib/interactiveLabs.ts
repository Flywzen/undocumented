/* Editorial Terminal: interactive labs expose state transitions, not decorative animation. */
export type LabStep = { label: string; detail: string; signal: string; state: string };
export const interactiveLabs: Record<string, LabStep[]> = {
  "Caching Strategies (cache invalidation, cache stampede, cache aside)": [
    { label: "1 / Cache miss", detail: "Request datang, tetapi key user:1 belum ada di cache.", signal: "GET user:1", state: "miss" },
    { label: "2 / Fetch source", detail: "Aplikasi mengambil data dari database sebagai source of truth.", signal: "DB → user:1", state: "fetch" },
    { label: "3 / Store result", detail: "Hasil disimpan ke cache agar request berikutnya tidak mengulang query.", signal: "cache.set(user:1)", state: "store" },
    { label: "4 / Cache hit", detail: "Request berikutnya mendapat data dari cache dengan latency lebih rendah.", signal: "CACHE → response", state: "hit" },
    { label: "5 / Invalidate", detail: "Saat data berubah, entry lama harus dihapus atau diberi versi baru.", signal: "invalidate(user:1)", state: "invalidate" },
  ],
  "Retry Storm": [
    { label: "1 / First attempt", detail: "Call pertama gagal karena dependency sedang timeout.", signal: "attempt 1 · timeout", state: "fail" },
    { label: "2 / Backoff", detail: "Client menunggu sebentar sebelum mencoba lagi, bukan langsung membanjiri dependency.", signal: "wait 100ms + jitter", state: "backoff" },
    { label: "3 / Second attempt", detail: "Call kedua masih gagal, tetapi traffic sudah diberi jarak.", signal: "attempt 2 · timeout", state: "fail" },
    { label: "4 / Guardrail", detail: "Batas attempt mencegah satu request berubah menjadi storm lintas layer.", signal: "max attempts = 3", state: "guard" },
    { label: "5 / Recovery", detail: "Call berikutnya berhasil; jika tidak, kembalikan fallback yang jujur.", signal: "attempt 3 · success", state: "success" },
  ],
};
