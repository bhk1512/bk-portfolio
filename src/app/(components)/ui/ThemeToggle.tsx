"use client";

import { useTheme } from "../../(hooks)/useTheme";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${label.toLowerCase()} theme`}
      className={`font-mono text-[11px] tracking-[0.1em] text-body-quiet hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded ${className}`}
    >
      {label}
    </button>
  );
}
