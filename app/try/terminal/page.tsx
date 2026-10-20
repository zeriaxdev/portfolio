import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "terminal", robots: { index: false } };

export default function Terminal() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="dir dir-terminal">
      <p className="cmd">whoami</p>
      <pre className="out">
{`zeriax — product design + software engineering
student · fi · programming since 2021`}
      </pre>

      <p className="cmd">cat about.txt</p>
      <pre className="out">
{`Years deep in the Linux rabbit hole — Arch, ricing, bspwm,
the works — before settling on macOS. Discord bots, CLI tools,
web apps. Self-hosts more than is reasonable: a spare VPS and
a chunky homeserver running Jellyfin and Pterodactyl.`}
      </pre>

      <p className="cmd">ls -l ~/work</p>
      <div className="out">
        {featured.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="ls">
            <span className="perm">{p.archived ? "-r--r--r--" : "-rwxr-xr-x"}</span>
            <span className="fname">{p.name}</span>
            <span className="fdesc">{p.description}</span>
          </Link>
        ))}
      </div>

      <p className="cmd">contact --list</p>
      <pre className="out">
{`email    contact@zeriax.com
github   github.com/zeriaxdev`}
      </pre>

      <p className="cmd blink">
        <Link href="/try" className="back-link">← directions</Link>
      </p>
    </div>
  );
}
