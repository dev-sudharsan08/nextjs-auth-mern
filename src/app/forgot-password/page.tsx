'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.post('/api/users/forgot-password', { email });
      console.log(response);
      if (response.data.success) {
        setIsEmailSent(true);
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
          {isEmailSent ? (
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
                Email Sent Successfully!
              </h1>
              <p className='text-slate-300 mb-6'>
                Please check your email for password reset instructions.
              </p>
              <Link
                href='/login'
                className='text-green-400 hover:text-green-300 underline font-medium transition-colors'
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
                  </svg>
                </div>
                <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
                  Forgot Password?
                </h1>
                <p className='text-slate-300 text-sm sm:text-base'>No worries, we'll send you reset instructions</p>
              </div>
              <form className='space-y-4' onSubmit={handleForgotPassword} noValidate>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-white font-semibold'
                  >
                    <span>Email Address</span>
                    <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter your email'
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                    onChange={(e) => setEmail(e.target.value.trim())}
                    value={email}
                    required
                  />
                </div>
                <div className='text-center pt-4'>
                  <button
                    type='submit'
                    className='w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
                    disabled={!email.trim()}
                  >
                    <span className='flex items-center justify-center space-x-2'>
                      <svg className='w-5 h-5 group-hover:rotate-12 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                      <span>Send Reset Email</span>
                    </span>
                  </button>
                  <div className='mt-6 text-center text-sm text-slate-300'>
                    <p>
                      Remember your password?{' '}
                      <Link href='/login' className='text-orange-400 hover:text-orange-300 underline font-medium transition-colors'>
                        Login here
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

export default ForgotPassword;
