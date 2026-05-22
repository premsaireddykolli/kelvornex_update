import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Mail, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const tokenClientRef = useRef(null);

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
        throw new Error(errorData.message || 'Google login failed.');
      }

      const data = await response.json();
      console.log('Google login response:', data);

      if (data.roleSelectionRequired) {
        navigate(`/select-role?token=${data.tempToken}`);
      } else {
        alert(`Successfully logged in as ${data.user.name}!`);
        login(data);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong during Google login.');
    }
  }, [navigate, login]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Backend-ready payload for POST /auth/login (endpoint integration point)
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials or email.');
      }

      const data = await response.json();
      console.log('POST /auth/login success:', data);
      
      alert(`Successfully logged in as ${data.user.name} (${data.user.role})!`);
      
      // Persist login state and redirect via context
      login(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your credentials.');
    }
  };

  return (
    <Layout
      title="Login"
      description="Login to Kelvornex: Sign in to your Student or Entrepreneur dashboard."
      hideBanner={true}
    >
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-10 md:py-12 bg-slate-50/20">
        <div className="max-w-6xl w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
            {/* Left Block (Hero Card) */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-6">
              <div className="w-full rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-900/10 bg-gradient-to-br from-[#0d1326] to-[#1a2340]">
                {/* Curved gradient overlay feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d1326] to-[#1a2340] opacity-100" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/30 rounded-full blur-[80px]" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#2563eb]/20 rounded-full blur-[90px]" />

                <div className="relative z-10 flex flex-col justify-center h-full">
                  <div className="flex items-start">
                    <img
                      src="/Kelvornex.jpeg"
                      alt="Kelvornex Logo"
                      className="h-10 w-auto rounded-xl shadow-sm ring-1 ring-white/10"
                    />
                  </div>

                  <h2 className="mt-8 text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                    Empowering Tech Careers &amp; Startups
                  </h2>
                  <p className="mt-4 text-white/70 text-sm lg:text-base font-light max-w-[28rem]">
                    Access your customized dashboard, expert cohorts, and upskilling roadmap.
                  </p>

                  <ul className="mt-7 space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.25)]">
                        <span className="text-white font-extrabold leading-none">✓</span>
                      </span>
                      <span className="text-sm font-semibold text-white/95">Industry-Vetted Cohorts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.25)]">
                        <span className="text-white font-extrabold leading-none">✓</span>
                      </span>
                      <span className="text-sm font-semibold text-white/95">Vetted Tech Talent Pool</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.25)]">
                        <span className="text-white font-extrabold leading-none">✓</span>
                      </span>
                      <span className="text-sm font-semibold text-white/95">Direct Mentorship</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Block (Form Card) */}
            <div className="col-span-1 md:col-span-7 lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-md bg-white rounded-[1.75rem] border border-slate-200/60 shadow-[0_10px_35px_rgba(2,6,23,0.06)] p-7 sm:p-8 md:p-10">
                <div className="md:hidden mb-6">
                  <img src="/Kelvornex.jpeg" alt="Kelvornex Logo" className="h-10 mx-auto mb-3 rounded-xl" />
                </div>

                {error ? (
                  <div className="mb-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                ) : null}

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
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="px-3 text-slate-400 text-xs font-semibold tracking-wider">OR</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="alex@university.edu"
                        className="w-full bg-slate-100/80 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
                        PASSWORD
                      </label>
                      <button
                        type="button"
                        className="text-xs text-slate-700 hover:text-[#2563eb] transition-colors underline-offset-4 hover:underline"
                        onClick={() => {
                          // Hook: connect to forgot-password flow
                           
                          console.log('Forgot password clicked');
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="••••••••"
                        className="w-full bg-slate-100/80 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2563eb] text-white font-extrabold py-4 rounded-[9999px] hover:bg-[#1d4ed8] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_14px_35px_rgba(37,99,235,0.25)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.30)] cursor-pointer"
                  >
                    Sign In →
                  </button>
                </form>

                <div className="mt-7 pt-5 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-[#2563eb] font-bold hover:underline underline-offset-4">
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

