import { notFound } from "next/navigation";

import CaseStudyOverlay from "../../../(components)/work/CaseStudyOverlay";
import CaseStudyBody, { caseStudyExists } from "../../../(components)/work/CaseStudyBody";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InterceptedCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  if (!caseStudyExists(slug)) notFound();

  return (
    <CaseStudyOverlay>
      <CaseStudyBody slug={slug} />
    </CaseStudyOverlay>
  );
}
