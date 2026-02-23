import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_METADATA } from "@/config/metadata";
import "./globals.css";
import { TargetCursor } from "@/components/magicui/target-cursor";

import { DATA } from "@/data/resume";
import { FloatingDock } from "@/components/mvpblocks/floating-dock";
import { Github, Linkedin, Twitter } from "lucide-react";

const calFont = localFont({
  src: "../../public/fonts/cal.ttf",
  variable: "--font-cal",
});

const clashFont = localFont({
  src: "../../public/fonts/ClashDisplay-Semibold.ttf",
  variable: "--font-clash",
});

const cabinetFont = localFont({
  src: "../../public/fonts/CabinetGrotesk-Medium.ttf",
  variable: "--font-cabinet",
});

const interFont = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${calFont.variable} ${clashFont.variable} ${cabinetFont.variable} antialiased font-sans relative`}
      >
        <TargetCursor targetSelector="a, button, .cursor-target" />
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <FloatingDock
            items={[
              ...DATA.navbar.map((item) => ({
                title: item.label,
                icon: <item.icon className="h-full w-full" />,
                href: item.href,
              })),
              {
                title: "GitHub",
                icon: <Github className="h-full w-full" />,
                href: DATA.contact.social.GitHub.url,
              },
              {
                title: "LinkedIn",
                icon: <Linkedin className="h-full w-full" />,
                href: DATA.contact.social.LinkedIn.url,
              },
              {
                title: "Twitter",
                icon: <Twitter className="h-full w-full" />,
                href: DATA.contact.social.X.url,
              },
            ]}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
