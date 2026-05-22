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
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20"
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
              <div className="bg-white px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900 text-lg">Join Our Team!</p>
                  <p className="text-gray-500 text-sm">Product &amp; Software Development Interns – Including R&amp;D Roles</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    to="/careers"
                    onClick={handleClose}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
                  >
                    Apply Now
                  </Link>
                  <button
                    onClick={handleClose}
                    className="border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold text-sm hover:border-gray-400 transition-colors"
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
