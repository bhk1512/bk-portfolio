type TodoProps = {
  label: string;
  className?: string;
};

// Visible placeholder for design slots with no matching content in the
// repo yet. Deliberately not styled as decoration -- it must read as
// "fill this in", with contrast that clears WCAG AA like any other
// content on the page.
export default function Todo({ label, className = "" }: TodoProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border border-dashed border-accent/50 bg-accent-wash px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-accent ${className}`}
    >
      <span className="font-semibold">TODO</span>
      <span className="text-body-quiet">— {label}</span>
    </span>
  );
}
