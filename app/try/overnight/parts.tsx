import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { shotSrc, type Console as C, type Link as L, type Shot as S } from "./content";

/** A themed capture: both renders exist, CSS shows the one matching the
 *  site theme, and the hidden one is lazy so it never downloads. */
export function Shot({ shot, sizes, className = "" }: { shot: S; sizes: string; className?: string }) {
  const common = { width: shot.w, height: shot.h, sizes };
  return (
    <span className={`ov-themed ${className}`}>
      <Image {...common} alt={shot.alt} src={shotSrc(shot, "light")} className="ov-img ov-only-light" />
      <Image {...common} alt={shot.alt} src={shotSrc(shot, "dark")} className="ov-img ov-only-dark" />
    </span>
  );
}

/** A floating terminal window of real output, titled with its project. */
export function Console({ console: { label, lines }, className = "" }: { console: C; className?: string }) {
  return (
    <span className={`ov-part ov-console ${className}`}>
      <span className="ov-console-bar">{label}</span>
      <span className="ov-console-body">
        {lines.map((line, i) => (
          <span key={i} className="ov-console-line">
            {line.length === 0
              ? "\u00a0"
              : line.map(([text, tone], j) => (
                  <span key={j} className={tone ? `ov-t-${tone}` : undefined}>{text}</span>
                ))}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Real command output as live text, not a picture of text. */
export function Terminal({ cmd, out, className = "" }: { cmd: string; out: string; className?: string }) {
  return (
    <pre aria-label={`Output of ${cmd}`} className={`ov-term ${className}`}>
      <span className="ov-term-cmd">$ {cmd}</span>
      {"\n\n"}
      {out}
    </pre>
  );
}

/** Internal routes through next/link, everything else opens in a new tab. */
export function A({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={className}>{children}</Link>;
  }
  const ext = href.startsWith("http");
  return (
    <a href={href} className={className} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function Links({ links, className = "" }: { links: L[]; className?: string }) {
  return (
    <ul className={`ov-links ${className}`}>
      {links.map((l) => (
        <li key={l.href}>
          <A href={l.href}>{l.label}</A>
        </li>
      ))}
    </ul>
  );
}
