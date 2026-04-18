import type { Metadata } from "next";
import Link from "next/link";

import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind CodeSafar Pakistan and why this blog exists for Pakistani students learning tech.",
  alternates: {
    canonical: getAbsoluteUrl("/about"),
  },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Learn the story behind CodeSafar Pakistan and why this blog exists for Pakistani students learning tech.",
    url: getAbsoluteUrl("/about"),
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/images/og-default.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} about page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteConfig.name}`,
    description:
      "Learn the story behind CodeSafar Pakistan and why this blog exists for Pakistani students learning tech.",
    images: [getAbsoluteUrl("/images/og-default.png")],
  },
};

const timeline = [
  {
    year: "2019",
    title: "Started from free YouTube tutorials",
    detail:
      "I began exactly where most students begin: no roadmap, little confidence, and too many tabs open."
  },
  {
    year: "2021",
    title: "Built first client projects",
    detail:
      "After learning fundamentals consistently, I started helping small businesses with websites and scripts."
  },
  {
    year: "2024",
    title: "Mentored students one-on-one",
    detail:
      "I noticed the same confusion repeated: what to learn first, what to skip, and how to stay consistent."
  },
  {
    year: "2026",
    title: "Launched this blog",
    detail:
      "CodeSafar Pakistan was created to give students practical, local-context guidance instead of generic advice."
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-2xl border border-border bg-gradient-to-br from-blue-50 to-white p-10 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          About The Blog
        </p>
        <h1 className="mt-4 font-heading text-5xl font-bold text-textPrimary dark:text-slate-100">
          Helping Students Build Real Tech Careers
        </h1>
        <p className="mt-6 max-w-3xl text-textMuted dark:text-slate-300">
          I am Muhammad Anees, and I built this blog for Pakistani students who
          want practical direction, not random motivation. You will find honest
          roadmaps, beginner-friendly tutorials, and freelancing advice that fits
          our local realities.
        </p>
      </section>

      <section className="py-16">
        <h2 className="font-heading text-4xl font-bold text-textPrimary dark:text-slate-100">
          Who I Am
        </h2>
        <p className="mt-5 text-textMuted dark:text-slate-300">
          I am a developer and educator focused on helping students transition from
          confusion to confidence. I have seen talented people quit because they
          lacked clear steps, community support, and feedback. This platform is
          designed to solve that gap with actionable content.
        </p>

        <h2 className="mt-10 font-heading text-4xl font-bold text-textPrimary dark:text-slate-100">
          Why I Started This Blog
        </h2>
        <p className="mt-5 text-textMuted dark:text-slate-300">
          Most online advice is too broad. Pakistani students need guidance that
          considers budget constraints, internet limitations, university schedules,
          and the local freelancing ecosystem. Every article is written with that
          lens.
        </p>

        <h2 className="mt-10 font-heading text-4xl font-bold text-textPrimary dark:text-slate-100">
          Who This Blog Is For
        </h2>
        <p className="mt-5 text-textMuted dark:text-slate-300">
          This blog is for students aged 17 to 25 who want to learn programming,
          build a portfolio, and create a sustainable career in tech. If you are
          starting from zero, you are exactly in the right place.
        </p>
      </section>

      <section className="py-16">
        <h2 className="font-heading text-4xl font-bold text-textPrimary dark:text-slate-100">
          My Journey
        </h2>
        <div className="mt-8 space-y-6 border-l-2 border-blue-200 pl-8 dark:border-blue-900">
          {timeline.map((item) => (
            <article key={item.year} className="relative rounded-xl border border-border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="absolute -left-[43px] top-6 inline-flex h-5 w-5 rounded-full bg-primary" />
              <p className="text-sm font-semibold text-primary">{item.year}</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-textPrimary dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-3 text-textMuted dark:text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-primary px-8 py-12 text-center text-white">
        <h2 className="font-heading text-3xl font-bold">Want to work with me? Contact me</h2>
        <p className="mx-auto mt-3 max-w-2xl text-blue-100">
          I am available for mentorship, workshops, and student-focused training sessions.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary"
        >
          Go to Contact Page
        </Link>
      </section>
    </div>
  );
}
