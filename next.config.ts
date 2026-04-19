import { type NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.pexels.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/wistantkode",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/wistantkode",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/wistantkode",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/wistan",
        permanent: true,
      },
      {
        source: "/whatsapp",
        destination: "https://wa.me/+237697135341",
        permanent: true,
      },
      {
        source: "/email",
        destination: "mailto:wistantkode@protonmail.com",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Defends against MIME sniffing
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX();

export default withContentCollections(withMDX(nextConfig));
