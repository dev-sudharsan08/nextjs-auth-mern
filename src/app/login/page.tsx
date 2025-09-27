'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  useEffect(() => {
    if (Object.values(userData).some((val) => val.trim() === '' || !val)) {
      setLoginBtnDisabled(true);
    } else {
      setLoginBtnDisabled(false);
    }
  }, [userData]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    setLoader(true);
    setLoginBtnDisabled(true);
    try {
      const response = await axios.post('/api/users/login', userData);
      console.log(response)
      response?.data?.isLoginSuccess && router.push('/profile')
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
      setUserData({ email: '', password: '' });
      setLoginBtnDisabled(false);
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
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white border-opacity-20 transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-20'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
              </svg>
            </div>
            <h1 className='text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
              Welcome Back
            </h1>
            <p className='text-slate-300'>Sign in to your account</p>
          </div>
          <form className='space-y-4' onSubmit={handleLogin} noValidate>
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
                className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
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
                className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
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
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
                disabled={loginBtnDisabled}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                  </svg>
                  <span>Sign In</span>
                </span>
              </button>
              <div className='mt-6 text-center text-sm text-slate-300'>
                <p>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup' className='text-indigo-400 hover:text-indigo-300 underline font-medium transition-colors'>
                    Sign up here
                  </Link>
                </p>
                <p className='mt-2'>
                  <Link href='/forgot-password' className='text-indigo-400 hover:text-indigo-300 underline font-medium transition-colors'>
                    Forgot your password?
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

export default Login;