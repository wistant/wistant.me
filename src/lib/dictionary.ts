import { Language } from "@/types/locale";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  es: () => import("../dictionaries/es.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
  wo: () => import("../dictionaries/wo.json").then((module) => module.default),
};

const adminDictionaries = {
  en: () => import("../dictionaries/admin.en.json").then((module) => module.default),
  fr: () => import("../dictionaries/admin.fr.json").then((module) => module.default),
  es: () => import("../dictionaries/admin.es.json").then((module) => module.default),
  ar: () => import("../dictionaries/admin.ar.json").then((module) => module.default),
  wo: () => import("../dictionaries/admin.wo.json").then((module) => module.default),
};

export const getDictionary = async (lang: Language) => {
  return dictionaries[lang as keyof typeof dictionaries]?.() ?? dictionaries.en();
};

export const getAdminDictionary = async (lang: Language) => {
  return adminDictionaries[lang as keyof typeof adminDictionaries]?.() ?? adminDictionaries.en();
};
