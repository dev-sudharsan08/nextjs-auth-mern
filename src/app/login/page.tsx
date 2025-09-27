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
      <div className='flex items-center justify-center'>
        <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transition-all duration-300 hover:scale-[1.01]'>
          <h1 className='text-4xl font-extrabold mb-6 text-center text-slate-800 tracking-tight leading-tight drop-shadow-md'>
            Login
          </h1>
          <form className='space-y-4' onSubmit={handleLogin} noValidate>
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
                className='block mb-1 text-slate-700 font-semibold'
              >
                <span>Password</span>
                <span className='text-red-500'>*</span>
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 placeholder-slate-400 text-slate-700'
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
                className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                disabled={loginBtnDisabled}
              >
                Login
              </button>
              <div className='mt-6 text-center text-md text-slate-600'>
                <p>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup' className='text-blue-500 underline'>
                    Sign up here
                  </Link>
                </p>
                <p className='mt-2'>
                  <Link href='/forgot-password' className='text-blue-500 underline'>
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