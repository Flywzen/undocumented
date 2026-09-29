/* Editorial Terminal: stage detail reads like a field manual, with progress and visible proof of completion. */
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, Check, Circle, Sparkles } from "lucide-react";
import { syllabus } from "@/lib/syllabus";
import { capstones } from "@/lib/learningData";
import { curriculum } from "@/lib/curriculum";

const badgeMeta = {
  "01": { name: "Signal Finder", mark: "01" },
  "02": { name: "Boundary Keeper", mark: "02" },
  "03": { name: "Failure Navigator", mark: "03" },
  "04": { name: "Decision Steward", mark: "04" },
} as const;

export default function SyllabusStage() {
  const [, params] = useRoute("/path/:id");
  const stage = syllabus.find((item) => item.id === params?.id) || syllabus[0];
  const [understood, setUnderstood] = useState<number[]>(() => JSON.parse(localStorage.getItem("missing-curriculum-progress") || "[]"));
  const concepts = stage.concepts.map((name) => curriculum.find((item) => item.title === name)).filter(Boolean);
  const done = concepts.filter((item) => understood.includes(item!.id)).length;
  const next = concepts.find((item) => !understood.includes(item!.id));
  const capstone = capstones[stage.id as keyof typeof capstones];
  const badge = badgeMeta[stage.id as keyof typeof badgeMeta];
  const [capstoneDone, setCapstoneDone] = useState(() => localStorage.getItem(`capstone-${stage.id}`) === "done");
  const [celebrating, setCelebrating] = useState(false);

  const toggleCapstone = () => {
    const nextValue = !capstoneDone;
    setCapstoneDone(nextValue);
    localStorage.setItem(`capstone-${stage.id}`, nextValue ? "done" : "todo");
    if (nextValue) {
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 5200);
    }
  };
  const toggle = (id: number) => {
    const updated = understood.includes(id) ? understood.filter((item) => item !== id) : [...understood, id];
    setUnderstood(updated);
    localStorage.setItem("missing-curriculum-progress", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 px-5 py-5 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link href="/#path" className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-graphite hover:text-signal"><ArrowLeft size={14} /> Kembali ke urutan</Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-signal">Panduan / stage {stage.id}</span>
        </div>
      </header>
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="section-label">{stage.label}</p><p className="mt-2 font-mono text-[12px] font-semibold text-signal">Level Bloom: {stage.bloom}</p>
            <h1 className="mt-5 max-w-xl font-display text-6xl leading-[.9] tracking-[-.05em]">{stage.title}</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-graphite">{stage.promise}</p>
            <div className="mt-10 border-t border-ink/15 pt-5"><span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Perkiraan waktu</span><p className="mt-2 font-display text-3xl">{stage.duration}</p></div>
          </div>
          <div>
            <div className="mb-8 flex items-end justify-between border-b border-ink/15 pb-5"><div><p className="section-label">Progres stage</p><p className="mt-3 font-display text-4xl">{done} / {concepts.length || stage.concepts.length}</p></div><div className="text-right font-mono text-[10px] uppercase tracking-wider text-graphite">{next ? "Berikutnya" : "Stage selesai"}<br /><strong className="text-signal">{next?.title || "Lanjut ke stage berikutnya"}</strong></div></div>
            <div className="space-y-3">{stage.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 border-b border-ink/10 pb-3 text-sm leading-6"><span className="text-signal">→</span>{outcome}</div>)}</div>
            <div className="mt-10"><p className="section-label">Urutan konsep</p><div className="mt-4 space-y-2">{concepts.map((item) => item && <div key={item.id} className="flex items-center gap-3 border border-ink/10 bg-ink/[.02] p-3"><button onClick={() => toggle(item.id)} aria-label={`Mark ${item.title} as understood`} className={`flex h-6 w-6 flex-none items-center justify-center border ${understood.includes(item.id) ? "border-sage bg-sage" : "border-ink/20"}`}>{understood.includes(item.id) ? <Check size={13} /> : <Circle size={8} />}</button><Link href={`/#concept-${item.id}`} className="flex-1 text-sm hover:text-signal">{item.title}</Link><span className="font-mono text-[9px] uppercase tracking-wider text-graphite">{item.level}</span></div>)}</div></div>
          </div>
        </div>

        <section className="mt-20 border-t border-ink/15 pt-10">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div><p className="section-label">Capstone stage</p><h2 className="mt-4 font-display text-4xl leading-none">{capstone.title}</h2><p className="mt-5 text-sm leading-7 text-graphite">{capstone.brief}</p><button onClick={toggleCapstone} className={`mt-6 inline-flex items-center gap-2 border px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wider ${capstoneDone ? "border-sage bg-sage" : "border-signal text-signal"}`}>{capstoneDone ? <><Check size={14} /> Selesai ditandai</> : "Tandai selesai"}</button></div>
            <div className="grid gap-6 sm:grid-cols-3"><div><p className="case-label">Batasan</p><ul className="mt-3 space-y-2 text-sm leading-6">{capstone.constraints.map((item) => <li key={item}>→ {item}</li>)}</ul></div><div><p className="case-label">Hasil akhir</p><p className="mt-3 text-sm leading-6">{capstone.deliverable}</p></div><div><p className="case-label">Cara menilai</p><ul className="mt-3 space-y-2 text-sm leading-6">{capstone.rubric.map((item) => <li key={item}>→ {item}</li>)}</ul></div></div>
          </div>
          <div className={`badge-card mt-8 ${capstoneDone ? "is-unlocked" : "is-locked"}`}><div className="badge-emblem"><Sparkles size={17} /><strong>{badge.mark}</strong></div><div className="flex-1"><p className="case-label">{capstoneDone ? "Capstone selesai" : "Belum selesai"}</p><h3 className="mt-2 font-display text-2xl">{badge.name}</h3><p className="mt-2 text-sm leading-6 text-graphite">{capstoneDone ? "Bukti bahwa kamu bisa membawa konsep ini sampai ke keputusan yang bisa dipertanggungjawabkan." : "Kerjakan capstone ini setelah konsep-konsep stage selesai kamu pelajari."}</p></div><span className="badge-state">{capstoneDone ? "Selesai" : "Belum selesai"}</span></div>
        </section>

        <div className="mt-20 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-3"><div><p className="case-label">Cara latihan</p><h2 className="mt-3 font-display text-3xl">Kerjakan, lalu jelaskan.</h2><p className="mt-4 text-sm leading-6 text-graphite">Pilih satu konsep dari stage ini. Cari bagian sistem yang menyentuhnya, lalu tulis keputusan, risiko, dan trade-off-nya dengan kata-katamu sendiri.</p></div><div className="md:col-span-2"><p className="case-label">Langkah berikutnya</p><p className="mt-3 max-w-2xl font-display text-3xl leading-tight">{next ? `Mulai dari ${next.title}. Baca case-nya, jawab quiz, lalu tandai kalau sudah paham.` : "Semua konsep stage ini sudah kamu tandai. Lanjutkan ke stage berikutnya."}</p><Link href={next ? `/#concept-${next.id}` : "/#path"} className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-signal underline underline-offset-4">{next ? "Buka konsep berikutnya" : "Kembali ke urutan belajar"} <ArrowUpRight size={14} /></Link></div></div>
      </div>

      {celebrating && <div className="celebration-overlay" role="status" aria-live="polite"><div className="celebration-card"><div className="confetti confetti-a" /><div className="confetti confetti-b" /><div className="confetti confetti-c" /><span className="celebration-kicker">CAPSTONE SELESAI</span><div className="celebration-badge"><Sparkles size={28} /><strong>{badge.mark}</strong></div><h2 className="mt-5 font-display text-4xl">{badge.name}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-graphite">Capstone ini sudah kamu tandai. Lihat kembali keputusanmu sebelum lanjut ke konsep berikutnya.</p><button onClick={() => setCelebrating(false)} className="mt-6 border border-ink/20 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wider hover:border-signal hover:text-signal">Kembali ke stage</button></div></div>}
    </main>
  );
}
