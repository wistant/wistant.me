import { PersonalData, Contact } from "@/types/resume";

export const personalData: { en: PersonalData; fr: PersonalData; contact: Contact } = {
  en: {
    name: "Wistant..</>",
    initials: "W",
    url: "https://wistant.me",
    location: "Douala, 🇨🇲",
    locationLink: "https://www.google.com/maps/place/Douala",
    description:
      "I'm Wistant, a Software Engineer specialized in forging high-end digital solutions. I build distributed architectures and blazingly fast interfaces across Web, Mobile, and Desktop.",
    about:
      "I'm Wistant, a Software Engineer specialized in forging high-end digital solutions. I build distributed architectures and blazingly fast interfaces across Web, Mobile, and Desktop. My passion lies in creating seamless user experiences that are as robust under the hood as they are beautiful on the surface.",
    avatarUrl: "/me/me.png",
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
    name: "Wistant..</>",
    initials: "W",
    url: "https://wistant.me",
    location: "Douala, 🇨🇲",
    locationLink: "https://www.google.com/maps/place/Douala",
    description:
      "Je suis Wistant, Ingénieur Logiciel expert en conception de solutions numériques haut de gamme. Je bâtis des architectures distribuées et des interfaces ultra-rapides sur Web, Mobile et Desktop.",
    about:
      "Je suis Wistant, Ingénieur Logiciel expert en conception de solutions numériques haut de gamme. Je bâtis des architectures distribuées et des interfaces ultra-rapides sur Web, Mobile et Desktop. Ma passion réside dans la création d'expériences utilisateur fluides, aussi robustes sous le capot que belles en surface.",
    avatarUrl: "/me/me.png",
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
    email: "wistantkode@protonmail.com",
    tel: "+237697135341",
    social: {
      GitHub: { name: "GitHub", url: "https://github.com/wistant", icon: "Github", navbar: true },
      LinkedIn: { name: "LinkedIn", url: "https://linkedin.com/in/wistantkode", icon: "Linkedin", navbar: true },
      WhatsApp: { name: "WhatsApp", url: "https://wa.me/+237697135341", icon: "Whatsapp", navbar: true },
      X: { name: "X", url: "https://x.com/iamwistant", icon: "X", navbar: true },
    },
  },
};
