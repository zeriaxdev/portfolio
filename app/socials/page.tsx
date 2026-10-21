import type { Metadata } from "next";
import Link from "next/link";
import {
  siGithub,
  siX,
  siBluesky,
  siMastodon,
  siMatrix,
  siDiscord,
} from "simple-icons";

function SimpleIcon({
  icon,
  size = 15,
}: {
  icon: { path: string };
  size?: number;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className="shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Socials",
  description:
    "Ways to reach zeriax — GitHub, Twitter/X, Bluesky, Matrix, Mastodon, LinkedIn, Discord.",
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/zeriaxdev",
    handle: "@zeriaxdev",
    icon: <SimpleIcon icon={siGithub} />,
  },
  {
    label: "Twitter (X)",
    href: "https://x.com/@zeriaxdev",
    handle: "@zeriaxdev",
    icon: <SimpleIcon icon={siX} />,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/zeriax.com",
    handle: "@zeriax.com",
    icon: <SimpleIcon icon={siBluesky} />,
  },
  {
    label: "Matrix",
    href: "https://matrix.to/#/@egorrg:matrix.org",
    handle: "@egorrg:matrix.org",
    rel: "me",
    icon: <SimpleIcon icon={siMatrix} />,
  },
  {
    label: "Mastodon",
    href: "https://mementomori.social/@zeriax",
    handle: "@zeriax@mementomori.social",
    rel: "me",
    icon: <SimpleIcon icon={siMastodon} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/egor-gaynutdinov",
    handle: "@egor-gaynutdinov",
    icon: <LinkedInIcon />,
  },
  {
    label: "Discord",
    href: "https://discord.com/users/902605066303848458",
    handle: "@zeriax_",
    icon: <SimpleIcon icon={siDiscord} />,
  },
];

export default function Socials() {
  return (
    <div className="span-all">
      <header className="page-head">
        <h1 className="page-title">Socials</h1>
        <p className="page-lede">Now, here is a bajillion different ways to contact me.</p>
      </header>
      <ul className="rows col">
        {socials.map(({ label, href, handle, rel, icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel={`noopener noreferrer${rel ? ` ${rel}` : ""}`} className="row-link">
              <span className="row-main">
                {icon}
                {label}
              </span>
              <span className="row-side">{handle}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="col work-also">
        If this still doesn&apos;t cut it, you can have my{" "}
        <Link href="/sshkey.txt" className="t-link">SSH public keys</Link> and{" "}
        <Link href="/pgpkey.txt" className="t-link">PGP public keys</Link>.
      </p>
    </div>
  );
}
