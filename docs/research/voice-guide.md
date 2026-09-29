# Voice guide — The Missing Curriculum

## Positioning

A field guide for developers who can ship a feature but want to understand the consequences of their decisions.

## Voice

Use plain, concrete language. Start with a recognizable situation, name the decision, then show the trade-off. Prefer verbs and questions over slogans. Do not promise transformation, mastery, or seniority from reading. Do not use generic phrases such as “unlock your potential”, “build better software”, or “start your journey”.

## Message pattern

Situation → decision → consequence → small practice.

Example: “Request ini kelihatannya sederhana. Sebelum bikin abstraction baru, cari dulu siapa yang memanggilnya, data apa yang boleh terlambat, dan apa yang terjadi kalau dependency mati.”

## Product copy rules

- Say what the user will do next: “Pilih satu konsep. Baca case-nya. Jawab pertanyaannya.”
- Name the failure mode: duplicate charge, retry storm, stale cache, hidden coupling, silent data loss.
- Treat trade-offs as context-dependent, following the structure of Google SRE, AWS Well-Architected, and Microsoft Architecture Center.
- Keep the tone candid, slightly conversational, and calm. No motivational grandstanding.
- Technical claims should be explained with a concrete boundary or example.

## Reference URLs

- Google SRE Principles: https://sre.google/sre-book/part-II-principles/
- AWS Well-Architected Definitions: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html
- Microsoft Azure Architecture Center: https://learn.microsoft.com/en-us/azure/architecture/
