import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { GraduationCap, Rocket, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const SelectRole = () => {
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  const tempToken = searchParams.get('token');
  const [selectedRole, setSelectedRole] = useState(null); // 'STUDENT' or 'ENTREPRENEUR'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!tempToken ? 'Invalid session. Please login or register again.' : '');
  const [success, setSuccess] = useState(false);

  const handleCompleteRegistration = async () => {
    if (!tempToken) {
      setError('Session has expired or is invalid. Please sign in again.');
      return;
    }
    if (!selectedRole) {
      setError('Please select a role to complete your registration.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/complete-oauth-role', {
        tempToken,
        selectedRole,
      });

      if (response.status === 200 && response.data) {
        setSuccess(true);
        // Short delay to show success micro-animation
        setTimeout(() => {
          login(response.data);
        }, 1200);
      } else {
        throw new Error('Failed to complete registration.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'An error occurred while setting your role. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Choose Your Role"
      description="Select whether you are a Student or an Entrepreneur to complete your registration."
      hideBanner={true}
    >
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-12 px-6 bg-slate-50/20">
        <div className="max-w-2xl w-full mx-auto">
          {/* Card Wrapper */}
          <div className="bg-white rounded-[1.75rem] border border-slate-200/60 shadow-[0_10px_35px_rgba(2,6,23,0.06)] p-8 sm:p-10 relative overflow-hidden">
            
            {/* Soft background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Success Overlay State */}
            {success && (
              <div className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Registration Completed!</h3>
                <p className="text-slate-500 mt-2 text-sm">
                  Welcome to Kelvornex! Redirecting to your dashboard...
                </p>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                What are you?
              </h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Help us customize your learning pathway, mentors, and dashboard workspace to your needs.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex gap-3 items-start text-sm relative z-10">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Side-by-Side Selectable Columns using Soft Square Geometry (rounded-md, max 8px corner radius) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 relative z-10">
              
              {/* Column 1: Student */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('STUDENT');
                  setError('');
                }}
                disabled={loading}
                className={`flex flex-col items-center text-center p-6 border rounded-md cursor-pointer transition-all duration-300 select-none group text-left ${
                  selectedRole === 'STUDENT'
                    ? 'border-[#2563eb] bg-blue-50/20 shadow-md ring-2 ring-[#2563eb]/20'
                    : 'border-slate-200 hover:border-blue-600 hover:bg-slate-50/50'
                }`}
              >
                {/* Clean Graduation Icon with subtle background */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${
                  selectedRole === 'STUDENT'
                    ? 'bg-[#2563eb]/10 text-[#2563eb]'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/80 group-hover:text-slate-700'
                }`}>
                  <GraduationCap size={24} />
                </div>
                <h3 className={`text-lg font-bold transition-colors duration-300 mb-2 ${
                  selectedRole === 'STUDENT' ? 'text-[#2563eb]' : 'text-slate-800'
                }`}>
                  Student
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Access customized dashboards, industry-vetted tech cohorts, and structured upskilling roadmaps to accelerate your career.
                </p>
              </button>

              {/* Column 2: Entrepreneur */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('ENTREPRENEUR');
                  setError('');
                }}
                disabled={loading}
                className={`flex flex-col items-center text-center p-6 border rounded-md cursor-pointer transition-all duration-300 select-none group text-left ${
                  selectedRole === 'ENTREPRENEUR'
                    ? 'border-[#2563eb] bg-blue-50/20 shadow-md ring-2 ring-[#2563eb]/20'
                    : 'border-slate-200 hover:border-blue-600 hover:bg-slate-50/50'
                }`}
              >
                {/* Clean Rocket/Startup Icon with subtle background */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${
                  selectedRole === 'ENTREPRENEUR'
                    ? 'bg-[#2563eb]/10 text-[#2563eb]'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/80 group-hover:text-slate-700'
                }`}>
                  <Rocket size={24} />
                </div>
                <h3 className={`text-lg font-bold transition-colors duration-300 mb-2 ${
                  selectedRole === 'ENTREPRENEUR' ? 'text-[#2563eb]' : 'text-slate-800'
                }`}>
                  Entrepreneur
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Discover vetted technical talent pools, unlock direct mentorship pipelines, and scale your startup ecosystem efficiently.
                </p>
              </button>

            </div>

            {/* Action Button at the Bottom */}
            <div className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={handleCompleteRegistration}
                disabled={!selectedRole || loading || !tempToken}
                className={`w-full font-bold py-4 px-6 rounded-[9999px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  selectedRole && tempToken && !loading
                    ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-[0_14px_35px_rgba(37,99,235,0.25)]'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Completing Registration...
                  </>
                ) : (
                  <>
                    Complete Registration <ArrowRight size={18} className={selectedRole ? 'animate-bounce-horizontal' : ''} />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectRole;
