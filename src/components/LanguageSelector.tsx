import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  onLanguageSelect: (languageCode: string) => void;
  showWelcome?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect, showWelcome = true }) => {
  const { t, currentLanguage } = useTranslation();

  if (!showWelcome) {
    return (
      <div className="relative">
        <select 
          value={currentLanguage}
          onChange={(e) => onLanguageSelect(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('selectLanguage')}
          </h1>
          <p className="text-gray-600">Choose your preferred language to continue</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                currentLanguage === language.code 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <span className="font-medium text-gray-800">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onLanguageSelect(currentLanguage)}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;