"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="mb-14">
      <nav className="flex items-center justify-between">
        <div className="flex gap-4">
          <NavLink href="/">home</NavLink>
          <NavLink href="/blog">blog</NavLink>
          <NavLink href="/portfolio">portfolio</NavLink>
          <NavLink href="/socials">socials</NavLink>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={active ? "nav-link-active" : "nav-link"}>
      {children}
    </Link>
  );
}
