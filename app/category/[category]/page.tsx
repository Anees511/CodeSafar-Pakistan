import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10 rounded-2xl border border-border bg-surface p-8 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          Category
        </p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-textPrimary dark:text-slate-100">
          {categoryMeta.name}
        </h1>
        <p className="mt-4 max-w-3xl text-textMuted dark:text-slate-300">
          {categoryMeta.description}
        </p>
        <p className="mt-4 text-sm font-medium text-textMuted dark:text-slate-400">
          {posts.length} post{posts.length === 1 ? "" : "s"} found
        </p>
      </header>

      <BlogGrid
        posts={posts}
        emptyMessage="No posts in this category yet. Check back soon."
      />

      <div className="mt-10">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-border px-5 py-2 text-sm font-medium text-textPrimary transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
        >
          Back to all articles
        </Link>
      </div>
    </div>
  );
}
