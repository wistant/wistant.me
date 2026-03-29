export const LOCALES = ["en", "fr"] as const;
export type Language = (typeof LOCALES)[number];

export const LOCALE_MAP: Record<Language, string> = {
  en: "en-US",
  fr: "fr-FR",
};


