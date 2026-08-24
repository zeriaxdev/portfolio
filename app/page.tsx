"use client";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "HTML/CSS", "Python", "Go", "Rust"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Astro", "Discord.js"],
  },
  {
    category: "Infra & Cloud",
    items: ["Docker", "GitHub Actions", "Hetzner", "Verda", "Netlify", "DollarDeploy"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB"],
  },
];

export default function Home() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <section>
      <h1
        className="mb-8 text-2xl font-semibold tracking-tighter transition-opacity"
        style={{ opacity: greeting !== null ? 1 : 0 }}
      >
        {greeting ?? "hi"}, i&apos;m zeriax!
      </h1>

      <article>
        <p className="my-5 text-zinc-600 dark:text-zinc-400">
          You&apos;ve found my little corner of the internet. I&apos;m into{" "}
          <a href="https://gnu.org/philosophy/free-sw.html">free software</a>{" "}
          and programming. I spent years deep in the Linux rabbit
          hole&mdash;Arch, ricing, dwm, bspwm, the works&mdash;before settling
          on macOS. I&apos;ve built Discord bots, CLI tools, and web apps,
          picking up solid backend and API experience along the way. Programming
          since 2021.
        </p>

        <p className="text-zinc-600 dark:text-zinc-400">
          I also LOOOVE self-hosting and tinkering on my homeserver. I have a
          spare VPS and also a chunky homeserver in use, on which I host all
          kinds of stuff, from Pterodactyl Minecraft servers to{" "}
          <a href="https://jellyfin.org/">Jellyfin</a>, respectively.
        </p>

        <h2 className="mb-0!">experience</h2>
        <div className="section-divider" />
        <div>
          {experience.map((job) => (
            <div
              key={job.company}
              className="py-2.5 border-t border-zinc-200 dark:border-zinc-800 first:border-t-0"
            >
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {job.company}
                </span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500 shrink-0">
                  {job.dates}
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {job.role} · {job.meta}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {job.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-0!">skills & technologies</h2>
        <div className="section-divider" />
        <div className="space-y-3">
          {skills.map(({ category, items }) => (
            <div key={category} className="flex gap-4 text-sm">
              <span className="w-28 shrink-0 text-zinc-600 dark:text-zinc-500">
                {category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2 py-0.5 rounded-full
                      bg-zinc-100 dark:bg-zinc-900
                      text-zinc-600 dark:text-zinc-400
                      border border-zinc-200 dark:border-zinc-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {isMobile !== null && (
          <p className="mt-10 text-xs text-zinc-600 dark:text-zinc-500 font-mono">
            {isMobile
              ? "if you've scrolled this far, thanks for visiting. say hi sometime."
              : "if you've scrolled this far — try pressing space."}
          </p>
        )}
      </article>
    </section>
  );
}
