import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Directions", robots: { index: false } };

const dirs = [
  {
    href: "/try/loud",
    name: "loud",
    note: "aalto / typesafe. Huge type, flat colour blocks, edge to edge. Commits to scale.",
  },
  {
    href: "/try/quiet",
    name: "quiet",
    note: "paco / emil. Narrow, small, lots of air. Commits to restraint.",
  },
  {
    href: "/try/terminal",
    name: "terminal",
    note: "Mono-first, reads like a shell session. Commits to your actual identity.",
  },
];

export default function Try() {
  return (
    <section className="span-all">
      <h1 className="t-title mb-[clamp(2rem,5vw,3rem)]">directions</h1>
      <p className="t-body">
        Three homepages, same content. Pick a lane — or tell me which parts of which.
      </p>
      <div className="list" style={{ marginTop: "2rem" }}>
        {dirs.map((d) => (
          <Link key={d.href} href={d.href} className="list-row">
            <span className="list-head">
              <span className="list-title">{d.name}</span>
            </span>
            <span className="list-desc">{d.note}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
