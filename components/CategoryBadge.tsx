import Link from "next/link";

import type { CategorySlug } from "@/lib/types";
import { getCategoryMeta } from "@/lib/utils";

const CATEGORY_STYLE: Record<CategorySlug, string> = {
  "web-development": "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200",
  freelancing:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  "career-guide": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200",
  "tools-resources": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
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
  const className = `inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_STYLE[category]}`;

  if (!withLink) {
    return <span className={className}>{categoryMeta.shortName}</span>;
  }

  return (
    <Link href={`/category/${category}`} className={className}>
      {categoryMeta.shortName}
    </Link>
  );
}
