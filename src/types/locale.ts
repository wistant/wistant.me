export const LOCALES = ["en", "fr"] as const;
export type Language = (typeof LOCALES)[number];

export const LOCALE_MAP: Record<Language, string> = {
  en: "en-US",
  fr: "fr-FR",
};

export interface AdminDictionary {
  sidebar: {
    dashboard: string;
    projects: string;
    blog: string;
    resume: string;
    gallery: string;
    settings: string;
    analytics: string;
    logout: string;
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
    placeholder: string;
    empty: string;
    slashMenu: {
      text: string;
      heading: string;
      list: string;
    };
  };
  settings: {
    title: string;
    profile: string;
    appearance: string;
    notifications: string;
    security: string;
  };
  analytics: {
    title: string;
    visitors: string;
    engagement: string;
    sources: string;
  };
}
