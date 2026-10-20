import type { Metadata } from "next";
import { Compare, Motion } from "../client";
import { also, consoles, dd, ddCase, email, motion, st, stDelete } from "../content";
import { A, Console, Terminal } from "../parts";

export const metadata: Metadata = { title: "A — Floating parts", robots: { index: false } };

/** design.how's caption row: a name on the left, a few muted words on the right. */
function Row({ name, href, note }: { name: string; href: string; note: string }) {
  return (
    <div className="a-meta">
      <h3><A href={href}>{name}</A></h3>
      <p>{note}</p>
    </div>
  );
}

export default function OptionA() {
  return (
    <div className="ov-page ov-a">
      <section className="a-hero" aria-labelledby="a-h1">
        <div className="a-cloud" aria-hidden>
          <Console console={consoles.mcmove} className="a-c1" />
          <Console console={consoles.solidtime} className="a-c2" />
          <Console console={consoles.kruoka} className="a-c3" />
        </div>
        <p className="a-credit">Real output from three of my tools</p>
        <h1 id="a-h1" className="a-h1">Hi, I&apos;m zeriax.</h1>
        <p className="a-sub">
          I&apos;m a student who designs and builds small tools for things people use every day,
          and a part-time product designer at DollarDeploy.
        </p>
        <div className="a-actions">
          <A href="#work" className="a-btn">See the work</A>
          <A href={email.href} className="a-btn">Email me</A>
        </div>
      </section>

      <section id="work" className="a-case" aria-labelledby="a-dd">
        <header className="a-case-head">
          <h2 id="a-dd" className="a-h2">{dd.name}</h2>
          <p className="a-case-meta">Product designer since 2025, working on the landing, pricing, app shell, settings and AI agent.</p>
        </header>

        <figure className="a-fig">
          <div className="a-frame a-frame-wide">
            <Compare before={ddCase.before} after={ddCase.after} w={2000} h={1250} />
          </div>
          <Row name="Landing" href={dd.landing.href} note="Less generic: dithering and a pixel serif" />
        </figure>

        <figure className="a-fig">
          <div className="a-frame a-frame-wide">
            <Motion {...motion} className="a-video" />
          </div>
          <Row name="Pricing" href={dd.live.href} note="Each plan's dither lights up on hover" />
        </figure>
      </section>

      <section className="a-more" aria-labelledby="a-more-h">
        <h2 id="a-more-h" className="a-h2">Also</h2>
        <figure className="a-fig">
          <div className="a-frame">
            <Terminal {...stDelete} className="a-term" />
          </div>
          <Row name={st.name} href={st.repo.href} note="Time tracking CLI in Go, with demo data" />
        </figure>

        <p className="a-also">
          Also{" "}
          {also.map((l, i) => (
            <span key={l.href}>
              <A href={l.href}>{l.label}</A>
              {i < also.length - 2 ? ", " : i === also.length - 2 ? " and " : ". "}
            </span>
          ))}
          <A href="/portfolio">See all work</A>
        </p>
      </section>
    </div>
  );
}
