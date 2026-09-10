import { workRows } from "./work";

export type ArchiveRow = {
  year: string;
  system: string;
  at: string;
  outcome: string;
};

// The homepage Work rows, carried into the archive automatically so
// the two lists can't drift out of sync.
const homepageRows: ArchiveRow[] = workRows.map((row) => ({
  year: row.year,
  system: row.title,
  at: row.org,
  outcome: row.figures,
}));

// Removed from the homepage Work section but kept here: BG & Surety, AI
// Risk Radar, Content to Insights and Audible are archive-only (not
// deleted). Planning Traceability System was superseded by Quarterly Block
// Planning and deleted outright -- it does not appear here.
const archiveOnlyRows: ArchiveRow[] = [
  {
    year: "2025",
    system: "Audible Product Teardown",
    at: "Personal",
    outcome: "60% global share",
  },
  {
    year: "2025",
    system: "BG & Surety Risk Control System",
    at: "KEC",
    outcome: "Standardised exposure/expiry tracking with proactive alerts",
  },
  {
    year: "2025",
    system: "AI Powered Risk Radar",
    at: "Personal",
    outcome: "Real-time severity-scored disruption map, 0–10 index",
  },
  {
    year: "2025",
    system: "Content to Insights Pipeline",
    at: "Personal",
    outcome: "4 hrs → 5 min per video; 60+ videos archived in month one",
  },
];

// Pre-existing repo content ((data)/impacts.ts) not represented among the
// homepage rows or the archive-only rows above.
const otherRepoRows: ArchiveRow[] = [
  {
    year: "2023",
    system: "e-Office rollout",
    at: "CISF HQ",
    outcome: "Admin SLA −90%, paper eliminated within 14 weeks",
  },
  {
    year: "2023",
    system: "Sales Analytics Boost",
    at: "Retail ops",
    outcome: "Inventory turns ×2, sales +20% (₹11L/month)",
  },
  {
    year: "2022",
    system: "Access-Control Redesign",
    at: "CISF",
    outcome: "40% fewer devices required, capex held, all stakeholders signed off",
  },
  {
    year: "2022",
    system: "Currency-Press Consulting",
    at: "CISF",
    outcome: "Opex cut 20% while preserving security coverage",
  },
];

export const archive: ArchiveRow[] = [
  ...homepageRows,
  ...archiveOnlyRows,
  ...otherRepoRows,
];
