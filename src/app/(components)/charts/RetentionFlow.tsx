type RetentionFlowProps = { stages?: string[]; issues?: string[]; };

export default function RetentionFlow({ stages = [], issues = [] }: RetentionFlowProps) {
  const defaultStages = [
    "Awareness",
    "Trial",
    "First Listen",
    "Credit Exhaustion",
    "Retention",
  ];

  const labels = stages.length >= 5
    ? stages.slice(0, 5)
    : defaultStages;

  const points = [
    { x: 70, y: 120 },
    { x: 260, y: 120 },
    { x: 500, y: 120 },
    { x: 760, y: 165 },
    { x: 950, y: 205 },
  ].map((pt, index) => ({ ...pt, label: labels[index] ?? defaultStages[index] }));

  const retentionIssues = issues.length ? issues : [
    "Credit gating",
    "Weak discovery",
    "Offline fails",
  ];

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="relative mx-auto w-full max-w-[1200px] rounded-2xl bg-neutral-900 p-4 sm:p-6 ring-1 ring-white/10 md:h-[320px]">
        <div className="mb-2 flex items-center justify-start text-sm text-neutral-300">
          <span className="font-medium tracking-wide">User Journey</span>
        </div>
        <svg className="h-[220px] w-full md:h-[240px]" viewBox="0 0 1020 260" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="rf-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.00" />
            </linearGradient>
            <filter id="rf-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="rf-blob" cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#a3e635" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.08" />
            </radialGradient>
            <filter id="rf-softBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <rect x="160" y="56" width="560" height="190" rx="95" fill="url(#rf-blob)" filter="url(#rf-softBlur)" />
          <path d="M 70 126 C 300 126, 460 126, 560 126 C 660 126, 700 146, 740 171 C 780 191, 820 204, 950 211" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="14" />
          <path d="M 70 120 C 300 120, 460 120, 560 120 C 660 120, 700 140, 740 165 C 780 185, 820 198, 950 205" fill="none" stroke="#a3a3a3" strokeWidth="8" strokeLinecap="round" />
          <path d="M 760 165 C 800 185, 840 198, 920 204" fill="none" stroke="#fb7185" strokeWidth="10" strokeLinecap="round" filter="url(#rf-glow)" />
          <g>
            <line x1={70} y1={120} x2={70} y2={210} stroke="#38bdf8" strokeWidth={4} strokeLinecap="round" />
            <polygon points="60,210 80,210 70,222" fill="#38bdf8" />
          </g>
          <g>
            <line x1={260} y1={120} x2={260} y2={210} stroke="#c084fc" strokeWidth={4} strokeLinecap="round" />
            <polygon points="250,210 270,210 260,222" fill="#c084fc" />
          </g>
          <text x={200} y={245} textAnchor="middle" className="fill-rose-400 text-[13px] font-semibold">
            Strong thanks to Amazon SSO and generous trials.
          </text>
          {points.map((pt, index) => (
            <g key={pt.label + index}>
              <circle cx={pt.x} cy={pt.y} r={10} fill="#e5e7eb" stroke="#0a0a0a" strokeWidth="2" />
              <text x={pt.x} y={pt.y - 20} textAnchor="middle" className="fill-white text-[12px] font-medium">
                {pt.label}
              </text>
            </g>
          ))}
          <g>
            <circle cx={760} cy={165} r={12} fill="#fecdd3" stroke="#9f1239" strokeWidth="2" />
            <line x1={760} y1={165} x2={760} y2={220} stroke="#ef4444" strokeWidth="4" />
            <polygon points="750,220 770,220 760,232" fill="#ef4444" />
            <text x={760} y={245} textAnchor="middle" className="fill-rose-400 text-[13px] font-semibold">
              Drop-off after first credit
            </text>
            <text x={760} y={261} textAnchor="middle" className="fill-rose-200 text-[12px]">
              Churn spikes right after the first credit when content should be easiest to find.
            </text>
            </g>
        </svg>
        <div className="mt-6 flex justify-center md:absolute md:right-6 md:bottom-6 md:mt-0 md:block md:-translate-y-[150px] md:w-[300px] sm:right-10">
          <div className="relative w-full max-w-[320px] rounded-xl bg-rose-500/15 p-4 text-sm text-rose-100 ring-1 ring-rose-300/30 shadow-2xl md:pointer-events-none">
            <div className="hidden md:block absolute -left-2 top-10 h-4 w-4 rotate-45 bg-rose-500/15 ring-1 ring-rose-300/30" />
            <div className="mb-1 text-[11px] font-semibold tracking-wide text-rose-200">RETENTION ISSUES</div>
            <ul className="list-disc pl-4 leading-6 sm:pl-5">
              {retentionIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
