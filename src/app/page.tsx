"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
//import ProfileAvatar from "\src\app\ProfileAvatar.tsx";
import type { Metadata } from 'next';
import Image from "next/image";

// =============================
// Bharat Kaushik — Portfolio (Dark, Minimal → Premium polish)
// Projects finalized: AI‑Powered Risk‑Radar, Industry Digest, Content‑to‑Insights
// Impact finalized: 6 detailed items with premium modal (Problem/Action/Result/Learnings)
// Image files expected in /public (root):
//   /images/ai-risk-radar-1.png
//   /images/ai-risk-radar-2.png
//   /industry-digest-outer.png
//   /industry-digest-workflow.png
//   /content-to-insights-outer.png
//   /content-to-insights-workflow.png
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
    </div>);
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

// ---- Data (Projects) ----
const data = {
  hero: {
    name: "Bharat Kaushik",
    title: "Tech‑to‑Ops builder with IIMA MBA", // tagline
    subhead: "Aligning people, processes, and tech to remove uncertainty from execution",
    photo: { src: "/images/avatar.jpg", alt: "Bharat Kaushik" }, // put your image at /images/public/avatar.jpg
    ctas: [
      { label: "Download CV", href: "/Bharat_Kaushik_IIMA.pdf", type: "primary" },
      { label: "Email", href: "mailto:bharat.15dck@gmail.com", type: "ghost" },
      { label: "Call", href: "tel:+919953779868", type: "ghost" },
    ],
  },
  projects: [
    // 1) AI‑Powered Risk‑Radar
    {
      id: "ai-risk-radar",
      title: "AI‑Powered Risk‑Radar",
      year: "2025",
      stack: "Looker Studio | n8n",
      summary:
        "Real-time dashboard that ingests global news, scores supply chain disruptions on impact and visualises them on an interactive world map with trends and filters.",
      cover: { src: "/images/risk-radar-outer.png", alt: "Risk‑Radar dashboard (Looker Studio)" },
      metrics: ["Real‑time map", "Ranked disruptions", "Trend lines & filters"],
      roleTools: "PM/Builder — NewsAPI, n8n, Google Sheets, Gemini, Looker Studio",
      screenshots: [
        { src: "/images/risk-radar-inner.png", alt: "Dashboard overview" },
        { src: "/images/risk-radar-workflow.png", alt: "n8n pipeline" },
      ],
      problem:
        "Global supply chain disruptions—whether physical, cyber, trade, or infrastructure—are reported across fragmented sources with inconsistent severity metrics. Decision‑makers lack a single real‑time, geospatial view that scores and ranks these disruptions for rapid situational awareness.",
      prdLink: "#",
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
    // 2) Industry Digest
    {
      id: "industry-digest",
      title: "Industry Digest",
      year: "2025",
      stack: "n8n | SQL | REST API | Automation",
      summary:
        "Zero-cost n8n + Gemini pipeline that lands a Monday-morning email distilling EPC wins, setbacks & macro trends in 7 min, saving 3 hrs each week.",
      cover: { src: "/images/industry-digest-outer.png", alt: "Industry Digest" },
      screenshots: [
        { src: "/images/industry-digest-outer.png", alt: "Industry Digest" },
        { src: "/images/industry-digest-workflow.png", alt: "Industry Digest — n8n workflow" },
      ],
      problem:
        "New to the EPC sector, I burned 3 hrs every Sunday scanning 30+ sources for contract wins, policy shifts and interview fodder—still missed early signals.",
      approach: [
        "n8n workflow (self-host) schedules Mon 09:00 IST → crawls News, press pages, exchange filings.",
        "Boolean + regex filter → Gemini clusters into Wins / Setbacks / Strategy Moves / Macro; pulls deal value, geography, keywords.",
        "Builds comparative table + bullet insights, wraps in branded HTML, and ships via SMTP to my inbox (and any CCs).",
      ],
      outcome: [
        "3 hrs → 7 min (-96% effort); weekly snapshot delivered before coffee.",
        "Now being used to send industry digest to senior leadership as well.",
      ],
      learnings: [
        "Scheduling workflows without babysitting.",
        "Run frequency vs cloud costs: balancing speed with budget.",
      ],
    },
    // 3) Content‑to‑Insights Pipeline
    {
      id: "content-to-insights",
      title: "Content‑to‑Insights Pipeline",
      year: "2025",
      stack: "n8n | SQL | REST API | Automation",
      summary:
        "Auto-summarises YouTube talks into a searchable Notion hub in 5 min, slashing research time 30×.",
      cover: { src: "/images/content-to-insights-outer.png", alt: "Content‑to‑Insights — card cover" },
      screenshots: [
        { src: "/images/content-to-insights-workflow.png", alt: "Content‑to‑Insights — card cover" },
        //{ src: "/images/content-to-insights-workflow.png", alt: "Content‑to‑Insights — workflow" },
      ],
      problem: [
        "Research drag: each new tech talk cost 4 hrs to watch, note, and file—insights scattered across docs.",
        "Wanted focus: needed a hands-free way to surface ‘share-worthy’ takeaways, fast.",
      ],
      approach: [
        "n8n workflow (7 nodes) – YouTube API fetches fresh video IDs → pull captions → GPT-4o distils 3-line summary + tags → push to Notion DB.",
        "Zero-code stack – all services on free tiers; variable LLM spend.",
        "Search & share – Notion filters by tag/topic; daily Slack digest posts newest insights.",
      ],
      outcome: [
        "4 hrs → 5 min (-98% effort), 30× faster insight capture.",
        "Archived 60+ videos in the first month.",
        "Run-rate: ₹0 infra + LLM API cost.",
      ],
      learnings: [
        "Introduction to workflow automation.",
        "Revision: REST API (auth, pagination, & rate limits), ETL workflows.",
      ],
    },
  ],
  // legacy impact list removed; using premium Impact component below
  contact: { email: "bharat.15dck@gmail.com", phone: "+919953779868", linkedin: "https://www.linkedin.com/in/bahratk1512" },
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
        <nav className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#home" className="font-medium text-zinc-100">BK</a>
          <ul className="flex gap-3 sm:gap-4 text-[13px] sm:text-sm flex-wrap justify-center sm:justify-start pr-2">

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
// ---- Premium Profile Avatar (inline) ----
function ProfileAvatar({
  src = "/avatar.jpg",
  alt = "Profile photo",
  size = 96, // px
}: {
  src?: string;
  alt?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translateY(-2px) rotateY(${x / 28}deg) rotateX(${-y / 28}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group relative mx-auto mb-6 rounded-full overflow-hidden ring-1 ring-zinc-800 transition-transform duration-300 will-change-transform hover:scale-[1.04]"
      style={{ width: size, height: size, perspective: 600 }}
    >
      {/* soft halo */}
      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6),0_0_0_8px_rgba(224,224,224,0.06)] group-hover:shadow-[0_12px_38px_-12px_rgba(0,0,0,0.7),0_0_0_10px_rgba(224,224,224,0.08)] transition-shadow duration-300" />
      <Image src={src} alt={alt} fill className="object-cover" priority />
      {/* subtle radial gloss */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
    </div>
  );
}

// ---- Hero ----
function Hero() {
  return (
    <Section id="home">
      <Reveal>
        <div className="text-center">
          {/* Avatar */}
          {data.hero.photo?.src && (
  <ProfileAvatar
    src={data.hero.photo.src}
    alt={data.hero.photo.alt || "Profile photo"}
    size={96} // tweak to 112 / 128 if you want larger
  />
)}


          {/* Name */}
          <h1 className="text-[clamp(30px,5.6vw,56px)] font-bold text-zinc-100 tracking-tight">{data.hero.name}</h1>

          {/* Tagline badges */}
          <div className="flex items-center justify-center gap-3 mt-3 mb-4">
            <Badge>Program Manager · Tech→Ops</Badge>
            <Badge>IIMA MBA</Badge>
          </div>

          {/* Tagline (old title) */}
          <p className="text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            {data.hero.title}
          </p>
          {/* Subhead */}
          <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto mt-2">
            {data.hero.subhead}
          </p>

          {/* CTAs */}
          <div className="flex justify-center gap-4 mt-8">
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

// ---- Projects (Work) ----
function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => data.projects.find((p) => p.id === activeId) || null, [activeId]);

  useEffect(() => {
    if (active) { document.body.style.overflow = "hidden"; } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

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
  <div
    className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-0 sm:p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="case-title"
    onClick={(e) => { if (e.target === e.currentTarget) setActiveId(null); }}
  >
    <div
      ref={modalRef}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 overflow-y-auto"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="case-title" className="text-xl text-zinc-100 font-semibold">{active.title}</h3>
          <div className="text-sm text-zinc-400 mt-1">
            {active.year}{active.stack ? ` · ${active.stack}` : ""}
          </div>
        </div>
        <button
          onClick={() => setActiveId(null)}
          className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur mt-2 pt-2 pb-2 z-10 border-b border-zinc-900">
        <nav className="text-xs text-zinc-400 flex gap-4">
          <a href="#p-summary" className="hover:text-zinc-100">Summary</a>
          <a href="#p-problem" className="hover:text-zinc-100">Problem</a>
          <a href="#p-approach" className="hover:text-zinc-100">Action</a>
          <a href="#p-outcome" className="hover:text-zinc-100">Result</a>
          <a href="#p-learnings" className="hover:text-zinc-100">Learnings</a>
        </nav>
      </div>

      <div id="p-summary" className="mt-4">
        {active.screenshots?.[0]?.src ? (
          <div className="overflow-hidden rounded-xl ring-1 ring-zinc-800/60 mb-3">
            <img loading="lazy" src={active.screenshots[0].src} alt={active.screenshots[0].alt} className="w-full h-auto object-cover" />
          </div>
        ) : null}
        <p className="text-zinc-300">{active.summary}</p>
      </div>

      <div id="p-problem" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Problem</h4>
        {Array.isArray(active.problem) ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {active.problem.map((p, i) => (<li key={i}>{p}</li>))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-300">{active.problem}</p>
        )}
        {active.prdLink && (
          <div className="mt-2 text-xs">
            <a className="text-zinc-300 underline hover:text-white" href={active.prdLink}>
              Product Requirement Document
            </a>
          </div>
        )}
      </div>

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

      <div id="p-outcome" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Result</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {active.outcome.map((o, i) => (<li key={i}>{o}</li>))}
        </ul>
      </div>

      <div id="p-learnings" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Learnings</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {Array.isArray(active.learnings)
            ? active.learnings.map((l: string, i: number) => (<li key={i}>{l}</li>))
            : <li>{active.learnings}</li>}
        </ul>
      </div>
    </div>
  </div>
)}
    </Section>
  );
}

// ---- Impact (Premium: 6 items + modal) ----
function Impact() {
  const impacts = [
    {
      id: "eoffice-2023",
      title: "e-Office rollout (2023)",
      subtitle: "Paperless HQ, –90 % TAT",
      problem: [
        "Paper files (≈ 200/day) trapped officers at desks and buried approvals.",
      ],
      action: [
        "Championed e-Office SaaS",
        "Upgraded legacy PCs/network, wrote SOPs, trained staff, steered multi-stakeholder change.",
      ],
      outcome: [
        "Admin SLA –90 % and paper eliminated within 14 weeks",
      ],
      learnings: [
        "Change-management levers (super-users, floor-walks, quick-win metrics)",
        "Digitised legacy SOPs without feature creep - kept focus on time-to-value.",
      ],
    },
    {
      id: "py-triage-2019",
      title: "Python triage Engine (2019)",
      subtitle: "NLP | Random Forest | AWS",
      problem: [
        "Remote area - improper network coverage",
        "Manual profiling of “high-impact” entities drained analyst hours and missed signals.",
      ],
      action: [
        "Coded a Python + NLP classifier with nightly AWS crawlers; tuned keywords for local threats.",
      ],
      outcome: [
        "Analyst cycle-time –85 %, freeing > 1 FTE/day",
      ],
      learnings: [
        "Cultivated the “small-automation, big-impact” mindset.",
        "Balanced precision vs. speed in NLP models handling sensitive data",
      ],
    },
    {
      id: "defexpo-pmo-2022",
      title: "Defence Expo PMO (2022)",
      subtitle: "8 work-streams | Multi-agency",
      problem: [
        "250k+ visitors, 75+ foreign delegations, zero-failure tolerance",
        "20 days to build security & logistics, leading over 600 personnel",
      ],
      action: [
        "Directed 8 workstreams, integrated 2k+ CCTV streams into a single multi-agency control room",
        "Ran daily stand-ups with multi-agency stakeholders",
      ],
      outcome: [
        "Hit 100 % SLA / zero incidents",
        "Recommended for DG Commendation Roll",
      ],
      learnings: [
        "RAID-log governance; kept eight workstreams on the critical path under strict deadlines.",
        "Diplomacy & escalation across multiple agencies - aligning tactical actions with strategic goals.",
      ],
    },
    {
      id: "sales-boost-2023",
      title: "Sales Analytics Boost (2023)",
      subtitle: "2x inventory turn | +20 % sales",
      problem: [
        "Cash-heavy ops",
        "Slow stock turns",
        "Leak-prone storage area",
      ],
      action: [
        "Deployed UPI-enabled POS",
        "Doubled purchase cadence",
        "Used SKU analytics to rebalance inventory",
      ],
      outcome: [
        "Inventory turns ×2",
        "Sales +20 % (₹11 L / month)",
      ],
      learnings: [
        "Learnt and applied the data > gut mindset",
        "Simple tools & charts can drive meaningful change",
      ],
    },
    {
      id: "access-redesign-2022",
      title: "Access-Control Redesign (2022)",
      subtitle: "40% capex saved",
      problem: [
        "Client’s draft blueprint called for dozens of badge readers and turnstiles",
        "Over-engineered flow for a new critical-infrastructure wing",
      ],
      action: [
        "Understood KPIs for union reps, management, vendors and CISF teams",
        "Ran an on-site survey with multiple stakeholders",
        "Eliminated redundancies and re-sequenced traffic into a dual-layer zone that needed far fewer devices",
      ],
      outcome: [
        "Final design required 40% fewer machines",
        "Delivered a better security depth and kept the project within capex limit",
        "All stakeholders signed off",
      ],
      learnings: [
        "Stakeholder management masterclass - Security, cost, & convenience pull in different directions",
        "Vendor management and TCO skills",
      ],
    },
    {
      id: "currency-press-2022",
      title: "Currency-Press Consulting (2022)",
      subtitle: "20% opex saved",
      problem: [
        "The client demanded a sharp cut in CISF deployment costs",
      ],
      action: [
        "Interviewed leadership, unions and CISF HQ",
        "Redesigned the model: digitised pass issuance, added biometric/RFID access at choke points, upgraded IP-CCTV analytics, and re-categorised guard posts so non-core roles could be outsourced",
      ],
      outcome: [
        "Right-sized staffing and tech refresh",
        "Sliced operating spend by 20% while preserving security coverage",
      ],
      learnings: [
        "As-Is / To-Be mapping",
        "Negotiating multi-party buy-ins",
      ],
    },
  ];

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => impacts.find((i) => i.id === activeId) || null, [activeId]);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

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
    <Section id="impact" title="Impact in Previous Roles">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {impacts.map((it, idx) => (
          <Reveal key={it.id} delay={idx * 50}>
            <button
              onClick={() => setActiveId(it.id)}
              className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl"
              aria-haspopup="dialog"
              aria-expanded={activeId === it.id}
            >
              <Card>
                <div className="text-zinc-100 font-medium">{it.title}</div>
                {it.subtitle && (
                  <div className="text-zinc-400 text-sm">{it.subtitle}</div>
                )}
                {it.outcome?.length ? (
                  <ul className="mt-3 text-xs text-zinc-400 list-disc list-inside space-y-1">
                    {it.outcome.slice(0, 2).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
  <div
    className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-0 sm:p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="impact-title"
    onClick={(e) => { if (e.target === e.currentTarget) setActiveId(null); }}
  >
    <div
      ref={modalRef}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 overflow-y-auto"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="impact-title" className="text-xl text-zinc-100 font-semibold">
            {active.title}
          </h3>
          {active.subtitle && (
            <div className="text-sm text-zinc-400 mt-1">{active.subtitle}</div>
          )}
        </div>
        <button
          onClick={() => setActiveId(null)}
          className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur mt-2 pt-2 pb-2 z-10 border-b border-zinc-900">
        <nav className="text-xs text-zinc-400 flex gap-4">
          <a href="#i-problem" className="hover:text-zinc-100">Problem</a>
          <a href="#i-action" className="hover:text-zinc-100">Action</a>
          <a href="#i-result" className="hover:text-zinc-100">Result</a>
          <a href="#i-learnings" className="hover:text-zinc-100">Learnings</a>
        </nav>
      </div>

      <div id="i-problem" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Problem</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {active.problem?.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div id="i-action" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Action</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {active.action?.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>

      <div id="i-result" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Result</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {active.outcome?.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>

      <div id="i-learnings" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Learnings</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {active.learnings?.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </div>
    </div>
  </div>
)}
          
    </Section>
  );
}

// ---- Timeline (horizontal, hover + keyboard, pop-forward) ----
function Timeline() {
  const items = [
    { key: "zs",   label: "ZS",   year: "2018", details: "Analytics & consulting foundation; ops + data basics." },
    { key: "ib",   label: "IB",   year: "2019", details: "Python NLP triage engine; –85% analyst cycle‑time." },
    { key: "cisf", label: "CISF", year: "2022", details: "Defence Expo PMO; access‑control redesign; 40% capex saved." },
    { key: "mha",  label: "MHA",  year: "2023", details: "e‑Office rollout; paperless HQ; –90% admin SLA in 14 weeks." },
    { key: "kec",  label: "KEC",  year: "2024", details: "Sales analytics boost; 2× inventory turns; +20% sales." },
  ];
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="mt-10 select-none">
      <div className="relative">
        {/* base line */}
        <div className="h-[2px] w-full bg-zinc-800 rounded-full" />
        {/* points */}
        <div className="relative">
          <div className="grid grid-cols-5">
            {items.map((it) => {
              const active = hover === it.key;
              const tooltipId = `tt-${it.key}`;
              return (
                <div
                  key={it.key}
                  className={`relative flex flex-col items-center ${active ? "z-20" : ""}`}
                  onMouseEnter={() => setHover(it.key)}
                  onMouseLeave={() => setHover(null)}
                >
                  {/* dot (keyboard accessible) */}
                  <button
                    className={`relative mt-[-7px] h-3.5 w-3.5 rounded-full bg-zinc-300 ring-2 ring-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-transform duration-200 will-change-transform ${
                      active ? "scale-[1.35] shadow-[0_0_0_6px_rgba(224,224,224,0.06)]" : "scale-100"
                    }`}
                    onFocus={() => setHover(it.key)}
                    onBlur={() => setHover(null)}
                    onKeyDown={(e) => { if (e.key === "Escape") setHover(null); }}
                    aria-label={`${it.label} ${it.year}`}
                    aria-describedby={active ? tooltipId : undefined}
                    aria-expanded={active}
                  />
                  {/* label + year (hover/keyboard synced) */}
                  <button
                    className="mt-3 text-center focus:outline-none"
                    onFocus={() => setHover(it.key)}
                    onBlur={() => setHover(null)}
                    aria-label={`${it.label} ${it.year} details`}
                  >
                    <div className={`text-sm ${active ? "text-zinc-100 font-semibold" : "text-zinc-200 font-medium"}`}>
                      {it.label}
                    </div>
                    <div className={`text-xs ${active ? "text-zinc-300" : "text-zinc-400"}`}>{it.year}</div>
                  </button>

                  {/* tooltip */}
                  {active && (
  <div
    id={tooltipId}
    role="tooltip"
    className="absolute -top-28 z-20 w-56 max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl animate-[fadeIn_.15s_ease-out]"
    style={{
      left: it.key === items[0].key ? 0 : it.key === items[items.length - 1].key ? 'auto' : '50%',
      right: it.key === items[items.length - 1].key ? 0 : 'auto',
      transform: it.key === items[0].key || it.key === items[items.length - 1].key ? 'none' : 'translateX(-50%)',
    }}
  >
    <div className="text-zinc-100 text-sm font-medium">{it.label} · {it.year}</div>
    <div className="text-zinc-400 text-xs mt-1 leading-relaxed">{it.details}</div>

    {/* arrow – centers normally; snaps near the dot at edges */}
    <div
      className={[
        "absolute -bottom-2 w-3 h-3 rotate-45 bg-zinc-950 border-r border-b border-zinc-800",
        it.key === items[0].key
          ? "left-[18px]"          // roughly over the first dot
          : it.key === items[items.length - 1].key
            ? "right-[18px]"       // roughly over the last dot
            : "left-1/2 -translate-x-1/2", // centered
      ].join(" ")}
    />
  </div>
)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
        <Timeline />
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
      <div className="bg-[#121212] min-h-screen text-[#E0E0E0] scroll-smooth overflow-x-hidden">
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
