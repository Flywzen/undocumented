# Full Curriculum Expansion Checklist

## Software Engineering Hero Visual

- [x] Buat brief hero visual yang lebih dekat dengan software engineering dan system thinking.
- [x] Generate asset dengan safe area yang cocok untuk parallax/crop hero.
- [x] Upload dan ganti asset di homepage tanpa mengubah copy atau CTA.
- [x] Verifikasi contrast, desktop/mobile crop, parallax, typecheck, dan build.
- [x] Simpan checkpoint visual terbaru.


## Case Empty State and Load More

- [x] Buat empty state No results found yang menjelaskan filter aktif.
- [x] Tambahkan action reset filter dan saran memperluas pencarian.
- [x] Tambahkan tombol Load more di bawah daftar case.
- [x] Pastikan Load more punya perilaku aman saat semua case sudah tampil.
- [x] Verifikasi desktop/mobile, filter states, typecheck, build, dan checkpoint.


## Real-World Case Filter Motion

- [x] Tambahkan transisi fade/slide ringan pada hasil filter case.
- [x] Pastikan perubahan kategori tetap terasa instant dan tidak menahan input.
- [x] Hindari animasi width/height/layout; gunakan opacity dan transform.
- [x] Hormati prefers-reduced-motion dan cek empty state.
- [x] Verifikasi typecheck, build, responsive preview, dan simpan checkpoint.


## Instant Theme Switch and Icon Motion

- [x] Hilangkan global theme transition yang menyebabkan repaint terasa berat.
- [x] Tambahkan animasi singkat hanya pada ikon sun/moon.
- [x] Pastikan toggle tetap instant dan tidak mengubah layout.
- [x] Hormati prefers-reduced-motion dan keyboard focus.
- [x] Verifikasi typecheck, build, preview, lalu simpan checkpoint.


## Fast Theme Switching

- [x] Identifikasi selector/property transition yang membuat switch terasa berat.
- [x] Kurangi durasi dan scope transition tanpa menghilangkan feedback visual.
- [x] Hindari transition pada layout, transform, shadow besar, atau elemen berulang.
- [x] Pertahankan reduced-motion fallback dan theme persistence.
- [x] Verifikasi switch light/dark, typecheck, build, dan preview.
- [x] Simpan checkpoint optimasi.


## Three New Source-Backed Cases and Topic Filters

- [x] Research one credible Meta, Google, and Amazon case focused on migration/backpressure.
- [x] Save source URLs and verified facts before writing case copy.
- [x] Add topic metadata to all 8 cases and derive technical category filters.
- [x] Add 3 new case records and connect them to concept modals.
- [x] Verify filter behavior, hover CTA, modal content, and responsive preview.
- [x] Save a new checkpoint with the latest website preview.


## Real-World Case Coverage Audit

- [ ] Hitung total case studies dari dataset source existing.
- [ ] Kelompokkan case berdasarkan company, concept, dan topic.
- [ ] Bedakan total case curriculum dari jumlah preview homepage.
- [ ] Identifikasi gap topik yang paling bernilai untuk ditambah.
- [ ] Berikan rekomendasi expansion yang source-backed, bukan sekadar menambah kuantitas.


## Start with a Case CTA Hover

- [x] Petakan markup CTA hero dan style underline existing.
- [x] Tambahkan hover/focus treatment pada label, garis signal, dan icon.
- [x] Pastikan hit target dan keyboard focus tetap jelas.
- [x] Hormati prefers-reduced-motion dan cek mobile touch behavior.
- [x] Verifikasi typecheck, build, preview, dan simpan checkpoint.


## Hero Headline Alignment

- [x] Audit hubungan kicker “Code is becoming cheap...” dengan headline besar.
- [x] Pilih headline yang langsung menyambung ke overlooked engineering knowledge.
- [x] Pertahankan tone inclusive dan tidak merendahkan cara belajar user.
- [x] Sesuaikan supporting copy/CTA jika diperlukan agar hero terasa satu narasi.
- [x] Verifikasi wrapping desktop/mobile, typecheck, build, dan simpan checkpoint.


