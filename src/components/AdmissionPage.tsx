import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock, AlertTriangle, Users, Award } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { branches, quotas } from '../data/courses';
import { Branch, Quota, SeatAvailability } from '../types';

interface AdmissionPageProps {
  onNext: (data: { selectedQuota: string; selectedBranch: string }) => void;
}

const AdmissionPage: React.FC<AdmissionPageProps> = ({ onNext }) => {
  const { t, currentLanguage } = useTranslation();
  const [selectedQuota, setSelectedQuota] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [seatAvailability, setSeatAvailability] = useState<SeatAvailability[]>([]);

  // Simulate real-time seat updates
  useEffect(() => {
    const updateSeats = () => {
      const updatedSeats = branches.map(branch => ({
        branchId: branch.id,
        available: Math.max(5, branch.seats - Math.floor(Math.random() * (branch.seats * 0.7))),
        total: branch.seats,
        lastUpdated: new Date().toISOString()
      }));
      setSeatAvailability(updatedSeats);
    };

    updateSeats();
    const interval = setInterval(updateSeats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getSeatStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return { color: 'green', status: 'Available', icon: CheckCircle };
    if (percentage > 20) return { color: 'yellow', status: 'Limited', icon: Clock };
    return { color: 'red', status: 'Few Left', icon: AlertTriangle };
  };

  const handleNext = () => {
    if (selectedQuota && selectedBranch) {
      onNext({ selectedQuota, selectedBranch });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quota Selection */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('selectQuota')}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {quotas.map((quota: Quota) => (
            <div
              key={quota.id}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                selectedQuota === quota.id 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedQuota(quota.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    quota.id === 'convener' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {quota.id === 'convener' ? (
                      <Users className={`h-6 w-6 ${quota.id === 'convener' ? 'text-blue-600' : 'text-purple-600'}`} />
                    ) : (
                      <Award className={`h-6 w-6 ${quota.id === 'convener' ? 'text-blue-600' : 'text-purple-600'}`} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {quota.name[currentLanguage as keyof typeof quota.name]}
                  </h3>
                </div>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {quota.percentage}% Seats
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">
                {quota.description[currentLanguage as keyof typeof quota.description]}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Eligibility:</h4>
                <ul className="space-y-1">
                  {quota.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{criteria[currentLanguage as keyof typeof criteria]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Selection */}
      {selectedQuota && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('selectBranch')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch: Branch) => {
              const seatInfo = seatAvailability.find(s => s.branchId === branch.id);
              const seatStatus = seatInfo ? getSeatStatus(seatInfo.available, seatInfo.total) : null;
              const StatusIcon = seatStatus?.icon || CheckCircle;
              
              return (
                <div
                  key={branch.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    selectedBranch === branch.id 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedBranch(branch.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-bold text-gray-700">
                      {branch.code}
                    </div>
                    {seatInfo && (
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        seatStatus?.color === 'green' ? 'text-green-600' :
                        seatStatus?.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        <StatusIcon className="h-4 w-4" />
                        <span>{seatStatus?.status}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {branch.name[currentLanguage as keyof typeof branch.name]}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {branch.description[currentLanguage as keyof typeof branch.description]}
                  </p>
                  
                  {seatInfo && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>{t('seatsAvailable')}</span>
                        <span>{seatInfo.available}/{seatInfo.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            seatStatus?.color === 'green' ? 'bg-green-500' :
                            seatStatus?.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(seatInfo.available / seatInfo.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <div>Duration: {branch.duration}</div>
                    <div className="mt-1">
                      Eligibility: {branch.eligibility[currentLanguage as keyof typeof branch.eligibility]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Continue Button */}
      {selectedQuota && selectedBranch && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <span>{t('next')}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdmissionPage;