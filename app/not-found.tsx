"use client";
import ScrambledText from "@/components/other/ScrambledText";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mb-14">
      <p className="mb-2 text-md text-zinc-500 dark:text-zinc-500 font-mono">
        404
      </p>
      <h1 className="mb-6 text-2xl font-semibold tracking-tighter font-mono scramble">
        <ScrambledText radius={30} duration={3} speed={0.5} scrambleChars=".:">
          page not found
        </ScrambledText>
      </h1>
      <ScrambledText
        className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8"
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
        className="text-sm text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-zinc-700 dark:hover:decoration-zinc-300 transition-colors"
      >
        ← back home
      </Link>
    </section>
  );
}
