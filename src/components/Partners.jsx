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
    { name: 'Skill India', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Skill_India_logo.png' },
    { name: 'NSDC', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3c/NSDC_logo.png' },
    { name: 'Startup India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Startup_India_logo.svg/1200px-Startup_India_logo.svg.png' },
    { name: 'Microsoft Certified', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  ];

  return (
    <div className="py-24 bg-white overflow-hidden relative border-y border-slate-100">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-sans">
          Hire talent that <span className="text-brand-purple">stands out!</span>
        </h2>
        <p className="text-slate-655 font-medium font-sans">Our students are placed in top companies worldwide</p>
      </div>
      
      {/* Hiring Partners Marquee */}
      <div className="group mb-20 relative flex overflow-hidden">
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
              <span className="font-semibold text-slate-500 text-xs tracking-wider uppercase text-center font-sans">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="container mx-auto px-6">
        <div className="bg-slate-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100">
          <div className="max-w-md font-sans">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Official Certifications</h3>
            <p className="text-slate-655 leading-relaxed text-base font-light">Get certified by industry leaders and government bodies to validate your skills.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center justify-center">
                <img 
                  src={cert.logo} 
                  alt={cert.name} 
                  className="h-12 md:h-16 w-auto object-contain drop-shadow-sm transition-transform hover:scale-110" 
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/150?text=${cert.name}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      
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
