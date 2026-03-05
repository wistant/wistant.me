// import type { Metadata } from "next";
import localFont from "next/font/local";
import { getPageMetadata } from "@/config/metadata";
import "./globals.css";
import { TargetCursor } from "@/components/ui/magicui/target-cursor";
import { ThemeProvider } from "./ThemeProvider";

import { DATA } from "@/data/resume";
import { FloatingDock } from "@/components/dock/floating-dock";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";

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

type Language = "en" | "fr";

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

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${calFont.variable} ${clashFont.variable} ${cabinetFont.variable} antialiased font-sans relative transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TargetCursor targetSelector="a, button, .cursor-target" />
          <div className="fixed inset-x-0 bottom-8 md:bottom-6 z-999 flex justify-center pointer-events-none px-4">
            <div className="pointer-events-auto w-fit max-w-full">
              <FloatingDock
                items={[
                  ...DATA.navbar.map((item) => ({
                    title: item.label,
                    icon: <item.icon className="h-full w-full" />,
                    href: item.href === "/" ? `/${lang}` : `/${lang}${item.href}`,
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
                    title: "X (Twitter)",
                    icon: <Twitter className="h-full w-full" />,
                    href: DATA.contact.social.X.url,
                  },
                  {
                    title: "WhatsApp",
                    icon: <Icons.whatsapp className="h-full w-full" />,
                    href: DATA.contact.social.WhatsApp.url,
                  },
                  {
                    title: "Email",
                    icon: <Icons.email className="h-full w-full" />,
                    href: DATA.contact.social.email.url,
                  },
                ]}
                mobileItems={[
                  {
                    title: "Home",
                    icon: (
                      <Avatar className="h-full w-full border border-border/50">
                        <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                        <AvatarFallback>{DATA.initials}</AvatarFallback>
                      </Avatar>
                    ),
                    href: `/${lang}`,
                  },
                  ...DATA.navbar
                    .filter((item) => ["/about", "/projects", "/blog", "/contact"].includes(item.href))
                    .map((item) => ({
                      title: item.label,
                      icon: <item.icon className="h-full w-full" />,
                      href: `/${lang}${item.href}`,
                    })),
                  {
                    title: "GitHub",
                    icon: <Github className="h-full w-full" />,
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
