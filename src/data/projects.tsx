import { Icons } from "@/components/ui/icons";
import React from "react";

export const projectsData = [
  {
    slug: "chickfood",
    title: {
      en: "Chickfood - Modern Fast Food Experience",
      fr: "Chickfood - Expérience Fast Food Moderne",
    },
    href: "/en/projects/chickfood",
    dates: "2024",
    order: 1,
    active: true,
    description: {
      en: "A vibrant, appetizing frontend for a fast food restaurant. Features engaging animations, smooth transitions, and a modern UI that drives user appetite and engagement.",
      fr: "Un frontend vibrant et appétissant pour un fast-food. Intègre des animations fluides, des transitions soignées et une interface moderne qui stimule l'engagement utilisateur.",
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    links: [
      {
        type: "Website",
        href: "https://chickfood.vercel.app",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/chickfood.webp",
    video: "",
    seo: {
      title: {
        en: "Chickfood - Interactive Restaurant UI",
        fr: "Chickfood - UI Restaurant Interactive",
      },
      description: {
        en: "Explore Chickfood, a modern restaurant frontend built with Next.js and animated with Framer Motion.",
        fr: "Explorez Chickfood, un frontend de restaurant moderne construit avec Next.js et animé avec Framer Motion.",
      },
    },
  },
  {
    slug: "nova",
    title: {
      en: "Nova - Premium Agency Portfolio",
      fr: "Nova - Portfolio d'Agence Premium",
    },
    href: "/en/projects/nova",
    dates: "2024",
    order: 2,
    active: true,
    description: {
      en: "A cutting-edge agency portfolio template crafted with precision. Nova delivers a striking brutalist-inspired aesthetic combined with ultra-smooth scroll animations.",
      fr: "Un modèle de portfolio d'agence avant-gardiste. Nova offre une esthétique brutaliste audacieuse combinée à des animations de défilement ultra-fluides.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    links: [
      {
        type: "Website",
        href: "https://nova-wistant.vercel.app",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
      {
        type: "Source",
        href: "https://github.com/WistantKode",
        icon: React.createElement(Icons.github, { className: "size-3" }),
      },
    ],
    image: "/portfolio/nova.webp",
    video: "",
    seo: {
      title: {
        en: "Nova Agency Portfolio",
        fr: "Nova Agence Portfolio",
      },
      description: {
        en: "Nova: A premium agency portfolio showcasing advanced Next.js capabilities and smooth animations.",
        fr: "Nova : Un portfolio premium mettant en valeur des capacités Next.js avancées et des animations fluides.",
      },
    },
  },
  {
    slug: "splyt",
    title: {
      en: "Splyt - Financial Dashboard",
      fr: "Splyt - Tableau de Bord Financier",
    },
    href: "/en/projects/splyt",
    dates: "2024",
    order: 3,
    active: true,
    description: {
      en: "Splyt is a high-performance financial dashboard designed to handle complex data visualizations. It offers real-time analytics in a sleek, dark-mode-first interface.",
      fr: "Splyt est un tableau de bord financier performant conçu pour la visualisation de données complexes. Il offre des analyses en temps réel dans une interface élégante (dark-mode priority).",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Recharts"],
    links: [
      {
        type: "Website",
        href: "https://splyt-demo.vercel.app", // Fallback URL
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/splyt.webp",
    video: "",
    seo: {
      title: {
        en: "Splyt Financial Dashboard",
        fr: "Tableau de Bord Financier Splyt",
      },
      description: {
        en: "A robust financial dashboard built with Next.js and Recharts.",
        fr: "Un tableau de bord financier robuste construit avec Next.js et Recharts.",
      },
    },
  },
  {
    slug: "shopdo",
    title: {
      en: "Shopdo - Modern E-Commerce Platform",
      fr: "Shopdo - Plateforme E-Commerce Moderne",
    },
    href: "/en/projects/shopdo",
    dates: "2024",
    order: 4,
    active: true,
    description: {
      en: "A complete e-commerce solution with dynamic product routing, a scalable cart system, and an integrated blog for content marketing.",
      fr: "Une solution e-commerce complète avec routage produit dynamique, système de panier scalable, et blog intégré pour le marketing.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [
      {
        type: "Website",
        href: "https://shopdo-store.vercel.app",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/shopdo-store.vercel.app.webp",
    video: "",
    seo: {
      title: {
        en: "Shopdo E-Commerce Platform",
        fr: "Plateforme E-Commerce Shopdo",
      },
      description: {
        en: "Modern and scalable Next.js e-commerce storefront with a seamless user experience.",
        fr: "Boutique e-commerce Next.js moderne et scalable offrant une expérience utilisateur fluide.",
      },
    },
  },
  {
    slug: "elysian-drive",
    title: {
      en: "Elysian Drive - Luxury Car Rental",
      fr: "Elysian Drive - Location de Voitures de Luxe",
    },
    href: "/en/projects/elysian-drive",
    dates: "2023",
    order: 5,
    active: true,
    description: {
      en: "A premium luxury car rental platform. Implements sophisticated aesthetic choices to resonate with high-end clientele seeking exclusivity.",
      fr: "Une plateforme de location de voitures de luxe. Implémente des choix esthétiques sophistiqués pour résonner avec une clientèle haut de gamme cherchant l'exclusivité.",
    },
    technologies: ["React", "HTML5", "CSS3", "JavaScript"],
    links: [
      {
        type: "Website",
        href: "https://elsyandrive-wistant.netlify.app",
        icon: React.createElement(Icons.globe, { className: "size-3" }),
      },
    ],
    image: "/portfolio/elsyandrive-wistant.netlify.app.webp",
    video: "",
    seo: {
      title: {
        en: "Elysian Drive Luxury Rentals",
        fr: "Location de Luxe Elysian Drive",
      },
      description: {
        en: "Premium luxury car rental platform front-end application.",
        fr: "Application front-end de plateforme de location de véhicules de luxe premium.",
      },
    },
  },
  {
    slug: "suburbia",
    title: {
      en: "Suburbia - 3D Skateboard Configurator",
      fr: "Suburbia - Configurateur 3D de Skateboard",
    },
    href: "/en/projects/suburbia",
    dates: "2024",
    order: 6,
    active: true,
    description: {
      en: "Interactive WebGL-powered 3D skateboard configurator and e-commerce application. A truly immersive and gamified shopping experience in the browser.",
      fr: "Configurateur 3D interactif de skateboard et application e-commerce propulsés par WebGL. Une expérience d'achat véritablement immersive et ludique dans le navigateur.",
    },
    technologies: ["Next.js", "React", "WebGL", "Three.js", "Tailwind CSS"],
    links: [
      {
        type: "Source",
        href: "https://github.com/WistantKode/suburbia",
        icon: React.createElement(Icons.github, { className: "size-3" }),
      },
    ],
    image: "/portfolio/suburbia.webp",
    video: "",
    seo: {
      title: {
        en: "Suburbia 3D Interactive E-Commerce",
        fr: "E-Commerce 3D Interactif Suburbia",
      },
      description: {
        en: "Interactive 3D skateboard configurator built with Three.js and Next.js.",
        fr: "Configurateur 3D interactif de skatboard construit avec Three.js et Next.js.",
      },
    },
  },
  {
    slug: "plantex-showcase",
    title: {
      en: "Plantex - Modern Plant Showcase Website",
      fr: "Plantex - Site Vitrine Moderne pour Plantes",
    },
    href: "/en/projects/plantex-showcase",
    dates: "2024",
    order: 7,
    active: true,
    description: {
      en: "Developed a visually appealing showcase website for plants, designed to be fully responsive and easily customizable. Includes sections for products, FAQs, contact information, and social links.",
      fr: "Développement d'un site vitrine visuellement attrayant pour les plantes, conçu pour être entièrement responsive et facilement personnalisable. Comprend des sections pour les produits, les FAQ, les informations de contact et les liens sociaux.",
    },
    technologies: ["HTML5", "JavaScript", "Tailwind CSS"],
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
    image: "/portfolio/plantex-wistant.vercel.app.webp",
    video: "",
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
  }
];
