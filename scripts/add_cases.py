from pathlib import Path
import re

p = Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts')
s = p.read_text()
s = s.replace('summary: string; example: string; watch: string; level:', 'summary: string; example: string; watch: string; caseTitle: string; caseContext: string; caseDecision: string; caseQuestion: string; level:')

TEMPLATES = {
    'A': ('Fitur baru mulai melebar', 'Tim menerima request yang terdengar sederhana, tetapi asumsi dan batasannya belum jelas.', 'Sebelum coding, gunakan {title} untuk memetakan fakta, dampak lanjutan, dan trade-off yang benar-benar sedang dipilih.', 'Asumsi apa yang perlu dibuktikan sebelum kamu memilih solusi?'),
    'B': ('PR kecil berubah menjadi sistem baru', 'Implementasi awal mulai dipenuhi abstraction, konfigurasi, dan edge case yang belum dibutuhkan user.', 'Gunakan {title} untuk mengembalikan solusi ke kebutuhan terukur dan menunda kompleksitas yang belum punya bukti.', 'Bagian mana yang benar-benar dibutuhkan sekarang, dan mana yang hanya terasa “lebih siap”?'),
    'C': ('Satu perubahan menyentuh terlalu banyak tempat', 'Developer ingin mengubah aturan bisnis, tetapi dampaknya merambat ke UI, database, dan beberapa service.', 'Gunakan {title} untuk menemukan boundary tanggung jawab dan membuat perubahan lebih lokal serta mudah diuji.', 'Alasan apa yang membuat bagian-bagian ini berubah, dan apakah alasan itu memang sama?'),
    'D': ('Sistem tumbuh melewati bentuk awalnya', 'Traffic, jumlah tim, dan kebutuhan domain meningkat; pola yang dulu sederhana mulai menimbulkan coupling.', 'Gunakan {title} untuk memilih boundary berdasarkan domain, ownership, dan failure mode—bukan karena arsitektur itu sedang populer.', 'Bukti apa yang menunjukkan boundary baru sudah layak dibayar biayanya?'),
    'E': ('Request menumpuk di jam sibuk', 'Latency naik ketika traffic meningkat dan optimasi lokal tidak lagi memberi hasil berarti.', 'Gunakan {title} untuk menemukan bottleneck yang sebenarnya, mengontrol beban, dan menjelaskan trade-off kapasitas.', 'Metrik apa yang akan membuktikan bahwa perubahanmu memperbaiki sistem, bukan hanya satu endpoint?'),
    'F': ('Satu dependency mulai gagal', 'Service pihak ketiga timeout dan request yang ikut retry membuat sistem internal ikut tertekan.', 'Gunakan {title} untuk membatasi blast radius, memberi fallback, dan menjaga jalur penting tetap hidup.', 'Kegagalan apa yang ingin kamu izinkan, dan bagaimana sistem pulih setelah dependency kembali?'),
    'G': ('Kode masih jalan, tetapi perubahan makin mahal', 'Tim menghindari area tertentu karena tidak ada yang yakin bagian mana yang aman disentuh.', 'Gunakan {title} untuk mengurangi biaya perubahan secara bertahap dan membuat risiko terlihat dalam prioritas kerja.', 'Bunga kompleksitas apa yang sedang dibayar tim setiap minggu?'),
    'H': ('Banyak fitur, sedikit dampak', 'Roadmap penuh aktivitas, tetapi belum jelas apakah pekerjaan yang dikirim menyelesaikan masalah user.', 'Gunakan {title} untuk menghubungkan pekerjaan engineering dengan outcome, biaya, dan opsi yang dikorbankan.', 'Bukti apa yang membuat pekerjaan ini layak dikerjakan sekarang?'),
    'I': ('Bug terus muncul kembali', 'Tim sudah memperbaiki gejala beberapa kali, tetapi incident yang sama kembali dalam bentuk berbeda.', 'Gunakan {title} untuk menelusuri causal chain dan memperbaiki kondisi sistem, bukan mencari siapa yang salah.', 'Perubahan sistem apa yang akan mencegah pola ini terulang?'),
    'J': ('Fitur terlihat aman, tetapi boundary belum diuji', 'Sebuah endpoint baru memproses data sensitif dan review hanya fokus pada happy path.', 'Gunakan {title} untuk memetakan aset, actor, abuse case, dan kontrol sebelum perubahan dirilis.', 'Apa yang bisa dilakukan actor yang tidak seharusnya dipercaya?'),
    'K': ('AI menghasilkan patch yang tampak benar', 'Patch dari AI lolos pembacaan singkat, tetapi menyentuh concurrency dan aturan bisnis yang tidak eksplisit.', 'Gunakan {title} untuk memeriksa invariant, diff, test, dan observability sebelum menerima output sebagai perubahan produksi.', 'Klaim apa yang harus dibuktikan agar patch ini aman dipercaya?'),
    'L': ('Dua service berbeda pendapat', 'Network delay dan partial failure membuat dua node melihat urutan event yang berbeda.', 'Gunakan {title} untuk mendesain retry, ordering, consistency, dan recovery yang realistis.', 'Apa yang terjadi jika pesan datang terlambat, duplikat, atau tidak pernah tiba?'),
    'M': ('Ownership tidak jelas saat incident', 'Beberapa tim bergantung pada komponen yang sama dan semua mengira tim lain yang akan menangani masalah.', 'Gunakan {title} untuk memperjelas interface, ownership, dan jalur eskalasi.', 'Siapa yang punya keputusan akhir ketika sistem ini bermasalah?'),
    'N': ('Belajar berhenti di tutorial', 'Developer bisa mengikuti langkah, tetapi kesulitan menjelaskan mengapa solusi tertentu dipilih.', 'Gunakan {title} untuk membuat feedback loop dari praktik, observasi, dan penjelasan ulang.', 'Feedback apa yang paling cepat mengungkap bagian yang belum kamu pahami?'),
}

def esc(v):
    return v.replace('\\', '\\\\').replace('"', '\\"')

def transform(m):
    prefix, num, title, rest = m.group(1), int(m.group(2)), m.group(3), m.group(4)
    cat_match = re.search(r'category: "([A-Z]+)"', rest)
    cat = cat_match.group(1) if cat_match else 'A'
    template = TEMPLATES.get(cat, TEMPLATES['A'])
    case_title, context, decision, question = [x.format(title=title) for x in template]
    rest = rest.replace('level: "', f'caseTitle: "{esc(case_title)}", caseContext: "{esc(context)}", caseDecision: "{esc(decision)}", caseQuestion: "{esc(question)}", level: "')
    return f'{prefix}{num}, title: "{title}",{rest}'

pattern = re.compile(r'(  \{ id: )(\d+), title: "([^"]+)",(.*?\},)$', re.M)
s = pattern.sub(transform, s)
p.write_text(s)
print('added case fields to curriculum dataset')
