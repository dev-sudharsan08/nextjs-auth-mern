'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Importing icons, including new ones for Theme/Avatar
import { FaUser, FaEnvelope, FaSave, FaArrowLeft, FaExclamationCircle, FaCheckCircle, FaSignOutAlt, FaBell, FaTrashAlt, FaGithub, FaGoogle, FaMoon, FaSun, FaCamera, FaKey, FaShieldAlt } from 'react-icons/fa';

// Placeholder/Mock Imports
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';

// --- MOCK HOOK FOR THEME (Replace with your actual context/hook) ---
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  return { theme, toggleTheme };
};
// -----------------------------------------------------------------

interface UserData {
  username: string;
  email: string;
  avatarUrl: string;
  isEmailVerified: false; // NEW: Profile image URL
}

interface PreferencesData {
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface IntegrationsData {
  githubConnected: boolean;
  googleConnected: boolean;
}

interface PrivacyData {
  shareData: boolean;
  trackingEnabled: boolean;
}

export default function UpdateProfile() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // Use mock theme hook
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    username: '',
    email: '',
    avatarUrl: '/images/default-avatar.png',
    isEmailVerified: false, // Default placeholder
  });
  const [preferencesData, setPreferencesData] = useState<PreferencesData>({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [integrationsData, setIntegrationsData] = useState<IntegrationsData>({
    githubConnected: false,
    googleConnected: true,
  });
  const [initialData, setInitialData] = useState<UserData>({
    username: '',
    email: '',
    avatarUrl: '/images/default-avatar.png',
    isEmailVerified: false,
  });
  const [initialPreferences, setInitialPreferences] = useState<PreferencesData>({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [isAvatarSuccess, setIsAvatarSuccess] = useState(false); // NEW success state

  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPreferencesSuccess, setIsPreferencesSuccess] = useState(false);
  const [isIntegrationsSuccess, setIsIntegrationsSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPrivacySuccess, setIsPrivacySuccess] = useState(false);
  const [privacyData, setPrivacyData] = useState<PrivacyData>({
      shareData: true,
      trackingEnabled: true,
  });

  // --- Mock Data Fetching ---
  useEffect(() => {
    // Simulate fetching
    const userDetails = { username: 'CurrentName', email: 'user@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=6' };
    setFormData(userDetails);
    setInitialData(userDetails);
    const prefs = { emailNotifications: true, smsNotifications: false };
    setPreferencesData(prefs);
    setInitialPreferences(prefs);
    // Integrations are already fetched or mocked
  }, []);
  // --- End Mock Data Fetching ---

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreferenceToggle = (key: keyof PreferencesData) => {
    setPreferencesData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyToggle = (key: keyof PrivacyData) => {
    setPrivacyData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isFormUnchanged = formData.username === initialData.username && formData.email === initialData.email;

  // NEW: Profile Image Upload Handler
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoader(true);
    // Simulate file upload logic
    setTimeout(() => {
      const mockImageUrl = URL.createObjectURL(file); // Create temporary URL for preview
      setFormData(prev => ({ ...prev, avatarUrl: mockImageUrl }));
      setInitialData(prev => ({ ...prev, avatarUrl: mockImageUrl }));

      setIsAvatarSuccess(true);
      setLoader(false);
      // Clean up success message after 3 seconds
      setTimeout(() => setIsAvatarSuccess(false), 3000);
    }, 1500);
  };


  // PROFILE SUBMIT (Simplified)
  const handleSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormUnchanged) return;
    setLoader(true);
    // API call to update profile...
    setIsSuccess(true);
    setInitialData(formData);
    setLoader(false);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  // PREFERENCES SUBMIT (Simplified)
  const handleSubmitPreferences = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API call to update preferences...
    setIsPreferencesSuccess(true);
    setTimeout(() => setIsPreferencesSuccess(false), 3000);
  };

  // INTEGRATION TOGGLE (Simplified)
  const handleIntegrationToggle = async (provider: 'github' | 'google') => {
    // Toggle logic...
    setIsIntegrationsSuccess(true);
    setIntegrationsData(prev => ({ ...prev, [`${provider}Connected`]: !prev[`${provider}Connected`] }));
    setTimeout(() => setIsIntegrationsSuccess(false), 3000);
  };

  const handleSubmitPrivacy = async () => {
    // API call to update privacy settings...
    setIsPrivacySuccess(true);
    setTimeout(() => setIsPrivacySuccess(false), 3000);
  };

  // ACCOUNT DELETION LOGIC (Simplified)
  async function handleDeleteAccount() {
    // ... (logic for account deletion) ...
    router.push('/signup');
  }

  // LOGOUT FUNCTION (Existing)
  async function handleLogout() {
    // ... (logic for logout) ...
    router.push('/login');
  }

  return (
    <>
      <Spinner loading={loader} />
      <div className='max-w-7xl mx-auto space-y-8'>

        {/* HEADER AND LOGOUT */}
        <div className='flex items-center justify-between pb-6 border-b border-white/10'>
          <Link
            href='/dashboard'
            className='px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-indigo-300 border border-indigo-400/50 rounded-full text-sm font-medium hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-indigo-500/30 transform hover:-translate-x-1'
          >
            <FaArrowLeft className='w-4 h-4' />
            <span>Dashboard</span>
          </Link>
          <h1 className='text-4xl font-extrabold text-white tracking-tight'>
            Account Settings
          </h1>
          <button
            onClick={handleLogout}
            disabled={loader}
            className='px-4 py-2 bg-red-600/30 text-red-300 border border-red-400/50 rounded-full text-sm font-medium hover:bg-red-700/40 transition-colors flex items-center space-x-2 shadow-md hover:shadow-red-500/30 disabled:opacity-50'
          >
            <FaSignOutAlt className='w-4 h-4' />
            <span>Logout</span>
          </button>
        </div>

        {/* Alert Messages */}
        <div className='max-w-5xl mx-auto'>
          {isError && (
            <Alert
              message={message}
              type='error'
              // icon={<FaExclamationCircle className="w-5 h-5" />}
              className='mb-6 animate-slide-down'
            />
          )}
          {(isSuccess || isPreferencesSuccess || isIntegrationsSuccess || isAvatarSuccess || isPrivacySuccess) && (
            <Alert
              message={
                isSuccess ? 'Profile updated!' :
                  isPreferencesSuccess ? 'Preferences saved!' :
                  isPrivacySuccess ? 'Privacy settings saved!' :
                    isIntegrationsSuccess ? 'Integration status updated!' :
                      'Profile image uploaded!'
              }
              type='success'
              // icon={<FaCheckCircle className="w-5 h-5" />}
              className='mb-6 animate-slide-down'
            />
          )}
        </div>
        {/* 2. MAIN CONTENT GRID: 2 COLUMNS ON LARGE SCREENS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

          {/* 2A. LEFT COLUMN: PROFILE, AVATAR, & APPEARANCE */}
          <div className='space-y-8'>

            {/* General Profile Information Card */}
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-indigo-300 mb-6 flex items-center space-x-3 border-b border-indigo-500/20 pb-2'>
                <FaUser className='w-5 h-5' />
                <span>Profile & Email</span>
              </h2>

              {/* Profile Image Upload Section (NEW) */}
              <div className='flex items-center space-x-4 mb-8 border-b border-white/10 pb-6'>
                <div className='relative w-20 h-20'>
                  <img
                    src={formData.avatarUrl}
                    alt="User Avatar"
                    className='w-full h-full rounded-full object-cover border-4 border-purple-500/50 shadow-lg'
                  />
                  <label
                    htmlFor="avatar-upload"
                    className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer'
                  >
                    <FaCamera className='w-6 h-6 text-white' />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    className='hidden'
                    onChange={handleAvatarUpload}
                  />
                </div>
                <div>
                  <h3 className='text-white text-lg font-semibold'>{formData.username}</h3>
                  <p className='text-gray-400 text-sm'>Click on the image to update your profile photo.</p>
                </div>
              </div>

              <form onSubmit={handleSubmitProfile} className='space-y-6'>
                {/* Username Input */}
                <div>
                  <label htmlFor='username' className='block text-sm font-medium text-indigo-200 mb-2'>Username</label>
                  {/* ... Input styling remains ... */}
                  <div className='relative'>
                    <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400' />
                    <input type='text' id='username' name='username' value={formData.username} onChange={handleProfileChange} required className='w-full pl-12 pr-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/5 backdrop-blur-sm placeholder-gray-400 text-white text-base transition-colors duration-200 hover:border-white/30' placeholder='Your unique username' />
                  </div>
                </div>
                {/* Email Input */}
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-indigo-200 mb-2'>Email Address</label>
                  <div className='relative'>
                    <FaEnvelope className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400' />
                    <input type='email' id='email' name='email' value={formData.email} onChange={handleProfileChange} required className='w-full pl-12 pr-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/5 backdrop-blur-sm placeholder-gray-400 text-white text-base transition-colors duration-200 hover:border-white/30' placeholder='your.email@example.com' />
                  </div>
                </div>
                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={loader || isFormUnchanged}
                    className='w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none'
                  >
                    <FaSave className='w-5 h-5' />
                    <span>{loader ? 'Saving...' : 'Save Profile Changes'}</span>
                  </button>
                </div>
              </form>

              <div className='mt-8 pt-6 border-t border-white/10 space-y-4'>
                <h3 className='text-lg font-semibold text-indigo-300'>Security Quick Access</h3>
                <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3'>

                  {/* Verify Email CTA */}
                  {!formData.isEmailVerified && (
                    <button
                      disabled={loader || formData.isEmailVerified}
                      className='flex-1 flex items-center justify-center space-x-2 bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300 font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50 border border-yellow-500/50'
                    >
                      <FaEnvelope className='w-4 h-4' />
                      <span>{loader ? 'Sending...' : 'Verify Email Now'}</span>
                    </button>
                  )}

                  {/* Change Password CTA */}
                  <button
                    disabled={loader}
                    className='flex-1 flex items-center justify-center space-x-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50 border border-red-500/50'
                  >
                    <FaKey className='w-4 h-4' />
                    <span>Change Password</span>
                  </button>
                </div>
                <p className='text-xs text-gray-400 pt-2'>
                  Password management is handled on a dedicated security page.
                </p>
              </div>
            </div>

            {/* Appearance/Theme Settings Card (NEW) */}
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-yellow-300 mb-6 flex items-center space-x-3 border-b border-yellow-500/20 pb-2'>
                <FaSun className='w-5 h-5' />
                <span>Appearance & Theme</span>
              </h2>

              <div className='space-y-6'>
                <div className='flex items-center justify-between p-4 border border-white/20 rounded-xl bg-white/5'>
                  <label className='text-white text-base font-medium flex items-center space-x-3'>
                    {theme === 'dark' ? <FaMoon className='w-5 h-5 text-yellow-400' /> : <FaSun className='w-5 h-5 text-yellow-400' />}
                    <span>Dark Mode ({theme === 'dark' ? 'Active' : 'Inactive'})</span>
                  </label>
                  <div
                    onClick={toggleTheme}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-gray-600'}`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </div>

                <p className='text-xs text-gray-400'>
                  Choose your preferred interface theme. This setting will apply globally across the application.
                </p>
              </div>
            </div>
          </div>


          {/* 2B. RIGHT COLUMN: NOTIFICATIONS, INTEGRATIONS, & DELETION */}
          <div className='space-y-8'>

            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-blue-300 mb-6 flex items-center space-x-3 border-b border-blue-500/20 pb-2'>
                <FaShieldAlt className='w-5 h-5' />
                <span>Data & Privacy</span>
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitPrivacy(); }} className='space-y-4'>
                {/* Data Sharing Toggle */}
                <div className='flex items-center justify-between'>
                  <label className='text-white text-base font-medium'>Allow Data Sharing</label>
                  <div
                    onClick={() => handlePrivacyToggle('shareData')}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${privacyData.shareData ? 'bg-blue-500' : 'bg-gray-600'}`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${privacyData.shareData ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </div>

                {/* Tracking Toggle */}
                <div className='flex items-center justify-between'>
                  <label className='text-white text-base font-medium'>Enable Usage Tracking</label>
                  <div
                    onClick={() => handlePrivacyToggle('trackingEnabled')}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${privacyData.trackingEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${privacyData.trackingEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </div>

                <p className='text-xs text-gray-400 pt-2'>
                  Review and manage how your data is collected and used by our services.
                </p>
                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={loader}
                    className='w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/40 disabled:opacity-50 disabled:shadow-none'
                  >
                    <FaSave className='w-5 h-5' />
                    <span>Save Privacy Settings</span>
                  </button>
                </div>
              </form>
            </div>
            {/* Connected Accounts & Integrations Card */}
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-lime-300 mb-6 flex items-center space-x-3 border-b border-lime-500/20 pb-2'>
                <FaGoogle className='w-5 h-5' />
                <span>Connected Accounts</span>
              </h2>

              <div className='space-y-4'>
                {/* GitHub Integration */}
                <div className='p-4 border border-white/20 rounded-xl flex items-center justify-between bg-white/5'>
                  <div className='flex items-center space-x-3'>
                    <FaGithub className='w-6 h-6 text-white' />
                    <span className='text-white font-medium'>GitHub</span>
                  </div>
                  <button
                    onClick={() => handleIntegrationToggle('github')}
                    disabled={loader}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${integrationsData.githubConnected
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-lime-600 hover:bg-lime-700 text-white'
                      } disabled:opacity-50`}
                  >
                    {integrationsData.githubConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                {/* Google Integration */}
                <div className='p-4 border border-white/20 rounded-xl flex items-center justify-between bg-white/5'>
                  <div className='flex items-center space-x-3'>
                    <FaGoogle className='w-6 h-6 text-white' />
                    <span className='text-white font-medium'>Google</span>
                  </div>
                  <button
                    onClick={() => handleIntegrationToggle('google')}
                    disabled={loader}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${integrationsData.googleConnected
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-lime-600 hover:bg-lime-700 text-white'
                      } disabled:opacity-50`}
                  >
                    {integrationsData.googleConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                <p className='text-xs text-gray-400 pt-2'>
                  Manage third-party services linked to your account.
                </p>
              </div>
            </div>

            {/* Preferences and Account Management Card (Notifications) */}
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in space-y-8'>

              {/* Notification Preferences Section */}
              <div className='space-y-6'>
                <h2 className='text-xl font-bold text-teal-300 flex items-center space-x-3 border-b border-teal-500/20 pb-2'>
                  <FaBell className='w-5 h-5' />
                  <span>Notifications</span>
                </h2>

                <form onSubmit={handleSubmitPreferences} className='space-y-4'>
                  {/* Email Notifications Toggle */}
                  <div className='flex items-center justify-between'>
                    <label className='text-white text-base font-medium'>Email Alerts</label>
                    {/* Toggle UI */}
                    <div
                      onClick={() => handlePreferenceToggle('emailNotifications')}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${preferencesData.emailNotifications ? 'bg-teal-500' : 'bg-gray-600'}`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${preferencesData.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </div>
                  </div>

                  {/* SMS Notifications Toggle */}
                  <div className='flex items-center justify-between'>
                    <label className='text-white text-base font-medium'>SMS/Text Updates</label>
                    {/* Toggle UI */}
                    <div
                      onClick={() => handlePreferenceToggle('smsNotifications')}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${preferencesData.smsNotifications ? 'bg-teal-500' : 'bg-gray-600'}`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${preferencesData.smsNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </div>
                  </div>

                  <div className='pt-4'>
                    <button
                      type='submit'
                      disabled={loader}
                      className='w-full flex items-center justify-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/40 hover:shadow-xl hover:shadow-teal-500/60 disabled:opacity-50 disabled:shadow-none'
                    >
                      <FaSave className='w-5 h-5' />
                      <span>{loader ? 'Saving...' : 'Save Preferences'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Account Deletion Section */}
              <div className='pt-6 border-t border-white/10 space-y-4'>
                <h2 className='text-xl font-bold text-gray-400 flex items-center space-x-3'>
                  <FaTrashAlt className='w-5 h-5' />
                  <span>Account Deletion</span>
                </h2>
                <p className='text-sm text-gray-400'>
                  Permanently delete your account and all associated data.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className='w-full flex items-center justify-center space-x-3 bg-red-800/50 hover:bg-red-800 text-red-300 font-bold px-6 py-3 rounded-xl transition-colors duration-300 border border-red-700/50 hover:shadow-lg hover:shadow-red-800/30'
                >
                  <FaTrashAlt className='w-4 h-4' />
                  <span>Delete Account</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
      {/* Account Deletion Confirmation Modal (Unchanged) */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm'>
          {/* Modal content... */}
        </div>
      )}

    </>
  );
}