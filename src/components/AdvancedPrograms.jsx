import { motion } from 'framer-motion';
import { Download, ExternalLink, Users, Clock, ShieldCheck } from 'lucide-react';

const AdvancedCard = ({ title, tag, description, mentees, duration, logos, image }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col lg:flex-row gap-12 group"
  >
    <div className="lg:w-2/3">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-3xl md:text-5xl font-extrabold font-display text-gray-900">{title}</h3>
        <span className="bg-brand-gold text-brand-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{tag}</span>
      </div>
      
      <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl">
        {description}
      </p>

      <div className="mb-10 rounded-3xl overflow-hidden aspect-[21/9] bg-gray-100 shadow-inner">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
      </div>
      
      <div className="flex flex-wrap gap-8 mb-12">
        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs tracking-wider">
          <Clock size={18} className="text-brand-purple" />
          {duration}
        </div>
        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs tracking-wider">
          <Users size={18} className="text-brand-purple" />
          {mentees} Mentees
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-brand-purple text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-purple-dark transition-all">
          View Details <ExternalLink size={18} />
        </button>
        <button className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 hover:text-white transition-all">
          Download Brochure <Download size={18} />
        </button>
      </div>
    </div>
    
    <div className="lg:w-1/3 bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Certification From</p>
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
      <div className="w-full h-px bg-gray-200 my-6" />
      <div className="flex items-center gap-3 text-brand-purple font-bold">
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
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight text-gray-900">
              Advanced <span className="text-brand-purple">Programs</span>
            </h2>
            <p className="text-gray-500 text-lg">
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
