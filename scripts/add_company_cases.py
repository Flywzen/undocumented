from pathlib import Path
import re
p=Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts')
s=p.read_text()
s=s.replace('technical?: { kind: "code" | "diagram"; label: string; before?: string; after?: string; nodes?: string[] }; level:', 'technical?: { kind: "code" | "diagram"; label: string; before?: string; after?: string; nodes?: string[] }; companyCase?: { company: string; title: string; story: string; lesson: string; source: string }; level:')

def q(v): return v.replace('\\','\\\\').replace('"','\\"')

def case_for(title, cat):
    t=title.lower()
    if 'cost of complexity' in t or 'complexity' in t:
        return '{ company: "Netflix", title: "Fault tolerance is a requirement", story: "Netflix menjelaskan bahwa API mereka memanggil puluhan subsystem. Pada volume tinggi, satu dependency yang lambat dapat menghabiskan thread dan menjatuhkan API jika failure tidak diisolasi.", lesson: "Kompleksitas bukan hanya jumlah service; ia muncul dari dependency, latency, dan blast radius. Gunakan timeout, bulkhead, retry yang terkontrol, dan circuit breaker sebagai keputusan desain.", source: "https://techblog.netflix.com/2012/02/fault-tolerance-in-high-volume.html" }'
    if 'caching' in t or 'cache' in t:
        return '{ company: "Netflix", title: "EVCache dan global replication", story: "Netflix menggunakan cache global untuk menghindari cold-cache overload ketika traffic berpindah region. Untuk data non-kritis, mereka menerima eventual consistency dan memakai replikasi asynchronous.", lesson: "Cache bukan sekadar percepatan. Kamu harus memilih consistency model, failure behavior, dan batas stale data yang bisa diterima product.", source: "https://netflixtechblog.com/caching-for-a-global-netflix-7bcc457012f1" }'
    if 'domain-driven' in t or 'domain' in t or 'microservice' in t or cat=='D':
        return '{ company: "Uber", title: "Domain-Oriented Microservice Architecture", story: "Uber mengelompokkan microservices terkait menjadi domain, menyusun domain ke dalam layer, memakai gateway sebagai pintu masuk, dan menyediakan extension architecture agar domain tetap agnostic.", lesson: "Memecah service tanpa boundary dan ownership hanya memindahkan kompleksitas. Domain, gateway, layer, dan extension point membantu sistem besar tetap bisa dipahami.", source: "https://www.uber.com/us/en/blog/microservice-architecture/" }'
    if cat=='L' or any(k in t for k in ['distributed','consensus','event-driven','replication','eventual consistency','fallacies']):
        return '{ company: "Netflix + Uber", title: "Distributed systems sebagai trade-off", story: "Netflix menunjukkan bagaimana dependency failure dan cross-region replication memengaruhi availability. Uber menunjukkan bagaimana organisasi dan boundary domain ikut menentukan apakah sistem terdistribusi tetap comprehensible.", lesson: "Saat sistem terdistribusi membesar, reliability dan ownership sama pentingnya dengan protocol. Selalu jelaskan latency, duplicate, ordering, failure, dan recovery.", source: "https://techblog.netflix.com/2012/02/fault-tolerance-in-high-volume.html" }'
    return None

out=[]
for line in s.splitlines():
    m=re.search(r'title: "([^"]+)"', line)
    if m and 'caseTitle:' in line and 'companyCase:' not in line:
        title=m.group(1); cat=re.search(r'category: "([A-Z]+)"', line).group(1)
        c=case_for(title,cat)
        if c: line=line.replace(', level:', f', companyCase: {c}, level:')
    out.append(line)
p.write_text('\n'.join(out)+'\n')
print('company cases added:', sum('companyCase:' in x for x in out))
