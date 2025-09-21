"use client";

import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: SectionProps) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${window.location.pathname}#${id}`,
      );
    } catch {
      // ignore
    }
  };

  return (
    <section
      id={id}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      style={{ contentVisibility: "auto" }}
    >
      {title ? (
        <div className="group flex items-center gap-2 mb-6">
          <h2 className="text-[clamp(22px,3.6vw,30px)] font-semibold tracking-tight text-zinc-100">
            {title}
          </h2>
          <button
            onClick={onCopy}
            aria-label={`Copy link to ${title}`}
            className="opacity-0 group-hover:opacity-100 transition opacity-100 sm:opacity-0 text-zinc-400 hover:text-zinc-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded"
            title="Copy section link"
          >
            #
          </button>
        </div>
      ) : null}
      {children}
    </section>
  );
}