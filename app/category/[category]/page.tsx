import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import BlogGrid from "@/components/BlogGrid";
import { getCategorySlugs, getPostsByCategory } from "@/lib/posts";
import { getAbsoluteUrl, getCategoryMeta, isCategorySlug, siteConfig } from "@/lib/utils";

export const dynamicParams = false;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  if (!isCategorySlug(params.category)) {
    return {
      title: "Category",
      description: "Category page",
    };
  }

  const categoryMeta = getCategoryMeta(params.category);

  return {
    title: `${categoryMeta.name}`,
    description: categoryMeta.description,
    alternates: {
      canonical: getAbsoluteUrl(`/category/${params.category}`),
    },
    openGraph: {
      title: `${categoryMeta.name} | ${siteConfig.name}`,
      description: categoryMeta.description,
      url: getAbsoluteUrl(`/category/${params.category}`),
      type: "website",
      images: [
        {
          url: getAbsoluteUrl("/images/og-default.png"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} category`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryMeta.name} | ${siteConfig.name}`,
      description: categoryMeta.description,
      images: [getAbsoluteUrl("/images/og-default.png")],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (!isCategorySlug(params.category)) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(params.category);
  const posts = getPostsByCategory(params.category);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink-950 py-16">
        <div className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-brand-500/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Category
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white md:text-5xl">
            {categoryMeta.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-400">
            {categoryMeta.description}
          </p>
          <p className="mt-4 text-sm font-medium text-ink-500">
            {posts.length} post{posts.length === 1 ? "" : "s"} found
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <BlogGrid
          posts={posts}
          emptyMessage="No posts in this category yet. Check back soon."
        />

        <div className="mt-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium text-ink-700 transition-all duration-200 hover:border-brand-400 hover:text-brand-500 dark:border-ink-700 dark:text-ink-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </div>
      </div>
    </>
  );
}
