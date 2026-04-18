"use client";

import { useState } from "react";
import { BriefcaseBusiness, Check, Copy, MessageCircle, Send } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  const socialLinks = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Twitter",
      icon: Send,
      hoverClass: "hover:border-ink-600 hover:text-ink-900 dark:hover:text-white dark:hover:border-ink-500",
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: "LinkedIn",
      icon: BriefcaseBusiness,
      hoverClass: "hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500",
    },
    {
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      label: "WhatsApp",
      icon: MessageCircle,
      hoverClass: "hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 dark:hover:border-green-500",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {socialLinks.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 ${link.hoverClass}`}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </a>
        );
      })}

      <button
        type="button"
        onClick={copyLink}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          copied
            ? "border-green-500 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            : "border-ink-200 bg-white text-ink-600 hover:border-brand-400 hover:text-brand-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
        }`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
