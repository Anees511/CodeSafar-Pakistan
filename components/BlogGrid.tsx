import BlogCard from "@/components/BlogCard";
import type { PostPreview } from "@/lib/types";

interface BlogGridProps {
  posts: PostPreview[];
  emptyMessage?: string;
}

export default function BlogGrid({
  posts,
  emptyMessage = "No articles available right now.",
}: BlogGridProps) {
  if (!posts.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center text-textMuted dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
