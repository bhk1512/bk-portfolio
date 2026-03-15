"use client";

import { useCallback } from "react";
import type { FormEvent } from "react";

import { contactInfo } from "../(data)/contact";
import Card from "../(components)/ui/Card";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function Contact() {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    alert("Thanks! I will get back to you.");
    form.reset();
  }, []);

  return (
    <>
      <Section id="contact" title="Get in touch">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-zinc-300 mb-1" htmlFor="ct-name">
                    Name
                  </label>
                  <input
                    id="ct-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-300 mb-1" htmlFor="ct-email">
                    Email
                  </label>
                  <input
                    id="ct-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-300 mb-1" htmlFor="ct-message">
                    Message
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="How can I help?"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-zinc-100 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                >
                  Send
                </button>
              </form>
            </Card>

            <Card>
              <div className="space-y-2 text-sm">
                <div className="text-zinc-400">Email</div>
                <a className="text-zinc-100 hover:underline" href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>

                <div className="text-zinc-400 mt-3">Phone</div>
                <a className="text-zinc-100 hover:underline" href={`tel:${contactInfo.phone}`}>
                  {contactInfo.phone}
                </a>

                <div className="text-zinc-400 mt-3">LinkedIn</div>
                <a className="text-zinc-100 hover:underline" href={contactInfo.linkedin}>
                  {contactInfo.linkedin}
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