## Initial Skeleton Loading

- [x] Tambahkan loading state awal untuk struktur homepage utama.
- [x] Gunakan skeleton Editorial Terminal yang ringan, bukan spinner blocking.
- [x] Tambahkan reveal/fade transition setelah loading singkat selesai.
- [x] Pastikan loading state tidak mengganggu theme, parallax, atau interaksi existing.
- [x] Hormati prefers-reduced-motion dan verifikasi desktop/mobile.
- [x] Jalankan typecheck/build dan simpan checkpoint.


## Subtle Parallax Scrolling

- [x] Pilih hero visual dan layer editorial yang aman diberi parallax.
- [x] Implementasikan scroll motion ringan tanpa mengubah layout flow.
- [x] Gunakan requestAnimationFrame atau transform-only updates agar performan.
- [x] Nonaktifkan parallax untuk prefers-reduced-motion dan mobile bila perlu.
- [x] Verifikasi typecheck, build, desktop/mobile preview, lalu simpan checkpoint.


## Theme Transition and Notes Export

- [x] Tambahkan transisi warna/background/border yang halus saat theme berubah.
- [x] Hormati prefers-reduced-motion dan hindari animasi layout-heavy.
- [x] Tambahkan Export control di Local notes.
- [x] Sediakan download teks yang berisi metadata dan seluruh notes.
- [x] Sediakan opsi PDF browser-safe atau jelaskan fallback jika unavailable.
- [x] Verifikasi download action, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint implementasi terbaru.


## Dark Mode and Netflix Discussion

- [x] Aktifkan ThemeProvider switchable dan tambahkan toggle dark/light.
- [x] Definisikan dark palette Editorial Terminal dengan kontras teks yang aman.
- [x] Persist theme preference dan hormati system preference saat belum ada pilihan.
- [x] Tambahkan discussion section di bawah Netflix judgment case.
- [x] Simpan komentar secara lokal dan jelaskan bahwa belum multi-user.
- [x] Tambahkan validasi form, empty state, dan delete/reset yang aman.
- [x] Verifikasi typecheck, build, desktop/mobile, dan dark/light preview.
- [x] Simpan checkpoint implementasi terbaru.


## Judgment Question and Case Demonstration

- [x] Tambahkan motion editorial yang menonjolkan “What would change your mind?”.
- [x] Hormati prefers-reduced-motion dan keyboard focus pada interactive emphasis.
- [x] Pilih satu real-world case existing yang paling kuat untuk loop judgment.
- [x] Tampilkan Situation, Observation, Hypotheses, Evidence, Decision, Consequence pada case tersebut.
- [x] Sertakan source dan jangan membuat metrik atau cerita fiktif.
- [x] Verifikasi typecheck, build, responsive preview, lalu simpan checkpoint.


## Apply Pasted Content

- [x] Baca dan ringkas isi pasted_content.txt.
- [x] Tentukan file dan fitur project yang terdampak.
- [x] Terapkan isi attachment tanpa menghapus fitur existing yang tidak terkait.
- [x] Verifikasi typecheck, build, dan preview perubahan.
- [x] Simpan checkpoint implementasi terbaru.


## Related Cases in Concept Modal

- [x] Petakan case existing berdasarkan chapter/topic dan hindari merekomendasikan case yang sedang dibuka.
- [x] Tambahkan section “Kasus Terkait” di bagian bawah modal.
- [x] Tampilkan alasan singkat kenapa case direkomendasikan.
- [x] Pastikan card terkait membuka modal case lain dengan state yang bersih.
- [x] Verifikasi keyboard, mobile, typecheck, build, dan preview.
- [x] Simpan checkpoint setelah fitur selesai.


## Real-World Case Filters and Modal Motion

