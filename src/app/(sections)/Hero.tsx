"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { heroData } from "../(data)/hero";
import type { Affiliation } from "../(types)/common";
import Badge from "../(components)/ui/Badge";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

type ProfileAvatarProps = {
  src?: string;
  alt?: string;
};

function ProfileAvatar({ src = "/avatar.jpg", alt = "Profile photo" }: ProfileAvatarProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translateY(-2px) rotateY(${x / 28}deg) rotateX(${-y / 28}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group relative rounded-full overflow-hidden ring-1 ring-zinc-800 transition-transform duration-300 will-change-transform hover:scale-[1.04] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-88 lg:h-88 xl:w-96 xl:h-96"
      style={{ perspective: 600 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6),0_0_0_8px_rgba(224,224,224,0.06)] group-hover:shadow-[0_12px_38px_-12px_rgba(0,0,0,0.7),0_0_0_10px_rgba(224,224,224,0.08)] transition-shadow duration-300" />
      <Image src={src} alt={alt} fill className="object-cover" priority />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
    </div>
  );
}

function AffiliationBar() {
  const items = heroData.affiliations ?? [];
  if (!items.length) return null;

  return (
    <div className="mt-5 pt-3 border-t border-zinc-800/60">
      <span className="sr-only">Affiliations</span>
      <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6 overflow-x-auto">
        {items.map((affiliation: Affiliation) => (
          <a
            key={affiliation.name}
            href={affiliation.url}
            aria-label={affiliation.name}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Image
              src={affiliation.logo.src}
              alt={`${affiliation.name} logo`}
              width={affiliation.logo.width}
              height={affiliation.logo.height}
              loading="lazy"
              className="grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <Section id="home">
      <div className="pointer-events-none absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <Reveal>
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:py-10 md:py-12 lg:py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              {heroData.photo?.src ? (
                <ProfileAvatar src={heroData.photo.src} alt={heroData.photo.alt || "Profile photo"} />
              ) : null}
            </div>

            <div className="text-center lg:text-left">
              <h1
                className="whitespace-nowrap text-zinc-100 font-bold tracking-tight text-[clamp(28px,8vw,40px)] sm:text-[clamp(32px,6.5vw,48px)] md:text-[clamp(40px,5.8vw,56px)] lg:text-[clamp(44px,4.8vw,64px)] xl:text-[clamp(48px,4vw,72px)]"
              >
                {heroData.name}
              </h1>

              <div className="mt-3 mb-4 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <Badge>Strategy & Ops Professional</Badge>
                <Badge className="hidden sm:inline">IIMA MBA</Badge>
              </div>

              <p className="text-zinc-400 leading-relaxed max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mt-2 text-sm sm:text-base">
                {heroData.subhead}
              </p>

              <AffiliationBar />

              <div className="mt-6 sm:mt-7 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                {heroData.ctas.map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className={
                      cta.type === "primary"
                        ? "px-4 sm:px-5 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-sm font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                        : "px-4 sm:px-5 py-2 border border-zinc-700 text-zinc-100 rounded-xl text-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    }
                  >
                    <span className="[background:linear-gradient(currentColor,currentColor)_0_100%/0_1px_no-repeat] hover:[background-size:100%_1px] [transition:background-size_.2s_ease]">
                      {cta.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}