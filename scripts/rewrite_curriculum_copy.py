from pathlib import Path
import re

path = Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts')
text = path.read_text()
focus = {
    'A': 'cara berpikir', 'B': 'kesederhanaan dan kompleksitas', 'C': 'desain modul',
    'D': 'arsitektur', 'E': 'data dan persistence', 'F': 'distributed systems',
    'G': 'reliability', 'H': 'performance', 'I': 'testing', 'J': 'security',
    'K': 'delivery', 'L': 'debugging', 'M': 'operasi', 'N': 'observability',
    'O': 'organisasi', 'P': 'product', 'Q': 'economics', 'R': 'communication',
    'S': 'leadership', 'T': 'career', 'U': 'collaboration', 'V': 'learning',
    'W': 'systems thinking', 'X': 'judgment', 'Y': 'strategy', 'Z': 'practice',
}

def put(line, field, value):
    pattern = rf'({field}: )"[^"\\]*(?:\\.[^"\\]*)*"'
    return re.sub(pattern, lambda match: f'{match.group(1)}"{value}"', line, count=1)

def safe(value):
    return value.replace('\\', '\\\\').replace('"', '\\"')

out = []
for line in text.splitlines():
    title_match = re.search(r'title: "((?:\\.|[^"\\])*)"', line)
    category_match = re.search(r'category: "([A-Z])"', line)
    if not title_match or not category_match:
        out.append(line)
        continue
    title = title_match.group(1)
    area = focus.get(category_match.group(1), 'engineering')
    values = {
        'summary': f'{title}: {area} yang perlu kamu kenali sebelum mengubah sistem.',
        'example': f'Mulai dari satu endpoint, job, atau modul yang sudah berjalan. Tulis apa yang berubah ketika {title} menjadi bagian dari keputusanmu.',
        'watch': f'Jangan menjadikan {title} sebagai checklist. Pastikan constraint, owner, dan failure mode-nya jelas.',
        'caseTitle': f'Perubahan kecil di {area}',
        'caseContext': f'Sebuah perubahan terlihat lokal, tetapi menyentuh {area} ketika traffic, dependency, atau kebutuhan tim ikut berubah.',
        'caseDecision': f'Sebelum coding, tulis constraint yang diprioritaskan, apa yang dikorbankan, dan sinyal yang akan membuatmu meninjau keputusan ini.',
        'caseQuestion': f'Bukti apa yang perlu kamu lihat sebelum yakin keputusan tentang {title} tidak hanya terasa masuk akal?',
    }
    for field, value in values.items():
        line = put(line, field, safe(value))
    quiz_prompt = f'Kamu sedang menghadapi keputusan tentang {title}, tetapi requirement dan constraint belum sepenuhnya jelas.'
    line = put(line, 'prompt', safe(quiz_prompt))
    line = put(line, 'explanation', safe('Jawaban yang kuat dimulai dari constraint yang bisa diperiksa, bukan dari pola yang paling populer. Jelaskan trade-off dan cara menguji asumsi sebelum memperluas implementasi.'))
    out.append(line)
path.write_text('\n'.join(out) + '\n')
print('rewritten curriculum entries:', sum(1 for line in out if 'title:' in line and 'category:' in line))
