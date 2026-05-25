import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

const BLUE = '#1A73E8';

/* ── Animated counter ───────────────────────────────────────── */
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const numeric = parseInt(target.replace(/\D/g, ''), 10);
          const duration = 1400;
          const steps = 60;
          const increment = numeric / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numeric) {
              setCount(numeric);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── Value card ─────────────────────────────────────────────── */
const ValueCard = ({ icon: Icon, title, desc, delay }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
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
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          boxShadow: '0 1px 4px rgba(60,64,67,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = BLUE;
          e.currentTarget.style.boxShadow = `0 8px 32px rgba(26,115,232,0.10), 0 2px 8px rgba(60,64,67,0.06)`;
          e.currentTarget.querySelector('.top-strip').style.transform = 'scaleX(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(60,64,67,0.06)';
          e.currentTarget.querySelector('.top-strip').style.transform = 'scaleX(0)';
        }}
      >
        {/* Top color strip */}
        <div
          className="top-strip"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 3, background: BLUE,
            transform: 'scaleX(0)', transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <div
          className="w-12 h-12 flex items-center justify-center mb-5"
          style={{ background: '#F8F9FA', border: '1px solid #E8EAED' }}
        >
          <Icon size={22} style={{ color: '#202124' }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

/* ── Stat box ───────────────────────────────────────────────── */
const StatBox = ({ value, suffix, label, delay }) => {
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
      className="text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          padding: '2rem 1.5rem',
          boxShadow: '0 1px 4px rgba(60,64,67,0.06)',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = BLUE;
          e.currentTarget.style.boxShadow = `0 8px 24px rgba(26,115,232,0.10)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(60,64,67,0.06)';
        }}
      >
        <div className="text-4xl font-black mb-1 text-[#202124]">
          <Counter target={value} suffix={suffix} />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</div>
      </div>
    </div>
  );
};

/* ── Main About Page ─────────────────────────────────────────── */
const About = () => {
  useEffect(() => {
    document.title = 'About Kelvornex | EdTech & Upskilling Platform';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'About Kelvornex: Discover our upskilling statistics, company values, mentor networks, and career-advancement mission.');
    window.scrollTo(0, 0);
  }, []);

  const headerRef = useRef(null);
  const [hdrIn, setHdrIn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHdrIn(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const missionRef = useRef(null);
  const [missionIn, setMissionIn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMissionIn(true); }, { threshold: 0.15 });
    if (missionRef.current) obs.observe(missionRef.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: '50000', suffix: '+', label: 'Learners Upskilled',     delay: 0   },
    { value: '250',   suffix: '+', label: 'Hiring Partners',        delay: 80  },
    { value: '150',   suffix: '+', label: 'Elite Industry Mentors', delay: 160 },
    { value: '92',    suffix: '%', label: 'Placement Success Rate', delay: 240 },
  ];

  const values = [
    { icon: Users,       title: 'Practitioner-Led Training',     desc: 'Learn from people who build. Our mentors are active engineers, product heads, and marketers from top companies.',                                  delay: 0   },
    { icon: Target,      title: 'Outcome Driven Curriculums',    desc: 'Every course includes hands-on capstone projects, simulated workplace briefs, and professional portfolio reviews.',                               delay: 80  },
    { icon: Award,       title: 'Career-First Ecosystem',        desc: 'Beyond lectures, we provide resume refinement, hiring events, and interview pathways with leading startups and firms.',                          delay: 160 },
    { icon: ShieldCheck, title: 'Industry Ratified Credentials', desc: 'All certifications are validated by NSDC, Skill India, and Microsoft — recognised by top companies in every hiring round.',                     delay: 240 },
    { icon: Zap,         title: 'Live & Interactive Sessions',   desc: 'No pre-recorded monotony. Every class is live, interactive, and recorded for your convenience so you never miss a session.',                    delay: 320 },
    { icon: Globe,       title: 'Global Peer Community',         desc: 'Join 50,000+ ambitious learners across India and abroad in our Discord and cohort groups for networking, projects, and career growth.',         delay: 400 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-white pt-20"
    >
      {/* ── Page Hero ─────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-white border-b border-slate-100 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-0 select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="aboutGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutGrid)" />
          </svg>
        </div>
        {/* Soft blue accent blob */}
        <div
          className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(26,115,232,0.06) 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
        />

        <div
          ref={headerRef}
          className="container mx-auto px-6 max-w-5xl relative z-10 text-center"
          style={{
            opacity: hdrIn ? 1 : 0,
            transform: hdrIn ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(26,115,232,0.07)', color: BLUE, border: `1px solid rgba(26,115,232,0.2)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
            Who We Are
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#202124] mb-6 leading-tight font-sans">
            About <span style={{ color: BLUE }}>Kelvornex</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between traditional academic theory and real-world professional competence — one learner at a time.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            ref={missionRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{
              opacity: missionIn ? 1 : 0,
              transform: missionIn ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Left — text */}
            <div>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(26,115,232,0.07)', color: BLUE, border: `1px solid rgba(26,115,232,0.2)` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
                Our Mission & Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#202124] mb-6 tracking-tight leading-tight">
                Where Industry <span style={{ color: BLUE }}>Meets</span> Education
              </h2>
              <div className="space-y-4 text-slate-500 text-base leading-relaxed">
                <p>
                  Founded with the objective to modernize technical and professional education, Kelvornex offers industry-aligned programs that prepare learners for high-growth roles in software development, digital marketing, UI/UX design, and business management.
                </p>
                <p>
                  Instead of relying on outdated textbooks, our learners participate in cohort-based modules, evaluate production-ready source codes, and complete real-world case studies under the close mentorship of working experts.
                </p>
              </div>
              <a
                href="#values"
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-wider"
                style={{ color: BLUE, borderBottom: `2px solid rgba(26,115,232,0.3)`, paddingBottom: '2px' }}
              >
                Our Philosophy <ArrowRight size={14} />
              </a>
            </div>

            {/* Right — fact card */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 24px rgba(60,64,67,0.08)',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Single blue top bar */}
              <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: BLUE }} />

              <div className="space-y-8 pt-4">
                {[
                  { label: 'Founded',          value: '2021'              },
                  { label: 'Headquartered',    value: 'Hyderabad, India'  },
                  { label: 'Programs Offered', value: '12+ Tracks'        },
                  { label: 'Recognition',      value: 'NSDC & Skill India' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
                    <span className="text-sm font-extrabold text-[#202124]">{item.value}</span>
                  </div>
                ))}
              </div>
              {/* Background watermark */}
              <div className="absolute bottom-4 right-4 text-[80px] font-black text-slate-50 select-none pointer-events-none leading-none">
                K
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F9FA] border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s) => (
              <StatBox key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values / Philosophy ──────────────────────────────── */}
      <section id="values" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: 'rgba(26,115,232,0.07)', color: BLUE, border: `1px solid rgba(26,115,232,0.2)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
              The Kelvornex Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#202124] mb-4 tracking-tight leading-tight">
              Six Pillars of <span style={{ color: BLUE }}>Excellence</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              We structure our learning systems around these foundational principles to ensure every learner succeeds.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className="relative overflow-hidden"
            style={{
              background: '#202124',
              padding: '4rem 3rem',
            }}
          >
            {/* Single blue top bar */}
            <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: BLUE }} />
            {/* Background watermark */}
            <div
              className="absolute right-0 bottom-0 text-[180px] font-black leading-none select-none pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.03)' }}
            >
              KELV
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Ready to transform your career?
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  Join 50,000+ learners already upskilling with Kelvornex.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <a
                  href="/#programs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-300"
                  style={{ background: BLUE, color: '#FFFFFF', borderRadius: 9999 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  Explore Programs <ArrowRight size={14} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-300"
                  style={{ background: 'transparent', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 9999 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
