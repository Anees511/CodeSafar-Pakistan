import type { Metadata } from "next";

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
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="rounded-2xl border border-border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="font-heading text-5xl font-bold text-textPrimary dark:text-slate-100">
          Contact
        </h1>
        <p className="mt-4 text-textMuted dark:text-slate-300">
          Have a question or collaboration idea? Send a message and I will reply
          within 48 hours.
        </p>

        <form
          action={`https://formspree.io/f/${formspreeId}`}
          method="POST"
          className="mt-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-textPrimary dark:text-slate-200">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-textPrimary outline-none ring-primary transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-textPrimary dark:text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-textPrimary outline-none ring-primary transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-textPrimary dark:text-slate-200">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-textPrimary outline-none ring-primary transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-textPrimary dark:text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-textPrimary outline-none ring-primary transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primaryDark"
          >
            Send Message
          </button>
        </form>

        <p className="mt-5 text-sm text-textMuted dark:text-slate-400">
          Response time: usually within 48 hours.
        </p>
      </section>
    </div>
  );
}
