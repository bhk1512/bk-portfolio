export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
  // Intrinsic pixel size. Images render uncropped at container width, so
  // the real aspect ratio has to be known up front.
  width: number;
  height: number;
  // Light-UI captures are desaturated to sit inside the dark palette.
  // Set false for an image that is already dark.
  desaturate?: boolean;
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
  // One image for the homepage row. An expanded row is an index entry, not
  // a case study, so it never shows more than this.
  rowImage?: WorkImage;
  // At most one image per case study section, anchored to the section it
  // illustrates. More than one would mean there is one image too many.
  builtImage?: WorkImage;
  happenedImage?: WorkImage;
  caseStudy?: WorkCaseStudy;
};

// The seven rows shown in the homepage Work section, in this order.
// Rows 1-3 carry case studies; rows 4-7 fall back to the legacy template
// in (data)/projects.ts. Audible Product Teardown is archive-only and
// lives in (data)/archive.ts.
export const workRows: WorkRow[] = [
  {
    slug: "quarterly-block-planning",
    title: "Quarterly Block Planning",
    org: "KEC",
    year: "2026",
    body:
      "Twenty-four projects, twenty-four Excel files, twenty-four ideas about " +
      "when a plan was due. Now they plan a quarter at a time inside the " +
      "platform they already use, the system checks the numbers as they " +
      "arrive, and on day 12 the quarter locks.",
    figures: "24 projects · 12-day planning cycle",
    then: "Q2 Jul-Sep 2026 planned through it. Live when I left.",
    rowImage: {
      src: "/images/work/quarterly-block-planning.png",
      alt: "Quarterly block planning interface showing per-month upload status, review, and freeze steps alongside the day-wise activity plan grid.",
      caption: "Quarterly upload and freeze workflow. Names and project codes replaced.",
      width: 1897,
      height: 827,
    },
    builtImage: {
      src: "/images/work/quarterly-block-planning.png",
      alt: "Quarterly block planning interface showing per-month upload status, review, and freeze steps alongside the day-wise activity plan grid.",
      caption: "Quarterly upload and freeze workflow. Names and project codes replaced.",
      width: 1897,
      height: 827,
    },
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
      "Foundation quality used to be a paper checklist signed at the end. Now " +
      "the evidence is captured live at seven points during the work, " +
      "geo-tagged, and if someone skips a step they have to say why.",
    figures: "7 milestones · live capture only · ~0.9 GB evidence per foundation",
    then: "Released and in use when I left.",
    rowImage: {
      src: "/images/work/foundation-quality-capture.png",
      alt: "Milestone-gated foundation quality capture flow showing required video evidence and skip-with-justification controls for one checkpoint.",
      caption: "Milestone capture flow. Project and location codes replaced.",
      width: 1731,
      height: 1551,
    },
    builtImage: {
      src: "/images/work/foundation-quality-capture.png",
      alt: "Milestone-gated foundation quality capture flow showing required video evidence and skip-with-justification controls for one checkpoint.",
      caption: "Milestone capture flow. Project and location codes replaced.",
      width: 1731,
      height: 1551,
    },
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
    year: "2025–2026",
    body:
      "Built a dashboard that put 25 projects in one view. Once leadership was " +
      "opening it every week, wrote the case to build it properly inside the " +
      "platform, and switched off my own tool along with the report mails and " +
      "the micro-plan files.",
    figures: "25+ projects · ~80% manual effort removed · MT/day and km/month per gang",
    then:
      "Institutionalised into the platform. Standalone retired by my own business " +
      "case, 2026.",
    rowImage: {
      src: "/images/work/productivity-dashboard-executive.png",
      alt: "Executive overview dashboard with portfolio-level completion, plan attainment, and productivity KPIs plus a RAG status table by project.",
      caption: "Executive overview. Names and project codes replaced.",
      width: 1891,
      height: 835,
    },
    builtImage: {
      src: "/images/work/productivity-dashboard-executive.png",
      alt: "Executive overview dashboard with portfolio-level completion, plan attainment, and productivity KPIs plus a RAG status table by project.",
      caption: "Executive overview. Names and project codes replaced.",
      width: 1891,
      height: 835,
    },
    happenedImage: {
      src: "/images/work/execution-report.png",
      alt: "Execution report table breaking down scope, completion, and monthly plan-versus-actual by region, project, and activity.",
      caption: "The same view, rebuilt inside the platform.",
      width: 1899,
      height: 821,
    },
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
    figures: "Estimation bottleneck eliminated · Pricing standardised · 0→1 build",
    then: "Handed over.",
    rowImage: {
      src: "/images/work/tender-copilot-pricing.png",
      alt: "A pricing run stepping through commodity indices and competitor metrics before returning conservative, median and aggressive rates per unit, with the inputs and signals it used listed underneath.",
      caption: "Orchestrated pricing run and confidence bands. All values are fabricated.",
      width: 1920,
      height: 1926,
    },
    builtImage: {
      src: "/images/work/tender-copilot-extract.png",
      alt: "A pasted tender notice parsed into named fields for voltage, route length, completion period, terrain and customer type, with a prompt to correct any value before confirming.",
      caption: "Tender details parsed into structured fields. Reference, client and specifications are fabricated.",
      width: 1920,
      height: 1648,
    },
    happenedImage: {
      src: "/images/work/tender-copilot-pricing.png",
      alt: "A pricing run stepping through commodity indices and competitor metrics before returning conservative, median and aggressive rates per unit, with the inputs and signals it used listed underneath.",
      caption: "Orchestrated pricing run and confidence bands. All values are fabricated.",
      width: 1920,
      height: 1926,
    },
  },
  {
    slug: "industry-digest",
    title: "Industry Digest",
    org: "KEC",
    year: "2025",
    body:
      "Thirty-odd sources crawled overnight and sorted into wins, setbacks, " +
      "moves and macro. Lands at nine on Monday. Three hours of reading became " +
      "ten minutes.",
    figures: "3 hrs to under 10 min, weekly · 30+ sources · weekly cadence",
    then: "Still running.",
    rowImage: {
      src: "/images/work/industry-digest.png",
      alt: "A week's digest: three ranked signals tagged market, strategy and risk, each with its supporting points, above a table comparing five competitors on recent orders and strength.",
      caption: "Weekly signals and competitive snapshot. Internal recommendations removed.",
      width: 638,
      height: 1715,
      // Already dark. The site-wide desaturation is for light-UI captures.
      desaturate: false,
    },
    builtImage: {
      src: "/images/work/industry-digest.png",
      alt: "A week's digest: three ranked signals tagged market, strategy and risk, each with its supporting points, above a table comparing five competitors on recent orders and strength.",
      caption: "Weekly signals and competitive snapshot. Internal recommendations removed.",
      width: 638,
      height: 1715,
      // Already dark. The site-wide desaturation is for light-UI captures.
      desaturate: false,
    },
  },
  {
    slug: "ib-nlp-intelligence",
    title: "NLP Triage Engine & Field Intelligence",
    org: "IB",
    year: "2019–2020",
    body:
      "Analyst intake was a queue someone read top to bottom. Wrote a " +
      "classifier that pushed the high-value items up. Built it alone, because " +
      "nobody had asked for it.",
    figures: "~85% analyst time saved · 90+ days zero supply failure · built solo",
    then: "Handed over, 2020. No visibility since.",
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
    figures: "250k+ visitors · 75+ delegations · 100% SLA / zero incidents",
    then: "Event closed, 2022.",
  },
];

export function getWorkRow(slug: string): WorkRow | undefined {
  return workRows.find((row) => row.slug === slug);
}
