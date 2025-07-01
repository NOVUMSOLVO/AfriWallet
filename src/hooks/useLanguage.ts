import { useState, createContext, useContext } from 'react';
import { getLanguageByCode, Language } from '../utils/languages';
import { translations } from '../utils/translations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
  language: Language | undefined;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageState = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to get language from localStorage first
    const saved = localStorage.getItem('afriwallet-language');
    if (saved) return saved;
    
    // Try to detect from browser
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'sn', 'sw', 'yo', 'zu', 'am', 'ar'];
    
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
  });

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('afriwallet-language', code);
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  const language = getLanguageByCode(currentLanguage);

  return {
    currentLanguage,
    setLanguage,
    t,
    language
  };
};