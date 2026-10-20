"use client";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProjectList from "@/components/ProjectList";
import Section from "@/components/ui/Section";
import ArrowLink from "@/components/ui/ArrowLink";

const greetings = ["hi", "hello", "hey", "moi", "morjens", "moro", "terve"];

const experience = [
  {
    company: "DollarDeploy",
    role: "Junior Product Designer, Customer Solutions Intern",
    meta: "Part-time · Hybrid",
    dates: "Mar 2025 – Present",
    description:
      "Implemented templates for running AI and open-source apps. Continuous UI/UX testing and code review.",
  },
];

const skills = [
  { category: "Languages", items: ["TypeScript", "Rust", "Swift", "Go", "Python", "HTML/CSS"] },
  { category: "Frameworks", items: ["Next.js", "React", "Astro", "Bun", "Discord.js"] },
  { category: "Infra", items: ["Docker", "Redis", "GitHub Actions", "Hetzner", "Pterodactyl"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB"] },
];

export default function Home() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <>
      <div className="span-hero">
        <h1
          className="t-display transition-opacity"
          style={{ opacity: greeting !== null ? 1 : 0 }}
        >
          {greeting ?? "hi"}, i&apos;m zeriax — I design and build small tools
          for things people use every day.
        </h1>
        <p className="mt-[clamp(1.5rem,3vw,2.25rem)]">
          <ArrowLink href="/portfolio">See the work</ArrowLink>
        </p>
      </div>

      <div className="span-body pt-[clamp(4rem,9vw,7rem)] t-stack">
        <p className="t-body">
          Student working across product design and software engineering.
          Most of what I build is unglamorous and Finnish: lunch menus, grocery
          prices, library catalogues, apartment listings — scraped, normalised,
          and served as something you can actually query.
        </p>
        <p className="t-body">
          I spent years deep in the Linux rabbit hole — Arch, ricing, bspwm, the
          works — before settling on macOS. That&apos;s where the taste for small,
          fast, dependency-free tools comes from. Programming since 2021.
        </p>
        <p className="t-body">
          I also LOOOVE self-hosting. A spare VPS and a chunky homeserver run
          everything from Pterodactyl Minecraft servers to{" "}
          <a href="https://jellyfin.org/" className="t-link">Jellyfin</a>, which is
          how half these projects start — something annoyed me on my own box.
        </p>
      </div>

      <Section label="Selected work">
        <ProjectList only="featured" />
      </Section>

      <Section label="Experience">
        {experience.map((job) => (
          <article key={job.company} className="entry">
            <div className="entry-top">
              <h3>{job.company}</h3>
              <time>{job.dates}</time>
            </div>
            <p className="role">
              {job.role} · {job.meta}
            </p>
            <p className="desc">{job.description}</p>
          </article>
        ))}
      </Section>

      <Section label="Stack">
        <dl>
          {skills.map(({ category, items }) => (
            <div key={category} className="stack-row">
              <dt>{category}</dt>
              <dd>{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {isMobile !== null && (
        <p className="span-body pt-[clamp(3rem,8vw,5rem)] font-mono text-[0.8125rem] text-fg-faint">
          {isMobile
            ? "if you've scrolled this far, thanks for visiting. say hi sometime."
            : "if you've scrolled this far — try pressing space."}
        </p>
      )}
    </>
  );
}
