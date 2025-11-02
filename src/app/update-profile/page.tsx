'use client';

import { useDeferredValue, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaSave, FaTrashAlt, FaCamera, FaKey, FaShieldAlt, } from 'react-icons/fa';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface UserData {
  username: string;
  email: string;
  isVerified: false;
  profilePicture: string;
  previewProfilePicture: string;
}

// interface PreferencesData {
//   emailNotifications: boolean;
//   smsNotifications: boolean;
// }

// interface IntegrationsData {
//   githubConnected: boolean;
//   googleConnected: boolean;
// }

// interface PrivacyData {
//   shareData: boolean;
//   trackingEnabled: boolean;
// }

export default function UpdateProfile() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [avatarLoader, setAvatarLoader] = useState(false);
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserData>({
    username: '',
    email: '',
    profilePicture: '',
    isVerified: false,
    previewProfilePicture: '',
  });
  const [isAvatarSuccess, setIsAvatarSuccess] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // const [isPrivacySuccess, setIsPrivacySuccess] = useState(false);
  // const [isPreferencesSuccess, setIsPreferencesSuccess] = useState(false);
  // const [isIntegrationsSuccess, setIsIntegrationsSuccess] = useState(false);
  // const [privacyData, setPrivacyData] = useState<PrivacyData>({
  //     shareData: true,
  //     trackingEnabled: true,
  // });
  // const [preferencesData, setPreferencesData] = useState<PreferencesData>({
  //   emailNotifications: true,
  //   smsNotifications: false,
  // });
  // const [integrationsData, setIntegrationsData] = useState<IntegrationsData>({
  //   githubConnected: false,
  //   googleConnected: true,
  // });
  // const [initialData, setInitialData] = useState<UserData>({
  //   username: '',
  //   email: '',
  //   profilePicture: 'https://avatar.iran.liara.run/public/43',
  //   isVerified: false,
  // });
  // const [initialPreferences, setInitialPreferences] = useState<PreferencesData>({
  //   emailNotifications: true,
  //   smsNotifications: false,
  // });


  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function fetchUserDetails() {
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.get('/api/users/details');
      setUserDetails(response.data.data);
      setFormData(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        setIsError({ isError: true, message: error.message });
      } else {
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    } finally {
      setTimeout(() => setIsSuccess(false), 2000);
      setLoader(false);
      setIsSubmit(false);
    }
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSuccess(false);
    setIsError({ isError: false, message: '' });
  };

  // const isFormUnchanged = userDetails
  //   ? Object.keys(userDetails).length !== Object.keys(formData).length || !(Object.keys(userDetails) as (keyof UserData)[]).some(
  //       key => userDetails[key] !== formData[key]
  //     )
  //   : false;

  const isFormUnchanged = userDetails
  ? Object.keys(userDetails).length === Object.keys(formData).length &&
    !(Object.keys(userDetails) as (keyof UserData)[]).some(
      key => userDetails[key] !== formData[key]
    )
  : false;


  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIsError({ isError: false, message: '' });
    setIsSuccess(false);

    if (!file) return;
    setAvatarLoader(true);
    setTimeout(() => {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, previewProfilePicture: previewUrl, }));
      setProfileImageFile(file);
      setIsAvatarSuccess(true);
      setAvatarLoader(false);
      setTimeout(() => setIsAvatarSuccess(false), 3000);
    }, 1500);
  };

  const handleSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsSubmit(true);

    if (isFormUnchanged) return;
    setIsError({ isError: false, message: '' });

    if (!formData.username.trim() || formData.username.length < 4) return;

    const data = new FormData();
    data.append('username', formData.username.trim()); 
    
    if (profileImageFile) {
      data.append('profilePicture', profileImageFile); 
    }

    try {
      setLoader(true);
      const response = await axios.patch('/api/users/update-profile', data);
      
      console.log(response);
      if (response.data.isProfileUpdated) {
        setIsSuccess(true);
        setUserDetails(response.data.data);
        setFormData(response.data.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      } else if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry, something went wrong.';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error.message);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry, something went wrong.' });
      }
    } finally {
      setLoader(false);
    }
  };

    // const handlePreferenceToggle = (key: keyof PreferencesData) => {
  //   setPreferencesData(prev => ({ ...prev, [key]: !prev[key] }));
  // };

  // const handlePrivacyToggle = (key: keyof PrivacyData) => {
  //   setPrivacyData(prev => ({ ...prev, [key]: !prev[key] }));
  // };

  // // PREFERENCES SUBMIT (Simplified)
  // const handleSubmitPreferences = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // API call to update preferences...
  //   setIsPreferencesSuccess(true);
  //   setTimeout(() => setIsPreferencesSuccess(false), 3000);
  // };

  // // INTEGRATION TOGGLE (Simplified)
  // const handleIntegrationToggle = async (provider: 'github' | 'google') => {
  //   // Toggle logic...
  //   setIsIntegrationsSuccess(true);
  //   setIntegrationsData(prev => ({ ...prev, [`${provider}Connected`]: !prev[`${provider}Connected`] }));
  //   setTimeout(() => setIsIntegrationsSuccess(false), 3000);
  // };

  // const handleSubmitPrivacy = async () => {
  //   // API call to update privacy settings...
  //   setIsPrivacySuccess(true);
  //   setTimeout(() => setIsPrivacySuccess(false), 3000);
  // };

  // // ACCOUNT DELETION LOGIC (Simplified)
  // async function handleDeleteAccount() {
  //   // ... (logic for account deletion) ...
  //   router.push('/signup');
  // }

  console.log(isFormUnchanged, formData, 'formData', userDetails, profileImageFile)

  return (
    <>
      <Spinner loading={loader || avatarLoader} />
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='flex items-center justify-center pb-6 border-b border-white/10'>
          {/* <Link
            href='/dashboard'
            className='px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-indigo-300 border border-indigo-400/50 rounded-full text-sm font-medium hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-indigo-500/30 transform hover:-translate-x-1'
          >
            <FaArrowLeft className='w-4 h-4' />
            <span>Dashboard</span>
          </Link> */}
          <h1 className='text-4xl font-extrabold text-white tracking-tight'>
            Account Settings
          </h1>
          {/* <button
            onClick={handleLogout}
            disabled={loader}
            className='px-4 py-2 bg-red-600/30 text-red-300 border border-red-400/50 rounded-full text-sm font-medium hover:bg-red-700/40 transition-colors flex items-center space-x-2 shadow-md hover:shadow-red-500/30 disabled:opacity-50'
          >
            <FaSignOutAlt className='w-4 h-4' />
            <span>Logout</span>
          </button> */}
        </div>

        {/* Alert Messages */}
        <div className='max-w-3xl mx-auto'>
          {isError && (
            <Alert
              message={message}
              type='error'
              // icon={<FaExclamationCircle className="w-5 h-5" />}
              className='mb-6 animate-slide-down text-center'
            />
          )}
          {(isSuccess || isAvatarSuccess) && (
            <Alert
              message={
                isSuccess ? 'Profile updated!' :
                  // isPreferencesSuccess ? 'Preferences saved!' :
                  // isPrivacySuccess ? 'Privacy settings saved!' :
                  //   isIntegrationsSuccess ? 'Integration status updated!' :
                      'Profile image uploaded!'
              }
              type='success'
              // icon={<FaCheckCircle className="w-5 h-5" />}
              className='mb-6 animate-slide-down text-center'
            />
          )}
        </div>
        {/* 2. MAIN CONTENT GRID: 2 COLUMNS ON LARGE SCREENS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

          {/* 2A. LEFT COLUMN: PROFILE, AVATAR, & APPEARANCE */}
          <div className='space-y-8'>
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-indigo-300 mb-6 flex items-center space-x-3 border-b border-indigo-500/20 pb-2'>
                <FaUser className='w-5 h-5' />
                <span>Profile & Email</span>
              </h2>
              <div className='flex items-center space-x-4 mb-8 border-b border-white/10 pb-6'>
                <div className='relative w-20 h-20'>
                  <img
                    src={formData.previewProfilePicture || userDetails?.profilePicture || 'https://avatar.iran.liara.run/public/43'}
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
                  <h3 className='text-white text-lg font-semibold'>{userDetails?.username}</h3>
                  <p className='text-gray-400 text-sm'>Click on the image to update your profile photo.</p>
                </div>
              </div>
              <form onSubmit={handleSubmitProfile} className='space-y-6'>
                <div>
                  <label htmlFor='username' className='block text-sm font-medium text-indigo-200 mb-2'>Username</label>
                  <div className='relative'>
                    <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400' />
                    <input
                      type='text'
                      id='username'
                      name='username'
                      value={formData?.username || ''}
                      onChange={handleProfileChange}
                      className='w-full pl-12 pr-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/5 backdrop-blur-sm placeholder-gray-400 text-white text-base transition-colors duration-200 hover:border-white/30'
                      placeholder='Your unique username'
                    />
                  </div>
                  {(!formData.username.trim() || formData.username.length < 4) && !loader &&
                    <div className='flex items-center mt-1 '>
                      <HiOutlineExclamationCircle 
                        className='w-4 h-4 text-red-500 me-2 mb-0'
                        aria-label="Error"
                      />
                      <span className='text-sm text-red-400'>{!formData.username.trim() ? 'User name is required' : 'User name must be minimum 4 chanracters long'}</span>
                    </div>
                  }
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-indigo-200 mb-2'>Email Address</label>
                  <div className='relative'>
                    <FaEnvelope className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400' />
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={userDetails?.email || ''}
                      disabled
                      className='w-full pl-12 pr-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/5 backdrop-blur-sm placeholder-gray-400 text-white text-base transition-colors duration-200 hover:border-white/30 cursor-not-allowed opacity-50' 
                      placeholder='your.email@example.com'
                    />
                  </div>
                </div>
                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={loader || isFormUnchanged || formData.username.length < 4}
                    className='w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none'
                  >
                    <FaSave className='w-5 h-5' />
                    <span>{loader && isSubmit ? 'Saving...' : 'Save Profile Changes'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Appearance/Theme Settings Card (NEW) */}
            {/* <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
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
            </div> */}
          </div>


          {/* 2B. RIGHT COLUMN: NOTIFICATIONS, INTEGRATIONS, & DELETION */}
          <div className='space-y-8'>

            {/* <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-blue-300 mb-6 flex items-center space-x-3 border-b border-blue-500/20 pb-2'>
                <FaShieldAlt className='w-5 h-5' />
                <span>Data & Privacy</span>
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitPrivacy(); }} className='space-y-4'>
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
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in'>
              <h2 className='text-xl font-bold text-lime-300 mb-6 flex items-center space-x-3 border-b border-lime-500/20 pb-2'>
                <FaGoogle className='w-5 h-5' />
                <span>Connected Accounts</span>
              </h2>

              <div className='space-y-4'>
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
            </div> */}

            {/* Preferences and Account Management Card (Notifications) */}
            <div className='p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-fade-in space-y-8'>

              {/* Notification Preferences Section */}
              {/* <div className='space-y-6'>
                <h2 className='text-xl font-bold text-teal-300 flex items-center space-x-3 border-b border-teal-500/20 pb-2'>
                  <FaBell className='w-5 h-5' />
                  <span>Notifications</span>
                </h2>

                <form onSubmit={handleSubmitPreferences} className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <label className='text-white text-base font-medium'>Email Alerts</label>
                    <div
                      onClick={() => handlePreferenceToggle('emailNotifications')}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${preferencesData.emailNotifications ? 'bg-teal-500' : 'bg-gray-600'}`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${preferencesData.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <label className='text-white text-base font-medium'>SMS/Text Updates</label>
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
              </div> */}

              <div className='space-y-4'>
                <h2 className='text-xl font-bold text-indigo-300 mb-6 flex items-center space-x-3 border-b border-indigo-500/20 pb-2'>
                  <FaShieldAlt className='w-5 h-5 mr-3' />
                  Security Quick Access
                </h2>
                <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3'>

                  {!userDetails?.isVerified && (
                    <Link
                      href='/verify-email'
                      className='flex-1 flex items-center justify-center space-x-2 bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300 font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50 border border-yellow-500/50'
                    >
                      <FaEnvelope className='w-4 h-4' />
                      <span>Verify Email Now</span>
                    </Link>
                  )}

                  <Link
                    href='/change-password'
                    className='flex-1 flex items-center justify-center space-x-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50 border border-red-500/50'
                  >
                    <FaKey className='w-4 h-4' />
                    <span>Change Password</span>
                  </Link>
                </div>
                <p className='text-xs text-gray-400 pt-2'>
                  Email Verification and Password management are handled on a dedicated security pages.
                </p>
              </div>

              {/* Account Deletion Section */}
              <div className='pt-6 border-t border-white/10 space-y-4'>
                <h2 className='text-xl font-bold text-indigo-300 mb-6 flex items-center space-x-3 border-b border-indigo-500/20 pb-2'>
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