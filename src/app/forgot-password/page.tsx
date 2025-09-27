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
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transition-all duration-300 hover:scale-[1.01]'>
          {isEmailSent ? (
            <div className='text-center'>
              <div className='text-green-500 text-6xl mb-4'>✓</div>
              <h1 className='text-2xl font-bold text-green-600 mb-4'>
                Email Sent Successfully!
              </h1>
              <p className='text-gray-600 mb-4'>
                Please check your email for password reset instructions.
              </p>
              <Link
                href='/login'
                className='text-blue-500 underline hover:text-blue-700'
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className='text-4xl font-extrabold mb-6 text-center text-slate-800 tracking-tight leading-tight drop-shadow-md'>
                Forgot Password
              </h1>
              <form className='space-y-4' onSubmit={handleForgotPassword} noValidate>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-1 text-slate-700 font-semibold'
                  >
                    <span>Email</span>
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter your email'
                    className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 placeholder-slate-400 text-slate-700'
                    onChange={(e) => setEmail(e.target.value.trim())}
                    value={email}
                    required
                  />
                </div>
                <div className='text-center pt-4'>
                  <button
                    type='submit'
                    className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                    disabled={!email.trim()}
                  >
                    Send Reset Email
                  </button>
                  <div className='mt-6 text-center text-md text-slate-600'>
                    <p>
                      Remember your password?{' '}
                      <Link href='/login' className='text-blue-500 underline'>
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
