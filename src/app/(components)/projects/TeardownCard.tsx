import type { MouseEvent } from "react";
import Image from "next/image";

import type { Project } from "../../(types)/project";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

type TeardownCardProps = {
  project: Project;
  onOpen: () => void;
};

export default function TeardownCard({ project, onOpen }: TeardownCardProps) {
  const teardown = project.teardown;
  if (!teardown) return null;

  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600";
  const primary = "bg-zinc-100 text-zinc-900 hover:bg-white";
  const ghost = "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  return (
    <Card>
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
      {project.stack ? <div className="text-xs text-zinc-400 mb-1">{project.stack}</div> : null}
      <p className="text-sm text-zinc-300 leading-6">{teardown.description}</p>
      {project.metrics?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={metric} className="border-zinc-700/70 bg-zinc-950/60 text-zinc-300">
              {metric}
            </Badge>
          ))}
        </div>
      ) : null}
      {teardown.actions?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {teardown.actions.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className={`${base} ${index === 0 ? primary : ghost}`}
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <button type="button" onClick={handleOpen} className={`${base} ${ghost}`}>
            View Breakdown
          </button>
        </div>
      )}
    </Card>
  );
}