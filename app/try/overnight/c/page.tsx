import type { Metadata } from "next";
import { Motion } from "../client";
import { also, dd, elsewhere, email, landing, motion, person, st, stDelete } from "../content";
import { A, Links, Shot, Terminal } from "../parts";

export const metadata: Metadata = { title: "C — Split", robots: { index: false } };

export default function OptionC() {
  return (
    <div className="ov-page ov-c">
      <aside className="c-left">
        <h1 className="c-name">{person.name}</h1>
        <p className="c-lede">I design and build small tools for things people use every day.</p>
        <p className="c-role">{person.role}</p>
        <dl className="c-list">
          <dt>Work</dt>
          <dd><A href="#dollardeploy">DollarDeploy</A> <span className="c-quiet">landing and pricing</span></dd>
          <dd><A href="#solidtime-cli">solidtime-cli</A> <span className="c-quiet">time tracking in Go</span></dd>
          <dd className="c-quiet">
            {also.map((l, i) => (
              <span key={l.href}>
                <A href={l.href}>{l.label}</A>
                {i < also.length - 1 ? ", " : ""}
              </span>
            ))}
          </dd>
          <dt>Now</dt>
          <dd>{person.job}</dd>
          <dt>Contact</dt>
          <dd><A href={email.href}>{email.label}</A></dd>
          <dd><Links links={elsewhere} className="c-inline" /></dd>
        </dl>
      </aside>

      <div className="c-right">
        <figure id="dollardeploy" className="c-fig">
          <Motion {...motion} className="c-media" />
          <figcaption>
            <span className="c-cap-name">{dd.name}, pricing.</span> {dd.decision}{" "}
            <A href={dd.live.href}>{dd.live.label}</A>
          </figcaption>
        </figure>

        <figure className="c-fig">
          <Shot shot={landing} sizes="(max-width: 48rem) 100vw, 55vw" className="c-media" />
          <figcaption>
            <span className="c-cap-name">{dd.name}, landing.</span> {dd.role}{" "}
            <A href={dd.landing.href}>{dd.landing.label}</A>
          </figcaption>
        </figure>

        <figure id="solidtime-cli" className="c-fig">
          <Terminal {...stDelete} className="c-media c-term" />
          <figcaption>
            <span className="c-cap-name">{st.name}.</span> {st.decision} {st.source}{" "}
            <A href={st.repo.href}>{st.repo.label}</A>
          </figcaption>
        </figure>

        <div className="c-about">
          <p>{person.intro}</p>
          {person.about.map((t) => <p key={t.slice(0, 12)}>{t}</p>)}
        </div>
      </div>
    </div>
  );
}
