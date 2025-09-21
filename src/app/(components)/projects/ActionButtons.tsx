import type { MouseEventHandler } from "react";

type ActionButtonsProps = {
  demoHref?: string;
  prdHref?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function ActionButtons({ demoHref, prdHref, onClick }: ActionButtonsProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-600";
  const ghost = "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";
  const primary = "bg-zinc-100 text-zinc-900 hover:bg-white";
  const links = [
    demoHref ? { href: demoHref, label: "View Demo" } : null,
    prdHref ? { href: prdHref, label: "Full PRD" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={`${base} ${index === 0 ? primary : ghost}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}