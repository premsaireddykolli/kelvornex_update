import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getCatalogList } from '../utils/courseCatalog';

const ProgramCard = ({ id, title, description, price, originalPrice, image }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-none border border-slate-200 hover:border-[#1A73E8] hover:shadow-[10px_10px_0px_rgba(26,115,232,0.06)] transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      <Link to={`/${id}`} className="absolute inset-0 z-10" />
      <div>
        {/* Course Image Header */}
        <div className="aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-200">
          <img
            src={image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={title}
          />
        </div>

        <div className="p-8 pb-0">
          {/* Category */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A73E8]">
              Internship Program
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold mb-4 text-black tracking-tight">{title}</h3>
          <p className="text-slate-800 text-sm leading-relaxed mb-8 font-medium">{description}</p>
        </div>
      </div>

      <div className="p-8 pt-0">
        {/* Pricing */}
        <div className="flex items-baseline gap-2.5 mb-5 pt-5 border-t border-slate-100">
          <span className="text-3xl font-black text-black">₹{price}/-</span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through">₹{originalPrice}/-</span>
          )}
        </div>

        {/* Benefits List */}
        <div className="flex flex-col gap-2 mb-8 text-xs sm:text-[13px] text-slate-700 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full shrink-0" />
            <span>3 Months In-Depth Training</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full shrink-0" />
            <span>Internship Offer Letter Included</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full shrink-0" />
            <span>Capstone Live Project Work</span>
          </div>
        </div>

        {/* Action Link */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A73E8] border-b-2 border-[#1A73E8]/35 pb-0.5 transition-all">
          Explore Program <ArrowRight size={14} className="ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

const Programs = () => {
  const programs = getCatalogList();

  return (
    <section id="programs" className="py-32 bg-white relative border-t border-slate-100 overflow-hidden">
      {/* Grid Background Element (Subtle black grid on white bg) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sectionGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000000" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sectionGrid)" />
        </svg>
      </div>

      {/* Geometric Thin Construction Lines (Faint Black/Grey) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#000000" strokeWidth="0.5" strokeDasharray="5,5" />
          <line x1="0%" y1="0" x2="100%" y2="100%" stroke="#000000" strokeWidth="0.5" />
          <circle cx="15%" cy="20%" r="90" fill="none" stroke="#000000" strokeWidth="0.5" />
          <circle cx="85%" cy="75%" r="120" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,3" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black tracking-tight font-sans">
            Our Technical <span className="text-[#1A73E8]">Programs</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
            All programs include an official Internship Offer Letter, 3 Months of Training, and a Live Capstone Project to build your career.
          </p>
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog) => (
            <ProgramCard key={prog.id} {...prog} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Programs;
