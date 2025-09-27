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
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transition-all duration-300 hover:scale-[1.01]'>
          {isVerified ? (
            <div className='text-center'>
              <div className='text-green-500 text-6xl mb-4'>✓</div>
              <h1 className='text-2xl font-bold text-green-600 mb-4'>
                Email Verified Successfully!
              </h1>
              <p className='text-gray-600 mb-4'>
                Your email has been verified. You can now log in to your account.
              </p>
              <p className='text-sm text-gray-500'>
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <div className='text-center'>
              <h1 className='text-2xl font-bold text-slate-800 mb-4'>
                Verifying Email...
              </h1>
              <p className='text-gray-600'>
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
