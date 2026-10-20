import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Footer";
import DollarDeployLogo from "@/components/icons/DollarDeployLogo";
import { projects, type Project } from "@/lib/projects";

const icons: Record<string, React.ReactNode> = {
  DollarDeploy: <DollarDeployLogo />,
};

export default function ProjectList({ only }: { only?: "featured" } = {}) {
  const shown: Project[] =
    only === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <div className="list">
      {shown.map((project) => {
        const inner = (
          <>
            {project.image && (
              <span className="list-media">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  width={800}
                  height={450}
                  sizes="(max-width: 48rem) 100vw, 40rem"
                />
              </span>
            )}

            <span className="list-head">
              <span className="list-title">
                {icons[project.name] ?? <ArrowIcon />}
                {project.name}
              </span>
              {project.archived && <span className="badge">archive</span>}
            </span>

            <span className="list-desc">{project.description}</span>

            <span className="tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </span>
          </>
        );

        // A project with drafted copy gets its own page; the rest link out.
        return project.overview ? (
          <Link
            key={project.name}
            href={`/portfolio/${project.slug}`}
            className="list-row"
          >
            {inner}
          </Link>
        ) : (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="list-row"
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}
