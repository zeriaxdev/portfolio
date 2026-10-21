/* What the site shows of projects beyond lib/projects.ts: real output and
   captures, plus the DollarDeploy case. Nothing here is mocked up. */

/** A console line: [text, colour]. Colours: p prompt, c command, k subcommand,
 *  f flag, s string, n number, b boolean, d dim. Unmarked text is plain. */
export type Seg = [string, ("p" | "c" | "k" | "f" | "s" | "n" | "b" | "d")?];
export type Console = { label: string; lines: Seg[][] };

/** Real output. Whitespace in help text is condensed and long values are
 *  trimmed with "…"; solidtime-cli ran against its own demo server, whose
 *  entries are invented test data. */
export const consoles = {
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
  solidtimeDelete: {
    label: "solidtime-cli",
    lines: [
      [["$ ", "p"], ["solidtime ", "c"], ["delete ", "k"], ["--from ", "f"], ["2026-01-01 ", "n"], ["--to ", "f"], ["2026-01-31 ", "n"], ["--project ", "f"], ["Internal", "s"]],
      [["DATE            TIME         HOURS  PROJECT", "d"]],
      [["Fri 2026-01-16  14:00–16:00  "], ["2:00", "n"], ["   Internal"]],
      [["Thu 2026-01-15  08:30–09:00  "], ["0:30", "n"], ["   Internal"]],
      [],
      [["2 entries, 2:30 h", "d"]],
      [["Dry run: ", "k"], ["would delete 2 entries. Re-run with "], ["--yes", "f"], [" to apply."]],
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
  // Monday's lunch at MAYK, 20 Oct 2026; meal ids left out.
  menu: {
    label: "menu-api",
    lines: [
      [["$ ", "p"], ["curl ", "c"], ["localhost:3000/mayk/menu", "s"]],
      [["\"menus\"", "f"], [": [{"]],
      [["  \"name\"", "f"], [": "], ["\"Lounas\"", "s"], [","]],
      [["  \"meals\"", "f"], [": ["]],
      [["    { "], ["\"name\"", "f"], [": "], ["\"Bolognesekastike, pasta\"", "s"], [" },"]],
      [["    { "], ["\"name\"", "f"], [": "], ["\"Soijabolognesekastike, pasta\"", "s"], [" }"]],
      [["  ]"]],
      [["}]"]],
    ],
  },
} satisfies Record<string, Console>;

/** The console each project shows on /portfolio and on its own page. */
export const projectConsole: Partial<Record<string, keyof typeof consoles>> = {
  "solidtime-cli": "solidtimeDelete",
  mcmove: "mcmove",
  "k-ruoka-scraper": "kruoka",
  "menu-api": "menu",
};

/** Projects kept in the data but not shown on the site. */
export const hidden = new Set(["peek", "zenith"]);

/** A few words per project for list rows, design.how style. */
export const notes: Record<string, string> = {
  dollardeploy: "Landing, pricing and the app, at work",
  "solidtime-cli": "Time tracking CLI in Go",
  mcmove: "Minecraft mods to servers over SFTP",
  "k-ruoka-scraper": "Grocery prices as an API and MCP",
  "menu-api": "Finnish school lunches as one JSON shape",
  "mac-schoolmenu": "School lunch in the macOS menu bar",
  archrice: "My Arch and bspwm dotfiles",
  "maykbot-ts": "School Discord bot, archived",
  "ruoka-rs": "School menu CLI in Rust, archived",
};

export type Side = { src: string; label: string; alt: string };

export const ddCase = {
  before: {
    src: "/work/dd-landing-before",
    label: "Aug 2026",
    alt: "DollarDeploy landing in August 2026: centred headline “You built an internal tool. Now ship it to real users.”, a prompt box and four suggestion chips.",
  } satisfies Side,
  after: {
    src: "/work/dd-landing-after",
    label: "Now",
    alt: "DollarDeploy landing now: “Your Apps. Your Infra. Zero DevOps.” on the left, a dithered blue landscape on the right, two buttons below.",
  } satisfies Side,
  landingNote: "Less generic: dithering and a pixel serif",
  pricingNote: "Each plan's dither lights up on hover",
  landing: "https://dollardeploy.com",
  pricing: "https://dollardeploy.com/pricing",
};

export const pricingMotion = {
  src: "dd-pricing-hover",
  w: 1216,
  h: 600,
  label:
    "Screen recording of the DollarDeploy pricing cards: as the pointer moves across each plan's button, that card's dithered background shifts to the plan's colour.",
};
