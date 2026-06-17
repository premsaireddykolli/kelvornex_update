import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when user lands on the page
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-sans"
          >
            <div className="relative w-full max-w-2xl rounded-none overflow-hidden shadow-2xl shadow-black/40 border border-slate-200">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white hover:bg-black transition-colors border border-white/20 cursor-pointer"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>

              {/* Hiring Image */}
              <img
                src="/We_are_hiring.png"
                alt="We Are Hiring - Kelvornex"
                className="w-full h-auto block"
              />

              {/* Bottom CTA Bar */}
              <div className="bg-white px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div>
                  <p className="font-bold text-gray-900 text-lg tracking-tight">Join Our Team!</p>
                  <p className="text-slate-500 text-sm font-semibold">Product &amp; Software Development Interns – Including R&amp;D Roles</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    to="/careers"
                    onClick={handleClose}
                    className="bg-black hover:bg-transparent border-2 border-black text-white hover:text-black px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-md shadow-black/10 text-center"
                  >
                    Apply Now
                  </Link>
                  <button
                    onClick={handleClose}
                    className="border-2 border-slate-200 text-slate-500 hover:text-black hover:border-black px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all bg-transparent cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupBanner;
