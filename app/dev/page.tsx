"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Console, Row } from "@/components/work/parts";
import { consoles } from "@/lib/work";

const COLOR_TOKENS = [
  ["--surface", "page background"],
  ["--surface-raised", "frames behind work"],
  ["--fg", "all reading text, solid buttons"],
  ["--fg-muted", "notes, meta, dates"],
  ["--fg-faint", "decorative only, never text"],
  ["--rule", "hairlines between rows"],
  ["--accent", "links, focus, selection"],
  ["--console", "terminal windows"],
  ["--sky-top", "homepage sky and its overscroll"],
];
const TEXT = new Set(["--fg", "--fg-muted", "--fg-faint", "--accent"]);

const RADII = [
  ["--radius-sm", "chips, focus rings"],
  ["--radius-md", "buttons, consoles, screenshots"],
  ["--radius-lg", "frames around work"],
  ["--radius-full", "pills, round controls"],
];

const TYPE = [
  ["--text-xl", "page and hero titles"],
  ["--text-lg", "section titles, h2"],
  ["--text-base", "body, ledes"],
  ["--text-sm", "meta, notes, buttons, nav"],
  ["--text-xs", "code, console, captions"],
];

const LAYOUT = ["--gutter", "--max-width", "--measure", "--bar-h", "--space-4", "--space-8", "--space-24"];

/** Live values read off the document, so this page can never drift from CSS. */
function useToken(name: string) {
  const [v, set] = useState("");
  useEffect(() => {
    const read = () =>
      set(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    read();
    const o = new MutationObserver(read);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => o.disconnect();
  }, [name]);
  return v;
}

function lum(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  if (h.length !== 6) return null;
  const c = [0, 2, 4].map((i) => {
    const n = parseInt(h.slice(i, i + 2), 16) / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function Contrast({ fg, bg }: { fg: string; bg: string }) {
  const a = lum(fg);
  const b = lum(bg);
  if (a === null || b === null) return <span className="t-mono">—</span>;
  const r = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  const pass = r >= 4.5;
  return (
    <span className="t-mono" style={{ color: pass ? undefined : "var(--signal)" }}>
      {r.toFixed(2)}:1 {pass ? "AA" : "fails AA"}
    </span>
  );
}

function Swatch({ name, note, surface }: { name: string; note: string; surface: string }) {
  const value = useToken(name);
  return (
    <div className="dev-swatch">
      <span className="dev-chip" style={{ background: `var(${name})` }} />
      <code className="t-mono dev-name">{name}</code>
      <code className="t-mono">{value || "—"}</code>
      {TEXT.has(name) ? <Contrast fg={value} bg={surface} /> : <span className="t-mono">—</span>}
      <span className="t-small dev-note">{note}</span>
    </div>
  );
}

function LiveToken({ name }: { name: string }) {
  return <>{useToken(name) || "—"}</>;
}

export default function Dev() {
  const surface = useToken("--surface");

  return (
    <div className="span-all dev">
      <header className="dev-head">
        <h1 className="t-title">Design system</h1>
        <p className="t-body dev-note">
          Values are read live from <code className="t-mono">styles/tokens.css</code>. Press{" "}
          <kbd>d</kbd> to flip the theme.
        </p>
      </header>

      <section className="dev-section">
        <h2 className="t-heading">Colour</h2>
        <div className="dev-swatches">
          <div className="dev-swatch dev-swatch-head">
            <span />
            <span className="t-mono">token</span>
            <span className="t-mono">value</span>
            <span className="t-mono">on surface</span>
            <span className="t-mono">use</span>
          </div>
          {COLOR_TOKENS.map(([n, note]) => (
            <Swatch key={n} name={n} note={note} surface={surface} />
          ))}
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Radius</h2>
        <div className="dev-radii">
          {RADII.map(([n, note]) => (
            <div key={n} className="dev-radius">
              <span className="dev-radius-box" style={{ borderRadius: `var(${n})` }} />
              <code className="t-mono dev-name">{n}</code>
              <code className="t-mono"><LiveToken name={n} /></code>
              <span className="t-small dev-note">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Type</h2>
        <div className="dev-type">
          {TYPE.map(([t, use]) => (
            <div key={t} className="dev-type-row">
              <div className="dev-type-meta">
                <code className="t-mono">{t} <LiveToken name={t} /></code>
                <span className="t-small dev-note">{use}</span>
              </div>
              <p style={{ margin: 0, fontSize: `var(${t})`, lineHeight: 1.3, letterSpacing: t === "--text-xl" ? "-0.025em" : undefined }}>
                Grocery prices, lunch menus, Minecraft servers
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Buttons</h2>
        <div className="dev-row">
          <a href="/dev" className="quiet-btn">quiet-btn</a>
          <Button href="/dev">nav</Button>
          <Button href="/dev" active>nav, current</Button>
        </div>
        <div className="dev-row dev-sky on-sky">
          <a href="/dev" className="quiet-btn is-solid">is-solid</a>
          <a href="/dev" className="quiet-btn">on the sky</a>
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Links</h2>
        <div className="dev-row">
          <a href="/dev" className="t-link">t-link: hover, tab to it, press it</a>
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Work</h2>
        <figure className="work-fig dev-work">
          <div className="frame">
            <Console console={consoles.menu} />
          </div>
          <Row name="menu-api" href="/portfolio/menu-api" note="Finnish school lunches as one JSON shape" />
        </figure>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Spacing and layout</h2>
        <div className="dev-swatches">
          {LAYOUT.map((t) => (
            <div key={t} className="dev-swatch dev-swatch-plain">
              <code className="t-mono dev-name">{t}</code>
              <code className="t-mono"><LiveToken name={t} /></code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
