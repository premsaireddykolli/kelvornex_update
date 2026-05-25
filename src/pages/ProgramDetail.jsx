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
    <div className="pt-32 pb-20 min-h-screen bg-white">
      {/* Hero Section of Detail Page */}
      <div className="bg-brand-dark text-white py-20 relative overflow-hidden mt-[-120px] pt-[150px] mb-20 rounded-none border-b border-slate-800">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Programs
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 border border-brand-gold/30">
                Premium Certification
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 leading-tight">
                Master {title}
              </h1>
              <p className="text-white/85 text-base sm:text-lg mb-8 leading-relaxed font-medium">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-2 text-brand-gold font-bold">
                  <Star fill="currentColor" size={20} /> 4.8 Rating
                </div>
                <div className="flex items-center gap-2 text-white/90 font-bold">
                  <Users size={20} className="text-brand-purple-light" /> 10k+ Enrolled
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/checkout/${program.id}`} className="bg-brand-purple text-white px-8 py-4 rounded font-bold hover:bg-brand-purple-light transition-all flex items-center justify-center gap-2">
                  Enroll Now <GraduationCap size={20} />
                </Link>
                <button
                  onClick={() => {
                    addToCart(program);
                    window.dispatchEvent(new Event('open-cart'));
                  }}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded font-bold transition-all flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="glass-dark rounded p-8 border border-white/10">
                <div className="aspect-video bg-black/50 rounded overflow-hidden relative group">
                  <img src={image} alt="Course Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-purple transition-colors">
                      <PlayCircle size={32} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold font-display text-gray-900 mb-8">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {[
                "Understand the core principles and fundamentals.",
                "Build real-world projects from scratch.",
                "Best practices and industry standards.",
                "Advanced techniques and optimizations.",
                "Interview preparation and resume building.",
                "Access to exclusive alumni network."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded bg-gray-50 border border-gray-100">
                  <CheckCircle className="text-brand-purple shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold font-display text-gray-900 mb-8">Curriculum</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((module) => (
                <div key={module} className="border border-gray-200 rounded p-6 hover:border-brand-purple transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-purple transition-colors">Module {module}: Fundamentals & Basics</h3>
                    <span className="text-sm font-bold text-gray-400">2 Weeks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gray-50 rounded p-8 border border-gray-200 shadow-xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Details</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-brand-purple shadow-sm border border-slate-100">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Duration</p>
                    <p className="font-bold text-gray-800">{duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-brand-purple shadow-sm border border-slate-100">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Level</p>
                    <p className="font-bold text-gray-800">{level}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Course Price</span>
                  <span className="text-3xl font-black text-gray-900 font-display">₹{price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">Limited seats available for the next batch</p>
                <div className="flex flex-col gap-3">
                  <Link
                    to={`/checkout/${program.id}`}
                    className="w-full bg-brand-dark text-white py-4 rounded font-bold text-lg hover:bg-gray-800 transition-colors block text-center shadow-lg"
                  >
                    Apply Now
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(program);
                      window.dispatchEvent(new Event('open-cart'));
                    }}
                    className="w-full bg-white border-2 border-brand-purple text-brand-purple py-4 rounded font-bold text-lg hover:bg-brand-purple/5 transition-colors"
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
