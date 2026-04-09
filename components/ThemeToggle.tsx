"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = ["system", "light", "dark"] as const;
type Theme = (typeof themes)[number];

// fixed-size buttons — pill translates by exactly (n)px * index, no calc hacks
const BTN = 20;

function SystemIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const icons: Record<Theme, React.ReactNode> = {
  system: <SystemIcon />,
  light: <SunIcon />,
  dark: <MoonIcon />,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Double RAF: first frame renders at opacity-0, second triggers the transition
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const activeIndex = Math.max(0, themes.indexOf((theme as Theme) ?? "system"));

  if (!mounted) {
    return (
      <div
        style={{ width: BTN * 3 + 6, height: BTN + 6, opacity: 0 }}
        className="rounded-full border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950"
      />
    );
  }

  return (
    <div
      className="relative flex rounded-full border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 p-0.5"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease-out",
      }}
      role="group"
      aria-label="Theme"
    >
      {/* sliding pill — width & offset are exact pixel multiples, no fractions */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0.5 left-0.5 rounded-full bg-white dark:bg-zinc-900 transition-transform duration-200 ease-out"
        style={{ width: BTN, height: BTN, transform: `translateX(${activeIndex * BTN}px)` }}
      />
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          aria-label={t}
          style={{ width: BTN, height: BTN }}
          className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
            theme === t
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400"
          }`}
        >
          {icons[t]}
        </button>
      ))}
    </div>
  );
}
