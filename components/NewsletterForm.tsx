"use client";

import { FormEvent, useState } from "react";

import { Mail } from "lucide-react";

interface NewsletterFormProps {
  compact?: boolean;
}

interface StoredSignup {
  email: string;
  submittedAt: string;
}

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const key = "newsletter_submissions";
      const previous = localStorage.getItem(key);
      const entries: StoredSignup[] = previous ? JSON.parse(previous) : [];

      entries.push({
        email: email.trim().toLowerCase(),
        submittedAt: new Date().toISOString(),
      });

      localStorage.setItem(key, JSON.stringify(entries));
      console.info("Newsletter signup captured", entries[entries.length - 1]);
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Newsletter storage error", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto w-full ${compact ? "max-w-2xl" : "max-w-xl"}`}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-textMuted dark:text-slate-400" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="h-12 w-full rounded-full border border-border bg-white pl-12 pr-4 text-base text-textPrimary outline-none ring-primary transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      <p className="mt-3 text-sm text-blue-100 dark:text-slate-300">
        No spam. Just practical tech content for students.
      </p>
      {status === "success" && (
        <p className="mt-2 text-sm text-emerald-200">
          You are subscribed. We will notify you when a new article is published.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-rose-200">
          Subscription failed. Please try again.
        </p>
      )}
    </form>
  );
}
