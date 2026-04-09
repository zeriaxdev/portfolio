import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Blog Post Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  // Safely load fonts inside request handler and force isolated ArrayBuffer conversion
  const geistRegularBuffer = await readFile(
    join(process.cwd(), "public", "fonts", "Geist-Regular.woff"),
  );
  const geistRegularArrayBuffer = await new Response(
    geistRegularBuffer,
  ).arrayBuffer();

  const geistBoldBuffer = await readFile(
    join(process.cwd(), "public", "fonts", "Geist-Bold.woff"),
  );
  const geistBoldArrayBuffer = await new Response(
    geistBoldBuffer,
  ).arrayBuffer();

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          background: "#09090b", // zinc-950
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#e4e4e7", // zinc-200
        }}
      >
        Not Found
      </div>,
      {
        ...size,
        fonts: [
          {
            name: "Geist",
            data: geistRegularArrayBuffer,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );
  }

  // A very minimalist, stark design matching the portfolio theme
  return new ImageResponse(
    <div
      style={{
        background: "#09090b", // zinc-950
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top left decorative element */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            background: "#e4e4e7", // zinc-200
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            color: "#a1a1aa",
            fontSize: 24,
            letterSpacing: "-0.05em",
            fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          zeriax.com
        </span>
      </div>

      {/* Main Title Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "900px",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f4f5", // zinc-100
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: 32,
            color: "#a1a1aa", // zinc-400
            marginTop: "20px",
          }}
        >
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span style={{ color: "#3f3f46" }}>•</span> {/* zinc-700 */}
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistRegularArrayBuffer,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: geistBoldArrayBuffer,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
