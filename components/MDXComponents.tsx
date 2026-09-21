"use client";

import React from "react";
import { useRef, useState } from "react";

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Pre({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const onCopy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2.5 right-2.5 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

export function Table({ children, ...props }: any) {
  return (
    <div className="overflow-x-auto w-full my-8 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl">
      <table className="w-full text-left border-collapse" {...props}>
        {children}
      </table>
    </div>
  );
}

/**
 * Smart paragraph component.
 * Detects the image-caption pattern:
 *   ![alt](url)
 *   *caption text*
 * which renders as <p><img /><em>caption</em></p> in MDX,
 * and converts it to a proper <figure> + <figcaption>.
 */
export function P({ children }: { children?: React.ReactNode }) {
  const arr = React.Children.toArray(children);

  const imgIndex = arr.findIndex(
    (c) => React.isValidElement(c) && (c as React.ReactElement).type === "img",
  );

  if (imgIndex !== -1) {
    const imgEl = arr[imgIndex];
    // Caption: first <em> after the image (skip whitespace text nodes)
    const after = arr
      .slice(imgIndex + 1)
      .filter((c) => !(typeof c === "string" && c.trim() === ""));
    const captionEl = after.find(
      (c) =>
        React.isValidElement(c) && (c as React.ReactElement).type === "em",
    );

    return (
      <figure className="my-8">
        {imgEl}
        {captionEl && (
          <figcaption>
            {(captionEl as React.ReactElement<{ children: React.ReactNode }>)
              .props.children}
          </figcaption>
        )}
      </figure>
    );
  }

  return <p>{children}</p>;
}
