import { Compare, Motion, SkyOverscroll } from "@/components/work/client";
import { WeatherParticles } from "@/components/work/weather-particles";
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

const skyPreviewScript = `(function(e){
  var q=new URLSearchParams(location.search);
  var kinds=['clear','few','scattered','broken','overcast','fog','rain','snow','storm'];
  var k=q.get('weather'),i=q.get('intensity'),w=q.get('wind'),d=q.get('direction'),t=q.get('time'),p=q.get('precipitation');
  function setIntensity(value){
    var n=Number(value);
    if(!Number.isFinite(n))return;
    n=Math.max(0,Math.min(1,n));
    e.style.setProperty('--intensity',n.toFixed(2));
  }
  if(k&&kinds.indexOf(k)!==-1){
    e.dataset.kind=k;
    e.dataset.precipitationType=k==='rain'?'rain':k==='snow'?'snow':k==='storm'?'storm':'';
    if(i===null&&['rain','snow','storm'].indexOf(k)!==-1)setIntensity(0.6);
  }else if(!e.dataset.kind){e.dataset.kind=['few','scattered','broken'][Math.floor(Math.random()*3)]}
  if(p==='freezing'||p==='hail')e.dataset.precipitationType=p;
  if(i!==null)setIntensity(i);
  if(t==='day'||t==='night')e.dataset.time=t;
  var liveSpeed=Number(e.dataset.windSpeed),liveDirection=Number(e.dataset.windDirection);
  if(!Number.isFinite(liveSpeed))liveSpeed=0;
  if(!Number.isFinite(liveDirection))liveDirection=90;
  if(w!==null||d!==null){
    var rawSpeed=w===null?liveSpeed:Number(w);
    if(!Number.isFinite(rawSpeed))rawSpeed=0;
    var speed=Math.min(60,Math.abs(rawSpeed));
    var rawDirection=d===null?(w===null?liveDirection:(rawSpeed<0?270:90)):Number(d);
    if(!Number.isFinite(rawDirection))rawDirection=90;
    var direction=((rawDirection%360)+360)%360;
    var dx=-Math.sin(direction*Math.PI/180);
    e.style.setProperty('--drift',Math.round(Math.min(900,Math.max(60,1920/(1.5+speed*1.6*Math.max(Math.abs(dx),0.35)))))+'s');
    e.style.setProperty('--dir',dx>0?'reverse':'normal');
    e.style.setProperty('--sway',Math.round(Math.min(8,Math.max(2,speed*0.6)))+'px');
  }
  e.style.setProperty('--sky-r',Math.random().toFixed(3));
})(document.currentScript.parentElement)`;

export default async function Home() {
  const sky = await getHelsinkiSky();
  return (
    <div className="span-all">
      {/* Helsinki's sky right now, dithered, fading into the page colour. */}
      <div
        className="home-sky"
        data-kind={sky?.kind}
        data-time={sky?.time}
        data-weather-code={sky?.weatherCode}
        data-precipitation-type={sky?.precipitationType ?? undefined}
        data-wind-speed={sky?.windSpeed}
        data-wind-direction={sky?.windDirection}
        style={sky ? ({
          "--drift": `${sky.drift}s`,
          "--dir": sky.dir,
          "--sway": `${sky.sway}px`,
          "--intensity": sky.intensity.toFixed(2),
        } as CSSProperties) : undefined}
        aria-hidden
        suppressHydrationWarning
      >
        {/* Before first paint: a random start, a random sky if the weather is
            unknown. Preview with ?weather=rain&intensity=0.8&wind=12&direction=225.
            Direction is where the wind comes from: 0 north, 90 east, 180 south,
            270 west. Add &precipitation=freezing or hail to preview ice or hail. */}
        <script
          dangerouslySetInnerHTML={{
            __html: skyPreviewScript,
          }}
        />
        <div className="home-sky-far" />
        <div className="home-sky-clouds" />
        <WeatherParticles />
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
