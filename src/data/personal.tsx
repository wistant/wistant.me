import { Icons } from "@/components/ui/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const personalData = {
  name: "Wistant Kode",
  initials: "WK",
  url: "https://wistant.dev",
  location: "Douala, 🇨🇲",
  locationLink: "https://www.google.com/maps/place/Douala",
  description:
    "Full-Stack Software & Product Engineer. I design digital solutions that bridge the gap between robust engineering and user-centric products.",
  about:
    "I'm an architect who codes. I don't just build software; I solve problems with precise, scalable systems. With 5+ years of experience, I focus on creating high-impact digital solutions that understand the business as much as the tech.",
  avatarUrl: "/me/me.webp",
  post: "Full-Stack IT Architect & Product Engineer",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/about", icon: Icons.user, label: "About" },
    { href: "/projects", icon: Icons.globe, label: "Projects" },
    // { href: "/hackathons", icon: Icons.trophy, label: "Hackathons" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "wistantkode@protonmail.com",
    tel: "+237697135341",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/wistantkode",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/wistantkode",
        icon: Icons.linkedin,
        navbar: true,
      },
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/+237697135341",
        icon: Icons.whatsapp,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/wistantkode",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:wistantkode@protonmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
};
