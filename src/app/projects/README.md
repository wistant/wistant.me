# Projects Module

This directory manages the Portfolio/Projects showcase section.

## Directory Structure

| Directory/File | Description |
| :--- | :--- |
| `content/` | **Data Source.** `.mdx` files describing each project (Case Studies). |
| `components/` | **Local Components.** Specific to projects (e.g., `ProjectGallery`, `TechStackIcon`). |
| `page.tsx` | The projects gallery view. |
| `[slug]/` | Detailed case study view for a specific project. |

## Data Schema

Projects require the following fields in MDX frontmatter:
- `title`
- `description`
- `techStack` (Array of strings)
- `repoUrl` / `demoUrl`