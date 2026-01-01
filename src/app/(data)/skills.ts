import type { SkillsData } from "../(types)/common";

export const skillsData: SkillsData = {
    categories: [
      {
        name: "Program & Ops",
        items: [
          "Program governance (RAID, cadence)",
          "Stakeholder management",
          "Process design & SOPs",
          "Risk & escalation",
          "Change management",
        ],
      },
      {
        name: "Analytics & Decision Systems",
        items: [
          "KPI design",
          "Data modelling & validation",
          "Power BI / Looker / dashboards",
          "Excel/SharePoint ingestion",
          "Executive storytelling",
        ],
      },
      {
        name: "Automation & AI Tools",
        items: [
          "Workflow automation (n8n / Power Automate)",
          "Python (automation + data)",
          "LLM-assisted workflows",
          "REST APIs",
          "SQL",
        ],
      },
    ],
    note: undefined, // or a short line if you want, else keep undefined
};
