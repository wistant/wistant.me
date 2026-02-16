# Library & Utilities

Shared logic, helper functions, and global configurations.

## Directory Structure

| File/Directory | Description |
| :--- | :--- |
| `utils.ts` | Generic helpers (e.g., Tailwind `cn` merger, date formatting). |
| `constants.ts` | Global constants (Site name, social links). |
| `hooks/` | Custom React Hooks used globally (e.g., `useScrollPosition`). |
| `types/` | **Global Types.** TypeScript interfaces shared across the app. |

## Best Practices
- Keep functions pure and testable.
- Do not import React components here (keep it logic-only).