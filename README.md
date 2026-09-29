# Undocumented

Delegate the task, not the judgment.

Undocumented mengajarkan cara menjadi developer yang kuat bersama AI. AI menulis kodenya. Kamu memahami sistemnya, memverifikasi hasilnya, dan memutuskan apakah kode itu aman dirilis. Situs ini melatih ketiganya.

Isinya 215 konsep dalam 25 chapter. Konsepnya membentuk huruf T: 25 chapter memberi keluasan, dan 30 konsep inti punya pembahasan mendalam. Tiap konsep punya ringkasan, contoh, studi kasus, dan kuis. Beberapa punya contoh kode yang bisa kamu jalankan dan kasus perusahaan nyata.

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
