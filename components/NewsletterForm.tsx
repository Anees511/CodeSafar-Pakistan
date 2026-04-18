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
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="h-12 w-full rounded-full border border-ink-700 bg-ink-800 pl-12 pr-4 text-base text-white placeholder:text-ink-500 outline-none ring-brand-500 transition focus:ring-2 focus:border-brand-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 px-6 text-sm font-semibold text-white transition-all duration-200 hover:from-brand-600 hover:to-indigo-600 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-500/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      <p className="mt-3 text-sm text-ink-400">
        No spam. Just practical tech content for students.
      </p>
      {status === "success" && (
        <p className="mt-2 text-sm text-accent-400">
          ✓ You are subscribed. We will notify you when a new article is published.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-rose-400">
          Subscription failed. Please try again.
        </p>
      )}
    </form>
  );
}
