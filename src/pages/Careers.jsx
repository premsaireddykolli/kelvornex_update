import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Briefcase, MapPin, DollarSign, Clock, Users, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Careers = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLoc, setSelectedLoc] = useState('All');
  const [appliedJob, setAppliedJob] = useState(null);

  const departments = ['All', 'Engineering', 'Product', 'Sales & Marketing', 'Education'];
  const locations = ['All', 'Remote', 'Bengaluru', 'Gurugram'];

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer (React/TypeScript)",
      department: "Engineering",
      location: "Bengaluru",
      type: "Full-Time",
      experience: "4-6 Years",
      salary: "₹18-24 LPA",
      description: "Own the development of our student portal, interactive course features, and admin dashboards. Deep expertise in React 19, Tailwind CSS, and state management required."
    },
    {
      id: 2,
      title: "Performance Marketing Manager",
      department: "Sales & Marketing",
      location: "Gurugram",
      type: "Full-Time",
      experience: "3-5 Years",
      salary: "₹12-16 LPA",
      description: "Scale user acquisition across Meta, Google Ads, and LinkedIn. Manage campaigns, lead conversion analysis, and optimize CAC/LTV parameters."
    },
    {
      id: 3,
      title: "Product Manager (Student Experience)",
      department: "Product",
      location: "Remote",
      type: "Full-Time",
      experience: "2-4 Years",
      salary: "₹15-20 LPA",
      description: "Define the roadmap for learning interfaces, mentor interaction touchpoints, and placement portals. Strong product thinking and UX sensitivity expected."
    },
    {
      id: 4,
      title: "Academic Counselor / Sales Associate",
      department: "Education",
      location: "Bengaluru",
      type: "Full-Time",
      experience: "1-3 Years",
      salary: "₹6-8 LPA + Incentives",
      description: "Connect with prospective learners, guide them toward correct upskilling tracks (Advanced cohorts vs Pro Packs), and achieve weekly enrollment goals."
    },
    {
      id: 5,
      title: "Full Stack Development Mentor",
      department: "Education",
      location: "Remote",
      type: "Part-Time / Cohort",
      experience: "3+ Years",
      salary: "₹800 - 1500 / Hour",
      description: "Deliver live weekend lectures, lead interactive coding workshops, and evaluate capstone engineering projects for our advanced cohort tracks."
    }
  ];

  const perks = [
    { title: "Flex Work & Remote", icon: <Users className="text-blue-500" />, desc: "Choose where you work. We support fully remote, hybrid, and office-based structures." },
    { title: "Learning Allowance", icon: <CheckCircle2 className="text-violet-500" />, desc: "Receive a yearly budget for online courses, professional certifications, and text resources." },
    { title: "Health & Wellness", icon: <ShieldAlert className="text-emerald-500" />, desc: "Comprehensive health insurance coverage for employees and their immediate dependents." }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesLoc = selectedLoc === 'All' || job.location === selectedLoc;
    return matchesDept && matchesLoc;
  });

  const handleApply = (jobTitle) => {
    setAppliedJob(jobTitle);
    setTimeout(() => {
      setAppliedJob(null);
    }, 4000);
  };

  return (
    <Layout 
      title="Careers at Kelvornex" 
      subtitle="Shape the future of professional education. Build products, teach learners, and grow with us."
      description="Kelvornex Careers: View job board vacancies, engineering roles, product design openings, mentor posts, and workspace benefits."
    >
      <div className="space-y-20">
        {/* Culture / Perks Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900">Why Work With Us?</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              We are a remote-first, high-growth startup of builders, designers, and educators driven to make upskilling accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((perk, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                  {perk.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{perk.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings Board */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150">
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900">Open Opportunities</h2>
            
            {/* Double Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Dept filter */}
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-brand-purple"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept} Departments</option>
                ))}
              </select>

              {/* Loc filter */}
              <select 
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-brand-purple"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc} Locations</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    key={job.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:border-gray-200 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-4 max-w-3xl">
                      <div className="flex flex-wrap gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-650">
                          {job.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">{job.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-6 text-xs text-gray-400 font-semibold pt-1">
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-purple" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-brand-purple" /> {job.salary}</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-brand-purple" /> {job.experience}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleApply(job.title)}
                      className="bg-brand-purple hover:bg-brand-purple-dark text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Apply Now <ChevronRight size={16} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="font-bold text-lg text-gray-700 mb-1">No open positions found</h3>
                  <p className="text-gray-400 text-sm">Modify your filters to view other exciting career opportunities.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Global Toast Success Message */}
        <AnimatePresence>
          {appliedJob && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 right-8 z-50 bg-brand-dark text-white rounded-2xl p-6 shadow-2xl border border-white/10 max-w-sm flex gap-4 items-start"
            >
              <div className="p-2 bg-emerald-500 rounded-xl text-white shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base">Application Submitted!</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Thank you for applying to the <span className="font-semibold text-brand-gold">{appliedJob}</span> role. Our recruiting team will follow up via email.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Careers;
