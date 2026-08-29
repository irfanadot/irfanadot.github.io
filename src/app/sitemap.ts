import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";

export const dynamic = "force-static";

// Pinned so rebuilds do not report false freshness to crawlers.
// Update when the page content meaningfully changes.
const lastModified = new Date("2026-08-28");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: portfolio.site.domain,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
