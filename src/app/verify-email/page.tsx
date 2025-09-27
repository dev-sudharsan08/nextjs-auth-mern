'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleVerifyEmail(token);
    }
  }, [searchParams]);

  async function handleVerifyEmail(token: string) {
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.post('/api/users/verifyemail', { token });
      console.log(response);
      if (response.data.data.isUserVerified) {
        setIsVerified(true);
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

  return (
    <>
      <Spinner loading={loader} />
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white border-opacity-20 transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-20'>
          {isVerified ? (
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
                Email Verified Successfully!
              </h1>
              <p className='text-slate-300 mb-6'>
                Your email has been verified. You can now log in to your account.
              </p>
              <div className='flex items-center justify-center space-x-2 text-sm text-slate-400'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span>Redirecting to login page...</span>
              </div>
            </div>
          ) : (
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-white animate-spin' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                </svg>
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
                Verifying Email...
              </h1>
              <p className='text-slate-300'>
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {isError && (
            <div className='mt-4'>
              <Alert
                message={message}
                type='error'
                className='text-center'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
