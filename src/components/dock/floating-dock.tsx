"use client";

import React from "react";
import { FloatingDockProps } from "./types";
import { FloatingDockDesktop } from "./desktop-dock";
import { FloatingDockMobile } from "./mobile-dock";

/**
 * FloatingDock component that switches between desktop and mobile versions.
 * 
 * @param items - Items to display on desktop and as fallback for mobile
 * @param mobileItems - Optional items to display specifically on mobile
 * @param desktopClassName - Custom classes for the desktop dock
 * @param mobileClassName - Custom classes for the mobile dock
 */
export const FloatingDock = ({
  items,
  mobileItems,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile
        items={mobileItems ?? items}
        className={mobileClassName}
      />
    </>
  );
};
