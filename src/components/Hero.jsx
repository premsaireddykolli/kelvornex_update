import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   MONOCHROMATIC PARTNER LOGOS (CUSTOM INLINE VECTOR SVGS)
   ──────────────────────────────────────────────────────────────── */
const AmazonLogo = () => (
  <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors duration-300">
    <svg className="w-16 h-5 fill-current" viewBox="0 0 76 22">
      <path d="M42.2 14.7c0 1.9-.9 3.2-2.6 3.2-1.6 0-2.3-1.1-2.3-2.7 0-2.6 2.1-3.6 4.9-3.6v3.1zm1.2-7.5c-.8-.5-1.9-.7-3-.7-2.6 0-4.9 1.2-5.4 3.7-.1.4.1.8.5.9l1.9.3c.3 0 .6-.2.7-.5.3-.9 1.1-1.5 2.1-1.5.9 0 1.6.4 1.6 1.1v.6c-.9.1-1.9.3-2.9.5-2.8.6-4.5 2.1-4.5 4.6 0 2.4 1.7 4 4 4 1.8 0 3-.9 3.6-2v1.7c0 .4.3.7.7.7h2c.4 0 .7-.3.7-.7V10c0-2.7-.9-4.2-2.9-4.2zM52.3 8.3c-1.3 0-2.1.8-2.4 1.7h4.8c-.1-1.1-.9-1.7-2.4-1.7zm.1-2.4c3 0 5.2 1.8 5.2 4.9v.9H49.6c.1 1.6 1.1 2.3 2.6 2.3 1.1 0 2.1-.3 2.9-.8v2.4c-.9.5-2.2.8-3.4.8-3.3 0-5-2.1-5-4.8 0-3.1 1.8-4.8 4.8-4.8zm-11 5.9c-.9 0-1.5.3-1.9.7v5.5c.4.3 1 .5 1.7.5.9 0 1.4-.4 1.4-1.2v-5.5c0-.7-.5-1-1.2-1zm.3-2.5c1.1 0 1.8.3 2.4.8v-.5h2.9v8.4c0 2.2-.8 3.5-2.2 4.1-1 .5-2.4.6-3.6.6-1.1 0-2.4-.2-3.3-.6v-2.5c.9.5 2 .8 3 .8.9 0 1.2-.4 1.2-1.2v-.6c-.6.5-1.5.8-2.4.8-2 0-3.6-1.4-3.6-4.1-.1-2.9 1.6-4.2 3.6-4.2zM27.9 14.8c0-1.8-1.1-2.6-3-2.6-1 0-1.8.2-2.4.5v4.3c.6.3 1.3.4 2 .4 1.2.1 1.4-.6 1.4-2.6zm3.1-6.1h-2.9v1.7h2.9v2.5h-2.9v5.9c0 .7.2 1 .8 1 .4 0 .7-.1.9-.2v2.4c-.5.2-1.2.3-2.1.3-1.8 0-2.6-.9-2.6-2.5v-6.9h-1.8V8.7h1.8V5.4l3-1v4.3h3.1v2.5zM63 6.4h2.9v1.7H63v2.5h2.9v5.9c0 .7.2 1 .8 1 .4 0 .7-.1.9-.2v2.4c-.5.2-1.2.3-2.1.3-1.8 0-2.6-.9-2.6-2.5v-6.9H60V8.7h1.8V5.4l3-1v4.3h3.1v2.5zm-51.2 8.4V8.7h2.9v.4c.7-.5 1.7-.8 2.7-.8 2.3 0 4 1.6 4 4.5 0 3.3-1.9 4.8-4.2 4.8-1.1 0-1.9-.3-2.5-.8v8.5h-2.9zm13.8-8.8c0-1.5-.9-2.3-2.3-2.3-1.4 0-2.3.8-2.3 2.3 0 1.5.9 2.3 2.3 2.3 1.4 0 2.3-.8 2.3-2.3zm3-7.5v13.3H26v-.4c-.6.5-1.5.8-2.5.8-2.6 0-4.4-1.8-4.4-4.7 0-3.1 1.9-4.7 4.4-4.7 1 0 1.9.3 2.5.8V2.9h2.9zm-15.1.7c-1.3 0-2.1.8-2.4 1.7H16c-.1-1.1-.9-1.7-2.4-1.7z" />
    </svg>
  </div>
);

const MicrosoftLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 23 23">
      <path d="M0 0h10.5v10.5H0zM11.5 0H22v10.5H11.5zM0 11.5h10.5V22H0zM11.5 11.5H22V22H11.5z" />
    </svg>
    <span className="font-semibold text-[13px] tracking-tight font-sans select-none">Microsoft</span>
  </div>
);

const GoogleLogo = () => (
  <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors duration-300">
    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.44 0-6.228-2.788-6.228-6.228 0-3.44 2.788-6.228 6.228-6.228 1.54 0 2.94.55 4.03 1.47l3.056-3.056C19.06 1.77 15.82 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.07 0 11.76-4.97 11.76-11.96 0-.81-.07-1.62-.2-2.42H12.24z" />
    </svg>
    <span className="font-semibold text-[13px] tracking-tight font-sans select-none">Google</span>
  </div>
);

const VercelLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 116 100">
      <path d="M57.5 0L115 100H0L57.5 0Z" />
    </svg>
    <span className="font-bold text-[13px] tracking-tight font-sans select-none">Vercel</span>
  </div>
);

const StripeLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300">
    <svg className="w-12 h-5 fill-current" viewBox="0 0 80 33">
      <path d="M74.8 15.6c0-.9-.7-1.3-1.9-1.3-1.1 0-1.8.3-2.3.6v4.6c.5.2 1.3.4 2.2.4 1.2.1 2-.3 2-1.3v-3zm2-3.1v10.9c0 1-.3 1.9-1 2.5-.9.8-2.3.9-3.4.9-1.1 0-2.3-.3-3.2-.8V21c.9.5 2 .8 3.1.8 1.1 0 1.5-.4 1.5-1.1v-.8c-.7.5-1.7.8-2.7.8-2.3 0-4-1.6-4-4.5 0-3.3 1.9-4.8 4.2-4.8 1.1 0 1.9.3 2.5.8v-.4h3zm-14.7 3.1c0-.9-.7-1.3-1.9-1.3-1.1 0-1.8.3-2.3.6v4.6c.5.2 1.3.4 2.2.4 1.2.1 2-.3 2-1.3v-3zm2-5.7v16.6h-2.9v-.4c-.7.5-1.7.8-2.7.8-2.3 0-4-1.6-4-4.5 0-3.3 1.9-4.8 4.2-4.8 1.1 0 1.9.3 2.5.8v-8.5h2.9zm-13.8 8.8c0-1.5-.9-2.3-2.3-2.3-1.4 0-2.3.8-2.3 2.3 0 1.5.9 2.3 2.3 2.3 1.4 0 2.3-.8 2.3-2.3zm3-7.5v13.3h-2.9v-.4c-.6.5-1.5.8-2.5.8-2.6 0-4.4-1.8-4.4-4.7 0-3.1 1.9-4.7 4.4-4.7 1 0 1.9.3 2.5.8v-5.1h2.9zm-15.1.7c-1.3 0-2.1.8-2.4 1.7h4.8c-.1-1.1-.9-1.7-2.4-1.7zm.1-2.4c3 0 5.2 1.8 5.2 4.9v.9h-8c.1 1.6 1.1 2.3 2.6 2.3 1.1 0 2.1-.3 2.9-.8v2.4c-.9.5-2.2.8-3.4.8-3.3 0-5-2.1-5-4.8 0-3.1 1.8-4.8 4.8-4.8zm-11 .8c-.9 0-1.5.3-1.9.7v5.5c.4.3 1 .5 1.7.5.9 0 1.4-.4 1.4-1.2V13c-.1-.7-.6-1-1.2-1zm.3-2.5c1.1 0 1.8.3 2.4.8v-.5h2.9v8.4c0 2.2-.8 3.5-2.2 4.1-1 .5-2.4.6-3.6.6-1.1 0-2.4-.2-3.3-.6v-2.5c.9.5 2 .8 3 .8.9 0 1.2-.4 1.2-1.2v-.6c-.6.5-1.5.8-2.4.8-2 0-3.6-1.4-3.6-4.1-.1-2.9 1.6-4.2 3.6-4.2zm-12.7.4H30V23h-3V10.1zm0-3.7h3V9.1h-3V6.4zm-4.7 9.8c0-1.8-1.1-2.6-3-2.6-1 0-1.8.2-2.4.5v4.3c.6.3 1.3.4 2 .4 1.2.1 1.4-.6 1.4-2.6zm3.1-6.1h-2.9v1.7h2.9v2.5h-2.9v5.9c0 .7.2 1 .8 1 .4 0 .7-.1.9-.2v2.4c-.5.2-1.2.3-2.1.3-1.8 0-2.6-.9-2.6-2.5v-6.9h-1.8v-2.5h1.8v-3.3l3-1v4.3h3.1v2.5zm-15.1 4.5c.8-.7 1.5-1.7 1.9-2.7h-3.8c-.3.7-.8 1.4-1.5 1.9l3.4.8zM.6 15.6c0-1.4 1-2.1 2.8-2.4l1.3-.2V12c0-.7-.4-1.1-1.3-1.1-.9 0-1.7.2-2.3.6v-2.5c.8-.4 1.9-.6 3-.6 2.6 0 3.7 1.2 3.7 3.5v7.2c0 .9.2 1.4.5 1.8v.1H5.4c-.1-.2-.2-.6-.3-1-.6.7-1.6 1.2-2.8 1.2-1.7 0-2.9-1-2.9-2.5z" />
    </svg>
  </div>
);

