export const LOCALES = ["en", "fr", "es", "ar", "wo"] as const;
export type Language = (typeof LOCALES)[number];

export const LOCALE_MAP: Record<Language, string> = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  ar: "ar-SA",
  wo: "wo-SN",
};

export interface AdminDictionary {
  sidebar: {
    dashboard: string;
    projects: string;
    blog: string;
    resume: string;
    settings: string;
    logout: string;
    gallery: string;
  };
  stats: {
    totalViews: string;
    totalProjects: string;
    totalPosts: string;
    activeUsers: string;
    vsLastMonth: string;
  };
  table: {
    title: string;
    type: string;
    status: string;
    views: string;
    actions: string;
    published: string;
    draft: string;
    search: string;
    language: string;
    lastEdited: string;
    empty: string;
    pagination: string;
  };
  actions: {
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    create: string;
    publish: string;
  };
  editor: {
    title: string;
    saved: string;
    saving: string;
    unsaved: string;
  };
}
