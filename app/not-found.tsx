"use client";
import Link from "next/link";
import ScrambledText from "@/components/other/ScrambledText";

export default function NotFound() {
  return (
    <section className="span-all">
      <header className="page-head">
        <p className="page-lede">404</p>
        <h1 className="page-title">
          <ScrambledText radius={30} duration={3} speed={0.5} scrambleChars=".:">
            page not found
          </ScrambledText>
        </h1>
        <ScrambledText className="page-lede" radius={30} duration={3} speed={0.5} scrambleChars=".:">
          whatever you were looking for isn&apos;t here - it may have been deleted, moved, or never existed.
          while you&apos;re at it, you could also hover over this text.
        </ScrambledText>
        <div className="actions">
          <Link href="/" className="quiet-btn">Back home</Link>
        </div>
      </header>
    </section>
  );
}