- [x] Tambahkan state search case dan filter company/topic.
- [x] Tampilkan hasil filter dan empty state yang jelas di section real-world cases.
- [x] Pastikan case card tetap membuka konsep serta source-backed detail existing.
- [x] Tambahkan animasi open/close modal yang halus dan tidak layout-heavy.
- [x] Pastikan Escape, backdrop, focus, mobile, dan prefers-reduced-motion tetap aman.
- [x] Verifikasi typecheck, build, responsive preview, dan simpan checkpoint.


## Overlooked Parts Tooltip and Case Preview

- [x] Petakan real-world case studies yang sudah ada di dataset tanpa membuat cerita atau metrik baru.
- [x] Tambahkan hover dan keyboard-focus tooltip pada label “The overlooked parts”.
- [x] Buat section preview real-world cases di bawah concept index.
- [x] Hubungkan setiap preview ke concept modal/detail yang sesuai.
- [x] Pastikan mobile touch, keyboard, dan screen reader tetap usable.
- [x] Verifikasi typecheck, build, responsive preview, lalu simpan checkpoint.


## Experience-Gap Concept Index Rewrite

- [x] Ganti heading “Cari satu. Uji sampai jelas.” dengan framing knowledge yang biasanya muncul lewat pengalaman.
- [x] Tulis subcopy yang menjelaskan jarak antara docs/tutorial dan real work.
- [x] Pertahankan nada inclusive: pengalaman adalah konteks yang sedang dibangun, bukan syarat masuk.
- [x] Audit label index dan CTA agar tidak kembali menjadi slogan generik.
- [x] Verifikasi typecheck, build, responsive preview, dan simpan checkpoint.


## Inclusive Unpopular-Knowledge Positioning

- [x] Ganti framing hero agar tidak menyiratkan vibe coding sebagai kekurangan.
- [x] Tekankan bagian engineering yang jarang masuk tutorial atau roadmap.
- [x] Rewrite section heading dan supporting copy dengan nada inclusive.
- [x] Sesuaikan CTA agar mengundang eksplorasi, bukan mengoreksi user.
- [x] Audit stage/curriculum copy dari bahasa gatekeeping atau menghakimi.
- [x] Verifikasi tone, wrapping, typecheck, build, dan preview.
- [x] Simpan checkpoint positioning terbaru.


## Headline and CTA Refinement

- [x] Ganti hero headline dengan wording yang terdengar seperti percakapan engineer.
- [x] Ganti CTA hero dengan ajakan yang jelas dan tidak generik.
- [x] Ganti CTA stage guide dengan wording yang menjelaskan tindakan berikutnya.
- [x] Audit CTA dan label English lain agar tidak terasa seperti terjemahan literal.
- [x] Verifikasi wrapping desktop/mobile, typecheck, build, dan preview.
- [x] Simpan checkpoint versi headline/CTA terbaru.


## Natural Headline Rewrite

- [x] Ganti hero headline dengan pertanyaan/dialog yang natural.
- [x] Ganti section heading “Not a roadmap” dengan framing production yang lebih spesifik.
- [x] Audit stage titles, CTA, labels, dan copy bilingual lain yang masih literal.
- [x] Pertahankan Bahasa Indonesia bila English tidak terdengar alami.
- [x] Verifikasi tone, hierarchy, mobile wrapping, typecheck, build, dan preview.
- [x] Simpan checkpoint headline baru.


## Selective Bilingual Copy

- [x] Tetapkan pembagian English untuk headline/technical labels/CTA dan Bahasa Indonesia untuk penjelasan kontekstual.
- [x] Rewrite hero headline, navigation, section labels, dan CTA yang terasa lebih natural dalam English.
- [x] Sesuaikan modal, quiz, capstone, dan feedback agar terminology konsisten bilingual.
- [x] Hindari terjemahan literal pada istilah engineering dan pertahankan istilah industri yang umum dipakai.
- [x] Verifikasi tone, readability, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi bilingual.


