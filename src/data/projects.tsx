import { Icons } from "@/components/ui/icons";
import React from "react";

export const projectsData = [
  {
    slug: "suburbia",
    title: {
      en: "🛹 Interactive 3D skateboard configurator and ecommerce app",
      fr: "NESTJS AUTH JWT - Microservice d'Authentification Sécurisé",
    },
    href: "https://github.com/WistantKode/suburbia",
    dates: "03/2026",
    active: true,
    description: {
      en: "Engineered a secure and efficient authentication microservice using NestJS, implementing JWT (JSON Web Tokens) for robust user authorization. Designed for seamless integration into larger application architectures.",
      fr: "Conception d'un microservice d'authentification sécurisé et efficace avec NestJS, implémentant JWT (JSON Web Tokens) pour une autorisation utilisateur robuste. Conçu pour une intégration transparente dans des architectures d'applications plus vastes.",
    },
    technologies: [
      ,
      "TypeScript",
      "webgl ecommerce landing-page gsap type next rea 3d 3d-models three matter-js skateboard prismic tailwindcss landin turbopack ",
      "react-th",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/WistantKode/suburbia",
        icon: React.createElement(Icons.github, { className: "size-3" }),
      },
    ],
    image: "/portfolio/suburbia.png",
    video: "",
    seo: {
      title: {
        en: "",
        fr: "",
      },
      description: {
        en: "",
        fr: "",
      },
    },
  },
  {
    slug: "nestjs-auth-jwt",
    title: {
      en: "NESTJS AUTH JWT - Secure Authentication Microservice",
      fr: "NESTJS AUTH JWT - Microservice d'Authentification Sécurisé",
    },
    href: "https://github.com/WistantKode/nestjs-nextjs-authentication-side",
    dates: "2024",
    active: true,
    description: {
      en: "Engineered a secure and efficient authentication microservice using NestJS, implementing JWT (JSON Web Tokens) for robust user authorization. Designed for seamless integration into larger application architectures.",
      fr: "Conception d'un microservice d'authentification sécurisé et efficace avec NestJS, implémentant JWT (JSON Web Tokens) pour une autorisation utilisateur robuste. Conçu pour une intégration transparente dans des architectures d'applications plus vastes.",
    },
    technologies: ["NestJS", "TypeScript", "JWT", "Bcrypt", "Swagger"],
    links: [
      {
        type: "Source",
        href: "https://github.com/WistantKode/nestjs-nextjs-authentication-side",
        icon: React.createElement(Icons.github, { className: "size-3" }),
      },
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    video: "",
    seo: {
      title: {
        en: "Secure NestJS Authentication Microservice with JWT",
        fr: "Microservice d'Authentification NestJS Sécurisé avec JWT",
      },
      description: {
        en: "Discover a robust and secure authentication microservice built with NestJS and JWT. Ideal for modern application architectures.",
        fr: "Découvrez un microservice d'authentification robuste et sécurisé construit avec NestJS et JWT. Idéal pour les architectures d'applications modernes.",
      },
    },
  },
  {
    slug: "plantex-showcase",
    title: {
      en: "Plantex - Modern Plant Showcase Website",
      fr: "Plantex - Site Vitrine Moderne pour Plantes",
    },
    href: "https://plantex-wistant.vercel.app/",
    dates: "2024",
    active: true,
    description: {
      en: "Developed a visually appealing showcase website for plants, designed to be fully responsive and easily customizable. Includes sections for products, FAQs, contact information, and social links.",
      fr: "Développement d'un site vitrine visuellement attrayant pour les plantes, conçu pour être entièrement responsive et facilement personnalisable. Comprend des sections pour les produits, les FAQ, les informations de contact et les liens sociaux.",
    },
    technologies: ["HTML5", "JavaScript", "Tailwind CSS", "CSS3"],
    links: [
      {
        type: "Website",
        href: "https://plantex-wistant.vercel.app/",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
      {
        type: "Source",
        href: "https://github.com/WistantKode/responsivewebsite-plantex",
        icon: React.createElement(Icons.github, { className: "size-3" }),
      },
    ],
    image: "/portfolio/plantex.png",
    video: "/portfolio/plantex.webm",
    seo: {
      title: {
        en: "Plantex - Responsive Plant Showcase Website",
        fr: "Plantex - Site Vitrine Responsive pour Plantes",
      },
      description: {
        en: "Explore Plantex, a modern and responsive website showcasing a variety of plants. Built with HTML, Tailwind CSS, and JavaScript.",
        fr: "Explorez Plantex, un site web moderne et responsive présentant une variété de plantes. Construit avec HTML, Tailwind CSS et JavaScript.",
      },
    },
  },
  // ... other projects with the same structure
];
