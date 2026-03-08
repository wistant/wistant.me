# src/content/

MDX content layer — all blog posts and project case studies.

Powered by [content-collections](https://www.content-collections.dev/). Schemas are defined in `/content-collections.ts` at the root.

---

## Directories

| Directory | Contents |
|---|---|
| [`blog/`](./blog/) | Blog post MDX files |
| [`projects/`](./projects/) | Project case study MDX files |

---

## Naming Convention

All files follow the pattern: `[slug].[lang].mdx`

```
projects/
  chickfood.en.mdx
  chickfood.fr.mdx
  elysian-drive.en.mdx
  elysian-drive.fr.mdx
  ...

blog/
  react-animation-libraries.en.mdx
  react-portfolio-templates.fr.mdx
  ...
```

Languages supported: `en`, `fr`, `es`, `ar`, `wo`

**Language fallback**: If a file doesn't exist in the requested language, `getProjectsByLang()` / `getPostsByLang()` in `src/data/` automatically fall back to the next available translation. The app never crashes on missing content.

---

## Project Frontmatter

```mdx
---
title: "Chickfood"
description: "A food delivery platform for the Cameroonian market."
date: "2024-03-01"
tags: ["Next.js", "NestJS", "PostgreSQL"]
order: 1
active: true
lang: "en"
slug: "chickfood"
---
```

| Field | Type | Description |
|---|---|---|
| `title` | string | Project name |
| `description` | string | Short description for cards and SEO |
| `date` | string | ISO date |
| `tags` | string[] | Technology tags — used for filtering on the index page |
| `order` | number | Sort order on the projects index (lower = first) |
| `active` | boolean | Set `false` to hide from all listings |
| `lang` | string | Locale code of this file (`en`, `fr`, etc.) |
| `slug` | string | URL slug — must match the filename |

---

## Blog Frontmatter

```mdx
---
title: "21 Best Free React Components"
summary: "A curated list of the best free React components."
date: "2024-01-10"
tags: ["React", "Open Source"]
author: "wistantkode"
lang: "en"
slug: "21-best-free-react-components"
---
```

---

## Current Projects Index

| Slug | EN | FR |
|---|---|---|
| `chickfood` | ✓ | ✓ |
| `elysian-drive` | ✓ | ✓ |
| `fizzi` | ✓ | ✓ |
| `nova` | ✓ | ✓ |
| `plantex-showcase` | ✓ | ✓ |
| `shopdo` | ✓ | ✓ |
| `splyt` | ✓ | ✓ |
| `suburbia` | ✓ | ✓ |

## Current Blog Index

| Slug | EN | FR |
|---|---|---|
| `21-best-free-react-components` | ✓ | — |
| `nextjs-portfolio-templates` | ✓ | — |
| `react-animation-libraries` | ✓ | — |
| `react-landing-page-templates` | ✓ | — |
| `react-native-libraries` | ✓ | — |
| `react-portfolio-templates` | ✓ | ✓ |

---

## Adding a New Project

1. Create `src/content/projects/[slug].en.mdx` with the frontmatter above.
2. Optionally add `[slug].fr.mdx`, `[slug].es.mdx`, etc.
3. Done — no registration needed. content-collections picks it up automatically.
