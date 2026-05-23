import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
      
      {/* Soft pastel blur elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple blur-[150px] rounded-full opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600 blur-[150px] rounded-full opacity-10 animate-float" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-400 blur-[200px] rounded-full opacity-5 animate-float" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-655 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
            </span>
            India's Most Trusted Learning Platform
          </span>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 text-slate-900 tracking-tight font-sans"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Upskill</motion.span>{" "}
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">To</motion.span>{" "}
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">The</motion.span> <br />
            <motion.span variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } } }} className="text-slate-900 inline-block font-black relative">
              Top 1%
              <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-brand-purple/20 rounded animate-pulse" />
            </motion.span> <br /> 
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">With</motion.span>{" "}
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block text-brand-purple">Expert-Led</motion.span>{" "}
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Programs</motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-slate-655 max-w-2xl mx-auto mb-12 leading-relaxed font-light font-sans"
          >
            From classroom to career, we prepare you with practical learning designed for today's Competitive Market.
          </motion.p>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#programs" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-slate-900/10 hover:-translate-y-[1px] active:scale-[0.98] flex items-center gap-2 group border border-slate-900 hover:border-slate-800"
            >
              Explore Programs
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button className="flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium transition-all duration-200 active:scale-[0.98] group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-400 group-hover:bg-slate-50 transition-all duration-200">
                <Play size={18} className="text-slate-700" fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </div>
        </motion.div>
        
        {/* Hero Image/Mockup Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 overflow-hidden shadow-xl shadow-slate-100/50">
            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group border border-slate-200/50">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
                alt="Corizo Learning" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
