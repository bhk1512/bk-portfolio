"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

// =============================
// Bharat Kaushik — Portfolio (Dark, Minimal → Premium polish)
// Now includes a featured project: AI‑Powered Risk‑Radar with images (Image 1 & Image 2)
// To use your attachments in Next/Vite: place them at /public/images/ as below.
//   /public/images/ai-risk-radar-1.png   ← Image 1 (dashboard)
//   /public/images/ai-risk-radar-2.png   ← Image 2 (n8n workflow)
// =============================

// ---- Utilities ----
const SECTION_IDS = ["home", "work", "impact", "about", "writing", "contact"] as const;
type SectionId = typeof SECTION_IDS[number];

// ---- Scroll progress bar (fixed at top) ----
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full origin-left transform transition-[transform] duration-150 will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, rgba(224,224,224,0.35), rgba(224,224,224,0.9))",
        }}
        aria-hidden
      />
    </div>
  );
}

// ---- Active section observer ----
function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0]);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const options: IntersectionObserverInit = { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6, 1] };
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id as SectionId);
    }, options);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    if (prefersReduced) setActive(ids[0]);
    return () => io.disconnect();
  }, [ids]);
  return active;
}

// ---- Reveal on scroll wrapper ----
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.14 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---- Section with anchorable header ----
function Section({ id, title, children }: { id: string; title?: string; children: React.ReactNode }) {
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`); }
    catch { /* ignore */ }
  };
  return (
    <section id={id} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ contentVisibility: "auto" }}>
      {title && (
        <div className="group flex items-center gap-2 mb-6">
          <h2 className="text-[clamp(22px,3.6vw,30px)] font-semibold tracking-tight text-zinc-100">{title}</h2>
          <button
            onClick={onCopy}
            aria-label={`Copy link to ${title}`}
            className="opacity-0 group-hover:opacity-100 transition opacity-100 sm:opacity-0 text-zinc-400 hover:text-zinc-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
            title="Copy section link"
          >
            #
          </button>
        </div>
      )}
      {children}
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700/70 px-3 py-1 text-xs text-zinc-300 bg-zinc-950/40 backdrop-blur">
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_0_40px_-28px_rgba(224,224,224,0.35)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-800/50" />
      {children}
    </div>
  );
}

// ---- Data ----
const data = {
  hero: {
    title: "Tech‑to‑Ops builder with IIMA MBA",
    subhead: "Aligning people, processes, and tech to remove uncertainty from execution",
    ctas: [
      { label: "Download CV", href: "/cv.pdf", type: "primary" },
      { label: "Email", href: "mailto:you@domain.com", type: "ghost" },
      { label: "Call", href: "tel:+91XXXXXXXXXX", type: "ghost" },
    ],
  },
  projects: [
    // === Featured project from your brief ===
    {
      id: "ai-risk-radar",
      title: "AI‑Powered Risk‑Radar",
      year: "2025",
      stack: "Looker Studio | n8n",
      summary:
        "Real-time dashboard that ingests global news, scores supply chain disruptions on impact and visualises them on an interactive world map with trends and filters.",
      cover: { src: "/images/ai-risk-radar-1.png", alt: "Risk‑Radar dashboard (Looker Studio)" },
      metrics: ["Real‑time map", "Ranked disruptions", "Trend lines & filters"],
      roleTools: "PM/Builder — NewsAPI, n8n, Google Sheets, Gemini, Looker Studio",
      screenshots: [
        { src: "/images/ai-risk-radar-1.png", alt: "Dashboard overview" }, // Image 1
        { src: "/images/ai-risk-radar-2.png", alt: "n8n pipeline" },      // Image 2
      ],
      problem:
        "Global supply chain disruptions—whether physical, cyber, trade, or infrastructure—are reported across fragmented sources with inconsistent severity metrics. Decision‑makers lack a single real‑time, geospatial view that scores and ranks these disruptions for rapid situational awareness.",
      prdLink: "#", // optional: link to Product Requirement Document
      approach: [
        "Ingested global news feeds via NewsAPI → n8n → Google Sheets with deduplication and enrichment.",
        "Built a strict LLM classification schema (Gemini) to extract disruption type, impacted nodes, and sub‑scores for severity factors.",
        "Normalised and scored events using a Supply Chain Severity Index (SCSI) in Google Sheets with caps, decay, and bonuses.",
        "Developed an interactive Looker Studio dashboard with a world map, ranked disruption table, trend analysis, and dynamic filters.",
        "Implemented a revised scoring rubric to fully utilise the 0–10 severity range.",
      ],
      outcome: [
        "Live, interactive dashboard flags/ranks disruptions by severity with geospatial mapping and filters.",
        "Low‑cost deployment (NewsAPI free, lightweight Gemini usage, Sheets/Looker free).",
      ],
      learnings: [
        "End‑to‑end shipping: from scoping to launch.",
        "Iterative development with mock data → stable, impactful final product.",
        "Dashboard storytelling: reduce to one clear screen of truth.",
        "Severity scoring design: weights/caps/minima must be tuned for meaningful spread.",
      ],
    },

    // (Existing examples)
    { id: "risk-radar", title: "Supply Chain Risk Radar", year: "2025", summary: "Unified disruption signals → real‑time, geo‑ranked risks.", metrics: ["98% review time cut", "15% faster response", "Weekly exec brief"],
      roleTools: "PM/Analyst — n8n, Python, Looker Studio",
      screenshots: [{ src: "", alt: "Risk map" }, { src: "", alt: "Before→After" }],
      problem: "Fragmented inputs led to slow, inconsistent decisions.",
      approach: ["Aggregated 12+ sources via n8n", "Geo‑tag & rank events", "Concise exec dashboard"],
      outcome: ["98% less manual review", "15% faster response", "Standard taxonomy"],
      learnings: "Opinionated metrics > endless charts.",
    },
    { id: "industry-digest", title: "Industry Digest Automation", year: "2025", summary: "Automated sector scanning (30+ sources).", metrics: ["3h → 7min", "Early signal capture", "Reusable pipeline"], roleTools: "n8n, regex, LLM clustering",
      screenshots: [{ src: "", alt: "Digest" }, { src: "", alt: "Workflow" }],
      problem: "Manual tracking was slow & noisy.", approach: ["Crawls + de‑dupe + filters", "LLM clustering", "Weekly brief export"], outcome: ["~96% time saved", "Better signal‑to‑noise"], learnings: "Light taxonomy beats RSS firehose.", },
  ],
  impact: [
    { title: "PMO for International Expo (250k visitors)", orgRoleYear: "CISF — PMO Lead, 2023–24", summary: "Orchestrated 8 workstreams; integrated tech, ops, stakeholders.", metrics: ["100% SLA", "Zero critical incidents", "Cross‑agency alignment"] },
    { title: "Threat‑Triage ML Pipeline", orgRoleYear: "IB — Ops Manager, 2021–23", summary: "AWS prototype reduced triage time & improved prioritization.", metrics: ["85% faster", "Repeatable workflow"] },
  ],
  contact: { email: "you@domain.com", phone: "+91XXXXXXXXXX", linkedin: "https://www.linkedin.com/in/your-handle/" },
};

// ---- Nav ----
function Nav() {
  const active = useActiveSection(SECTION_IDS as unknown as SectionId[]);
  const items: { href: `#${SectionId}`; label: string; id: SectionId }[] = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#work", label: "Work", id: "work" },
    { href: "#impact", label: "Impact", id: "impact" },
    { href: "#about", label: "About", id: "about" },
    { href: "#writing", label: "Writing", id: "writing" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];
  return (
    <header className="sticky top-0 z-50">
      {/* subtle brand accent line under nav */}
      <div className="h-0.5 bg-gradient-to-r from-zinc-800 via-zinc-600/60 to-zinc-800" />
      <div className="backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 border-b border-zinc-900">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#home" className="font-medium text-zinc-100">BK</a>
          <ul className="flex gap-4 text-sm">
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={it.href}
                  className={`px-1 py-0.5 transition hover:text-zinc-100 ${
                    active === it.id ? "text-zinc-100 border-b border-zinc-400" : "text-zinc-300"
                  }`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ---- Hero ----
function Hero() {
  return (
    <Section id="home">
      <Reveal>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge>Program Manager · Tech→Ops</Badge>
            <span className="inline-flex items-center gap-2">
              <Badge>
                <span className="relative inline-flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-30" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-200" />
                </span>
                IIMA MBA
              </Badge>
            </span>
          </div>
          <h1 className="text-[clamp(28px,5.2vw,48px)] font-bold text-zinc-100 mb-4">
            {data.hero.title}
          </h1>
          <p className="text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-8">
            {data.hero.subhead}
          </p>
          <div className="flex justify-center gap-4">
            {data.hero.ctas.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className={
                  c.type === "primary"
                    ? "px-5 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-sm font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    : "px-5 py-2 border border-zinc-700 text-zinc-100 rounded-xl text-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                }
              >
                <span className="[background:linear-gradient(currentColor,currentColor)_0_100%/0_1px_no-repeat] hover:[background-size:100%_1px] [transition:background-size_.2s_ease]">
                  {c.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// ---- Projects ----
function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => data.projects.find((p) => p.id === activeId) || null, [activeId]);

  // body scroll lock when modal open
  useEffect(() => {
    if (active) { document.body.style.overflow = "hidden"; } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  // modal keyboard handling
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!active) return;
      if (e.key === "Escape") setActiveId(null);
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const isShift = e.shiftKey;
        const activeEl = document.activeElement as HTMLElement | null;
        if (!isShift && activeEl === last) { e.preventDefault(); first.focus(); }
        if (isShift && activeEl === first) { e.preventDefault(); (last as HTMLElement).focus(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <Section id="work" title="Recent Projects">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <button
              onClick={() => setActiveId(p.id)}
              className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl"
              aria-haspopup="dialog"
              aria-expanded={activeId === p.id}
            >
              <Card>
                {/* Optional cover image for premium look */}
                {p.cover?.src ? (
                  <div className="mb-3 overflow-hidden rounded-xl ring-1 ring-zinc-800/60">
                    <img
                      loading="lazy"
                      src={p.cover.src}
                      alt={p.cover.alt || `${p.title} cover`}
                      className="w-full h-40 object-cover hover:scale-[1.02] transition"
                    />
                  </div>
                ) : null}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-zinc-100 font-medium">{p.title}</h3>
                  <span className="text-xs text-zinc-400">{p.year}</span>
                </div>
                {p.stack ? (
                  <div className="text-xs text-zinc-400 mb-2">{p.stack}</div>
                ) : null}
                <p className="text-sm text-zinc-300">{p.summary}</p>
                {p.metrics?.length ? (
                  <ul className="mt-3 text-xs text-zinc-400 list-disc list-inside space-y-1">
                    {p.metrics.slice(0, 3).map((m, i2) => (
                      <li key={i2}>{m}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="case-title">
          <div ref={modalRef} className="max-w-3xl w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="case-title" className="text-xl text-zinc-100 font-semibold">{active.title}</h3>
                <div className="text-sm text-zinc-400 mt-1">{active.year}{active.stack ? ` · ${active.stack}` : ""}</div>
              </div>
              <button onClick={() => setActiveId(null)} className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded" aria-label="Close">✕</button>
            </div>

            {/* sticky mini‑TOC */}
            <div className="sticky top-0 bg-zinc-950/80 backdrop-blur mt-4 pt-2 pb-2 z-10 border-b border-zinc-900">
              <nav className="text-xs text-zinc-400 flex gap-4">
                <a href="#p-summary" className="hover:text-zinc-100">Summary</a>
                <a href="#p-problem" className="hover:text-zinc-100">Problem</a>
                <a href="#p-approach" className="hover:text-zinc-100">Action</a>
                <a href="#p-outcome" className="hover:text-zinc-100">Result</a>
                <a href="#p-learnings" className="hover:text-zinc-100">Learnings</a>
              </nav>
            </div>

            {/* Project Summary */}
            <div id="p-summary" className="mt-4">
              {active.screenshots?.[0]?.src ? (
                <div className="overflow-hidden rounded-xl ring-1 ring-zinc-800/60 mb-3">
                  <img loading="lazy" src={active.screenshots[0].src} alt={active.screenshots[0].alt} className="w-full h-auto object-cover" />
                </div>
              ) : null}
              <p className="text-zinc-300">{active.summary}</p>
            </div>

            {/* Problem */}
            <div id="p-problem" className="mt-6">
              <h4 className="text-zinc-200 font-medium mb-2">Problem</h4>
              <p className="text-sm text-zinc-300">{active.problem}</p>
              {active.prdLink && (
                <div className="mt-2 text-xs">
                  <a className="text-zinc-300 underline hover:text-white" href={active.prdLink}>
                    Product Requirement Document
                  </a>
                </div>
              )}
            </div>

            {/* Action */}
            <div id="p-approach" className="mt-6">
              <h4 className="text-zinc-200 font-medium mb-2">Action</h4>
              {active.screenshots?.[1]?.src ? (
                <div className="overflow-hidden rounded-xl ring-1 ring-zinc-800/60 mb-3">
                  <img loading="lazy" src={active.screenshots[1].src} alt={active.screenshots[1].alt} className="w-full h-auto object-cover" />
                </div>
              ) : null}
              <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                {active.approach.map((a, i) => (<li key={i}>{a}</li>))}
              </ul>
            </div>

            {/* Result */}
            <div id="p-outcome" className="mt-6">
              <h4 className="text-zinc-200 font-medium mb-2">Result</h4>
              <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                {active.outcome.map((o, i) => (<li key={i}>{o}</li>))}
              </ul>
            </div>

            {/* Learnings */}
            <div id="p-learnings" className="mt-6">
              <h4 className="text-zinc-200 font-medium mb-2">Learnings</h4>
              <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                {Array.isArray(active.learnings) ? active.learnings.map((l: string, i: number) => (<li key={i}>{l}</li>)) : <li>{active.learnings}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

// ---- Impact ----
function Impact() {
  return (
    <Section id="impact" title="Impact in Previous Roles">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.impact.map((it, idx) => (
          <Reveal key={idx} delay={idx * 50}>
            <Card>
              <div className="text-zinc-100 font-medium">{it.title}</div>
              <div className="text-zinc-400 text-sm">{it.orgRoleYear}</div>
              <p className="text-sm text-zinc-300 mt-2">{it.summary}</p>
              <ul className="mt-3 text-xs text-zinc-400 list-disc list-inside space-y-1">
                {it.metrics.map((m, i) => (<li key={i}>{m}</li>))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---- About ----
function About() {
  return (
    <Section id="about" title="About">
      <Reveal>
        <p className="text-zinc-300 leading-relaxed max-w-3xl">
          I’m a tech‑to‑ops program manager focused on turning complex initiatives into measurable outcomes. I bridge strategy and execution by aligning stakeholders, simplifying processes, and using data & automation to remove ambiguity from delivery.
        </p>
      </Reveal>
    </Section>
  );
}

// ---- Writing ----
function Writing() {
  return (
    <Section id="writing" title="Writing">
      <Reveal>
        <Card>
          <p className="text-zinc-300">Articles list (title, date, tags) → article page.</p>
        </Card>
      </Reveal>
    </Section>
  );
}

// ---- Contact ----
function Contact() {
  const { email, phone, linkedin } = data.contact;
  return (
    <Section id="contact" title="Get in touch">
      <Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! I will get back to you."); }} className="space-y-3">
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Name</label>
                <input className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600" />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Email</label>
                <input type="email" className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600" />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600" />
              </div>
              <button className="rounded-xl bg-zinc-100 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600">Send</button>
            </form>
          </Card>
          <Card>
            <div className="space-y-2 text-sm">
              <div className="text-zinc-400">Email</div>
              <a className="text-zinc-100 hover:underline" href={`mailto:${email}`}>{email}</a>
              <div className="text-zinc-400 mt-3">Phone</div>
              <a className="text-zinc-100 hover:underline" href={`tel:${phone}`}>{phone}</a>
              <div className="text-zinc-400 mt-3">LinkedIn</div>
              <a className="text-zinc-100 hover:underline" href={linkedin}>{linkedin}</a>
            </div>
          </Card>
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Bharat Kaushik</div>
        <div className="flex gap-4">
          <a href="#home" className="hover:text-zinc-300">Top</a>
          <a href="#work" className="hover:text-zinc-300">Work</a>
          <a href="#contact" className="hover:text-zinc-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioApp() {
  return (
    <div className="bg-[#121212] min-h-screen text-[#E0E0E0] scroll-smooth">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Impact />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
