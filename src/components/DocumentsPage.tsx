import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Download, Printer, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface DocumentsPageProps {
  onNext: (documents: Record<string, File>) => void;
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<Record<string, File>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [showPrintOptions, setShowPrintOptions] = useState(false);

  const documentTypes = [
    { id: 'tenthCertificate', label: t('tenthCertificate'), required: true },
    { id: 'twelfthCertificate', label: t('twelfthCertificate'), required: true },
    { id: 'transferCertificate', label: t('transferCertificate'), required: true },
    { id: 'photoUpload', label: t('photoUpload'), required: true },
    { id: 'signatureUpload', label: t('signatureUpload'), required: true },
  ];

  const handleFileUpload = (documentId: string, file: File) => {
    // Simulate file upload progress
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[documentId] || 0;
        const newProgress = Math.min(currentProgress + 10, 100);
        
        if (newProgress === 100) {
          clearInterval(progressInterval);
          setDocuments(prevDocs => ({ ...prevDocs, [documentId]: file }));
          setTimeout(() => {
            setUploadProgress(prev => {
              const updated = { ...prev };
              delete updated[documentId];
              return updated;
            });
          }, 1000);
        }
        
        return { ...prev, [documentId]: newProgress };
      });
    }, 100);
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (file.size > maxSize) {
      return 'File size should be less than 5MB';
    }
    
    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF, JPG, and PNG files are allowed';
    }
    
    return null;
  };

  const handleNext = () => {
    const requiredDocs = documentTypes.filter(doc => doc.required).map(doc => doc.id);
    const uploadedDocs = Object.keys(documents);
    
    if (requiredDocs.every(docId => uploadedDocs.includes(docId))) {
      setShowPrintOptions(true);
    }
  };

  const generateApplication = () => {
    // Generate application document
    const content = `
      APPLICATION SUMMARY
      ==================
      
      Student Name: [To be filled]
      Application Date: ${new Date().toLocaleDateString()}
      Selected Branch: [To be filled]
      Selected Quota: [To be filled]
      
      DOCUMENTS UPLOADED:
      ${Object.keys(documents).map(doc => `- ${doc}: ${documents[doc].name}`).join('\n')}
      
      This is a computer-generated document.
      No signature required.
      
      Sri Venkateswara Engineering College
      Admission Office
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'application_summary.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const printApplication = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0;">Sri Venkateswara Engineering College</h1>
          <p style="color: #666; margin: 5px 0;">Excellence in Engineering Education</p>
          <h2 style="color: #444; margin-top: 20px;">APPLICATION SUMMARY</h2>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Application Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Application Date:</td>
              <td style="padding: 8px;">${new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Application ID:</td>
              <td style="padding: 8px;">SVEC${Date.now().toString().slice(-6)}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Documents Uploaded</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${Object.keys(documents).map(doc => 
              `<li style="padding: 5px 0; border-bottom: 1px solid #eee;">
                <strong>${documentTypes.find(d => d.id === doc)?.label || doc}:</strong> ${documents[doc].name}
                <span style="color: #4CAF50; float: right;">✓ Verified</span>
               </li>`
            ).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p>This is a computer-generated document. No signature required.</p>
          <p style="margin-top: 20px;">For any queries, contact: admissions@svec.edu.in | +91-40-1234-5678</p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('uploadDocuments')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {documentTypes.map((docType) => {
          const isUploaded = documents[docType.id];
          const progress = uploadProgress[docType.id];
          
          return (
            <div key={docType.id} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
              <div className="mb-4">
                {isUploaded ? (
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                ) : (
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {docType.label}
                {docType.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              
              {progress !== undefined ? (
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">Uploading... {progress}%</p>
                </div>
              ) : isUploaded ? (
                <div className="mb-4">
                  <p className="text-sm text-green-600 font-medium">✓ {documents[docType.id].name}</p>
                  <p className="text-xs text-gray-500">
                    {(documents[docType.id].size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mb-4">
                  Upload PDF, JPG, or PNG (Max 5MB)
                </p>
              )}
              
              {!isUploaded && progress === undefined && (
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id={`file-${docType.id}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const error = validateFile(file);
                      if (error) {
                        alert(error);
                        return;
                      }
                      handleFileUpload(docType.id, file);
                    }
                  }}
                />
              )}
              
              <label
                htmlFor={`file-${docType.id}`}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
                  isUploaded 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {isUploaded ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Uploaded</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>{t('uploadFile')}</span>
                  </>
                )}
              </label>
            </div>
          );
        })}
      </div>
      
      {/* Progress Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
          <span className="text-sm text-gray-600">
            {Object.keys(documents).length} of {documentTypes.length} completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(Object.keys(documents).length / documentTypes.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="text-center space-y-4">
        {Object.keys(documents).length === documentTypes.length ? (
          showPrintOptions ? (
            <div className="space-y-4">
              <p className="text-green-600 font-medium mb-4">
                ✓ All documents uploaded successfully!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={printApplication}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Printer className="h-5 w-5" />
                  <span>{t('printApplication')}</span>
                </button>
                
                <button
                  onClick={generateApplication}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>{t('downloadApplication')}</span>
                </button>
              </div>
              
              <button
                onClick={() => onNext(documents)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <span>{t('next')}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Generate Application</span>
              <FileText className="h-5 w-5" />
            </button>
          )
        ) : (
          <p className="text-gray-600">
            Please upload all required documents to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;