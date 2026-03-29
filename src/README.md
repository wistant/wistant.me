# Internal Source (`src/`)

The absolute core of the application source code.

## Architecture Map

| Directory | Purpose |
|---|---|
| [`app/`](./app/) | Next.js App Router (Pages, Layouts, APIs) |
| [`components/`](./components/) | Reusable UI components co-located by feature (not type) |
| [`content/`](./content/) | MDX Content Layer (Blog posts, Case studies) |
| [`data/`](./data/) | Static typed data (Work, Skills, Hackathons, Config) |
| [`dictionaries/`](./dictionaries/) | Multi-language JSON UI translations (EN, FR, ES, AR, WO) |
| [`lib/`](./lib/) | Pure utility functions (Helpers, MDX processing, tailwind merge) |
| [`fonts/`](./fonts/) | Pre-loaded self-hosted fonts |
| [`hooks/`](./hooks/) | Custom React DOM Hooks |
| [`config/`](./config/) | Global application SEO and Metadata |

## Core Logic (`proxy.ts`)
The `src/proxy.ts` file acts as the Next.js Edge Middleware. It intercepts incoming requests, detects the user's locale, and automatically redirects to the localized path (e.g. `/{lang}/...`).
