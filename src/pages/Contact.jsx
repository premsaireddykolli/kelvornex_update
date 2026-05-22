import { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <Layout
      title="Contact Kelvornex"
      subtitle="Have questions about our programs? Get in touch with our admissions and support teams."
      description="Contact Kelvornex: Reach out to our learning advisors and technical support for help."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 font-display">Get in Touch</h2>
            <p className="text-gray-500 leading-relaxed">
              Whether you are an aspiring learner or looking for enterprise training solutions, we are here to assist you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-xl shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email Support</h4>
                <p className="text-sm text-gray-500">support@kelvornex.com</p>
                <p className="text-sm text-gray-500">admissions@kelvornex.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-xl shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Phone Support</h4>
                <p className="text-sm text-gray-500">+91 (80) 4123-5678</p>
                <p className="text-sm text-gray-500">Mon - Sat, 10 AM to 7 PM IST</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-xl shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Corporate HQ</h4>
                <p className="text-sm text-gray-500">HustleHub, 19th Main Rd, Sector 4</p>
                <p className="text-sm text-gray-500">HSR Layout, Bengaluru, KA - 560102</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Thank you for reaching out. A learning advisor will get back to you within 24 business hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                className="text-brand-purple font-bold text-sm hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                  placeholder="Query regarding Web Development cohort"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple resize-none"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-purple text-white font-bold py-4 rounded-xl hover:bg-brand-purple/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-purple/20"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
