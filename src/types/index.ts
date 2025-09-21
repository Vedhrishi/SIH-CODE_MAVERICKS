export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [language: string]: Translation;
}

export interface Branch {
  id: string;
  name: Translation;
  code: string;
  seats: number;
  description: Translation;
  duration: string;
  eligibility: Translation;
}

export interface Quota {
  id: string;
  name: Translation;
  description: Translation;
  eligibility: Translation[];
  percentage: number;
}

export interface StudentData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    guardianName: string;
    guardianPhone: string;
  };
  academicInfo: {
    previousMarks: string;
    preferredBranch: string;
    selectedQuota: string;
    rank: string;
  };
  documents: {
    tenthCertificate?: File;
    twelfthCertificate?: File;
    transferCertificate?: File;
    photo?: File;
    signature?: File;
  };
  chatbotResponses: ChatbotResponse[];
  applicationId: string;
  submissionDate: string;
}

export interface ChatbotResponse {
  question: string;
  answer: string;
  type: 'text' | 'choice' | 'file';
}

export interface SeatAvailability {
  branchId: string;
  available: number;
  total: number;
  lastUpdated: string;
}