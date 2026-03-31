# Static Data (`data/`)

The strongly typed static data layer serving as the primary content registry for the interface.

| File | Content |
|---|---|
| `personal.tsx` | Core profile info, bio, avatar, SEO strings |
| `resume.tsx` | Master export (`DATA`) consolidating all modules |
| `skills.tsx` | Core domain technologies & tools |
| `work.tsx` | Experience timelines |
| `projects.ts` | Query wrappers for `content-collections` |

## Icon Management
Icons used across these files exist purely as **string paths** (`/icons/github.svg`). They are never imported as React Components. They are natively resolved by standard HTML `<img>` tags.
