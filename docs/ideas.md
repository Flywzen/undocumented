# The Missing Curriculum — Design Direction

## Tiga pendekatan awal

### Theme Name: Editorial Terminal
Very Brief Intro: Majalah engineering yang bertemu workstation developer: kertas hangat, tinta hitam, aksen sinyal oranye, dan struktur navigasi seperti handbook internal yang bisa dipindai cepat.
Probability: 0.06

### Theme Name: Quiet Systems
Very Brief Intro: Antarmuka tenang dengan slate gelap, biru kapur, dan diagram tipis; terasa seperti ruang belajar pribadi untuk memahami sistem kompleks tanpa distraksi.
Probability: 0.04

### Theme Name: Workshop Index
Very Brief Intro: Visual tool-room yang taktis—label, index card, dan garis pengukuran—membingkai fundamental software engineering sebagai alat kerja yang bisa langsung dipakai.
Probability: 0.08

## Pendekatan terpilih: Editorial Terminal

### Design Movement
Swiss editorial modernism bertemu dokumentasi internal engineering dan terminal tooling. Website terasa seperti handbook yang dirancang editor berpengalaman, bukan landing page SaaS.

### Core Principles
1. **Scan before deep-dive.** Setiap layar memberi orientasi, status belajar, dan jalan masuk yang jelas sebelum detail.
2. **Content is the interface.** Typography, index, taxonomy, dan callout menjadi visual utama; dekorasi hanya membantu pemahaman.
3. **Sharp utility, warm surface.** Struktur presisi dan sedikit utilitarian, tetapi warna kertas dan tekstur halus membuatnya terasa manusiawi.
4. **Judgment over jargon.** Copy selalu menghubungkan konsep ke keputusan nyata, bukan sekadar definisi.

### Color Philosophy
Basisnya warm paper `#F3F0E8` dan ink `#18211F`, supaya materi panjang terasa seperti handbook yang nyaman dibaca. Signal orange `#E35D2F` menjadi warna milik brand untuk menandai tindakan, insight, dan momen “oh, ternyata”. Muted sage `#A9B7A5` dan graphite `#66706B` memberi ruang bagi metadata tanpa mengalahkan konten.

### Layout Paradigm
Asymmetric editorial canvas: rail indeks tipis di kiri, content column yang lebih lebar di tengah, dan annotation rail di kanan pada desktop. Hero tidak dipusatkan; headline mengunci kiri sementara “curriculum map” membentuk bidang diagonal ringan di kanan. Pada mobile, rail berubah menjadi compact chapter navigator yang sticky.

### Signature Elements
- **Curriculum rail:** nomor bab besar dengan garis vertikal seperti daftar isi buku teknis.
- **Signal tags:** label kecil uppercase dengan accent bar untuk “WHY IT MATTERS”, “WATCH OUT”, dan “TRY THIS”.
- **Annotated system cards:** kartu konsep memakai garis ukur, nomor konsep, dan mini-diagram berbasis CSS.

### Interaction Philosophy
Interaksi terasa seperti membuka handbook: hover menggeser kartu sedikit dan menyalakan garis accent, filter chapter memotong indeks secara instan, dan “Mark as understood” memberi perubahan status yang tenang. Tidak ada gamifikasi berisik; progres adalah bukti konsistensi, bukan skor.

### Animation
Gunakan entrance reveal pendek 180–260ms dengan `cubic-bezier(0.23, 1, 0.32, 1)`, stagger 40ms untuk kartu konsep, dan transform/opacity saja. Rail aktif bergerak dengan underline atau bar 2px, bukan bouncing. Hover kartu: translateY(-3px), shadow bertambah sedikit. Semua motion non-esensial dimatikan pada `prefers-reduced-motion`.

### Typography System
Display: **DM Serif Display** untuk headline besar yang terasa editorial dan memorable. UI/body: **IBM Plex Sans** untuk navigasi, metadata, dan paragraf yang teknis. Mono: **IBM Plex Mono** untuk nomor bab, kode, dan istilah konseptual. Hierarchy: H1 64–88px desktop dengan line-height 0.94; H2 34–44px; body 17px / 1.6; metadata 11px uppercase dengan letter-spacing 0.12em.

### Brand Essence
Kurikulum praktis untuk vibe coder yang ingin naik level menjadi software engineer yang bisa menjelaskan keputusan, menjaga sistem, dan bekerja di tim nyata. Personality: **tajam, rendah hati, membumi**.

### Brand Voice
Headline terdengar seperti senior engineer yang tidak menggurui: pendek, spesifik, dan sedikit menantang. CTA terdengar seperti ajakan bekerja, bukan promosi.

Contoh lines:
- “Kode bisa jalan. Sekarang pahami kenapa.”
- “Mulai dari konsep yang paling sering menyelamatkanmu di production.”

### Wordmark & Logo
Wordmark memakai logotype serif display dengan potongan kecil pada huruf “M” sebagai motif missing piece. Mark-nya adalah kurung siku terbuka yang membentuk anak tangga tiga tingkat—simbol fondasi yang belum lengkap dan proses menyusun ulang pemahaman.

### Signature Brand Color
**Signal Orange `#E35D2F`** — warna peringatan yang bersahabat: cukup kuat untuk mengarahkan mata, tetapi tidak terasa seperti error state.

## Content structure
Website awal memprioritaskan pengalaman “mulai sekarang”: hero dengan positioning, curriculum map enam chapter inti, “Start here” track untuk pemula, searchable concept index, dan detail konsep dalam drawer/modal agar pengguna tidak kehilangan konteks. Materi diringkas dari PDF sumber dan diberi contoh praktis untuk developer yang terbiasa mengandalkan AI tanpa memahami trade-off.

## Style Decisions
- Jangan gunakan purple gradient, UI SaaS generik, atau layout hero yang seluruhnya centered.
- Setiap konsep harus menjawab: apa ini, kenapa penting, contoh di kerja nyata, dan jebakan yang umum.
- Gunakan generated imagery hanya untuk hero visual; kartu konsep tetap dominan tipografi dan diagram ringan agar konten tetap menjadi pusat.

## Style Decisions

- Wordmark utama memakai suara serif editorial dan motif missing-piece; mono hanya untuk metadata.
- Setiap concept card wajib memiliki setidaknya satu sinyal teknis yang terlihat: nomor konsep, garis ukur, mini-diagram, atau uppercase signal tag.
- Signal Orange `#E35D2F` dipakai secara disiplin untuk insight, action, dan orientation moments—bukan dekorasi acak.
- Curriculum rail diperkuat sebagai penanda perjalanan pengguna melalui field guide, termasuk margin index ticks dan active orientation.

## Style Decisions

- Copy tetap lugas dan berbasis situasi; tidak kembali ke slogan learning-platform generik.
- Curriculum rail menjadi orientasi wajib di landing dan path pages: nomor chapter, tick vertikal, dan marker stage harus terasa sebagai sistem navigasi.
- Concept index diperlakukan sebagai technical index, bukan kumpulan kartu seragam: setiap card mempertahankan ID, line measurement, signal tag, dan motif diagram kecil.
- Wordmark serif dan bracket-stair mark diperlakukan sebagai identitas navigasi yang berulang, bukan sekadar logo header.
