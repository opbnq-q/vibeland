import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "page",
      // Files live under `vibeland/content/projects/**`
      // The `source` is relative to the `content/` directory.
      source: "projects/**/*.{md,mdc}",

      // Make frontmatter fields queryable + typed
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.union([z.string(), z.date()]).optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
      }),
    }),
  },
});
