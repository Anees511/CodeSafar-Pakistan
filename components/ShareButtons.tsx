"use client";

import { BriefcaseBusiness, MessageCircle, Send } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Twitter",
      icon: Send,
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: "LinkedIn",
      icon: BriefcaseBusiness,
    },
    {
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      label: "WhatsApp",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-textPrimary transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:text-blue-300"
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
