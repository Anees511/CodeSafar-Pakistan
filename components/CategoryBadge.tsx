import Link from "next/link";

import type { CategorySlug } from "@/lib/types";
import { getCategoryMeta } from "@/lib/utils";

const CATEGORY_STYLE: Record<CategorySlug, { bg: string; text: string; dot: string }> = {
  "web-development": {
    bg: "bg-brand-50 dark:bg-brand-900/30",
    text: "text-brand-700 dark:text-brand-300",
    dot: "bg-violet-500",
  },
  freelancing: {
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  "career-guide": {
    bg: "bg-orange-50 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500",
  },
  "tools-resources": {
    bg: "bg-cyan-50 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-300",
    dot: "bg-cyan-500",
  },
};

interface CategoryBadgeProps {
  category: CategorySlug;
  withLink?: boolean;
}

export default function CategoryBadge({
  category,
  withLink = true,
}: CategoryBadgeProps) {
  const categoryMeta = getCategoryMeta(category);
  const style = CATEGORY_STYLE[category] || CATEGORY_STYLE["web-development"];

  const badge = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {categoryMeta.shortName}
    </span>
  );

  if (!withLink) {
    return badge;
  }

  return (
    <Link href={`/category/${category}`} className="inline-block">
      {badge}
    </Link>
  );
}