/* ────────────────────────────────────────────────────────────────
   HERO SECTION
   ──────────────────────────────────────────────────────────────── */
const Hero = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* ── Architectural Blueprint Grid (Faint & Precise) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000000" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Geometric Thin Construction Lines (Architectural Aesthetic) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Horizontal center axis */}
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
          {/* Vertical center axis */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />

          {/* Architectural diagonal construction lines */}
          <line x1="0%" y1="0" x2="100%" y2="80%" stroke="#000000" strokeWidth="0.5" />
          <line x1="100%" y1="0" x2="0%" y2="80%" stroke="#000000" strokeWidth="0.5" />

          {/* Coordinates & Alignment circles */}
          <circle cx="50%" cy="40%" r="140" fill="none" stroke="#000000" strokeWidth="0.5" />
          <circle cx="50%" cy="40%" r="280" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,3" />
          <circle cx="15%" cy="20%" r="50" fill="none" stroke="#000000" strokeWidth="0.5" />
          <circle cx="85%" cy="65%" r="70" fill="none" stroke="#000000" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ── High-Blur Ambient Gradient Blob (Mixed Corporate Blue, Teal, Soft Purple) ── */}
      <div
        className="absolute pointer-events-none z-0 select-none"
        style={{
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '450px',
          background: 'linear-gradient(135deg, #1A73E8 0%, #14B8A6 50%, #8B5CF6 100%)',
          filter: 'blur(130px)',
          opacity: 0.1,
          borderRadius: '200px 400px 300px 300px',
        }}
      />

      {/* Spacer to push content down and keep layout balanced */}
      <div className="h-28 sm:h-36 flex-shrink-0" />

      {/* ── Hero Main Content ── */}
      <div className="container mx-auto px-6 relative z-10 text-center flex-grow flex flex-col justify-center max-w-5xl">
        {/* Geometric Black Logo Mark */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.12] mb-6"
          style={{
            fontFamily: '"Google Sans", "Product Sans", "Plus Jakarta Sans", "Inter", sans-serif',
            fontWeight: 700
          }}
        >
          Upskill To The <span className="text-black">Top 1%</span> <br className="hidden sm:inline" /> With <span style={{ color: '#1A73E8' }}>Expert-Led</span> <span className="text-black">Programs</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-600 max-w-2xl mx-auto mb-12 text-[15px] sm:text-lg leading-relaxed font-normal font-sans"
        >
          From classroom to career — practical, mentor-guided learning engineered for today's hyper-competitive software and technology market.
        </motion.p>

        {/* Centered CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {/* Primary Button with Liquid Border Inversion Hover Effect */}
          <a
            href="#programs"
            className="relative overflow-hidden group w-full sm:w-auto px-8 py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-[11px] block text-center select-none"
            style={{
              fontFamily: '"Google Sans", "Product Sans", "Plus Jakarta Sans", "Inter", sans-serif',
              fontWeight: 700,
              borderRadius: '4px',
            }}
          >
            {/* Liquid fill circle layer (expanding from center outward) */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full scale-0 transition-transform duration-500 ease-out origin-center z-0 group-hover:scale-[7.5]"
            />
            {/* Button text */}
            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
              EXPLORE PROGRAMS
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;