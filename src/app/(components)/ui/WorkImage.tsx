"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Portal from "./Portal";
import type { WorkImage as WorkImageData } from "../../(data)/work";

type WorkImageProps = {
  image: WorkImageData;
  sizes?: string;
  // "card" crops to a uniform 16/9 tile for the homepage row grid.
  // "full" shows the whole screenshot at container width, uncropped, so a
  // dashboard can actually be read.
  frame?: "card" | "full";
  // Light-UI screenshots are desaturated so they sit inside the dark
  // palette. An image that is already dark is left alone.
  desaturate?: boolean;
};

// A "full" frame never grows past this. Anything taller is clipped from the
// bottom and faded out, rather than squashed or scaled down to fit.
const FRAME_MAX_HEIGHT = 620;

// Narrowest container a full-frame image renders into (the case study rail).
// An image taller than the cap at that width is tall everywhere.
const NARROWEST_CONTAINER = 500;

// Site-wide treatment for product-screenshot artifacts: desaturated so a
// light-UI screenshot sits inside the dark palette instead of glowing out
// of it, contained by a hairline border so the white screenshot edge
// doesn't bleed into the page background. Click opens the full image.
export default function WorkImage({
  image,
  sizes = "(min-width: 1024px) 800px, 100vw",
  frame = "card",
  desaturate = true,
}: WorkImageProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  const isFull = frame === "full";
  const filter = desaturate
    ? "grayscale-[45%] brightness-90 contrast-95 group-hover:grayscale-[15%] group-hover:brightness-100"
    : "";
  // Whether the frame is actually clipping. Seeded from the aspect ratio so
  // the server renders the fade for an image that is tall at any width, then
  // measured once mounted, because the container width varies by breakpoint
  // and an image can overflow at 640px but not at 500px.
  const [clipped, setClipped] = useState(
    (NARROWEST_CONTAINER * image.height) / image.width > FRAME_MAX_HEIGHT
  );

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;
    const measure = () => setClipped(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={isFull ? "" : "mt-4"}>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open full image: ${image.alt}`}
        className="group block w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
      >
        {isFull ? (
          // The image keeps its natural width and ratio; the frame clips it.
          // Nothing is squashed, letterboxed or scaled down to fit.
          <div
            ref={frameRef}
            style={{ maxHeight: FRAME_MAX_HEIGHT }}
            className="relative overflow-hidden rounded-lg border border-hairline-strong transition-colors duration-150 motion-reduce:transition-none group-hover:border-accent/60"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={sizes}
              className={`block h-auto w-full transition duration-200 motion-reduce:transition-none ${filter}`}
            />
            {clipped ? (
              // Fades to whichever ground the active theme is using, so the
              // clip reads as deliberate rather than as a cut-off image.
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--color-ground))",
                }}
              />
            ) : null}
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-hairline-strong transition-colors duration-150 motion-reduce:transition-none group-hover:border-accent/60">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className={`object-cover object-top transition duration-200 motion-reduce:transition-none ${filter}`}
            />
          </div>
        )}
      </button>
      <figcaption className="mt-2 font-mono text-[10.5px] text-body-quiet tracking-[0.04em]">
        {image.caption}
      </figcaption>

      {open ? (
        <Portal>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={image.alt}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
            className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close image"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-ground/80 text-body-quiet hover:text-ink hover:border-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                &times;
              </span>
            </button>

            <div className="relative h-[78vh] w-full max-w-[1400px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="font-mono text-[11px] tracking-[0.04em] text-body-quiet text-center max-w-[70ch]">
              {image.caption}
            </p>
          </div>
        </Portal>
      ) : null}
    </figure>
  );
}
