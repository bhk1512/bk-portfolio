import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6 shadow-[0_0_32px_-18px_rgba(255,255,255,0.15)]">
      {children}
    </div>
  );
}