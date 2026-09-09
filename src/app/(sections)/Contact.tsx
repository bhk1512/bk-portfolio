"use client";

import Image from "next/image";

import { contactInfo } from "../(data)/contact";

const footerLinks = [
  { label: "Archive", href: "/archive", external: false },
  { label: "Curriculum vitae, PDF", href: "/Bharat_Kaushik_IIMA.pdf", external: false },
  { label: "LinkedIn", href: contactInfo.linkedin, external: true },
  { label: "Phone", href: `tel:${contactInfo.phone}`, external: false },
];

export default function Contact() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
        <div className="flex flex-wrap gap-x-16 gap-y-10 items-start">
          {/* Photo and contact text read as one signature unit. */}
          <div className="flex flex-wrap sm:flex-nowrap gap-6 items-start">
            <div className="relative h-[190px] w-[190px] shrink-0 overflow-hidden border border-hairline-strong">
              <Image
                src="/images/avatar.jpg"
                alt="Bharat Kaushik"
                fill
                sizes="190px"
                className="object-cover object-[50%_12%]"
              />
            </div>

            <div className="max-w-[46ch]">
              <p className="font-serif font-light text-2xl sm:text-3xl leading-snug text-ink max-w-[24ch] mb-5">
                Looking for someone who builds systems that last?
              </p>
              <p className="font-serif text-lg text-body-quiet leading-relaxed mb-5">
                Email or LinkedIn. I check both daily.
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-mono text-[13px] tracking-[0.02em] text-accent border-b border-accent/40 pb-1 hover:text-ink hover:border-ink transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 content-start pt-1 flex-1 min-w-[240px] max-w-[520px] font-mono text-[13px] tracking-[0.02em] text-body-quiet">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-hairline flex justify-between font-mono text-[11px] text-body-quiet tracking-[0.04em]">
          <span>© {new Date().getFullYear()} Bharat Kaushik</span>
          <span>Gurugram, India</span>
        </div>
      </div>
    </footer>
  );
}
