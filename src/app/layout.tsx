import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_METADATA } from "@/config/metadata";
import "./globals.css";

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
        className={`${interFont.variable} ${calFont.variable} ${clashFont.variable} ${cabinetFont.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
