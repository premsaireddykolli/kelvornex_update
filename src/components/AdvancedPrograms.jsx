import { motion } from 'framer-motion';
import { Download, ExternalLink, Users, Clock, ShieldCheck } from 'lucide-react';

const AdvancedCard = ({ title, tag, description, mentees, duration, logos, image }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/30 transition-all duration-300 flex flex-col lg:flex-row gap-12 group hover:-translate-y-[2px]"
  >
    <div className="lg:w-2/3">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-3xl md:text-4xl font-extrabold font-sans text-slate-800">{title}</h3>
        <span className="bg-brand-gold text-brand-dark px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">{tag}</span>
      </div>
      
      <p className="text-slate-655 text-base leading-relaxed mb-8 max-w-2xl font-sans">
        {description}
      </p>

      <div className="mb-10 rounded-2xl overflow-hidden aspect-[21/9] bg-slate-50 border border-slate-100">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
      </div>
      
      <div className="flex flex-wrap gap-8 mb-12">
        <div className="flex items-center gap-2 text-slate-500 font-medium uppercase text-xs tracking-wider font-sans">
          <Clock size={18} className="text-brand-purple" />
          {duration}
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-medium uppercase text-xs tracking-wider font-sans">
          <Users size={18} className="text-brand-purple" />
          {mentees} Mentees
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-slate-900/10 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer text-sm border border-slate-900">
          View Details <ExternalLink size={16} />
        </button>
        <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-2.5 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer text-sm">
          Download Brochure <Download size={16} />
        </button>
      </div>
    </div>
    
    <div className="lg:w-1/3 bg-slate-50/50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Certification From</p>
        <div className="flex flex-wrap justify-center gap-6">
          {logos.map((logo, i) => (
            <img 
              key={i} 
              src={logo} 
              alt="Partner" 
              className="h-10 w-auto object-contain" 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://logo.clearbit.com/microsoft.com"; // highly reliable fallback
              }}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-slate-200/60 my-6" />
      <div className="flex items-center gap-3 text-brand-purple font-semibold">
        <ShieldCheck size={24} />
        <span>Industry Ratified</span>
      </div>
    </div>
  </motion.div>
);

const AdvancedPrograms = () => {
  return (
    <section className="py-32 bg-gray-50/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl font-sans">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
              Advanced <span className="text-brand-purple">Programs</span>
            </h2>
            <p className="text-slate-655 text-lg">
              Long-term, intensive certification programs designed for deep expertise and career transformation.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <AdvancedCard 
            title="Digital Marketing"
            tag="Trending"
            description="Boost your online presence and engage with your audience effectively. Learn strategies to drive traffic, increase conversions, and grow your brand from scratch."
            duration="6 Months"
            mentees="20k+"
            logos={["https://upload.wikimedia.org/wikipedia/en/c/c5/Skill_India_logo.png", "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"]}
            image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80"
          />
          <AdvancedCard 
            title="Data Science"
            tag="Popular"
            description="Master Data Science to unlock valuable insights from data and make informed decisions. Gain expertise in data analysis, machine learning, and predictive modeling."
            duration="6 Months"
            mentees="20k+"
            logos={["https://upload.wikimedia.org/wikipedia/en/3/3c/NSDC_logo.png", "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"]}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvancedPrograms;
