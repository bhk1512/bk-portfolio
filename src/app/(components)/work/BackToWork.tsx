"use client";

import Link from "next/link";

import { rememberRow } from "./returnToRow";

// Returns to the Work section with this case study's row reopened, whether
// the reader arrived from the homepage or straight from a shared link.
export default function BackToWork({ slug }: { slug: string }) {
  return (
    <Link
      href="/#work"
      onClick={() => rememberRow(slug)}
      className="font-mono text-[11px] tracking-[0.06em] text-body-quiet hover:text-ink transition-colors"
    >
      ← All work
    </Link>
  );
}
