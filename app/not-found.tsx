"use client";
import ScrambledText from "@/components/other/ScrambledText";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mb-14">
      <p className="mb-2 text-md text-neutral-500 dark:text-neutral-500 font-mono">
        404
      </p>
      <h1 className="mb-6 text-2xl font-semibold tracking-tighter font-mono scramble">
        <ScrambledText radius={30} duration={3} speed={0.5} scrambleChars=".:">
          page not found
        </ScrambledText>
      </h1>
      <ScrambledText
        className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8"
        radius={30}
        duration={3}
        speed={0.5}
        scrambleChars=".:"
      >
        whatever you were looking for isn't here - it may have been deleted,
        moved, or never existed. while you're at it, you could also hover over
        this text.
      </ScrambledText>
      <Link
        href="/"
        className="text-sm text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-700 dark:hover:decoration-neutral-300 transition-colors"
      >
        ← back home
      </Link>
    </section>
  );
}
