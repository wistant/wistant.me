import { z } from "zod";

export const ogImageSchema = z.object({
  title: z.string().optional().default("Wistant"),
  description: z.string().optional(),
  type: z.enum(["home", "blog", "projects", "about", "contact"]).default("home"),
  lang: z.enum(["en", "fr"]).default("en"),
  label: z.string().optional(),
  image: z.string().optional(),
});

export type OgImageParams = z.infer<typeof ogImageSchema>;
