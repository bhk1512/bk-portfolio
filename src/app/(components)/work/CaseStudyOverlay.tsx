"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type CaseStudyOverlayProps = {
  children: ReactNode;
};

// Rendered by the intercepting route: the case study sits above the
// homepage, the URL is the real /work/<slug>, and Back closes it and
// restores scroll. Escape and click-outside close it too. No back-link --
// that belongs to the standalone page.
export default function CaseStudyOverlay({ children }: CaseStudyOverlayProps) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        router.back();
      }
    };

    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKey);
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [router]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Case study"
      onClick={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
      className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-black/80 px-0 py-0 sm:px-6 sm:py-10"
    >
      <div
        ref={panelRef}
        className="relative mx-auto w-full max-w-[1100px] min-h-full sm:min-h-0 bg-ground sm:rounded-lg sm:border sm:border-hairline-strong"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => router.back()}
          aria-label="Close case study"
          className="sticky top-4 z-10 ml-auto mr-4 flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-ground/90 text-body-quiet backdrop-blur hover:text-ink hover:border-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            &times;
          </span>
        </button>

        <div className="px-6 sm:px-10 lg:px-14 pb-14 -mt-10">{children}</div>
      </div>
    </div>
  );
}
