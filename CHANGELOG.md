# Changelog

## [1.1.0] - 2026-04-19 - [Sober Engineering Awakening]

### Breaking Changes

- None.

### Features

- Deleted the heavy, blurry `Hero` background image in `src/app/[lang]/(web)/blog/[slug]/page.tsx` and replaced it with a sharp, standard image block (`aspect-video`) positioned strictly below the header.
- Shrunk and sharpened the blog post index thumbnails (`src/components/blog/blog-post-item.tsx`) by removing heavy rounded corners, removing the excessive 'scale/zoom' hover effects, and enforcing a rigid minimalist design.
- Added real-time view counting that triggers when a user opens a blog post, using a custom API route (`src/app/api/blog/analytics/route.ts`) connected to Upstash Redis (`src/lib/redis.ts`).
- Added a functional 'Like' button at the bottom of blog articles (`src/components/blog/slug/reactions.tsx`) that stores an optimistic UI state in local storage and validates via the Redis API endpoints.

### Fixes & Refactoring

- Standardized the maximum width of all blog articles (`src/app/[lang]/(web)/blog/[slug]/page.tsx`) and the blog index (`src/app/[lang]/(web)/blog/page.tsx`) to `max-w-2xl` so they perfectly align with the dimensions of the project pages.
- Deleted duplicate or confusing "Back to blog" buttons across the application and replaced them with a single, perfectly aligned `<ArrowLeft />` icon from the `lucide-react` library inside `src/components/blog/slug/header.tsx`.
- Stripped `es` (Spanish), `ar` (Arabic), and `wo` (Wolof) from the regex routing parser in `content-collections.ts` to strictly lock the site down to `.en` and `.fr` document structures.
