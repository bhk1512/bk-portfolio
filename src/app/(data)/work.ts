export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
  // Intrinsic pixel size. Case studies render these uncropped at the full
  // content width, so the real aspect ratio has to be known up front.
  width: number;
  height: number;
};

export type WorkCaseStudy = {
  broken: string;
  built: string;
  happened: string;
  // Label for a supplied-later artifact (process flow / requirements doc).
  // Rendered as a visible TODO link slot, same style as an existing "PRD" link.
  artifactSlot?: string;
};

export type WorkRow = {
  slug: string;
  title: string;
  org: string;
  year: string;
  body: string;
  figures: string;
  // null renders a visible "still running / handed over" TODO (status not
  // yet known). "" hides the status line (status doesn't apply to this row).
  then: string | null;
  images?: WorkImage[];
  caseStudy?: WorkCaseStudy;
};

// The eight rows shown in the homepage Work section, in this order.
// Rows 1-3 carry case studies; rows 4-8 keep their existing copy from
// (data)/projects.ts unchanged.
export const workRows: WorkRow[] = [
  {
    slug: "quarterly-block-planning",
    title: "Quarterly Block Planning",
    org: "KEC",
    year: "2026",
    body:
      "Replaced Excel-based planning across 24 T&D projects with a governed quarterly " +
      "cycle inside the enterprise project platform. Sequential upload with automatic " +
      "scope validation, central review, a hard freeze on day 12, and shortfall " +
      "reallocation into the remaining months with an escalation path.",
    figures: "24 projects · 12-day planning cycle",
    then: "Q2 Jul-Sep 2026 planned through it. Live when I left.",
    images: [
      {
        src: "/images/work/quarterly-block-planning.png",
        alt: "Quarterly block planning interface showing per-month upload status, review, and freeze steps alongside the day-wise activity plan grid.",
        caption: "Quarterly upload and freeze workflow. Names and project codes replaced.",
        width: 1897,
        height: 827,
      },
    ],
    caseStudy: {
      broken:
        "Twenty-four projects, twenty-four Excel files, twenty-four different " +
        "ideas about when a plan was due. Nobody could tell you who had reviewed " +
        "what. Numbers changed after submission and there was no record of it.",
      built:
        "A quarterly planning workflow inside the platform the projects already " +
        "used. Plans go up month by month. The system checks each one against " +
        "remaining scope as it arrives, central review happens in one place, and " +
        "on day 12 the quarter locks. If a project misses its number, the " +
        "shortfall gets pushed into the remaining months by someone who has to " +
        "decide where it goes. It doesn't quietly vanish.",
      happened:
        "All 24 projects moved onto it. Q2 2026 was planned start to finish " +
        "through the system. It was running daily when I left.",
      artifactSlot: "Process flow",
    },
  },
  {
    slug: "foundation-quality-evidence-capture",
    title: "Foundation Quality Evidence Capture",
    org: "KEC",
    year: "2026",
    body:
      "Replaced paper foundation checklists with milestone-gated live capture at " +
      "seven checkpoints. Uploads disabled so evidence cannot be assembled after " +
      "the fact, capture geo-tagged, a written justification required whenever a " +
      "milestone is skipped, and QA review aimed at exceptions rather than at " +
      "everything.",
    figures: "7 milestones · live capture only · ~0.9 GB evidence per foundation",
    then: "Released and in use when I left.",
    images: [
      {
        src: "/images/work/foundation-quality-capture.png",
        alt: "Milestone-gated foundation quality capture flow showing required video evidence and skip-with-justification controls for one checkpoint.",
        caption: "Milestone capture flow. Project and location codes replaced.",
        width: 1731,
        height: 1551,
      },
    ],
    caseStudy: {
      broken:
        "Foundation quality was recorded on paper checklists, filled in after the " +
        "work was already done. Nobody could confirm a checkpoint had been " +
        "watched at the time it happened. Evidence could be put together later, " +
        "and nothing in the process stopped that.",
      built:
        "Seven checkpoints across the foundation sequence, each one gated. " +
        "Capture happens live or it doesn't count. There is no way to upload " +
        "evidence collected earlier, and every capture is geo-tagged to the site. " +
        "If the field team skips a milestone, they write down why before they can " +
        "move on. The gap goes on the record. QA reviews those exceptions and " +
        "the justifications behind them. It no longer re-checks every clean " +
        "submission.",
      happened:
        "Seven milestones per foundation. Live capture only. Around 0.9 GB of " +
        "evidence per foundation. It was released and in active use when I left.",
    },
  },
  {
    slug: "execution-productivity-platform",
    title: "From dashboard to platform",
    org: "KEC",
    year: "2025-2026",
    body:
      "Built a standalone dashboard consolidating 25+ project reports into one " +
      "leadership view of plan versus actual. Once it was in weekly use, wrote the " +
      "case to extend the enterprise project platform from status-only tracking to " +
      "date-wise quantities and gangs — and retired the standalone tool, the DPR " +
      "mail chain and the micro-plan files with it.",
    figures: "25+ projects | ~80% manual effort removed | MT/day and km/month per gang",
    then:
      "Institutionalised into the platform. Standalone retired by my own business " +
      "case, 2026.",
    images: [
      {
        src: "/images/work/productivity-dashboard-executive.png",
        alt: "Executive overview dashboard with portfolio-level completion, plan attainment, and productivity KPIs plus a RAG status table by project.",
        caption: "Executive overview. Names and project codes replaced.",
        width: 1891,
        height: 835,
      },
      {
        src: "/images/work/tower-erection-analytics.png",
        alt: "Tower erection analytics tab showing idle-day hotspots, recoverable output estimates, and a what-if productivity simulator.",
        caption: "Tower erection analytics. Project codes replaced.",
        width: 1887,
        height: 841,
      },
      {
        src: "/images/work/execution-report.png",
        alt: "Execution report table breaking down scope, completion, and monthly plan-versus-actual by region, project, and activity.",
        caption: "Execution report, regional breakdown. Names and project codes replaced.",
        width: 1899,
        height: 821,
      },
    ],
    caseStudy: {
      broken:
        "Execution data came in as Excel files. More than 25 projects, and the " +
        "formats drifted apart over time. Consolidation was manual and slow, and " +
        "by the time it was done it described the past. Leadership had no current " +
        "view of what was off plan or why. The platform had a gap of its own. It " +
        "tracked erection and stringing as done or not done, with no date-wise " +
        "quantities and no gang-level detail, so productivity got assembled by " +
        "hand outside it. A daily progress report mail chain. A micro-plan file " +
        "for every project. A standalone dashboard stitched out of both.",
      built:
        "First the standalone dashboard. It read the files site teams were " +
        "already filing, so nobody had to send me anything new. More than 25 " +
        "project reports landed in one view of plan against actual, with a " +
        "validation layer underneath that raised exceptions on its own. Then it " +
        "went into weekly use, and I wrote the case to stop maintaining it. The " +
        "argument was to extend the platform people already used from status-only " +
        "tracking to date-wise quantities and gangs, so the platform computes " +
        "productivity itself and nobody rebuilds it afterward.",
      happened:
        "More than 25 projects on one view. Around 80% of the manual effort gone. " +
        "Productivity visible as MT/day and km/month per gang. The extension " +
        "retired the standalone tool, the DPR mail chain and the micro-plan files " +
        "in one move. Three sources became one. Institutionalised into the " +
        "platform. Standalone retired by my own business case, 2026.",
      artifactSlot: "Requirements document",
    },
  },
  {
    slug: "ai-tendering-engine",
    title: "AI Tendering & Pricing Engine",
    org: "KEC",
    year: "2025",
    body:
      "Pricing a bid ran on individual expertise. No shared knowledge base, no " +
      "consistent method across the team. I built a pricing engine on a " +
      "structured repository and live market indices. High-value bids come " +
      "back with low, base and high scenarios.",
    figures: "Estimation bottleneck eliminated | Pricing standardised | 0→1 build",
    then: "Handed over.",
  },
  {
    slug: "industry-digest",
    title: "Industry Digest",
    org: "KEC",
    year: "2025",
    body:
      "Weekly Monday 9 AM digest that converts 30+ sources into EPC wins, " +
      "setbacks, moves & macro signals.",
    figures: "3 hrs -> <10 min weekly | 30+ sources | weekly cadence",
    then: "Still running.",
  },
  {
    slug: "ib-nlp-intelligence",
    title: "NLP Triage Engine & Field Intelligence",
    org: "IB",
    year: "2019–2020",
    body:
      "0→1 NLP pipeline cutting analyst time 85% + field deployment keeping " +
      "essential supply uninterrupted for 90 days in a remote district.",
    figures: "~85% analyst time saved | 90+ days zero supply failure | built solo",
    then: "Handed over.",
  },
  {
    slug: "audible-product-teardown",
    title: "Audible Product Teardown",
    org: "Personal",
    year: "2025",
    body:
      "Audible holds about 60% of the audiobook market. I read 30,000 reviews " +
      "to see where the product wins and where it struggles.",
    figures: "60% global share",
    // Personal teardown, not a deployed system -- "still running / handed
    // over" doesn't apply. Empty string hides the status line entirely.
    then: "",
  },
  {
    slug: "defence-expo-pmo",
    title: "Defence Expo PMO",
    org: "National",
    year: "2022",
    body:
      "India's largest defence exhibition, with a 20-day build window and no " +
      "playbook. I ran 8 workstreams and 600+ personnel across 6 agencies. " +
      "Five days, zero incidents.",
    figures: "250k+ visitors | 75+ delegations | 100% SLA / zero incidents",
    // The event concluded in 2022 -- "still running / handed over" doesn't
    // apply. Empty string hides the status line entirely.
    then: "",
  },
];

export function getWorkRow(slug: string): WorkRow | undefined {
  return workRows.find((row) => row.slug === slug);
}
