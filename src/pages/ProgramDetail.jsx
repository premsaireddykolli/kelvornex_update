import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, BookOpen, GraduationCap, PlayCircle, Star, Users } from 'lucide-react';

const ProgramDetail = () => {
  const { programId, cat } = useParams();
  
  // Format the ID for display
  const rawTitle = programId || cat || 'Program';
  const title = rawTitle
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      {/* Hero Section of Detail Page */}
      <div className="bg-brand-dark text-white py-20 relative overflow-hidden mt-[-120px] pt-[150px] mb-20 rounded-b-[3rem]">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Programs
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 border border-brand-gold/30">
                Premium Certification
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 leading-tight">
                Master {title}
              </h1>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Comprehensive curriculum designed by industry experts. Take your career to the next level with hands-on projects and 1-on-1 mentorship.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-2 text-brand-gold font-bold">
                  <Star fill="currentColor" size={20} /> 4.8 Rating
                </div>
                <div className="flex items-center gap-2 text-white/80 font-bold">
                  <Users size={20} className="text-brand-purple-light" /> 10k+ Enrolled
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-brand-purple text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-purple-light transition-colors flex items-center justify-center gap-2">
                  Enroll Now <GraduationCap size={20} />
                </button>
                <button className="border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-brand-dark transition-colors flex items-center justify-center gap-2">
                  Watch Preview <PlayCircle size={20} />
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="glass-dark rounded-3xl p-8 border border-white/10">
                <div className="aspect-video bg-black/50 rounded-2xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" alt="Course Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
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
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <CheckCircle className="text-brand-purple shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <h2 className="text-3xl font-bold font-display text-gray-900 mb-8">Curriculum</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((module) => (
                <div key={module} className="border border-gray-200 rounded-2xl p-6 hover:border-brand-purple transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-purple transition-colors">Module {module}: Fundamentals & Basics</h3>
                    <span className="text-sm font-bold text-gray-400">2 Weeks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Details</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-purple shadow-sm">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Duration</p>
                    <p className="font-bold text-gray-800">8-12 Weeks</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-purple shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Level</p>
                    <p className="font-bold text-gray-800">Beginner to Advanced</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">Limited seats available for the next batch</p>
                <button className="w-full bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;