## Dialogic Case Studies and Concept Detail UX

- [x] Pilih lima konsep teknis utama dan hubungkan ke case industri nyata bersumber.
- [x] Tulis ulang framing case dengan subjek langsung: “kamu”, “fiturmu”, dan “sistemmu”.
- [x] Tambahkan section Real-world Case Study pada detail lima konsep.
- [x] Pisahkan situasi, keputusan, konsekuensi, dan latihan dengan tab/accordion.
- [x] Tambahkan widget “Was this helpful?” di akhir setiap materi konsep.
- [x] Simpan feedback lokal tanpa mengklaim sebagai agregasi global.
- [x] Verifikasi keyboard access, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi case study terbaru.


## Copy Rewrite and Reference Study

- [x] Kaji beberapa referensi primer/otoritatif untuk gaya penjelasan engineering.
- [x] Simpan URL dan temuan riset ke catatan proyek.
- [x] Tetapkan voice baru: spesifik, lugas, tidak motivasional generik.
- [x] Rewrite hero, navigation labels, learning path, index, modal, quiz, capstone, dan footer.
- [x] Hilangkan atau ganti copy yang terdengar seperti template AI.
- [x] Verifikasi tone, hierarchy, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi copy baru.


## Parameterized Labs and Reliability Tests

- [x] Tambahkan input cache size/TTL dan request sequence pada lab Caching.
- [x] Tambahkan input max attempts, base delay, dan failure count pada lab Retry.
- [x] Tampilkan hasil eksperimen dan state transition berdasarkan parameter.
- [x] Buat test case Idempotency untuk duplicate request dan key berbeda.
- [x] Buat test case Circuit Breaker untuk threshold failure, fallback, dan recovery.
- [x] Tambahkan feedback benar/salah dengan penjelasan engineering.
- [x] Verifikasi keyboard access, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi lab interaktif terbaru.


## Browser Playground and Interactive Labs

- [x] Tambahkan JavaScript/TypeScript pair untuk setiap code lab.
- [x] Tambahkan tombol Run in browser dengan sandbox execution dan output panel.
- [x] Tambahkan toggle bahasa JavaScript/TypeScript per lab.
- [x] Buat lab Caching dengan visualisasi cache miss, fetch, cache hit, dan invalidation.
- [x] Buat lab Retry dengan visualisasi attempt, backoff, jitter, dan success/failure.
- [x] Pastikan TypeScript hanya menjadi mode pembelajaran dan tidak dieksekusi mentah di browser.
- [x] Verifikasi sandbox safety, keyboard access, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi playground terbaru.


## Runnable Code Labs

- [x] Tambahkan runnable example untuk 8 konsep teknis prioritas.
- [x] Sertakan language, command, dan instruksi run yang jelas.
- [x] Tambahkan tombol copy code di modal konsep.
- [x] Tandai code lab hanya pada konsep yang memang teknis dan relevan.
- [x] Validasi syntax/example output, rendering, typecheck, build, dan preview.
- [x] Simpan checkpoint versi code lab terbaru.


## Focused Learning Path and Core Deep-Dives

- [x] Pilih dan tandai 30 konsep inti berdasarkan fondasi, frekuensi aplikasi, dan urutan belajar.
- [x] Tambahkan struktur deep-dive: mental model, kapan dipakai, contoh, trade-off, pitfall, dan latihan.
- [x] Tampilkan label "Core 30" di index dan prioritaskan dalam learning path.
- [x] Perjelas CTA, urutan, status, dan next step pada alur belajar utama.
- [x] Pastikan satu capstone sederhana tersedia di setiap stage.
- [x] Hilangkan elemen gamifikasi berlebihan dari alur capstone.
- [x] Verifikasi konten, typecheck, build, responsive preview, dan navigasi.
- [x] Simpan checkpoint versi learning path fokus.


## MVP Simplification

