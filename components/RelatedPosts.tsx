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
      <h2 className="font-heading text-3xl font-bold text-textPrimary dark:text-slate-100">
        Related Articles
      </h2>
      <BlogGrid posts={posts.slice(0, 3)} />
    </section>
  );
}
