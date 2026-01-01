"use client";

import Image from "next/image";
import { useState } from "react";
import type { MutableRefObject } from "react";

import type { Project } from "../../(types)/project";

type StandardProjectModalProps = {
  project: Project;
  onClose: () => void;
  modalRef: MutableRefObject<HTMLDivElement | null>;
  scrollTo: (id: string) => void;
};

export default function StandardProjectModal({ project, onClose, modalRef, scrollTo }: StandardProjectModalProps) {
  const actionLinks = (project.actions?.length
    ? project.actions.filter((action) => action.kind !== "modal" && action.href)
    : [
        project.demoLink ? { href: project.demoLink, label: "View Demo" } : null,
        project.prdLink ? { href: project.prdLink, label: "Full PRD" } : null,
      ].filter(Boolean)) as { href: string; label: string }[];
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600";
  const ghost = "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";
  const primary = "bg-zinc-100 text-zinc-900 hover:bg-white";
  const primaryScreenshot = project.screenshots?.[0];
  const secondaryScreenshot = project.screenshots?.[1];
  const navItems = [
    { id: "p-summary", label: "Summary" },
    { id: "p-problem", label: "Problem" },
    { id: "p-approach", label: "Action" },
    { id: "p-outcome", label: "Result" },
    { id: "p-learnings", label: "Learnings" },
    ...(project.maskedScreens?.items?.length ? [{ id: "p-masked", label: "Masked Screens" }] : []),
    ...(project.artifacts?.length ? [{ id: "p-artifacts", label: "Artifacts" }] : []),
  ];

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 overflow-y-auto overscroll-contain scroll-smooth"
      style={{ scrollbarGutter: "stable both-edges" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id="case-title" className="text-xl text-zinc-100 font-semibold">
            {project.title}
          </h3>
          <div className="text-sm text-zinc-400 mt-1">
            {project.year}
            {project.stack ? ` - ${project.stack}` : ""}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          {actionLinks.length ? (
            <div className="flex flex-wrap justify-end gap-2">
              {actionLinks.map((action, index) => (
                <a
                  key={action?.label}
                  href={action?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${base} ${index === 0 ? primary : ghost}`}
                >
                  {action?.label}
                </a>
              ))}
            </div>
          ) : null}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
            aria-label="Close"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-10 pt-2" data-sticky-nav>
        <div className="mx-auto flex items-center justify-center rounded-full border border-zinc-800 bg-black/80 backdrop-blur px-3 h-10">
          <nav className="flex items-center gap-4 text-[13px] text-zinc-300">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-white">
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div id="p-summary" className="mt-4">
        {primaryScreenshot?.src ? (
          <div className="relative mb-3 overflow-hidden rounded-xl ring-1 ring-zinc-800/60" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={primaryScreenshot.src}
              alt={primaryScreenshot.alt ?? `${project.title} screenshot`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        ) : null}
        {project.summary ? <p className="text-zinc-300">{project.summary}</p> : null}
        {project.context ? (
          <p className="mt-3 text-sm text-zinc-400 italic">{project.context}</p>
        ) : null}
      </div>

      <div id="p-problem" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Problem</h4>
        {Array.isArray(project.problem) ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.problem.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : project.problem ? (
          <p className="text-sm text-zinc-300">{project.problem}</p>
        ) : null}
      </div>

      <div id="p-approach" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Action</h4>
        {secondaryScreenshot?.src ? (
          <div className="relative mb-3 overflow-hidden rounded-xl ring-1 ring-zinc-800/60" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={secondaryScreenshot.src}
              alt={secondaryScreenshot.alt ?? `${project.title} detail`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        ) : null}
        {project.approach ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.approach.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div id="p-outcome" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Result</h4>
        {project.outcome ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.outcome.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div id="p-learnings" className="mt-6">
        <h4 className="text-zinc-200 font-medium mb-2">Learnings</h4>
        {Array.isArray(project.learnings) ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.learnings.map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
        ) : project.learnings ? (
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            <li>{project.learnings}</li>
          </ul>
        ) : null}
      </div>
      {project.maskedScreens?.items?.length ? (
        <div id="p-masked" className="mt-6">
          <h4 className="text-zinc-200 font-medium mb-2">{project.maskedScreens.title}</h4>
          <p className="text-sm text-zinc-400 mb-4">{project.maskedScreens.note}</p>
          <div className="grid gap-5">
            {project.maskedScreens.items.map((item) => (
              <MaskedScreenItem key={item.src} item={item} />
            ))}
          </div>
        </div>
      ) : null}
      {project.artifacts?.length ? (
        <div id="p-artifacts" className="mt-6">
          <h4 className="text-zinc-200 font-medium mb-2">Artifacts</h4>
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {project.artifacts.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type MaskedScreenItemProps = {
  item: { src: string; alt: string; callouts: string[] };
};

function MaskedScreenItem({ item }: MaskedScreenItemProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-900/40">
        {failed ? (
          <div className="flex min-h-[180px] items-center justify-center text-xs text-zinc-500">
            {item.src}
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            className="h-auto w-full object-cover"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        )}
      </div>
      <ul className="mt-3 list-disc list-inside text-sm text-zinc-300 space-y-1">
        {item.callouts.map((callout) => (
          <li key={callout}>{callout}</li>
        ))}
      </ul>
    </div>
  );
}
