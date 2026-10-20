"use client";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { GithubIcon, EmailIcon } from "@/components/Footer";
import { useThemeHotkey } from "@/hooks/useThemeHotkey";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/socials", label: "Socials" },
];

export default function CornerNav() {
  useThemeHotkey();
  const pathname = usePathname();

  return (
    <div className="corner-bar">
      <div className="corner-group">
        <Button href="/">zeriax</Button>
      </div>

      <nav className="corner-group" aria-label="Main">
        {links.map(({ href, label }) => (
          <Button key={href} href={href} active={pathname.startsWith(href)}>
            {label}
          </Button>
        ))}
      </nav>

      <div className="corner-group">
        <Button
          href="https://github.com/zeriaxdev/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          iconOnly
          glyph={<GithubIcon />}
        />
        <Button
          href="mailto:contact@zeriax.com"
          variant="primary"
          glyph={<EmailIcon />}
        >
          Email me
        </Button>
      </div>
    </div>
  );
}
