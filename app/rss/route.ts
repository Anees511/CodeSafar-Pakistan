import { getAllPosts } from "@/lib/posts";
import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const rssUrl = getAbsoluteUrl("/rss");

  const items = posts
    .map((post) => {
      const postUrl = getAbsoluteUrl(`/blog/${post.slug}`);

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <description>${escapeXml(post.description)}</description>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <author>${escapeXml(post.author)}</author>
          <category>${escapeXml(post.category)}</category>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <language>en-pk</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
