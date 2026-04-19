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
    content: z.string().optional(),
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
  directory: "src/content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dates: z.string().optional(),
    order: z.number().optional().default(99),
    active: z.boolean().optional().default(true),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    video: z.string().optional(),
    links: z.array(
      z.object({
        type: z.string(),
        href: z.string(),
      })
    ).optional(),
    longDescription: z.string().optional(),
    features: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      })
    ).optional(),
    highlights: z.array(z.string()).optional(),
    installation: z.array(
      z.object({
        title: z.string(),
        code: z.string(),
        type: z.string(),
      })
    ).optional(),
    challengesAndSolutions: z.array(
      z.object({
        problem: z.string(),
        solution: z.string(),
      })
    ).optional(),
    tools: z.array(z.string()).optional(),
    team: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
    images: z.array(z.string()).optional(),
    content: z.string().optional(),
    lang: z.string().optional(),
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
  content: [posts, projects],
});
