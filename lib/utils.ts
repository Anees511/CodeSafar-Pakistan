import { format, parseISO } from "date-fns";

import { CATEGORIES, type CategorySlug } from "@/lib/types";

const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "CodeSafar Pakistan",
  tagline: "Helping Pakistani Students Build Tech Careers",
  description:
    "Practical tutorials, freelancing advice, and career roadmaps for Pakistani students learning programming.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, ""),
};

export function getAbsoluteUrl(pathname = "/"): string {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${cleanPath}`;
}

export function formatDate(date: string): string {
  return format(parseISO(date), "MMMM d, yyyy");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function calculateReadingTime(content: string): {
  text: string;
  minutes: number;
  wordCount: number;
} {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    text: `${minutes} min read`,
    minutes,
    wordCount,
  };
}

export function getCategoryMeta(slug: string) {
  return CATEGORIES.find((item) => item.slug === slug) ?? CATEGORIES[0];
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORIES.some((item) => item.slug === slug);
}
