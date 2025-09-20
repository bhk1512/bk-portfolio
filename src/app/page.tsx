"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
//import ProfileAvatar from "\src\app\ProfileAvatar.tsx";
import Image from "next/image";

// =============================
// Bharat Kaushik - Portfolio (Dark, Minimal -> Premium polish)
// Projects finalized: AI"‘Powered Risk"‘Radar, Industry Digest, Content"‘to"‘Insights
// Impact finalized: 6 detailed items with premium modal (Problem/Action/Result/Learnings)
// Image files expected in /public (root):
//   /images/ai-risk-radar-1.png
//   /images/ai-risk-radar-2.png
//   /industry-digest-outer.png
//   /industry-digest-workflow.png
//   /content-to-insights-outer.png
//   /content-to-insights-workflow.png
// =============================

type Project = {
  id: string;
  title: string;
  year?: string;
  stack?: string;
  summary?: string;
  demoLink?: string;
  prdLink?: string;
  cover?: { src: string; alt: string };
  metrics?: string[];
  screenshots?: { src: string; alt: string }[];
  problem?: string | string[];
  approach?: string[];
  outcome?: string[];
  learnings?: string[];
  teardown?: TeardownContent;
  // add other keys you're actually using
};
type ImpactItem = {
  id: string;
  title: string;
  subtitle?: string;
  summary?: string;
  problem?: string[];
  action?: string[];
  outcome?: string[];
  learnings?: string[];
};

type Certification = {
  title: string;
  issuer?: string;
  year?: string;
  url?: string;
  logo?: string;
};

type TeardownStat = {
  value: string;
  label: string;
};

type TeardownHighlight = {
  title: string;
  bullets: string[];
};

type TeardownJourneyAnnotation = {
  tone: string;
  text: string;
};

type TeardownJourneyPhase = {
  id: string;
  title: string;
  annotations: TeardownJourneyAnnotation[];
  screenshot?: { src: string; alt: string };
};

type TeardownReviewStat = {
  label: string;
  value: number;
  tone?: string;
  note?: string;
};

type TeardownRecommendationSet = {
  id: string;
  title: string;
  icon?: string;
  accent?: string;
  bullets: string[];
  metric: string;
};

type TeardownContent = {
  badge: string;
  heading: string;
  subheading?: string;
  description: string;
  stats: TeardownStat[];
  actions: { label: string; href: string }[];
  execSummary: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  keyPainPoints: string[];
  about: string[];
  journey: {
    stages: string[];
    strengths: string[];
    pains: string[];
    reviewInsights: string[];
  };
  growth: string[];
  opportunities: TeardownHighlight[];
  threats: string[];
  recommendations: TeardownHighlight[];
  reflection: string;
  nextSteps: string[];
  explore: { label: string; href: string }[];
  nav?: { id: string; label: string }[];
  leakMap?: { stages: string[]; issues: string[]; caption: string };
  marketSnapshot?: {
    leader: { label: string; value: number };
    competitors: { label: string; value: number }[];
    bullets: string[];
  };
  uxJourney?: {
    intro: string[];
    phases: TeardownJourneyPhase[];
    reviewSummary?: TeardownReviewStat[];
    sourceLabel?: string;
  };
  working?: string[];
  breaking?: string[];
  growthSummary?: { headline: string; tiles: string[]; retentionNote: string };
  recommendationSets?: TeardownRecommendationSet[];
  conclusion?: { headline: string; quote: string };
  nextActionsDetailed?: string[];
  visuals?: { label: string; src?: string }[];
};

// ---- Utilities ----
const SECTION_IDS = ["home", "work", "skills", "certs", "impact", "about", "writing", "contact"] as const;
type SectionId = typeof SECTION_IDS[number];
type Affiliation = {
  name: string;
  url: string;
  logo: { src: string; width: number; height: number };
};

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
// ---- Portal helper for modals ----
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = document.createElement("div");
    elRef.current = el;
    document.body.appendChild(el);
    setMounted(true);
    return () => { if (elRef.current) document.body.removeChild(elRef.current); };
  }, []);
  if (!mounted || !elRef.current) return null;
  return createPortal(children, elRef.current);
}

