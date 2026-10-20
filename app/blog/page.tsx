import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts by zeriax.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="span-all">
      <header className="page-head">
        <h1 className="page-title">Blog</h1>
      </header>
      <ul className="rows col">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="row-link">
              <span className="row-main">{post.title}</span>
              <time className="row-side" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
