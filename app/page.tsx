import { Compare, Motion, SkyOverscroll } from "@/components/work/client";
import { A, Console, Row } from "@/components/work/parts";
import type { CSSProperties } from "react";
import { getHelsinkiSky } from "@/lib/weather";
import { consoles, ddCase, pricingMotion } from "@/lib/work";

const more = [
  { href: "/portfolio/solidtime-cli", label: "solidtime-cli" },
  { href: "/portfolio/mcmove", label: "mcmove" },
  { href: "/portfolio/k-ruoka-scraper", label: "k-ruoka-scraper" },
  { href: "/portfolio/mac-schoolmenu", label: "mac-schoolmenu" },
];

export default async function Home() {
  const sky = await getHelsinkiSky();
  return (
    <div className="span-all">
      {/* Helsinki's sky right now, dithered, fading into the page colour. */}
      <div
        className="home-sky"
        data-kind={sky?.kind}
        style={sky ? ({ "--drift": `${sky.drift}s`, "--dir": sky.dir, "--sway": `${sky.sway}px` } as CSSProperties) : undefined}
        aria-hidden
        suppressHydrationWarning
      >
        {/* Before first paint: a random start, a random sky if the weather is
            unknown, and ?weather=fog / ?wind=12 (negative drifts right) to
            preview. The wind formula mirrors driftSeconds in lib/weather.ts. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(e){var q=new URLSearchParams(location.search),k=q.get('weather'),w=q.get('wind');if(k)e.dataset.kind=k;else if(!e.dataset.kind)e.dataset.kind=['few','scattered','broken'][Math.floor(Math.random()*3)];if(w!==null){var a=Math.abs(+w);e.style.setProperty('--drift',Math.round(Math.min(900,Math.max(60,1920/(1.5+a*1.6))))+'s');e.style.setProperty('--dir',+w<0?'reverse':'normal');e.style.setProperty('--sway',Math.round(Math.min(8,Math.max(2,a*0.9)))+'px')}e.style.setProperty('--sky-r',Math.random().toFixed(3))})(document.currentScript.parentElement)",
          }}
        />
        <div className="home-sky-far" />
        <div className="home-sky-clouds" />
      </div>
      <SkyOverscroll />
      <section className="home-hero on-sky" aria-labelledby="home-title">
        <h1 id="home-title" className="home-title">Hi, I&apos;m zeriax.</h1>
        <p className="home-sub">
          I&apos;m a student and a part-time product designer at DollarDeploy. I also build small
          tools for things people use every day.
        </p>
        <div className="actions">
          <A href="#work" className="quiet-btn is-solid">See the work</A>
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
              <A href={l.href} className="t-link">{l.label}</A>
              {i < more.length - 2 ? ", " : i === more.length - 2 ? " and " : ". "}
            </span>
          ))}
          <A href="/portfolio" className="t-link">See all work</A>
        </p>
      </section>

    </div>
  );
}
