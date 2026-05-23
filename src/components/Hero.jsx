import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   GOOGLE COLORS
   ──────────────────────────────────────────────────────────────── */
const G = {
  blue:   '#1A73E8',
  red:    '#EA4335',
  yellow: '#FBBC05',
  green:  '#34A853',
};

/* ────────────────────────────────────────────────────────────────
   HERO SECTION
   ──────────────────────────────────────────────────────────────── */
const Hero = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: '50K+', label: 'Mentees',  color: G.blue   },
    { value: '120+', label: 'Mentors',  color: G.red    },
    { value: '500+', label: 'Partners', color: G.yellow  },
    { value: '4.8★', label: 'Rating',   color: G.green  },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* ── Full-bleed hero background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
        {/* White overlay so headline text stays sharp and readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(255,255,255,0.62)' }}
        />
        {/* Gradient fade to white at bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '180px',
            background: 'linear-gradient(to bottom, transparent, #FFFFFF)',
          }}
        />
      </div>

      {/* ── Scroll-reveal border expansion ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          border: revealed ? '1px solid rgba(26,115,232,0.1)' : '1px solid transparent',
          clipPath: revealed ? 'inset(0% 0% 0% 0%)' : 'inset(50% 50% 50% 50%)',
          transition: 'clip-path 1.4s cubic-bezier(0.22,1,0.36,1), border 0.6s ease',
        }}
      />

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 relative z-10 text-center pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 text-slate-900 tracking-tight font-sans"
          >
            {['Upskill', 'To', 'The'].map((word) => (
              <motion.span
                key={word}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            
            {/* Pristine non-glitched text with four-color Google underline */}
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.84 },
                visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } },
              }}
              className="inline-block relative cursor-default select-none"
            >
              <span className="text-slate-900">Top 1%</span>
              
              {/* Four-color Google underline */}
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] flex overflow-hidden">
                {[G.blue, G.red, G.yellow, G.green].map((c, i) => (
                  <span key={i} style={{ flex: 1, background: c }} />
                ))}
              </span>
            </motion.span>
            <br />
            
            {/* Remaining text lines */}
            {['With'].map((word) => (
              <motion.span
                key={word}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block mr-[0.22em] font-extrabold"
              style={{ color: G.blue }}
            >
              Expert-Led
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block font-extrabold"
              style={{ color: G.green }}
            >
              Programs
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-14 leading-relaxed font-light font-sans"
          >
            From classroom to career — practical, mentor-guided learning engineered
            for today's hyper-competitive job market.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#programs"
              id="hero-cta-explore"
              className="g-btn g-btn--primary group"
            >
              Explore Programs
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <button
              id="hero-cta-demo"
              className="g-btn g-btn--ghost group"
            >
              <span className="g-btn-play-circle">
                <Play size={14} fill="currentColor" />
              </span>
              Watch Demo
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.8 }}
            className="flex items-center justify-center gap-12 mt-16 flex-wrap"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black font-sans" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-slate-500 mt-0.5 font-sans">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;