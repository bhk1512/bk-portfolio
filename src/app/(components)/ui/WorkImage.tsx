"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Portal from "./Portal";
import type { WorkImage as WorkImageData } from "../../(data)/work";

type WorkImageProps = {
  image: WorkImageData;
  sizes?: string;
  // "card" crops to a uniform 16/9 tile for the homepage row grid.
  // "full" shows the whole screenshot at content width, uncropped, so a
  // dashboard can actually be read on the case study page.
  frame?: "card" | "full";
};

// Site-wide treatment for product-screenshot artifacts: desaturated so a
// light-UI screenshot sits inside the dark palette instead of glowing out
// of it, contained by a hairline border so the white screenshot edge
// doesn't bleed into the page background. Click opens the full image.
export default function WorkImage({
  image,
  sizes = "(min-width: 1024px) 800px, 100vw",
  frame = "card",
}: WorkImageProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <figure className={isFull ? "" : "mt-4"}>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open full image: ${image.alt}`}
        // A tall screenshot is capped by width here rather than by
        // max-height on the image itself: the image keeps a determinate
        // width, so its box is reserved from the aspect ratio before the
        // file loads and nothing shifts underneath it.
        style={
          isFull
            ? { maxWidth: `calc(78vh * ${(image.width / image.height).toFixed(4)})` }
            : undefined
        }
        className="group block w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
      >
        {isFull ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            className="h-auto w-full rounded-lg border border-hairline-strong grayscale-[45%] brightness-90 contrast-95 transition duration-200 motion-reduce:transition-none group-hover:grayscale-[15%] group-hover:brightness-100 group-hover:border-accent/60"
          />
        ) : (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-hairline-strong transition-colors duration-150 motion-reduce:transition-none group-hover:border-accent/60">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-cover object-top grayscale-[45%] brightness-90 contrast-95 transition duration-200 motion-reduce:transition-none group-hover:grayscale-[15%] group-hover:brightness-100"
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
