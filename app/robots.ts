import type { MetadataRoute } from "next";

import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
