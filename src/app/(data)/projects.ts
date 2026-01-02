import type { Project } from "../(types)/project";

export const projects: Project[] = [
    {
      id: "kec-execution-dashboard",
      title: "Execution & Productivity Dashboard",
      year: "2025",
      stack: "Power BI | Python | SharePoint/Excel | Automation",
      summary:
        "Built a custom, server-hosted execution decision system that ingests structured Excel reports from 25+ projects and converts them into leadership-ready signals on plan vs actual progress, productivity trends, and execution exceptions -- without increasing reporting effort at sites. Developed end-to-end in Python with AI-assisted coding (Codex), designed explicitly for adoption in a field-heavy environment.",
      cardSummary:
        "Excel-first execution system that turns 25+ project reports into leadership-ready signals on plan vs actual, productivity, and exceptions.",
      proof: "25+ projects | ~80% manual effort reduced | ~98% accuracy",
      context:
        "Context: Field teams across 25+ projects reported execution data in Excel via email and SharePoint. Leadership needed same-day visibility into what was off-plan and why, but any solution that increased site-level effort risked low adoption. Rather than forcing new tools or workflows, I kept the system Excel-first and absorbed complexity on the backend.",
      metrics: [
        "25+ projects consolidated",
        "Plan vs actual + productivity",
        "Validation + exception logs",
      ],
      actions: [
        { label: "Open Case Study", kind: "modal" },
        { label: "Masked Screens", kind: "modal", scrollTo: "p-masked" },
      ],
      flagship: true,
      flagshipLabel: "",
      archetype: "Decision System",
      problem: [
        "Execution data arrived in Excel, but formats drifted across projects over time.",
        "Manual consolidation was slow, error-prone, and reactive.",
        "Leaders lacked a trusted, current view of execution status and exceptions.",
        "Increasing reporting burden at sites would have reduced compliance and data quality.",
      ],
      approach: [
        "Designed a strict reporting contract (fixed sheet names, headers, no merges, file naming rules) so Excel inputs remained machine-readable.",
        "Built a Python-based ingestion and validation layer, with rule checks, missing-data detection, anomaly flags, and exception logs.",
        "Developed a server-hosted web dashboard that renders leadership summaries, project-level drill-downs, and activity/period-wise productivity trends.",
        "Used AI-assisted coding (Codex) to accelerate end-to-end development while retaining architectural control.",
        "Created lightweight onboarding and governance so new projects could be added without rework or manual intervention.",
      ],
      outcome: [
        "~80% reduction in manual consolidation effort.",
        "Same-day execution visibility for leadership.",
        "Data accuracy improved to ~98% through validation and exception tracking.",
        "Enabled faster, more focused weekly and monthly reviews using a single, trusted source of truth.",
      ],
      learnings: [
        "Adoption is a design choice: keeping field workflows unchanged matters more than tool sophistication.",
        "Exceptions build trust faster than dashboards.",
        "At scale, consistent and auditable beats perfect but fragile.",
      ],
      maskedScreens: {
        title: "Masked Screens (Representative)",
        note: "Screens are masked to protect confidentiality; structure and logic are representative.",
        items: [
          {
            src: "/masked-1.png",
            alt: "Masked dashboard overview",
            callouts: ["Plan vs Actual (MTD/WTD)", "Productivity trend", "Top slippages"],
          },
          {
            src: "/masked-2.png",
            alt: "Masked project drill-down",
            callouts: ["Project drill-down", "Activity-level view", "Weekly variance"],
          },
          {
            src: "/masked-3.png",
            alt: "Masked validation view",
            callouts: ["Validation flags", "Exception log", "Data quality status"],
          },
        ],
      },
      artifacts: [
        "Masked dashboard screenshots (values + identifiers blurred)",
        "Template screenshot + rules (what not to change)",
        "Simple architecture diagram (Excel -> validation -> model -> Power BI)",
      ],
    },
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
        { label: "Operating Model", kind: "modal", scrollTo: "p-approach" },
      ],
      flagship: true,
      flagshipLabel: "",
      archetype: "Execution at Scale",
      problem: [
        "250k+ visitors, 75+ foreign delegations, zero-failure tolerance.",
        "20 days to build security and logistics while leading 600+ personnel.",
      ],
      approach: [
        "Directed 8 workstreams and integrated 2k+ CCTV streams into a multi-agency control room.",
        "Ran daily standups and RAID reviews with multi-agency stakeholders to unblock quickly.",
      ],
      outcome: [
        "Hit 100% SLA with zero incidents.",
        "Recommended for DG Commendation Roll.",
      ],
      learnings: [
        "RAID-log governance keeps workstreams aligned under hard deadlines.",
        "Diplomacy and escalation align tactical actions with strategic goals.",
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
      cover: { src: "/images/industry-digest-banner.png", alt: "Industry Digest" },
      screenshots: [
        { src: "/images/industry-digest-workflow.png", alt: "Industry Digest" },
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
      demoLink: "/samples/Industry-Digest-Sample.jpg",
      prdLink: "/PRDs/Product Requirements Document - Industry Digest.pdf",
      flagship: true,
      flagshipLabel: "",
      archetype: "Decision Support",
    },
    {
      id: "planning-traceability-system",
      title: "Planning Traceability System",
      year: "2025",
      stack: "Excel-first | Governance | Audit trail | Automation",
      summary:
        "Built an Excel-first planning governance system that preserves how teams work while making revisions explicit, traceable, and auditable for leadership. The system creates a frozen monthly baseline, tracks changes over time, and supports clean roll-forward -- with fully automated ingestion, validation, and alerts, requiring no additional effort from site teams.",
      cardSummary:
        "Excel-first governance that freezes baselines, tracks revisions, and keeps roll-forward clean without adding site effort.",
      archetype: "Governance",
      context:
        "Context: Leadership highlighted a recurring issue: rolling plans were being edited mid-month, making reviews subjective and accountability unclear. Rather than forcing teams onto new tools, I made a deliberate design choice to keep the system Excel-first and absorb all complexity through Power Automate and Microsoft Scripts, given that the end users were not tech-savvy and adoption risk was high.",
      metrics: ["Freeze + snapshot", "Change log / audit trail", "Exceptions & validation"],
      actions: [
        { label: "Open Case Study", kind: "modal" },
        { label: "How it works", kind: "modal", scrollTo: "p-approach" },
      ],
      problem: [
        "Plans were edited silently after submission, breaking accountability.",
        "No reliable baseline existed for what was originally committed vs what changed.",
        "Leadership needed traceability and auditability for reviews.",
        "Any increase in process or tooling burden at sites would reduce compliance.",
      ],
      approach: [
        "Defined a strict Excel template as a data contract (sheet names, headers, rules) so automation remained stable.",
        "Implemented a monthly Freeze mechanism that locks planning columns and creates an immutable snapshot.",
        "Automated versioning and change capture, generating a simple, timestamped log of what changed and when.",
        "Built the system entirely using Power Automate and Office Scripts, so no manual steps or technical knowledge were required from teams.",
        "Integrated automated alerts for projects that did not submit plans on time or violated format rules.",
        "Added validation and exception outputs so issues were surfaced early, not during reviews.",
      ],
      outcome: [
        "Established a trustworthy baseline for monthly and rolling reviews.",
        "Eliminated disputes over what was committed vs what changed later.",
        "Improved planning governance without changing how teams worked.",
        "Made mid-month changes explicit and reviewable, rather than informal and opaque.",
      ],
      learnings: [
        "Governance works only when it is lighter than the workaround.",
        "Auditability comes from disciplined templates and snapshots, not heavy tools.",
        "Automation must compensate for user constraints, not expose them.",
        "Exception-handling is what makes planning systems usable in the real world.",
      ],
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
      metrics: ["Exposure + expiry tracking", "Expiry buckets & alerts", "Leadership risk view"],
      actions: [
        { label: "Open Case Study", kind: "modal" },
        { label: "What's tracked", kind: "modal", scrollTo: "p-approach" },
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
    },
    {
      id: "audible-product-teardown",
      title: "Audible Product Teardown",
      year: "2025",
      stack: "Product Strategy",
      summary:
        "Deep dive into Audible's product experience, retention mechanics, and growth plays backed by 30K+ review signals.",
      cover: { src: "/images/Audible.png", alt: "Audible product teardown" },
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
          { label: "Download Report", href: "/Product Teardowns/Audible Product Teardow Report.pdf" },
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
              screenshot: { src: "/images/onboarding.png", alt: "Audible onboarding flow" },
              annotations: [
                { tone: "positive", text: "Amazon login plus free trial equals a 60-second start." },
                { tone: "positive", text: "Value prop is clear with Originals and deals up front." },
                { tone: "negative", text: "No preview of included titles before entering the credit flow." },
              ],
            },
            {
              id: "ux-discovery",
              title: "Discovery",
              screenshot: { src: "/images/discovery.png", alt: "Audible discovery experience" },
              annotations: [
                { tone: "negative", text: "Filters for Included / Free / Language are hidden three taps deep." },
                { tone: "negative", text: "Recommendations repeat the last purchase instead of widening the catalog." },
                { tone: "positive", text: "Editorial collections (Editors' Picks) land well when surfaced." },
              ],
            },
            {
              id: "ux-listening",
              title: "Listening",
              screenshot: { src: "/images/listening.png", alt: "Audible listening controls" },
              annotations: [
                { tone: "positive", text: "Whispersync and speed controls feel polished." },
                { tone: "negative", text: "Offline downloads fail silently; users lose spot mid-commute." },
              ],
            },
            {
              id: "ux-retention",
              title: "Retention",
              screenshot: { src: "/images/retention.png", alt: "Audible retention touchpoints" },
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
          { label: "Download Detailed PDF Report", href: "/Product Teardowns/Audible Product Teardow Report.pdf" },
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
      cover: { src: "/images/risk-radar-outer.png", alt: "Risk Radar dashboard (Looker Studio)" },
      metrics: ["Real time map", "Ranked disruptions", "Trend lines & filters"],
      roleTools: "PM/Builder - NewsAPI, n8n, Google Sheets, Gemini, Looker Studio",
      archetype: "Decision Systems",
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
      cover: { src: "/images/content-to-insights-card-cover.png", alt: "Content to Insights - card cover" },
      screenshots: [
        { src: "/images/content-to-insights-workflow.png", alt: "Content to Insights - card cover" },
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
    },];

