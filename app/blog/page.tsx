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
    <section className="mb-14">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">blog</h1>
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-item"
          >
            <div className="blog-item-inner">
              <p className="blog-date">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-primary">{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
