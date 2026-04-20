# Changelog

## [1.2.0] - 2026-04-20 - [Analytical Sight & Sober Refinement]

### Features

- **Upstash Redis Analytics**: Integrated real-time view counting and like system with server-side pipelining (`redis.mget`) for zero-latency index rendering.
- **Premium Content Injection**: Automated injection of high-fidelity Unsplash thumbnails and metadata across the entire blog archive.
- **Elite Technical Articles**: Deployed 2 new deeply technical articles ("Mastering React 19") in both English and French.

### Fixes & Refactoring

- **MDX Engine Hardening**: Resolved Shiki static import conflicts for Turbopack compatibility and implemented a global registry proxy for legacy component stability.
- **Fluid UI Scaling**: Refactored `TechBadge` to use relative `em` units, ensuring consistent iconography scaling across standard body prose and large headers.
- **Project Build Stability**: Restored the missing `TagFilter` dependency preventing project index compilation after the blog system cleanup.
- **Codeblock Aesthetics**: Sanitized CSS overrides to preserve server-side syntax highlighting (one-dark-pro) while fixing inline code badge styling.
- **Layout Integrity**: Applied `pb-32` padding to blog slug containers to prevent navigation dock occlusion of interaction elements.
- **Cleanup**: Excised 9 legacy components and stale assets to achieve a 100% clean, sober codebase.

## [1.1.0] - 2026-04-19 - [Sober Engineering Awakening]

- **UI Refinement**: Deleted the heavy, blurry `Hero` background image in `src/app/[lang]/(web)/blog/[slug]/page.tsx` and replaced it with a sharp, standard image block (`aspect-video`).
- **Index Optimization**: Shrunk and sharpened the blog post index thumbnails by removing heavy rounded corners/zoom effects.
- **Real-time Analytics**: Integrated view counting using a custom API route connected to Upstash Redis.
- **Engagement**: Added a functional 'Like' button with optimistic UI state.
- **Alignment**: Standardized blog width to `max-w-2xl` to match project pages.
- **Routing**: Stripped `es`, `ar`, and `wo` from the site to strictly lock content to `.en` and `.fr`.
