import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArrowLink from "@/components/ui/ArrowLink";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.filter((p) => p.overview).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  // Projects without drafted copy have nothing to show beyond the list row.
  if (!project?.overview) notFound();

  const external = new URL(project.href).hostname.replace(/^www\./, "");

  return (
    <article className="span-body">
      <Link href="/portfolio" className="back-link">
        ← portfolio
      </Link>

      <h1 className="t-title mb-[clamp(2rem,5vw,3rem)]">{project.name}</h1>

      {project.image && (
        <div className="project-media">
          <Image
            src={project.image}
            alt={project.imageAlt ?? ""}
            width={1200}
            height={675}
            priority
            sizes="(max-width: 48rem) 100vw, 40rem"
          />
        </div>
      )}

      <p className="t-body">{project.overview}</p>

      {project.highlights && project.highlights.length > 0 && (
        <section className="block" aria-labelledby="notes-heading">
          <h2 id="notes-heading">notes</h2>
          <ul className="project-notes">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="block" aria-labelledby="meta-heading">
        <h2 id="meta-heading">details</h2>
        <dl className="stack-row">
          <dt>Built with</dt>
          <dd>{project.tags.join(", ")}</dd>
        </dl>
        <dl className="stack-row">
          <dt>Status</dt>
          <dd>{project.archived ? "Archived" : "Active"}</dd>
        </dl>
        <dl className="stack-row">
          <dt>Source</dt>
          <dd>
            <ArrowLink href={project.href} external>
              {external}
            </ArrowLink>
          </dd>
        </dl>
      </section>
    </article>
  );
}
