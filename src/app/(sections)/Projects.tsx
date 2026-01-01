"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { projects } from "../(data)/projects";
import type { Project } from "../(types)/project";
import { useModal } from "../(hooks)/useModal";
import Modal from "../(components)/ui/Modal";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";
import ProjectCard from "../(components)/projects/ProjectCard";
import TeardownCard from "../(components)/projects/TeardownCard";
import StandardProjectModal from "../(components)/projects/StandardProjectModal";
import TeardownModal from "../(components)/projects/TeardownModal";


export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const { isOpen, open, close, modalRef } = useModal({
    onClose: () => setActiveId(null),
  });

  const activeProject = useMemo<Project | null>(() => {
    return projects.find((project) => project.id === activeId) ?? null;
  }, [activeId]);

  const flagshipProjects = projects.filter((project) => project.flagship);
  const selectedWork = projects.filter((project) => !project.flagship);
  const filters = [
    "All",
    "Decision Systems",
    "Governance",
    "Product & Strategy",
    "Program Execution",
  ];
  const filteredWork =
    activeFilter === "All"
      ? selectedWork
      : selectedWork.filter((project) => project.archetype === activeFilter);

  const scrollTo = useCallback((targetId: string) => {
    const container = modalRef.current;
    if (!container) return;
    const element = container.querySelector<HTMLElement>(`#${targetId}`);
    if (!element) return;
    const sticky = container.querySelector<HTMLElement>('[data-sticky-nav]');
    const stickyHeader = sticky ? sticky.getBoundingClientRect().height + 16 : 64;
    container.scrollTo({ top: element.offsetTop - stickyHeader, behavior: "smooth" });
  }, [modalRef]);

  const handleOpen = useCallback((projectId: string, scrollTarget?: string) => {
    setActiveId(projectId);
    setPendingScroll(scrollTarget ?? null);
    open();
  }, [open]);

  const activeProjectId = activeProject?.id;
  useEffect(() => {
    if (isOpen && pendingScroll) {
      requestAnimationFrame(() => {
        scrollTo(pendingScroll);
        setPendingScroll(null);
      });
    }
  }, [isOpen, pendingScroll, scrollTo, activeProjectId]);

  return (
    <>
      <Section id="flagship" title="Flagship Projects">
        <p className="text-sm text-zinc-400 mb-5">
          Three projects that best represent how I work: decision systems, execution at scale, and productised automation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipProjects.map((project, index) => {
            const openProject = (scrollTarget?: string) => handleOpen(project.id, scrollTarget);

            return (
              <Reveal key={project.id} delay={index * 60}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openProject()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject();
                    }
                  }}
                  className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl cursor-pointer"
                  aria-haspopup="dialog"
                  aria-expanded={activeId === project.id}
                >
                  {project.teardown ? (
                    <TeardownCard project={project} onOpen={() => openProject()} />
                  ) : (
                    <ProjectCard project={project} onOpen={openProject} />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-zinc-800/60 mt-2" />
      </div>

      <div className="mt-10">
        <Section id="work" title="Selected Work">
          <p className="text-sm text-zinc-400 mb-2">
            Shipped systems, experiments, and teardowns -- organised by the kind of problem they solve.
          </p>
          <p className="text-xs text-zinc-500 mb-5">
            Org/client names are omitted where needed; scope, approach, and outcomes are real.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className={
                  "rounded-full border px-3 py-1 text-xs transition " +
                  (activeFilter === label
                    ? "border-zinc-200 bg-zinc-100 text-zinc-900"
                    : "border-zinc-800/70 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-900/70")
                }
              >
                {label}
              </button>
            ))}
          </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWork.map((project, index) => {
            const openProject = () => handleOpen(project.id);

            return (
              <Reveal key={project.id} delay={index * 60}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={openProject}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject();
                    }
                  }}
                  className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl cursor-pointer"
                  aria-haspopup="dialog"
                  aria-expanded={activeId === project.id}
                >
                  {project.teardown ? (
                    <TeardownCard project={project} onOpen={openProject} />
                  ) : (
                    <ProjectCard project={project} />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
        </Section>
      </div>

      <Modal isOpen={isOpen && !!activeProject} onClose={close} labelledBy="case-title">
        {activeProject?.teardown ? (
          <TeardownModal
            project={activeProject}
            onClose={close}
            modalRef={modalRef}
            scrollTo={scrollTo}
          />
        ) : activeProject ? (
          <StandardProjectModal
            project={activeProject}
            onClose={close}
            modalRef={modalRef}
            scrollTo={scrollTo}
          />
        ) : null}
      </Modal>
    </>
  );
}
