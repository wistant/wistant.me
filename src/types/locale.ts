export const LOCALES = ["en", "fr", "es", "ar", "wo"] as const;
export type Language = (typeof LOCALES)[number];

export const LOCALE_MAP: Record<Language, string> = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  ar: "ar-SA",
  wo: "wo-SN",
};
