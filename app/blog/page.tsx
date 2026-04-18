import type { Metadata } from "next";

import BlogListingClient from "@/components/BlogListingClient";
import { getAllPosts } from "@/lib/posts";
import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Browse practical coding and freelancing articles written for Pakistani students.",
  alternates: {
    canonical: getAbsoluteUrl("/blog"),
  },
  openGraph: {
    title: `All Articles | ${siteConfig.name}`,
    description:
      "Browse practical coding and freelancing articles written for Pakistani students.",
    url: getAbsoluteUrl("/blog"),
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/images/og-default.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} blog listing`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `All Articles | ${siteConfig.name}`,
    description:
      "Browse practical coding and freelancing articles written for Pakistani students.",
    images: [getAbsoluteUrl("/images/og-default.png")],
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <BlogListingClient posts={allPosts} />
    </div>
  );
}
