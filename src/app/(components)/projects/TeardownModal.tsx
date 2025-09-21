"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { MutableRefObject } from "react";

import type { Project } from "../../(types)/project";
import RetentionFlow from "../charts/RetentionFlow";
import MarketShareRadial from "../charts/MarketShareRadial";

type TeardownModalProps = {
  project: Project;
  onClose: () => void;
  modalRef: MutableRefObject<HTMLDivElement | null>;
  scrollTo: (id: string) => void;
};

export default function TeardownModal({ project, onClose, modalRef, scrollTo }: TeardownModalProps) {
  const teardown = project.teardown!;
  const navItems = teardown.nav ?? [
    { id: "td-overview", label: "Overview" },
    { id: "td-market", label: "Market" },
    { id: "td-ux", label: "UX" },
    { id: "td-growth", label: "Growth" },
    { id: "td-recs", label: "Recommendations" },
    { id: "td-next", label: "Next" },
  ];
  const baseCard = "rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4";
  const statCard = "group rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4 transition hover:border-emerald-400/60 hover:shadow-[0_0_32px_-16px_rgba(16,185,129,0.7)]";
  const phases = useMemo(() => teardown.uxJourney?.phases ?? [], [teardown]);
  const [activeStage, setActiveStage] = useState(phases[0]?.id ?? "");
  useEffect(() => {
    setActiveStage(phases[0]?.id ?? "");
  }, [project.id, phases]);
  const activePhase = useMemo(
    () => phases.find((phase) => phase.id === activeStage) ?? phases[0],
    [phases, activeStage]
  );
  const reviewSummary = teardown.uxJourney?.reviewSummary ?? [];
  const maxReview = reviewSummary.reduce((max, item) => Math.max(max, item.value), 0);
  const market = teardown.marketSnapshot;

  const recommendationAccent = (accent?: string) => {
    switch (accent) {
      case "emerald":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
      case "teal":
        return "border-teal-500/40 bg-teal-500/10 text-teal-200";
      case "violet":
        return "border-violet-500/40 bg-violet-500/10 text-violet-200";
      case "amber":
        return "border-amber-500/40 bg-amber-500/10 text-amber-200";
      default:
        return "border-zinc-700/70 bg-zinc-900/60 text-zinc-200";
    }
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:max-w-5xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 overflow-y-auto overscroll-contain scroll-smooth"
      style={{ scrollbarGutter: "stable both-edges" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 id="case-title" className="text-2xl font-semibold text-zinc-50 leading-8">{teardown.heading}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
            {project.year ? <span>{project.year}</span> : null}
            {project.stack ? <span>&bull; {project.stack}</span> : null}
            {teardown.subheading ? <span>&bull; {teardown.subheading}</span> : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {teardown.actions?.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600 ${index === 0 ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'border border-zinc-700 text-zinc-100 hover:bg-zinc-900'}`}

            >
              {action.label}
            </a>
          ))}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
            aria-label="Close"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-20 mt-6" data-sticky-nav>
        <div className="flex flex-wrap items-center gap-3 rounded-full border border-zinc-800 bg-black/80 backdrop-blur px-4 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[13px] text-zinc-300 hover:text-white focus:text-white focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section id="td-overview" className="mt-8 space-y-6">
        <p className="text-sm text-zinc-300 leading-6">{teardown.description}</p>
        {teardown.stats?.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {teardown.stats.map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className={statCard}>
                <div className="text-2xl font-semibold text-zinc-50">{stat.value}</div>
                <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        ) : null}



        




{teardown.leakMap ? (
  <div className="space-y-4">
    <RetentionFlow stages={teardown.leakMap.stages} issues={teardown.leakMap.issues} />
  </div>
) : null}










        {teardown.execSummary ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-emerald-300 mb-2">Strengths</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.strengths.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-rose-300 mb-2">Weaknesses</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.weaknesses.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-emerald-300 mb-2">Opportunities</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.opportunities.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-rose-300 mb-2">Threats</h4>
              <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                {teardown.execSummary.threats.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        ) : null}
        {teardown.keyPainPoints?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-rose-300 mb-2">Key pain points</h4>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              {teardown.keyPainPoints.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ) : null}
      </section>

      <section id="td-market" className="mt-10 space-y-6">
        {market ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
            <div className="flex items-center justify-center">
              <MarketShareRadial leader={market.leader} competitors={market.competitors} />
            </div>
            <div className={baseCard}>
              <h4 className="text-sm font-semibold text-zinc-200 mb-2">Market snapshot</h4>
              <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
                {market.bullets.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        ) : null}
        {teardown.growth?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">Distribution levers</h4>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              {teardown.growth.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ) : null}
      </section>

      <section id="td-ux" className="mt-10 space-y-6">
        {phases.length ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setActiveStage(phase.id)}
                  className={`rounded-full border px-3 py-1 text-xs sm:text-sm transition ${activeStage === phase.id ? 'border-zinc-100 text-zinc-50 bg-zinc-900' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}
                >
                  {phase.title}
                </button>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,220px)_1fr]">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3">
                {activePhase?.screenshot?.src ? (
                  <div className="relative h-44 w-full overflow-hidden rounded-xl">
                    <Image
                      src={activePhase.screenshot.src}
                      alt={activePhase.screenshot.alt ?? `${activePhase.title} stage`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 220px, 100vw"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[120px] items-center justify-center text-xs text-zinc-400">
                    <span>Add a journey screenshot</span>
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {activePhase?.annotations.map((note) => (
                  <li
                    key={note.text}
                    className={`rounded-xl border px-3 py-2 text-sm ${note.tone === 'positive' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100' : 'border-rose-500/40 bg-rose-500/10 text-rose-100'}`}
                  >
                    {note.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {reviewSummary.length ? (
          <div className={baseCard}>
            <div className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
              {teardown.uxJourney?.sourceLabel ?? "Review insights"}
            </div>
            <div className="mt-3 space-y-3">
              {reviewSummary.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{item.label}</span>
                    <span className="text-zinc-200">{item.value}%</span>
                  </div>
                  <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`absolute inset-y-0 left-0 ${item.tone === 'negative' ? 'bg-rose-500/70' : 'bg-emerald-500/70'}`}
                      style={{ width: `${maxReview ? Math.max(10, Math.round((item.value / maxReview) * 100)) : 0}%` }}
                    />
                  </div>
                  {item.note ? <div className="mt-1 text-xs text-zinc-500">{item.note}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section id="td-growth" className="mt-10 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {teardown.working?.length ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
              <div className="text-sm font-semibold text-emerald-200 mb-2">What is working</div>
              <ul className="text-sm text-emerald-50/90 space-y-1 list-disc list-inside">
                {teardown.working.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          ) : null}
          {teardown.breaking?.length ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4">
              <div className="text-sm font-semibold text-rose-100 mb-2">Where it breaks</div>
              <ul className="text-sm text-rose-50/90 space-y-1 list-disc list-inside">
                {teardown.breaking.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          ) : null}
        </div>
        {teardown.growthSummary ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">{teardown.growthSummary.headline}</h4>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300 mb-3">
              {teardown.growthSummary.tiles.map((tile) => (
                <span key={tile} className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1">{tile}</span>
              ))}
            </div>
            <div className="relative mt-2 h-20 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 p-4 text-sm text-zinc-300">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,transparent_0%,transparent_40%,rgba(34,197,94,0.25)_40%,rgba(34,197,94,0.25)_70%,transparent_70%)]" aria-hidden />
              <p className="relative">{teardown.growthSummary.retentionNote}</p>
            </div>
          </div>
        ) : null}
      </section>

      <section id="td-recs" className="mt-10 space-y-6">
        {teardown.recommendationSets?.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {teardown.recommendationSets.map((set) => (
              <div key={set.id} className={`rounded-2xl border p-4 space-y-3 ${recommendationAccent(set.accent)}`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>{set.icon}</span>
                  <span>{set.title}</span>
                </div>
                <ul className="text-sm text-zinc-200 space-y-1 list-disc list-inside">
                  {set.bullets.map((item) => (<li key={item}>{item}</li>))}
                </ul>
                <div className="text-xs text-zinc-100/80">{set.metric}</div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section id="td-next" className="mt-10 space-y-6">
        {teardown.conclusion ? (
          <div className={baseCard}>
            <div className="text-sm font-semibold text-zinc-200 mb-2">{teardown.conclusion.headline}</div>
            <blockquote className="border-l-2 border-zinc-600 pl-3 text-lg text-zinc-100 leading-7">
              {teardown.conclusion.quote}
            </blockquote>
          </div>
        ) : null}
        {teardown.nextActionsDetailed?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">What I&apos;d do next</h4>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              {teardown.nextActionsDetailed.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ) : null}
        {teardown.visuals?.length ? (
          <div className={baseCard}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">Visuals to drop in</h4>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
              {teardown.visuals.map((asset) => (
                <span key={asset.label} className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1">
                  {asset.label}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {teardown.explore?.length ? (
          <div className="flex flex-wrap gap-2">
            {teardown.explore.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600 ${index === 0 ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'border border-zinc-700 text-zinc-100 hover:bg-zinc-900'}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
