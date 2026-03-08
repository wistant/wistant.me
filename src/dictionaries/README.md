# src/dictionaries/

i18n translation files for all 5 supported locales.

---

## Files

| File | Locale | Language | Direction |
|---|---|---|---|
| `en.json` | `en` | English | LTR |
| `fr.json` | `fr` | French | LTR |
| `es.json` | `es` | Spanish | LTR |
| `ar.json` | `ar` | Arabic | RTL |
| `wo.json` | `wo` | Wolof (Senegalese) | LTR |

---

## Loading

```ts
import { getDictionary } from "@/lib/dictionary";

const dict = await getDictionary("fr");
// dict.navigation.home → "Accueil"
// dict.contact.title → "Contactez-moi"
```

All page components receive `dict` as a prop. Never call `getDictionary()` in a Client Component.

---

## Namespace Structure

```json
{
  "navigation": { "home", "about", "projects", "blog", "contact" },
  "hero": { "greeting", "title", "subtitle", "cta" },
  "about": { "title", "description" },
  "work": { "title", "present" },
  "education": { "title" },
  "hackathons": { "title", "description", "subtitle" },
  "skills": { "title" },
  "projects": { "title", "subtitle", "viewAll", "viewProject" },
  "blog": { "title", "subtitle", "readMore", "backToHome", "allFilter", ... },
  "contact": { "title", "subtitle", "description", "button" },
  "ui": { "seeMore", "showLess", "loadingArticles", "noArticlesFound", "dateLocale", "backToHome" }
}
```

---

## Adding a New Locale

1. Create `src/dictionaries/[lang].json` with all the namespaces above.
2. Add `[lang]` to the `locales` array in `src/proxy.ts`.
3. Add `[lang]` to the `Language` type alias (used in page params and `getDictionary`).
4. Add a flag emoji mapping for the language switcher in `src/components/dock/language-switcher.tsx`.
5. Add MDX content files for projects/blog in `src/content/**/*.[lang].mdx`.

---

## RTL Support

Arabic (`ar`) is the only RTL locale. The `<html>` element receives `dir="rtl"` automatically via `src/app/[lang]/layout.tsx`:

```tsx
<html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
```
