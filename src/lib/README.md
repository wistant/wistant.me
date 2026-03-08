# src/lib/

Pure utility functions and framework helpers. No side effects, no state.

---

## Files

| File | Exports | Description |
|---|---|---|
| `utils.ts` | `cn()` | Merges Tailwind class names (clsx + tailwind-merge) |
| `dictionary.ts` | `getDictionary()` | Async locale loader — reads from `src/dictionaries/[lang].json` |
| `authors.ts` | `authors` | Blog author registry (name, avatar, links) |
| `pagination.ts` | `paginate()`, `getPaginationRange()` | Blog pagination utilities |
| `remark-code-meta.ts` | remark plugin | Parses `meta` string on fenced code blocks for Shiki transformers |

---

## `cn()` — Class Merging

```ts
import { cn } from "@/lib/utils";

cn("px-4 py-2", isActive && "bg-primary", className)
```

Always use `cn()` for conditional Tailwind classes. Never string-concatenate class names.

---

## `getDictionary(lang)`

```ts
import { getDictionary } from "@/lib/dictionary";

const dict = await getDictionary("fr"); // Server Component only
```

Dynamically imports the JSON dictionary for the given locale. Supports: `en`, `fr`, `es`, `ar`, `wo`.

The return type is inferred from `en.json` — TypeScript will catch missing keys.

---

## `authors`

Blog authors are registered in `authors.ts` and referenced by a string ID in MDX frontmatter (`author: "wistantkode"`). Used by the blog article page to render author cards.