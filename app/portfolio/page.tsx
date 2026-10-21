import type { Metadata } from "next";
import Image from "next/image";
import { A, Console, Row } from "@/components/work/parts";
import { projects } from "@/lib/projects";
import { consoles, ddCase, hidden, notes, projectConsole } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design at DollarDeploy, and small tools by zeriax.",
};

const href = (p: (typeof projects)[number]) => (p.overview ? `/portfolio/${p.slug}` : p.href);

export default function Portfolio() {
  const shown = projects.filter((p) => !hidden.has(p.slug));
  const framed = shown.filter((p) => p.slug === "dollardeploy" || projectConsole[p.slug]);
  const rest = shown.filter((p) => !framed.includes(p));

  return (
    <div className="span-all">
      <header className="page-head">
        <h1 className="page-title">Work</h1>
        <p className="page-lede">Product design at DollarDeploy, and small tools I build for myself and other people.</p>
      </header>

      <div className="col">
        {framed.map((p) => {
          const key = projectConsole[p.slug];
          return (
            <figure key={p.slug} className="work-fig">
              <div className={`frame${key ? "" : " frame-wide"}`}>
                {key ? (
                  <Console console={consoles[key]} />
                ) : (
                  <>
                    <Image src={`${ddCase.after.src}-light.webp`} alt={ddCase.after.alt} width={2000} height={1250} sizes="34rem" className="only-light frame-shot" />
                    <Image src={`${ddCase.after.src}-dark.webp`} alt={ddCase.after.alt} width={2000} height={1250} sizes="34rem" className="only-dark frame-shot" />
                  </>
                )}
              </div>
              <Row name={p.name} href={href(p)} note={notes[p.slug] ?? p.description} as="h2" />
            </figure>
          );
        })}
      </div>

      <section className="work col" aria-labelledby="also-title">
        <h2 id="also-title" className="section-title">Also</h2>
        <ul className="rows">
          {rest.map((p) => (
            <li key={p.slug}>
              <A href={href(p)} className="row-link">
                <span className="row-main">{p.name}</span>
                <span className="row-side">{notes[p.slug] ?? p.description}</span>
              </A>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
