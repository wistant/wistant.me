# App Directory (`app/`)

Core routing and layout structure leveraging Next.js App Router (v16+) with full Internationalization (i18n) support.

### 🖼️ Visual Preview

| Home Page | About Page |
|---|---|
| ![Home Page Light](/readme/home.light.png) | ![About Page Light](/readme/about.light.png) |
| *Home Page (Dark)*<br>![Home Page Dark](/readme/home.dark.png) | *About Page (Dark)*<br>![About Page Dark](/readme/about.dark.png) |

### 🛠️ Directory Breakdown

| Path | Type | Role |
|---|---|---|
| `[lang]/` | Dynamic Segment | Handles multi-language routing (`en`, `fr`, `es`, etc.) |
| `[lang]/(web)/` | Route Group | Contains main website pages with a shared visual identity |
| `[lang]/(web)/blog/` | Route | Dynamic blog engine using `content-collections` and `MDX` |
| `[lang]/(web)/projects/` | Route | Showcase of portfolio projects with rich descriptions |
| `api/` | Directory | Serverless Route Handlers (e.g., OG Image generation) |
| `layout.tsx` | Root Layout | Global providers, fonts, and theme management |
| `robots.ts` / `sitemap.ts` | Config | Dynamic SEO generation for search engines |
