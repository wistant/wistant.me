<div align="center">
  <img src="public/wistant-logo.png" alt="Wistant Logo" width="80" />
  <h1>Wistant</h1>
  <p><b>Personal Hub • Portfolio • MDX Blog</b></p>
  <p>The intersection of engineering precision and digital storytelling.</p>
</div>

<p align="center">
  <a href="https://github.com/wistantkode"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/></a><a href="https://x.com/wistant"><img src="https://img.shields.io/badge/x-%23000000.svg?style=for-the-badge&logo=x&logoColor=white"/></a><a href="https://linkedin.com/in/wistantkode"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/></a><img src="https://img.shields.io/badge/react_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/><img src="https://img.shields.io/badge/framer_motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/><img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/><img src="https://img.shields.io/badge/upstash-%2300E599.svg?style=for-the-badge&logo=upstash&logoColor=black"/>
</p>

<p align="center">
  <a href="https://www.wistant.me">Website</a> •
  <a href="src/app/README.md">Architecture</a> •
  <a href="src/content/README.md">Content</a> •
  <a href="https://github.com/wistantkode">Source</a>
</p>

---

### Showcase

<p align="center">
  <img src="public/readme/home.dark.png" width="48%" />
  <img src="public/readme/home.light.png" width="48%" />
</p>

<p align="center">
  <img src="public/readme/about.dark.png" width="48%" />
  <img src="public/readme/about.light.png" width="48%" />
</p>

---

### Technical Specification

Wistant is a sophisticated, full-stack personal engine architected for high-performance content delivery and professional branding. It moves beyond a simple static site, implementing a robust suite of server-side and client-side features.

- **Advanced i18n Engine** — Built-in support for `EN`, `FR`, `ES`, `AR`, and `WO` through a custom middleware and strictly typed dictionary system.
- **Dynamic MDX Pipeline** — High-speed content processing via `content-collections`, featuring Shiki syntax highlighting and automated reading-time calculation.
- **Serverless Analytics** — Integrated with Upstash Redis for real-time engagement metrics, tracking view counts across the global edge.
- **Automated Meta-Generation** — Dynamic OpenGraph and Twitter card generation via Next.js Route Handlers for every page and post.

### Project Blueprint

| Module | Core Responsibility |
| :--- | :--- |
| **`app/`** | Next.js 16 App Router hierarchy, i18n middleware, and localized metadata. |
| **`components/`** | Reusable UI primitives, Framer Motion animations, and custom MVP blocks. |
| **`content/`** | The source of truth for the MDX-powered blog and technical portfolio. |
| **`lib/`** | Atomic utility functions, Redis client orchestration, and i18n helpers. |

### Development Workflow

```bash
# Environment Setup
git clone https://github.com/wistantkode/www.wistant.me.git
pnpm install
cp .env.example .env.local

# Local Execution
pnpm dev # Spawns the development server with Turbopack
```

---

<div align="center">
  <img src="public/wistant-logo.png" alt="Wistant Logo" width="40" />
  <p><b>Wistant</b><br />Personal Hub • Portfolio • MDX Blog</p>
  <i>Designed and engineered with absolute precision.</i>
</div>
