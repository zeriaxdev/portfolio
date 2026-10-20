import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Overnight options", robots: { index: false } };

const options = [
  {
    href: "/try/overnight/a",
    name: "A — Floating parts",
    img: "/work/overnight/compare-a.webp",
    what: "design.how's idiom with your own work as the imagery: real pieces of the DollarDeploy pricing page float above one short sentence, then a narrow column with two framed pieces of work.",
    tradeoff: "The calmest and most polished; it leans entirely on DollarDeploy, and the floating pieces are decoration until someone reads the caption.",
  },
  {
    href: "/try/overnight/b",
    name: "B — Poster",
    img: "/work/overnight/compare-b.webp",
    what: "Your saved posters' idiom: sparse stepped words, one big two-colour bitmap of the DollarDeploy landscape and tiny corner labels, then each project as a quiet sheet with one large piece of evidence.",
    tradeoff: "The most character and closest to your Pinterest board; the first screen says less about what you do than A or C.",
  },
  {
    href: "/try/overnight/c",
    name: "C — Split",
    img: "/work/overnight/compare-c.webp",
    what: "A fixed column of serif intro, work list and contact on the left; the evidence scrolls past on the right, each with a one-paragraph caption.",
    tradeoff: "The fastest for a hiring reviewer to scan; also the most conventional of the three.",
  },
];

export default function Overnight() {
  return (
    <section className="span-all">
      <h1 className="t-title">Overnight options</h1>
      <p className="t-body mt-4">
        Three minimal compositions, identical content: DollarDeploy&apos;s landing and pricing (lead) and solidtime-cli, all
        from real captures. Earlier, maximal versions are kept only as screenshots in the review. The live homepage is untouched. Notes, screenshots and open questions are in{" "}
        <code className="t-mono">research/2026-10-20-visual-direction/overnight-results/REVIEW.md</code>.
      </p>
      <div className="ov-compare">
        {options.map((o) => (
          <Link key={o.href} href={o.href} className="ov-compare-card">
            <Image src={o.img} alt="" width={1440} height={1000} sizes="(max-width: 48rem) 100vw, 33vw" />
            <span className="t-heading">{o.name}</span>
            <span className="t-small">{o.what}</span>
            <span className="t-small ov-compare-trade">Tradeoff: {o.tradeoff}</span>
          </Link>
        ))}
      </div>
      <p className="t-small mt-12">
        Older directions: <Link className="t-link" href="/try">/try</Link> (loud, quiet, terminal).
      </p>
    </section>
  );
}
