import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Mail, Lock, UserCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // 'student' or 'entrepreneur'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Success simulation
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Layout
      title="Login to Kelvornex"
      subtitle="Access your customized dashboard, expert cohorts, and upskilling roadmap."
      description="Login to Kelvornex: Sign in to your Student or Entrepreneur dashboard."
    >
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
        
        {/* Success Screen */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-6"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Welcome Back!</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Successfully authenticated. Redirecting to dashboard...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role Toggle Switcher */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider text-center mb-3">
            Select Your Profile Role
          </label>
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 relative">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                role === 'student' ? 'text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              I am a Student
            </button>
            <button
              type="button"
              onClick={() => setRole('entrepreneur')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                role === 'entrepreneur' ? 'text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              I am an Entrepreneur
            </button>
            <div
              className={`absolute top-1 bottom-1 rounded-xl bg-brand-purple transition-all duration-300 ${
                role === 'student' ? 'left-1 w-[48%]' : 'left-[51%] w-[48%]'
              }`}
            />
          </div>
        </div>

        {/* Validation Errors */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex gap-3 items-start text-sm"
          >
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                placeholder={role === 'student' ? 'alex@university.edu' : 'founder@mycompany.com'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Password
              </label>
              <a href="#" className="text-xs text-brand-purple hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-purple text-white font-bold py-4 rounded-2xl hover:bg-brand-purple/95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-purple/20"
          >
            Sign In As {role === 'student' ? 'Student' : 'Entrepreneur'} <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Redirect Toggle */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-purple font-bold hover:underline">
              Create one now
            </Link>
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default Login;
