import React from 'react';
import Layout from '../components/Layout';
import { Target, Users, ShieldAlert, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { value: "50,000+", label: "Learners Upskilled" },
    { value: "250+", label: "Hiring Partners" },
    { value: "150+", label: "Elite Industry Mentors" },
    { value: "92%", label: "Placement Success Rate" }
  ];

  const values = [
    {
      title: "Practitioner-Led Training",
      icon: <Users className="text-blue-500" />,
      desc: "Learn from people who build. Our mentors are active engineers, product heads, and marketers from top companies."
    },
    {
      title: "Outcome Driven Curriculums",
      icon: <Target className="text-violet-500" />,
      desc: "Every course includes hands-on capstone projects, simulated workplace briefs, and professional portfolio reviews."
    },
    {
      title: "Career-First Ecosystem",
      icon: <Award className="text-emerald-500" />,
      desc: "Beyond lectures, we provide resume refinement, hiring events, and interview pathways with leading startups and firms."
    }
  ];

  return (
    <Layout
      title="About Kelvornex"
      subtitle="Bridging the gap between traditional academic theory and real-world professional competence."
      description="About Kelvornex: Discover our upskilling statistics, company values, mentor networks, and career-advancement mission."
    >
      <div className="space-y-20">
        {/* Mission and Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 font-display">Our Mission & Vision</h2>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              Founded with the objective to modernize technical and professional education, Kelvornex offers industry-aligned programs that prepare learners for high-growth roles in software development, digital marketing, UI/UX design, and business management.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              Instead of relying on outdated textbooks, our learners participate in cohort-based modules, evaluate production-ready source codes, and complete real-world case studies under the close mentorship of working experts.
            </p>
          </div>
          <div className="lg:col-span-5 bg-gradient-vibrant rounded-3xl p-8 text-white relative overflow-hidden shadow-xl aspect-video flex flex-col justify-center items-center">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <h3 className="text-3xl md:text-4xl font-extrabold font-display text-center relative z-10 text-glow-purple">
              Upskill. Outperform.
            </h3>
            <p className="text-white/80 text-xs md:text-sm mt-3 font-light relative z-10 tracking-widest uppercase">
              Kelvornex Corporate
            </p>
          </div>
        </div>

        {/* Statistical Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-brand-purple font-display">{stat.value}</div>
              <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Key Values */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 font-display">The Kelvornex Philosophy</h2>
            <p className="text-gray-500 text-sm">We structure our learning systems around three foundational principles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
