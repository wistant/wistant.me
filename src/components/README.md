# UI Components Architecture (`components/`)

Shared components built with **Radix UI**, **Framer Motion**, and **Tailwind CSS**.

| Folder       | Scope           | Role                                                     |
|--------------|-----------------|----------------------------------------------------------|
| `ui/`        | Primitive       | Low-level design system elements (buttons, inputs, etc.) |
| `shared/`    | Cross-page      | Reusable patterns like navigation or footers             |
| `mdx/`       | Documentation   | Custom React components used inside `.mdx` content       |
| `home/`      | Hero / Sections | Specific blocks for the landing page                     |
| `blog/`      | Layout          | Card items, views counters, and reading-time logic       |
| `projects/`  | Showcase        | Visual grid and detailed views for projects              |
| `dock/`      | Global Nav      | Interactive floating dock with mobile responsiveness     |
| `seo/`       | Metadata        | JSON-LD scripts and specialized head management          |
| `mvpblocks/` | High-level      | Complex pre-built UI segments (MagicUI/Aceternity)       |

> Components are strictly client-side when using motion/state, and server-side by default where possible.
