'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowRightOnRectangle, HiEye, HiEyeSlash, HiOutlineExclamationCircle } from 'react-icons/hi2';

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface PasswordInputProps {
  id: string;
  name: keyof LoginData;
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
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${error ? 'border-red-500 pr-10' : 'border-indigo-700/50'
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


const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  const validate = (data: LoginData) => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email address format.';
    }

    if (!data.password) {
      errors.password = 'Password is required.';
    }

    return errors;
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });

    const validationErrors = validate(userData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoader(true);
      setLoginBtnDisabled(true);

      const response = await axios.post('/api/users/login', userData);

      console.log(response);
      if (response?.data?.isLoginSuccess) {
        setUserData({ email: '', password: '' });
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Login failed. Please check your credentials.';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry, something went wrong.' });
      }

      setUserData((prev) => ({ ...prev }));
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

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setLoginBtnDisabled(false);
  };

  return (
    <>
      <Spinner loading={loader} />
      <div className='flex flex-col items-center justify-center px-4'>
        <div className='w-full max-w-md mb-6'>
          {isError && (
            <Alert
              message={message}
              type='error'
              className='text-center mx-auto'
            />
          )}
        </div>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-indigo-500'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <HiOutlineArrowRightOnRectangle className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
              Welcome Back
            </h1>
            <p className='text-slate-400 text-sm sm:text-base'>Sign in to your account</p>
          </div>
          <form className='space-y-6' onSubmit={handleLogin} noValidate>
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
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${formErrors.email ? 'border-red-500 pr-10' : 'border-indigo-700/50'
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
            <div className='text-center pt-4'>
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
                disabled={loginBtnDisabled || loader}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <HiOutlineArrowRightOnRectangle className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  <span>Sign In</span>
                </span>
              </button>
              <div className='mt-6 text-center text-sm text-slate-300'>
                <p>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup' className='text-indigo-400 hover:text-indigo-300 underline font-bold transition-colors hover:no-underline'>
                    Sign up here
                  </Link>
                </p>
                <p className='mt-2'>
                  <Link href='/forgot-password' className='text-indigo-400 hover:text-indigo-300 underline font-bold transition-colors hover:no-underline'>
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