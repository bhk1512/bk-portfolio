"use client";

import { useCallback, useMemo, useState } from "react";
import type { MutableRefObject } from "react";

import { impacts } from "../(data)/impacts";
import type { ImpactItem } from "../(types)/common";
import { useModal } from "../(hooks)/useModal";
import Card from "../(components)/ui/Card";
import Modal from "../(components)/ui/Modal";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

type ImpactModalContentProps = {
  item: ImpactItem;
  onClose: () => void;
  modalRef: MutableRefObject<HTMLDivElement | null>;
  scrollTo: (id: string) => void;
};

function ImpactModalContent({ item, onClose, modalRef, scrollTo }: ImpactModalContentProps) {
  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-none sm:rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 overflow-y-auto overscroll-contain scroll-smooth"
      style={{ scrollbarGutter: "stable both-edges" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="impact-title" className="text-xl text-zinc-100 font-semibold">
            {item.title}
          </h3>
          {item.subtitle ? <div className="text-sm text-zinc-400 mt-1">{item.subtitle}</div> : null}
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
          aria-label="Close"
        >
          <span aria-hidden>&times;</span>
        </button>
      </div>

      <div className="sticky top-0 z-10 pt-2" data-sticky-nav>
        <div className="mx-auto flex items-center justify-center rounded-full border border-zinc-800 bg-black/80 backdrop-blur px-3 h-10">
          <nav className="flex items-center gap-4 text-[13px] text-zinc-300">
            <button onClick={() => scrollTo("i-problem")} className="hover:text-white">
              Problem
            </button>
            <button onClick={() => scrollTo("i-action")} className="hover:text-white">
              Action
            </button>
            <button onClick={() => scrollTo("i-result")} className="hover:text-white">
              Result
            </button>
            <button onClick={() => scrollTo("i-learnings")} className="hover:text-white">
              Learnings
            </button>
          </nav>
        </div>
      </div>

      <div id="i-problem" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Problem</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {item.problem?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div id="i-action" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Action</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {item.action?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div id="i-result" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Result</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {item.outcome?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div id="i-learnings" className="mt-4">
        <h4 className="text-zinc-200 font-medium mb-2">Learnings</h4>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          {item.learnings?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Impact() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isOpen, open, close, modalRef } = useModal({
    onClose: () => setActiveId(null),
  });

  const activeItem = useMemo<ImpactItem | null>(() => {
    return impacts.find((impact) => impact.id === activeId) ?? null;
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

  const handleOpen = useCallback((impactId: string) => {
    setActiveId(impactId);
    open();
  }, [open]);

  return (
    <Section id="impact" title="Impact">
      <p className="text-sm text-zinc-400 mb-4">
        Proof of scale and outcomes across roles and environments
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {impacts.map((item, index) => (
          <Reveal key={item.id} delay={index * 60}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleOpen(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleOpen(item.id);
                }
              }}
              className="text-left w-full focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-2xl cursor-pointer"
              aria-haspopup="dialog"
              aria-expanded={activeId === item.id}
            >
              <Card>
                <div className="text-zinc-100 font-medium">{item.title}</div>
                {item.subtitle ? <div className="text-zinc-400 text-sm">{item.subtitle}</div> : null}
                {item.outcome?.length ? (
                  <ul className="mt-3 text-xs text-zinc-400 list-disc list-inside space-y-1">
                    {item.outcome.slice(0, 2).map((value, outcomeIndex) => (
                      <li key={outcomeIndex}>{value}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </div>
          </Reveal>
        ))}
      </div>

      <Modal isOpen={isOpen && !!activeItem} onClose={close} labelledBy="impact-title">
        {activeItem ? (
          <ImpactModalContent item={activeItem} onClose={close} modalRef={modalRef} scrollTo={scrollTo} />
        ) : null}
      </Modal>
    </Section>
  );
}
