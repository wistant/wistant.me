# Global Components

This directory contains "Universal" components used across multiple features (Blog, Projects, Home).

## Directory Structure

| Directory | Description |
| :--- | :--- |
| `ui/` | **Atomic UI.** Low-level components (Buttons, Inputs, Cards). Mostly from Shadcn/Radix. |
| `layout/` | **Site Structure.** Header, Footer, Navigation, Sidebar. |
| `mdx/` | **MDX Components.** Components specifically designed to be embedded inside Markdown files (e.g., `CodeBlock`, `Callout`). |
| `icons/` | Custom SVG icons (if not using Lucide). |

## Rules

1. **No Business Logic:** These components should be dumb (presentational).
2. **Reusability:** If a component is used in only ONE feature (e.g., Blog), move it to `src/app/blog/components`.
3. **Theming:** All components must support Dark Mode via Tailwind classes.