"use client";

import { skillsData } from "../(data)/skills";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function Skills() {
  const categories = skillsData.categories ?? [];
  const note = skillsData.note;
  const iconsByCategory: Record<string, string> = {
    "Program & Ops": "⚙️",
    "Analytics & Decision Systems": "📊",
    "Automation & AI Tools": "🤖",
  };

  return (
    <Section id="skills" title="Skills">
      <Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 60}>
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/30 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden>{iconsByCategory[category.name] ?? "•"}</span>
                  <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-zinc-700/60 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {note ? <p className="text-xs text-zinc-400 mt-4">{note}</p> : null}
      </Reveal>
    </Section>
  );
}
