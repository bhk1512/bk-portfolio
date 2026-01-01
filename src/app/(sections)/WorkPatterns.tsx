"use client";

import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

const patterns = [
  {
    title: "Visibility & Decision Systems",
    problem: "When leaders lack timely, trusted signals",
    outcome: "→ dashboards, digests, risk radars, exec summaries",
  },
  {
    title: "Process Governance & Traceability",
    problem: "When plans change silently and accountability breaks",
    outcome: "→ Excel-first systems, audit trails, frozen baselines",
  },
  {
    title: "Execution at Scale (High-stakes Ops)",
    problem: "When failure is not an option",
    outcome: "→ multi-agency PMO, zero-incident delivery, tight control loops",
  },
];

export default function WorkPatterns() {
  return (
    <Section id="patterns" title="What I repeatedly work on">
      <Reveal>
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <div
              key={pattern.title}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-4 sm:p-5"
            >
              <h3 className="text-zinc-100 font-medium">{pattern.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{pattern.problem}</p>
              <p className="mt-2 text-sm text-zinc-300">{pattern.outcome}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