- [x] Pertahankan search/filter, detail case, quiz, technical examples, learning path, dan progress dasar.
- [x] Sembunyikan prerequisite graph dari homepage agar fokus belajar lebih jelas.
- [x] Sembunyikan badge collection, share card, dan celebration overlay dari MVP utama.
- [x] Sederhanakan overall progress menjadi ringkasan konsep/capstone tanpa tooltip kompleks.
- [x] Pastikan modal case, quiz, dan navigasi stage tetap mudah ditemukan.
- [x] Verifikasi typecheck, build, responsive preview, dan tidak ada dead end.
- [x] Simpan checkpoint versi MVP fokus.


## Animated Overall Progress and Remaining Work Tooltip

- [x] Tambahkan animasi transisi progress bar saat nilai berubah.
- [x] Tambahkan tooltip/focus detail jumlah konsep dan capstone yang tersisa.
- [x] Tampilkan breakdown sisa pekerjaan per stage secara ringkas.
- [x] Pastikan tooltip dapat diakses via keyboard dan tidak mengganggu mobile layout.
- [x] Verifikasi typecheck, build, animation, tooltip, dan preview.
- [x] Simpan checkpoint versi terbaru.


## Achievement Collection and Overall Progress

- [x] Buat formula progress keseluruhan dari konsep dan capstone.
- [x] Tampilkan progress keseluruhan di homepage dengan breakdown yang jelas.
- [x] Buat halaman/section koleksi empat badge dengan status locked/unlocked.
- [x] Tambahkan share card badge dengan native share dan social fallback.
- [x] Hubungkan share card ke badge yang baru saja unlocked.
- [x] Verifikasi persistence, share behavior, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi terbaru.


## Capstone Celebration and Badges

- [x] Buat badge unik untuk tiap stage syllabus.
- [x] Tambahkan celebration overlay saat capstone berubah menjadi selesai.
- [x] Simpan badge yang sudah unlocked di localStorage.
- [x] Tampilkan badge collection dan jumlah badge di halaman stage.
- [x] Tambahkan dismiss/auto-hide behavior dan dukungan reduced motion.
- [x] Verifikasi trigger completion, refresh persistence, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi terbaru.


## Prerequisite Graph and Capstones

- [x] Buat schema node/edge prerequisite yang ringan dan bisa diklik.
- [x] Tambahkan visualisasi graph dengan highlight konsep terpilih dan status selesai.
- [x] Sediakan legend serta fallback list untuk aksesibilitas dan mobile.
- [x] Buat capstone brief untuk setiap stage syllabus.
- [x] Tambahkan constraints, deliverables, dan rubric evaluasi per capstone.
- [x] Simpan status capstone selesai bersama progress stage.
- [x] Verifikasi graph, challenge, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi terbaru.


## Industry Metrics, Stage Detail, and Recommendations

- [x] Tambahkan diagram arsitektur dan metrik teknis spesifik ke 16 industry cases.
- [x] Bedakan metrik yang dipublikasikan sumber dari metrik ilustratif edukasional.
- [x] Buat route/detail view untuk 4 stage syllabus.
- [x] Tambahkan progress tracking per stage berbasis konsep yang selesai.
- [x] Tambahkan rekomendasi konsep berikutnya berdasarkan progress dan prerequisite sederhana.
- [x] Verifikasi navigation, responsive layout, typecheck, build, dan preview.
- [x] Simpan checkpoint versi terbaru.


## Complexity, Distributed Systems, Syllabus, and Preview

- [x] Riset dan catat sumber resmi case Netflix/Uber atau perusahaan besar lain.
- [x] Tambahkan case perusahaan ke konsep Complexity dan Distributed Systems.
- [x] Buat syllabus learning path dari junior/vibe coder hingga senior engineer.
- [x] Integrasikan syllabus sebagai section navigasi yang bisa dipindai.
- [x] Tampilkan case perusahaan dan sumbernya di detail konsep terkait.
- [x] Jalankan/restart preview server dan verifikasi fitur utama.
- [x] Simpan checkpoint versi syllabus dan case perusahaan.


