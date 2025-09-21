"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "../(types)/common";

export function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0]);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: "-40% 0px -50% 0px",
      threshold: [0, 0.2, 0.6, 1],
    };
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) {
        setActive(visible.target.id as SectionId);
      }
    }, options);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        io.observe(el);
      }
    });

    return () => {
      io.disconnect();
    };
  }, [ids]);

  return active;
}