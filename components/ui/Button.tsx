"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "default" | "primary";

type ButtonProps = {
  children?: ReactNode;
  /** Glyph shown instead of the label once the viewport is narrow. */
  glyph?: ReactNode;
  variant?: Variant;
  /** Icon-only at every size. Implies a 36px square. */
  iconOnly?: boolean;
  href?: string;
  active?: boolean;
  className?: string;
  /** Only for the no-href form. */
  onClick?: () => void;
  target?: string;
  rel?: string;
  title?: string;
  "aria-label"?: string;
};

/**
 * One flat 36px button. `glyph` makes it collapse to an icon square on mobile
 * so a single element covers both presentations — never two siblings.
 */
export default function Button({
  children,
  glyph,
  variant = "default",
  iconOnly = false,
  href,
  active = false,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    variant === "primary" && "btn-primary",
    iconOnly && "btn-square",
    glyph && !iconOnly && "btn-adaptive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const body = iconOnly ? (
    glyph
  ) : (
    <>
      <span className="btn-label">{children}</span>
      {glyph && <span className="btn-glyph">{glyph}</span>}
    </>
  );

  const shared = {
    className: classes,
    "aria-current": active ? ("page" as const) : undefined,
    ...rest,
  };

  // No href means it does something rather than goes somewhere: a real
  // <button>, so it's focusable and fires on Enter/Space.
  if (!href) {
    return (
      <button type="button" {...shared}>
        {body}
      </button>
    );
  }

  // next/link for in-app routes; a plain anchor for mailto: and external.
  const internal = href.startsWith("/");
  if (internal) {
    return (
      <Link href={href} {...shared}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} {...shared}>
      {body}
    </a>
  );
}
