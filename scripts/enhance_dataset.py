from pathlib import Path
import re

p = Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts')
s = p.read_text()
s = s.replace('caseQuestion: string; level:', 'caseQuestion: string; quiz: { prompt: string; options: string[]; answer: number; explanation: string }; technical?: { kind: "code" | "diagram"; label: string; before?: string; after?: string; nodes?: string[] }; level:')

templates = {
 'A': ('Sebuah endpoint baru diminta selesai hari ini, tetapi requirement-nya masih punya asumsi tersembunyi.', ['Langsung generate kode dan berharap test menangkap semuanya.', 'Tulis asumsi, cari constraint utama, lalu pilih eksperimen kecil untuk memvalidasinya.', 'Tambahkan abstraction agar semua kemungkinan future-proof.', 'Pindahkan masalah ke service baru agar boundary terlihat.'], 1, 'Jawaban terbaik dimulai dari fakta dan constraint yang bisa diuji. Kecepatan bukan berarti melewati framing masalah.'),
 'B': ('Satu fitur sederhana mulai membutuhkan konfigurasi dan layer tambahan sebelum ada bukti kebutuhan.', ['Buat seluruh abstraction sekarang supaya tidak refactor nanti.', 'Pilih bentuk paling sederhana yang memenuhi kebutuhan saat ini dan catat batasnya.', 'Tambahkan microservice karena skala pasti akan tumbuh.', 'Duplikasi semua kode agar modul tidak saling bergantung.'], 1, 'Kesederhanaan yang disengaja menjaga feedback loop tetap cepat. Kompleksitas sebaiknya dibayar ketika ada alasan nyata.'),
 'C': ('Perubahan aturan bisnis memaksa developer menyentuh handler, query database, dan komponen UI sekaligus.', ['Biarkan satu file mengurus semuanya agar mudah dicari.', 'Pisahkan tanggung jawab berdasarkan alasan perubahan dan boundary yang jelas.', 'Sembunyikan semua logika di utility global.', 'Ganti seluruh stack agar struktur baru terasa bersih.'], 1, 'Boundary yang baik membuat perubahan lokal, mudah diuji, dan tidak menyebarkan alasan perubahan ke seluruh sistem.'),
 'D': ('Traffic dan jumlah tim meningkat, lalu boundary sistem lama mulai menimbulkan coupling dan koordinasi manual.', ['Pecah menjadi microservices tanpa mengukur bottleneck.', 'Cari boundary domain, ownership, dan failure mode sebelum memilih bentuk arsitektur.', 'Tambahkan cache di semua tempat.', 'Gunakan teknologi paling populer di industri.'], 1, 'Arsitektur adalah trade-off. Boundary baru harus menjawab masalah operasional dan ownership yang nyata.'),
 'E': ('Latency p95 naik tajam setiap kali campaign mendatangkan traffic besar.', ['Naikkan ukuran server tanpa mengukur sumber bottleneck.', 'Ukur jalur request, cari bottleneck, lalu kontrol beban atau kapasitas di titik yang terbukti.', 'Tambahkan retry agar request lebih sering berhasil.', 'Sembunyikan latency dengan loading animation.'], 1, 'Performance engineering dimulai dari pengukuran dan bottleneck yang nyata, bukan optimasi berdasarkan intuisi.'),
 'F': ('Provider pembayaran timeout dan retry dari client mulai membuat request ganda.', ['Retry tanpa batas supaya user tidak melihat error.', 'Batasi retry, gunakan idempotency, dan siapkan fallback atau circuit breaker.', 'Matikan logging agar service tidak makin sibuk.', 'Kembalikan HTTP 200 untuk semua error.'], 1, 'Reliability membutuhkan kontrol terhadap failure mode dan blast radius, bukan sekadar membuat error menghilang dari UI.'),
 'G': ('Tim takut menyentuh modul lama karena perubahan kecil sering merusak perilaku tidak terdokumentasi.', ['Abaikan sampai rewrite besar disetujui.', 'Buat debt terlihat, tambahkan safety net, lalu bayar sedikit demi sedikit saat menyentuh area tersebut.', 'Tambahkan lebih banyak komentar tanpa test.', 'Salin modul lama dan mulai dari nol.'], 1, 'Technical debt dikelola lewat visibility, prioritas, dan perbaikan bertahap—bukan heroics atau rewrite impulsif.'),
 'H': ('Roadmap penuh fitur, tetapi belum ada bukti pekerjaan itu memperbaiki outcome user.', ['Kirim semua fitur agar velocity terlihat tinggi.', 'Hubungkan pekerjaan dengan user problem, outcome, biaya, dan opportunity cost.', 'Pilih fitur dengan implementasi paling mudah saja.', 'Tunda semua keputusan sampai data sempurna.'], 1, 'Product engineering menimbang dampak dan biaya, bukan hanya jumlah output yang dikirim.'),
 'I': ('Bug yang sama kembali muncul setelah beberapa patch karena tim hanya memperbaiki gejalanya.', ['Cari developer yang terakhir menyentuh kode.', 'Telusuri causal chain, tambahkan bukti, lalu perbaiki kondisi sistem yang memungkinkan bug terjadi.', 'Tutup issue setelah workaround diterapkan.', 'Tambahkan retry di semua layer.'], 1, 'Root cause analysis memperbaiki sistem dan feedback loop, bukan mencari kambing hitam.'),
 'J': ('Endpoint baru memproses data sensitif, tetapi review hanya menguji happy path.', ['Anggap user terautentikasi selalu aman.', 'Petakan aset, actor, abuse case, privilege, dan kontrol sebelum rilis.', 'Sembunyikan endpoint dari dokumentasi.', 'Enkripsi response saja.'], 1, 'Security by design dimulai dari threat model dan boundary kepercayaan, bukan dari satu kontrol kosmetik.'),
 'K': ('AI menghasilkan patch yang tampak masuk akal untuk mengubah flow pembayaran.', ['Merge jika diff-nya pendek.', 'Verifikasi invariant, test, dependency, observability, dan rollback sebelum menerima patch.', 'Minta AI menulis ulang sampai terasa lebih rapi.', 'Percaya pada green lint saja.'], 1, 'AI mempercepat generation; engineer tetap bertanggung jawab atas verification dan dampak sistem.'),
 'L': ('Dua service menerima event dalam urutan berbeda saat network mengalami delay.', ['Asumsikan pesan selalu datang sekali dan berurutan.', 'Rancang idempotency, ordering, retry, dan recovery untuk partial failure.', 'Tambahkan timeout nol.', 'Hapus event yang terlambat.'], 1, 'Distributed systems harus dirancang untuk duplikasi, keterlambatan, dan kehilangan pesan sebagai kondisi normal.'),
 'M': ('Saat incident, tiga tim saling menunggu karena ownership komponen tidak jelas.', ['Biarkan manager menentukan saat incident berlangsung.', 'Tentukan owner, interface, dan jalur eskalasi sebelum incident terjadi.', 'Gabungkan semua tim ke satu channel tanpa role.', 'Tunggu service pulih sendiri.'], 1, 'Ownership yang eksplisit mempercepat koordinasi dan mengurangi waktu diagnosis.'),
 'N': ('Developer bisa mengikuti tutorial, tetapi kesulitan menjelaskan mengapa solusi tertentu dipilih.', ['Tambah lebih banyak tutorial pasif.', 'Buat feedback loop lewat praktik, penjelasan ulang, dan review terhadap keputusan.', 'Hafalkan istilah sebanyak mungkin.', 'Hanya belajar teknologi baru.'], 1, 'Learning yang menempel membutuhkan praktik dan feedback, bukan konsumsi konten tanpa refleksi.'),
}

