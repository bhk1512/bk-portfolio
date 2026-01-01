import Image from "next/image";

import type { Project } from "../../(types)/project";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import ActionButtons from "./ActionButtons";

type ProjectCardProps = {
  project: Project;
  onOpen?: (scrollTarget?: string) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const customActions = project.actions?.length ? project.actions : null;
  const showFlagship = Boolean(project.flagship);
  const showArchetype = Boolean(project.archetype);

  return (
    <Card>
      {showFlagship || showArchetype ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {showFlagship && project.flagshipLabel ? (
            <span className="rounded-full border border-zinc-800/70 bg-zinc-900/60 px-2.5 py-1 text-[11px] text-zinc-300">
              {project.flagshipLabel}
            </span>
          ) : null}
          {(showFlagship || !showFlagship) && project.archetype ? (
            <span className="rounded-full border border-zinc-800/70 bg-zinc-950/50 px-2.5 py-1 text-[11px] text-zinc-400">
              {project.archetype}
            </span>
          ) : null}
        </div>
      ) : null}
      {project.cover?.src ? (
        <div className="group relative mb-3 h-40 overflow-hidden rounded-xl ring-1 ring-zinc-800/60">
          <Image
            src={project.cover.src}
            alt={project.cover.alt || `${project.title} cover`}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-zinc-100 font-medium">{project.title}</h3>
        {project.year ? <span className="text-xs text-zinc-400">{project.year}</span> : null}
      </div>
      {project.stack ? <div className="text-xs text-zinc-400 mb-2">{project.stack}</div> : null}
      {project.cardSummary || project.summary ? (
        <p className="text-sm text-zinc-300">{project.cardSummary ?? project.summary}</p>
      ) : null}
      {project.proof ? (
        <p className="mt-2 text-xs text-zinc-500">{project.proof}</p>
      ) : null}
      {project.metrics?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={metric} className="border-zinc-700/70 bg-zinc-950/60 text-zinc-300">
              {metric}
            </Badge>
          ))}
        </div>
      ) : null}
      {customActions ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {customActions.map((action, index) =>
            action.kind === "modal" ? (
              <button
                key={action.label}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen?.(action.scrollTo);
                }}
                className={
                  "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600 " +
                  (index === 0
                    ? "bg-zinc-100 text-zinc-900 hover:bg-white"
                    : "border border-zinc-700 text-zinc-100 hover:bg-zinc-900")
                }
              >
                {action.label}
              </button>
            ) : (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className={
                  "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600 " +
                  (index === 0
                    ? "bg-zinc-100 text-zinc-900 hover:bg-white"
                    : "border border-zinc-700 text-zinc-100 hover:bg-zinc-900")
                }
              >
                {action.label}
              </a>
            )
          )}
        </div>
      ) : (
        <ActionButtons
          demoHref={project.demoLink}
          prdHref={project.prdLink}
          onClick={(event) => event.stopPropagation()}
        />
      )}
    </Card>
  );
}
