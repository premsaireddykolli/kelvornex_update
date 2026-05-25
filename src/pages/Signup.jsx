import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Mail, Lock, User, Building, GraduationCap, Calendar, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      bgClass="bg-white text-black relative overflow-hidden"
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none z-0" />

      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-8 px-6 relative z-10">
        {/* Centered rectangular signup card */}
        <div 
          className="w-full max-w-md bg-white border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 relative z-10"
          style={{ borderRadius: '8px' }}
        >
          {/* Success Screen */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-white border border-[#E2E8F0] z-30 flex flex-col items-center justify-center text-center p-6"
                style={{ borderRadius: '8px' }}
              >
                <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-black font-display">Account Created!</h3>
                <p className="text-slate-500 mt-2 text-sm font-medium">
                  {successMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo with NO outline */}
          <div className="flex justify-center mb-6">
            <img
              src="/Kelvornex.jpeg"
              alt="Kelvornex Logo"
              className="h-10 w-auto rounded-none"
            />
          </div>

          <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-900 font-display">
            Create Account
          </h2>
          <p className="text-center text-xs text-slate-500 mt-1 mb-6 font-medium">
            Join the Kelvornex cohort community
          </p>

          {/* Continue with Google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-full py-3 text-xs font-bold text-slate-800 transition-all duration-200 cursor-pointer shadow-sm mb-4"
            onClick={handleGoogleClick}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          {/* OR divider */}
          <div className="flex items-center mb-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="px-3 text-slate-400 text-[10px] font-bold tracking-wider">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Role Toggle Switcher */}
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider text-center mb-2">
              Select Your Profile Role
            </label>
            <div className="flex bg-white border border-[#E2E8F0] p-1 rounded-full relative">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2 text-xs font-bold transition-all duration-300 relative z-10 cursor-pointer ${
                  role === 'student' ? 'text-white' : 'text-slate-500 hover:text-black'
                }`}
              >
                I am a Student
              </button>
              <button
                type="button"
                onClick={() => setRole('entrepreneur')}
                className={`flex-1 py-2 text-xs font-bold transition-all duration-300 relative z-10 cursor-pointer ${
                  role === 'entrepreneur' ? 'text-white' : 'text-slate-500 hover:text-black'
                }`}
              >
                I am an Entrepreneur
              </button>
              <div
                className={`absolute top-1 bottom-1 rounded-full bg-black transition-all duration-300 ${
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
              className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-650 rounded flex gap-3 items-start text-xs font-medium"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="Jane Doe"
                  style={{ borderRadius: '6px' }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder={role === 'student' ? 'jane@university.edu' : 'founder@startup.com'}
                  style={{ borderRadius: '6px' }}
                />
              </div>
            </div>

            {/* Student fields */}
            {role === 'student' && (
              <>
                {/* College Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    College / University Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <GraduationCap size={16} />
                    </span>
                    <input
                      type="text"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      placeholder="Stanford University"
                      style={{ borderRadius: '6px' }}
                    />
                  </div>
                </div>

                {/* Year of Study */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Current Year of Study
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Calendar size={16} />
                    </span>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black pl-12 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all appearance-none"
                      style={{ borderRadius: '6px' }}
                    >
                      <option value="1st Year" className="bg-white text-black">1st Year</option>
                      <option value="2nd Year" className="bg-white text-black">2nd Year</option>
                      <option value="3rd Year" className="bg-white text-black">3rd Year</option>
                      <option value="4th Year" className="bg-white text-black">4th Year</option>
                      <option value="Post-Grad / PhD" className="bg-white text-black">Post-Grad / PhD</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      ▼
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Entrepreneur fields */}
            {role === 'entrepreneur' && (
              <>
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Company / Startup Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building size={16} />
                    </span>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      placeholder="Acme Corp"
                      style={{ borderRadius: '6px' }}
                    />
                  </div>
                </div>

                {/* Industry Domain */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Industry Domain
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Briefcase size={16} />
                    </span>
                    <input
                      type="text"
                      name="industryDomain"
                      value={formData.industryDomain}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      placeholder="SaaS / AI / Fintech"
                      style={{ borderRadius: '6px' }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="••••••••"
                  style={{ borderRadius: '6px' }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="••••••••"
                  style={{ borderRadius: '6px' }}
                />
              </div>
            </div>

            {/* Expanding Submit Button */}
            <button
              type="submit"
              className="w-full relative overflow-hidden bg-white border-[1.5px] border-[#E2E8F0] hover:border-black text-black hover:text-white font-bold py-3.5 px-4 text-xs tracking-wider uppercase transition-all duration-300 group cursor-pointer mt-2 rounded-full"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 block transition-colors duration-300">
                Create {role === 'student' ? 'Student' : 'Entrepreneur'} Account
              </span>
            </button>
          </form>

          {/* Footer redirects */}
          <div className="mt-8 text-center border-t border-[#F1F5F9] pt-6 flex flex-col gap-2">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1A73E8] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Signup;
