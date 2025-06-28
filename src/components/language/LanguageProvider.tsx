import React from 'react';
import { LanguageContext, useLanguageState } from '../../hooks/useLanguage';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const languageState = useLanguageState();

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
};