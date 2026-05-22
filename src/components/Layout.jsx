import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children, title, subtitle, description, hideBanner = false }) => {
  useEffect(() => {
    // Scroll to top instantly when component mounts
    window.scrollTo(0, 0);
    
    // SEO: Update Title Tag
    if (title) {
      document.title = `${title} | Kelvornex`;
    } else {
      document.title = 'Kelvornex | EdTech & Upskilling Platform';
    }
    
    // SEO: Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || 'Kelvornex - Premium EdTech & Upskilling Platform');
  }, [title, description]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`min-h-screen bg-slate-50/50 pt-20 flex flex-col justify-between`}
    >
      <div>
        {/* Premium Header Banner */}
        {!hideBanner && (
          <div className="relative overflow-hidden bg-brand-dark py-16 md:py-24 text-white">
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 grid-pattern opacity-10" />
            
            {/* Vibrant backdrop glow shapes */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-purple rounded-full blur-[100px] opacity-20 animate-pulse-glow" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600 rounded-full blur-[100px] opacity-20" />
            
            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
              {title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display mb-4 tracking-tight text-white">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Main Page Content */}
        <div className={hideBanner ? "" : "container mx-auto px-6 py-12 md:py-16 max-w-6xl"}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Layout;
