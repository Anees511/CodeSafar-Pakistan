import type { Metadata } from "next";

import { Mail, MessageSquare, Send } from "lucide-react";
import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "your_formspree_id";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for mentorship, collaboration, or workshop opportunities.",
  alternates: {
    canonical: getAbsoluteUrl("/contact"),
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch for mentorship, collaboration, or workshop opportunities.",
    url: getAbsoluteUrl("/contact"),
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/images/og-default.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} contact page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch for mentorship, collaboration, or workshop opportunities.",
    images: [getAbsoluteUrl("/images/og-default.png")],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-ink-950 py-16 md:py-24">
        <div className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-brand-500/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-lg shadow-brand-500/20">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-heading text-4xl font-bold text-white md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-ink-400">
            Have a question or collaboration idea? Send a message and I will reply
            within 48 hours.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl border border-ink-200 bg-white p-8 shadow-sm dark:border-ink-800 dark:bg-ink-900">
          <form
            action={`https://formspree.io/f/${formspreeId}`}
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-base text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-base text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-300"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-base text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-brand-600 hover:to-indigo-600 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>

          <p className="mt-5 text-sm text-ink-500 dark:text-ink-400">
            Response time: usually within 48 hours.
          </p>
        </div>
      </div>
    </>
  );
}
