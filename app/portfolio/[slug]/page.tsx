import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compare, Motion } from "@/components/work/client";
import { A, Console, Row } from "@/components/work/parts";
import { projects, getProject } from "@/lib/projects";
import { consoles, ddCase, hidden, pricingMotion, projectConsole } from "@/lib/work";

export function generateStaticParams() {
  return projects.filter((p) => p.overview && !hidden.has(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.description };
}

function sourceLabel(href: string) {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host === "github.com" ? "Source on GitHub" : `Visit ${host}`;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  // Projects without drafted copy have nothing to show beyond the list row.
  if (!project?.overview || hidden.has(project.slug)) notFound();

  const key = projectConsole[project.slug];
  const isDD = project.slug === "dollardeploy";

  return (
    <article className="span-all">
      <div className="col">
        <Link href="/portfolio" className="back">← Work</Link>
      </div>
      <header className="page-head">
        <h1 className="page-title">{project.name}</h1>
        <p className="page-lede">{project.description}</p>
      </header>

      {isDD && (
        <div className="col-wide project-media">
          <figure className="work-fig">
            <div className="frame frame-wide">
              <Compare before={ddCase.before} after={ddCase.after} w={2000} h={1250} />
            </div>
            <Row name="Landing" href={ddCase.landing} note={ddCase.landingNote} />
          </figure>
          <figure className="work-fig">
            <div className="frame frame-wide">
              <Motion {...pricingMotion} />
            </div>
            <Row name="Pricing" href={ddCase.pricing} note={ddCase.pricingNote} />
          </figure>
        </div>
      )}

      <div className="col">
        {key && (
          <div className="frame project-media">
            <Console console={consoles[key]} />
          </div>
        )}

        <div className="project-text">
          <p>{project.overview}</p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="project-list">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <div className="project-foot">
          <A href={project.href} className="quiet-btn">{sourceLabel(project.href)}</A>
        </div>
      </div>
    </article>
  );
}
