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
      <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-10 text-center text-ink-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 stagger-children">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
