import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Rocket,
  Sparkles,
  Target,
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

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
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
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[85vh] overflow-hidden bg-ink-950 flex items-center">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute -top-20 right-0 h-[600px] w-[600px] rounded-full bg-brand-500/15 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            {/* Left column */}
            <div className="space-y-8">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300 animate-fade-in">
                <Sparkles className="h-3.5 w-3.5" />
                For Pakistani Students
              </span>

              {/* Headline */}
              <h1 className="font-heading text-4xl font-bold leading-[1.1] md:text-6xl">
                <span className="text-white">Build Your</span>
                <br />
                <span className="gradient-text">Tech Career</span>
                <br />
                <span className="text-white">in Pakistan</span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-lg text-lg text-ink-400 leading-relaxed">
                Stop watching tutorials. Start building real skills, real
                projects, and real income — guided by someone who&apos;s on the
                same journey as you.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-brand-600 hover:to-indigo-600 hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-500/30"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/start-here"
                  className="inline-flex items-center rounded-full border border-ink-600 px-7 py-3.5 text-sm font-semibold text-ink-200 transition-all duration-300 hover:border-brand-500/50 hover:bg-brand-500/10 hover:text-white glass-card"
                >
                  View All Articles
                </Link>
              </div>

              {/* Social proof */}
              <p className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
                <span>📚 {latestPosts.length} articles published</span>
                <span className="text-ink-700">·</span>
                <span>🇵🇰 Made in Pakistan</span>
                <span className="text-ink-700">·</span>
                <span>💡 Free forever</span>
              </p>
            </div>

            {/* Right column — floating code card */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Purple glow behind card */}
                <div className="absolute -inset-8 rounded-3xl bg-brand-500/10 blur-2xl" />

                <div className="relative glass-card rounded-2xl p-1 purple-glow animate-float">
                  <div className="rounded-xl bg-ink-900/90 p-5 backdrop-blur-sm" style={{ minWidth: "340px" }}>
                    {/* Window chrome */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs text-ink-500 font-mono">learning-journey.js</span>
                    </div>

                    {/* Code content */}
                    <pre className="text-sm font-mono leading-relaxed">
                      <code>
                        <span className="text-brand-400">const</span>
                        <span className="text-white"> student</span>
                        <span className="text-ink-500"> = </span>
                        <span className="text-ink-400">{"{"}</span>
                        {"\n"}
                        <span className="text-ink-500">{"  "}</span>
                        <span className="text-accent-400">name</span>
                        <span className="text-ink-500">: </span>
                        <span className="text-amber-300">&quot;You&quot;</span>
                        <span className="text-ink-500">,</span>
                        {"\n"}
                        <span className="text-ink-500">{"  "}</span>
                        <span className="text-accent-400">country</span>
                        <span className="text-ink-500">: </span>
                        <span className="text-amber-300">&quot;Pakistan 🇵🇰&quot;</span>
                        <span className="text-ink-500">,</span>
                        {"\n"}
                        <span className="text-ink-500">{"  "}</span>
                        <span className="text-accent-400">goal</span>
                        <span className="text-ink-500">: </span>
                        <span className="text-amber-300">&quot;Tech Career&quot;</span>
                        <span className="text-ink-500">,</span>
                        {"\n"}
                        <span className="text-ink-400">{"}"}</span>
                        <span className="text-ink-500">;</span>
                        {"\n\n"}
                        <span className="text-brand-400">async function</span>
                        <span className="text-blue-400"> buildCareer</span>
                        <span className="text-ink-400">() {"{"}</span>
                        {"\n"}
                        <span className="text-ink-500">{"  "}</span>
                        <span className="text-brand-400">await</span>
                        <span className="text-white"> learn</span>
                        <span className="text-ink-400">(</span>
                        <span className="text-amber-300">&quot;fundamentals&quot;</span>
                        <span className="text-ink-400">);</span>
                        {"\n"}
                        <span className="text-ink-500">{"  "}</span>
                        <span className="text-brand-400">await</span>
                        <span className="text-white"> build</span>
                        <span className="text-ink-400">(</span>
                        <span className="text-amber-300">&quot;projects&quot;</span>
                        <span className="text-ink-400">);</span>
                        {"\n"}
                        <span className="text-ink-500">{"  "}</span>
                        <span className="text-brand-400">return</span>
                        <span className="text-white"> </span>
                        <span className="text-amber-300">&quot;success&quot;</span>
                        <span className="text-ink-400">;</span>
                        <span className="animate-pulse text-brand-400">▎</span>
                        {"\n"}
                        <span className="text-ink-400">{"}"}</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-ink-900 border-y border-ink-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between gap-6 py-5 overflow-x-auto no-scrollbar">
            {[
              { icon: "📖", label: `${latestPosts.length} Articles` },
              { icon: "🎯", label: "4 Categories" },
              { icon: "🇵🇰", label: "100% Free" },
              { icon: "⭐", label: "For Beginners" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-shrink-0 items-center gap-2.5 text-sm font-medium text-ink-300"
              >
                <span className="text-lg">{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LATEST ARTICLES ═══ */}
      <section className="py-20 bg-white dark:bg-ink-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl font-bold text-ink-900 dark:text-white">
                Latest from the Blog
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-brand-500" />
              <p className="mt-4 text-ink-500 dark:text-ink-400">
                Fresh, practical posts focused on coding skills and career growth.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
            >
              View all articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <BlogGrid posts={latestPosts} />
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className="py-20 bg-ink-50 dark:bg-ink-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-ink-900 dark:text-white">
              Explore Categories
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-brand-500" />
            <p className="mt-4 text-ink-500 dark:text-ink-400">
              Pick a learning lane and build momentum one practical step at a
              time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] || Code2;

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-xl hover:shadow-brand-500/10 dark:border-ink-800 dark:bg-ink-900/80 dark:hover:border-brand-500/30"
                >
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-900/30 dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-ink-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                      {category.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-500">
                      {category.count} article{category.count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-ink-300 transition-all group-hover:text-brand-500 group-hover:translate-x-1 dark:text-ink-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="relative py-20 bg-ink-950 overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-4xl font-bold">
              <span className="gradient-text">Get articles delivered</span>
              <br />
              <span className="text-white">to your inbox</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-400">
              Join students learning to code in Pakistan. No spam — just practical
              tech content every week.
            </p>

            {/* Avatar placeholders */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {["bg-brand-500", "bg-indigo-500", "bg-violet-500"].map((bg, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 rounded-full ${bg} border-2 border-ink-950 ${
                    i > 0 ? "-ml-2" : ""
                  } flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {["A", "M", "S"][i]}
                </div>
              ))}
              <span className="ml-3 text-sm text-ink-500">
                Join the community
              </span>
            </div>

            <div className="mt-8">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
