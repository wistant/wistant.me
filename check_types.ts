import { defineCollection } from "@content-collections/core";

const posts = defineCollection({
  name: "posts",
  directory: "src/app/(web)/blog/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
  }),
});
