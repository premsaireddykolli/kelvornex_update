import { motion } from 'framer-motion';
import { Zap, Crown, CheckCircle, ArrowRight } from 'lucide-react';

const PackCard = ({ title, courses, features, highlight }) => (
  <motion.div 
    whileHover={{ y: -5, scale: highlight ? 1.01 : 1 }}
    className={`relative p-8 rounded-3xl border overflow-hidden transition-all duration-300 ${
      highlight 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border-indigo-500/20 shadow-[0_15px_40px_rgba(79,70,229,0.12)]' 
        : 'bg-white border-slate-100 hover:border-slate-200/80 shadow-md hover:shadow-xl hover:shadow-slate-100/50'
    }`}
  >
    {highlight && <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2 rounded-bl-3xl font-bold text-xs uppercase tracking-widest shadow-lg">Most Exclusive</div>}
    
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${highlight ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-100/50'}`}>
      {highlight ? <Crown size={30} /> : <Zap size={30} />}
    </div>
    
    <h3 className={`text-2xl font-bold font-sans mb-2 ${highlight ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
    <p className={`text-xs mb-8 font-semibold tracking-wider uppercase ${highlight ? 'text-cyan-400' : 'text-slate-500'}`}>{courses}</p>
    
    <ul className="space-y-4 mb-10">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium">
          <CheckCircle size={18} className={highlight ? 'text-cyan-400' : 'text-indigo-650'} />
          <span className={highlight ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-2.5 rounded font-medium transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-[1px] active:scale-[0.98] border shadow-sm ${
      highlight 
        ? 'bg-brand-gold hover:bg-brand-gold-dark text-slate-950 border-brand-gold hover:shadow-brand-gold/10' 
        : 'bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 text-white border-slate-900 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20'
    }`}>
      Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const ProPacks = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 font-sans">
            Discover Value <span className="text-brand-purple">Packs</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-sans">
            Get premium access to multiple diverse courses with life-time validity and industry-recognized certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PackCard 
            title="Golden Pass"
            courses="AN EXCLUSIVE COURSE ACCESS"
            features={["20+ Diverse Domain", "Life-Time Access", "Direct Mentorship", "Premium Support"]}
            highlight={true}
          />
          <PackCard 
            title="MBA Lite"
            courses="7+ Diverse Business Domain"
            features={["10+ Portfolio Projects", "5+ Certification", "Live Classes", "Internship Opportunities"]}
          />
          <PackCard 
            title="Tech Starter"
            courses="12+ Diverse Diverse Domain"
            features={["10+ Portfolio Projects", "5+ Certification", "Live Classes", "Internship Opportunities"]}
          />
          <PackCard 
            title="Make Your Own"
            courses="23+ Diverse Domain"
            features={["Customize Your Path", "Flexible Learning", "Industry Certification", "Career Guidance"]}
          />
        </div>

        {/* Banner callout */}
        <div className="mt-20 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 rounded-3xl p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="max-w-2xl relative z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 font-sans">Get premium Access to 20+ Courses</h3>
            <p className="text-white/90 font-normal text-lg font-sans">Invest in your future with our all-in-one lifetime access pass.</p>
          </div>
          <button className="relative z-10 bg-slate-900 border border-slate-900 text-white px-8 py-3 rounded font-medium text-base hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200 cursor-pointer">
            Explore Gold
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProPacks;
