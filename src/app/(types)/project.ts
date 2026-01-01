import type { TeardownContent } from "./teardown";

export type Project = {
  id: string;
  title: string;
  year?: string;
  stack?: string;
  summary?: string;
  cardSummary?: string;
  proof?: string;
  context?: string;
  demoLink?: string;
  prdLink?: string;
  actions?: { label: string; href?: string; kind?: "link" | "modal"; scrollTo?: string }[];
  cover?: { src: string; alt: string };
  metrics?: string[];
  roleTools?: string;
  screenshots?: { src: string; alt: string }[];
  problem?: string | string[];
  approach?: string[];
  outcome?: string[];
  learnings?: string[];
  maskedScreens?: {
    title: string;
    note: string;
    items: { src: string; alt: string; callouts: string[] }[];
  };
  artifacts?: string[];
  teardown?: TeardownContent;
  flagship?: boolean;
  flagshipLabel?: string;
  archetype?: string;
};
