import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const personalData = {
  name: "Wistant Kode",
  initials: "WK",
  url: "https://wistant.dev",
  location: "Douala, 🇨🇲",
  locationLink: "https://www.google.com/maps/place/Douala",
  description:
    "Software Engineer focusing on high-performance web systems. Expert in Next.js, React, and modern full-stack architectures.",
  about:
    "Software Engineering student dedicated to building clean, scalable, and maintainable applications. I bridge the gap between complex business logic and premium user experiences using the latest web technologies. Autonomous, curious, and driven by engineering excellence.",
  avatarUrl: "/me/me.png",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: Icons.globe, label: "Projects" },
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
        navbar: false,
      },
    },
  },
};
