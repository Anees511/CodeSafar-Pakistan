import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock3 } from "lucide-react";

import CategoryBadge from "@/components/CategoryBadge";
import type { PostPreview } from "@/lib/types";
import { formatDate, getCategoryMeta } from "@/lib/utils";

interface BlogCardProps {
  post: PostPreview;
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryMeta = getCategoryMeta(post.category);

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/blog/${post.slug}`} aria-label={post.title}>
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={1200}
            height={675}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-primary to-secondary p-6 text-white">
            <p className="text-sm uppercase tracking-[0.18em]">{categoryMeta.shortName}</p>
            <p className="mt-10 max-w-[20ch] text-2xl font-semibold leading-tight">
              {post.title}
            </p>
          </div>
        )}
      </Link>

      <div className="space-y-4 p-6">
        <CategoryBadge category={post.category} />

        <div className="space-y-3">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="line-clamp-2 font-heading text-2xl font-semibold text-textPrimary transition-colors group-hover:text-primary dark:text-slate-100">
              {post.title}
            </h3>
          </Link>
          <p className="line-clamp-3 text-base text-textMuted dark:text-slate-300">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-textMuted dark:border-slate-800 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {post.readTime}
            </span>
            <span>{formatDate(post.date)}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 font-medium text-primary"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
