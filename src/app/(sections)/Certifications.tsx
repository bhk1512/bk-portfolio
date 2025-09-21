"use client";

import Image from "next/image";

import { certifications } from "../(data)/certs";
import type { Certification } from "../(types)/common";
import Card from "../(components)/ui/Card";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function Certifications() {
  const certs: Certification[] = certifications ?? [];

  return (
    <Section id="certs" title="Certifications">
      {!certs.length ? (
        <Card>
          <p className="text-zinc-300 text-sm">
            (Add your certifications in <code>data.certs</code> to show them here.)
          </p>
        </Card>
      ) : (
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((certification, index) => (
              <Reveal key={`${certification.title}-${index}`} delay={index * 60}>
                <Card>
                  <div className="flex items-start gap-3">
                    {certification.logo ? (
                      <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden ring-1 ring-zinc-800 bg-zinc-900">
                        <Image
                          src={certification.logo}
                          alt={`${certification.issuer || "Issuer"} logo`}
                          fill
                          sizes="40px"
                          className="object-contain p-1.5"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <div className="text-zinc-100 text-sm font-medium leading-tight">
                        {certification.title}
                      </div>
                      <div className="text-zinc-400 text-xs mt-0.5">
                        {(certification.issuer || "-")}{certification.year ? ` - ${certification.year}` : ""}
                      </div>
                      {certification.url ? (
                        <div className="mt-2">
                          <a
                            href={certification.url}
                            className="text-xs text-zinc-300 underline underline-offset-4 hover:text-white"
                          >
                            View credential
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  );
}

