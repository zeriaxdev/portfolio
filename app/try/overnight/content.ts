/* Shared, truthful content for the three overnight previews. Every variant
   renders this — only composition changes. Throwaway with app/try/overnight. */

export const person = {
  name: "zeriax",
  line: "I design and build small tools.",
  role: "Student working across product design and software engineering.",
  intro:
    "Most of what I build is unglamorous and Finnish: lunch menus, grocery prices, library catalogues, apartment listings — scraped, normalised, and served as something you can actually query.",
  job: "Junior Product Designer at DollarDeploy, part-time since March 2025.",
  about: [
    "I spent years deep in the Linux rabbit hole — Arch, ricing, bspwm, the works — before settling on macOS. That's where the taste for small, fast, dependency-free tools comes from. Programming since 2021.",
    "I also LOOOVE self-hosting. A spare VPS and a chunky homeserver run everything from Pterodactyl Minecraft servers to Jellyfin, which is how half these projects start.",
  ],
};

export type Link = { href: string; label: string };

export const email: Link = { href: "mailto:contact@zeriax.com", label: "contact@zeriax.com" };
export const elsewhere: Link[] = [
  { href: "https://github.com/zeriaxdev/", label: "GitHub" },
  { href: "https://www.linkedin.com/in/egor-gaynutdinov/", label: "LinkedIn" },
  { href: "/blog", label: "Blog" },
];

export const dd = {
  name: "DollarDeploy",
  what: "Landing and pricing pages, at work",
  role: "I designed DollarDeploy's landing and pricing pages, including the motion on pricing.",
  decision:
    "Every plan card carries its own dither field. Reach for a plan's button and its card lights up in that plan's colour — green for Hobby, blue for Pro, purple for Enterprise.",
  live: { href: "https://dollardeploy.com/pricing", label: "Live pricing" } as Link,
  landing: { href: "https://dollardeploy.com", label: "Live landing" } as Link,
  page: { href: "/portfolio/dollardeploy", label: "More" } as Link,
};

/** The DollarDeploy case on option A. */
export const ddCase = {
  meta: "Junior Product Designer, part-time since March 2025",
  intro:
    "I redesigned DollarDeploy's landing and pricing pages, both live since autumn 2026. Inside the product I've also redesigned the app shell, settings and the AI agent.",
  landing:
    "The August version worked, but it looked like a lot of AI products: a centred serif, a typing animation, a prompt box. I wanted DollarDeploy to have an identity of its own, so the redesign leans on dithering and a pixel serif, and says the promise — your app, your server, no DevOps — in two lines.",
  before: {
    src: "/work/overnight/dd-landing-before",
    label: "Aug 2026",
    alt: "DollarDeploy landing in August 2026: centred headline “You built an internal tool. Now ship it to real users.”, a prompt box and four suggestion chips.",
  },
  after: {
    src: "/work/overnight/dd-landing-after",
    label: "Now",
    alt: "DollarDeploy landing now: “Your Apps. Your Infra. Zero DevOps.” on the left, a dithered blue landscape on the right, two buttons below.",
  },
};

export const st = {
  name: "solidtime-cli",
  what: "Time tracking from the terminal, in Go",
  decision:
    "Anything that changes more than one entry previews first and does nothing until you add --yes. The API token is never a command-line argument, so it stays out of your shell history.",
  source: "Run against the repo's own demo server; the entries are invented test data.",
  repo: { href: "https://github.com/zeriaxdev/solidtime-cli", label: "Source" } as Link,
};

export const stDelete = {
  cmd: "solidtime delete --from 2026-01-01 --to 2026-01-31 --project Internal",
  out: `DATE            TIME         HOURS  PROJECT
Fri 2026-01-16  14:00–16:00  2:00   Internal
Thu 2026-01-15  08:30–09:00  0:30   Internal

2 entries, 2:30 h

Dry run: would delete 2 entries. Re-run with --yes to apply.`,
};

export const motion = {
  src: "dd-pricing-hover",
  w: 1216,
  h: 600,
  label:
    "Screen recording of the DollarDeploy pricing cards: as the pointer moves across each plan's button, that card's dithered background shifts to the plan's colour.",
};

export type Shot = { src: string; themed?: boolean; w: number; h: number; alt: string };

export const landing: Shot = {
  src: "dd-landing",
  themed: true,
  w: 2000,
  h: 1042,
  alt: "DollarDeploy landing page: “Your Apps. Your Infra. Zero DevOps.” beside a dithered blue landscape.",
};

/** A console line: [text, colour]. Colours: p prompt, c command, k subcommand,
 *  f flag, s string, n number, b boolean, d dim. Unmarked text is plain. */
export type Seg = [string, ("p" | "c" | "k" | "f" | "s" | "n" | "b" | "d")?];
export type Console = { label: string; lines: Seg[][] };

/** Real output from three projects, as consoles in A's hero. Whitespace in the
 *  help text is condensed; the k-ruoka product name is trimmed with "…". */
export const consoles: Record<"solidtime" | "mcmove" | "kruoka", Console> = {
  solidtime: {
    label: "solidtime-cli",
    lines: [
      [["$ ", "p"], ["solidtime ", "c"], ["report ", "k"], ["--from ", "f"], ["2026-01-01 ", "n"], ["--to ", "f"], ["2026-01-31", "n"]],
      [["2026-01-01 .. 2026-01-31", "d"]],
      [],
      [["Mobile App  "], ["12.50 h  ", "n"], ["€1375.00", "s"]],
      [["Website     "], ["11.50 h  ", "n"], ["€1092.50", "s"]],
      [["Internal    "], ["2.50 h   ", "n"], ["€0.00", "s"]],
      [],
      [["TOTAL       ", "c"], ["26.50 h  ", "n"], ["€2467.50", "s"]],
    ],
  },
  mcmove: {
    label: "mcmove",
    lines: [
      [["$ ", "p"], ["mcmove ", "c"], ["--help", "f"]],
      [["Commands:", "d"]],
      [["  sync    ", "k"], ["Push: patch a server's /mods to match the local instance"]],
      [["  pull    ", "k"], ["Reverse: download the server's mods into your local instance"]],
      [["  update  ", "k"], ["Check Modrinth for newer mod versions…"]],
    ],
  },
  kruoka: {
    label: "k-ruoka-scraper",
    lines: [
      [["{", "d"]],
      [["  \"name\"", "f"], [": "], ["\"Oddlygood Barista…\"", "s"], [","]],
      [["  \"price\"", "f"], [": "], ["1.99", "n"], [","]],
      [["  \"unitPrice\"", "f"], [": "], ["1.99", "n"], [","]],
      [["  \"isDomestic\"", "f"], [": "], ["true", "b"]],
      [["}", "d"]],
    ],
  },
};

export const terrain = { src: "/work/overnight/dd-terrain-bitmap.png", w: 360, h: 215 };

/** Everything else, by name. Zenith and peek deliberately left out. */
export const also: Link[] = [
  { href: "/portfolio/mcmove", label: "mcmove" },
  { href: "/portfolio/k-ruoka-scraper", label: "k-ruoka-scraper" },
  { href: "/portfolio/mac-schoolmenu", label: "mac-schoolmenu" },
  { href: "/portfolio/menu-api", label: "menu-api" },
];

export const shotSrc = (s: Shot, theme?: "light" | "dark") =>
  `/work/overnight/${s.src}${s.themed && theme ? `-${theme}` : ""}.webp`;
