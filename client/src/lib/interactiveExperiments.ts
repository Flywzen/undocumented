/* Editorial Terminal: experiments make reliability trade-offs observable through small, deterministic inputs. */
export type ExperimentEvent = { label: string; detail: string; tone: "neutral" | "signal" | "sage" };
export type TestScenario = { id: string; label: string; prompt: string; correct: boolean; explanation: string };

export const simulateCache = (requests: string[], capacity: number) => {
  const cache: string[] = [];
  const events: ExperimentEvent[] = [];
  let hits = 0;
  requests.forEach((key) => {
    if (cache.includes(key)) {
      hits += 1;
      events.push({ label: "HIT", detail: `${key} ditemukan di cache`, tone: "sage" });
      return;
    }
    events.push({ label: "MISS", detail: `${key} diambil dari source of truth`, tone: "signal" });
    cache.push(key);
    if (cache.length > capacity) cache.shift();
    events.push({ label: "STORE", detail: `cache sekarang: ${cache.join(", ") || "kosong"}`, tone: "neutral" });
  });
  return { events, hits, misses: requests.length - hits, finalCache: cache };
};

export const simulateRetry = (failuresBeforeSuccess: number, maxAttempts: number, baseDelay: number) => {
  const events: ExperimentEvent[] = [];
  const attempts = Math.min(maxAttempts, failuresBeforeSuccess + 1);
  for (let index = 1; index <= attempts; index += 1) {
    const succeeds = index > failuresBeforeSuccess;
    if (succeeds) events.push({ label: `ATTEMPT ${index}`, detail: "dependency berhasil merespons", tone: "sage" });
    else {
      events.push({ label: `ATTEMPT ${index}`, detail: "timeout / temporary failure", tone: "signal" });
      if (index < maxAttempts) events.push({ label: "BACKOFF", detail: `tunggu ${baseDelay * 2 ** (index - 1)}ms + jitter sebelum retry`, tone: "neutral" });
    }
  }
  return { events, succeeded: failuresBeforeSuccess < maxAttempts, attempts };
};

export const reliabilityTests: Record<string, TestScenario[]> = {
  Idempotency: [
    { id: "same-key", label: "Duplicate request memakai key yang sama", prompt: "Dua request pembayaran masuk dengan idempotency key checkout-42 yang sama. Apa yang harus dikembalikan?", correct: true, explanation: "Kembalikan hasil pertama. Key yang sama merepresentasikan operasi yang sama, sehingga retry tidak membuat pembayaran kedua." },
    { id: "new-key", label: "Request baru memakai key berbeda", prompt: "User benar-benar membuat pembayaran baru dan client mengirim key checkout-43. Apa yang harus terjadi?", correct: true, explanation: "Key berbeda menandakan operasi baru. Sistem boleh membuat resource baru setelah validasi normal." },
    { id: "ignore-key", label: "Server mengabaikan key", prompt: "Server mengabaikan idempotency key dan selalu membuat payment baru. Apa risikonya?", correct: false, explanation: "Retry atau double-click dapat membuat side effect ganda. Idempotency key harus disimpan dan dipakai sebagai deduplication boundary." },
  ],
  "Circuit Breaker": [
    { id: "fallback", label: "Open circuit mengembalikan fallback", prompt: "Dependency timeout berturut-turut melewati threshold. Apa respons berikutnya?", correct: true, explanation: "Buka circuit dan fail fast ke fallback agar dependency tidak makin terbebani dan latency caller tetap terkendali." },
    { id: "retry-forever", label: "Retry tanpa batas", prompt: "Circuit sudah open, tetapi setiap request tetap retry tanpa batas. Apa masalahnya?", correct: false, explanation: "Retry tanpa batas mengubah outage dependency menjadi retry storm. Circuit breaker harus membatasi call dan punya recovery policy." },
    { id: "half-open", label: "Probe saat half-open", prompt: "Setelah cooldown, sistem ingin memeriksa apakah dependency pulih. Pola apa yang tepat?", correct: true, explanation: "Gunakan satu atau sedikit probe request dalam half-open state sebelum menutup circuit kembali." },
  ],
};
