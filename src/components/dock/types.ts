import React from "react";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

export interface FloatingDockProps {
  items: DockItem[];
  mobileItems?: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}
