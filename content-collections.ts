import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import sizeOf from "image-size";
import path from "path";
import fs from "fs";

const getImageDimensions = (imagePath?: string) => {
  if (!imagePath || imagePath.startsWith("http")) return null;
  
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    if (fs.existsSync(fullPath)) {
      const dimensions = sizeOf(fs.readFileSync(fullPath));
      return {
        width: dimensions.width,
        height: dimensions.height,
      };
    }
  } catch (error) {
    console.error(`Failed to get dimensions for ${imagePath}:`, error);
  }
  return null;
};

const posts = defineCollection({
  name: "posts",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    publishedAt: z.string().optional(),
    updatedAt: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    published: z.boolean().default(true),
    content: z.string().optional(), // Already explicitly defined
    lang: z.string().optional(),
  }),
  transform: (document) => {
    const date = document.date || document.publishedAt || new Date().toISOString();
    const summary = document.summary || document.description || "";
    const image = document.image || document.thumbnail;
    const dimensions = getImageDimensions(image);

    const rawPath = document._meta.path;
    const match = rawPath.match(/^(.*?)(?:\.(en|fr))?$/);
    const slug = match ? match[1] : rawPath;
    const extractedLang = match && match[2] ? match[2] : "en";

    return {
      ...document,
      slug,
      lang: document.lang || extractedLang,
      date,
      summary,
      image,
      imageWidth: dimensions?.width,
      imageHeight: dimensions?.height,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "src/app",
  include: "**/projects/**/page.mdx",
  schema: z.object({
    // Fields are now parsed manually from the MDX content to avoid Turbopack serialization issues
    title: z.string().optional(),
    description: z.string().optional(),
    dates: z.string().optional(),
    order: z.number().optional().default(99),
    active: z.boolean().optional().default(true),
    featured: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    video: z.string().optional(),
    links: z.array(
      z.object({
        type: z.string(),
        href: z.string(),
      })
    ).optional(),
    category: z.enum(["client", "opensource", "personal"]).optional().default("personal"),
    status: z.string().optional(),
    content: z.string(), // Explicitly added content property
  }),
  transform: (document) => {
    const rawPath = document._meta.path;
    const parts = rawPath.split("/");
    const lang = parts[0] === "[lang]" ? "en" : parts[0];
    const slug = parts[3] || parts[parts.length - 2];
    
    // Extract projectData fields from the MDX content using high-reliability regex
    const content = document.content;
    const extractField = (field: string) => {
      const regex = new RegExp(`${field}:\\s*(?:"(.*?)"|'(.*?)'|(\\d+)|(true|false)|(\\[.*?\\]))`, "s");
      const match = content.match(regex);
      if (!match) return null;
      
      const value = match[1] || match[2] || match[3] || match[4] || match[5];
      
      // Handle simple types
      if (match[4]) return value === "true"; // Boolean
      if (match[3]) return parseInt(value, 10); // Number
      if (match[1] || match[2]) return value; // String
      
      // Handle Arrays (match[5])
      if (match[5]) {
        const rawArray = match[5];
        if (field === "links") {
          // Specialized parsing for [{ type: "...", href: "..." }]
          const linkRegex = /\{\s*type:\s*["'](.*?)["'],\s*href:\s*["'](.*?)["']\s*\}/g;
          const links: { type: string; href: string }[] = [];
          let linkMatch;
          while ((linkMatch = linkRegex.exec(rawArray)) !== null) {
            links.push({ type: linkMatch[1], href: linkMatch[2] });
          }
          return links;
        }
        // Generic simple array (tags, images)
        return rawArray.replace(/[\[\]\s"']/g, "").split(",").filter(Boolean);
      }
      return value;
    };

    const finalData = {
      title: (extractField("title") as string) || slug,
      description: (extractField("description") as string) || "",
      order: (extractField("order") as number) ?? 99,
      active: (extractField("active") as boolean) ?? true,
      featured: (extractField("featured") as boolean) ?? false,
      category: ((extractField("category") as string) || "personal") as "client" | "opensource" | "personal",
      image: (extractField("image") as string) || "",
      video: (extractField("video") as string) || "",
      tags: (extractField("tags") as string[]) || [],
      dates: (extractField("dates") as string) || "",
      status: (extractField("status") as string) || "completed",
      links: (extractField("links") as { type: string; href: string }[]) || [],
      images: (extractField("images") as string[]) || [],
    };

    const dimensions = getImageDimensions(finalData.image);

    return {
      ...finalData,
      slug,
      lang: lang,
      imageWidth: dimensions?.width,
      imageHeight: dimensions?.height,
    };
  },
});

const certifications = defineCollection({
  name: "certifications",
  directory: "src/content/certifications",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    image: z.string().optional(),
    href: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    lang: z.string().optional(),
    content: z.string().optional(), // Explicitly added content property
  }),
  transform: (document) => {
    const rawPath = document._meta.path;
    const match = rawPath.match(/^(.*?)(?:\.(en|fr))?$/);
    const slug = match ? match[1] : rawPath;
    const extractedLang = match && match[2] ? match[2] : "en";
    const dimensions = getImageDimensions(document.image);

    return {
      ...document,
      slug,
      lang: document.lang || extractedLang,
      imageWidth: dimensions?.width,
      imageHeight: dimensions?.height,
    };
  },
});

export default defineConfig({
  content: [posts, projects, certifications],
});
