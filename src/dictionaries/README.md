# i18n Dictionaries (`dictionaries/`)

The core repository for all UI translations strictly decoupled from the component logic.

## Locales

| Code | Language | Layout Direction |
|---|---|---|
| `en` | English | `LTR` |
| `fr` | French | `LTR` |
| `es` | Spanish | `LTR` |
| `wo` | Wolof | `LTR` |
| `ar` | Arabic | `RTL` (Right-to-Left implicitly mapped) |

*Dictionaries must be accessed globally via the async `getDictionary(lang)` loader exported by `src/lib/dictionary.ts` inside Server Components. Avoid resolving UI strings inside Client Components.*
