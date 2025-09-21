import { Fragment, useMemo } from "react";

type MarketShareRadialProps = { leader: { label: string; value: number }; competitors: { label: string; value: number }[]; };

export default function MarketShareRadial({ leader, competitors }: MarketShareRadialProps) {
  const segments = useMemo(() => {
    if (!leader) return [] as Array<{ label: string; value: number; color: string; textColor: string }>;
    const palette = [
      { bg: "#22c55e", text: "#bbf7d0" },
      { bg: "#38bdf8", text: "#bae6fd" },
      { bg: "#f97316", text: "#fed7aa" },
      { bg: "#c084fc", text: "#e9d5ff" },
      { bg: "#facc15", text: "#fef08a" },
    ];
    const data = [leader, ...(competitors ?? [])]
      .filter(Boolean)
      .map((segment) => ({
        label: segment.label,
        value: Math.max(0, segment.value ?? 0),
      }));
    return data.map((segment, index) => ({
      ...segment,
      color: palette[index % palette.length].bg,
      textColor: palette[index % palette.length].text,
    }));
  }, [leader, competitors]);

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  if (!total || !segments.length) {
    return (
      <div className="relative h-56 w-56 sm:h-60 sm:w-60">
        <div className="absolute inset-0 rounded-full border border-zinc-800/60 bg-zinc-900" />
        <div className="absolute inset-12 flex items-center justify-center rounded-full bg-black/70 text-xs text-zinc-400">
          No market data
        </div>
      </div>
    );
  }

  let cumulative = 0;
  const gradientStops: string[] = [];
  const labelRadius = 56;
  const pointerRadius = 47;
  const labeledSegments = segments.map((segment) => {
    const start = (cumulative / total) * 100;
    cumulative += segment.value;
    const end = (cumulative / total) * 100;
    gradientStops.push(segment.color + ' ' + start + '% ' + end + '%');
    const midpoint = (start + end) / 2;
    const angle = (midpoint / 100) * Math.PI * 2 - Math.PI / 2;
    const pointerX = 50 + Math.cos(angle) * pointerRadius;
    const pointerY = 50 + Math.sin(angle) * pointerRadius;
    const labelX = 50 + Math.cos(angle) * labelRadius;
    const labelY = 50 + Math.sin(angle) * labelRadius;
    const alignRight = labelX >= 50;
    return {
      ...segment,
      pointerX,
      pointerY,
      labelX,
      labelY,
      alignRight,
      translateX: alignRight ? '0%' : '-100%',
      justify: alignRight ? 'flex-start' : 'flex-end',
    };
  });

  const gradient = 'conic-gradient(' + gradientStops.join(', ') + ')';
  const leaderSegment = segments[0];

  return (
    <div className="relative mx-auto h-56 w-56 sm:h-60 sm:w-60">
      <div className="absolute inset-0 rounded-full border border-zinc-800/60 bg-zinc-900" />
      <div className="absolute inset-3 rounded-full" style={{ background: gradient }} />
      <div className="absolute inset-3 rounded-full border border-black/20" />
      <div className="absolute inset-12 flex flex-col items-center justify-center rounded-full bg-black/80 text-center">
        <div className="text-3xl font-semibold text-zinc-100">{Math.round(leaderSegment?.value ?? 0)}%</div>
        <div className="text-xs text-zinc-400">{leaderSegment?.label ?? 'Leader share'}</div>
      </div>{labeledSegments.map((segment) => (
        <Fragment key={segment.label}>
          <span
            className="absolute h-2 w-2 rounded-full border border-black/40"
            style={{
              left: segment.pointerX + '%',
              top: segment.pointerY + '%',
              backgroundColor: segment.color,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute min-w-[80px] text-xs font-medium text-zinc-100"
            style={{
              left: segment.labelX + '%',
              top: segment.labelY + '%',
              transform: 'translate(' + segment.translateX + ', -50%)',
              textAlign: segment.alignRight ? 'left' : 'right',
            }}
          >
            <div className="flex items-center gap-1" style={{ justifyContent: segment.justify }}>
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span>{segment.label}</span>
            </div>
            <div className="text-[11px] font-normal text-zinc-400">{Math.round(segment.value)}%</div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}


