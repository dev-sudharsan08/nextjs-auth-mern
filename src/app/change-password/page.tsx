'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

export default function ChangePassword() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    setIsSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setIsError({
        isError: true,
        message: 'New password and confirm password do not match',
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      setIsError({
        isError: true,
        message: 'New password must be at least 6 characters long',
      });
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post('/api/users/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.data.message) {
        setIsSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Something went wrong';
        setIsError({ isError: true, message: errorMessage });
      } else {
        setIsError({
          isError: true,
          message: 'An unexpected error occurred',
        });
      }
    } finally {
      setLoader(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md border border-white border-opacity-20 text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
            <FaCheckCircle className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Password Changed Successfully!
          </h1>
          <p className='text-slate-300 mb-6'>
            Your password has been updated successfully. You will be redirected to your profile.
          </p>
          <div className='flex items-center justify-center space-x-2 text-sm text-slate-400'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>Redirecting to profile...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Spinner loading={loader} />
      {isError && (
        <div className='flex justify-center'>
          <Alert
            message={message}
            type='error'
            style={{ minWidth: '350px' }}
            className='mb-7 text-center'
          />
        </div>
      )}
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white border-opacity-20 transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-20'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <FaLock className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
              Change Password
            </h1>
            <p className='text-slate-300 text-sm sm:text-base'>Update your account password</p>
          </div>

          <form className='space-y-6' onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor='currentPassword'
                className='block mb-2 text-white font-semibold'
              >
                <span>Current Password</span>
                <span className='text-red-400'>*</span>
              </label>
              <div className='relative'>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id='currentPassword'
                  name='currentPassword'
                  placeholder='Enter your current password'
                  className='w-full px-4 py-3 pr-12 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                  onChange={handleChange}
                  value={formData.currentPassword}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-white transition-colors'
                >
                  {showCurrentPassword ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor='newPassword'
                className='block mb-2 text-white font-semibold'
              >
                <span>New Password</span>
                <span className='text-red-400'>*</span>
              </label>
              <div className='relative'>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id='newPassword'
                  name='newPassword'
                  placeholder='Enter your new password'
                  className='w-full px-4 py-3 pr-12 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                  onChange={handleChange}
                  value={formData.newPassword}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-white transition-colors'
                >
                  {showNewPassword ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block mb-2 text-white font-semibold'
              >
                <span>Confirm New Password</span>
                <span className='text-red-400'>*</span>
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Confirm your new password'
                  className='w-full px-4 py-3 pr-12 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-white transition-colors'
                >
                  {showConfirmPassword ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                </button>
              </div>
            </div>

            <div className='text-center pt-4'>
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
              >
                <span className='flex items-center justify-center space-x-2'>
                  <FaLock className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                  <span>Change Password</span>
                </span>
              </button>
              <div className='mt-6 text-center text-sm text-slate-300'>
                <p>
                  <Link href='/profile' className='text-blue-400 hover:text-blue-300 underline font-medium transition-colors'>
                    Back to Profile
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
