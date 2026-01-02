"use client";

import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

const principles = [
  "Excel-first, automation-backed -> adoption beats elegance",
  "Governance without friction -> controls that don't slow teams",
  "Decision signals over dashboards -> insight > instrumentation",
];

export default function DesignSystemApproach() {
  return (
    <Section id="approach" title="How I design systems">
      <Reveal>
        <div className="max-w-3xl space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>I don't build &quot;perfect&quot; systems. I build systems that survive contact with reality.</p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            {principles.map((item) => (
              <li key={item} className="text-zinc-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
