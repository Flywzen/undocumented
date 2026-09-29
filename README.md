# Undocumented

Delegate the task, not the judgment.

Situs belajar buat developer yang mau kuat bareng AI. AI yang nulis kodenya. Kamu yang paham sistemnya, verify hasilnya, dan tanggung jawab atas apa yang masuk production.

Isinya 215 konsep di 25 chapter. Tiap konsep punya ringkasan, contoh, studi kasus, dan kuis. Sebagian punya snippet yang bisa dijalankan dan case dari perusahaan nyata. Bentuknya T: 25 chapter buat breadth, dan 30 konsep inti dibahas sampai dalam.

## Quick start

```bash
pnpm install
pnpm dev      # dev server lokal
pnpm check    # type-check
pnpm build    # build production
```

## Struktur folder

- `client/src/lib/curriculum.ts`: semua konten konsep
- `client/src/lib/syllabus.ts`: empat tahap belajar dan konsep di tiap tahap
- `client/src/pages/Home.tsx`: halaman utama
- `source-curriculum.txt`: sumber kurikulum
- `scripts/`: script Python buat generate dan update dataset
- `docs/`: catatan kerja

Progress belajar dan catatan diskusi disimpan di localStorage browser.
