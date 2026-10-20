"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ArrowLink from "@/components/ui/ArrowLink";

const COLOR_TOKENS = [
  ["--surface", "page background"],
  ["--surface-raised", "popovers, inputs"],
  ["--fg", "ALL reading text"],
  ["--fg-muted", "meta only — dates, tags, labels"],
  ["--fg-faint", "decorative, never body text"],
  ["--rule", "hairlines"],
  ["--accent", "hover fill, one moment"],
];

const TYPE = [
  ["t-display", "--text-4", "hero, once per page"],
  ["t-title", "--text-3", "page title"],
  ["t-heading", "--text-2", "section / card heading"],
  ["t-body", "--text-2", "paragraphs"],
  ["t-small", "--text-1", "labels, secondary"],
  ["t-mono", "--text-mono", "dates, tags, meta"],
];

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
  const h = hex.replace("#", "");
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
  const isText = name.startsWith("--fg");
  return (
    <div className="dev-swatch">
      <span className="dev-chip" style={{ background: `var(${name})` }} />
      <code className="t-mono dev-name">{name}</code>
      <code className="t-mono">{value || "—"}</code>
      {isText ? <Contrast fg={value} bg={surface} /> : <span className="t-mono">—</span>}
      <span className="t-small dev-note">{note}</span>
    </div>
  );
}

export default function Dev() {
  const surface = useToken("--surface");
  const [grid, setGrid] = useState(false);

  return (
    <div className="span-all dev">
      <header className="dev-head">
        <h1 className="t-title">Design system</h1>
        <p className="t-body">
          Every value is read live from the stylesheet — this page cannot drift
          from the CSS. Press <kbd>d</kbd> to flip the theme and watch the
          contrast numbers update. Edit{" "}
          <code className="t-mono">styles/tokens.css</code> to change anything.
        </p>
        <p className="dev-actions">
          <Button className="btn-sm" onClick={() => setGrid((g) => !g)}>
            {grid ? "Hide" : "Show"} 8-column grid
          </Button>
        </p>
      </header>

      {grid && (
        <div className="dev-grid-overlay" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => <span key={i} />)}
        </div>
      )}

      <section className="dev-section">
        <h2 className="t-heading">Colour</h2>
        <p className="t-small dev-note">
          All reading text is <code className="t-mono">--fg</code>. Hierarchy
          comes from size and weight, never from dimming.
        </p>
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
        <h2 className="t-heading">Typography</h2>
        <p className="t-small dev-note">
          Four sizes. One class per role — never combine them.
        </p>
        <div className="dev-type">
          {TYPE.map(([cls, token, use]) => (
            <div key={cls} className="dev-type-row">
              <div className="dev-type-meta">
                <code className="t-mono">.{cls}</code>
                <code className="t-mono">{token}</code>
                <span className="t-small dev-note">{use}</span>
              </div>
              <p className={cls}>Grocery prices, lunch menus, Minecraft servers</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Button</h2>
        <p className="t-small dev-note">
          One component. Hover fills with accent; pressed inverts. Try them.
        </p>
        <div className="dev-row">
          <Button href="/dev">default</Button>
          <Button href="/dev" active>
            aria-current
          </Button>
          <Button href="/dev" variant="primary">
            primary
          </Button>
          <Button className="btn-sm" href="/dev">
            btn-sm
          </Button>
        </div>
        <div className="dev-row">
          <ArrowLink href="/portfolio">Arrow link</ArrowLink>
          <a href="/dev" className="t-link">Inline text link</a>
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">List row</h2>
        <p className="t-small dev-note">
          No cards. Hairline + space. Hover tints the title only.
        </p>
        <div className="list">
          {["zenith", "mcmove"].map((n) => (
            <a key={n} href="/dev" className="list-row">
              <span className="list-head">
                <span className="list-title">{n}</span>
                <span className="list-meta">2026</span>
              </span>
              <span className="list-desc">
                A description sitting directly on the page, at full contrast.
              </span>
              <span className="tags">
                <span className="tag">Rust</span>
                <span className="tag">CLI</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="dev-section">
        <h2 className="t-heading">Spacing &amp; layout</h2>
        <div className="dev-swatches">
          {["--gutter", "--max-width", "--measure", "--bar-h"].map((t) => (
            <div key={t} className="dev-swatch dev-swatch-plain">
              <code className="t-mono dev-name">{t}</code>
              <code className="t-mono">
                <LiveToken name={t} />
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LiveToken({ name }: { name: string }) {
  return <>{useToken(name) || "—"}</>;
}
