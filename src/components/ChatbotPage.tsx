import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, ArrowLeft, ArrowRight, Upload, Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { chatbotQuestions } from '../data/chatbotQuestions';
import { ChatbotResponse } from '../types';

interface ChatbotPageProps {
  onNext: (responses: ChatbotResponse[]) => void;
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ onNext }) => {
  const { t, currentLanguage } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [showTyping, setShowTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentQuestion = chatbotQuestions[currentQuestionIndex];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [responses, showTyping]);

  const addBotMessage = (message: string, delay = 1000) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      // This would add to messages if we were tracking bot messages separately
    }, delay);
  };

  const handleAnswer = (answer: string | File) => {
    const answerText = answer instanceof File ? answer.name : answer;
    
    const newResponse: ChatbotResponse = {
      question: currentQuestion.question[currentLanguage as keyof typeof currentQuestion.question],
      answer: answerText,
      type: currentQuestion.type
    };

    setResponses([...responses, newResponse]);
    setCurrentAnswer('');
    setUploadedFile(null);

    if (currentQuestionIndex < chatbotQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        addBotMessage('Next question...', 500);
      }, 1000);
    } else {
      setTimeout(() => {
        onNext([...responses, newResponse]);
      }, 1000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevResponses = [...responses];
      prevResponses.pop();
      setResponses(prevResponses);
    }
  };

  const validateAnswer = (answer: string): boolean => {
    if (!currentQuestion.validation) return true;
    
    if (currentQuestion.validation.required && !answer.trim()) {
      return false;
    }
    
    if (currentQuestion.validation.pattern) {
      const regex = new RegExp(currentQuestion.validation.pattern);
      return regex.test(answer);
    }
    
    return true;
  };

  const handleFileUpload = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (file.size > maxSize) {
      alert('File size should be less than 5MB');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, and PNG files are allowed');
      return;
    }
    
    setUploadedFile(file);
  };

  const progress = ((currentQuestionIndex + 1) / chatbotQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{t('chatbotTitle')}</h2>
          <div className="text-sm text-gray-600">
            {t('chatbotProgress')}: {currentQuestionIndex + 1}/{chatbotQuestions.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-md flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Welcome Message */}
          {currentQuestionIndex === 0 && responses.length === 0 && (
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                <p className="text-gray-800">{t('chatbotWelcome')}</p>
              </div>
            </div>
          )}

          {/* Previous Q&A */}
          {responses.map((response, index) => (
            <div key={index} className="space-y-4 mb-4">
              {/* Bot Question */}
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-gray-800">{response.question}</p>
                </div>
              </div>
              
              {/* User Answer */}
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-sm p-3 max-w-xs">
                  <p className="text-white">{response.answer}</p>
                </div>
                <div className="bg-gray-300 p-2 rounded-full">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>
          ))}

          {/* Current Question */}
          {currentQuestionIndex < chatbotQuestions.length && (
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-md">
                <p className="text-gray-800">
                  {currentQuestion.question[currentLanguage as keyof typeof currentQuestion.question]}
                </p>
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {showTyping && (
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {currentQuestionIndex < chatbotQuestions.length && (
          <div className="border-t border-gray-200 p-4">
            {currentQuestion.type === 'choice' ? (
              <div className="space-y-2">
                {currentQuestion.options?.[currentLanguage as keyof typeof currentQuestion.options]?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : currentQuestion.type === 'file' ? (
              <div className="space-y-4">
                {uploadedFile ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">{uploadedFile.name}</span>
                    </div>
                    <button
                      onClick={() => handleAnswer(uploadedFile)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Drop your file here or click to browse</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your answer..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && currentAnswer.trim()) {
                      if (validateAnswer(currentAnswer)) {
                        handleAnswer(currentAnswer);
                      } else {
                        alert(currentQuestion.validation?.message[currentLanguage as keyof typeof currentQuestion.validation.message]);
                      }
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (validateAnswer(currentAnswer)) {
                      handleAnswer(currentAnswer);
                    } else {
                      alert(currentQuestion.validation?.message[currentLanguage as keyof typeof currentQuestion.validation.message]);
                    }
                  }}
                  disabled={!currentAnswer.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            )}
            
            {/* Navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('back')}</span>
              </button>
              
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {chatbotQuestions.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;