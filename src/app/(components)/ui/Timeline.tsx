"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { timeline, defaultTimelineIndex } from "../../(data)/timeline";

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

function NodeLabel({ short, year, active }: { short: string; year: string; active: boolean }) {
  return (
    <>
      <span
        className={`block font-mono text-[11px] tracking-[0.12em] whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none ${
          active ? "text-ink" : "text-body-quiet group-hover:text-ink"
        }`}
      >
        {short}
      </span>
      <span className="block font-mono text-[10.5px] tracking-[0.06em] text-body-quiet whitespace-nowrap">
        {year}
      </span>
    </>
  );
}

// The double-slash hinge used on graph axes that do not scale continuously.
function AxisBreak({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 14"
      fill="none"
      aria-hidden="true"
      className={
        vertical
          ? "absolute left-0 top-1/2 h-3.5 w-10 -translate-x-1/2 -translate-y-1/2 rotate-90 text-hairline-strong"
          : "absolute left-0 top-0 h-3.5 w-10 -translate-y-1/2 text-hairline-strong"
      }
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
    <div
      role="group"
      aria-label="Career timeline"
      className="hidden md:flex items-stretch"
    >
      <div className="relative w-[74px] shrink-0">
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
          className="group relative block pt-4 pr-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <span className="absolute left-0 top-0 -translate-y-1/2">
            <Dot active={active === 0} />
          </span>
          <NodeLabel short={first.short} year={first.year} active={active === 0} />
        </button>
      </div>

      <div className="relative w-10 shrink-0">
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
              className="group relative block pt-4 pr-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <span className="absolute left-0 top-0 -translate-y-1/2">
                <Dot active={active === index} />
              </span>
              <NodeLabel short={node.short} year={node.year} active={active === index} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function VerticalRail({ active, onSelect }: RailProps) {
  const { refs, handleKeyDown } = useArrowKeys(onSelect);
  const [first, ...rest] = timeline;

  return (
    <div role="group" aria-label="Career timeline" className="flex flex-col md:hidden">
      <div className="relative" style={{ minHeight: 52 }}>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-hairline-strong" />
        <button
          ref={(node) => {
            refs.current[0] = node;
          }}
          type="button"
          aria-pressed={active === 0}
          onClick={() => onSelect(0)}
          onFocus={() => onSelect(0)}
          onKeyDown={(event) => handleKeyDown(event, 0)}
          className="group relative block w-full pl-5 py-1 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <span className="absolute left-0 top-2 -translate-x-1/2">
            <Dot active={active === 0} />
          </span>
          <NodeLabel short={first.short} year={first.year} active={active === 0} />
        </button>
      </div>

      <div className="relative h-8">
        <AxisBreak vertical />
      </div>

      {rest.map((node, restIndex) => {
        const index = restIndex + 1;
        return (
          <div
            key={node.id}
            className="relative"
            style={{ minHeight: 40 + (node.weight ?? 1) * 20 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-hairline-strong" />
            <button
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              aria-pressed={active === index}
              onClick={() => onSelect(index)}
              onFocus={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="group relative block w-full pl-5 py-1 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <span className="absolute left-0 top-2 -translate-x-1/2">
                <Dot active={active === index} />
              </span>
              <NodeLabel short={node.short} year={node.year} active={active === index} />
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
      <VerticalRail active={active} onSelect={onSelect} />

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
