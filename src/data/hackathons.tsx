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
    title: "Global AI Challenge 2025",
    dates: "March 15th - 17th, 2025",
    location: "Remote",
    description: "Developed an autonomous agent that translates complex legal documents into simplified plain language using LLMs and custom fine-tuned models.",
    image: "/portfolio/hackaton-ai.png",
    links: [
      {
        title: "Source",
        icon: null,
        href: "https://github.com/wistantkode/legal-transformer",
      }
    ],
    win: "1st Place - Best Innovation",
  },
  {
    title: "CyberSecurity Hub 2024",
    dates: "September 20th - 22nd, 2024",
    location: "Douala, Cameroon",
    description: "Built a real-time network traffic analyzer that detects anomalous patterns and potential zero-day exploits using behavioral analysis.",
    image: "/portfolio/hackaton-cyber.png",
    links: [
      {
        title: "Github",
        icon: null,
        href: "https://github.com/wistantkode/net-guard",
      }
    ],
    win: "Honorable Mention",
  },
  {
    title: "FinTech Hack North",
    dates: "November 5th - 7th, 2023",
    location: "Lagos, Nigeria",
    description: "Created a decentralized payment gateway for cross-border transactions in Africa, reducing fees by over 80% using Layer-2 solutions.",
    image: "/portfolio/hackaton-fintech.png",
    links: [
      {
        title: "Project",
        icon: null,
        href: "https://github.com/wistantkode/africa-pay",
      }
    ],
    win: "Top 10 Finalist",
  },
];
