import { useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, Users, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   GOOGLE COLORS
   ──────────────────────────────────────────────────────────────── */
const G = {
  blue: '#1A73E8',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
};

/* ────────────────────────────────────────────────────────────────
   FLOATING VECTOR SHAPES — parallax layer
   ──────────────────────────────────────────────────────────────── */
const FloatingShapes = ({ scrollY }) => {
  const shapes = [
    { type: 'bracket', x: '4%', y: '12%', size: 48, color: G.blue, delay: 0 },
    { type: 'circle', x: '88%', y: '8%', size: 32, color: G.red, delay: 0.3 },
    { type: 'code', x: '92%', y: '55%', size: 40, color: G.green, delay: 0.6 },
    { type: 'circle', x: '5%', y: '72%', size: 24, color: G.yellow, delay: 0.9 },
    { type: 'bracket', x: '48%', y: '4%', size: 36, color: G.red, delay: 0.2 },
    { type: 'code', x: '18%', y: '88%', size: 44, color: G.blue, delay: 0.5 },
    { type: 'circle', x: '75%', y: '80%', size: 28, color: G.green, delay: 0.8 },
    { type: 'bracket', x: '60%', y: '92%', size: 38, color: G.yellow, delay: 0.1 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        transform: `translateY(${scrollY * 0.22}px)`,
        transition: 'transform 0.05s linear',
        zIndex: 0,
      }}
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            opacity: 0.1,
            animation: `floatShape ${6 + i * 0.7}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          {s.type === 'circle' && (
            <svg width={s.size} height={s.size} viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="12" fill="none" stroke={s.color} strokeWidth="1.5" />
              <circle cx="16" cy="16" r="4" fill={s.color} />
            </svg>
          )}
          {s.type === 'bracket' && (
            <svg width={s.size} height={s.size} viewBox="0 0 48 48">
              <path d="M18,8 L8,8 L8,40 L18,40" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
              <path d="M30,8 L40,8 L40,40 L30,40" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {s.type === 'code' && (
            <svg width={s.size} height={s.size} viewBox="0 0 48 48">
              <rect x="4" y="4" width="40" height="40" rx="4" fill="none" stroke={s.color} strokeWidth="1.5" />
              <line x1="12" y1="16" x2="20" y2="16" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="22" x2="36" y2="22" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="28" x2="30" y2="28" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   SHOWCASE CARD  (no 3D tilt)
   ──────────────────────────────────────────────────────────────── */
const ShowcaseCard = ({ title, tag, description, mentees, duration, logos, image, accentColor, reversed = false }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        clipPath: inView ? 'inset(0% 0% 0% 0%)' : 'inset(6% 3% 6% 3%)',
        transition: 'opacity 0.9s ease, clip-path 0.9s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8EAED',
          display: 'grid',
          gridTemplateColumns: reversed ? '1fr 2fr' : '2fr 1fr',
          boxShadow: '0 2px 12px rgba(60,64,67,0.06)',
          overflow: 'hidden',
          transition: 'box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 32px rgba(60,64,67,0.12)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(60,64,67,0.06)';
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 340,
            order: reversed ? 1 : 0,
            borderRight: reversed ? 'none' : '1px solid #E8EAED',
            borderLeft: reversed ? '1px solid #E8EAED' : 'none',
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ opacity: 0.92, transition: 'transform 0.6s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          {/* 4-color top strip */}
          <div className="absolute top-0 left-0 right-0 flex" style={{ height: 3 }}>
            {[G.blue, G.red, G.yellow, G.green].map((c, i) => (
              <span key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>
          {/* Tag */}
          <span
            className="absolute top-5 left-5 text-[10px] font-bold uppercase tracking-widest px-3 py-1"
            style={{
              background: accentColor,
              color: accentColor === G.yellow ? '#000' : '#fff',
            }}
          >
            {tag}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3
            className="text-3xl md:text-4xl font-extrabold font-sans mb-4 leading-tight"
            style={{ color: '#202124' }}
          >
            {title}
          </h3>
          <p className="text-slate-600 text-base leading-relaxed mb-8 font-sans">
            {description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Clock size={14} style={{ color: accentColor }} /> {duration}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Users size={14} style={{ color: accentColor }} /> {mentees} Mentees
            </div>
          </div>

          {/* Logos */}
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Certified By</p>
            <div className="flex flex-wrap gap-5 items-center">
              {logos.map((logo, i) => (
                <img
                  key={i} src={logo} alt="Partner"
                  className="h-8 w-auto object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://logo.clearbit.com/microsoft.com'; }}
                />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="g-btn g-btn--primary group"
              id={`showcase-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
              View Details <ExternalLink size={13} />
            </button>
            <button className="g-btn g-btn--outline group">
              Download Brochure <Download size={13} />
            </button>
          </div>

          {/* Ratified */}
          <div className="mt-6 flex items-center gap-2" style={{ color: G.green }}>
            <ShieldCheck size={15} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Industry Ratified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   ADVANCED PROGRAMS SECTION
   ──────────────────────────────────────────────────────────────── */
const AdvancedPrograms = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [hdrIn, setHdrIn] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(-el.getBoundingClientRect().top);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHdrIn(true); },
      { threshold: 0.25 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="advanced-programs"
      className="relative py-32 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Parallax floating shapes */}
      <FloatingShapes scrollY={scrollY} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: hdrIn ? 1 : 0,
            transform: hdrIn ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl font-sans">
            <span
              className="inline-flex items-center gap-1 px-3 py-1 mb-5 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: '#E8F0FE', color: G.blue, border: `1px solid ${G.blue}22` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: G.blue }} />
              Flagship Programs
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight"
              style={{ color: '#202124' }}
            >
              Advanced{' '}
              <span style={{ color: G.blue }}>Programs</span>
            </h2>
            <p className="text-slate-600 text-lg font-light">
              Long-term, intensive certification programs designed for deep expertise
              and irreversible career transformation.
            </p>
          </div>
          <a
            href="#programs"
            className="g-btn g-btn--primary group shrink-0"
            id="adv-view-all"
          >
            View All Programs
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Asymmetric bento grid — no tilt */}
        <div className="space-y-10">
          <ShowcaseCard
            title="Digital Marketing"
            tag="Trending"
            accentColor={G.blue}
            description="Boost your online presence and engage with your audience effectively. Learn data-driven strategies to drive traffic, increase conversions, and build an iconic brand from scratch."
            duration="6 Months"
            mentees="20k+"
            logos={[
              'https://upload.wikimedia.org/wikipedia/en/c/c5/Skill_India_logo.png',
              'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
            ]}
            image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80"
          />
          <ShowcaseCard
            title="Data Science"
            tag="Popular"
            accentColor={G.green}
            description="Master Data Science to unlock valuable insights from data and make informed decisions. Gain expertise in analysis, machine learning, and predictive modelling with live mentors."
            duration="6 Months"
            mentees="20k+"
            logos={[
              'https://upload.wikimedia.org/wikipedia/en/3/3c/NSDC_logo.png',
              'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
            ]}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
            reversed
          />
        </div>
      </div>

      <style>{`
        @keyframes floatShape {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-18px) rotate(8deg); }
        }
      `}</style>
    </section>
  );
};

export default AdvancedPrograms;
