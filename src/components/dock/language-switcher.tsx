'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Language } from '@/types/locale';

/**
 * Premium Dropdown Language Switcher
 * Uses Radix UI DropdownMenu for a professional selection experience.
 */
export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = React.useState<Language>('en');

  React.useEffect(() => {
    const locale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    
    if (locale === 'fr' || locale === 'en') {
      setCurrentLang(locale as Language);
    }
  }, []);

  const handleLanguageChange = (locale: string) => {
    // Set cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Full reload to guarantee server-side detection
    window.location.reload();
  };

  const flags = {
    en: "🇬🇧",
    fr: "🇫🇷"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all active:scale-95 group border-none bg-transparent outline-hidden"
          title={currentLang === 'en' ? 'Change Language' : 'Changer de langue'}
        >
          <div className="flex items-center justify-center pointer-events-none">
            <span className="text-xl group-hover:scale-110 transition-transform">
              {flags[currentLang]}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        side="top" 
        className="min-w-[150px] bg-card/95 backdrop-blur-xl border-border/50 rounded-2xl p-1.5 shadow-2xl z-[1000]"
        sideOffset={14}
      >
        <DropdownMenuRadioGroup value={currentLang} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem 
            value="en" 
            className="rounded-xl cursor-pointer focus:bg-accent/80 flex items-center gap-3 py-2.5 px-3"
          >
            <span className="text-xl">🇬🇧</span>
            <span className="text-sm font-bold tracking-tight">English</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="fr" 
            className="rounded-xl cursor-pointer focus:bg-accent/80 flex items-center gap-3 py-2.5 px-3"
          >
            <span className="text-xl">🇫🇷</span>
            <span className="text-sm font-bold tracking-tight">Français</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
