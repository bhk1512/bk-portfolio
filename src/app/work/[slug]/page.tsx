import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Nav from "../../(components)/nav/Nav";
import Contact from "../../(sections)/Contact";
import CaseStudyBody, {
  caseStudyExists,
  caseStudyTitle,
  caseStudyDescription,
} from "../../(components)/work/CaseStudyBody";
import { projects } from "../../(data)/projects";
import { workRows } from "../../(data)/work";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const workSlugs = workRows.map((row) => ({ slug: row.slug }));
  const projectSlugs = projects
    .filter((project) => !workRows.some((row) => row.slug === project.id))
    .map((project) => ({ slug: project.id }));
  return [...workSlugs, ...projectSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = caseStudyTitle(slug);
  if (!title) return {};
  return {
    title: `${title} · Bharat Kaushik`,
    description: caseStudyDescription(slug),
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  if (!caseStudyExists(slug)) notFound();

  return (
    <div className="min-h-screen bg-ground text-body">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-10">
          <Link
            href="/#work"
            className="font-mono text-[11px] tracking-[0.06em] text-body-quiet hover:text-ink transition-colors"
          >
            ← All work
          </Link>
          <div className="mt-6">
            <CaseStudyBody slug={slug} />
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
