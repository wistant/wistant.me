import { Education } from "@/types/resume";

export const educationData: Record<string, Education[]> = {
  en: [
    {
      school: "IUT de Douala",
      href: "https://iut-douala.cm",
      degree: "DUT in Software Engineering and Computer Science (Year 2)",
      logoUrl: "/education/logo-iut.jpg",
      start: "2025",
      end: "2026",
    },
    {
      school: "IUT de Douala",
      href: "https://iut-douala.cm",
      degree: "Computer Engineering (Year 1)",
      logoUrl: "/education/logo-iut.jpg",
      start: "2024",
      end: "2025",
    },
    {
      school: "University of Yaoundé 1",
      href: "https://uy1.uninet.cm",
      degree: "Undergraduate Studies in Mathematics",
      logoUrl: "/education/univ-yaounde-1.jpeg",
      start: "2023",
      end: "2024",
    },
  ],
  fr: [
    {
      school: "IUT de Douala",
      href: "https://iut-douala.cm",
      degree: "DUT en Génie Logiciel et Science Informatique (2ème année)",
      logoUrl: "/education/logo-iut.jpg",
      start: "2025",
      end: "2026",
    },
    {
      school: "IUT de Douala",
      href: "https://iut-douala.cm",
      degree: "Génie Informatique (1ère année)",
      logoUrl: "/education/logo-iut.jpg",
      start: "2024",
      end: "2025",
    },
    {
      school: "Université de Yaoundé 1",
      href: "https://uy1.uninet.cm",
      degree: "Études Universitaires en Mathématiques",
      logoUrl: "/education/univ-yaounde-1.jpeg",
      start: "2023",
      end: "2024",
    },
  ],
};
