import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "quiet", robots: { index: false } };

export default function Quiet() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="dir dir-quiet">
      <h1>zeriax</h1>
      <p className="lede">
        Student working across product design and software engineering.
        Programming since 2021.
      </p>

      <p>
        Years deep in the Linux rabbit hole — Arch, ricing, bspwm, the works —
        before settling on macOS. I build small tools: grocery scrapers,
        Minecraft launchers, menu-bar apps. I also self-host more than is
        reasonable.
      </p>

      <h2>Work</h2>
      <ul className="rows">
        {featured.map((p) => (
          <li key={p.slug}>
            <Link href={`/portfolio/${p.slug}`}>{p.name}</Link>
            <span>{p.description}</span>
          </li>
        ))}
      </ul>

      <h2>Elsewhere</h2>
      <ul className="rows">
        <li>
          <a href="https://github.com/zeriaxdev">GitHub</a>
          <span>zeriaxdev</span>
        </li>
        <li>
          <a href="mailto:contact@zeriax.com">Email</a>
          <span>contact@zeriax.com</span>
        </li>
      </ul>

      <Link href="/try" className="back-link">← directions</Link>
    </div>
  );
}
