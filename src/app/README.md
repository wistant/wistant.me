# App Router Structure

The application is split into two distinct Route Groups to separate concerns and layouts.

## Route Groups

| Group | Path | Description |
| :--- | :--- | :--- |
| `(web)` | `/` | **The Public Website.** Contains the Portfolio, Blog, and Home. Uses the public layout (Navbar, Footer). |
| `(admin)` | `/keystatic` | **The Admin Dashboard.** Isolated environment for content management. Uses a dedicated full-screen layout. |

## Why this structure?

1. **Layout Isolation:** The Admin dashboard should not have the website's navigation bar or footer.
2. **Asset Separation:** Keeps public-facing assets and logic distinct from administrative tools.
3. **Scalability:** Allows adding other isolated sections (e.g., `(auth)`) in the future without breaking the main site structure.