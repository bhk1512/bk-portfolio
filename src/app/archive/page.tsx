import type { Metadata } from "next";

import Nav from "../(components)/nav/Nav";
import Contact from "../(sections)/Contact";
import { archive } from "../(data)/archive";

export const metadata: Metadata = {
  title: "Archive · Bharat Kaushik",
  description: "Everything, including work too small for the homepage.",
};

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-ground text-body">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-10 sm:pb-12">
          <h1 className="font-serif font-light text-[clamp(28px,5vw,40px)] leading-tight tracking-[-0.02em] text-ink mb-3">
            Archive
          </h1>
          <p className="font-serif text-lg text-body-quiet leading-relaxed max-w-[52ch] mb-8">
            Everything, including work too small for the homepage. Dense on
            purpose.
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[70px_minmax(0,1.4fr)_90px_minmax(0,1.6fr)] gap-5 pb-3 border-b border-hairline-strong font-mono text-[10px] tracking-[0.16em] uppercase text-body-quiet">
                <span>Year</span>
                <span>System</span>
                <span>Made at</span>
                <span>Outcome</span>
              </div>
              {archive.map((row) => (
                <div
                  key={`${row.year}-${row.system}`}
                  className="grid grid-cols-[70px_minmax(0,1.4fr)_90px_minmax(0,1.6fr)] gap-5 py-3.5 border-b border-hairline font-mono text-[12.5px] leading-relaxed hover:bg-raised transition-colors"
                >
                  <span className="text-body-quiet">{row.year}</span>
                  <span className="text-ink">{row.system}</span>
                  <span className="text-body-quiet tracking-[0.06em]">{row.at}</span>
                  <span className="text-body">{row.outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-7 font-mono text-[11.5px] text-body-quiet">
            {archive.length} entries.
          </p>
        </section>
      </main>
      <Contact />
    </div>
  );
}
