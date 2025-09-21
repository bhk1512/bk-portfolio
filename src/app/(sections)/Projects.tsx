"use client";

import { useCallback, useMemo, useState } from "react";

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
  const { isOpen, open, close, modalRef } = useModal({
    onClose: () => setActiveId(null),
  });

  const activeProject = useMemo<Project | null>(() => {
    return projects.find((project) => project.id === activeId) ?? null;
  }, [activeId]);

  const scrollTo = useCallback((targetId: string) => {
    const container = modalRef.current;
    if (!container) return;
    const element = container.querySelector<HTMLElement>(`#${targetId}`);
    if (!element) return;
    const sticky = container.querySelector<HTMLElement>('[data-sticky-nav]');
    const stickyHeader = sticky ? sticky.getBoundingClientRect().height + 16 : 64;
    container.scrollTo({ top: element.offsetTop - stickyHeader, behavior: "smooth" });
  }, [modalRef]);

  const handleOpen = useCallback((projectId: string) => {
    setActiveId(projectId);
    open();
  }, [open]);

  return (
    <Section id="work" title="Recent Projects">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
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
    </Section>
  );
}
