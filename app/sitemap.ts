import type { MetadataRoute } from "next";

import { getAllPosts, getCategorySlugs } from "@/lib/posts";
import { getAbsoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/blog",
    "/contact",
    "/start-here",
    "/rss",
  ].map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategorySlugs().map(
    (slug) => ({
      url: getAbsoluteUrl(`/category/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: getAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
