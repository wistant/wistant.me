import { type NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
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
        destination: "https://x.com/wistantkode",
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
};

export default withContentCollections(nextConfig);
