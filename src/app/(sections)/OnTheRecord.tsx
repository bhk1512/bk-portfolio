// Sourced verbatim from the existing (components)/ui/SocialProof.tsx
// recognitions list.
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

export default function OnTheRecord() {
  return (
    <section id="record" className="scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-10 sm:py-12">
        <div className="flex items-baseline gap-4 pb-4 border-b border-hairline-strong mb-6">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">02</span>
          <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-body-quiet">
            On the record
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
          {recognitions.map((item) => (
            <div key={item.source}>
              <p className="font-serif text-base leading-relaxed text-body mb-3">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-body-quiet">
                {item.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
