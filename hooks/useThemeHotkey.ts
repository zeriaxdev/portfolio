"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * "d" toggles light/dark. Ignores keystrokes aimed at inputs so typing a "d"
 * in a field never flips the theme.
 */
/**
 * A theme flip changes colour on nearly every element at once, so every
 * transition fires together and the switch smears. Kill them for one frame.
 */
function withoutTransitions(swap: () => void) {
  const style = document.createElement("style");
  style.append(
    document.createTextNode("*,*::before,*::after{transition:none !important}"),
  );
  document.head.append(style);
  swap();
  // Force a reflow so the suppressed styles are applied before we restore.
  void document.body.offsetHeight;
  requestAnimationFrame(() => style.remove());
}

export function useThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "d" || e.metaKey || e.ctrlKey || e.altKey) return;

      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
      ) {
        return;
      }

      e.preventDefault();
      const next = resolvedTheme === "dark" ? "light" : "dark";

      if (!document.startViewTransition) {
        withoutTransitions(() => setTheme(next));
        return;
      }
      // Overlapping transitions (key held down, or a route change mid-flight)
      // reject these promises; swallow it so it isn't an unhandled rejection.
      const transition = document.startViewTransition(() =>
        withoutTransitions(() => setTheme(next)),
      );
      transition.finished.catch(() => {});
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(() => {});
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme]);
}
