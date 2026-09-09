export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
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
      },
    ],
    caseStudy: {
      broken:
        "Planning across KEC's Transmission & Distribution projects ran in Excel, " +
        "project by project. Twenty-four projects meant twenty-four independent " +
        "files, each on its own cycle, with no shared structure for when a monthly " +
        "plan had to be in, who reviewed it, or when it stopped moving. A number " +
        "could shift after submission with no record of when or why.",
      built:
        "A quarterly block-planning workflow inside the enterprise project " +
        "platform, replacing the Excel cycle for all 24 projects. Projects upload " +
        "their monthly plans for the quarter in sequence; the platform runs " +
        "automatic scope validation on submission rather than leaving it to manual " +
        "review. Uploaded plans go through a central review, and the whole quarter " +
        "is locked with a hard freeze on day 12 of the cycle. Where a project " +
        "genuinely can't hold a number, the shortfall doesn't disappear into the " +
        "next month unannounced — it's reallocated across the remaining months of " +
        "the quarter through a defined escalation path.",
      happened:
        "24 projects moved onto the workflow. The planning cycle — upload through " +
        "to freeze — runs in 12 days. Q2 2026 (Jul–Sep) was planned end-to-end " +
        "through it, and the workflow was live and in daily use when I left.",
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
      },
    ],
    caseStudy: {
      broken:
        "Foundation quality evidence was collected on paper checklists, filled in " +
        "after the work was already done. There was no way to confirm a " +
        "checkpoint had actually been observed at the time it happened, and " +
        "evidence could be assembled — or reconstructed — well after the fact.",
      built:
        "A milestone-gated live capture flow with seven checkpoints across the " +
        "foundation sequence. Capture only happens live: uploading evidence after " +
        "the fact isn't possible, and every capture is geo-tagged to the site. If " +
        "a milestone is skipped, the field team has to give a written " +
        "justification before moving on — the gap is recorded, not hidden. QA " +
        "review is then aimed at those exceptions and justifications rather than " +
        "re-checking every submission.",
      happened:
        "Seven milestones per foundation, live capture only, running at roughly " +
        "0.9 GB of evidence per foundation. The flow was released and in active " +
        "use when I left.",
    },
  },
  {
    slug: "execution-productivity-platform",
    title: "Execution & Productivity — standalone to platform",
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
      },
      {
        src: "/images/work/tower-erection-analytics.png",
        alt: "Tower erection analytics tab showing idle-day hotspots, recoverable output estimates, and a what-if productivity simulator.",
        caption: "Tower erection analytics. Project codes replaced.",
      },
      {
        src: "/images/work/execution-report.png",
        alt: "Execution report table breaking down scope, completion, and monthly plan-versus-actual by region, project, and activity.",
        caption: "Execution report, regional breakdown. Names and project codes replaced.",
      },
    ],
    caseStudy: {
      broken:
        "Execution data arrived in Excel, and formats drifted across 25+ projects " +
        "over time. Manual consolidation was slow, error-prone and reactive, so " +
        "leadership had no trusted, current view of what was off-plan or why. " +
        "Separately, the enterprise project platform tracked erection and " +
        "stringing at status level only — done or not done — with no date-wise " +
        "quantity or gang-level detail. Productivity had to be assembled by hand " +
        "outside it: a daily progress report mail chain, separate micro-plan files " +
        "per project, and a standalone dashboard stitched together from both.",
      built:
        "First the standalone dashboard: 25+ project reports consolidated into one " +
        "leadership view of plan versus actual, built by reading the files site " +
        "teams were already filing rather than asking them for anything new. A " +
        "validation layer underneath surfaced exceptions on their own instead of " +
        "waiting for someone to notice them. Once it was in weekly use, I wrote " +
        "the case to stop maintaining it as a side tool — extending the enterprise " +
        "project platform from status-only tracking to date-wise quantities and " +
        "gangs, so productivity is computed by the platform itself rather than " +
        "reassembled afterward.",
      happened:
        "25+ projects on one view, roughly 80% of manual effort removed, and " +
        "productivity now visible as MT/day and km/month per gang. The extension " +
        "retired the standalone tool, the DPR mail chain and the micro-plan files " +
        "in the same move — three sources collapsed into one. Institutionalised " +
        "into the platform. Standalone retired by my own business case, 2026.",
      artifactSlot: "Requirements document",
    },
  },
  {
    slug: "ai-tendering-engine",
    title: "AI Tendering & Pricing Engine",
    org: "KEC",
    year: "2025",
    body:
      "0→1 internal product: AI-assisted tendering tool with ML pricing engine, " +
      "live market indices, and scenario outputs for high-value bids.",
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
];

export function getWorkRow(slug: string): WorkRow | undefined {
  return workRows.find((row) => row.slug === slug);
}
