import { PersonalData, Contact } from "@/types/resume";
import { siteConfig } from "@/config/site";

export const personalData: { en: PersonalData; fr: PersonalData; contact: Contact } = {
  en: {
    name: siteConfig.name,
    initials: siteConfig.initials,
    url: siteConfig.url,
    location: siteConfig.location,
    locationLink: siteConfig.locationLink,
    description:
      "I'm Wistant Kode, a Architect & Software Engineer specialized in forging high-end digital solutions. I build distributed architectures and blazingly fast interfaces across Web, Mobile, and Desktop.",
    about:
      "I'm Wistant Kode, a Software Engineer specialized in forging high-end digital solutions. I build distributed architectures and blazingly fast interfaces across Web, Mobile, and Desktop. My passion lies in creating seamless user experiences that are as robust under the hood as they are beautiful on the surface.",
    avatarUrl: "/og.png",
    post: "Software Engineer • Distributed Systems • High-End Interfaces",
    navbar: [
      { href: "/", icon: "Home", label: "Home" },
      { href: "/about", icon: "User", label: "About" },
      { href: "/projects", icon: "Globe", label: "Projects" },
      { href: "/blog", icon: "Notebook", label: "Blog" },
      { href: "/contact", icon: "Mail", label: "Contact" },
    ],
  },
  fr: {
    name: siteConfig.name,
    initials: siteConfig.initials,
    url: siteConfig.url,
    location: siteConfig.location,
    locationLink: siteConfig.locationLink,
    description:
      "Je suis Wistant Kode, Ingénieur Logiciel expert en conception de solutions numériques haut de gamme. Je bâtis des architectures distribuées et des interfaces ultra-rapides sur Web, Mobile et Desktop.",
    about:
      "Je suis Wistant Kode, Ingénieur Logiciel expert en conception de solutions numériques haut de gamme. Je bâtis des architectures distribuées et des interfaces ultra-rapides sur Web, Mobile et Desktop. Ma passion réside dans la création d'expériences utilisateur fluides, aussi robustes sous le capot que belles en surface.",
    avatarUrl: "/og.png",
    post: "Ingénieur Logiciel • Systèmes Distribués • Interfaces Haut de Gamme",
    navbar: [
      { href: "/", icon: "Home", label: "Accueil" },
      { href: "/about", icon: "User", label: "À Propos" },
      { href: "/projects", icon: "Globe", label: "Projets" },
      { href: "/blog", icon: "Notebook", label: "Note" },
      { href: "/contact", icon: "Mail", label: "Contact" },
    ],
  },
  contact: {
    email: siteConfig.links.email,
    tel: siteConfig.links.tel,
    social: {
      GitHub: { name: "GitHub", url: siteConfig.links.github, icon: "Github", navbar: true },
      LinkedIn: { name: "LinkedIn", url: siteConfig.links.linkedin, icon: "Linkedin", navbar: true },
      WhatsApp: { name: "WhatsApp", url: siteConfig.links.whatsapp, icon: "Whatsapp", navbar: true },
      X: { name: "X", url: siteConfig.links.x, icon: "X", navbar: true },
    },
  },
};
