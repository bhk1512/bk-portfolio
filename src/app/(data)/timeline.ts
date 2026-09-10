export type TimelineNode = {
  id: string;
  short: string;
  year: string;
  detail: string;
  // Proportional weight of the segment that begins at this node, in years.
  // The node before the axis break carries no weight -- that span is
  // deliberately compressed to a fixed width instead of scaled.
  weight?: number;
  // Marks the career gap: the span after this node is not drawn to scale.
  breakAfter?: boolean;
};

// Six nodes. ZS sits before an axis break; everything from IB onward is
// spaced strictly proportionally. SITA's segment is the trailing, ongoing
// one -- it runs to the right edge with no terminal dot.
export const timeline: TimelineNode[] = [
  {
    id: "zs",
    short: "ZS",
    year: "2016",
    detail: "ZS Associates. Analytics and technology consulting. First job.",
    breakAfter: true,
  },
  {
    id: "ib",
    short: "IB",
    year: "2018",
    detail:
      "Intelligence Bureau. Risk intelligence for the Ministry of Home " +
      "Affairs. Two years of analyst work, and the habit of building the " +
      "tool instead of asking for one.",
    weight: 2,
  },
  {
    id: "cisf",
    short: "CISF",
    year: "2020",
    detail:
      "Central Industrial Security Force. Armed Force of the Union, guarding " +
      "airports, ports and plants. Four years learning how slowly an " +
      "institution moves, and how to move it anyway.",
    weight: 3.5,
  },
  {
    id: "iima",
    short: "IIMA",
    year: "2024",
    detail: "IIM Ahmedabad. PGPX, Strategy & Operations.",
    weight: 1,
  },
  {
    id: "kec",
    short: "KEC",
    year: "2025",
    detail:
      "KEC International. Power transmission and distribution, EPC. Built the first " +
      "system that put 25 projects in one view, then the planning and quality modules " +
      "that replaced it inside the platform people already used.",
    weight: 1.4,
  },
  {
    id: "sita",
    short: "SITA",
    year: "2026",
    detail: "SITA Labs. Air transport technology. Building the India practice.",
    weight: 1.2,
  },
];

// Revealed on load so the interaction is discoverable.
export const defaultTimelineIndex = timeline.findIndex((node) => node.id === "kec");
