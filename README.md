# Undocumented

Delegate the task, not the judgment.

Undocumented adalah kurikulum software engineering untuk developer baru dan vibe coder. AI menulis kodenya, dan kamu memutuskan apakah kode itu aman dirilis. Situs ini melatih keputusan kedua.

Isinya 214 konsep dalam 25 chapter. Tiap konsep punya ringkasan, contoh, studi kasus, dan kuis. Beberapa punya contoh kode yang bisa kamu jalankan dan kasus perusahaan nyata.

## Menjalankan

```bash
pnpm install
pnpm dev      # server lokal
pnpm check    # type-check
pnpm build    # build production
```

## Struktur

- `client/src/lib/curriculum.ts`: konten semua konsep
- `client/src/lib/syllabus.ts`: empat tahap belajar dan konsep di tiap tahap
- `client/src/pages/Home.tsx`: halaman utama
- `source-curriculum.txt`: sumber kurikulum
- `scripts/`: skrip Python untuk membuat dan memperbarui dataset
- `docs/`: catatan kerja

Progres belajar dan catatan diskusi tersimpan di localStorage browser masing-masing.
