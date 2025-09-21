"use client";

import { useEffect, useRef, useState } from "react";

import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

type TimelineItem = {
  key: string;
  label: string;
  year: string;
  details: string;
};

type TooltipBoxProps = TimelineItem & {
  id: string;
  active: boolean;
};

function TooltipBox({ id, label, year, details, active }: TooltipBoxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (!active) {
      setShift(0);
      return;
    }
    const pad = 12;
    const recalc = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = "translateX(-50%)";
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      let delta = 0;
      if (rect.left < pad) delta = pad - rect.left;
      else if (rect.right > vw - pad) delta = vw - pad - rect.right;
      setShift(delta);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [active]);

  if (!active) return null;

  return (
    <div
      id={id}
      role="tooltip"
      ref={ref}
      className="absolute z-20 w-56 max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl animate-[fadeIn_.15s_ease-out]"
      style={{ left: "50%", bottom: "calc(100% + 10px)", transform: `translateX(calc(-50% + ${shift}px))` }}
    >
      <div className="text-zinc-100 text-sm font-medium">
        {label} . {year}
      </div>
      <div className="text-zinc-400 text-xs mt-1 leading-relaxed">{details}</div>
      <div
        className="absolute -bottom-2 w-3 h-3 rotate-45 bg-zinc-950 border-r border-b border-zinc-800"
        style={{ left: `calc(50% - ${shift}px)` }}
      />
    </div>
  );
}

function Timeline() {
  const items: TimelineItem[] = [
    { key: "zs", label: "ZS", year: "2016", details: "Analytics & consulting foundation; ops + data basics." },
    { key: "mha", label: "MHA", year: "2018", details: "Blending tech with risk ops for smarter decisions." },
    { key: "cisf", label: "CISF", year: "2020", details: "Orchestrating people, tech and security under one roof." },
    { key: "iima", label: "IIMA", year: "2024", details: "Strategy & ops deep dive; honed change-management & commercial lens" },
    { key: "kec", label: "KEC", year: "2025", details: "Ongoing..." },
  ];
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="mt-10 select-none">
      <div className="relative">
        <div className="h-[2px] w-full bg-zinc-800 rounded-full" />
        <div className="relative">
          <div className="grid grid-cols-5">
            {items.map((item) => {
              const active = hover === item.key;
              const tooltipId = `tt-${item.key}`;
              return (
                <div
                  key={item.key}
                  className={`relative flex flex-col items-center ${active ? "z-20" : ""}`}
                  onMouseEnter={() => setHover(item.key)}
                  onMouseLeave={() => setHover(null)}
                >
                  <button
                    className={`relative mt-[-7px] h-3.5 w-3.5 rounded-full bg-zinc-300 ring-2 ring-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-transform duration-200 will-change-transform ${active ? "scale-[1.35] shadow-[0_0_0_6px_rgba(224,224,224,0.06)]" : "scale-100"}`}
                    onFocus={() => setHover(item.key)}
                    onBlur={() => setHover(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setHover(null);
                    }}
                    aria-label={`${item.label} ${item.year}`}
                    aria-describedby={active ? tooltipId : undefined}
                    aria-expanded={active}
                  />
                  <button
                    className="mt-3 text-center focus:outline-none"
                    onFocus={() => setHover(item.key)}
                    onBlur={() => setHover(null)}
                    aria-label={`${item.label} ${item.year} details`}
                  >
                    <div className={`text-sm ${active ? "text-zinc-100 font-semibold" : "text-zinc-200 font-medium"}`}>
                      {item.label}
                    </div>
                    <div className={`text-xs ${active ? "text-zinc-300" : "text-zinc-400"}`}>{item.year}</div>
                  </button>

                  <TooltipBox
                    id={tooltipId}
                    label={item.label}
                    year={item.year}
                    details={item.details}
                    active={active}
                    key={`tooltip-${item.key}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" title="About">
      <Reveal>
        <section id="timeline" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">Career timeline</h2>
          <div className="mt-6">
            <Timeline />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="mt-12 max-w-3xl mx-auto space-y-6">
            <p className="text-zinc-300 leading-relaxed text-justify">
              Every day, I connect the dots: bridging teams, streamlining workflows, and translating analytics into smarter operations.
            </p>
            <p className="text-zinc-300 leading-relaxed text-justify">
              From laying the analytics foundation at ZS to integrating solutions across operations, I&apos;ve learned one truth: clarity, collaboration, and tech are what make execution thrive.
              <br />
              Now, I help cut through uncertainty so we can move faster, smarter and build a future rooted in confident, clear execution.
            </p>
          </div>
        </section>
      </Reveal>
    </Section>
  );
}