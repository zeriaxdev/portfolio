import Link from "next/link";
import type { ReactNode } from "react";
import type { Console as C } from "@/lib/work";

/** A terminal window of real output, titled with its project. */
export function Console({ console: { label, lines }, className = "" }: { console: C; className?: string }) {
  return (
    <span className={`console ${className}`}>
      <span className="console-bar">{label}</span>
      <span className="console-body">
        {lines.map((line, i) => (
          <span key={i} className="console-line">
            {line.length === 0
              ? " "
              : line.map(([text, tone], j) => (
                  <span key={j} className={tone ? `tone-${tone}` : undefined}>{text}</span>
                ))}
          </span>
        ))}
      </span>
    </span>
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

/** design.how's caption row: a name on the left, a few muted words on the right. */
export function Row({ name, href, note, as: H = "h3" }: { name: string; href: string; note: string; as?: "h2" | "h3" }) {
  return (
    <div className="work-row">
      <H className="work-row-name"><A href={href} className="t-link">{name}</A></H>
      <p className="work-row-note">{note}</p>
    </div>
  );
}
