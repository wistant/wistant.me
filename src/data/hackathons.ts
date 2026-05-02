import { Hackathon } from "@/types/resume";

export const hackathonsData: Hackathon[] = [
  {
    title: "Hackathon Douala 2026",
    dates: "March 2026",
    location: "Douala, Cameroon",
    description:
      "Developed a real-time logistics tracking system for local vendors. Integrated with SMS APIs for instant notifications in low-bandwidth areas.",
    image: "/hackathons/logistics.png",
    links: [
      {
        title: "Source",
        icon: "Github",
        href: "https://github.com/wistant/hack-logistics",
      },
    ],
  },
];
