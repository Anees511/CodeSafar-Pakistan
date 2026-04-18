import fs from "fs";
import path from "path";

import matter from "gray-matter";

import {
  CATEGORIES,
  type CategorySlug,
  type CategoryWithCount,
  type Post,
  type PostFrontmatter,
  type TocHeading,
} from "@/lib/types";
import { calculateReadingTime, isCategorySlug, slugify } from "@/lib/utils";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

function getPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs.readdirSync(BLOG_DIRECTORY).filter((file) => file.endsWith(".mdx"));
}

function extractHeadings(content: string): TocHeading[] {
  return content
    .split("\n")
    .filter((line) => /^(##|###)\s+/.test(line.trim()))
    .map((line) => {
      const normalized = line.trim();
      const level = normalized.startsWith("###") ? 3 : 2;
      const text = normalized.replace(/^###?\s+/, "").trim();

      return {
        id: slugify(text),
        text,
        level,
      };
    });
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string,
  content: string,
): PostFrontmatter {
  const categoryValue =
    typeof data.category === "string" && isCategorySlug(data.category)
      ? data.category
      : "web-development";

  const computedReadingTime = calculateReadingTime(content).text;

  return {
    title: typeof data.title === "string" ? data.title : slug,
    description:
      typeof data.description === "string"
        ? data.description
        : "A practical guide for students learning modern software development.",
    date:
      typeof data.date === "string"
        ? data.date
        : new Date().toISOString().slice(0, 10),
    lastUpdated:
      typeof data.lastUpdated === "string"
        ? data.lastUpdated
        : typeof data.date === "string"
          ? data.date
          : new Date().toISOString().slice(0, 10),
    author: typeof data.author === "string" ? data.author : "Muhammad Anees",
    category: categoryValue,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    featured: Boolean(data.featured),
    featuredImage:
      typeof data.featuredImage === "string" ? data.featuredImage : "",
    readTime: computedReadingTime,
  };
}

function createPostFromFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(BLOG_DIRECTORY, fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = normalizeFrontmatter(data as Record<string, unknown>, slug, content);

  return {
    slug,
    content,
    excerpt: frontmatter.description,
    wordCount: calculateReadingTime(content).wordCount,
    headings: extractHeadings(content),
    ...frontmatter,
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map(createPostFromFile)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | null {
  const fileName = `${slug}.mdx`;

  if (!getPostFiles().includes(fileName)) {
    return null;
  }

  return createPostFromFile(fileName);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPosts(limit = 6): Post[] {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return getPostFiles().map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllCategoriesWithCount(): CategoryWithCount[] {
  const posts = getAllPosts();

  return CATEGORIES.map((category) => ({
    ...category,
    count: posts.filter((post) => post.category === category.slug).length,
  }));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const allPosts = getAllPosts().filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = allPosts.filter(
    (candidate) => candidate.category === post.category,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const fallback = allPosts.filter(
    (candidate) =>
      candidate.category !== post.category &&
      !sameCategory.some((same) => same.slug === candidate.slug),
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function getCategorySlugs(): CategorySlug[] {
  return CATEGORIES.map((category) => category.slug);
}
