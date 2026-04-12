import localFont from "next/font/local";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import Image from "next/image";
import React from "react";

import { DATA } from "@/data/resume";
import { FloatingDock } from "@/components/dock/floating-dock";
import { Analytics } from "@vercel/analytics/next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDictionary } from "@/lib/dictionary";

const calFont = localFont({
  src: "../../fonts/cal.woff2",
  variable: "--font-cal",
});

const clashFont = localFont({
  src: "../../fonts/ClashDisplay-Semibold.woff2",
  variable: "--font-clash",
});

const cabinetFont = localFont({
  src: "../../fonts/CabinetGrotesk-Medium.woff2",
  variable: "--font-cabinet",
});

const interFont = localFont({
  src: [
    {
      path: "../../fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return getPageMetadata(lang as Language);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} prefix="og: https://ogp.me/ns#" suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${calFont.variable} ${clashFont.variable} ${cabinetFont.variable} antialiased font-sans relative transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/*<TargetCursor targetSelector="a, button, .cursor-target" />*/}
          <div className="fixed inset-x-0 bottom-8 md:bottom-6 z-999 flex justify-center pointer-events-none px-4">
            <div className="pointer-events-auto w-fit max-w-full">
              <FloatingDock
                items={[
                  ...DATA.navbar.map((item) => {
                    // Match the data label (e.g. 'Home') to the dict property (e.g. dict.navigation.home)
                    const key = item.label.toLowerCase() as keyof typeof dict.navigation;
                    return {
                      title: dict.navigation[key] || item.label,
                      icon: <Image width={100} height={100} src={item.icon} alt={item.label} className="h-full w-full object-contain dark:invert" />,
                      href: item.href === "/" ? `/${lang}` : `/${lang}${item.href}`,
                    };
                  }),
                  {
                    title: "GitHub",
                    icon: <Image width={100} height={100} src="/icons/github.svg" alt="GitHub" className="h-full w-full object-contain dark:invert" />,
                    href: DATA.contact.social.GitHub.url,
                  },
                  {
                    title: "WhatsApp",
                    icon: <Image width={100} height={100} src="/icons/whatsapp.svg" alt="WhatsApp" className="h-full w-full object-contain" />,
                    href: DATA.contact.social.WhatsApp.url,
                  },
                ]}
                mobileItems={[
                  {
                    title: dict.navigation.home || "Home",
                    icon: (
                      <Avatar className="h-full w-full border border-border/50">
                        <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                        <AvatarFallback>{DATA.initials}</AvatarFallback>
                      </Avatar>
                    ),
                    href: `/${lang}`,
                  },
                  ...DATA.navbar
                    .filter((item) => ["/about", "/projects", "/blog"].includes(item.href))
                    .map((item) => {
                      const key = item.label.toLowerCase() as keyof typeof dict.navigation;
                      return {
                        title: dict.navigation[key] || item.label,
                        icon: <Image width={100} height={100} src={item.icon} alt={item.label} className="h-full w-full object-contain dark:invert" />,
                        href: `/${lang}${item.href}`,
                      };
                    }),
                  {
                    title: "GitHub",
                    icon: <Image width={100} height={100} src="/icons/github.svg" alt="GitHub" className="h-full w-full object-contain dark:invert" />,
                    href: DATA.contact.social.GitHub.url,
                  },
                ]}
              />
            </div>
          </div>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
