import React from "react";

export interface Hackathon {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  mlh?: string;
  links: readonly {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  win?: string;
  icon?: string;
}

export const hackathonsData: readonly Hackathon[] = [
  // Keeping historical structure for potential future entries
];
