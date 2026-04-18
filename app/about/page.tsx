import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight, BookOpen, Code2, Rocket, Users } from "lucide-react";
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
      "I began exactly where most students begin: no roadmap, little confidence, and too many tabs open.",
  },
  {
    year: "2021",
    title: "Built first client projects",
    detail:
      "After learning fundamentals consistently, I started helping small businesses with websites and scripts.",
  },
  {
    year: "2024",
    title: "Mentored students one-on-one",
    detail:
      "I noticed the same confusion repeated: what to learn first, what to skip, and how to stay consistent.",
  },
  {
    year: "2026",
    title: "Launched CodeSafar Pakistan",
    detail:
      "CodeSafar Pakistan was created to give students practical, local-context guidance instead of generic advice.",
  },
];

const beliefs = [
  {
    icon: BookOpen,
    title: "Learning in public builds faster than learning in private",
    description:
      "When you share your journey, you learn twice — once by doing, once by teaching.",
  },
  {
    icon: Users,
    title: "Teaching others is the fastest way to master something",
    description:
      "Every article I write forces me to understand concepts deeply before explaining them simply.",
  },
  {
    icon: Rocket,
    title: "Pakistani students deserve world-class guidance — for free",
    description:
      "Budget constraints shouldn't limit access to quality tech education and career guidance.",
  },
];

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Next.js",
  "AWS",
  "Tailwind CSS",
  "Git",
  "Python",
  "MongoDB",
];

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
        <div className="pointer-events-none absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Avatar */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-500 text-4xl font-bold text-white shadow-xl shadow-brand-500/20">
            MA
          </div>

          <h1 className="mt-8 font-heading text-4xl font-bold md:text-5xl">
            <span className="text-white">Hi, I&apos;m Muhammad Anees </span>
            <span className="inline-block animate-float" style={{ animationDuration: "2s" }}>👋</span>
          </h1>

          <p className="mt-4 text-lg">
            <span className="gradient-text font-semibold">
              Software Engineering Student & Founder of CodeSafar Pakistan
            </span>
          </p>

          <p className="mt-2 text-sm text-ink-500">
            📍 Pakistan
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-ink-400 leading-relaxed">
            I built this blog for Pakistani students who want practical direction,
            not random motivation. You will find honest roadmaps, beginner-friendly
            tutorials, and freelancing advice that fits our local realities.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        {/* ═══ WHO I AM ═══ */}
        <section className="py-16">
          <h2 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
            Who I Am
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-brand-500" />
          <p className="mt-6 text-ink-600 dark:text-ink-300 leading-relaxed">
            I am a developer and educator focused on helping students transition from
            confusion to confidence. I have seen talented people quit because they
            lacked clear steps, community support, and feedback. This platform is
            designed to solve that gap with actionable content.
          </p>

          <h2 className="mt-12 font-heading text-3xl font-bold text-ink-900 dark:text-white">
            Why I Started This Blog
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-brand-500" />
          <p className="mt-6 text-ink-600 dark:text-ink-300 leading-relaxed">
            Most online advice is too broad. Pakistani students need guidance that
            considers budget constraints, internet limitations, university schedules,
            and the local freelancing ecosystem. Every article is written with that
            lens.
          </p>

          <h2 className="mt-12 font-heading text-3xl font-bold text-ink-900 dark:text-white">
            Who This Blog Is For
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-brand-500" />
          <p className="mt-6 text-ink-600 dark:text-ink-300 leading-relaxed">
            This blog is for students aged 17 to 25 who want to learn programming,
            build a portfolio, and create a sustainable career in tech. If you are
            starting from zero, you are exactly in the right place.
          </p>
        </section>

        {/* ═══ WHAT I BELIEVE ═══ */}
        <section className="py-16">
          <h2 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
            What I Believe
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-brand-500" />

          <div className="mt-10 grid gap-6 sm:grid-cols-3 stagger-children">
            {beliefs.map((belief) => {
              const Icon = belief.icon;
              return (
                <div
                  key={belief.title}
                  className="rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/10 dark:border-ink-800 dark:bg-ink-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink-900 dark:text-white leading-snug">
                    {belief.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
                    {belief.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section className="py-16">
          <h2 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
            Tech Skills
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-brand-500" />

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-all duration-200 hover:border-brand-400 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:border-brand-500 dark:hover:text-brand-400"
              >
                <Code2 className="h-3.5 w-3.5" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ═══ TIMELINE ═══ */}
        <section className="py-16">
          <h2 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
            My Journey
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-brand-500" />

          <div className="mt-10 space-y-6 border-l-2 border-brand-200 pl-8 dark:border-brand-900 stagger-children">
            {timeline.map((item) => (
              <article
                key={item.year}
                className="relative rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 dark:border-ink-800 dark:bg-ink-900"
              >
                <span className="absolute -left-[41px] top-6 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-500 ring-4 ring-white dark:ring-ink-950" />
                <p className="text-sm font-bold text-brand-500">{item.year}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-ink-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-ink-950 py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-500/10 to-indigo-500/10" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold">
            <span className="gradient-text">Want to work with me?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-400">
            I am available for mentorship, workshops, and student-focused
            training sessions.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:from-brand-600 hover:to-indigo-600 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-500/25"
          >
            Go to Contact Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
