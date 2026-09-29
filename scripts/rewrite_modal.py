from pathlib import Path
p=Path('/home/ubuntu/missing-curriculum/client/src/pages/Home.tsx')
s=p.read_text()
start=s.index('      {selected && <div')
end=s.index('    </div>\n  );', start)
modal=r'''      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-ink/15 bg-paper p-6 shadow-2xl sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div><span className="font-mono text-[11px] font-semibold text-signal">{String(selected.id).padStart(3, "0")} / {selected.chapter}</span><h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.9] tracking-[-0.045em]">{selected.title}</h2></div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button onClick={() => { setShareOpen(!shareOpen); setShareNotice(""); }} className="flex items-center gap-2 border border-ink/15 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal" aria-label="Share case"><Share2 size={15}/> Share</button>
                  {shareOpen && <div className="share-menu absolute right-0 top-12 z-10 w-48 border border-ink/15 bg-paper p-2 shadow-xl"><p className="px-2 pb-2 font-mono text-[9px] uppercase tracking-wider text-graphite">Share this field note</p><button onClick={() => shareCase("whatsapp")} className="share-link">WhatsApp</button><button onClick={() => shareCase("linkedin")} className="share-link">LinkedIn</button><button onClick={() => shareCase("x")} className="share-link">X / Twitter</button><button onClick={() => shareCase("copy")} className="share-link"><Copy size={13}/> Copy link</button></div>}
                </div>
                <button onClick={() => setSelected(null)} className="p-2 text-graphite hover:text-signal" aria-label="Close"><X size={20}/></button>
              </div>
            </div>
            {shareNotice && <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-wider text-signal">{shareNotice}</p>}
            <p className="mt-8 max-w-xl text-[17px] leading-7">{selected.description}</p>
            <div className="quiz-panel mt-8"><div className="flex items-center justify-between gap-4"><span className="section-label">What would you do?</span><span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Decision drill</span></div><p className="mt-4 font-display text-2xl leading-tight">{selected.quiz.prompt}</p><div className="mt-5 grid gap-2">{selected.quiz.options.map((option, optionIndex) => <button key={option} onClick={() => setQuizAnswer(optionIndex)} className={`quiz-option ${quizAnswer === optionIndex ? (optionIndex === selected.quiz.answer ? "correct" : "wrong") : ""}`}><span className="quiz-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{quizAnswer === optionIndex && (optionIndex === selected.quiz.answer ? <CheckCircle2 className="quiz-status" size={18}/> : <XCircle className="quiz-status" size={18}/>)}{quizAnswer === optionIndex && <span className="ml-auto font-mono text-[9px] uppercase">{optionIndex === selected.quiz.answer ? "Correct" : "Try again"}</span>}</button>)}</div>{quizAnswer !== null && <div className={`quiz-feedback ${quizAnswer === selected.quiz.answer ? "correct" : "wrong"}`}><strong>{quizAnswer === selected.quiz.answer ? "Good call." : "Not quite."}</strong> {selected.quiz.explanation}</div>}</div>
            <div className="case-panel mt-8"><div className="flex items-start justify-between gap-5"><div><span className="section-label">Case / Apply it</span><h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.03em]">{selected.caseTitle}</h3></div><span className="case-stamp">FIELD<br/>NOTE</span></div><div className="mt-6 grid gap-5 sm:grid-cols-3"><div><span className="case-label">Context</span><p className="mt-2 text-sm leading-6">{selected.caseContext}</p></div><div><span className="case-label">Decision</span><p className="mt-2 text-sm leading-6">{selected.caseDecision}</p></div><div><span className="case-label">Reflect</span><p className="mt-2 text-sm leading-6">{selected.caseQuestion}</p></div></div></div>
            {selected.technical && <div className="technical-panel mt-5"><div className="flex items-center justify-between"><span className="section-label">{selected.technical.label}</span><span className="font-mono text-[10px] text-graphite">{selected.technical.kind === "code" ? "diff" : "flow"}</span></div>{selected.technical.kind === "code" ? <div className="code-diff mt-4"><div className="diff-line removed">− {selected.technical.before}</div><div className="diff-line added">+ {selected.technical.after}</div></div> : <div className="diagram-flow mt-5">{selected.technical.nodes?.map((node, nodeIndex) => <span key={node}>{node}{nodeIndex < (selected.technical.nodes?.length || 0) - 1 && <b>→</b>}</span>)}</div>}</div>}
            <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="callout"><span className="section-label">Try this</span><p className="mt-3 text-sm leading-6">{selected.example}</p></div><div className="callout warn"><span className="section-label">Watch out</span><p className="mt-3 text-sm leading-6">{selected.watch}</p></div></div>
            <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between"><span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Related concepts coming next</span><Button onClick={() => { toggleUnderstood(selected.id); setSelected(null); }} className={understood.includes(selected.id) ? "bg-sage text-ink hover:bg-sage" : "bg-signal text-paper hover:bg-signal/90"}>{understood.includes(selected.id) ? <><Check size={15}/> Understood</> : "Mark as understood"}</Button></div>
          </div>
        </div>
      )}
'''
s=s[:start]+modal+s[end:]
p.write_text(s)
print('rewrote modal as multiline JSX')
