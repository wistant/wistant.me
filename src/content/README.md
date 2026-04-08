# MDX Content DB (`content/`)

The strictly typed local database powered by `content-collections`. Schema logic resides at `/content-collections.ts`.

## Tables

| Collection | Output Scope |
|---|---|
| [`blog/`](./blog/) | High SEO articles |
| [`projects/`](./projects/) | Deep-dive case studies |

## Globalization
Format: `[slug].[lang].mdx` (e.g., `api-gateway.fr.mdx`)
**Fault Tolerance**: If a specific language node is missing, query handlers automatically resolve to the closest fallback language to prevent runtime 404 mutations.
