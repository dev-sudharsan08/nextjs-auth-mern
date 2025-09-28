'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  const token = searchParams.get('token');

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });

    if (password !== confirmPassword) {
      setIsError({ isError: true, message: 'Passwords do not match' });
      return;
    }

    if (password.length < 6) {
      setIsError({ isError: true, message: 'Password must be at least 6 characters long' });
      return;
    }

    setLoader(true);
    try {
      const response = await axios.post('/api/users/reset-password', {
        token,
        password
      });
      console.log(response);
      if (response.data.success) {
        setIsPasswordReset(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    } finally {
      setLoader(false);
    }
  }

  if (!token) {
    return (
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white border-opacity-20'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
              <FaExclamationTriangle className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
              Invalid Reset Link
            </h1>
            <p className='text-slate-300 mb-6'>
              This password reset link is invalid or has expired.
            </p>
            <Link
              href='/forgot-password'
              className='text-blue-400 hover:text-blue-300 underline font-medium transition-colors'
            >
              Request a new reset link
            </Link>
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
          {isPasswordReset ? (
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <FaCheckCircle className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
                Password Reset Successfully!
              </h1>
              <p className='text-slate-300 mb-6'>
                Your password has been reset. You can now log in with your new password.
              </p>
              <div className='flex items-center justify-center space-x-2 text-sm text-slate-400'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span>Redirecting to login page...</span>
              </div>
            </div>
          ) : (
            <>
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <FaLock className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
                  Reset Password
                </h1>
                <p className='text-slate-300 text-sm sm:text-base'>Enter your new password below</p>
              </div>
              <form className='space-y-6' onSubmit={handleResetPassword} noValidate>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-white font-semibold'
                  >
                    <span>New Password</span>
                    <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      placeholder='Enter your new password'
                      className='w-full px-4 py-3 pr-12 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      minLength={6}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-white transition-colors'
                    >
                      {showPassword ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block mb-2 text-white font-semibold'
                  >
                    <span>Confirm Password</span>
                    <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder='Confirm your new password'
                      className='w-full px-4 py-3 pr-12 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                      minLength={6}
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
                    disabled={!password.trim() || !confirmPassword.trim()}
                  >
                    <span className='flex items-center justify-center space-x-2'>
                      <FaLock className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                      <span>Reset Password</span>
                    </span>
                  </button>
                  <div className='mt-6 text-center text-sm text-slate-300'>
                    <p>
                      <Link href='/login' className='text-blue-400 hover:text-blue-300 underline font-medium transition-colors'>
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
