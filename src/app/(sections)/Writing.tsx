"use client";

import Card from "../(components)/ui/Card";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function Writing() {
  return (
    <Section id="writing" title="Writing">
      <Reveal>
        <Card>
          <p className="text-zinc-300">Articles list (title, date, tags)  article page.</p>
        </Card>
      </Reveal>
    </Section>
  );
}