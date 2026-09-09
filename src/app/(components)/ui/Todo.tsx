type TodoProps = {
  label: string;
  className?: string;
};

// Visible placeholder for design slots with no matching content in the
// repo yet. Muted rather than accented: it should read as a slot left
// open on purpose, not as something broken. --color-muted is the
// AA-safe tone reserved for load-bearing content like this.
export default function Todo({ label, className = "" }: TodoProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border border-dashed border-hairline-strong px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-muted ${className}`}
    >
      <span className="tracking-[0.1em]">TODO</span>
      <span>{label}</span>
    </span>
  );
}
