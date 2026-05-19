import React from 'react';
import { motion } from 'framer-motion';

const Headlines = () => {
  const news = [
    "Kelvornex partners with NSDC for skill development",
    "Over 50 students placed in top MNCs this quarter",
    "New AI & ML advanced certification launched",
    "Hiring drive with Amazon and Google coming soon",
    "Kelvornex featured in top ed-tech startups 2025",
  ];

  return (
    <div className="bg-gray-50 py-16 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Kelvornex Is Making <span className="text-brand-purple">Headlines</span>
        </h2>
      </div>
      
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20"
        >
          {[...news, ...news].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight hover:text-brand-purple transition-colors cursor-default">
              <span className="w-3 h-3 bg-brand-purple rounded-full shadow-[0_0_10px_rgba(130,36,227,0.5)]" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Headlines;
