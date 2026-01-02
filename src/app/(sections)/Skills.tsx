"use client";

import { skillsData } from "../(data)/skills";
import Badge from "../(components)/ui/Badge";
import Card from "../(components)/ui/Card";
import Reveal from "../(components)/ui/Reveal";
import Section from "../(components)/ui/Section";

export default function Skills() {
  const categories = skillsData.categories ?? [];
  const note = skillsData.note;

  return (
    <Section id="skills" title="Skills">
      <Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 60}>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-zinc-100 font-medium">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        {note ? <p className="text-xs text-zinc-400 mt-4">{note}</p> : null}
      </Reveal>
    </Section>
  );
}
