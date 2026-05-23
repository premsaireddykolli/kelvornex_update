import Layout from '../components/Layout';
import { FileText, UserCheck, CreditCard, Award, AlertTriangle, ShieldCheck } from 'lucide-react';

const TermsConditions = () => {
  const sections = [
    {
      icon: <UserCheck size={24} className="text-violet-600" />,
      title: "1. Account Registration & Security",
      content: "When you create an account with Kelvornex, you represent and warrant that you are at least 18 years old and that the information you provide is accurate and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
      icon: <Award size={24} className="text-violet-600" />,
      title: "2. License & Intellectual Property",
      content: "All course materials, video lectures, source codes, project descriptions, and textual resources available on Kelvornex are owned by Kelvornex or its content licensors. You are granted a limited, personal, non-transferable license to access and complete courses for your own personal educational growth. You may not copy, distribute, or create derivative works from our materials without express written authorization."
    },
    {
      icon: <CreditCard size={24} className="text-violet-600" />,
      title: "3. Pricing, Enrollment & Fees",
      content: "Prices for our training programs, internships, and Pro Packs are displayed on their respective information pages. Kelvornex reserves the right to modify pricing, structure, or content at any time. Enrollment is confirmed only upon successful processing of payment or validation of corporate sponsorship."
    },
    {
      icon: <ShieldCheck size={24} className="text-violet-600" />,
      title: "4. Learner Code of Conduct",
      content: "We foster an inclusive, respectful, and safe space for upskilling. You agree not to post inappropriate, harassing, spam, or abusive content in forums, project feedback boards, or mentor chat groups. Plagiarism or cheating on projects, mock interviews, or certifications is strictly prohibited and can result in immediate termination of account access without a refund."
    },
    {
      icon: <AlertTriangle size={24} className="text-violet-600" />,
      title: "5. Limitation of Liability",
      content: "Kelvornex provides its educational platform 'as is' without warranty of any kind. While we design our programs in alignment with industry standards and work with top corporate partners, we do not guarantee specific employment outcomes, job offers, or salary figures upon completion."
    },
    {
      icon: <FileText size={24} className="text-violet-600" />,
      title: "6. Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any dispute arising out of or relating to your use of this platform shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, India."
    }
  ];

  return (
    <Layout 
      title="Terms & Conditions" 
      subtitle="Understand the guidelines, mutual rules, and standards governing your educational journey on Kelvornex."
      description="Kelvornex Terms and Conditions: Review the guidelines, intellectual property policies, payment codes, and code of conduct for our learners."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 hidden lg:block sticky top-28 self-start">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Document Index</h3>
            <nav className="space-y-3">
              {sections.map((section, idx) => (
                <a 
                  key={idx} 
                  href={`#terms-${idx}`} 
                  className="block text-sm text-gray-500 hover:text-violet-600 hover:translate-x-1 transition-all duration-200"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm leading-relaxed text-gray-600">
            <p className="text-sm text-gray-400 mb-8 font-medium">Effective Date: May 19, 2026</p>
            
            <p className="mb-8 text-lg">
              Welcome to Kelvornex. By accessing our platform, enrolling in courses, or utilizing any of our features, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before starting your program.
            </p>
            
            <div className="space-y-12">
              {sections.map((sec, idx) => (
                <div key={idx} id={`terms-${idx}`} className="scroll-mt-28 space-y-4">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    {sec.icon}
                    <h2 className="text-xl font-bold text-gray-900">{sec.title}</h2>
                  </div>
                  <p className="text-gray-650 leading-relaxed text-base">{sec.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-violet-500/5 border border-violet-500/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Require assistance or clarification?</h4>
                <p className="text-sm text-gray-500">Contact our legal and operations team for any queries regarding learner contracts.</p>
              </div>
              <a 
                href="mailto:support@kelvornex.com" 
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shrink-0 text-sm"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
