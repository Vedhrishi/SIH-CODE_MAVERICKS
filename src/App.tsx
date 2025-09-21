import React, { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WelcomePage from './components/WelcomePage';
import AdmissionPage from './components/AdmissionPage';
import DocumentsPage from './components/DocumentsPage';
import ChatbotPage from './components/ChatbotPage';
import SummaryPage from './components/SummaryPage';
import { useTranslation } from './hooks/useTranslation';
import { ChatbotResponse } from './types';

function App() {
  const { currentLanguage, changeLanguage } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  // Application data
  const [admissionData, setAdmissionData] = useState<{ selectedQuota: string; selectedBranch: string }>({
    selectedQuota: '',
    selectedBranch: ''
  });
  const [documents, setDocuments] = useState<Record<string, File>>({});
  const [chatbotResponses, setChatbotResponses] = useState<ChatbotResponse[]>([]);

  useEffect(() => {
    // Check if language is already selected
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (!savedLanguage) {
      setShowLanguageSelector(true);
    }
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    changeLanguage(languageCode);
    setShowLanguageSelector(false);
  };

  const handleStepComplete = (step: string) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleStartApplication = () => {
    setCurrentStep('admission');
    handleStepComplete('welcome');
  };

  const handleAdmissionNext = (data: { selectedQuota: string; selectedBranch: string }) => {
    setAdmissionData(data);
    setCurrentStep('documents');
    handleStepComplete('admission');
  };

  const handleDocumentsNext = (docs: Record<string, File>) => {
    setDocuments(docs);
    setCurrentStep('chatbot');
    handleStepComplete('documents');
  };

  const handleChatbotNext = (responses: ChatbotResponse[]) => {
    setChatbotResponses(responses);
    setCurrentStep('summary');
    handleStepComplete('chatbot');
  };

  const handleFinalSubmit = () => {
    handleStepComplete('summary');
    // Could redirect to a final confirmation page or reset the application
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
  };

  const handleStepChange = (step: string) => {
    // Only allow navigation to completed steps or the next step
    const stepOrder = ['welcome', 'admission', 'documents', 'chatbot', 'summary'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(step);
    
    if (completedSteps.includes(step) || targetIndex <= currentIndex + 1) {
      setCurrentStep(step);
    }
  };

  if (showLanguageSelector) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLanguageChange={handleLanguageSelect} />
      
      {currentStep !== 'welcome' && (
        <Navigation 
          currentStep={currentStep}
          onStepChange={handleStepChange}
          completedSteps={completedSteps}
        />
      )}
      
      <main className="pb-8">
        {currentStep === 'welcome' && (
          <WelcomePage onStartApplication={handleStartApplication} />
        )}
        
        {currentStep === 'admission' && (
          <AdmissionPage onNext={handleAdmissionNext} />
        )}
        
        {currentStep === 'documents' && (
          <DocumentsPage onNext={handleDocumentsNext} />
        )}
        
        {currentStep === 'chatbot' && (
          <ChatbotPage onNext={handleChatbotNext} />
        )}
        
        {currentStep === 'summary' && (
          <SummaryPage 
            admissionData={admissionData}
            documents={documents}
            chatbotResponses={chatbotResponses}
            onSubmit={handleFinalSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;