import React from 'react';
import { ArrowLeft, User, Award, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'RISHI',
      role: 'Chief Executive Officer',
      roleTranslations: {
        en: 'Chief Executive Officer',
        hi: 'मुख्य कार्यकारी अधिकारी',
        ta: 'தலைமை நிர்வாக அதிகாரி',
        te: 'చీఫ్ ఎగ్జిక్యూటివ్ ఆఫీసర్',
        mr: 'मुख्य कार्यकारी अधिकारी'
      },
      description: {
        en: 'Visionary leader driving innovation in educational technology and student services.',
        hi: 'शैक्षिक प्रौद्योगिकी और छात्र सेवाओं में नवाचार को आगे बढ़ाने वाले दूरदर्शी नेता।',
        ta: 'கல்வி தொழில்நுட்பம் மற்றும் மாணவர் சேவைகளில் புதுமையை முன்னெடுக்கும் தொலைநோக்கு தலைவர்.',
        te: 'విద్యా సాంకేతికత మరియు విద్యార్థి సేవలలో ఆవిష్కరణలను నడిపించే దూరదృష్టి గల నాయకుడు.',
        mr: 'शैक्षणिक तंत्रज्ञान आणि विद्यार्थी सेवांमध्ये नावीन्य चालविणारे दूरदर्शी नेते.'
      },
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      email: 'rishi.ceo@svec.edu.in',
      phone: '+91-98765-43210'
    },
    {
      name: 'DEEKSHITH',
      role: 'Co-Worker & Technical Lead',
      roleTranslations: {
        en: 'Co-Worker & Technical Lead',
        hi: 'सह-कर्मचारी और तकनीकी प्रमुख',
        ta: 'சக பணியாளர் மற்றும் தொழில்நுட்ப தலைவர்',
        te: 'సహోద్యోగి & టెక్నికల్ లీడ్',
        mr: 'सह-कर्मचारी आणि तांत्रिक प्रमुख'
      },
      description: {
        en: 'Expert in system architecture and development, ensuring seamless user experiences.',
        hi: 'सिस्टम आर्किटेक्चर और विकास में विशेषज्ञ, निर्बाध उपयोगकर्ता अनुभव सुनिश्चित करते हैं।',
        ta: 'கணினி கட்டமைப்பு மற்றும் மேம்பாட்டில் நிபுணர், தடையற்ற பயனர் அனுபவங்களை உறுதி செய்கிறார்.',
        te: 'సిస్టమ్ ఆర్కిటెక్చర్ మరియు డెవలప్‌మెంట్‌లో నిపుణుడు, అంతరాయం లేని వినియోగదారు అనుభవాలను నిర్ధారిస్తాడు.',
        mr: 'सिस्टम आर्किटेक्चर आणि विकासातील तज्ञ, अखंड वापरकर्ता अनुभव सुनिश्चित करतात.'
      },
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      email: 'deekshith.tech@svec.edu.in',
      phone: '+91-98765-43211'
    },
    {
      name: 'VIVEK',
      role: 'Co-Worker & Operations Manager',
      roleTranslations: {
        en: 'Co-Worker & Operations Manager',
        hi: 'सह-कर्मचारी और संचालन प्रबंधक',
        ta: 'சக பணியாளர் மற்றும் செயல்பாட்டு மேலாளர்',
        te: 'సహోద్యోగి & ఆపరేషన్స్ మేనేజర్',
        mr: 'सह-कर्मचारी आणि ऑपरेशन्स व्यवस्थापक'
      },
      description: {
        en: 'Streamlines processes and manages day-to-day operations for optimal efficiency.',
        hi: 'इष्टतम दक्षता के लिए प्रक्रियाओं को सुव्यवस्थित करते हैं और दैनिक संचालन का प्रबंधन करते हैं।',
        ta: 'சிறந்த செயல்திறனுக்காக செயல்முறைகளை நெறிப்படுத்துகிறார் மற்றும் அன்றாட செயல்பாடுகளை நிர்வகிக்கிறார்.',
        te: 'సరైన సామర్థ్యం కోసం ప్రక్రియలను క్రమబద్ధీకరిస్తాడు మరియు రోజువారీ కార్యకలాపాలను నిర్వహిస్తాడు.',
        mr: 'इष्टतम कार्यक्षमतेसाठी प्रक्रिया सुव्यवस्थित करतात आणि दैनंदिन कामकाजाचे व्यवस्थापन करतात.'
      },
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      email: 'vivek.ops@svec.edu.in',
      phone: '+91-98765-43212'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind Sri Venkateswara Engineering College's 
              innovative admission portal and student services.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 ${
                  index === 0 ? 'lg:col-span-3 lg:max-w-md lg:mx-auto' : ''
                }`}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                    {index === 0 ? (
                      <Award className="h-6 w-6 text-white" />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-lg font-semibold text-blue-600 mb-4">
                  {member.roleTranslations[t.currentLanguage as keyof typeof member.roleTranslations]}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {member.description[t.currentLanguage as keyof typeof member.description]}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="hover:text-blue-600 transition-colors"
                      aria-label={`Send email to ${member.name}`}
                    >
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <a 
                      href={`tel:${member.phone}`}
                      className="hover:text-blue-600 transition-colors"
                      aria-label={`Call ${member.name}`}
                    >
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to providing world-class engineering education and fostering innovation.
              </p>
            </div>
            
            <div className="p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Student-Centric</h3>
              <p className="text-gray-600">
                Putting students first with personalized support and comprehensive guidance.
              </p>
            </div>
            
            <div className="p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making quality education accessible through innovative technology and multilingual support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="opacity-90">admissions@svec.edu.in</p>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="opacity-90">+91-40-1234-5678</p>
            </div>
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="opacity-90">Tirupati, Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;