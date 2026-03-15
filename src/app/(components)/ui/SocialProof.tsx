"use client";

import Reveal from "./Reveal";

const recognitions = [
  {
    quote:
      "Recognised as Top Talent (OMR 2025) — KEC International's " +
      "high-potential designation, valid through 2027.",
    source: "KEC International · RPG Group",
  },
  {
    quote:
      "Framework recognised by Managing Director; replicated across " +
      "International, Civil, and Transportation business units.",
    source: "KEC International · Business Transformation",
  },
  {
    quote:
      "Recommended for Director General's Commendation Roll for " +
      "program leadership at Defence Expo 2022.",
    source: "Central Industrial Security Force",
  },
];

export default function SocialProof() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Reveal>
        <div className="border-t border-zinc-800/60 pt-10">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">
            Recognition
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {recognitions.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-4 space-y-3"
              >
                <p className="text-sm text-zinc-300 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs text-zinc-500 border-t border-zinc-800/60 pt-2">
                  {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
