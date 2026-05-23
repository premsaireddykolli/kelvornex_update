import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Camera, Mail, Shield, User as UserIcon, Save, Edit2, Loader2, CheckCircle2, AlertCircle, Phone, MapPin, Linkedin, Github, Code, Compass, Globe, Lock, Check } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, updateUser, logout } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    profilePictureUrl: '',
    bio: '',
    phoneNumber: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    skills: ''
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Redirect if not logged in or path ID doesn't match authenticated user (security boundary check)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/users/profile/${id}`);
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.response?.data?.message || 'Failed to retrieve profile data from server.');
        if (err.response?.status === 404 || err.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, logout]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('bio', profileData.bio || '');
    formData.append('phoneNumber', profileData.phoneNumber || '');
    formData.append('location', profileData.location || '');
    formData.append('linkedinUrl', profileData.linkedinUrl || '');
    formData.append('githubUrl', profileData.githubUrl || '');
    formData.append('skills', profileData.skills || '');
    if (profileImageFile) {
      formData.append('profilePicture', profileImageFile);
    }

    try {
      const response = await axios.put(`/api/users/profile/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const updatedProfile = response.data;
      
      setProfileData(updatedProfile);
      setProfileImageFile(null);
      setImagePreview(null);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      updateUser({
        name: `${updatedProfile.firstName} ${updatedProfile.lastName}`.trim(),
        profilePictureUrl: updatedProfile.profilePictureUrl
      });
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError(err.response?.data?.message || 'An error occurred while updating profile data.');
    } finally {
      setSaving(false);
    }
  };

  // Profile Picture Renderer (Circular)
  const renderProfilePicture = () => {
    const hasPreview = !!imagePreview;
    const hasProfilePic = profileData.profilePictureUrl &&
      profileData.profilePictureUrl.trim() !== '' &&
      !profileData.profilePictureUrl.includes('placeholder') &&
      !profileData.profilePictureUrl.includes('unsplash');

    if (hasPreview) {
      return (
        <img
          src={imagePreview}
          alt="Local Preview"
          className="h-32 w-32 rounded-full object-cover border-4 border-slate-100 shadow-md transition-transform duration-300 hover:scale-105"
        />
      );
    }

    if (hasProfilePic) {
      return (
        <img
          src={profileData.profilePictureUrl}
          referrerPolicy="no-referrer"
          alt="Profile Avatar"
          className="h-32 w-32 rounded-full object-cover border-4 border-slate-100 shadow-md transition-transform duration-300 hover:scale-105"
        />
      );
    }

    return (
      <div className="h-32 w-32 bg-slate-50 flex items-center justify-center border-4 border-slate-100 rounded-full shadow-inner text-slate-400 animate-fadeIn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
    );
  };

  const calculateCompleteness = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.role,
      profileData.bio,
      profileData.phoneNumber,
      profileData.location,
      profileData.linkedinUrl,
      profileData.githubUrl,
      profileData.skills
    ];
    const completed = fields.filter(f => f && f.trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  if (loading) {
    return (
      <Layout hideBanner={true} bgClass="bg-white" title="Dashboard Profile" description="Loading user profile details...">
        <div className="container mx-auto px-6 py-12 bg-white">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 h-80 bg-slate-50 rounded-3xl" />
              <div className="lg:col-span-8 h-96 bg-slate-50 rounded-3xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const roleStyles = {
    STUDENT: 'bg-violet-50 text-violet-700 border-violet-200/50',
    ENTREPRENEUR: 'bg-amber-50 text-amber-800 border-amber-200/50',
    MENTOR: 'bg-emerald-50 text-emerald-800 border-emerald-200/50'
  };

  const currentRoleStyle = roleStyles[profileData.role] || 'bg-slate-50 text-slate-700 border-slate-100';
  const completeness = calculateCompleteness();
  const skillsArray = profileData.skills
    ? profileData.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <Layout
      hideBanner={true}
      bgClass="bg-white"
      title="My Kelvornex Profile"
      description="Kelvornex User Profile Dashboard page. Manage contact settings and professional links."
    >
      <div className="container mx-auto max-w-5xl px-6 py-12 bg-white font-sans">
        
        {/* Visual Editorial Heading Banner */}
        <div className="mb-10 text-left border-b border-slate-100 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-base text-slate-600 mt-1 font-normal">
            Manage your personal profile details, dynamic credentials, and professional networks.
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-8 rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-700 flex items-center gap-3 font-semibold animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-8 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-700 flex items-center gap-3 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white">
          {/* LEFT SIDEBAR: PROFILE PICTURE UPLOADER & COMPLETION */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/40 p-8 flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="p-1 rounded-full border border-slate-100 transition-colors duration-300">
                {renderProfilePicture()}
              </div>
              
              {isEditing && (
                <label className="absolute inset-1 bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full">
                  <Camera className="w-6 h-6 mb-1 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <div className="flex flex-col items-center gap-2">
                <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-bold border tracking-wide capitalize ${currentRoleStyle}`}>
                  {profileData.role?.toLowerCase()}
                </span>
                
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50/50 px-2.5 py-0.5 rounded-full border border-emerald-100/50 mt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified Member</span>
                </div>
              </div>
            </div>

            {/* Profile Completeness Tracker */}
            <div className="w-full space-y-2 pt-4 border-t border-slate-100 text-left">
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Profile Strength</span>
                <span className="text-slate-800 font-bold text-sm">{completeness}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900 transition-all duration-700 ease-out" 
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 font-normal leading-snug">
                {completeness === 100 
                  ? 'Awesome! Your profile details are fully complete.' 
                  : 'Fill out all professional details to reach 100% strength.'}
              </p>
            </div>

            {/* Actions */}
            <div className="w-full border-t border-slate-100 pt-6 flex flex-col gap-2">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setSuccess(null);
                      setError(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-full font-medium transition-all duration-200 border border-slate-900 hover:border-slate-800 text-base cursor-pointer shadow-sm hover:shadow-md hover:shadow-slate-900/10 hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    <Edit2 className="w-4 h-4 text-white" />
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-rose-50/50 text-slate-700 hover:text-rose-600 py-2.5 rounded-full font-medium transition-all duration-200 border border-slate-200 hover:border-rose-200 text-base mt-1 cursor-pointer shadow-sm hover:shadow-md hover:shadow-rose-100/30 hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    Logout Account
                  </button>
                </>
              ) : (
                <div className="flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setImagePreview(null);
                      setProfileImageFile(null);
                    }}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-2.5 rounded-full font-medium transition-all duration-200 border border-slate-200 hover:border-slate-300 text-sm cursor-pointer shadow-sm hover:shadow-md hover:shadow-slate-100/80 hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    disabled={saving}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-full font-medium transition-all duration-200 border border-slate-900 hover:border-slate-800 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:shadow-slate-900/10 hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    {saving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : (
                      <Save className="w-3.5 h-3.5 text-white" />
                    )}
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: DYNAMIC VIEW OR FORM CARD */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/40 p-8 md:p-10">
            
            {!isEditing ? (
              /* VIEW MODE LAYOUT (Clean, Premium, highly-readable layout) */
              <div className="space-y-8 animate-fadeIn">
                
                {/* Header */}
                <div className="border-b border-slate-100 pb-5 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Profile Overview
                  </h2>
                  <span className="text-sm text-slate-600 font-medium bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    ID: #{profileData.id || 'N/A'}
                  </span>
                </div>

                {/* Bio Section */}
                <div className="space-y-3 bg-slate-50/50 border border-slate-50/60 rounded-2xl p-6">
                  <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wider flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    About Me
                  </h3>
                  {profileData.bio ? (
                    <p className="text-slate-700 leading-relaxed text-base whitespace-pre-wrap font-medium">
                      "{profileData.bio}"
                    </p>
                  ) : (
                    <p className="text-base text-slate-600 italic font-normal">
                      No biography or professional bio has been added yet. Click Edit Profile to update.
                    </p>
                  )}
                </div>

                {/* Personal Information Grid */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                    General Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem label="First Name" value={profileData.firstName} icon={UserIcon} />
                    <DetailItem label="Last Name" value={profileData.lastName} icon={UserIcon} />
                    <DetailItem label="Platform Role" value={profileData.role} icon={Shield} />
                    <DetailItem label="Location" value={profileData.location} icon={MapPin} placeholder="Not specified yet" />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem label="Email Address" value={profileData.email} icon={Mail} />
                    <DetailItem label="Phone Number" value={profileData.phoneNumber} icon={Phone} placeholder="Not specified yet" />
                  </div>
                </div>

                {/* Professional Portfolio and Networks */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                    {profileData.role === 'STUDENT' ? 'Skills' : 'Domains & Interests'}
                  </h3>
                  <div className="p-5 bg-slate-50/50 border border-slate-50/60 rounded-2xl">
                    {skillsArray.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skillsArray.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold bg-white text-slate-800 border border-slate-200/60 shadow-sm">
                            <Code className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-base text-slate-600 italic font-normal">No skills or startup domains registered.</span>
                    )}
                  </div>
                </div>

                {/* Social links */}
                {(profileData.linkedinUrl || profileData.githubUrl) && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                      Professional Networks
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profileData.linkedinUrl && (
                        <a 
                          href={profileData.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/50 transition-all text-slate-700 hover:text-slate-900 group"
                        >
                          <div className="p-2.5 bg-indigo-50/70 rounded-xl text-indigo-650 group-hover:bg-indigo-100/80 transition-colors border border-indigo-100/50">
                            <Linkedin className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs uppercase font-normal tracking-wider text-slate-600">LinkedIn Profile</div>
                            <div className="text-base font-semibold truncate mt-0.5">{profileData.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                          </div>
                        </a>
                      )}
                      {profileData.githubUrl && (
                        <a 
                          href={profileData.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/50 transition-all text-slate-700 hover:text-slate-900 group"
                        >
                          <div className="p-2.5 bg-slate-50 rounded-xl text-slate-700 group-hover:bg-slate-100 transition-colors border border-slate-200/50">
                            {profileData.role === 'STUDENT' ? <Github className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs uppercase font-normal tracking-wider text-slate-600">
                              {profileData.role === 'STUDENT' ? 'GitHub Portfolio' : 'Company Website'}
                            </div>
                            <div className="text-base font-semibold truncate mt-0.5">{profileData.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* EDIT MODE LAYOUT (Active Interactive Form) */
              <div className="animate-fadeIn">
                <div className="border-b border-slate-100 pb-5 mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Edit Profile Details
                  </h2>
                </div>
                
                <form onSubmit={handleSaveChanges} className="space-y-6">
                  {/* Row 1: Name Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* First Name Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        First Name
                      </label>
                      <div className="relative group/input">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-205">
                          <UserIcon className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. Jane"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Last Name Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        Last Name
                      </label>
                      <div className="relative group/input">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-205">
                          <UserIcon className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Doe"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email Input (Always Locked) */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative bg-slate-50 border border-slate-100 rounded-2xl">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          value={profileData.email}
                          readOnly={true}
                          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-transparent text-slate-600 text-base font-medium cursor-not-allowed focus:outline-none"
                        />
                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500">
                          <Lock className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative group/input">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-205">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={profileData.phoneNumber || ''}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Meta Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Profile Role Input (Always Locked) */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        Platform Role
                      </label>
                      <div className="relative bg-slate-50 border border-slate-100 rounded-2xl">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                          <Shield className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={profileData.role}
                          readOnly={true}
                          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-transparent text-slate-600 text-base font-medium capitalize cursor-not-allowed focus:outline-none"
                        />
                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500">
                          <Lock className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Location Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        Location
                      </label>
                      <div className="relative group/input">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-205">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location || ''}
                          onChange={handleInputChange}
                          placeholder="e.g. Bengaluru, India"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio Text Area */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                      Biography / Headline
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio || ''}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself, your career aspirations, or startup vision..."
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400 resize-none"
                    />
                  </div>

                  {/* Row 4: Professional Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Skills/Interests Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        {profileData.role === 'STUDENT' ? 'Skills (comma separated)' : 'Startup Domain / Interests'}
                      </label>
                      <div className="relative group/input">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-250">
                          {profileData.role === 'STUDENT' ? <Code className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                        </span>
                        <input
                          type="text"
                          name="skills"
                          value={profileData.skills || ''}
                          onChange={handleInputChange}
                          placeholder={profileData.role === 'STUDENT' ? 'e.g. React, Node.js, Python' : 'e.g. FinTech, SaaS, AI/ML'}
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* LinkedIn URL Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                        LinkedIn Profile URL
                      </label>
                      <div className="relative group/input">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-205">
                          <Linkedin className="w-4 h-4" />
                        </span>
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={profileData.linkedinUrl || ''}
                          onChange={handleInputChange}
                          placeholder="e.g. https://linkedin.com/in/username"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Secondary Dev/Biz URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                      {profileData.role === 'STUDENT' ? 'GitHub Profile URL' : 'Company Website URL'}
                    </label>
                    <div className="relative group/input">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within/input:text-slate-900 transition-colors duration-205">
                        {profileData.role === 'STUDENT' ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                      </span>
                      <input
                        type="url"
                        name="githubUrl"
                        value={profileData.githubUrl || ''}
                        onChange={handleInputChange}
                        placeholder={profileData.role === 'STUDENT' ? 'e.g. https://github.com/username' : 'e.g. https://company.com'}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-base font-medium transition-all focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-full font-medium transition-all duration-200 border border-slate-900 hover:border-slate-800 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-md hover:shadow-slate-900/10 hover:-translate-y-[1px] active:scale-[0.98]"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <Save className="w-4 h-4 text-white" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

const DetailItem = ({ label, value, icon: Icon, placeholder = 'Not specified' }) => (
  <div className="flex items-start gap-4 p-4.5 bg-slate-50/50 rounded-2xl border border-slate-50/50 hover:border-slate-100/80 transition-all hover:bg-slate-50">
    <div className="p-2.5 bg-white rounded-xl text-slate-500 border border-slate-100 shadow-sm flex-shrink-0">
      <Icon className="w-5 h-5 text-slate-500" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-xs font-medium text-slate-600 uppercase tracking-wider">{label}</div>
      <div className="text-base font-semibold text-slate-800 truncate mt-0.5">
        {value ? value : <span className="text-slate-500 font-normal italic">{placeholder}</span>}
      </div>
    </div>
  </div>
);

export default Profile;
