import { useState } from 'react';
import Layout from '../components/Layout';
import { Award, Calendar, DollarSign, Users, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ApplyAsMentor = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    expertise: '',
    company: '',
    experience: '',
    bio: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const perks = [
    { title: "Attractive Payouts", icon: <DollarSign className="text-emerald-550" />, desc: "Earn highly competitive hourly rates for live training, project grading, and mock interviews." },
    { title: "Flex Scheduling", icon: <Calendar className="text-blue-550" />, desc: "Select batches and live sessions that fit your corporate calendar. Commit as little as 4 hours/week." },
    { title: "Elite Network", icon: <Award className="text-violet-550" />, desc: "Collaborate and connect with fellow industry experts from Google, Microsoft, Meta, and top unicorn startups." },
    { title: "Community Impact", icon: <Users className="text-pink-550" />, desc: "Directly guide ambitious professionals and shape the next generation of engineers, marketers, and leaders." }
  ];

  const expertiseOptions = [
    "Full Stack Development",
    "Digital Marketing & SEO",
    "Data Science & Machine Learning",
    "UI/UX Product Design",
    "Cyber Security",
    "Product Management"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.expertise) {
      setIsSubmitted(true);
    }
  };

  return (
    <Layout 
      title="Apply as a Mentor" 
      subtitle="Join the elite circles of industry leaders who design curricula, host workshops, and guide students."
      description="Apply as Mentor at Kelvornex: Share your industry experience in software engineering, UI/UX, or digital marketing and get paid for student mentorship."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
        {/* Mentor Info Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-black/5 text-black border border-black/10">
              <Sparkles size={12} strokeWidth={2.5} /> Elite Mentor Network
            </span>
            <h2 className="text-3xl font-extrabold font-display text-gray-900 leading-tight">
              Share your expertise. Shape the future.
            </h2>
            <p className="text-slate-650 leading-relaxed text-sm md:text-base font-medium">
              At Kelvornex, we bring the best minds of the industry directly to the students. Our courses are built and evaluated by working practitioners. If you have a passion for coaching, we'd love to partner with you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {perks.map((perk, idx) => (
              <div key={idx} className="bg-white rounded-none p-6 border border-slate-200 hover:border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,0.05)] transition-all duration-300 flex items-start gap-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg shrink-0">
                  {perk.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-base">{perk.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Box */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-none p-8 md:p-10 border border-slate-200 shadow-xl hover:shadow-[12px_12px_0px_rgba(0,0,0,0.04)] transition-all duration-300 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="mentor-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 pb-4 border-b border-slate-100 font-display">
                    Submit Application
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe" 
                        className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@company.com" 
                        className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210" 
                        className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      />
                    </div>

                    {/* LinkedIn URL */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">LinkedIn URL *</label>
                      <input 
                        type="url" 
                        name="linkedin"
                        required
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/johndoe" 
                        className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Expertise */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Area of Expertise *</label>
                      <select 
                        name="expertise"
                        required
                        value={formData.expertise}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-gray-700"
                      >
                        <option value="">Select Domain</option>
                        {expertiseOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Company & Role */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company &amp; Current Role *</label>
                      <input 
                        type="text" 
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Google, Senior SWE" 
                        className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Years of Relevant Experience *</label>
                    <input 
                      type="text" 
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 5 Years" 
                      className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                    />
                  </div>

                  {/* Short Bio */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tell us about your mentoring motivation *</label>
                    <textarea 
                      name="bio"
                      required
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Briefly tell us why you'd like to mentor on Kelvornex and any previous coaching experience you have..." 
                      className="w-full bg-white border border-slate-250 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black hover:bg-transparent border-2 border-black text-white hover:text-black font-bold py-4 rounded-full transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest uppercase"
                  >
                    Submit Application <ChevronRight size={18} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="mentor-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-black/5 text-black rounded-full flex items-center justify-center mx-auto shadow-sm border border-black/10">
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <div className="space-y-3 max-w-md mx-auto font-sans">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-black font-display">Application Received!</h3>
                    <p className="text-slate-800 text-sm md:text-base leading-relaxed font-semibold">
                      Thank you, <span className="font-extrabold text-[#1A73E8]">{formData.fullName}</span>, for applying to join the Kelvornex Mentor network.
                    </p>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Our academic relationships board will review your credentials and LinkedIn profile. Expect an email invite to a discovery call within 3 to 5 business days.
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        linkedin: '',
                        expertise: '',
                        company: '',
                        experience: '',
                        bio: ''
                      });
                    }}
                    className="bg-black hover:bg-transparent border-2 border-black text-white hover:text-black font-bold px-6 py-3.5 rounded-full transition-all text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyAsMentor;
