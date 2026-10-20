export interface Project {
  slug: string;
  name: string;
  description: string;
  /** Outbound link: repo, crate or site. */
  href: string;
  tags: string[];
  archived?: boolean;
  featured?: boolean;
  /**
   * Screenshot in /public/work. Rows render without one until a real file is
   * dropped in — no placeholder art.
   */
  image?: string;
  /** Required whenever `image` is set. */
  imageAlt?: string;
  /** Drafted from the repo README. A project without one has no detail page. */
  overview?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    slug: "dollardeploy",
    name: "DollarDeploy",
    description:
      "Assisting with DollarDeploy, a fast code-to-production app made for developers.",
    href: "https://dollardeploy.com",
    tags: ["Next.js", "TypeScript", "Design"],
    featured: true,
    overview:
      "Where I work. DollarDeploy takes an app from a Git repo to a server you own — it provisions the box, configures HTTPS and redeploys on every push. I build and maintain the one-click templates for running AI and open-source apps on it, and do continuous UI/UX testing and code review.",
    highlights: [
      "Templates for running AI and open-source apps in one click",
      "Continuous UI/UX testing and code review",
    ],
  },
  {
    slug: "archrice",
    name: "archrice",
    description:
      "My dotfiles — the Arch, bspwm and polybar setup I lived in for years.",
    href: "https://github.com/zeriaxdev/archrice",
    tags: ["Shell", "Linux", "bspwm"],
    featured: true,
    overview:
      "My dotfiles from the years I spent in the Linux rabbit hole. bspwm tiles the windows, sxhkd catches the hotkeys, polybar draws the bar, rofi launches things and kitty is the terminal, with picom compositing over the top and zsh underneath. Entirely non-proprietary.",
    highlights: [
      "bspwm for tiling and sxhkd for hotkeys, with polybar as the status bar and rofi as launcher and window switcher",
      "kitty as the terminal — icat for inline images, pfetch for system info",
      "cava for audio visualisation, picom for compositing, betterlockscreen for the lock screen",
      "brillo and pamixer for backlight and volume; setxkbmap set up for fi/ru",
      "Nerd Fonts required for polybar's glyphs",
    ],
  },
  {
    slug: "k-ruoka-scraper",
    name: "k-ruoka-scraper",
    description:
      "K-Ruoka grocery scraper: REST API, CLI and MCP server, with Redis-backed price tracking.",
    href: "https://github.com/zeriaxdev/k-ruoka-scraper",
    tags: ["TypeScript", "Bun", "Redis", "MCP"],
    featured: true,
    overview:
      "Product search and price tracking for K-Ruoka. It scrapes the K-Ruoka API, serves the result as a REST API, and accumulates price history over time in Redis. Built on Bun, and also exposed as a CLI and an MCP server.",
    highlights: [
      "Endpoints for product search, store lookup, single products and price history",
      "Track and untrack individual products; history accrues in Redis as prices move",
      "Basket comparison — POST a list of items and get the whole basket priced against a store",
      "Every price-bearing endpoint takes a storeId, falling back to KRUOKA_STORE_ID",
      "Health check reports Redis status alongside the API's own",
    ],
  },
  {
    slug: "zenith",
    name: "zenith",
    description:
      "Lightweight native macOS Minecraft launcher, written in Rust with GPUI.",
    href: "https://github.com/zeriaxdev/zenith",
    tags: ["Rust", "GPUI", "macOS"],
    featured: true,
    overview:
      "A native Minecraft launcher for macOS in Rust, built on GPUI — the GPU-accelerated UI framework behind Zed. Early and actively built: Vanilla, Fabric and Quilt launch today, with Forge/NeoForge and Modrinth modpacks on the roadmap.",
    highlights: [
      "Reads Mojang's real version manifest rather than a hardcoded list",
      "Downloads the client jar, libraries (respecting OS/arch rules), natives and assets, in parallel",
      "Builds the java classpath and arguments for both modern and legacy version formats",
      "Mod loaders through their own meta APIs, with inheritsFrom merging",
      "Microsoft sign-in end to end: device-code OAuth, Xbox Live, XSTS, Minecraft — offline mode until an Azure app ID is approved",
      "Single instance with start/stop control and a live, copyable console of launcher and game output",
    ],
  },
  {
    slug: "mcmove",
    name: "mcmove",
    description:
      "Moves worlds, mods and configs from a local Minecraft instance to a Pelican/Pterodactyl server over SFTP.",
    href: "https://github.com/zeriaxdev/mcmove",
    tags: ["Rust", "SFTP", "CLI"],
    featured: true,
    overview:
      "Getting a single-player or Modrinth instance onto a hosted game server normally means a slow web file manager, or copying as root and then fixing ownership by hand. mcmove goes over the panel's SFTP from your machine instead, so files land owned by the server user by construction — no root, no chown.",
    highlights: [
      "Mods are patched, not wiped — it diffs your local instance against the server and only adds, updates or removes what actually changed",
      "Mods you added directly on the server are never touched",
      "Client-only mods (shaders, minimaps, texture packs) are detected and kept off the server so it doesn't crash",
      "Keeps level-name in server.properties in sync, so the world actually loads",
      "Can back up the server's current files before overwriting; remembers the instance path per server",
    ],
  },
  {
    slug: "mac-schoolmenu",
    name: "mac-schoolmenu",
    description:
      "macOS menu-bar app for Finnish school and canteen lunch menus.",
    href: "https://github.com/zeriaxdev/mac-schoolmenu",
    tags: ["Swift", "macOS"],
    overview:
      "A menu-bar app for Finnish school and canteen lunch menus. Icon-only in the bar; click for today and tomorrow inline, with the rest of the week in submenus. Nothing is bundled — the first launch opens the picker.",
    highlights: [
      "Two sources: Jamix's public kitchen directory, and any wilma-foodmenu instance",
      "Paste a Jamix web link straight in and it reads the customer, kitchen and menu type out of the URL",
      "Three Swift files, no dependencies, no package manager — macOS 13+",
      "Refetched when opened, cached for 30 minutes",
      "Diet codes get tooltips (G → gluteeniton), portions shown in grams",
      "UI strings are Finnish, matching the data",
    ],
  },
  {
    slug: "solidtime-cli",
    name: "solidtime-cli",
    description:
      "Report tracked hours and billable totals from solidtime, from your terminal.",
    href: "https://github.com/zeriaxdev/solidtime-cli",
    tags: ["Go", "CLI"],
    overview:
      "Answers the questions you would otherwise open the solidtime web app for: what did I work on today, how many hours did that client get last month, and what do I invoice for it. It reads the solidtime v1 API and never writes to your time entries.",
    highlights: [
      "A table for humans, plus TSV, CSV, JSON and Markdown for everything else",
      "Period selection, grouping and invoice totals",
      "Read-only by design — it cannot touch your time entries",
    ],
  },
  {
    slug: "menu-api",
    name: "menu-api",
    description:
      "Unified daily menu API for Finnish schools and institutions.",
    href: "https://github.com/zeriaxdev/menu-api",
    tags: ["TypeScript", "Node", "API"],
    overview:
      "Finnish institutions publish their lunch menus as HTML, PDF, iCal and assorted proprietary APIs, none of which agree on anything. This is the middleware that aggregates them and serves one unified JSON shape. It's what backs the non-Jamix schools in mac-schoolmenu.",
    highlights: [
      "One JSON shape across every provider, whatever the source format",
      "Providers discoverable over a /menus endpoint",
    ],
  },
  {
    slug: "peek",
    name: "peek",
    description: "Fast, private, offline Chrome new-tab dashboard. GPL-2.",
    href: "https://github.com/zeriaxdev/peek",
    tags: ["TypeScript", "Chrome"],
  },
  {
    slug: "maykbot-ts",
    name: "maykbot-ts",
    description:
      "Discord bot for Maunulan Yhteiskoulu. HSL/Covid/menu/YLE/weather data.",
    href: "https://github.com/libreMayk/maykbot-ts",
    tags: ["Discord.js", "TypeScript"],
    archived: true,
  },
  {
    slug: "ruoka-rs",
    name: "ruoka-rs",
    description:
      "CLI tool to fetch the mayk.fi menu effectively. Blazingly fast!",
    href: "https://crates.io/crates/ruoka-rs",
    tags: ["Rust"],
    archived: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
