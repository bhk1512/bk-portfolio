import type { Project } from "../(types)/project";

export const projects: Project[] = [
    {
      id: "defence-expo-pmo",
      title: "Defence Expo PMO (2022)",
      year: "2022",
      stack: "8 workstreams | Multi-agency | Zero-failure delivery",
      summary:
        "Directed 8 workstreams and ran a tight governance cadence (RAID logs, daily standups, escalations) to deliver a zero-incident event for 250k+ visitors and 75+ foreign delegations under a 20-day deadline.",
      cardSummary:
        "Ran 8 workstreams and multi-agency governance to deliver a zero-incident event at national scale.",
      proof: "250k+ visitors | 75+ delegations | 100% SLA / zero incidents",
      context:
        "Context: Multi-agency program with a fixed date, public scrutiny, and zero-failure tolerance.",
      metrics: [
        "8 workstreams",
        "600+ personnel coordination",
        "100% SLA / zero incidents",
      ],
      actions: [
        { label: "Open Case Study", kind: "modal" },
        { label: "How We Ran It", kind: "modal", scrollTo: "p-approach" },
      ],
      flagship: true,
      flagshipLabel: "",
      archetype: "Execution at Scale",
      problem: [
        "India's largest defence exhibition: 250K+ visitors and 75+ international " +
          "delegations across 5 days. Zero-failure tolerance, nationally visible.",
        "20-day build window to design and deploy full security and logistics " +
          "architecture from scratch, leading 600+ personnel across 6 agencies.",
        "No existing operational playbook. The scale, profile, and multi-agency " +
          "complexity made this a first-of-kind program for the unit.",
        "Public-day surge risk: projected attendance could exceed planned capacity, " +
          "requiring contingency architecture to be pre-built and deployable fast.",
      ],
      approach: [
        "Structured the program into 8 workstreams: access control, perimeter " +
          "security, VIP and delegation protocol, logistics, communications, CCTV " +
          "operations, contingency planning, and media coordination.",
        "Integrated 2,000+ CCTV feeds into a single multi-agency control room, " +
          "giving real-time situational awareness to CISF, police, intelligence, " +
          "and event management teams simultaneously.",
        "Ran daily standup cadence with all 6 agency leads and weekly RAID-log " +
          "reviews. Any blocker unresolved for 24 hours was escalated same day.",
        "When public-day attendance surged beyond planned capacity, restructured " +
          "the entire access and crowd-flow architecture within 12 hours, " +
          "redeploying personnel, adjusting entry sequencing, and reorienting the " +
          "control room to the revised model without event disruption.",
        "Coordinated movement and protocol for 75+ international delegations, " +
          "including heads of state-adjacent delegations. Zero protocol breaches.",
        "Managed parallel escalation tracks: operational decisions stayed at " +
          "field level; strategic conflicts and inter-agency disputes escalated " +
          "to principals within the same working day.",
      ],
      outcome: [
        "100% SLA across all 8 workstreams. Zero incidents across the full event. " +
          "No security breach, no protocol failure, no SLA miss.",
        "Public-day surge absorbed: architecture redesign executed and fully " +
          "redeployed within 12 hours, with no service interruption.",
        "250K+ visitors and 75+ international delegations processed without a " +
          "single reportable incident.",
        "Recommended for Director General's Commendation Roll, the unit's " +
          "highest program leadership recognition.",
      ],
      learnings: [
        "RAID-log governance under hard deadlines: keeping 8 workstreams on the " +
          "critical path requires structured escalation, not just daily check-ins.",
        "Contingency architecture is a first-order deliverable, not an afterthought. " +
          "The 12-hour surge response was only possible because the fallback " +
          "model had been pre-designed.",
        "Cross-agency alignment requires both formal governance (standups, RAID) " +
          "and interpersonal diplomacy. Neither alone works at this scale.",
        "Operational flexibility under a fixed, public deadline is a distinct " +
          "skill from project management. Decisions have no room for iteration.",
      ],
    },
    {
      id: "defence-expo-selected",
      title: "Defence Expo PMO (2022)",
      year: "2022",
      stack: "Multi-agency · 8 Workstreams · Zero-failure delivery",
      summary:
        "Directed PMO for India's largest defence exhibition. 600+ personnel, " +
        "6 agencies, 250K+ visitors, 75+ international delegations. " +
        "Restructured operational architecture within 12 hours for public-day " +
        "surge. Zero incidents. Zero SLA breaches.",
      cardSummary:
        "Multi-agency PMO at national scale. 600+ personnel, zero incidents, " +
        "DG Commendation Roll.",
      proof: "250K+ visitors | 75+ delegations | 100% SLA",
      context:
        "Context: Fixed date, public scrutiny, and zero-failure tolerance across " +
        "a 20-day build window with no prior template.",
      metrics: [
        "8 workstreams coordinated",
        "600+ personnel across 6 agencies",
        "100% SLA / zero incidents",
      ],
      actions: [
        { label: "Open Case Study", kind: "modal" },
      ],
      flagship: false,
      archetype: "Program Execution",
      problem: [
        "250K+ visitors, 75+ foreign delegations, zero-failure tolerance.",
        "20 days to design and deploy security + logistics architecture " +
          "while leading 600+ personnel across 6 agencies.",
        "No existing playbook. The operational model had to be built from scratch.",
      ],
      approach: [
        "Directed 8 workstreams (access control, perimeter, protocol, logistics, " +
          "VIP movement, communications, contingency, and media management).",
        "Integrated 2,000+ CCTV streams into a unified multi-agency control room " +
          "for real-time situational awareness.",
        "Ran daily standups and RAID-log reviews with 6-agency stakeholders, " +
          "surfacing blockers within 24 hours of identification.",
        "Restructured the entire public-day operational architecture within " +
          "12 hours when projected visitor surge exceeded planned capacity.",
        "Coordinated VIP and international delegation movement across 75+ delegations " +
          "with zero protocol incidents.",
      ],
      outcome: [
        "100% SLA across all 8 workstreams. Zero incidents across the full event.",
        "Public-day surge absorbed without service disruption. Architecture " +
          "redesign executed and redeployed within 12 hours.",
        "Recommended for Director General's Commendation Roll.",
      ],
      learnings: [
        "RAID-log governance is the difference between controlled escalation " +
          "and firefighting at scale.",
        "Operational flexibility under a fixed deadline requires pre-built " +
          "contingency architecture, not reactive workarounds.",
        "Cross-agency alignment needs both formal governance and interpersonal " +
          "diplomacy. Neither alone is sufficient.",
      ],
    },
    {
      id: "industry-digest",
      title: "Industry Digest",
      year: "2025",
      stack: "n8n | SQL | REST API | Automation",
      metrics: [
        "Automated crawl (30+ sources)",
        "Wins / Setbacks / Moves / Macro",
        "Monday 09:00 email digest",
      ],
      summary:
        "A weekly decision-support digest that categorises EPC wins, setbacks, strategy moves, and macro shifts -- delivered as a Monday 9 AM email in under 10 minutes.",
      cardSummary:
        "Weekly Monday 9 AM digest that converts 30+ sources into EPC wins, setbacks, moves & macro signals.",
      proof: "3 hrs -> <10 min weekly | 30+ sources | weekly cadence",
      context:
        "Context: Personal prototype to test whether decision makers prefer email-first signals over dashboards.",
      cover: { src: "/images/Industry Digest/industry-digest-banner.png", alt: "Industry Digest" },
      screenshots: [
        { src: "/images/Industry Digest/industry-digest-workflow.png", alt: "Industry Digest" },
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
        "Shared selectively as a briefing aid.",
      ],
      learnings: [
        "Scheduling workflows without babysitting.",
        "Run frequency vs cloud costs: balancing speed with budget.",
      ],
      actions: [
        { label: "Open Case Study", kind: "modal" },
        { label: "PRD", href: "/PRDs/Product Requirements Document - Industry Digest.pdf", kind: "link" },
      ],
      prdLink: "/PRDs/Product Requirements Document - Industry Digest.pdf",
      flagship: true,
      flagshipLabel: "",
      archetype: "Decision Support",
    },
    {
      id: "bg-surety-risk-control",
      title: "BG & Surety Risk Control System",
      year: "2025",
      stack: "Power BI | Risk tracking | Alerts | Standardisation",
      summary:
        "Designed an end-to-end risk visibility and governance system for guarantees/sureties -- standardised tracking, surfaced exposure/expiry risks, and enabled proactive alerts for better cash-flow risk preparedness.",
      cardSummary:
        "Standardised exposure and expiry tracking for guarantees/sureties, with dashboards and proactive alerts to reduce financial blind spots.",
      archetype: "Governance",
      context:
        "Context: Risk was distributed across files/owners; leadership needed one view of exposure and upcoming expiries.",
      cover: { src: "/images/BG & Surety Risk Control System/BG Dashboard - Masked.png", alt: "BG & Surety Risk Control System" },
      metrics: ["Exposure + expiry tracking", "Expiry buckets & alerts", "Leadership risk view"],
      actions: [
        { label: "Open Case Study", kind: "modal" },
        { label: "See Approach", kind: "modal", scrollTo: "p-approach" },
        { label: "Masked Screens", kind: "modal", scrollTo: "p-masked" },
      ],
      problem: [
        "Exposure and expiry data lived across fragmented files and inconsistent formats.",
        "Upcoming expiries were tracked reactively, increasing operational and cash-flow risk.",
        "Leaders lacked a single source of truth for risk posture and prioritisation.",
      ],
      approach: [
        "Standardised the data model (types, expiry buckets, owners, projects) to enforce consistency.",
        "Built a leadership dashboard that surfaces exposure, expiries by bucket, and key drivers.",
        "Embedded proactive alerting logic for approaching expiries and exceptions (missing fields/invalid entries).",
        "Defined clear ownership and a light SOP to keep data reliable over time.",
      ],
      outcome: [
        "Improved financial visibility and risk preparedness via proactive tracking.",
        "Reduced reliance on manual follow-ups for expiry monitoring.",
        "Created a repeatable governance layer that stays usable as volume grows.",
      ],
      learnings: [
        "Risk control systems need owners and cadence as much as dashboards.",
        "Expiry buckets and exception handling create real actionability.",
        "Standardisation beats complexity, especially when multiple stakeholders contribute data.",
      ],
      maskedScreens: {
        title: "Masked Screens (Representative)",
        note: "Screens are masked to protect confidentiality; structure and logic are representative.",
        items: [
          {
            src: "/images/BG & Surety Risk Control System/BG Dashboard - Masked.png",
            alt: "BG & Surety risk dashboard (masked)",
            callouts: ["Exposure by category and owner", "Expiry buckets with alert flags", "Top risk drivers and exceptions"],
          },
        ],
      },
    },
    {
      id: "audible-product-teardown",
      title: "Audible Product Teardown",
      year: "2025",
      stack: "Product Strategy",
      summary:
        "Deep dive into Audible's product experience, retention mechanics, and growth plays backed by 30K+ review signals.",
      cover: { src: "/images/Audible/Audible.png", alt: "Audible product teardown" },
      metrics: ["60% global share", "30K+ reviews analyzed", "SWOT + JTBD lens"],
      archetype: "Product & Strategy",
      teardown: {
        badge: "Product Teardown",
        heading: "Audible Product Teardown",
        subheading: "Strategic Analysis • Growth",
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
          { label: "Download Report", href: "/Product Teardowns/Audible Product Teardowm Report.pdf" },
        ],
        nav: [
          { id: "td-overview", label: "Overview" },
          { id: "td-market", label: "Market" },
          { id: "td-ux", label: "UX" },
          { id: "td-growth", label: "Growth" },
          { id: "td-recs", label: "Recommendations" },
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
              screenshot: { src: "/images/Audible/onboarding.png", alt: "Audible onboarding flow" },
              annotations: [
                { tone: "positive", text: "Amazon login plus free trial equals a 60-second start." },
                { tone: "positive", text: "Value prop is clear with Originals and deals up front." },
                { tone: "negative", text: "No preview of included titles before entering the credit flow." },
              ],
            },
            {
              id: "ux-discovery",
              title: "Discovery",
              screenshot: { src: "/images/Audible/discovery.png", alt: "Audible discovery experience" },
              annotations: [
                { tone: "negative", text: "Filters for Included / Free / Language are hidden three taps deep." },
                { tone: "negative", text: "Recommendations repeat the last purchase instead of widening the catalog." },
                { tone: "positive", text: "Editorial collections (Editors' Picks) land well when surfaced." },
              ],
            },
            {
              id: "ux-listening",
              title: "Listening",
              screenshot: { src: "/images/Audible/listening.png", alt: "Audible listening controls" },
              annotations: [
                { tone: "positive", text: "Whispersync and speed controls feel polished." },
                { tone: "negative", text: "Offline downloads fail silently; users lose spot mid-commute." },
              ],
            },
            {
              id: "ux-retention",
              title: "Retention",
              screenshot: { src: "/images/Audible/retention.png", alt: "Audible retention touchpoints" },
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
        recommendationSets: [
          {
            id: "discovery",
            title: "Fix Discovery & Retention",
            icon: "\uD83D\uDD0D",
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
            icon: "\uD83D\uDCB3",
            accent: "amber",
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
            icon: "\u2699\uFE0F",
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
          { label: "Download Detailed PDF Report", href: "/Product Teardowns/Audible Product Teardown Report.pdf" },
        ],
      },
    },
    // 1) AI-Powered Risk Radar
    {
      id: "ai-risk-radar",
      title: "AI Powered Risk Radar",
      year: "2025",
      stack: "Looker Studio | n8n",
      summary:
        "Real-time dashboard that ingests global news, classifies disruption events, and scores severity on a 0-10 index; visualized on an interactive world map with trends and filters.",
      cover: { src: "/images/Risk Radar/risk-radar-outer.png", alt: "Risk Radar dashboard (Looker Studio)" },
      metrics: ["Real time map", "Ranked disruptions", "Trend lines & filters"],
      roleTools: "PM/Builder - NewsAPI, n8n, Google Sheets, Gemini, Looker Studio",
      archetype: "Decision Systems",
      screenshots: [
        { src: "/images/Risk Radar/risk-radar-inner.png", alt: "Dashboard overview" },
        { src: "/images/Risk Radar/risk-radar-workflow.png", alt: "n8n pipeline" },
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
    // 3) Content"???to"???Insights Pipeline
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
      archetype: "Decision Systems",
      cover: { src: "/images/Content-to-insights/content-to-insights-card-cover.png", alt: "Content to Insights - card cover" },
      screenshots: [
        { src: "/images/Content-to-insights/content-to-insights-workflow.png", alt: "Content to Insights - card cover" },
        //{ src: "/images/content-to-insights-workflow.png", alt: "Content"???to"???Insights - workflow" },
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
    {
      id: "ib-nlp-intelligence",
      title: "NLP Triage Engine & Field Intelligence",
      year: "2019–2020",
      stack: "Python · NLP · Random Forest · AWS",
      summary:
        "Built and deployed an NLP classification pipeline from scratch to " +
        "auto-prioritise high-signal entities from open-source data. No prior " +
        "infrastructure, no team, no playbook. Reduced analyst processing time " +
        "by ~85%. Separately deployed as field intelligence advisor during " +
        "COVID-19 to a remote tribal district: mapped supply chain failures, " +
        "designed a zone-based delivery model, and kept essential supply " +
        "uninterrupted for 90+ days with no failures.",
      cardSummary:
        "0→1 NLP pipeline cutting analyst time 85% + field deployment keeping " +
        "essential supply uninterrupted for 90 days in a remote district.",
      proof: "~85% analyst time saved | 90+ days zero supply failure | built solo",
      context:
        "Context: Organisation and domain details withheld. Scope, approach, " +
        "and outcomes are real. Both workstreams were self-initiated with no " +
        "prior template.",
      metrics: [
        "NLP pipeline: ~85% cycle-time reduction",
        "COVID deployment: 90+ days, zero failures",
        "Both built independently, no prior infrastructure",
      ],
      actions: [
        { label: "Open Case Study", kind: "modal" },
      ],
      flagship: false,
      archetype: "Decision Systems",
      problem: [
        "Manual profiling of high-impact entities from open-source data was " +
          "draining analyst hours and missing early signals. No automated " +
          "triage existed.",
        "During COVID-19 lockdown, a remote tribal district faced supply chain " +
          "collapse: no visibility into blockages, no delivery model, and no " +
          "coordination mechanism across agencies.",
      ],
      approach: [
        "Designed and built an NLP classification pipeline (Python, Random " +
          "Forest) with nightly AWS crawlers to ingest, score, and prioritise " +
          "entities from open-source data. Entirely self-initiated and " +
          "self-built.",
        "Tuned keyword and classification logic for domain-specific threat " +
          "signals; balanced precision vs. speed given the sensitivity of outputs.",
        "For the COVID deployment: mapped district-level supply chain blockages " +
          "end-to-end, identified failure nodes, and designed a zone-based " +
          "delivery model.",
        "Coordinated logistics across multiple agencies with no formal authority. " +
          "Alignment achieved through daily briefings and shared tracking.",
      ],
      outcome: [
        "NLP pipeline reduced analyst cycle-time by ~85%, freeing over 1 FTE " +
          "per day for higher-order work.",
        "Zone-based delivery model kept essential supply distribution " +
          "uninterrupted for 90+ days across the district with zero failures.",
      ],
      learnings: [
        "0→1 builds under operational pressure require extreme constraint on " +
          "scope. Ship the 80% solution that works, not the perfect system " +
          "that doesn't.",
        "Coordination without authority is a distinct skill: shared tracking " +
          "and daily cadence substitute for formal control.",
        "Precision vs. speed trade-offs in NLP are real, especially when " +
          "false negatives have operational consequences.",
      ],
    },
    {
      id: "ai-tendering-engine",
      title: "AI Tendering & Pricing Engine",
      year: "2025",
      stack: "LLM · ML Pricing · Knowledge Repository · Power Automate",
      summary:
        "Productised the tendering process end-to-end: built a structured " +
        "knowledge repository, integrated live market indices, and layered an " +
        "ML pricing engine with low/base/high scenario outputs. Eliminated the " +
        "estimation bottleneck on high-value bids and standardised pricing " +
        "confidence across the team.",
      cardSummary:
        "0→1 internal product: AI-assisted tendering tool with ML pricing " +
        "engine, live market indices, and scenario outputs for high-value bids.",
      proof: "Estimation bottleneck eliminated | Pricing standardised | 0→1 build",
      context:
        "Context: Built at KEC International. Client and bid details withheld; " +
        "scope, architecture, and outcomes are real.",
      metrics: [
        "0→1 internal product build",
        "Low / base / high pricing scenarios",
        "Live market index integration",
      ],
      actions: [
        { label: "Open Case Study", kind: "modal" },
      ],
      flagship: false,
      archetype: "Product & Strategy",
      problem: [
        "Tendering estimation relied on individual expertise. No structured " +
          "knowledge base, no consistent pricing method across the team.",
        "High-value bids had long estimation cycles and inconsistent confidence " +
          "levels, creating bottlenecks before submission.",
        "Market index data was manually pulled each time, introducing lag and " +
          "error into pricing inputs.",
      ],
      approach: [
        "Built a structured tender knowledge repository: codified past bid data, " +
          "cost breakdowns, and scope patterns into a queryable format.",
        "Integrated live market indices (material costs, labour benchmarks) as " +
          "real-time inputs to the pricing model.",
        "Layered an ML pricing engine that generates low/base/high scenario " +
          "outputs, calibrated against historical bid outcomes.",
        "Used LLM-assisted tooling to accelerate development and enable " +
          "non-technical stakeholders to interact with the knowledge repository.",
        "Designed for adoption: kept the interface familiar and the output " +
          "format compatible with existing review workflows.",
      ],
      outcome: [
        "Eliminated the estimation bottleneck for high-value bids. Turnaround " +
          "time cut significantly.",
        "Standardised pricing confidence across the team with consistent " +
          "scenario framing (low/base/high).",
        "First internal AI product of its kind at the business unit.",
      ],
      learnings: [
        "Internal products live or die on adoption. Output format must match " +
          "existing workflows, not force new ones.",
        "LLM-assisted development accelerates 0→1 builds, but architectural " +
          "control and domain knowledge still determine quality.",
        "Pricing tools must encode human judgment (risk appetite, market " +
          "context), not just historical averages.",
      ],
    },
];

