from pathlib import Path
import re

source = Path('/home/ubuntu/missing-curriculum/source-curriculum.txt').read_text()
start = source.find('Master Index — Peta Lengkap Konsep')
end = source.find('Part 1 —', start)
block = source[start:end if end != -1 else len(source)]
category = 'Core'
items = []
for raw in block.splitlines():
    line = raw.replace('\f', '').strip()
    heading = re.match(r'^([A-Z])\.\s+(.+)$', line)
    if heading and not heading.group(1) == 'I':
        category = f"{heading.group(1)} · {heading.group(2).strip()}"
        continue
    item = re.match(r'^(\d+)\.\s+(.+)$', line)
    if item:
        num = int(item.group(1))
        title = re.sub(r'\s+', ' ', item.group(2)).strip()
        if title and not title.startswith('Catatan tentang dokumen'):
            items.append((num, title, category))
# dedupe only exact duplicates while keeping first occurrence
seen = set(); clean = []
for num, title, category in items:
    key = (title.lower(), category)
    if key not in seen:
        seen.add(key); clean.append((num, title, category))

def esc(value):
    return value.replace('\\', '\\\\').replace('"', '\\"')

out = ['// Generated from the PDF master index. Keep this file content-first and editable.','export type CurriculumItem = { id: number; title: string; category: string; chapter: string; summary: string; example: string; watch: string; level: "Foundation" | "Working knowledge" | "Advanced"; };','', 'export const curriculum: CurriculumItem[] = [']
for idx, (num, title, cat) in enumerate(clean, 1):
    level = 'Foundation' if idx <= 26 else ('Working knowledge' if idx <= 76 else 'Advanced')
    summary = f"Konsep {title} dalam konteks keputusan software engineering dan kerja tim di industri."
    example = f"Gunakan {title} sebagai lensa saat merancang, mengubah, atau mengevaluasi sistem nyata."
    watch = "Jangan menerapkan pola ini sebagai dogma; cek konteks, biaya, dan trade-off-nya."
    out.append(f'  {{ id: {idx}, title: "{esc(title)}", chapter: "{esc(cat)}", category: "{esc(cat.split(" · ", 1)[0])}", summary: "{esc(summary)}", example: "{esc(example)}", watch: "{esc(watch)}", level: "{level}" }},')
out.append('];')
out.append('')
out.append(f'export const curriculumSourceCount = {len(clean)};')
Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts').write_text('\n'.join(out))
print(f'Generated {len(clean)} curriculum items')
