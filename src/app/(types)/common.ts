export const SECTION_IDS = [
  "home",
  "work",
  "skills",
  "certs",
  "impact",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type Affiliation = {
  name: string;
  url: string;
  logo: { src: string; width: number; height: number };
};

export type ImpactItem = {
  id: string;
  title: string;
  subtitle?: string;
  summary?: string;
  problem?: string[];
  action?: string[];
  outcome?: string[];
  learnings?: string[];
};

export type Certification = {
  title: string;
  issuer?: string;
  year?: string;
  url?: string;
  logo?: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  linkedin: string;
};

export type HeroCta = {
  label: string;
  href: string;
  type: "primary" | "ghost";
};

export type HeroData = {
  name: string;
  subhead?: string;
  photo?: { src: string; alt: string };
  ctas: HeroCta[];
  affiliations?: Affiliation[];
};

export type SkillCategory = {
  name: string;
  items: string[];
};

export type SkillsData = {
  categories: SkillCategory[];
  note?: string;
};
