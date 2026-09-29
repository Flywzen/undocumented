from pathlib import Path
import re
p=Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts')
s=p.read_text()

def replacement(m):
    line=m.group(0)
    title=re.search(r'title: "([^"]+)"', line).group(1)
    t=title.lower()
    if 'cost of complexity' in t or 'complexity' in t:
        company,title2,story,lesson,source='Netflix','Fault tolerance is a requirement','Netflix menjelaskan bahwa API mereka memanggil puluhan subsystem. Pada volume tinggi, satu dependency yang lambat dapat menghabiskan thread dan menjatuhkan API jika failure tidak diisolasi.','Kompleksitas muncul dari dependency, latency, dan blast radius. Gunakan timeout, bulkhead, retry terkontrol, dan circuit breaker.','https://techblog.netflix.com/2012/02/fault-tolerance-in-high-volume.html'
        metrics='[{ label: "Dependency fan-out", value: "1:6", note: "average outgoing calls per incoming API call", status: "published" }, { label: "Dependency model", value: "30 × 99.99%", note: "Netflix illustration of compounded availability", status: "published" }, { label: "Failure spread", value: "seconds", note: "slow dependency can saturate request threads", status: "published" }]'; nodes='["API", "Dependency pool", "Circuit breaker", "Fallback"]'
    elif 'caching' in t or 'cache' in t:
        company,title2,story,lesson,source='Netflix','EVCache dan global replication','Netflix menggunakan cache global untuk menghindari cold-cache overload ketika traffic berpindah region. Untuk data non-kritis, mereka menerima eventual consistency dan memakai replikasi asynchronous.','Cache membutuhkan keputusan tentang consistency, stale data, replication, dan failure behavior.','https://netflixtechblog.com/caching-for-a-global-netflix-7bcc457012f1'
        metrics='[{ label: "Peak throughput", value: "30M req/s", note: "reported peak across production EVCache deployments", status: "published" }, { label: "Daily volume", value: "~2T requests/day", note: "reported globally across EVCache clusters", status: "published" }, { label: "Consistency", value: "Eventual", note: "acceptable for non-critical recommendation-like data", status: "published" }]'; nodes='["Member request", "Local EVCache", "Async replication", "Other regions"]'
    elif 'domain' in t or 'microservice' in t or re.search(r'category: "D"', line):
        company,title2,story,lesson,source='Uber','Domain-Oriented Microservice Architecture','Uber mengelompokkan microservices terkait menjadi domain, menyusun domain ke dalam layer, memakai gateway sebagai pintu masuk, dan menyediakan extension architecture agar domain tetap agnostic.','Memecah service tanpa boundary dan ownership hanya memindahkan kompleksitas. Domain, gateway, layer, dan extension point membuat sistem lebih comprehensible.','https://www.uber.com/us/en/blog/microservice-architecture/'
        metrics='[{ label: "Boundary unit", value: "Domain", note: "published DOMA organizing unit", status: "published" }, { label: "Entry point", value: "Gateway", note: "published DOMA clean domain interface", status: "published" }, { label: "Cross-domain coupling", value: "Explicit", note: "illustrative review target for domain agnosticism", status: "illustrative" }]'; nodes='["Domain gateway", "Domain services", "Layer rules", "Extension point"]'
    else:
        company,title2,story,lesson,source='Netflix + Uber','Distributed systems sebagai trade-off','Netflix menunjukkan bagaimana dependency failure dan cross-region replication memengaruhi availability. Uber menunjukkan bagaimana boundary dan ownership ikut menentukan apakah sistem terdistribusi tetap comprehensible.','Selalu jelaskan latency, duplicate, ordering, failure, recovery, dan ownership.','https://techblog.netflix.com/2012/02/fault-tolerance-in-high-volume.html'
        metrics='[{ label: "Signal", value: "p95 latency", note: "measure the user-visible tail", status: "illustrative" }, { label: "Failure budget", value: "SLO gap", note: "use the gap to guide reliability work", status: "illustrative" }, { label: "Recovery", value: "MTTR", note: "track time back to service", status: "illustrative" }]'; nodes='["Request", "Boundary", "Dependency", "Recovery"]'
    def esc(v): return v.replace('\\','\\\\').replace('"','\\"')
    return f'companyCase: {{ company: "{company}", title: "{title2}", story: "{esc(story)}", lesson: "{esc(lesson)}", source: "{source}", metrics: {metrics}, architecture: {{ nodes: {nodes}, caption: "Trace the path from request to containment and recovery." }} }}, level:'

s=re.sub(r'companyCase: \{.*?\}, level:', replacement, s)
p.write_text(s)
print('repaired companyCase objects')
