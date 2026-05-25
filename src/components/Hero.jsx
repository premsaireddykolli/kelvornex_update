import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
              borderRadius: '9999px',
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