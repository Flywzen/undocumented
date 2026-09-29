import { useState } from "react";

const levels = [
  { name: "Understand", stage: "01", text: "Menjelaskan alurnya dari input sampai output dengan kata sendiri." },
  { name: "Apply", stage: "01", text: "Mengubah satu bagian dan memprediksi apa yang ikut berubah." },
  { name: "Analyze", stage: "02", text: "Menemukan penyebab kalau bagian ini error di production." },
  { name: "Evaluate", stage: "03", text: "Menilai apakah pendekatannya layak dan menyebut trade-off-nya." },
  { name: "Create", stage: "04", text: "Merancang ulang dengan constraint baru dan menjelaskan alasannya." },
];

export default function BloomCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => levels.map(() => false));
  let reached = -1;
  while (reached + 1 < levels.length && checked[reached + 1]) reached += 1;
  const next = levels[Math.min(reached + 1, levels.length - 1)];
  const toggle = (i: number) => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="mt-14 border border-ink/50 bg-card p-6 lg:p-8" aria-labelledby="bloom-check-title">
      <p className="section-label">Self-check</p>
      <h3 id="bloom-check-title" className="mt-3 font-display text-3xl leading-tight tracking-[-0.03em]">Di level Bloom mana kamu sekarang?</h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite">Pilih satu fitur yang kamu bikin bareng AI bulan ini. Tanpa buka chat AI, centang yang bisa kamu lakukan. Hasilnya perkiraan kasar, bukan tes.</p>
      <ul className="mt-6 grid gap-3">
        {levels.map((level, i) => (
          <li key={level.name}>
            <label className="flex cursor-pointer items-start gap-3 border border-ink/50 bg-paper p-3 text-sm leading-6">
              <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="mt-1.5 h-4 w-4 accent-[var(--signal)]" />
              <span><strong className="font-mono text-[11px] text-signal">{level.name}</strong><br />{level.text}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[15px] leading-7" role="status">
        {reached < 0
          ? <>Mulai dari stage 01: baca kodenya sebelum mengubahnya. </>
          : <>Kamu solid sampai <strong>{levels[reached].name}</strong>. Level berikutnya: <strong>{next.name}</strong>. </>}
        <a href={`/path/${reached < 0 ? "01" : next.stage}`} className="font-mono text-[11px] font-bold text-signal underline underline-offset-4">Buka stage {reached < 0 ? "01" : next.stage}</a>
      </p>
    </div>
  );
}
