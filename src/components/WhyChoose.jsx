import { useEffect, useRef, useState } from 'react';
import { Video, Award, UserCheck, Briefcase, HelpCircle, Users, Star, ArrowRight } from 'lucide-react';

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
   PASTEL BLOB LAYER — opacity 0.08, high blur, fluid drift
   ──────────────────────────────────────────────────────────────── */
const PastelBlobs = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
    <div style={{
      position: 'absolute', top: '5%', left: '8%',
      width: 480, height: 480, borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
      background: `radial-gradient(circle, ${G.blue} 0%, #93c5fd 55%, transparent 80%)`,
      opacity: 0.08, filter: 'blur(72px)',
      animation: 'blobA 20s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute', bottom: '6%', right: '6%',
      width: 440, height: 440, borderRadius: '45% 55% 40% 60% / 60% 40% 60% 40%',
      background: `radial-gradient(circle, ${G.green} 0%, #86efac 55%, transparent 80%)`,
      opacity: 0.08, filter: 'blur(80px)',
      animation: 'blobB 24s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute', top: '42%', left: '46%',
      width: 360, height: 360, borderRadius: '55% 45% 60% 40% / 45% 55% 45% 55%',
      background: `radial-gradient(circle, ${G.red} 0%, #fca5a5 55%, transparent 80%)`,
      opacity: 0.07, filter: 'blur(90px)',
      animation: 'blobC 28s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute', top: '15%', right: '22%',
      width: 300, height: 300, borderRadius: '50%',
      background: `radial-gradient(circle, ${G.yellow} 0%, #fde68a 55%, transparent 80%)`,
      opacity: 0.07, filter: 'blur(60px)',
      animation: 'blobD 18s ease-in-out infinite',
    }} />
  </div>
);

/* ────────────────────────────────────────────────────────────────
   FEATURE CARD — no 3D tilt, clean hover with border + shadow
   ──────────────────────────────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, description, accentColor, delay }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        className="feature-card group"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#1A73E8';
          e.currentTarget.style.boxShadow = `0 8px 32px rgba(26,115,232,0.12), 0 2px 8px rgba(60,64,67,0.06)`;
          e.currentTarget.querySelector('.card-top-strip').style.transform = 'scaleX(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(60,64,67,0.06)';
          e.currentTarget.querySelector('.card-top-strip').style.transform = 'scaleX(0)';
        }}
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          padding: '1.75rem',
          cursor: 'default',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(60,64,67,0.06)',
          borderRadius: '0px',
        }}
      >
        {/* Top color strip */}
        <div
          className="card-top-strip"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 3,
            background: accentColor,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center mb-4 rounded-full"
          style={{
            background: '#F5F5F5',
            border: '1px solid #E0E0E0',
          }}
        >
          <Icon size={22} style={{ color: '#000000' }} />
        </div>

        <h4 className="text-base font-bold text-slate-800 font-sans mb-1.5 leading-snug">
          {title}
        </h4>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   STAT PANEL — no 3D tilt, clean shadow on hover
   ──────────────────────────────────────────────────────────────── */
