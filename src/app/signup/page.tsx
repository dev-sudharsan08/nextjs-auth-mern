'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { HiOutlineUserPlus, HiOutlineExclamationCircle, HiEye, HiEyeSlash } from 'react-icons/hi2';

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordInputProps {
  id: string;
  name: keyof UserData;
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
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${
            error ? 'border-red-500 pr-10' : 'border-indigo-700/50 focus:ring-2 focus:ring-green-500'
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
            <HiEyeSlash className='w-5 h-5' />
          ) : (
            <HiEye className='w-5 h-5' />
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


const SignUp = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);
  const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  const validate = (data: UserData) => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.username.trim()) {
      errors.username = 'Username is required.';
    } else if (data.username.length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    }

    if (!data.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email address format.';
    }

    if (!data.password) {
      errors.password = 'Password is required.';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(data.password)) {
      errors.password = 'Password must contain at least one number.';
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required.';
    } else if (data.confirmPassword.length < 8) {
      errors.confirmPassword = 'Password must be at least 8 characters long.';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    setIsSuccess(false);

    const validationErrors = validate(userData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoader(true);
      setSignUpBtnDisabled(true);
      
      const { username, email, password } = userData; 
      const response = await axios.post('/api/users/signup', { username, email, password });
      
      console.log(response);
      if (response.data.data.isVerificationMailSent) {
        setIsSuccess(true);
        setUserData({ username: '', email: '', password: '', confirmPassword: '' }); 
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry, something went wrong.';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error.message);
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
    
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setIsSuccess(false);
    setIsError({ isError: false, message: '' });
    setSignUpBtnDisabled(false);
  };

  return (
    <>
      <Spinner loading={loader} />
      <div className='flex flex-col items-center justify-center px-4 sm:px-6'>
        <div className='w-full max-w-md mb-6'>
          {isError && (
            <Alert
              message={message}
              type='error'
              className='text-center'
            />
          )}
          {isSuccess && (
            <Alert
              message='Registration successful! Please check your email for verification link.'
              type='success'
              className='text-center'
            />
          )}
        </div>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-green-500'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <HiOutlineUserPlus className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
              Join TaskFlow
            </h1>
            <p className='text-slate-400 text-sm sm:text-base'>Create your account and start organizing</p>
          </div>
          <form className='space-y-6' onSubmit={handleSignUp} noValidate>
            <div>
              <label
                htmlFor='username'
                className='block mb-2 text-slate-300 font-semibold'
              >
                Username <span className='text-red-400'>*</span>
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Choose a unique username'
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${
                  formErrors.username ? 'border-red-500' : 'border-indigo-700/50'
                }`}
                onChange={handleChange}
                value={userData.username}
                required
              />
              {formErrors.username &&
                <div className='flex items-center mt-1 '>
                  <HiOutlineExclamationCircle 
                    className='w-4 h-4 text-red-500 me-2 mb-0'
                    aria-label="Error"
                  />
                  <span className='text-sm text-red-400'>{formErrors.username}</span>
                </div>
              }
            </div>
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
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${
                  formErrors.email ? 'border-red-500 pr-10' : 'border-indigo-700/50'
                }`}
                onChange={handleChange}
                value={userData.email}
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
            <PasswordInput
              id='password'
              name='password'
              label='Password'
              placeholder='Enter your password'
              value={userData.password}
              error={formErrors.password}
              onChange={handleChange}
            />
            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Re-enter your assword'
              value={userData.confirmPassword}
              error={formErrors.confirmPassword}
              onChange={handleChange}
            />
            <div className='text-center pt-4'>
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
                disabled={signUpBtnDisabled || loader}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <HiOutlineUserPlus className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                  <span>Create Account</span>
                </span>
              </button>
              <div className='mt-6 text-center text-sm text-slate-400'>
                <p>
                  Have an account?{' '}
                  <Link href='/login' className='text-green-400 hover:text-green-300 underline font-bold transition-colors hover:no-underline'>
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