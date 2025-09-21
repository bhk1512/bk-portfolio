"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseModalOptions = {
  onClose?: () => void;
};

export function useModal({ onClose }: UseModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const savedScrollY = useRef(0);

  const open = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    savedScrollY.current = window.scrollY;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    if (!isOpen) return;
    history.back();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-modal-open", "1");

    const state = { ...(history.state || {}), modal: true };
    history.pushState(state, "");

    const handlePop = () => {
      setIsOpen(false);
      onClose?.();
    };

    const handleKey = (event: KeyboardEvent) => {
      if (!modalRef.current) return;
      if (event.key === "Escape") {
        event.preventDefault();
        history.back();
        return;
      }
      if (event.key === "Tab") {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeElement = document.activeElement as HTMLElement | null;
        if (!event.shiftKey && activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && activeElement === first) {
          event.preventDefault();
          (last as HTMLElement).focus();
        }
      }
    };

    window.addEventListener("popstate", handlePop);
    window.addEventListener("keydown", handleKey);

    requestAnimationFrame(() => {
      const node = modalRef.current;
      if (node) {
        node.scrollTop = 0;
        node.focus();
      }
    });

    return () => {
      window.removeEventListener("popstate", handlePop);
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      document.body.removeAttribute("data-modal-open");
      window.scrollTo(0, savedScrollY.current);
      lastFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  return { isOpen, open, close, modalRef };
}