"use client";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const greetings = ["hi", "hello", "hey", "moi", "morjens", "moro", "terve"];

const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "HTML/CSS", "Python", "Go", "Rust"],
  },
  {
    category: "Libraries",
    items: ["Next.js", "React", "Discord.js", "Astro"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB"],
  },
  {
    category: "OS",
    items: ["Arch Linux", "Ubuntu"],
  },
  {
    category: "Sysadmin",
    items: ["Docker", "Bash", "DNS", "GitHub Actions"],
  },
  {
    category: "Cloud",
    items: ["Hetzner", "Verda", "Netlify", "DollarDeploy"],
  },
  {
    category: "Other",
    items: ["Git", "GitHub"],
  },
];

const setup = [
  { label: "Machine", value: " MacBook Pro M5 · 24 GB · 1 TB" },
  { label: "OS", value: "macOS Tahoe 26.4" },
  { label: "Editor", value: "VSCode + Claude Code" },
  { label: "Terminal", value: "Ghostty + zsh" },
];

export default function Home() {
  const [greeting, setGreeting] = useState("hi");
  const isMobile = useIsMobile();

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {greeting}, i&apos;m zeriax!
      </h1>

      <article>
        <p className="my-5">
          You&apos;ve found my little corner of the internet. I&apos;m into{" "}
          <a href="https://gnu.org/philosophy/free-sw.html">free software</a>{" "}
          and programming. I spent years deep in the Linux rabbit
          hole&mdash;Arch, ricing, dwm, bspwm, the works&mdash;before settling
          on macOS. I&apos;ve built Discord bots, CLI tools, and web apps,
          picking up solid backend and API experience along the way. Programming
          since 2021.
        </p>

        <p>
          I also LOOOVE self-hosting and tinkering on my homeserver. I have a
          spare VPS and also a chunky homeserver in use, on which I host all
          kinds of stuff, from Pterodactyl Minecraft servers to{" "}
          <a href="https://jellyfin.org/">Jellyfin</a>, respectively.
        </p>

        <h2>skills & technologies</h2>
        <div className="my-5 space-y-3">
          {skills.map(({ category, items }) => (
            <div key={category} className="flex gap-4 text-sm">
              <span className="w-24 shrink-0 text-zinc-400 dark:text-zinc-500">
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

        <h2>setup</h2>
        <div className="my-5 space-y-2">
          {setup.map(({ label, value }) => (
            <div key={label} className="flex gap-4 text-sm">
              <span className="w-24 shrink-0 text-zinc-400 dark:text-zinc-500">
                {label}
              </span>
              <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                {value}
              </span>
            </div>
          ))}
        </div>
        {isMobile !== null && (
          <p className="mt-10 text-xs text-zinc-400 dark:text-zinc-600 font-mono">
            {isMobile
              ? "if you've scrolled this far, thanks for visiting. say hi sometime."
              : "if you've scrolled this far — try pressing space."}
          </p>
        )}
      </article>
    </section>
  );
}
