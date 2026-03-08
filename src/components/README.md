# src/components/

All UI components, organized by feature domain.

---

## Directories

| Directory | Contents |
|---|---|
| [`home/`](./home/) | Home page section components (hero, skills, work, contact, etc.) |
| [`dock/`](./dock/) | Floating navigation dock — desktop magnifiable + mobile bar |
| [`blog/`](./blog/) | Blog list, article header, author card, tag filter |
| [`projects/`](./projects/) | Project cards, project section |
| [`mdx/`](./mdx/) | MDX renderer, code block, image lightbox |
| [`seo/`](./seo/) | Structured data / JSON-LD components |
| [`ui/`](./ui/) | Base component library — shadcn/ui + MagicUI + custom atoms |

---

## Key Components

### Dock (`dock/`)

| File | Description |
|---|---|
| `floating-dock.tsx` | Main dock — renders desktop (magnifiable icons) and mobile (fixed bar) variants. Accepts `items` and `mobileItems` props as `{ title, icon: ReactNode, href }`. Active page state via `usePathname()`. |
| `language-switcher.tsx` | Flag-based locale switcher. Maps `en → 🇬🇧`, `fr → 🇫🇷`, `es → 🇪🇸`, `ar → 🇸🇦`, `wo → 🇸🇳`. |
| `theme-toggle-icon.tsx` | Sun/moon SVG toggle with hydration-safe rendering. |

### Home Sections (`home/`)

| File | Description |
|---|---|
| `hero-section.tsx` | Animated hero with BlurFade entrance |
| `skills-section.tsx` | Spring-physics skill cards from `skillsData`. Icons rendered as `<img>` from `/icons/*.svg`. |
| `work-section.tsx` | Timeline of work experience. `presentLabel` prop for i18n. |
| `hackathons-section.tsx` | Hackathon timeline. All labels props-driven from dict. |
| `contact-section.tsx` | Home page CTA block with animated FlickeringGrid background. |

### MDX (`mdx/`)

| File | Description |
|---|---|
| `mdx-content.tsx` | Renders MDX via `next-mdx-remote` with custom component overrides |
| `mdx-image.tsx` | Framer Motion lightbox for MDX images — click to expand fullscreen |

---

## `ui/` — Component Library

The `ui/` directory contains:

- **Shadcn/ui primitives**: `button`, `badge`, `avatar`, `accordion`, `card`, `separator`, `tooltip`, `scroll-area`
- **MagicUI components** (`ui/magicui/`): `blur-fade`, `flickering-grid`, `target-cursor`, `number-ticker`, `animated-gradient-text`
- **Custom atoms**: `icons.tsx` (SVG component registry), `timeline.tsx`

---

## Icon Rendering Rule

All icons in this app are strings (`"/icons/github.svg"`). Render them as:

```tsx
<img
  src={icon}
  alt={label}
  className={cn("size-full object-contain", label !== "WhatsApp" && "dark:invert")}
/>
```

Never attempt to render an icon string as a React component (`<Icon />`).