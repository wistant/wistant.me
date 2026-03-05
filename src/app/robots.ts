import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/_next/", "/me/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Anthropic-ai", "Claude-Web", "PerplexityBot"],
        allow: ["/", "/llms.txt"],
      }
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}