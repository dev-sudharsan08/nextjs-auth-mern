'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-md'>
          <div className='text-center'>
            <div className='text-red-500 text-6xl mb-4'>⚠</div>
            <h1 className='text-2xl font-bold text-red-600 mb-4'>
              Invalid Reset Link
            </h1>
            <p className='text-gray-600 mb-4'>
              This password reset link is invalid or has expired.
            </p>
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
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transition-all duration-300 hover:scale-[1.01]'>
          {isPasswordReset ? (
            <div className='text-center'>
              <div className='text-green-500 text-6xl mb-4'>✓</div>
              <h1 className='text-2xl font-bold text-green-600 mb-4'>
                Password Reset Successfully!
              </h1>
              <p className='text-gray-600 mb-4'>
                Your password has been reset. You can now log in with your new password.
              </p>
              <p className='text-sm text-gray-500'>
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <>
              <h1 className='text-4xl font-extrabold mb-6 text-center text-slate-800 tracking-tight leading-tight drop-shadow-md'>
                Reset Password
              </h1>
              <form className='space-y-4' onSubmit={handleResetPassword} noValidate>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-1 text-slate-700 font-semibold'
                  >
                    <span>New Password</span>
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Enter your new password'
                    className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 placeholder-slate-400 text-slate-700'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block mb-1 text-slate-700 font-semibold'
                  >
                    <span>Confirm Password</span>
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Confirm your new password'
                    className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 placeholder-slate-400 text-slate-700'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    minLength={6}
                  />
                </div>
                <div className='text-center pt-4'>
                  <button
                    type='submit'
                    className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                    disabled={!password.trim() || !confirmPassword.trim()}
                  >
                    Reset Password
                  </button>
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
