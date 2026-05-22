import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleSubscribe = (e) => {
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

    showToast('Successfully subscribed to our newsletter!', 'success');
    setEmail('');
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    // Dismiss after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-16 border-t border-slate-800 relative">
      <div className="container mx-auto">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <h3 className="text-white font-extrabold text-2xl font-display tracking-tight">
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
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-white transition-colors duration-200"
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
                { name: 'Tech & Development', path: '/programs?cat=tech' },
                { name: 'Data Science', path: '/programs?cat=data' },
                { name: 'Product Management', path: '/programs?cat=product' },
                { name: 'Digital Marketing', path: '/programs?cat=marketing' },
                { name: 'UI/UX Design', path: '/programs?cat=design' }
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
                className="bg-slate-800 text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50 border border-slate-700 w-full"
              />
              <button 
                type="submit"
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-bold px-5 py-3 rounded-xl transition-colors duration-200 text-sm shrink-0 cursor-pointer shadow-lg shadow-brand-purple/10"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Separating Rule */}
        <div className="border-t border-slate-800 mt-12 pt-6">
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
            className={`fixed bottom-8 right-8 z-50 rounded-2xl p-5 shadow-2xl border max-w-sm flex gap-4 items-start ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-slate-800'
                : 'bg-red-950 text-red-200 border-red-900/50'
            }`}
          >
            <div className={`p-2 rounded-xl text-white shrink-0 ${
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
