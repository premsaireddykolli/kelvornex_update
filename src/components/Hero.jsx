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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white"
    >
      {/* Background Image on the right half (desktop only) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] z-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: "url('/hero_background.jpg')" }}
      >
        {/* Smooth gradient fade overlay to blend the image into the white background on the left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 10%, rgba(255, 255, 255, 0.7) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)'
          }}
        />
      </div>

      {/* ── Architectural Blueprint Grid (Faint & Precise) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 select-none">
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
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 select-none">
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

      {/* Spacer to push content down and keep layout balanced */}
      <div className="h-32 sm:h-40 flex-shrink-0" />

      {/* ── Hero Main Content ── */}
      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center max-w-7xl">
        <div className="max-w-2xl text-left">
          {/* Tagline */}
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A73E8] mb-5 block">
            • Innovation Lab
          </span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.12] mb-6 font-display"
          >
            Upskill To The <br />
            <span className="text-[#1A73E8]">Top 1%.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 max-w-lg mb-10 text-[15px] sm:text-lg leading-relaxed font-normal font-sans"
          >
            From classroom to career — practical, mentor-guided learning engineered for today's hyper-competitive software and technology market.
          </motion.p>

          {/* Centered CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-start"
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

          {/* Bottom categories bar (matches Fraylon layout style) */}
          <div className="mt-20 flex flex-wrap gap-x-6 gap-y-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            <span>CYBER SECURITY</span>
            <span className="text-slate-200">|</span>
            <span>GEN AI</span>
            <span className="text-slate-200">|</span>
            <span>AGENTIC AI</span>
            <span className="text-slate-200">|</span>
            <span>VLSI</span>
            <span className="text-slate-200">|</span>
            <span>QUANTUM COMPUTING</span>
          </div>
        </div>
      </div>

      <div className="h-16 flex-shrink-0" />
    </section>
  );
};

export default Hero;