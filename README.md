# wistant.dev

Personal portfolio of **Wistant Kode** — Full-Stack Software & Product Engineer based in Douala, Cameroon.

Built with Next.js 16 App Router, React 19, TailwindCSS 4, Framer Motion, and a fully headless MDX content layer. Supports 5 languages (EN, FR, ES, AR, WO) with zero compromises on performance or design.

---

## Live

[wistant.dev](https://wistant.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1 (App Router, Turbopack) |
| UI | React 19, TailwindCSS 4, Framer Motion 12 |
| Content | content-collections, MDX, rehype-pretty-code, Shiki |
| Fonts | Cal Sans, Cabinet Grotesk, Clash Display, Inter |
| Icons | Static SVG assets in `public/icons/` |
| i18n | Custom dictionary system — 5 locales (EN, FR, ES, AR, WO) |
| Analytics | Vercel Analytics |
| Deployment | Vercel |
| Package Manager | Bun |

---

## Project Structure

```
wistant.dev/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # All UI components (home, dock, blog, projects, ui/)
│   ├── content/          # MDX content — blog posts and project case studies
│   ├── data/             # Typed static data — personal info, skills, work, hackathons
│   ├── dictionaries/     # i18n translation files (en, fr, es, ar, wo)
│   ├── lib/              # Utilities — dictionary loader, MDX helpers, pagination
│   ├── fonts/            # Locally hosted .woff2 font files
│   ├── hooks/            # Custom React hooks
│   ├── config/           # Site metadata configuration
│   └── proxy.ts          # Language detection middleware (Next.js Edge)
├── public/
│   ├── icons/            # 18 static SVG icons (nav, social, stack)
│   ├── portfolio/        # Project thumbnails and gallery images
│   ├── experiences/      # Company/experience logos
│   ├── me/               # Avatar image
│   └── blog/             # Blog post thumbnails and author photos
├── content-collections.ts # MDX collection schemas (blog + projects)
└── next.config.ts         # Next.js configuration with security headers
```

---

## Pages

| Route | Description |
|---|---|
| `/[lang]` | Home — hero, skills, work, hackathons, blog preview, contact |
| `/[lang]/about` | Full about page with skills and work timeline |
| `/[lang]/projects` | Project index with filtering by technology |
| `/[lang]/projects/[slug]` | Rich MDX case study with lightbox gallery |
| `/[lang]/blog` | Blog index with tag filtering and pagination |
| `/[lang]/blog/[slug]` | Article with syntax-highlighted code blocks |
| `/[lang]/contact` | Contact page with social links |
| `/[lang]/hackathons` | Hackathon timeline |
| `/api/og` | Dynamic OpenGraph image generation |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Robots rules |
| `/llms.txt` | LLM-readable content index |

---

## i18n

The app supports 5 locales: `en`, `fr`, `es`, `ar`, `wo` (Wolof).

- Language detection is handled in `src/proxy.ts` (Next.js Edge middleware).
- All UI strings live in `src/dictionaries/[lang].json`.
- MDX content uses a `[slug].[lang].mdx` naming convention with automatic language fallback.
- Arabic (`ar`) renders with `dir="rtl"` applied at the `<html>` level.

---

## Adding Content

### New Project

1. Create `src/content/projects/[slug].en.mdx` (and optionally `.fr.mdx`, `.es.mdx`, etc.)
2. Add frontmatter: `title`, `description`, `date`, `tags`, `order`, `active`, `lang`, `slug`
3. The project appears automatically on `/[lang]/projects`

### New Blog Post

1. Create `src/content/blog/[slug].en.mdx`
2. Add frontmatter: `title`, `summary`, `date`, `tags`, `author`, `lang`, `slug`
3. The post appears automatically on `/[lang]/blog`

---

## Development

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # Production build
bun run lint   # ESLint
```

---

## Architecture Notes for Agents

- **Icon system**: All icons are static SVG files at `public/icons/*.svg`. Referenced as string paths in data files (`"/icons/github.svg"`). The proxy middleware excludes `icons/` from language redirects — do not move icons elsewhere.
- **Content layer**: `content-collections.ts` defines the `allProjects` and `allPosts` typed collections. Queries go through `src/data/projects.ts` and `src/data/blog.ts` which handle language fallback.
- **i18n flow**: Request hits proxy → locale detected → redirect to `/{lang}/...` → `getDictionary(lang)` called → `dict` passed as prop to all components.
- **Fonts**: All fonts are self-hosted in `public/fonts/` and loaded via `next/font/local` in `src/app/[lang]/layout.tsx`.
- **No external icon libraries in production**: `lucide-react` is a dev dependency only for fallback. All production icons are `public/icons/*.svg` files.
