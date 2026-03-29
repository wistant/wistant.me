# Web Route Layer (`(web)`)

All public-facing features and endpoints of `wistant.dev`.

## Web Structure

| Endpoint / File | Purpose |
|---|---|
| `layout.tsx` | Global Public Layout (Injects Header, Footer, Providers) |
| `page.tsx` | Homepage (Hero, About, Timeline) |
| `blog/` | Article listings and Tag filtering |
| `projects/` | Interactive MDX Case Studies |
| `certifications/` | Verified Accreditations |

## Rendering Rules
By default, all content handled inside `(web)` is compiled via **Static Site Generation (SSG)** to ensure maximum performance globally.