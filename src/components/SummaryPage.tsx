import React, { useState } from 'react';
import { CheckCircle, Download, Send, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { ChatbotResponse, StudentData } from '../types';
import { branches, quotas } from '../data/courses';

interface SummaryPageProps {
  admissionData: { selectedQuota: string; selectedBranch: string };
  documents: Record<string, File>;
  chatbotResponses: ChatbotResponse[];
  onSubmit: () => void;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ 
  admissionData, 
  documents, 
  chatbotResponses,
  onSubmit 
}) => {
  const { t, currentLanguage } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Generate application ID
  const applicationId = `SVEC${Date.now().toString().slice(-6)}`;
  
  // Find selected branch and quota details
  const selectedBranch = branches.find(b => b.id === admissionData.selectedBranch);
  const selectedQuota = quotas.find(q => q.id === admissionData.selectedQuota);
  
  // Extract personal info from chatbot responses
  const personalInfo = {
    fullName: chatbotResponses.find(r => r.question.includes('name'))?.answer || '',
    email: chatbotResponses.find(r => r.question.includes('email'))?.answer || '',
    phone: chatbotResponses.find(r => r.question.includes('mobile') || r.question.includes('phone'))?.answer || '',
    percentage: chatbotResponses.find(r => r.question.includes('percentage'))?.answer || '',
    rank: chatbotResponses.find(r => r.question.includes('rank'))?.answer || 'N/A',
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
    
    // Simulate email/SMS sending
    setTimeout(() => {
      onSubmit();
    }, 3000);
  };

  const downloadSummary = () => {
    const summaryContent = `
COLLEGE ADMISSION APPLICATION SUMMARY
=====================================

Sri Venkateswara Engineering College
Excellence in Engineering Education

APPLICATION DETAILS
-------------------
Application ID: ${applicationId}
Application Date: ${new Date().toLocaleDateString()}
Status: Submitted

PERSONAL INFORMATION
-------------------
Full Name: ${personalInfo.fullName}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
12th Grade Percentage: ${personalInfo.percentage}%
Entrance Exam Rank: ${personalInfo.rank}

ADMISSION DETAILS
----------------
Selected Branch: ${selectedBranch?.name[currentLanguage as keyof typeof selectedBranch.name]}
Branch Code: ${selectedBranch?.code}
Selected Quota: ${selectedQuota?.name[currentLanguage as keyof typeof selectedQuota.name]}

UPLOADED DOCUMENTS
-----------------
${Object.keys(documents).map(doc => `- ${doc}: ${documents[doc].name}`).join('\n')}

CHATBOT RESPONSES
----------------
${chatbotResponses.map((r, i) => `${i + 1}. Q: ${r.question}\n   A: ${r.answer}`).join('\n\n')}

NEXT STEPS
----------
1. Wait for email confirmation within 24 hours
2. Check your application status on the portal
3. Attend counseling/interview if required
4. Complete fee payment upon seat allotment

CONTACT INFORMATION
------------------
Email: admissions@svec.edu.in
Phone: +91-40-1234-5678
Address: Sri Venkateswara Engineering College, Tirupati

This is a computer-generated document.
Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `application_summary_${applicationId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printSummary = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 3px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0; font-size: 28px;">Sri Venkateswara Engineering College</h1>
          <p style="color: #666; margin: 10px 0; font-size: 16px;">Excellence in Engineering Education</p>
          <h2 style="color: #444; margin-top: 20px; font-size: 22px;">APPLICATION SUMMARY</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Application Details</h3>
            <table style="width: 100%; font-size: 14px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Application ID:</td>
                <td style="padding: 8px 0;">${applicationId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Date:</td>
                <td style="padding: 8px 0;">${new Date().toLocaleDateString()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Status:</td>
                <td style="padding: 8px 0; color: #4CAF50; font-weight: bold;">Submitted</td>
              </tr>
            </table>
          </div>
          
          <div>
            <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Personal Information</h3>
            <table style="width: 100%; font-size: 14px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 8px 0;">${personalInfo.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0;">${personalInfo.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0;">${personalInfo.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">12th %:</td>
                <td style="padding: 8px 0;">${personalInfo.percentage}%</td>
              </tr>
            </table>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Admission Details</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Selected Branch:</td>
                <td style="padding: 8px 0;">
                  <strong>${selectedBranch?.name[currentLanguage as keyof typeof selectedBranch.name]}</strong> (${selectedBranch?.code})
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Quota Type:</td>
                <td style="padding: 8px 0;">${selectedQuota?.name[currentLanguage as keyof typeof selectedQuota.name]}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Duration:</td>
                <td style="padding: 8px 0;">${selectedBranch?.duration}</td>
              </tr>
            </table>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Documents Uploaded</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${Object.keys(documents).map(doc => 
              `<div style="padding: 10px; background: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-weight: 500; color: #333;">${doc}</span>
                  <span style="color: #4CAF50; font-weight: bold; font-size: 12px;">✓ VERIFIED</span>
                </div>
                <div style="font-size: 12px; color: #666; margin-top: 4px;">${documents[doc].name}</div>
               </div>`
            ).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Next Steps</h3>
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border: 1px solid #ffeaa7;">
            <ol style="margin: 0; padding-left: 20px; color: #856404;">
              <li style="margin-bottom: 8px;">Wait for email confirmation within 24 hours</li>
              <li style="margin-bottom: 8px;">Check application status on the portal regularly</li>
              <li style="margin-bottom: 8px;">Attend counseling/interview session if required</li>
              <li style="margin-bottom: 8px;">Complete fee payment upon seat allotment</li>
              <li>Report to college with original documents for verification</li>
            </ol>
          </div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; border-top: 2px solid #ddd; padding-top: 20px;">
          <p style="color: #666; margin: 0;">This is a computer-generated document. No signature required.</p>
          <p style="margin: 10px 0; color: #666;">For queries: <strong>admissions@svec.edu.in</strong> | <strong>+91-40-1234-5678</strong></p>
          <p style="margin: 0; font-size: 12px; color: #999;">Generated on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Application Summary - ${applicationId}</title>
          <style>
            @media print {
              body { margin: 0; }
              @page { margin: 1in; }
            }
          </style>
        </head>
        <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('applicationSubmitted')}
          </h1>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              {t('applicationId')}: <span className="text-blue-600">{applicationId}</span>
            </p>
            <p className="text-gray-600">
              Submission Date: {new Date().toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-3 text-green-600">
              <Mail className="h-5 w-5" />
              <span>Email confirmation sent to {personalInfo.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-green-600">
              <MessageSquare className="h-5 w-5" />
              <span>SMS confirmation sent to {personalInfo.phone}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('nextSteps')}</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">1</span>
                <span>Wait for email confirmation within 24 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">2</span>
                <span>Check your application status on the portal</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">3</span>
                <span>Attend counseling/interview if selected</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">4</span>
                <span>Complete fee payment upon seat confirmation</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadSummary}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Summary</span>
            </button>
            
            <button
              onClick={printSummary}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Print Summary</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('applicationSummary')}
      </h2>
      
      <div className="space-y-8">
        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{t('personalDetails')}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <p className="text-gray-900 font-medium">{personalInfo.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{personalInfo.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <p className="text-gray-900">{personalInfo.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">12th Grade %</label>
              <p className="text-gray-900 font-medium">{personalInfo.percentage}%</p>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>{t('academicDetails')}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Selected Branch</label>
              <p className="text-gray-900 font-bold text-lg">
                {selectedBranch?.name[currentLanguage as keyof typeof selectedBranch.name]}
              </p>
              <p className="text-gray-600 text-sm">Code: {selectedBranch?.code} | Duration: {selectedBranch?.duration}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Selected Quota</label>
              <p className="text-gray-900 font-bold text-lg">
                {selectedQuota?.name[currentLanguage as keyof typeof selectedQuota.name]}
              </p>
              <p className="text-gray-600 text-sm">{selectedQuota?.percentage}% of total seats</p>
            </div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{t('uploadedDocuments')}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(documents).map(([docType, file]) => (
              <div key={docType} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{docType}</p>
                  <p className="text-sm text-gray-600">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot Responses Summary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Additional Information</span>
          </h3>
          
          <div className="space-y-3">
            {chatbotResponses.slice(0, 5).map((response, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4">
                <p className="text-sm font-medium text-gray-700">{response.question}</p>
                <p className="text-gray-900">{response.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={downloadSummary}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download Summary</span>
          </button>
          
          <button
            onClick={printSummary}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Print Summary</span>
          </button>
          
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>{t('submitApplication')}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;