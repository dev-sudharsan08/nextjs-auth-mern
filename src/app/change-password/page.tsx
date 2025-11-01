'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
import { HiEye, HiOutlineExclamationCircle } from 'react-icons/hi';
import { HiEyeSlash } from 'react-icons/hi2';

interface formData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordInputProps {
  id: string;
  name: keyof formData;
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
            error ? 'border-red-500 pr-10' : 'border-indigo-700/50 focus:ring-2 focus:ring-sky-500'
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

export default function ChangePassword() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = (data: formData) => {
    const errors: FormErrors = {};

    if (!formData.currentPassword) {
      errors.currentPassword = 'Current password is required.';
    } else if (formData.newPassword.length < 8) {
      errors.currentPassword = 'Password must be at least 8 characters long.';
    }

    if (!formData.newPassword) {
      errors.newPassword = 'Password is required.';
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(formData.newPassword)) {
      errors.newPassword = 'Password must contain at least one number.';
    }

    if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required.';
    } else if (formData.confirmPassword.length < 8) {
      errors.confirmPassword = 'Password must be at least 8 characters long.';
    } else if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setIsSuccess(false);
    setIsError({ isError: false, message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    setIsSuccess(false);

    const validationErrors = validate(formData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setIsError({
        isError: true,
        message: 'New password and confirm password do not match',
      });
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post('/api/users/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.data.message) {
        setIsSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      } else {
        setIsError({
          isError: true,
          message: 'An unexpected error occurred',
        });
      }
    } finally {
      setLoader(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='flex items-center justify-center px-4'>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-sky-500'>
          <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
            <FaCheckCircle className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Password Changed Successfully!
          </h1>
          <p className='text-slate-300 mb-6'>
            Your password has been updated successfully. You will be redirected to your dashboard.
          </p>
          <div className='flex items-center justify-center space-x-2 text-sm text-slate-400'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>Redirecting to dashboard...</span>
          </div>
        </div>
      </div>
    );
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
      <div className='flex items-center justify-center px-4'>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md border border-indigo-700/50 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 shadow-indigo-900/20 ring-2 ring-transparent hover:ring-sky-500'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <FaLock className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl sm:text-4xl font-extrabold mb-2 text-white tracking-tight leading-tight'>
              Change Password
            </h1>
            <p className='text-slate-300 text-sm sm:text-base'>Update your account password</p>
          </div>
          <form className='space-y-6' onSubmit={handleSubmit} noValidate>
            <PasswordInput
              id='currentPassword'
              name='currentPassword'
              label='Current Password'
              placeholder='Enter your current password'
              value={formData.currentPassword}
              error={formErrors.currentPassword}
              onChange={handleChange}
            />
            <PasswordInput
              id='newPassword'
              name='newPassword'
              label='New Password'
              placeholder='Enter your new password'
              value={formData.newPassword}
              error={formErrors.newPassword}
              onChange={handleChange}
            />
            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm New Password'
              placeholder='Re-enter your new password'
              value={formData.confirmPassword}
              error={formErrors.confirmPassword}
              onChange={handleChange}
            />
            <div className='text-center pt-4'>
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
              >
                <span className='flex items-center justify-center space-x-2'>
                  <FaLock className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                  <span>Change Password</span>
                </span>
              </button>
              <div className='mt-6 text-center text-sm text-slate-300'>
                <p>
                  <Link href='/dashboard' className='text-blue-400 hover:text-blue-300 underline font-bold transition-colors'>
                    Back to Dashboard
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}