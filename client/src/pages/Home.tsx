/* Editorial Terminal: content-first handbook interface. This page keeps concepts scannable, warm, and practical. */
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronRight, CircleHelp, Command, Copy, Menu, Moon, Search, Share2, Sparkles, Sun, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BloomCheck from "@/components/BloomCheck";
import { curriculum, curriculumSourceCount, type CurriculumItem } from "@/lib/curriculum";
import { syllabus } from "@/lib/syllabus";
import { coreDeepDives, type CoreDeepDive } from "@/lib/coreDeepDives";
import { runnableExamples, type RunnableExample } from "@/lib/runnableExamples";
import { runnableTypeScript } from "@/lib/runnableTypeScript";
import { interactiveLabs } from "@/lib/interactiveLabs";
import { reliabilityTests, simulateCache, simulateRetry } from "@/lib/interactiveExperiments";
import { realWorldCaseStudies, type RealWorldCaseStudy } from "@/lib/realWorldCaseStudies";
import { useTheme } from "@/contexts/ThemeContext";

type Concept = CurriculumItem & { kicker: string; description: string; deepDive?: CoreDeepDive; runnable?: RunnableExample; realWorldCaseStudy?: RealWorldCaseStudy };
const concepts: Concept[] = curriculum.map((item) => ({ ...item, kicker: item.level, description: item.summary, deepDive: coreDeepDives[item.title], runnable: runnableExamples[item.title], realWorldCaseStudy: realWorldCaseStudies[item.title] }));
const standaloneCaseConcepts: Concept[] = [
  { ...concepts.find((item) => item.title === "Schema Evolution")!, id: 1001, title: "Online Schema Change (Meta)", realWorldCaseStudy: realWorldCaseStudies["Online Schema Change (Meta)"] },
  { ...concepts.find((item) => item.title === "Schema Evolution")!, id: 1002, title: "Spanner Schema Migration (Google)", realWorldCaseStudy: realWorldCaseStudies["Spanner Schema Migration (Google)"] },
  { ...concepts.find((item) => item.title === "Backpressure")!, id: 1003, title: "Control Plane Backpressure (Amazon)", realWorldCaseStudy: realWorldCaseStudies["Control Plane Backpressure (Amazon)"] },
];
const coreConceptCount = Object.keys(coreDeepDives).length;
const featuredCases = [...concepts.filter((item) => item.realWorldCaseStudy), ...standaloneCaseConcepts];
const caseCompanies = ["All", ...Array.from(new Set(featuredCases.map((item) => item.realWorldCaseStudy!.company)))];
const caseTopics = ["All", ...Array.from(new Set(featuredCases.flatMap((item) => item.realWorldCaseStudy!.topics)))];
const badgeMeta = { "01": { name: "Signal Finder", mark: "01" }, "02": { name: "Boundary Keeper", mark: "02" }, "03": { name: "Failure Navigator", mark: "03" }, "04": { name: "Decision Steward", mark: "04" } } as const;
const chapters = Array.from(new Map(curriculum.map((item) => [item.category, item.chapter.replace(`${item.category} · `, "")])).entries()).map(([id, label], index) => ({ id, label, count: curriculum.filter((item) => item.category === id).length, tone: ["orange", "sage", "ink"][index % 3] }));
const judgmentSteps = [
  { label: "Situation", text: "Start with the messy situation, not the pattern you want to apply." },
  { label: "Observation", text: "Separate what the system is showing from what you think it means." },
  { label: "Hypotheses", text: "Keep competing explanations alive long enough to test them." },
  { label: "Evidence", text: "Find the next piece of information that can change your mind." },
  { label: "Decision", text: "Choose the smallest safe intervention and state its trade-off." },
  { label: "Consequence", text: "Trace what the decision changes after the immediate fix." },
];
const judgmentCase = concepts.find((item) => item.realWorldCaseStudy?.judgmentLoop);
const judgmentStudy = judgmentCase?.realWorldCaseStudy;
const judgmentLoop = judgmentStudy?.judgmentLoop;
type DiscussionEntry = { id: number; name: string; body: string; createdAt: string };

function InitialSkeleton() {
  return <div className="initial-skeleton" role="status" aria-live="polite" aria-label="Loading Undocumented">
    <header className="initial-skeleton-header"><div className="initial-skeleton-brand"><span className="initial-skeleton-mark"/><span className="initial-skeleton-wordmark"/></div><div className="initial-skeleton-nav"><span/><span/><span/><span/></div><span className="initial-skeleton-control"/></header>
    <main className="initial-skeleton-main"><section className="initial-skeleton-hero"><div className="initial-skeleton-copy"><span className="initial-skeleton-kicker"/><span className="initial-skeleton-title title-one"/><span className="initial-skeleton-title title-two"/><span className="initial-skeleton-title title-three"/><span className="initial-skeleton-rule"/><span className="initial-skeleton-body"/><span className="initial-skeleton-body short"/></div><div className="initial-skeleton-art"><span className="initial-skeleton-diagram"/><span className="initial-skeleton-note"/></div></section><section className="initial-skeleton-section"><span className="initial-skeleton-section-label"/><span className="initial-skeleton-section-title"/><div className="initial-skeleton-cards"><span/><span/><span/></div></section></main><span className="initial-skeleton-status">Preparing the field guide <i/></span>
  </div>;
}

