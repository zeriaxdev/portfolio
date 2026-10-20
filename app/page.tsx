import { Compare, Motion } from "@/components/work/client";
import { A, Console, Row } from "@/components/work/parts";
import { consoles, ddCase, pricingMotion } from "@/lib/work";

const more = [
  { href: "/portfolio/solidtime-cli", label: "solidtime-cli" },
  { href: "/portfolio/mcmove", label: "mcmove" },
  { href: "/portfolio/k-ruoka-scraper", label: "k-ruoka-scraper" },
  { href: "/portfolio/mac-schoolmenu", label: "mac-schoolmenu" },
];

export default function Home() {
  return (
    <div className="span-all">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-cloud" aria-hidden>
          <Console console={consoles.mcmove} className="home-c1" />
          <Console console={consoles.solidtime} className="home-c2" />
          <Console console={consoles.kruoka} className="home-c3" />
        </div>
        <p className="home-credit">Real output from three of my tools</p>
        <h1 id="home-title" className="home-title">Hi, I&apos;m zeriax.</h1>
        <p className="home-sub">
          I&apos;m a student who designs and builds small tools for things people use every day,
          and a part-time product designer at DollarDeploy.
        </p>
        <div className="actions">
          <A href="#work" className="quiet-btn">See the work</A>
          <A href="mailto:contact@zeriax.com" className="quiet-btn">Email me</A>
        </div>
      </section>

      <section id="work" className="work col-wide" aria-labelledby="dd-title">
        <header className="work-head">
          <h2 id="dd-title" className="section-title">DollarDeploy</h2>
          <p className="work-meta">
            Product designer since 2025, working on the landing, pricing, app shell, settings and AI agent.
          </p>
        </header>

        <figure className="work-fig">
          <div className="frame frame-wide">
            <Compare before={ddCase.before} after={ddCase.after} w={2000} h={1250} />
          </div>
          <Row name="Landing" href={ddCase.landing} note={ddCase.landingNote} />
        </figure>

        <figure className="work-fig">
          <div className="frame frame-wide">
            <Motion {...pricingMotion} />
          </div>
          <Row name="Pricing" href={ddCase.pricing} note={ddCase.pricingNote} />
        </figure>
      </section>

      <section className="work col" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title">More</h2>
        <figure className="work-fig">
          <div className="frame">
            <Console console={consoles.menu} />
          </div>
          <Row name="menu-api" href="/portfolio/menu-api" note="Finnish school lunches as one JSON shape" />
        </figure>
        <p className="work-also">
          Also{" "}
          {more.map((l, i) => (
            <span key={l.href}>
              <A href={l.href} className="soft-link">{l.label}</A>
              {i < more.length - 2 ? ", " : i === more.length - 2 ? " and " : ". "}
            </span>
          ))}
          <A href="/portfolio" className="soft-link">See all work</A>
        </p>
      </section>

      <p className="home-hint">
        <span className="home-hint-key">If you&apos;ve scrolled this far, try pressing space.</span>
        <span className="home-hint-touch">If you&apos;ve scrolled this far, thanks for visiting. Say hi sometime.</span>
      </p>
    </div>
  );
}
