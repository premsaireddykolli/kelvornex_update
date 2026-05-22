import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Mail, Lock, User, Building, GraduationCap, Calendar, Briefcase, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState('student'); // 'student' or 'entrepreneur'

  const tokenClientRef = useRef(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Registration successful. Redirecting to login view...');

  const handleGoogleLogin = useCallback(async (accessToken) => {
    setError('');
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: accessToken,
          tokenType: 'access_token',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Google registration failed.');
      }

      const data = await response.json();
      console.log('Google auth response:', data);

      if (data.roleSelectionRequired) {
        navigate(`/select-role?token=${data.tempToken}`);
      } else {
        setSuccessMessage('Successfully registered with Google! Logging you in automatically...');
        setSuccess(true);
        setTimeout(() => {
          login(data);
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong during Google registration.');
    }
  }, [login, navigate]);

  useEffect(() => {
    const initGoogle = () => {
      if (window.google) {
        try {
          tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1047648439401-placeholder.apps.googleusercontent.com',
            scope: 'email profile openid',
            callback: async (response) => {
              if (response.error) {
                console.error('Google Auth Error:', response.error);
                setError('Google authentication failed: ' + response.error);
                return;
              }
              if (response.access_token) {
                await handleGoogleLogin(response.access_token);
              }
            },
          });
        } catch (err) {
          console.error('Failed to initialize Google Token Client:', err);
        }
      }
    };

    if (window.google) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initGoogle();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [handleGoogleLogin]);

  const handleGoogleClick = () => {
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken();
    } else {
      setError('Google Sign-In is initializing. Please try again in a moment.');
    }
  };
  
  // Shared fields + role specific fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeName: '',
    yearOfStudy: '1st Year',
    companyName: '',
    industryDomain: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Shared Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('Please fill in all general fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Role-specific Validations
    if (role === 'student') {
      if (!formData.collegeName.trim()) {
        setError('Please enter your college/university name.');
        return;
      }
    } else {
      if (!formData.companyName.trim()) {
        setError('Please enter your company/startup name.');
        return;
      }
      if (!formData.industryDomain.trim()) {
        setError('Please enter your industry domain.');
        return;
      }
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: role.toUpperCase(), // 'student' -> 'STUDENT', 'entrepreneur' -> 'ENTREPRENEUR'
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed. Please try again.');
      }

      setSuccessMessage('Registration successful. Redirecting to login view...');
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong during registration.');
    }
  };

  return (
    <Layout
      title="Create Your Account"
      description="Sign up for Kelvornex: Join as a Student or an Entrepreneur."
      hideBanner={true}
    >
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-6 bg-slate-50/20">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual/Brand Hub */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-6 flex-col justify-center bg-brand-dark rounded-3xl p-12 text-white relative overflow-hidden shadow-xl shadow-brand-dark/10">
            {/* Background gradient & decorative shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-purple/30 opacity-95" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple rounded-full blur-[80px] opacity-25" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-600 rounded-full blur-[80px] opacity-20" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <div className="inline-block bg-white p-2 rounded-2xl mb-8">
                  <img src="/Kelvornex.jpeg" alt="Kelvornex Logo" className="h-10 rounded-xl" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  Empowering Tech Careers & Startups
                </h2>
                <p className="text-white/70 mt-3 text-sm lg:text-base font-light">
                  Join the Kelvornex ecosystem to access elite learning pathways and build real startups.
                </p>
              </div>
              
              <ul className="space-y-4 pt-4 border-t border-white/10">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-purple font-extrabold">✓</span>
                  <span className="text-sm font-semibold text-white/90">Industry-Vetted Cohorts</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-purple font-extrabold">✓</span>
                  <span className="text-sm font-semibold text-white/90">Vetted Tech Talent Pool</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-purple font-extrabold">✓</span>
                  <span className="text-sm font-semibold text-white/90">Direct Mentorship</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Form Hub */}
          <div className="col-span-1 md:col-span-7 lg:col-span-6 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
              
              {/* Success Screen */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Account Created!</h3>
                    <p className="text-gray-500 mt-2 text-sm">
                      {successMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header Title for Form Mobile */}
              <div className="md:hidden text-center mb-6">
                <img src="/Kelvornex.jpeg" alt="Kelvornex Logo" className="h-10 mx-auto mb-3 rounded-xl" />
                <h3 className="text-2xl font-extrabold text-gray-900">Create Account</h3>
              </div>

              {/* Continue with Google button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 rounded-[9999px] py-4 text-sm font-bold text-slate-800 transition-all duration-200 hover:bg-slate-50 cursor-pointer mb-5 shadow-sm"
                onClick={handleGoogleClick}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              {/* OR divider */}
              <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="px-3 text-slate-400 text-xs font-semibold tracking-wider">OR</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

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
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                      placeholder={role === 'student' ? 'jane@university.edu' : 'founder@startup.com'}
                    />
                  </div>
                </div>

                {/* Dynamic Fields - Student */}
                {role === 'student' && (
                  <>
                    {/* College Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        College / University Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-400">
                          <GraduationCap size={16} />
                        </span>
                        <input
                          type="text"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                          placeholder="Stanford University"
                        />
                      </div>
                    </div>

                    {/* Year of Study */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        Current Year of Study
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-400">
                          <Calendar size={16} />
                        </span>
                        <select
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple appearance-none"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Post-Grad / PhD">Post-Grad / PhD</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Dynamic Fields - Entrepreneur */}
                {role === 'entrepreneur' && (
                  <>
                    {/* Company / Startup Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        Company / Startup Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-400">
                          <Building size={16} />
                        </span>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    {/* Industry Domain */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        Industry Domain
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-400">
                          <Briefcase size={16} />
                        </span>
                        <input
                          type="text"
                          name="industryDomain"
                          value={formData.industryDomain}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                          placeholder="SaaS / AI / Fintech"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-purple text-white font-bold py-3.5 rounded-2xl hover:bg-brand-purple/95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-purple/20 mt-2"
                >
                  Create {role === 'student' ? 'Student' : 'Entrepreneur'} Account <ArrowRight size={16} />
                </button>
              </form>

              {/* Footer Redirect Toggle */}
              <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-purple font-bold hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Signup;
