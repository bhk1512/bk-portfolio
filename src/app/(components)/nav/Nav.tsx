"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useActiveSection } from "../../(hooks)/useActiveSection";
import { SECTION_IDS } from "../../(types)/common";
import type { SectionId } from "../../(types)/common";
import ThemeToggle from "../ui/ThemeToggle";

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "On the record", id: "record" },
];

type SectionLinkProps = {
  id: SectionId;
  label: string;
  isHome: boolean;
  className: string;
  onNavigate?: () => void;
};

// The section ids only exist on the homepage. A bare "#work" is a no-op on
// /archive or /work/<slug>, so off-homepage these have to be real links back
// to the homepage with the fragment attached.
function SectionLink({ id, label, isHome, className, onNavigate }: SectionLinkProps) {
  if (isHome) {
    return (
      <a href={`#${id}`} className={className} onClick={onNavigate}>
        {label}
      </a>
    );
  }
  return (
    <Link href={`/#${id}`} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS as unknown as SectionId[]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      id="main-nav"
      className="fixed inset-x-0 top-0 z-[90] border-b border-hairline bg-ground/95 backdrop-blur"
    >
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {isHome ? (
            <a href="#home" className="font-mono text-[13px] tracking-[0.02em] text-ink">
              Bharat Kaushik
            </a>
          ) : (
            <Link href="/" className="font-mono text-[13px] tracking-[0.02em] text-ink">
              Bharat Kaushik
            </Link>
          )}

          <div className="hidden md:flex items-center gap-6 font-mono text-xs tracking-[0.06em] text-body-quiet">
            {NAV_ITEMS.map((item) => (
              <SectionLink
                key={item.id}
                id={item.id}
                label={item.label}
                isHome={isHome}
                className={`transition-colors hover:text-ink ${
                  isHome && active === item.id ? "text-ink" : ""
                }`}
              />
            ))}
            <Link
              href="/archive"
              className={`transition-colors hover:text-ink ${
                pathname === "/archive" ? "text-ink" : ""
              }`}
            >
              Archive
            </Link>
            <a
              href="/Bharat_Kaushik_IIMA.pdf"
              className="transition-colors hover:text-ink"
            >
              CV, PDF
            </a>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline-strong text-ink"
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
          <div className="absolute right-3 left-3 top-3 rounded-2xl border border-hairline-strong bg-ground p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-ink">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 rounded-full border border-hairline-strong text-body-quiet"
                aria-label="Close menu"
              >
                <span aria-hidden>x</span>
              </button>
            </div>
            <div className="mt-3 grid gap-1 font-mono text-sm">
              {NAV_ITEMS.map((item) => (
                <SectionLink
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  isHome={isHome}
                  className="rounded-lg px-3 py-2 text-body-quiet hover:bg-raised hover:text-ink"
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
              <Link
                href="/archive"
                className="rounded-lg px-3 py-2 text-body-quiet hover:bg-raised hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                Archive
              </Link>
              <a
                href="/Bharat_Kaushik_IIMA.pdf"
                className="rounded-lg px-3 py-2 text-body-quiet hover:bg-raised hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                CV, PDF
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
