import React from 'react';
import { motion } from 'framer-motion';
import { Video, Award, UserCheck, Briefcase, HelpCircle, Users } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
      <Icon size={28} />
    </div>
    <h4 className="text-xl font-bold text-gray-800">{title}</h4>
  </motion.div>
);

const WhyChoose = () => {
  const challenges = [
    { icon: Video, title: "LIVE Interactive Session" },
    { icon: Award, title: "Industry ratified certifications" },
    { icon: UserCheck, title: "Expert Industry Mentor" },
    { icon: Briefcase, title: "Portfolio worthy projects" },
    { icon: HelpCircle, title: "Dedicated query session" },
    { icon: Users, title: "Active Community" },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-extrabold font-display mb-4 tracking-tight text-gray-900 leading-tight">
              Why Choose <span className="text-brand-purple">Corizo?</span>
            </h2>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Learning Challenges</span>
              <div className="h-px w-12 bg-brand-purple" />
              <span className="text-sm font-bold text-brand-purple uppercase tracking-widest">How we encounter</span>
            </div>
            
            <p className="text-gray-500 text-lg mb-12 max-w-xl">
              We bridge the gap between classroom learning and industry requirements by providing real-world experience and mentorship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenges.map((item, i) => (
                <FeatureItem key={i} {...item} />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[var(--color-cyan-400)]/20 blur-[150px] rounded-full scale-75 animate-pulse-glow" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative bg-brand-dark rounded-[4rem] p-12 overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="aspect-square flex flex-col justify-center items-center text-center text-white">
                <div className="text-6xl font-black mb-4">4.8</div>
                <div className="flex gap-1 text-brand-gold mb-6">
                  {[...Array(5)].map((_, i) => <Award key={i} size={24} fill="currentColor" />)}
                </div>
                <div className="text-2xl font-bold mb-2">Google Rating</div>
                <p className="text-white/40">From 10,000+ Students</p>
                
                <div className="grid grid-cols-2 gap-12 mt-12">
                  <div>
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Mentees</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Partners</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
