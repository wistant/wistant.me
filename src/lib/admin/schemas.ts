import { z } from "zod";

export const ContentTypeSchema = z.enum(["projects", "blog", "resume", "gallery", "settings"]);
export type ContentType = z.infer<typeof ContentTypeSchema>;

export const FrontmatterSchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  date: z.string().optional(),
  dates: z.string().optional(),
  published: z.boolean().optional(),
  active: z.boolean().optional(),
  order: z.number().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  alt: z.string().optional(),
  className: z.string().optional(),
  favicon: z.string().optional(),
  logo: z.string().optional(),
  author: z.string().optional(),
  socials: z.object({
    github: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
  links: z.array(z.object({
    type: z.string(),
    href: z.string(),
  })).optional(),
  builderBlocks: z.any().optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export const CMSContentSchema = z.object({
  slug: z.string(),
  lang: z.string(),
  content: z.string(),
  frontmatter: FrontmatterSchema,
  lastModified: z.number(),
});

export type CMSContent = z.infer<typeof CMSContentSchema>;

export const SaveContentPayloadSchema = z.object({
  type: ContentTypeSchema,
  slug: z.string(),
  lang: z.string(),
  frontmatter: FrontmatterSchema,
  content: z.string(),
});

export type SaveContentPayload = z.infer<typeof SaveContentPayloadSchema>;

export const TranslatePayloadSchema = z.object({
  content: z.string(),
  targetLang: z.string(),
  contentType: ContentTypeSchema,
});

export type TranslatePayload = z.infer<typeof TranslatePayloadSchema>;
