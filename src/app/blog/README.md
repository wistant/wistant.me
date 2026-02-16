# Blog Module

This directory contains all the logic, content, and components specific to the Blog feature of wistant.dev.

## Directory Structure

| Directory/File | Description |
| :--- | :--- |
| `content/` | **Data Source.** Contains all `.mdx` files for blog posts. |
| `components/` | **Local Components.** UI components used *only* in the blog (e.g., `PostCard`, `NewsletterForm`). |
| `types/` | **Local Types.** TypeScript definitions specific to blog logic. |
| `page.tsx` | The main blog listing page (Index). |
| `[slug]/` | Dynamic route for individual blog posts. |

## Usage

- To add a post, create a new `.mdx` file in `content/`.
- Shared components (like Buttons) should be imported from `@/components/ui`.

## Key Features
- MDX rendering with `rehype-pretty-code`.
- Tag filtering system.