import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Camera, Mail, Shield, User as UserIcon, Save, Edit2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, updateUser, logout } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    profilePictureUrl: ''
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
      
      // Update dynamic states
      setProfileData(updatedProfile);
      setProfileImageFile(null);
      setImagePreview(null);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // Instantly synchronize navbar state and localStorage session
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

  // Profile Picture Renderer with Fallbacks
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
          className="h-32 w-32 rounded-full object-cover border-4 border-brand-purple shadow-lg transition-transform duration-300 hover:scale-105"
        />
      );
    }

    if (hasProfilePic) {
      return (
        <img
          src={profileData.profilePictureUrl}
          alt="Profile Avatar"
          className="h-32 w-32 rounded-full object-cover border-4 border-slate-100 shadow-md transition-transform duration-300 hover:scale-105"
        />
      );
    }

    // Traditional Vector SVG silhouette placeholder
    return (
      <div className="h-32 w-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-slate-100 shadow-md text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <Layout title="Dashboard Profile" description="Loading user profile details...">
        <div className="container mx-auto px-6 py-10">
          <div className="animate-pulse space-y-8">
            <div className="h-28 bg-slate-100 rounded-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 h-80 bg-slate-100 rounded-3xl" />
              <div className="lg:col-span-8 h-96 bg-slate-100 rounded-3xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="My Kelvornex Profile"
      subtitle="View and edit your personal details, role preferences, and profile avatar."
      description="Kelvornex User Profile Dashboard page. Manage contact settings and upload high-resolution avatars."
    >
      <div className="container mx-auto max-w-5xl px-2 py-4">
        {/* Status Alerts */}
        {error && (
          <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-600 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-600 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: PROFILE PICTURE UPLOADER */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              {renderProfilePicture()}
              
              {isEditing && (
                <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-6 h-6 mb-1" />
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

            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-xs font-bold text-brand-purple tracking-widest uppercase mt-1">
                {profileData.role}
              </p>
            </div>

            <div className="w-full border-t border-slate-50 pt-4 flex flex-col gap-2">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setSuccess(null);
                      setError(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-gray-700 py-3 rounded-2xl font-bold transition-all border border-slate-100 text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 py-3 rounded-2xl font-bold transition-all border border-rose-100 text-sm mt-2"
                  >
                    Logout
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
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-gray-600 py-3 rounded-2xl font-semibold transition-all border border-slate-100 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    disabled={saving}
                    className="flex-1 bg-brand-purple hover:bg-brand-purple-dark text-white py-3 rounded-2xl font-bold shadow-md shadow-brand-purple/20 transition-all flex items-center justify-center gap-1.5 text-xs disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: DYNAMIC FORM CARD */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 font-display mb-6 pb-4 border-b border-slate-50">
              Personal Information
            </h2>
            
            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    First Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="e.g. Jane"
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        isEditing
                          ? 'border-brand-purple/40 bg-white text-gray-900 focus:ring-brand-purple/20'
                          : 'border-slate-100 bg-slate-50/50 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                {/* Last Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Last Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="e.g. Doe"
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        isEditing
                          ? 'border-brand-purple/40 bg-white text-gray-900 focus:ring-brand-purple/20'
                          : 'border-slate-100 bg-slate-50/50 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Email Input (Always Disabled/Read-only) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    readOnly={true}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 text-gray-400 cursor-not-allowed text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Profile Role Input (Always Disabled/Read-only) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Platform Role
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Shield className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="role"
                    value={profileData.role}
                    onChange={handleInputChange}
                    readOnly={true}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 text-gray-400 cursor-not-allowed text-sm focus:outline-none capitalize"
                  />
                </div>
              </div>

              {/* Saving Button for Form Bottom (Visible only when editing) */}
              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-3 rounded-2xl font-bold shadow-md shadow-brand-purple/20 transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
