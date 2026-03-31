# Public Assets (`public/`)

Static assets served directly by Next.js. All files are permanently accessible at the root URL.

## Directory Map

| Path | Description |
|---|---|
| `/icons/` | Static SVG icons (Navigation, Socials, Stack). **Never move this** (used in proxy). |
| `/portfolio/` | Project thumbnails & lightbox gallery |
| `/experiences/` | Company logos for the work timeline |
| `/me/` | Avatar photos (e.g. `me.png`) |
| `/blog/` | Article thumbnails & author photos |
| `/education/` | School/University logos |
| `/hackatons/` | Hackathon logos & badges |
| `/logos/` | Brand logos (OG images) |
| `/gallery/` | Personal photo gallery (auto-shuffled) |
| `/fonts/` | Self-hosted `.woff2` font files |
| `/cv/` | Downloadable PDF resumes |
| `/opengraph/` | Static OG/Twitter card images |

## Icon Rules
All icons are **Static SVGs** (no external libraries in prod).
- **Dark Mode**: Add `dark:invert` to `<img />` tags for stroke/fill based icons. 
- **Exception**: Colored brand icons (like WhatsApp) must remain untouched.
