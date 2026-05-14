import { cookies, headers } from "next/headers";
import { en } from "../dictionaries/en";
import { fr } from "../dictionaries/fr";
import { Language } from "@/types/locale";

export type Dictionary = typeof en;

export const getCurrentLanguage = async (): Promise<Language> => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  if (localeCookie === "fr" || localeCookie === "en") {
    return localeCookie as Language;
  }
  
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language");
  if (acceptLang && acceptLang.toLowerCase().startsWith("fr")) {
    return "fr";
  }
  return "en";
};

export const getDictionary = async (forceLang?: Language): Promise<Dictionary> => {
  // Option explicitly passed or automatic detection
  const lang = forceLang || await getCurrentLanguage();
  return lang === "fr" ? fr : en;
};
