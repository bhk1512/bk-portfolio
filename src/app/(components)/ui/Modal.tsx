"use client";

import type { ReactNode } from "react";
import Portal from "./Portal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, labelledBy, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        {children}
      </div>
    </Portal>
  );
}