// ---- Section with anchorable header ----
function Section({ id, title, children }: { id: string; title?: string; children: React.ReactNode }) {
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`); }
    catch { /* ignore */ }
  };
  return (
    <section id={id} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10" style={{ contentVisibility: "auto" }}>
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

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border border-zinc-700/70 px-3 py-1 text-xs text-zinc-300 bg-zinc-950/40 backdrop-blur " +
        className
      }
    >
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
    //title: "Tech"‘to"‘Ops builder with IIMA MBA", // tagline
    subhead: "Aligning people, processes, and tech to remove uncertainty from execution",
    photo: { src: "/images/avatar.jpg", alt: "Bharat Kaushik" }, // put your image at /images/public/avatar.jpg
    ctas: [
      { label: "Download CV", href: "/Bharat_Kaushik_IIMA.pdf", type: "primary" },
      { label: "Email", href: "mailto:bharat.15dck@gmail.com", type: "ghost" },
      { label: "Call", href: "tel:+919953779868", type: "ghost" },
    ],
    affiliations: [
      {
        name: "IIM Ahmedabad",
        url: "https://www.iima.ac.in/",
        logo: { src: "/images/affiliations/iima.png", width: 84, height: 24 },
      },
      {
        name: "CISF",
        url: "https://cisf.gov.in/",
        logo: { src: "/images/affiliations/cisf.png", width: 64, height: 24 },
      },
      {
        name: "MHA",
        url: "https://mha.gov.in/",
        logo: { src: "/images/affiliations/mha.png", width: 64, height: 24 },
      },
      {
        name: "ZS",
        url: "https://www.zs.com/",
        logo: { src: "/images/affiliations/zs.svg", width: 64, height: 24 },
      },
    ],
  },
  projects: [
    {
      id: "audible-product-teardown",
      title: "Audible Product Teardown",
      year: "2025",
      stack: "Product Strategy | Growth",
      summary:
        "Deep dive into Audible's product experience, retention mechanics, and growth plays backed by 30K+ review signals.",
      cover: { src: "/images/Audible.png", alt: "Audible product teardown" },
      metrics: ["60% global share", "30K+ reviews analyzed", "SWOT + JTBD lens"],
      teardown: {
        badge: "Product Teardown",
        heading: "Audible Product Teardown",
        subheading: "2025 - Strategic Analysis | Growth Opportunities",
        description:
          "Audible, backed by Amazon, is the global leader in audiobooks. I unpacked the product, user journey, and business model to see where it wins, where it struggles, and how it can grow.",
        stats: [
          { value: "~60%", label: "Market Share" },
          { value: "+25%", label: "Annual Growth" },
          { value: "30K+", label: "Reviews Analyzed" },
          { value: "Amazon", label: "Ecosystem" },
        ],
        actions: [
          { label: "View Slides", href: "/Product Teardowns/Audible_Product_Teardown.pdf" },
          { label: "Download Report", href: "/Product Teardowns/Audible Product Teardow Report.pdf" },
        ],
        nav: [
          { id: "td-overview", label: "Overview" },
          { id: "td-market", label: "Market" },
          { id: "td-ux", label: "UX" },
          { id: "td-growth", label: "Growth" },
          { id: "td-recs", label: "Recs" },
          { id: "td-next", label: "Next" },
        ],
        leakMap: {
          stages: ["Awareness", "Trial", "First Listen", "Credit Exhaustion", "Retention"],
          issues: ["Credit gating", "Weak discovery", "Offline fails"],
          caption: "Churn spikes right when content should be easiest to find.",
        },
        marketSnapshot: {
          leader: { label: "Audible", value: 60 },
          competitors: [
            { label: "Spotify", value: 18 },
            { label: "Apple Books", value: 12 },
            { label: "Regional/local apps", value: 10 },
          ],
          bullets: [
            "Audio is growing ~25% annually; listeners want depth in local languages.",
            "Bundled subscriptions (music + podcasts + audiobooks) are shifting attention share.",
            "AI narration expands supply, but editorial quality still decides what people finish.",
          ],
        },
        uxJourney: {
          intro: [
            "Acquisition is strong thanks to Amazon SSO and generous trials.",
            "Retention slips once the first credit is gone and included content becomes hard to surface.",
          ],
          phases: [
            {
              id: "ux-onboarding",
              title: "Onboarding",
              annotations: [
                { tone: "positive", text: "Amazon login plus free trial equals a 60-second start." },
                { tone: "positive", text: "Value prop is clear with Originals and deals up front." },
                { tone: "negative", text: "No preview of included titles before entering the credit flow." },
              ],
            },
            {
              id: "ux-discovery",
              title: "Discovery",
              annotations: [
                { tone: "negative", text: "Filters for Included / Free / Language are hidden three taps deep." },
                { tone: "negative", text: "Recommendations repeat the last purchase instead of widening the catalog." },
                { tone: "positive", text: "Editorial collections (Editors' Picks) land well when surfaced." },
              ],
            },
            {
              id: "ux-listening",
              title: "Listening",
              annotations: [
                { tone: "positive", text: "Whispersync and speed controls feel polished." },
                { tone: "negative", text: "Offline downloads fail silently; users lose spot mid-commute." },
              ],
            },
            {
              id: "ux-retention",
              title: "Retention",
              annotations: [
                { tone: "negative", text: "Credit exhaustion causes a hard paywall with little guidance." },
                { tone: "negative", text: "Library view mixes owned, trial, and included items with no clear labels." },
              ],
            },
          ],
          reviewSummary: [
            { label: "Stability / playback", value: 64, tone: "negative" },
            { label: "Pricing confusion", value: 48, tone: "negative" },
            { label: "Offline downloads", value: 42, tone: "negative" },
            { label: "Discovery & filters", value: 38, tone: "negative" },
          ],
          sourceLabel: "From 30K Google Play reviews",
        },
        working: [
          "Amazon login plus free trial keep the top of funnel frictionless.",
          "Keep forever credit model creates a sense of ownership.",
        ],
        breaking: [
          "No simple way to filter Included / credit-free / regional language titles.",
          "Recommendations loop; regional depth is shallow outside EN/US catalog.",
          "Offline mode and download reliability continue to break trust.",
        ],
        growthSummary: {
          headline: "Top-of-funnel is healthy -- the next job is to harden habit.",
          tiles: [
            "Prime / Kindle halo",
            "PayTM / GPay / CRED trials",
            "App store ads and influencer reviews",
          ],
          retentionNote: "Retention drops sharply once trials or monthly credits end -- usage bends down the moment a credit is used.",
        },
        recommendationSets: [
          {
            id: "discovery",
            title: "Fix Discovery & Retention",
            icon: "??",
            accent: "emerald",
            bullets: [
              "Give Included / Credit-Free / Language filters a single-tap surface.",
              "Promote regional and translated picks dynamically.",
              "Use AI to summarise reviews so listeners pick faster.",
            ],
            metric: "Watch daily listens per user and time-to-first-play.",
          },
          {
            id: "plans",
            title: "Rethink Subscription",
            icon: "??",
            accent: "teal",
            bullets: [
              "Offer 6- and 12-month bundles for commitment without monthly churn.",
              "Sell 2- and 5-credit packs for binge listeners.",
              "Layer bonus listens into Prime to keep the halo sticky.",
            ],
            metric: "Track churn %, plan mix, and ARPU.",
          },
          {
            id: "core",
            title: "Stabilise Core Experience",
            icon: "??",
            accent: "violet",
            bullets: [
              "Drive crash-free sessions and faster cold-start times.",
              "Make downloads persistent with explicit offline states.",
              "Refresh recommendations beyond more-like-this loops.",
            ],
            metric: "Monitor crash-free %, offline success rate, and rec CTR.",
          },
        ],
        conclusion: {
          headline: "Audible's biggest competitor isn't Spotify.",
          quote: "It is unresolved UX friction at the exact moment listeners want their next story.",
        },
        nextActionsDetailed: [
          "Run 5-7 user interviews during the credit-exhaustion week.",
          "A/B test Included filter placement and regional rails.",
          "Cut retention cohorts by acquisition channel and preferred language.",
          "Ship a competitive playbook for Spotify bundling.",
        ],
        visuals: [
          { label: "Funnel drop-off slide" },
          { label: "Review complaints bar chart" },
          { label: "SWOT quadrant snapshot" },
          { label: "Recommendations overview slide" },
        ],
        execSummary: {
          strengths: ["Amazon ecosystem integration", "Exclusive originals catalog", "Strong trial-to-paid funnel"],
          weaknesses: ["Credit gating creates friction", "Discovery for free or regional content is weak"],
          opportunities: ["Expand regional language catalog", "AI-personalized discovery", "Flexible plan options"],
          threats: ["Spotify bundling audiobooks", "Creator pushback on royalties"],
        },
        keyPainPoints: [
          "Credit gating creates post-trial friction for casual listeners",
          "Poor discovery of free or credit-free content",
          "App stability and offline downloads remain unreliable",
          "Pricing and entitlements are confusing once credits run out",
        ],
        about: [
          "Subsidiary of Amazon; offers audiobooks, podcasts, and originals.",
          "Core users: busy professionals, students, multitaskers.",
          "Job to be done: read a book or gain knowledge while multitasking.",
          "Market growing roughly 25% annually with surging demand for regional content.",
        ],
        journey: {
          stages: ["Onboarding", "Discovery", "Listening", "Retention"],
          strengths: ["Amazon login + free trial makes onboarding smooth", "Keep forever model builds perceived value"],
          pains: ["Hard to find credit-free or included titles after the first credit", "Recommendations repeat and ignore regional demand", "Offline listening fails often", "Pricing and entitlements are opaque"],
          reviewInsights: ["30K Google Play reviews analyzed", "Top complaints: stability, pricing clarity, offline downloads", "Discovery and filters called out as weak", "Users want more regional language depth"],
        },
        growth: [
          "Prime bundling and Kindle integration fuel top-of-funnel growth",
          "Paid trials activated through PayTM, GPay, and CRED partnerships",
          "App store marketing and influencer programs drive acquisition",
          "Retention drops sharply once free trials or monthly credits are exhausted",
        ],
        opportunities: [
          { title: "Regional Expansion", bullets: ["Invest in India, LATAM, and SE Asia catalogs", "Partner with local publishers and voice talent"] },
          { title: "AI Personalization", bullets: ["Summaries and smart tags to cut selection time", "Dynamic recommendations that refresh beyond similar titles"] },
          { title: "Flexible Plans", bullets: ["6- and 12-month bundles to smooth churn", "Credit packs for heavy listeners and gifting"] },
        ],
        threats: [
          "Spotify bundling audiobooks with music and podcasts",
          "Apple Books leaning on native iOS distribution",
          "Creator frustration over royalty models",
        ],
        recommendations: [
          {
            title: "Fix Discovery & Retention",
            bullets: ["Make included and credit-free content filterable", "Ship regional language and translation depth", "Use AI to summarize reviews so users pick faster"],
          },
          {
            title: "Rethink Subscription Model",
            bullets: ["Offer annual and 6-month plans to reduce churn", "Allow flexible credit packs (2 or 5 credits)", "Layer extra listens into Prime as a perk"],
          },
          {
            title: "Enhance Core Experience",
            bullets: ["Stabilize offline downloads and playback", "Clarify pricing with simple in-app labels", "Refresh recommendations beyond similar titles"],
          },
        ],
        reflection:
          "This teardown sharpened my product judgment using JTBD, funnel analysis, and SWOT frameworks to connect user problems with growth bets.",
        nextSteps: [
          "Run user interviews to validate retention hypotheses",
          "Test regional pricing and flexible credit plans",
          "Map retention curves across acquisition cohorts",
          "Build a competitive playbook for Spotify's bundling threat",
        ],
        explore: [
          { label: "View Slide Deck", href: "/Product Teardowns/Audible_Product_Teardown.pdf" },
          { label: "Download Detailed PDF Report", href: "/Product Teardowns/Audible Product Teardow Report.pdf" },
        ],
      },
    },
    // 1) AI"‘Powered Risk"‘Radar
    {
      id: "ai-risk-radar",
      title: "AI Powered Risk Radar",
      year: "2025",
      stack: "Looker Studio | n8n",
      summary:
        "Real-time dashboard that ingests global news, classifies disruption events, and scores severity on a 0-10 index; visualized on an interactive world map with trends and filters.",
      cover: { src: "/images/risk-radar-outer.png", alt: "Risk Radar dashboard (Looker Studio)" },
      metrics: ["Real time map", "Ranked disruptions", "Trend lines & filters"],
      roleTools: "PM/Builder - NewsAPI, n8n, Google Sheets, Gemini, Looker Studio",
      screenshots: [
        { src: "/images/risk-radar-inner.png", alt: "Dashboard overview" },
        { src: "/images/risk-radar-workflow.png", alt: "n8n pipeline" },
      ],
      problem:
        "Disruptions (physical, cyber, trade, infrastructure) are reported across fragmented sources with no consistent measure of severity or impact, making it hard to prioritize response. Decision makers lack a single real time, geospatial view that scores and ranks these disruptions for rapid situational awareness.",
      prdLink: "/PRDs/Product Requirements Document - Risk Radar.pdf",
      approach: [
        "Ingestion & enrichment: NewsAPI -> n8n -> Google Sheets with deduplication.",
        "Classification: Gemini schema extracts type, nodes, geography, and factor sub-scores.",
        "Scoring: Supply Chain Severity Index (SCSI) with caps, decay, and bonuses to fully utilize 0-10.",
        "Visualization: Looker Studio world map, ranked table, trend lines, and dynamic filters.",
      ],
      outcome: [
        "One screen of truth to triage disruptions by severity and location.",
        "Low-cost deployment (free/low-tier APIs + Sheets/Looker).",
        "Iterated rubric to achieve meaningful spread across 0-10 (reduces all medium scores).",
      ],
      learnings: [
        "Ship end-to-end: scope -> schema -> rubric -> dashboard -> SLOs.",
        "Iterative development with mock data -> stable, impactful final product.",
        "Scoring matters: weights/caps/minima are the difference between noise and signal.",
        "Ops thinking (SLOs, runbook, cost) makes side-projects feel production-ready.",
      ],
    demoLink: "https://lookerstudio.google.com/s/oGJoVNj7tdw",
       // <- add
    },
    // 2) Industry Digest
    {
      id: "industry-digest",
      title: "Industry Digest",
      year: "2025",
      stack: "n8n | SQL | REST API | Automation",
       metrics: [
      "Automated crawl (30+ sources)",
      "LLM clustered insights",
      "Mon 09:00 email digest",
    ],
      summary:
        "Zero-cost n8n + Gemini pipeline that lands a Monday-morning email distilling EPC wins, setbacks & macro trends in 7 min, saving 3 hrs each week.",
      cover: { src: "/images/industry-digest-banner.png", alt: "Industry Digest" },
      screenshots: [
        { src: "/images/industry-digest-workflow.png", alt: "Industry Digest" },
        //{ src: "/samples/indigo-s-greatest-gamble-flying-international.pdf" },
      ],
      problem:
        "New to the EPC sector, I burned 3 hrs every Sunday scanning 30+ sources for contract wins, policy shifts and interview fodder-still missed early signals.",
      approach: [
        "n8n workflow (self-host) schedules Mon 09:00 IST -> crawls News, press pages, exchange filings.",
        "Boolean + regex filter -> Gemini clusters into Wins / Setbacks / Strategy Moves / Macro; pulls deal value, geography, keywords.",
        "Builds comparative table + bullet insights, wraps in branded HTML, and ships via SMTP to my inbox (and any CCs).",
      ],
      outcome: [
        "3 hrs -> 7 min (-96% effort); weekly snapshot delivered before coffee.",
        "Now being used to send industry digest to senior leadership as well.",
      ],
      learnings: [
        "Scheduling workflows without babysitting.",
        "Run frequency vs cloud costs: balancing speed with budget.",
      ],
      demoLink: "/samples/Industry-Digest-Sample.jpg",          // <- add (or Streamlit)
      prdLink: "/PRDs/Product Requirements Document - Industry Digest.pdf",
    },
    // 3) Content"‘to"‘Insights Pipeline
    {
      id: "content-to-insights",
      title: "Content to Insights Pipeline",
      year: "2025",
      stack: "n8n | SQL | REST API | Automation",
        metrics: [
      "3 line summaries + tags",
      "Searchable Notion hub",
      "Daily Slack digest",
    ],
      summary:
        "Auto-summarises YouTube talks into a searchable Notion hub in 5 min, slashing research time 30x.",
      cover: { src: "/images/content-to-insights-card-cover.png", alt: "Content to Insights - card cover" },
      screenshots: [
        { src: "/images/content-to-insights-workflow.png", alt: "Content to Insights - card cover" },
        //{ src: "/images/content-to-insights-workflow.png", alt: "Content"‘to"‘Insights - workflow" },
      ],
      problem: [
        "Research drag: each new tech talk cost 4 hrs to watch, note, and file-insights scattered across docs.",
        "Wanted focus: needed a hands-free way to surface 'share-worthy' takeaways, fast.",
      ],
      approach: [
        "n8n workflow (7 nodes) - YouTube API fetches fresh video IDs -> pull captions -> GPT-4o distils 3-line summary + tags -> push to Notion DB.",
        "Zero-code stack - all services on free tiers; variable LLM spend.",
        "Search & share - Notion filters by tag/topic; daily Slack digest posts newest insights.",
      ],
      outcome: [
        "4 hrs -> 5 min (-98% effort), 30x faster insight capture.",
        "Archived 60+ videos in the first month.",
        "Run-rate: Rs0 infra + LLM API cost.",
      ],
      learnings: [
        "Introduction to workflow automation.",
        "Revision: REST API (auth, pagination, & rate limits), ETL workflows.",
      ],
      demoLink: "/samples/indigo-s-greatest-gamble-flying-international.pdf",    // <- add
      prdLink: "/PRDs/Product Requirements Document - Content-to-Insights Pipeline.pdf",
    },
  ],
  // legacy impact list removed; using premium Impact component below
  contact: { email: "bharat.15dck@gmail.com", phone: "+919953779868", linkedin: "https://www.linkedin.com/in/bharatk1512" },
  //skills and certifications
  skills: {
    categories: [
      {
        name: "Technical",
        items: [
          "Python",
          "SQL",
          "AWS",
          "Excel",
          "Looker Studio",
          "Power BI",
          "No Code / Low Code",
        ],
      },
      {
        name: "Professional",
        items: [
          "Program Leadership",
          "Dashboarding",
          "Process Improvement",
          "Stakeholder Management",
        ],
      },
    ],
    note: undefined, // or a short line if you want, else keep undefined
  },

  certs: [
    {
      title: "Lean Six Sigma Green Belt",
      issuer: "-",
      year: "2023",
      url: "https://drive.google.com/file/d/16Ffwaq9l6f-vfz9FsXctV4cTvBa-CnUI/view?usp=drive_link",
      logo: "/images/certs/lss.png", // optional
    },
    {
      title: "Google Project Management",
      issuer: "Google",
      year: "2024",
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/KCUUV7XE5JAW",
      logo: "/images/certs/gpm.png",
    },
    {
      title: "Google Business Intelligence",
      issuer: "Google",
      year: "2023",
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/E4757BBK9LWU",
      logo: "/images/certs/gbi.png",
    },
    {
      title: "Google Data Analytics Professional",
      issuer: "Google",
      year: "2023",
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/FSUJE6R7S3AJ",
      logo: "/images/certs/gda.png",
    },
    {
      title: "Google Cloud Digital Leader",
      issuer: "Google",
      year: "2023",
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/Z5VVXSNRHJND",
      logo: "/images/certs/gcdl.png",
    },
  ],
};

const projects: Project[] = data.projects;

function Skills() {
  const categories = data.skills?.categories ?? [];
  const note = data.skills?.note;

  return (
    <Section id="skills" title="Skills">
      <Reveal>
        <div className="grid lg:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 60}>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-zinc-100 font-medium">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((s: string) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        {note ? <p className="text-xs text-zinc-400 mt-4">{note}</p> : null}
      </Reveal>
    </Section>
  );
}
function AffiliationBar() {
  // cast ensures TS knows affiliations exists and is an array of Affiliation
  const items = ((data.hero as { affiliations?: Affiliation[] }).affiliations ?? []) as Affiliation[];
  if (!items.length) return null;

  return (
    <div className="mt-5 pt-3 border-t border-zinc-800/60">
      <span className="sr-only">Affiliations</span>
      <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6 overflow-x-auto">
        {items.map((a: Affiliation) => (
          <a
            key={a.name}
            href={a.url}
            aria-label={a.name}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Image
              src={a.logo.src}
              alt={`${a.name} logo`}
              width={a.logo.width}
              height={a.logo.height}
              loading="lazy"
              className="grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
function Certifications() {
  const certs: Certification[] = data.certs ?? [];

  return (
    <Section id="certs" title="Certifications">
      {!certs.length ? (
        <Card>
          <p className="text-zinc-300 text-sm">
            (Add your certifications in <code>data.certs</code> to show them here.)
          </p>
        </Card>
      ) : (
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((c, i) => (
              <Reveal key={`${c.title}-${i}`} delay={i * 60}>
                <Card>
                  <div className="flex items-start gap-3">
                    {c.logo ? (
                      <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden ring-1 ring-zinc-800 bg-zinc-900">
                        <Image
                          src={c.logo}
                          alt={`${c.issuer || "Issuer"} logo`}
                          fill
                          sizes="40px"
                          className="object-contain p-1.5"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <div className="text-zinc-100 text-sm font-medium leading-tight">
                        {c.title}
                      </div>
                      <div className="text-zinc-400 text-xs mt-0.5">
                        {(c.issuer || "-")}{c.year ? ` . ${c.year}` : ""}
                      </div>
                      {c.url ? (
                        <div className="mt-2">
                          <a
                            href={c.url}
                            className="text-xs text-zinc-300 underline underline-offset-4 hover:text-white"
                          >
                            View credential 
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  );
}


// ---- Nav ----
function Nav() {
  const active = useActiveSection(SECTION_IDS as unknown as SectionId[]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items: { href: `#${SectionId}`; label: string; id: SectionId }[] = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#work", label: "Work", id: "work" },
    { href: "#impact", label: "Impact", id: "impact" },
    { href: "#about", label: "About", id: "about" },
    { href: "#writing", label: "Writing", id: "writing" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <header id="main-nav" className="fixed inset-x-0 top-3 z-[90]">
      <nav className="max-w-6xl mx-auto px-3">
        <div className="flex items-center justify-between rounded-full border border-zinc-900 bg-black/90 backdrop-blur px-3 sm:px-4 h-12 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]">
          {/* Left: Brand */}
          <a href="#home" className="flex items-center gap-2 text-zinc-100 font-medium">BK</a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-5">
            {items.map((it) => (
              <a
                key={it.id}
                href={it.href}
                className={`text-sm transition hover:text-white ${
                  active === it.id ? "text-white" : "text-zinc-200"
                }`}
              >
                {it.label}
              </a>
            ))}
          </div>

          {/* Right: hamburger for mobile */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              â˜°
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[60] bg-black/70"
          onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
        >
          <div className="absolute right-3 left-3 top-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-100 font-medium">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 rounded-full border border-zinc-700 text-zinc-200"
                aria-label="Close menu"
              >
                âœ•
              </button>
            </div>
            <div className="mt-3 grid gap-1">
              {items.map((it) => (
                <a
                  key={it.id}
                  href={it.href}
                  className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {it.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
// ---- Premium Profile Avatar (inline, responsive) ----
function ProfileAvatar({
  src = "/avatar.jpg",
  alt = "Profile photo",
}: {
  src?: string;
  alt?: string;
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
      el.style.transform = `translateY(-2px) rotateY(${x / 28}deg) rotateX(${-y / 28}deg`;
    };
    const onLeave = () => { el.style.transform = ""; };

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
      className="group relative rounded-full overflow-hidden ring-1 ring-zinc-800 transition-transform duration-300 will-change-transform hover:scale-[1.04]
                 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 
                 lg:w-88 lg:h-88 xl:w-96 xl:h-96"
      style={{ perspective: 600 }}
    >
      {/* soft halo */}
      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6),0_0_0_8px_rgba(224,224,224,0.06)]
                      group-hover:shadow-[0_12px_38px_-12px_rgba(0,0,0,0.7),0_0_0_10px_rgba(224,224,224,0.08)] transition-shadow duration-300" />
      <Image src={src} alt={alt} fill className="object-cover" priority />
      {/* subtle radial gloss */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
    </div>
  );
}

// ---- Hero (2-column on desktop, stacked on mobile) ----
function Hero() {
  return (
    <Section id="home">
      {/* non-intrusive background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <Reveal>
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:py-10 md:py-12 lg:py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: large avatar on desktop */}
            <div className="flex justify-center lg:justify-start">
              {data.hero.photo?.src && (
                <ProfileAvatar
                  src={data.hero.photo.src}
                  alt={data.hero.photo.alt || "Profile photo"}
                />
              )}
            </div>

            {/* Right: content */}
            <div className="text-center lg:text-left">
              {/* Single-line name */}
              <h1
                className="whitespace-nowrap text-zinc-100 font-bold tracking-tight
                           text-[clamp(28px,8vw,40px)]
                           sm:text-[clamp(32px,6.5vw,48px)]
                           md:text-[clamp(40px,5.8vw,56px)]
                           lg:text-[clamp(44px,4.8vw,64px)]
                           xl:text-[clamp(48px,4vw,72px)]"
              >
                {data.hero.name}
              </h1>

              {/* badges */}
              <div className="mt-3 mb-4 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <Badge>Strategy & Ops Professional</Badge>
                <Badge className="hidden sm:inline">IIMA MBA</Badge>
              </div>

              {/* tagline + subhead (keep only one copy) */}
              <p className="text-zinc-300 leading-relaxed max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base">
                {/*data.hero.title*/}
              </p>
              <p className="text-zinc-400 leading-relaxed max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mt-2 text-sm sm:text-base">
                {data.hero.subhead}
              </p>

              {/* Affiliation bar */}
              <AffiliationBar />

              {/* CTAs (single wrapper) */}
              <div className="mt-6 sm:mt-7 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                {data.hero.ctas.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className={
                      c.type === "primary"
                        ? "px-4 sm:px-5 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-sm font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                        : "px-4 sm:px-5 py-2 border border-zinc-700 text-zinc-100 rounded-xl text-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    }
                  >
                    <span className="[background:linear-gradient(currentColor,currentColor)_0_100%/0_1px_no-repeat] hover:[background-size:100%_1px] [transition:background-size_.2s_ease]">
                      {c.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* optional: desktop-only quick links */}
              {/* <div className="hidden lg:flex mt-6 gap-4 text-sm text-zinc-400">
                <a href="#work" className="underline underline-offset-4 hover:text-zinc-200">See recent projects -></a>
                <a href="#impact" className="underline underline-offset-4 hover:text-zinc-200">See impact -></a>
              </div> */}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ActionButtons({
  demoHref,
  prdHref,
}: {
  demoHref?: string;
  prdHref?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600";
  const ghost =
    "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";
  const primary =
    "bg-zinc-100 text-zinc-900 hover:bg-white";
  const links = [
    demoHref ? { href: demoHref, label: "View Demo" } : null,
    prdHref ? { href: prdHref, label: "Full PRD" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`${base} ${index === 0 ? primary : ghost}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}


// ---- Projects (Work) ----
function DefaultProjectContent({ project }: { project: Project }) {
  return (
    <Card>
      {project.cover?.src ? (
        <div className="group relative mb-3 h-40 overflow-hidden rounded-xl ring-1 ring-zinc-800/60">
          <Image
            src={project.cover.src}
            alt={project.cover.alt || `${project.title} cover`}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-zinc-100 font-medium">{project.title}</h3>
        {project.year ? (<span className="text-xs text-zinc-400">{project.year}</span>) : null}
      </div>
      {project.stack ? (<div className="text-xs text-zinc-400 mb-2">{project.stack}</div>) : null}
      {project.summary ? (<p className="text-sm text-zinc-300">{project.summary}</p>) : null}
      {project.metrics?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={metric} className="border-zinc-700/70 bg-zinc-950/60 text-zinc-300">{metric}</Badge>
          ))}
        </div>
      ) : null}
      <ActionButtons demoHref={project.demoLink} prdHref={project.prdLink} />
    </Card>
  );
}

function TeardownProjectContent({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const teardown = project.teardown;
  if (!teardown) return null;
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600";
  const primary = "bg-zinc-100 text-zinc-900 hover:bg-white";
  const ghost = "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";

  return (
    <Card>
      {project.cover?.src ? (
        <div className="group relative mb-3 h-40 overflow-hidden rounded-xl ring-1 ring-zinc-800/60">
          <Image
            src={project.cover.src}
            alt={project.cover.alt || `${project.title} cover`}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-zinc-100 font-medium">{project.title}</h3>
        {project.year ? (<span className="text-xs text-zinc-400">{project.year}</span>) : null}
      </div>
      {project.stack ? (<div className="text-xs text-zinc-400 mb-1">{project.stack}</div>) : null}
      <p className="text-sm text-zinc-300 leading-6">{teardown.description}</p>
      {project.metrics?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={metric} className="border-zinc-700/70 bg-zinc-950/60 text-zinc-300">{metric}</Badge>
          ))}
        </div>
      ) : null}
      {teardown.actions?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {teardown.actions.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className={`${base} ${index === 0 ? primary : ghost}`}
            >
              {action.label}
            </a>
          ))}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onOpen();
            }}
            className={`${base} ${ghost}`}
          >
            View Breakdown
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onOpen();
            }}
            className={`${base} ${ghost}`}
          >
            View Breakdown
          </button>
        </div>
      )}
    </Card>
  );
}


function StandardProjectModalContent({ project, onClose, modalRef, scrollTo }: { project: Project; onClose: () => void; modalRef: React.MutableRefObject<HTMLDivElement | null>; scrollTo: (id: string) => void; }) {
  const actions = [
    project.demoLink ? { href: project.demoLink, label: "View Demo" } : null,
    project.prdLink ? { href: project.prdLink, label: "Full PRD" } : null,
  ].filter(Boolean) as { href: string; label: string }[];
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600";
  const ghost =
    "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";
  const primary =
    "bg-zinc-100 text-zinc-900 hover:bg-white";
  const primaryScreenshot = project.screenshots?.[0];
  const secondaryScreenshot = project.screenshots?.[1];

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 overflow-y-auto overscroll-contain scroll-smooth"
      style={{ scrollbarGutter: "stable both-edges" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id="case-title" className="text-xl text-zinc-100 font-semibold">{project.title}</h3>
          <div className="text-sm text-zinc-400 mt-1">
            {project.year}
            {project.stack ? ` - ${project.stack}` : ""}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          {actions.length ? (
            <div className="flex flex-wrap justify-end gap-2">
              {actions.map((action, index) => (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${base} ${index === 0 ? primary : ghost}`}
                >
                  {action.label}
                </a>
              ))}
            </div>
          ) : null}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
            aria-label="Close"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-10 pt-2" data-sticky-nav>
        <div className="mx-auto flex items-center justify-center rounded-full border border-zinc-800 bg-black/80 backdrop-blur px-3 h-10">
          <nav className="flex items-center gap-4 text-[13px] text-zinc-300">
            <button onClick={() => scrollTo("p-summary")} className="hover:text-white">Summary</button>
            <button onClick={() => scrollTo("p-problem")} className="hover:text-white">Problem</button>
            <button onClick={() => scrollTo("p-approach")} className="hover:text-white">Action</button>
            <button onClick={() => scrollTo("p-outcome")} className="hover:text-white">Result</button>
            <button onClick={() => scrollTo("p-learnings")} className="hover:text-white">Learnings</button>
          </nav>
        </div>
      </div>

      <div id="p-summary" className="mt-4">
        {primaryScreenshot?.src ? (
          <div className="relative mb-3 overflow-hidden rounded-xl ring-1 ring-zinc-800/60" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={primaryScreenshot.src}
              alt={primaryScreenshot.alt ?? `${project.title} screenshot`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        ) : null}
        {project.summary ? <p className="text-zinc-300">{project.summary}</p> : null}
      </div>

      <div id="p-problem" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Problem</h4>
        {Array.isArray(project.problem) ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.problem.map((item, index) => (<li key={index}>{item}</li>))}
          </ul>
        ) : project.problem ? (
          <p className="text-sm text-zinc-300">{project.problem}</p>
        ) : null}
      </div>

      <div id="p-approach" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Action</h4>
        {secondaryScreenshot?.src ? (
          <div className="relative mb-3 overflow-hidden rounded-xl ring-1 ring-zinc-800/60" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={secondaryScreenshot.src}
              alt={secondaryScreenshot.alt ?? `${project.title} detail`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        ) : null}
        {project.approach ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.approach.map((step, index) => (<li key={index}>{step}</li>))}
          </ul>
        ) : null}
      </div>

      <div id="p-outcome" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Result</h4>
        {project.outcome ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.outcome.map((item, index) => (<li key={index}>{item}</li>))}
          </ul>
        ) : null}
      </div>

      <div id="p-learnings" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Learnings</h4>
        {Array.isArray(project.learnings) ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.learnings.map((lesson, index) => (<li key={index}>{lesson}</li>))}
          </ul>
        ) : project.learnings ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            <li>{project.learnings}</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}







