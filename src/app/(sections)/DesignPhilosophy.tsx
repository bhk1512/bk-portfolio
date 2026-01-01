"use client";

import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function DesignPhilosophy() {
  return (
    <Section id="design-philosophy" title="How I design systems">
      <Reveal>
        <div className="max-w-3xl space-y-5 text-sm sm:text-base">
          <p className="text-zinc-300 leading-relaxed">
            I don&apos;t build &quot;perfect&quot; systems.
            <br />
            I build systems that survive contact with reality.
          </p>
          <ul className="space-y-2 text-zinc-300">
            <li>• Excel-first, automation-backed → adoption beats elegance</li>
            <li>• Governance without friction → controls that don&apos;t slow teams</li>
            <li>• Decision signals over dashboards → insight &gt; instrumentation</li>
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
