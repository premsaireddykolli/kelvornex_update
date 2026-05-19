import React from 'react';
import Layout from '../components/Layout';
import { Shield, Eye, Lock, FileText, Globe, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Eye size={24} className="text-brand-purple" />,
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when registering for a course, creating an account, subscribing to our newsletter, or contacting us. This includes your name, email address, phone number, billing address, professional background, and any other information you choose to provide."
    },
    {
      icon: <Globe size={24} className="text-brand-purple" />,
      title: "2. How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, including course enrollment, personalized learning recommendations, and customer support. We also use it to communicate with you about courses, promotions, events, and other educational updates."
    },
    {
      icon: <Lock size={24} className="text-brand-purple" />,
      title: "3. Information Sharing and Disclosure",
      content: "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential."
    },
    {
      icon: <Shield size={24} className="text-brand-purple" />,
      title: "4. Data Security Measures",
      content: "We implement a variety of security measures to maintain the safety of your personal information. We use industry-standard encryption protocols (SSL/TLS) for data transmission, secure database storage, and restricted staff access to sensitive customer data."
    },
    {
      icon: <UserCheck size={24} className="text-brand-purple" />,
      title: "5. Your Privacy Rights",
      content: "You have the right to access, update, correct, or delete your personal information at any time. You can manage your profile settings directly inside your account, or contact our support team for assistance with account closure or data export requests."
    },
    {
      icon: <FileText size={24} className="text-brand-purple" />,
      title: "6. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We will notify you of any material changes by posting the new policy on this page and updating the effective date at the top."
    }
  ];

  return (
    <Layout 
      title="Privacy Policy" 
      subtitle="Learn how we collect, protect, and handle your personal data when using Kelvornex."
      description="Kelvornex Privacy Policy: Discover how we safeguard your personal information, respect your data privacy, and ensure secure upskilling."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 hidden lg:block sticky top-28 self-start">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Quick Navigation</h3>
            <nav className="space-y-3">
              {sections.map((section, idx) => (
                <a 
                  key={idx} 
                  href={`#section-${idx}`} 
                  className="block text-sm text-gray-500 hover:text-brand-purple hover:translate-x-1 transition-all duration-200"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Policy Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm leading-relaxed text-gray-600">
            <p className="text-sm text-gray-400 mb-8 font-medium">Last Updated: May 19, 2026</p>
            
            <p className="mb-6 text-lg">
              At Kelvornex, we are committed to protecting the privacy of our learners and users. This Privacy Policy details our practices regarding the collection, use, and disclosure of information we receive through our platform, online courses, and associated web services.
            </p>
            
            <div className="space-y-12">
              {sections.map((sec, idx) => (
                <div key={idx} id={`section-${idx}`} className="scroll-mt-28 space-y-4">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    {sec.icon}
                    <h2 className="text-xl font-bold text-gray-900">{sec.title}</h2>
                  </div>
                  <p className="text-gray-650 leading-relaxed text-base">{sec.content}</p>
                </div>
              ))}
            </div>

            {/* Support section */}
            <div className="mt-12 p-6 rounded-2xl bg-brand-purple/5 border border-brand-purple/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Have questions about our privacy practices?</h4>
                <p className="text-sm text-gray-500">Our dedicated Data Protection team is ready to help you with your inquiry.</p>
              </div>
              <a 
                href="mailto:privacy@kelvornex.com" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shadow-brand-purple/10 shrink-0 text-sm"
              >
                Contact Data Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
