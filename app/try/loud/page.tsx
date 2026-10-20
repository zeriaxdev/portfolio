import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "loud", robots: { index: false } };

export default function Loud() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="dir dir-loud">
      <h1>
        zeriax<span>.</span>
      </h1>

      <p className="lede">
        Product design and software engineering. Finnish civic data, Minecraft
        tooling, and a homeserver that does too much.
      </p>

      <div className="slab">
        <p>
          Years deep in the Linux rabbit hole — Arch, ricing, bspwm — before
          settling on macOS. Discord bots, CLI tools, web apps. Programming
          since 2021.
        </p>
      </div>

      <div className="rows">
        {featured.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="row">
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <span>{p.tags.join(" / ")}</span>
          </Link>
        ))}
      </div>

      <Link href="/try" className="back-link">← directions</Link>
    </div>
  );
}
