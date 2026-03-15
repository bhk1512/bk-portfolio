import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  hoverable?: boolean;
};

export default function Card({ children, hoverable = false }: CardProps) {
  return (
    <div
      className={
        "rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6 shadow-[0_0_32px_-18px_rgba(255,255,255,0.15)] " +
        (hoverable
          ? "transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.06)] will-change-transform"
          : "")
      }
    >
      {children}
    </div>
  );
}