function RetentionFlow({ stages = [], issues = [] }: { stages?: string[]; issues?: string[] }) {
  const defaultStages = [
    "Awareness",
    "Trial",
    "First Listen",
    "Credit Exhaustion",
    "Retention",
  ];

  const labels = stages.length >= 5
    ? stages.slice(0, 5)
    : defaultStages;

  const points = [
    { x: 70, y: 120 },
    { x: 260, y: 120 },
    { x: 500, y: 120 },
    { x: 760, y: 165 },
    { x: 950, y: 205 },
  ].map((pt, index) => ({ ...pt, label: labels[index] ?? defaultStages[index] }));

  const retentionIssues = issues.length ? issues : [
    "Credit gating",
    "Weak discovery",
    "Offline fails",
  ];

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="relative mx-auto h-[320px] w-full max-w-[1200px] rounded-2xl bg-neutral-900 p-6 ring-1 ring-white/10">
        <div className="mb-2 flex items-center justify-start text-sm text-neutral-300">
          <span className="font-medium tracking-wide">User Journey</span>
        </div>
        <svg className="h-[240px] w-full" viewBox="0 0 1020 260" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="rf-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.00" />
            </linearGradient>
            <filter id="rf-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="rf-blob" cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#a3e635" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.08" />
            </radialGradient>
            <filter id="rf-softBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <rect x="160" y="56" width="560" height="190" rx="95" fill="url(#rf-blob)" filter="url(#rf-softBlur)" />
          <path d="M 70 126 C 300 126, 460 126, 560 126 C 660 126, 700 146, 740 171 C 780 191, 820 204, 950 211" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="14" />
          <path d="M 70 120 C 300 120, 460 120, 560 120 C 660 120, 700 140, 740 165 C 780 185, 820 198, 950 205" fill="none" stroke="#a3a3a3" strokeWidth="8" strokeLinecap="round" />
          <path d="M 760 165 C 800 185, 840 198, 920 204" fill="none" stroke="#fb7185" strokeWidth="10" strokeLinecap="round" filter="url(#rf-glow)" />
          <g>
            <line x1={70} y1={120} x2={70} y2={210} stroke="#38bdf8" strokeWidth={4} strokeLinecap="round" />
            <polygon points="60,210 80,210 70,222" fill="#38bdf8" />
          </g>
          <g>
            <line x1={260} y1={120} x2={260} y2={210} stroke="#c084fc" strokeWidth={4} strokeLinecap="round" />
            <polygon points="250,210 270,210 260,222" fill="#c084fc" />
          </g>
          <text x={200} y={245} textAnchor="middle" className="fill-rose-400 text-[13px] font-semibold">
            Strong thanks to Amazon SSO and generous trials.
          </text>
          {points.map((pt, index) => (
            <g key={pt.label + index}>
              <circle cx={pt.x} cy={pt.y} r={10} fill="#e5e7eb" stroke="#0a0a0a" strokeWidth="2" />
              <text x={pt.x} y={pt.y - 20} textAnchor="middle" className="fill-white text-[12px] font-medium">
                {pt.label}
              </text>
            </g>
          ))}
          <g>
            <circle cx={760} cy={165} r={12} fill="#fecdd3" stroke="#9f1239" strokeWidth="2" />
            <line x1={760} y1={165} x2={760} y2={220} stroke="#ef4444" strokeWidth="4" />
            <polygon points="750,220 770,220 760,232" fill="#ef4444" />
            <text x={760} y={245} textAnchor="middle" className="fill-rose-400 text-[13px] font-semibold">
              Drop-off after first credit
            </text>
            <text x={760} y={261} textAnchor="middle" className="fill-rose-200 text-[12px]">
              Churn spikes right after the first credit when content should be easiest to find.
            </text>
            </g>
        </svg>
        <div className="pointer-events-none absolute right-6 bottom-6 -translate-y-[150px] w-[300px] rounded-xl bg-rose-500/15 p-4 text-sm text-rose-100 ring-1 ring-rose-300/30 shadow-2xl sm:right-10">
          <div className="absolute -left-2 top-10 h-4 w-4 rotate-45 bg-rose-500/15 ring-1 ring-rose-300/30" />
          <div className="mb-1 text-[11px] font-semibold tracking-wide text-rose-200">RETENTION ISSUES</div>
          <ul className="list-disc pl-5 leading-6">
            {retentionIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MarketShareRadial({ leader, competitors }: { leader: { label: string; value: number }; competitors: { label: string; value: number }[] }) {
  const segments = useMemo(() => {
    if (!leader) return [] as Array<{ label: string; value: number; color: string; textColor: string }>;
    const palette = [
      { bg: "#22c55e", text: "#bbf7d0" },
      { bg: "#38bdf8", text: "#bae6fd" },
      { bg: "#f97316", text: "#fed7aa" },
      { bg: "#c084fc", text: "#e9d5ff" },
      { bg: "#facc15", text: "#fef08a" },
    ];
    const data = [leader, ...(competitors ?? [])]
      .filter(Boolean)
      .map((segment) => ({
        label: segment.label,
        value: Math.max(0, segment.value ?? 0),
      }));
    return data.map((segment, index) => ({
      ...segment,
      color: palette[index % palette.length].bg,
      textColor: palette[index % palette.length].text,
    }));
  }, [leader, competitors]);

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  if (!total || !segments.length) {
    return (
      <div className="relative h-56 w-56 sm:h-60 sm:w-60">
        <div className="absolute inset-0 rounded-full border border-zinc-800/60 bg-zinc-900" />
        <div className="absolute inset-12 flex items-center justify-center rounded-full bg-black/70 text-xs text-zinc-400">
          No market data
        </div>
      </div>
    );
  }

  let cumulative = 0;
  const gradientStops: string[] = [];
  const labelRadius = 56;
  const pointerRadius = 47;
  const labeledSegments = segments.map((segment) => {
    const start = (cumulative / total) * 100;
    cumulative += segment.value;
    const end = (cumulative / total) * 100;
    gradientStops.push(segment.color + ' ' + start + '% ' + end + '%');
    const midpoint = (start + end) / 2;
    const angle = (midpoint / 100) * Math.PI * 2 - Math.PI / 2;
    const pointerX = 50 + Math.cos(angle) * pointerRadius;
    const pointerY = 50 + Math.sin(angle) * pointerRadius;
    const labelX = 50 + Math.cos(angle) * labelRadius;
    const labelY = 50 + Math.sin(angle) * labelRadius;
    const alignRight = labelX >= 50;
    return {
      ...segment,
      pointerX,
      pointerY,
      labelX,
      labelY,
      alignRight,
      translateX: alignRight ? '0%' : '-100%',
      justify: alignRight ? 'flex-start' : 'flex-end',
    };
  });

  const gradient = 'conic-gradient(' + gradientStops.join(', ') + ')';
  const leaderSegment = segments[0];

  return (
    <div className="relative mx-auto h-56 w-56 sm:h-60 sm:w-60">
      <div className="absolute inset-0 rounded-full border border-zinc-800/60 bg-zinc-900" />
      <div className="absolute inset-3 rounded-full" style={{ background: gradient }} />
      <div className="absolute inset-3 rounded-full border border-black/20" />
      <div className="absolute inset-12 flex flex-col items-center justify-center rounded-full bg-black/80 text-center">
        <div className="text-3xl font-semibold text-zinc-100">{Math.round(leaderSegment?.value ?? 0)}%</div>
        <div className="text-xs text-zinc-400">{leaderSegment?.label ?? 'Leader share'}</div>
      </div>{labeledSegments.map((segment) => (
        <React.Fragment key={segment.label}>
          <span
            className="absolute h-2 w-2 rounded-full border border-black/40"
            style={{
              left: segment.pointerX + '%',
              top: segment.pointerY + '%',
              backgroundColor: segment.color,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute min-w-[80px] text-xs font-medium text-zinc-100"
            style={{
              left: segment.labelX + '%',
              top: segment.labelY + '%',
              transform: 'translate(' + segment.translateX + ', -50%)',
              textAlign: segment.alignRight ? 'left' : 'right',
            }}
          >
            <div className="flex items-center gap-1" style={{ justifyContent: segment.justify }}>
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span>{segment.label}</span>
            </div>
            <div className="text-[11px] font-normal text-zinc-400">{Math.round(segment.value)}%</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}



function TeardownModalContent({ project, onClose, modalRef, scrollTo }: { project: Project; onClose: () => void; modalRef: React.MutableRefObject<HTMLDivElement | null>; scrollTo: (id: string) => void; }) {
  const teardown = project.teardown!;
  const navItems = teardown.nav ?? [
    { id: "td-overview", label: "Overview" },
    { id: "td-market", label: "Market" },
    { id: "td-ux", label: "UX" },
    { id: "td-growth", label: "Growth" },
    { id: "td-recs", label: "Recs" },
    { id: "td-next", label: "Next" },
  ];
  const baseCard = "rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4";
  const statCard = "group rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4 transition hover:border-emerald-400/60 hover:shadow-[0_0_32px_-16px_rgba(16,185,129,0.7)]";
  const phases = useMemo(() => teardown.uxJourney?.phases ?? [], [teardown]);
  const [activeStage, setActiveStage] = useState(phases[0]?.id ?? "");
  useEffect(() => {
    setActiveStage(phases[0]?.id ?? "");
  }, [project.id, phases]);
  const activePhase = useMemo(
    () => phases.find((phase) => phase.id === activeStage) ?? phases[0],
    [phases, activeStage]
  );
  const reviewSummary = teardown.uxJourney?.reviewSummary ?? [];
  const maxReview = reviewSummary.reduce((max, item) => Math.max(max, item.value), 0);
  const market = teardown.marketSnapshot;

  const recommendationAccent = (accent?: string) => {
    switch (accent) {
      case "emerald":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
      case "teal":
        return "border-teal-500/40 bg-teal-500/10 text-teal-200";
      case "violet":
        return "border-violet-500/40 bg-violet-500/10 text-violet-200";
      case "amber":
        return "border-amber-500/40 bg-amber-500/10 text-amber-200";
      default:
        return "border-zinc-700/70 bg-zinc-900/60 text-zinc-200";
    }
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:max-w-5xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 overflow-y-auto overscroll-contain scroll-smooth"
      style={{ scrollbarGutter: "stable both-edges" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 id="case-title" className="text-2xl font-semibold text-zinc-50 leading-8">{teardown.heading}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
            {project.year ? <span>{project.year}</span> : null}
            {project.stack ? <span>&bull; {project.stack}</span> : null}
            {teardown.subheading ? <span>&bull; {teardown.subheading}</span> : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {teardown.actions?.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600 ${index === 0 ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'border border-zinc-700 text-zinc-100 hover:bg-zinc-900'}`}

            >
              {action.label}
            </a>
          ))}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
            aria-label="Close"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-20 mt-6" data-sticky-nav>
        <div className="flex flex-wrap items-center gap-3 rounded-full border border-zinc-800 bg-black/80 backdrop-blur px-4 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[13px] text-zinc-300 hover:text-white focus:text-white focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section id="td-overview" className="mt-8 space-y-6">
        <p className="text-sm text-zinc-300 leading-6">{teardown.description}</p>
        {teardown.stats?.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {teardown.stats.map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className={statCard}>
                <div className="text-2xl font-semibold text-zinc-50">{stat.value}</div>
                <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        ) : null}



        




{teardown.leakMap ? (
  <div className="space-y-4">
    <RetentionFlow stages={teardown.leakMap.stages} issues={teardown.leakMap.issues} />
  </div>
) : null}










        {teardown.execSummary ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-emerald-300 mb-2">Strengths</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.strengths.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-rose-300 mb-2">Weaknesses</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.weaknesses.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-emerald-300 mb-2">Opportunities</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.opportunities.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-rose-300 mb-2">Threats</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.threats.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        ) : null}
        {teardown.keyPainPoints?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-rose-300 mb-2">Key pain points</h4>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              {teardown.keyPainPoints.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ) : null}
      </section>

      <section id="td-market" className="mt-10 space-y-6">
        {market ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
            <div className="flex items-center justify-center">
              <MarketShareRadial leader={market.leader} competitors={market.competitors} />
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-zinc-200 mb-2">Market snapshot</h4>
              <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
                {market.bullets.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        ) : null}
        {teardown.growth?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">Distribution levers</h4>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              {teardown.growth.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ) : null}
      </section>

      <section id="td-ux" className="mt-10 space-y-6">
        {phases.length ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setActiveStage(phase.id)}
                  className={`rounded-full border px-3 py-1 text-xs sm:text-sm transition ${activeStage === phase.id ? 'border-zinc-100 text-zinc-50 bg-zinc-900' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}
                >
                  {phase.title}
                </button>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,220px)_1fr]">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3">
                {activePhase?.screenshot?.src ? (
                  <div className="relative h-44 w-full overflow-hidden rounded-xl">
                    <Image
                      src={activePhase.screenshot.src}
                      alt={activePhase.screenshot.alt ?? `${activePhase.title} stage`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 220px, 100vw"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[120px] items-center justify-center text-xs text-zinc-400">
                    <span>Add a journey screenshot</span>
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {activePhase?.annotations.map((note) => (
                  <li
                    key={note.text}
                    className={`rounded-xl border px-3 py-2 text-sm ${note.tone === 'positive' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100' : 'border-rose-500/40 bg-rose-500/10 text-rose-100'}`}
                  >
                    {note.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {reviewSummary.length ? (
          <div className={baseCard}>
            <div className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
              {teardown.uxJourney?.sourceLabel ?? "Review insights"}
            </div>
            <div className="mt-3 space-y-3">
              {reviewSummary.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{item.label}</span>
                    <span className="text-zinc-200">{item.value}%</span>
                  </div>
                  <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`absolute inset-y-0 left-0 ${item.tone === 'negative' ? 'bg-rose-500/70' : 'bg-emerald-500/70'}`}
                      style={{ width: `${maxReview ? Math.max(10, Math.round((item.value / maxReview) * 100)) : 0}%` }}
                    />
                  </div>
                  {item.note ? <div className="mt-1 text-xs text-zinc-500">{item.note}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section id="td-growth" className="mt-10 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {teardown.working?.length ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
              <div className="text-sm font-semibold text-emerald-200 mb-2">What is working</div>
              <ul className="text-sm text-emerald-50/90 space-y-1 list-disc list-inside">
                {teardown.working.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          ) : null}
          {teardown.breaking?.length ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4">
              <div className="text-sm font-semibold text-rose-100 mb-2">Where it breaks</div>
              <ul className="text-sm text-rose-50/90 space-y-1 list-disc list-inside">
                {teardown.breaking.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          ) : null}
        </div>
        {teardown.growthSummary ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">{teardown.growthSummary.headline}</h4>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300 mb-3">
              {teardown.growthSummary.tiles.map((tile) => (
                <span key={tile} className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1">{tile}</span>
              ))}
            </div>
            <div className="relative mt-2 h-20 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 p-4 text-sm text-zinc-300">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,transparent_0%,transparent_40%,rgba(34,197,94,0.25)_40%,rgba(34,197,94,0.25)_70%,transparent_70%)]" aria-hidden />
              <p className="relative">{teardown.growthSummary.retentionNote}</p>
            </div>
          </div>
        ) : null}
      </section>

      <section id="td-recs" className="mt-10 space-y-6">
        {teardown.recommendationSets?.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {teardown.recommendationSets.map((set) => (
              <div key={set.id} className={`rounded-2xl border p-4 space-y-3 ${recommendationAccent(set.accent)}`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>{set.icon}</span>
                  <span>{set.title}</span>
                </div>
                <ul className="text-sm text-zinc-200 space-y-1 list-disc list-inside">
                  {set.bullets.map((item) => (<li key={item}>{item}</li>))}
                </ul>
                <div className="text-xs text-zinc-100/80">{set.metric}</div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section id="td-next" className="mt-10 space-y-6">
        {teardown.conclusion ? (
          <div className={baseCard}>
            <div className="text-sm font-semibold text-zinc-200 mb-2">{teardown.conclusion.headline}</div>
            <blockquote className="border-l-2 border-zinc-600 pl-3 text-lg text-zinc-100 leading-7">
              {teardown.conclusion.quote}
            </blockquote>
          </div>
        ) : null}
        {teardown.nextActionsDetailed?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">What I&apos;d do next</h4>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              {teardown.nextActionsDetailed.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ) : null}
        {teardown.visuals?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">Visuals to drop in</h4>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
              {teardown.visuals.map((asset) => (
                <span key={asset.label} className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1">
                  {asset.label}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {teardown.explore?.length ? (
          <div className="flex flex-wrap gap-2">
            {teardown.explore.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600 ${index === 0 ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'border border-zinc-700 text-zinc-100 hover:bg-zinc-900'}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Projects() {
  const [savedScrollY, setSavedScrollY] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-modal-open", "1");
    } else {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-modal-open");
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  // Push a history state so phone Back closes the modal instead of exiting
  useEffect(() => {
    if (!active) return;
    const handlePop = () => {
      setActiveId(null);
      window.scrollTo(0, savedScrollY);
    };
    const state = { ...(history.state || {}), modal: true };
    history.pushState(state, "");
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [active, savedScrollY]);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const scrollInModal = (targetId: string) => {
  const el = modalRef.current?.querySelector<HTMLElement>(`#${targetId}`);
  if (!el || !modalRef.current) return;
  const sticky = modalRef.current.querySelector<HTMLElement>('[data-sticky-nav]');
  const stickyHeader = sticky ? sticky.getBoundingClientRect().height + 16 : 64;
  const top = el.offsetTop - stickyHeader;
  modalRef.current.scrollTo({ top, behavior: "smooth" });
};
  // After: const modalRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  if (active) {
    // wait for DOM paint, then reset
    requestAnimationFrame(() => {
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
        modalRef.current.focus();
      }
    });
  }
}, [active]); // or [activeId] if you prefer
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!active) return;
      if (e.key === "Escape") { history.back(); }
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
    <Section id="work" title="Recent Projects" >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const openProject = () => {
            setSavedScrollY(window.scrollY);
            setActiveId(project.id);
          };

          return (
            <Reveal key={project.id} delay={index * 60}>
              <div
                role="button"
                tabIndex={0}
                onClick={openProject}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject();
                  }
                }}
                className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl cursor-pointer"
                aria-haspopup="dialog"
                aria-expanded={activeId === project.id}
              >
                {project.teardown ? (
                  <TeardownProjectContent project={project} onOpen={openProject} />
                ) : (
                  <DefaultProjectContent project={project} />
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {active && (
        <Portal>
          <div
            className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) { history.back(); }
            }}
          >
            {active.teardown ? (
              <TeardownModalContent
                project={active}
                onClose={() => { history.back(); }}
                modalRef={modalRef}
                scrollTo={scrollInModal}
              />
            ) : (
              <StandardProjectModalContent
                project={active}
                onClose={() => { history.back(); }}
                modalRef={modalRef}
                scrollTo={scrollInModal}
              />
            )}
          </div>
        </Portal>
      )}

    </Section>
  );
}

// ---- Impact (Premium: 6 items + modal) ----
function Impact() {
  const [savedScrollY, setSavedScrollY] = useState(0);
  const impacts: ImpactItem[] = [
    {
      id: "eoffice-2023",
      title: "e-Office rollout (2023)",
      subtitle: "Paperless HQ, -90 % TAT",
      problem: [
        "Paper files (â‰ˆ 200/day) trapped officers at desks and buried approvals.",
      ],
      action: [
        "Championed e-Office SaaS",
        "Upgraded legacy PCs/network, wrote SOPs, trained staff, steered multi-stakeholder change.",
      ],
      outcome: [
        "Admin SLA -90 % and paper eliminated within 14 weeks",
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
        "Manual profiling of high-impact entities drained analyst hours and missed signals.",
      ],
      action: [
        "Coded a Python + NLP classifier with nightly AWS crawlers; tuned keywords for local threats.",
      ],
      outcome: [
        "Analyst cycle-time -85 %, freeing > 1 FTE/day",
      ],
      learnings: [
        "Cultivated the small-automation, big-impact mindset.",
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
        "Inventory turns x2",
        "Sales +20 % (Rs11 L / month)",
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
        "Client's draft blueprint called for dozens of badge readers and turnstiles",
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
  const active = impacts.find((i) => i.id === activeId) ?? null;

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    if (active) {
      document.body.setAttribute("data-modal-open", "1");
    } else {
      document.body.removeAttribute("data-modal-open");
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  // Push a history state so phone Back closes the modal instead of exiting
  useEffect(() => {
    if (!active) return;
    const handlePop = () => {
      setActiveId(null);
      window.scrollTo(0, savedScrollY);
    };
    const state = { ...(history.state || {}), modal: true };
    history.pushState(state, "");
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [active, savedScrollY]);

  const modalRef = useRef<HTMLDivElement | null>(null);
  // right after: const modalRef = useRef<HTMLDivElement | null>(null);
const scrollInModal = (targetId: string) => {
  const el = modalRef.current?.querySelector<HTMLElement>(`#${targetId}`);
  if (!el || !modalRef.current) return;
  const sticky = modalRef.current.querySelector<HTMLElement>('[data-sticky-nav]');
  const stickyHeader = sticky ? sticky.getBoundingClientRect().height + 16 : 64;
  modalRef.current.scrollTo({ top: el.offsetTop - stickyHeader, behavior: "smooth" });
};

  // After: const modalRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  if (active) {
    // wait for DOM paint, then reset
    requestAnimationFrame(() => {
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
        modalRef.current.focus();
      }
    });
  }
}, [active]); // or [activeId] if you prefer
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!active) return;
      if (e.key === "Escape") { history.back(); }
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
            <div
              role="button"
              tabIndex={0}
              onClick={() => { setSavedScrollY(window.scrollY); setActiveId(it.id); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSavedScrollY(window.scrollY);
                  setActiveId(it.id);
                }
              }}
              className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl cursor-pointer"
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
            </div>
          </Reveal>
        ))}
      </div>

      {active && (
  <Portal>
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="impact-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) { history.back(); }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 overflow-y-auto overscroll-contain scroll-smooth"
        style={{ scrollbarGutter: "stable both-edges" }}
      >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="impact-title" className="text-xl text-zinc-100 font-semibold">{active.title}</h3>
          {active.subtitle && (
            <div className="text-sm text-zinc-400 mt-1">{active.subtitle}</div>
          )}
        </div>
        <button
          onClick={() => { history.back(); }}
          className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
          aria-label="Close"
        >âœ•</button>
      </div>

      <div className="sticky top-0 z-10 pt-2" data-sticky-nav>
        <div className="mx-auto flex items-center justify-center rounded-full border border-zinc-800 bg-black/80 backdrop-blur px-3 h-10">
          <nav className="flex items-center gap-4 text-[13px] text-zinc-300">
            <button onClick={() => scrollInModal("i-problem")}   className="hover:text-white">Problem</button>
            <button onClick={() => scrollInModal("i-action")}    className="hover:text-white">Action</button>
            <button onClick={() => scrollInModal("i-result")}    className="hover:text-white">Result</button>
            <button onClick={() => scrollInModal("i-learnings")} className="hover:text-white">Learnings</button>
          </nav>
        </div>
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
  </Portal>
)}

          
    </Section>
  );
}

// ---- Timeline (horizontal, hover + keyboard, pop-forward) ----
function Timeline() {
  const items = [
  { key: "zs",   label: "ZS",   year: "2016", details: "Analytics & consulting foundation; ops + data basics." },
{ key: "mha",  label: "MHA",  year: "2018", details: "Blending tech with risk ops for smarter decisions." },
{ key: "cisf", label: "CISF", year: "2020", details: "Orchestrating people, tech and security under one roof." },
{ key: "iima", label: "IIMA", year: "2024", details: "Strategy & ops deep dive; honed change-management & commercial lens" },
{ key: "kec",  label: "KEC",  year: "2025", details: "Ongoing..." },
  ];
  const [hover, setHover] = useState<string | null>(null);

  // Keep tooltip inside viewport while arrow stays over the circle
  function TooltipBox({
    id,
    label,
    year,
    details,
    active,
  }: {
    id: string;
    label: string;
    year: string;
    details: string;
    active: boolean;
  }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [shift, setShift] = useState(0);

    useEffect(() => {
      if (!active) { setShift(0); return; }
      const pad = 12; // padding from viewport edge
      const recalc = () => {
        const el = ref.current;
        if (!el) return;
        // reset to centered, then measure overflow and compute correction
        el.style.transform = 'translateX(-50%)';
        const rect = el.getBoundingClientRect();
        const vw = window.innerWidth;
        let delta = 0;
        if (rect.left < pad) delta = pad - rect.left; // move right
        else if (rect.right > vw - pad) delta = (vw - pad) - rect.right; // move left
        setShift(delta);
      };
      recalc();
      window.addEventListener('resize', recalc);
      return () => window.removeEventListener('resize', recalc);
    }, [active]);

    if (!active) return null;
    return (
      <div
        id={id}
        role="tooltip"
        ref={ref}
        className="absolute z-20 w-56 max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl animate-[fadeIn_.15s_ease-out]"
        style={{
          left: '50%',
          bottom: 'calc(100% + 10px)',
          transform: `translateX(calc(-50% + ${shift}px))`,
        }}
      >
        <div className="text-zinc-100 text-sm font-medium">{label} . {year}</div>
        <div className="text-zinc-400 text-xs mt-1 leading-relaxed">{details}</div>
        <div
          className="absolute -bottom-2 w-3 h-3 rotate-45 bg-zinc-950 border-r border-b border-zinc-800"
          style={{ left: `calc(50% - ${shift}px)` }}
        />
      </div>
    );
  }

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
                  {false && (
  <div
    id={tooltipId}
    role="tooltip"
    className="absolute z-20 w-56 max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl animate-[fadeIn_.15s_ease-out]"
    style={{
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 'calc(100% + 10px)',
    }}
  >
    <div className="text-zinc-100 text-sm font-medium">{it.label} . {it.year}</div>
    <div className="text-zinc-400 text-xs mt-1 leading-relaxed">{it.details}</div>

    {/* arrow - centers normally; snaps near the dot at edges */}
    <div
      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-zinc-950 border-r border-b border-zinc-800"
    />
  </div>
)}
                  <TooltipBox
                    id={tooltipId}
                    label={it.label}
                    year={it.year}
                    details={it.details}
                    active={active}
                  />
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
        <section id="timeline" className="scroll-mt-24">
  <h2 className="text-xl font-semibold tracking-tight text-zinc-100">Career timeline</h2>
  {/* existing <Timeline /> or the items markup goes here */}
  <div className="mt-6">
    <Timeline />
  </div>
</section>
      <section>
  <Reveal>
    {/* ...your previous content inside the section... */}

    {/* Text block (centered within section width) */}
    <div className="mt-12 max-w-3xl mx-auto space-y-6">
      <p className="text-zinc-300 leading-relaxed text-justify">
        Every day, I connect the dots: bridging teams, streamlining workflows, and translating analytics into smarter operations.
      </p>

      <p className="text-zinc-300 leading-relaxed text-justify">
        From laying the analytics foundation at ZS to integrating solutions across operations, I&apos;ve learned one truth: clarity, collaboration, and tech are what make execution thrive.
        <br />
        Now, I help cut through uncertainty so we can move faster, smarter and build a future rooted in confident, clear execution.
      </p>
    </div>
  </Reveal>
</section>
        
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
          <p className="text-zinc-300">Articles list (title, date, tags)  article page.</p>
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
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                if (!form.checkValidity()) {
                  form.reportValidity(); // show native error bubbles
                  return;
                }
                alert("Thanks! I will get back to you.");
                form.reset();
              }}
            >
              <div>
                <label className="block text-sm text-zinc-300 mb-1" htmlFor="ct-name">Name</label>
                <input
                  id="ct-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-300 mb-1" htmlFor="ct-email">Email</label>
                <input
                  id="ct-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-300 mb-1" htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message"
                  name="message"
                  required
                  minLength={10}
                  rows={4}
                  placeholder="How can I help?"
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-zinc-100 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
              >
                Send
              </button>
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
        <div>(c) {new Date().getFullYear()} Bharat Kaushik</div>
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
      <div className="bg-[#0b0b0b] min-h-screen text-[#E0E0E0] scroll-smooth overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main className="pt-10">
        <Hero />
        <Projects />
         <Skills />          {/* new */}
        <Certifications />  {/* new */}
        <Impact />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}











