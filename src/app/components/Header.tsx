'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaHome, FaBolt, FaEnvelope, FaSignInAlt, FaSignOutAlt, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { HiBadgeCheck } from 'react-icons/hi';

export default function Header() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  async function handleLogout() {
    try {
      setLoader(true);
      const response = await axios.get('/api/users/logout', {});
      console.log(response);
      response?.data?.success && router.push('/login');
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
    }
  }

  const isAuthenticated = true;

  // if (loader) {
  //   return (
  //     <header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
  //       <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
  //         <div className='flex items-center space-x-3'>
  //           <div className='w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
  //             <FaCheckCircle className='w-6 h-6 text-white' />
  //           </div>
  //           <h1 className='text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
  //             TaskFlow
  //           </h1>
  //         </div>
  //         <div className='animate-pulse bg-white bg-opacity-20 h-8 w-24 rounded'></div>
  //       </div>
  //     </header>
  //   );
  // }

  return (
    <header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative'>
        <Link className='flex items-center space-x-3' href='/'>
          <span className='w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
            <HiBadgeCheck className='text-indigo-400 w-6 h-6 drop-shadow-lg' />
          </span>
          <h1 className='text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
            TaskFlow
          </h1>
        </Link>

        <nav className='hidden md:flex items-center space-x-6'>
          <Link href='/' className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group'>
            <FaHome className='w-4 h-4 group-hover:scale-110 transition-transform' />
            <span className='text-sm font-medium'>Home</span>
          </Link>
          <Link href='/features' className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group'>
            <FaBolt className='w-4 h-4 group-hover:scale-110 transition-transform' />
            <span className='text-sm font-medium'>Features</span>
          </Link>
          <Link href='/contact' className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group'>
            <FaEnvelope className='w-4 h-4 group-hover:scale-110 transition-transform' />
            <span className='text-sm font-medium'>Contact</span>
          </Link>

          {isAuthenticated ? (
            <button
              className='flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
              onClick={handleLogout}
            >
              <FaSignOutAlt className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              href='/login'
              className='flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
            >
              <FaSignInAlt className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              <span>Login</span>
            </Link>
          )}
        </nav>

        <div className='md:hidden flex items-center space-x-3'>
          {isAuthenticated ? (
            <button
              className='flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
              onClick={handleLogout}
            >
              <FaSignOutAlt className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          ) : (
            <Link
              href='/login'
              className='flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
            >
              <FaSignInAlt className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              <span className='hidden sm:inline'>Login</span>
            </Link>
          )}
          <button
            className='p-2 text-white hover:text-blue-200 transition-colors duration-200 rounded-lg hover:bg-white/10'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            <div className='relative w-5 h-5'>
              <FaBars className={`absolute inset-0 transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                }`} />
              <FaTimes className={`absolute inset-0 transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                }`} />
            </div>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
          } transition-all duration-300 ease-in-out bg-gradient-to-b from-indigo-600/95 to-purple-600/95 backdrop-blur-lg border-t border-white/20 shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <div>
            <Link
              href="/"
              className="text-white hover:bg-white/10 rounded-xl transition-all duration-200 inline-block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="inline-flex items-center space-x-3 p-3">
                <FaHome className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </span>
            </Link>
          </div>

          <div>
            <Link
              href="/features"
              className="text-white hover:bg-white/10 rounded-xl transition-all duration-200 inline-block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="inline-flex items-center space-x-3 p-3">
                <FaBolt className="w-5 h-5" />
                <span className="font-medium">Features</span>
              </span>
            </Link>
          </div>

          <div>
            <Link
              href="/contact"
              className="text-white hover:bg-white/10 rounded-xl transition-all duration-200 inline-block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="inline-flex items-center space-x-3 p-3">
                <FaEnvelope className="w-5 h-5" />
                <span className="font-medium">Contact</span>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}