'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/locale';

export function LanguageSwitcher({ currentLang }: { currentLang: Language }) {


  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'fr' : 'en';
    
    // Set cookie
    document.cookie = `NEXT_LOCALE=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Full reload to guarantee server-side detection of the new cookie
    window.location.reload();
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      className="h-10 w-10 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
      title={currentLang === 'en' ? 'Passer en Français' : 'Switch to English'}
    >
      <span className="font-mono text-[11px] font-bold">
        {currentLang === 'en' ? 'FR' : 'EN'}
      </span>
    </Button>
  );
}
