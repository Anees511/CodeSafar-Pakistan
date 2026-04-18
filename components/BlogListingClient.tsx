"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import BlogGrid from "@/components/BlogGrid";
import { CATEGORIES, type CategorySlug, type PostPreview } from "@/lib/types";
import { isCategorySlug } from "@/lib/utils";

const POSTS_PER_PAGE = 10;

const filterOptions: Array<{ slug: "all" | CategorySlug; label: string }> = [
  { slug: "all", label: "All" },
  ...CATEGORIES.map((category) => ({
    slug: category.slug,
    label: category.shortName,
  })),
];

function buildBlogUrl(category: "all" | CategorySlug, page: number): string {
  const params = new URLSearchParams();

  if (category !== "all") {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

interface BlogListingClientProps {
  posts: PostPreview[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category") ?? "all";
  const selectedCategory: "all" | CategorySlug =
    rawCategory !== "all" && isCategorySlug(rawCategory)
      ? rawCategory
      : "all";

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(totalPages, Math.max(1, requestedPage))
    : 1;

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-5xl font-bold text-textPrimary dark:text-slate-100">
            All Articles
          </h1>
          <p className="mt-3 text-textMuted dark:text-slate-300">
            {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"}
            {selectedCategory !== "all" ? " in this category" : ""}
          </p>
        </div>
      </header>

      <section className="mb-10 rounded-xl border border-border bg-surface p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-textMuted dark:text-slate-400">
          Filter by Category
        </p>
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((option) => {
            const isActive = selectedCategory === option.slug;

            return (
              <Link
                key={option.slug}
                href={buildBlogUrl(option.slug, 1)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-textPrimary hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </section>

      <BlogGrid
        posts={visiblePosts}
        emptyMessage="No posts found for this category yet. Please check another category."
      />

      <section className="mt-10 flex items-center justify-between rounded-xl border border-border bg-surface p-5 dark:border-slate-800 dark:bg-slate-900">
        {currentPage > 1 ? (
          <Link
            href={buildBlogUrl(selectedCategory, currentPage - 1)}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-textPrimary transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-full border border-border px-4 py-2 text-sm text-textMuted dark:border-slate-700 dark:text-slate-500">
            Previous
          </span>
        )}

        <p className="text-sm text-textMuted dark:text-slate-400">
          Page {currentPage} of {totalPages}
        </p>

        {currentPage < totalPages ? (
          <Link
            href={buildBlogUrl(selectedCategory, currentPage + 1)}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-textPrimary transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-full border border-border px-4 py-2 text-sm text-textMuted dark:border-slate-700 dark:text-slate-500">
            Next
          </span>
        )}
      </section>
    </>
  );
}
