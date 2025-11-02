'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { FiArrowLeft, FiCheckCircle, FiMail } from 'react-icons/fi';
import { HiOutlineExclamationCircle, } from 'react-icons/hi2';

interface FormErrors {
  email?: string;
}

interface email {
  email: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = (value: string) => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(value)) {
      errors.email = 'Invalid email address format.';
    }

    return errors;
  };

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });

    const validationErrors = validate(email);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoader(true);

      const response = await axios.post('/api/users/forgot-password', { email });
      console.log(response);
      if (response.data.success) {
        setIsEmailSent(true);
        setIsError({ isError: true, message: 'Password reset link sent! Check your inbox.' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    setEmail(value);

    setFormErrors({ email: undefined });
    setIsError({ isError: false, message: '' });
  };

  return (
    <div className='flex flex-col items-center justify-center px-4 sm:px-6'>
      <Spinner loading={loader} />
      {isError && (
        <div className='flex justify-center'>
          <Alert
            message={message}
            type={isEmailSent ? 'success' : 'error'}
            style={{ minWidth: '350px' }}
            className='mb-7 text-center'
          />
        </div>
      )}
      <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-orange-500'>
        {isEmailSent ? (
          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl'>
              <FiCheckCircle className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-white mb-4 tracking-tight'>
              Email Sent!
            </h1>
            <p className='text-slate-300 mb-8 text-lg'>
              Please check your email and follow the instructions to reset your password.
            </p>
            <Link
              href='/login'
              className='inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 underline font-medium transition-colors group'
            >
              <FiArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <>
            <div className='text-center mb-10'>
              <div className='w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl'>
                <FiMail className='w-8 h-8 text-white' />
              </div>
              <h1 className='text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
                Reset Password
              </h1>
              <p className='text-slate-300 text-base'>Enter your email to receive a password reset link.</p>
            </div>
            <form className='space-y-6' onSubmit={handleForgotPassword} noValidate>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-slate-300 font-semibold'
                >
                  Email Address <span className='text-red-400'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email'
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${
                    formErrors.email ? 'border-red-500 pr-10' : 'border-indigo-700/50'
                  }`}
                  onChange={handleChange}
                  value={email}
                  required
                />
                {formErrors.email &&
                  <div className='flex items-center mt-1 '>
                    <HiOutlineExclamationCircle 
                      className='w-4 h-4 text-red-500 me-2 mb-0'
                      aria-label="Error"
                    />
                    <span className='text-sm text-red-400'>{formErrors.email}</span>
                  </div>
                }
              </div>
              <div className='pt-2'>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group text-lg tracking-wider'
                  disabled={!email.trim() || loader}
                >
                  <span className='flex items-center justify-center space-x-3'>
                    <FiMail className='w-5 h-5 group-hover:translate-y-0.5 transition-transform' />
                    <span>Send Reset Email</span>
                  </span>
                </button>
              </div>

              <div className='mt-8 text-center text-sm text-slate-300'>
                <p className='text-base'>
                  Remember your password?{' '}
                  <Link
                    href='/login'
                    className='text-orange-400 hover:text-orange-300 font-bold transition-colors underline hover:no-underline'
                  >
                    Log in here
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
