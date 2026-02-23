import { Icons } from "@/components/icons";
import React from "react";

export const projectsData = [
  {
    title: "Chat Collect",
    href: "https://chatcollect.com",
    dates: "Jan 2024 - Feb 2024",
    active: true,
    description:
      "A SaaS platform designed for GPT Store developers to capture user leads and build audiences through seamless email collection.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Stripe",
      "Shadcn UI",
      "Magic UI",
    ],
    links: [
      {
        type: "Website",
        href: "https://chatcollect.com",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/chat-collect.png",
    video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
  },
  {
    title: "Magic UI",
    href: "https://magicui.design",
    dates: "June 2023 - Present",
    active: true,
    description:
      "High-end library of animated UI components for frontend developers, focused on aesthetics and performance.",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "React",
    ],
    links: [
      {
        type: "Website",
        href: "https://magicui.design",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/magic-ui.png",
    video: "https://cdn.magicui.design/bento-grid.mp4",
  },
  {
    title: "LLM Report",
    href: "https://llm.report",
    dates: "April 2023 - September 2023",
    active: true,
    description:
      "Open-source observability and analytics platform for OpenAI applications, providing deep insights into API costs and performance.",
    technologies: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Cloudflare",
    ],
    links: [
      {
        type: "Website",
        href: "https://llm.report",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/llm-report.png",
    video: "https://cdn.llm.report/openai-demo.mp4",
  },
];
