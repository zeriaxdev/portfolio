import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects by zeriax — DollarDeploy, ruoka-rs, and maykbot-ts.",
};

export default function Portfolio() {
  return (
    <section className="span-all">
      <h1 className="t-title mb-[clamp(2rem,5vw,3rem)]">portfolio</h1>
      <ProjectList />
    </section>
  );
}