function BloomTag({ level }: { level: string }) { const hint: Record<string,string> = { Understand: "Menjelaskan dengan kata sendiri", Apply: "Memakai di situasi nyata", Analyze: "Membedah penyebab dan hubungan", Evaluate: "Menilai dan memilih dengan alasan", Create: "Merancang solusi baru" }; return <span className="bloom-tag" title={hint[level]}>Bloom: {level}</span>; }

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [caseQuery, setCaseQuery] = useState("");
  const [caseCompany, setCaseCompany] = useState("All");
  const [caseTopic, setCaseTopic] = useState("All");
  const [visibleCaseCount, setVisibleCaseCount] = useState(5);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const [codeNotice, setCodeNotice] = useState("");
  const [codeLanguage, setCodeLanguage] = useState<"JavaScript" | "TypeScript">("JavaScript");
  const [runOutput, setRunOutput] = useState("");
  const [labStep, setLabStep] = useState(0);
  const [cacheCapacity, setCacheCapacity] = useState(2);
  const [cacheRequests, setCacheRequests] = useState("user:1,user:1,user:2,user:1");
  const [retryFailures, setRetryFailures] = useState(2);
  const [retryAttempts, setRetryAttempts] = useState(3);
  const [retryBaseDelay, setRetryBaseDelay] = useState(100);
  const [testChoice, setTestChoice] = useState("");
  const [conceptTab, setConceptTab] = useState<"situation" | "decision" | "consequence">("situation");
  const [conceptFeedback, setConceptFeedback] = useState<"yes" | "no" | "">("");
  const [selected, setSelected] = useState<Concept | null>(null);
  const [modalClosing, setModalClosing] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("#top > section:not(:first-of-type), footer"));
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    targets.forEach((el) => { if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("reveal"); io.observe(el); } });
    return () => io.disconnect();
  }, []);
  const [understood, setUnderstood] = useState<number[]>(() => JSON.parse(localStorage.getItem("missing-curriculum-progress") || "[]"));
  const [mobileNav, setMobileNav] = useState(false);
  const [discussionName, setDiscussionName] = useState(() => localStorage.getItem("missing-curriculum-discussion-name") || "");
  const [discussionBody, setDiscussionBody] = useState("");
  const [discussionEntries, setDiscussionEntries] = useState<DiscussionEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem("missing-curriculum-netflix-discussion") || "[]") as DiscussionEntry[]; } catch { return []; }
  });
  const [badgeNotice, setBadgeNotice] = useState("");
  const [badgeShareOpen, setBadgeShareOpen] = useState("");
  const [capstonesDone, setCapstonesDone] = useState<string[]>(() => syllabus.filter((stage) => localStorage.getItem(`capstone-${stage.id}`) === "done").map((stage) => stage.id));
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const totalLearningItems = curriculum.length + syllabus.length;
  useEffect(() => {
    const timer = window.setTimeout(() => setIsInitialLoading(false), 520);
    return () => window.clearTimeout(timer);
  }, []);
  const submitDiscussion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = discussionBody.trim();
    const name = discussionName.trim() || "Anonymous engineer";
    if (!body) return;
    const next: DiscussionEntry[] = [{ id: Date.now(), name, body, createdAt: new Date().toISOString() }, ...discussionEntries];
    setDiscussionEntries(next);
    setDiscussionBody("");
    localStorage.setItem("missing-curriculum-discussion-name", name);
    localStorage.setItem("missing-curriculum-netflix-discussion", JSON.stringify(next));
  };
  const deleteDiscussion = (id: number) => {
    const next = discussionEntries.filter((entry) => entry.id !== id);
    setDiscussionEntries(next);
    localStorage.setItem("missing-curriculum-netflix-discussion", JSON.stringify(next));
  };
  const discussionExportText = () => [
    "UNDOCUMENTED / NETFLIX CASE DISCUSSION",
    "Exported: " + new Date().toLocaleString(),
    "",
    ...discussionEntries.flatMap((entry, index) => [`${index + 1}. ${entry.name} · ${new Date(entry.createdAt).toLocaleDateString()}`, entry.body, ""]),
  ].join("\\n");
  const exportDiscussionText = () => {
    const blob = new Blob([discussionExportText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "missing-curriculum-netflix-discussion.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const printDiscussionAsPdf = () => {
    const escapeHtml = (value: string) => value.replace(/[&<>\"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\\"": "&quot;", "'": "&#039;" }[character] || character));
    const popup = window.open("", "_blank", "width=760,height=900");
    if (!popup) return;
    popup.opener = null;
    popup.document.write(`<html><head><title>Netflix case discussion</title><style>body{font-family:Arial,sans-serif;max-width:720px;margin:48px auto;color:#18211f;line-height:1.6}h1{font-size:26px;line-height:1.1}p{white-space:pre-wrap}.entry{border-left:3px solid #e35d2f;padding:10px 16px;margin:20px 0;background:#f8f6f0}.meta{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#66706b}@media print{body{margin:20px auto}}</style></head><body><div class="meta">Undocumented / Netflix case</div><h1>Discussion notes</h1>${discussionEntries.length ? discussionEntries.map((entry) => `<article class="entry"><div class="meta">${escapeHtml(entry.name)} · ${escapeHtml(new Date(entry.createdAt).toLocaleDateString())}</div><p>${escapeHtml(entry.body)}</p></article>`).join("") : "<p>No notes yet.</p>"}</body></html>`);
    popup.document.close();
    popup.focus();
    window.setTimeout(() => popup.print(), 180);
  };
  const completedLearningItems = understood.length + capstonesDone.length;
  const overallProgress = Math.round((completedLearningItems / totalLearningItems) * 100);
  const remainingConcepts = Math.max(curriculum.length - understood.length, 0);
  const remainingCapstones = Math.max(syllabus.length - capstonesDone.length, 0);

  const openConcept = (concept: Concept) => {
    setSelected(concept);
    setModalClosing(false);
    setQuizAnswer(null);
    setCodeLanguage("JavaScript");
    setRunOutput("");
    setLabStep(0);
    setTestChoice("");
    setConceptTab("situation");
    setConceptFeedback((localStorage.getItem(`concept-feedback-${concept.id}`) as "yes" | "no" | null) || "");
  };

  const closeSelected = () => {
    if (!selected || modalClosing) return;
    setModalClosing(true);
    window.setTimeout(() => {
      setSelected(null);
      setModalClosing(false);
      setShareOpen(false);
      setShareNotice("");
    }, 220);
  };

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") closeSelected(); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selected, modalClosing]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 767px)");
    if (reduceMotion.matches || smallScreen.matches) return;
    let frame = 0;
    const updateParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const offset = Math.max(-72, Math.min(0, window.scrollY * -0.12));
        document.documentElement.style.setProperty("--parallax-y", `${offset}px`);
        frame = 0;
      });
    };
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateParallax);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--parallax-y");
    };
  }, []);

  const filtered = useMemo(() => concepts.filter((item) => {
    const matchesChapter = activeChapter === "All" || item.chapter.startsWith(activeChapter);
    const matchesLevel = activeLevel === "All" || item.level === activeLevel;
    const matchesQuery = `${item.title} ${item.kicker} ${item.description} ${item.caseTitle} ${item.caseContext}`.toLowerCase().includes(query.toLowerCase());
    return matchesChapter && matchesLevel && matchesQuery;
  }), [activeChapter, activeLevel, query]);

  const relatedCases = useMemo(() => {
    if (!selected?.realWorldCaseStudy) return [];
    const currentStudy = selected.realWorldCaseStudy;
    return featuredCases.filter((item) => item.id !== selected.id).map((item) => {
      const study = item.realWorldCaseStudy!;
      const sameChapter = item.chapter === selected.chapter;
      const sameCompany = study.company === currentStudy.company;
      const score = (sameChapter ? 3 : 0) + (sameCompany ? 1 : 0);
      const reason = sameChapter ? "Satu chapter" : sameCompany ? `Case lain dari ${study.company}` : "Dekat dengan topik ini";
      return { concept: item, study, score, reason };
    }).sort((a, b) => b.score - a.score || a.concept.title.localeCompare(b.concept.title)).slice(0, 3);
  }, [selected]);

  useEffect(() => {
    setVisibleCaseCount(5);
  }, [caseCompany, caseQuery, caseTopic]);

  const filteredFeaturedCases = useMemo(() => featuredCases.filter((item) => {
    const study = item.realWorldCaseStudy!;
    const normalizedQuery = caseQuery.trim().toLowerCase();
    const matchesCompany = caseCompany === "All" || study.company === caseCompany;
    const matchesTopic = caseTopic === "All" || study.topics.includes(caseTopic);
    const matchesQuery = !normalizedQuery || `${study.company} ${item.title} ${study.title} ${study.takeaway}`.toLowerCase().includes(normalizedQuery);
    return matchesCompany && matchesTopic && matchesQuery;
  }), [caseCompany, caseQuery, caseTopic]);
  const visibleFeaturedCases = filteredFeaturedCases.slice(0, visibleCaseCount);
  const activeCaseFilterSummary = [caseCompany !== "All" ? caseCompany : "", caseTopic !== "All" ? caseTopic : "", caseQuery.trim() ? `“${caseQuery.trim()}”` : ""].filter(Boolean).join(" · ");

  const shareCase = async (channel?: string) => {
    if (!selected) return;
    const url = `${window.location.origin}${window.location.pathname}#concept-${selected.id}`;
    const text = `${selected.title} · ${selected.caseTitle}`;
    const fullText = `${text}\n${selected.caseContext}\n${url}`;
    if (!channel && navigator.share) {
      try { await navigator.share({ title: selected.title, text, url }); setShareNotice("Shared"); } catch { /* user dismissed native sheet */ }
      return;
    }
    if (channel === "copy") { await navigator.clipboard.writeText(fullText); setShareNotice("Link copied"); setShareOpen(false); return; }
    const shareLinks: Record<string, string> = { whatsapp: `https://wa.me/?text=${encodeURIComponent(fullText)}`, linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` };
    if (channel && shareLinks[channel]) window.open(shareLinks[channel], "_blank", "noopener,noreferrer");
  };

  const submitConceptFeedback = (value: "yes" | "no") => {
    if (!selected) return;
    setConceptFeedback(value);
    localStorage.setItem(`concept-feedback-${selected.id}`, value);
  };

  const activeCode = selected?.runnable ? (codeLanguage === "TypeScript" ? runnableTypeScript[selected.title] || selected.runnable.code : selected.runnable.code) : "";
  const runCodeInBrowser = async () => {
    if (!selected?.runnable) return;
    if (activeCode.includes("import ")) { setRunOutput("This example uses Node's built-in test runner. Copy it to a local file to run the test suite."); return; }
    const logs: string[] = [];
    const originalLog = console.log;
    try {
      console.log = (...values: unknown[]) => logs.push(values.map((value) => typeof value === "string" ? value : JSON.stringify(value)).join(" "));
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (code: string) => () => Promise<void>;
      await new AsyncFunction(activeCode)();
      setRunOutput(logs.join("\\n") || "Ran successfully with no console output.");
    } catch (error) {
      setRunOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally { console.log = originalLog; }
  };
  const cacheExperiment = simulateCache(cacheRequests.split(",").map((item) => item.trim()).filter(Boolean), Math.max(1, cacheCapacity));
  const retryExperiment = simulateRetry(Math.max(0, retryFailures), Math.max(1, retryAttempts), Math.max(10, retryBaseDelay));
  const selectedTest = selected ? reliabilityTests[selected.title]?.find((scenario) => scenario.id === testChoice) : undefined;
  const copyRunnableCode = async () => {
    if (!selected?.runnable) return;
    await navigator.clipboard?.writeText(activeCode);
    setCodeNotice("Code copied");
    window.setTimeout(() => setCodeNotice(""), 1800);
  };
  const shareBadge = async (stageId: string, channel?: string) => {
    const badge = badgeMeta[stageId as keyof typeof badgeMeta];
    const url = `${window.location.origin}${window.location.pathname}#path`;
    const text = `Badge unlocked: ${badge.name} · Undocumented`;
    const fullText = `${text}\nI completed a capstone in Undocumented.\n${url}`;
    if (!channel && navigator.share) { try { await navigator.share({ title: text, text: fullText, url }); setBadgeNotice("Badge shared"); } catch { /* dismissed */ } return; }
    if (channel === "copy") { await navigator.clipboard?.writeText(fullText); setBadgeNotice("Badge share card copied"); setBadgeShareOpen(""); return; }
    const shareLinks: Record<string, string> = { whatsapp: `https://wa.me/?text=${encodeURIComponent(fullText)}`, linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` };
    if (channel && shareLinks[channel]) { window.open(shareLinks[channel], "_blank", "noopener,noreferrer"); setBadgeShareOpen(""); }
  };

  const toggleUnderstood = (id: number) => {
    const next = understood.includes(id) ? understood.filter((item) => item !== id) : [...understood, id];
    setUnderstood(next); localStorage.setItem("missing-curriculum-progress", JSON.stringify(next));
  };

  if (isInitialLoading) return <InitialSkeleton />;

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-signal/20">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Undocumented home">
            <span className="brand-mark"><span /><span /><span /></span>
            <span className="wordmark"><em>Undocumented</em></span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-graphite md:flex">
            <a href="#curriculum" className="transition-colors hover:text-signal">Learning path</a>
            <a href="#index" className="transition-colors hover:text-signal">Concepts</a>
            <a href="#judgment" className="transition-colors hover:text-signal">Judgment</a>
            <a href="#about" className="transition-colors hover:text-signal">Why this exists</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 font-mono text-[10px] text-graphite sm:flex"><span className="status-dot"/> {understood.length} / {curriculumSourceCount} selesai</div><button type="button" onClick={() => toggleTheme?.()} className="theme-toggle" aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light mode" : "Dark mode"}><span key={theme} className="theme-toggle-icon">{theme === "dark" ? <Sun size={15}/> : <Moon size={15}/>}</span></button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X size={18}/> : <Menu size={18}/>}</Button>
            <a href="#index" className="hidden bg-ink px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-paper transition-transform hover:-translate-y-0.5 sm:block">Choose a concept <ArrowUpRight size={13} className="ml-1 inline"/></a>
          </div>
        </div>
        {mobileNav && <div className="border-t border-ink/10 px-5 py-4 font-mono text-[11px] uppercase tracking-wider md:hidden"><a className="mr-5" href="#curriculum" onClick={() => setMobileNav(false)}>Learning path</a><a href="#index" onClick={() => setMobileNav(false)}>Concepts</a></div>}
      </header>

      <div className="index-rail" aria-hidden="true"><span>FIELD GUIDE</span><i/><span>01</span><span>02</span><span>03</span><span>04</span></div><main id="top">
        <section className="relative overflow-hidden border-b border-ink/10">
          <div className="mx-auto grid max-w-[1440px] items-stretch lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)]">
            <div className="flex min-h-[620px] flex-col justify-between px-5 py-14 lg:px-16 lg:py-20">
              <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-signal"><span className="h-px w-8 bg-signal"/>Field guide / 2026</div>
              <div className="max-w-[720px]">
                <p className="mb-5 max-w-sm font-mono text-[11px] uppercase leading-[1.55] tracking-[0.14em] text-graphite">Some lessons only appear after the feature ships.</p>
                <h1 className="max-w-[720px] font-display text-[clamp(3.8rem,8vw,8rem)] leading-[0.86] tracking-[-0.055em]">Delegate<br/>the task,<br/><em className="text-signal">not the judgment.</em></h1>
              </div>
              <div className="flex max-w-[620px] flex-col justify-between gap-6 border-t border-ink/50 pt-5 sm:flex-row sm:items-end"><p className="max-w-md text-[15px] leading-7 text-graphite">A field guide to becoming a powerful developer with AI: understand the system, verify what the model writes, and own what reaches production.</p><a href="#index" className="hero-case-cta shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink" aria-label="Start with a case"><span className="hero-case-cta-label">Start with a case</span><span className="hero-case-cta-line" aria-hidden="true"/><ArrowUpRight size={14} className="hero-case-cta-icon" aria-hidden="true"/></a></div>
            </div>
            <div className="hero-art relative min-h-[400px] lg:min-h-0"><img src="/undocumented-hero.png" alt="A source file where documentation slots are empty and a single highlighted line has no docstring" className="parallax-hero-image absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-paper via-transparent to-transparent lg:from-paper/20"/><div className="parallax-hero-caption absolute bottom-7 left-7 right-7 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-paper"><span>01 · The line that ships</span><span>↓ scroll to inspect</span></div></div>
          </div>
        </section>

        <section id="judgment" className="border-y border-ink/10 bg-ink text-paper"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-24"><div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="section-label">01 / Engineering judgment</p><h2 className="mt-5 max-w-md font-display text-5xl leading-[0.95] tracking-[-0.04em]">Reading the code is one step. You also decide whether the change is safe.</h2><p className="mt-6 max-w-sm text-[15px] leading-7 text-paper/85">AI writes a plausible implementation in seconds. You check the assumptions behind it and decide whether it is safe to ship.</p><div className="mt-8 border-l-2 border-signal pl-4"><p className="font-mono text-[10px] uppercase tracking-wider text-signal">North-star question</p><p className="judgment-question mt-2 font-display text-2xl leading-tight text-paper" tabIndex={0}><span className="judgment-question-mark" aria-hidden="true">?</span>What would change your mind?</p></div></div><div><div className="judgment-loop">{judgmentSteps.map((step, index) => <div key={step.label} className="judgment-step"><span className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal">{String(index + 1).padStart(2, "0")}</span><strong className="mt-4 block font-display text-3xl leading-none">{step.label}</strong><p className="mt-3 text-sm leading-6 text-paper/85">{step.text}</p></div>)}</div><p className="mt-6 max-w-xl font-mono text-[10px] uppercase leading-6 tracking-wider text-paper/75">Situation → observation → hypotheses → evidence → decision → consequence</p></div></div></div></section>

        <section id="curriculum" className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div><p className="section-label">01 / Questions worth carrying</p><h2 className="mt-5 max-w-md font-display text-5xl leading-[0.95] tracking-[-0.04em] lg:text-6xl">Not another roadmap.<br/><em className="text-signal">The parts a quickstart can’t cover.</em></h2><p className="mt-6 max-w-sm text-[15px] leading-7 text-graphite">Pick a question you recognise. Read the concept, open the case, and find the trade-offs under the implementation.</p></div>
            <div className="border-t border-ink/50">{chapters.slice(0, 8).map((chapter, i) => <button key={chapter.id} onClick={() => { setActiveChapter(chapter.id); setActiveLevel("All"); document.getElementById("index")?.scrollIntoView({ behavior: "smooth" }); }} className="group flex w-full items-center gap-5 border-b border-ink/50 py-5 text-left transition-colors hover:bg-ink/[0.03]"><span className={`chapter-letter tone-${chapter.tone}`}>{chapter.id}</span><span className="flex-1"><span className="block font-display text-2xl tracking-[-0.02em]">{chapter.label}</span><span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-graphite">{chapter.count} concepts · {i < 2 ? "good place to begin" : "look inside the case"}</span></span><ChevronRight className="text-graphite transition-transform group-hover:translate-x-1 group-hover:text-signal" size={19}/></button>)}</div>
          </div>
        </section>

        <section id="path" className="border-y border-ink/10 bg-sage/25"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-28"><div className="mb-12 max-w-2xl"><p className="section-label">02 / A way through the material</p><h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.04em]">The feature works.<br/><em className="text-signal">Now look beneath it.</em></h2><p className="mt-6 max-w-xl text-[15px] leading-7 text-graphite">Start where the question feels familiar. Each stage moves you up one level of Bloom's Taxonomy: understand and apply, analyze, evaluate, then create.</p></div><p className="mb-5 max-w-2xl border-l-2 border-signal pl-4 text-sm leading-6 text-graphite">A simple way in: open a <strong>core</strong> concept, answer its case, mark it when the reasoning is clear, then follow the thread.</p><div className="learning-path-grid grid gap-4 lg:grid-cols-4">{syllabus.map((stage) => <article key={stage.id} className="syllabus-card"><div className="flex items-start justify-between"><span className="font-mono text-[11px] font-bold text-signal">{stage.id}</span><span className="font-mono text-[9px] uppercase tracking-wider text-graphite">{stage.duration}</span></div><p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-graphite">{stage.label}</p><p className="mt-2 font-mono text-[11px] font-semibold text-signal">Bloom: {stage.bloom}</p><h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.03em]">{stage.title}</h3><p className="mt-4 text-sm leading-6 text-graphite">{stage.promise}</p><div className="mt-6 border-t border-ink/10 pt-4"><p className="case-label">What you will practise</p><ul className="mt-3 space-y-2 text-sm leading-5">{stage.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-signal">→</span>{outcome}</li>)}</ul></div><div className="mt-6 font-mono text-[10px] leading-5 text-graphite"><span className="case-label">{stage.id === "01" ? "Mulai dari sini" : "Lanjutkan dari sini"}</span><br/>{stage.concepts.map((name) => `${name}${coreDeepDives[name] ? " · core" : ""}`).join(" · ")}</div><div className="mt-6 border-t border-ink/10 pt-4"><p className="font-mono text-[10px] uppercase tracking-wider text-graphite">Stage progress</p><p className="mt-2 font-display text-2xl">{stage.concepts.filter((name) => { const item = concepts.find((concept) => concept.title === name); return item && understood.includes(item.id); }).length} / {stage.concepts.length}</p><p className="mt-1 text-xs leading-5 text-graphite">Next: {stage.concepts.find((name) => { const item = concepts.find((concept) => concept.title === name); return item && !understood.includes(item.id); }) || "Stage complete"}</p></div><a href={`/path/${stage.id}`} className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-signal underline underline-offset-4">Follow this stage <ArrowUpRight size={13}/></a></article>)}</div><BloomCheck /></div></section>

        <section id="achievements" className="hidden border-y border-ink/10 bg-ink text-paper"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-24"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><p className="section-label text-signal">03 / Your field notes</p><h2 className="mt-5 max-w-md font-display text-5xl leading-[.95] tracking-[-.04em]">Progress yang <em className="text-signal">bisa kamu lihat.</em></h2><p className="mt-6 max-w-sm text-[15px] leading-7 text-paper/85">Konsep dan capstone dihitung sebagai satu perjalanan. Selesaikan keduanya untuk mengubah bacaan menjadi bukti kerja.</p><div className="mt-10 flex items-end gap-4"><span className="font-display text-7xl leading-none text-signal">{overallProgress}%</span><span className="pb-1 font-mono text-[10px] uppercase tracking-wider text-paper/80">overall progress<br/>{completedLearningItems} / {totalLearningItems} signals</span></div><div className="progress-summary"><div className="mt-5 h-2 bg-paper/15"><div className="progress-fill h-full bg-signal" style={{ width: `${overallProgress}%` }}/></div><p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-paper/80">{remainingConcepts} konsep · {remainingCapstones} capstones left</p></div>{badgeNotice && <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-signal">{badgeNotice}</p>}</div><div><div className="mb-4 flex items-center justify-between"><p className="section-label text-signal">Badge collection</p><span className="font-mono text-[10px] uppercase tracking-wider text-paper/75">{capstonesDone.length} / {syllabus.length} earned</span></div><div className="grid gap-3 sm:grid-cols-2">{syllabus.map((stage) => { const badge = badgeMeta[stage.id as keyof typeof badgeMeta]; const unlocked = capstonesDone.includes(stage.id); return <div key={stage.id} className={`achievement-card ${unlocked ? "earned" : "locked"}`}><div className="achievement-emblem"><Sparkles size={16}/><strong>{badge.mark}</strong></div><div className="min-w-0 flex-1"><p className="font-mono text-[9px] uppercase tracking-wider text-signal">{unlocked ? "Unlocked" : "Locked"}</p><h3 className="mt-2 font-display text-2xl">{badge.name}</h3><p className="mt-1 text-xs leading-5 text-paper/85">{stage.label}</p></div>{unlocked && <div className="relative"><button onClick={() => setBadgeShareOpen(badgeShareOpen === stage.id ? "" : stage.id)} aria-label={`Share ${badge.name} badge`} className="share-badge-button"><Share2 size={15}/></button>{badgeShareOpen === stage.id && <div className="badge-share-menu"><button onClick={() => shareBadge(stage.id)} className="share-link">Native share</button><button onClick={() => shareBadge(stage.id, "whatsapp")} className="share-link">WhatsApp</button><button onClick={() => shareBadge(stage.id, "linkedin")} className="share-link">LinkedIn</button><button onClick={() => shareBadge(stage.id, "x")} className="share-link">X / Twitter</button><button onClick={() => shareBadge(stage.id, "copy")} className="share-link">Copy card text</button></div>}</div>}</div>; })}</div></div></div></div></section>

        <section id="about" className="border-y border-ink/10 bg-sage/25"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:px-16 lg:py-20"><div><p className="section-label">03 / Why this exists</p><div className="mt-5 flex items-start gap-4"><span className="font-mono text-5xl leading-none text-signal">?</span><h2 className="max-w-md font-display text-4xl leading-[0.98] tracking-[-0.04em]">AI takes the task. <em>You keep the decision, and the blame.</em></h2></div></div><div className="grid gap-8 sm:grid-cols-3"><div><span className="stat-number">{curriculumSourceCount}</span><p className="mt-3 text-sm leading-6 text-graphite">concepts across systems, teams, and production decisions. This is the top bar of your T.</p></div><div><span className="stat-number">30</span><p className="mt-3 text-sm leading-6 text-graphite">core concepts in depth, each with a mental model, a trade-off, and practice. Pick one as the stem of your T.</p></div><div><span className="stat-number">0</span><p className="mt-3 text-sm leading-6 text-graphite">universal answers. Every pattern has a context and a cost.</p></div></div></div></section>

        <section id="index" className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-28">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><div className="flex items-center gap-3"><Tooltip><TooltipTrigger asChild><button type="button" className="section-label border-b border-dotted border-signal/70 pb-1 text-left">03 / The overlooked parts <CircleHelp size={13} className="ml-1 inline-block align-[-2px]" /></button></TooltipTrigger><TooltipContent side="top" className="max-w-[300px] border-ink bg-ink text-paper">Contoh: cache yang dingin setelah failover, retry yang berubah jadi storm, atau duplicate payment setelah timeout. Biasanya bukan bagian dari quickstart, tapi ikut menentukan apakah sistemmu bisa dipercaya.</TooltipContent></Tooltip></div><h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.04em]">The parts experience<br/><em className="text-signal">teaches you to notice.</em></h2></div><div className="flex items-center gap-3 border-b border-ink/30 pb-2 lg:w-[330px]"><Search size={17} className="text-graphite"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari konsep atau case..." className="w-full bg-transparent font-mono text-[11px] outline-none placeholder:text-graphite"/><kbd className="hidden border border-ink/50 px-1.5 py-0.5 font-mono text-[9px] text-graphite sm:block"><Command size={10} className="inline"/> K</kbd></div></div>
          <p className="mb-5 max-w-2xl text-sm leading-6 text-graphite">Developer yang kuat bersama AI memahami sistem yang ia ubah, memeriksa hasil AI dengan bukti, dan menjawab atas keputusannya di production. Kurikulum ini melatih ketiganya lewat konsep, kasus, dan kuis. Prompt yang baik lahir dari pemahaman itu.</p><p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-graphite">Menampilkan {filtered.length} dari {curriculumSourceCount} konsep · <span className="text-signal">{coreConceptCount} core deep-dives</span></p><div className="mb-8 flex flex-wrap gap-2"><span className="filter-group-label">Topic</span>{["All", ...chapters.map(c => c.id)].map((id) => <button key={id} onClick={() => setActiveChapter(id)} className={`filter-chip ${activeChapter === id ? "active" : ""}`}>{id === "All" ? "Semua konsep" : `Chapter ${id}`}</button>)}<span className="filter-group-label ml-3">Level</span>{["All", "Foundation", "Working knowledge", "Advanced"].map((id) => <button key={id} onClick={() => setActiveLevel(id)} className={`filter-chip ${activeLevel === id ? "active" : ""}`}>{id === "All" ? "Semua level" : id}</button>)}</div>
          <div className="index-taxonomy mb-5"><span>INDEX VIEW</span><strong>{activeChapter === "All" ? "Semua chapter" : `Chapter ${activeChapter}`}</strong><span>{activeLevel === "All" ? "Semua level" : activeLevel}</span><span className="ml-auto hidden sm:inline">{filtered.length} hasil · buka satu untuk membaca case</span></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((concept, index) => <article key={concept.id} className="concept-card group" style={{ animationDelay: `${index * 35}ms` }}><div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="font-mono text-[11px] font-semibold text-signal">{String(concept.id).padStart(3, "0")}</span><span className="measure-line" aria-hidden="true"/><span className="card-signal">{concept.level}</span></div><button onClick={() => toggleUnderstood(concept.id)} aria-label={`Mark ${concept.title} as understood`} className={`understood ${understood.includes(concept.id) ? "is-done" : ""}`}>{understood.includes(concept.id) ? <Check size={13}/> : <span/>}</button></div><button className="mt-10 text-left" onClick={() => openConcept(concept)}><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-graphite">{concept.chapter}</p><h3 className="mt-3 font-display text-[29px] leading-[0.98] tracking-[-0.035em] transition-colors group-hover:text-signal">{concept.title}</h3><p className="mt-4 text-sm font-medium leading-6 text-graphite">{concept.kicker}</p></button><div className="card-note"><span>FIELD NOTE</span><span>{concept.deepDive ? "CORE / DEEP-DIVE" : "INDEX / REFERENCE"}</span></div><div className="mini-diagram" aria-hidden="true"><span/><span/><span/><i/></div><button onClick={() => openConcept(concept)} className="mt-5 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink">Buka catatan <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></button></article>)}</div>
          {filtered.length === 0 && <div className="border border-dashed border-ink/50 py-16 text-center"><CircleHelp className="mx-auto text-signal"/><p className="mt-3 font-display text-2xl">Belum ketemu yang cocok.</p><button onClick={() => {setQuery("");setActiveChapter("All")}} className="mt-3 font-mono text-[10px] uppercase tracking-wider underline">Reset pencarian</button></div>}
        </section>

        <section id="real-world-cases" className="border-y border-ink/10 bg-sage/20"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-24"><div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="section-label">04 / Real-world cases</p><h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] tracking-[-0.04em]">What the docs leave out,<br/><em className="text-signal">the system will teach you.</em></h2></div><p className="max-w-sm text-sm leading-6 text-graphite">Delapan case ini menghubungkan keputusan engineering dengan konteks yang biasanya baru terlihat di production. Filter berdasarkan company atau kategori teknis, lalu buka case yang ingin kamu bedah.</p></div><div className="case-filter-bar"><div className="case-search"><Search size={16} className="text-graphite"/><input value={caseQuery} onChange={(event) => setCaseQuery(event.target.value)} placeholder="Cari company atau topik..." aria-label="Cari real-world cases berdasarkan company atau topik" /></div><div className="case-filter-group" aria-label="Filter by company"><span className="filter-group-label">Company</span>{caseCompanies.map((company) => <button key={company} onClick={() => setCaseCompany(company)} className={`filter-chip ${caseCompany === company ? "active" : ""}`}>{company === "All" ? "Semua" : company}</button>)}</div><label className="case-topic-select"> <span className="filter-group-label">Topic</span><select value={caseTopic} onChange={(event) => setCaseTopic(event.target.value)} aria-label="Filter real-world cases berdasarkan topic"><option value="All">Semua topic</option>{caseTopics.filter((topic) => topic !== "All").map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select></label></div><div className="mb-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-graphite"><span>{visibleFeaturedCases.length} dari {filteredFeaturedCases.length} cocok · {featuredCases.length} total cases</span>{(caseQuery || caseCompany !== "All" || caseTopic !== "All") && <button onClick={() => { setCaseQuery(""); setCaseCompany("All"); setCaseTopic("All"); }} className="text-signal underline underline-offset-4">Reset filter</button>}</div>{filteredFeaturedCases.length > 0 ? <><div key={`${caseCompany}-${caseTopic}-${caseQuery}`} className="case-filter-results grid gap-4 lg:grid-cols-5">{visibleFeaturedCases.map((concept, index) => { const study = concept.realWorldCaseStudy!; return <article key={`${caseCompany}-${caseTopic}-${caseQuery}-${concept.title}`} className="real-world-preview case-filter-item" style={{ animationDelay: `${index * 28}ms` }}><div className="flex items-start justify-between gap-3"><span className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal">{study.company}</span><span className="font-mono text-[9px] uppercase tracking-wider text-graphite">{study.topics.join(" · ")}</span></div><h3 className="mt-8 font-display text-2xl leading-[1.02] tracking-[-0.025em]">{study.title}</h3><p className="mt-4 text-sm leading-6 text-graphite">{study.takeaway}</p><button onClick={() => openConcept(concept)} className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink underline decoration-signal decoration-2 underline-offset-4">Read the case <ArrowUpRight size={13}/></button></article>; })}</div>{visibleFeaturedCases.length > 0 && visibleFeaturedCases.length < filteredFeaturedCases.length && <div className="case-load-more"><p>{filteredFeaturedCases.length - visibleFeaturedCases.length} case lainnya menunggu dibaca.</p><button type="button" onClick={() => setVisibleCaseCount((count) => count + 5)}>Load more <ChevronRight size={14}/></button></div>}</> : <div className="case-empty-state"><div className="case-empty-mark" aria-hidden="true"><span>?</span></div><p className="section-label">No results found</p><h3 className="mt-3 font-display text-3xl leading-none">Tidak ada case yang cocok.</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-graphite">{activeCaseFilterSummary ? `Filter aktif: ${activeCaseFilterSummary}. ` : "Filter ini "}Coba perluas topic, pilih company lain, atau cari kata yang lebih umum.</p><button type="button" onClick={() => { setCaseQuery(""); setCaseCompany("All"); setCaseTopic("All"); setVisibleCaseCount(5); }} className="mt-6 font-mono text-[10px] font-bold uppercase tracking-wider text-ink underline decoration-signal decoration-2 underline-offset-4">Reset filters <ArrowUpRight size={13} className="ml-1 inline"/></button></div>}</div></section>

        {judgmentCase && judgmentStudy && judgmentLoop && <section className="border-y border-ink/10 bg-paper"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-24"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="section-label">05 / Judgment in the wild</p><h2 className="mt-5 max-w-md font-display text-5xl leading-[0.95] tracking-[-0.04em]">A cache miss is where the trouble shows.<br/><em className="text-signal">The decision that caused it sits underneath.</em></h2><p className="mt-6 max-w-sm text-[15px] leading-7 text-graphite">Satu case Netflix tentang traffic yang berpindah region. Tujuannya melihat bagaimana engineer bergerak dari situasi yang belum jelas menuju keputusan dengan trade-off, tanpa perlu menghafal EVCache.</p><a href={judgmentStudy.source} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink underline decoration-signal decoration-2 underline-offset-4">Read the source <ArrowUpRight size={13}/></a></div><div className="judgment-case"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/50 pb-5"><div><span className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal">{judgmentStudy.company} · Caching</span><h3 className="mt-3 max-w-xl font-display text-3xl leading-[1.02]">{judgmentStudy.title}</h3></div><span className="judgment-case-stamp">REAL<br/>CASE</span></div><div className="judgment-case-grid mt-6"><div className="judgment-case-step"><span>01 / Situation</span><p>{judgmentLoop.situation}</p></div><div className="judgment-case-step"><span>02 / Observation</span><p>{judgmentLoop.observation}</p></div><div className="judgment-case-step"><span>03 / Hypotheses</span><p>{judgmentLoop.hypotheses}</p></div><div className="judgment-case-step"><span>04 / Evidence</span><p>{judgmentLoop.evidence}</p></div><div className="judgment-case-step"><span>05 / Decision</span><p>{judgmentLoop.decision}</p></div><div className="judgment-case-step"><span>06 / Consequence</span><p>{judgmentLoop.consequence}</p></div></div><div className="mt-6 border-t border-ink/50 pt-5"><p className="font-mono text-[10px] uppercase tracking-wider text-graphite">Why this case matters</p><p className="mt-2 max-w-2xl text-sm leading-6 text-graphite">The same pattern works in one system and fails in another. Look for the evidence that tells you which one you have.</p><button onClick={() => openConcept(judgmentCase)} className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink underline decoration-signal decoration-2 underline-offset-4">Open the full case <ArrowUpRight size={13}/></button></div></div></div><div className="discussion-panel mt-10"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="section-label">Discussion / Local notes</p><h3 className="mt-4 max-w-sm font-display text-4xl leading-[.98] tracking-[-.04em]">What would you investigate next?</h3><p className="mt-4 max-w-sm text-sm leading-6 text-graphite">Tulis sudut pandang atau pengalamanmu saat menghadapi trade-off serupa. Catatan ini tersimpan di browser ini. Belum dibagikan ke pengguna lain.</p><div className="discussion-export mt-6"><button type="button" onClick={exportDiscussionText} disabled={!discussionEntries.length}>Export .txt</button><button type="button" onClick={printDiscussionAsPdf} disabled={!discussionEntries.length}>Print / PDF</button></div></div><div><form onSubmit={submitDiscussion} className="discussion-form"><div className="grid gap-3 sm:grid-cols-[minmax(0,180px)_1fr]"><label className="discussion-field"><span>Name</span><input value={discussionName} onChange={(event) => setDiscussionName(event.target.value)} placeholder="Your name" maxLength={40}/></label><label className="discussion-field"><span>Your note</span><textarea value={discussionBody} onChange={(event) => setDiscussionBody(event.target.value)} placeholder="What evidence would change your mind?" maxLength={500} required rows={3}/></label></div><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-[9px] uppercase tracking-wider text-graphite">{discussionBody.length} / 500 · saved on this device</span><button type="submit" disabled={!discussionBody.trim()} className="discussion-submit">Add note <ArrowUpRight size={13}/></button></div></form><div className="discussion-list mt-6">{discussionEntries.length === 0 ? <div className="discussion-empty">Belum ada catatan. Mulai dari asumsi yang paling ingin kamu uji.</div> : discussionEntries.map((entry) => <article key={entry.id} className="discussion-entry"><div className="flex items-start justify-between gap-3"><div><strong>{entry.name}</strong><span>{new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span></div><button type="button" onClick={() => deleteDiscussion(entry.id)} className="discussion-delete">Delete</button></div><p>{entry.body}</p></article>)}</div></div></div></div></div></section>}

        <footer className="border-t border-ink/10 bg-ink px-5 py-12 text-paper lg:px-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><div className="flex items-center gap-3"><span className="brand-mark light"><span/><span/><span/></span><span className="wordmark footer-wordmark"><em>Undocumented</em></span></div><p className="mt-6 max-w-sm text-sm leading-6 text-paper/85">Untuk developer yang mau kuat bersama AI: paham apa yang kamu ubah, tahu apa yang bisa gagal, dan bisa menjelaskan pilihanmu.</p></div><div className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/75">A field guide for shipping with consequences<br/><span className="text-signal">© 2026 / keep learning in public</span></div></div></footer>
      </main>

      {selected && (
        <div className={`modal-backdrop fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6 ${modalClosing ? "is-closing" : ""}`} role="dialog" aria-modal="true" onClick={(event) => { if (event.target === event.currentTarget) closeSelected(); }}>
          <div className={`modal-panel relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-ink/50 bg-paper p-6 shadow-2xl sm:p-10 ${modalClosing ? "is-closing" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div><span className="font-mono text-[11px] font-semibold text-signal">{String(selected.id).padStart(3, "0")} / {selected.chapter}</span><h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.9] tracking-[-0.045em]">{selected.title}</h2></div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button onClick={() => { setShareOpen(!shareOpen); setShareNotice(""); }} className="flex items-center gap-2 border border-ink/50 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal" aria-label="Share case"><Share2 size={15}/> Share</button>
                  {shareOpen && <div className="share-menu absolute right-0 top-12 z-10 w-48 border border-ink/50 bg-paper p-2 shadow-xl"><p className="px-2 pb-2 font-mono text-[9px] uppercase tracking-wider text-graphite">Share this field note</p><button onClick={() => shareCase("whatsapp")} className="share-link">WhatsApp</button><button onClick={() => shareCase("linkedin")} className="share-link">LinkedIn</button><button onClick={() => shareCase("x")} className="share-link">X / Twitter</button><button onClick={() => shareCase("copy")} className="share-link"><Copy size={13}/> Copy link</button></div>}
                </div>
                <button onClick={closeSelected} className="p-2 text-graphite hover:text-signal" aria-label="Close"><X size={20}/></button>
              </div>
            </div>
            {shareNotice && <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-wider text-signal">{shareNotice}</p>}
            <div className="mb-2"><BloomTag level="Understand"/></div><p className="mt-8 max-w-xl text-[17px] leading-7">{selected.description}</p>
            {selected.deepDive && <section className="deep-dive-panel mt-8"><div className="flex items-start justify-between gap-4"><div><span className="section-label">Core 30 / Deep dive</span><h3 className="mt-3 font-display text-3xl leading-none">Build the mental model.</h3></div><span className="core-stamp">CORE<br/>30</span></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><span className="case-label">Mental model</span><p className="mt-2 text-sm leading-6">{selected.deepDive.mentalModel}</p></div><div><span className="case-label">When it matters</span><p className="mt-2 text-sm leading-6">{selected.deepDive.when}</p></div></div><div className="mt-5 border-t border-ink/10 pt-5"><span className="case-label">Trade-off</span><p className="mt-2 text-sm leading-6">{selected.deepDive.tradeoff}</p></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><div><span className="case-label">Field checklist</span><ul className="mt-3 space-y-2 text-sm leading-6">{selected.deepDive.checklist.map((item) => <li key={item}>→ {item}</li>)}</ul></div><div className="callout"><span className="section-label">Practice it</span><p className="mt-3 text-sm leading-6">{selected.deepDive.exercise}</p></div></div></section>}
            <div className="quiz-panel mt-8"><div className="flex items-center justify-between gap-4"><span className="section-label">What would you do?</span><span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Satu keputusan <BloomTag level="Evaluate"/></span></div><p className="mt-4 font-display text-2xl leading-tight">{selected.quiz.prompt}</p><div className="mt-5 grid gap-2">{selected.quiz.options.map((option, optionIndex) => <button key={option} onClick={() => setQuizAnswer(optionIndex)} className={`quiz-option ${quizAnswer === optionIndex ? (optionIndex === selected.quiz.answer ? "correct" : "wrong") : ""}`}><span className="quiz-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{quizAnswer === optionIndex && (optionIndex === selected.quiz.answer ? <CheckCircle2 className="quiz-status" size={18}/> : <XCircle className="quiz-status" size={18}/>)}{quizAnswer === optionIndex && <span className="ml-auto font-mono text-[9px] uppercase">{optionIndex === selected.quiz.answer ? "Correct" : "Try again"}</span>}</button>)}</div>{quizAnswer !== null && <div className={`quiz-feedback ${quizAnswer === selected.quiz.answer ? "correct" : "wrong"}`}><strong>{quizAnswer === selected.quiz.answer ? "Masuk akal." : "Coba lihat lagi."}</strong> {selected.quiz.explanation}</div>}</div>
            <div className="case-panel mt-8"><div className="flex items-start justify-between gap-5"><div><span className="section-label">Case / Coba lihat</span><h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.03em]">{selected.caseTitle}</h3></div><span className="case-stamp">FIELD<br/>NOTE</span></div><div className="case-tabs mt-6" role="tablist" aria-label="Bagian case"><div className="flex flex-wrap gap-2">{([{ id: "situation", label: "Situasi" }, { id: "decision", label: "Keputusan" }, { id: "consequence", label: "Konsekuensi" }] as const).map((tab) => <button key={tab.id} role="tab" aria-selected={conceptTab === tab.id} onClick={() => setConceptTab(tab.id)} className={`case-tab ${conceptTab === tab.id ? "active" : ""}`}>{tab.label}</button>)}</div><div className="case-tab-content mt-5" role="tabpanel">{conceptTab === "situation" && <><span className="case-label">Situasi</span> <BloomTag level="Analyze"/><p className="mt-2 max-w-xl text-[15px] leading-7">{selected.caseContext}</p></>}{conceptTab === "decision" && <><span className="case-label">Keputusan yang harus kamu ambil</span> <BloomTag level="Create"/><p className="mt-2 max-w-xl text-[15px] leading-7">{selected.caseDecision}</p></>}{conceptTab === "consequence" && <><span className="case-label">Kalau keputusan ini salah</span> <BloomTag level="Evaluate"/><p className="mt-2 max-w-xl text-[15px] leading-7">{selected.watch}</p><p className="mt-4 max-w-xl text-sm leading-6 text-graphite">{selected.caseQuestion}</p></>}</div></div></div>
            {selected.companyCase && <div className="company-case mt-5"><div className="flex items-start justify-between gap-4"><div><span className="section-label">Industry case / {selected.companyCase.company}</span><h3 className="mt-3 font-display text-2xl leading-tight">{selected.companyCase.title}</h3></div><span className="font-mono text-[9px] uppercase tracking-wider text-graphite">Source-backed</span></div><p className="mt-4 text-sm leading-6">{selected.companyCase.story}</p><p className="mt-3 text-sm font-medium leading-6"><span className="case-label">Lesson</span><br/>{selected.companyCase.lesson}</p><a className="mt-4 inline-block font-mono text-[10px] uppercase tracking-wider" href={selected.companyCase.source} target="_blank" rel="noreferrer">Read the source ↗</a><div className="mt-5 grid gap-3 sm:grid-cols-3">{selected.companyCase.metrics.map((metric) => <div key={metric.label} className="metric-card"><span className="case-label">{metric.label}</span><strong className="mt-2 block font-display text-2xl">{metric.value}</strong><span className="mt-1 block text-[11px] leading-4 text-graphite">{metric.note}</span><span className={`mt-2 inline-block font-mono text-[8px] uppercase tracking-wider ${metric.status === "published" ? "text-sage" : "text-signal"}`}>{metric.status === "published" ? "Published signal" : "Illustrative target"}</span></div>)}</div><div className="metric-diagram mt-5"><div className="flex items-center justify-between"><span className="case-label">System sketch</span><span className="font-mono text-[9px] uppercase tracking-wider text-paper/75">{selected.companyCase.architecture.caption}</span></div><div className="diagram-flow mt-4">{selected.companyCase?.architecture.nodes.map((node, nodeIndex) => <span key={node}>{node}{nodeIndex < (selected.companyCase?.architecture.nodes.length || 0) - 1 && <b>→</b>}</span>)}</div></div></div>}
            {selected.realWorldCaseStudy && <section className="real-world-case mt-5"><div className="flex items-start justify-between gap-4"><div><span className="section-label">Real-world Case Study / {selected.realWorldCaseStudy.company}</span><h3 className="mt-3 font-display text-3xl leading-tight">{selected.realWorldCaseStudy.title}</h3></div><span className="case-stamp">FIELD<br/>REPORT</span></div><div className="real-world-grid mt-6"><div><span className="case-label">Start here</span><p className="mt-2 text-sm leading-6">{selected.realWorldCaseStudy.setup}</p></div><div><span className="case-label">Mereka memilih</span><p className="mt-2 text-sm leading-6">{selected.realWorldCaseStudy.decision}</p></div><div><span className="case-label">Yang ikut berubah</span><p className="mt-2 text-sm leading-6">{selected.realWorldCaseStudy.consequence}</p></div></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{selected.realWorldCaseStudy.facts.map((fact) => <div key={fact} className="metric-card"><span className="case-label">Industry signal</span><strong className="mt-2 block text-sm leading-5">{fact}</strong><span className="mt-2 block font-mono text-[8px] uppercase tracking-wider text-signal">Company-reported context</span></div>)}</div><div className="mt-6 border-t border-ink/10 pt-5"><span className="case-label">Bawa pulang ini</span><p className="mt-2 text-sm font-medium leading-6">{selected.realWorldCaseStudy.takeaway}</p><a className="mt-4 inline-block font-mono text-[10px] uppercase tracking-wider text-signal" href={selected.realWorldCaseStudy.source} target="_blank" rel="noreferrer">Baca sumber: {selected.realWorldCaseStudy.sourceLabel} ↗</a></div></section>}
            {selected.runnable && <div className="runnable-panel mt-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><span className="section-label">Lab yang bisa dijalankan</span><h3 className="mt-2 font-display text-2xl">Salin, jalankan, ubah satu hal.</h3></div><div className="flex flex-wrap gap-2"><div className="language-toggle" role="group" aria-label="Code language"><button onClick={() => setCodeLanguage("JavaScript")} className={codeLanguage === "JavaScript" ? "active" : ""}>JS</button><button onClick={() => setCodeLanguage("TypeScript")} className={codeLanguage === "TypeScript" ? "active" : ""}>TS</button></div><button onClick={copyRunnableCode} className="copy-code-button"><Copy size={14}/> {codeNotice || "Copy"}</button><button onClick={runCodeInBrowser} className="run-code-button">Run in browser</button></div></div><div className="mt-4 flex flex-wrap gap-3 font-mono text-[9px] uppercase tracking-wider text-paper/85"><span>{codeLanguage}</span><span>·</span><span>{selected.runnable.command}</span></div><pre className="runnable-code mt-4"><code>{activeCode}</code></pre><div className="runnable-output mt-3"><span>Browser output</span><pre>{runOutput || "Press Run in browser to execute the JavaScript version safely in this page."}</pre></div><p className="mt-3 font-mono text-[10px] leading-5 text-paper/85">Hasil yang diharapkan: {selected.runnable.output}</p></div>}
            {interactiveLabs[selected.title] && <div className="interactive-lab mt-5"><div className="flex items-center justify-between gap-3"><div><span className="section-label">Step-by-step lab</span><h3 className="mt-2 font-display text-2xl">Watch the system change.</h3></div><span className="font-mono text-[10px] text-graphite">{labStep + 1} / {interactiveLabs[selected.title].length}</span></div>{selected.title === "Caching Strategies (cache invalidation, cache stampede, cache aside)" && <div className="experiment-controls mt-5"><label>Cache capacity <input type="number" min="1" max="5" value={cacheCapacity} onChange={(event) => setCacheCapacity(Number(event.target.value))}/></label><label>Request sequence <input value={cacheRequests} onChange={(event) => setCacheRequests(event.target.value)} aria-label="Comma separated cache request sequence"/></label><div className="experiment-summary"><strong>{cacheExperiment.hits} hits</strong><span>/</span><strong>{cacheExperiment.misses} misses</strong><span>· final cache: {cacheExperiment.finalCache.join(", ") || "empty"}</span></div><div className="experiment-events">{cacheExperiment.events.map((event, index) => <div key={`${event.label}-${index}`} className={`experiment-event ${event.tone}`}><span>{event.label}</span><p>{event.detail}</p></div>)}</div></div>}{selected.title === "Retry Storm" && <div className="experiment-controls mt-5"><label>Failures before success <input type="number" min="0" max="8" value={retryFailures} onChange={(event) => setRetryFailures(Number(event.target.value))}/></label><label>Max attempts <input type="number" min="1" max="8" value={retryAttempts} onChange={(event) => setRetryAttempts(Number(event.target.value))}/></label><label>Base delay (ms) <input type="number" min="10" max="1000" step="10" value={retryBaseDelay} onChange={(event) => setRetryBaseDelay(Number(event.target.value))}/></label><div className="experiment-summary"><strong>{retryExperiment.succeeded ? "recovered" : "fallback"}</strong><span>· {retryExperiment.attempts} attempts simulated</span></div><div className="experiment-events">{retryExperiment.events.map((event, index) => <div key={`${event.label}-${index}`} className={`experiment-event ${event.tone}`}><span>{event.label}</span><p>{event.detail}</p></div>)}</div></div>}<div className="lab-track mt-5">{interactiveLabs[selected.title].map((step, index) => <button key={step.label} onClick={() => setLabStep(index)} className={`lab-step ${index === labStep ? "active" : ""}`}><span>{index + 1}</span></button>)}</div><div className="mt-5 border-t border-ink/10 pt-5"><span className="case-label">{interactiveLabs[selected.title][labStep].label}</span><p className="mt-2 font-display text-2xl">{interactiveLabs[selected.title][labStep].signal}</p><p className="mt-2 text-sm leading-6 text-graphite">{interactiveLabs[selected.title][labStep].detail}</p></div><div className="mt-5 flex justify-between gap-3"><button onClick={() => setLabStep((step) => Math.max(0, step - 1))} disabled={labStep === 0} className="lab-nav">Previous</button><button onClick={() => setLabStep((step) => Math.min(interactiveLabs[selected.title].length - 1, step + 1))} disabled={labStep === interactiveLabs[selected.title].length - 1} className="lab-nav">Next step</button></div></div>}
            {reliabilityTests[selected.title] && <div className="interactive-lab mt-5"><div className="flex items-center justify-between gap-3"><div><span className="section-label">Test your reasoning</span><h3 className="mt-2 font-display text-2xl">Choose the safer behaviour.</h3></div><span className="font-mono text-[10px] text-graphite">{reliabilityTests[selected.title].length} scenarios</span></div><div className="test-scenario-list mt-5">{reliabilityTests[selected.title].map((scenario) => <button key={scenario.id} onClick={() => setTestChoice(scenario.id)} className={`test-scenario ${testChoice === scenario.id ? "active" : ""}`}>{scenario.label}</button>)}</div>{selectedTest && <div className={`test-feedback mt-5 ${selectedTest.correct ? "correct" : "wrong"}`}><span className="case-label">{selectedTest.correct ? "Good boundary" : "Risk detected"}</span><p className="mt-2 font-display text-2xl">{selectedTest.prompt}</p><p className="mt-3 text-sm leading-6">{selectedTest.explanation}</p></div>}</div>}
            {selected.technical && <div className="technical-panel mt-5"><div className="flex items-center justify-between"><span className="section-label">{selected.technical.label}</span><span className="font-mono text-[10px] text-graphite">{selected.technical.kind === "code" ? "diff" : "flow"}</span></div>{selected.technical.kind === "code" ? <div className="code-diff mt-4"><div className="diff-line removed">− {selected.technical.before}</div><div className="diff-line added">+ {selected.technical.after}</div></div> : <div className="diagram-flow mt-5">{selected.technical.nodes?.map((node, nodeIndex) => <span key={node}>{node}{nodeIndex < (selected.technical?.nodes?.length || 0) - 1 && <b>→</b>}</span>)}</div>}</div>}
            <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="callout"><span className="section-label">Coba sekarang</span> <BloomTag level="Apply"/><p className="mt-3 text-sm leading-6">{selected.example}</p></div><div className="callout warn"><span className="section-label">Jangan lewatkan</span> <BloomTag level="Analyze"/><p className="mt-3 text-sm leading-6">{selected.watch}</p></div></div>
            <div className="concept-feedback mt-6 border-t border-ink/10 pt-5"><div><span className="section-label">Satu cek terakhir</span><p className="mt-2 text-sm text-graphite">Apakah bagian ini membantu kamu memahami keputusan yang harus diambil?</p></div><div className="mt-3 flex flex-wrap gap-2 sm:mt-0">{([{ id: "yes", label: "Ya, membantu" }, { id: "no", label: "Belum jelas" }] as const).map((item) => <button key={item.id} onClick={() => submitConceptFeedback(item.id)} className={`feedback-button ${conceptFeedback === item.id ? "selected" : ""}`} aria-pressed={conceptFeedback === item.id}>{item.label}</button>)}</div></div>
            {relatedCases.length > 0 && <section className="related-cases mt-8 border-t border-ink/10 pt-6"><div className="flex items-end justify-between gap-4"><div><span className="section-label">Kasus Terkait</span><h3 className="mt-2 font-display text-3xl leading-none">Read the next case.</h3></div><span className="font-mono text-[9px] uppercase tracking-wider text-graphite">{relatedCases.length} rekomendasi</span></div><div className="related-case-grid mt-5">{relatedCases.map(({ concept, study, reason }) => <button key={concept.id} onClick={() => openConcept(concept)} className="related-case-card text-left"><span className="font-mono text-[9px] font-bold uppercase tracking-wider text-signal">{study.company} · {reason}</span><strong className="mt-3 block font-display text-2xl leading-[1.02] tracking-[-0.025em]">{study.title}</strong><span className="mt-3 block text-xs leading-5 text-graphite">{study.takeaway}</span><span className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-wider text-ink">Buka case <ArrowUpRight size={12}/></span></button>)}</div></section>}
            <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between"><span className="font-mono text-[10px] uppercase tracking-wider text-graphite">After this</span><Button onClick={() => { toggleUnderstood(selected.id); closeSelected(); }} className={understood.includes(selected.id) ? "bg-sage text-ink hover:bg-sage" : "bg-signal text-paper hover:bg-signal/90"}>{understood.includes(selected.id) ? <><Check size={15}/> Sudah ditandai</> : "Saya sudah paham"}</Button></div>
          </div>
        </div>
      )}
    </div>
  );
}
