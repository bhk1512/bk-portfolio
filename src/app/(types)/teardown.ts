export type TeardownStat = {
  value: string;
  label: string;
};

export type TeardownHighlight = {
  title: string;
  bullets: string[];
};

export type TeardownJourneyAnnotation = {
  tone: string;
  text: string;
};

export type TeardownJourneyPhase = {
  id: string;
  title: string;
  annotations: TeardownJourneyAnnotation[];
  screenshot?: { src: string; alt: string };
};

export type TeardownReviewStat = {
  label: string;
  value: number;
  tone?: string;
  note?: string;
};

export type TeardownRecommendationSet = {
  id: string;
  title: string;
  icon?: string;
  accent?: string;
  bullets: string[];
  metric: string;
};

export type TeardownContent = {
  badge: string;
  heading: string;
  subheading?: string;
  description: string;
  stats: TeardownStat[];
  actions: { label: string; href: string }[];
  execSummary: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  keyPainPoints: string[];
  about: string[];
  journey: {
    stages: string[];
    strengths: string[];
    pains: string[];
    reviewInsights: string[];
  };
  growth: string[];
  opportunities: TeardownHighlight[];
  threats: string[];
  recommendations: TeardownHighlight[];
  reflection: string;
  nextSteps: string[];
  explore: { label: string; href: string }[];
  nav?: { id: string; label: string }[];
  leakMap?: { stages: string[]; issues: string[]; caption: string };
  marketSnapshot?: {
    leader: { label: string; value: number };
    competitors: { label: string; value: number }[];
    bullets: string[];
  };
  uxJourney?: {
    intro: string[];
    phases: TeardownJourneyPhase[];
    reviewSummary?: TeardownReviewStat[];
    sourceLabel?: string;
  };
  working?: string[];
  breaking?: string[];
  growthSummary?: { headline: string; tiles: string[]; retentionNote: string };
  recommendationSets?: TeardownRecommendationSet[];
  conclusion?: { headline: string; quote: string };
  nextActionsDetailed?: string[];
  visuals?: { label: string; src?: string }[];
};