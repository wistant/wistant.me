# App Router (`app/`)

This architecture splits the application into strictly isolated **Route Groups** to prevent layout bleeding.

## Route Groups

| Designation | Route | Purpose |
| :--- | :--- | :--- |
| `(web)` | `/` | **Public Application.** Contains Portfolio, Blog, Home, and SEO metadata. Uses the main `layout.tsx` (Navbar/Footer). |
| `(admin)` | `/keystatic` | **Administrative Hub.** Fully isolated environment for secure content management without global UI elements. |

## Why Group Routes?
1. **Total Layout Isolation**: Prevents the admin dashboard from rendering public footers or navigation.
2. **Security & Assets**: Separates heavy public JS bundles from administrative API routes.