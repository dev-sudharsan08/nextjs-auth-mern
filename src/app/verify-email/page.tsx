'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import { HiCheckCircle, HiOutlineArrowPath, HiExclamationCircle } from 'react-icons/hi2';

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setHasToken(true);
      handleVerifyEmail(token);
    } else {
      setHasToken(false);
      setIsError({
        isError: true,
        message: 'Verification token is missing. Please check the link from your email.',
      });
    }
  }, [searchParams]);

  async function handleVerifyEmail(token: string) {
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.post('/api/users/verifyemail', { token });
      
      if (response.data.data.isUserVerified) {
        setIsVerified(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Verification failed. The token may be invalid or expired.';
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        setIsError({ isError: true, message: error.message });
      } else {
        setIsError({ isError: true, message: 'An unexpected error occurred during verification.' });
      }
    } finally {
      setLoader(false);
    }
  }

  const getContent = () => {
    if (loader && hasToken) {
      return (
        <div className='text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <HiOutlineArrowPath className='w-10 h-10 text-white animate-spin' />
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
            Verifying Email...
          </h1>
          <p className='text-slate-400'>
            Please wait while we validate your account.
          </p>
        </div>
      );
    }

    if (isVerified) {
      return (
        <div className='text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <HiCheckCircle className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
            Email Verified Successfully! 🎉
          </h1>
          <p className='text-slate-400 mb-6'>
            Your email is now verified. You will be redirected to the login page shortly.
          </p>
          <div className='flex items-center justify-center space-x-2 text-sm text-slate-400'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>Redirecting to login page...</span>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className='text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <HiExclamationCircle className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
            Verification Failed
          </h1>
          <p className='text-slate-300 mb-6'>
            {message || 'The verification link is invalid, expired, or something went wrong.'}
          </p>
          
          <div className='space-y-3'>
            <Link 
              href='/login'
              className='inline-flex items-center justify-center w-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-100'
            >
              Go to Login Page
            </Link>
            <p className='text-sm text-slate-500 text-white'>
                If you believe this is an error, please try logging in or contact support.
            </p>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      <Spinner loading={loader} />
      <div className='flex items-center justify-center px-4'>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] shadow-indigo-900/20'>
          {getContent()}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;