import BlogGrid from "@/components/BlogGrid";
import type { Post } from "@/lib/types";

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
          Continue Reading
        </h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500" />
      </div>
      <BlogGrid posts={posts.slice(0, 3)} />
    </section>
  );
}