## Quiz Feedback and Sharing

- [x] Tambahkan state visual benar/salah dengan ikon centang hijau dan silang merah.
- [x] Tambahkan animasi transisi halus pada pilihan dan feedback kuis.
- [x] Tambahkan tombol share di modal untuk case/quiz aktif.
- [x] Tambahkan native Web Share serta fallback WhatsApp, LinkedIn, X, dan copy link.
- [x] Validasi share text, URL, keyboard access, dan responsive layout.
- [x] Jalankan typecheck, build, dan preview lalu simpan checkpoint terbaru.


## Discovery, Quiz, and Technical Examples

- [x] Tambahkan filter topik/kategori dan tingkat kesulitan.
- [x] Perluas pencarian agar mencari judul, case, dan konteks.
- [x] Tambahkan quiz What would you do? ke setiap detail case.
- [x] Tampilkan feedback dan penjelasan detail setelah jawaban dipilih.
- [x] Tambahkan code diff untuk konsep teknis yang relevan.
- [x] Tambahkan diagram arsitektur sederhana untuk konsep sistem/testing.
- [x] Validasi filter, quiz, diff, diagram, typecheck, build, dan responsive preview.
- [x] Simpan checkpoint versi interaktif terbaru.


## Case Study Expansion

- [x] Tentukan schema case per konsep: konteks, masalah, keputusan, dan refleksi.
- [x] Generate case praktis yang relevan untuk semua konsep di dataset.
- [x] Tampilkan case di modal/detail konsep dengan hierarchy yang mudah dipindai.
- [x] Validasi semua 213 konsep memiliki case non-empty dan konteks yang sesuai.
- [x] Uji typecheck, build, dan preview setelah integrasi case.
- [x] Simpan checkpoint versi curriculum dengan case lengkap.


- [x] Ekstrak dan normalisasi seluruh konsep dari master index PDF.
- [x] Kelompokkan konsep berdasarkan chapter dan nomor sumber.
- [x] Tambahkan metadata ringkas untuk setiap konsep: kicker, definisi, contoh industri, pitfall, dan trade-off.
- [x] Tandai konsep lintas kategori dan buat relasi terkait.
- [x] Buat learning path pemula yang mengurutkan konsep berdasarkan fondasi dan dampak praktis.
- [x] Integrasikan dataset ke concept index tanpa mengorbankan performa dan keterbacaan.
- [x] Tambahkan filter chapter, level, dan search yang bekerja untuk seluruh dataset.
- [x] Pastikan modal/detail konsep dapat menampilkan konten padat dengan hierarchy yang jelas.
- [x] Tambahkan progress tracking yang kompatibel dengan jumlah konsep penuh.
- [x] Uji typecheck, production build, desktop preview, dan mobile preview.
- [x] Simpan checkpoint full curriculum dan serahkan ke user.

## Verification Notes

- Tooltip label “The overlooked parts” memakai Radix hover/focus behavior dan menjelaskan contoh cache failover, retry storm, serta duplicate payment.
- Homepage menampilkan lima source-backed real-world cases dari dataset existing: Netflix, Uber, dan Stripe.
- Desktop dan mobile full-page preview menunjukkan section baru tetap ter-render; typecheck dan production build pass.
- Build masih memberi warning bundle Vite standar (>500 kB), tanpa error.


## Filter and Motion Verification Notes

Filter case mencakup pencarian bebas berdasarkan company/topik, chip company, dropdown topic, jumlah hasil, reset filter, dan empty state. Modal memakai transisi opacity/translate/scale saat buka serta close delay 220ms agar animasi penutupan terlihat sebelum unmount; Escape dan backdrop memakai jalur close yang sama. Desktop dan mobile full-page preview ter-render, typecheck dan build pass, dengan warning bundle Vite standar.


## Judgment Enhancement Verification Notes

