'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);
  const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    try {
      setLoader(true);
      setSignUpBtnDisabled(true);
      const response = await axios.post('/api/users/signup', userData);
      console.log(response);
      if (response.data.data.isVerificationMailSent) {
        setIsSuccess(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error.message);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    } finally {
      setLoader(false);
      setSignUpBtnDisabled(false);
      setUserData({ username: '', email: '', password: '' });
    }
  }

  useEffect(() => {
    if (Object.values(userData).some((val) => val.trim() === '' || !val)) {
      setSignUpBtnDisabled(true);
    } else {
      setSignUpBtnDisabled(false);
    }
  }, [userData]);

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
      {isSuccess && (
        <div className='flex justify-center'>
          <Alert
            message='Registration successful! Please check your email for verification link.'
            type='success'
            style={{ minWidth: '350px' }}
            className='mb-7 text-center'
          />
        </div>
      )}
      <div className='flex flex-col items-center justify-center min-h-screen px-4'>
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white border-opacity-20 transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-20'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </div>
            <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
              Join TaskFlow
            </h1>
            <p className='text-slate-300 text-sm sm:text-base'>Create your account and start organizing</p>
          </div>
          <form className='space-y-4' onSubmit={handleSignUp} noValidate>
            <div>
              <label
                htmlFor='username'
                className='block mb-2 text-white font-semibold'
              >
                <span>Username</span>
                <span className='text-red-400'>*</span>
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Enter your username'
                className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value.trim(),
                  }))
                }
                value={userData.username}
              />
            </div>
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
                className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value.trim(),
                  }))
                }
                value={userData.email}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-white font-semibold'
              >
                <span>Password</span>
                <span className='text-red-400'>*</span>
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value.trim(),
                  }))
                }
                value={userData.password}
              />
            </div>
            <div className='text-center pt-4'>
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
                disabled={signUpBtnDisabled}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <svg className='w-5 h-5 group-hover:rotate-12 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                  </svg>
                  <span>Create Account</span>
                </span>
              </button>
              <div className='mt-6 text-center text-sm text-slate-300'>
                <p>
                  Have an account?{' '}
                  <Link href='/login' className='text-green-400 hover:text-green-300 underline font-medium transition-colors'>
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

