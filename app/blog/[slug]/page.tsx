import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import CategoryBadge from "@/components/CategoryBadge";
import NewsletterForm from "@/components/NewsletterForm";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedPosts from "@/components/RelatedPosts";
import SEOHead from "@/components/SEOHead";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate, getAbsoluteUrl, getCategoryMeta, siteConfig } from "@/lib/utils";

export const dynamicParams = false;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const mdxOptions: any = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
          },
        },
      ],
      rehypeHighlight,
    ],
  },
};

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const src = typeof props.src === "string" ? props.src : "";

  if (!src) {
    return null;
  }

  const width = Number(props.width) || 1200;
  const height = Number(props.height) || 675;

  return (
    <Image
      src={src}
      alt={props.alt ?? "Blog post image"}
      width={width}
      height={height}
      loading="lazy"
      className="my-8 rounded-xl shadow-md border border-ink-200 dark:border-ink-700"
    />
  );
}

function mdxComponents() {
  return {
    img: MdxImage,
    blockquote: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <blockquote
        {...props}
        className="my-6 border-l-4 border-brand-400 bg-brand-50 px-6 py-4 italic text-ink-600 rounded-r-lg dark:border-brand-500 dark:bg-brand-950/30 dark:text-ink-300"
      >
        {children}
      </blockquote>
    ),
    a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isExternal = typeof href === "string" && href.startsWith("http");

      return (
        <a
          href={href}
          {...props}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-medium text-brand-500 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-600 hover:decoration-brand-400 dark:decoration-brand-700 dark:hover:decoration-brand-500"
        >
          {children}
        </a>
      );
    },
    code: ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => {
      if (className?.includes("language-")) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <code
          {...props}
          className="rounded bg-brand-50 px-1.5 py-0.5 text-[0.9em] font-mono text-brand-700 dark:bg-ink-800 dark:text-brand-300"
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
      <pre
        {...props}
        className="not-prose my-6 overflow-x-auto rounded-xl bg-ink-900 p-4 text-sm text-ink-100 border border-ink-800"
      >
        {children}
      </pre>
    ),
    h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        {...props}
        className="mt-12 scroll-mt-28 border-l-3 border-brand-500 pl-3 font-heading text-3xl font-bold text-ink-900 dark:text-white"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        {...props}
        className="mt-10 scroll-mt-28 font-heading text-2xl font-semibold text-brand-600 dark:text-brand-400"
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props} className="mt-5 leading-8 text-ink-700 dark:text-ink-300">
        {children}
      </p>
    ),
    strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <strong {...props} className="font-semibold text-ink-900 dark:text-white">
        {children}
      </strong>
    ),
    ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
      <ul
        {...props}
        className="my-5 list-disc space-y-2 pl-6 text-ink-700 dark:text-ink-300"
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
      <ol
        {...props}
        className="my-5 list-decimal space-y-2 pl-6 text-ink-700 dark:text-ink-300"
      >
        {children}
      </ol>
    ),
  };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested article was not found.",
    };
  }

  const categoryMeta = getCategoryMeta(post.category);
  const canonicalUrl = getAbsoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.lastUpdated,
      authors: [post.author],
      section: categoryMeta.name,
      tags: post.tags,
      images: [
        {
          url: getAbsoluteUrl(post.featuredImage || "/images/og-default.png"),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      images: [
        getAbsoluteUrl(post.featuredImage || "/images/og-default.png"),
      ],
    },
    other: {
      "article:published_time": post.date,
      "article:modified_time": post.lastUpdated,
      "article:author": post.author,
      "article:section": categoryMeta.name,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(post.category);
  const relatedPosts = getRelatedPosts(post, 3);
  const canonicalUrl = getAbsoluteUrl(`/blog/${post.slug}`);
  const authorInitials = post.author
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastUpdated,
    author: {
      "@type": "Person",
      name: post.author,
    },
  };

  return (
    <>
      <ReadingProgress />

      {/* ═══ POST HEADER ═══ */}
      <section className="relative overflow-hidden bg-ink-950 py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-brand-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <CategoryBadge category={post.category} />
          <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-400">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-500">
            <span>{formatDate(post.date)}</span>
            <span className="text-ink-700">•</span>
            <span>{post.readTime}</span>
            <span className="text-ink-700">•</span>
            <span>By {post.author}</span>
            <span className="text-ink-700">•</span>
            <span>{categoryMeta.name}</span>
          </div>
        </div>
      </section>

      {/* ═══ ARTICLE CONTENT ═══ */}
      <article className="mx-auto max-w-7xl px-6 py-16">
        <SEOHead jsonLd={jsonLd} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            {/* Mobile TOC */}
            <TableOfContents headings={post.headings} />

            <div className="prose prose-slate max-w-none dark:prose-invert">
              <MDXRemote
                source={post.content}
                options={mdxOptions}
                components={mdxComponents()}
              />
            </div>

            <section className="mt-12 space-y-10 border-t border-ink-200 pt-10 dark:border-ink-800">
              {/* Tags */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-ink-900 dark:text-white">
                  Tags
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink-300 px-3 py-1 text-xs font-medium text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-ink-700 dark:text-ink-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-ink-900 dark:text-white">
                  Share This Article
                </h2>
                <div className="mt-4">
                  <ShareButtons url={canonicalUrl} title={post.title} />
                </div>
              </div>

              {/* Author card */}
              <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-ink-950 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-indigo-500/5" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-500 text-base font-bold text-white">
                    {authorInitials}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-semibold text-white">
                      {post.author}
                    </p>
                    <p className="mt-1 text-sm text-ink-400">
                      Developer and educator helping Pakistani students build practical tech careers.
                    </p>
                  </div>
                </div>
              </div>

              <RelatedPosts posts={relatedPosts} />

              {/* Newsletter */}
              <section className="relative overflow-hidden rounded-2xl bg-ink-950 px-6 py-10">
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-[300px] rounded-full bg-brand-500/10 blur-3xl" />
                <div className="relative z-10 text-center">
                  <h2 className="font-heading text-3xl font-bold">
                    <span className="gradient-text">Get articles delivered</span>
                    <br />
                    <span className="text-white">to your inbox</span>
                  </h2>
                  <p className="mt-3 text-ink-400">
                    No spam. Just practical tech content for students.
                  </p>
                  <div className="mt-6">
                    <NewsletterForm compact />
                  </div>
                </div>
              </section>
            </section>
          </div>

          {/* Desktop TOC */}
          <div className="hidden lg:block">
            <TableOfContents headings={post.headings} />
          </div>
        </div>
      </article>
    </>
  );
}
