import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border border-zinc-700/70 px-3 py-1 text-xs text-zinc-300 bg-zinc-950/40 backdrop-blur " +
        className
      }
    >
      {children}
    </span>
  );
}