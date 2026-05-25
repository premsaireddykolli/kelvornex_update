const Partners = () => {
  const partners = [
    { name: 'Razorpay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg' },
    { name: 'Zerodha', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Zerodha_logo.svg' },
    { name: 'Boat', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Boat_logo.svg' },
    { name: 'Rapido', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Rapido_logo.svg' },
    { name: 'Cars24', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Cars24_logo.svg' },
    { name: 'Khatabook', logo: 'https://logo.clearbit.com/khatabook.com' },
    { name: 'PhonePe', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg' },
    { name: 'Zomato', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  ];

  const certifications = [
    {
      name: 'Skill India',
      tag: 'Govt. Recognized',
      desc: 'National campaign to create empowerment through technical skill development.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Skill_India_logo.png'
    },
    {
      name: 'NSDC',
      tag: 'National Body',
      desc: 'National Skill Development Corporation certified programs for career readiness.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/3c/NSDC_logo.png'
    },
    {
      name: 'Startup India',
      tag: 'Govt. Initiative',
      desc: 'Department for Promotion of Industry and Internal Trade (DPIIT) recognized training partner.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Startup_India_logo.svg/1200px-Startup_India_logo.svg.png'
    },
    {
      name: 'Microsoft Certified',
      tag: 'Industry Standard',
      desc: 'Global curriculum standards verified by industry leader Microsoft.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
    }
  ];

  return (
    <div className="py-24 bg-white overflow-hidden relative border-y border-slate-100">
      <div className="container mx-auto px-6 mb-16 text-center max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-tight font-sans">
          Hire talent that <span style={{ color: '#1A73E8' }}>stands out!</span>
        </h2>
        <p className="text-slate-800 font-semibold font-sans">Our students are placed in top companies worldwide</p>
      </div>
      
      {/* Hiring Partners Marquee */}
      <div className="group mb-24 relative flex overflow-hidden">
        <div className="flex w-max animate-marquee flex-nowrap group-hover:pause-marquee items-center">
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className="mx-10 flex flex-col items-center justify-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-32">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 w-full object-contain" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://ui-avatars.com/api/?name=${partner.name}&background=random&color=fff&rounded=true`;
                }}
              />
              <span className="font-extrabold text-slate-700 text-[11px] tracking-wider uppercase text-center font-sans">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 text-[10px] font-bold uppercase tracking-widest border border-[#1A73E8]/20"
            style={{ background: 'rgba(26,115,232,0.06)', color: '#1A73E8' }}
          >
            Verified Credentials
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-tight font-sans">
            Official Certification Partners
          </h3>
          <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed">
            All our specialized technical and internship programs are ratified and certified in partnership with global tech giants and national skill development bodies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => {
            const isMicrosoft = cert.name.toLowerCase().includes('microsoft');
            return (
              <div 
                key={i} 
                className="bg-white p-8 border border-slate-200 hover:border-[#1A73E8] hover:shadow-[10px_10px_0px_rgba(26,115,232,0.06)] transition-all duration-300 flex flex-col justify-between h-full relative group rounded-none"
              >
                <div>
                  {/* Logo container */}
                  <div className="h-16 flex items-center justify-start mb-6">
                    <img 
                      src={cert.logo} 
                      alt={cert.name} 
                      className={`h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${isMicrosoft ? '' : 'filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100'}`} 
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150?text=${cert.name}`;
                      }}
                    />
                  </div>

                  {/* Tag */}
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#1A73E8] bg-[#1A73E8]/5 px-2 py-0.5 border border-[#1A73E8]/10 rounded-none">
                    {cert.tag}
                  </span>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-black mt-4 mb-2 tracking-tight">
                    {cert.name}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-800 text-xs leading-relaxed font-medium">
                    {cert.desc}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="w-1.5 h-1.5 bg-[#34A853] rounded-full" />
                  <span>Active Partner</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .pause-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Partners;
