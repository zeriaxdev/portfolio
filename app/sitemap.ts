import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://zeriax.com/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: "https://zeriax.com", lastModified: new Date() },
    { url: "https://zeriax.com/blog", lastModified: new Date() },
    { url: "https://zeriax.com/portfolio", lastModified: new Date() },
    { url: "https://zeriax.com/socials", lastModified: new Date() },
    ...postEntries,
  ];
}
