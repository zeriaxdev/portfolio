"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/** `src` is a base path; `-light.webp` and `-dark.webp` both exist and CSS
 *  shows the one matching the site theme (the hidden one stays lazy). */
type Side = { src: string; label: string; alt: string };

function Themed({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  const common = { width: w, height: h, alt, sizes: "(max-width: 48rem) 100vw, 48rem" };
  return (
    <>
      <Image {...common} alt={alt} src={`${src}-light.webp`} className="only-light" />
      <Image {...common} alt={alt} src={`${src}-dark.webp`} className="only-dark" />
    </>
  );
}

/** Before/after with a draggable divider. The control is a native range
 *  input stretched over the image, so mouse, touch and arrow keys all work
 *  without custom pointer code. Under 48rem the two simply stack. */
export function Compare({ before, after, w, h }: { before: Side; after: Side; w: number; h: number }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare" style={{ "--pos": `${pos}%` } as CSSProperties}>
      <div className="compare-side compare-after">
        <Themed src={after.src} alt={after.alt} w={w} h={h} />
        <span className="compare-tag">{after.label}</span>
      </div>
      <div className="compare-side compare-before">
        <Themed src={before.src} alt={before.alt} w={w} h={h} />
        <span className="compare-tag">{before.label}</span>
      </div>
      <span className="compare-line" aria-hidden />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${before.label} with ${after.label}`}
        aria-valuetext={`${pos}% ${before.label}`}
        className="compare-range"
      />
    </div>
  );
}

function useSiteTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const html = document.documentElement;
    const read = () => setTheme(html.classList.contains("dark") ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return theme;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return reduced;
}

/** Screen recording of real motion. Loops muted with one small pause
 *  control (no native chrome); under reduced motion it waits on its poster. */
export function Motion({ src, w, h, label, className = "" }: { src: string; w: number; h: number; label: string; className?: string }) {
  const theme = useSiteTheme();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const base = `/work/${src}-${theme}`;

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <span className={`motion ${className}`}>
      <video
        key={`${base}-${reduced}`}
        ref={ref}
        className="motion-video"
        width={w}
        height={h}
        poster={`${base}-poster.webp`}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload={reduced ? "none" : "metadata"}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={`${base}.mp4`} type="video/mp4" />
      </video>
      <button type="button" className="motion-btn" onClick={toggle} aria-label={playing ? "Pause recording" : "Play recording"}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          {playing ? <path d="M3 2h2v8H3zM7 2h2v8H7z" /> : <path d="M3 1.5v9l7.5-4.5z" />}
        </svg>
      </button>
    </span>
  );
}
