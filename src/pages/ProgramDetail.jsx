import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, BookOpen, GraduationCap, PlayCircle, Star, Users } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProgramDetails } from '../utils/courseCatalog';

const ProgramDetail = () => {
  const { programId } = useParams();
  const { addToCart } = useCart();

  const program = getProgramDetails(programId);
  const { title, description, duration, level, image, price } = program;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white font-sans">
      {/* Hero Section of Detail Page (Cohesive with Homepage Hero) */}
      <div className="relative py-20 overflow-hidden bg-white border-b border-slate-200 mb-20 min-h-[500px] flex items-center">
        
        {/* Dynamic Background Image on the right half (desktop only) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] z-0 bg-cover bg-no-repeat hidden lg:block"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundPosition: 'center'
          }}
        >
          {/* Smooth gradient fade overlay to blend the image into the white background on the left */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 10%, rgba(255, 255, 255, 0.7) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)'
            }}
          />
        </div>

        {/* Architectural Blueprint Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="detailGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000000" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#detailGrid)" />
          </svg>
        </div>

        {/* Diagonal Thin Construction Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#000000" strokeWidth="0.5" strokeDasharray="5,5" />
            <circle cx="85%" cy="50%" r="180" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,3" />
            <circle cx="15%" cy="30%" r="70" fill="none" stroke="#000000" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-black font-bold mb-8 transition-colors">
            <ArrowLeft size={18} /> Back to Programs
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side Course Details */}
            <div className="w-full lg:w-[50%] text-left z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 leading-tight text-black tracking-tight">
                Master <span className="text-[#1A73E8]">{title}</span>
              </h1>
              <p className="text-slate-655 text-base sm:text-lg mb-8 leading-relaxed font-medium">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-10 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2 text-black font-bold text-sm">
                  <Star fill="currentColor" size={16} className="text-[#FBBC05]" /> 4.8 Rating
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <Users size={16} className="text-black" /> 10k+ Enrolled Learners
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/checkout/${program.id}`} className="bg-black hover:bg-transparent border-2 border-black text-white hover:text-black px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase shadow-lg shadow-black/10">
                  Enroll Now <GraduationCap size={20} />
                </Link>
                <button
                  onClick={() => {
                    addToCart(program);
                    window.dispatchEvent(new Event('open-cart'));
                  }}
                  className="bg-white hover:bg-black border-2 border-black text-black hover:text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold font-display text-gray-900 mb-8 tracking-tight">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {[
                "Understand the core principles and fundamentals.",
                "Build real-world projects from scratch.",
                "Best practices and industry standards.",
                "Advanced techniques and optimizations.",
                "Interview preparation and resume building.",
                "Access to exclusive alumni network."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-none bg-slate-50/50 border border-slate-200 hover:border-black transition-colors duration-300">
                  <CheckCircle className="text-black shrink-0 mt-1" size={20} />
                  <span className="text-slate-800 font-semibold text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-extrabold font-display text-gray-900 mb-8 tracking-tight">Curriculum</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((module) => (
                <div key={module} className="border border-slate-200 rounded-none p-6 hover:border-black hover:shadow-[6px_6px_0px_rgba(0,0,0,0.03)] transition-all cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-black transition-colors">Module {module}: Fundamentals &amp; Basics</h3>
                    <span className="text-sm font-bold text-slate-400">2 Weeks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-none p-8 border border-slate-200 shadow-xl shadow-slate-100/50 hover:shadow-[10px_10px_0px_rgba(0,0,0,0.03)] transition-all duration-300">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 font-display tracking-tight">Program Details</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-black shadow-sm border border-slate-100 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Duration</p>
                    <p className="font-bold text-gray-800">{duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-black shadow-sm border border-slate-100 shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Level</p>
                    <p className="font-bold text-gray-800">{level}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Course Price</span>
                  <span className="text-3xl font-black text-gray-900 font-display">₹{price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 font-medium">Limited seats available for the next batch</p>
                <div className="flex flex-col gap-3">
                  <Link
                    to={`/checkout/${program.id}`}
                    className="w-full bg-black hover:bg-transparent border-2 border-black text-white hover:text-black py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all block text-center shadow-lg shadow-black/10 cursor-pointer"
                  >
                    Apply Now
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(program);
                      window.dispatchEvent(new Event('open-cart'));
                    }}
                    className="w-full bg-white border-2 border-black text-black hover:bg-black hover:text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
