# Data Dictionary (`data/`)

Centralized configuration and static content registry for the entire application.

| File              | Structure  | Role                                                             |
|-------------------|------------|------------------------------------------------------------------|
| `resume.ts`       | `DATA`     | Root object aggregating all static details (Personal, Work, Edu) |
| `personal.ts`     | Identity   | Contact info, social links, and core brand assets                |
| `work.ts`         | Experience | Professional timeline with roles and accomplishments             |
| `education.ts`    | Academic   | Scholarly path and certification details                         |
| `projects.ts`     | Showcase   | Curated list of high-value development projects                  |
| `skills.ts`       | Technical  | Grouped expertise (Languages, Tools, DevOps)                     |
| `hackathons.ts`   | Events     | Record of collaborative coding competitions                      |
| `gallery-data.ts` | Visuals    | Configuration for the homepage image gallery                     |
| `blog.ts`         | Content    | High-level metadata and static configuration for the blog        |

> This directory acts as the **Headless Content Layer**. For dynamic `.mdx` content, see `src/content/`.
