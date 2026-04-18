export const CATEGORIES = [
  {
    slug: "web-development",
    name: "Web Development",
    shortName: "Web Dev",
    description: "Frontend, backend, and full-stack tutorials for beginners.",
  },
  {
    slug: "freelancing",
    name: "Freelancing",
    shortName: "Freelancing",
    description: "How students can earn online with practical freelance skills.",
  },
  {
    slug: "career-guide",
    name: "Career Guide",
    shortName: "Career",
    description: "Roadmaps, mindset, and career advice for long-term growth.",
  },
  {
    slug: "tools-resources",
    name: "Tools & Resources",
    shortName: "Tools",
    description: "Best free tools, websites, and systems to learn faster.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated: string;
  author: string;
  category: CategorySlug;
  tags: string[];
  featured: boolean;
  featuredImage: string;
  readTime: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  excerpt: string;
  wordCount: number;
  headings: TocHeading[];
}

export type PostPreview = Omit<Post, "content" | "headings">;

export interface CategoryWithCount {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  count: number;
}
