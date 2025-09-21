import React from 'react';
import { GraduationCap, User } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('collegeName')}</h1>
              <p className="text-sm text-gray-600">{t('tagline')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector onLanguageSelect={onLanguageChange} showWelcome={false} />
            <div className="bg-gray-100 p-2 rounded-lg">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;