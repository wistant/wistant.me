# public/

Static assets served directly by Next.js. All files here are accessible at the root URL.

---

## Directories

| Directory | URL prefix | Contents |
|---|---|---|
| `icons/` | `/icons/` | 18 static SVG icons — navigation, social, tech stack |
| `portfolio/` | `/portfolio/` | Project thumbnails and lightbox gallery images |
| `experiences/` | `/experiences/` | Company logos for the work timeline |
| `me/` | `/me/` | Avatar photo (`me.webp`) |
| `blog/` | `/blog/` | Blog post thumbnails and author photos |
| `education/` | `/education/` | School/university logos |
| `hackatons/` | `/hackatons/` | Hackathon logos and banners |
| `logos/` | `/logos/` | Brand logos (used in OG images, etc.) |
| `gallery/` | `/gallery/` | Personal photo gallery |
| `fonts/` | `/fonts/` | Self-hosted .woff2 font files |
| `cv/` | `/cv/` | Resume PDF |
| `opengraph/` | `/opengraph/` | OG image assets |

---

## icons/ — Static SVG Icon System

All app icons live here as raw SVG files. Referenced as string paths in data files.

**Important**: The proxy middleware (`src/proxy.ts`) explicitly excludes the `icons/` path from language redirects. Do NOT rename this directory.

### Navigation Icons (Lucide-style, stroke-based)

| File | Used in |
|---|---|
| `home.svg` | Dock — Home link |
| `user.svg` | Dock — About link |
| `globe.svg` | Dock — Projects link |
| `notebook.svg` | Dock — Blog link |
| `mail.svg` | Dock — Contact link |

### Social Icons (Simple Icons, fill-based)

| File | Used in |
|---|---|
| `github.svg` | Dock, Contact page |
| `linkedin.svg` | Contact page |
| `x.svg` | Contact page |
| `whatsapp.svg` | Dock, Contact page (no `dark:invert` — keeps brand green) |

### Tech Stack Icons

| File | Skill |
|---|---|
| `typescript.svg` | TypeScript |
| `nextjs.svg` | Next.js |
| `nestjs.svg` | NestJS |
| `react.svg` | React |
| `postgresql.svg` | PostgreSQL |
| `prisma.svg` | Prisma |
| `redis.svg` | Redis |
| `vercel.svg` | Vercel |
| `linux.svg` | Linux |

### Dark Mode

Navigation and social icons use `stroke="#000000"` or `fill="#000000"`. Apply `className="dark:invert"` when rendering as `<img>` to make them white on dark backgrounds.
Exception: `whatsapp.svg` uses a color gradient — do not invert it.

---

## llms.txt

Machine-readable content index for LLM crawlers. Contains a summary of the site and links to key pages. Updated manually.
