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
    <section className="span-all">
      <h1 className="t-title mb-[clamp(2rem,5vw,3rem)]">blog</h1>
      <div className="list">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="list-row">
            <div className="list-head">
              <span className="list-title">{post.title}</span>
              <span className="list-meta">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
