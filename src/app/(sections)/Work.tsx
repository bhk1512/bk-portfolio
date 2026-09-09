"use client";

import { useState } from "react";
import Link from "next/link";

import { workRows } from "../(data)/work";
import { operatingRules } from "../(data)/operatingRules";
import Todo from "../(components)/ui/Todo";
import WorkImage from "../(components)/ui/WorkImage";

export default function Work() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="work" className="scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-10 sm:py-12">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-baseline gap-4 pb-4 border-b border-hairline-strong mb-1">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">01</span>
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-body-quiet">
                Work
              </h2>
              <span className="ml-auto font-mono text-[11px] text-body-quiet">
                {workRows.length} systems
              </span>
            </div>

            <div>
              {workRows.map((row) => {
                const isRowOpen = openId === row.slug;

                return (
                  <div key={row.slug} className="border-b border-hairline">
                    <button
                      type="button"
                      onClick={() => setOpenId(isRowOpen ? null : row.slug)}
                      aria-expanded={isRowOpen}
                      className="w-full text-left py-4 hover:bg-raised transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                    >
                      <div className="grid grid-cols-[16px_minmax(0,1fr)_auto_auto] gap-3 sm:gap-5 items-baseline">
                        <span className="font-mono text-xs text-body-quiet">
                          {isRowOpen ? "–" : "+"}
                        </span>
                        <span className="font-serif text-lg sm:text-xl text-ink">
                          {row.title}
                        </span>
                        <span className="hidden sm:inline font-mono text-[11px] tracking-[0.1em] text-body-quiet">
                          {row.org}
                        </span>
                        <span className="font-mono text-[11px] text-body-quiet">
                          {row.year}
                        </span>
                      </div>
                      <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-3 sm:gap-5 mt-1.5">
                        <span />
                        <span className="font-mono text-[12px] text-body">{row.figures}</span>
                      </div>
                      <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-3 sm:gap-5 mt-1">
                        <span />
                        {row.then === null ? (
                          <Todo label="still running / handed over" />
                        ) : row.then ? (
                          <span className="font-mono text-[11px] text-muted">{row.then}</span>
                        ) : null}
                      </div>
                    </button>

                    {isRowOpen ? (
                      <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-3 sm:gap-5 pb-5">
                        <span />
                        <div className="border-l border-hairline-strong pl-5 max-w-[64ch]">
                          <p className="font-serif text-base leading-relaxed text-body-quiet mb-3">
                            {row.body}
                          </p>
                          {row.images?.length ? (
                            <div className="grid sm:grid-cols-2 gap-4 mb-1">
                              {row.images.map((image) => (
                                <WorkImage
                                  key={image.src}
                                  image={image}
                                  sizes="(min-width: 640px) 400px, 100vw"
                                />
                              ))}
                            </div>
                          ) : null}
                          <Link
                            href={`/work/${row.slug}`}
                            scroll={false}
                            className="inline-block mt-3 font-mono text-[11.5px] tracking-[0.04em] text-accent border-b border-accent/40 pb-0.5 hover:text-ink hover:border-ink transition-colors"
                          >
                            Read the case study
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-1 lg:pt-11">
            <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-body-quiet pb-3 border-b border-hairline-strong">
              Operating rules
            </div>
            <div className="flex flex-col gap-3 mt-3">
              {operatingRules.map((rule) => (
                <p key={rule} className="font-serif text-base leading-relaxed text-body">
                  {rule}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
