'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

interface password {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordInputProps {
  id: string;
  name: keyof password;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  error,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-slate-300 font-semibold'
      >
        {label} <span className='text-red-400'>*</span>
      </label>
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${error ? 'border-red-500 pr-10' : 'border-indigo-700/50'
            }`}
          onChange={onChange}
          value={value}
          required
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors'
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <FaEyeSlash className='w-5 h-5' />
          ) : (
            <FaEye className='w-5 h-5' />
          )}
        </button>
      </div>
      {error && (
        <div className='flex items-center mt-1'>
          <HiOutlineExclamationCircle
            className='w-4 h-4 text-red-500 me-2 mb-0'
            aria-label='Error'
          />
          <span className='text-sm text-red-400'>{error}</span>
        </div>
      )}
    </div>
  );
};


const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '', 
  });
  const [loader, setLoader] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const token = searchParams.get('token');

  const validate = (data: password) => {
    const errors: FormErrors = {};

    if (!password.newPassword) {
      errors.newPassword = 'Password is required.';
    } else if (password.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password.newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(password.newPassword)) {
      errors.newPassword = 'Password must contain at least one number.';
    }

    if (!password.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required.';
    } else if (password.confirmPassword.length < 8) {
      errors.confirmPassword = 'Password must be at least 8 characters long.';
    } else if (password.newPassword !== password.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });

    const validationErrors = validate(password);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoader(true);

      const response = await axios.post('/api/users/reset-password', {
        token,
        password: password.newPassword,
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
        const errorMessage = error.response.data?.error || 'Sorry, something went wrong.';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry, something went wrong.' });
      }
    } finally {
      setLoader(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setIsError({ isError: false, message: ''});
  };

  if (!token) {
    return (
      <div className='flex items-center justify-center px-4'>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-sky-500'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
              <FaExclamationTriangle className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
              Invalid Reset Link
            </h1>
            <p className='text-gray-200 mb-6'>
              This password reset link is invalid or has expired.
            </p>
            <Link
              href='/forgot-password'
              className='text-blue-400 hover:text-blue-300 underline font-bold transition-colors'
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Spinner loading={loader} />
      <div className='flex flex-col items-center justify-center px-4'>
        {isError && (
          <div className='w-full max-w-md mb-6'>
            <Alert
              message={message}
              type='error'
              className='text-center'
            />
          </div>
        )}
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-sky-500'>
          {isPasswordReset ? (
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <FaCheckCircle className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
                Password Reset Successfully!
              </h1>
              <p className='text-gray-200 mb-6'>
                Your password has been reset. You can now log in with your new password.
              </p>
              <div className='flex items-center justify-center space-x-2 text-sm text-slate-400'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span>Redirecting to login page...</span>
              </div>
            </div>
          ) : (
            <>
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <FaLock className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
                  Reset Password
                </h1>
                <p className='text-gray-200 text-sm sm:text-base'>Enter your new password below</p>
              </div>
              <form className='space-y-6' onSubmit={handleResetPassword}>
                <PasswordInput
                  id='newPassword'
                  name='newPassword'
                  label='Password'
                  placeholder='Enter your new password'
                  value={password.newPassword}
                  error={formErrors.newPassword}
                  onChange={handleChange}
                />
                <PasswordInput
                  id='confirmPassword'
                  name='confirmPassword'
                  label='Confirm Password'
                  placeholder='Re-enter your new password'
                  value={password.confirmPassword}
                  error={formErrors.confirmPassword}
                  onChange={handleChange}
                />
                <div className='text-center pt-4'>
                  <button
                    type='submit'
                    className='w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
                    disabled={!password.newPassword.trim() || !password.confirmPassword.trim()}
                  >
                    <span className='flex items-center justify-center space-x-2'>
                      <FaLock className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                      <span>Reset Password</span>
                    </span>
                  </button>
                  <div className='mt-6 text-center text-sm text-gray-300'>
                    <p>
                      <Link href='/login' className='text-blue-400 hover:text-blue-300 underline font-bold transition-colors hover:no-underline'>
                        Back to Login
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

export default ResetPassword;