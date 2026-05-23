import { motion } from 'framer-motion';
import { Video, Award, UserCheck, Briefcase, HelpCircle, Users } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-200 transition-all duration-300 group hover:-translate-y-[2px]"
  >
    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-550 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 border border-slate-200/50">
      <Icon size={28} />
    </div>
    <h4 className="text-lg font-bold text-slate-800 font-sans leading-snug">{title}</h4>
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
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 leading-tight font-sans">
              Why Choose <span className="text-brand-purple">Corizo?</span>
            </h2>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-sm font-semibold text-slate-550 uppercase tracking-wider">Learning Challenges</span>
              <div className="h-px w-12 bg-slate-300" />
              <span className="text-sm font-semibold text-brand-purple uppercase tracking-wider">How we encounter</span>
            </div>
            
            <p className="text-slate-655 text-lg mb-12 max-w-xl font-sans font-light">
              We bridge the gap between classroom learning and industry requirements by providing real-world experience and mentorship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenges.map((item, i) => (
                <FeatureItem key={i} {...item} />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-cyan-400/10 blur-[150px] rounded-full scale-75 animate-pulse-glow" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative bg-slate-900 rounded-3xl p-12 overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-800"
            >
              <div className="aspect-square flex flex-col justify-center items-center text-center text-white">
                <div className="text-6xl font-black mb-4 font-sans">4.8</div>
                <div className="flex gap-1 text-brand-gold mb-6">
                  {[...Array(5)].map((_, i) => <Award key={i} size={24} fill="currentColor" />)}
                </div>
                <div className="text-2xl font-bold mb-2 font-sans">Google Rating</div>
                <p className="text-white/40 text-sm font-sans">From 10,000+ Students</p>
                
                <div className="grid grid-cols-2 gap-12 mt-12">
                  <div>
                    <div className="text-3xl font-bold font-sans">50K+</div>
                    <div className="text-xs text-white/40 uppercase font-medium tracking-wider mt-1 font-sans">Mentees</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-sans">500+</div>
                    <div className="text-xs text-white/40 uppercase font-medium tracking-wider mt-1 font-sans">Partners</div>
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
