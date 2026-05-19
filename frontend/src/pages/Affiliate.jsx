import React, { useState } from 'react';
import Layout from '../components/Layout';
import { DollarSign, ShieldCheck, Share2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Affiliate = () => {
  const [formData, setFormData] = useState({ name: '', email: '', website: '', strategy: '' });
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setApplied(true);
  };

  const steps = [
    { icon: <Share2 className="text-blue-500" />, title: "1. Share Link", desc: "Access custom tracking links to share Kelvornex cohorts with your audience or students." },
    { icon: <Users className="text-violet-500" />, title: "2. Refer Learners", desc: "Learners click your link and enroll in any of our industry-vetted courses or advanced programs." },
    { icon: <DollarSign className="text-emerald-500" />, title: "3. Earn Commissions", desc: "Receive up to a 15% recurring payout for each successful enrollment referred through your channel." }
  ];

  return (
    <Layout
      title="Kelvornex Affiliate Program"
      subtitle="Partner with a leading upskilling platform and earn recurring commissions on student referrals."
      description="Kelvornex Affiliate: Join our affiliate network and promote elite courses to earn payouts."
    >
      <div className="space-y-20 max-w-5xl mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 font-display">Grow With Kelvornex</h2>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              Do you run a technical blog, manage a community of tech students, or curate resource lists? Partner with Kelvornex and help your audience unlock access to elite mentorship.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              We provide ready-to-use marketing creatives, personal dashboard trackers, and timely monthly payouts directly to your bank account.
            </p>
          </div>
          <div className="bg-brand-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl text-center flex flex-col justify-center items-center aspect-video">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="w-16 h-16 bg-brand-purple/20 text-brand-purple rounded-2xl flex items-center justify-center mb-4 border border-brand-purple/30">
              <DollarSign size={36} />
            </div>
            <h3 className="text-4xl font-extrabold font-display">Up to 15%</h3>
            <p className="text-white/60 text-sm mt-1">Commission per successful cohort signup</p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto">
          {applied ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Thank you for applying to the Kelvornex Affiliate Program. Our partnership team will review your application and send dashboard credentials within 3 business days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleApply} className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Join the Program</h3>
                <p className="text-sm text-gray-500">Fill in the form below to apply as a referral partner.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Website / Social Channel Link</label>
                <input
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                  placeholder="https://myblog.com or https://youtube.com/mychannel"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Promotion Strategy</label>
                <textarea
                  rows={3}
                  value={formData.strategy}
                  onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple resize-none"
                  placeholder="Tell us briefly how you plan to share Kelvornex courses with your audience..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-purple text-white font-bold py-4 rounded-xl hover:bg-brand-purple/90 transition-all cursor-pointer shadow-lg shadow-brand-purple/20"
              >
                Submit Partnership Application
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Affiliate;
