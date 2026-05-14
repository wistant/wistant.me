'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/locale';

/**
 * Enhanced Stateless Language Switcher
 * Uses cookies and window reload to sync with the server-side dictionary.
 * Supports legacy imports and manual placement.
 */
export function LanguageSwitcher({ currentLang: propLang }: { currentLang?: Language }) {
  // Detection if no prop is passed (legacy support)
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

  // Use prop if provided, otherwise internal state
  const activeLang = propLang || currentLang;

  const toggleLanguage = () => {
    const nextLang = activeLang === 'en' ? 'fr' : 'en';
    
    // Set cookie
    document.cookie = `NEXT_LOCALE=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Full reload to guarantee server-side detection of the new cookie
    window.location.reload();
  };

  const flags = {
    en: "🇬🇧",
    fr: "🇫🇷"
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      className="h-10 w-10 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all active:scale-95 group border-none bg-transparent"
      title={activeLang === 'en' ? 'Passer en Français' : 'Switch to English'}
    >
      <div className="flex flex-col items-center justify-center relative">
        <span className="text-xl group-hover:scale-110 transition-transform">
          {flags[activeLang]}
        </span>
        <span className="absolute -bottom-4 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase font-mono">
          {activeLang === 'en' ? 'FR' : 'EN'}
        </span>
      </div>
    </Button>
  );
}
