"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { timeline, defaultTimelineIndex } from "../../(data)/timeline";
import TimelineGlyph from "./TimelineGlyph";

type RailProps = {
  active: number;
  onSelect: (index: number) => void;
};

function useArrowKeys(onSelect: (index: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % timeline.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + timeline.length) % timeline.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = timeline.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  };

  return { refs, handleKeyDown };
}

function Dot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-[7px] w-[7px] rounded-full transition-colors duration-150 motion-reduce:transition-none ${
        active ? "bg-accent" : "bg-body-quiet group-hover:bg-ink"
      }`}
    />
  );
}

function NodeLabel({
  id,
  short,
  year,
  active,
}: {
  id: string;
  short: string;
  year: string;
  active: boolean;
}) {
  return (
    <>
      <span
        className={`block mb-1.5 transition-colors duration-150 motion-reduce:transition-none ${
          active ? "text-ink" : "text-body-quiet group-hover:text-ink"
        }`}
      >
        <TimelineGlyph id={id} />
      </span>
      <span
        className={`block font-mono text-[9px] sm:text-[11px] tracking-[0.06em] sm:tracking-[0.12em] whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none ${
          active ? "text-ink" : "text-body-quiet group-hover:text-ink"
        }`}
      >
        {short}
      </span>
      <span className="block font-mono text-[8px] sm:text-[10.5px] tracking-[0.02em] sm:tracking-[0.06em] text-body-quiet whitespace-nowrap">
        {year}
      </span>
    </>
  );
}

// The double-slash hinge used on graph axes that do not scale continuously.
function AxisBreak() {
  return (
    <svg
      viewBox="0 0 40 14"
      fill="none"
      aria-hidden="true"
      className="absolute left-0 top-0 h-3 w-5 sm:h-3.5 sm:w-10 -translate-y-1/2 text-hairline-strong"
    >
      <line x1="13" y1="11.5" x2="21" y2="2.5" stroke="currentColor" strokeWidth="1" />
      <line x1="19" y1="11.5" x2="27" y2="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function HorizontalRail({ active, onSelect }: RailProps) {
  const { refs, handleKeyDown } = useArrowKeys(onSelect);
  const [first, ...rest] = timeline;

  return (
    <div role="group" aria-label="Career timeline" className="flex items-stretch">
      <div className="relative w-9 sm:w-[74px] shrink-0">
        <div className="absolute inset-x-0 top-0 h-px bg-hairline-strong" />
        <button
          ref={(node) => {
            refs.current[0] = node;
          }}
          type="button"
          aria-pressed={active === 0}
          onMouseEnter={() => onSelect(0)}
          onFocus={() => onSelect(0)}
          onClick={() => onSelect(0)}
          onKeyDown={(event) => handleKeyDown(event, 0)}
          className="group relative block w-full pt-3 pr-0.5 sm:pt-4 sm:pr-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <span className="absolute left-0 top-0 -translate-y-1/2">
            <Dot active={active === 0} />
          </span>
          <NodeLabel id={first.id} short={first.short} year={first.year} active={active === 0} />
        </button>
      </div>

      <div className="relative w-5 sm:w-10 shrink-0">
        <AxisBreak />
      </div>

      {rest.map((node, restIndex) => {
        const index = restIndex + 1;
        return (
          <div
            key={node.id}
            className="relative min-w-0"
            style={{ flexGrow: node.weight, flexBasis: 0 }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-hairline-strong" />
            <button
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              aria-pressed={active === index}
              onMouseEnter={() => onSelect(index)}
              onFocus={() => onSelect(index)}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="group relative block w-full pt-3 pr-0.5 sm:pt-4 sm:pr-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <span className="absolute left-0 top-0 -translate-y-1/2">
                <Dot active={active === index} />
              </span>
              <NodeLabel id={node.id} short={node.short} year={node.year} active={active === index} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function Timeline() {
  // KEC is revealed on load so the interaction is discoverable.
  const [active, onSelect] = useState(defaultTimelineIndex);

  return (
    <div>
      <HorizontalRail active={active} onSelect={onSelect} />

      {/*
        All six strings stay in the DOM. They are stacked in one grid cell so
        the container is always as tall as the longest line -- revealing a
        different node never moves anything on the page.
      */}
      <div aria-live="polite" className="grid mt-7 md:mt-8">
        {timeline.map((node, index) => (
          <p
            key={node.id}
            aria-hidden={index !== active}
            className={`col-start-1 row-start-1 max-w-[70ch] font-serif text-base sm:text-lg leading-relaxed text-body transition-opacity duration-200 motion-reduce:transition-none ${
              index === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {node.detail}
          </p>
        ))}
      </div>
    </div>
  );
}
