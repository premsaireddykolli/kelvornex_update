import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, ChevronDown, HelpCircle, BookOpen, User, CreditCard, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = ['All', 'Program Enrollment', 'Certification Validity', 'Refund Timelines', 'Placement Support'];

  const faqs = [
    {
      category: "Program Enrollment",
      question: "How do I enroll in a Kelvornex cohort program?",
      answer: "You can enroll directly through our program pages (Advanced Programs or Pro Packs) by selecting your preferred batch and clicking the 'Enroll' button. Complete the checkout process with your payment details, and you will receive instant onboarding access via email."
    },
    {
      category: "Program Enrollment",
      question: "Are there any eligibility criteria for enrolling?",
      answer: "Our Self-Paced Courses and Pro Packs have no prerequisites and are open to all beginners. Some Advanced cohort programs require a basic understanding of computer science or a brief screening call with our academic team to ensure fit."
    },
    {
      category: "Certification Validity",
      question: "Is the Kelvornex certificate industry-recognized?",
      answer: "Yes, our certificates are co-branded with our corporate training partners. They include a secure verification link and a QR code, making them easily verifiable by recruiters and shareable on platforms like LinkedIn."
    },
    {
      category: "Certification Validity",
      question: "What are the requirements to earn the program certificate?",
      answer: "To earn the certificate, you must maintain at least 80% attendance in live sessions (if applicable), complete all assignments, and secure a passing grade on the final Capstone project."
    },
    {
      category: "Refund Timelines",
      question: "What is the refund eligibility window?",
      answer: "We offer a 100% money-back guarantee if you request a cancellation within 3 days of enrollment or before the second live lecture of your batch, whichever is earlier."
    },
    {
      category: "Refund Timelines",
      question: "How long does it take to process my refund?",
      answer: "Once a refund request is validated and approved by our finance team, it is initiated within 2 business days. The credit will reflect in your original payment method (card, UPI, net banking) within 5 to 7 working days."
    },
    {
      category: "Placement Support",
      question: "What does the Placement Assistance program include?",
      answer: "We provide comprehensive placement support, including professional resume building, portfolio curation, 1-on-1 mock interviews with active developers/marketers, and direct referrals to our network of 250+ hiring partners."
    },
    {
      category: "Placement Support",
      question: "Is there a job guarantee with the placement programs?",
      answer: "Our Advanced Placement programs offer a job guarantee clause where we promise at least 3 direct interview cycles with our partner companies. If you are not placed within 6 months of course completion after meeting all criteria, we offer a partial course fee waiver."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Program Enrollment': return <BookOpen size={18} className="text-black" />;
      case 'Certification Validity': return <Award size={18} className="text-black" />;
      case 'Refund Timelines': return <CreditCard size={18} className="text-black" />;
      case 'Placement Support': return <User size={18} className="text-black" />;
      default: return <HelpCircle size={18} className="text-black" />;
    }
  };

  return (
    <Layout 
      title="Frequently Asked Questions" 
      subtitle="Find quick answers to common questions about courses, certifications, placements, and billing."
      description="Kelvornex FAQs: Get immediate answers about enrollment, cohort structures, placements, refund policies, and online certificates."
    >
      <div className="max-w-4xl mx-auto space-y-12 font-sans">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search FAQs (e.g. refund, certificate, placements)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-250 rounded-none pl-14 pr-6 py-5 text-slate-805 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black shadow-sm transition-all text-lg"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center pb-2 border-b border-slate-150">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all cursor-pointer border-2 ${
                activeCategory === cat 
                  ? 'bg-black border-black text-white shadow-md shadow-black/10' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-black hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:border-black hover:shadow-[6px_6px_0px_rgba(0,0,0,0.03)]"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <span className="shrink-0 p-2 rounded-md bg-slate-50 border border-slate-100">
                        {getCategoryIcon(faq.category)}
                      </span>
                      <span className="font-bold text-slate-800 text-base md:text-lg leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 shrink-0 transition-transform duration-350 ${isOpen ? 'rotate-180 text-black' : ''}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 border-t border-slate-50 leading-relaxed text-sm md:text-base font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-none border border-slate-200 shadow-sm">
              <HelpCircle className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="font-bold text-lg text-slate-700 mb-1">No FAQs found</h3>
              <p className="text-slate-400 text-sm">Try modifying your keyword search or selecting another category.</p>
            </div>
          )}
        </div>

        {/* Contact/Help Box */}
        <div className="bg-black rounded-none p-8 text-white relative overflow-hidden shadow-xl hover:shadow-[10px_10px_0px_rgba(0,0,0,0.06)] border border-black/10 transition-all duration-300">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left font-sans">
              <h3 className="text-2xl font-extrabold mb-2 font-display">Still have unanswered questions?</h3>
              <p className="text-white/80 max-w-xl text-sm md:text-base font-medium leading-relaxed">
                Our support team is available 24/7 to clear up any doubts. Shoot us a message or call directly!
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <a 
                href="mailto:help@kelvornex.com" 
                className="bg-white text-black hover:bg-transparent hover:text-white border-2 border-white font-bold px-6 py-3 rounded-full transition-all text-xs tracking-wider uppercase shadow-md cursor-pointer"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
