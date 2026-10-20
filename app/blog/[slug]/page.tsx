import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Pre, Table, P } from "@/components/MDXComponents";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    return;
  }

  const description = post.content.replace(/[#*`>\[\]]/g, "").substring(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `https://zeriax.com/blog/${post.slug}`,
      images: [{ url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="span-body">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.date,
            description: post.content.substring(0, 160),
            url: `https://zeriax.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "zeriaxdev",
            },
          }),
        }}
      />
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.readingTime} min read
        </p>
      </div>
      <article>
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeHighlight,
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "wrap",
                    properties: {
                      className: ["heading-anchor"],
                      ariaLabel: "Link to section",
                    },
                  },
                ],
              ],
            },
          }}
          components={{
            pre: Pre,
            table: Table,
            p: P,
          }}
        />
      </article>
    </section>
  );
}
