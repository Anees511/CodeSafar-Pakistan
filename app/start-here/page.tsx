import type { Metadata } from "next";
import Link from "next/link";

import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "A beginner-friendly path for Pakistani students starting programming from scratch.",
  alternates: {
    canonical: getAbsoluteUrl("/start-here"),
  },
  openGraph: {
    title: `Start Here | ${siteConfig.name}`,
    description:
      "A beginner-friendly path for Pakistani students starting programming from scratch.",
    url: getAbsoluteUrl("/start-here"),
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/images/og-default.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} start here page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Start Here | ${siteConfig.name}`,
    description:
      "A beginner-friendly path for Pakistani students starting programming from scratch.",
    images: [getAbsoluteUrl("/images/og-default.png")],
  },
};

const learningPath = [
  {
    title: "Build your coding roadmap",
    description:
      "Start with the complete beginner roadmap and understand exactly what to learn first.",
    href: "/blog/how-i-would-start-learning-to-code-in-2026",
  },
  {
    title: "Understand JavaScript foundations",
    description:
      "Focus on variables, functions, loops, and problem-solving before frameworks.",
    href: "/category/web-development",
  },
  {
    title: "Learn how Node.js works",
    description:
      "Get comfortable with backend basics using a beginner-friendly Node.js guide.",
    href: "/blog/what-is-nodejs-explained-for-beginners",
  },
  {
    title: "Create your first mini projects",
    description:
      "Use small, real projects to turn theory into confidence and portfolio proof.",
    href: "/blog",
  },
  {
    title: "Prepare for freelancing",
    description:
      "Learn proposal writing, client communication, and profile building for online work.",
    href: "/category/freelancing",
  },
  {
    title: "Plan your first 6 months",
    description:
      "Track progress weekly and focus on consistency over speed to avoid burnout.",
    href: "/category/career-guide",
  },
];

export default function StartHerePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10 rounded-2xl border border-border bg-gradient-to-br from-blue-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <h1 className="font-heading text-5xl font-bold text-textPrimary dark:text-slate-100">
          New Here? Start With These
        </h1>
        <p className="mt-4 text-lg text-textMuted dark:text-slate-300">
          Not sure where to begin? Follow this path:
        </p>
      </header>

      <section className="space-y-5">
        {learningPath.map((item, index) => (
          <article
            key={item.title}
            className="grid gap-5 rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[70px_minmax(0,1fr)]"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
              {index + 1}
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-textPrimary dark:text-slate-100">
                {item.title}
              </h2>
              <p className="mt-3 text-textMuted dark:text-slate-300">{item.description}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-primaryDark"
              >
                Open resource
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
