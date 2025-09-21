"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type PortalProps = {
  children: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    elRef.current = el;
    document.body.appendChild(el);
    setMounted(true);
    return () => {
      if (elRef.current) {
        document.body.removeChild(elRef.current);
      }
    };
  }, []);

  if (!mounted || !elRef.current) {
    return null;
  }

  return createPortal(children, elRef.current);
}