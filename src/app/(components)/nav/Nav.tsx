"use client";

import { useState } from "react";
import { useActiveSection } from "../../(hooks)/useActiveSection";
import { SECTION_IDS } from "../../(types)/common";
import type { SectionId } from "../../(types)/common";

const NAV_ITEMS: { href: `#${SectionId}`; label: string; id: SectionId }[] = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#impact", label: "Impact", id: "impact" },
  { href: "#about", label: "About", id: "about" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const active = useActiveSection(SECTION_IDS as unknown as SectionId[]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="main-nav" className="fixed inset-x-0 top-3 z-[90]">
      <nav className="max-w-6xl mx-auto px-3">
        <div className="flex items-center justify-between rounded-full border border-zinc-900 bg-black/90 backdrop-blur px-3 sm:px-4 h-12 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]">
          <a href="#home" className="flex items-center gap-2 text-zinc-100 font-medium">
            BK
          </a>

          <div className="hidden md:flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm transition hover:text-white ${active === item.id ? "text-white" : "text-zinc-200"}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span aria-hidden>&#9776;</span>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[60] bg-black/70"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setMobileOpen(false);
            }
          }}
        >
          <div className="absolute right-3 left-3 top-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-100 font-medium">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 rounded-full border border-zinc-700 text-zinc-200"
                aria-label="Close menu"
              >
                <span aria-hidden>x</span>
              </button>
            </div>
            <div className="mt-3 grid gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}



