import type { Metadata } from "next";
import Link from "next/link";

import {
  BriefcaseBusiness,
  Code2,
  Rocket,
  Wrench,
} from "lucide-react";

import BlogGrid from "@/components/BlogGrid";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllCategoriesWithCount, getAllPosts } from "@/lib/posts";
import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Practical tutorials, honest advice, and real resources for Pakistani students learning programming.",
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  openGraph: {
    title: `${siteConfig.name} | Home`,
    description:
      "Practical tutorials, honest advice, and real resources for Pakistani students learning programming.",
    url: getAbsoluteUrl("/"),
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/images/og-default.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Home`,
    description:
      "Practical tutorials, honest advice, and real resources for Pakistani students learning programming.",
    images: [getAbsoluteUrl("/images/og-default.png")],
  },
};

const categoryIcons = {
  "web-development": Code2,
  freelancing: BriefcaseBusiness,
  "career-guide": Rocket,
  "tools-resources": Wrench,
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);
  const categories = getAllCategoriesWithCount();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 dark:from-slate-900 dark:to-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-70 dark:opacity-20" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl space-y-7">
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-200">
              Helping Pakistani Students Build Tech Careers
            </p>

            <h1 className="font-heading text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
              Your Guide to Building a Tech Career in Pakistan
            </h1>

            <p className="max-w-2xl text-lg text-textMuted dark:text-slate-300">
              Practical tutorials, honest advice, and real resources for students
              learning programming.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primaryDark"
              >
                Start Reading
              </Link>
              <Link
                href="/start-here"
                className="inline-flex items-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-slate-900"
              >
                Start Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl font-bold text-textPrimary dark:text-slate-100">
                Latest Articles
              </h2>
              <p className="mt-3 text-textMuted dark:text-slate-300">
                Fresh, practical posts focused on coding skills and career growth.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary hover:text-primaryDark"
            >
              View all articles
            </Link>
          </div>

          <BlogGrid posts={latestPosts} />
        </div>
      </section>

      <section id="categories" className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <h2 className="font-heading text-4xl font-bold text-textPrimary dark:text-slate-100">
              Explore Categories
            </h2>
            <p className="mt-3 text-textMuted dark:text-slate-300">
              Pick a learning lane and build momentum one practical step at a time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug];

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-textPrimary dark:text-slate-100">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-textMuted dark:text-slate-300">
                    {category.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {category.count} article{category.count === 1 ? "" : "s"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-white">
          <h2 className="font-heading text-4xl font-bold">
            Get articles delivered to your inbox
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            No spam. Just practical tech content for students.
          </p>

          <div className="mt-8">
            <NewsletterForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
