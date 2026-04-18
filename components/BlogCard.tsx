import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock3, Code2, BriefcaseBusiness, Rocket, Wrench } from "lucide-react";

import CategoryBadge from "@/components/CategoryBadge";
import type { PostPreview } from "@/lib/types";
import type { CategorySlug } from "@/lib/types";
import { formatDate, getCategoryMeta } from "@/lib/utils";

interface BlogCardProps {
  post: PostPreview;
}

const categoryGradients: Record<CategorySlug, string> = {
  "web-development": "from-violet-600 to-blue-600",
  freelancing: "from-emerald-600 to-teal-600",
  "career-guide": "from-orange-500 to-rose-500",
  "tools-resources": "from-cyan-600 to-blue-600",
};

const categoryIcons: Record<CategorySlug, React.ComponentType<{ className?: string }>> = {
  "web-development": Code2,
  freelancing: BriefcaseBusiness,
  "career-guide": Rocket,
  "tools-resources": Wrench,
};

export default function BlogCard({ post }: BlogCardProps) {
  const categoryMeta = getCategoryMeta(post.category);
  const gradient = categoryGradients[post.category] || "from-brand-500 to-indigo-500";
  const IconComponent = categoryIcons[post.category] || Code2;

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-xl hover:shadow-brand-500/10 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/30 dark:hover:shadow-brand-500/5 cursor-pointer">
      <Link href={`/blog/${post.slug}`} aria-label={post.title}>
        {post.featuredImage ? (
          <div className="relative overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={675}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="text-white text-sm font-medium flex items-center gap-1.5">
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ) : (
          <div className={`relative aspect-video w-full bg-gradient-to-br ${gradient} overflow-hidden`}>
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            {/* Large category icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <IconComponent className="h-16 w-16 text-white/20" />
            </div>
            {/* Title overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70 font-medium">
                {categoryMeta.shortName}
              </p>
              <p className="mt-2 max-w-[22ch] text-lg font-semibold leading-tight text-white line-clamp-2" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                {post.title}
              </p>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        )}
      </Link>

      <div className="space-y-3 p-5">
        <CategoryBadge category={post.category} />

        <div className="space-y-2">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="line-clamp-2 font-heading text-lg font-semibold text-ink-900 transition-colors duration-200 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
              {post.title}
            </h3>
          </Link>
          <p className="line-clamp-3 text-sm text-ink-500 dark:text-ink-400">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400 dark:border-ink-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 transition-all group-hover:gap-2"
          >
            Read more
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
