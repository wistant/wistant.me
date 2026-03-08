# src/data/

Typed static data layer. All data consumed by components comes from here — never hardcoded inline.

---

## Files

| File | Exports | Description |
|---|---|---|
| `personal.tsx` | `personalData` | Name, avatar, bio, navbar items, social links |
| `resume.tsx` | `DATA` | Master composite export — merges all data modules |
| `skills.tsx` | `skillsData` | Tech stack entries with icon paths |
| `work.tsx` | `workData` | Work experience timeline |
| `education.tsx` | `educationData` | Education entries |
| `hackathons.tsx` | `hackathonsData` | Hackathon participations |
| `projects.ts` | `getProjectsByLang()`, `getProjectBySlug()` | Queries the content-collections MDX project data |
| `blog.ts` | `getPostsByLang()`, `getPostBySlug()` | Queries the content-collections MDX blog data |
| `gallery-data.ts` | `galleryData` | Photo gallery entries |
| `social-posts.tsx` | `socialPostsData` | Featured social media posts |

---

## `DATA` (resume.tsx)

The single entry point for components. Import `DATA` to access everything:

```ts
import { DATA } from "@/data/resume";

DATA.name           // "Wistant Kode"
DATA.navbar         // navigation items with icon paths
DATA.contact.social // GitHub, LinkedIn, WhatsApp, X, email
DATA.skills         // tech stack with icons
DATA.work           // work experience
DATA.education      // education
DATA.hackathons     // hackathons
```

---

## Icon Convention

Icon fields in `navbar` and `contact.social` are **string paths** to static SVG files:

```ts
{ href: "/projects", icon: "/icons/globe.svg", label: "Projects" }
{ name: "GitHub", icon: "/icons/github.svg", url: "https://github.com/wistantkode" }
```

Render them as `<img src={icon} alt={label} />` — never as React components.
Apply `dark:invert` to most icons (except colored brand icons like WhatsApp).

---

## Language-Aware Queries

`projects.ts` and `blog.ts` implement language fallback:

```ts
// Returns projects in `lang`, falling back to any available language if not found
getProjectsByLang("fr")

// Returns a single project by slug, with language fallback
getProjectBySlug("chickfood", "es")
```
