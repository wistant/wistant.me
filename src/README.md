# src/

Root of all application source code.

## Directories

| Directory | Purpose |
|---|---|
| [`app/`](./app/) | Next.js App Router — pages, layouts, API routes |
| [`components/`](./components/) | All UI components organized by feature |
| [`content/`](./content/) | MDX content — blog posts and project case studies |
| [`data/`](./data/) | Typed static data — personal info, skills, work, hackathons |
| [`dictionaries/`](./dictionaries/) | i18n JSON translation files for all 5 locales |
| [`lib/`](./lib/) | Pure utilities — dictionary loader, MDX helpers, pagination, cn() |
| [`fonts/`](./fonts/) | Self-hosted .woff2 font files (Cal Sans, Inter, Cabinet Grotesk, Clash Display) |
| [`hooks/`](./hooks/) | Custom React hooks (`use-media-query`) |
| [`config/`](./config/) | Site-wide metadata configuration |

## Key Files

| File | Purpose |
|---|---|
| `proxy.ts` | Next.js Edge middleware — detects locale and redirects unlocalized paths to `/{lang}/...`. Excludes: `api`, `_next`, `icons`, `fonts`, `public assets`. |

## Conventions

- All page components are in `app/[lang]/` — the `[lang]` dynamic segment is always present.
- Components are co-located by feature, not by type (no global `pages/` or `containers/`).
- Data is typed and centralized in `data/` — no inline constants in components.
- Translations are typed via `getDictionary()` — never hardcode UI strings in components.
