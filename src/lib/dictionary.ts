import { Language } from "@/types/locale";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  es: () => import("../dictionaries/es.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
  wo: () => import("../dictionaries/wo.json").then((module) => module.default),
};


export type Dictionary = typeof import("../dictionaries/en.json");

export const getDictionary = async (lang: Language): Promise<Dictionary> => {
  return (dictionaries[lang as keyof typeof dictionaries]?.() ?? dictionaries.en()) as Promise<Dictionary>;
};

