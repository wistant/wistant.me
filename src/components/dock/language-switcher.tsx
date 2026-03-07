"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPathname = segments.join("/");
    router.push(newPathname);
  };

  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full hover:bg-muted/50 transition-all duration-300 group relative border-none"
        >
          <Languages className="size-5 transition-all group-hover:scale-110 group-hover:rotate-12 text-foreground/70" />
          <span className="absolute -bottom-1 -right-1 text-[9px] font-black uppercase text-foreground/40 bg-background/80 px-1 rounded-sm border border-border/50">
            {currentLocale}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="top"
        className="min-w-40 bg-background/90 backdrop-blur-2xl border-border/40 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-2xl p-1.5"
        sideOffset={12}
      >
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={handleLanguageChange}
        >
          {/*English */}
          <DropdownMenuRadioItem
            value="en"
            className="rounded-xl transition-all cursor-pointer focus:bg-accent/80 py-2.5 px-3 data-[state=checked]:bg-accent/40"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">🇬🇧</span>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight">
                  English
                </span>
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  Global Version
                </span>
              </div>
            </div>
          </DropdownMenuRadioItem>

          {/*French*/}
          <DropdownMenuRadioItem
            value="fr"
            className="rounded-xl transition-all cursor-pointer focus:bg-accent/80 py-2.5 px-3 data-[state=checked]:bg-accent/40"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">🇫🇷</span>
              <div className="flex flex-col gap-0">
                <span className="font-bold text-sm tracking-tight">
                  Français
                </span>
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  Version locale
                </span>
              </div>
            </div>
          </DropdownMenuRadioItem>

          {/*Spanish*/}
          <DropdownMenuRadioItem
            value="es"
            className="rounded-xl transition-all cursor-pointer focus:bg-accent/80 py-2.5 px-3 data-[state=checked]:bg-accent/40"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">🇪🇸</span>
              <div className="flex flex-col gap-0">
                <span className="font-bold text-sm tracking-tight">
                  Español
                </span>
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  Versión Global
                </span>
              </div>
            </div>
          </DropdownMenuRadioItem>

          {/*Arabic*/}
          <DropdownMenuRadioItem
            value="ar"
            className="rounded-xl transition-all cursor-pointer focus:bg-accent/80 py-2.5 px-3 data-[state=checked]:bg-accent/40"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">🇸🇦</span>
              <div className="flex flex-col gap-0">
                <span className="font-bold text-sm tracking-tight text-right w-full">
                  العربية
                </span>
                <span className="text-[10px] text-muted-foreground/70 font-medium text-right w-full">
                  النسخة العالمية
                </span>
              </div>
            </div>
          </DropdownMenuRadioItem>

          {/*Wolof*/}
          <DropdownMenuRadioItem
            value="wo"
            className="rounded-xl transition-all cursor-pointer focus:bg-accent/80 py-2.5 px-3 data-[state=checked]:bg-accent/40"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">🇸🇳</span>
              <div className="flex flex-col gap-0">
                <span className="font-bold text-sm tracking-tight">
                  Wolof
                </span>
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  Senegal
                </span>
              </div>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
