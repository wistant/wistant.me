export const getDictionary = async (lang: string) => {
  if (lang === "fr") {
    return import("../dictionaries/fr.json").then((m) => m.default);
  }
  return import("../dictionaries/en.json").then((m) => m.default);
};
