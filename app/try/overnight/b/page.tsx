import type { Metadata } from "next";
import Image from "next/image";
import { Motion } from "../client";
import { also, dd, elsewhere, email, motion, person, st, stDelete, terrain } from "../content";
import { A, Links } from "../parts";

export const metadata: Metadata = { title: "B — Poster", robots: { index: false } };

export default function OptionB() {
  return (
    <div className="ov-page ov-b">
      <header className="b-poster">
        <p className="b-mono b-tl">{person.name}</p>
        <p className="b-mono b-tr">student<br />product design<br />software engineering</p>
        <h1 className="b-words">
          <span className="b-w1">small tools</span>
          <span className="b-w2">for things people use every day</span>
        </h1>
        <Image
          src={terrain.src}
          width={terrain.w}
          height={terrain.h}
          alt="Dithered blue landscape from the DollarDeploy landing page, reduced to one colour."
          unoptimized
          priority
          className="b-mass"
        />
        <p className="b-mono b-bl">landscape from the DollarDeploy<br />landing page I designed, one colour</p>
        <nav className="b-mono b-br" aria-label="On this page">
          <A href="#dollardeploy">dollardeploy ↓</A>
          <A href="#solidtime-cli">solidtime-cli ↓</A>
          <A href={email.href}>email ↗</A>
        </nav>
      </header>

      <section id="dollardeploy" className="b-sheet" aria-labelledby="b-dd">
        <div className="b-side">
          <h2 id="b-dd" className="b-name">{dd.name}</h2>
          <p className="b-mono">landing + pricing<br />at work, 2025–</p>
          <Links links={[dd.live, dd.landing].map((l) => ({ ...l, label: `${l.label} ↗` }))} className="b-mono b-stack" />
        </div>
        <div className="b-main">
          <Motion {...motion} className="b-video" />
          <p className="b-text">{dd.decision}</p>
        </div>
      </section>

      <section id="solidtime-cli" className="b-sheet" aria-labelledby="b-st">
        <div className="b-side">
          <h2 id="b-st" className="b-name">{st.name}</h2>
          <p className="b-mono">terminal, go<br />personal, 2026</p>
          <Links links={[{ ...st.repo, label: "Source ↗" }]} className="b-mono b-stack" />
        </div>
        <div className="b-main">
          <p className="b-mono b-cmd">$ {stDelete.cmd}</p>
          <p className="b-out">Dry run: would delete 2 entries.<br />Re-run with --yes to apply.</p>
          <p className="b-text">{st.decision}</p>
          <p className="b-mono b-faint">{st.source}</p>
        </div>
      </section>

      <footer className="b-end">
        <div className="b-side">
          <p className="b-mono">also</p>
          <Links links={[...also, { href: "/portfolio", label: "all work" }]} className="b-mono b-stack" />
        </div>
        <div className="b-main b-about">
          <p>{person.intro}</p>
          <p>{person.about[0]}</p>
        </div>
        <A href={email.href} className="b-mail">{email.label}</A>
        <Links links={elsewhere} className="b-mono b-row" />
      </footer>
    </div>
  );
}
