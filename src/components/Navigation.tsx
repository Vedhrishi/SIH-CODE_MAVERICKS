import React from 'react';
import { Home, FileText, Upload, MessageCircle, ClipboardCheck } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface NavigationProps {
  currentStep: string;
  onStepChange: (step: string) => void;
  completedSteps: string[];
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, onStepChange, completedSteps }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 'welcome', label: t('home'), icon: Home },
    { id: 'admission', label: t('admission'), icon: FileText },
    { id: 'documents', label: t('documents'), icon: Upload },
    { id: 'chatbot', label: t('chatbot'), icon: MessageCircle },
    { id: 'summary', label: t('summary'), icon: ClipboardCheck },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-8">
            {steps.map(({ id, label, icon: Icon }) => {
              const isCompleted = completedSteps.includes(id);
              const isCurrent = currentStep === id;
              
              return (
                <button
                  key={id}
                  onClick={() => onStepChange(id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-all duration-200 ${
                    isCurrent
                      ? 'border-blue-500 text-blue-600'
                      : isCompleted
                      ? 'border-green-500 text-green-600 hover:text-green-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${
                    isCompleted ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className="font-medium text-sm">{label}</span>
                  {isCompleted && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;