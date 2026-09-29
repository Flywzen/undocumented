from pathlib import Path
import re
p = Path('/home/ubuntu/missing-curriculum/client/src/pages/Home.tsx')
s = p.read_text()
start = s.index('import { Button }')
end = s.index('export default function Home()')
new_header = '''import { Button } from "@/components/ui/button";
import { curriculum, curriculumSourceCount, type CurriculumItem } from "@/lib/curriculum";

type Concept = CurriculumItem & { kicker: string; description: string };
const concepts: Concept[] = curriculum.map((item) => ({ ...item, kicker: item.level, description: item.summary }));
const chapters = Array.from(new Map(curriculum.map((item) => [item.category, item.chapter.replace(`${item.category} · `, "")])).entries()).map(([id, label], index) => ({ id, label, count: curriculum.filter((item) => item.category === id).length, tone: ["orange", "sage", "ink"][index % 3] }));

'''
s = s[:start] + new_header + s[end:]
s = s.replace('{understood.length} / {concepts.length} understood', '{understood.length} / {curriculumSourceCount} understood')
s = s.replace('{chapters.map((chapter, i) =>', '{chapters.slice(0, 8).map((chapter, i) =>')
s = s.replace('{i < 2 ? "start here" : "build judgment"}', '{i < 2 ? "start here" : `${chapter.count} concepts · build judgment`}')
s = s.replace('const filtered = useMemo(() => concepts.filter((item) => {', 'const filtered = useMemo(() => concepts.filter((item) => {')
needle = '<div className="mb-8 flex flex-wrap gap-2">'
s = s.replace(needle, '<p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-graphite">Showing {filtered.length} of {curriculumSourceCount} concepts</p>'+needle)
p.write_text(s)
print('migrated Home.tsx to full curriculum')
