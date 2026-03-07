import React from 'react';
import { ArrowRight, Users, Award, BookOpen, Building } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface WelcomePageProps {
  onStartApplication: () => void;
  onLearnMore: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartApplication, onLearnMore }) => {
  const { t } = useTranslation();

  const features = [
    { icon: Building, title: 'Modern Infrastructure', description: 'State-of-the-art laboratories and facilities' },
    { icon: Users, title: 'Expert Faculty', description: 'Highly qualified and experienced professors' },
    { icon: Award, title: 'Industry Recognition', description: 'AICTE approved with excellent placement records' },
    { icon: BookOpen, title: 'Comprehensive Curriculum', description: 'Updated syllabus aligned with industry needs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('welcomeTitle')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('welcomeSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStartApplication}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>{t('startApplication')}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button 
                onClick={onLearnMore}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                aria-label="Learn more about our college and team"
              >
                {t('learnMore')}
              </button>
            </div>
          </div>
          
          {/* College Image */}
          <div className="mt-16">
            <img
              src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="College Campus"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our College?</h2>
            <p className="text-lg text-gray-600">Discover what makes us the preferred choice for engineering education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-90">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-lg opacity-90">Alumni Network</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg opacity-90">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;