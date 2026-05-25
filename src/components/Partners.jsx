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

  const certification = {
    name: 'Microsoft Certified Partner',
    tag: 'Official Education Partner',
    desc: 'Our specialized technical programs and curriculum align with Microsoft standards. Students receive industry-ratified validation recognized by technology companies globally.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    benefits: [
      'Microsoft Curriculum Standards Alignment',
      'Globally Recognized Career Credentials',
      'Official Industry-Vetted Project Work',
      'Direct Path to Advanced Technical Roles'
    ]
  };

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
        <div className="bg-white p-8 md:p-12 border border-slate-200 hover:border-[#1A73E8] hover:shadow-[10px_10px_0px_rgba(26,115,232,0.06)] transition-all duration-300 rounded-none flex flex-col md:flex-row items-center justify-between gap-12 relative group">
          
          {/* Left side: Large Logo and Badges */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest border border-[#1A73E8]/20 bg-[#1A73E8]/5 text-[#1A73E8] rounded-none">
              Official Partner
            </span>
            <div className="h-16 flex items-center justify-center md:justify-start mb-6">
              <img 
                src={certification.logo} 
                alt={certification.name} 
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                onError={(e) => {
                  e.target.src = `https://logo.clearbit.com/microsoft.com`;
                }}
              />
            </div>
            <h4 className="text-xl font-bold text-black tracking-tight mb-2">
              {certification.name}
            </h4>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Authorized Technical Training
            </p>
          </div>

          {/* Right side: Certification Details and Benefits */}
          <div className="w-full md:w-2/3 font-sans">
            <h3 className="text-2xl md:text-3xl font-extrabold text-black mb-4 tracking-tight">
              Validate your skills with global standards
            </h3>
            <p className="text-slate-800 leading-relaxed text-sm mb-6 font-medium">
              {certification.desc}
            </p>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certification.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                  <span className="w-2 h-2 bg-[#34A853] rounded-full shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Active Status Badge */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span className="w-2.5 h-2.5 bg-[#34A853] rounded-full animate-pulse" />
              <span>Microsoft Certified Curriculum ratifications active</span>
            </div>
          </div>
          
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
