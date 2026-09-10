import Todo from "../ui/Todo";
import WorkImage from "../ui/WorkImage";
import { projects } from "../../(data)/projects";
import { getWorkRow } from "../../(data)/work";

export function caseStudyExists(slug: string): boolean {
  return Boolean(getWorkRow(slug)?.caseStudy) || projects.some((item) => item.id === slug);
}

export function caseStudyTitle(slug: string): string | null {
  const workRow = getWorkRow(slug);
  if (workRow?.caseStudy) return workRow.title;
  return projects.find((item) => item.id === slug)?.title ?? null;
}

export function caseStudyDescription(slug: string): string | undefined {
  const workRow = getWorkRow(slug);
  if (workRow?.caseStudy) return workRow.body;
  const project = projects.find((item) => item.id === slug);
  return project?.cardSummary ?? project?.summary;
}

// Prose measure. Wider than this hurts reading, and the empty space to its
// right is correct -- the rail is what uses the rest of the column.
const TEXT_COLUMN = "max-w-[620px]";

// Text column plus rail, the same shape the homepage Work section uses for
// its rows and operating-rules rail.
const ROW_GRID =
  "grid lg:grid-cols-[minmax(0,620px)_minmax(0,500px)] gap-8 lg:gap-16 items-start";

// The header band mirrors the hero: eyebrow line, display headline at the
// hero's own scale, standfirst. Nothing here is sized for this page alone.
function HeaderBand({
  eyebrow,
  title,
  standfirst,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
}) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mb-6">
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-accent">
          {eyebrow}
        </span>
      </div>
      <h1 className="font-serif font-light text-[clamp(34px,6.5vw,64px)] leading-[1.06] tracking-[-0.02em] max-w-[30ch] text-ink mb-6">
        {title}
      </h1>
      {standfirst ? (
        <p className="text-ink/90 font-serif text-lg sm:text-xl leading-[1.5] max-w-[70ch]">
          {standfirst}
        </p>
      ) : null}
    </header>
  );
}

// One numbered section, using the grammar of "01 WORK" on the homepage:
// mono index, mono uppercase label, hairline under both.
function LabelledRow({
  index,
  label,
  children,
  rail,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
  rail?: React.ReactNode;
}) {
  return (
    <section className="pt-8">
      <div className="flex items-baseline gap-4 pb-4 border-b border-hairline-strong mb-6">
        <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{index}</span>
        <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-body-quiet">
          {label}
        </h2>
      </div>
      <div className={ROW_GRID}>
        <div>{children}</div>
        <div>{rail}</div>
      </div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="font-serif text-lg leading-relaxed text-body">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="font-serif text-base leading-relaxed text-body flex gap-3">
          <span className="text-accent font-mono text-xs pt-1.5">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
      {children}
    </h2>
  );
}

type CaseStudyBodyProps = {
  slug: string;
};

