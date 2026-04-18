import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight, Check, Lock } from "lucide-react";
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
    timeline: "Week 1–2",
    description:
      "Start with the complete beginner roadmap. Understand what to learn first, what to skip, and how to stay focused without burning out.",
    href: "/blog/how-i-would-start-learning-to-code-in-2026",
    linkLabel: "Read the roadmap",
    available: true,
  },
  {
    title: "Understand JavaScript foundations",
    timeline: "Week 3–8",
    description:
      "Focus on variables, functions, loops, and problem-solving before touching any framework. This is where most people rush and later regret.",
    href: "/category/web-development",
    linkLabel: "Browse web dev articles",
    available: true,
  },
  {
    title: "Learn how Node.js works",
    timeline: "Month 2–3",
    description:
      "Get comfortable with backend basics using a beginner-friendly Node.js guide. Understand how servers work and why it matters.",
    href: "/blog/what-is-nodejs-explained-for-beginners",
    linkLabel: "Learn Node.js basics",
    available: true,
  },
  {
    title: "Create your first mini projects",
    timeline: "Month 3–4",
    description:
      "Use small, real projects to turn theory into confidence and portfolio proof. Build a calculator, a to-do app, then something real.",
    href: "/blog",
    linkLabel: "Find project ideas",
    available: true,
  },
  {
    title: "Prepare for freelancing",
    timeline: "Month 4–5",
    description:
      "Learn proposal writing, client communication, and profile building for online work platforms like Upwork and Fiverr.",
    href: "/category/freelancing",
    linkLabel: "Explore freelancing guides",
    available: true,
  },
  {
    title: "Plan your first 6 months",
    timeline: "Month 5–6",
    description:
      "Track progress weekly. Focus on consistency over speed to avoid burnout. This is the phase where most people give up — don't be them.",
    href: "/category/career-guide",
    linkLabel: "Read career guides",
    available: true,
  },
];

export default function StartHerePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-500/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            <span className="text-white">Your Coding Journey</span>
            <br />
            <span className="gradient-text">Starts Here</span>
          </h1>
          <p className="mt-6 text-lg text-ink-400">
            Follow this path. Don&apos;t skip ahead. Build the foundation first.
          </p>

          {/* Progress indicator */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {learningPath.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    i === 0
                      ? "bg-brand-500 text-white"
                      : "bg-ink-800 text-ink-500"
                  }`}
                >
                  {i + 1}
                </div>
                {i < learningPath.length - 1 && (
                  <div className="h-0.5 w-6 bg-ink-800 sm:w-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-500/50 to-ink-800 md:left-8" />

          <div className="space-y-8 stagger-children">
            {learningPath.map((step, index) => (
              <article
                key={step.title}
                className="relative pl-16 md:pl-20"
              >
                {/* Step number circle */}
                <div
                  className={`absolute left-0 top-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold md:left-2 md:h-14 md:w-14 ${
                    index === 0
                      ? "bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-lg shadow-brand-500/30"
                      : "bg-ink-800 text-ink-400 border border-ink-700 dark:bg-ink-800"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 dark:border-ink-800 dark:bg-ink-900">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-heading text-xl font-semibold text-ink-900 dark:text-white">
                      {step.title}
                    </h2>
                    <span className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
                    {step.description}
                  </p>
                  <Link
                    href={step.href}
                    className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                  >
                    {index === 0 ? (
                      <>
                        Start Here
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <>
                        {step.linkLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
