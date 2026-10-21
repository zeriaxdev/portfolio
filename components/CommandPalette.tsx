"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { projects } from "@/lib/projects";

type Action = { label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const actions = useMemo<Action[]>(() => {
    const go = (href: string) => () => {
      if (href.startsWith("/")) router.push(href);
      else window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      { label: "Home", hint: "page", run: go("/") },
      { label: "Portfolio", hint: "page", run: go("/portfolio") },
      { label: "Blog", hint: "page", run: go("/blog") },
      { label: "Socials", hint: "page", run: go("/socials") },
      {
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"}`,
        hint: "d",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        label: "Copy email",
        hint: "contact@zeriax.com",
        run: () => navigator.clipboard?.writeText("contact@zeriax.com"),
      },
      ...projects.map((p) => ({
        label: p.name,
        hint: p.overview ? "project" : "repo",
        run: go(p.overview ? `/portfolio/${p.slug}` : p.href),
      })),
    ];
  }, [router, resolvedTheme, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  // Opening starts fresh; done here rather than in an effect on `open`.
  const show = (next: boolean) => {
    if (next) {
      setQuery("");
      setActive(0);
    }
    setOpen(next);
  };

  // Open on ⌘K / ctrl+K. Base UI's Dialog owns focus and Escape from there.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        show(!open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  const commit = (i: number) => {
    const action = results[i];
    if (!action) return;
    setOpen(false);
    action.run();
  };

  return (
    <Dialog.Root open={open} onOpenChange={show}>
      <Dialog.Portal>
        <Dialog.Backdrop className="palette-backdrop" />
        <Dialog.Popup
          className="palette"
          aria-label="Command palette"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => (i + 1) % Math.max(results.length, 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              commit(active);
            }
          }}
        >
          <input
            autoFocus
            className="palette-input"
            placeholder="Type a command…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            aria-label="Search commands"
          />
          <ul className="palette-list">
            {results.map((a, i) => (
              <li key={a.label}>
                <button
                  type="button"
                  className={i === active ? "palette-item is-active" : "palette-item"}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(i)}
                >
                  <span>{a.label}</span>
                  <span className="palette-hint">{a.hint}</span>
                </button>
              </li>
            ))}
            {results.length === 0 && (
              <li className="palette-empty">No matches.</li>
            )}
          </ul>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
