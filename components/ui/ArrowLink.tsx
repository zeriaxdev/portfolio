import Link from "next/link";
import { ReactNode } from "react";

/** Underlined at rest with a bare caret; on hover the underline drops and the
 *  arrow's shaft draws in. Lifted from Base UI's own docs link. */
export default function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const body = (
    <>
      {children}
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path className="caret" d="M6 12L10 8L6 4" />
        <path className="shaft" d="M2 8L13 8" />
      </svg>
    </>
  );

  if (external || !href.startsWith("/")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="t-link arrow-link">
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className="t-link arrow-link">
      {body}
    </Link>
  );
}
