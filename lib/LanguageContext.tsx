'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'en' | 'hi';

interface LanguageContextValue {
  lang: Lang;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('celestial-lang') as Lang | null;
    if (stored === 'en' || stored === 'hi') {
      setLang(stored);
    }
  }, []);

  const toggleLanguage = () => {
    setLang(prev => {
      const next: Lang = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('celestial-lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
