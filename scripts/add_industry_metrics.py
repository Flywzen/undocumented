from pathlib import Path
import re
p=Path('/home/ubuntu/missing-curriculum/client/src/lib/curriculum.ts')
s=p.read_text()
s=s.replace('companyCase?: { company: string; title: string; story: string; lesson: string; source: string }; level:', 'companyCase?: { company: string; title: string; story: string; lesson: string; source: string; metrics: { label: string; value: string; note: string; status: "published" | "illustrative" }[]; architecture: { nodes: string[]; caption: string } }; level:')

def enrich(m):
    body=m.group(1)
    if 'metrics:' in body: return m.group(0)
    if 'Netflix + Uber' in body:
        metrics='metrics: [{ label: "Dependency fan-out", value: "1:6", note: "average outgoing calls per incoming API call", status: "published" }, { label: "Failure model", value: "99.99%^30 ≈ 99.7%", note: "Netflix illustration of compounded dependency availability", status: "published" }, { label: "Blast radius", value: "seconds", note: "a slow dependency can saturate request threads quickly", status: "published" }]'
        arch='architecture: { nodes: ["API", "Domain services", "Timeout + bulkhead", "Fallback"], caption: "Protect the request path before dependency failure becomes an API outage." }'
    elif 'EVCache' in body:
        metrics='metrics: [{ label: "Peak throughput", value: "30M req/s", note: "reported peak across production EVCache deployments", status: "published" }, { label: "Daily volume", value: "~2T requests/day", note: "reported globally across EVCache clusters", status: "published" }, { label: "Consistency", value: "Eventual", note: "acceptable for non-critical recommendation-like data", status: "published" }]'
        arch='architecture: { nodes: ["Member request", "Local EVCache", "Async replication", "Other regions"], caption: "Keep local reads fast while cross-region replication remains asynchronous." }'
    elif 'Uber' in body:
        metrics='metrics: [{ label: "Boundary unit", value: "Domain", note: "published DOMA organizing unit: related microservices", status: "published" }, { label: "Entry point", value: "Gateway", note: "published DOMA pattern for a clean domain interface", status: "published" }, { label: "Coupling check", value: "0 hard-coded cross-domain rules", note: "illustrative target for reviewing domain agnosticism", status: "illustrative" }]'
        arch='architecture: { nodes: ["Domain gateway", "Domain services", "Layer rules", "Extension point"], caption: "Make ownership and allowed dependencies visible instead of letting microservice edges grow silently." }'
    else:
        metrics='metrics: [{ label: "Signal", value: "p95 latency", note: "measure the user-visible tail, not only the average", status: "illustrative" }, { label: "Error budget", value: "SLO − actual", note: "use the gap to guide reliability decisions", status: "illustrative" }, { label: "Recovery", value: "MTTR", note: "track how quickly the system returns to service", status: "illustrative" }]'
        arch='architecture: { nodes: ["Request", "Boundary", "Dependency", "Recovery"], caption: "Trace the decision from user request to failure containment and recovery." }'
    return 'companyCase: { '+body.strip()[:-1]+', '+metrics+', '+arch+' }, level:'

# Match the entire companyCase object on each item line.
s=re.sub(r'companyCase: \{ (.*?) \}, level:', enrich, s)
p.write_text(s)
print('industry cases enriched with metrics and architecture diagrams')
