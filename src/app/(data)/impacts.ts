import type { ImpactItem } from "../(types)/common";

export const impacts: ImpactItem[] = [
    {
      id: "eoffice-2023",
      title: "e-Office rollout (2023)",
      subtitle: "Paperless HQ, -90 % TAT",
      problem: [
        "Paper files (~200/day) trapped officers at desks and buried approvals.",
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

