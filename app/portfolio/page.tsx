import type { Metadata } from "next";
import { ArrowIcon } from "@/components/Footer";
import DollarDeployLogo from "@/components/icons/DollarDeployLogo";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects by zeriax — DollarDeploy, ruoka-rs, and maykbot-ts.",
};

interface Project {
  name: string;
  description: string;
  href: string;
  tags: string[];
  archived?: boolean;
  icon?: React.ReactNode;
}

const projects: Project[] = [
  {
    name: "DollarDeploy",
    description:
      "Assisting with DollarDeploy, a fast code-to-production app made for developers.",
    href: "https://dollardeploy.com",
    tags: ["Next.js", "TypeScript", "Design"],
    icon: <DollarDeployLogo />,
  },
  {
    name: "ruoka-rs",
    description:
      "CLI tool to fetch the mayk.fi menu effectively. Blazingly fast!",
    href: "https://crates.io/crates/ruoka-rs",
    tags: ["Rust"],
    archived: true,
  },
  {
    name: "maykbot-ts",
    description:
      "Discord bot for Maunulan Yhteiskoulu. HSL/Covid/menu/YLE/weather data.",
    href: "https://github.com/libreMayk/maykbot-ts",
    tags: ["Discord.js", "TypeScript"],
    archived: true,
  },
];

export default function Portfolio() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        portfolio
      </h1>
      <div className="-mx-4">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1 px-4 py-3 rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900/50"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                {project.icon ?? <ArrowIcon />}
                {project.name}
              </div>
              {project.archived && (
                <span
                  className="text-xs px-2 py-0.5 rounded-lg font-mono
                    bg-amber-200 dark:bg-amber-950 text-amber-700 dark:text-amber-500
                    border border-amber-400 dark:border-amber-800"
                >
                  archive
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
            <div className="flex gap-2 flex-wrap mt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900
                    text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
