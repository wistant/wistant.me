# Utility Functions (`lib/`)

Pure helper modules designed strictly for side-effect-free execution across the app.

| File | Primary Export | Role |
|---|---|---|
| `utils.ts` | `cn()` | Unifies `clsx` and `tailwind-merge` for absolute class safety |
| `dictionary.ts` | `getDictionary()` | Strictly typed asynchronous locale JSON loader |
| `authors.ts` | `authors` | Object registry of allowed blog writers |
| `pagination.ts` | `paginate()` | Pure mathematical logic to handle block sizes for blog pagination |
| `remark.ts` | Plugin | Extends MDX fences (`meta`) to funnel props perfectly into `Shiki` |