import Image from "next/image";

import type { Project } from "../../(types)/project";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import ActionButtons from "./ActionButtons";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
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
      {project.stack ? <div className="text-xs text-zinc-400 mb-2">{project.stack}</div> : null}
      {project.summary ? <p className="text-sm text-zinc-300">{project.summary}</p> : null}
      {project.metrics?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={metric} className="border-zinc-700/70 bg-zinc-950/60 text-zinc-300">
              {metric}
            </Badge>
          ))}
        </div>
      ) : null}
      <ActionButtons
        demoHref={project.demoLink}
        prdHref={project.prdLink}
        onClick={(event) => event.stopPropagation()}
      />
    </Card>
  );
}