import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  return {
    t,
    currentLanguage,
    changeLanguage
  };
};