import React from "react";

export interface Hackathon {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  mlh?: string;
  links: readonly {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  win?: string;
  icon?: string;
}

export const hackathonsData: readonly Hackathon[] = [
  {
    title: "IDEM AI Challenge",
    dates: "Febuary 01rst - 21th, 2026",
    location: "Douala, Cameroon",
    description:
      "I had developped FAiDD. The Framework for Ai-Driven Developpement Most AI orchestration tools (like legacy B-Mad) focus on the output—generating files, pushing commits, writing boilerplates. They treat the AI as a simple worker. **FAIDD treats the AI as a strategic entity** that requires a high-fidelity environment to function at peak performance.",
    image: "/hackatons/faidd.png",
    links: [
      {
        title: "Source",
        icon: null,
        href: "https://github.com/wistantkode/legal-transformer",
      },
    ],
    win: "1st Place - Best Innovation",
  },
  {
    title: "FinTech Hack North",
    dates: "November 5th - 7th, 2025",
    location: "Douala, Cameroon",
    description:
      "Created a decentralized payment gateway for cross-border transactions in Africa, reducing fees by over 80% using Layer-2 solutions.",
    image: "/portfolio/hackaton-fintech.png",
    links: [
      {
        title: "Project",
        icon: null,
        href: "https://github.com/wistantkode/africa-pay",
      },
    ],
    win: "Top 10 Finalist",
  },
];
