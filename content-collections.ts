import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

// 1. BLOG (Colocated in app/blog/content)
const posts = defineCollection({
  name: "posts",
  directory: "src/app/(web)/blog/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      slug: document._meta.path,
    };
  },
});

// 2. PROJECTS (Colocated in app/projects/content)
const projects = defineCollection({
  name: "projects",
  directory: "src/app/(web)/projects/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    techStack: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    thumbnail: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      slug: document._meta.path,
    };
  },
});

// 3. CERTIFICATIONS (Colocated in app/certifications/content)
const certifications = defineCollection({
  name: "certifications",
  directory: "src/app/(web)/certifications/content",
  include: "**/*.mdx",
  schema: (z) => ({
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    badgeImage: z.string().optional(),
    verifyUrl: z.string().url().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts, projects, certifications],
});