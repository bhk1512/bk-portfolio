import type { TeardownContent } from "./teardown";

export type Project = {
  id: string;
  title: string;
  year?: string;
  stack?: string;
  summary?: string;
  demoLink?: string;
  prdLink?: string;
  cover?: { src: string; alt: string };
  metrics?: string[];
  screenshots?: { src: string; alt: string }[];
  problem?: string | string[];
  approach?: string[];
  outcome?: string[];
  learnings?: string[];
  teardown?: TeardownContent;
};