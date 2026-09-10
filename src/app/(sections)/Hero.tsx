"use client";

import { heroData } from "../(data)/hero";
import { contactInfo } from "../(data)/contact";
import Timeline from "../(components)/ui/Timeline";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-10 sm:pb-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mb-6">
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-accent">
            {heroData.availability}
          </span>
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-body-quiet">
            Gurugram · GMT+5:30
          </span>
        </div>

        <h1 className="font-serif font-light text-[clamp(34px,6.5vw,64px)] leading-[1.06] tracking-[-0.02em] max-w-[30ch] text-ink mb-6">
          {heroData.subhead}
        </h1>

        <p className="text-ink/90 font-serif text-lg sm:text-xl leading-[1.5] max-w-[70ch] mb-8">
          Seven years across analytics, intelligence, critical infrastructure
          and now air transport, with an IIM Ahmedabad MBA in the middle of it.
          In each one I built something the organisation didn&apos;t have.
        </p>

        <div className="flex flex-wrap gap-7 items-center font-mono text-[13px] tracking-[0.02em]">
          {heroData.ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className="text-accent border-b border-accent/40 pb-1 hover:text-ink hover:border-ink transition-colors"
            >
              {cta.label === "Download CV" ? "Curriculum vitae, PDF" : contactInfo.email}
            </a>
          ))}
        </div>

        <div className="mt-14 sm:mt-16">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
