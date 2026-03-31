# Components (`components/`)

All UI elements strictly co-located by **Feature Domain** (Not type).

## Domain Catalog

| Domain | Scope |
|---|---|
| [`home/`](./home/) | Landing page blocks (Hero, Skills, Work Timeline, Contact) |
| [`dock/`](./dock/) | Floating MacOS-style navigation & Locale switchers |
| [`blog/`](./blog/) | Article lists, Author banners, Filter chips |
| [`projects/`](./projects/) | Isometric Cards & Portfolio UI |
| [`mdx/`](./mdx/) | Custom `react-markdown`/`next-mdx-remote` node overrides |
| [`seo/`](./seo/) | `Schema.org` JSON-LD injectors |
| [`ui/`](./ui/) | Baseline Design System (`shadcn/ui`, `MagicUI`, generic atoms) |

## Icon Architecture
We aggressively strip 3rd-party icon libraries from production build bundles:
Always render icons via standard `<img>` tags mapping to `public/icons/*.svg`. Leverage the unified `dark:invert` utility for theme scaling.