export default function CaseStudyBody({ slug }: CaseStudyBodyProps) {
  const workRow = getWorkRow(slug);

  if (workRow?.caseStudy) {
    const { caseStudy } = workRow;
    const images = workRow.images ?? [];
    // Images go in the rail, at rail width. Sections without one carry the
    // figures or the artifact link instead; an empty rail is fine.
    const railImage = (image: (typeof images)[number] | undefined) =>
      image ? (
        <WorkImage
          key={image.src}
          image={image}
          frame="full"
          sizes="(min-width: 1024px) 500px, 100vw"
        />
      ) : null;

    return (
      <>
        <HeaderBand
          eyebrow={`${workRow.org} · ${workRow.year}`}
          title={workRow.title}
          standfirst={workRow.body}
        />

        <LabelledRow
          index="01"
          label="What was broken"
          rail={
            <p className="font-mono text-[12px] text-body-quiet tracking-[0.04em] leading-relaxed">
              {workRow.figures}
            </p>
          }
        >
          <Prose>{caseStudy.broken}</Prose>
        </LabelledRow>

        <LabelledRow index="02" label="What I built" rail={railImage(images[0])}>
          <Prose>{caseStudy.built}</Prose>
        </LabelledRow>

        <LabelledRow
          index="03"
          label="What happened"
          rail={
            images.length > 1 ? (
              <div className="flex flex-col gap-8">{images.slice(1).map(railImage)}</div>
            ) : null
          }
        >
          <Prose>{caseStudy.happened}</Prose>
        </LabelledRow>

        <LabelledRow
          index="04"
          label="What I'd do differently"
          rail={
            caseStudy.artifactSlot ? <Todo label={`${caseStudy.artifactSlot} link`} /> : null
          }
        >
          <Todo label="not written yet" />
        </LabelledRow>
      </>
    );
  }

  const project = projects.find((item) => item.id === slug);
  if (!project) return null;

  const { teardown } = project;

  return (
    <>
      <HeaderBand
        eyebrow={`${project.archetype ?? "Work"}${project.year ? ` · ${project.year}` : ""}`}
        title={teardown?.heading ?? project.title}
      />
      {project.stack ? (
        <p className="font-mono text-[12px] text-body-quiet tracking-[0.04em] mb-8">
          {project.stack}
        </p>
      ) : null}

      {teardown ? (
        <div className={TEXT_COLUMN}>
          <p className="font-serif text-lg leading-relaxed text-body mb-10">
            {teardown.description}
          </p>

          {teardown.stats?.length ? (
            <div className="flex flex-wrap gap-x-10 gap-y-6 py-6 border-t border-b border-hairline mb-10">
              {teardown.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif font-light text-3xl text-ink">{stat.value}</div>
                  <div className="font-mono text-[11px] text-body-quiet mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : null}

          {teardown.keyPainPoints?.length ? (
            <>
              <SectionHeading>Key pain points</SectionHeading>
              <div className="mb-10">
                <List items={teardown.keyPainPoints} />
              </div>
            </>
          ) : null}

          {teardown.execSummary ? (
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div>
                <SectionHeading>Strengths</SectionHeading>
                <List items={teardown.execSummary.strengths} />
              </div>
              <div>
                <SectionHeading>Weaknesses</SectionHeading>
                <List items={teardown.execSummary.weaknesses} />
              </div>
              <div>
                <SectionHeading>Opportunities</SectionHeading>
                <List items={teardown.execSummary.opportunities} />
              </div>
              <div>
                <SectionHeading>Threats</SectionHeading>
                <List items={teardown.execSummary.threats} />
              </div>
            </div>
          ) : null}

          {teardown.recommendations?.length ? (
            <>
              <SectionHeading>Recommendations</SectionHeading>
              <div className="space-y-6 mb-10">
                {teardown.recommendations.map((rec) => (
                  <div key={rec.title}>
                    <div className="font-serif text-lg text-ink mb-2">{rec.title}</div>
                    <List items={rec.bullets} />
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {teardown.reflection ? (
            <p className="font-serif text-lg leading-relaxed text-body-quiet border-l border-hairline-strong pl-5 mb-10">
              {teardown.reflection}
            </p>
          ) : null}

          {teardown.actions?.length || teardown.explore?.length ? (
            <div className="flex flex-wrap gap-7 font-mono text-[13px] tracking-[0.02em] pt-6 border-t border-hairline">
              {[...(teardown.actions ?? []), ...(teardown.explore ?? [])].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent border-b border-accent/40 pb-1 hover:text-ink hover:border-ink transition-colors"
                >
                  {action.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={TEXT_COLUMN}>
          {project.summary ? (
            <p className="font-serif text-lg leading-relaxed text-body mb-3">{project.summary}</p>
          ) : null}
          {project.context ? (
            <p className="font-serif text-base leading-relaxed text-body-quiet italic mb-10">
              {project.context}
            </p>
          ) : (
            <div className="mb-10" />
          )}

          {project.problem ? (
            <>
              <SectionHeading>Problem</SectionHeading>
              <div className="mb-10">
                <List items={Array.isArray(project.problem) ? project.problem : [project.problem]} />
              </div>
            </>
          ) : null}

          {project.approach?.length ? (
            <>
              <SectionHeading>Approach</SectionHeading>
              <div className="mb-10">
                <List items={project.approach} />
              </div>
            </>
          ) : null}

          {project.outcome?.length ? (
            <>
              <SectionHeading>Outcome</SectionHeading>
              <div className="mb-10">
                <List items={project.outcome} />
              </div>
            </>
          ) : null}

          {project.learnings?.length ? (
            <>
              <SectionHeading>Learnings</SectionHeading>
              <div className="mb-10">
                <List items={project.learnings} />
              </div>
            </>
          ) : null}

          {project.maskedScreens?.items?.length ? (
            <>
              <SectionHeading>{project.maskedScreens.title}</SectionHeading>
              <p className="font-mono text-[11px] text-body-quiet mb-5">
                {project.maskedScreens.note}
              </p>
              <div className="space-y-3 mb-10">
                {project.maskedScreens.items.map((item) => (
                  <div key={item.src}>
                    <List items={item.callouts} />
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {project.artifacts?.length ? (
            <>
              <SectionHeading>Artifacts</SectionHeading>
              <div className="mb-10">
                <List items={project.artifacts} />
              </div>
            </>
          ) : null}

          {project.demoLink || project.prdLink ? (
            <div className="flex flex-wrap gap-7 font-mono text-[13px] tracking-[0.02em] pt-6 border-t border-hairline">
              {project.demoLink ? (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent border-b border-accent/40 pb-1 hover:text-ink hover:border-ink transition-colors"
                >
                  Sample output
                </a>
              ) : null}
              {project.prdLink ? (
                <a
                  href={project.prdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent border-b border-accent/40 pb-1 hover:text-ink hover:border-ink transition-colors"
                >
                  Full PRD
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