Motion question memakai underline pulse dan marker rotation ringan, dengan focus-visible serta reduced-motion fallback. Dedicated Netflix caching case menampilkan enam tahap judgment loop, source link, dan tombol membuka full case. Desktop/mobile full-page preview ter-render, typecheck dan build pass; warning bundle Vite standar tetap ada.


## Dark Mode and Discussion Verification Notes

Typecheck dan production build pass dengan warning bundle Vite standar. Light-theme desktop dan mobile full-page previews ter-render tanpa overflow; discussion form, empty state, and case section stay in flow. Dark palette is implemented through `.dark` variables and targeted overrides, with theme stored in localStorage and system preference used when no choice exists.


## Theme Transition and Export Verification Notes

Typecheck and production build pass with the standard Vite bundle-size warning. Desktop and mobile full-page previews remain readable with the new Local notes export controls and header theme toggle. TXT export uses a browser Blob download; Print / PDF opens a print-ready document so the user can choose Save as PDF without bundling a PDF library.


## Parallax Verification Notes

Hero image uses a capped -72px transform driven by requestAnimationFrame and a CSS variable; caption moves at a quarter of that rate. Mobile widths under 768px and prefers-reduced-motion receive no transform. Desktop and mobile full-page previews render without overflow; typecheck/build pass with standard Vite bundle warning.


## Initial Skeleton Verification Notes

Skeleton uses a 520ms first-load state with editorial placeholders, a restrained shimmer, and a status line instead of a blocking spinner. Desktop and mobile full-page previews render without overflow; the real homepage remains intact after reveal. The skeleton and pulse animations are disabled under prefers-reduced-motion. Typecheck and production build pass with the standard Vite bundle warning.


## CTA Hover Verification Notes

Desktop preview shows the CTA remains aligned in the hero footer, while mobile keeps a clear tap target and signal line without overflow. The interaction uses hover and focus-visible states; reduced-motion disables transitions. Typecheck and production build pass with the standard Vite bundle warning.


## Case Expansion Verification Notes

Dataset now contains 8 source-backed cases: 5 existing plus Meta, Google, and Amazon. Desktop and mobile full-page previews render the updated case section and topic controls without overflow. Existing hero CTA hover remains in place. Typecheck and production build pass; Vite bundle warning remains.


## Fast Theme Switching Verification Notes

Theme toggle now uses a 120ms linear color-only transition and removes the transition class after 140ms; shadow, transform, fill, and stroke are excluded. Desktop and mobile previews remain stable with no overflow, and typecheck/build pass with the standard Vite bundle warning.


## Instant Theme Verification Notes

Global theme transition has been removed. The toggle now changes theme immediately, while the replacement Sun/Moon icon animates for 180ms only. Desktop and mobile previews show stable header and hero layout with no visible overflow or layout shift. Typecheck and production build pass; standard Vite bundle warning remains.


## Real-World Case Filter Motion Verification Notes

Result grid is keyed by active query/company/topic so new results enter with a 240ms opacity + translateY animation and a 28ms card stagger. No width/height animation is used. Desktop and mobile full-page previews remain stable without overflow; typecheck/build pass with the standard Vite bundle warning. Reduced-motion disables the animation.


## Case Empty State and Load More Verification Notes

Real-world cases now show five cards initially, with Load more revealing additional filtered results in increments of five. Filter changes reset the visible count. Empty state displays No results found, active filter summary, guidance to broaden search, and Reset filters. Typecheck/build pass and desktop/mobile full-page previews render; standard Vite bundle warning remains.


## Software Engineering Hero Visual Verification Notes

Hero now uses the generated software-engineering visual with a system architecture sketch, queue/cache symbols, and terminal monitor. Desktop crop preserves a quiet text-safe left panel and relevant architecture on the right; mobile crop keeps the terminal and system diagram visible below the copy. Existing parallax image class remains active. Typecheck/build pass; standard Vite bundle warning remains.

