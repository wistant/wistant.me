"use client";

import React from "react";
import { List } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TableOfContents } from "./table-of-contents";
import { PromoContent } from "./promo-content";

export function MobileTableOfContents() {
  return (
    <Drawer>
      <DrawerTrigger className="lg:hidden fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
        <List size={20} />
      </DrawerTrigger>

      <DrawerContent className="lg:hidden">
        <DrawerHeader>
          <DrawerTitle className="text-left">Table of Contents</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 py-2 overflow-y-auto max-h-[50vh]">
          <TableOfContents />
        </div>

        <DrawerFooter className="p-0 border-t mt-4">
          <PromoContent variant="mobile" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
