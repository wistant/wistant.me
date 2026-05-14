import localFont from "next/font/local";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import Image from "next/image";
import React from "react";

import { siteConfig } from "@/config/site";
import { FloatingDock } from "@/components/dock/floating-dock";
import { Analytics } from "@vercel/analytics/next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDictionary, getCurrentLanguage } from "@/lib/dictionary";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { LanguageSwitcher } from "@/components/dock/language-switcher";

const calFont = localFont({
  src: "../fonts/cal.woff2",
  variable: "--font-cal",
});

const clashFont = localFont({
  src: "../fonts/ClashDisplay-Semibold.woff2",
  variable: "--font-clash",
});

const cabinetFont = localFont({
  src: "../fonts/CabinetGrotesk-Medium.woff2",
  variable: "--font-cabinet",
});

const interFont = localFont({
  src: [
    {
      path: "../fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export async function generateMetadata() {
  const lang = await getCurrentLanguage();
  return getPageMetadata(lang);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();

  return (
    <html lang={lang} dir="ltr" prefix="og: https://ogp.me/ns#" suppressHydrationWarning className="dark">
      <body
        className={`${interFont.variable} ${calFont.variable} ${clashFont.variable} ${cabinetFont.variable} antialiased font-sans relative transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="absolute inset-x-0 top-0 h-[100px] overflow-hidden pointer-events-none z-0">
            <FlickeringGrid
              className="h-full w-full opacity-80"
              squareSize={2}
              gridGap={2}
              color="#D1D5DB"
              maxOpacity={1}
              flickerChance={0.1}
              style={{
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
              }}
            />
          </div>
          <div className="fixed inset-x-0 bottom-8 md:bottom-6 z-999 flex justify-center pointer-events-none px-4">
            <div className="pointer-events-auto w-fit max-w-full">
              <FloatingDock
                items={[
                  { title: dict.navigation.home || "Home", icon: <Image width={100} height={100} src="/icons/home.svg" alt="Home" className="h-full w-full object-contain dark:invert" />, href: `/` },
                  { title: dict.navigation.about || "About", icon: <Image width={100} height={100} src="/icons/user.svg" alt="About" className="h-full w-full object-contain dark:invert" />, href: `/about` },
                  { title: dict.navigation.projects || "Projects", icon: <Image width={100} height={100} src="/icons/globe.svg" alt="Projects" className="h-full w-full object-contain dark:invert" />, href: `/projects` },
                  { title: dict.navigation.blog || "Blog", icon: <Image width={100} height={100} src="/icons/notebook.svg" alt="Blog" className="h-full w-full object-contain dark:invert" />, href: `/blog` },
                  {
                    title: dict.navigation.certifications || "Certifications",
                    icon: <Image width={100} height={100} src="/icons/certifications.svg" alt="Certifications" className="h-full w-full object-contain dark:invert" />,
                    href: `/certifications`,
                  },
                  {
                    title: dict.navigation.contact || "Contact",
                    icon: <Image width={100} height={100} src="/icons/mail.svg" alt="Contact" className="h-full w-full object-contain dark:invert" />,
                    href: `/contact`,
                  },
                  {
                    title: "WhatsApp",
                    icon: <Image width={100} height={100} src="/icons/whatsapp.svg" alt="WhatsApp" className="h-full w-full object-contain" />,
                    href: siteConfig.links.whatsapp,
                  },
                ]}
                mobileItems={[
                  {
                    title: dict.navigation.home || "Home",
                    icon: (
                      <Avatar className="h-full w-full border border-border/50">
                        <AvatarImage src="/wistant-logo.png" alt={siteConfig.name} />
                        <AvatarFallback>{siteConfig.initials}</AvatarFallback>
                      </Avatar>
                    ),
                    href: `/`,
                  },
                  {
                    title: dict.navigation.about || "About",
                    icon: <Image width={100} height={100} src="/icons/user.svg" alt="About" className="h-full w-full object-contain dark:invert" />,
                    href: `/about`,
                  },
                  {
                    title: dict.navigation.projects || "Work",
                    icon: <Image width={100} height={100} src="/icons/globe.svg" alt="Projects" className="h-full w-full object-contain dark:invert" />,
                    href: `/projects`,
                  },
                  {
                    title: dict.navigation.blog || "Notes",
                    icon: <Image width={100} height={100} src="/icons/notebook.svg" alt="Blog" className="h-full w-full object-contain dark:invert" />,
                    href: `/blog`,
                  },
                  {
                    title: dict.navigation.certifications || "Certifications",
                    icon: <Image width={100} height={100} src="/icons/certifications.svg" alt="Certifications" className="h-full w-full object-contain dark:invert" />,
                    href: `/certifications`,
                  },
                  {
                    title: dict.navigation.contact || "Contact",
                    icon: <Image width={100} height={100} src="/icons/mail.svg" alt="Contact" className="h-full w-full object-contain dark:invert" />,
                    href: `/contact`,
                  },
                  {
                    title: "WhatsApp",
                    icon: <Image width={100} height={100} src="/icons/whatsapp.svg" alt="WhatsApp" className="h-full w-full object-contain" />,
                    href: siteConfig.links.whatsapp,
                  },
                ]}
              />
            </div>
          </div>
          
          <div className="web-layout max-w-[608px] mx-auto px-6 lg:px-0 pt-12 pb-24">
            {children}
          </div>
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}