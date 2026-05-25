import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      showToast('Email address cannot be empty.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/newsletter/subscribe', { email: email.trim() });
      showToast(response.data.message || 'Successfully subscribed to our newsletter!', 'success');
      setEmail('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.validationErrors?.email || 'Failed to subscribe to newsletter. Please try again.';
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    // Dismiss after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <footer className="bg-[#202124] text-slate-400 py-12 px-6 md:px-16 border-t border-white/10 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none z-0" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <h3 className="text-white font-extrabold text-2xl font-sans tracking-tight">
              Kelvornex
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering the next generation of tech leaders with industry-vetted programs, expert mentorship, and real-world project experience.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Careers', path: '/careers' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Affiliate Program', path: '/affiliate' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore Programs */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">
              Explore Programs
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Cyber Security', path: '/cyber-security' },
                { name: 'Gen AI', path: '/gen-ai' },
                { name: 'Agentic AI', path: '/agentic-ai' },
                { name: 'VLSI', path: '/vlsi' },
                { name: 'Quantum Computing', path: '/quantum-computing' },
                { name: 'Microsoft Fabric', path: '/microsoft-fabric' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Updated */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-sm leading-relaxed text-slate-400">
              Subscribe to our newsletter to receive exclusive tech resources, event invites, and career tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 text-white placeholder:text-slate-500 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1A73E8] border border-white/10 w-full"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-white hover:bg-slate-100 border border-white text-slate-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] active:scale-[0.98]"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Separating Rule */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Kelvornex. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                to="/privacy-policy" 
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-white transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/refund-policy" 
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-white transition-colors duration-200"
              >
                Payment & Refund Policy
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Sleek Floating Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 rounded p-5 shadow-2xl border max-w-sm flex gap-4 items-start ${
              toast.type === 'success'
                ? 'bg-[#202124] text-white border-white/10'
                : 'bg-red-950 text-red-200 border-red-900/50'
            }`}
          >
            <div className={`p-2 rounded text-white shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
            }`}>
              {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">
                {toast.type === 'success' ? 'Subscription Active!' : 'Validation Error'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
