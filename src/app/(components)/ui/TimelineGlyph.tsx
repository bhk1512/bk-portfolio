// One domain mark per career node, drawn in a single language: a 24-unit
// grid, one stroke weight matching the site's hairline rules, no fills, no
// gradients, currentColor so each glyph dims and brightens with its node.
//
// These are original domain marks, not institutional identities. No official
// insignia, state emblem, force crest or ministry mark is used anywhere. In
// particular CISF is drawn as a shield, which says "guards installations":
// it is a police force under the Ministry of Home Affairs, and a cap or any
// other uniform element would wrongly read as military.
//
// Every glyph is kept to eight strokes or fewer so it survives at 22px. A
// full aircraft silhouette turns to mush at that size, so SITA is a tail fin.

const PATHS: Record<string, React.ReactNode> = {
  // Analytics: three ascending bars on a baseline.
  zs: (
    <>
      <path d="M4 19.5h16" />
      <path d="M7.5 19.5v-5" />
      <path d="M12 19.5v-9" />
      <path d="M16.5 19.5v-13.5" />
    </>
  ),
  // Intelligence: a lens over open-source material.
  ib: (
    <>
      <circle cx="10.5" cy="10.5" r="5.75" />
      <path d="M14.7 14.7l4.8 4.8" />
    </>
  ),
  // Guards installations. Straight-sided, geometric, not a crest.
  cisf: <path d="M12 3.5 19 6v5.6L12 20.5 5 11.6V6z" />,
  // The break: a mortarboard. Board, cap band and tassel.
  iima: (
    <>
      <path d="M12 4 21 8.2 12 12.4 3 8.2z" />
      <path d="M7.2 10.4v3.9h9.6v-3.9" />
      <path d="M21 8.2v4.6" />
    </>
  ),
  // Power transmission: a lattice tower. The top is flat and the crossarms
  // overhang the legs, or at this size the silhouette reads as a letter A.
  kec: (
    <>
      <path d="M6 20.5 9.5 3.5h5l3.5 17" />
      <path d="M5 8.5h14" />
      <path d="M6 13.5h12" />
    </>
  ),
  // Air transport: a vertical stabiliser sitting on the fuselage line. The
  // fin alone reads as a stray quadrilateral without it.
  sita: (
    <>
      <path d="M6 17.5 13 4.5h4.5v13" />
      <path d="M3.5 17.5h17" />
    </>
  ),
};

type TimelineGlyphProps = {
  id: string;
  className?: string;
};

export default function TimelineGlyph({ id, className = "" }: TimelineGlyphProps) {
  const paths = PATHS[id];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] ${className}`}
    >
      {paths}
    </svg>
  );
}
