import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";

import type { Metadata } from "next";
import Image from "next/image";
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
      className="my-8 rounded-xl border border-border dark:border-slate-700"
    />
  );
}

function mdxComponents() {
  return {
    img: MdxImage,
    blockquote: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <blockquote
        {...props}
        className="my-6 border-l-4 border-primary bg-blue-50/60 px-5 py-3 italic text-slate-700 dark:border-blue-500 dark:bg-blue-950/30 dark:text-slate-200"
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
          className="font-medium text-primary underline decoration-blue-200 underline-offset-4 hover:text-primaryDark dark:decoration-blue-600"
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
          className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.95em] text-slate-900 dark:bg-slate-800 dark:text-slate-100"
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
      <pre
        {...props}
        className="not-prose my-6 overflow-x-auto rounded-xl bg-codeBg p-4 text-sm text-slate-100"
      >
        {children}
      </pre>
    ),
    h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        {...props}
        className="mt-12 scroll-mt-28 font-heading text-3xl font-bold text-slate-900 dark:text-slate-100"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        {...props}
        className="mt-10 scroll-mt-28 font-heading text-2xl font-semibold text-slate-900 dark:text-slate-100"
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props} className="mt-5 leading-8 text-textPrimary dark:text-slate-200">
        {children}
      </p>
    ),
    strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <strong {...props} className="font-semibold text-slate-900 dark:text-white">
        {children}
      </strong>
    ),
    ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
      <ul
        {...props}
        className="my-5 list-disc space-y-2 pl-6 text-textPrimary dark:text-slate-200"
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
      <ol
        {...props}
        className="my-5 list-decimal space-y-2 pl-6 text-textPrimary dark:text-slate-200"
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
      <article className="mx-auto max-w-7xl px-6 py-16">
        <SEOHead jsonLd={jsonLd} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <header className="mb-10 space-y-5">
              <CategoryBadge category={post.category} />
              <h1 className="font-heading text-5xl font-bold leading-tight text-textPrimary dark:text-slate-100">
                {post.title}
              </h1>
              <p className="max-w-3xl text-textMuted dark:text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-textMuted dark:text-slate-400">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
                <span>•</span>
                <span>{categoryMeta.name}</span>
              </div>
            </header>

            <div className="prose prose-slate max-w-none dark:prose-invert">
              <MDXRemote
                source={post.content}
                options={mdxOptions}
                components={mdxComponents()}
              />
            </div>

            <section className="mt-12 space-y-8 border-t border-border pt-10 dark:border-slate-800">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-textPrimary dark:text-slate-100">
                  Tags
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-textMuted dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-textPrimary dark:text-slate-100">
                  Share This Article
                </h2>
                <div className="mt-4">
                  <ShareButtons url={canonicalUrl} title={post.title} />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {authorInitials}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-semibold text-textPrimary dark:text-slate-100">
                      {post.author}
                    </p>
                    <p className="text-sm text-textMuted dark:text-slate-300">
                      Developer and educator helping Pakistani students build practical tech careers.
                    </p>
                  </div>
                </div>
              </div>

              <RelatedPosts posts={relatedPosts} />

              <section className="rounded-xl bg-primary px-6 py-8 text-white">
                <h2 className="font-heading text-3xl font-bold">
                  Get articles delivered to your inbox
                </h2>
                <p className="mt-3 text-blue-100">
                  No spam. Just practical tech content for students.
                </p>
                <div className="mt-6">
                  <NewsletterForm compact />
                </div>
              </section>
            </section>
          </div>

          <div>
            <TableOfContents headings={post.headings} />
          </div>
        </div>
      </article>
    </>
  );
}
