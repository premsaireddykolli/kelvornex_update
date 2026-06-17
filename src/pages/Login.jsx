import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [viewState, setViewState] = useState('LOGIN'); // 'LOGIN', 'FORGOT_EMAIL', 'FORGOT_OTP', 'FORGOT_RESET'
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Fallback if environment variable isn't loaded locally
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  const navigateToView = (view) => {
    setError('');
    setViewState(view);
  };

  const tokenClientRef = useRef(null);

  const handleGoogleLogin = useCallback(async (accessToken) => {
    setError('');
    try {
      // FIX 1: Attached baseUrl
      const response = await fetch(`${baseUrl}/api/auth/google`, {
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
        setSuccessMessage(`Successfully logged in as ${data.user.name}!`);
        setSuccess(true);
        setTimeout(() => {
          login(data);
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong during Google login.');
    }
  }, [navigate, login, baseUrl]);

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

    const payload = {
      email,
      password,
    };

    try {
      // FIX 2: Attached baseUrl
      const response = await fetch(`${baseUrl}/api/auth/login`, {
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

      setSuccessMessage(`Successfully logged in as ${data.user.name} (${data.user.role})!`);
      setSuccess(true);

      setTimeout(() => {
        login(data);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your credentials.');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const email = forgotEmail.trim();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // FIX 3: Attached baseUrl
      const response = await fetch(`${baseUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        let errMsg = 'Failed to send OTP.';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } else {
          errMsg = await response.text() || errMsg;
        }
        throw new Error(errMsg);
      }

      setError('');
      setViewState('FORGOT_OTP');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otp.trim();
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      // FIX 4: Attached baseUrl
      const response = await fetch(`${baseUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail.trim(), otp: code }),
      });

      if (!response.ok) {
        let errMsg = 'Invalid or expired OTP.';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } else {
          errMsg = await response.text() || errMsg;
        }
        throw new Error(errMsg);
      }

      setError('');
      setViewState('FORGOT_RESET');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const pass = newPassword;
    const confirmPass = confirmNewPassword;

    if (!pass || !confirmPass) {
      setError('Please fill in all fields.');
      return;
    }

    if (pass !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    if (pass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // FIX 5: Attached baseUrl
      const response = await fetch(`${baseUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: otp.trim(),
          newPassword: pass,
        }),
      });

      if (!response.ok) {
        let errMsg = 'Failed to reset password.';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } else {
          errMsg = await response.text() || errMsg;
        }
        throw new Error(errMsg);
      }

      setError('');
      setSuccessMessage('Password reset successfully!');
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
        setForgotEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setViewState('LOGIN');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <Layout
      title="Login"
      description="Login to Kelvornex: Sign in to your Student or Entrepreneur dashboard."
      hideBanner={true}
      bgClass="bg-white text-black relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none z-0" />

      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-12 px-6 relative z-10">
        <div 
          className="w-full max-w-md bg-white border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-10 relative z-10"
          style={{ borderRadius: '8px' }}
        >
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
                <h3 className="text-2xl font-bold text-black font-display">Welcome Back!</h3>
                <p className="text-slate-500 mt-2 text-sm font-medium">
                  {successMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center mb-6">
            <img
              src="/Kelvornex.jpeg"
              alt="Kelvornex Logo"
              className="h-10 w-auto rounded-none"
            />
          </div>

          <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-900 font-display">
            {viewState === 'LOGIN' && 'Welcome back'}
            {viewState === 'FORGOT_EMAIL' && 'Reset password'}
            {viewState === 'FORGOT_OTP' && 'Verify OTP'}
            {viewState === 'FORGOT_RESET' && 'New password'}
          </h2>
          <p className="text-center text-xs text-slate-500 mt-1 mb-8 font-medium">
            {viewState === 'LOGIN' && 'Sign in to access your dashboard'}
            {viewState === 'FORGOT_EMAIL' && 'Enter your registered email to receive an OTP'}
            {viewState === 'FORGOT_OTP' && 'Enter the 6-digit OTP sent to your email'}
            {viewState === 'FORGOT_RESET' && 'Choose a new strong password for your account'}
          </p>

          {error ? (
            <div className="mb-4 rounded bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-650 font-medium">
              {error}
            </div>
          ) : null}

          {viewState === 'LOGIN' && (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase">
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
                      placeholder="alex@university.edu"
                      className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      style={{ borderRadius: '6px' }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-slate-500 hover:text-black transition-colors font-semibold"
                      onClick={() => navigateToView('FORGOT_EMAIL')}
                    >
                      Forgot password?
                    </button>
                  </div>

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
                      placeholder="••••••••"
                      className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                      style={{ borderRadius: '6px' }}
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer"
                  style={{
                    background: '#000000',
                    color: '#FFFFFF',
                    border: '2px solid #000000',
                    borderRadius: '9999px',
                    padding: '12px 20px',
                    fontWeight: 700,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  SIGN IN
                </button>
              </form>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-full py-3 text-xs font-bold text-slate-800 transition-all duration-200 cursor-pointer shadow-sm mt-4"
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

              <div className="mt-8 text-center border-t border-[#F1F5F9] pt-6 flex flex-col gap-2">
                <a 
                  href="mailto:admin@kelvornex.com" 
                  className="text-[#1A73E8] hover:text-blue-800 hover:underline font-semibold text-xs transition-colors"
                >
                  Contact Admin to request access
                </a>
                <p className="text-[11px] text-slate-400 font-medium">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-black font-bold hover:underline">
                    Create one now
                  </Link>
                </p>
              </div>
            </>
          )}

          {viewState === 'FORGOT_EMAIL' && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="forgotEmail"
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      if (error) setError('');
                    }}
                    required
                    placeholder="alex@university.edu"
                    className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                    style={{ borderRadius: '6px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer"
                style={{
                  background: '#000000',
                  color: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                SEND OTP
              </button>

              <button
                type="button"
                onClick={() => navigateToView('LOGIN')}
                className="w-full text-center text-xs text-slate-500 hover:text-black font-semibold transition-colors mt-2"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {viewState === 'FORGOT_OTP' && (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  OTP Code
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type="text"
                    name="otp"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ''));
                      if (error) setError('');
                    }}
                    required
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                    style={{ borderRadius: '6px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer"
                style={{
                  background: '#000000',
                  color: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                VERIFY OTP
              </button>

              <div className="flex justify-between text-xs px-1">
                <button
                  type="button"
                  onClick={() => navigateToView('FORGOT_EMAIL')}
                  className="text-slate-500 hover:text-black font-semibold transition-colors"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={() => navigateToView('LOGIN')}
                  className="text-slate-500 hover:text-black font-semibold transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {viewState === 'FORGOT_RESET' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError('');
                    }}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                    style={{ borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  Confirm New Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      if (error) setError('');
                    }}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border-[1.5px] border-slate-200 text-sm text-black placeholder-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                    style={{ borderRadius: '6px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer"
                style={{
                  background: '#000000',
                  color: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                RESET PASSWORD
              </button>

              <button
                type="button"
                onClick={() => navigateToView('LOGIN')}
                className="w-full text-center text-xs text-slate-500 hover:text-black font-semibold transition-colors mt-2"
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;