const StatPanel = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(40px)',
        transition: 'opacity 0.9s ease 0.3s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s',
      }}
    >
      <div
        className="flex flex-col justify-between flex-grow"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          padding: '4rem 3rem',
          boxShadow: '0 4px 24px rgba(60,64,67,0.08)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          height: '100%',
          borderRadius: '0px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#1A73E8';
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,115,232,0.12), 0 4px 24px rgba(60,64,67,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(60,64,67,0.08)';
        }}
      >
        {/* Rating */}
        <div className="text-center mb-8 mt-2">
          <div className="text-6xl font-black font-sans mb-3" style={{ color: '#202124' }}>
            4.8
          </div>
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill={G.yellow} color={G.yellow} />
            ))}
          </div>
          <div className="text-sm font-extrabold text-slate-800 font-sans">Google Rating</div>
          <p className="text-slate-600 text-xs font-bold mt-0.5">From 10,000+ Students</p>
        </div>

        {/* Divider */}
        <div className="mb-8" style={{ height: 1, background: '#E8EAED' }} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 text-center">
          {[
            { value: '50K+', label: 'Mentees' },
            { value: '500+', label: 'Partners' },
            { value: '120+', label: 'Mentors' },
            { value: '98%', label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black font-sans" style={{ color: '#1A73E8' }}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-600 font-extrabold mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   WHY CHOOSE (MENTORS PANEL)
   ──────────────────────────────────────────────────────────────── */
const WhyChoose = () => {
  const headerRef = useRef(null);
  const [hdrIn, setHdrIn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHdrIn(true); },
      { threshold: 0.25 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const features = [
    { icon: Video, title: 'LIVE Interactive Sessions', description: 'Real-time sessions with practitioners — ask, debug, and get live feedback.', accentColor: '#1A73E8', delay: 0 },
    { icon: Award, title: 'Industry Ratified Certifications', description: 'Credentials validated by leading industry bodies and government organisations.', accentColor: '#1A73E8', delay: 80 },
    { icon: UserCheck, title: 'Expert Industry Mentors', description: 'Learn from engineers and leaders with 10+ years of real-world experience.', accentColor: '#1A73E8', delay: 160 },
    { icon: Briefcase, title: 'Portfolio-worthy Projects', description: 'Build production-grade projects that impress senior engineers on day one.', accentColor: '#1A73E8', delay: 240 },
    { icon: HelpCircle, title: 'Dedicated Query Sessions', description: 'One-on-one doubt resolution sessions with your mentor, at your convenience.', accentColor: '#1A73E8', delay: 320 },
    { icon: Users, title: 'Active Peer Community', description: 'Join 50,000+ ambitious learners in a thriving, collaborative learning network.', accentColor: '#1A73E8', delay: 400 },
  ];

  return (
    <section
      id="why-choose"
      className="relative py-32 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Pastel blob layer */}
      <PastelBlobs />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: hdrIn ? 1 : 0,
            transform: hdrIn ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
          className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8"
        >
          <div className="max-w-xl font-sans">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 text-[10px] font-extrabold uppercase tracking-widest"
              style={{ background: '#E8F0FE', color: '#1A73E8', border: '1px solid rgba(26,115,232,0.15)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1A73E8' }} />
              Our Advantage
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight"
              style={{ color: '#202124' }}
            >
              Why Choose{' '}
              <span style={{ color: '#1A73E8' }}>Kelvornex?</span>
            </h2>
            <p className="text-slate-800 text-lg font-medium">
              We bridge the gap between classroom theory and industry reality through
              live mentorship, real projects, and community.
            </p>
          </div>
          <a
            href="/apply-as-mentor"
            className="nav-btn-google group shrink-0"
            id="mentors-apply-btn"
          >
            Apply as Mentor
            <ArrowRight size={15} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-200" />
          </a>
        </div>

        {/* Asymmetric bento layout — no 3D tilt */}
        <div className="flex flex-col lg:flex-row gap-14 items-stretch">
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
          <div className="lg:w-2/5 lg:sticky lg:top-32 flex flex-col self-stretch">
            <StatPanel />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          33%      { transform: translate(40px,-28px) scale(1.08) rotate(12deg); }
          66%      { transform: translate(-18px,36px) scale(0.95) rotate(-8deg); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          40%      { transform: translate(-44px,28px) scale(1.1) rotate(-18deg); }
          70%      { transform: translate(28px,-36px) scale(0.92) rotate(10deg); }
        }
        @keyframes blobC {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(56px,44px) scale(1.12); }
        }
        @keyframes blobD {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-36px,28px) scale(1.06); }
        }
      `}</style>
    </section>
  );
};

export default WhyChoose;
