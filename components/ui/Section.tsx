import { ReactNode } from "react";

/** Label on the left, content on the right, both on the page grid.
 *  The only section primitive — every page uses this rather than its own. */
export default function Section({
  label,
  children,
  id,
}: {
  label: string;
  children: ReactNode;
  id?: string;
}) {
  const headingId = id ?? `${label.replace(/\W+/g, "-").toLowerCase()}-heading`;
  return (
    <section className="section" aria-labelledby={headingId}>
      <h2 id={headingId} className="t-small">
        {label}
      </h2>
      <div className="section-body">{children}</div>
    </section>
  );
}
