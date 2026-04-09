import { ArrowIcon } from "@/components/Footer";

interface Project {
  name: string;
  description: string;
  href: string;
  tags: string[];
  archived?: boolean;
  image?: string;
}

const projects: Project[] = [
  // image: "https://picsum.photos/624/352", // 16:9 so 624px:351px is w-full

  {
    name: "DollarDeploy",
    description:
      "Assisting with DollarDeploy, a fast code-to-production app made for developers.",
    href: "https://dollardeploy.com",
    tags: ["Next.js", "TypeScript", "Design"],
  },
  {
    name: "ruoka-rs",
    description:
      "CLI tool to fetch the mayk.fi menu effectively. Blazingly fast!",
    href: "https://crates.io/crates/ruoka-rs",
    tags: ["Rust"],
    image:
      "https://github.com/libreMayk/ruoka-rs/raw/HEAD/.github/assets/demo.gif",
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
      <div className="space-y-12">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1 transition-opacity hover:opacity-80"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                <ArrowIcon />
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

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
            <div className="flex gap-2 flex-wrap mt-1 mb-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 
                    text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.image && (
              <img
                src={project.image}
                className="w-full justify-center rounded-lg"
              />
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
