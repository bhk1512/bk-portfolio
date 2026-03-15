"use client";

import Card from "../(components)/ui/Card";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function Contact() {
  return (
    <>
      <Section id="contact" title="Get in touch">
        <p className="text-sm text-zinc-400 mb-6">
          The best way to reach me is email or LinkedIn — 
          I check both daily.
        </p>
        <Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="space-y-5">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Preferred</div>
                  <a
                    href="mailto:bharat.15dck@gmail.com"
                    className="text-zinc-100 text-sm font-medium hover:underline underline-offset-4 decoration-zinc-600 flex items-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    bharat.15dck@gmail.com
                  </a>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">LinkedIn</div>
                  <a
                    href="https://www.linkedin.com/in/bharatk1512"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-100 text-sm font-medium hover:underline underline-offset-4 decoration-zinc-600 flex items-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    linkedin.com/in/bharatk1512
                  </a>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Phone</div>
                  <a
                    href="tel:+919953779868"
                    className="text-zinc-100 text-sm font-medium hover:underline underline-offset-4 decoration-zinc-600 flex items-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    +91 99537 79868
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.4)]" />
                  <span className="text-zinc-100 text-sm font-medium">
                    Open to opportunities
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Exploring Senior Program, Product Ops, and 
                  Founder&apos;s Office roles. Response within 24 hours.
                </p>
                <a
                  href="/Bharat_Kaushik_IIMA.pdf"
                  className="inline-flex items-center gap-2 mt-2 rounded-xl bg-zinc-100 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-white transition"
                >
                  Download CV
                </a>
              </div>
            </Card>
          </div>
        </Reveal>
      </Section>

      <footer className="border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-zinc-300 font-medium">
              Looking for someone who builds systems that last?
            </p>
            <div className="mt-3 flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href="mailto:bharat.15dck@gmail.com"
                className="rounded-xl bg-zinc-100 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-white transition"
              >
                Get in touch →
              </a>
              <a
                href="/Bharat_Kaushik_IIMA.pdf"
                className="rounded-xl border border-zinc-700 text-zinc-100 px-4 py-2 text-sm hover:bg-zinc-900 transition"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2 text-sm text-zinc-500">
            <div className="flex gap-4">
              <a href="#home" className="hover:text-zinc-300">Top</a>
              <a href="#flagship" className="hover:text-zinc-300">Work</a>
              <a href="#contact" className="hover:text-zinc-300">Contact</a>
            </div>
            <div>(c) {new Date().getFullYear()} Bharat Kaushik</div>
          </div>
        </div>
      </footer>
    </>
  );
}