def esc(v): return v.replace('\\', '\\\\').replace('"', '\\"')

def transform(m):
    line = m.group(0)
    cat = re.search(r'category: "([A-Z]+)"', line).group(1)
    title = re.search(r'title: "([^"]+)"', line).group(1)
    context, opts, answer, explanation = templates.get(cat, templates['A'])
    quiz = f'quiz: {{ prompt: "{esc(context)}", options: [{", ".join(chr(34)+esc(x)+chr(34) for x in opts)}], answer: {answer}, explanation: "{esc(explanation)}" }}'
    technical = ''
    low = title.lower()
    if any(k in low for k in ['caching', 'test pyramid', 'testing', 'contract testing', 'feature flags', 'canary', 'idempotency', 'circuit breaker', 'retry', 'event-driven', 'cqrs']):
        technical = f', technical: {{ kind: "code", label: "Implementation sketch", before: "// {esc(title)}\\n// implicit behavior", after: "// {esc(title)}\\n// make the invariant explicit\\n// observe + test the failure path" }}'
    elif cat in ['D','E','F','L','Q','R']:
        technical = f', technical: {{ kind: "diagram", label: "System shape", nodes: ["Client", "Boundary", "Dependency", "Fallback"] }}'
    return line.replace(', level:', f', {quiz}{technical}, level:')

s = re.sub(r'  \{ id: \d+,.*?\},$', transform, s, flags=re.M)
p.write_text(s)
print('enhanced curriculum items with quiz and technical examples')
